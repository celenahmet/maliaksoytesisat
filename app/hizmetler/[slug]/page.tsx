/* Görseller önceden boyutlandırılmış WebP dosyalarıdır. */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2, MapPin, PhoneCall, ShieldCheck } from "lucide-react";
import { getServicePage, legacyServiceSlugs, servicePages } from "../service-data";
import { SITE_URL } from "../../site";

const PHONE_DISPLAY = "0531 839 0668";
const PHONE_WA = "905318390668";
export function generateStaticParams() {
  return servicePages.map(({ slug }) => ({ slug }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const canonicalSlug = legacyServiceSlugs[slug];
  if (canonicalSlug) permanentRedirect(`/hizmetler/${canonicalSlug}`);
  const service = getServicePage(slug);
  if (!service) notFound();

  const canonical = `${SITE_URL}/hizmetler/${service.slug}`;
  const whatsappMessage = encodeURIComponent(`Merhaba, web sitenizden ${service.shortTitle} için servis kaydı oluşturmak istiyorum.`);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: service.shortTitle,
        description: service.description,
        url: canonical,
        areaServed: { "@type": "AdministrativeArea", name: "Ankara" },
        provider: { "@id": `${SITE_URL}/#business` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Anasayfa", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Hizmetler", item: `${SITE_URL}/#hizmetler` },
          { "@type": "ListItem", position: 3, name: service.shortTitle, item: canonical },
        ],
      },
    ],
  };

  return (
    <>
      <title>{service.metaTitle}</title>
      <meta name="description" content={service.description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={service.metaTitle} />
      <meta property="og:description" content={service.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="tr_TR" />
      <meta property="og:image" content={`${SITE_URL}${service.image}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={service.metaTitle} />
      <meta name="twitter:description" content={service.description} />
      <meta name="twitter:image" content={`${SITE_URL}${service.image}`} />
      <header className="site-header service-header">
        <Link className="brand" href="/" prefetch={false}>
          <span className="brand-emblem" aria-hidden="true"><img src="/assets/logo/logo-128.webp" alt="" width="128" height="128" /></span>
          <span className="brand-copy"><strong>M. Ali Aksoy</strong><small>TEKNİK SERVİS</small></span>
        </Link>
        <nav className="nav service-nav" aria-label="Ana menü"><Link href="/" prefetch={false}>Anasayfa</Link><Link href="/#hizmetler" prefetch={false}>Hizmetler</Link><Link href="/#guvence" prefetch={false}>Çalışma ve Güvence</Link><Link href="/#iletisim" prefetch={false}>İletişim</Link></nav>
      </header>

      <main className="seo-service-page">
        <nav className="breadcrumbs" aria-label="Sayfa yolu"><Link href="/" prefetch={false}>Anasayfa</Link><span>/</span><Link href="/#hizmetler" prefetch={false}>Hizmetler</Link><span>/</span><span aria-current="page">{service.shortTitle}</span></nav>

        <section className="service-detail-hero">
          <div className="service-detail-copy"><span className="kicker">{service.eyebrow}</span><h1>{service.title}</h1><p>{service.intro}</p><div className="service-detail-actions"><a className="primary-button" href={`https://wa.me/${PHONE_WA}?text=${whatsappMessage}`} target="_blank" rel="noreferrer"><span>WHATSAPP’TAN FİYAT AL</span><b><ArrowUpRight aria-hidden="true" /></b></a><a className="service-call" href={`tel:+${PHONE_WA}`}><PhoneCall aria-hidden="true" /><span><small>HEMEN ARA</small>{PHONE_DISPLAY}</span></a></div></div>
          <div className="service-detail-image"><img src={service.image.replace(".webp", "-960.webp")} srcSet={`${service.image.replace(".webp", "-480.webp")} 480w, ${service.image.replace(".webp", "-960.webp")} 960w, ${service.image} ${service.imageWidth}w`} sizes="(max-width: 900px) 100vw, 55vw" alt={service.imageAlt} width={service.imageWidth} height={service.imageHeight} fetchPriority="high" /></div>
        </section>

        <section className="service-detail-grid" aria-label={`${service.shortTitle} kapsamı`}>
          <article><span className="kicker">HİZMET KAPSAMI</span><h2>Hangi işlemler için destek alabilirsiniz?</h2><ul>{service.services.map((item) => <li key={item}><CheckCircle2 aria-hidden="true" />{item}</li>)}</ul></article>
          <article><span className="kicker">ARIZA BELİRTİLERİ</span><h2>Servis değerlendirmesi gerektiren durumlar</h2><ul>{service.signs.map((item) => <li key={item}><ShieldCheck aria-hidden="true" />{item}</li>)}</ul></article>
        </section>

        <section className="service-area-band"><div><MapPin aria-hidden="true" /><span><small>HİZMET BÖLGESİ</small><strong>Sincan merkezli, Ankara genelinde yerinde servis</strong></span></div><p>Sincan, Etimesgut, Yenimahalle, Keçiören, Çankaya, Mamak, Pursaklar, Gölbaşı ve diğer Ankara ilçelerindeki talepler adres bilgisine göre değerlendirilir.</p></section>

        <section className="service-faq" aria-labelledby="service-faq-title"><span className="kicker">MERAK EDİLENLER</span><h2 id="service-faq-title">{service.shortTitle} hakkında sık sorulan sorular</h2><div>{service.faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>

        <section className="service-final-cta"><h2>Arızanız beklemez.<br /><em>Biz de.</em></h2><p>Hizmet ve arıza bilginizi iletin, Ankara içi servis talebiniz için size özel fiyat alın.</p><a className="primary-button" href={`https://wa.me/${PHONE_WA}?text=${whatsappMessage}`} target="_blank" rel="noreferrer"><span>SERVİS KAYDI OLUŞTUR</span><b><ArrowUpRight aria-hidden="true" /></b></a></section>

        <Link className="service-back" href="/#hizmetler" prefetch={false}><ArrowLeft aria-hidden="true" /> Tüm hizmetlere dön</Link>
      </main>

      <footer className="service-mini-footer"><strong>M. Ali Aksoy Teknik Servis</strong><span>Sincan / Ankara · {PHONE_DISPLAY} · bilgi@maliaksoy.com</span><small>© {new Date().getFullYear()} Tüm Hakları Saklıdır.</small></footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    </>
  );
}
