#!/usr/bin/env node
/**
 * Renders security-report/npm-audit.json into a single-file HTML report
 * at security-report/index.html for easy browsing as a CI artifact.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const DIR = resolve(process.cwd(), "security-report");
const jsonPath = resolve(DIR, "npm-audit.json");
const supabasePath = resolve(DIR, "supabase-lint.json");
const outPath = resolve(DIR, "index.html");

const escapeHtml = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

let audit = null;
if (existsSync(jsonPath)) {
  try {
    audit = JSON.parse(readFileSync(jsonPath, "utf8"));
  } catch (err) {
    console.error("Failed to parse npm-audit.json:", err.message);
  }
}

const meta = audit?.metadata ?? {};
const vulns = meta?.vulnerabilities ?? {};
const totals = {
  info: vulns.info ?? 0,
  low: vulns.low ?? 0,
  moderate: vulns.moderate ?? 0,
  high: vulns.high ?? 0,
  critical: vulns.critical ?? 0,
  total: vulns.total ?? 0,
};

const advisoryRows = Object.entries(audit?.vulnerabilities ?? {})
  .sort(
    ([, a], [, b]) =>
      severityRank(b.severity) - severityRank(a.severity) ||
      String(a.name).localeCompare(String(b.name))
  )
  .map(([name, v]) => {
    const via = (v.via ?? [])
      .map((entry) =>
        typeof entry === "string"
          ? escapeHtml(entry)
          : `<a href="${escapeHtml(entry.url ?? "#")}" target="_blank" rel="noopener">${escapeHtml(
              entry.title ?? entry.name ?? "advisory"
            )}</a>`
      )
      .join(", ");
    return `
      <tr class="sev-${escapeHtml(v.severity)}">
        <td><code>${escapeHtml(name)}</code></td>
        <td><span class="badge sev-${escapeHtml(v.severity)}">${escapeHtml(
      v.severity
    )}</span></td>
        <td>${escapeHtml(v.range ?? "")}</td>
        <td>${via || "—"}</td>
        <td>${v.fixAvailable ? "✅" : "—"}</td>
      </tr>
    `;
  })
  .join("\n");

function severityRank(s) {
  return { critical: 5, error: 5, high: 4, moderate: 3, warning: 3, warn: 3, low: 2, info: 1 }[s] ?? 0;
}

// Supabase linter findings
let supabase = null;
if (existsSync(supabasePath)) {
  try {
    supabase = JSON.parse(readFileSync(supabasePath, "utf8"));
  } catch (err) {
    console.error("Failed to parse supabase-lint.json:", err.message);
  }
}

const supabaseSkipped = !!supabase?.skipped;
const supabaseFindings = Array.isArray(supabase) ? supabase : Array.isArray(supabase?.findings) ? supabase.findings : [];
const supabaseTotals = supabaseFindings.reduce(
  (acc, f) => {
    const lvl = String(f.level ?? f.severity ?? "info").toLowerCase();
    acc[lvl] = (acc[lvl] ?? 0) + 1;
    acc.total += 1;
    return acc;
  },
  { total: 0 }
);

const supabaseRows = supabaseFindings
  .slice()
  .sort((a, b) => severityRank(b.level ?? b.severity) - severityRank(a.level ?? a.severity))
  .map((f) => {
    const lvl = String(f.level ?? f.severity ?? "info").toLowerCase();
    const link = f.remediation || f.cache_key
      ? `<a href="${escapeHtml(f.remediation ?? "#")}" target="_blank" rel="noopener">docs</a>`
      : "—";
    return `
      <tr class="sev-${escapeHtml(lvl)}">
        <td><span class="badge sev-${escapeHtml(lvl)}">${escapeHtml(lvl)}</span></td>
        <td><code>${escapeHtml(f.name ?? f.title ?? "")}</code></td>
        <td>${escapeHtml(f.description ?? f.detail ?? "")}</td>
        <td>${escapeHtml(f.facing ?? f.categories?.join(", ") ?? "")}</td>
        <td>${link}</td>
      </tr>
    `;
  })
  .join("\n");

const supabaseSection = supabaseSkipped
  ? `<div class="empty">Supabase scan skipped — set <code>SUPABASE_ACCESS_TOKEN</code> and <code>SUPABASE_PROJECT_REF</code> repo secrets to enable.</div>`
  : supabaseRows
    ? `<table>
        <thead>
          <tr><th>Level</th><th>Name</th><th>Description</th><th>Categories</th><th>Docs</th></tr>
        </thead>
        <tbody>${supabaseRows}</tbody>
      </table>`
    : `<div class="empty">No Supabase linter findings. 🎉</div>`;

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Pantheon — Security Report</title>
  <style>
    :root { color-scheme: dark; }
    body {
      font: 14px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif;
      background: #05030D; color: #E5E7EB; margin: 0; padding: 32px;
    }
    h1 { font-family: "Cinzel", serif; color: #D6B35A; margin: 0 0 4px; }
    .sub { color: #9CA3AF; margin-bottom: 24px; }
    .grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 12px; margin-bottom: 24px;
    }
    .card {
      background: #1A1038; border: 1px solid rgba(124,58,237,0.3);
      border-radius: 10px; padding: 16px; text-align: center;
    }
    .card .n { font-size: 28px; font-weight: 700; }
    .card .l { color: #9CA3AF; text-transform: uppercase; font-size: 11px; letter-spacing: .08em; }
    table { width: 100%; border-collapse: collapse; background: #0F0A23; border-radius: 10px; overflow: hidden; }
    th, td { padding: 10px 12px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.05); vertical-align: top; }
    th { background: #1A1038; color: #D6B35A; font-weight: 600; }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 11px; font-weight: 600; text-transform: uppercase; }
    .sev-critical { background: rgba(220,38,38,0.2); color: #FCA5A5; }
    .sev-high     { background: rgba(234,88,12,0.2);  color: #FDBA74; }
    .sev-moderate { background: rgba(217,119,6,0.2);  color: #FCD34D; }
    .sev-low      { background: rgba(34,211,238,0.15); color: #67E8F9; }
    .sev-info     { background: rgba(124,58,237,0.2); color: #C4B5FD; }
    code { color: #E5F8FF; }
    .empty { text-align: center; padding: 40px; color: #9CA3AF; }
    footer { margin-top: 32px; color: #6B7280; font-size: 12px; }
  </style>
</head>
<body>
  <h1>Pantheon — Security Report</h1>
  <div class="sub">Generated ${escapeHtml(new Date().toISOString())}</div>

  <h2 style="color:#D6B35A;font-family:Cinzel,serif;margin-top:8px;">npm audit</h2>
  <div class="grid">
    <div class="card"><div class="n">${totals.total}</div><div class="l">Total</div></div>
    <div class="card"><div class="n sev-critical">${totals.critical}</div><div class="l">Critical</div></div>
    <div class="card"><div class="n sev-high">${totals.high}</div><div class="l">High</div></div>
    <div class="card"><div class="n sev-moderate">${totals.moderate}</div><div class="l">Moderate</div></div>
    <div class="card"><div class="n sev-low">${totals.low}</div><div class="l">Low</div></div>
    <div class="card"><div class="n sev-info">${totals.info}</div><div class="l">Info</div></div>
  </div>

  ${
    advisoryRows
      ? `<table>
          <thead>
            <tr><th>Package</th><th>Severity</th><th>Range</th><th>Advisories</th><th>Fix?</th></tr>
          </thead>
          <tbody>${advisoryRows}</tbody>
        </table>`
      : `<div class="empty">No vulnerabilities detected. 🎉</div>`
  }

  <h2 style="color:#D6B35A;font-family:Cinzel,serif;margin-top:32px;">Supabase linter</h2>
  <div class="grid">
    <div class="card"><div class="n">${supabaseTotals.total}</div><div class="l">Total</div></div>
    <div class="card"><div class="n sev-critical">${supabaseTotals.error ?? 0}</div><div class="l">Error</div></div>
    <div class="card"><div class="n sev-moderate">${(supabaseTotals.warning ?? 0) + (supabaseTotals.warn ?? 0)}</div><div class="l">Warning</div></div>
    <div class="card"><div class="n sev-info">${supabaseTotals.info ?? 0}</div><div class="l">Info</div></div>
  </div>

  ${supabaseSection}

  <footer>
    Raw data: <code>npm-audit.json</code>, <code>supabase-lint.json</code><br/>
    Plaintext: <code>npm-audit.txt</code>, <code>supabase-lint.txt</code><br/>
    For deeper backend findings (RLS, public buckets, etc.), also run the Lovable Security scan from the Security panel.
  </footer>
</body>
</html>
`;

writeFileSync(outPath, html);
console.log(`Wrote ${outPath}`);
