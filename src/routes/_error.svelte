<script>
	export let status;
	export let error;
	import Layout from "./[lang]/_layout.svelte";
	import S from '../components/Section.svelte';
	import ErrorIllustration from '../components/ErrorIllustration.svelte';
	import StatusIndicator from '../components/StatusIndicator.svelte';

	const dev = process.env.NODE_ENV === 'development';

	$: errorType = status === 404 ? '404' : status === 403 ? '403' : '500';
	$: errorTitle = status === 404 ? 'Page Not Found' :
	                 status === 403 ? 'Access Denied' :
	                 status === 500 ? 'Server Error' : 'Error';
	$: errorDesc = status === 404 ? 'The page you\'re looking for seems to have lost connection.' :
	                status === 403 ? 'You don\'t have permission to access this resource.' :
	                status === 500 ? 'Something went wrong on our end.' : error.message;

</script>

<svelte:head>
	<title>{status} - {errorTitle}</title>
</svelte:head>

<Layout external>
	<S>
		<div class="error-container tech-border corner-accent">
			<div class="error-visual">
				<ErrorIllustration type={errorType} size={250} />
			</div>

			<div class="error-content">
				<div class="error-status">
					<StatusIndicator status="error" label="Error" pulse={true} />
					<span class="status-code">{status}</span>
				</div>

				<h1 class="error-title">{errorTitle}</h1>
				<p class="error-description">{errorDesc}</p>

				<div class="error-actions">
					<a href="/" class="error-button tech-border">
						<i class="fa fa-home"></i>
						Go Home
					</a>
					<button class="error-button tech-border" on:click={() => window.history.back()}>
						<i class="fa fa-arrow-left"></i>
						Go Back
					</button>
				</div>

				<div class="error-meta">
					<div class="meta-item">
						<i class="fa fa-clock"></i>
						<span>{new Date().toLocaleString()}</span>
					</div>
					<div class="meta-item">
						<i class="fa fa-link"></i>
						<span>{typeof window !== 'undefined' ? window.location.pathname : 'N/A'}</span>
					</div>
				</div>
			</div>

			{#if dev && error.stack}
				<details class="error-debug">
					<summary>Debug Information</summary>
					<pre>{error.stack}</pre>
				</details>
			{/if}
		</div>
	</S>
</Layout>

<style lang="scss">
	.error-container {
		max-width: 800px;
		margin: 60px auto;
		padding: 40px;
		border-radius: 12px;
		background: rgba(255, 255, 255, 0.02);
		position: relative;
		overflow: hidden;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			height: 4px;
			background: linear-gradient(90deg,
				rgba(239, 68, 68, 0.5),
				rgba(59, 130, 246, 0.5),
				rgba(239, 68, 68, 0.5));
		}
	}

	.error-visual {
		display: flex;
		justify-content: center;
		margin-bottom: 30px;
	}

	.error-content {
		text-align: center;
	}

	.error-status {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 15px;
		margin-bottom: 20px;

		.status-code {
			font-family: monospace;
			font-size: 2em;
			font-weight: 700;
			color: rgba(239, 68, 68, 0.7);
			letter-spacing: 2px;
		}
	}

	.error-title {
		font-size: 2em;
		margin: 0 0 15px 0;
		background: linear-gradient(135deg,
			rgba(59, 130, 246, 0.8),
			rgba(139, 92, 246, 0.8));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.error-description {
		font-size: 1.1em;
		color: #666;
		margin-bottom: 30px;
		line-height: 1.6;
	}

	.error-actions {
		display: flex;
		gap: 15px;
		justify-content: center;
		flex-wrap: wrap;
		margin-bottom: 30px;
	}

	.error-button {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 12px 24px;
		background: rgba(59, 130, 246, 0.05);
		border-radius: 8px;
		text-decoration: none;
		color: inherit;
		font-weight: 500;
		transition: all 0.2s;
		cursor: pointer;
		font-size: 1em;

		&:hover {
			background: rgba(59, 130, 246, 0.1);
			transform: translateY(-2px);
			box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
		}

		i {
			font-size: 0.9em;
		}
	}

	.error-meta {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding-top: 20px;
		border-top: 1px solid rgba(59, 130, 246, 0.1);
		font-size: 0.85em;
		color: #666;

		.meta-item {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 8px;

			i {
				color: rgba(59, 130, 246, 0.6);
			}

			span {
				font-family: monospace;
			}
		}
	}

	.error-debug {
		margin-top: 30px;
		padding: 15px;
		background: rgba(0, 0, 0, 0.05);
		border: 1px solid rgba(59, 130, 246, 0.2);
		border-radius: 8px;

		summary {
			cursor: pointer;
			font-weight: 600;
			color: rgba(59, 130, 246, 0.8);
			user-select: none;

			&:hover {
				color: rgba(59, 130, 246, 1);
			}
		}

		pre {
			margin-top: 15px;
			padding: 15px;
			background: rgba(0, 0, 0, 0.5);
			border-radius: 4px;
			overflow-x: auto;
			font-size: 0.85em;
			line-height: 1.5;
		}
	}

	@media (max-width: 768px) {
		.error-container {
			margin: 20px;
			padding: 30px 20px;
		}

		.error-title {
			font-size: 1.5em;
		}

		.error-actions {
			flex-direction: column;
		}

		.error-button {
			width: 100%;
			justify-content: center;
		}
	}
</style>
