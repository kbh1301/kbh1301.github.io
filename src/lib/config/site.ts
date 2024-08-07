// TODO: Update siteConfig
export const siteConfig = {
    name: "Kyle Hulvey",
    url: "",
    ogImage: "",
    description:
        "",
    routes: [
        {
            title: "Intro",
            href: "#intro",
            external: false
        },
        {
            title: "Projects",
            href: "#projects",
            external: false
        },
        {
            title: "About",
            href: "#about",
            external: false
        },
        {
            title: "Contact",
            href: "#contact",
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