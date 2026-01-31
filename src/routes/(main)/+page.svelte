<script lang="ts">
    import { base } from '$app/paths';
    import avi from '$lib/assets/avi.jpg';
    import { Button, SkillBox, ProjectBox } from '$components';
    import Icon from '@iconify/svelte';
    import { onMount } from 'svelte';
    import { pushState } from '$app/navigation';
    import { siteConfig } from "$lib/config/site";
    import { resume } from '$lib/data/ResumeData.js';
    import { projects } from '$lib/data/ProjectsData.js';
    import { skills } from '$lib/data/SkillsData.js';

    let aviSrc = "https://avatars.githubusercontent.com/u/83362164";
    function aviFallback() {aviSrc = avi};

    let sections: HTMLElement[] = [];

    onMount(() => {
        // Handle navigation during scrolling
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                if (entry.isIntersecting) {
                    pushState(`#${entry.target.id}`, {
                        hash: `#${entry.target.id}`
                    });
                }
                });
            },{ threshold: 0.5 }
        );

        sections.forEach(section => observer.observe(section));

        return () => {
            sections.forEach(section => observer.unobserve(section));
        };
    });
</script>

<main class="flex flex-col flex-1 p-4 max-w-[1400px] mx-auto w-full">
    <!-- SECTION: INTRO -->
    <section id="intro" class="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-10 py-8 sm:py-14 mt-10" bind:this={sections[0]}>
        <!-- INTRO TEXT -->
        <div class="flex flex-col items-center lg:items-start lg:justify-center text-center lg:text-left gap-2">
            <h1 class="font-semibold text-5xl md:text-6xl">
                Hi, I am <span class="text-primary">Kyle</span>
                <span class="sr-only">Kyle Hulvey</span>
            </h1>
            <h2 class="font-semibold text-lg md:text-xl">Full Stack Software <span class="text-primary">Developer</span></h2>
            
            <p class="text-foreground/70 py-3 px-0">{resume.summary}</p>

            <Button class="w-fit" href="{base}/#contact" variant="secondary_plus" size="lg">
                <p>Contact Me</p>
                <Icon height="1.5rem" icon="cil:paper-plane" />
            </Button>
        </div>

        <!-- AVATAR -->
        <div class="flex items-center justify-center w-full h-full relative place-self-center aspect-square text-primary">
            <svg
                class="text-primary absolute w-full h-full"
                viewBox="0 0 480 480"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
            >
                <path
                    fill="currentColor"
                    d="M399.5,316Q328,392,225,418.5Q122,445,99,342.5Q76,240,117,169Q158,98,242.5,93.5Q327,89,399,164.5Q471,240,399.5,316Z"
                    transform="scale(1.2) translate(-60, -60)"
                />
            </svg>
            <img
                class="bg-background w-1/2 h-1/2 grayscale p-4 rounded-full aspect-square"
                loading="lazy"
                src= {aviSrc}
                on:error={aviFallback}
                alt="Kyle Hulvey - Full Stack Software Developer Portfolio"
            />
        </div>
    </section>
    <!-- SECTION: PROJECTS -->
    <section id="projects" class="scroll-mt-24 py-20 lg:py-32 flex flex-col gap-24" bind:this={sections[1]}>
        <div class="flex flex-col gap-2 text-center">
            <h6 class="text-lg sm:text-xl md:text-2xl">
                A few of my projects.
            </h6>
            <h3 class="font-semibold text-3xl sm:text-4xl md:text-5xl">
                Curious to see my work?
            </h3>
        </div>
        <div class="flex flex-wrap flex-col lg:flex-row justify-center gap-12 lg:gap-10">
            {#each projects as project, i}
                <ProjectBox {project} allProjects={projects} currentIndex={i} />
            {/each}
        </div>
    </section>
    <!-- SECTION: ABOUT -->
    <section id="about" class="scroll-mt-24 flex flex-col gap-14 py-20" bind:this={sections[2]}>
        <!-- SKILLS -->
        <div class="flex flex-col gap-2 text-center">
            <h3 class="font-semibold text-3xl sm:text-4xl md:text-5xl">
                Top Skills
            </h3>
        </div>
        <div class="flex flex-wrap justify-center gap-10">
            {#each skills as skill}
                <SkillBox {skill} />
            {/each}
        </div>
        <!-- RESUME -->
        <div class="flex flex-col items-center gap-2 text-center py-20">
            <h6 class="text-lg sm:text-xl md:text-2xl">
                View and download my latest resume.
            </h6>
            <Button
                class="w-fit"
                href="{base}/generated-pdf/khulvey_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary_plus"
                size="lg"
            >
                <p>Resume</p>
                <Icon height="1.5rem" icon="bi:arrow-right" />
            </Button>
        </div>
    </section>
    <!-- SECTION: CONTACT -->
    <section id="contact" class="scroll-mt-24 flex flex-col gap-4 justify-center items-center py-20 bg-muted border-t-2 border-secondary rounded-b-2xl" bind:this={sections[3]}>
        <h6 class="text-lg sm:text-xl md:text-2xl pb-10">
            Connect with me &darr;
        </h6>
        <div class="flex flex-col gap-4 justify-center items-center">
            <p><b class="pr-2">Email</b> kyle.hulvey@gmail.com</p>
            <p><b class="pr-2">GitHub</b>
                <a class="text-primary" target="_blank" href={siteConfig.links.github}>
                    kbh1301<sup><span class="text-xs scale-75 pl-0.5">
                        <Icon icon="fa6-solid:arrow-up-right-from-square" class="text-xs scale-[75%] inline-block" />
                    </span></sup>
                </a>
            </p>
            <p><b class="pr-2">LinkedIn</b>
                <a class="text-primary" target="_blank" href={siteConfig.links.linkedin}>
                    kylehulvey<sup><span class="text-xs scale-75 pl-0.5">
                        <Icon icon="fa6-solid:arrow-up-right-from-square" class="text-xs scale-[75%] inline-block" />
                    </span></sup>
                </a>
            </p>
        </div>
    </section>
</main>

<!-- SEO -->
<svelte:head>
	<title>Kyle Hulvey Portfolio - Full Stack Software Developer</title>
    <meta name="description" content={siteConfig.description} />
    <meta name="keywords" content={siteConfig.keywords} />
    <meta name="author" content={siteConfig.author} />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://kbh1301.github.io/" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content={siteConfig.ogType} />
    <meta property="og:site_name" content="Kyle Hulvey Portfolio" />
    <meta property="og:title" content="Kyle Hulvey Portfolio - Full Stack Software Developer" />
    <meta property="og:description" content={siteConfig.description} />
    <meta property="og:image" content={siteConfig.ogImage} />
    <meta property="og:url" content="https://kbh1301.github.io/" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Kyle Hulvey Portfolio - Full Stack Software Developer" />
    <meta name="twitter:description" content={siteConfig.description} />
    <meta name="twitter:image" content={siteConfig.ogImage} />
    
    <!-- Google Verification -->
    <meta name="google-site-verification" content="cMFpjogRB9Y74Ix6vl2zI0CooVAaLEnNVAm-yQubQEc" />
    
    <!-- Structured Data (JSON-LD) -->
    {@html `<script type="application/ld+json">
    [
        {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "${siteConfig.name}",
            "url": "${siteConfig.url}",
            "image": "${siteConfig.ogImage}",
            "jobTitle": "Full Stack Software Developer",
            "email": "${siteConfig.authorEmail}",
            "sameAs": [
                "${siteConfig.authorLinkedIn}",
                "${siteConfig.authorGitHub}"
            ],
            "description": "${siteConfig.description.replace(/"/g, '\\"').replace(/\n/g, ' ').trim()}",
            "knowsAbout": [
                "TypeScript",
                "React",
                "Next.js",
                "SvelteKit",
                "Full Stack Development",
                "Software Engineering",
                "Web Development"
            ],
            "hasOccupation": {
                "@type": "Occupation",
                "name": "Full Stack Software Developer",
                "occupationLocation": {
                    "@type": "Country",
                    "name": "United States"
                }
            }
        },
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Kyle Hulvey Portfolio",
            "url": "${siteConfig.url}",
            "description": "${siteConfig.description.replace(/"/g, '\\"').replace(/\n/g, ' ').trim()}",
            "author": {
                "@type": "Person",
                "name": "${siteConfig.name}"
            },
            "inLanguage": "en-US"
        }
    ]
    </script>`}
</svelte:head>