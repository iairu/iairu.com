<script context="module">
    export const gridPatterns = {
        satellite: `
            <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(59, 130, 246, 0.15)" stroke-width="0.5"/>
                    </pattern>
                    <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="0.5" fill="rgba(59, 130, 246, 0.2)"/>
                    </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)"/>
                <rect width="100" height="100" fill="url(#dots)"/>
            </svg>
        `,

        circuit: `
            <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="circuit" width="50" height="50" patternUnits="userSpaceOnUse">
                        <path d="M25 0 L25 25 L50 25" stroke="rgba(59, 130, 246, 0.1)" stroke-width="1" fill="none"/>
                        <circle cx="25" cy="25" r="2" fill="rgba(59, 130, 246, 0.3)"/>
                    </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#circuit)"/>
            </svg>
        `
    };
</script>

<style lang="scss" global>
    /* Grid Background Patterns */
    .grid-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
        background-image:
            linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px);
        background-size: 20px 20px;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05), transparent 70%);
        }

        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.08) 1px, transparent 1px);
            background-size: 40px 40px;
        }
    }

    /* Tech Border Utilities */
    .tech-border {
        border: 1px solid rgba(59, 130, 246, 0.2);
        box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 0 0 1px rgba(0, 0, 0, 0.05);
        position: relative;

        &::before {
            content: '';
            position: absolute;
            top: -1px;
            left: -1px;
            right: -1px;
            bottom: -1px;
            background: linear-gradient(135deg,
                rgba(59, 130, 246, 0.1) 0%,
                transparent 50%,
                rgba(59, 130, 246, 0.05) 100%);
            border-radius: inherit;
            z-index: -1;
            opacity: 0;
            transition: opacity 0.3s;
        }

        &:hover::before {
            opacity: 1;
        }
    }

    .glow-border {
        border: 1px solid rgba(59, 130, 246, 0.3);
        box-shadow:
            0 0 10px rgba(59, 130, 246, 0.1),
            inset 0 0 10px rgba(59, 130, 246, 0.05);

        &:hover {
            box-shadow:
                0 0 20px rgba(59, 130, 246, 0.2),
                inset 0 0 15px rgba(59, 130, 246, 0.1);
        }
    }

    /* Scan Line Effect */
    @keyframes scan {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100%); }
    }

    .scan-line {
        position: relative;
        overflow: hidden;

        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg,
                transparent,
                rgba(59, 130, 246, 0.5),
                transparent);
            animation: scan 3s linear infinite;
            opacity: 0.5;
        }
    }

    /* Corner Accents */
    .corner-accent {
        position: relative;

        &::before,
        &::after {
            content: '';
            position: absolute;
            width: 10px;
            height: 10px;
            border: 1px solid rgba(59, 130, 246, 0.4);
            transition: all 0.3s;
        }

        &::before {
            top: -1px;
            left: -1px;
            border-right: none;
            border-bottom: none;
        }

        &::after {
            bottom: -1px;
            right: -1px;
            border-left: none;
            border-top: none;
        }

        &:hover::before,
        &:hover::after {
            width: 20px;
            height: 20px;
            border-color: rgba(59, 130, 246, 0.8);
        }
    }

    /* Data Lines */
    .data-lines {
        position: relative;

        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            width: 2px;
            height: 30%;
            background: linear-gradient(180deg,
                transparent,
                rgba(59, 130, 246, 0.5),
                transparent);
            transform: translateY(-50%);
        }
    }

    /* Hologram Effect */
    .hologram {
        position: relative;

        &::before {
            content: '';
            position: absolute;
            inset: 0;
            background: repeating-linear-gradient(
                0deg,
                rgba(59, 130, 246, 0.03) 0px,
                transparent 1px,
                transparent 2px,
                rgba(59, 130, 246, 0.03) 3px
            );
            pointer-events: none;
        }
    }

    /* Connection Nodes */
    .node {
        position: relative;

        &::after {
            content: '';
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(59, 130, 246, 0.6);
            border-radius: 50%;
            box-shadow: 0 0 8px rgba(59, 130, 246, 0.8);
        }

        &.node-tl::after { top: -2px; left: -2px; }
        &.node-tr::after { top: -2px; right: -2px; }
        &.node-bl::after { bottom: -2px; left: -2px; }
        &.node-br::after { bottom: -2px; right: -2px; }
    }

    /* Glassmorphism */
    .glass {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }

    /* Hexagon Pattern */
    .hex-pattern {
        background-image:
            radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
        background-size: 30px 30px;
        background-position: 0 0, 15px 15px;
    }
</style>
