<script context="module">
	import { writable } from 'svelte/store';
    export const href = writable("");
</script>

<script>
    import Loading from "./Loading.svelte";
    import { onMount } from 'svelte';

    let iframeLoaded = false; // <Loading /> until true
    let iframeScrollbar = false; // Adds offset to close btn (.offset)
    let iframeDark = false; // Makes close btn dark (.dark)
    let isImg = false; // Uses <img> instead of <iframe>
    let isSvg = false; // Allows matchWidth() to take place
    let iframeSvgWidth = false; // matchWidth result used by content & iframe
    let isClosing = false; // for close animation
    let lastResizeTimer = false;
    let iframe; // iframeElm for window listeners

    // Iframe manipulation functions
    async function iframeLoadHandler(e) {
        iframeLoaded = true;
        let iframeElm = e.target; // chrome bug: e.target turns to null after it gets passed around too much
        iframeElm.classList.remove("loading");
        onIframeLoad(iframeElm);
        // Sometimes it requires a delay for iframe content to be reachable
        setTimeout(()=>{onIframeLoad(iframeElm)},500);
    }
    async function windowResizeHandler() {
        if (iframeLoaded) {
            onIframeResize(iframe);
            // chrome: onIframeResize isn't able to retrieve latest info right after resize,
            // especially noticable on maximizing the window
            if (lastResizeTimer !== false) clearTimeout(lastResizeTimer);
            lastResizeTimer = setTimeout(()=>{
                onIframeResize(iframe);
                lastResizeTimer = false;
            },500);
        }
    }
    function onIframeLoad(iframeElm) {
        iframeDark = checkIfDark(iframeElm);
        onIframeResize(iframeElm);
    }
    function onIframeResize(iframeElm) {
        iframeScrollbar = checkIfScrollBar(iframeElm);
        if (isSvg) matchWidth(iframeElm);
    }
    function checkIfScrollBar(iframeElm) {
        try {
            let frameHeight = iframeElm.parentElement.clientHeight;
            let contentHeight = iframeElm.contentWindow.document.documentElement.getBoundingClientRect().height;
            let contentBodyHeight = iframeElm.contentWindow.document.body && iframeElm.contentWindow.document.body.getBoundingClientRect().height || 0;
            return (frameHeight < contentHeight || frameHeight < contentBodyHeight) ? true : false;
        } catch(e) {}
    }
    function checkIfDark(iframeElm) {
        return (iframeElm.contentWindow.document.body && iframeElm.contentWindow.document.body.classList.contains("dark")) ? true : false;
    }
    function matchWidth(iframeElm) {
        let contentWidth = iframeElm.contentWindow.document.documentElement.getBoundingClientRect().width;
        if (contentWidth) {iframeSvgWidth = contentWidth + (iframeScrollbar ? 20 : 0);} // +20 for possible scrollbar
    }

    // Value setting on opening / closing of Modal
    // Declared onMount because document/window not available on Sapper server, only client
    function onOpen() {};
    function onClose() {};
    onMount(()=>{
        onOpen = function(_href) {
            document.body.classList.add("modal-active"); 
            iframeLoaded = false;
            iframeScrollbar = false;
            iframeSvgWidth = false;
            iframeDark = false;
            isImg = !!_href.match(/\.(jpg|png|gif)$/);
            isSvg = !!_href.match(/\.(svg)$/);
            return true;
        }
        onClose = function() {
            document.body.classList.remove("modal-active");
            iframe = undefined;
            return true;
        }
    })

    // Closing
    function closingAnimation(duration,callback=()=>{}) {
        isClosing = true;
        setTimeout(()=>{
            isClosing = false;
            callback();
        },duration)
    }
    export function close() {
        closingAnimation(200,()=>{
            // has to match .closing CSS animation duration
            href.set("");
            onClose();
        })
    }
</script>

<svelte:window 
    on:resize={windowResizeHandler}
/>

{#if $href && onOpen($href)}
<section id="modal" class:img={isImg || isSvg}>
    <div 
        class="content" 
        style={iframeSvgWidth ? "width: " + iframeSvgWidth + "px; height: 80vh;" : ""}
        class:closing={isClosing}
    >
        <button 
            class="btn-close-modal" 
            class:offset={!isSvg && iframeScrollbar} 
            class:dark={iframeDark} 
            aria-label="Close Modal" 
            on:click={close}
        ><i class="fa fa-times"></i></button>
        {#if isImg}
            <img src={$href} alt={$href}>
        {:else}
            {#if !iframeLoaded}<Loading />{/if}
            <iframe 
                class="loading"
                src={$href} 
                frameborder="0" 
                title="Modal"
                on:load={iframeLoadHandler}
                bind:this={iframe}
                style={iframeSvgWidth ? "max-width: " + iframeSvgWidth + "px;" : ""}
            ></iframe>
        {/if}
    </div>
    <div class="bg-close-modal" on:click={close}></div>
</section>
{/if}

<style lang="scss" global>
    body.modal-active {
        overflow: hidden;
        header {opacity: 0.5;}
        main {opacity: 0.5;}
    }
    section#modal {
        display: flex;
        position: fixed;
        justify-content: center;
        align-items: center;
        z-index: 90;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        >.content {
            animation-name: scalein;
            animation-duration: 0.5s;
            position: relative;
            width: 80vw;
            height: 80vh;
            // height: calc(80vw / 16 * 9);    
            border: 1px solid rgba(0,0,0,0.2);
            border-radius: 10px;
            background-color: white;
            overflow: hidden;
            z-index: 93;
            &.closing {
                animation-name: scaleout;
                animation-duration: 0.2s; // has to match closingAnimation JS duration
                iframe, img {
                    opacity: 0;
                }
            }
            iframe {
                position: relative;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
            }
            iframe.loading {
                position: absolute;
                width: 1px;
                height: 1px;
            }
            >button.btn-close-modal {
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                cursor: pointer;
                width: 30px;
                height: 30px;
                background: transparent;
                border-radius: 50%;
                border: none;
                box-sizing: border-box;
                top: 5px;
                right: 5px;
                border: 1px solid rgba(136, 136, 136, 0.7);
                color: rgba(136, 136, 136, 0.7);
                outline: none;
                z-index: 94;
                &:hover {color: rgb(136, 136, 136);}
                &:focus {border-width: 2px;}
                &.offset {right: 25px;}
            }
        }
        &.img>.content {
            display: flex;
            justify-content: center;
            align-items: center;
            width: auto;
            height: auto;
            padding: 40px;
            max-width: 80vw;
        }
        >.bg-close-modal {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0,0,0,0.2);
            z-index: 92;
            // backdrop-filter: blur(2px); // chrome lag
        }
    }
</style>