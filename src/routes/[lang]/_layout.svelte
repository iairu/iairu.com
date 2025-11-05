<script>
	import { lang } from '../../components/LangStore.svelte';
	import Header from '../../components/Header.svelte';
	import Sidebar from '../../components/Sidebar.svelte';
	import SidebarToggle from '../../components/SidebarToggle.svelte';
	import Breadcrumbs from '../../components/Breadcrumbs.svelte';
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
	<main class:iframe={isIframe} class:with-sidebar={!isIframe}>
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
		border-radius: 2px;
		border: 1px solid rgba(0,0,0,0.2);
	}
	pre {
        max-width: 100%;
		background: #f0f0f0;
		border: 1px solid rgba(0,0,0,0.2);
		display: flex;
		flex-flow: column;
		padding: 10px;
		border-radius: 5px;
		overflow-x: auto;
	}
    blockquote {
        margin: 0;
        padding: 15px;
        border-radius: 5px;
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
		border-radius: 5px;
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
		@media screen {
			&.dark {
				color: white;
				background-color: black;
			}
		}
	}
	.layout-container {
		display: flex;
		gap: 30px;
		max-width: 1920px;
		margin: 0 auto;
		padding: 20px;
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

		&.with-sidebar {
			max-width: calc(100% - 310px);
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
			border-top: 1px dashed rgba(0,0,0,0.2);
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
	.dark select {
		border-color: rgba(255,255,255,0.2);
		color: white;
	} 
	@media screen {.dark hr {border-color: rgba(255,255,255,0.2);}}
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