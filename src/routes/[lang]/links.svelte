<script>
    import Quote from '../../components/Quote.svelte';
    import S from '../../components/Section.svelte';
    import C from "../../components/Columns.svelte";
    import { lang } from '../../components/LangStore.svelte';
    import Thumb from '../../components/Thumb.svelte';
    import LangSelector from '../../components/LangSelector.svelte';
    import { onMount } from 'svelte';
    import TabMenu from '../../components/TabMenu.svelte';
	
    let l;
    let SK = false;
    $: SK = l.current === "sk"; // basically a macro
    const unsub = lang.subscribe((lng)=>{l = lng;});
    onMount(()=>{
        return ()=>{
            unsub();
        }
    });
</script>

<svelte:head>
    <title>Links :: iairu</title>
    <meta name="description" content="All the good things I would like to share, but not with Google.">
    <meta name="robots" content="noindex,nofollow">
</svelte:head>

<S dark wrapper bg="url('/_links/ms_knn_2_out.jpg') top no-repeat" >
<C count={2} let:column mdel={1} styles={["flex: 2;", "flex: 1;"]}>
    {#if column === 0}
    <S nbt nbb sli>
        <div style="display: flex; flex-flow: row; flex-wrap: wrap; align-items: center; gap: 15px; opacity: 0.5;">
            {#if SK}
                <span>Vitaj! Môj nick je </span> 
                <TabMenu dark names={["@iairu"]} /> 
                <span> na väčšine stránok a táto je v </span>
                <LangSelector dark />
                <span> jazykoch.</span>
            {:else}
                <span>Welcome! I'm </span> 
                <TabMenu dark names={["@iairu"]} /> 
                <span> on most sites, with this one is available in </span>
                <LangSelector dark />
                <span> languages.</span>
            {/if}
        </div>
    </S>
    <S dark tp name={SK ? "Odkazy na sociálne médiá a iné zaujímavosti" : "Links to social media and other interesting things"} slug="top" tags={"social media, favorite places"} nbb pb>
    </S>
    {:else}
    <S bg="url('/_links/menhera.png') 30% 40%/contain no-repeat" fh />
    {/if}
</C>
</S>

<S row light icon="fa fa-star" name={SK ? "Najpoužívanejšie" : "Most used"} bg="url('/_links/beach.jpg') top repeat-x" pt pb cg>
    <Quote>
        {#if SK}
            Každá z mojich obľúbených a releventných stránok alebo aplikácií je sprevádzaná so super-špeciálnou fičúrou unikátnou pre túto
            stránku, <b>uwu meradlo</b>, ktoré naznačuje ako veľmi <b>uwu</b> sa cítim na danej stránke/aplikácií, s prizrením na môj aj
            iných obsah. 
        {:else}
            Each of my favorite relevant sites or apps are accompanied by a very special feature unique to this site, an <b>uwu meter</b>,
            which implies how <b>uwu</b> it feels being on the given site/app, taking my content and others' content into account.
        {/if}
    </Quote>
    <C count={2} let:column eq wrap np>
        {#if column === 0}
        <S row icon="fa fa-slash" name={SK ? "Niečo medzi" : "In-between"} importance={2} hrd cg>
            <Thumb 
                name="Discord: iairu#6678"
                icon="fab fa-discord"
                tags="special kind of chat, mostly inside"
                desc={ SK ? "Super špeciálne miesto pre špeciálnych ľudí. Zvyšok budeš musieť objaviť sám." 
                        : "A very special place for special people. The rest you will have to discover yourself."}
                nav={[
                ]}
                from="80%"
                progress=80
                to="uwu"
                />
            <Thumb 
                name="instagram.com/spanik11"
                icon="fab fa-instagram"
                tags="random life moments, chat, mostly outside"
                desc={ SK ? "Stále si nie som istý, či to bol dobrý nápad dať všetko toto na svetlo sveta, ale OK asi..."
                        : "Still not sure if it was a good idea to put this stuff out there for the world to see, but OK I guess..."}
                nav={[
                    {icon: "fa fa-share", text: SK ? "Navštíviť" : "Visit", href:"https://instagram.com/spanik11", isButton: true},
                ]}
                from="50%"
                progress=50
                to="uwu"
                />
        </S>
        {:else}
        <S row icon="fa fa-user" name={SK ? "Expresívne" : "Expression"} importance={2} hrd cg>
            <Thumb 
                name="anilist.co/user/iairu"
                icon="fa fa-eye"
                tags="anime tracker, stuff i'm watching"
                desc={ SK ? "Niektorí ľudia preferujú relaxovať spôsobmi meditácie alebo prechádzky. Pre mňa je to hlavne čaj, jedlo a anime."
                        : "Some people prefer relaxing by means of meditation or going for a walk. For me it's mostly tea, food and anime."}
                nav={[
                    {icon: "fa fa-share", text: SK ? "Navštíviť" : "Visit", href:"https://anilist.co/user/iairu/", isButton: true},
                ]}
                from="99%"
                progress=99
                to="uwu"
                />
            <Thumb 
                name="youtube.com/@iairu"
                icon="fab fa-youtube"
                tags="random videos, creative, some music playlists"
                desc={ SK ? "Občas experimentujem s rýchlym kreatívnym nápadom, ktorý sa nehodí na moje zvyšné kanály, tak ho hodím sem."
                        : "Occasionally I experiment with a quick creative idea that isn't suited for any of my other channels, so I drop it here."}
                nav={[
                    {icon: "fa fa-share", text: SK ? "Navštíviť" : "Visit", href:"https://youtube.com/@iairu/", isButton: true},
                ]}
                from="65%"
                progress=65
                to="uwu"
                />
        </S>
        {/if}
    </C>
    <S row icon="fa fa-comment" name={SK ? "Komunikačné" : "Communication"} importance={2} hrd cg fw>
        <Thumb 
            name="messenger.com/iairu"
            icon="fab fa-facebook-messenger"
            tags="family and business chat, quick and short-term stuff"
            desc="My preferred way of doing business and talking to friends on the regular. Want to explore a creative idea? Hit me up here!"
            nav={[
                {icon: "fa fa-share", text: SK ? "Navštíviť" : "Visit", href:"https://messenger.com/iairu/", isButton: true},
            ]}
            />
        <Thumb 
            name="spanik11@gmail.com"
            icon="fa fa-at"
            tags="old-school chat, complex or long-term stuff"
            desc="Unless you got something complex that takes up a third of an A4 page or more, please hit me up on Messenger instead."
            nav={[
            ]}
            />
    </S>
</S>

<S row dark icon="fa fa-quote-right"  bg="url('/_links/ms_knn_2_out.jpg') top no-repeat"  nhl pt pb cg>
    <S row icon="fa fa-stopwatch" name={SK ? "Aké žánry hudby počúvam najviac?" : "What music genres do I listen to the most?"} importance={2} hrd cg>
        <Thumb dark tp
            name={ SK ? "Nostalgická 2000s rádio hudba" : "Nostalgic 2000s radio music"}
            progress=23
            to="23%"
            bgOpacity=0.1
            />
        <Thumb dark tp
            name="Touhou Music Circles"
            progress=19
            to="19%"
            bgOpacity=0.1
            />
        <Thumb dark tp
            name={ SK ? "Japonský Pop a Rock" : "Japanese Pop and Rock"}
            progress=17
            to="17%"
            bgOpacity=0.1
            />
        <Thumb dark tp
            name="Techno, Trance, Nightcore"
            progress=12
            to="12%"
            bgOpacity=0.1
            />
        <Thumb dark tp
            name={SK ? "Rock, Metal a podobné" : "Rock, Metal and similar"}
            progress=12
            to="12%"
            bgOpacity=0.1
            />
        <Thumb dark tp
            name="Synthwave"
            progress=10
            to="10%"
            bgOpacity=0.1
            />
    </S>
</S>


<S row icon="fa fa-comment-dots" name={SK ? "Ostatné" : "Others"} pt pb cg>
    <S row icon="fa fa-star-half-alt" name={SK ? "Najmenej používané" : "Least used"} importance={2} hrd eq>
        <Thumb 
            name="WhatsApp: iairu"
            icon="fab fa-whatsapp"
            desc={SK ? "Ak preferuješ WhatsApp nad Messengerom, tak mi to nevadí, len nepoznám takmer nikoho, kto ho používa." 
                    : "If you prefer WhatsApp over Messenger I'm fine with that, it's just that most people I talk with don't use it."}
            nav={[
            ]}
            />
        <Thumb 
            name="facebook.com/iairu"
            icon="fab fa-facebook"
            desc={ SK ? "Okolo 2014teho som sa oň prestal starať a odvtedy táto stránka poňala prístup MySpace k seba-deštrukcií. Používam ju len na prehliadanie udalostí v mojom meste."
                    : "I stopped caring around 2014 and since then this site has taken the MySpace approach of self-destructing. I'm still waiting for that though and only use it to browse what's happening in my town."}
            nav={[
                {icon: "fa fa-share", text: SK ? "Navštíviť" : "Visit", href:"https://facebook.com/iairu/", isButton: true},
            ]}
            />
        
    </S>

    <S row icon="fa fa-copy" name={SK ? "Portfóliá" : "Portfolios"} importance={2} hrd eq>
        <Thumb
            name="iairu.com"
            icon="fa fa-file-alt"
            desc={ SK ? "Moje profesionálne portfólio (na rozdiel od tejto stránky), ktoré obsahuje aj moje informatické veci (momentálne hlavné) a trochu kreatívnych (zastaralé)."
                    : "My professional portfolio (unlike this site you're on right now) which includes both my CS stuff (currently main focus) and a bit of Creative (outdated mostly)."}
            nav={[
                {icon: "fa fa-share", text: SK ? "Navštíviť" : "Visit", href:"https://iairu.com", isButton: true},
            ]}
            />
        
    </S>
</S>

<S row dark icon="fa fa-quote-right" bg="url('/_links/ms_knn_2_out.jpg') top no-repeat" nhl pt pb cg>
    <C count={2} let:column eq wrap np>
        {#if column === 0}
        <S row icon="fa fa-stopwatch" name={SK ? "Kde trávim najviac času?" : "Where do I spend most of my time?"} importance={2} hrd cg>
            <Thumb dark tp
                name={ SK ? "Spánok (~8h)" : "Sleep (~8h)"}
                progress=33
                to="33%"
                bgOpacity=0.1
                />
            <Thumb dark tp
                name={ SK ? "Škola" : "School"}
                progress=17
                to="17%"
                bgOpacity=0.1
                />
            <Thumb dark tp
                name={ SK ? "Práca" : "Work"}
                progress=16
                to="16%"
                bgOpacity=0.1
                />
            <Thumb dark tp
                name={ SK ? "Domáce práce" : "Chores"}
                progress=11
                to="11%"
                bgOpacity=0.1
                />
            <Thumb dark tp
                name={ SK ? "Kreatívne" : "Creative"}
                progress=6
                to="6%"
                bgOpacity=0.1
                />
            <Thumb dark tp
                name={ SK ? "(Voľný čas)" : "(Free time)"}
                progress=17
                to="17%"
                bgOpacity=0.1
                />
            
        </S>
        {:else}
        <S row icon="fa fa-stopwatch" name={SK ? "Kde trávim najviac voľného času?" : "Where do I spend most of my free time?"} importance={2} hrd cg>
            <Thumb dark tp
                name="YouTube"
                progress=27
                to="27%"
                bgOpacity=0.1
                />
            <Thumb dark tp
                name="Anime"
                progress=23
                to="23%"
                bgOpacity=0.1
                />
            <Thumb dark tp
                name="Reddit"
                progress=10
                to="10%"
                bgOpacity=0.1
                />
            <Thumb dark tp
                name="Instagram"
                progress=5
                to="5%"
                bgOpacity=0.1
                />
            <Thumb dark tp
                name="Twitch"
                progress=0.05
                to="0.05%"
                bgOpacity=0.1
                />
            <Thumb dark tp
                name={SK ? "(Vonku)" : "(Outside)"}
                progress=34.95
                to="34.95%"
                bgOpacity=0.1
                />
        </S>
        {/if}
    </C>
</S>