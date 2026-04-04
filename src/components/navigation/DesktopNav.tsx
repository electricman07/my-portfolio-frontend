import { NavLinkItem } from "./NavLinkItem";
import { NAV_LINKS_PRIMARY } from "../../lib/navigation";

export function DesktopNav() {
  return (
    <div className="hidden md:flex items-center flex-1 justify-center gap-6">
      {NAV_LINKS_PRIMARY.map((link) => (
        <NavLinkItem key={link.to} link={link} />
      ))}
    </div>
  );
}
