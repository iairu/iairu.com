<script>
	import { lang } from '../../components/LangStore.svelte';
	import { dark } from '../../components/DarkStore.svelte';
	import Header from '../../components/Header.svelte';
	import Sidebar from '../../components/Sidebar.svelte';
	import SidebarToggle from '../../components/SidebarToggle.svelte';
	import Breadcrumbs from '../../components/Breadcrumbs.svelte';
	import { content, sidebarCollapsed } from '../../components/ContentStore.svelte';
	import '../../components/TechStyles.svelte';
	import { href } from '../../components/Modal.svelte';
	import Modal from '../../components/Modal.svelte';
	import { onMount } from 'svelte';
	import ToTop from '../../components/ToTop.svelte';
	import Nav from '../../components/Nav.svelte';
	import S from '../../components/Section.svelte';
	import Footer from '../../components/Footer.svelte';
	import { stores } from '@sapper/app';
	import Error from "../_error.svelte";
	const { page } = stores();

	export let external = false; // _layout is imported externally and language error shouldn't be checked
	let error = false;
	let sidebarOpen = false;

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	function closeSidebar() {
		sidebarOpen = false;
	}

	let isSidebarCollapsed = false;
	sidebarCollapsed.subscribe(collapsed => {
		isSidebarCollapsed = collapsed;
	});

	// Current Language and Slug from URL & lang store linkup
	let currentSlug = "";
	let currentURLlang = "en";
	const unsubPage = page.subscribe(({ path, params })=>{
		currentSlug = path;
		currentURLlang = params.lang;
	})
	$: lang.changeTo(currentURLlang); // Language Initialization
	let current;
	let supported;
	const unsubLang = lang.subscribe((lng)=>{
		current = lng.current;
		supported = lng.supported;
	});
	error = (!external && !supported.includes(currentURLlang)) ? true : false;
	
    function isHomepage(slug, lang) {
        return slug == "/" + lang || 
               slug == "/" + lang + "/";
    }

	// Dark theme handling
	dark.subscribe(isDark => {
		if (typeof document !== 'undefined') {
			if (isDark) {
				document.body.classList.add('dark-theme');
			} else {
				document.body.classList.remove('dark-theme');
			}
		}
	});

	// Content theme handling
	content.subscribe(mode => {
		if (typeof document !== 'undefined') {
			document.body.classList.remove('theme-it', 'theme-art');
			document.body.classList.add('theme-' + mode);
		}
	});

	// Checks relying on Window available after mounting & onDestroy
	let isIframe = false;
	onMount(()=>{
		if (window.location !== window.parent.location) { isIframe = true;}
		return ()=>{
			unsubLang();
			unsubPage();
		};
	})
</script>

{#if !error}
<!-- Grid Background -->
<div class="grid-bg"></div>

<!-- Site content -->
{#if !isIframe}
	<SidebarToggle onClick={toggleSidebar} isOpen={sidebarOpen} />
	<Header nav={[
		{icon: "fab fa-facebook-messenger", text: "Messenger", href: "https://m.me/iairu"},
		{icon: "fab fa-linkedin", text: "LinkedIn", href: "https://www.linkedin.com/in/iairu"},
		{icon: "fab fa-github", text: "GitHub", href: "https://github.com/iairu"},
		{icon: "fa fa-envelope", text: "E-mail: spanik11@gmail.com", href: "mailto:spanik11@gmail.com", hideExt: true}
	]} useLangSelector={isHomepage(currentSlug, currentURLlang)} />
{/if}
<div class="layout-container" class:iframe={isIframe}>
	{#if !isIframe}
	<Sidebar isOpen={sidebarOpen} />
	<!-- Overlay for mobile sidebar -->
	{#if sidebarOpen}
	<div class="sidebar-overlay" on:click={closeSidebar}></div>
	{/if}
	{/if}
	<main class:iframe={isIframe} class:with-sidebar={!isIframe} class:sidebar-collapsed={isSidebarCollapsed}>
		{#if !isIframe && !isHomepage(currentSlug, currentURLlang)}
		<Breadcrumbs />
		{/if}
		<slot />
		{#if !isIframe}
		<S dark icon="fa fa-address-card" name={current === "sk" ? "Kontakt" : "Contact"} slug="contact" pt pb sli>
			<Nav nav={[
				{icon: "fa fa-envelope", text: "E-mail: spanik11@gmail.com", href: "mailto:spanik11@gmail.com", isButton: true, modal: false, hideExt: true},
				{icon: "fab fa-facebook-messenger", text: "Messenger", href: "https://m.me/iairu"},
				{icon: "fab fa-linkedin", text: "LinkedIn", href: "https://www.linkedin.com/in/iairu"},
				{icon: "fab fa-github", text: "GitHub", href: "https://github.com/iairu"}
			]} />
		</S>
		{/if}
	</main>
</div>
{#if !isIframe}
<Footer copyright={"iairu"}>
	Powered by Svelte (Sapper framework), Vercel and FontAwesome
</Footer>
{/if}

<!-- Floating fixed pos. stuff -->
{#if !isIframe}<Modal />{/if}
<ToTop {isIframe} />
{:else}
	<Error 
		status={404}
		error={{message: "Specified file/language doesn't exist."}}
	/>
{/if}

<style lang="scss" global>
	@keyframes scalein {
		from {transform: scale(0.1);}
		to {transform: scale(1);}
	}
	@keyframes scaleout {
		from {transform: scale(1);}
		to {transform: scale(0.1);}
	}
	body {
		margin: 0;
		line-height: 1.5;
		color: #333;
		background: white;

		/* Default (IT) Theme Color: Blue */
		--theme-color-rgb: 59, 130, 246;

		&.theme-art {
			/* Art Theme Color: Green */
			--theme-color-rgb: 16, 185, 129;
		}
	}
	body, button {
		font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
		font-size: 14px;
	}
	h1, h2, h3, h4, h5, h6 {
		margin: 0 0 0.5em 0;
		line-height: 1.2;
	}
    h1 {
        font-size: 2em;
        font-weight: 400;
    }
    h2, h3, h4, h5, h6 {
		font-weight: bold;
	}
	a {color: inherit;}
	code {
		font-family: menlo, inconsolata, monospace;
		font-size: calc(1em - 2px);
		color: #555;
		background-color: #f0f0f0;
		padding: 1px 0.4em;
		border-radius: 0;
		border: 1px solid rgba(0,0,0,0.2);
	}
	pre {
        max-width: 100%;
		background: #f0f0f0;
		border: 1px solid rgba(0,0,0,0.2);
		display: flex;
		flex-flow: column;
		padding: 10px;
		border-radius: 0;
		overflow-x: auto;
	}
    blockquote {
        margin: 0;
        padding: 15px;
        border-radius: 0;
        font-style: italic;
        color: black;
        background-color: rgba(0,0,0,0.05);
        background-size: 50px;
        background-position: calc(100% - 15px) calc(100% + 10px);
        background-repeat: no-repeat;
        background-image: url("/_global/quote-w.svg");
        &.dark {
            color: white;
            background-color: rgba(255,255,255,0.05);
            background-image: url("/_global/quote.svg");
        }
    }
    img {
        max-width: 100%;
    }
	pre>code {border: none;}
	table {
		box-shadow: 0 0 10px rgba(0,0,0,0.2);
		border-radius: 0;
	}
	th {background-color: rgba(0,0,0,0.1);}
	tr:not(:last-child) td {border-bottom: 1px solid rgba(0,0,0,0.15);}
	th, td {padding: 5px 15px;}
	@media (min-width: 400px) {
		body, button {font-size: 16px;}
	}
	* {scrollbar-color: #C1C1C1 #F1F1F1;}
	body {
		background-repeat: no-repeat;
		color: black;
		background-color: white;
		transition: background-color 0.3s ease, color 0.3s ease;

		@media screen {
			&.dark, &.dark-theme {
				color: rgba(255, 255, 255, 0.85); /* Softer white for readability */
				background-color: #09090b; /* Premium dark shade */

				// Dark mode overrides for common elements
				h1, h2, h3, h4, h5, h6 {
					color: rgba(255, 255, 255, 0.95);
				}

				a {
					color: rgba(var(--theme-color-rgb), 0.9);

					&:hover {
						color: rgba(var(--theme-color-rgb), 1);
					}
				}

				code {
					background-color: rgba(255, 255, 255, 0.08);
					color: rgba(255, 255, 255, 0.9);
					border-color: rgba(255, 255, 255, 0.15);
				}

				pre {
					background: rgba(255, 255, 255, 0.03);
					border-color: rgba(255, 255, 255, 0.1);
				}

				blockquote {
					color: rgba(255, 255, 255, 0.85);
					background-color: rgba(255, 255, 255, 0.03);
					border-left: 4px solid rgba(var(--theme-color-rgb), 0.5);
					background-image: none; /* Removed the distracting quote image */
				}

				hr {
					border-color: rgba(255, 255, 255, 0.1);
				}

				select {
					border-color: rgba(255, 255, 255, 0.15);
					color: white;
					background: #111113;
				}

				/* Scrollbar for dark theme */
				&::-webkit-scrollbar-thumb {
					background: rgba(255, 255, 255, 0.2);
					&:hover {
						background: rgba(255, 255, 255, 0.3);
					}
				}
				&::-webkit-scrollbar-track {
					background: rgba(0, 0, 0, 0.2);
				}
				* {
					scrollbar-color: #555 #111;
				}
			}
		}
	}
	.layout-container {
		display: flex;
		gap: 0;
		max-width: 1920px;
		margin: 0 auto;
		padding: 0 20px 20px 0;
		box-sizing: border-box;
		position: relative;

		&.iframe {
			padding-top: 2em;
		}

		@media (max-width: 1200px) {
			padding: 20px;
		}
	}

	.sidebar-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 99;
		animation: fadein 0.3s;

		@media (min-width: 1200px) {
			display: none;
		}
	}

	@keyframes fadein {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	main {
		position: relative;
		flex: 1;
		min-width: 0;
		box-sizing: border-box;
		padding-top: 20px;
        transition: max-width 0.3s ease;

		&.with-sidebar {
			max-width: calc(100% - 310px);
            
            &.sidebar-collapsed {
                @media (min-width: 1200px) {
                    max-width: calc(100% - 70px);
                }
            }
		}

		&.iframe {
			padding-top: 2em;
		}

		@media (max-width: 1200px) {
			max-width: 100% !important;
		}
	}
	hr {
		border: none;
		border-top: 1px solid rgba(0,0,0,0.2);
		// margin: 0 20px;
		&.hrd {
			border-top: none;
            height: 10px;
            background: transparent;
            position: relative;
            overflow: hidden;
            
            &::before {
                content: '';
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: url("data:image/svg+xml,%3Csvg width='20' height='10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 5 L5 0 L15 10 L20 5' fill='none' stroke='rgba(0,0,0,0.2)' stroke-width='2'/%3E%3C/svg%3E") repeat-x;
            }
            
            :global(body.dark) &, :global(body.dark-theme) & {
                &::before {
                    background: url("data:image/svg+xml,%3Csvg width='20' height='10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 5 L5 0 L15 10 L20 5' fill='none' stroke='rgba(255,255,255,0.2)' stroke-width='2'/%3E%3C/svg%3E") repeat-x;
                }
            }
		}
		&.hrp {
			margin-top: 20px;
		}
		@media (min-width: 1000px) {
			&.hrh {
				margin-right: calc(50% + 20px);
			}
		}
	}
	select {
		background: transparent;
		border: 1px solid rgba(0,0,0,0.2);
		color: black;
	}
	table {
		width: 100%;
		margin-bottom: 10px;
	}
	span.message {
		padding: 5px 15px;
		&.error {
			background: crimson;
			color: white;
		}
	}
	@media print {
		@page { margin: 1.6cm; } // hide browser header/footer with page no. and other crap
		body { padding: 0; } // custom page margins
	}
</style>