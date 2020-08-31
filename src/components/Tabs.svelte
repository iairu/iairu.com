<script>
	import TabMenu from './TabMenu.svelte';
    export let names = [];
    export let active = 0;
    export let hideMenu = false;
</script>

{#if names.length}
<section class="tabs" class:frame={!hideMenu}>
    {#if !hideMenu}<TabMenu {names} bind:active={active} attached />{/if}
    <div class="content">
        <slot {active} />
    </div>
</section>
{/if}

<style lang="scss" global>
    section.tabs {
        display: flex;
        flex-flow: column;
        align-items: flex-start;
        &.frame>div.content {
            align-self: stretch;
            flex-grow: 1;
            background: #f1f1f1;
            border: 1px solid rgba(0,0,0,0.2);
            padding: 5px 15px;
            border-radius: 0 5px 5px 5px;
        }
    }
</style>