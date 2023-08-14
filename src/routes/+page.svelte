<script lang="ts">
	import { goto } from '$app/navigation';
	import { quizType } from '$lib/types/types';
	import { page } from '$app/stores'


	const keys = Object.keys(quizType);
	let type: string;
	let difficulty: string;
	const toSend = new URL(`${$page.url.href}play`)
	function handleSubmit(){
		toSend.searchParams.set("type", type)
		toSend.searchParams.set("diff", difficulty)
		goto(toSend)
	}
</script>

<main class="flex h-screen flex-col items-center justify-center">
	<h2 class="my-6 text-4xl">Quizzicle</h2>
	<form on:submit|preventDefault={handleSubmit}>
		<div class="flex max-w-5xl justify-center gap-4 px-3">
			<h1>Select Quiz Type</h1>
			<select bind:value={type}>
				<option value="any">Any</option>
				{#each keys as type}
					<!-- @ts-ignore -->
					<option value={quizType[type]}>{type}</option>
				{/each}
			</select>
		</div>
		<div class="flex max-w-5xl justify-center gap-4 px-3 pt-5">
			<h1>Select Quiz Difficulty</h1>
			<select bind:value={difficulty}>
				<option value="any">Any</option>
				<option value="easy">Easy</option>
				<option value="medium">Medium</option>
				<option value="hard">Hard</option>
			</select>
		</div>
		<div class="flex max-w-5xl justify-center gap-4 px-3 pt-5">
			<input type="submit" class="h-10 px-5 text-indigo-700 transition-colors duration-150 border border-indigo-500 rounded-lg focus:shadow-outline hover:bg-indigo-500 hover:text-indigo-100" value="Go!"/>
		</div>
	</form>
</main>

<style>
	code {
		background: theme('colors.zinc.900');
		padding: theme('spacing[0.5]');
	}
</style>
