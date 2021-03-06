<script>
	import Tabs from './Tabs.svelte';
    import TabMenu from './TabMenu.svelte';
	import Tags from './Tags.svelte';
    import { onMount } from "svelte";
    import { getSlug } from "./scripts/stringToSlug.js";
    import { href } from "./Modal.svelte";
    import permalink from "./scripts/permalink.js";
    import { stores } from '@sapper/app';
    const { page } = stores();
    
    export let icon = "";
    export let name = "";
    export let slug = getSlug(name);
    export let importance = 1;
    export let hr = false;
    export let hrd = false; // hr dashed
    export let hrp = false; // hr with padding
    export let hrh = false; // hr with halved width
    export let row = false; // change flex from column to row wrap (900px+)
    export let pt = false; // extra padding top
    export let pb = false; // extra padding bottom
    export let nbt = false; // no border top
    export let nbb = false; // no border bottom
    export let cg = false; // flex-grow: 1; on all direct children = growth if in a row
    export let eq = false; // flex: 1; on all direct children = equivalent width if in a row
    export let fh = false; // fill height (height: 100%) (use example: bg picture in 2 col layout), 45vw on mobile
    export let wrapper = false; // no margin/padding (use for wrapper sections)
    export let sli = false; // fit heading & content into a single line (900px+)
    export let up = false; // move section up by 100px (if fh, height will be 100% + 100px) (900px+)
    export let tags = "";
    export let tabs = [];
    export let dark = false;
    export let light = false;
    export let bg = ""; // background CSS attribute, options: "bg-color bg-image position/bg-size bg-repeat bg-origin bg-clip bg-attachment", if dark or light is true, don't set color
    let tab;

</script>

<section class={"flex " + (row ? "row" : "col")} id={slug} 
    class:dark={dark} class:light={light} 
    class:pt={pt} class:pb={pb}
    class:nbt={nbt} class:nbb={nbb}
    class:cg={cg} class:eq={eq}
    class:sli={sli} class:fh={fh}
    class:up={up}
    class:wrapper={wrapper}
    style={bg ? "background: " + (dark ? "#222222 " : light ? "#ececec " : "") + bg + ";" : ""}
    >
    <div class="content-wrapper">
        {#if hr || hrd || hrp || hrh}<hr class:hrd class:hrp class:hrh>{/if}

        {#if name}
            <div class="heading-wrapper">
                <div class="heading" class:two={importance === 2}>
                    {#if importance === 1}
                        <h1>{#if icon}<i class={"icon " + icon}></i>{/if}{name}</h1>
                    {:else if importance === 2}
                        <h2>{#if icon}<i class={"icon " + icon}></i>{/if}{name}</h2>
                    {/if}
                    {#if tabs.length}<TabMenu names={tabs} bind:active={tab} />{/if}
                </div>
                <a class="permalink" aria-label="URL of this section" href={permalink($page.host, $page.path, slug)}><i class="fa fa-link"></i></a>
            </div>
        {/if}

        {#if tags}
            <Tags {tags} {dark} />
        {/if}

        {#if !tabs.length}
        <div class="content">
            <slot />
        </div>
        {:else}
        <Tabs names={tabs} bind:active={tab} hideMenu={name ? true : false}>
            <slot {tab} />
        </Tabs>
        {/if}
    </div>
</section>

<style lang="scss" global>
    section.flex {
        display: flex;
        justify-content: center;
        position: relative;
        overflow: hidden;
        @media print {page-break-after: always;}
        >div.content-wrapper {
            width: 100%;
            position: relative;
            max-width: 1920px;
            box-sizing: border-box;
            padding: 0 calc(2em + 20px);
            @media (max-width: 900px) {
                padding: 0 1.5em;
            }
            @media print {>hr { display: none; }}
            >div.heading-wrapper {
                display: flex;
                flex-flow: row;
                position: relative;
                align-items: center;
                >.heading {
                    position: relative;
                    display: flex;
                    flex-flow: row wrap;
                    align-items: center;
                    left: -30px; // trigger area for permalink
                    padding: 20px 30px 0;
                    margin: 0 0 0.5em 0; // from h1/h2
                    &:hover + a.permalink {visibility: visible;}
                    h1, h2 {
                        .icon {padding-right: 10px;}
                        margin: 5px 0;
                    }
                    &>*:not(:last-child) {margin-right: 15px;}
                }
                >a.permalink {
                    position: absolute;
                    top: 30px;
                    left: -40px;
                    opacity: 0.5;
                    padding: 0 10px;
                    font-size: 20px;
                    color: #8c9bb1;
                    outline: none;
                    visibility: hidden;
                    @media (max-width: 900px) {display: none;}
                    &:hover {
                        opacity: 0.7;
                        visibility: visible;
                    }
                    &:focus {
                        opacity: 1;
                        visibility: visible;
                    }
                }
                >.heading.two + a.permalink {
                    top: 27px;
                    left: -35px;
                    font-size: 16px;
                }
            }
            >div.content, >section.tabs>div.content {
                display: flex;
                flex-flow: column;
                width: 100%;
                >* {margin: 20px 0;}
            }
        }
        &.dark {
            color: white;
            background: #222222;
            border: 1px solid #2e2e2e;
            border-left: none;
            border-right: none;
        }
        &.light {
            background: #ececec;
            border: 1px solid #cfcfcf;
            border-left: none;
            border-right: none;
        }
        &.pt {padding-top: 20px;}
        &.pb {padding-bottom: 20px;}
        &.nbt {border-top: none;}
        &.nbb {border-bottom: none;}
        &.eq {
            >div.content-wrapper {
                >div.content>*, >section.tabs>div.content>* {flex: 1;}
            }
        }
        &.cg {
            >div.content-wrapper {
                >div.content>*, >section.tabs>div.content>* {flex-grow: 1;}
            }
        }
        &.wrapper {
            >div.content-wrapper {
                padding: 0;
                >div.content>* {margin: 0;}
            }
        }
        &.sli {
            @media (min-width: 901px) {
            >div.content-wrapper {
                display: flex;
                flex-flow: row;
                >div.heading-wrapper {
                    display: inline-flex;
                    align-items: flex-start;
                    >* {white-space: nowrap;}
                    >.heading {
                        margin: 0;
                        padding-bottom: 20px;
                    }
                }
                >div.content, >section.tabs>div.content {
                    justify-content: center;
                }
            }
            }
        }
        &.fh {
            height: 100%;
            @media (max-width: 900px) {
                height: 45vw;
            }
        }
        @media (min-width: 901px) {
            &.up {
                top: -100px;
                &.fh {height: calc(100% + 100px);}
            }
        }
    }
    section.flex.row>div.content-wrapper {
        >div.content, >section.tabs>div.content {
            flex-flow: row wrap;
            @media (max-width: 900px) {flex-flow: column;}
            >* {
                margin: 20px 40px 20px 0;
                @media (max-width: 900px) {margin-right: 0;}
            }
        }
    }
</style>