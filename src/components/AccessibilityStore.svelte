<script context="module">
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';

    // Default accessibility settings
    const defaultSettings = {
        fontSize: 'medium', // small, medium, large, xlarge
        lineHeight: 'normal', // compact, normal, relaxed
        contrast: 'normal', // normal, high
        reducedMotion: false,
        focusIndicators: true,
        underlineLinks: false
    };

    // Initialize store
    function createAccessibilityStore() {
        const { subscribe, set, update } = writable(defaultSettings);

        return {
            subscribe,
            set,
            update,
            initialize: () => {
                if (typeof window !== 'undefined') {
                    const stored = localStorage.getItem('accessibility-settings');
                    if (stored) {
                        try {
                            const parsed = JSON.parse(stored);
                            set({ ...defaultSettings, ...parsed });
                        } catch (e) {
                            console.error('Failed to parse accessibility settings:', e);
                        }
                    }

                    // Check system preference for reduced motion
                    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                    if (prefersReducedMotion) {
                        update(s => ({ ...s, reducedMotion: true }));
                    }
                }
            },
            setSetting: (key, value) => {
                update(settings => {
                    const newSettings = { ...settings, [key]: value };
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('accessibility-settings', JSON.stringify(newSettings));
                    }
                    return newSettings;
                });
            },
            reset: () => {
                set(defaultSettings);
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('accessibility-settings');
                }
            }
        };
    }

    export const accessibilitySettings = createAccessibilityStore();
</script>
