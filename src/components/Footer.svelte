<script>
	import { onMount } from 'svelte';
    import Nav from './Nav.svelte';
    import LangSelector from './LangSelector.svelte';
    import TechBadge from './TechBadge.svelte';
    import StatusIndicator from './StatusIndicator.svelte';
    import { stores } from '@sapper/app';
    const { page } = stores();

    export let copyright = "";

    let buildVersion = '2.0.0';
    let uptime = 0;
    let uptimeInterval;

    onMount(() => {
        const startTime = Date.now();
        uptimeInterval = setInterval(() => {
            uptime = Math.floor((Date.now() - startTime) / 1000);
        }, 1000);

        return () => {
            clearInterval(uptimeInterval);
        };
    });
    let elm;
    let bottom = false; // Recalculated on path change, footer load and window resize
    let bottomTimer = false; // Stores last known timer for bottom determination to be canceled on repetitive calls (e.g. window resizing)
    $: determineIfBottom($page.path || elm);
    function determineIfBottom(trigger) {};
    onMount(()=>{
        determineIfBottom = function(trigger){
            clearTimeout(bottomTimer);
            bottomTimer = setTimeout(()=>{
                bottom = elm ? window.innerHeight < window.pageYOffset + elm.getBoundingClientRect().bottom : false;
            },250)
        }
    })
</script>

<svelte:window 
    on:resize={determineIfBottom}
/>

<footer class:bottom={bottom} bind:this={elm}>
    <div class="footer-content">
        <div class="footer-main">
            <span class="copyright">{copyright} &copy; {new Date().getFullYear()} All Rights Reserved</span>
            <span class="details"><slot /></span>
        </div>

        <div class="footer-badges">
            <TechBadge type="vercel" />
            <TechBadge type="github" />
        </div>

        <div class="footer-status">
            <div class="status-item">
                <StatusIndicator status="online" size="xs" pulse={true} />
                <span class="status-text">System Online</span>
            </div>
            <div class="status-item">
                <i class="fa fa-code-branch"></i>
                <span class="status-text">v{buildVersion}</span>
            </div>
            <div class="status-item">
                <i class="fa fa-clock"></i>
                <span class="status-text">{Math.floor(uptime / 60)}m {uptime % 60}s</span>
            </div>
        </div>

        <LangSelector useAnchors />
    </div>
</footer>

<style lang="scss" global>
    footer {
        display: flex;
        flex-flow: column;
        width: 100%;
        justify-content: center;
        text-align: center;
        box-sizing: border-box;
        padding: 3em 2em;
        color: #424242;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.05));
        border-top: 1px solid rgba(59, 130, 246, 0.1);
        position: relative;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg,
                transparent,
                rgba(59, 130, 246, 0.3),
                transparent);
        }

        nav {justify-content: center;}
        &.bottom {
            background: linear-gradient(180deg, rgba(0, 0, 0, 0.5), black);
            border-top-color: rgba(59, 130, 246, 0.2);
        }

        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .footer-main {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }

        .copyright {
            font-weight: 500;
        }

        .details {
            font-size: 11px;
            opacity: 0.7;
        }

        .footer-badges {
            display: flex;
            justify-content: center;
            gap: 10px;
            flex-wrap: wrap;
        }

        .footer-status {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
            padding: 15px;
            background: rgba(59, 130, 246, 0.03);
            border: 1px solid rgba(59, 130, 246, 0.1);
            border-radius: 8px;

            .status-item {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 0.85em;

                i {
                    color: rgba(59, 130, 246, 0.6);
                    font-size: 0.9em;
                }

                .status-text {
                    color: #666;
                    font-family: monospace;
                }
            }
        }

        @media (max-width: 768px) {
            .footer-status {
                flex-direction: column;
                gap: 10px;

                .status-item {
                    justify-content: center;
                }
            }
        }
    }
</style>