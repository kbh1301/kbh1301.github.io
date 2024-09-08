<script lang="ts">
    import { base } from '$app/paths';
    import avi from '$lib/assets/avi.jpg';
    import { Button, SkillBox, ProjectBox } from '$lib/components';
    import Icon from '@iconify/svelte';
    import mdeditor1 from '$lib/assets/mdeditor1.jpg';
    import mdeditor2 from '$lib/assets/mdeditor2.jpg';
    import mdeditor3 from '$lib/assets/mdeditor3.jpg';
    import bbcalc1 from '$lib/assets/bbcalc1.jpg';
    import bbcalc2 from '$lib/assets/bbcalc2.jpg';
    import { onMount } from 'svelte';
    import { pushState } from '$app/navigation';
    import { siteConfig } from "$lib/config/site";
    import { resume } from '$lib/assets/ResumeData.js';

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

    const projects = [
        {
            title: "Markdown Editor",
            icon: "fa6-brands:markdown",
            images: [ mdeditor1, mdeditor2, mdeditor3 ],
            overview: "Native desktop application for quickly viewing and editing markdown files.",
            features: [
                "Fast application launch",
                "Standalone launch or launch when opening .md files",
                "Easy to reach Edit toggle",
                "Instantly viewable changes in preview",
                "Optional editor toolbar",
                "Rearrange lines in editor via draggable line numbers",
                "Simple, clean interface",
            ],
            skills: [
                "Tauri (Rust)",
                "SvelteKit (TypeScript)",
                "Shadcn (Tailwind CSS)",
            ],
            link: siteConfig.links.repo1
        },
        {
            title: "Barbell Calculator",
            icon: "tabler:barbell-filled",
            images: [ bbcalc1, bbcalc2 ],
            overview: "Based on user input, this application will calculate and display the olympic plates needed for each side of a specific barbell weight setup.",
            features: [
                "plate visualization",
                "'per side' plate details",
                "toggle button for pounds or kilograms",
                "rounds user input down to the nearest available plate size",
                "input validation features",
            ],
            skills: [
                "HTML",
                "CSS",
                "JavaScript",
            ],
            link: siteConfig.links.repo2
        }
    ];

    const skills = [
        { name: "TypeScript", icon: "devicon-plain:typescript" },
        { name: "C#", icon: "devicon-plain:csharp" },
        { name: "SQL", icon: "devicon-plain:sqldeveloper" },
        { name: "Node.js", icon: "devicon-plain:nodejs-wordmark" },
        { name: "React", icon: "mdi:react" },
        { name: "SvelteKit", icon: "devicon-plain:svelte" },
    ];
</script>

<main class="flex flex-col flex-1 p-4">
    <!-- SECTION: INTRO -->
    <section id="intro" class="grid grid-cols-1 lg:grid-cols-2 gap-10 py-8 sm:py-14" bind:this={sections[0]}>
        <!-- INTRO TEXT -->
        <div class="flex flex-col items-center lg:items-start lg:justify-center text-center lg:text-left gap-2">
            <h2 class="font-semibold text-5xl md:text-6xl">Hi, I am <span class="text-primary">Kyle</span></h2>
            <h3 class="font-semibold text-lg md:text-xl">Full Stack Software <span class="text-primary">Developer</span></h3>
            
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
                alt="Avatar"
            />
        </div>
    </section>
    <!-- SECTION: PROJECTS -->
    <section id="projects" class="py-20 lg:py-32 flex flex-col gap-24" bind:this={sections[1]}>
        <div class="flex flex-col gap-2 text-center">
            <h6 class="text-lg sm:text-xl md:text-2xl">
                A few of my projects.
            </h6>
            <h3 class="font-semibold text-3xl sm:text-4xl md:text-5xl">
                Curious to see my work?
            </h3>
        </div>
        <div class="flex flex-wrap flex-col lg:flex-row justify-center gap-12 lg:gap-10">
            {#each projects as project}
                <ProjectBox {project} />
            {/each}
        </div>
    </section>
    <!-- SECTION: ABOUT -->
    <section id="about" class="flex flex-col gap-14 py-20" bind:this={sections[2]}>
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
                href="{base}/resume_preview"
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
    <section id="contact" class="flex flex-col gap-4 justify-center items-center py-20 bg-muted border-t-2 border-secondary" bind:this={sections[3]}>
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
	<title>{siteConfig.name} | Portfolio</title>
    <meta name="description" content={siteConfig.description} />
    <meta property="og:title" content="{siteConfig.name} | portfolio" />
    <meta property="og:description" content={siteConfig.description} />
    <meta property="og:image" content={siteConfig.ogImage} />
    <meta property="og:url" content={siteConfig.url} />
</svelte:head>