<script>
    export let names = [];
    export let active = names.length ? names[0] : undefined;
</script>

{#if names.length}
<div class="menu">
    {#each names as tab}
        <button class:active={active === tab} on:click={()=>{active = tab;}} tabindex={active === tab ? "-1" : "0"}>{tab}</button>
    {/each}
</div>
{/if}

<style lang="scss" global>
    .menu {
        @media print {
            display: none;
        }
    }
</style>