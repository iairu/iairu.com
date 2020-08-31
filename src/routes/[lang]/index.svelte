<script>
	import Nav from '../../components/Nav.svelte';
	import S from '../../components/Section.svelte';
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
			darkHeader.false(true);
		}
	});
</script>

<svelte:head>
	<title>Portfolio :: iairu</title>
	<meta name="description" content="Junior Developer &amp; Graphic Designer">
	<meta name="robots" content="index,follow">
</svelte:head>

{#if SK}
<S dark name="Ondrej Špánik" slug="about" tags="junior developer, grafický dizajnér, študent" nbb>
	<p style="max-width: 500px;">
		<i>
			Vždy som mal priveľa digitálnych záujmov na to aby som sa pozastavil a obzrel druhým smerom, von z okna. 
			Jedného dňa sa k tomu dostanem, predtým by som avšak rád napísal ešte pár tisícok riadkov kódu. 
			Predstava, že si potom oddýchnem lehom v strede veľkej lúky znie nádherne, 
			a zrovna vtedy mi zasvieti - je po oddychu, ak nejaký bol.
		</i>
	</p>
	<Nav nav={[
		{icon: "fa fa-feather-alt", 	text: "Biografia", href: "#bio"},
		{icon: "fa fa-keyboard",		text: "Zručnosti", href: "#skills"},
		{icon: "fa fa-graduation-cap", 	text: "Vzdelanie", href: "#edu"}
	]} />
</S>
{:else}
<S dark name="Ondrej Špánik" slug="about" tags="junior developer, graphic designer, student" nbb>
	<p style="max-width: 500px;">
		<i>
			I've always had too many digital interests to make me pause and think, perhaps look the other way - out the window.
			Before I get to it one day, I plan on writing few thousand rows of code.
			The idea, that I would chill-out beneath the blue sky sounds wonderful,
			and that's when I get it - the rest is over, if there even was any.
		</i>
	</p>
	<Nav nav={[
		{icon: "fa fa-feather-alt", 	text: "Biography", href: "#bio"},
		{icon: "fa fa-keyboard",		text: "Skills", href: "#skills"},
		{icon: "fa fa-graduation-cap", 	text: "Education", href: "#edu"}
	]} />
</S>
{/if}

<S pb dark row icon="fa fa-running" name={SK ? "Aktívne projekty" : "Active projects"} slug="projects" nbt hrh>
	<Thumb dark
		name="Blog CMS"
		icon="fa fa-window-restore"
		tags="vue, laravel"
		desc={
			SK 	? "Manažment pre vlastný blog. Prvý Laravel projekt."
				: "Management for my own blog. First Laravel project."
		}
		from="2020-08-06"
		bgOpacity={0.25}
		progress={10}
		to=""
	/>
	<Thumb dark
		name="PickPocket"
		icon="fab fa-get-pocket"
		tags="python"
		desc={
			SK	? "Natívny manažment Pocket tagov a odkazov s ohľadom na rýchlosť."
				: "Native Pocket tag and link management with focus on speed."
		}
		from="2019-09-09"
		bgOpacity={0.25}
		progress={35}
	/>
</S>

<S pt pb row icon="fa fa-calendar-check" name={SK ? "Dokončené projekty" : "Finished projects"} slug="finished-projects" tabs={["Dev", "Gfx"]} let:tab>
	{#if tab === 0}
	<Thumb dark
		name="StrukShow.com"
		icon="strukshow-w"
		bg="strukshow"
		tags="svelte, js, scss, html, php"
		desc={
			SK	? "Komplexné riešenie modernej osobnej webovej stránky pomocou CockpitCMS a Svelte."
				: "Complex solution of a modern personal website using CockpitCMS and Svelte."
		}
		from="2020-06-01"
		to="2020-08-03"
		nav={[
			{icon: "fa fa-share", text: SK ? "Navštíviť" : "Visit", href:"https://strukshow.com", isButton: true},
			{icon: "fa fa-file-alt", text: "Dev Docs", href:"/strukshow-docs/", isButton: true, hide: !SK, static: true}
		]}
		/>
	<Thumb
		name="ProcExp"
		icon="fa fa-paint-brush"
		tags="autohotkey"
		desc={
			SK	? "Skript pre masové extrahovanie, spojenie a exportovanie timelapse súborov z Procreate prác pomocou 7z a FFMPEG."
				: "Script for mass extraction, stitching and export of timelapse files from Procreate works using 7z and FFMPEG."
		}
		from="2019-12-17"
		to="2020-01-21"
		nav={[
			{icon: "fa fa-code-branch", text:"GitHub", href:"https://github.com/iairu/ProcExp", isButton: true},
			{icon: "fa fa-download", text: SK ? "Stiahnuť" : "Download", href:"https://github.com/iairu/ProcExp/releases"}
		]}
		/>
	<Thumb 
		name={ SK ? "GUI pre gTTS" : "GUI for gTTS"}
		icon="fa fa-comment-dots"
		tags="python"
		desc={
			SK	? "Jednoduché grafické rozhranie pre gTTS (Google Text-to-Speech) knižnicu."
				: "Simple interface for gTTS (Google Text-to-Speech) library."
		}
		from="2020-05-17"
		to="2020-05-18"
		nav={[
			{icon: "fa fa-code-branch", text:"GitHub", href:"https://github.com/iairu/gTTSgui", isButton: true},
			{icon: "fa fa-download", text: SK ? "Stiahnuť" : "Download", href:"https://github.com/iairu/gTTSgui/releases"}
		]}
		/>
	<Thumb
		name="iairu.com"
		icon="fa fa-code"
		tags="sapper, svelte, js, scss, html"
		desc={
			SK  ? "Riešenie osobného webového portfólia (tejto stránky) cez Sapper framework."
				: "A personal web portfolio solution (this site) using Sapper framework."
		}
		img="code_thumbs"
		/>
	<Thumb dark
		name="Save the Princess"
		bg="stp"
		icon="fa fa-gamepad"
		tags="js"
		desc={
			SK 	? "Vanilla JavaScript hra inšpirovaná Street Fighterom. Prvý JavaScript projekt, stavané podľa MVC princípu."
				: "Vanilla JavaScript game inspired by Street Fighter. First Javascript project, based on MVC."
		}
		from="2020-02-21"
		to="2020-06-24"
		nav={[
			{icon: "fa fa-play", text: SK ? "Zahrať" : "Play", href:"/dev/save-the-princess/", isButton: true},
			{icon: "fa fa-file-alt", text:"Docs [PDF]", href:"/dl/save-the-princess.pdf", hide: !SK}
		]}
		/>
	<Thumb
		name={SK ? "Masový nákup lístkov" : "Batch ticket shopping"}
		icon="fa fa-shopping-cart"
		tags="autohotkey"
		desc={
			SK	? "Komplexná automatizácia nákupu cestovných lístkov, nakoľko UX portálu bolo a stále je mizerné. Skript nie je verejne dostupný."
				: "Complex automatization for travel-ticket shopping. Script is not publicly available."
		}
		img="listky"
		/>
	<Thumb 
		name={SK ? "Každodenná digitálna automatizácia" : "Everyday digital automation"}
		icon="fa fa-file-code"
		tags="autohotkey"
		desc={
			SK 	? "Viac ako 26 zaujímavých AutoHotkey skriptov pre automatizáciu repetitívnych digitálnych činností."
				: "More than 26 interesting AutoHotkey scripts for automatization of repetitive digital activities."
		}
		nav={[
			{icon: "fa fa-stream", text: SK ? "Pozrieť popisky skriptov" : "View descriptions (soon)", href: SK ? "/dev/ahk/" : "#", isButton: true},
			{icon: "fa fa-book", text:"Seminárna práca [PDF]", href:"/dl/seminarka.pdf", hide: !SK}
		]}
		/>
	<Thumb 
		name={SK ? "Linux návody" : "Linux tutorials"}
		icon="fa fa-book"
		tags="bash, sysadmin, vm"
		desc={
			SK	? "Od inštalácie Debianu vo VM po sprevádzkovanie LAMP servera from scratch."
				: "From Debian install inside a VM to LAMP-from-scratch server setup."
		}
		nav={[
			{icon: "fa fa-th", text: SK ? "CheatSheet príkazov" : "Command CheatSheet (soon)", href: SK ? "/dl/linux-prikazy.svg" : "#", isButton: true},
			{icon: "fa fa-book", text:"1 - Inštalácia Debianu [PDF]", href:"/dl/linux-install.pdf", hide: !SK},
			{icon: "fa fa-book", text:"2 - HTTP Server [PDF]", href:"/dl/linux-http.pdf", hide: !SK}
		]}
		/>
	<Thumb 
		name={SK ? "IPv4 kalkulačka + návod" : "IPv4 Calc"}
		icon="fa fa-sitemap"
		tags="c"
		desc={
			SK	? "Vypočíta z adresy a masky počiatočnú a koncovú adresu siete."
				: "Calculates network and broadcast address from any IP and mask."
		}
		nav={[
			{icon: "fa fa-code-branch", text:"GitHub", href:"https://github.com/iairu/ipv4calc", isButton: true},
			{icon: "fa fa-download", text: SK ? "Stiahnuť" : "Download", href:"https://github.com/iairu/ipv4calc/releases"},
			{icon: "fa fa-book", text:"Návod na výpočet", href:"/dev/ipv4-calc/", isButton: true, hide: !SK}
		]}
		/>
	<Thumb
		name="Coffee Machine"
		icon="fa fa-terminal"
		tags="java"
		desc={
			SK 	? "Jednoduchý CLI kávomat, prvý Java projekt."
				: "Simple CLI coffee machine, first Java project."
		}
		from="2020-07-01"
		to="2020-08-12"
		nav={[
			{icon: "fa fa-code-branch", text:"GitHub", href:"https://github.com/iairu/coffeeMachine", isButton: true},
			{icon: "fa fa-download", text: SK ? "Stiahnuť" : "Download", href:"https://github.com/iairu/coffeeMachine/releases"}
		]}
		/>
	{:else if tab === 1}
	<Thumb dark
		name={SK ? "Grafické portfolio" : "Graphic design portfolio"}
		bg="gfxbg"
		bgOpacity={1} bgNoFilter
		icon="dumpling-w"
		tags="design, concepts, digital"
		desc={
			SK	? "Koncepty brandingu, staršie dizajny webov a maturitná projekt."
				: "Branding concepts, older web designs and a graduation project."
		}
		nav={[
			{icon: "fa fa-share", text: SK ? "Navštíviť" : "Visit", href: SK ? "/gfx/" : "/gfx/en/", isButton: true, modal: false, static: true}
		]}
		/>
	<Thumb dark
		name={SK ? "Zrada kráľa" : "Treason"}
		bg="zrada"
		icon="fa fa-paint-brush"
		tags="3d, animation, blender"
		desc={
			SK	? "Maturitný projekt - Animovaný príbeh typografie: 3D Animácia vytvorená v Blenderi o svete písmeniek."
				: "Graduation project - Animated typography story: 3D Animation made in Blender about a world of letters."
		}
		from="2019-03-28"
		to="2019-05-14"
		nav={[
			{icon: "fa fa-share", text: SK ? "Prezentácia" : "Presentation", href: SK ? "/gfx/zrada/" : "/gfx/en/treason/", isButton: true, modal: false, static: true}
		]}
		/>
	{/if}
</S>

<S light icon="fa fa-feather-alt" name={SK ? "Biografia" : "Biography"} slug="bio" pt pb>
	<Tabs names={[
		SK ? "Osnova" : "Outline",
		SK ? "Príbeh" : "Story"
	]} let:active>
		{#if active === 0}
			Osnova pôjde sem
		{:else if active === 1}
			Príbeh pôjde sem
		{/if}
	</Tabs>
	<S icon="fa fa-keyboard" name="Zručnosti" importance={2} hrd>
		<p>
			Niečo viem<br>
			Niečo neviem
		</p>
	</S>
	<S icon="fa fa-graduation-cap" name="Vzdelanie" importance={2} hrd>
		<p>
			Niečo viem<br>
			Niečo neviem
		</p>
	</S>
</S>

{#if SK}
<S light icon="fa fa-comment-dots" name="Niečo viac..." slug="more" pt pb nbt>
	<Nav nav={[
		{icon: "fa fa-clipboard-list", text: "Programovací denník", href: "/dev/log", isButton: true}
	]}/>
</S>
{/if}
