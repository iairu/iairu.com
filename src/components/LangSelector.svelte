<script>
	import TabMenu from './TabMenu.svelte';
	import Nav from './Nav.svelte';
    import { lang } from './LangStore.svelte';
    import { onDestroy } from 'svelte';
    import { goto } from '@sapper/app';
    
    export let useAnchors = false; // show as nav instead of select (for crawlers & sapper export parser)
    export let dark = false; // only supported with TabMenu (!useAnchors)
    let current;
    let supported;
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
        }
    }
    function handleLangChange(selected) {
        let previous = current;
        lang.changeTo(selected);
        replaceURILang(previous,current);
    }
</script>

{#if current && supported}

    {#if !useAnchors}
    <TabMenu names={supported} active={current} clickHandler={handleLangChange} activeIsName {dark} />
    {:else}
    <Nav nav={supported.map(lng => {
        return {text: lng, href: "/" + lng, modal: false, hideExt: true, sameTarget: true, static: true}
    })} />
    {/if}

{/if}