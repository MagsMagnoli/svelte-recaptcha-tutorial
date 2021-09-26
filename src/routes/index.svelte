<script context="module" lang="ts">
	export const prerender = true;
</script>

<script>
	let requests = 0;

	let username = '';
	let password = '';

	const onSubmit = async () => {
		await fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password
			})
		});

		requests += 1;
	};
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<section class="login">
	<div class="login-container">
		<h1 class="login-header">Login</h1>
		<form class="login-form" on:submit|preventDefault={onSubmit}>
			<div class="form-group">
				<label class="login-label" for="username">Username</label>
				<input
					id="username"
					class="login-input mt-1"
					name="username"
					type="text"
					placeholder="Type your username"
					required
					bind:value={username}
				/>
			</div>
			<div class="form-group mt-2">
				<label class="login-label" for="password">Password</label>
				<input
					id="password"
					class="login-input mt-1"
					name="password"
					type="password"
					placeholder="Type your password"
					required
					bind:value={password}
				/>
			</div>
			<button class="login-button mt-4" type="submit">Login</button>
			<span class="mt-2" class:over9000={requests > 9000}>Requests: {requests}</span>
		</form>
	</div>
</section>

<style>
	.login {
		display: flex;
		flex-direction: column;
		margin: 96px auto;
		text-align: center;
	}

	.login-container {
		background-color: white;
		border-radius: 8px;
		padding: 24px;
		width: 400px;
	}

	.login-header {
		font-weight: 700;
	}

	.login-form {
		display: flex;
		flex-direction: column;
		margin-top: 24px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
	}

	.login-label {
		text-align: start;
		font-size: 10px;
		color: #4c4c4c;
	}

	.login-input {
		padding: 8px;
		border: 1px solid #efefef;
		border-radius: 8px;
	}

	.login-button {
		color: white;
		padding: 8px;
		border: 1px solid #efefef;
		border-radius: 8px;
		background: rgb(0, 231, 255);
		background: linear-gradient(45deg, rgba(0, 231, 255, 1) 0%, rgba(249, 0, 255, 1) 100%);
		cursor: pointer;
	}

	.login-button:hover,
	.login-button:focus {
		opacity: 90%;
	}

	.mt-1 {
		margin-top: 4px;
	}

	.mt-2 {
		margin-top: 8px;
	}

	.mt-4 {
		margin-top: 16px;
	}

	.over9000 {
		font-size: 45px;
		color: red;
	}
</style>
