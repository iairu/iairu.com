<script>
    import { stores } from '@sapper/app';
    const { page } = stores();

    let breadcrumbs = [];

    $: {
        const path = $page.path;
        const segments = path.split('/').filter(Boolean);

        breadcrumbs = segments.map((segment, index) => {
            const href = '/' + segments.slice(0, index + 1).join('/');
            const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
            return { label, href };
        });

        // Add home breadcrumb
        if (breadcrumbs.length > 0) {
            breadcrumbs.unshift({ label: 'Home', href: `/${segments[0] || 'en'}` });
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
        padding: 10px 0;
        margin-bottom: 20px;

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
            font-size: 0.9em;
        }

        .breadcrumb-link {
            color: #666;
            text-decoration: none;
            transition: color 0.2s;

            &:hover {
                color: black;
                text-decoration: underline;
            }
        }

        .breadcrumb-separator {
            color: #ccc;
            user-select: none;
        }

        .breadcrumb-current {
            color: black;
            font-weight: 500;
        }

        @media print {
            display: none;
        }
    }
</style>
