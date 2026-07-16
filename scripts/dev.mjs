#!/usr/bin/env node
/**
 * Wrapper around `vite dev --host` that augments the startup output with an mDNS URL
 * so the local network address (e.g. http://kbh-server.home:5173) is shown
 * alongside the raw IP addresses that Vite prints by default.
 *
 * Before starting, it kills any process already listening on the target port
 * to avoid EADDRINUSE errors.
 *
 * Everything else is streamed through byte-for-byte with no transformation.
 */

import { spawn, execSync } from "child_process";
import { createInterface } from "readline";
import { fileURLToPath } from "url";
import path from "path";
import os from "os";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const hostname = os.hostname().toLowerCase(); // e.g. "kbh-server"
const port = process.env.PORT ?? "5173";
const mdnsSuffix = process.env.MDNS_SUFFIX ?? "home";
const mdnsUrl = `http://${hostname}.${mdnsSuffix}:${port}`;
const mdnsLine = `  \u279c  mDNS:       ${mdnsUrl}`;

// Kill any process already listening on the target port.
try {
    const pids = execSync(`fuser ${port}/tcp 2>/dev/null`, {
        encoding: "utf-8",
        stdio: ["ignore", "pipe", "pipe"],
    }).trim();
    if (pids) {
        console.log(`Port ${port} is in use \u2014 killing it...`);
        execSync(`fuser -k ${port}/tcp 2>/dev/null`, { stdio: "ignore" });
        execSync("sleep 0.5", { stdio: "ignore" });
        console.log(`Freed port ${port}.`);
    }
} catch {
    // fuser exits non-zero when nothing is listening — that's expected, ignore.
}

const viteBin = path.join(projectRoot, "node_modules", ".bin", "vite");
const child = spawn(viteBin, ["dev", "--host", ...process.argv.slice(2)], {
    stdio: ["inherit", "pipe", "pipe"],
    env: { ...process.env },
    cwd: projectRoot,
    shell: true,
});

/** Process one stream, line-by-line, writing to the given output stream */
function forwardStream(readable, writable, insertMdns) {
    let mdnsInjected = false;
    const rl = createInterface({ input: readable, crlfDelay: Infinity });
    rl.on("line", (line) => {
        writable.write(line + "\n");
        // After the first "➜  Network:" line in the Vite startup banner, print the mDNS URL.
        if (insertMdns && !mdnsInjected && line.includes("\u279c  Network:")) {
            mdnsInjected = true;
            writable.write(mdnsLine + "\n");
        }
    });
    rl.on("close", () => {});
}

forwardStream(child.stdout, process.stdout, true);
forwardStream(child.stderr, process.stderr, false);

child.on("exit", (code, signal) => {
    if (signal) process.kill(process.pid, signal);
    else process.exit(code ?? 0);
});
