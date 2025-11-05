<script>
    export let type = 'vercel'; // vercel, github, netlify, etc.
    export let compact = false;

    const badges = {
        vercel: {
            text: 'Powered by Vercel',
            icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L24 24H0L12 0z"/></svg>`,
            color: '#000'
        },
        github: {
            text: 'Hosted on GitHub',
            icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`,
            color: '#333'
        }
    };

    const badge = badges[type];
</script>

<a
    href={type === 'vercel' ? 'https://vercel.com?utm_source=iairu&utm_campaign=oss' : 'https://github.com'}
    class="tech-badge"
    class:compact
    target="_blank"
    rel="noopener noreferrer"
>
    <span class="badge-icon" style="color: {badge.color}">
        {@html badge.icon}
    </span>
    {#if !compact}
        <span class="badge-text">{badge.text}</span>
    {/if}
</a>

<style lang="scss">
    .tech-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 10px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        text-decoration: none;
        transition: all 0.2s;
        font-size: 0.75em;

        &:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(0, 0, 0, 0.2);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        &.compact {
            padding: 4px 6px;
        }

        .badge-icon {
            width: 16px;
            height: 16px;
            display: flex;
            align-items: center;
            justify-content: center;

            :global(svg) {
                width: 100%;
                height: 100%;
            }
        }

        .badge-text {
            color: #666;
            white-space: nowrap;
        }

        @media print {
            display: none;
        }
    }
</style>
