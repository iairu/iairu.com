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
			darkHeader.false(true);
		}
	});
</script>

<svelte:head>
	<title>Portfolio :: iairu</title>
	<meta name="description" content="Junior Developer &amp; Graphic Designer">
	<meta name="robots" content="index,follow">
</svelte:head>

<S dark wrapper>
<C count={2} let:column eq mdel={1}>
	{#if column === 0}
	<S dark name="Ondrej Špánik" slug="about" tags={"junior developer, " + (SK ? "grafický dizajnér, študent" : "graphic designer, student")} nbb nbt>
		<Quote dark>
			{#if SK}
				Vždy som mal priveľa digitálnych záujmov na to aby som sa pozastavil a obzrel druhým smerom, von z okna. 
				Jedného dňa sa k tomu dostanem, predtým by som avšak rád napísal ešte pár tisícok riadkov kódu. 
				Predstava, že si potom oddýchnem lehom v strede veľkej lúky znie nádherne, 
				a zrovna vtedy mi zasvieti - je po oddychu, ak nejaký bol.
			{:else}
				I've always had too many digital interests to make me pause and think, perhaps look the other way - out the window.
				Before I get to it one day, I plan on writing few thousand rows of code.
				The idea, that I would chill-out beneath the blue sky sounds wonderful,
				and that's when I get it - the rest is over, if there even was any.
			{/if}
		</Quote>
		<Nav nav={[
			{icon: "fa fa-feather-alt", 	text: SK ? "Biografia" : "Biography", href: "#bio"},
			{icon: "fa fa-keyboard",		text: SK ? "Zručnosti" : "Skills", href: "#skills"},
			{icon: "fa fa-graduation-cap", 	text: SK ? "Vzdelanie" : "Education", href: "#edu"}
		]} />
	</S>
	<!-- <S dark row icon="fa fa-running" name={SK ? "Aktívne projekty" : "Active projects"} slug="wip" nbb nbt pb hr cg>
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
	</S> -->
	{:else}
	<S bg="url('/_index/natpic.jpg') center right/cover no-repeat" fh />
	{/if}
</C>
</S>

<S row icon="fa fa-calendar-check" name={SK ? "Dokončené projekty" : "Finished projects"} slug="projects" tabs={["Dev", "Gfx"]} let:tab pt pb cg>
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
	<Thumb dark
		name="AnkiScreener"
		icon="fa fa-crop-alt"
		bgOpacity={0.2}
		tags="js, svelte, electron, scss"
		desc={
			SK	? "Bohatý nástroj pre rýchlu tvorbu Anki-kompatibilných učebných CSV kariet."
				: "A rich utility for fast creation of Anki-compatible CSV flashcards."
		}
		from="2020-09-23"
		to="2020-10-07"
		nav={[
			{icon: "fa fa-code-branch", text:"GitHub", href:"https://github.com/iairu/AnkiScreener", isButton: true},
			{icon: "fa fa-video", text: SK ? "Ukážka" : "Preview", href:"https://www.youtube.com/watch?v=LO1rb8nfDX4"}
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
			{icon: "fa fa-stream", text: SK ? "Pozrieť popisky skriptov" : "View descriptions (soon)", href: SK ? "/dev/ahk/" : "#", isButton: true, hide: !SK},
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
			{icon: "fa fa-th", text: SK ? "CheatSheet príkazov" : "Command CheatSheet (soon)", href: SK ? "/dl/linux-prikazy.svg" : "#", isButton: true, hide: !SK},
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
	{#if !SK}
	<Thumb 
		name="More stuff available in Slovak language"
		icon="fa fa-globe-europe"
		bg=""
		desc="Additional documentation, localized project examples, ..."
		nav={[
			{icon: "fa fa-share", text:"Switch languages", href:"/sk#projects", static: true, modal: false, sameTarget: true}
		]} 
		/>
	{:else}
	<Thumb empty />
	{/if}
	<Thumb empty />
	{:else if tab === 1}
	<Thumb dark
		name={SK ? "Grafické portfolio" : "Graphic design portfolio"}
		bg="gfxbg"
		bgOpacity={1} bgNoFilter
		icon="dumpling-w"
		tags="design, concepts, digital"
		desc={
			SK	? "Koncepty brandingu, staršie dizajny webov a maturitný projekt."
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

<S light icon="fa fa-feather-alt" name={SK ? "Biografia" : "Biography"} slug="bio" bg="url('/_index/beach.jpg') top repeat-x" pt pb>
	<C count={2} let:column eq mrev>
		{#if column === 0}
			<Quote>
				{#if SK}
					Narodil som sa v Piešťanoch, študoval v Trenčíne a momentálne študujem v Bratislave. Od mala ma bavilo experimentovať s čímkoľvek, 
					z čoho sa neskôr zrodil záujem o dva polárne rozdielne smery - technický a umelecký. Deň, kedy som dostal svoj prvý počítač, bol
					dňom, ktorý ma kompletne vtiahol do digitálneho sveta, kde sa medze kreativite naozaj nekladú.
				{:else}
					I was born in Piešťany, studied in Trenčín and currently study in Bratislava. Ever since I was little, I was intrigued by experiments,
					from which an interest for two polar opposites - technical and artistic direction - was born. The day I got my first computer was the day,
					which completely sucked me into the digital world, where creativity barriers truly don't exist. 
				{/if}
			</Quote>
			<p style="opacity:0.5; font-size: 10px;">
				<span>Background photo by <a href="https://unsplash.com/@serjosoza">sergio souza</a> on <a href="https://unsplash.com/s/photos/scenery">Unsplash</a></span><br>
				<span>Illustration by iairu</span>
			</p>
		{:else}
			<S bg="url('/_index/bio.png') center center/contain no-repeat" fh up />
		{/if}
	</C>
	<S row icon="fa fa-keyboard" name={SK ? "Schopnosti" : "Skills"} slug="skills" importance={2} hrd eq>
		<Tabs names={[SK ? "Programovanie" : "Programming"]} let:active>
			- HTML, CSS (SCSS), Git<br>
			- JavaScript ES6 (Node.js, Svelte, {SK ? "základy Vue.js a Reactu" : "basics: Vue.js and React"}), PHP<br>
			- C, Bash, {SK ? "Základné zručnosti v jazykoch" : "Basic knowledge of"} Java, Python<br>
			- AutoHotkey
		</Tabs>
		<Tabs names={[SK ? "Grafický dizajn" : "Graphic design"]}>
			{SK ? "- Expertné, každodenné skúsenosti s Adobe CC balíkom, najmä:"
				: "- Expert, everyday experience with Adobe CC, especially:"}<br>
			Adobe Photoshop, Adobe Illustrator, Adobe Premiere Pro, Adobe InDesign<br>
			{SK ? "- Širšia znalosť softvéru Figma a Blender"
				: "- Knowledge of Figma and Blender"}
		</Tabs>
	</S>
	<S row icon="fa fa-graduation-cap" name={SK ? "Vzdelanie" : "Education"} slug="edu" importance={2} hrd eq>
		<Tabs names={["FIIT " + (SK ? "(informatika)" : "(computer science)")]}>
			{#if SK}
			<b>Fakulta informatiky a informačných technológií STU</b> // September 2019 – Júl 2023<br>
			<u>Odbor BC-INFO4 Informatika (bakalár), na začiatku 2. ročníka, 4-ročné štúdium</u><br>
			- Priemer 1.41 (najlepších 11%) za dokončené semestre<br>
			- Nadobudnutie základov programovania v jazykoch C, JavaScript, PHP<br>
			- Zlepšenie rešeršových a prezentačných schopností, práce s Linuxom
			{:else}
			<b>Faculty of Informatics and Information Technologies STU</b> // September 2019 – July 2023<br>
			<u>BC-INFO4 Computer Science (bachelor), second year out of the 4-year study plan</u><br>
			- Average 1.41 (not GPA) (top 11% of students) for finished semesters<br>
			- Acquired basics of programming in C, JavaScript and PHP languages<br>
			- Improved research and presentation skills, work with Linux
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
<S light icon="fa fa-comment-dots" name={SK ? "Niečo viac..." : "More..."} slug="more" pt pb nbt sli>
	<Nav nav={[
		{icon: "fa fa-clipboard-list", text: "Programovací denník", href: "/dev/log", isButton: true, hide: !SK},
		{icon: "far fa-file", text: "Resumé [PDF]", href: SK ? "/dl/resume-sk.pdf" : "/dl/resume-en.pdf", isButton: true}
	]}/>
</S>
