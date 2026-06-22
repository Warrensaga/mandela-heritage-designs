import { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { AnnouncementBar } from "./announcement-bar";
import { FloatingWhatsApp, BackToTop } from "./floating-whatsapp";

export function Layout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <AnnouncementBar />
      <Navbar />
      <main key={pathname} className="page-transition flex-1">{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <BackToTop />
    </div>
  );
}