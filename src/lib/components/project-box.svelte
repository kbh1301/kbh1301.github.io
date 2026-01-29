<script lang="ts">
    import { Dialog, Separator, AspectRatio, Badge } from "$lib/components";
    import Icon from "@iconify/svelte";
    import PhotoSwipeLightbox from "photoswipe/lightbox";
    import "photoswipe/style.css";

    export let project: any;
    export let allProjects: any[] = [project];
    export let currentIndex: number = 0;

    let isDialogOpen: boolean | undefined = false;
    let displayedIndex = 0;

    $: displayedProject = allProjects[displayedIndex] ?? project;
    $: projectCount = allProjects.length;

    let wasOpen = false;
    // When modal opens, show this card's project (don't reset when arrows change project)
    $: if (isDialogOpen && !wasOpen) {
        displayedIndex = currentIndex;
        wasOpen = true;
    }
    $: if (!isDialogOpen) {
        wasOpen = false;
    }

    function goPrev() {
        displayedIndex = (displayedIndex - 1 + projectCount) % projectCount;
    }
    function goNext() {
        displayedIndex = (displayedIndex + 1) % projectCount;
    }
    let galleryElement: HTMLDivElement | undefined;
    let lightbox: PhotoSwipeLightbox | null = null;

    // Init PhotoSwipe when dialog opens, destroy when it closes
    $: if (isDialogOpen && galleryElement) {
        if (!lightbox) {
            lightbox = new PhotoSwipeLightbox({
                gallery: galleryElement,
                children: "a[data-pswp-width]",
                pswpModule: () => import("photoswipe"),
            });
            // Use PhotoSwipe's domItemData filter to get dimensions from the img so aspect ratio is correct
            lightbox.addFilter("domItemData", (itemData: any, _element: HTMLElement, linkEl: HTMLAnchorElement) => {
                const img = linkEl?.querySelector("img");
                if (img?.naturalWidth && img?.naturalHeight) {
                    itemData.w = img.naturalWidth;
                    itemData.h = img.naturalHeight;
                    itemData.width = itemData.w;
                    itemData.height = itemData.h;
                }
                return itemData;
            });
            lightbox.init();
        }
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
            <div class="flex-1 flex justify-between gap-4 items-end">
                <div class="ml-auto cursor-pointer hover:text-slate-950 duration-200 relative after:absolute after:top-0 after:right-full after:w-full after:h-full after:duration-200 hover:after:translate-x-full after:z-[-1] after:bg-secondary/60 overflow-hidden">
                    <p class="relative z-4 px-2">See more &rarr;</p>
                </div>
            </div>
        </div>
    </Dialog.Trigger>
    <Dialog.Content class="w-full max-w-[95vw] sm:max-w-[90vw] lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl h-[90vh] overflow-hidden p-0 flex flex-col [&>*:last-child]:hidden">
        <Dialog.Header class="relative shrink-0 px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex flex-col">
            <Dialog.Close
                class="absolute right-2 top-2 sm:right-3 sm:top-3 rounded-md p-1.5 sm:p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none transition-colors touch-manipulation min-w-[2.25rem] min-h-[2.25rem] sm:min-w-[2.5rem] sm:min-h-[2.5rem] flex items-center justify-center"
                aria-label="Close"
            >
                <Icon icon="fa6-solid:xmark" class="text-base sm:text-lg" />
            </Dialog.Close>
            <div class="flex w-full items-center justify-between gap-1 sm:gap-2">
                <div class="w-9 shrink-0 sm:w-10" aria-hidden="true"></div>
                <button
                    type="button"
                    class="shrink-0 rounded-md p-1.5 sm:p-2 text-foreground hover:bg-muted hover:text-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 touch-manipulation min-w-[2.25rem] min-h-[2.25rem] sm:min-w-[2.5rem] sm:min-h-[2.5rem] flex items-center justify-center"
                    aria-label="Previous project"
                    on:click={goPrev}
                >
                    <Icon icon="fa6-solid:chevron-left" class="text-lg sm:text-xl" />
                </button>
                <Dialog.Title class="flex-1 min-w-0 text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-center px-1 truncate">
                    {displayedProject.title}
                </Dialog.Title>
                <button
                    type="button"
                    class="shrink-0 rounded-md p-1.5 sm:p-2 text-foreground hover:bg-muted hover:text-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 touch-manipulation min-w-[2.25rem] min-h-[2.25rem] sm:min-w-[2.5rem] sm:min-h-[2.5rem] flex items-center justify-center"
                    aria-label="Next project"
                    on:click={goNext}
                >
                    <Icon icon="fa6-solid:chevron-right" class="text-lg sm:text-xl" />
                </button>
                <div class="w-9 shrink-0 sm:w-10" aria-hidden="true"></div>
            </div>
            <Separator class="mb-0 mt-2 sm:mt-3 block h-px bg-muted" />
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
                        href={displayedProject.image_main}
                        data-pswp-width="1920"
                        data-pswp-height="1200"
                        class="block w-full max-w-2xl mx-auto cursor-zoom-in"
                    >
                        <AspectRatio
                            ratio={16 / 10}
                            class="bg-muted rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg ring-1 ring-black/5 group relative"
                        >
                            <img
                                src={displayedProject.image_main}
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
                        {displayedProject.overview}
                    </p>

                    <!-- Project features & skills -->
                    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 max-w-3xl mx-auto">
                        <div class="text-left">
                            <h4 class="text-base sm:text-lg font-semibold text-foreground mb-3">
                                Features
                            </h4>
                            <ul class="space-y-2 text-sm sm:text-base text-muted-foreground list-disc list-inside marker:text-primary/70">
                                {#each displayedProject.features as feature}
                                    <li class="leading-snug">{feature}</li>
                                {/each}
                            </ul>
                        </div>
                        <div class="text-left">
                            <h4 class="text-base sm:text-lg font-semibold text-foreground mb-3">
                                Skills
                            </h4>
                            <div class="flex flex-wrap gap-2">
                                {#each displayedProject.skills as skill}
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
                    {#if displayedProject.images?.length}
                        <div class="flex flex-col gap-4 w-full max-w-2xl mx-auto">
                            {#each displayedProject.images as image}
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
                    {#if displayedProject.repo}
                        <p class="pt-2 text-sm sm:text-base">
                            <strong class="text-base sm:text-lg">Repository:</strong>
                            <a
                                class="text-primary hover:underline ml-1"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={displayedProject.repo}
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
