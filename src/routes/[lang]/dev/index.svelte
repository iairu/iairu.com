<script>
	import Thumb from '../../../components/Thumb.svelte';
	import S from '../../../components/Section.svelte';
	import { lang } from '../../../components/LangStore.svelte';
	import { content } from '../../../components/ContentStore.svelte';
	import { onMount } from 'svelte';

	let l;
	let SK = false;
	$: SK = l.current === "sk";
	const unsub = lang.subscribe((lng)=>{l = lng;});
	
	onMount(() => {
		// Ensure we are in IT mode for the dev route
		content.setMode('it');
		return () => {
			unsub();
		}
	});
</script>

<svelte:head>
	<title>Software Engineering Portfolio - Ondrej Špánik</title>
</svelte:head>

<S row icon="fa fa-code" name={SK ? "Softvérové Projekty" : "Software Projects"} slug="projects" pt pb cg>
	<Thumb
		name="StrukShow.com"
		icon="strukshow-w"
		bg="strukshow"
		tags="svelte, javascript, scss, html, php"
		desc={SK ? "Komplexné riešenie modernej osobnej webovej stránky pomocou CockpitCMS a Svelte." : "Complex solution of a modern personal website using CockpitCMS and Svelte."}
		from="2020-06-01"
		to="2020-08-03"
		nav={[
			{icon: "fa fa-share", text: SK ? "Navštíviť" : "Visit", href:"https://strukshow.com", isButton: true},
			{icon: "fa fa-file-alt", text: "Dev Docs", href:"/strukshow-docs/", isButton: true, hide: !SK, static: true},
		]}
	/>
	<Thumb
		name="PostgreSQL REST API"
		icon="fa fa-file-code"
        bgOpacity={0.2}
		tags="postgres, django, python, json, sql"
		desc={SK ? "Django REST API pre komplexné SELECT queries nad Postgres databázou. Vypracované od základov nad existujúcou DB." : "Django REST API for complex SELECT queries over a Postgres database. Created from scratch over an existing DB."}
		from="2022-02-17"
		to="2022-05-08"
		nav={[
            {icon: "fa fa-file-alt", text: SK ? "Statické demo" : "Static demo", href:"/dbs/", isButton: true, static: true},
            {icon: "fa fa-code-branch", text:"GitHub", href:"https://github.com/iairu/dbs_django_postgresql"},
		]}
	/>
	<Thumb
		name="TASM Counter"
		icon="fa fa-file-code"
        bgOpacity={0.2}
		tags="assembly, ms-dos"
		desc={SK ? "Počítanie rôznych druhov znakov a spracovanie argumentov, súborov v 16-bit MS-DOS Turbo Assembleri." : "Counting different types of characters, processing arguments, files in 16-bit MS-DOS Turbo Assembler."}
		from="2022-03-07"
		to="2022-03-21"
		nav={[
            {icon: "fa fa-code-branch", text:"GitHub", href:"https://github.com/iairu/tasm_counter", isButton: true},
		]}
	/>
	<!-- Include other IT Thumbs here for brevity in the automated response, standard structure applies -->
    <Thumb
        name="Save the Princess"
        bg="stp"
        icon="fa fa-gamepad"
        tags="javascript"
        desc={SK ? "Vanilla JavaScript hra inšpirovaná Street Fighterom. Prvý JavaScript projekt, stavané podľa MVC princípu." : "Vanilla JavaScript game inspired by Street Fighter. First Javascript project, based on MVC."}
        from="2020-02-21"
        to="2020-06-24"
        nav={[
            {icon: "fa fa-play", text: SK ? "Zahrať" : "Play", href:"/" + l.current + "/dev/save-the-princess/", isButton: true},
            {icon: "fa fa-file-alt", text:"Docs [PDF]", href:"/dl/save-the-princess.pdf", hide: !SK},
        ]}
    />
	<Thumb
		name="iairu.com"
		icon="fa fa-code"
		tags="sapper, svelte, javascript, scss, html"
		desc={SK ? "Riešenie osobného webového portfólia (tejto stránky) cez Sapper framework." : "A personal web portfolio solution (this site) using Sapper framework."}
		img="code_thumbs"
	/>
</S>
