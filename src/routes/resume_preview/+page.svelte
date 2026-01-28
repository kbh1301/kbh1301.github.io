<script lang="ts">
    // TODO: Refactor HTML and CSS structure

    import { resume } from '$lib/data/ResumeData.js';
    import { Button } from '$lib/components';
    import Icon from '@iconify/svelte';
    import { siteConfig } from "$lib/config/site";
</script>

<div class="r-page">
    <div id="r-header">
        <div id="r-contact">
            <span id="r-name">{resume.name}</span>
            <span id="r-title">{resume.title}</span>
        </div>
        <ul id="r-contact-info">
            <li>{resume.link}</li>
            <li>{resume.email}</li>
            <li>{resume.phone}</li>
        </ul>
    </div>
    <div id="r-summary">{resume.summary}</div>
    <hr class="r-h-line"/>
    <div class="r-content">
        <div id="r-education">
            <span class="r-sec-title">Education</span>
            <ul class="r-sec-list">
                {#each resume.educations as education}
                    <li class="r-subsection">
                        <span class="r-sec-position">{education.title}</span>
                        <div class="r-sec-placedate">
                            <span class="r-sec-place">{education.location}</span>
                            <span class="r-sec-date">{education.dates || ""}</span>
                        </div>
                        <ul class="r-sec-desc-list">
                            {#if education.bullets}
                                {#each education.bullets as bullet}
                                    <li class="r-sec-desc-list-item">{bullet}</li>
                                {/each}
                            {/if}
                        </ul>
                    </li>
                {/each}
            </ul>
        </div>
        <div id="r-skills">
            <span class="r-sec-title">Related Skills</span>
            <ul class="r-sec-list">
                {#each resume.skills as skill}
                    <li class="r-subsection">
                        <span class="r-sec-position">{skill.title}</span>
                        <div>{skill.bullets.join(', ')}</div>
                    </li>
                {/each}
            </ul>
        </div>
        <div id="r-projects">
            <span class="r-sec-title">Personal Projects</span>
            <ul class="r-sec-list">
                {#each resume.projects as project}
                    <li class="r-subsection">
                        <span class="r-sec-position">{project.title}</span>
                        <ul class="r-sec-desc-list">
                            {#each project.bullets as bullet}
                                <li class="r-sec-desc-list-item">{bullet}</li>
                            {/each}
                        </ul>
                    </li>
                {/each}
            </ul>
        </div>
        <div id="r-employment">
            <span class="r-sec-title">Employment History</span>
            <ul class="r-sec-list">
                {#each resume.employments.slice(-4).reverse() as employment}
                    <li class="r-subsection">
                        <span class="r-sec-position">{employment.title}</span>
                        <div class="r-sec-placedate">
                            <span class="r-sec-place">{employment.location}</span>
                            <span class="r-sec-date">{employment.dates}</span>
                        </div>
                        <div class="r-sec-overview">{employment.summary}</div>
                        <ul class="r-sec-desc-list">
                            {#each employment.bullets as bullet}
                                <li class="r-sec-desc-list-item">{bullet}</li>
                            {/each}
                        </ul>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
</div>

<Button
    class="print-button"
    style="
        position: fixed;
        bottom: 10px;
        left: 10px;
        height: 4em;
        padding: 10px;
        cursor: pointer;
        color: white;
        background-color: #96CCFF;
        border-radius: 25%;
        box-shadow:0px 0px 4px 4px rgba( 0, 0, 0, 0.2 );
    "
    on:click={() => window.print()}
>
    <Icon
        icon="material-symbols:print-sharp"
        style="
            height: 2.5em;
            width: 2.5em;
        "
    />
</Button>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap');

    .r-page {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        margin: auto;
        height: 11in;
        width: 8.5in;
        padding: .25in;
        background-color: #f2f2f2;
        box-sizing: border-box;
    }

    #r-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
    }

    #r-contact {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    #r-name {
        font: 900 30pt sans-serif;
        font-family: 'Roboto condensed', sans-serif;
    }
    #r-title {
        font: bold 16pt sans-serif;
        font-family: 'Roboto condensed', sans-serif;
    }
    #r-contact-info {
        list-style: none;
        text-align: right;
    }
    #r-summary {
        color: gray;
    }

    .r-h-line {
        border: 2px solid #96ccff;
        border-radius: 5rem;
        margin: 10px 0 15px 0;
    }

    /* content setup */
    #r-education,
    #r-skills,
    #r-projects,
    #r-employment {
        display: flex;
        flex-direction: column;
        background-color: white;
        border-radius: 10px;
    }

    #r-education { 
        grid-area: education; 
    }
    #r-skills { 
        grid-area: skills; 
    }
    #r-projects { 
        grid-area: projects;
    }
    #r-employment { 
        grid-area: employment;
        margin-left: 20px;
        box-sizing: border-box;
    }
    .r-content {
        display: grid;
        grid-template-columns: minmax(2.5in, 1fr) minmax(3in, 2fr);
        grid-row-gap: 20px;
        grid-auto-rows: auto;
        grid-template-areas:
            'skills employment'
            'education employment'
            'projects employment';
    }

    .r-sec-title {
        font: bold 18pt sans-serif;
        padding: 10px 10px 5px 10px;
        background-color: #96ccff;
        color: white;
        border-radius: 10px 10px 0 0;
    }
    .r-sec-position {
        font-weight: bold;
    }
    .r-sec-placedate {
        display: flex;
        justify-content: space-between;
        font: italic 10pt sans-serif;
        padding: 0 0 5px 0;
        color: #357edd;
    }
    .r-sec-date {
        text-align: right;
    }

    /* employment list timeline styles */
    #r-employment .r-sec-list {
        list-style-type: none;
    }
    #r-employment .r-subsection {
        padding: 0 0 20px 30px;
        position: relative;
    }
    #r-employment .r-subsection:after {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        border: 2px solid lightblue;
        border-radius: 50%;
        display: inline-block;
        height: 12px;
        width: 12px;
        text-align: center;
        line-height: 12px;
        background: white;
    }
    #r-employment .r-subsection:before {
        position: absolute;
        left: 7px;
        top: 0;
        content: "";
        height: 100%;
        width: 0;
        border-left: 2px solid lightgray;
    }
    #r-employment .r-subsection:last-of-type:before {
        border: none;
    }
    /* other employment specific styles */
    #r-employment .r-sec-overview {
        padding: 0 0 5px 0;
    }
    #r-employment .r-sec-position {
        font-size: 18px;
    }
    #r-employment .r-sec-placedate {
        font-size: 15px;
    }

    .r-subsection {
        padding-bottom: 10px;
    }

    #r-contact-info,
    .r-sec-list,
    .r-sec-desc-list {
        margin: 0;
    }

    .r-sec-list {
        list-style: none;
        padding: 10px 10px 0px 10px;
    }
    .r-sec-desc-list {
        padding-left: 20px;
    }

    .r-sec-desc-list-item {
        font: 11pt sans-serif;
    }
</style>

<svelte:head>
    <title>{siteConfig.name} | Resume</title>

    <style>
        html {
            line-height: 1.15;
        }
        body {
            margin: 0;
            background-color: gray;
            font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
        }
        @media print {
            .print-button {
                display: none;
            }
            @page {
                margin: 0;
            }
        }
    </style>
</svelte:head>
