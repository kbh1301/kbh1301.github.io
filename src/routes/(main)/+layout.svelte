<script lang="ts">
    import Icon from '@iconify/svelte';
    import { Navbar, Button, Footer } from "$lib/components";
    import "$root/app.postcss";

    let y: number;
    let innerHeight = 0;
    let innerWidth = 0;

    function goTop() {
        document.body.scrollIntoView();
    }
</script>

<div class="relative flex flex-col mx-auto w-full text-sm:text-base min-h-screen">
    <!-- SCROLL TO TOP-->
    <div class={"fixed bottom-0 w-fit duration-200 flex pb-10 pl-10 z-[10] " + (
        y > 0 ? ' opacity-full pointer-events-auto' : ' opacity-0 pointer-events-none'
    )}>
        <Button
            variant="icon_secondary"
            size="icon"
            on:click={goTop}
            aria-label="Scroll to top"
        >
            <Icon icon="icon-park-solid:up-c" />
        </Button>
    </div>
    
    <Navbar />
    <slot />
    <Footer />
</div>

<svelte:window bind:scrollY={y} bind:innerHeight bind:innerWidth />