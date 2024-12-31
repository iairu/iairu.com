<script>
	import Quote from '../../components/Quote.svelte';
	import Nav from '../../components/Nav.svelte';
	import S from '../../components/Section.svelte';
	import C from "../../components/Columns.svelte";
	import { lang } from '../../components/LangStore.svelte';
	import Tabs from '../../components/Tabs.svelte';
	import Thumb from '../../components/Thumb.svelte';
	import { onMount } from 'svelte';
	import { darkHeader } from '../../components/DarkStore.svelte';


	let l;
	let SK = false;
	$: SK = l.current === "sk"; // basically a macro
	const unsub = lang.subscribe((lng)=>{l = lng;});
	onMount(()=>{
		darkHeader.set(true);
		return ()=>{
			unsub();
			darkHeader.set(false);
		}
	});
</script>

<svelte:head>
	<title>Portfolio :: iairu</title>
	<meta name="description" content="Junior Developer &amp; Graphic Designer">
	<meta name="robots" content="index,follow">
</svelte:head>

<S dark wrapper bg="url('/_links/ms_knn_2_out.jpg') top no-repeat">
<C count={2} let:column eq mdel={1}>
	{#if column === 0}
	<S dark tp name="Ondrej Špánik (iairu)" slug="about" tags={"developer, " + (SK ? "UX dizajnér, InfoSec študent" : "UX designer, InfoSec student")} nbb nbt>
		<Quote dark>
		{#if SK}
		  Narodil som sa v Piešťanoch, študoval v Trenčíne a momentálne študujem informačnú bezpečnosť v Bratislave. Od mala ma bavilo experimentovať s čímkoľvek, z čoho sa neskôr zrodil záujem o dva polárne rozdielne smery - technický a umelecký. Deň, kedy som dostal svoj prvý počítač, bol dňom, ktorý ma kompletne vtiahol do digitálneho sveta.
		{:else}
		  I was born in Piešťany, studied in Trenčín and currently study information security in Bratislava. Since I was little, I enjoyed experimenting with lots of things, which later gave birth to an interest in two polar opposite directions - technical and artistic. The day I got my first computer was the day that completely pushed me into the digital world.
		{/if}
		</Quote>
		<Nav nav={[
			{icon: "fa fa-feather-alt", 	text: SK ? "Biografia" : "Biography", href: "#bio"},
			{icon: "fa fa-keyboard",		text: SK ? "Schopnosti" : "Skills", href: "#skills"},
			{icon: "fa fa-graduation-cap", 	text: SK ? "Vzdelanie" : "Education", href: "#edu"}
		]} />
	</S>
	<!-- <S icon="fa fa-thumbs-up" name={SK ? "Záujmy" : "Interests"} slug="interests" hr importance={2}>
		<p>
			{#if SK}
				Webové technológie, resp. čokoľvek sa dotýka Javascriptu a automatizácia repetitívnych činností. K pokroku ma najviac motivuje zlé/nedostatočné UX. Okrem toho poslednú dobu cestovanie :)
			{:else}
				Web technologies, especially Javascript-related stuff and automation of repetitive tasks. The greatest motivation for me is fighting against bad or incomplete UX. Other than that lately travel :)
			{/if}
		</p>
	</S> -->
	<!-- <S dark row icon="fa fa-running" name={SK ? "Práve pracujem na..." : "Work in progress..."} slug="wip" nbb nbt pb hr cg importance={2}>
		<Thumb dark
			name="FIIT STU"
			icon="fa fa-university"
			tags="Bachelor's degree"
            desc={
                SK	? "Z každého rožka troška v IT. Pracujem na tom deň i noc... :)"
                    : "A little bit of everything in IT. Working on it day and night... :)"
            }
			from="2019-09-01"
			progress={6*100/8}
		/>
        <Thumb dark
            name="Basic OpenGL Projects"
            icon="fa fa-cube"
            bgOpacity={0.2}
            tags="c++, opengl"
            desc={
                SK	? "Jeden semester venovaný bezier. krivkám, shaderom, ... a druhý fyzike v OpenGL."
                    : "One semester dedicated to bezier. curves, shaders, ... and second to physics in OpenGL."
            }
            from="2021-09-01"
            progress={50}
            to="2022-06-01"
            />
	</S> -->
	{:else}
	<S bg="url('/_index/newpic2.jpg') 85% 18%/cover no-repeat" fh />
	{/if}
</C>
</S>

<S row icon="fa fa-calendar-check" name={SK ? "Projekty" : "Projects"} slug="projects" tabs={["Development", "Creative"]} filters={[["", "Javascript", "Autohotkey", "Python", "Blog"],["", "Animation", "Design", "Blog"]]}  let:tab let:filter pt pb cg>
    {#if tab === 0}
	<Thumb dark
		name="StrukShow.com Portfolio 2020"
		icon="strukshow-w"
		bg="strukshow"
		tags="svelte, javascript, scss, html, php"
        showIfTag={filter}
		desc={
			SK	? "Komplexné riešenie modernej osobnej webovej stránky pomocou CockpitCMS a Svelte."
				: "Complex solution of a modern personal website using CockpitCMS and Svelte."
		}
		from="2020-06-01"
		to="2020-08-03"
		nav={[
			{icon: "fa fa-share", text: SK ? "Navštíviť" : "Visit", href:"https://strukshow.com", isButton: true},
			{icon: "fa fa-file-alt", text: "Dev Docs", href:"/strukshow-docs/", isButton: true, hide: !SK, static: true},
		]}
		/>
	<Thumb dark
        name="Save the Princess Browser Game"
        bg="stp"
        icon="fa fa-gamepad"
        tags="javascript"
        showIfTag={filter}
        desc={
            SK 	? "Vanilla JavaScript hra inšpirovaná Street Fighterom. Prvý JavaScript projekt, stavané podľa MVC princípu."
                : "Vanilla JavaScript game inspired by Street Fighter. First Javascript project, based on MVC."
        }
        from="2020-02-21"
        to="2020-06-24"
        nav={[
            {icon: "fa fa-play", text: SK ? "Zahrať" : "Play", href:"/dev/save-the-princess/", isButton: true},
            {icon: "fa fa-file-alt", text:"Docs [PDF]", href:"/dl/save-the-princess.pdf", hide: !SK},
        ]}
        />
	<Thumb dark
    	name="ProcExp Procreate Exporter"
    	icon="fa fa-paint-brush"
            bgOpacity={0.2}
    	tags="autohotkey, ffmpeg, parsing"
            showIfTag={filter}
    	desc={
    		SK	? "Skript pre masové extrahovanie, spojenie a exportovanie timelapse súborov z Procreate prác pomocou 7z a FFMPEG."
    			: "Script for mass extraction, stitching and export of timelapse files from Procreate works using 7z and FFMPEG."
    	}
    	from="2019-12-17"
    	to="2020-01-21"
    	nav={[
    		{icon: "fa fa-code-branch", text:"GitHub", href:"https://github.com/iairu/ProcExp", isButton: true},
    		{icon: "fa fa-download", text: SK ? "Stiahnuť" : "Download", href:"https://github.com/iairu/ProcExp/releases"},
    	]}
        />
	<Thumb dark
    	name="AnkiScreener Flashcard Utility"
    	icon="fa fa-crop-alt"
    	bgOpacity={0.2}
    	tags="javascript, svelte, electron, scss"
        showIfTag={filter}
    	desc={
    		SK	? "Bohatý nástroj pre rýchlu tvorbu Anki-kompatibilných učebných CSV kariet."
    			: "A rich utility for fast creation of Anki-compatible CSV flashcards."
    	}
    	from="2020-09-23"
    	to="2020-10-07"
    	nav={[
    		{icon: "fa fa-code-branch", text:"GitHub", href:"https://github.com/iairu/AnkiScreener", isButton: true},
    		{icon: "fab fa-youtube", text: SK ? "Ukážka" : "Preview", href:"https://www.youtube.com/watch?v=LO1rb8nfDX4"},
    	]}
        />
	<Thumb dark
		name="BrianStruk.com Portfolio 2022"
		icon="strukshow-w" 
		tags="svelte, javascript, scss, html, php"
		showIfTag={filter}
		from="2022-06-22"
		to="2022-06-23"
		desc={
		SK  ? "Komplexné riešenie modernej webovej stránky pre hudobného umelca pomocou zdieľaného CockpitCMS (so StrukShow a LubaStrukova) a Svelte."
			: "Complex solution of a modern website for a music artist using shared CockpitCMS (with StrukShow and LubaStrukova) and Svelte."
		}
		nav={[
			{icon: "fa fa-share", text: SK ? "Navštíviť" : "Visit", href:"https://brianstruk.com", isButton: true},
		]}
		/>
	<Thumb 
		name="PostgreSQL REST API"
		icon="fa fa-file-code"
        bgOpacity={0.2}
		tags="postgres, django, python, json, sql"
        showIfTag={filter}
		desc={
			SK	? "Django REST API pre komplexné SELECT queries nad Postgres databázou. Vypracované od základov nad existujúcou DB."
				: "Django REST API for complex SELECT queries over a Postgres database. Created from scratch over an existing DB."
		}
		from="2022-02-17"
		to="2022-05-08"
		nav={[
            {icon: "fa fa-file-alt", text: SK ? "Statické demo" : "Static demo", href:"/dbs/", isButton: true, static: true},
            {icon: "fa fa-code-branch", text:"GitHub", href:"https://github.com/iairu/dbs_django_postgresql"},
		]}
		/>
	<Thumb 
		name="TASM Assembly Counter"
		icon="fa fa-file-code"
        bgOpacity={0.2}
		tags="assembly, ms-dos"
        showIfTag={filter}
		desc={
			SK	? "Počítanie rôznych druhov znakov a spracovanie argumentov, súborov v 16-bit MS-DOS Turbo Assembleri."
				: "Counting different types of characters, processing arguments, files in 16-bit MS-DOS Turbo Assembler."
		}
		from="2022-03-07"
		to="2022-03-21"
		nav={[
            {icon: "fa fa-code-branch", text:"GitHub", href:"https://github.com/iairu/tasm_counter", isButton: true},
		]}
		/>
    <Thumb
        name="PCAP Analyzer CLI"
        icon="fa fa-ethernet"
        tags="python, networking"
        showIfTag={filter}
        desc={
            SK	? "Vypíše dáta paketu pre .pcap formát, viacmenej práca s interpretáciou surových bajtov podľa štyroch často používaných štandardov."
                : "Prints packet data for the .pcap format, mostly work with interpreting raw bytes per four well-established standards."
        }
        from="2021-10-10"
        to="2021-10-21"
        nav={[
            {icon: "fa fa-code-branch", text:"GitHub", href:"https://github.com/iairu/pcap_analyzer", isButton: true},
        ]}
        />
    <Thumb
		name={SK ? "Masový nákup lístkov" : "Batch ticket shopping"}
		icon="fa fa-shopping-cart"
		tags="autohotkey"
           showIfTag={filter}
		desc={
			SK	? "Komplexná automatizácia nákupu cestovných lístkov, nakoľko UX portálu bolo a stále je mizerné. Skript nie je verejne dostupný."
				: "Complex automatization for travel-ticket shopping. Script is not publicly available."
		}
		img="listky"
		/>
    
    <Thumb
		name={SK ? "Každodenná digitálna automatizácia" : "Everyday digital automation"}
		icon="fa fa-file-code"
		tags="autohotkey, blog"
       showIfTag={filter}
		desc={
			SK 	? "Viac ako 26 zaujímavých AutoHotkey skriptov pre automatizáciu repetitívnych digitálnych činností."
				: "More than 26 interesting AutoHotkey scripts for automatization of repetitive digital activities."
		}
		nav={[
			{icon: "fa fa-stream", text: SK ? "Pozrieť popisky skriptov" : "View descriptions (soon)", href: SK ? "/dev/ahk/" : "#", isButton: true, hide: !SK},
			{icon: "fa fa-book", text:"Seminárna práca [PDF]", href:"/dl/seminarka.pdf", hide: !SK},
		]}
		/>
	<Thumb
		name={SK ? "Linux návody" : "Linux tutorials"}
		icon="fa fa-book"
		tags="bash, sysadmin, vm"
       showIfTag={filter}
		desc={
			SK	? "Od inštalácie Debianu vo VM po sprevádzkovanie LAMP servera from scratch."
				: "From Debian install inside a VM to LAMP-from-scratch server setup."
		}
		nav={[
			{icon: "fa fa-th", text: SK ? "CheatSheet príkazov" : "Command CheatSheet (soon)", href: SK ? "/dl/linux-prikazy.svg" : "#", isButton: true, hide: !SK},
			{icon: "fa fa-book", text:"1 - Inštalácia Debianu [PDF]", href:"/dl/linux-install.pdf", hide: !SK},
			{icon: "fa fa-book", text:"2 - HTTP Server [PDF]", href:"/dl/linux-http.pdf", hide: !SK},
		]}
		/>
	<Thumb
        name="IPTables Port-Forwarding"
        icon="fa fa-network-wired"
		bgOpacity={0.2}
        tags="iptables, networking, linux, blog"
        showIfTag={filter}
        desc={
            SK  ? "Návod nie len pre presmerovanie portov, ale všeobecné riešenie problémov v rámci IPTables."
                : "A walkthrough tutorial for not just port-forwarding, but problem solving when it comes to IPTables."
        }
        nav={[
			{icon: "fa fa-book", text:"Read", href:"/dev/iptables-portforward/", isButton: true, hide: SK},
			{icon: "fa fa-book", text:"Prečítať (Anglicky)", href:"/en/dev/iptables-portforward/", isButton: true, hide: !SK, static: true},
        ]}
        />
    <Thumb
        name={SK ? "Right to Repair Prezentácia" : "Right to Repair Presentation"}
        icon="fa fa-tools"
        bgOpacity={0.12}
        tags="presentation, video"
        showIfTag={filter}
        _desc={
            SK	? "Anglická prezentácia, ktorá rieši právo na opravu a temnú stránku spoločnosti Apple."
                : "Presentation covering the Right to Repair and, on a related note, The Dark Side of Apple."
        }
        _from="2020-12-03"
        _to="2020-12-08"
        nav={[
            {icon: "fab fa-youtube", text: SK ? "Pozrieť" : "Watch", href:"https://youtu.be/x2ToofrDWzw", isButton: true},
            {icon: "fa fa-file-alt", text: SK ? "Slajdy [PDF]" : "Slides [PDF]", href:"/dl/right-to-repair-prez.pdf", static: true},
        ]}
        />
	<!-- <Thumb
		name="iairu.com"
		icon="fa fa-code"
		tags="sapper, svelte, javascript, scss, html"
        showIfTag={filter}
		desc={
			SK  ? "Riešenie osobného webového portfólia (tejto stránky) cez Sapper framework."
				: "A personal web portfolio solution (this site) using Sapper framework."
		}
		img="code_thumbs"
		/> -->
	<Thumb
    	name="LubaStrukova.sk Portfolio 2023" 
    	icon="strukshow"
    	tags="svelte, javascript, scss, html, php"
    	showIfTag={filter}
    	_desc={
    		SK  ? "Komplexné riešenie modernej osobnej webovej stránky pomocou CockpitCMS a Svelte."
    			: "Complex solution of a modern personal website using CockpitCMS and Svelte."
    	}
    	nav={[
    		{icon: "fa fa-share", text: SK ? "Navštíviť" : "Visit", href:"https://lubastrukova.sk", isButton: true},
    	]}
    	/>
	<Thumb
		name={SK ? "IPv4 kalkulačka + návod" : "IPv4 Calc"}
		icon="fa fa-sitemap"
		tags="c, networking, blog"
        showIfTag={filter}
		_desc={
			SK	? "Vypočíta z adresy a masky počiatočnú a koncovú adresu siete."
				: "Calculates network and broadcast address from any IP and mask."
		}
		nav={[
			{icon: "fa fa-code-branch", text:"GitHub", href:"https://github.com/iairu/ipv4calc/releases", isButton: true},
			{icon: "fa fa-book", text:"Návod na výpočet", href:"/dev/ipv4-calc/", isButton: true, hide: !SK},
		]}
		/>
	<Thumb
        name={ SK ? "GUI pre gTTS (Google Text-to-Speech)" : "GUI for gTTS (Google Text-to-Speech)"}
        icon="fa fa-comment-dots"
        tags="python"
        showIfTag={filter}
        _desc={
        SK	? "Jednoduché grafické rozhranie pre gTTS (Google Text-to-Speech) knižnicu."
        : "Simple interface for gTTS (Google Text-to-Speech) library."
        }
        _from="2020-05-17"
        _to="2020-05-18"
        nav={[
        {icon: "fa fa-code-branch", text:"GitHub", href:"https://github.com/iairu/gTTSgui", isButton: true},
        {icon: "fa fa-download", text: SK ? "Stiahnuť" : "Download", href:"https://github.com/iairu/gTTSgui/releases"},
        ]}
        />
	<!-- <Thumb
		name="Coffee Machine"
		icon="fa fa-terminal"
		tags="java"
        showIfTag={filter}
		desc={
			SK 	? "Jednoduchý CLI kávomat, prvý Java projekt."
				: "Simple CLI coffee machine, first Java project."
		}
		from="2020-07-01"
		to="2020-08-12"
		nav={[
			{icon: "fa fa-code-branch", text:"GitHub", href:"https://github.com/iairu/coffeeMachine", isButton: true},
			{icon: "fa fa-download", text: SK ? "Stiahnuť" : "Download", href:"https://github.com/iairu/coffeeMachine/releases"},
		]}
		/> -->
	<!-- {#if !SK}
	<Thumb
		name="More stuff available in Slovak language"
		icon="fa fa-globe-europe"
		bg=""
		desc="Additional documentation, localized project examples, ..."
		nav={[
			{icon: "fa fa-share", text:"Switch languages", href:"/sk#projects", static: true, modal: false, sameTarget: true},
		]}
		/>
	{:else}
    <Thumb
        name="Programovací denník (Leto 2020)"
        icon="fa fa-clipboard-list"
        tags="blog"
        showIfTag={filter}
        desc="Osobné projekty a experimenty počas leta v roku 2020."
        nav={[
            {icon: "fa fa-clipboard-list", text:"Prečítať", href:"/dev/log/", isButton: true},
        ]}
        />
	{/if} -->
	<Thumb empty />
	{:else if tab === 1}
	<Thumb dark
		name={SK ? "Grafické portfolio 2017-2019" : "Graphic design portfolio 2017-2019"}
		bg="gfxbg"
		bgOpacity={1} bgNoFilter
		icon="dumpling-w"
		tags="design, concepts, digital"
        showIfTag={filter}
		desc={
			SK	? "Koncepty brandingu, staršie dizajny webov a maturitný projekt."
				: "Branding concepts, older web designs and a graduation project."
		}
		nav={[
			{icon: "fa fa-share", text: SK ? "Navštíviť" : "Visit", href: SK ? "/gfx/" : "/gfx/en/", isButton: true, modal: false, static: true},
		]}
		/>
	<Thumb dark
		name={SK ? "Zrada kráľa 2019" : "Treason 2019"}
		bg="zrada"
		icon="fa fa-paint-brush"
		tags="3d, animation, blender"
        showIfTag={filter}
		desc={
			SK	? "Maturitný projekt - Animovaný príbeh typografie: 3D Animácia vytvorená v Blenderi o svete písmeniek."
				: "Graduation project - Animated typography story: 3D Animation made in Blender about a world of letters."
		}
		from="2019-03-28"
		to="2019-05-14"
		nav={[
			{icon: "fa fa-share", text: SK ? "Prezentácia" : "Presentation", href: SK ? "/gfx/zrada/" : "/gfx/en/treason/", isButton: true, modal: false, static: true},
		]}
		/>
	<Thumb dark
		name="Brian Struk - ECHO 2022"
		icon="fa fa-video"
		tags="3d, animation, blender"
		showIfTag={filter}
		desc={
			SK ? "3D animovaný hudobný videoklip vytvorený v Blenderi pre rovnomennú skladbu."
			: "3D animated music video created in Blender for this track."
		}
		from="2022-06-01"
		to="2022-06-23" 
		nav={[
			{icon: "fab fa-youtube", text: SK ? "Pozrieť" : "Watch", href:"https://www.youtube.com/watch?v=tlIpi9zFVsc", isButton: true}
		]}
		/>
	<Thumb
		name={SK ? "Sociálne média" : "Socials"}
		icon="fa fa-share-alt"
		tags="animation, blog"
		showIfTag={filter}
		desc={
						SK ? "Japonské texty piesní s prekladom, náhodné veci a ďalšie linky."
						: "Japanese song lyrics translated, random things and more links."
		}
		nav={[
						{icon: "fab fa-youtube", text: "Ayu Animations", href:"https://youtube.com/@ayu-animations/", isButton: true},
						{icon: "fab fa-youtube", text: "iairu99", href:"https://youtube.com/@iairu99/"},
						{icon: "fa fa-share", text: SK ? "Viac" : "More", href: SK ? "/sk/links" : "/en/links", modal: true}
		]}
		/>
	<Thumb
		name={SK ? "Galéria ukážok komixov" : "Comic Samples Gallery"}
		icon="fa fa-image"
		tags="design"
		showIfTag={filter}
		desc={
			SK ? "Ukážky kresieb a storyboardu vytvorené vo vlastných štýloch a technikách."
			: "Drawing and storyboard samples made in personal styles and techniques."
		}
		nav={[
			{icon: "fa fa-share", text: SK ? "Prezentácia" : "Presentation", href: SK ? "/sk/art/komixy" : "/en/art/comics", isButton: true, modal: true, static: true},
		]}
		/>
    <!-- <Thumb
        name={SK ? "Tajný projekt I (Dlhodobý)" : "Secret project I (Long-term)"}
        icon="fa fa-hourglass-half"
        tags="video, animation, story"
        showIfTag={filter}
        from="2016-06-01"
        progress={15}
        />
    <Thumb
        name={SK ? "Tajný projekt II (Krátkodobý)" : "Secret project II (Short-term)"}
        icon="fa fa-hourglass-half"
        tags="video, animation, story"
        showIfTag={filter}
        from="2022-01-01"
        progress={30}
        /> -->
	{/if}
</S>
<S light icon="fa fa-running" name={SK ? "Najviac riešim..." : "Mostly dealing with..."} slug="quote" pt pb nbb sli>
	<span>
		{
		SK ? 	"Vývoj iOS a macOS hobby projektov a kurzy informačnej bezpečnosti + diplomová práca" :
				"iOS and macOS side-projects and information security courses + master thesis"
		}
	</span>
</S>
<S light icon="fa fa-feather-alt" name={SK ? "Biografia" : "Biography"} slug="bio" bg="url('/_index/beach.jpg') top repeat-x" pt pb>
	<C count={2} let:column eq mrev>
		{#if column === 0}
			<Quote>
				{#if SK}
				    Popri štúdiu informačnej bezpečnosti sa venujem vývoju pre macOS a iOS pomocou SwiftUI. Zameriavam sa najmä na písanie optimálnejších programov s podporou pre staršie verzie systému. Experimentujem s OpenCore na mojom Thinkpade X260. Nedávno som dokončil Find-A-Cat, program na správu rodokmeňov mačiek, ale momentálne ma viac zaujímajú user-friendly riešenia ako NocoDB - nadstavby nad existujúcimi systémami mi dávajú väčší zmysel než vývoj od nuly. Už päť rokov budujem weby pomocou Svelte a v diplomovke skúmam honeypoty v sieťovej bezpečnosti. Preferujem natívne aplikácie a Python pred Electronom. Safari je môj hlavný prehliadač pre jeho vyváženosť výkonu a výdrže, na Linuxe je to Firefox. Windows užívateľom odporúčam Edge. Na organizáciu používam Todoist a Apple Kalendár prepojený s Google Kalendárom. FSNotes cez iCloud mi vyhovuje viac než Apple Notes. Na výskumné a písomné práce volím Markdown s Pandocom namiesto LaTeXu, pre vývoj Zed Editor a rýchle úpravy vim. Mám rád skôr experimentálno-všeobecný zámer ako definitívnu oblasť.
				{:else}
					While studying information security, I develop for macOS and iOS using SwiftUI. I focus mainly on writing more optimal programs for older versions of the system. I experiment with OpenCore on my Thinkpad X260. I recently completed Find-A-Cat, a cat pedigree management program, but I'm currently more interested in user-friendly solutions like NocoDB - extensions built on existing systems make more sense to me than development from scratch. I've been building websites using Svelte for five years and in my thesis I'm researching honeypots in network security. I prefer native applications and Python over Electron. Safari is my main browser for its balance of performance and battery life, on Linux it's Firefox. I recommend Edge to Windows users. For organization, I use Todoist and Apple Calendar linked with Google Calendar. FSNotes via iCloud suits me better than Apple Notes. For research writing, I choose Markdown with Pandoc instead of LaTeX, for development Zed Editor and quick edits vim. I prefer having an experimental-general aim rather than a definitive field.
				{/if}
			</Quote>
			<p style="opacity:0.5; font-size: 10px;">
				<span>Background photo by sergio souza (@serjosoza)</span><br>
				<span>Illustration by me (@iairu)</span>
			</p>
		{:else}
			<S bg="url('/_index/bio.png') center center/contain no-repeat" fh up />
		{/if}
	</C>
	<S row icon="fa fa-keyboard" name={SK ? "Schopnosti" : "Skills"} slug="skills" importance={2} hrd eq>
		<Tabs names={[SK ? "Programovanie" : "Programming"]} let:active>
			- HTML, CSS (SCSS, Tailwind), Git, Vim, Linux<br>
			- JavaScript ES6 (Vanilla, Svelte, Electron, {SK ? "základy Vue.js, Angularu a Reactu" : "basics: Vue.js, Angular and React"})<br>
			- Python, Bash/Zsh (+ cat, sed, pipe, alias, ...), C<br>
			- PHP (Laravel), AutoHotkey/Automator/Apple Shortcuts<br>
			- Pentesting
		</Tabs>
		<Tabs names={[SK ? "Grafický dizajn" : "Graphic design"]}>
			{SK ? "- Denné skúsenosti s Blender, Affinity Designer, Davinci Resolve, "
			: "- Daily experience with Blender, Affinity Designer, Davinci Resolve, "}
			Adobe Photoshop, Adobe Illustrator, Adobe Premiere Pro, Adobe InDesign<br>
			{SK ? "- Pozri hore 'Creative' voľbu vedľa nadpisu 'Projekty'"
			: "- See 'Creative' option above next to 'Projects' heading"}
		</Tabs>
	</S>
	<S row icon="fa fa-graduation-cap" name={SK ? "Vzdelanie" : "Education"} slug="edu" importance={2} hrd eq>
		<Tabs names={["FIIT " + (SK ? "(informatika)" : "(computer science)")]}>
			{#if SK}
			<b>Fakulta informatiky a informačných technológií STU</b> // September 2019 – Júl 2024<br>
			<u>Odbor BC-INFO4 Informatika (bakalár), predĺžené 4-ročné štúdium</u><br>
			- Priemer 1.41 (najlepších 11%) za prvé dva semestre<br>
			- Nadobudnutie základov programovania v C++, JavaScript, PHP<br>
			- Zlepšenie rešeršových a prezentačných schopností; práce s Linuxom<br>
			- Pokračovanie na inžinierskom štúdiu v odbore "Informačná bezpečnosť"
			{:else}
			<b>Faculty of Informatics and Information Technologies STU</b> // September 2019 – July 2024<br>
			<u>BC-INFO4 Computer Science (bachelor), prolonged 4-year study plan</u><br>
			- Average 1.41 (not GPA) (top 11% of students) for first two semesters<br>
			- Acquired basics of programming in C++, JavaScript and PHP languages<br>
			- Improved research and presentation skills; work with Linux<br>
			- Continuing by studying master's in the field of "Information Security"
			{/if}
		</Tabs>
		<Tabs names={["SUPTN " + (SK ? "(grafický dizajn)" : "(graphic design)")]}>
			{#if SK}
			<b>Škola umeleckého priemyslu Trenčín</b> // September 2015 – Jún 2019<br>
			<u>Odbor 8261 M Propagačná grafika, 4-ročné štúdium</u><br>
			- Ukončené úplné stredné odborné vzdelanie<br>
			- Nadobudnutie praktických aj teoretických znalostí v oblasti grafického dizajnu<br>
			- Navrhovanie, organizácia, realizácia a prezentácia vlastnej grafickej a umeleckej tvorby<br>
			- Skúsenosti s typografiou, printovými médiami, Adobe CC balíkom
			{:else}
			<b>Škola umeleckého priemyslu Trenčín</b> // September 2015 – June 2019<br>
			<u>8261 M Propagation graphics, 4-year study plan</u><br>
			- Acquired practical and theoretical knowledge in the field of graphic design<br>
			- Conceptualization, organizing, realization and presentation of original graphic and artistic works<br>
			- Experience with typography, print media and Adobe CC bundle
			{/if}
		</Tabs>
	</S>
</S>
<S light icon="fa fa-comment-dots" name="Resume" slug="more" pt pb nbt sli>
	<Nav nav={[
        {icon: "far fa-file", text: (SK ? "Front-end developer / IT technik" : "Front-end developer / IT technician") + " [2022-06 PDF]", href: SK ? "/dl/resume-sk.pdf" : "/dl/resume-en.pdf", isButton: true},
	]}/>
</S>
