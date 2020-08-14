<script>
	import TabMenu from './TabMenu.svelte';
    export let names = [];
    export let active = names.length ? names[0] : undefined;
    export let hideMenu = false;
</script>

{#if names.length}
<section class="tabs" class:frame={!hideMenu}>
    {#if !hideMenu}<TabMenu {names} bind:active={active} />{/if}
    <div class="content">
        <slot {active} {names} />
    </div>
</section>
{/if}

<style lang="scss" global>
    section.tabs {
        >div.menu {
            display: inline-flex;
            @media print { display: none; }
            flex-flow: row;
            border: 1px solid rgba(0,0,0,0.2);
            border-bottom: none;
            border-radius: 5px 5px 0 0;
            @media print { border-radius: 5px; }
            overflow: hidden;
            margin-bottom: -1px;
            button {
                background: #fff;
                border: none;
                cursor: pointer;
                border-right: 1px solid rgba(0,0,0,0.2);
                border-bottom: 1px solid rgba(0,0,0,0.2);
                color: black;
                padding: 5px 15px;
                &:last-of-type {border-right: none;}
                &.active {
                    background: #f1f1f1;
                    border-bottom: none;
                    cursor: default;
                    outline: none;
                }
                &:not(.active):focus {
                    background: #f8f8f8;
                }
            }
        }
        &.frame>div.content {
            background: #f1f1f1;
            border: 1px solid rgba(0,0,0,0.2);
            padding: 5px 15px;
            border-radius: 0 5px 5px 5px;
        }
    }
</style>