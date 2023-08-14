import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

function shuffleArray(array: any[]) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

export const load: PageServerLoad = async ({ url, fetch }) => {
	const type = url.searchParams.get('type');
	const difficulty = url.searchParams.get('diff');
	const finalUrl = new URL('https://opentdb.com/api.php');
	finalUrl.searchParams.set('amount', '1');
	finalUrl.searchParams.set('type', 'multiple');
	if (type !== 'Any') {
		finalUrl.searchParams.set('category', String(type));
	}
	if (difficulty !== 'Any') {
		finalUrl.searchParams.set('difficulty', String(difficulty));
	}
	try {
		const res = await fetch(finalUrl);
		try {
			const json = await res.json();
			const ans: string[] = json.results[0].incorrect_answers;
			ans.push(json.results[0].correct_answer);
			const shuffled = ans
				.map((value) => ({ value, sort: Math.random() }))
				.sort((a, b) => a.sort - b.sort)
				.map(({ value }) => value);
            const que: string = json.results[0].question
			return { array: shuffled, unshuff: ans, que: que, correct: json.results[0].correct_answer};
		} catch {
			throw error(500, 'Error in parsing json');
		}
	} catch {
		throw error(500, 'Error in fetching stuff');
	}
};
