<script context="module">
    import { getPost } from './md.js';
    export async function preload({ params, query }) {
        // the `slug` parameter is available because
        // this file is called [slug].svelte
        return { post: getPost(params.slug) };
    }
</script>

<script>
    import { onMount } from 'svelte';
    import { dark as darkstore } from "../../../components/DarkStore.svelte";
    import { darkHeader } from "../../../components/DarkStore.svelte";
    import Tags from "../../../components/Tags.svelte";
    import moment from "moment/src/moment.js";
    import "moment/src/locale/sk.js";
    import Error from "../../_error.svelte";
    import Nav from '../../../components/Nav.svelte';
    import C from "../../../components/Columns.svelte";

    export let post;
    export let dark = false;

    let toc;
    let content;

    function generateTOC(elm) {
        if (!elm.children) return;
        let links = [];
        for(var i in elm.children) {
            if (["H1","H2","H3","H4","H5","H6"].includes(elm.children[i].tagName) && elm.children[i].hasAttribute("id")) {
                links.push({
                    href: "#" + elm.children[i].getAttribute("id"),
                    text: elm.children[i].innerText,
                    cls: elm.children[i].tagName,
                    hideExt: true
                });
            }
        }
        return links;
    }

    function processDate(date) {
        moment.locale("sk");
        return moment(date).calendar();
    }

    onMount(()=>{
        darkstore.set(dark);
        darkHeader.set(dark);
        if (content) {toc = generateTOC(content);}
        return (()=>{
            darkstore.set(false);
            darkHeader.set(false);
        })
    });
</script>

<svelte:head>
    {#if !post.error}
    <title>{post.metadata.title ? post.metadata.title : "Post"} :: iairu</title>
    <meta name="description" content={post.metadata.desc ? post.metadata.desc : ""}>
    <meta name="robots" content={post.metadata.robots ? post.metadata.robots : "index,follow"}>
    {:else}
    <title>{"404 Not Found"} :: iairu</title>
    <meta name="robots" content={"noindex,nofollow"}>
    {/if}
</svelte:head>

{#if post}
<section class="post" class:dark={dark}>
    <div class="content-wrapper">
        {#if !post.error}
            {#if post.metadata.title || post.metadata.tags || post.metadata.desc || post.metadata.date}
                <div class="metadata">
                    {#if post.metadata.date}<span class="date">{processDate(post.metadata.date)}</span>{/if}
                    {#if post.metadata.title}<h1>{post.metadata.title}</h1>{/if}
                    {#if post.metadata.tags}<Tags tags={post.metadata.tags} {dark} />{/if}
                    {#if post.metadata.desc}<p class="desc"><i>{post.metadata.desc}</i></p>{/if}
                    <hr>
                </div>
            {/if}
            {#if post.metadata.bg}<div class="post-bg" style={"background-image: url('/_dev/bgs/" + post.metadata.bg + ".jpg');"}></div>{/if}
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
            <span class="message error"><b>{post.error.code}</b> {post.error.msg}</span>
        {/if}
    </div>
</section>
{:else}
<Error 
    status={404}
    error={{message: "Specified file/language doesn't exist."}}
/>
{/if}

<style lang="scss" global>
    section.post {
        display: flex;
        justify-content: center;
        position: relative;
        margin-top: -2em;
        >div.content-wrapper {
            width: 100%;
            position: relative;
            max-width: 1920px;
            box-sizing: border-box;
            padding: 0 calc(2em + 20px);
            padding-top: 2em;
            >.metadata {
                h1 { margin-bottom: 0;}
                hr { margin: 25px 0;}
                .date {
                    font-family:'Courier New', Courier, monospace;
                    font-size: 12px;
                }
            }
            >.metadata,
            >.multi-col {
                position: relative;
                z-index: 10;
            }
            >.post-bg {
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
                nav {
                    flex-flow: column;
                    a {
                        &.H2 {font-size: 12px; padding-left: 24px;}
                        &.H3 {padding-left: 48px;}
                        &.H4, &.H5, &.H6 {padding-left: 72px;}
                    }
                }
            }
            >.multi-col .column-1 { width: 100%; }
        }
        @media screen {
            &.dark {
                color: white;
                background: black;
            }
        }
    }
    @media screen {
        body.dark section.post>.post-bg:after {
            background: linear-gradient(transparent, black);
        }
    }
</style>
