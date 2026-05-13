<script lang="ts">
    import Icon from '@iconify/svelte';

    export let skill;
</script>

<div class="group flex flex-col items-center w-32 h-30 border-2 border-muted-foreground/50 rounded-lg p-6 relative hover:-translate-y-1.5 hover:border-foreground/50 transition-all duration-200 cursor-default">
    <Icon icon={skill.icon} class="text-secondary h-10 w-auto m-3 mb-5" />
    <strong class="bg-background -mb-9 px-3 text-muted-foreground group-hover:text-foreground transition-colors duration-200">{skill.name}</strong>
</div>
