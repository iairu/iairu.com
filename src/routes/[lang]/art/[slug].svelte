<script context="module">
    import { getPost } from "./md.js";
    export async function preload({ params, query }) {
        // the `slug` parameter is available because
        // this file is called [slug].svelte
        return { post: getPost(params.slug, params.lang) };
    }
</script>

<script>
    import { onMount } from "svelte";
    import { lang } from "../../../components/LangStore.svelte";
    import { dark as darkstore } from "../../../components/DarkStore.svelte";
    import { darkHeader } from "../../../components/DarkStore.svelte";
    import Tags from "../../../components/Tags.svelte";
    import moment from "moment/src/moment.js";
    import "moment/src/locale/sk.js";
    import Error from "../../_error.svelte";
    import Nav from "../../../components/Nav.svelte";
    import C from "../../../components/Columns.svelte";

    export let post;
    export let dark = false;

    let currentLang = "en";
    const unsubLang = lang.subscribe((lng) => {
        currentLang = lng.current;
    });

    let toc;
    let content;

    function generateTOC(elm) {
        if (!elm.children) return;
        let links = [];
        for (var i in elm.children) {
            if (
                ["H1", "H2", "H3", "H4", "H5", "H6"].includes(
                    elm.children[i].tagName,
                ) &&
                elm.children[i].hasAttribute("id")
            ) {
                links.push({
                    href: "#" + elm.children[i].getAttribute("id"),
                    text: elm.children[i].innerText,
                    cls: elm.children[i].tagName,
                    hideExt: true,
                });
            }
        }
        return links;
    }

    function processDate(date) {
        moment.locale(currentLang);
        return moment(date).calendar();
    }

    onMount(() => {
        darkstore.set(dark);
        darkHeader.set(dark);
        if (content) {
            toc = generateTOC(content);
        }

        return () => {
            darkstore.set(false);
            darkHeader.set(false);
            unsubLang();
        };
    });
</script>

<svelte:head>
    {#if !post.error}
        <title
            >{post.metadata.title ? post.metadata.title : "Post"} :: iairu</title
        >
        <meta
            name="description"
            content={post.metadata.desc ? post.metadata.desc : ""}
        />
        <meta
            name="robots"
            content={post.metadata.robots
                ? post.metadata.robots
                : "index,follow"}
        />
    {:else}
        <title>{"404 Not Found"} :: iairu</title>
        <meta name="robots" content={"noindex,nofollow"} />
    {/if}
    <script>
        // Simple gallery handler WIP
        window.addEventListener("load", () => {
            window.currentGalleryIndex = 0;

            window.galleryShowImage = (img) => {
                window.currentGalleryFeatured = document.getElementById("featured");
                window.currentGalleryImages = document.querySelectorAll(".thumbnails img");
                window.currentGalleryFeatured.src = img.dataset.full || img.src;
                window.currentGalleryIndex = Array.from(window.currentGalleryImages).indexOf(img);
            }

            window.galleryOpenModal = (img) => {
                window.currentGalleryModal = document.getElementById("imageModal");
                window.currentGalleryModal.style.display = "block";
                window.galleryShowImage(img);
                document.body.style.overflow = "hidden";
            };

            window.galleryCloseModal = () => {
                window.currentGalleryModal = document.getElementById("imageModal");
                window.currentGalleryModal.style.display = "none";
                document.body.style.overflow = "auto";
            };

            window.galleryNextImage = () => {
                window.currentGalleryImages = document.querySelectorAll(".thumbnails img");
                window.currentGalleryIndex = (window.currentGalleryIndex + 1) % window.currentGalleryImages.length;
                window.galleryShowImage(window.currentGalleryImages[window.currentGalleryIndex]);
            };

            window.galleryPrevImage = () => {
                window.currentGalleryImages = document.querySelectorAll(".thumbnails img");
                window.currentGalleryIndex = (window.currentGalleryIndex - 1 + window.currentGalleryImages.length) % window.currentGalleryImages.length;
                window.galleryShowImage(window.currentGalleryImages[window.currentGalleryIndex]);
            };

            if (typeof window.internalGalleryKeyListener !== "function") {
                window.internalGalleryKeyListener = (e) => {
                    if (e.key === "Escape") {
                        window.galleryCloseModal();
                    } else if (window.currentGalleryModal && window.currentGalleryModal.style.display === "block") {
                        if (e.key === "ArrowRight") {
                            window.galleryNextImage();
                        } else if (e.key === "ArrowLeft") {
                            window.galleryPrevImage();
                        }
                    }
                }
            }
            
            document.removeEventListener("keydown", window.internalGalleryKeyListener);
            document.removeEventListener("keydown", window.internalGalleryKeyListener);
            document.addEventListener("keydown", window.internalGalleryKeyListener);
        });
    </script>
</svelte:head>

{#if post}
    <section class="post" class:dark>
        <div class="content-wrapper">
            {#if !post.error}
                {#if post.metadata.title || post.metadata.tags || post.metadata.desc || post.metadata.date}
                    <div class="metadata">
                        {#if post.metadata.date}<span class="date"
                                >{processDate(post.metadata.date)}</span
                            >{/if}
                        {#if post.metadata.title}<h1>
                                {post.metadata.title}
                            </h1>{/if}
                        {#if post.metadata.tags}<Tags
                                tags={post.metadata.tags}
                                {dark}
                            />{/if}
                        {#if post.metadata.desc}<p class="desc">
                                <i>{post.metadata.desc}</i>
                            </p>{/if}
                        <hr />
                    </div>
                {/if}
                {#if post.metadata.bg}<div
                        class="post-bg"
                        style={"background-image: url('/_dev/bgs/" +
                            post.metadata.bg +
                            ".jpg');"}
                    ></div>{/if}
                <C count={2} let:column np>
                    {#if column === 0}
                        {#if toc && toc.length}
                            <div class="toc">
                                <Nav nav={toc} />
                            </div>
                        {/if}
                    {:else}
                        <div class="content" bind:this={content}>
                            {#if post.html}{@html post.html}{/if}
                            <slot></slot>
                        </div>
                    {/if}
                </C>
            {:else}
                <span class="message error"
                    ><b>{post.error.code}</b> {post.error.msg}</span
                >
            {/if}
        </div>
    </section>
{:else}
    <Error
        status={404}
        error={{ message: "Specified file/language doesn't exist." }}
    />
{/if}

<style lang="scss" global>
    section.post {
        display: flex;
        justify-content: center;
        position: relative;
        /* margin-top: -2em; */
        > div.content-wrapper {
            width: 100%;
            position: relative;
            max-width: 1920px;
            box-sizing: border-box;
            padding: 0 calc(2em + 20px);
            padding-top: 2em;
            > .metadata {
                h1 {
                    margin-bottom: 0;
                }
                hr {
                    margin: 25px 0 0;
                }
                .date {
                    font-family: "Courier New", Courier, monospace;
                    font-size: 12px;
                }
            }
            > .metadata,
            > .multi-col {
                position: relative;
                z-index: 10;
            }
            > .post-bg {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                width: 100%;
                height: 40vh;
                opacity: 0.2;
                background-size: cover;
                background-position: center;
                &:after {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(transparent, white);
                }
            }
            .toc {
                position: sticky;
                top: 0;
                width: 250px;
                border-right: 1px solid rgba(0, 0, 0, 0.2);
                margin-right: 25px;
                top: 25px;
                box-sizing: border-box;
                nav {
                    flex-flow: column;
                    a {
                        &.H1 {
                            font-weight: bold;
                        }
                        &.H2,
                        &.H3,
                        &.H4,
                        &.H5,
                        &.H6 {
                            font-size: 12px;
                        }
                        &.H2 {
                            padding-left: 24px;
                        }
                        &.H3 {
                            padding-left: 48px;
                        }
                        &.H4,
                        &.H5,
                        &.H6 {
                            padding-left: 72px;
                        }
                    }
                }
            }
            .toc,
            .content {
                padding-top: 25px;
            }
            .content {
                h1 {
                    font-weight: bold;
                    margin-top: 70px;
                }
            }
            > .multi-col .column-1 {
                width: 100%;
                min-width: 0;
            }
            .gallery-container {
                max-width: 800px;
                margin: 0 auto;
                max-height: 100vh;
                overflow-y: auto;
                .modal {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1000;
                }

                .modal-backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    z-index: 1000;
                }

                .modal-content {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    padding: 20px;
                    z-index: 1001;
                }

                #featured {
                    max-height: 90vh;
                    max-width: 90vw;
                    object-fit: contain;
                    pointer-events: none;
                }

                .arrow {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(0, 0, 0, 0.5);
                    color: white;
                    border: none;
                    padding: 15px 20px;
                    cursor: pointer;
                    font-size: 20px;
                    transition: background 0.3s;
                    z-index: 1;
                }

                .arrow:hover {
                    background: rgba(0, 0, 0, 0.8);
                }

                .close {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    background: rgba(0, 0, 0, 0.5);
                    color: white;
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 24px;
                    transition: background 0.3s;
                    z-index: 1002;
                }

                .close:hover {
                    background: rgba(0, 0, 0, 0.8);
                }

                .prev {
                    left: 10px;
                }

                .next {
                    right: 10px;
                }

                .thumbnails {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                    justify-content: center;
                    padding: 20px;
                    margin-bottom: 10px;
                    border: 2px solid rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                    background: #f5f5f5;
                }

                .thumbnails img {
                    width: 100px;
                    height: 100px;
                    object-fit: cover;
                    cursor: pointer;
                    opacity: 1;
                    transition: opacity 0.3s;
                    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
                    border: 1px solid #ddd;
                }

                .thumbnails img:hover {
                    opacity: 1;
                }

                @media (max-width: 768px) {
                    .thumbnails img {
                        width: 80px;
                        height: 80px;
                    }

                    .arrow {
                        padding: 10px 15px;
                        font-size: 16px;
                    }
                }
            }
        }
        @media screen {
            &.dark {
                color: white;
                background: black;
            }
        }
    }
    @media screen {
        body.dark section.post > .post-bg:after {
            background: linear-gradient(transparent, black);
        }
    }
</style>
