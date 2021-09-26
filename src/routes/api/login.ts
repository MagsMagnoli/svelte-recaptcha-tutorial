import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler<void, { username: string }> = async ({ body }) => {
	const { username } = body;

	const user = {
		id: Math.random() * 1000,
		username
	};

	return {
		status: 200,
		body: user
	};
};
