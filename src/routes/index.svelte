<script>
    import { onMount } from 'svelte';
    import { goto } from '@sapper/app';
    import { lang } from '../components/LangStore.svelte';
	import LangSelector from './../components/LangSelector.svelte';

    onMount(()=>{
        // Client
        let windowLanguage = window.navigator.language.substring(0,2).toLowerCase();
        let supportedLanguage = $lang.supported.includes(windowLanguage) ? windowLanguage : $lang.supported[0];
        goto("/" + supportedLanguage);
    })
</script>

<section style="opacity: 0;">
    <LangSelector useAnchors />
</section>