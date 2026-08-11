import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_URL } from "./site";

const title = "Ankara Teknik Servis | M. Ali Aksoy – Sincan";
const description = "Ankara Sincan merkezli teknik servis. Elektronik, küçük ev aletleri, kombi ve petek bakımı ile su tesisatı için Ankara genelinde yerinde hizmet.";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    applicationName: "M. Ali Aksoy Teknik Servis",
    category: "Teknik Servis",
    authors: [{ name: "M. Ali Aksoy" }],
    creator: "M. Ali Aksoy Teknik Servis",
    publisher: "M. Ali Aksoy Teknik Servis",
    manifest: "/site.webmanifest",
    formatDetection: { email: false, address: false, telephone: false },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    icons: { icon: "/assets/logo/mali-kare-logo-192.webp", shortcut: "/favicon.ico", apple: "/assets/logo/mali-kare-logo-192.webp" },
    openGraph: { title, description, url: `${SITE_URL}/`, siteName: "M. Ali Aksoy Teknik Servis", type: "website", locale: "tr_TR", images: [{ url: `${SITE_URL}/og.webp`, width: 1732, height: 908, alt: "M. Ali Aksoy Ankara teknik servis hizmetleri" }] },
    twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og.webp`] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#062f68",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
        "@id": `${SITE_URL}/#business`,
        name: "M. Ali Aksoy Teknik Servis",
        description,
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/assets/logo/mali-kare-logo-192.webp`,
        image: `${SITE_URL}/og.webp`,
        telephone: "+90 531 839 06 68",
        email: "bilgi@maliaksoy.com",
        address: { "@type": "PostalAddress", addressLocality: "Sincan", addressRegion: "Ankara", addressCountry: "TR" },
        areaServed: { "@type": "AdministrativeArea", name: "Ankara" },
        contactPoint: { "@type": "ContactPoint", telephone: "+90 531 839 06 68", contactType: "customer service", areaServed: "TR", availableLanguage: ["Turkish", "English"] },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Teknik Servis Hizmetleri",
          itemListElement: [
            "Elektronik Arıza ve Tamir",
            "Küçük Ev Aletleri Bakım ve Tamir",
            "Kombi ve Petek Temizlik ve Bakım",
            "Su Tesisatı Tamir ve Bakım",
          ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name, areaServed: "Ankara" } })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: "M. Ali Aksoy Teknik Servis",
        inLanguage: "tr-TR",
        publisher: { "@id": `${SITE_URL}/#business` },
      },
    ],
  };

  return (
    <html lang="tr">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
