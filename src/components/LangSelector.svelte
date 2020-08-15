<script>
	import Nav from './Nav.svelte';
    import { lang } from './LangStore.svelte';
    import { onDestroy } from 'svelte';
    import { goto } from '@sapper/app';
    
    export let spreadOut = false; // show as nav instead of select (for crawlers & sapper export parser)
    let current;
    let supported;
    let selected;
    const unsubscribe = lang.subscribe((lng)=>{
        current = lng.current;
        supported = lng.supported;
    });
    onDestroy(unsubscribe);
    function replaceURILang(current,_new) {
        if (typeof window !== 'undefined') {
            let restofuri = window.location.pathname.substring(("/" + current).length);
            goto("/" + _new + restofuri);
            // window.history.pushState(null,window.title,"/" + _new + restofuri);
        }
    }
    function isSelected(lng, current) {
        // This has to be a function for reactivity to take place on lang.changeTo event
        if (lng === current) selected = lng;
        return lng === current;
    }
</script>

{#if current && supported}

    {#if !spreadOut}
    <!-- svelte-ignore a11y-no-onchange (on:blur is a dumb idea because it only works after focus lost) -->
    <select name="lang" bind:value={selected} on:change={()=>{
        let previous = current;
        lang.changeTo(selected);
        replaceURILang(previous,current);
    }}>
        {#each supported as lng}
            <option value={lng} selected={isSelected(lng,current)}>{lng}</option>
        {/each}
    </select>
    {:else}
    <Nav nav={supported.map(lng => {
        return {text: lng, href: "/" + lng, modal: false, hideExt: true, sameTarget: true, static: true}
    })} />
    {/if}

{/if}