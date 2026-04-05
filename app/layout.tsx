import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import localFont from "next/font/local";
import CustomCursor from "@/components/CustomCursor";

const rehgal = localFont({
  src: "../public/Font/Rehgal.ttf",
  variable: "--font-rehgal",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "M. Rizwan — Fresh Graduate | Desain Grafis | Geografi",
  description:
    "Portfolio M. Rizwan, lulusan Pendidikan Geografi IPK 3.92 dengan keahlian Desain Grafis, Humas, dan Administrasi.",
  openGraph: {
    title: "M. Rizwan — Portfolio",
    description: "Fresh Graduate | Desain Grafis | Geografi | IPK 3.92",
    url: "https://rizwand-portofolio.vercel.app",
    siteName: "Rizwan Portfolio",
    images: [{ url: "/images/Profil.jpeg" }],
    locale: "id_ID",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${rehgal.variable} ${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <CustomCursor />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
