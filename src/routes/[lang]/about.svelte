<script>
	import Thumb from '../../components/Thumb.svelte';
	import S from '../../components/Section.svelte';
	import C from "../../components/Columns.svelte";
	import Quote from '../../components/Quote.svelte';
	import Nav from '../../components/Nav.svelte';
	import { lang } from '../../components/LangStore.svelte';

	let l;
	let SK = false;
	$: SK = l.current === "sk";
	const unsub = lang.subscribe((lng)=>{l = lng;});
</script>

<svelte:head>
	<title>{SK ? 'O mne' : 'About'} - Ondrej Špánik</title>
</svelte:head>

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
		<div class="bio-card">
			<h3>{SK ? "Programovanie" : "Programming"}</h3>
			<ul>
				<li>HTML, CSS (SCSS), Git</li>
				<li>JavaScript ES6 (Node.js, Svelte, Electron, {SK ? "základy Vue.js a Reactu" : "basics: Vue.js and React"}), PHP</li>
				<li>C, Bash, {SK ? "Základné zručnosti v jazykoch" : "Basic knowledge of"} Java, Python</li>
				<li>AutoHotkey</li>
			</ul>
		</div>
		<div class="bio-card">
			<h3>{SK ? "Grafický dizajn" : "Graphic design"}</h3>
			<ul>
				<li>
                    {SK ? "Expertné, každodenné skúsenosti s Adobe CC balíkom, najmä:"
				    : "Expert, everyday experience with Adobe CC, especially:"}
			        <span class="sub-text">Adobe Photoshop, Adobe Illustrator, Adobe Premiere Pro, Adobe InDesign</span>
                </li>
				<li>{SK ? "Širšia znalosť softvéru Figma a Blender" : "Knowledge of Figma and Blender"}</li>
			</ul>
		</div>
	</S>
	<S row icon="fa fa-graduation-cap" name={SK ? "Vzdelanie" : "Education"} slug="edu" importance={2} hrd eq>
		<div class="bio-card">
			<h3>FIIT {SK ? "(informatika)" : "(computer science)"}</h3>
			<p class="bio-meta">
                <b>{SK ? "Fakulta informatiky a informačných technológií STU" : "Faculty of Informatics and Information Technologies STU"}</b>
                <span>{SK ? "September 2019 – Júl 2023" : "September 2019 – July 2023"}</span>
            </p>
			<p class="bio-sub">
                <u>{SK ? "Odbor BC-INFO4 Informatika (bakalár), v druhej polovici 3. ročníka, 4-ročné štúdium" : "BC-INFO4 Computer Science (bachelor), third year out of the 4-year study plan"}</u>
            </p>
			<ul>
				<li>{SK ? "Priemer 1.41 (najlepších 11%) za prvé dva semestre" : "Average 1.41 (not GPA) (top 11% of students) for first two semesters"}</li>
				<li>{SK ? "Nadobudnutie základov programovania v C++, JavaScript, PHP" : "Acquired basics of programming in C++, JavaScript and PHP languages"}</li>
				<li>{SK ? "Zlepšenie rešeršových a prezentačných schopností; práce s Linuxom" : "Improved research and presentation skills; work with Linux"}</li>
			</ul>
		</div>
		<div class="bio-card">
			<h3>SUPTN {SK ? "(grafický dizajn)" : "(graphic design)"}</h3>
			<p class="bio-meta">
                <b>{SK ? "Škola umeleckého priemyslu Trenčín" : "School of art industry Trenčín"}</b>
                <span>{SK ? "September 2015 – Jún 2019" : "September 2015 – June 2019"}</span>
            </p>
			<p class="bio-sub">
                <u>{SK ? "Odbor 8261 M Propagačná grafika, 4-ročné štúdium" : "8261 M Propagation graphics, 4-year study plan"}</u>
            </p>
			<ul>
			    {#if SK}
				<li>Ukončené úplné stredné odborné vzdelanie</li>
				<li>Nadobudnutie praktických aj teoretických znalostí v oblasti grafického dizajnu</li>
				<li>Navrhovanie, organizácia, realizácia a prezentácia vlastnej grafickej a umeleckej tvorby</li>
				<li>Skúsenosti s typografiou, printovými médiami, Adobe CC balíkom</li>
				{:else}
				<li>Acquired practical and theoretical knowledge in the field of graphic design</li>
				<li>Conceptualization, organizing, realization and presentation of original graphic and artistic works</li>
				<li>Experience with typography, print media and Adobe CC bundle</li>
				{/if}
			</ul>
		</div>
	</S>
</S>
<S light icon="fa fa-comment-dots" name="Resume" slug="more" pt pb nbt sli>
	<Nav nav={[
        {icon: "far fa-file", text: (SK ? "Front-end developer / IT technik" : "Front-end developer / IT technician") + " [2022-06 PDF]", href: SK ? "/dl/resume-sk.pdf" : "/dl/resume-en.pdf", isButton: true},
	]}/>
</S>

<style lang="scss" global>
	.bio-card {
		padding: 2rem;
		border: 1px solid rgba(0, 0, 0, 0.1);
		background: rgba(255, 255, 255, 0.5);
		transition: all 0.3s ease;
		display: flex;
		flex-direction: column;

		:global(body.dark-theme) & {
			border-color: rgba(255, 255, 255, 0.1);
			background: rgba(255, 255, 255, 0.02);
		}

		&:hover {
			border-color: rgba(var(--theme-color-rgb), 0.3);
			box-shadow: 0 4px 20px rgba(var(--theme-color-rgb), 0.05);
			transform: translateY(-2px);
		}

		h3 {
			margin: 0 0 1.5rem 0;
			font-size: 1.25rem;
			color: rgba(var(--theme-color-rgb), 1);
		}

		.bio-meta {
			margin: 0 0 0.5rem 0;
			display: flex;
			flex-direction: column;
			gap: 0.25rem;

			b {
				font-size: 1.1rem;
			}
			span {
				font-size: 0.9rem;
				opacity: 0.7;
			}
		}

		.bio-sub {
			margin: 0 0 1.5rem 0;
			font-size: 0.95rem;

			u {
				text-decoration: none;
				border-bottom: 1px dashed rgba(var(--theme-color-rgb), 0.5);
			}
		}

		ul {
			margin: 0;
			padding-left: 1.25rem;
			display: flex;
			flex-direction: column;
			gap: 0.75rem;

			li {
				line-height: 1.6;
				
				.sub-text {
					font-size: 0.9em;
					opacity: 0.8;
					display: block;
					margin-top: 0.25rem;
				}
			}
		}
	}
</style>
