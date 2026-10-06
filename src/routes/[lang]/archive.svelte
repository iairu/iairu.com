<script>
    import SpiderWeb from '../../components/SpiderWeb.svelte';
    import S from '../../components/Section.svelte';
    import { lang } from '../../components/LangStore.svelte';

    let l;
    $: l = $lang.current;
    $: SK = l === 'sk';

    const archivedProjects = [
        { year: 2023, title: 'Old Portfolio v1', type: 'website', tags: 'html, css, javascript' },
        { year: 2022, title: 'University Projects', type: 'academic', tags: 'java, python, c++' },
        { year: 2021, title: 'Learning Experiments', type: 'sandbox', tags: 'react, vue, svelte' },
        { year: 2020, title: 'First Attempts', type: 'beginner', tags: 'html, css' }
    ];
</script>

<svelte:head>
    <title>{SK ? 'Archív' : 'Archive'} :: Ondrej Špánik</title>
    <meta name="description" content={SK ? 'Archív starých projektov a experimentov' : 'Archive of old projects and experiments'}>
</svelte:head>

<S icon="fa fa-archive" name={SK ? "Archív" : "Archive"} slug="archive" pt pb>
    <div class="archive-container">
        <div class="web-center">
            <SpiderWeb size={300} animate={true} />
        </div>

        <div class="archive-intro">
            <p>
                {#if SK}
                    Vitajte v archíve. Tu nájdete staršie projekty, experimenty a práce, ktoré už nie sú aktívne udržiavané,
                    ale reprezentujú môj vývojársky postup a učenie sa.
                {:else}
                    Welcome to the archive. Here you'll find older projects, experiments, and work that are no longer actively maintained,
                    but represent my development journey and learning process.
                {/if}
            </p>
        </div>

        <div class="archive-grid">
            {#each archivedProjects as project}
                <div class="archive-item tech-border corner-accent">
                    <div class="item-year">{project.year}</div>
                    <h3 class="item-title">{project.title}</h3>
                    <div class="item-type">{project.type}</div>
                    <div class="item-tags">{project.tags}</div>
                    <div class="item-status">
                        <span class="archived-badge">
                            <i class="fa fa-archive"></i>
                            {SK ? 'Archivované' : 'Archived'}
                        </span>
                    </div>
                </div>
            {/each}
        </div>

        <div class="archive-note">
            <p>
                <i class="fa fa-info-circle"></i>
                {#if SK}
                    Niektoré projekty môžu byť nedostupné alebo len čiastočne funkčné.
                {:else}
                    Some projects may be unavailable or only partially functional.
                {/if}
            </p>
        </div>
    </div>
</S>

<style lang="scss">
    .archive-container {
        max-width: 1200px;
        margin: 0 auto;
        position: relative;
    }

    .web-center {
        display: flex;
        justify-content: center;
        margin: 40px 0;
        opacity: 0.6;
    }

    .archive-intro {
        text-align: center;
        max-width: 600px;
        margin: 0 auto 40px;
        padding: 20px;
        background: rgba(59, 130, 246, 0.03);
        border: 1px solid rgba(59, 130, 246, 0.1);
        border-radius: 10px;
    }

    .archive-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 20px;
        margin: 40px 0;
    }

    .archive-item {
        padding: 20px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.02);
        transition: all 0.3s;

        &:hover {
            transform: translateY(-4px);
            background: rgba(255, 255, 255, 0.05);
        }

        .item-year {
            font-size: 0.85em;
            color: #666;
            font-weight: 600;
            margin-bottom: 8px;
        }

        .item-title {
            margin: 0 0 10px 0;
            font-size: 1.2em;
        }

        .item-type {
            display: inline-block;
            padding: 3px 8px;
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid rgba(59, 130, 246, 0.2);
            border-radius: 4px;
            font-size: 0.75em;
            text-transform: uppercase;
            margin-bottom: 10px;
        }

        .item-tags {
            font-size: 0.85em;
            color: #666;
            margin-bottom: 15px;
        }

        .item-status {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .archived-badge {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            padding: 4px 10px;
            background: rgba(107, 114, 128, 0.1);
            border: 1px solid rgba(107, 114, 128, 0.2);
            border-radius: 4px;
            font-size: 0.75em;
            color: #666;

            i {
                font-size: 0.9em;
            }
        }
    }

    .archive-note {
        text-align: center;
        margin: 40px 0;
        padding: 15px;
        background: rgba(251, 191, 36, 0.05);
        border: 1px solid rgba(251, 191, 36, 0.2);
        border-radius: 8px;
        font-size: 0.9em;
        color: #666;

        i {
            margin-right: 5px;
            color: rgba(251, 191, 36, 0.8);
        }
    }

    @media (max-width: 768px) {
        .web-center {
            :global(svg) {
                width: 200px;
                height: 200px;
            }
        }

        .archive-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
