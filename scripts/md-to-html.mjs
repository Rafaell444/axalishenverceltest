import { readFileSync, writeFileSync } from 'fs';
import { marked } from 'marked';
import { resolve } from 'path';

const mdPath = resolve('DEPLOY.md');
const outPath = resolve('DEPLOY.html');

const md = readFileSync(mdPath, 'utf8');
const body = marked.parse(md);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>AWS Production Deployment Guide – Axalishen</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Segoe UI', Arial, sans-serif;
    font-size: 13px;
    line-height: 1.6;
    color: #1a1a1a;
    background: #fff;
    padding: 40px 60px;
    max-width: 960px;
    margin: 0 auto;
  }
  h1 { font-size: 24px; color: #1a3a5c; border-bottom: 3px solid #1a3a5c; padding-bottom: 8px; margin: 28px 0 16px; }
  h2 { font-size: 18px; color: #1a3a5c; border-bottom: 1px solid #cde; padding-bottom: 4px; margin: 24px 0 12px; }
  h3 { font-size: 15px; color: #2c5282; margin: 18px 0 8px; }
  h4 { font-size: 13px; color: #2d3748; margin: 14px 0 6px; }
  p { margin: 0 0 10px; }
  ul, ol { margin: 6px 0 10px 22px; }
  li { margin-bottom: 3px; }
  code {
    background: #f0f4f8;
    border: 1px solid #d0dce8;
    border-radius: 3px;
    padding: 1px 5px;
    font-family: 'Consolas', 'Courier New', monospace;
    font-size: 12px;
    color: #c7254e;
  }
  pre {
    background: #1e2a3a;
    color: #e2e8f0;
    border-radius: 6px;
    padding: 14px 18px;
    overflow-x: auto;
    margin: 10px 0 14px;
    font-size: 11.5px;
    line-height: 1.55;
  }
  pre code {
    background: none;
    border: none;
    padding: 0;
    color: inherit;
    font-size: inherit;
  }
  blockquote {
    border-left: 4px solid #4299e1;
    background: #ebf8ff;
    padding: 8px 14px;
    margin: 10px 0;
    border-radius: 0 4px 4px 0;
    color: #2b6cb0;
  }
  table { width: 100%; border-collapse: collapse; margin: 10px 0 14px; font-size: 12px; }
  th { background: #1a3a5c; color: #fff; padding: 7px 10px; text-align: left; }
  td { padding: 6px 10px; border-bottom: 1px solid #e2e8f0; }
  tr:nth-child(even) td { background: #f7fafc; }
  hr { border: none; border-top: 1px solid #e2e8f0; margin: 20px 0; }
  strong { color: #1a202c; }
  a { color: #2b6cb0; text-decoration: none; }
  @media print {
    body { padding: 20px 30px; }
    pre { white-space: pre-wrap; word-break: break-all; }
    h1, h2 { page-break-after: avoid; }
    pre, blockquote { page-break-inside: avoid; }
  }
</style>
</head>
<body>
${body}
</body>
</html>`;

writeFileSync(outPath, html, 'utf8');
console.log('Written to', outPath);
