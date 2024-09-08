type InstanceState = 'idle' | 'singleGesture' | 'multiGesture' | 'mouse';

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_TAP_TIME = 185; // milliseconds
const ZOOM_THRESHOLD = 15; // Threshold for zoom vs pan in pixels

// Utility functions
const stateIs = (state: InstanceState, ...states: InstanceState[]) => states.includes(state);
const clamp = (value: number, min: number, max: number) => Math.max(Math.min(value, max), min);
const getPinchDistance = (e: TouchEvent) => Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);
const getMidPoint = (e: TouchEvent) => ({ x: (e.touches[0].pageX + e.touches[1].pageX) / 2, y: (e.touches[0].pageY + e.touches[1].pageY) / 2 });

interface ZoomPanInstance {
    zoomPan: (params: { scale: number; x: number; y: number; deltaX: number; deltaY: number }) => void;
    zoom: (params: { deltaScale: number; x: number; y: number }) => void;
    panBy: (params: { originX: number; originY: number }) => void;
    reset: () => void;
    getScale: () => number;
}

// Renderer logic
const renderer = ({ container, element, minScale, maxScale, scaleSensitivity }: { container: HTMLElement; element: HTMLElement; minScale: number; maxScale: number; scaleSensitivity: number }): ZoomPanInstance => {
    let scale = 1, translateX = 0, translateY = 0, originX = 0, originY = 0, originOffset = false;

    const applyTransform = () => {
        if (originOffset) element.style.transformOrigin = `${originX}px ${originY}px`;
        element.style.transform = `matrix(${scale}, 0, 0, ${scale}, ${translateX}, ${translateY})`;
    };

    return {
        zoomPan: ({ scale: newScale, x, y, deltaX, deltaY }) => {
            scale = clamp(newScale, minScale, maxScale);
            translateX += deltaX; translateY += deltaY;
            originX = x; originY = y; originOffset = true;
            applyTransform();
        },
        zoom: ({ deltaScale, x, y }) => {
            scale = clamp(scale + deltaScale / (scaleSensitivity / scale), minScale, maxScale);
            originX = x; originY = y; originOffset = true;
            applyTransform();
        },
        panBy: ({ originX: x, originY: y }) => {
            translateX += x; translateY += y;
            applyTransform();
        },
        reset: () => {
            scale = 1; translateX = 0; translateY = 0; originX = 0; originY = 0; originOffset = false;
            applyTransform();
        },
        getScale: () => scale
    };
};

// Svelte action for zoom and pan
export function zoomPan(node: HTMLImageElement) {
    let state: InstanceState = 'idle', lastTapTime = 0, scaleValue = 1, deviceHasTouch = false, wheelTimeout: ReturnType<typeof setTimeout> | undefined;
    const container = node.parentElement;
    if (!container) throw new Error('The img element must be wrapped in a container');

    const instance = renderer({ container, element: node, minScale: MIN_SCALE, maxScale: MAX_SCALE, scaleSensitivity: 20 });
    const start = { x: 0, y: 0, distance: 0, touches: [] as Touch[] };

    const setCurrentScale = (value: number) => {
        scaleValue = value;
        container.style.cursor = value === MIN_SCALE ? 'zoom-in' : 'move';
    };

    // Double-tap logic
    const onDoubleTap = ({ scale, x, y }: { scale: number; x: number; y: number }): number => {
        if (scale < MAX_SCALE) {
            instance.zoomPan({ scale: MAX_SCALE, x, y, deltaX: 0, deltaY: 0 });
            return MAX_SCALE;
        }
        instance.reset();
        return MIN_SCALE;
    };

    // Touch and mouse event handlers
    const onStart = (e: TouchEvent) => {
        deviceHasTouch = true;
        if (stateIs(state, 'multiGesture')) return;
        if (e.touches.length === 2 && stateIs(state, 'idle', 'singleGesture')) {
            Object.assign(start, getMidPoint(e), { distance: getPinchDistance(e) / scaleValue, touches: [e.touches[0], e.touches[1]] });
            state = 'multiGesture'; return;
        }
        if (e.touches.length === 1) {
            state = 'singleGesture';
            const touch = e.touches[0];
            Object.assign(start, { x: touch.pageX, y: touch.pageY, distance: 0, touches: [touch] });
        }
    };

    const onMove = (e: TouchEvent) => {
        if (stateIs(state, 'idle')) return;
    
        if (stateIs(state, 'multiGesture') && e.touches.length === 2) {
            e.preventDefault();
            const currentDistance = getPinchDistance(e);
            const distanceChange = currentDistance - start.distance * scaleValue;
            const { x, y } = getMidPoint(e);
    
            if (Math.abs(distanceChange) > ZOOM_THRESHOLD) {
                // Zooming logic
                const scale = currentDistance / start.distance;
                instance.zoomPan({ scale, x, y, deltaX: x - start.x, deltaY: y - start.y });
            } else {
                // Treat it as panning if the distance change is within the threshold
                const deltaX = x - start.x;
                const deltaY = y - start.y;
                instance.panBy({ originX: deltaX, originY: deltaY });
            }
    
            Object.assign(start, { x, y });
        } else if (stateIs(state, 'singleGesture') && e.touches.length === 1) {
            // Single touch pan
            e.preventDefault();
            const touch = e.touches[0];
            const deltaX = touch.pageX - start.x;
            const deltaY = touch.pageY - start.y;
            instance.panBy({ originX: deltaX, originY: deltaY });
            Object.assign(start, { x: touch.pageX, y: touch.pageY });
        }
    };

    const onEndTouch = (e: TouchEvent) => {
        if (stateIs(state, 'idle') || e.touches.length !== 0) return;
        const currentTime = Date.now(), tapLength = currentTime - lastTapTime;
        if (tapLength < DOUBLE_TAP_TIME && tapLength > 0) {
            e.preventDefault();
            const touch = e.changedTouches[0];
            setCurrentScale(onDoubleTap({ scale: scaleValue, x: touch.clientX, y: touch.clientY }));
        }
        lastTapTime = currentTime;
        setCurrentScale(instance.getScale());
        state = 'idle';
    };

    const onWheel = (e: WheelEvent) => {
        if (deviceHasTouch) return;
        e.preventDefault();
        instance.zoom({ deltaScale: Math.sign(e.deltaY) > 0 ? -1 : 1, x: e.pageX, y: e.pageY });
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => setCurrentScale(instance.getScale()), 100);
    };

    const onMouseMove = (e: MouseEvent) => {
        if (deviceHasTouch || e.buttons !== 1 || scaleValue === MIN_SCALE) return;
        e.preventDefault();
        instance.panBy({ originX: e.movementX, originY: e.movementY });
        state = 'mouse';
    };

    const onMouseEnd = () => { if (!deviceHasTouch) state = 'idle'; setCurrentScale(instance.getScale()); };
    const onMouseUp = (e: MouseEvent) => {
        if (!deviceHasTouch && stateIs(state, 'mouse')) setCurrentScale(onDoubleTap({ scale: scaleValue, x: e.pageX, y: e.pageY }));
        onMouseEnd();
    };

    // Add event listeners
    container.addEventListener('touchstart', onStart, { passive: true });
    container.addEventListener('touchmove', onMove, { passive: false });
    container.addEventListener('touchend', onEndTouch);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mouseleave', onMouseEnd);
    container.addEventListener('wheel', onWheel);

    // Cleanup function
    return {
        destroy() {
            ['touchstart', 'touchmove', 'touchend', 'mousemove', 'mouseup', 'mouseleave', 'wheel'].forEach(event => 
                container.removeEventListener(event as keyof HTMLElementEventMap, onStart as EventListener)
            );
        }
    };
}