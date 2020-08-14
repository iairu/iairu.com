<script>
    import Nav from './Nav.svelte';
	import { stores } from '@sapper/app';
    const { page } = stores();
	import { dark } from './DarkStore.svelte';
    import LangSelector from './LangSelector.svelte';

    export let nav;

    let showHomeArrow = false;
    $: showHomeArrow = $page.path !== "/";
</script>

<header class:dark={$dark}>
    <div class="content">
        {#if showHomeArrow}<a class="home" href="/"><i class="fa fa-angle-double-left"></i></a>{/if}
        <div class="left">
            <img class="logo" src={!$dark ? "/_global/logo.svg" : "/_global/logo-w.svg"} alt="Logo">
            <LangSelector />
        </div>
        <Nav {nav} />
    </div>
</header>

<style lang="scss" global>
    header {
        display: flex;
        margin: calc(2em + 20px);
        margin-bottom: 0;
        border-bottom: 1px solid rgba(0,0,0,0.2);
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
            &.dark {border-color: rgba(255,255,255,0.2);}
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