import { Link } from "@tanstack/react-router";
import type { NavLink } from "../../lib/navigation";

export function NavLinkItem({
  link,
  onClick,
}: {
  link: NavLink;
  onClick?: () => void;
}) {
  const base =
    "text-[11px] font-black uppercase tracking-widest hover:text-blue-500 transition-colors";

  const cta =
    "px-5 py-2 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg active:scale-95";

  return (
    <Link to={link.to} onClick={onClick} className={link.isCTA ? cta : base}>
      {link.name}
    </Link>
  );
}
