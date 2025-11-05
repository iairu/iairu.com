<script>
    export let isOpen = false;
    export let onClose = () => {};

    let searchQuery = '';

    function handleSearch() {
        if (!searchQuery.trim()) return;
        // Perform search - could navigate or filter results
        window.location.href = `/en/dev/about?search=${encodeURIComponent(searchQuery)}`;
        onClose();
    }

    function handleKeyDown(e) {
        if (e.key === 'Escape') {
            onClose();
        } else if (e.key === 'Enter') {
            handleSearch();
        }
    }
</script>

{#if isOpen}
<div class="search-modal-overlay" on:click={onClose}>
    <div class="search-modal" on:click|stopPropagation>
        <div class="search-header">
            <h3>Search</h3>
            <button class="close-btn" on:click={onClose}>
                <i class="fa fa-times"></i>
            </button>
        </div>
        <div class="search-body">
            <input
                type="text"
                class="search-input"
                placeholder="Search documentation, projects, and more..."
                bind:value={searchQuery}
                on:keydown={handleKeyDown}
                autofocus
            />
            <button class="search-submit" on:click={handleSearch}>
                <i class="fa fa-search"></i>
                Search
            </button>
        </div>
        <div class="search-footer">
            <kbd>Enter</kbd> to search • <kbd>Esc</kbd> to close
        </div>
    </div>
</div>
{/if}

<style lang="scss">
    .search-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
        z-index: 10000;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding-top: 10vh;
        animation: fadeIn 0.2s ease;
    }

    .search-modal {
        background: white;
        border-radius: 12px;
        box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.3),
            0 0 40px rgba(59, 130, 246, 0.2);
        border: 1px solid rgba(59, 130, 246, 0.3);
        width: 90%;
        max-width: 600px;
        animation: slideDown 0.3s ease;
    }

    .search-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid rgba(59, 130, 246, 0.2);

        h3 {
            margin: 0;
            font-size: 18px;
            font-weight: 600;
            color: #000;
        }

        .close-btn {
            background: none;
            border: none;
            color: rgba(0, 0, 0, 0.6);
            cursor: pointer;
            padding: 4px 8px;
            font-size: 18px;
            transition: all 0.2s ease;

            &:hover {
                color: rgba(59, 130, 246, 0.9);
            }
        }
    }

    .search-body {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 15px;

        .search-input {
            padding: 12px 16px;
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 8px;
            font-size: 16px;
            width: 100%;
            box-sizing: border-box;

            &:focus {
                outline: none;
                border-color: rgba(59, 130, 246, 0.6);
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            }
        }

        .search-submit {
            padding: 12px 24px;
            background: rgba(59, 130, 246, 0.9);
            border: none;
            border-radius: 8px;
            color: white;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.2s ease;

            &:hover {
                background: rgba(59, 130, 246, 1);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            }

            i {
                font-size: 14px;
            }
        }
    }

    .search-footer {
        padding: 15px 20px;
        background: rgba(59, 130, 246, 0.05);
        border-top: 1px solid rgba(59, 130, 246, 0.2);
        border-radius: 0 0 12px 12px;
        font-size: 13px;
        color: #666;
        text-align: center;

        kbd {
            background: white;
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 4px;
            padding: 2px 6px;
            font-family: monospace;
            font-size: 12px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
