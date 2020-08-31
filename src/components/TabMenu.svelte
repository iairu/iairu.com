<script>
    export let names = [];
    export let active = 0; // index of the active name from names array
    export let activeIsName = false; // use names instead of indexes (doesn't work well with localized words)
    export let clickHandler = (name, i)=>{}; // optional in cases where bind:active is too complex to implement
    export let attached = false; // display as if the tabs are attached to a panel below
    $: console.log(active);
    function internalClickHandler(i) {
        active = activeIsName ? names[i] : i;
        clickHandler(names[i],i);
    }
    function isActive(i, active) { // active has to be passed as arg. to propagate reactivity
        return (activeIsName && active === names[i]) || active === i;
    }
</script>

{#if names.length}
<div class="menu" class:attached={attached}>
    {#each names as tab, i}
        <button class:active={isActive(i, active)} on:click={()=>{internalClickHandler(i);}} tabindex={isActive(i, active) ? "-1" : "0"}>{tab}</button>
    {/each}
</div>
{/if}

<style lang="scss" global>
    .menu {
        position: relative;
        border: 1px solid rgba(0,0,0,0.2);
        border-radius: 5px;
        overflow: hidden;
        margin: 5px 0;
        button {
            background: #fff;
            border: none;
            cursor: pointer;
            border-right: 1px solid rgba(0,0,0,0.2);
            color: black;
            padding: 5px 15px;
            &:last-of-type {border-right: none;}
            &.active {
                background: #f1f1f1;
                cursor: default;
                outline: none;
            }
            &:not(.active):focus {
                background: #f8f8f8;
            }
        }
        &.attached {
            display: inline-flex;
            flex-flow: row;
            border: 1px solid rgba(0,0,0,0.2);
            border-bottom: none;
            border-radius: 5px 5px 0 0;
            overflow: hidden;
            margin-bottom: -1px;
            button {
                background: #fff;
                border: none;
                cursor: pointer;
                border-right: 1px solid rgba(0,0,0,0.2);
                border-bottom: 1px solid rgba(0,0,0,0.2);
                color: black;
                padding: 5px 15px;
                &:last-of-type {border-right: none;}
                &.active {
                    background: #f1f1f1;
                    border-bottom: none;
                    cursor: default;
                    outline: none;
                }
                &:not(.active):focus {
                    background: #f8f8f8;
                }
            }
        }
        @media print {display: none;}
    }
</style>