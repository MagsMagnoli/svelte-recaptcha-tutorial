import type { RequestHandler } from '@sveltejs/kit';
import dotenv from 'dotenv';

type LoginRequest = {
	username: string;
	password: string;
	recaptchaToken: string;
};

dotenv.config();

const { RECAPTCHA_SECRET_KEY } = process.env;

export const post: RequestHandler<void, LoginRequest> = async ({ host, body }) => {
	const { username, password, recaptchaToken } = body;

	if (!username || !password || !recaptchaToken) {
		return {
			status: 400,
			body: 'Invalid request. Required fields were missing'
		};
	}

	const remoteip = host;

	const recaptchaVerifyResponse = await fetch(
		`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}&remoteip=${remoteip}`,
		{
			method: 'POST'
		}
	);

	const json: {
		success: boolean;
		hostname: string;
		challenge_ts: number;
		'error-codes': string[];
	} = await recaptchaVerifyResponse.json();

	if (!json.success) {
		return {
			status: 400,
			body: 'ReCAPTCHA failed. Please try again'
		};
	}

	const user = {
		id: Math.random() * 1000,
		username
	};

	return {
		status: 200,
		body: user
	};
};
