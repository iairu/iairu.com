<script>
    import { accessibilitySettings } from './AccessibilityStore.svelte';
    import { onMount } from 'svelte';

    let settings = {};

    accessibilitySettings.subscribe(s => {
        settings = s;
        applySettings(s);
    });

    function applySettings(s) {
        if (typeof document === 'undefined') return;

        const root = document.documentElement;
        const body = document.body;

        // Font size
        const fontSizes = {
            small: '14px',
            medium: '16px',
            large: '18px',
            xlarge: '20px'
        };
        const fontSize = fontSizes[s.fontSize] || fontSizes.medium;
        root.style.setProperty('--base-font-size', fontSize);
        // Also set directly on html and body for better compatibility
        root.style.fontSize = fontSize;
        if (body) body.style.fontSize = fontSize;

        // Line height
        const lineHeights = {
            compact: '1.4',
            normal: '1.6',
            relaxed: '1.8'
        };
        root.style.setProperty('--base-line-height', lineHeights[s.lineHeight] || lineHeights.normal);

        // Apply classes
        root.classList.toggle('high-contrast', s.contrast === 'high');
        root.classList.toggle('reduced-motion', s.reducedMotion);
        root.classList.toggle('focus-indicators', s.focusIndicators);
        root.classList.toggle('underline-links', s.underlineLinks);
    }

    onMount(() => {
        accessibilitySettings.initialize();
    });
</script>

<svelte:head>
    <style>
        :root {
            --base-font-size: 16px;
            --base-line-height: 1.6;
        }

        html {
            font-size: var(--base-font-size);
            line-height: var(--base-line-height);
        }

        /* High Contrast Mode */
        html.high-contrast {
            --color-text: #000;
            --color-bg: #fff;
            --color-border: #000;
        }

        html.high-contrast * {
            border-color: var(--color-border) !important;
        }

        /* Reduced Motion */
        html.reduced-motion *,
        html.reduced-motion *::before,
        html.reduced-motion *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }

        /* Focus Indicators */
        html.focus-indicators *:focus {
            outline: 3px solid rgba(59, 130, 246, 0.6) !important;
            outline-offset: 2px !important;
        }

        /* Underline Links */
        html.underline-links a {
            text-decoration: underline !important;
        }

        /* Better focus for buttons */
        html.focus-indicators button:focus,
        html.focus-indicators input:focus,
        html.focus-indicators select:focus,
        html.focus-indicators textarea:focus {
            outline: 3px solid rgba(59, 130, 246, 0.6) !important;
            outline-offset: 2px !important;
        }
    </style>
</svelte:head>
