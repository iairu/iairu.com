<script context="module">
    import { writable } from "svelte/store";
    export const href = writable("");
</script>

<script>
    import Loading from "./Loading.svelte";
    import { onMount } from "svelte";

    let iframeLoaded = false; // <Loading /> until true
    let iframeScrollbar = false; // Adds offset to close btn (.offset)
    let isImg = false; // Uses <img> instead of <iframe>
    let isSvg = false; // Allows matchWidth() to take place
    let iframeSvgWidth = false; // matchWidth result used by content & iframe
    let isClosing = false; // for close animation
    let lastResizeTimer = false;
    let iframe; // iframeElm for window listeners
    let favicon = "";

    let prefersDarkMode = false;
    import { dark } from "./DarkStore.svelte";
    dark.subscribe((isDark) => {
        prefersDarkMode = isDark;
    });

    // Iframe manipulation functions
    async function iframeLoadHandler(e) {
        iframeLoaded = true;
        let iframeElm = e.target; // chrome bug: e.target turns to null after it gets passed around too much
        iframeElm.classList.remove("loading");
        onIframeLoad(iframeElm);
        // Get favicon
        try {
            const faviconEl = iframeElm.contentDocument.querySelector("link[rel*='icon']");
            favicon = faviconEl ? faviconEl.href : new URL("/favicon.ico", $href).href;
        } catch (e) {
            favicon = "";
        }
        // Sometimes it requires a delay for iframe content to be reachable
        setTimeout(() => {
            onIframeLoad(iframeElm);
        }, 500);
    }

    async function windowResizeHandler() {
        if (iframeLoaded) {
            onIframeResize(iframe);
            // chrome: onIframeResize isn't able to retrieve latest info right after resize,
            // especially noticable on maximizing the window
            if (lastResizeTimer !== false) clearTimeout(lastResizeTimer);
            lastResizeTimer = setTimeout(() => {
                onIframeResize(iframe);
                lastResizeTimer = false;
            }, 500);
        }
    }

    function onIframeLoad(iframeElm) {
        onIframeResize(iframeElm);
    }

    function onIframeResize(iframeElm) {
        iframeScrollbar = checkIfScrollBar(iframeElm);
        if (isSvg) matchWidth(iframeElm);
    }

    function checkIfScrollBar(iframeElm) {
        try {
            let frameHeight = iframeElm.parentElement.clientHeight;
            let contentHeight =
                iframeElm.contentWindow.document.documentElement.getBoundingClientRect()
                    .height;
            let contentBodyHeight =
                (iframeElm.contentWindow.document.body &&
                    iframeElm.contentWindow.document.body.getBoundingClientRect()
                        .height) ||
                0;
            return frameHeight < contentHeight ||
                frameHeight < contentBodyHeight
                ? true
                : false;
        } catch (e) {}
    }

    function matchWidth(iframeElm) {
        let contentWidth =
            iframeElm.contentWindow.document.documentElement.getBoundingClientRect()
                .width;
        if (contentWidth) {
            iframeSvgWidth = contentWidth + (iframeScrollbar ? 20 : 0);
        } // +20 for possible scrollbar
    }

    // Value setting on opening / closing of Modal
    // Declared onMount because document/window not available on Sapper server, only client
    function onOpen() {}
    function onClose() {}
    onMount(() => {
        onOpen = function (_href) {
            document.body.classList.add("modal-active");
            iframeLoaded = false;
            iframeScrollbar = false;
            iframeSvgWidth = false;
            isImg = !!_href.match(/\.(jpg|png|gif)$/);
            isSvg = !!_href.match(/\.(svg)$/);
            favicon = "";
            return true;
        };
        onClose = function () {
            document.body.classList.remove("modal-active");
            iframe = undefined;
            return true;
        };
    });

    // Closing
    function closingAnimation(duration, callback = () => {}) {
        isClosing = true;
        setTimeout(() => {
            isClosing = false;
            callback();
        }, duration);
    }
    export function close() {
        closingAnimation(200, () => {
            // has to match .closing CSS animation duration
            href.set("");
            onClose();
        });
    }
</script>

<svelte:window on:resize={windowResizeHandler} />

{#if $href && onOpen($href)}
    <section id="modal" class:img={isImg || isSvg}>
        <div
            class="content"
            class:macos-window={!isImg && !isSvg}
            style="{iframeSvgWidth
                ? 'width: ' + iframeSvgWidth + 'px; height: 80vh;'
                : ''}"
            class:closing={isClosing}
        >
            {#if !isImg && !isSvg}
            <div class="window-titlebar" class:dark={prefersDarkMode}>
                <div class="window-controls">
                    <button
                        class="window-close"
                        aria-label="Close Window"
                        on:click={close}
                    >
                        <i class="fa fa-times"></i>
                    </button>
                </div>
                <div class="window-title">
                    {#if iframe?.contentDocument?.title}
                        {#if favicon}
                            <img src={favicon} alt="favicon" class="favicon" />
                        {:else}
                            <i class="icon-ext fa fa-tools"></i>
                        {/if}
                        {iframe.contentDocument.title}
                    {:else}
                        <i class="icon-ext fa fa-tools"></i> Loading...
                    {/if}
                </div>
                <a
                    href={$href}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="window-external-link"
                    aria-label="Open in new tab"
                >
                    <i class="icon-ext fa fa-external-link-alt"></i>
                </a>
            </div>
            {/if}
            {#if isImg}
                <img src={$href} alt={$href} />
            {:else}
                {#if !iframeLoaded}<Loading />{/if}
                <iframe
                    class="loading"
                    src={$href}
                    frameborder="0"
                    title="Modal"
                    on:load={iframeLoadHandler}
                    bind:this={iframe}
                    style={iframeSvgWidth
                        ? "max-width: " + iframeSvgWidth + "px;"
                        : ""}
                ></iframe>
            {/if}
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="bg-close-modal" on:click={close}></div>
    </section>
{/if}

<style lang="scss" global>
    body.modal-active {
        overflow: hidden;
        header {
            opacity: 0.5;
        }
        main {
            opacity: 0.5;
        }
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
        > .content {
            animation-name: scalein;
            animation-duration: 0.5s;
            position: relative;
            width: 80vw;
            height: 80vh;
            // height: calc(80vw / 16 * 9);    
            border: 1px solid rgba(0,0,0,0.2);
            border-radius: 0;
            background-color: white;
            overflow: hidden;
            z-index: 93;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            &.dark {
                border: 1px solid #222;
            }
            .window-titlebar {
                height: 32px;
                background: #f5f5f5;
                border-bottom: 1px solid #ddd;
                display: flex;
                align-items: center;
                padding: 0 8px;
                user-select: none;

                &.dark {
                    background: #333;
                    border-bottom: 1px solid #222;

                    .window-title {
                        color: #999;
                    }

                    .window-external-link {
                        color: #999;
                        &:hover {
                            color: #ccc;
                        }
                    }
                }

                .window-controls {
                    display: flex;
                    gap: 8px;
                    margin-right: 8px;

                    button {
                        width: 16px;
                        height: 16px;
                        border-radius: 50%;
                        border: none;
                        padding: 0;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        &.window-close {
                            background: #ff5f57;
                            color: white;
                            font-size: 10px;

                            &:hover {
                                background: #ff4b4b;
                            }
                        }
                    }
                }

                .window-title {
                    flex-grow: 1;
                    text-align: center;
                    font-size: 13px;
                    color: #666;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;

                    .favicon {
                        width: 16px;
                        height: 16px;
                        object-fit: contain;
                        border-radius: 4px;
                    }

                    .fa-globe {
                        font-size: 14px;
                    }
                }

                .window-external-link {
                    color: #666;
                    text-decoration: none;
                    font-size: 14px;
                    padding: 8px;
                    &:hover {
                        color: #333;
                    }
                }
            }

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
                height: calc(100% - 32px);
                top: 0;
                left: 0;
            }

            iframe.loading {
                position: absolute;
                width: 1px;
                height: 1px;
            }
        }

        &.img > .content {
            display: flex;
            justify-content: center;
            align-items: center;
            width: auto;
            height: auto;
            padding: 40px;
            max-width: 80vw;

            img {
                margin-top: 32px;
            }
        }

        > .bg-close-modal {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.2);
            z-index: 92;
        }
    }
</style>
