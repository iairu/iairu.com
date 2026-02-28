<script context="module">
	import { writable } from 'svelte/store';
    
    const createDarkStore = () => {
        let initial = false;
        if (typeof window !== 'undefined' && window.localStorage) {
            const stored = localStorage.getItem('theme-dark-manual');
            if (stored !== null) {
                initial = stored === 'true';
            }
        }
        
        const { subscribe, set, update } = writable(initial);
        
        return {
            subscribe,
            set,
            update,
            setManual: (val) => {
                if (typeof window !== 'undefined' && window.localStorage) {
                    localStorage.setItem('theme-dark-manual', String(val));
                }
                set(val);
            },
            restoreManual: () => {
                if (typeof window !== 'undefined' && window.localStorage) {
                    const stored = localStorage.getItem('theme-dark-manual');
                    if (stored !== null) {
                        set(stored === 'true');
                        return;
                    }
                }
                set(false);
            }
        };
    };

    export const dark = createDarkStore();
    export const darkHeader = writable(false);
</script>