<script lang="ts">
    import { Carousel, Button, Dialog, Separator } from '$lib/components';
    import type { CarouselAPI } from "$lib/components/ui/carousel/context.js";
    import Icon from '@iconify/svelte';
    import { scale } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';

    export let project: any;

    let api: CarouselAPI;
    let current = 0;
    let count = 0;
    let canScrollPrev: boolean;
    let canScrollNext: boolean;

    $: if (api) {
        count = api.scrollSnapList().length;
        current = api.selectedScrollSnap() + 1;
        canScrollPrev = api.canScrollPrev();
        canScrollNext = api.canScrollNext();

        api.on("select", () => {
            current = api.selectedScrollSnap() + 1;
            canScrollPrev = api.canScrollPrev();
            canScrollNext = api.canScrollNext();
        });
    }

    function handlePrev() {
        api.scrollPrev();
    }

    function handleNext() {
        api.scrollNext();
    }

    let isDialogOpen: boolean | undefined = false;
    let isMaximized = false;
    let currentImg = '';

    async function handleImageResize() {
        if (!isMaximized) {
            isMaximized = true;
            currentImg = project.images[current - 1];
        } else {
            isMaximized = false;
            currentImg = '';
        }
    }
</script>

<Dialog.Root bind:open={isDialogOpen} closeOnOutsideClick={false}>
    <Dialog.Close class="cursor-auto">
        <Dialog.Overlay class="bg-black/80" />
    </Dialog.Close>
    <Dialog.Trigger class="flex-1">
        <div class="h-full p-4 sm:p-6 md:p-8 flex flex-col gap-4 rounded-lg border-2 border-solid border-secondary text-center group cursor-pointer hover:border-primary duration-200">
            <div class="bg-background grid place-items-center px-4 text-5xl md:text-6xl -mt-10 sm:-mt-12 md:-mt-14 lg:-mt-16 mx-auto duration-200">
                <Icon icon={project.icon} />
            </div>
            <h3 class="font-medium text-xl sm:text-2xl md:text-3xl">{project.title}</h3>
            <p>{project.overview}..</p>
            <div class="flex-1 flex justify-between gap-4 items-end">
                <div class="ml-auto cursor-pointer hover:text-slate-950 duration-200 relative after:absolute after:top-0 after:right-full after:w-full after:h-full after:duration-200 hover:after:translate-x-full after:z-[-1] after:bg-secondary/60 overflow-hidden">
                    <p class="relative z-4 px-2">See more &rarr;</p>
                </div>
            </div>
        </div>
    </Dialog.Trigger>
    <Dialog.Content class="max-w-[90vw] h-[90vh] overflow-auto">
        <Dialog.Header>
            <Dialog.Title class="flex w-full items-center justify-center text-2xl font-semibold tracking-tight">
                {project.title}
            </Dialog.Title>
            <Separator class="mb-6 mt-5 block h-px bg-muted" />
        </Dialog.Header>
        <div class="flex flex-col items-center gap-10 max-w-[1200px] justify-self-center">
            <!-- CAROUSEL -->
            <div class="flex flex-col items-center">
                <Carousel.Root bind:api class="w-full max-w-[75%] lg:max-w-2xl shadow-2xl">
                    <Carousel.Content>
                        {#each project.images as image}
                            <Carousel.Item>
                                <button on:click={handleImageResize} class="cursor-zoom-in touch-pan-y">
                                    <img src={image} loading="lazy" alt="Demo Screenshot" />
                                </button>
                            </Carousel.Item>
                        {/each}
                    </Carousel.Content>
                </Carousel.Root>
                <!-- CAROUSEL CONTROLLS -->
                <div class="flex items-center gap-2 py-2">
                    <Button
                        variant="icon_secondary"
                        size="icon"
                        disabled={!canScrollPrev}
                        on:click={handlePrev}
                    >
                        <Icon icon="carbon:previous-filled" />
                    </Button>

                    <p class="text-muted-foreground text-sm">{current} of {count}</p>
                    
                    <Button
                        variant="icon_secondary"
                        size="icon"
                        disabled={!canScrollNext}
                        on:click={handleNext}
                    >
                        <Icon icon="carbon:next-filled" />
                    </Button>
                </div>
            </div>
            <div>
                <p class="mt-2 text-muted-foreground text-xl">{project.overview}</p>
            </div>
            <div class="flex flex-col w-full justify-start md:flex-row md:justify-evenly gap-10">
                <div>
                    <strong class="text-lg">Features:</strong>
                    <ul class="mt-2 ml-6 list-disc">
                        {#each project.features as feature}
                            <li>{feature}</li>
                        {/each}
                    </ul>
                </div>
                <div>
                    <strong class="text-lg">Skills:</strong>
                    <ul class="mt-2 ml-6 list-disc">
                        {#each project.skills as skill}
                            <li>{skill}</li>
                        {/each}
                    </ul>
                </div>
            </div>
            <div class="flex gap-4">
                <p>
                    <strong class="text-lg">Repository:</strong>
                    <a class="text-primary" target="_blank" href={project.link}>
                        GitHub<sup><span class="text-xs scale-75 pl-0.5">
                            <Icon icon="fa6-solid:arrow-up-right-from-square" class="text-xs scale-[75%] inline-block" />
                        </span></sup>
                    </a>
                </p>
            </div>
        </div>
    </Dialog.Content>
</Dialog.Root>

{#if isMaximized}
    <button
        class="flex inset-0 justify-center items-center bg-black/90 fixed bottom-0 left-0 w-full h-full z-[100] overflow-auto cursor-zoom-out"
        on:click={handleImageResize}
        transition:scale={{ duration: 300, easing: cubicOut }}
    >
        <img
            class="object-contain h-[100%] w-[100%] touch-pan-y"
            src={currentImg}
            alt="Maximized Demo Screenshot"
        />
    </button>
{/if}