import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const manrope = Manrope({ variable: "--font-body", subsets: ["latin", "latin-ext"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-display", subsets: ["latin", "latin-ext"] });

const title = "UstaFix | Teknik Servis, Bakım ve Tesisat";
const description = "Küçük ev aletleri, kombi ve petek bakımı, su tesisatı ve teknik tamir işleri için hızlıca fiyat alın.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", base).toString();

  return {
    metadataBase: base,
    title,
    description,
    icons: { icon: "/assets/logo/logo.png", shortcut: "/assets/logo/logo.png" },
    openGraph: { title, description, type: "website", locale: "tr_TR", images: [{ url: socialImage, width: 1733, height: 908, alt: "UstaFix teknik servis" }] },
    twitter: { card: "summary_large_image", title, description, images: [socialImage] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body className={`${manrope.variable} ${spaceGrotesk.variable}`}>{children}</body>
    </html>
  );
}
