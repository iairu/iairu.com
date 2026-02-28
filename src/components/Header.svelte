<script>
    import Nav from './Nav.svelte';
	import { stores } from '@sapper/app';
    const { page } = stores();
	import { dark } from './DarkStore.svelte';
    import LangSelector from './LangSelector.svelte';
    import { lang } from "./LangStore.svelte";

    export let nav;
    export let useLangSelector = true;
    export let isTransparent = false;

    function toggleTheme() {
        dark.setManual(!$dark);
    }

    let showHomeArrow = false;
    let splitPath;
    $: splitPath = $page.path.split("/");
    $: showHomeArrow = splitPath.length > 3 || (splitPath.length === 3 && splitPath[splitPath.length - 1] !== "");
</script>

<header class:dark={$dark} class:transparent={isTransparent}>
    <div class="content">
        <a class="home" class:hidden={!showHomeArrow} href={"/" + ($lang.current ? $lang.current : "")}><i class="fa fa-angle-double-left"></i></a>
        <div class="left">
            <a href="/" class="logo" class:dark={$dark || isTransparent}>iairu</a>
            {#if useLangSelector}
            <LangSelector dark={$dark} />
            {/if}
        </div>
        <div class="right">
            <button class="theme-toggle" class:transparent={isTransparent} on:click={toggleTheme} aria-label="Toggle theme">
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
        border-bottom: 1px solid rgba(var(--theme-color-rgb), 0.2);
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
            box-sizing: border-box;
            .left {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                >*:not(:last-child) {
                    margin-right: 10px;
                }
                
                .logo {
                    font-size: 1.5rem;
                    font-weight: 900;
                    letter-spacing: -0.05em;
                    text-decoration: none;
                    margin-right: 20px;
                    color: black;
                    transition: color 0.3s ease;
                    
                    &.dark {
                        color: white;
                    }

                    &:hover {
                        color: rgba(var(--theme-color-rgb), 1);
                    }
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
                background: rgba(var(--theme-color-rgb), 0.1);
                border: 1px solid rgba(var(--theme-color-rgb), 0.2);
                border-radius: 0;
                cursor: pointer;
                color: rgba(var(--theme-color-rgb), 0.9);
                transition: all 0.2s ease;

                &:hover {
                    background: rgba(var(--theme-color-rgb), 0.2);
                    border-color: rgba(var(--theme-color-rgb), 0.4);
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
            visibility: hidden;
            padding: 0 20px 0 10px;
            font-size: 24px;
            color: #8c9bb1;
            outline: none;
            &:hover {opacity: 0.7;}
            &:focus {opacity: 1;}

            &.hidden {
                visibility: hidden;
                pointer-events: none;
                opacity: 0;
            }
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
        @media (max-width: 1200px) {
            .content {
                padding-left: 50px;
            }
            a.home {
                visibility: hidden;
            }
        }
        @media (max-width: 850px) {
            nav {
                .link-text {display: none;}
                .icon-ext {display: none;}
            }
        }
        &.transparent {
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;
            background: transparent !important;
            border-bottom: none !important;
            z-index: 100;
            color: white;

            .logo {
                color: white !important;
            }

            .theme-toggle {
                background: rgba(255, 255, 255, 0.1);
                border-color: rgba(255, 255, 255, 0.3);
                color: white;

                &:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            }

            :global(nav a) {
                color: rgba(255, 255, 255, 0.85);
                &:hover {
                    color: white;
                }
            }
        }
    }
</style>