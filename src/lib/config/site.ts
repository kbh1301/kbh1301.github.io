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
        `Kyle Hulvey Portfolio - Full Stack Software Developer specializing in TypeScript, React, and Next.js. Explore projects, skills, and experience in web development, automation, and modern software engineering.`,
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
    keywords: `Kyle Hulvey portfolio, Kyle Hulvey, portfolio, web developer, software engineer, full stack developer, TypeScript developer, React developer, Next.js developer`,
    ogType: "website",
};

export type SiteConfig = typeof siteConfig;