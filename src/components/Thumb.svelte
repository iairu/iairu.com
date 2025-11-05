<script>
	import Tags from './Tags.svelte';
	import Nav from './Nav.svelte';
    import { href } from './Modal.svelte';
    import { lang } from './LangStore.svelte';
    import { onDestroy } from 'svelte';
    export let name = "";
    export let desc = "";
    export let from = "";
    export let progress = 0;
    export let to = "";
    export let tags = "";
    export let nav = [];
    export let icon = ""; // static/_thumbs/icons | expects svg if no format given | if it begins with fa, fontawesome will load instead
    export let bg = "default"; // static/_thumbs/bgs | expects jpg if no format given
    export let img = ""; // static/_thumbs/imgs | expects jpg if no format given
    export let bgOpacity = "";
    export let empty = false; // act as a filler (to make last flex-grow elms less stretched / ugly)
    export let bgNoFilter = false;
    export let dark = false;
    export let showIfTag = "";

    let l;
    const unsub = lang.subscribe((lng)=>{l = lng.current;});
    onDestroy(unsub);

    function calcDays(from,to,lng) {
        let SK = lng === "sk";
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        let fromArr = from.split("-");
        let toArr = to.split("-");
        let diffDays;
        if (fromArr.length < 3 || toArr.length < 3) {
            diffDays = 0;
        } else {
            let firstDate = new Date(fromArr[0], fromArr[1], fromArr[2]);
            let secondDate = new Date(toArr[0], toArr[1], toArr[2]);
            diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
        }
        let lang = (diffDays === 0) ? (SK ? "tý deň" : " days") : (diffDays === 1) ? (SK ? " deň" : " day") : SK ? ((diffDays < 5) ? " dni" : " dní") : " days";

        return diffDays + lang;
    }

    function progressBg(percentage) {
        return "/_thumbs/arrow-prog-" + ((percentage <= 33) ? "red" : (percentage <= 66) ? "orange" : "green") + ".svg";
    }

    function handleImageModal(e) {
        let src = e.target.getAttribute("src");
        href.set(src);
    }

</script>

{#if !showIfTag || (showIfTag && tags.includes(showIfTag.toLowerCase()))}
    <section 
        class="thumb"
        class:dark={dark}
        class:empty={empty}
        >
        <div class="content">

            <!-- Heading, Tags, Icon -->
            <div class="heading">
                <div class="col">
                    {#if name}<h3>{name}</h3>{/if}
                    {#if tags}
                        <Tags {tags} {dark} />
                    {/if}
                </div>
                {#if icon}
                {#if icon.match(/^fa/)}
                    <i class={"icon " + icon}></i>
                {:else}
                    <img class="icon" src={"/_thumbs/icons/" + (icon.includes(".") ? icon : icon + ".svg")} alt={name + " icon"}>
                {/if}
                {/if}
            </div>

            <!-- Description -->
            {#if desc}<p>{desc}</p>{/if}

            <!-- Image -->
            {#if img}<img class="img" src={"/_thumbs/imgs/" + (img.includes(".") ? img : img + ".jpg")} alt={name + " photo"} on:click={handleImageModal}>{/if}

            <!-- Navigation -->
            <Nav {nav} />

            <!-- Timeline -->
            {#if from}
            <div class="details">
                <span class="from">{from}</span>
                <div class="arrow tags" class:dark>
                    {#if to}<span class="days">{calcDays(from,to,l)}</span>{/if}
                    {#if progress}<div class="progress" style={"width: " + progress + "%; background-image: url('" + progressBg(progress) + "');"}></div>{/if}
                </div>
                <span class="to">{to ? to : "TBD"}</span>
            </div>
            {/if}

        </div>
        {#if bg}<img class="bg" src={"/_thumbs/bgs/" + (bg.includes(".") ? bg : bg + ".jpg")} style={(bgOpacity ? "opacity: " + bgOpacity + ";" : "") + (bgNoFilter ? "filter: none;" : "")} alt="Background">{/if}
    </section>
{/if}

<style lang="scss" global>
    section.thumb {
        position: relative;
        border: 1px solid rgba(59, 130, 246, 0.2);
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.05));
        background-size: cover;
        background-position: center;
        width: 350px;
        // height: 250px;
        box-sizing: border-box;
        padding: 25px;
        padding-bottom: 20px;
        color: black;
        border-radius: 10px;
        overflow: visible;
        transition: all 0.3s ease;
        box-shadow:
            0 0 20px rgba(59, 130, 246, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);

        @media (max-width: 900px) {width: 100%;}

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 15px;
            height: 15px;
            border-top: 2px solid rgba(59, 130, 246, 0.4);
            border-left: 2px solid rgba(59, 130, 246, 0.4);
            border-radius: 10px 0 0 0;
            transition: all 0.3s ease;
        }

        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            width: 15px;
            height: 15px;
            border-bottom: 2px solid rgba(59, 130, 246, 0.4);
            border-right: 2px solid rgba(59, 130, 246, 0.4);
            border-radius: 0 0 10px 0;
            transition: all 0.3s ease;
        }

        &:hover {
            transform: translateY(-4px);
            border-color: rgba(59, 130, 246, 0.4);
            box-shadow:
                0 0 30px rgba(59, 130, 246, 0.15),
                0 10px 25px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);

            &::before {
                width: 20px;
                height: 20px;
                border-color: rgba(59, 130, 246, 0.6);
            }

            &::after {
                width: 20px;
                height: 20px;
                border-color: rgba(59, 130, 246, 0.6);
            }
        }
        .content {
            display: flex;
            flex-flow: column;
            justify-content: flex-start;
            position: relative;
            height: 100%;
            z-index: 2;
        }
        .heading {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            .icon {
                width: 40px;
                font-size: 36px;
                color: rgba(59, 130, 246, 0.8);
                filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.3));
            }
            h3 {
                font-weight: bold;
                margin: 0;
            }
        }
        .col {
            display: flex;
            flex-flow: column;
            margin-right: 10px;
        }
        p {
            position: relative;
            overflow: hidden;
            flex: 1;
            margin-bottom: 5px;
        }
        .img {
            height: 80px;
            object-fit: cover;
            object-position: top;
            border: 1px solid rgba(0,0,0,0.2);
            border-radius: 5px;
            cursor: zoom-in;
        }
        .details {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 5px 0 0;
            color:rgba(0, 0, 0, 0.5);
            .arrow {
                flex: 1;
                margin: 0 5px;
                display: flex;
                position: relative;
                justify-content: center;
                align-items: center;
                min-height: 5px;
                background-image: url("/_thumbs/arrow-line.svg");
                background-repeat: repeat-x;
                background-size: 10px 1px;
                background-position: center;
                &:after {
                    content: "";
                    position: absolute;
                    right: 0;
                    width: 10px;
                    height: 15px;
                    background-image: url("/_thumbs/arrow-head.svg");
                    background-repeat: no-repeat;
                    background-position: center right;
                }
                .progress {
                    position: absolute;
                    height: 100%;
                    width: 0px;
                    z-index: 1;
                    left: 0;
                    background-image: url("/_thumbs/arrow-prog-green.svg");
                    background-repeat: repeat-x;
                    background-size: 10px 3px;
                    background-position: center;
                }
                .days {
                    position: relative;
                    z-index: 2;
                }
            }
        }
        .details .days {
            background: white;
        }
        .bg {
            display: none;
        }
        &.empty {
            margin-top: 0 !important;
            margin-bottom: 0 !important;
            height: 0;
            padding: 0;
            border: none;
        }
        @media screen {
            &.dark {
                border-color: rgba(255, 255, 255, 0.2);
                background-color: black;
                color: white;
                .details {
                    color: rgba(255, 255, 255, 0.5);
                    .arrow {
                        background-image: url("/_thumbs/arrow-line-w.svg");
                        &:after {background-image: url("/_thumbs/arrow-head-w.svg");}
                    }
                    .days {background: black;}
                }
                .heading .icon {color: white;}
                .img {border-color: rgba(255,255,255,0.2);}
                .bg { 
                    opacity: 0.3;
                    filter: contrast(0.5) brightness(1.5);
                }
            }
        }
        @media print {
            &, &>* {page-break-inside: avoid;} // doesnt work dont know why
            border-radius: 0;
            border: none;
            margin: 0 !important;
            .bg, .img, .heading .icon { display: none; }
            .details {
                .from:before { content: "Od: ";}
                .to:before { content: "Do: ";}
            }
        }
    }
</style>