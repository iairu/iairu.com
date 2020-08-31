<script>
    import Nav from './Nav.svelte';
	import { stores } from '@sapper/app';
    const { page } = stores();
	import { dark, darkHeader } from './DarkStore.svelte';
    import LangSelector from './LangSelector.svelte';
    import { lang } from "./LangStore.svelte";

    export let nav;

    let showHomeArrow = false;
    let splitPath;
    $: splitPath = $page.path.split("/");
    $: showHomeArrow = splitPath.length > 3 || (splitPath.length === 3 && splitPath[splitPath.length - 1] !== "");
</script>

<header class:dark={$dark || $darkHeader}>
    <div class="content">
        {#if showHomeArrow}<a class="home" href={"/" + ($lang.current ? $lang.current : "")}><i class="fa fa-angle-double-left"></i></a>{/if}
        <div class="left">
            <img class="logo" src={$dark || $darkHeader ? "/_global/logo-w.svg" : "/_global/logo.svg"} alt="Logo">
            <LangSelector dark={$dark || $darkHeader} />
        </div>
        <Nav {nav} />
    </div>
</header>

<style lang="scss" global>
    header {
        display: flex;
        padding: calc(2em + 20px);
        // padding-bottom: 0;
        // border-bottom: 1px solid rgba(0,0,0,0.2);
        @media (max-width: 850px) {
            border-color: transparent;
        }
        .content {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            align-items: flex-start;
            position: relative;
            max-width: 1920px;
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
                width: 120px;
                opacity: 0.8;
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