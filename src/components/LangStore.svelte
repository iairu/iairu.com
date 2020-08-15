<script context="module">
	import { writable } from 'svelte/store';
    export const lang = (()=>{
        const supported = ["en", "sk"]; // has to be lowercase and two-char only
        const { subscribe, update, set } = writable({
            supported: supported,
            current: undefined // sapper won't allow window here, init in _layout onMount
        })
        return {
            subscribe,
            changeTo: (anyLang)=>{
                // Initializes or changes current language
                // if first two chars in argument (case-unsensitive) aren't supported
                // and the language hasn't been inicalized it will default to supported[0]
                let l = typeof anyLang === 'string' && anyLang.substring(0,2).toLowerCase();
                update((w)=>{
                    if (l && (supported.includes(l) || w.current === undefined)) {
                        w.current = supported.includes(l) ? l : (w.current === undefined) ? supported[0] : w.current;
                    }
                    return w;
                })
            }
        }
    })();
</script>