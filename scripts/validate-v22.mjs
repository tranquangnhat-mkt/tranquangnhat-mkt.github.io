#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pages = [
  "index.html",
  "projects/epicure-website-replatforming.html",
  "projects/b2b-event-marketing-trade-show-activation.html",
  "projects/ecommerce-growth-marketplace-operations.html",
  "projects/smeg-digital-brand-system.html",
  "projects/breville-christmas-challenge.html",
  "projects/saint-lbeau.html",
];
const errors = [];
const htmlByPage = new Map();

for (const relativePage of pages) {
  const absolutePage = path.join(root, relativePage);
  const html = fs.readFileSync(absolutePage, "utf8");
  htmlByPage.set(relativePage, html);
  const attributes = html.matchAll(/\b(?:src|href|poster|srcset)="([^"]+)"/g);
  for (const match of attributes) {
    const reference = match[1].split("#")[0].split("?")[0];
    if (!reference || /^(?:https?:|mailto:|tel:|data:)/.test(reference)) continue;
    const resolved = path.resolve(path.dirname(absolutePage), reference);
    if (!fs.existsSync(resolved)) errors.push(`${relativePage}: missing ${reference}`);
  }
}

for (const relativePage of pages.slice(1)) {
  const html = htmlByPage.get(relativePage);
  const viCount = (html.match(/data-vi=/g) || []).length;
  const enCount = (html.match(/data-en=/g) || []).length;
  if (!viCount || viCount !== enCount) errors.push(`${relativePage}: bilingual attributes ${viCount}/${enCount}`);
  if (!html.includes("id=\"langToggle\"")) errors.push(`${relativePage}: missing language toggle`);
}

const manifest = JSON.parse(fs.readFileSync(path.join(root, "assets/data/v22-assets.json"), "utf8"));
const combinedHtml = [...htmlByPage.values()].join("\n");
const intentionalHtmlReplacements = new Set([
  manifest.epicure["Migration Process.jpg"],
  manifest.epicure["Platform Transition.jpg"],
]);
let referencedAssets = 0;
let replacedAssets = 0;
for (const group of Object.values(manifest)) {
  for (const outputPath of Object.values(group)) {
    if (combinedHtml.includes(outputPath)) referencedAssets += 1;
    else if (intentionalHtmlReplacements.has(outputPath)) replacedAssets += 1;
    else errors.push(`asset not referenced: ${outputPath}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${pages.length} HTML files.`);
console.log(`Referenced ${referencedAssets} image assets; ${replacedAssets} blank reference assets replaced with HTML layouts.`);
