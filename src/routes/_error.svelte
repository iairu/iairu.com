<script>
	export let status;
	export let error;
	import Layout from "./[lang]/_layout.svelte";

	const dev = process.env.NODE_ENV === 'development';
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<Layout external>
	<span class="message error"><b>{status}</b> {error.message}</span>

	{#if dev && error.stack}
		<pre>{error.stack}</pre>
	{/if}
</Layout>
