export interface FooterLink {
  name: string;
  to: string;
  isSpecial?: boolean;
}

export const NAV_LINKS = [
  { name: "Home", to: "/" as const },
  { name: "About", to: "/about" as const },
  { name: "Services", to: "/services" as const },
  { name: "Tech Stack", to: "/tech-stack" as const },
  { name: "Portfolio", to: "/portfolio" as const },
  { name: "Blog", to: "/blog" as const },
  { name: "FAQ", to: "/faq" as const },
  // { name: "Contact", to: "/contact" as const },
  { name: "Book a Call", to: "/contact" as const, isCTA: true },
];

export const SUPPORT_LINKS: FooterLink[] = [
  { name: "Support", to: "/support" },
  { name: "Knowledge Base", to: "/kb" },
];

export const LEGAL_LINKS = [
  { name: "Privacy", to: "/privacy" as const },
  { name: "Terms", to: "/terms" as const },
];
