<script>
    import { content } from './ContentStore.svelte';
    import { lang } from './LangStore.svelte';
    import { onMount } from 'svelte';

    // Define the sidebar structure
    const itStructure = {
        'About': [
            { title: 'About Me', slug: 'about', lang: 'en' },
            { title: 'Resume', slug: 'resume', lang: 'en' },
        ],
        'Documentation': [
            { title: 'IPTables Port Forwarding', slug: 'iptables-portforward', lang: 'en' },
            { title: 'Docker Best Practices', slug: 'docker-guide', lang: 'en' },
        ],
        'Guides': [],
        'Tools': [
            { title: 'AutoHotkey Scripts', slug: 'ahk', lang: 'sk' },
            { title: 'IPv4 Calculator', slug: 'ipv4-calc', lang: 'sk' },
        ],
        'Projects': [
            { title: 'Development Log', slug: 'log', lang: 'sk' },
        ]
    };

    const artStructure = {
        'Art': [
            { title: 'Digital Art Portfolio', slug: 'digital-art', lang: 'en' },
        ],
        'Music': [
            { title: 'Lyric Translations', slug: 'music-translations', lang: 'en' },
        ],
        'Religion': []
    };

    let currentMode = 'it';
    let currentLang = 'en';
    let openSections = {};

    content.subscribe(mode => {
        currentMode = mode;
    });

    lang.subscribe(l => {
        currentLang = l.current;
    });

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
        return `/${currentLang}/dev/${item.slug}`;
    }
</script>

<aside class="sidebar">
    <div class="sidebar-content">
        <h3 class="sidebar-title">
            {currentMode === 'it' ? 'IT Garden' : 'Art Garden'}
        </h3>

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
                                {#if !item.lang || item.lang === currentLang}
                                    <a href={getLink(item)} class="sidebar-link">
                                        {item.title}
                                    </a>
                                {/if}
                            {/each}
                        {/if}
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</aside>

<style lang="scss" global>
    aside.sidebar {
        position: sticky;
        top: 20px;
        width: 280px;
        max-height: calc(100vh - 40px);
        overflow-y: auto;
        padding: 20px;
        border: 2px solid black;
        border-radius: 10px;
        background: white;
        flex-shrink: 0;

        @media (max-width: 1200px) {
            display: none;
        }

        .sidebar-content {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .sidebar-title {
            margin: 0 0 15px 0;
            padding-bottom: 10px;
            border-bottom: 2px solid black;
            font-size: 1.2em;
            font-weight: bold;
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
            border: 1px solid black;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            font-size: 0.95em;
            transition: all 0.2s;
            text-align: left;
            color: black;

            &:hover {
                background: rgba(0, 0, 0, 0.05);
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
            border-radius: 4px;
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
            border-radius: 3px;

            &:hover {
                background: rgba(0, 0, 0, 0.3);
            }
        }
    }
</style>
