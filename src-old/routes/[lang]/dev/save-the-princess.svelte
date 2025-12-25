<script>
	import { onMount } from 'svelte';
	import Nav from '../../../components/Nav.svelte';
    import Post from "./[slug].svelte";
    import { lang } from '../../../components/LangStore.svelte';

    let gameWindow;
    let gameContainer;
    function rescaleGameWindow() {
        if (gameWindow && gameContainer) {
            let scale = gameContainer.clientWidth / gameWindow.clientWidth;
            let left = (gameWindow.clientWidth * scale - gameWindow.clientWidth) / 2;
            let top = (gameWindow.clientHeight * scale - gameWindow.clientHeight) / 2;
            let height = gameWindow.clientHeight * scale;
            gameWindow.style = "visibility: visible; position: absolute; transform: scale(" + scale + "); left: " + left + "px; top: " + top + "px;";
            gameContainer.style = "height: " + height + "px;";
        }
    }

    let l;
    let SK = false;
    $: SK = l.current === "sk"; // basically a macro
    const unsub = lang.subscribe((lng)=>{l = lng;});
    onMount(()=>{
        rescaleGameWindow();
        return ()=>{
            unsub();
        }
    })
</script>

<svelte:window
    on:resize={rescaleGameWindow}
    on:load={rescaleGameWindow}
/>

<Post post={{
    metadata: {
        title: "Save the Princess",
        tags: "javascript, game, 2d"
    }
}} dark>
    <div class="stp-wrapper">
        <div class="stp-container" bind:this={gameContainer}>
            <iframe class="stp-game" src="/_dev/save-the-princess/game.html" title="Game" frameborder="0" bind:this={gameWindow}></iframe>
        </div>
    </div>
    <div class="stp-footer">
        <Nav nav={[
            {icon: "fa fa-book", text: SK ? "Dokumentácia [PDF]" : "Docs (Slovak only) [PDF]", href:"/dl/save-the-princess.pdf"},
            {icon: "fa fa-redo-alt", text: SK ? "Reštartovať" : "Restart", fnc:()=>{document.getElementsByClassName('stp-game')[0].contentWindow.location.reload();}}
        ]} />
        <p>{SK ? "Grafické spracovanie aj implementácia kódu" : "Design and code"} &copy; Ondrej Špánik (iairu) 2020</p>
    </div>
    <p>
        {SK ? "Hlavným cieľom hry je prebojovať sa na vrch veže, ktorá je ukázaná v úvodnom videu a zachrániť princeznú."
            : "Main point of the game is to fight your way through to the top of the tower, which is shown in the intro video, and save the princess."}
    </p>
</Post>

<style lang="scss" global>
    .stp-wrapper {
        display: flex;
        width: 100%;
        justify-content: center;
    }
    .stp-container {
        position: relative;
        width: 100%;
        max-width: 1180px;
    }
    .stp-game {
        width: calc(1280px/2);
        height: calc(720px/2);
        visibility: hidden;
    }
    .stp-footer {
        display:flex;
        flex-flow:row;
        justify-content:space-between;
        nav {white-space: nowrap;}
    }
</style>