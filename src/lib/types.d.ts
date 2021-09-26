interface ImportMetaEnv {
	VITE_RECAPTCHA_SITE_KEY: string;
}

export declare global {
	interface Window {
		handleCaptchaCallback: (token: string) => Promise<void>;
		resetCaptcha: () => void;
		handleCaptchaError: () => void;
	}
}
