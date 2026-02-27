<script>
    import Nav from './Nav.svelte';
	import { stores } from '@sapper/app';
    const { page } = stores();
	import { dark } from './DarkStore.svelte';
    import LangSelector from './LangSelector.svelte';
    import { lang } from "./LangStore.svelte";

    export let nav;
    export let useLangSelector = true;

    function toggleTheme() {
        dark.update(d => !d);
    }

    let showHomeArrow = false;
    let splitPath;
    $: splitPath = $page.path.split("/");
    $: showHomeArrow = splitPath.length > 3 || (splitPath.length === 3 && splitPath[splitPath.length - 1] !== "");
</script>

<header class:dark={$dark}>
    <div class="content">
        {#if showHomeArrow}<a class="home" href={"/" + ($lang.current ? $lang.current : "")}><i class="fa fa-angle-double-left"></i></a>{/if}
        <div class="left">
            {#if useLangSelector}
            <LangSelector dark={$dark} />
            {/if}
        </div>
        <div class="right">
            <button class="theme-toggle" on:click={toggleTheme} aria-label="Toggle theme">
                <i class="fa fa-{$dark ? 'sun' : 'moon'}"></i>
            </button>
            <Nav {nav} />
        </div>
    </div>
</header>

<style lang="scss" global>
    header {
        display: flex;
        padding: 1em 2em;
        background: white;
        border-bottom: 1px solid rgba(59, 130, 246, 0.2);
        @media (max-width: 850px) {
            border-color: #ccc;
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
                .selectors {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }
            }
            .right {
                display: flex;
                align-items: center;
                gap: 15px;
                flex-wrap: wrap;
            }

            .theme-toggle {
                padding: 8px 12px;
                background: rgba(59, 130, 246, 0.1);
                border: 1px solid rgba(59, 130, 246, 0.2);
                border-radius: 6px;
                cursor: pointer;
                color: rgba(59, 130, 246, 0.9);
                transition: all 0.2s ease;

                &:hover {
                    background: rgba(59, 130, 246, 0.2);
                    border-color: rgba(59, 130, 246, 0.4);
                }

                i {
                    font-size: 16px;
                }
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