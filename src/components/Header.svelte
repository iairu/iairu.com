<script>
    import Nav from './Nav.svelte';
	import { stores } from '@sapper/app';
    const { page } = stores();
	import { dark, darkHeader } from './DarkStore.svelte';
    import LangSelector from './LangSelector.svelte';
    import { lang } from "./LangStore.svelte";

    export let nav;
    export let useLangSelector = true;

    let showHomeArrow = false;
    let splitPath;
    $: splitPath = $page.path.split("/");
    $: showHomeArrow = splitPath.length > 3 || (splitPath.length === 3 && splitPath[splitPath.length - 1] !== "");
</script>

<header class:_dark={$dark || $darkHeader}>
    <div class="content">
        <!-- Left arrow disabled due to window.history not propagating, won't fix -->
        {#if false && showHomeArrow}<a class="home" href={"/" + ($lang.current ? $lang.current : "")}><i class="fa fa-angle-double-left"></i></a>{/if}
        <div class="left">
            <!-- <img class="logo" src={$dark || $darkHeader ? "/_global/logo-w.svg" : "/_global/logo.svg"} alt="Logo"> -->
            <img class="logo" src="/_global/logo.svg" alt="Logo">
            {#if useLangSelector}
            <LangSelector _dark={$dark || $darkHeader} />
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
            /* max-width: 1920px; */
            max-width: 1880px;
            padding: 0 20px 0 60px;
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
                height: 60px;
                opacity: 0.8;
                margin: 0;
                transform: scale(1.5);
            }
            .menu { // from LangSelector for logo offset
                left: 90px;
            }
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
        @media (max-width: 850px) {
            nav {
                .link-text {display: none;}
                .icon-ext {display: none;}
            }
        }
    }
</style>
