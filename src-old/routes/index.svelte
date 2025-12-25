<script>
    import { onMount } from 'svelte';
    import { goto } from '@sapper/app';
    import { lang } from '../components/LangStore.svelte';

    onMount(()=>{
        // Client
        let windowLanguage = window.navigator.language.substring(0,2).toLowerCase();
        let supportedLanguage = $lang.supported.includes(windowLanguage) ? windowLanguage : $lang.supported[0];
        goto("/" + supportedLanguage, {replaceState: true});
    })
    
    // todo: append #... and/or ?... to redirect
</script>

<noscript>
    <p>It appears your browser doesn't have Javascript enabled.</p>
    <p>Please select a language:</p>
    <a href="/en">English</a>
    <a href="/sk">Slovak</a>
</noscript>