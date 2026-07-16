import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import os from 'os';

const hostname = os.hostname().toLowerCase();

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		allowedHosts: [`${hostname}.home`]
	}
});
