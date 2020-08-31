<script>
	import { lang } from '../../components/LangStore.svelte';
	import Header from '../../components/Header.svelte';
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
<!-- Site content -->
{#if !isIframe}
	<Header nav={[
		{icon: "fab fa-facebook-messenger", text: "Messenger", href: "https://m.me/iairu"},
		{icon: "fab fa-linkedin", text: "LinkedIn", href: "https://www.linkedin.com/in/ondrej-%C5%A1p%C3%A1nik-750335112/"},
		{icon: "fab fa-github", text: "GitHub", href: "https://github.com/iairu"},
		{icon: "fa fa-envelope", text: "E-mail: spanik11@msn.com", href: "mailto:spanik11@msn.com", hideExt: true}
	]} />
{/if}
<main class:iframe={isIframe}>
	<slot />
	{#if !isIframe}
	<S dark icon="fa fa-address-card" name="Kontakt" slug="contact">
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates culpa expedita accusamus dignissimos. Natus provident nostrum nisi quisquam impedit doloremque quod nulla temporibus, voluptatibus, nemo quo culpa veniam aliquam deserunt.
		</p>
		<Nav nav={[
			{icon: "fa fa-envelope", text: "E-mail: spanik11@msn.com", href: "mailto:spanik11@msn.com", isButton: true, modal: false, hideExt: true},
			{icon: "fab fa-facebook-messenger", text: "Messenger", href: "https://m.me/iairu"},
			{icon: "fab fa-linkedin", text: "LinkedIn", href: "https://www.linkedin.com/in/ondrej-%C5%A1p%C3%A1nik-750335112/"},
			{icon: "fab fa-github", text: "GitHub", href: "https://github.com/iairu"}
		]} />
	</S>
	{/if}
</main>
{#if !isIframe}<Footer copyright={"iairu"} />{/if}

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
		font-weight: 400;
		line-height: 1.2;
	}
	h1 {font-size: 2em;}
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
		background: #f0f0f0;
		border: 1px solid rgba(0,0,0,0.2);
		display: flex;
		flex-flow: column;
		padding: 10px;
		border-radius: 5px;
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
	main {
		position: relative;
		margin: 0 auto;
		box-sizing: border-box;
		&.iframe {
			padding-top: 2em;
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