import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Analytics } from "@vercel/analytics/next";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sola-buddy.vercel.app"),
  title: {
    default: "Sola AI",
    template: "%s | Sola AI",
  },
  description:
    "Meet your health buddy! Sola is a personal assistant for adults managing health concerns",
  icons: {
    icon: "/app-icon.png",
  },
  openGraph: {
    title: "Sola AI",
    description:
      "Meet your health buddy! Sola is a personal assistant for adults managing health concerns",
    url: "https://sola-buddy.vercel.app",
    siteName: "Sola AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sola AI - Random - Ship or be Shipped Hackathon",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sola AI",
    description:
      "Meet your health buddy! Sola is a personal assistant for adults managing health concerns",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${nunito.variable} min-h-screen bg-background text-foreground antialiased font-sans`}
      >
        <AuthProvider>
          <div className="relative min-h-screen flex flex-col">
            <SiteHeader />
            <main className="flex-1 flex flex-col pt-[70px]">{children}</main>
            <SiteFooter />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
