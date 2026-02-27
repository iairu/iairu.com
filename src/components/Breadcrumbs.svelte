<script>
    import { stores } from '@sapper/app';
    const { page } = stores();

    let breadcrumbs = [];

    $: {
        const path = $page.path;
        const segments = path.split('/').filter(Boolean);

        // Skip first segment (language) and map remaining
        const contentSegments = segments.slice(1);

        breadcrumbs = contentSegments.map((segment, index) => {
            const href = '/' + segments.slice(0, index + 2).join('/');
            const label = segment.toUpperCase().replace(/-/g, ' ');
            return { label, href };
        });

        // Add home breadcrumb
        if (breadcrumbs.length > 0) {
            breadcrumbs.unshift({ label: 'HOME', href: `/${segments[0] || 'en'}` });
        }
    }
</script>

{#if breadcrumbs.length > 1}
<nav class="breadcrumbs" aria-label="Breadcrumb">
    <ol class="breadcrumb-list">
        {#each breadcrumbs as crumb, index}
            <li class="breadcrumb-item">
                {#if index < breadcrumbs.length - 1}
                    <a href={crumb.href} class="breadcrumb-link">{crumb.label}</a>
                    <span class="breadcrumb-separator">/</span>
                {:else}
                    <span class="breadcrumb-current">{crumb.label}</span>
                {/if}
            </li>
        {/each}
    </ol>
</nav>
{/if}

<style lang="scss" global>
    .breadcrumbs {
        padding: 0;
        margin-bottom: 40px;

        .breadcrumb-list {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 8px;
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .breadcrumb-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.85em;
            font-family: monospace;
            letter-spacing: 0.5px;
        }

        .breadcrumb-link {
            color: rgba(59, 130, 246, 0.7);
            text-decoration: none;
            transition: color 0.2s;
            font-weight: 500;

            &:hover {
                color: rgba(59, 130, 246, 0.9);
                text-decoration: underline;
            }
        }

        .breadcrumb-separator {
            color: rgba(59, 130, 246, 0.3);
            user-select: none;
        }

        .breadcrumb-current {
            color: rgba(59, 130, 246, 0.9);
            font-weight: 600;
        }

        @media print {
            display: none;
        }
    }
</style>
