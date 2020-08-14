<script>
	import Nav from './Nav.svelte';
    import { lang } from './LangStore.svelte';
    import { onDestroy } from 'svelte';
    
    export let spreadOut = false; // show as nav instead of select (for crawlers & sapper export parser)
    let l;
    let selected;
    const unsubscribe = lang.subscribe((lng)=>{l = lng;});
    onDestroy(unsubscribe);
</script>

{#if l && l.supported}

    {#if !spreadOut}
    <!-- svelte-ignore a11y-no-onchange (on:blur is a dumb idea because it only works after focus lost) -->
    <select name="lang" bind:value={selected} on:change={()=>{lang.changeTo(selected)}}>
        {#each l.supported as lng}
            <option value={lng} selected={lng === l.current}>{lng}</option>
        {/each}
    </select>
    {:else}
    <Nav nav={l.supported.map(lng => {
        return {text: lng, href: "/" + lng, modal: false, hideExt: true, sameTarget: true}
    })} />
    {/if}

{/if}