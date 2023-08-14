<script lang="ts">
	import type { PageData } from './$types';
    import { unescape} from 'html-escaper';
	import he from 'he'
	import { goto, invalidateAll } from '$app/navigation';

	const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

	let playing = true;
	let win = false;
	let lose = false;
	let error = false;
	let loading = false;

	export let data: PageData;

	function handleAnswer(answer: string) {
		playing = false;
		if (data.correct === answer){
			win = true;
		} else if (data.correct !== answer) {
			lose = true;
		} else {
			error = true;
		}
	}
</script>

<main>
	<h2 class="mt-16 text-center text-4xl">
		<a href="/">
			Quizzicle
		</a>
	</h2>

	{#if playing}
		<h1 class="mt-8 text-center text-2xl">{ unescape(he.decode(data.que)) }</h1> 
		<div class="mt-8 flex items-center justify-center gap-5">
			{#each data.array as el}
				<button
					class="focus:shadow-outline h-10 rounded-lg border border-indigo-500 px-5 text-indigo-700 transition-colors duration-150 hover:bg-indigo-500 hover:text-indigo-100"
					on:click={() => {
						handleAnswer(el);
					}}>{unescape(he.decode(el))}</button
				>
			{/each}
		</div>
	{:else if win}
		<h1 class="mt-8 text-center text-2xl">You Won!</h1> 
		<div class="mt-8 flex items-center justify-center gap-5">
			<button class="focus:shadow-outline h-10 rounded-lg border border-indigo-500 px-5 text-indigo-700 transition-colors duration-150 hover:bg-indigo-500 hover:text-indigo-100" on:click={async () => {
				win = false;
				lose = false;
				loading = true;
				await invalidateAll()
				await sleep(500)
				loading = false;
				playing = true;

			}}>
				Play Again	
			</button>
			<button class="focus:shadow-outline h-10 rounded-lg border border-indigo-500 px-5 text-indigo-700 transition-colors duration-150 hover:bg-indigo-500 hover:text-indigo-100" on:click={() => {
				goto("/")
			}}>
				Go Back Home	
			</button>
		</div>	
	{:else if lose}
		<h1 class="mt-8 text-center text-2xl">You Lost! The correct answer was {unescape(he.decode(data.correct ))}</h1> 	
		<div class="mt-8 flex items-center justify-center gap-5">
			<button class="focus:shadow-outline h-10 rounded-lg border border-indigo-500 px-5 text-indigo-700 transition-colors duration-150 hover:bg-indigo-500 hover:text-indigo-100" on:click={async () => {
				win = false;
				lose = false;
				loading = true;
				await invalidateAll()
				await sleep(500)
				loading = false;
				playing = true;
			}}>
				Play Again	
			</button>
			<button class="focus:shadow-outline h-10 rounded-lg border border-indigo-500 px-5 text-indigo-700 transition-colors duration-150 hover:bg-indigo-500 hover:text-indigo-100" on:click={() => {
				goto("/")
			}}>
				Go Back Home	
			</button>
		</div>
	{:else if loading}
		<h1 class="mt-8 text-center text-2xl">Loading</h1> 		
	{:else}
		<h1 class="mt-8 text-center text-2xl">There was an error!</h1> 	
		<div class="mt-8 flex items-center justify-center gap-5">
			<button class="focus:shadow-outline h-10 rounded-lg border border-indigo-500 px-5 text-indigo-700 transition-colors duration-150 hover:bg-indigo-500 hover:text-indigo-100" on:click={() => {
				goto("/")
			}}>
				Go Back Home	
			</button>
		</div>
	{/if}
</main>