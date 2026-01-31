<script lang="ts">
    import { base } from '$app/paths';
	import { page } from "$app/stores";
	import { activeSection } from "$lib/stores";
	import { siteConfig } from "$lib/config/site";
	import { cn } from "$lib/utils";
</script>

<div class="hidden md:flex w-full justify-between">
	<a href="{base}/" class="flex items-center space-x-2">
		<span class="hidden text-2xl font-bold sm:inline-block">
			{siteConfig.name}
		</span>
	</a>
	<nav class="flex items-center space-x-6 text-sm font-semibold">
		{#each siteConfig.routes as navItem}
			<a
				href={navItem.href}
				class={cn(
					"py-1 transition-colors hover:text-primary",
					activeSection?.toLowerCase() === navItem.title.toLowerCase()
						? "text-primary border-t-2 border-primary"
						: "text-foreground"
				)}
				target={navItem.external ? "_blank" : undefined}
				rel={navItem.external ? "noreferrer" : undefined}
			>
                {navItem.title}
			</a>
		{/each}
	</nav>
</div>
