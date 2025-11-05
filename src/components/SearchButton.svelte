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
        background: white;
        border: 2px solid black;
        border-radius: 8px;
        cursor: pointer;
        font-size: 0.95em;
        transition: all 0.2s;
        color: #666;

        &:hover {
            background: rgba(0, 0, 0, 0.05);
            color: black;
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
