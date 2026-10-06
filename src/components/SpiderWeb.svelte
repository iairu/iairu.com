<script>
    export let size = 300;
    export let animate = true;
</script>

<svg
    class="spider-web"
    class:animate
    width={size}
    height={size}
    viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg"
>
    <!-- Center circle -->
    <circle cx="150" cy="150" r="5" fill="rgba(59, 130, 246, 0.3)" />

    <!-- Radial lines -->
    <g stroke="rgba(59, 130, 246, 0.2)" stroke-width="1" fill="none">
        <line x1="150" y1="150" x2="150" y2="20" class="web-line delay-1"/>
        <line x1="150" y1="150" x2="240" y2="50" class="web-line delay-2"/>
        <line x1="150" y1="150" x2="280" y2="150" class="web-line delay-3"/>
        <line x1="150" y1="150" x2="240" y2="250" class="web-line delay-4"/>
        <line x1="150" y1="150" x2="150" y2="280" class="web-line delay-5"/>
        <line x1="150" y1="150" x2="60" y2="250" class="web-line delay-6"/>
        <line x1="150" y1="150" x2="20" y2="150" class="web-line delay-7"/>
        <line x1="150" y1="150" x2="60" y2="50" class="web-line delay-8"/>
    </g>

    <!-- Circular webs -->
    <g stroke="rgba(59, 130, 246, 0.15)" stroke-width="1" fill="none">
        <circle cx="150" cy="150" r="30" class="web-circle delay-1"/>
        <circle cx="150" cy="150" r="60" class="web-circle delay-2"/>
        <circle cx="150" cy="150" r="90" class="web-circle delay-3"/>
        <circle cx="150" cy="150" r="120" class="web-circle delay-4"/>
    </g>

    <!-- Dew drops (connection points) -->
    <g>
        <circle cx="150" cy="80" r="2" fill="rgba(59, 130, 246, 0.6)" class="dew delay-1">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="200" cy="100" r="2" fill="rgba(59, 130, 246, 0.6)" class="dew delay-2">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" begin="0.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="220" cy="150" r="2" fill="rgba(59, 130, 246, 0.6)" class="dew delay-3">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" begin="1s" repeatCount="indefinite"/>
        </circle>
        <circle cx="200" cy="200" r="2" fill="rgba(59, 130, 246, 0.6)" class="dew delay-4">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" begin="1.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="150" cy="220" r="2" fill="rgba(59, 130, 246, 0.6)" class="dew delay-5">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" begin="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="100" cy="200" r="2" fill="rgba(59, 130, 246, 0.6)" class="dew delay-6">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" begin="2.5s" repeatCount="indefinite"/>
        </circle>
    </g>
</svg>

<style>
    .spider-web {
        filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.3));
    }

    .spider-web.animate .web-line,
    .spider-web.animate .web-circle {
        stroke-dasharray: 1000;
        stroke-dashoffset: 1000;
        animation: draw 2s ease-out forwards;
    }

    .delay-1 { animation-delay: 0s; }
    .delay-2 { animation-delay: 0.1s; }
    .delay-3 { animation-delay: 0.2s; }
    .delay-4 { animation-delay: 0.3s; }
    .delay-5 { animation-delay: 0.4s; }
    .delay-6 { animation-delay: 0.5s; }
    .delay-7 { animation-delay: 0.6s; }
    .delay-8 { animation-delay: 0.7s; }

    @keyframes draw {
        to {
            stroke-dashoffset: 0;
        }
    }
</style>
