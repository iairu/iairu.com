<script>
    export let count = 2; // number of columns, default: 2
    export let eq = false; // equivalently sized columns (flex: 1;)
    export let mrev = false; // reverse order on mobile screens (where shown as rows)
    export let mdel = -2; // number/array of numbers of the column(s) to be removed on mobile only
    export let sep = false; // add border separators on inner walls
</script>

<div class="multi-col" class:eq={eq} class:mrev={mrev} class:sep={sep}>
    {#each Array(count) as _x, column}
        <div 
            class:mdel-before={mdel === column-1 || mdel.length && mdel.includes(column-1)}
            class:mdel={mdel === column || mdel.length && mdel.includes(column)}
            class:mdel-after={mdel === column+1 || mdel.length && mdel.includes(column+1)}
        >
            <slot {column} />
        </div>
    {/each}
</div>

<style lang="scss" global>
    .multi-col {
        display: flex;
        flex-flow: row;

        &.eq>div {flex: 1;}
        >div:not(:first-of-type) {padding-left: 25px;}
        >div:not(:last-of-type) {padding-right: 25px;}
        &.sep>div:not(:first-of-type) {
            border-left: 1px solid rgba(0,0,0,0.2);
        }

        @media (max-width: 900px) {
            flex-flow: column;

            &.mrev {flex-flow: column-reverse;}
            >div:not(:first-of-type) {
                padding-left: 0px;
                padding-top: 25px;
            }
            >div:not(:last-of-type) {
                padding-right: 0px;
                padding-bottom: 25px;
            }
            &.sep>div:not(:first-of-type) {
                border-left: none;
                border-top: 1px solid rgba(0,0,0,0.2);
            }
            >div.mdel {display: none;}
            >div.mdel-after {padding-bottom: 0px;}
            >div.mdel-before {padding-top: 0px;}
        }
    }
</style>