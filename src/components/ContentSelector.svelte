<script>
    import TabMenu from './TabMenu.svelte';
    import { content } from './ContentStore.svelte';
    import { onDestroy } from 'svelte';

    export let dark = false;

    let currentMode = 'it';
    const modes = ['IT', 'Art'];

    const unsubscribe = content.subscribe((mode) => {
        currentMode = mode;
    });

    onDestroy(unsubscribe);

    function handleModeChange(selected) {
        const mode = selected.toLowerCase();
        content.setMode(mode);
    }

    // Map current mode to display value
    $: activeMode = currentMode === 'it' ? 'IT' : 'Art';
</script>

<TabMenu names={modes} active={activeMode} clickHandler={handleModeChange} activeIsName {dark} />
