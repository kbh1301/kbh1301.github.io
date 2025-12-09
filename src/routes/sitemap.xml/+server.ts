import { siteConfig } from '$lib/config/site';
import type { RequestHandler } from '@sveltejs/kit';

export const prerender = true;

export const GET: RequestHandler = async ({ url }) => {
	const baseUrl = siteConfig.url;
	// Extract base path from the sitemap URL (e.g., /kbh1301.github.io from /kbh1301.github.io/sitemap.xml)
	const pathMatch = url.pathname.match(/^(.+)\/sitemap\.xml$/);
	const base = pathMatch ? pathMatch[1] : '';
	
	const routes = [
		{
			url: `${baseUrl}${base}/`,
			changefreq: 'monthly',
			priority: 1.0
		},
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
	.map(
		(route) => `  <url>
    <loc>${route.url}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};

