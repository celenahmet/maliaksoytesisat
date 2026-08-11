/* Küçük logo önceden boyutlandırılmış WebP dosyasıdır. */
/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Home, MessageCircleMore, SearchX } from "lucide-react";

export const metadata: Metadata = {
  title: "Sayfa Bulunamadı | M. Ali Aksoy Teknik Servis",
  description: "Aradığınız sayfa bulunamadı. M. Ali Aksoy Teknik Servis ana sayfasına veya hizmetler bölümüne dönebilirsiniz.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="error-page">
      <div className="error-shell">
        <Link className="error-brand" href="/"><img src="/assets/logo/logo-128.webp" alt="" width="128" height="128" /><span><strong>M. Ali Aksoy</strong><small>TEKNİK SERVİS</small></span></Link>
        <div className="error-code" aria-hidden="true">404</div>
        <span className="error-icon"><SearchX aria-hidden="true" /></span>
        <p className="error-kicker">SAYFA BULUNAMADI</p>
        <h1>Aradığınız sayfa<br /><em>burada değil.</em></h1>
        <p className="error-copy">Bağlantı değişmiş veya adres hatalı yazılmış olabilir. Ana sayfaya dönebilir ya da hizmetlerimizi inceleyebilirsiniz.</p>
        <div className="error-actions"><Link className="primary-button" href="/"><span>ANA SAYFAYA DÖN</span><b><Home aria-hidden="true" /></b></Link><Link className="error-secondary" href="/#hizmetler"><ArrowLeft aria-hidden="true" /> Hizmetleri incele</Link></div>
        <a className="error-whatsapp" href="https://wa.me/905318390668?text=Merhaba%2C%20web%20sitenizden%20servis%20kaydı%20oluşturmak%20istiyorum." target="_blank" rel="noreferrer"><MessageCircleMore aria-hidden="true" /> WhatsApp’tan destek alın</a>
      </div>
    </main>
  );
}
