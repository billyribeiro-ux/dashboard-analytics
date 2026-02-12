<script lang="ts">
	let email = $state('');
	let password = $state('');
	let isLoading = $state(false);
	let error = $state('');

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		isLoading = true;
		error = '';

		try {
			// Simulate auth delay
			await new Promise(resolve => setTimeout(resolve, 800));

			if (email && password) {
				window.location.href = '/';
			} else {
				error = 'Please enter both email and password.';
			}
		} catch (err) {
			error = 'An unexpected error occurred. Please try again.';
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Sign In | Intelligence Command</title>
</svelte:head>

<div class="signin-page">
	<div class="signin-container">
		<div class="brand">
			<div class="brand-icon">
				<span>IC</span>
			</div>
			<h1>Intelligence Command</h1>
			<p>Decision Intelligence Command Center</p>
		</div>

		<form class="signin-form" onsubmit={handleSubmit}>
			{#if error}
				<div class="error-banner" role="alert">
					<svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
					</svg>
					<span>{error}</span>
				</div>
			{/if}

			<div class="field">
				<label for="email">Email address</label>
				<input
					id="email"
					type="email"
					autocomplete="email"
					placeholder="you@company.com"
					bind:value={email}
					required
				/>
			</div>

			<div class="field">
				<label for="password">Password</label>
				<input
					id="password"
					type="password"
					autocomplete="current-password"
					placeholder="••••••••"
					bind:value={password}
					required
				/>
			</div>

			<div class="field-row">
				<label class="checkbox-label">
					<input type="checkbox" />
					<span>Remember me</span>
				</label>
				<a href="/auth/forgot-password" class="forgot-link">Forgot password?</a>
			</div>

			<button type="submit" class="submit-btn" disabled={isLoading}>
				{#if isLoading}
					<span class="spinner"></span>
					Signing in…
				{:else}
					Sign in
				{/if}
			</button>
		</form>

		<div class="divider">
			<span>or continue with</span>
		</div>

		<div class="social-buttons">
			<button class="social-btn" type="button">
				<svg viewBox="0 0 24 24" class="social-icon"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
				Google
			</button>
			<button class="social-btn" type="button">
				<svg viewBox="0 0 24 24" class="social-icon"><path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
				GitHub
			</button>
		</div>

		<p class="signup-link">
			Don't have an account? <a href="/auth/signup">Request access</a>
		</p>
	</div>
</div>

<style>
	.signin-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-bg-primary);
		padding: var(--spacing-lg);
	}

	.signin-container {
		width: 100%;
		max-width: 400px;
	}

	.brand {
		text-align: center;
		margin-bottom: var(--spacing-2xl);
	}

	.brand-icon {
		width: 56px;
		height: 56px;
		background: var(--color-accent-primary);
		border-radius: var(--radius-lg);
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto var(--spacing-md);
		box-shadow: var(--shadow-glow-subtle);
	}

	.brand-icon span {
		color: var(--color-text-inverse);
		font-weight: var(--font-weight-heading);
		font-size: var(--font-size-heading-md);
	}

	.brand h1 {
		font-size: var(--font-size-heading-lg);
		font-weight: var(--font-weight-heading);
		color: var(--color-text-primary);
		margin-bottom: var(--spacing-xs);
	}

	.brand p {
		font-size: var(--font-size-body-sm);
		color: var(--color-text-tertiary);
	}

	.signin-form {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.error-banner {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-sm) var(--spacing-md);
		background: rgba(248, 81, 73, 0.1);
		border: 1px solid rgba(248, 81, 73, 0.3);
		border-radius: var(--radius-md);
		color: var(--color-accent-danger);
		font-size: var(--font-size-body-sm);
	}

	.error-icon {
		width: 18px;
		height: 18px;
		flex-shrink: 0;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.field label {
		font-size: var(--font-size-label-md);
		font-weight: var(--font-weight-label);
		color: var(--color-text-secondary);
	}

	.field input[type="email"],
	.field input[type="password"] {
		padding: var(--spacing-sm) var(--spacing-md);
		background: var(--color-surface-sunken);
		border: 1px solid var(--color-border-default);
		border-radius: var(--radius-md);
		color: var(--color-text-primary);
		font-size: var(--font-size-body-md);
		transition: border-color var(--duration-fast) var(--easing-institutional);
		outline: none;
	}

	.field input:focus {
		border-color: var(--color-border-focus);
		box-shadow: 0 0 0 3px rgba(74, 158, 255, 0.15);
	}

	.field input::placeholder {
		color: var(--color-text-disabled);
	}

	.field-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		font-size: var(--font-size-body-sm);
		color: var(--color-text-secondary);
		cursor: pointer;
	}

	.checkbox-label input[type="checkbox"] {
		accent-color: var(--color-accent-primary);
	}

	.forgot-link {
		font-size: var(--font-size-body-sm);
		color: var(--color-accent-primary);
		text-decoration: none;
	}

	.forgot-link:hover {
		text-decoration: underline;
	}

	.submit-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-sm) var(--spacing-md);
		background: var(--color-accent-primary);
		color: var(--color-text-inverse);
		border: none;
		border-radius: var(--radius-md);
		font-size: var(--font-size-body-md);
		font-weight: var(--font-weight-emphasis);
		cursor: pointer;
		transition: all var(--duration-fast) var(--easing-institutional);
	}

	.submit-btn:hover:not(:disabled) {
		filter: brightness(1.1);
		box-shadow: var(--shadow-glow-subtle);
	}

	.submit-btn:active:not(:disabled) {
		transform: scale(0.98);
	}

	.submit-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.spinner {
		width: 16px;
		height: 16px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	.divider {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		margin: var(--spacing-lg) 0;
		color: var(--color-text-tertiary);
		font-size: var(--font-size-label-sm);
	}

	.divider::before,
	.divider::after {
		content: '';
		flex: 1;
		height: 1px;
		background: var(--color-border-default);
	}

	.social-buttons {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-sm);
	}

	.social-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-sm) var(--spacing-md);
		background: var(--color-surface-interactive);
		border: 1px solid var(--color-border-default);
		border-radius: var(--radius-md);
		color: var(--color-text-primary);
		font-size: var(--font-size-body-sm);
		font-weight: var(--font-weight-label);
		cursor: pointer;
		transition: all var(--duration-fast) var(--easing-institutional);
	}

	.social-btn:hover {
		background: var(--color-surface-interactive-hover);
		border-color: var(--color-border-strong);
	}

	.social-icon {
		width: 18px;
		height: 18px;
	}

	.signup-link {
		text-align: center;
		margin-top: var(--spacing-lg);
		font-size: var(--font-size-body-sm);
		color: var(--color-text-tertiary);
	}

	.signup-link a {
		color: var(--color-accent-primary);
		text-decoration: none;
		font-weight: var(--font-weight-emphasis);
	}

	.signup-link a:hover {
		text-decoration: underline;
	}
</style>
