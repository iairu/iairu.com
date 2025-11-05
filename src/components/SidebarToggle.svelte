<script>
    export let onClick = () => {};
    export let isOpen = false;
</script>

<button
    class="sidebar-toggle"
    on:click={onClick}
    aria-label={isOpen ? "Close menu" : "Open menu"}
    aria-expanded={isOpen}
>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        {#if isOpen}
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        {:else}
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
        {/if}
    </svg>
</button>

<style lang="scss" global>
    .sidebar-toggle {
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 101;
        background: white;
        border: 2px solid black;
        border-radius: 8px;
        padding: 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;

        &:hover {
            background: rgba(0, 0, 0, 0.05);
        }

        &:active {
            transform: scale(0.95);
        }

        svg {
            display: block;
        }

        @media (min-width: 1200px) {
            display: none;
        }

        @media print {
            display: none;
        }
    }
</style>
