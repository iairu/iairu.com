<script>
	import { onMount } from 'svelte';
    import Nav from './Nav.svelte';
    import LangSelector from './LangSelector.svelte';
    import { stores } from '@sapper/app';
    const { page } = stores();

    export let copyright = "";
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
    <span class="copyright">{copyright} &copy; {new Date().getFullYear()} All Rights Reserved</span>
    <span class="details"><slot /></span>
    <LangSelector useAnchors />
</footer>

<style lang="scss" global>
    footer {
        display: flex;
        flex-flow: column;
        width: 100%;
        justify-content: center;
        text-align: center;
        box-sizing: border-box;
        padding: 2em;
        color: #424242;
        background: white;
        nav {justify-content: center;}
        &.bottom {background: black;}
        >.details {
            font-size: 11px;
        }
    }
</style>