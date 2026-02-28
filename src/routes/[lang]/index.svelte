<script>
	import Quote from '../../components/Quote.svelte';
	import Nav from '../../components/Nav.svelte';
	import S from '../../components/Section.svelte';
	import C from "../../components/Columns.svelte";
	import { lang } from '../../components/LangStore.svelte';
	import { content } from '../../components/ContentStore.svelte';
	import Tabs from '../../components/Tabs.svelte';
	import Thumb from '../../components/Thumb.svelte';
	import HighlightThumb from '../../components/HighlightThumb.svelte';
	import { onMount } from 'svelte';
	import { darkHeader } from '../../components/DarkStore.svelte';


	let l;
	let SK = false;
	let currentMode = 'it';
	$: SK = l.current === "sk"; // basically a macro
	const unsub = lang.subscribe((lng)=>{l = lng;});
	const unsubContent = content.subscribe((mode) => {
		currentMode = mode;
	});
	onMount(()=>{
		darkHeader.set(false);
		return ()=>{
			unsub();
			unsubContent();
			darkHeader.set(false);
		}
	});
</script>

<svelte:head>
	<title>Ondrej Špánik - Full-Stack Developer & DevOps Engineer</title>
	<meta name="description" content="Full-stack developer and DevOps engineer specializing in modern web technologies, system architecture, and automation. Digital garden featuring technical documentation, projects, and creative work.">
	<meta name="robots" content="index,follow">
</svelte:head>

<section class="split-hero-section">
	<a href="/{l.current}/dev/" class="split-side it-side">
		<div class="content-wrapper">
			<div class="icon-wrapper">
				<i class="fa fa-code"></i>
			</div>
			<h1 class="split-title">
				{SK ? 'Softvérové' : 'Software'}
				<span>{SK ? 'Inžinierstvo' : 'Engineering'}</span>
			</h1>
			<p class="split-subtitle">
				{SK ? 'Precízny kód, moderné technológie a komplexné digitálne riešenia.' : 'Precise code, modern technologies, and complex digital solutions.'}
			</p>
			<span class="explore-btn primary">Explore IT Portfolio &rarr;</span>
		</div>
		<div class="side-background"></div>
	</a>

	<a href="/{l.current}/art/" class="split-side art-side">
		<div class="content-wrapper">
			<div class="icon-wrapper">
				<i class="fa fa-paint-brush"></i>
			</div>
			<h1 class="split-title">
				{SK ? 'Umelecká' : 'Art &'}
				<span>{SK ? 'Tvorba' : 'Design'}</span>
			</h1>
			<p class="split-subtitle">
				{SK ? 'Kreatívny digitálny dizajn, 3D vizualizácie a vizuálne narátyvy.' : 'Creative digital design, 3D visualizations, and visual narratives.'}
			</p>
			<span class="explore-btn secondary">Explore Art Portfolio &rarr;</span>
		</div>
		<div class="side-background"></div>
	</a>
	
	<div class="split-divider">
		<div class="divider-line"></div>
		<div class="divider-circle">
			<span>OR</span>
		</div>
	</div>
</section>

<style lang="scss" global>
	.highlights-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 12px;
		margin-bottom: 20px;
		width: 100%;

		@media (max-width: 768px) {
			grid-template-columns: 1fr;
		}
	}

	.split-hero-section {
		display: flex;
		flex-direction: column;
		width: 100%;
		min-height: 80vh;
		position: relative;
		background: #000;
		overflow: hidden;

		@media (min-width: 900px) {
			flex-direction: row;
			min-height: 70vh;
		}

		.split-side {
			flex: 1;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			text-decoration: none;
			padding: 4rem 2rem;
			color: white;
			transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
			z-index: 1;
			overflow: hidden;
			
			&::before {
				content: '';
				position: absolute;
				top: 0; left: 0; right: 0; bottom: 0;
				background: rgba(0,0,0,0.5);
				transition: background 0.6s cubic-bezier(0.19, 1, 0.22, 1);
				z-index: 0;
			}

			.content-wrapper {
				position: relative;
				z-index: 2;
				text-align: center;
				max-width: 500px;
				transition: transform 0.5s ease;
			}
			
			.icon-wrapper {
				font-size: 3rem;
				margin-bottom: 1.5rem;
				opacity: 0.8;
				transition: all 0.3s ease;
			}

			.split-title {
				font-size: clamp(2rem, 4vw, 3.5rem);
				font-weight: 800;
				line-height: 1.1;
				margin: 0 0 1rem 0;
				letter-spacing: -0.02em;
				
				span {
					display: block;
				}
			}

			.split-subtitle {
				font-size: clamp(1rem, 1.5vw, 1.25rem);
				opacity: 0.9;
				line-height: 1.6;
				margin-bottom: 2rem;
				text-shadow: 0 2px 4px rgba(0,0,0,0.5);
				transition: opacity 0.3s ease;
			}
			
			.explore-btn {
				display: inline-block;
				padding: 0.75rem 1.5rem;
				border: 1px solid rgba(255,255,255,0.3);
				font-weight: 600;
				text-transform: uppercase;
				letter-spacing: 0.05em;
				font-size: 0.9rem;
				transition: all 0.3s ease;
				background: rgba(0,0,0,0.2);
				backdrop-filter: blur(4px);
			}

			.side-background {
				position: absolute;
				top: 0; left: 0; right: 0; bottom: 0;
				z-index: -1;
				background-size: cover;
				background-position: center;
				transition: transform 0.8s scale;
			}

			&:hover {
				flex: 1.15;
				
				&::before {
					background: rgba(0,0,0,0.2);
				}
				
				.content-wrapper {
					transform: scale(1.05);
				}
				
				.icon-wrapper {
					transform: translateY(-10px);
					opacity: 1;
				}
				
				.side-background {
					transform: scale(1.05);
				}
				
				.explore-btn {
					background: white;
					color: black;
				}
			}
		}

		.it-side {
			.side-background {
				background: radial-gradient(circle at center, rgba(59, 130, 246, 0.4) 0%, rgba(10, 20, 40, 0.9) 100%);
			}
			&::after {
				content: '';
				position: absolute;
				top: 0; right: 0; bottom: 0; width: 1px;
				background: rgba(59, 130, 246, 0.5);
			}
			&:hover .icon-wrapper { color: rgb(96, 165, 250); text-shadow: 0 0 20px rgba(59, 130, 246, 0.8); }
		}

		.art-side {
			.side-background {
				background: radial-gradient(circle at center, rgba(16, 185, 129, 0.4) 0%, rgba(10, 30, 20, 0.9) 100%);
			}
			&::after {
				content: '';
				position: absolute;
				top: 0; left: 0; bottom: 0; width: 1px;
				background: rgba(16, 185, 129, 0.5);
			}
			&:hover .icon-wrapper { color: rgb(52, 211, 153); text-shadow: 0 0 20px rgba(16, 185, 129, 0.8); }
		}

		.split-divider {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			z-index: 10;
			display: flex;
			align-items: center;
			justify-content: center;
			pointer-events: none;
			
			@media (max-width: 899px) {
				flex-direction: column;
				width: 100%;
				height: auto;
			}

			.divider-line {
				position: absolute;
				background: rgba(255, 255, 255, 0.2);
				
				@media (min-width: 900px) {
					width: 2px;
					height: 100vh;
				}
				@media (max-width: 899px) {
					height: 2px;
					width: 100%;
				}
			}

			.divider-circle {
				position: relative;
				width: 50px;
				height: 50px;
				background: #09090b;
				border: 2px solid rgba(255, 255, 255, 0.2);
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				color: rgba(255, 255, 255, 0.6);
				font-size: 0.8rem;
				font-weight: bold;
				letter-spacing: 0.1em;
				backdrop-filter: blur(10px);
			}
		}
	}
		.view-all-button {
			display: inline-block;
			margin-top: 2rem;
			padding: 0.875rem 1.5rem;
			border-radius: 0;
			font-weight: 600;
			font-size: 1rem;
			text-decoration: none;
			transition: all 0.2s ease;
			border: 1px solid transparent;

			&.primary {
				background: rgba(59, 130, 246, 0.1);
				color: rgba(59, 130, 246, 1);
				border-color: rgba(59, 130, 246, 0.5);

				&:hover {
					background: rgba(59, 130, 246, 1);
					color: white;
					border-color: rgba(59, 130, 246, 1);
					transform: translateY(-2px);
					box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
				}
			}

			&.secondary {
				background: rgba(16, 185, 129, 0.1);
				color: rgba(16, 185, 129, 1);
				border-color: rgba(16, 185, 129, 0.5);

				&:hover {
					background: rgba(16, 185, 129, 1);
					color: white;
					border-color: rgba(16, 185, 129, 1);
					transform: translateY(-2px);
					box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
				}
			}
		}

		.highlights-grid {
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
		}

		.split-highlights-container {
			display: flex;
			flex-direction: column;
			width: 100%;
			max-width: 1400px;
			margin: 0 auto;
			padding: 2rem;
			gap: 4rem;
			box-sizing: border-box;

			@media (min-width: 900px) {
				flex-direction: row;
				padding: 4rem;
				gap: 4rem;
			}
		}

		.split-half {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;

			.half-title {
				font-size: 2rem;
				margin-bottom: 2rem;
				text-align: center;
			}

			&.it-half .half-title { color: rgb(59, 130, 246); }
			&.art-half .half-title { color: rgb(16, 185, 129); }
		}
</style>
