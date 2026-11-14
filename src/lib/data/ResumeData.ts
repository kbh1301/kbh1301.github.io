export const resume = {
    name: "Kyle Hulvey",
    title: "Software Engineer",
    link: "kyle-hulvey.dev",
    link2: "linkedin.com/in/kylehulvey",
    email: "kyle.hulvey@gmail.com",
    phone: "(615) 796-0056",
    location: "Nashville, TN",
    summary:
        "Full-stack engineer with 6+ years building data-intensive internal platforms and automation (TypeScript, Next.js, SQL Server, Azure) that replace manual workflows, from schema and pipelines to UI, CI/CD, and production support.",
    visibility: {
        summary: true,
        employments: true,
        educations: true,
        skills: true,
        projects: true,
    },
    employments_archive: [
        {
            title: "IT Department Intern",
            location: "EnableComp",
            dates: "Jan 2019 – May 2019",
            summary: "Assisted the technology team in providing technology automation and support for processing of healthcare claims for hospitals and large physician groups.",
            bullets: [
                "Exposure to cyber security, software development, and help desk teams",
                "Provided hardware setup and technical support via ticketing system",
                "Shadowed in software development of a C# .NET, SQL Server, Angular-based healthcare claims processing system and associated applications",
            ],
        },
        {
            title: "Guidewire Developer",
            location: "Farm Bureau TN",
            dates: "Feb 2020 – Jan 2022",
            summary: "Member of software development team creating and supporting the Guidewire Insurance Suite to enable Farm Bureau's insurance processing needs.",
            bullets: [
                "Software development using Java-based Gosu",
                "Deployed code changes using Git",
                "Unit tested based on business analyst specifications and logged changes in accordance to company standards",
                "Participated in agile SDLC sprints using Rally and SharePoint",
            ],
        },
        {
            title: "Core Application Developer",
            location: "Farm Bureau TN",
            dates: "Feb 2022 – May 2022",
            summary: "Member of core application development team maintaining and improving Farm Bureau's in-house applications.",
            bullets: [
                "Software development for applications utilizing a Java EE, Maven, Spring Framework based tech stack",
                "Resolved tickets through various means including MySQL database and API call management",
                "Prevented future tickets by improving quality of code and user validation",
            ],
        },
        {
            title: "Guidewire Developer & Core Application Developer",
            location: "Farm Bureau TN",
            dates: "Feb 2020 – May 2022",
            summary: "Member of software development team supporting the Guidewire Insurance Suite to enable Farm Bureau's insurance processing needs. Pivoted to core application development for in-house applications.",
            bullets: [
                "Software development using Java-based Gosu for Guidewire",
                "Software development for applications utilizing a Java EE, Maven, Spring Framework based tech stack",
                "Resolved tickets through various means including MySQL database and API call management",
                "Prevented future tickets by improving quality of code and user validation",
            ],
        },
        {
            title: "Software QA Engineer",
            location: "EnableComp",
            dates: "May 2022 – Aug 2023",
            summary: "Established frontend automation testing suite for existing in-house software.",
            bullets: [
                "Stood up automation suite using Playwright framework",
                "Integrated tests into CI/CD pipeline through GitHub Actions Runner",
                "Designed and developed automated regression tests",
            ],
        },
        {
            title: "Software Developer",
            location: "EnableComp",
            dates: "Aug 2023 – Sep 2024",
            summary: "Member of web development team maintaining and improving EnableComp's in-house applications to support processing of healthcare claims.",
            bullets: [
                "Software development for multiple applications utilizing React, AngularJS, .NET, SQL Server",
                "Participated in agile scrum sprints using Jira and GitHub",
                "Maintained automated regression test suite",
            ],
        },
    ],
    employments: [
        {
            title: "Guidewire Developer & Core Application Developer",
            location: "Farm Bureau TN",
            dates: "Feb 2020 – May 2022",
            summary: "",
            bullets: [
                "Developed insurance-processing features in Guidewire (Gosu) and in-house Java EE/Spring/MySQL apps.",
                "Reduced repeat support tickets by improving code quality and user-input validation.",
            ],
        },
        {
            title: "Software QA Engineer & Software Developer",
            location: "EnableComp",
            dates: "May 2022 – Sep 2024",
            summary: "",
            bullets: [
                "Stood up a Playwright/TypeScript regression suite for in-house claims applications, run in GitHub Actions CI/CD.",
                "Developed features across internal claims applications (React, AngularJS, .NET, SQL Server) in agile sprints.",
            ],
        },
        {
            title: "Software Developer II",
            location: "Archimedes Rx",
            dates: "Sep 2024 – Present",
            summary: "",
            bullets: [
                "Designed, built, and own **Fulcrum**, a full-stack TypeScript/Next.js/SQL Server platform on Azure used by four internal teams. Established Azure DevOps CI/CD, Entra ID RBAC, and shared UI standards that other engineers use to ship modules; review their code.",
                "Built the company's first automated claims QA system ahead of a major client onboarding wave: a nightly rules engine across SQL Server and Oracle that auto-clears **84%** of flagged claims, equivalent to roughly **1,100 manual reviews per workweek**.",
                "Built self-service modules that let Operations configure file feeds, generate client CSV reports on demand, and schedule client terminations **without routine IT tickets**.",
                "Built a bulk file-generation module with job tracking and PGP-encrypted SFTP delivery to the claims processor using Azure Functions and Blob Storage.",
                "Replaced legacy file monitoring with a SQL-backed overdue-transfer dashboard; built the configuration module a teammate used to migrate settings off legacy SSIS and Python jobs.",
                "Supported client data integrations (Azure Data Factory, SSIS, SQL Server, Python); served as **sole developer for a month** of peak-season implementations and support, three months after joining.",
            ],
        },
    ],
    skills: [
        {
            title: "Languages",
            bullets: ["TypeScript/JavaScript", "SQL", "Python", "C#", "Rust"],
        },
        {
            title: "Application Development",
            bullets: ["Next.js", "React", "SvelteKit", "Node.js", ".NET", "REST APIs", "OAuth", "Prisma", "Tailwind CSS"],
        },
        {
            title: "Data & Integration",
            bullets: ["SQL Server", "Oracle", "PostgreSQL", "Azure Data Factory", "SSIS", "ETL", "SFTP"],
        },
        {
            title: "Cloud, DevOps & Testing",
            bullets: ["Azure Functions", "Azure DevOps", "GitHub Actions", "Playwright", "Vercel"],
        },
        {
            title: "AI-Assisted Development",
            bullets: ["Claude", "GitHub Copilot", "Spec-driven agentic workflows"],
        },
    ],
    projects: [
        {
            title: "WithList (Next.js, TypeScript, Prisma, PostgreSQL)",
            bullets: [
                "Collaborative app for tracking, rating, and sharing experiences across personal and group lists, with tokenized invite links, optimistic UI updates, an activity feed, and unit, integration, and Playwright E2E tests.",
            ],
        },
        {
            title: "Markdown Editor (Tauri, Rust, SvelteKit)",
            bullets: [
                "Scroll-synced live preview, custom CodeMirror extensions, and a GitHub Actions release and update pipeline.",
            ],
        },
        {
            title: "Google Calendar Automation (Apps Script)",
            bullets: [
                "Automates 110+ yearly Calendar events from Sheets for a 100+ member organization, with conflict detection.",
            ],
        },
    ],
    educations: [
        {
            title: "AAS in Computer Information Technology, Programming Concentration",
            location: "Columbia State Community College",
            dates: "",
            bullets: [],
        },
    ],
};