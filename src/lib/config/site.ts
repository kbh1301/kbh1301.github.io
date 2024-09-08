// TODO: Update siteConfig
import { base } from '$app/paths';

export const siteConfig = {
    name: "Kyle Hulvey",
    url: "https://kbh1301.github.io",
    ogImage: "https://avatars.githubusercontent.com/u/83362164",
    description:
        `Explore Kyle Hulvey's portfolio showcasing innovating web development projects including SvelteKit, TypeScript, and modern UI/UX designs.
         Discover how he can help bring your digital vision to life with cutting-edge technologies and creative solutions.`,
    routes: [
        {
            title: "Intro",
            href: `${base}/#intro`,
            external: false
        },
        {
            title: "Projects",
            href: `${base}/#projects`,
            external: false
        },
        {
            title: "About",
            href: `${base}/#about`,
            external: false
        },
        {
            title: "Contact",
            href: `${base}/#contact`,
            external: false
        },
    ],
    links: {
        github: "https://github.com/kbh1301",
        linkedin: "https://www.linkedin.com/in/kylehulvey/",
        repo1: "https://github.com/kbh1301/md-editor",
        repo2: "https://github.com/kbh1301/barbell-calc",
    },
    keywords: `portfolio, web developer, software engineer, Kyle Hulvey`
};

export type SiteConfig = typeof siteConfig;