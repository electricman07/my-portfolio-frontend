export interface FooterLink {
  name: string;
  to: string;
  isSpecial?: boolean;
}

export type NavLink = {
  name: string;
  to: string;
  isCTA?: boolean; // optional
};

export const NAV_LINKS_PRIMARY: NavLink[] = [
  { name: "Home", to: "/" },
  { name: "Services", to: "/services" },
  { name: "Blog", to: "/blog" },
  { name: "Contact", to: "/contact" },
];

export const NAV_LINKS_SECONDARY: NavLink[] = [
  { name: "About", to: "/about" },
  { name: "Tech Stack", to: "/tech-stack" },
  { name: "FAQ", to: "/faq" },
  // { name: "Contact", to: "/contact" as const },
  { name: "Book a Call", to: "/get-started", isCTA: true },
];

export const SUPPORT_LINKS: NavLink[] = [
  { name: "Support", to: "/support" },
  { name: "Knowledge Base", to: "/kb" },
];

export const LEGAL_LINKS: NavLink[] = [
  { name: "Privacy", to: "/privacy" },
  { name: "Terms", to: "/terms" },
];
