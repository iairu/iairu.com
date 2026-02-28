<script>
    import { content, sidebarCollapsed } from './ContentStore.svelte';
    import { lang } from './LangStore.svelte';
    import { onMount } from 'svelte';

    export let isOpen = false; // Control sidebar visibility

    // Define the sidebar structure - only includes files that actually exist
    const itStructure = {
        'Documentation': [
            { title: 'IPTables Port Forwarding', slug: 'iptables-portforward', lang: 'en' },
        ],
        'Tools': [
            { title: 'AutoHotkey Scripts', slug: 'ahk', lang: 'sk' },
            { title: 'IPv4 Calculator', slug: 'ipv4-calc', lang: 'sk' },
        ],
        'Projects': [
            { title: 'Development Log', slug: 'log', lang: 'sk' },
        ]
    };

    const artStructure = {
        'Comics': [
            { title: 'Comics', slug: 'comics', lang: 'en' },
            { title: 'Komiksy', slug: 'komixy', lang: 'sk' },
        ],
    };

    let currentMode = 'it';
    let currentLang = 'en';
    let openSections = {};
    let isCollapsed = false;

    content.subscribe(mode => {
        currentMode = mode;
    });

    lang.subscribe(l => {
        currentLang = l.current;
    });

    sidebarCollapsed.subscribe(collapsed => {
        isCollapsed = collapsed;
    });

    function toggleSidebar() {
        sidebarCollapsed.update(n => !n);
    }

    function toggleSection(section) {
        openSections[section] = !openSections[section];
    }

    function getStructure() {
        return currentMode === 'it' ? itStructure : artStructure;
    }

    // Initialize all sections as open
    onMount(() => {
        const structure = getStructure();
        Object.keys(structure).forEach(key => {
            openSections[key] = true;
        });
    });

    function getLink(item) {
        const basePath = currentMode === 'it' ? 'dev' : 'art';
        const itemLang = item.lang || currentLang;
        return `/${itemLang}/${basePath}/${item.slug}`;
    }
</script>

<aside class="sidebar" class:open={isOpen} class:collapsed={isCollapsed}>
    <div class="sidebar-content">
        <div class="sidebar-header-row">
            <h3 class="sidebar-title" style="color: {currentMode === 'it' ? 'rgba(59, 130, 246, 1)' : 'rgba(16, 185, 129, 1)'}; border-bottom-color: {currentMode === 'it' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(16, 185, 129, 0.5)'}">
                {currentMode === 'it' ? 'IT Garden' : 'Art Garden'}
            </h3>
            <button class="collapse-toggle" on:click={toggleSidebar} title="Toggle Sidebar">
                <i class="fa fa-chevron-left"></i>
            </button>
        </div>

        <div class="sidebar-scrollable" class:collapsed-hide={isCollapsed}>
            {#each Object.entries(getStructure()) as [section, items]}
            <div class="sidebar-section">
                <button
                    class="section-header"
                    on:click={() => toggleSection(section)}
                    class:open={openSections[section]}
                >
                    <i class="fa fa-{openSections[section] ? 'chevron-down' : 'chevron-right'}"></i>
                    <span class="section-title">{section}</span>
                    <span class="section-count">({items.length})</span>
                </button>

                {#if openSections[section]}
                    <div class="section-items">
                        {#if items.length === 0}
                            <span class="empty-message">Coming soon...</span>
                        {:else}
                            {#each items as item}
                                <a href={getLink(item)} class="sidebar-link">
                                    {item.title}
                                </a>
                            {/each}
                        {/if}
                    </div>
                {/if}
            </div>
        {/each}
        </div>
    </div>
    
    {#if isCollapsed}
    <div class="collapsed-sidebar-pill">
        <button class="expand-toggle" on:click={toggleSidebar} title="Expand Sidebar">
            <i class="fa fa-chevron-right"></i>
        </button>
    </div>
    {/if}
</aside>

<style lang="scss" global>
    aside.sidebar {
        position: fixed;
        top: 0;
        left: 0;
        width: 280px;
        height: 100vh;
        overflow-y: auto;
        padding: 80px 20px 20px 20px;
        border-right: 1px solid rgba(var(--theme-color-rgb), 0.2);
        background: rgba(255, 255, 255, 0.95);
        
        :global(body.dark-theme) & {
            background: rgba(10, 10, 12, 0.95);
            border-right-color: rgba(255, 255, 255, 0.1);
        }

        backdrop-filter: blur(10px);
        flex-shrink: 0;
        transform: translateX(-100%);
        transition: transform 0.3s ease-in-out;
        z-index: 100;
        box-shadow:
            2px 0 20px rgba(var(--theme-color-rgb), 0.1),
            inset -1px 0 0 rgba(255, 255, 255, 0.1);

        &.open {
            transform: translateX(0);
        }

        &::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 1px;
            height: 100%;
            background: linear-gradient(180deg,
                transparent,
                rgba(var(--theme-color-rgb), 0.3),
                transparent);
        }

        @media (min-width: 1200px) {
            position: sticky;
            top: 0;
            transform: translateX(0);
            height: 100vh;
            max-height: 100vh;
            padding: 20px;
            border: none;
            border-right: 1px solid rgba(var(--theme-color-rgb), 0.2);
            border-radius: 0;
            z-index: 10;
            box-shadow:
                2px 0 20px rgba(var(--theme-color-rgb), 0.08),
                inset -1px 0 0 rgba(255, 255, 255, 0.1);
                
            &.collapsed {
                width: 60px;
                padding: 20px 10px;
                transition: width 0.3s ease-in-out;
                
                .sidebar-content {
                    opacity: 0;
                    pointer-events: none;
                    visibility: hidden;
                    transition: opacity 0.2s ease-in-out;
                }

                &:hover {
                    width: 280px;
                    padding: 20px;
                    border-right: 1px solid rgba(var(--theme-color-rgb), 0.2);

                    .sidebar-content {
                        opacity: 1;
                        pointer-events: auto;
                        visibility: visible;

                        .sidebar-scrollable {
                            display: block !important;
                        }
                    }

                    .collapsed-sidebar-pill {
                        opacity: 0;
                        pointer-events: none;
                        visibility: hidden;
                    }
                }
            }
        }

        .sidebar-content {
            display: flex;
            flex-direction: column;
            gap: 5px;
            transition: opacity 0.2s ease;
        }

        .sidebar-header-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            border-bottom: 2px solid transparent; /* Replaced by inline styles */
        }
        
        .collapse-toggle {
            background: transparent;
            border: 1px solid rgba(128, 128, 128, 0.2);
            color: inherit;
            cursor: pointer;
            padding: 4px 8px;
            font-size: 0.8rem;
            transition: all 0.2s;
            
            &:hover {
                background: rgba(128, 128, 128, 0.1);
            }
            
            :global(body.dark-theme) & {
                color: rgba(255,255,255,0.7);
            }

            @media (max-width: 1199px) {
                display: none;
            }
        }
        
        .collapsed-sidebar-pill {
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            transition: opacity 0.2s ease;
            
            .expand-toggle {
                background: rgba(var(--theme-color-rgb), 0.1);
                border: 1px solid rgba(var(--theme-color-rgb), 0.3);
                color: rgba(var(--theme-color-rgb), 1);
                cursor: pointer;
                padding: 8px 12px;
                transition: all 0.2s;
                
                &:hover {
                    background: rgba(var(--theme-color-rgb), 0.2);
                }
            }

            @media (max-width: 1199px) {
                display: none;
            }
        }
        
        .sidebar-scrollable {
            &.collapsed-hide {
                @media (min-width: 1200px) {
                    display: none;
                }
            }
        }

        .sidebar-title {
            margin: 0;
            padding-bottom: 5px;
            font-size: 1.2em;
            font-weight: bold;
            transition: color 0.3s;
        }

        .sidebar-section {
            margin-bottom: 5px;
        }

        .section-header {
            display: flex;
            align-items: center;
            gap: 8px;
            width: 100%;
            padding: 8px 10px;
            background: transparent;
            border: 1px solid rgba(var(--theme-color-rgb), 0.2);
            border-radius: 0;
            cursor: pointer;
            font-weight: bold;
            font-size: 0.95em;
            transition: all 0.2s;
            text-align: left;
            color: black;

            :global(body.dark-theme) & {
                color: rgba(255, 255, 255, 0.85);
            }
            position: relative;
            overflow: hidden;

            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg,
                    transparent,
                    rgba(var(--theme-color-rgb), 0.1),
                    transparent);
                transition: left 0.3s;
            }

            &:hover {
                background: rgba(var(--theme-color-rgb), 0.05);
                border-color: rgba(var(--theme-color-rgb), 0.4);
                box-shadow: 0 0 10px rgba(var(--theme-color-rgb), 0.1);

                &::before {
                    left: 100%;
                }
            }

            i {
                font-size: 0.85em;
                width: 12px;
            }

            .section-title {
                flex: 1;
            }

            .section-count {
                font-size: 0.85em;
                opacity: 0.6;
            }
        }

        .section-items {
            display: flex;
            flex-direction: column;
            margin-top: 5px;
            margin-left: 10px;
            padding-left: 10px;
            border-left: 2px solid rgba(0, 0, 0, 0.1);
        }

        .sidebar-link {
            padding: 6px 10px;
            text-decoration: none;
            color: black;
            
            :global(body.dark-theme) & {
                color: rgba(255, 255, 255, 0.85);
            }
            border-radius: 0;
            font-size: 0.9em;
            transition: all 0.2s;
            display: block;

            &:hover {
                background: rgba(0, 0, 0, 0.05);
                padding-left: 15px;
            }
        }

        .empty-message {
            padding: 6px 10px;
            font-size: 0.85em;
            font-style: italic;
            opacity: 0.5;
        }

        /* Scrollbar styling */
        &::-webkit-scrollbar {
            width: 6px;
        }

        &::-webkit-scrollbar-track {
            background: transparent;
        }

        &::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 0;

            &:hover {
                background: rgba(0, 0, 0, 0.3);
            }
        }
    }
</style>
