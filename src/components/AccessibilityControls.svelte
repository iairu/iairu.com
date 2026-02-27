<script>
    import { accessibilitySettings } from './AccessibilityStore.svelte';
    import { onMount } from 'svelte';

    export let compact = false;

    let isOpen = false;
    let settings = {};

    onMount(() => {
        accessibilitySettings.initialize();
    });

    accessibilitySettings.subscribe(s => {
        settings = s;
    });

    function togglePanel() {
        isOpen = !isOpen;
    }

    function updateSetting(key, value) {
        accessibilitySettings.setSetting(key, value);
    }

    function resetSettings() {
        accessibilitySettings.reset();
    }
</script>

<div class="accessibility-controls" class:compact>
    <button
        class="trigger-button tech-border"
        on:click={togglePanel}
        aria-label="Accessibility settings"
        aria-expanded={isOpen}
    >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6m-5-5h-6m6 0h6"/>
        </svg>
        {#if !compact}
            <span>Accessibility</span>
        {/if}
    </button>

    {#if isOpen}
        <div class="accessibility-panel glass tech-border">
            <div class="panel-header">
                <h3>Accessibility Settings</h3>
                <button class="close-btn" on:click={togglePanel} aria-label="Close">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>

            <div class="settings-group">
                <label>
                    <span class="label-text">Font Size</span>
                    <select
                        value={settings.fontSize}
                        on:change={(e) => updateSetting('fontSize', e.target.value)}
                    >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="xlarge">Extra Large</option>
                    </select>
                </label>
            </div>

            <div class="settings-group">
                <label>
                    <span class="label-text">Line Height</span>
                    <select
                        value={settings.lineHeight}
                        on:change={(e) => updateSetting('lineHeight', e.target.value)}
                    >
                        <option value="compact">Compact</option>
                        <option value="normal">Normal</option>
                        <option value="relaxed">Relaxed</option>
                    </select>
                </label>
            </div>

            <div class="settings-group">
                <label>
                    <span class="label-text">Contrast</span>
                    <select
                        value={settings.contrast}
                        on:change={(e) => updateSetting('contrast', e.target.value)}
                    >
                        <option value="normal">Normal</option>
                        <option value="high">High Contrast</option>
                    </select>
                </label>
            </div>

            <div class="settings-group checkbox-group">
                <label>
                    <input
                        type="checkbox"
                        checked={settings.reducedMotion}
                        on:change={(e) => updateSetting('reducedMotion', e.target.checked)}
                    />
                    <span class="label-text">Reduce Motion</span>
                </label>
            </div>

            <div class="settings-group checkbox-group">
                <label>
                    <input
                        type="checkbox"
                        checked={settings.focusIndicators}
                        on:change={(e) => updateSetting('focusIndicators', e.target.checked)}
                    />
                    <span class="label-text">Focus Indicators</span>
                </label>
            </div>

            <div class="settings-group checkbox-group">
                <label>
                    <input
                        type="checkbox"
                        checked={settings.underlineLinks}
                        on:change={(e) => updateSetting('underlineLinks', e.target.checked)}
                    />
                    <span class="label-text">Underline Links</span>
                </label>
            </div>

            <div class="panel-footer">
                <button class="reset-btn" on:click={resetSettings}>
                    Reset to Defaults
                </button>
            </div>
        </div>
        <div class="overlay" on:click={togglePanel}></div>
    {/if}
</div>

<style lang="scss">
    .accessibility-controls {
        position: relative;
        z-index: 1000;

        &.compact .trigger-button span {
            display: none;
        }
    }

    .trigger-button {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(59, 130, 246, 0.2);
        border-radius: 6px;
        color: rgba(59, 130, 246, 0.9);
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 14px;

        &:hover {
            background: rgba(59, 130, 246, 0.1);
            border-color: rgba(59, 130, 246, 0.4);
            transform: translateY(-1px);
        }

        svg {
            flex-shrink: 0;
        }
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(2px);
        z-index: 999;
    }

    .accessibility-panel {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        max-width: 400px;
        background: rgba(255, 255, 255, 0.98);
        border: 1px solid rgba(59, 130, 246, 0.3);
        border-radius: 12px;
        padding: 0;
        z-index: 1000;
        box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.3),
            0 0 40px rgba(59, 130, 246, 0.2);
        animation: slideIn 0.3s ease;

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translate(-50%, -45%);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
        }
    }

    .panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid rgba(59, 130, 246, 0.2);

        h3 {
            margin: 0;
            font-size: 18px;
            font-weight: 600;
            color: #000;
        }

        .close-btn {
            background: none;
            border: none;
            color: rgba(0, 0, 0, 0.6);
            cursor: pointer;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;

            &:hover {
                color: rgba(59, 130, 246, 0.9);
                transform: rotate(90deg);
            }
        }
    }

    .settings-group {
        padding: 16px 20px;
        border-bottom: 1px solid rgba(59, 130, 246, 0.1);

        &:last-of-type {
            border-bottom: none;
        }

        label {
            display: flex;
            flex-direction: column;
            gap: 8px;
            cursor: pointer;
        }

        &.checkbox-group label {
            flex-direction: row;
            align-items: center;
            gap: 12px;

            input[type="checkbox"] {
                width: 18px;
                height: 18px;
                cursor: pointer;
                accent-color: rgba(59, 130, 246, 0.9);
            }
        }

        .label-text {
            font-size: 14px;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.8);
        }

        select {
            padding: 8px 12px;
            border: 1px solid rgba(59, 130, 246, 0.2);
            border-radius: 6px;
            background: rgba(255, 255, 255, 0.5);
            color: #000;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s ease;

            &:hover {
                border-color: rgba(59, 130, 246, 0.4);
            }

            &:focus {
                outline: none;
                border-color: rgba(59, 130, 246, 0.6);
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            }
        }
    }

    .panel-footer {
        padding: 16px 20px;
        background: rgba(59, 130, 246, 0.05);
        border-radius: 0 0 12px 12px;

        .reset-btn {
            width: 100%;
            padding: 10px;
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid rgba(59, 130, 246, 0.2);
            border-radius: 6px;
            color: rgba(59, 130, 246, 0.9);
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;

            &:hover {
                background: rgba(59, 130, 246, 0.2);
                border-color: rgba(59, 130, 246, 0.4);
            }
        }
    }
</style>
