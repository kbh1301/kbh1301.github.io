<script lang="ts">
	import * as Sheet from "$lib/components/ui/sheet";
    import Icon from '@iconify/svelte';
	import { Button } from "$lib/components/ui/button";
	import { siteConfig } from "$lib/config/site";
    import { page } from "$app/stores";
    import { cn } from "$lib/utils";

	let open = false;
</script>

<Sheet.Root bind:open>
	<Sheet.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="ghost"
			class="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
		>
            <Icon icon="mingcute:menu-fill" class="h-5 w-5" />
			<span class="sr-only">Toggle Menu</span>
		</Button>
	</Sheet.Trigger>
	<Sheet.Content side="left" class="pr-0">
		<a href="/" class="flex items-center" on:click={() => (open = false)}>
			<span class="font-bold">{siteConfig.name}</span>
		</a>
		<div class="my-4 h-[calc(100vh-8rem)] pb-10 pl-6 overflow-auto">
			<div class="flex flex-col space-y-3">
				{#each siteConfig.routes as navItem, index (navItem + index.toString())}
					{#if navItem.href}
						<a
                            href={navItem.href}
                            on:click={() => (open = false)}
                            class={cn(
                                "py-1 transition-colors hover:text-primary",
                                $page.state.hash === navItem.href
                                    ? "text-primary"
                                    : "text-foreground"
                            )}>
							{navItem.title}
						</a>
					{/if}
				{/each}
			</div>
		</div>
	</Sheet.Content>
</Sheet.Root>