<script lang="ts">
	import { base } from '$app/paths';
	import { siteConfig } from '$lib/config/site';
	import Icon from '@iconify/svelte';

	const currentYear = new Date().getFullYear();
</script>

<footer
	class="border-t border-border bg-muted/50 mt-20"
	aria-label="Site footer"
>
	<div class="mx-auto flex max-w-[1400px] flex-col gap-10 px-4 py-10 sm:px-6 md:px-8 lg:px-20 xl:px-40 2xl:px-60 sm:py-12">
		<div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
			<!-- Quick navigation -->
			<nav
				class="flex flex-col gap-3"
				aria-label="Footer navigation"
			>
				<h2 class="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
					Navigate
				</h2>
				<ul class="flex flex-col gap-2" role="list">
					{#each siteConfig.routes as route}
						<li>
							<a
								href={route.href}
								class="inline-flex w-fit items-center text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
								{...(route.external
									? {
											target: '_blank',
											rel: 'noopener noreferrer',
											'aria-label': `${route.title} (opens in new window)`
										}
									: {})}
							>
								{route.title}
							</a>
						</li>
					{/each}
					<li>
						<a
							href="{base}/generated-pdf/khulvey_resume.pdf"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex w-fit items-center text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
							aria-label="Download resume (opens in new window)"
						>
							Resume
						</a>
					</li>
				</ul>
			</nav>

			<!-- Connect -->
			<div class="flex flex-col gap-3">
				<h2 class="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
					Connect
				</h2>
				<ul class="flex flex-col gap-2" role="list">
					<li>
						<a
							href="mailto:{siteConfig.authorEmail}"
							class="inline-flex w-fit items-center gap-2 text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
							aria-label="Email {siteConfig.author}"
						>
							<Icon icon="lucide:mail" class="h-4 w-4 shrink-0" aria-hidden="true" />
							<span>{siteConfig.authorEmail}</span>
						</a>
					</li>
					<li>
						<a
							href={siteConfig.links.github}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex w-fit items-center gap-2 text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
							aria-label="GitHub profile (opens in new window)"
						>
							<Icon icon="lucide:github" class="h-4 w-4 shrink-0" aria-hidden="true" />
							<span>GitHub</span>
						</a>
					</li>
					<li>
						<a
							href={siteConfig.links.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex w-fit items-center gap-2 text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
							aria-label="LinkedIn profile (opens in new window)"
						>
							<Icon icon="lucide:linkedin" class="h-4 w-4 shrink-0" aria-hidden="true" />
							<span>LinkedIn</span>
						</a>
					</li>
				</ul>
			</div>

			<!-- About / Legal -->
			<div class="flex flex-col gap-3 sm:col-span-2 lg:col-span-1">
				<h2 class="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
					Portfolio
				</h2>
				<p class="text-sm text-muted-foreground max-w-xs">
					{siteConfig.name} - Full Stack Software Developer. Built with
					<a
						href="https://kit.svelte.dev"
						target="_blank"
						rel="noopener noreferrer"
						class="text-primary underline decoration-primary/50 underline-offset-2 transition-colors hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
						aria-label="SvelteKit (opens in new window)"
					>
						SvelteKit
					</a>.
				</p>
			</div>
		</div>

		<!-- Copyright bar -->
		<div
			class="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center"
			role="contentinfo"
			aria-label="Copyright and legal"
		>
			<p class="text-sm text-muted-foreground">
				&copy; <time datetime={String(currentYear)}>{currentYear}</time> {siteConfig.name}. All rights reserved.
			</p>
			<p class="text-xs text-muted-foreground">
				<a
					href="{base}/#contact"
					class="text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
				>
					Contact
				</a>
				&nbsp;&middot;&nbsp;
				<a
					href="{base}/#intro"
					class="text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
				>
					Back to top
				</a>
			</p>
		</div>
	</div>
</footer>
