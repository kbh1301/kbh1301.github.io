// TODO: Update siteConfig
import { base } from '$app/paths';

export const siteConfig = {
    name: "Kyle Hulvey",
    url: "",
    ogImage: "",
    description:
        "",
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
        repo1: "",
        repo2: "https://github.com/kbh1301/barbell-calc",
    },
    keywords: ``
};

export type SiteConfig = typeof siteConfig;