<script lang="ts">
    import { base } from '$app/paths';
    import { Button } from "$lib/components/ui/button";
    import MainNav from './main-nav.svelte';
    import MobileNav from './mobile-nav.svelte';
</script>

<header class="supports-[backdrop-filter]:bg-background/80 sticky top-0 z-40 w-full border-b bg-background/95 shadow-2xl backdrop-blur">
    <div class="flex w-full h-14 items-center px-3 md:px-8 lg:px-20 xl:px-40 2xl:px-60">
        <MainNav />
		<MobileNav />
        <div class="flex flex-1 items-center justify-end">
            <nav class="flex items-center space-x-3.5 mx-3 md:mx-10">
                <Button
                    href="{base}/generated-pdf/khulvey_resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="default"
                    class="kh-shadow-1"
                >
                    <p>Resume &rarr;</p>
                </Button>
            </nav>
        </div>
    </div>
</header>