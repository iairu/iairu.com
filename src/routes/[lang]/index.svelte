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
	<S dark name="Ondrej Špánik (airu)" slug="about" tags={"junior developer, " + (SK ? "grafický dizajnér, študent" : "graphic designer, student")} nbb nbt>
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
	</S>
	<S icon="fa fa-thumbs-up" name={SK ? "Záujmy" : "Interests"} slug="interests" hr importance={2}>
		<p>
			{#if SK}
				Webové technológie, resp. čokoľvek sa dotýka Javascriptu a automatizácia repetitívnych činností. K pokroku ma najviac motivuje zlé/nedostatočné UX. Okrem toho poslednú dobu cestovanie :)
			{:else}
				Web technologies, especially Javascript-related stuff and automation of repetitive tasks. The greatest motivation for me is fighting against bad or incomplete UX. Other than that lately travel :)
			{/if}
		</p>
		<Nav nav={[
			{icon: "fa fa-feather-alt", 	text: SK ? "Biografia" : "Biography", href: "#bio"},
			{icon: "fa fa-keyboard",		text: SK ? "Schopnosti" : "Skills", href: "#skills"},
			{icon: "fa fa-graduation-cap", 	text: SK ? "Vzdelanie" : "Education", href: "#edu"}
		]} />
	</S>
	<S dark row icon="fa fa-running" name={SK ? "Práve pracujem na..." : "Work in progress..."} slug="wip" nbb nbt pb hr cg importance={2}>
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
	</S>
	{:else}
	<S bg="url('/_index/newpic2.jpg') 85% 40%/cover no-repeat" fh />
	{/if}
</C>
</S>

<S row icon="fa fa-calendar-check" name={SK ? "Projekty" : "Projects"} slug="projects" tabs={["Development", "Creative"]} filters={[["", "Javascript", "Autohotkey", "Python", "Blog"],["", "Animation", "Design", "Blog"]]}  let:tab let:filter pt pb cg>
    {#if tab === 0}
	<Thumb dark
		name="StrukShow.com"
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
		name="TASM Counter"
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
	<Thumb dark
		name="AnkiScreener"
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
		name="ProcExp"
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
        name="Save the Princess"
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
    <Thumb
        name="PCAP Analyzer"
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
        name="IPTables port-forwarding"
        icon="fa fa-network-wired"
		bgOpacity={0.2}
        tags="iptables, networking, linux, sysadmin, blog"
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
        name="Right to Repair"
        icon="fa fa-tools"
        bgOpacity={0.12}
        tags="presentation, video"
        showIfTag={filter}
        desc={
            SK	? "Anglická prezentácia, ktorá rieši právo na opravu a temnú stránku spoločnosti Apple."
                : "Presentation covering the Right to Repair and, on a related note, The Dark Side of Apple."
        }
        from="2020-12-03"
        to="2020-12-08"
        nav={[
            {icon: "fab fa-youtube", text: SK ? "Pozrieť" : "Watch", href:"https://youtu.be/x2ToofrDWzw", isButton: true},
            {icon: "fa fa-file-alt", text: SK ? "Slajdy [PDF]" : "Slides [PDF]", href:"/dl/right-to-repair-prez.pdf", static: true},
        ]}
        />
	<Thumb 
		name={ SK ? "GUI pre gTTS" : "GUI for gTTS"}
		icon="fa fa-comment-dots"
		tags="python"
        showIfTag={filter}
		desc={
			SK	? "Jednoduché grafické rozhranie pre gTTS (Google Text-to-Speech) knižnicu."
				: "Simple interface for gTTS (Google Text-to-Speech) library."
		}
		from="2020-05-17"
		to="2020-05-18"
		nav={[
			{icon: "fa fa-code-branch", text:"GitHub", href:"https://github.com/iairu/gTTSgui", isButton: true},
			{icon: "fa fa-download", text: SK ? "Stiahnuť" : "Download", href:"https://github.com/iairu/gTTSgui/releases"},
		]}
		/>
	<Thumb
		name="iairu.com"
		icon="fa fa-code"
		tags="sapper, svelte, javascript, scss, html"
        showIfTag={filter}
		desc={
			SK  ? "Riešenie osobného webového portfólia (tejto stránky) cez Sapper framework."
				: "A personal web portfolio solution (this site) using Sapper framework."
		}
		img="code_thumbs"
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
		name={SK ? "IPv4 kalkulačka + návod" : "IPv4 Calc"}
		icon="fa fa-sitemap"
		tags="c, networking, blog"
        showIfTag={filter}
		desc={
			SK	? "Vypočíta z adresy a masky počiatočnú a koncovú adresu siete."
				: "Calculates network and broadcast address from any IP and mask."
		}
		nav={[
			{icon: "fa fa-code-branch", text:"GitHub", href:"https://github.com/iairu/ipv4calc", isButton: true},
			{icon: "fa fa-download", text: SK ? "Stiahnuť" : "Download", href:"https://github.com/iairu/ipv4calc/releases"},
			{icon: "fa fa-book", text:"Návod na výpočet", href:"/dev/ipv4-calc/", isButton: true, hide: !SK},
		]}
		/>
	<Thumb
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
		/>
	{#if !SK}
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
	{/if}
	<Thumb empty />
	{:else if tab === 1}
	<Thumb dark
		name={SK ? "Grafické portfolio" : "Graphic design portfolio"}
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
		name={SK ? "Zrada kráľa" : "Treason"}
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
    <Thumb 
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
        />
	{/if}
</S>
<S light icon="fa fa-running" name={SK ? "Najviac ma trápi..." : "Worries me the most..."} slug="quote" pt pb nbb sli>
	<span>
		{
			SK ? 	"Momentálne najmä snaha prežiť ďaľší semester..." : 
					"Mainly an effort to survive the current semester..."
		}
	</span>
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
			- JavaScript ES6 (Node.js, Svelte, Electron, {SK ? "základy Vue.js a Reactu" : "basics: Vue.js and React"}), PHP<br>
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
			<u>Odbor BC-INFO4 Informatika (bakalár), v druhej polovici 3. ročníka, 4-ročné štúdium</u><br>
			- Priemer 1.41 (najlepších 11%) za prvé dva semestre<br>
			- Nadobudnutie základov programovania v C++, JavaScript, PHP<br>
			- Zlepšenie rešeršových a prezentačných schopností; práce s Linuxom
			{:else}
			<b>Faculty of Informatics and Information Technologies STU</b> // September 2019 – July 2023<br>
			<u>BC-INFO4 Computer Science (bachelor), third year out of the 4-year study plan</u><br>
			- Average 1.41 (not GPA) (top 11% of students) for first two semesters<br>
			- Acquired basics of programming in C++, JavaScript and PHP languages<br>
			- Improved research and presentation skills; work with Linux
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
