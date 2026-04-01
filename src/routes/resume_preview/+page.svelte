<script lang="ts">
    import '$root/app.postcss';
    import { resume } from '$lib/data/ResumeData.js';
    import { siteConfig } from "$lib/config/site";

    const toExternalUrl = (value: string) =>
        value.startsWith('http://') || value.startsWith('https://') ? value : `https://${value}`;
</script>

<div class="max-w-[8.5in] mx-auto px-[0.6in] py-[0.5in] bg-white text-[#1a1a1a] text-[10.5pt] leading-[1.4] box-border">
    <!-- Header -->
    <header class="text-center mb-[10px] pb-[10px] border-b-[1.5px] border-[#333]">
        <h1 class="text-[22pt] font-bold m-0 mb-[4px] tracking-[0.5px] text-[#111]">{resume.name}</h1>
        <div class="flex justify-center flex-wrap gap-y-[6px] gap-x-[18px] text-[10pt] text-[#333]">
            {#if resume.email}<a href="mailto:{resume.email}" class="text-blue-600 underline hover:text-blue-800">{resume.email}</a>{/if}
            {#if resume.phone}<span>{resume.phone}</span>{/if}
            {#if resume.location}<span>{resume.location}</span>{/if}
            {#if resume.link}<a href={toExternalUrl(resume.link)} target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800">{resume.link}</a>{/if}
            {#if resume.link2}<a href={toExternalUrl(resume.link2)} target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800">{resume.link2}</a>{/if}
        </div>
    </header>

    <!-- Summary -->
    {#if resume.visibility.summary && resume.summary}
        <section class="mt-[12px]">
            <h2 class="text-[12pt] font-bold uppercase tracking-[1px] border-b border-[#555] pb-[2px] m-0 mb-[6px] text-[#111]">Summary</h2>
            <p class="m-0 text-[#333]">{resume.summary}</p>
        </section>
    {/if}

    <!-- Employment History -->
    {#if resume.visibility.employments && resume.employments?.length > 0}
        <section class="mt-[12px]">
            <h2 class="text-[12pt] font-bold uppercase tracking-[1px] border-b border-[#555] pb-[2px] m-0 mb-[6px] text-[#111]">Experience</h2>
            {#each [...resume.employments].reverse() as employment}
                <div class="mb-[8px] break-inside-avoid [page-break-inside:avoid]">
                    <div class="flex justify-between items-baseline gap-[12px]">
                        <span class="font-bold text-[10.5pt]">{employment.title}</span>
                        <span class="shrink-0 text-[10pt] text-[#444]">{employment.dates}</span>
                    </div>
                    <div class="italic text-[10pt] text-[#444] mb-[2px]">{employment.location}</div>
                    {#if employment.bullets?.length > 0}
                        <ul class="list-disc m-0 mt-[2px] pl-[18px]">
                            {#each employment.bullets as bullet}
                                <li class="mb-[1px] text-[10pt]">{bullet}</li>
                            {/each}
                        </ul>
                    {/if}
                </div>
            {/each}
        </section>
    {/if}

    <!-- Skills -->
    {#if resume.visibility.skills && resume.skills?.length > 0}
        <section class="mt-[12px]">
            <h2 class="text-[12pt] font-bold uppercase tracking-[1px] border-b border-[#555] pb-[2px] m-0 mb-[6px] text-[#111]">Skills</h2>
            <div class="flex flex-col gap-[2px]">
                {#each resume.skills as skill}
                    <div class="text-[10pt]">
                        <span class="font-bold">{skill.title}:</span>
                        <span>{skill.bullets.join(', ')}</span>
                    </div>
                {/each}
            </div>
        </section>
    {/if}

    <!-- Education -->
    {#if resume.visibility.educations && resume.educations?.length > 0}
        <section class="mt-[12px]">
            <h2 class="text-[12pt] font-bold uppercase tracking-[1px] border-b border-[#555] pb-[2px] m-0 mb-[6px] text-[#111]">Education</h2>
            {#each resume.educations as education}
                <div class="mb-[8px] break-inside-avoid [page-break-inside:avoid]">
                    <div class="flex justify-between items-baseline gap-[12px]">
                        <span class="font-bold text-[10.5pt]">{education.title}</span>
                        {#if education.dates}
                            <span class="shrink-0 text-[10pt] text-[#444]">{education.dates}</span>
                        {/if}
                    </div>
                    <div class="italic text-[10pt] text-[#444] mb-[2px]">{education.location}</div>
                    {#if education.bullets?.length > 0}
                        <ul class="list-disc m-0 mt-[2px] pl-[18px]">
                            {#each education.bullets as bullet}
                                <li class="mb-[1px] text-[10pt]">{bullet}</li>
                            {/each}
                        </ul>
                    {/if}
                </div>
            {/each}
        </section>
    {/if}

    <!-- Projects -->
    {#if resume.visibility.projects && resume.projects?.length > 0}
        <section class="mt-[12px]">
            <h2 class="text-[12pt] font-bold uppercase tracking-[1px] border-b border-[#555] pb-[2px] m-0 mb-[6px] text-[#111]">Projects</h2>
            {#each resume.projects as project}
                <div class="mb-[8px] break-inside-avoid [page-break-inside:avoid]">
                    <div class="flex justify-between items-baseline gap-[12px]">
                        <span class="font-bold text-[10.5pt]">{project.title}</span>
                    </div>
                    {#if project.bullets?.length > 0}
                        <ul class="list-disc m-0 mt-[2px] pl-[18px]">
                            {#each project.bullets as bullet}
                                <li class="mb-[1px] text-[10pt]">{bullet}</li>
                            {/each}
                        </ul>
                    {/if}
                </div>
            {/each}
        </section>
    {/if}
</div>

<button
    class="fixed bottom-4 left-4 w-12 h-12 flex items-center justify-center bg-[#444] text-white border-none rounded-full cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:bg-[#222] print:hidden"
    on:click={() => window.print()}
    aria-label="Print resume"
>
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 8H5c-1.66 0-3 1.34-3 3v4c0 1.1.9 2 2 2h2v2c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-2h2c1.1 0 2-.9 2-2v-4c0-1.66-1.34-3-3-3zm-4 11H9V13h6v6zm4-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM18 3H6v4h12V3z"/>
    </svg>
</button>

<svelte:head>
    <title>{siteConfig.name} | Resume</title>

    <style>
        @font-face {
            font-family: 'ResumeInter';
            src: url('/fonts/Inter-VariableFont_slnt,wght.ttf') format('truetype');
            font-style: oblique 0deg 10deg;
            font-weight: 100 900;
            font-display: swap;
        }

        html {
            line-height: 1.15;
        }
        body {
            margin: 0;
            background-color: #e0e0e0;
            font-family: 'ResumeInter', 'Inter', sans-serif;
        }
        @media print {
            body {
                background: white;
            }
            @page {
                size: letter;
                margin: 0.25in 0.26in;
            }
        }
    </style>
</svelte:head>
