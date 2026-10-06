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
		// Ensure we are in Art mode for the art route
		content.setMode('art');
		return () => {
			unsub();
		}
	});
</script>

<svelte:head>
	<title>Art Portfolio - Ondrej Špánik</title>
</svelte:head>

<S row icon="fa fa-paint-brush" name={SK ? "Umelecká Tvorba" : "Art Portfolio"} slug="projects" pt pb cg>
	<Thumb
		name={SK ? "Tradičná maľba" : "Traditional Painting"}
		icon="fa fa-palette"
		tags="acrylic, oil, canvas"
		desc={SK ? "Experimenty a plnohodnotné diela s použitím akrylových a olejových farieb na plátne, zamerané na expresionizmus a portréty." : "Experiments and full works using acrylic and oil paints on canvas, focusing on expressionism and portraits."}
		from="2018-01-01"
		progress={100}
	/>
	<Thumb
		name={SK ? "Kostýmový dizajn a Cosplay" : "Costume Design"}
		icon="fa fa-tshirt"
		tags="sewing, craft, armor"
		desc={SK ? "Návrh a vlastnoručná výroba detailných kostýmov vrátane šitia látok a formovania EVA peny pre prop-making." : "Design and hand-crafting of detailed costumes, including fabric sewing and EVA foam shaping for prop-making."}
		from="2017-05-01"
		progress={100}
	/>
	<Thumb
		name={SK ? "Grafické portfolio" : "Graphic design portfolio"}
		bg="gfxbg"
		bgOpacity={1} bgNoFilter
		icon="dumpling-w"
		tags="design, concepts, digital"
		desc={SK ? "Koncepty brandingu, staršie dizajny webov a maturitný projekt." : "Branding concepts, older web designs and a graduation project."}
		nav={[
			{icon: "fa fa-share", text: SK ? "Navštíviť" : "Visit", href: SK ? "/gfx/" : "/gfx/en/", isButton: true, modal: false, static: true},
		]}
	/>
	<Thumb
		name={SK ? "Zrada kráľa" : "Treason"}
		bg="zrada"
		icon="fa fa-paint-brush"
		tags="3d, animation, blender"
		desc={SK ? "Maturitný projekt - Animovaný príbeh typografie: 3D Animácia vytvorená v Blenderi o svete písmeniek." : "Graduation project - Animated typography story: 3D Animation made in Blender about a world of letters."}
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
        from="2016-06-01"
        progress={15}
    />
    <Thumb 
        name={SK ? "Tajný projekt II (Krátkodobý)" : "Secret project II (Short-term)"}
        icon="fa fa-hourglass-half"
        tags="video, animation, story"
        from="2022-01-01"
        progress={30}
    />
</S>
