<script>
    import { onMount } from "svelte";
    import { dark } from './DarkStore.svelte';

    export let isIframe = false;
    let y;

    function goToTop() {};
    onMount(()=>{
        goToTop = function(){window.scrollTo({top: 0, behavior: "smooth"});}
    })
</script>

<svelte:window bind:scrollY={y}/>

<div class="backtotop" class:iframe={isIframe} class:visible={y > 300} class:dark={$dark}>
    <button aria-label="Back to the Top" on:click={goToTop}><i class="fa fa-angle-double-up"></i></button>
</div>

<style lang="scss" global>
    .backtotop {
        position: fixed;
        bottom: 2em;
        right: 2em;
        visibility: hidden;
        z-index: 50;
        @media print {display: none;}
        &.visible {
            visibility: visible;
            animation-name: scalein;
            animation-duration: 0.5s;
        }
        &.iframe {
            bottom: 5px;
            right: 5px;
        }
        button {
            width: 30px;
            height: 30px;
            box-sizing: border-box;
            border-radius: 50%;
            outline: none;
            cursor: pointer;
            color: rgba(0,0,0,0.2);
            border: 1px solid rgba(0,0,0,0.2);
            background: white;
            &:hover {color: rgba(0,0,0,0.5);}
            &:focus {border-width: 2px;}
        }
        &.dark button {
            background: black;
            color: rgba(255,255,255,0.3);
            border-color: rgba(255,255,255,0.3);
            &:hover {color: rgba(255,255,255,0.7);}
        }
    }
</style>