<script>
    export let status = 'online'; // online, offline, loading, new, updated
    export let label = '';
    export let pulse = true;
    export let size = 'sm'; // xs, sm, md, lg

    const sizeMap = {
        xs: '6px',
        sm: '8px',
        md: '10px',
        lg: '12px'
    };

    const statusColors = {
        online: '#10b981',
        offline: '#ef4444',
        loading: '#f59e0b',
        new: '#3b82f6',
        updated: '#8b5cf6',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444'
    };
</script>

<div class="status-indicator {size}" class:pulse>
    <div class="status-dot {status}" style="--status-color: {statusColors[status]}; --dot-size: {sizeMap[size]}"></div>
    {#if label}
        <span class="status-label">{label}</span>
    {/if}
</div>

<style lang="scss">
    .status-indicator {
        display: inline-flex;
        align-items: center;
        gap: 6px;

        .status-dot {
            width: var(--dot-size, 8px);
            height: var(--dot-size, 8px);
            border-radius: 50%;
            background: var(--status-color);
            position: relative;
            box-shadow: 0 0 8px var(--status-color);

            &::before {
                content: '';
                position: absolute;
                inset: -50%;
                border-radius: 50%;
                background: radial-gradient(circle, var(--status-color) 0%, transparent 70%);
                opacity: 0.3;
            }
        }

        &.pulse .status-dot::after {
            content: '';
            position: absolute;
            inset: -50%;
            border-radius: 50%;
            border: 2px solid var(--status-color);
            opacity: 0;
            animation: pulse 2s ease-out infinite;
        }

        .status-label {
            font-size: 0.75em;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-weight: 500;

            :global(body.dark-theme) & {
                color: white;
            }
        }
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(2.5);
            opacity: 0;
        }
    }
</style>
