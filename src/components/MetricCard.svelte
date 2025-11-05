<script>
    export let label = "";
    export let value = "";
    export let icon = "";
    export let trend = ""; // up, down, neutral
    export let trendValue = "";
    export let size = "normal"; // small, normal
</script>

<div class="metric-card tech-border" class:small={size === 'small'}>
    {#if icon}
        <div class="metric-icon">
            <i class={icon}></i>
        </div>
    {/if}

    <div class="metric-content">
        <div class="metric-value">
            {value}
            {#if trend && trendValue}
                <span class="trend trend-{trend}">
                    <i class="fa fa-arrow-{trend === 'up' ? 'up' : 'down'}"></i>
                    {trendValue}
                </span>
            {/if}
        </div>
        <div class="metric-label">{label}</div>
    </div>

    <div class="metric-sparkline"></div>
</div>

<style lang="scss">
    .metric-card {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 8px;
        padding: 16px;
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(59, 130, 246, 0.05));
        border: 1px solid rgba(59, 130, 246, 0.2);
        border-radius: 8px;
        transition: all 0.2s ease;
        position: relative;
        overflow: hidden;
        text-align: center;

        &:hover {
            border-color: rgba(59, 130, 246, 0.4);
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(59, 130, 246, 0.03));
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
        }

        &.small {
            padding: 8px 12px;

            .metric-icon {
                width: 28px;
                height: 28px;

                i {
                    font-size: 14px;
                }
            }

            .metric-value {
                font-size: 16px;
            }

            .metric-label {
                font-size: 10px;
            }
        }

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 3px;
            height: 100%;
            background: linear-gradient(180deg, rgba(59, 130, 246, 0.6), rgba(59, 130, 246, 0.2));
        }
    }

    .metric-icon {
        flex-shrink: 0;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(59, 130, 246, 0.1);
        border: 1px solid rgba(59, 130, 246, 0.2);
        border-radius: 8px;
        position: relative;

        i {
            color: rgba(59, 130, 246, 0.9);
            font-size: 16px;
        }

        &::after {
            content: '';
            position: absolute;
            top: 2px;
            right: 2px;
            width: 6px;
            height: 6px;
            background: rgba(16, 185, 129, 0.8);
            border-radius: 50%;
            animation: pulse 2s ease-out infinite;
        }
    }

    .metric-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .metric-value {
        font-size: 24px;
        font-weight: 700;
        color: rgba(59, 130, 246, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        line-height: 1;
        margin-bottom: 6px;

        .trend {
            font-size: 12px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 2px 6px;
            border-radius: 4px;

            &.trend-up {
                color: rgba(16, 185, 129, 0.9);
                background: rgba(16, 185, 129, 0.1);
            }

            &.trend-down {
                color: rgba(239, 68, 68, 0.9);
                background: rgba(239, 68, 68, 0.1);
            }

            &.trend-neutral {
                color: rgba(107, 114, 128, 0.9);
                background: rgba(107, 114, 128, 0.1);
            }

            i {
                font-size: 10px;
            }
        }
    }

    .metric-label {
        font-size: 11px;
        font-weight: 600;
        color: rgba(59, 130, 246, 0.7);
        text-transform: uppercase;
        letter-spacing: 0.8px;
    }

    .metric-sparkline {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 30px;
        opacity: 0.1;
        background:
            linear-gradient(135deg,
                transparent 25%,
                rgba(59, 130, 246, 0.3) 25%,
                rgba(59, 130, 246, 0.3) 50%,
                transparent 50%,
                transparent 75%,
                rgba(59, 130, 246, 0.3) 75%);
        background-size: 4px 4px;
    }

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
            transform: scale(1);
        }
        50% {
            opacity: 0.6;
            transform: scale(1.3);
        }
    }
</style>
