<script>
    export let type = '404'; // 404, 403, 500
    export let size = 200;
</script>

{#if type === '404'}
    <!-- Signal Lost / Disconnected -->
    <svg class="error-illustration" width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <!-- Satellite dish -->
        <g class="dish">
            <ellipse cx="100" cy="120" rx="40" ry="15" fill="none" stroke="rgba(59, 130, 246, 0.3)" stroke-width="2"/>
            <path d="M 60 120 Q 100 80 140 120" fill="none" stroke="rgba(59, 130, 246, 0.3)" stroke-width="2"/>
            <line x1="100" y1="120" x2="100" y2="150" stroke="rgba(59, 130, 246, 0.3)" stroke-width="2"/>
            <rect x="85" y="150" width="30" height="20" fill="none" stroke="rgba(59, 130, 246, 0.3)" stroke-width="2"/>
        </g>

        <!-- Broken signal waves -->
        <g class="signal broken">
            <path d="M 100 80 Q 80 60 60 40" stroke="rgba(239, 68, 68, 0.4)" stroke-width="2" fill="none" stroke-dasharray="5,5" class="wave-1"/>
            <path d="M 100 80 Q 100 50 100 20" stroke="rgba(239, 68, 68, 0.4)" stroke-width="2" fill="none" stroke-dasharray="5,5" class="wave-2"/>
            <path d="M 100 80 Q 120 60 140 40" stroke="rgba(239, 68, 68, 0.4)" stroke-width="2" fill="none" stroke-dasharray="5,5" class="wave-3"/>
        </g>

        <!-- X mark -->
        <g class="x-mark">
            <line x1="75" y1="45" x2="125" y2="95" stroke="rgba(239, 68, 68, 0.6)" stroke-width="3"/>
            <line x1="125" y1="45" x2="75" y2="95" stroke="rgba(239, 68, 68, 0.6)" stroke-width="3"/>
        </g>

        <!-- 404 Text -->
        <text x="100" y="185" text-anchor="middle" font-family="monospace" font-size="24" fill="rgba(59, 130, 246, 0.6)">404</text>
    </svg>
{:else if type === '403'}
    <!-- Access Denied / Blocked Signal -->
    <svg class="error-illustration" width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <!-- Shield/Lock -->
        <g class="shield">
            <path d="M 100 30 L 140 50 L 140 100 Q 140 140 100 160 Q 60 140 60 100 L 60 50 Z"
                  fill="none" stroke="rgba(59, 130, 246, 0.3)" stroke-width="2"/>

            <!-- Lock icon -->
            <rect x="85" y="90" width="30" height="35" rx="3" fill="none" stroke="rgba(239, 68, 68, 0.5)" stroke-width="2"/>
            <path d="M 88 90 L 88 75 Q 88 65 100 65 Q 112 65 112 75 L 112 90"
                  fill="none" stroke="rgba(239, 68, 68, 0.5)" stroke-width="2"/>
            <circle cx="100" cy="107" r="3" fill="rgba(239, 68, 68, 0.5)"/>
            <line x1="100" y1="110" x2="100" y2="118" stroke="rgba(239, 68, 68, 0.5)" stroke-width="2"/>
        </g>

        <!-- Warning signals -->
        <g class="warnings">
            <circle cx="50" cy="80" r="3" fill="rgba(239, 68, 68, 0.4)">
                <animate attributeName="opacity" values="0.2;1;0.2" dur="1.5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="150" cy="80" r="3" fill="rgba(239, 68, 68, 0.4)">
                <animate attributeName="opacity" values="0.2;1;0.2" dur="1.5s" begin="0.5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="50" cy="130" r="3" fill="rgba(239, 68, 68, 0.4)">
                <animate attributeName="opacity" values="0.2;1;0.2" dur="1.5s" begin="1s" repeatCount="indefinite"/>
            </circle>
            <circle cx="150" cy="130" r="3" fill="rgba(239, 68, 68, 0.4)">
                <animate attributeName="opacity" values="0.2;1;0.2" dur="1.5s" begin="1.5s" repeatCount="indefinite"/>
            </circle>
        </g>

        <text x="100" y="185" text-anchor="middle" font-family="monospace" font-size="24" fill="rgba(59, 130, 246, 0.6)">403</text>
    </svg>
{:else if type === '500'}
    <!-- Server Error / System Failure -->
    <svg class="error-illustration" width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <!-- Server rack -->
        <g class="server">
            <rect x="50" y="40" width="100" height="30" rx="3" fill="none" stroke="rgba(59, 130, 246, 0.3)" stroke-width="2"/>
            <rect x="50" y="75" width="100" height="30" rx="3" fill="none" stroke="rgba(59, 130, 246, 0.3)" stroke-width="2"/>
            <rect x="50" y="110" width="100" height="30" rx="3" fill="none" stroke="rgba(59, 130, 246, 0.3)" stroke-width="2"/>

            <!-- Indicator lights -->
            <circle cx="65" cy="55" r="3" fill="rgba(239, 68, 68, 0.6)">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="0.8s" repeatCount="indefinite"/>
            </circle>
            <circle cx="75" cy="55" r="3" fill="rgba(239, 68, 68, 0.6)">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="0.8s" begin="0.2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="65" cy="90" r="3" fill="rgba(239, 68, 68, 0.6)">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="0.8s" begin="0.4s" repeatCount="indefinite"/>
            </circle>
            <circle cx="75" cy="125" r="3" fill="rgba(239, 68, 68, 0.6)">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="0.8s" begin="0.6s" repeatCount="indefinite"/>
            </circle>
        </g>

        <!-- Error sparks -->
        <g class="sparks">
            <circle cx="155" cy="55" r="2" fill="rgba(239, 68, 68, 0.8)">
                <animate attributeName="r" values="1;3;1" dur="1s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite"/>
            </circle>
            <circle cx="160" cy="90" r="2" fill="rgba(239, 68, 68, 0.8)">
                <animate attributeName="r" values="1;3;1" dur="1s" begin="0.3s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="157" cy="125" r="2" fill="rgba(239, 68, 68, 0.8)">
                <animate attributeName="r" values="1;3;1" dur="1s" begin="0.6s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.6s" repeatCount="indefinite"/>
            </circle>
        </g>

        <!-- Warning symbol -->
        <g class="warning-symbol">
            <path d="M 100 145 L 110 160 L 90 160 Z" fill="none" stroke="rgba(239, 68, 68, 0.6)" stroke-width="2"/>
            <line x1="100" y1="150" x2="100" y2="155" stroke="rgba(239, 68, 68, 0.6)" stroke-width="2"/>
            <circle cx="100" cy="158" r="1" fill="rgba(239, 68, 68, 0.6)"/>
        </g>

        <text x="100" y="185" text-anchor="middle" font-family="monospace" font-size="24" fill="rgba(59, 130, 246, 0.6)">500</text>
    </svg>
{/if}

<style>
    .error-illustration {
        filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.2));
        animation: float 3s ease-in-out infinite;
    }

    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }

    .wave-1, .wave-2, .wave-3 {
        animation: dash 1.5s linear infinite;
    }

    .wave-2 { animation-delay: 0.5s; }
    .wave-3 { animation-delay: 1s; }

    @keyframes dash {
        to {
            stroke-dashoffset: -100;
        }
    }
</style>
