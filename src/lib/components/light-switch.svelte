<script lang="ts">
	import { onMount } from 'svelte';
    import Icon from "@iconify/svelte";
	import { Popover, PopoverTrigger, PopoverContent } from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	type Theme = 'light' | 'dark' | 'system';

	let theme: Theme = 'system';
	/** Reflects current visual state for the trigger icon (sun vs moon). */
	let effectiveDark = false;
	let popoverOpen = false;

	function apply(t: Theme) {
		if (t === 'system') {
			localStorage.removeItem('theme');
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			document.documentElement.classList.toggle('dark', prefersDark);
			effectiveDark = prefersDark;
		} else {
			localStorage.setItem('theme', t);
			document.documentElement.classList.toggle('dark', t === 'dark');
			effectiveDark = t === 'dark';
		}
	}

	function selectTheme(t: Theme) {
		theme = t;
		apply(theme);
		popoverOpen = false;
	}

	onMount(() => {
		const stored = localStorage.getItem('theme') as Theme | null;
		theme = stored ?? 'system';
		apply(theme);

		const media = window.matchMedia('(prefers-color-scheme: dark)');
		const handler = (e: MediaQueryListEvent) => {
			if (!localStorage.getItem('theme')) {
				document.documentElement.classList.toggle('dark', e.matches);
				effectiveDark = e.matches;
			}
		};

		media.addEventListener('change', handler);
		return () => media.removeEventListener('change', handler);
	});
</script>

<svelte:head>
	<script>
		(function () {
			try {
				const stored = localStorage.getItem('theme');
				const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
				const theme = stored ?? (prefersDark ? 'dark' : 'light');
				if (theme === 'dark') document.documentElement.classList.add('dark');
			} catch {}
		})();
	</script>
</svelte:head>

<Popover bind:open={popoverOpen}>
	<PopoverTrigger>
		<Button
			variant="outline"
			size="sm"
			class="w-9 px-0 rounded-full"
			aria-label="Theme"
		>
			{#if effectiveDark}
                <Icon icon="lucide:moon" class="size-[1.125rem]" />
			{:else}
                <Icon icon="lucide:sun" class="size-[1.125rem]" />
			{/if}
		</Button>
	</PopoverTrigger>
	<PopoverContent class="w-40 p-2" align="end">
		<ul class="flex flex-col gap-0.5" role="listbox" aria-label="Theme options">
			<li>
				<button
					type="button"
					role="option"
					aria-selected={theme === 'system'}
					class={cn(
						'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent',
						theme === 'system' && 'bg-accent'
					)}
					on:click={() => selectTheme('system')}
				>
                    <Icon icon="lucide:monitor" class="size-4 shrink-0" />
					System
				</button>
			</li>
			<li>
				<button
					type="button"
					role="option"
					aria-selected={theme === 'light'}
					class={cn(
						'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent',
						theme === 'light' && 'bg-accent'
					)}
					on:click={() => selectTheme('light')}
				>
                    <Icon icon="lucide:sun" class="size-4 shrink-0" />
					Light
				</button>
			</li>
			<li>
				<button
					type="button"
					role="option"
					aria-selected={theme === 'dark'}
					class={cn(
						'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent',
						theme === 'dark' && 'bg-accent'
					)}
					on:click={() => selectTheme('dark')}
				>
					<Icon icon="lucide:moon" class="size-4 shrink-0" />
					Dark
				</button>
			</li>
		</ul>
	</PopoverContent>
</Popover>
