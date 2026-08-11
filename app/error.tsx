"use client";

/* Küçük logo önceden boyutlandırılmış WebP dosyasıdır. */
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { Home, RefreshCw, TriangleAlert } from "lucide-react";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="error-page">
      <div className="error-shell">
        <Link className="error-brand" href="/"><img src="/assets/logo/logo-128.webp" alt="" width="128" height="128" /><span><strong>M. Ali Aksoy</strong><small>TEKNİK SERVİS</small></span></Link>
        <div className="error-code" aria-hidden="true">500</div>
        <span className="error-icon warning"><TriangleAlert aria-hidden="true" /></span>
        <p className="error-kicker">GEÇİCİ BİR SORUN OLUŞTU</p>
        <h1>Bağlantıyı yeniden<br /><em>kuralım.</em></h1>
        <p className="error-copy">İşleminiz tamamlanamadı. Sayfayı yeniden deneyebilir veya güvenli şekilde ana sayfaya dönebilirsiniz.</p>
        <div className="error-actions"><button className="primary-button" type="button" onClick={reset}><span>YENİDEN DENE</span><b><RefreshCw aria-hidden="true" /></b></button><Link className="error-secondary" href="/"><Home aria-hidden="true" /> Ana sayfaya dön</Link></div>
      </div>
    </main>
  );
}
