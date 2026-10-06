<script>
    export let onClick = () => {};
</script>

<button
    class="search-button"
    on:click={onClick}
    aria-label="Search"
>
    <i class="fa fa-search"></i>
    <span class="search-text">Search</span>
    <kbd class="search-kbd">
        <span class="kbd-modifier">⌘</span>
        <span class="kbd-key">K</span>
    </kbd>
</button>

<style lang="scss" global>
    .search-button {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 16px;
        background: rgba(59, 130, 246, 0.05);
        border: 1px solid rgba(59, 130, 246, 0.2);
        border-radius: 8px;
        cursor: pointer;
        font-size: 0.95em;
        transition: all 0.2s;
        color: rgba(59, 130, 246, 0.9);

        &:hover {
            background: rgba(59, 130, 246, 0.1);
            border-color: rgba(59, 130, 246, 0.4);
            transform: translateY(-1px);
        }

        .fa-search {
            font-size: 0.9em;
        }

        .search-text {
            @media (max-width: 600px) {
                display: none;
            }
        }

        .search-kbd {
            display: flex;
            align-items: center;
            gap: 3px;
            margin-left: auto;
            padding: 2px 6px;
            background: #f5f5f5;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 0.85em;
            font-family: monospace;

            @media (max-width: 850px) {
                display: none;
            }

            .kbd-modifier, .kbd-key {
                font-weight: 600;
            }
        }

        @media print {
            display: none;
        }
    }
</style>
