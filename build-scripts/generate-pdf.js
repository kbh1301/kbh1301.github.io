import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import http from 'http';

const OUTPUT = "static/generated-pdf/khulvey_resume.pdf";
fs.mkdirSync('static/generated-pdf', { recursive: true });

const MIME = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.ttf': 'font/ttf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.json': 'application/json',
    '.pdf': 'application/pdf',
};

function serveStatic(root) {
    return new Promise((resolve) => {
        const server = http.createServer((req, res) => {
            const safePath = path.normalize(decodeURIComponent(req.url)).replace(/^\.\.\//, '');
            let filePath = path.join(root, safePath);
            if (filePath.endsWith(path.sep)) filePath += 'index.html';

            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.end('Not found');
                    return;
                }
                const ext = path.extname(filePath);
                res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
                res.end(data);
            });
        });
        server.listen(0, '127.0.0.1', () => resolve(server));
    });
}

function validatePdf(pdf) {
    const source = pdf.toString('latin1');
    const pageCount = (source.match(/\/Type\s*\/Page\b/g) || []).length;
    const fontNames = [...source.matchAll(/\/FontName \/([^\s]+)/g)].map((match) => match[1]);

    if (pageCount !== 1) {
        throw new Error(`Expected a one-page PDF, found ${pageCount} pages`);
    }
    if (!fontNames.some((fontName) => fontName.includes('LiberationSans'))) {
        throw new Error(`Expected bundled LiberationSans fonts, found: ${fontNames.join(', ')}`);
    }
    if (!source.includes('/ToUnicode')) {
        throw new Error('Generated PDF has no ToUnicode maps for text extraction');
    }
}

(async () => {
    const buildDir = path.resolve('build');
    const server = await serveStatic(buildDir);
    const port = server.address().port;

    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto(`http://127.0.0.1:${port}/resume_preview.html`, { waitUntil: 'networkidle' });
    await page.emulateMedia({ media: 'print' });
    const fontState = await page.evaluate(async () => {
        const faces = [
            '400 10pt "ResumeSans"',
            '700 10pt "ResumeSans"',
            'italic 400 10pt "ResumeSans"',
            'italic 700 10pt "ResumeSans"',
        ];
        await Promise.all(faces.map((face) => document.fonts.load(face, 'Aa')));
        await document.fonts.ready;
        return {
            checks: faces.map((face) => document.fonts.check(face, 'Aa')),
            statuses: [...document.fonts]
                .filter((font) => font.family === 'ResumeSans')
                .map((font) => font.status),
        };
    });
    if (fontState.checks.some((loaded) => !loaded) || fontState.statuses.some((status) => status !== 'loaded')) {
        throw new Error(`ResumeSans did not load before PDF generation: ${JSON.stringify(fontState)}`);
    }

    const pdf = await page.pdf({
        format: 'Letter',
        printBackground: true,
        margin: {
            top: "0",
            bottom: "0",
            left: "0",
            right: "0"
        }
    });

    validatePdf(pdf);
    fs.writeFileSync(OUTPUT, pdf);
    await browser.close();
    server.close();

    console.log(`PDF generated at ${OUTPUT}`);
})();
