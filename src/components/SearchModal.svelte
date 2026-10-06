<script>
    import Fuse from 'fuse.js';
    import { searchData } from '../data/searchData.js';
    import { onMount } from 'svelte';

    export let isOpen = false;
    export let onClose = () => {};

    let searchQuery = '';
    let searchResults = [];
    let selectedIndex = 0;
    let fuse;

    // Initialize Fuse.js
    onMount(() => {
        fuse = new Fuse(searchData, {
            keys: [
                { name: 'title', weight: 2 },
                { name: 'description', weight: 1.5 },
                { name: 'category', weight: 1 },
                { name: 'tags', weight: 0.5 }
            ],
            threshold: 0.4,
            includeScore: true,
            includeMatches: true,
            minMatchCharLength: 2,
        });
    });

    // Perform search when query changes
    $: {
        if (searchQuery && searchQuery.length >= 2 && fuse) {
            const results = fuse.search(searchQuery);
            searchResults = results.slice(0, 8); // Show top 8 results
            selectedIndex = 0;
        } else {
            searchResults = [];
            selectedIndex = 0;
        }
    }

    function navigateToResult(result) {
        const path = result.item.path;
        if (path.startsWith('http')) {
            window.open(path, '_blank');
        } else {
            window.location.href = path;
        }
        onClose();
    }

    function handleKeyDown(e) {
        if (e.key === 'Escape') {
            onClose();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, searchResults.length - 1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, 0);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (searchResults.length > 0 && searchResults[selectedIndex]) {
                navigateToResult(searchResults[selectedIndex]);
            }
        }
    }

    function highlightMatch(text, matches) {
        if (!matches || matches.length === 0) return text;

        let result = text;
        const indices = matches[0].indices.sort((a, b) => b[0] - a[0]);

        indices.forEach(([start, end]) => {
            result = result.slice(0, start) +
                    '<mark>' + result.slice(start, end + 1) + '</mark>' +
                    result.slice(end + 1);
        });

        return result;
    }

    function getCategoryIcon(category) {
        const icons = {
            'About': 'fa fa-user',
            'Documentation': 'fa fa-book',
            'Projects': 'fa fa-code',
            'Tools': 'fa fa-wrench',
            'Creative': 'fa fa-paint-brush',
            'Archive': 'fa fa-archive',
            'Navigation': 'fa fa-compass',
            'Technologies': 'fa fa-cogs',
        };
        return icons[category] || 'fa fa-file';
    }

    // Reset when modal opens
    $: if (isOpen) {
        searchQuery = '';
        searchResults = [];
        selectedIndex = 0;
    }
</script>

{#if isOpen}
<div class="search-modal-overlay" on:click={onClose}>
    <div class="search-modal" on:click|stopPropagation>
        <div class="search-header">
            <h3>Search</h3>
            <button class="close-btn" on:click={onClose} aria-label="Close search">
                <i class="fa fa-times"></i>
            </button>
        </div>

        <div class="search-input-wrapper">
            <i class="fa fa-search search-icon"></i>
            <input
                type="text"
                class="search-input"
                placeholder="Search documentation, projects, and more..."
                bind:value={searchQuery}
                on:keydown={handleKeyDown}
                autofocus
            />
            {#if searchQuery}
                <button class="clear-btn" on:click={() => searchQuery = ''} aria-label="Clear search">
                    <i class="fa fa-times"></i>
                </button>
            {/if}
        </div>

        {#if searchResults.length > 0}
        <div class="search-results">
            {#each searchResults as result, index}
                <button
                    class="result-item"
                    class:selected={index === selectedIndex}
                    on:click={() => navigateToResult(result)}
                    on:mouseenter={() => selectedIndex = index}
                >
                    <div class="result-icon">
                        <i class={getCategoryIcon(result.item.category)}></i>
                    </div>
                    <div class="result-content">
                        <div class="result-title">
                            {@html highlightMatch(result.item.title, result.matches?.filter(m => m.key === 'title'))}
                        </div>
                        <div class="result-description">
                            {@html highlightMatch(result.item.description, result.matches?.filter(m => m.key === 'description'))}
                        </div>
                        <div class="result-meta">
                            <span class="result-category">{result.item.category}</span>
                            {#if result.item.path.startsWith('http')}
                                <span class="external-badge">
                                    <i class="fa fa-external-link-alt"></i>
                                </span>
                            {/if}
                        </div>
                    </div>
                </button>
            {/each}
        </div>
        {:else if searchQuery && searchQuery.length >= 2}
        <div class="no-results">
            <i class="fa fa-search"></i>
            <p>No results found for "{searchQuery}"</p>
            <p class="suggestion">Try different keywords or browse categories</p>
        </div>
        {:else if searchQuery && searchQuery.length < 2}
        <div class="search-hint">
            <i class="fa fa-info-circle"></i>
            <p>Type at least 2 characters to search</p>
        </div>
        {:else}
        <div class="search-hint">
            <i class="fa fa-lightbulb"></i>
            <p>Start typing to search across all content</p>
            <div class="quick-links">
                <button on:click={() => searchQuery = 'docker'}>Docker</button>
                <button on:click={() => searchQuery = 'project'}>Projects</button>
                <button on:click={() => searchQuery = 'resume'}>Resume</button>
            </div>
        </div>
        {/if}

        <div class="search-footer">
            <div class="keyboard-hints">
                <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
                <span><kbd>Enter</kbd> Select</span>
                <span><kbd>Esc</kbd> Close</span>
            </div>
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
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        z-index: 10000;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding: 10vh 20px 20px;
        animation: fadeIn 0.2s ease;
        overflow-y: auto;
    }

    .search-modal {
        background: white;
        border-radius: 12px;
        box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.3),
            0 0 40px rgba(59, 130, 246, 0.2);
        border: 1px solid rgba(59, 130, 246, 0.3);
        width: 100%;
        max-width: 650px;
        max-height: 80vh;
        display: flex;
        flex-direction: column;
        animation: slideDown 0.3s ease;
    }

    .search-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 24px;
        border-bottom: 1px solid rgba(59, 130, 246, 0.2);
        flex-shrink: 0;

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

    .search-input-wrapper {
        position: relative;
        padding: 20px 24px;
        border-bottom: 1px solid rgba(59, 130, 246, 0.1);
        flex-shrink: 0;

        .search-icon {
            position: absolute;
            left: 36px;
            top: 50%;
            transform: translateY(-50%);
            color: rgba(59, 130, 246, 0.6);
            font-size: 16px;
        }

        .search-input {
            width: 100%;
            padding: 12px 45px 12px 40px;
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 8px;
            font-size: 16px;
            box-sizing: border-box;

            &:focus {
                outline: none;
                border-color: rgba(59, 130, 246, 0.6);
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            }
        }

        .clear-btn {
            position: absolute;
            right: 36px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: rgba(0, 0, 0, 0.4);
            cursor: pointer;
            padding: 4px 8px;
            font-size: 14px;
            transition: all 0.2s ease;

            &:hover {
                color: rgba(59, 130, 246, 0.9);
            }
        }
    }

    .search-results {
        overflow-y: auto;
        max-height: 400px;
        flex: 1;

        .result-item {
            display: flex;
            align-items: flex-start;
            gap: 15px;
            padding: 16px 24px;
            border: none;
            border-bottom: 1px solid rgba(59, 130, 246, 0.1);
            background: white;
            width: 100%;
            text-align: left;
            cursor: pointer;
            transition: all 0.2s ease;

            &:hover,
            &.selected {
                background: rgba(59, 130, 246, 0.05);
            }

            &.selected {
                border-left: 3px solid rgba(59, 130, 246, 0.8);
            }

            .result-icon {
                flex-shrink: 0;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(59, 130, 246, 0.1);
                border-radius: 8px;
                color: rgba(59, 130, 246, 0.8);
                font-size: 18px;
            }

            .result-content {
                flex: 1;
                min-width: 0;

                .result-title {
                    font-size: 16px;
                    font-weight: 600;
                    color: #000;
                    margin-bottom: 4px;

                    :global(mark) {
                        background: rgba(59, 130, 246, 0.3);
                        color: inherit;
                        padding: 2px 4px;
                        border-radius: 3px;
                    }
                }

                .result-description {
                    font-size: 14px;
                    color: #666;
                    margin-bottom: 6px;
                    line-height: 1.4;

                    :global(mark) {
                        background: rgba(59, 130, 246, 0.2);
                        color: inherit;
                        padding: 1px 3px;
                        border-radius: 2px;
                    }
                }

                .result-meta {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 12px;

                    .result-category {
                        color: rgba(59, 130, 246, 0.8);
                        font-weight: 500;
                    }

                    .external-badge {
                        color: rgba(0, 0, 0, 0.4);
                        font-size: 10px;
                    }
                }
            }
        }
    }

    .no-results,
    .search-hint {
        padding: 60px 24px;
        text-align: center;
        color: #666;

        i {
            font-size: 48px;
            color: rgba(59, 130, 246, 0.3);
            margin-bottom: 16px;
        }

        p {
            margin: 8px 0;
            font-size: 16px;
        }

        .suggestion {
            font-size: 14px;
            color: #999;
        }

        .quick-links {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 20px;

            button {
                padding: 8px 16px;
                background: rgba(59, 130, 246, 0.1);
                border: 1px solid rgba(59, 130, 246, 0.2);
                border-radius: 6px;
                color: rgba(59, 130, 246, 0.9);
                cursor: pointer;
                font-size: 14px;
                transition: all 0.2s ease;

                &:hover {
                    background: rgba(59, 130, 246, 0.2);
                    border-color: rgba(59, 130, 246, 0.4);
                }
            }
        }
    }

    .search-footer {
        padding: 16px 24px;
        background: rgba(59, 130, 246, 0.05);
        border-top: 1px solid rgba(59, 130, 246, 0.2);
        border-radius: 0 0 12px 12px;
        flex-shrink: 0;

        .keyboard-hints {
            display: flex;
            justify-content: center;
            gap: 20px;
            font-size: 13px;
            color: #666;

            span {
                display: flex;
                align-items: center;
                gap: 6px;
            }

            kbd {
                background: white;
                border: 1px solid rgba(59, 130, 246, 0.3);
                border-radius: 4px;
                padding: 3px 8px;
                font-family: monospace;
                font-size: 12px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                min-width: 24px;
                text-align: center;
            }
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

    @media (max-width: 768px) {
        .search-modal {
            max-height: 90vh;
        }

        .search-results {
            max-height: 300px;
        }

        .result-item {
            padding: 12px 16px;

            .result-icon {
                width: 36px;
                height: 36px;
                font-size: 16px;
            }

            .result-content .result-title {
                font-size: 15px;
            }
        }

        .keyboard-hints {
            flex-wrap: wrap;
            gap: 10px !important;
        }
    }
</style>
