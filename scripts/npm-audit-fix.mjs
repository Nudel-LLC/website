/**
 * npm audit 脆弱性の自動修正スクリプト。
 *
 * CLAUDE.md の対応手順に従い:
 * 1. npm audit fix で直接依存を更新
 * 2. 残った脆弱性に対して overrides を追加
 */
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

function run(cmd) {
  try {
    return execSync(cmd, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] });
  } catch (e) {
    return e.stdout || "";
  }
}

function getAuditJson() {
  const output = run("npm audit --json 2>&1");
  try {
    return JSON.parse(output);
  } catch {
    return { vulnerabilities: {} };
  }
}

function getHighVulns(audit) {
  const vulns = audit.vulnerabilities || {};
  return Object.entries(vulns).filter(
    ([, info]) => info.severity === "high" || info.severity === "critical",
  );
}

// 1. npm audit fix を実行
console.log("=== npm audit fix を実行 ===");
run("npm audit fix 2>&1");

// 2. 残った脆弱性を確認
console.log("=== 残存脆弱性を確認 ===");
let audit = getAuditJson();
let remaining = getHighVulns(audit);

if (remaining.length === 0) {
  console.log("npm audit fix で全て解消されました。");
  process.exit(0);
}

console.log(`残存 high/critical 脆弱性: ${remaining.length} 件`);

// 3. overrides で解決を試みる
const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const overrides = pkg.overrides || {};
let updated = false;

for (const [name, info] of remaining) {
  // 直接依存の場合は overrides 不要（npm audit fix で対応済みのはず）
  if (info.isDirect) continue;

  // fixAvailable がある場合、その修正バージョンを overrides に設定
  if (info.fixAvailable && typeof info.fixAvailable === "object") {
    // fixAvailable はトップレベルの依存を指すので、脆弱なパッケージ自体の
    // 最新バージョンを取得して overrides に設定する
    const latest = run(`npm view ${name} version 2>/dev/null`).trim();
    if (latest && overrides[name] !== latest) {
      console.log(`overrides に追加: ${name} → ${latest}`);
      overrides[name] = latest;
      updated = true;
    }
  } else if (!info.fixAvailable) {
    // 修正が利用不可の場合は最新バージョンを試す
    const latest = run(`npm view ${name} version 2>/dev/null`).trim();
    if (latest && overrides[name] !== latest) {
      console.log(`overrides に追加 (最新版を試行): ${name} → ${latest}`);
      overrides[name] = latest;
      updated = true;
    }
  }
}

if (updated) {
  pkg.overrides = overrides;
  writeFileSync("package.json", `${JSON.stringify(pkg, null, 2)}\n`);
  console.log("=== npm install (overrides 反映) ===");
  run("npm install 2>&1");
}

// 4. 最終確認
audit = getAuditJson();
remaining = getHighVulns(audit);
if (remaining.length === 0) {
  console.log("全ての high/critical 脆弱性が解消されました。");
} else {
  console.log(`残存 high/critical 脆弱性: ${remaining.length} 件 (手動確認が必要)`);
  for (const [name, info] of remaining) {
    console.log(`  - ${name} (${info.severity})`);
  }
}
