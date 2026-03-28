import { Outlet, useNavigate } from "@tanstack/react-router";
import { Search as SearchIcon } from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { LoadingBar } from "../ui/LoadingBar";

export function RootLayout({ children }: { children?: React.ReactNode }) {
  const navigate = useNavigate();

  const handleSearch = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const query = formData.get("q") as string;

    if (query?.trim()) {
      const trimmedQuery = query.trim();
      const existing = JSON.parse(
        localStorage.getItem("recentSearches") || "[]",
      );
      const updated = [
        trimmedQuery,
        ...existing.filter((s: any) => s !== trimmedQuery),
      ].slice(0, 5);
      localStorage.setItem("recentSearches", JSON.stringify(updated));

      navigate({ to: "/search", search: { q: trimmedQuery } });
      e.currentTarget.reset();
    }
  };

  return (
    <>
      <LoadingBar />
      <Navbar />
      <div className="max-w-3xl mx-auto w-full px-4 py-8">
        <form onSubmit={handleSearch} className="relative group">
          <SearchIcon
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500"
            size={20}
          />
          <input
            name="q"
            type="text"
            placeholder="Search projects..."
            className="w-full pl-12 pr-4 py-4 rounded-4xl bg-[#F8FAFC] border-2 border-slate-300 text-slate-900 dark:bg-slate-900 dark:border-slate-600 dark:text-white dark:placeholder-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm font-medium text-sm"
          />
        </form>
      </div>
      <main className="min-h-[70vh] grow">{children || <Outlet />}</main>
      <Footer />
    </>
  );
}
