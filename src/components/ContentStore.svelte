<script context="module">
	import { writable } from 'svelte/store';

    // Content mode: 'it' or 'art'
    export const contentMode = writable('it');

    export const content = {
        subscribe: contentMode.subscribe,
        setMode: (mode) => {
            if (mode === 'it' || mode === 'art') {
                contentMode.set(mode);
            }
        }
    };
</script>
