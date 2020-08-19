<script>
    export let names = [];
    export let active = 0;
</script>

{#if names.length}
<div class="menu">
    {#each names as tab, i}
        <button class:active={active === i} on:click={()=>{active = i;}} tabindex={active === i ? "-1" : "0"}>{tab}</button>
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