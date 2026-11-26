import type { Metadata } from "next";
import "./globals.css";
import { PortfolioProvider } from "@/components/PortfolioContext";

export const metadata: Metadata = {
  title: "Rashmi Pathak — Software Engineer · AI / ML · Full-Stack",
  description:
    "Portfolio of Rashmi Pathak — Third-year B.Tech IT student building full-stack and AI-driven products across machine learning, web development, and fintech.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-accent="crimson" data-motion="on">
      <body className="min-h-screen antialiased selection:bg-[var(--accent)] selection:text-[var(--cream-ink)]">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <PortfolioProvider>{children}</PortfolioProvider>
      </body>
    </html>
  );
}
