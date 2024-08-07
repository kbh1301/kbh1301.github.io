<script lang="ts">
    import Icon from '@iconify/svelte';

    export let skill;
</script>

<div class="flex flex-col items-center w-32 h-30 border-2 border-muted-foreground rounded-lg p-6 relative">
    <Icon icon={skill.icon} class="text-secondary h-10 w-auto m-3 mb-5" />
    <strong class="bg-background -mb-9 px-3">{skill.name}</strong>
</div>
