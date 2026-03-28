import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RootLayout } from "../components/layout/RootLayout";
import { NotFound } from "../components/ui/NotFound";
import { ErrorComponent } from "../components/ui/ErrorComponent";
import appCss from "../styles.css?url";

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=stored||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(mode);root.setAttribute('data-theme',mode);}catch(e){}})();`;

const queryClient = new QueryClient();

export const Route = createRootRouteWithContext<any>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Glen | Full-Stack Web Developer" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  component: RootLayout,
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
  errorComponent: (props: any) => <ErrorComponent error={props.error} />,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="font-sans antialiased bg-slate-200 dark:bg-slate-950 transition-colors duration-500">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  );
}
