<script>
    import Nav from './Nav.svelte';
	import { stores } from '@sapper/app';
    const { page } = stores();
	import { dark, darkHeader } from './DarkStore.svelte';
    import LangSelector from './LangSelector.svelte';
    // import { lang } from "./LangStore.svelte";

    export let nav;
    // export let useLangSelector = true;

    let notHomepage = false;
    let splitPath;
    $: splitPath = $page.path.split("/");
    $: notHomepage = splitPath.length > 3 || (splitPath.length === 3 && splitPath[splitPath.length - 1] !== "");
</script>

<header class:_dark={$dark || $darkHeader}>
    <div class="content">
        <!-- Left arrow disabled due to window.history not propagating, won't fix -->
        <!-- {#if notHomepage}<a class="home" href={"/" + ($lang.current ? $lang.current : "")}><i class="fa fa-angle-double-left"></i></a>{/if} -->
        <div class="left">
            <!-- <img class="logo" src={$dark || $darkHeader ? "/_global/logo-w.svg" : "/_global/logo.svg"} alt="Logo"> -->
            {#if notHomepage}
                <img class="logo" src="/_global/logo.svg" alt="Logo">
            {:else}
                <LangSelector _dark={$dark || $darkHeader} useAnchors />
            {/if}
        </div>
        <Nav {nav} />
    </div>
</header>

<style lang="scss" global>
    header {
        display: flex;
        /* padding: 1em calc(2em + 20px) 0.6em; */
        padding: 1em 0 0;
        height: 60px;
        overflow: hidden;
        @media (max-width: 850px) {
            border-color: transparent;
        }
        .content {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            align-items: flex-start;
            position: relative;
            max-width: 1820px;
            padding: 0 20px 0 25px;
            @media (max-width: 900px) {
                padding: 0 15px 0 20px;
            }
            margin: 0 auto;
            flex: 1;
            .left {
                display: flex;
                align-items:flex-end;
                margin-bottom: 10px;
                >*:not(:last-child) {
                    margin-right: 10px;
                }
            }
            .logo {
                position: absolute;
                width: auto;
                top: 3px;
                left: 20px;
                height: 60px;
                opacity: 0.8;
                margin: 0 0 0 20px;
                transform: scale(1.5);
            }
            /* .menu { // from LangSelector for logo offset
                left: 90px;
            } */
        }
        a.home {
            position: absolute;
            left: -40px;
            top: 2px;
            opacity: 0.5;
            padding: 0 10px;
            font-size: 24px;
            color: #8c9bb1;
            outline: none;
            &:hover {opacity: 0.7;}
            &:focus {opacity: 1;}
        }
        @media screen {
            &.dark {
                background: black;
                border-color: rgba(255,255,255,0.2);
            }
        }
        @media print {
            a.home {display: none;}
        }
        .content {
            @media (max-width: 1250px) and (min-width: 851px) {
                > nav > :not(:nth-last-child(-n+3)) {
                    .link-text, .icon-ext {
                        display: none;
                    }
                }
            }
            @media (max-width: 850px) and (min-width: 701px) {
                > nav > :not(:nth-last-child(-n+1)) {
                    .link-text, .icon-ext {
                        display: none !important;
                    }
                }
            }
            @media (max-width: 700px) {
                > nav {
                    .link-text, .icon-ext {
                        display: none !important;
                    }
                }
            }
            @media (max-width: 500px) and (min-width: 351px) {
                > nav > :not(:nth-last-child(-n+4)) {
                    display: none;
                }
            }
            @media (max-width: 350px) and (min-width: 301px) {
                > nav > :not(:nth-last-child(-n+3)) {
                    display: none;
                }
            }
            @media (max-width: 300px) {
                > nav > :not(:nth-last-child(-n+2)) {
                    display: none;
                }
            }
        }
    }
</style>
