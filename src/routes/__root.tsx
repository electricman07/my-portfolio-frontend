import {
  HeadContent,
  Scripts,
  useNavigate,
  createRootRouteWithContext,
  Link,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { Search as SearchIcon } from "lucide-react";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { z } from "zod";
import React from "react";

import appCss from "../styles.css?url";

const queryClient = new QueryClient();

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

export interface MyRouterContext {
  queryClient: QueryClient;
}

const globalSearchSchema = z.object({
  q: z.string().optional().catch(""),
});

export const Route = createRootRouteWithContext<any>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title: "Glen | Full-Stack Web Developer & Designer",
      },
      {
        name: "description",
        content:
          "Professional portfolio of Glen, a Full-Stack Developer specializing in React, Node.js, and Strapi 5. Building modern, high-performance digital experiences.",
      },
      // Open Graph / Facebook
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Glen | Web Developer Portfolio" },
      {
        property: "og:description",
        content:
          "Explore my latest projects, technical insights, and professional services.",
      },
      { property: "og:image", content: "https://yourdomain.com" }, // Replace with a real URL later
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Glen | Web Developer" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  validateSearch: (search) => globalSearchSchema.parse(search),
  shellComponent: RootDocument,
  notFoundComponent: () => {
    return (
      <div className="py-20 text-center space-y-4">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-slate-500">
          The page you are looking for doesn't exist.
        </p>
        <Link to="/" className="text-blue-500 underline">
          Go Home
        </Link>
      </div>
    );
  },
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  // Handle global search submission
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const query = formData.get("q") as string;

    if (query.trim()) {
      const trimmedQuery = query.trim();

      // --- SAVE TO RECENT SEARCHES ---
      const existing = JSON.parse(
        localStorage.getItem("recentSearches") || "[]",
      );
      // Add new query, remove duplicates, and limit to top 5
      const updated = [
        trimmedQuery,
        ...existing.filter((s: string) => s !== trimmedQuery),
      ].slice(0, 5);
      localStorage.setItem("recentSearches", JSON.stringify(updated));

      navigate({
        to: "/search",
        search: { q: trimmedQuery },
      });

      form.reset();
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="font-sans antialiased wrap-anywhere selection:bg-[rgba(79,184,178,0.24)] bg-[#F5F5F5] dark:bg-slate-950 transition-colors duration-300">
        <QueryClientProvider client={queryClient}>
          <Navbar />

          {/* GLOBAL SEARCH BAR: Positioned globally below Navbar */}
          <div className="max-w-3xl mx-auto w-full px-4 py-8">
            <form onSubmit={handleSearch} className="relative group">
              <SearchIcon
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                size={20}
              />
              <input
                name="q"
                type="text"
                placeholder="Search projects, blogs, or services..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-500 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm dark:text-white"
              />
            </form>
          </div>

          <main className="min-h-[70vh]">{children}</main>

          <Footer />
        </QueryClientProvider>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
