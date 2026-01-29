<script lang="ts">
    import { Dialog, Separator, AspectRatio, Badge } from "$lib/components";
    import Icon from "@iconify/svelte";
    import { tick } from "svelte";
    import PhotoSwipeLightbox from "photoswipe/lightbox";
    import "photoswipe/style.css";

    export let project: any;
    let isDialogOpen: boolean | undefined = false;
    let galleryElement: HTMLDivElement | undefined;
    let lightbox: PhotoSwipeLightbox | null = null;

    /** Set data-pswp-width/height on each gallery link from the img's natural dimensions so PhotoSwipe doesn't stretch. */
    function updateGalleryDimensions(galleryEl: HTMLDivElement) {
        galleryEl
            .querySelectorAll<HTMLAnchorElement>("a[data-pswp-width]")
            .forEach((anchor) => {
                const img = anchor.querySelector("img");
                if (!img) return;
                const setDims = () => {
                    if (img.naturalWidth && img.naturalHeight) {
                        anchor.dataset.pswpWidth = String(img.naturalWidth);
                        anchor.dataset.pswpHeight = String(img.naturalHeight);
                    }
                };
                if (img.complete && img.naturalWidth) {
                    setDims();
                } else {
                    img.addEventListener("load", setDims);
                }
            });
    }

    // Init PhotoSwipe when dialog opens, destroy when it closes
    $: if (isDialogOpen && galleryElement) {
        if (!lightbox) {
            lightbox = new PhotoSwipeLightbox({
                gallery: galleryElement,
                children: "a[data-pswp-width]",
                pswpModule: () => import("photoswipe"),
            });
            lightbox.init();
        }
        // Update dimensions from actual images (avoids stretching when aspect ratios differ)
        const el = galleryElement;
        tick().then(() => el && updateGalleryDimensions(el));
    } else if (!isDialogOpen && lightbox) {
        lightbox.destroy();
        lightbox = null;
    }
</script>

<Dialog.Root bind:open={isDialogOpen} closeOnOutsideClick={false}>
    <Dialog.Close class="cursor-auto" aria-label="Close modal">
        <Dialog.Overlay class="bg-black/80" />
    </Dialog.Close>
    <Dialog.Trigger class="flex-1">
        <div class="h-full p-4 sm:p-6 md:p-8 flex flex-col gap-4 rounded-lg border-2 border-solid border-secondary text-center group cursor-pointer hover:border-primary duration-200">
            <div class="bg-background grid place-items-center px-4 text-5xl md:text-6xl -mt-10 sm:-mt-12 md:-mt-14 lg:-mt-16 mx-auto duration-200">
                <Icon icon={project.icon} />
            </div>
            <h3 class="font-medium text-xl sm:text-2xl md:text-3xl">
                {project.title}
            </h3>
            <p>{project.overview}..</p>
            <div class="flex-1 flex justify-end items-end cursor-pointer hover:text-slate-950 duration-200 relative after:absolute after:top-0 after:right-full after:w-full after:h-full after:duration-200 hover:after:translate-x-full after:z-[-1] after:bg-secondary/60 overflow-hidden">
                <p class="relative z-4 px-2">See more &rarr;</p>
            </div>
        </div>
    </Dialog.Trigger>
    <Dialog.Content class="w-full max-w-[95vw] sm:max-w-[90vw] lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl h-[90vh] overflow-hidden p-0 flex flex-col">
        <Dialog.Header class="shrink-0 px-6 sm:px-8 md:px-10 lg:px-14 xl:px-20 2xl:px-28 pt-6 sm:pt-8">
            <Dialog.Title class="flex w-full items-center justify-center text-xl sm:text-2xl font-semibold tracking-tight text-center">
                {project.title}
            </Dialog.Title>
            <Separator class="mb-0 mt-4 sm:mt-5 block h-px bg-muted" />
        </Dialog.Header>
        <div class="overflow-auto flex-1 min-h-0">
            <div class="flex flex-col items-center gap-10 sm:gap-10 w-full max-w-4xl mx-auto px-6 sm:px-8 md:px-10 lg:px-14 xl:px-20 2xl:px-28 pb-8 sm:pb-10">
                <!-- Hacky focus solution -->
                <button tabindex={0} aria-hidden="true" class="sr-only" />

                <div
                    class="pswp-gallery flex flex-col items-center gap-10 sm:gap-10 w-full max-w-4xl mx-auto"
                    bind:this={galleryElement}
                >
                    <!-- Main image -->
                    <a
                        href={project.image_main}
                        data-pswp-width="1920"
                        data-pswp-height="1200"
                        class="block w-full max-w-2xl mx-auto cursor-zoom-in"
                    >
                        <AspectRatio
                            ratio={16 / 10}
                            class="bg-muted rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg ring-1 ring-black/5 group relative"
                        >
                            <img
                                src={project.image_main}
                                alt="Project Screenshot"
                                class="w-full h-full object-contain"
                                loading="lazy"
                            />
                            <span
                                class="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors rounded-2xl sm:rounded-3xl"
                                aria-hidden="true"
                            >
                                <Icon
                                    icon="fa6-solid:magnifying-glass-plus"
                                    class="text-white opacity-0 group-hover:opacity-100 transition-opacity text-3xl drop-shadow-lg"
                                />
                            </span>
                        </AspectRatio>
                    </a>

                    <!-- Project overview -->
                    <p class="text-muted-foreground text-base sm:text-lg lg:text-xl leading-relaxed text-center max-w-2xl w-full">
                        {project.overview}
                    </p>

                    <!-- Project features & skills -->
                    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 max-w-3xl mx-auto">
                        <div class="text-left">
                            <h4 class="text-base sm:text-lg font-semibold text-foreground mb-3">
                                Features
                            </h4>
                            <ul class="space-y-2 text-sm sm:text-base text-muted-foreground list-disc list-inside marker:text-primary/70">
                                {#each project.features as feature}
                                    <li class="leading-snug">{feature}</li>
                                {/each}
                            </ul>
                        </div>
                        <div class="text-left">
                            <h4 class="text-base sm:text-lg font-semibold text-foreground mb-3">
                                Skills
                            </h4>
                            <div class="flex flex-wrap gap-2">
                                {#each project.skills as skill}
                                    <Badge
                                        variant="secondary"
                                        class="text-xs sm:text-sm font-medium"
                                    >
                                        {skill}
                                    </Badge>
                                {/each}
                            </div>
                        </div>
                    </div>

                    <!-- Additional images at bottom (same PhotoSwipe group) -->
                    {#if project.images?.length}
                        <div class="flex flex-col gap-4 w-full max-w-2xl mx-auto">
                            {#each project.images as image}
                                <a
                                    href={image}
                                    data-pswp-width="1920"
                                    data-pswp-height="1200"
                                    class="block w-full cursor-zoom-in"
                                >
                                    <AspectRatio
                                        ratio={16 / 10}
                                        class="bg-muted rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg ring-1 ring-black/5 group relative"
                                    >
                                        <img
                                            src={image}
                                            alt="Project Screenshot"
                                            class="w-full h-full object-contain"
                                            loading="lazy"
                                        />
                                        <span
                                            class="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors rounded-2xl sm:rounded-3xl"
                                            aria-hidden="true"
                                        >
                                            <Icon
                                                icon="fa6-solid:magnifying-glass-plus"
                                                class="text-white opacity-0 group-hover:opacity-100 transition-opacity text-3xl drop-shadow-lg"
                                            />
                                        </span>
                                    </AspectRatio>
                                </a>
                            {/each}
                        </div>
                    {/if}

                    <!-- Repository link -->
                    {#if project.repo}
                        <p class="pt-2 text-sm sm:text-base">
                            <strong class="text-base sm:text-lg">Repository:</strong>
                            <a
                                class="text-primary hover:underline ml-1"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={project.repo}
                            >
                                GitHub
                                <Icon
                                    icon="fa6-solid:arrow-up-right-from-square"
                                    class="inline-block w-3.5 h-3.5 ml-0.5 align-baseline"
                                />
                            </a>
                        </p>
                    {/if}
                </div>
            </div>
        </div>
    </Dialog.Content>
</Dialog.Root>
