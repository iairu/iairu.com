<script>
    import { content } from './ContentStore.svelte';
    import { lang } from './LangStore.svelte';
    import { onMount } from 'svelte';
    import HighlightThumb from './HighlightThumb.svelte';

    export let isOpen = false; // Control sidebar visibility

    // Define the sidebar structure
    const itStructure = {
        'About': [
            { title: 'About Me', slug: 'about' },
            { title: 'Resume', slug: 'resume' },
        ],
        'Documentation': [
            { title: 'IPTables Port Forwarding', slug: 'iptables-portforward' },
            { title: 'Docker Best Practices', slug: 'docker-guide' },
        ],
        'Guides': [],
        'Tools': [
            { title: 'AutoHotkey Scripts', slug: 'ahk' },
            { title: 'IPv4 Calculator', slug: 'ipv4-calc' },
        ],
        'Projects': [
            { title: 'Development Log', slug: 'log' },
        ]
    };

    const artStructure = {
        'Art': [
            { title: 'Digital Art Portfolio', slug: 'digital-art' },
        ],
        'Music': [
            { title: 'Lyric Translations', slug: 'music-translations' },
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

<aside class="sidebar" class:open={isOpen}>
    <div class="sidebar-content">
        <h3 class="sidebar-title">
            {currentMode === 'it' ? 'IT Garden' : 'Art Garden'}
        </h3>

        <!-- Featured/Highlight items -->
        <div class="highlights-section">
            {#if currentMode === 'it'}
                <HighlightThumb
                    title="Resume"
                    desc="Full-stack developer & DevOps engineer"
                    link="/{currentLang}/dev/resume"
                    icon="fa fa-id-card"
                    badge="Featured"
                    status="updated"
                />
                <HighlightThumb
                    title="Docker Guide"
                    desc="Best practices for containerization"
                    link="/{currentLang}/dev/docker-guide"
                    icon="fab fa-docker"
                    metric="5 min read"
                    status="hot"
                />
            {:else}
                <HighlightThumb
                    title="Digital Art"
                    desc="Portfolio showcase"
                    link="/{currentLang}/dev/digital-art"
                    icon="fa fa-paint-brush"
                    badge="Portfolio"
                    status="new"
                />
            {/if}
        </div>

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
        border-right: 1px solid rgba(59, 130, 246, 0.2);
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        flex-shrink: 0;
        transform: translateX(-100%);
        transition: transform 0.3s ease-in-out;
        z-index: 100;
        box-shadow:
            2px 0 20px rgba(59, 130, 246, 0.1),
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
                rgba(59, 130, 246, 0.3),
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
            border-right: 1px solid rgba(59, 130, 246, 0.2);
            border-radius: 0;
            z-index: 1;
            box-shadow:
                2px 0 20px rgba(59, 130, 246, 0.08),
                inset -1px 0 0 rgba(255, 255, 255, 0.1);
        }

        .sidebar-content {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }

        .highlights-section {
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid rgba(59, 130, 246, 0.2);
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
            border: 1px solid rgba(59, 130, 246, 0.2);
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            font-size: 0.95em;
            transition: all 0.2s;
            text-align: left;
            color: black;
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
                    rgba(59, 130, 246, 0.1),
                    transparent);
                transition: left 0.3s;
            }

            &:hover {
                background: rgba(59, 130, 246, 0.05);
                border-color: rgba(59, 130, 246, 0.4);
                box-shadow: 0 0 10px rgba(59, 130, 246, 0.1);

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
