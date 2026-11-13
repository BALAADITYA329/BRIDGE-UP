import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { AuthProvider, LangProvider } from "@/lib/auth";
import { Navbar } from "@/components/Navbar";
import { Chatbot } from "@/components/Chatbot";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <p className="mt-2 text-muted-foreground">This page doesn't exist.</p>
        <Link to="/" className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Go home</Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "BridgeUp — Skills for Rural India" },
      { name: "description", content: "Bite-sized, offline-friendly skill courses, mentors, and gigs for first-generation learners in India." },
      { property: "og:title", content: "BridgeUp — Skills for Rural India" },
      { name: "twitter:title", content: "BridgeUp — Skills for Rural India" },
      { property: "og:description", content: "Bite-sized, offline-friendly skill courses, mentors, and gigs for first-generation learners in India." },
      { name: "twitter:description", content: "Bite-sized, offline-friendly skill courses, mentors, and gigs for first-generation learners in India." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/jkXfYanPnAf131AAU2opKtVDo352/social-images/social-1777370213723-ChatGPT_Image_Apr_28,_2026,_02_11_08_PM.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/jkXfYanPnAf131AAU2opKtVDo352/social-images/social-1777370213723-ChatGPT_Image_Apr_28,_2026,_02_11_08_PM.webp" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;600&family=Noto+Sans+Telugu:wght@400;600&family=Noto+Sans+Tamil:wght@400;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <AuthProvider>
      <LangProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1"><Outlet /></main>
          <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
            BridgeUp © 2026 — Bridging skills, opening futures.
          </footer>
          <Chatbot />
          <Toaster richColors />
        </div>
      </LangProvider>
    </AuthProvider>
  );
}
