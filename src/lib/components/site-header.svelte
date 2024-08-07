<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { MainNav, MobileNav } from "$lib/components";
</script>

<header class="supports-[backdrop-filter]:bg-background/80 sticky top-0 z-40 w-full border-b bg-background/95 shadow-2xl backdrop-blur mb-10">
    <div class="flex w-full h-14 items-center px-3 md:px-8 lg:px-20 xl:px-40 2xl:px-60">
        <MainNav />
		<MobileNav />
        <div class="flex flex-1 items-center justify-end">
            <nav class="flex items-center space-x-3.5 mx-3 md:mx-10">
                <Button
                    href="/resume_preview"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="default"
                >
                    <p>Resume</p>
                </Button>
            </nav>
        </div>
    </div>
</header>