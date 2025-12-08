import { chromium } from 'playwright';
import fs from 'fs';

const URL = "http://localhost:5173/resume_preview";
const OUTPUT = "static/generated-pdf/khulvey_resume.pdf";

fs.mkdirSync('static/generated-pdf', { recursive: true });

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto(URL, { waitUntil: 'networkidle' });

    const pdf = await page.pdf({
        format: 'Letter',
        printBackground: true,
        margin: {
            top: "0",
            bottom: "0",
            left: "0",
            right: "0"
        }
    })

    fs.writeFileSync(OUTPUT, pdf);
    await browser.close();

    console.log(`PDF generated at ${OUTPUT}`);
})();