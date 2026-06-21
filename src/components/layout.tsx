import { ReactNode } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { AnnouncementBar } from "./announcement-bar";
import { FloatingWhatsApp, BackToTop } from "./floating-whatsapp";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <BackToTop />
    </div>
  );
}