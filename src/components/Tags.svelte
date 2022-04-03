<script>
    export let tags = "";
    export let dark = false;
</script>

<div class="tags" class:dark>
    {#each tags.split(",") as tag}
        <span>{tag.trim()}</span>
    {/each}
</div>

<style lang="scss" global>
    .tags {
        display: flex;
        flex-flow: row;
        flex-wrap: wrap;
        gap: 3px;
    }
    .tags>span {
        color: rgb(109, 109, 109);
        text-transform: uppercase;
        font-size: 11px;
        font-weight: bold;
        padding: 0 5px;
        border: 1px solid rgba(0,0,0,0.2);
        border-radius: 4px;
        white-space: nowrap;
        &:not(:last-child) {
            margin-right: 3px;
        }
    }
    .tags.dark>span {
        color: rgba(255,255,255,0.5);
    }
    @media screen {
        .tags.dark>span {border-color: rgba(255,255,255,0.2);}
    }
</style>