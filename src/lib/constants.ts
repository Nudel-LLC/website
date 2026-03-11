// TODO: プロジェクトに合わせて変更してください

export const NAV_ITEMS = [
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
] as const;

export const COMPANY_INFO = [
  { label: "Company Name", value: "Your Company" },
  { label: "Location", value: "TOKYO, JP" },
  { label: "Slogan", value: "ここにスローガンを\n入力してください" },
] as const;

export const SOCIAL_LINKS = [
  { name: "Twitter (X)", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "LinkedIn", href: "#" },
] as const;

export const SITE_CONFIG = {
  name: "My App",
  description: "サイトの説明文をここに入力してください。",
  url: "https://example.com",
  email: "info@example.com",
} as const;
