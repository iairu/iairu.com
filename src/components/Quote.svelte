<script>
    export let dark = false;
</script>

<p class="quote" class:dark={dark}>
    <slot />
</p>

<style lang="scss" global>
    .quote {
        padding: 15px;
        border-radius: 5px;
        font-style: italic;
        color: black;
        background-color: rgba(0,0,0,0.05);
        background-size: 50px;
        background-position: calc(100% - 15px) calc(100% + 10px);
        background-repeat: no-repeat;
        background-image: url("/_global/quote-w.svg");
        &.dark {
            color: white;
            background-color: rgba(255,255,255,0.05);
            background-image: url("/_global/quote.svg");
        }
    }
</style>