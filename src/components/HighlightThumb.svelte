<script>
    import { href } from './Modal.svelte';

    export let title = "";
    export let desc = "";
    export let link = "";
    export let icon = "";
    export let status = ""; // new, updated, hot
    export let date = "";
    export let metric = ""; // e.g., "2.3k views" or "5 min read"
    export let badge = ""; // e.g., "Featured", "Popular"

    function handleClick() {
        if (link) {
            if (link.startsWith('/')) {
                href.set(link);
            } else {
                window.open(link, '_blank');
            }
        }
    }
</script>

<div class="highlight-thumb tech-border" on:click={handleClick} class:clickable={link}>
    <div class="thumb-content">
        <div class="left-section">
            {#if icon}
                <div class="icon-wrapper">
                    {#if icon.match(/^fa/)}
                        <i class={"icon " + icon}></i>
                    {:else}
                        <img class="icon" src={icon} alt={title}>
                    {/if}
                </div>
            {/if}

            <div class="info">
                {#if title}
                    <h4 class="title">{title}</h4>
                {/if}
                {#if desc}
                    <p class="desc">{desc}</p>
                {/if}
            </div>
        </div>

        <div class="right-section">
            {#if badge}
                <span class="badge">{badge}</span>
            {/if}
            {#if status}
                <span class="status-badge status-{status}">
                    <span class="pulse"></span>
                    {status}
                </span>
            {/if}
            {#if metric}
                <span class="metric">{metric}</span>
            {/if}
            {#if date}
                <span class="date">{date}</span>
            {/if}
        </div>
    </div>

    <div class="progress-bar"></div>
</div>

<style lang="scss">
    .highlight-thumb {
        position: relative;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
        border: 1px solid rgba(59, 130, 246, 0.2);
        border-radius: 8px;
        padding: 12px 16px;
        margin-bottom: 8px;
        transition: all 0.2s ease;
        overflow: hidden;

        &.clickable {
            cursor: pointer;

            &:hover {
                transform: translateX(4px);
                border-color: rgba(59, 130, 246, 0.4);
                background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(59, 130, 246, 0.03));

                .progress-bar {
                    width: 100%;
                }
            }
        }

        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 2px;
            height: 100%;
            background: linear-gradient(180deg, rgba(59, 130, 246, 0.6), rgba(59, 130, 246, 0.2));
        }
    }

    .thumb-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        position: relative;
        z-index: 2;
    }

    .left-section {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
        min-width: 0;
    }

    .icon-wrapper {
        flex-shrink: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(59, 130, 246, 0.1);
        border: 1px solid rgba(59, 130, 246, 0.2);
        border-radius: 6px;

        .icon {
            width: 20px;
            height: 20px;
            color: rgba(59, 130, 246, 0.9);
            font-size: 18px;
        }
    }

    .info {
        flex: 1;
        min-width: 0;

        .title {
            margin: 0;
            font-size: 14px;
            font-weight: 600;
            color: rgba(0, 0, 0, 0.9);
            :global(body.dark-theme) & {
                color: rgba(255, 255, 255, 0.9);
            }
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .desc {
            margin: 2px 0 0;
            font-size: 12px;
            color: rgba(0, 0, 0, 0.6);
            :global(body.dark-theme) & {
                color: rgba(255, 255, 255, 0.6);
            }
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    .right-section {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-shrink: 0;
    }

    .badge {
        padding: 2px 8px;
        font-size: 11px;
        font-weight: 600;
        background: rgba(59, 130, 246, 0.15);
        color: rgba(59, 130, 246, 0.9);
        border: 1px solid rgba(59, 130, 246, 0.3);
        border-radius: 4px;
        white-space: nowrap;
    }

    .status-badge {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 2px 8px;
        font-size: 10px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        border-radius: 4px;
        white-space: nowrap;

        .pulse {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            animation: pulse 2s ease-out infinite;
        }

        &.status-new {
            background: rgba(16, 185, 129, 0.15);
            color: rgba(16, 185, 129, 0.9);
            border: 1px solid rgba(16, 185, 129, 0.3);

            .pulse {
                background: rgba(16, 185, 129, 0.9);
            }
        }

        &.status-updated {
            background: rgba(139, 92, 246, 0.15);
            color: rgba(139, 92, 246, 0.9);
            border: 1px solid rgba(139, 92, 246, 0.3);

            .pulse {
                background: rgba(139, 92, 246, 0.9);
            }
        }

        &.status-hot {
            background: rgba(245, 158, 11, 0.15);
            color: rgba(245, 158, 11, 0.9);
            border: 1px solid rgba(245, 158, 11, 0.3);

            .pulse {
                background: rgba(245, 158, 11, 0.9);
            }
        }
    }

    .metric, .date {
        font-size: 11px;
        color: rgba(0, 0, 0, 0.5);
        :global(body.dark-theme) & {
            color: rgba(255, 255, 255, 0.5);
        }
        white-space: nowrap;
    }

    .progress-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, rgba(59, 130, 246, 0.6), rgba(59, 130, 246, 0.3));
        transition: width 0.3s ease;
        z-index: 1;
    }

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
            transform: scale(1);
        }
        50% {
            opacity: 0.6;
            transform: scale(1.2);
        }
    }

    @media (max-width: 768px) {
        .highlight-thumb {
            padding: 10px 12px;
        }

        .left-section {
            gap: 8px;
        }

        .icon-wrapper {
            width: 28px;
            height: 28px;

            .icon {
                width: 16px;
                height: 16px;
                font-size: 16px;
            }
        }

        .info .title {
            font-size: 13px;
        }

        .info .desc {
            font-size: 11px;
        }

        .right-section {
            flex-direction: column;
            align-items: flex-end;
            gap: 4px;
        }
    }
</style>
