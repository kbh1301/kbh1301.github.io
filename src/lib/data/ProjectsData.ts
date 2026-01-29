/**
 * Icons library:
 *      https://icon-sets.iconify.design/
 */

import { siteConfig } from "$lib/config/site";
import mdeditor1 from '$lib/assets/mdeditor1.jpg';
import mdeditor2 from '$lib/assets/mdeditor2.jpg';
import mdeditor3 from '$lib/assets/mdeditor3.jpg';
import bbcalc1 from '$lib/assets/bbcalc1.jpg';
import bbcalc2 from '$lib/assets/bbcalc2.jpg';
import gcalautomation1 from "$lib/assets/gcalautomation1.jpg";
import gcalautomation2 from "$lib/assets/gcalautomation2.jpg";

export const projects = [
    {
        title: "Markdown Editor",
        icon: "fa6-brands:markdown",
        image_main: mdeditor1,
        images: [mdeditor2, mdeditor3],
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
        repo: siteConfig.links.repo1
    },
    {
        title: "Google Calendar Automation",
        icon: "ph:calendar-dots-fill",
        image_main: gcalautomation1,
        images: [gcalautomation2],
        overview: "Google Apps Script system that generates Google Calendar events from Google Sheets, streamlining schedule creation for a 100+ member local board game organization.",
        features: [
            "Automated event generation in Google Calendar from Google Sheets data",
            "Streamlined, user-friendly schedule customization via Google Sheets tabs for event locations, hosts, descriptions, etc.",
            "User-friendly month/year selection interface",
            "Conflict detection for overlapping events",
            "Google Calendar API integration for seamless Calendar updates and sharing",
        ],
        skills: [
            "Google Apps Script (JavaScript)",
            "Google Calendar API",
            "Google Sheets",
        ],
    },
    {
        title: "Barbell Calculator",
        icon: "tabler:barbell-filled",
        image_main: bbcalc1,
        images: [bbcalc2],
        overview: "Based on user input, this application will calculate and display the olympic plates needed for each side of a specific barbell weight setup.",
        features: [
            "Plate visualization",
            "'Per side' plate details",
            "Toggle button for pounds or kilograms",
            "Rounds user input down to the nearest available plate size",
            "Input validation features",
        ],
        skills: [
            "HTML",
            "CSS",
            "JavaScript",
        ],
        repo: siteConfig.links.repo2
    }
];