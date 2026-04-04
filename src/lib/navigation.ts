export interface FooterLink {
  name: string;
  to: string;
  isSpecial?: boolean;
}

export type NavLink = {
  name: string;
  to?: string;
  isCTA?: boolean; // optional
};

export const NAV_LINKS_PRIMARY: NavLink[] = [
  { name: "Home", to: "/" as const },
  { name: "Services", to: "/services" as const },
  { name: "Blog", to: "/blog" as const },
  { name: "Contact", to: "/contact" as const },
];

export const NAV_LINKS_SECONDARY: NavLink[] = [
  { name: "About", to: "/about" as const },
  { name: "Tech Stack", to: "/tech-stack" as const },
  { name: "FAQ", to: "/faq" as const },
  // { name: "Contact", to: "/contact" as const },
  { name: "Book a Call", isCTA: true },
];

export const SUPPORT_LINKS: FooterLink[] = [
  { name: "Support", to: "/support" },
  { name: "Knowledge Base", to: "/kb" },
];

export const LEGAL_LINKS = [
  { name: "Privacy", to: "/privacy" as const },
  { name: "Terms", to: "/terms" as const },
];
