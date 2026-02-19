export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const BRAND_COLOR = "#f97316";

function baseLayout(content: string): string {
  return `<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
        <tr><td style="background:${BRAND_COLOR};padding:24px 32px;">
          <span style="color:#ffffff;font-size:20px;font-weight:bold;">Nudel</span>
        </td></tr>
        <tr><td style="padding:32px;">
          ${content}
        </td></tr>
        <tr><td style="padding:16px 32px;background:#f9fafb;color:#6b7280;font-size:12px;text-align:center;">
          &copy; Nudel合同会社
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function buildAdminNotificationEmail(data: ContactFormData) {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const message = escapeHtml(data.message).replace(/\n/g, "<br>");

  const html = baseLayout(`
    <h2 style="margin:0 0 16px;color:#111827;font-size:18px;">新しいお問い合わせ</h2>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        <td style="padding:8px 0;color:#6b7280;width:100px;vertical-align:top;">お名前</td>
        <td style="padding:8px 0;color:#111827;">${name}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;color:#6b7280;vertical-align:top;">メール</td>
        <td style="padding:8px 0;color:#111827;">${email}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;color:#6b7280;vertical-align:top;">メッセージ</td>
        <td style="padding:8px 0;color:#111827;">${message}</td>
      </tr>
    </table>
    <p style="color:#6b7280;font-size:13px;margin:0;">このメールに返信すると、お客様（${email}）に直接返信されます。</p>
  `);

  return {
    subject: `[Nudel] お問い合わせ: ${data.name} 様`,
    html,
  };
}

export function buildAutoReplyEmail(data: ContactFormData) {
  const name = escapeHtml(data.name);
  const message = escapeHtml(data.message).replace(/\n/g, "<br>");

  const html = baseLayout(`
    <p style="margin:0 0 16px;color:#111827;">${name} 様</p>
    <p style="margin:0 0 16px;color:#111827;">
      この度はお問い合わせいただき、誠にありがとうございます。<br>
      以下の内容で承りました。担当者より改めてご連絡いたします。
    </p>
    <div style="background:#f9fafb;border-radius:4px;padding:16px;margin-bottom:24px;">
      <p style="margin:0 0 8px;color:#6b7280;font-size:13px;">お問い合わせ内容</p>
      <p style="margin:0;color:#111827;">${message}</p>
    </div>
    <p style="color:#6b7280;font-size:13px;margin:0;">
      ※ このメールは自動送信です。本メールへの返信はお控えください。
    </p>
  `);

  return {
    subject: "[Nudel] お問い合わせありがとうございます",
    html,
  };
}
