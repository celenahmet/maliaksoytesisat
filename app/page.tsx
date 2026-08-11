"use client";

import { useEffect, useState } from "react";

const PHONE_DISPLAY = "0531 839 0668";
const PHONE_WA = "905318390668";

const services = [
  {
    no: "01",
    tag: "ELEKTRONİK",
    title: "Küçük ev aletleri",
    text: "Kahve makinesi, süpürge, ütü ve mutfak yardımcılarında arıza tespiti, bakım ve onarım.",
    icon: "⌁",
    tone: "lime",
  },
  {
    no: "02",
    tag: "ISITMA",
    title: "Kombi & petek",
    text: "Kombi bakımı, petek temizliği ve ısıtma sistemi arızalarında güvenli, temiz çalışma.",
    icon: "◎",
    tone: "orange",
  },
  {
    no: "03",
    tag: "SU TESİSATI",
    title: "Kaçak & tamir",
    text: "Musluk, sifon, rezervuar, gider ve su tesisatı problemlerinde yerinde çözüm.",
    icon: "◒",
    tone: "blue",
  },
  {
    no: "04",
    tag: "TESİSAT",
    title: "Genel tamir işleri",
    text: "Evinizdeki tesisat ve teknik tamir ihtiyaçları için tek noktadan destek.",
    icon: "✣",
    tone: "violet",
  },
];

const quickMessages = [
  "Elektronik arıza için fiyat almak istiyorum.",
  "Kombi veya petek bakımı için fiyat almak istiyorum.",
  "Su tesisatı arızası için fiyat almak istiyorum.",
];

function whatsappUrl(message = "Merhaba, hizmetleriniz hakkında fiyat almak istiyorum.") {
  return `https://wa.me/${PHONE_WA}?text=${encodeURIComponent(message)}`;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setChatOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const requestQuote = (service: string) => {
    window.open(
      whatsappUrl(`Merhaba, ${service} hizmeti için fiyat almak istiyorum.`),
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <main>
      <div className="noise" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="UstaFix ana sayfa">
          <span className="brand-mark">
            <img src="/assets/logo/logo.png" alt="UstaFix logosu" onError={(event) => { event.currentTarget.style.display = "none"; }} />
            <span className="brand-fallback">UF</span>
          </span>
          <span className="brand-copy">
            <strong>USTA<span>FIX</span></strong>
            <small>TEKNİK SERVİS</small>
          </span>
        </a>

        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Ana menü">
          <a href="#hizmetler" onClick={() => setMenuOpen(false)}>Hizmetler</a>
          <a href="#nasil" onClick={() => setMenuOpen(false)}>Nasıl çalışır?</a>
          <a href="#guvence" onClick={() => setMenuOpen(false)}>Güvence</a>
          <a href="#iletisim" onClick={() => setMenuOpen(false)}>İletişim</a>
        </nav>

        <div className="header-actions">
          <a className="phone-link" href={`tel:+${PHONE_WA}`}>
            <span className="phone-pulse" aria-hidden="true" />
            <span><small>HEMEN ARA</small>{PHONE_DISPLAY}</span>
          </a>
          <button
            className="menu-button"
            type="button"
            aria-label="Menüyü aç veya kapat"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span />
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow reveal"><span /> EVİNİZİN TEKNİK ÇÖZÜM NOKTASI</div>
          <h1 className="reveal delay-1">
            Arızayı değil,
            <span className="hero-line">çözümü <em>konuşalım.</em></span>
          </h1>
          <p className="hero-lead reveal delay-2">
            Elektronikten kombiye, su tesisatından petek bakımına kadar evinizdeki teknik işler için hızlı teşhis, özenli çalışma.
          </p>
          <div className="hero-actions reveal delay-3">
            <button className="primary-button" type="button" onClick={() => setChatOpen(true)}>
              <span>FİYAT AL</span><b aria-hidden="true">↗</b>
            </button>
            <a className="text-button" href="#hizmetler">HİZMETLERİ İNCELE <span>↓</span></a>
          </div>
          <div className="micro-trust reveal delay-4">
            <span><b>✓</b> Hızlı geri dönüş</span>
            <span><b>✓</b> Şeffaf süreç</span>
            <span><b>✓</b> Temiz işçilik</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Teknik servis hizmet alanları">
          <div className="orbit orbit-one" aria-hidden="true" />
          <div className="orbit orbit-two" aria-hidden="true" />
          <div className="diagnostic-card">
            <div className="diag-top"><span>SİSTEM TARAMASI</span><i>CANLI</i></div>
            <div className="radar">
              <span className="radar-sweep" />
              <span className="radar-core">✓</span>
              <span className="radar-dot dot-a" />
              <span className="radar-dot dot-b" />
              <span className="radar-dot dot-c" />
            </div>
            <div className="diag-result">
              <small>SONUÇ</small>
              <strong>ÇÖZÜM HAZIR</strong>
              <span>WhatsApp üzerinden arızanızı anlatın.</span>
            </div>
          </div>
          <div className="float-chip chip-one"><span>⌁</span> ELEKTRONİK</div>
          <div className="float-chip chip-two"><span>◒</span> SU TESİSATI</div>
          <div className="float-chip chip-three"><span>◎</span> KOMBİ & PETEK</div>
          <div className="availability"><i /><span><b>Ulaşılabilir servis</b>WhatsApp’tan yazın</span></div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div>
          <span>ARIZA TESPİTİ</span><i>✦</i><span>BAKIM</span><i>✦</i><span>ONARIM</span><i>✦</i><span>TEMİZLİK</span><i>✦</i>
          <span>ARIZA TESPİTİ</span><i>✦</i><span>BAKIM</span><i>✦</i><span>ONARIM</span><i>✦</i><span>TEMİZLİK</span><i>✦</i>
        </div>
      </div>

      <section className="services section" id="hizmetler">
        <div className="section-head">
          <div><span className="kicker">01 / HİZMETLER</span><h2>Bir usta,<br/><em>birçok çözüm.</em></h2></div>
          <p>Evde aksayan teknik işlerinizi ertelemeyin. İhtiyacınızı seçin, hızlıca fiyat alın.</p>
        </div>
        <div className="service-grid">
          {services.map((service, index) => (
            <article
              className={`service-card ${service.tone} ${activeService === index ? "active" : ""}`}
              key={service.title}
              onMouseEnter={() => setActiveService(index)}
            >
              <div className="card-top"><span>{service.no}</span><i>{service.tag}</i></div>
              <div className="service-icon" aria-hidden="true">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <button type="button" onClick={() => requestQuote(service.title)}>
                FİYAT AL <span>↗</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="fee-section section" id="guvence">
        <div className="fee-visual" aria-hidden="true">
          <div className="tool-ring"><span>✣</span></div>
          <div className="fee-stamp">NET<br/>BİLGİ</div>
          <span className="line-drawing line-a" /><span className="line-drawing line-b" />
        </div>
        <div className="fee-copy">
          <span className="kicker">02 / ŞEFFAF HİZMET</span>
          <h2>Servis ücreti<br/><em>konusunda netiz.</em></h2>
          <p>Yerinde kontrol ve arıza tespiti için servis ücreti uygulanabilir.</p>
          <div className="fee-rule">
            <span>✓</span>
            <p><strong>Arıza tarafımızca onarılır ve onarım garanti kapsamında yapılırsa</strong> ayrıca servis ücreti alınmaz.</p>
          </div>
          <small>Detaylı bilgi ve koşullar için arızanızı WhatsApp üzerinden paylaşabilirsiniz.</small>
          <button className="dark-button" type="button" onClick={() => setChatOpen(true)}>DETAYLI BİLGİ AL <span>↗</span></button>
        </div>
      </section>

      <section className="process section" id="nasil">
        <div className="section-head compact">
          <div><span className="kicker">03 / NASIL ÇALIŞIR?</span><h2>Üç adımda<br/><em>çözüm başlar.</em></h2></div>
        </div>
        <div className="process-line">
          <article><span>01</span><div className="process-icon">⌁</div><h3>Arızayı anlatın</h3><p>WhatsApp’tan kısa bilgi ve mümkünse fotoğraf gönderin.</p></article>
          <article><span>02</span><div className="process-icon">◌</div><h3>Bilgi alın</h3><p>İhtiyacı birlikte netleştirelim, uygun çözümü paylaşalım.</p></article>
          <article><span>03</span><div className="process-icon">✓</div><h3>İşi çözelim</h3><p>Planlanan zamanda özenli bakım veya onarım yapılsın.</p></article>
        </div>
      </section>

      <section className="contact" id="iletisim">
        <div className="contact-orbit" aria-hidden="true" />
        <span className="kicker light">04 / İLETİŞİM</span>
        <h2>Arıza beklemez.<br/><em>Biz de.</em></h2>
        <p>İhtiyacınızı şimdi anlatın, hizmete özel fiyat bilgisi alın.</p>
        <div className="contact-actions">
          <a className="primary-button" href={whatsappUrl()} target="_blank" rel="noreferrer">WHATSAPP’TAN FİYAT AL <b>↗</b></a>
          <a className="contact-phone" href={`tel:+${PHONE_WA}`}><small>TELEFON</small>{PHONE_DISPLAY}</a>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark"><img src="/assets/logo/logo.png" alt="UstaFix logosu" onError={(event) => { event.currentTarget.style.display = "none"; }} /><span className="brand-fallback">UF</span></span>
          <span className="brand-copy"><strong>USTA<span>FIX</span></strong><small>TEKNİK SERVİS</small></span>
        </a>
        <p>Elektronik • Kombi & Petek • Su Tesisatı • Tamir</p>
        <a href="#top">YUKARI DÖN ↑</a>
      </footer>

      <aside className={chatOpen ? "chat-widget open" : "chat-widget"} aria-label="WhatsApp hızlı iletişim">
        <div className="chat-panel">
          <div className="chat-head">
            <div className="chat-avatar">UF<span /></div>
            <div><strong>UstaFix Asistan</strong><small><i /> çevrimiçi</small></div>
            <button type="button" onClick={() => setChatOpen(false)} aria-label="Sohbeti kapat">×</button>
          </div>
          <div className="chat-body">
            <div className="chat-bubble">Merhaba! 👋 Hangi hizmet için fiyat almak istersiniz?</div>
            <div className="quick-replies">
              {quickMessages.map((message, index) => (
                <a key={message} href={whatsappUrl(message)} target="_blank" rel="noreferrer">
                  <span>{index + 1}</span>{message.replace(" için fiyat almak istiyorum.", "")}
                </a>
              ))}
            </div>
          </div>
          <a className="chat-direct" href={whatsappUrl()} target="_blank" rel="noreferrer">WhatsApp’ta devam et <span>→</span></a>
        </div>
        <button className="chat-toggle" type="button" aria-label="WhatsApp sohbetini aç" onClick={() => setChatOpen(!chatOpen)}>
          <span className="wa-icon">◔</span><b>WhatsApp</b><i />
        </button>
      </aside>
    </main>
  );
}
