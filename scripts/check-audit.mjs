/**
 * npm audit の結果を .audit-excludes.json の除外設定と照合し、
 * 未知の high/critical 脆弱性がなければ成功とするスクリプト。
 */
import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";

const CONFIG_PATH = ".audit-excludes.json";

// 設定ファイル読み込み
let config;
try {
  config = JSON.parse(readFileSync(CONFIG_PATH, "utf8"));
} catch {
  console.error(`::error::${CONFIG_PATH} が見つかりません。`);
  process.exit(1);
}

// 期限チェック
const today = new Date().toISOString().slice(0, 10);
if (today > config.expiry) {
  console.error(
    `::error::${CONFIG_PATH} の除外設定が期限切れです (${config.expiry})。除外を見直してください。`,
  );
  process.exit(1);
}

// npm audit --json を実行
let auditResult;
try {
  const output = execSync("npm audit --json 2>&1", { encoding: "utf8" });
  auditResult = JSON.parse(output);
} catch (e) {
  // npm audit は脆弱性があると exit code 1 で終了するため catch する
  auditResult = JSON.parse(e.stdout || "{}");
}

// 既知の除外セット
const known = new Set(config.exclusions);

// 未知の high/critical 脆弱性を検出
const unknown = [];
const vulns = auditResult.vulnerabilities || {};
for (const [name, info] of Object.entries(vulns)) {
  if (info.severity !== "high" && info.severity !== "critical") continue;
  for (const v of info.via || []) {
    if (typeof v === "object" && v.url) {
      const ghsa = v.url.split("/").pop();
      if (!known.has(ghsa)) {
        unknown.push(`${v.name || name}: ${v.url}`);
      }
    }
  }
}

if (unknown.length > 0) {
  console.error("::error::未知の high/critical 脆弱性が見つかりました:");
  for (const u of unknown) {
    console.error(`  - ${u}`);
  }
  process.exit(1);
}

console.log(
  `All high vulnerabilities are known exclusions (expires: ${config.expiry}).`,
);
