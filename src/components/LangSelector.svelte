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
            let path = window.location.pathname;
            let urilangLen = ("/" + current).length;
            let urilang = path.substring(1,urilangLen);
            let trailing = path.substring(urilangLen,urilangLen + 1);
            if (urilang === current && [undefined,""].includes(trailing)) {
                let restofuri = path.substring(urilangLen);
                goto("/" + _new + restofuri);
            }
            console.log(urilang, current, trailing);
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