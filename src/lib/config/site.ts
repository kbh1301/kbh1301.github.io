// TODO: Update siteConfig
import { base } from '$app/paths';

export const siteConfig = {
    name: "Kyle Hulvey",
    author: "Kyle Hulvey",
    authorEmail: "kyle.hulvey@gmail.com",
    authorPhone: "(615) 796-0056",
    authorLinkedIn: "https://www.linkedin.com/in/kylehulvey/",
    authorGitHub: "https://github.com/kbh1301",
    url: "https://kbh1301.github.io",
    ogImage: "https://avatars.githubusercontent.com/u/83362164",
    description:
        `Explore Kyle Hulvey's portfolio showcasing innovative web development projects including SvelteKit, TypeScript, and modern UI/UX designs.
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
    keywords: `portfolio, web developer, software engineer, Kyle Hulvey`,
    ogType: "website",
};

export type SiteConfig = typeof siteConfig;