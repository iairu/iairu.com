<script>
    export let names = [];
    export let active = 0;
    export let attached = false; // display as if the tabs are attached to a panel below
</script>

{#if names.length}
<div class="menu" class:attached={attached}>
    {#each names as tab, i}
        <button class:active={active === i} on:click={()=>{active = i;}} tabindex={active === i ? "-1" : "0"}>{tab}</button>
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