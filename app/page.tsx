"use client";

/* Görseller önceden boyutlandırılmış WebP dosyalarıdır; çalışma zamanı görsel servisi gerektirmez. */
/* eslint-disable @next/next/no-img-element */

import { type FormEvent, type PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Contrast,
  Coffee,
  Droplets,
  Flame,
  ImagePlus,
  ImageOff,
  Info,
  Mail,
  MessageSquareText,
  NotebookPen,
  MapPin,
  MousePointer2,
  PhoneCall,
  CaseUpper,
  GripVertical,
  Link2,
  RotateCcw,
  Rows3,
  Search,
  Settings2,
  SlidersHorizontal,
  ShieldCheck,
  Video,
  Volume2,
  Wrench,
  X,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { SITE_URL } from "./site";

const PHONE_DISPLAY = "0531 839 0668";
const PHONE_WA = "905318390668";

type Language = "tr" | "en";

const serviceCatalog = [
  {
    id: "electrical-diagnostics", slug: "elektrik-ariza-tespit", no: "01", image: "/assets/cards/01.webp", width: 1536, height: 1024, icon: Search,
    tr: { tag: "ELEKTRİK", title: "Elektrik Arıza Tespit", text: "Sigorta, priz, anahtar ve aydınlatma arızalarında doğru tespit.", issues: ["Sigorta atması", "Priz veya anahtar arızası", "Aydınlatma arızası", "Diğer elektrik arızası"] },
    en: { tag: "ELECTRICAL", title: "Electrical Fault Detection", text: "Accurate diagnosis for fuse, socket, switch and lighting faults.", issues: ["Tripping fuse", "Socket or switch fault", "Lighting fault", "Other electrical fault"] },
  },
  {
    id: "small-appliances", slug: "kucuk-ev-aletleri-tamiri", no: "02", image: "/assets/cards/02.webp", width: 1536, height: 1024, icon: Coffee,
    tr: { tag: "KÜÇÜK EV ALETLERİ", title: "Küçük Ev Aletleri Bakım & Tamir", text: "Kahve makinesi, süpürge, ütü ve mutfak yardımcılarında bakım ve onarım.", issues: ["Kahve makinesi", "Elektrikli süpürge", "Ütü", "Diğer küçük ev aleti"] },
    en: { tag: "SMALL APPLIANCES", title: "Small Appliance Care & Repair", text: "Care and repair for coffee machines, vacuums, irons and kitchen appliances.", issues: ["Coffee machine", "Vacuum cleaner", "Iron", "Other small appliance"] },
  },
  {
    id: "boiler-radiator", slug: "kombi-bakimi-petek-temizligi", no: "03", image: "/assets/cards/03.webp", width: 1254, height: 1254, icon: Flame,
    tr: { tag: "KOMBİ & PETEK", title: "Kombi & Petek Temizlik & Bakım", text: "Kombi bakımı ve petek temizliğiyle güvenli, dengeli ısınma.", issues: ["Kombi arızası", "Kombi bakımı", "Petek temizliği", "Isınma problemi"] },
    en: { tag: "BOILER & RADIATOR", title: "Boiler & Radiator Care", text: "Safe, balanced heating with boiler care and radiator cleaning.", issues: ["Boiler fault", "Boiler maintenance", "Radiator cleaning", "Heating problem"] },
  },
  {
    id: "plumbing", slug: "su-tesisati-tamiri", no: "04", image: "/assets/cards/04.webp", width: 1402, height: 1122, icon: Droplets,
    tr: { tag: "SU TESİSATI", title: "Su Tesisatı Tamir & Bakım", text: "Su kaçağı, tıkanıklık ve armatür işlerinde yerinde çözüm.", issues: ["Su kaçağı", "Tıkanıklık", "Armatür değişimi", "Tesisat tamir ve bakım"] },
    en: { tag: "PLUMBING", title: "Plumbing Repair & Care", text: "On-site solutions for leaks, blockages and fixture work.", issues: ["Water leak", "Blockage", "Fixture replacement", "Plumbing repair and care"] },
  },
] as const;

const copy = {
  tr: {
    locale: "Türkçe", navLabel: "Ana menü", home: "Anasayfa", services: "Hizmetler", assurance: "Çalışma ve Güvence", contact: "İletişim", technicalService: "Teknik Servis", menu: "Menüyü aç veya kapat",
    professional: "PROFESYONEL HİZMET", heroA: "Arızanız beklemez.", heroB: "Biz de.", heroLead: "Sincan merkezli ekibimizle Ankara genelinde; elektrik arıza tespitinden kombiye, su tesisatından petek bakımına hızlı teşhis ve özenli çalışma.", quote: "FİYAT AL", viewServices: "HİZMETLERİ İNCELE",
    micro: ["Uzman teknik servis", "Garantili hizmet", "Hızlı çözüm", "Güvenilir destek"], available: "Ulaşılabilir servis", writeWa: "WhatsApp’tan yazın",
    servicesKicker: "01 / HİZMETLER", servicesTitleA: "İhtiyacınız için", servicesTitleB: "doğru çözüm.", servicesLeadKicker: "HIZLI VE NET SERVİS", servicesLead: "İhtiyacınızı seçin; arızayı birlikte değerlendirelim ve uygun hizmet için hızlıca fiyat bilgisi paylaşalım.",
    assuranceKicker: "02 / GÜVENCE", assuranceTitleA: "Güveniniz", assuranceTitleB: "bizim için önemli.", trust: [
      ["Servis Ücreti Var (Şartlı)", "Yerinde kontrol ve arıza tespiti için servis ücreti uygulanabilir."],
      ["Tamir Yapılırsa", "Arıza tarafımızca garanti kapsamında onarılırsa servis ücreti alınmaz."],
      ["Garantili Hizmet", "Yaptığımız işlemler, belirtilen koşul ve süre kapsamında güvence altındadır."],
    ],
    processKicker: "03 / ÇALIŞMA SÜRECİ", processTitleA: "Üç adımda", processTitleB: "çözüm başlar.", process: [
      ["Arızayı anlatın", "WhatsApp’tan kısa bilgi gönderin; fotoğraf ve video da ekleyebilirsiniz."],
      ["Bilgi alın", "İhtiyacı birlikte netleştirelim, uygun çözümü paylaşalım."],
      ["İşi çözelim", "Planlanan zamanda özenli bakım veya onarım yapılsın."],
    ],
    localKicker: "ANKARA YERİNDE SERVİS", localTitle: "Sincan’dan Ankara geneline teknik destek.", localText: "Elektrik arıza tespitinden küçük ev aletlerine, kombi bakımından petek temizliği ve su tesisatına kadar Ankara içindeki servis taleplerini değerlendiriyoruz.", districts: ["Sincan", "Etimesgut", "Yenimahalle", "Keçiören", "Çankaya", "Mamak", "Pursaklar", "Gölbaşı"], faqTitle: "Sık sorulan sorular", faq: [["Hangi bölgelere servis veriyorsunuz?", "Sincan merkezli olarak Ankara genelindeki servis taleplerini değerlendiriyoruz. İlçe ve adres bilginizi WhatsApp üzerinden iletebilirsiniz."], ["Servis ücreti hangi durumda alınır?", "Arıza tespiti için servis ücreti uygulanır. Arıza tamiri tarafımızca garanti edilerek yapıldığında servis ücreti alınmaz."], ["Servis ücreti ödemek istemiyorum, ne yapabilirim?", "Arıza tespitinin ardından yaşadığınız sorun için kesin tamirat ve çözüm hizmetini tarafımıza yaptırırsanız ayrıca servis ücreti alınmaz. Yalnızca arıza tespiti veya servis ziyaretiyle sınırlı kalınırsa servis ücreti uygulanır."], ["Fiyat bilgisini nasıl alabilirim?", "Hizmet ve arıza türünü WhatsApp servis asistanından seçerek bilgilerinizi iletebilir, talebinize özel fiyat alabilirsiniz."], ["Fotoğraf veya video gönderebilir miyim?", "Evet. Servis talebini oluşturduktan sonra cihazın veya arızanın fotoğraf ve videolarını WhatsApp üzerinden gönderebilirsiniz."]],
    contactKicker: "04 / İLETİŞİM", contactLead: "Sincan merkezli, Ankara geneli yerinde servis için ihtiyacınızı şimdi anlatın; hizmete özel fiyat bilgisi alın.", waQuote: "WHATSAPP’TAN FİYAT AL", phone: "TELEFON", contactAreaKicker: "HİZMET BÖLGESİ", contactAreaTitle: "ANKARA GENELİ", contactAreaBase: "Sincan merkezli", contactHighlights: ["Yerinde servis", "Hızlı değerlendirme"],
    footerSlogan: "Eviniz için güvenilir teknik destek.", footerText: "Elektrik arıza tespiti, küçük ev aletleri, kombi, petek ve su tesisatı ihtiyaçlarınızda hızlı ve özenli çözüm. Sincan merkezli ekibimiz Ankara genelinde yerinde servis sağlar. Her işlemde açık iletişim ve kalıcı çözüm yaklaşımıyla çalışırız.", ourServices: "Hizmetlerimiz", contactUpper: "İLETİŞİM", serviceArea: "Ankara genelinde yerinde servis hizmeti.", rights: "Tüm Hakları Saklıdır.", backTop: "YUKARI DÖN",
    ticker: ["ELEKTRİK ARIZA TESPİTİ", "KÜÇÜK EV ALETLERİ", "KOMBİ BAKIMI", "PETEK TEMİZLİĞİ", "SU KAÇAĞI", "TIKANIKLIK AÇMA", "Hızlı teşhis, özenli işçilik, güvenilir servis"],
    a11y: { menu: "Erişilebilirlik", open: "Erişilebilirlik menüsünü aç", close: "Erişilebilirlik menüsünü kapat", move: "Taşımak için sürükleyin", text: "Yazıyı Büyüt", contrast: "Kontrast", read: "Sesli Okuma", stopRead: "Okumayı Durdur", links: "Link Vurgula", cursor: "İmleç Büyüt", guide: "Okuma Çubuğu", images: "Görsel Gizle", reset: "Sıfırla" },
    chat: {
      aria: "WhatsApp hızlı iletişim", assistant: "M. Ali Aksoy Servis Asistanı", online: "çevrimiçi", step: "adım", close: "Sohbeti kapat", settings: "Görünüm ayarları", compactView: "Kompakt", verticalView: "Dikey", callUs: "Bizi arayın", hello: "Merhaba! Önce ihtiyacınız olan hizmet kategorisini seçin.", backService: "Hizmet seçimine dön", selectIssue: "Arıza veya işlem türünü seçin.", backIssue: "Arıza seçimine dön", createRecord: "için servis kaydı oluşturalım.", fullName: "Ad Soyad", fullNamePlaceholder: "Adınız ve soyadınız", phoneNumber: "Telefon Numarası", phonePlaceholder: "+90 / sabit / kurumsal", phoneHint: "Türkiye ve yurt dışı; mobil, sabit, kurumsal ve dahili numaralar kabul edilir.", email: "E-posta (isteğe bağlı)", emailPlaceholder: "ornek@eposta.com", address: "Adres / İlçe (isteğe bağlı)", addressPlaceholder: "Örn. Sincan, Etimesgut...", otherNoteLabel: "Arızayı kısaca açıklayın", otherNotePlaceholder: "Diğer arıza veya cihazla ilgili kısa bilgi...", otherNoteError: "Diğer seçimi için kısa bir açıklama yazın.", continue: "Devam et", nameError: "Lütfen adınızı ve soyadınızı yazın.", phoneError: "Telefon numarasını ülke koduyla veya geçerli yerel/kurumsal formatta yazın.", emailError: "Lütfen geçerli bir e-posta adresi yazın veya alanı boş bırakın.", spamError: "İşlem çok hızlı tekrarlandı. Lütfen birkaç saniye bekleyip yeniden deneyin.", backContact: "İletişim bilgilerine dön", feePrompt: "Servis ücreti tercihinizi seçin.", repair: "Garanti tamir ettireceğim", visit: "Yalnızca servis ücreti", policy: "Tamir garanti edilmedikçe servis ücreti alınır. Tamir garanti edilirse servis ücreti alınmaz. Ankara içi hizmet verilir.", backFee: "Servis tercihine dön", notePrompt: "Eklemek istediğiniz bir not var mı? Bu alan isteğe bağlıdır.", noteLabel: "Ek not (isteğe bağlı)", notePlaceholder: "Arızanın ne zaman başladığı, cihaz modeli veya uygun olduğunuz saat...", mediaHint: "Fotoğraf ve video eklerini WhatsApp’a geçtikten sonra gönderebilirsiniz.", skip: "Not eklemeden devam et", summary: "Bilgileriniz hazır. WhatsApp’a geçtiğinizde aşağıdaki mesaj otomatik oluşturulacak.", changeNote: "Notu değiştir", service: "Hizmet", issue: "Arıza", preference: "Tercih", customerNote: "Müşteri notu", send: "WhatsApp’a gönder", sending: "WhatsApp açıldı", newRequest: "Yeni talep oluştur", open: "WhatsApp sohbetini aç", defaultMessage: "Merhaba, hizmetleriniz hakkında fiyat almak istiyorum.", requestIntro: "Merhaba, web sitenizden servis kaydı oluşturmak istiyorum.", attachments: "Fotoğraf ve videoları WhatsApp üzerinden ayrıca iletebilirim.", optionalNone: "Eklenmedi",
    },
  },
  en: {
    locale: "English", navLabel: "Main navigation", home: "Home", services: "Services", assurance: "Process & Assurance", contact: "Contact", technicalService: "Technical Service", menu: "Open or close menu",
    professional: "PROFESSIONAL SERVICE", heroA: "Your repair can’t wait.", heroB: "Neither do we.", heroLead: "Fast diagnosis and careful workmanship for electrical faults, boilers, radiators and plumbing throughout your home.", quote: "GET A QUOTE", viewServices: "VIEW SERVICES",
    micro: ["Expert technical service", "Guaranteed service", "Fast solutions", "Dependable support"], available: "Service available", writeWa: "Message us on WhatsApp",
    servicesKicker: "01 / SERVICES", servicesTitleA: "The right solution", servicesTitleB: "for your needs.", servicesLeadKicker: "FAST, CLEAR SERVICE", servicesLead: "Choose what you need; we will assess the issue together and quickly provide information for the right service.",
    assuranceKicker: "02 / ASSURANCE", assuranceTitleA: "Your trust", assuranceTitleB: "matters to us.", trust: [
      ["Conditional Call-out Fee", "A service fee may apply for on-site inspection and fault diagnosis."],
      ["When We Repair It", "No call-out fee is charged when we complete the repair under our guarantee."],
      ["Guaranteed Service", "Our work is covered under the stated terms and guarantee period."],
    ],
    processKicker: "03 / HOW IT WORKS", processTitleA: "A solution starts", processTitleB: "in three steps.", process: [
      ["Describe the issue", "Send a short WhatsApp message and attach photos or video if available."],
      ["Get information", "We clarify your needs together and share the appropriate solution."],
      ["Let us solve it", "Careful maintenance or repair is completed at the planned time."],
    ],
    localKicker: "ON-SITE SERVICE IN ANKARA", localTitle: "Technical support across Ankara from Sincan.", localText: "We evaluate service requests across Ankara for electrical fault detection, small appliances, boiler care, radiator cleaning and plumbing.", districts: ["Sincan", "Etimesgut", "Yenimahalle", "Keçiören", "Çankaya", "Mamak", "Pursaklar", "Gölbaşı"], faqTitle: "Frequently asked questions", faq: [["Which areas do you serve?", "Based in Sincan, we evaluate service requests throughout Ankara. You can send your district and address through WhatsApp."], ["When does a call-out fee apply?", "A call-out fee applies for fault diagnosis. It is waived when we complete the repair under our guarantee."], ["How can I avoid the call-out fee?", "No separate call-out fee is charged when you have us complete the confirmed repair and solution after diagnosis. The call-out fee applies when the visit is limited to diagnosis or inspection."], ["How can I request a quote?", "Choose the service and fault type in the WhatsApp service assistant, then send your details for a request-specific quote."], ["Can I send photos or video?", "Yes. After creating your request, you can send photos and videos of the appliance or fault through WhatsApp."]],
    contactKicker: "04 / CONTACT", contactLead: "Tell us what you need and request a service-specific quote.", waQuote: "GET A WHATSAPP QUOTE", phone: "PHONE", contactAreaKicker: "SERVICE AREA", contactAreaTitle: "ALL ANKARA", contactAreaBase: "Based in Sincan", contactHighlights: ["On-site service", "Fast assessment"],
    footerSlogan: "Dependable technical support for your home.", footerText: "Fast and careful solutions for electrical fault detection, small appliances, boilers, radiators and plumbing. Our Sincan-based team provides on-site service throughout Ankara. We work with clear communication and a lasting-solution approach.", ourServices: "Our Services", contactUpper: "CONTACT", serviceArea: "On-site service throughout Ankara.", rights: "All Rights Reserved.", backTop: "BACK TO TOP",
    ticker: ["ELECTRICAL FAULT DETECTION", "SMALL APPLIANCES", "BOILER CARE", "RADIATOR CLEANING", "WATER LEAKS", "BLOCKAGE REMOVAL", "Fast diagnosis, careful workmanship, dependable service"],
    a11y: { menu: "Accessibility", open: "Open accessibility menu", close: "Close accessibility menu", move: "Drag to move", text: "Enlarge Text", contrast: "Contrast", read: "Read Aloud", stopRead: "Stop Reading", links: "Highlight Links", cursor: "Large Cursor", guide: "Reading Guide", images: "Hide Images", reset: "Reset" },
    chat: {
      aria: "WhatsApp quick contact", assistant: "M. Ali Aksoy Service Assistant", online: "online", step: "step", close: "Close chat", settings: "Display settings", compactView: "Compact", verticalView: "Vertical", callUs: "Call us", hello: "Hello! First, choose the service category you need.", backService: "Back to services", selectIssue: "Choose the fault or service type.", backIssue: "Back to issue selection", createRecord: "— let’s create your service request.", fullName: "Full Name", fullNamePlaceholder: "Your full name", phoneNumber: "Phone Number", phonePlaceholder: "+90 / landline / business", phoneHint: "Local and international mobile, landline, business and extension numbers are accepted.", email: "Email (optional)", emailPlaceholder: "name@example.com", address: "Address / District (optional)", addressPlaceholder: "e.g. Sincan, Etimesgut...", otherNoteLabel: "Briefly describe the issue", otherNotePlaceholder: "A short description of the other issue or appliance...", otherNoteError: "Please add a short description for the other option.", continue: "Continue", nameError: "Please enter your full name.", phoneError: "Enter a valid local, international or business phone number.", emailError: "Enter a valid email address or leave this field blank.", spamError: "This action was repeated too quickly. Please wait a moment and try again.", backContact: "Back to contact details", feePrompt: "Choose your service fee preference.", repair: "I want a guaranteed repair", visit: "Call-out fee only", policy: "A service fee applies unless the repair is guaranteed. No service fee is charged when the repair is guaranteed. Service is available within Ankara.", backFee: "Back to service preference", notePrompt: "Would you like to add a note? This field is optional.", noteLabel: "Additional note (optional)", notePlaceholder: "When the issue started, appliance model or your preferred time...", mediaHint: "You can send photo and video attachments after continuing to WhatsApp.", skip: "Continue without a note", summary: "Your details are ready. The message below will be created automatically in WhatsApp.", changeNote: "Edit note", service: "Service", issue: "Issue", preference: "Preference", customerNote: "Customer note", send: "Send via WhatsApp", sending: "WhatsApp opened", newRequest: "Create a new request", open: "Open WhatsApp chat", defaultMessage: "Hello, I would like to get a quote for your services.", requestIntro: "Hello, I would like to create a service request through your website.", attachments: "I can also send photos and videos via WhatsApp.", optionalNone: "Not added",
    },
  },
} as const;

function whatsappUrl(message: string) {
  return `https://wa.me/${PHONE_WA}?text=${encodeURIComponent(message)}`;
}

function cleanSingleLine(value: string, maxLength: number) {
  return Array.from(value, (character) => {
    const code = character.charCodeAt(0);
    return code < 32 || code === 127 ? " " : character;
  }).join("").replace(/\s+/g, " ").slice(0, maxLength);
}

function cleanEmailInput(value: string) {
  return Array.from(value).filter((character) => {
    const code = character.charCodeAt(0);
    return code > 32 && code !== 127;
  }).join("").slice(0, 254);
}

function isValidEmail(value: string) {
  const email = value.trim();
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u.test(email);
}

function isValidFlexiblePhone(value: string) {
  const phone = value.trim();
  if (phone.length < 7 || phone.length > 40) return false;
  if ((phone.match(/\+/g) ?? []).length > 1 || (phone.includes("+") && !phone.startsWith("+"))) return false;

  const extension = phone.match(/(?:ext\.?|x|dahili)\s*[:.-]?\s*(\d{1,6})$/iu);
  const mainNumber = extension ? phone.slice(0, extension.index).trim() : phone;
  if (!/^[+\d\s().\-/#]+$/u.test(mainNumber)) return false;
  const digitCount = mainNumber.replace(/\D/g, "").length;
  return digitCount >= 7 && digitCount <= 15;
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("tr");
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [chatStep, setChatStep] = useState(0);
  const [selectedService, setSelectedService] = useState("");
  const [selectedIssue, setSelectedIssue] = useState("");
  const [fullName, setFullName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerDistrict, setCustomerDistrict] = useState("");
  const [feeChoice, setFeeChoice] = useState<"" | "repair" | "visit">("");
  const [customerNote, setCustomerNote] = useState("");
  const [formError, setFormError] = useState("");
  const [spamTrap, setSpamTrap] = useState("");
  const [sendLocked, setSendLocked] = useState(false);
  const [chatLayout, setChatLayout] = useState<"compact" | "vertical">("compact");
  const [a11yOpen, setA11yOpen] = useState(false);
  const [a11yPosition, setA11yPosition] = useState({ x: 0, y: 420 });
  const [a11yOptions, setA11yOptions] = useState({ text: false, contrast: false, links: false, cursor: false, guide: false, images: false });
  const [isReading, setIsReading] = useState(false);
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });
  const a11yDragRef = useRef({ dragging: false, moved: false, startX: 0, startY: 0, originX: 0, originY: 0 });
  const suppressA11yClickRef = useRef(false);
  const detailsOpenedAtRef = useRef(0);
  const lastDetailsSubmitRef = useRef(0);

  const t = copy[language];
  const services = serviceCatalog.map((service) => ({ ...service, ...service[language] }));
  const heroImage = language === "en"
    ? { base: "/assets/kare-efekt-en", width: 1415, height: 1112, alt: "Electrical fault detection, boiler, radiator and plumbing service in Ankara" }
    : { base: "/assets/kare-efekt-tr", width: 1414, height: 1113, alt: "Ankara'da elektrik arıza tespiti, kombi, petek ve su tesisatı servisi" };
  const totalChatSteps = 6;

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    if (chatStep === 2) detailsOpenedAtRef.current = Date.now();
  }, [chatStep]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("a11y-text-large", a11yOptions.text);
    root.classList.toggle("a11y-high-contrast", a11yOptions.contrast);
    root.classList.toggle("a11y-link-highlight", a11yOptions.links);
    root.classList.toggle("a11y-big-cursor", a11yOptions.cursor);
    root.classList.toggle("a11y-hide-images", a11yOptions.images);
    return () => root.classList.remove("a11y-text-large", "a11y-high-contrast", "a11y-link-highlight", "a11y-big-cursor", "a11y-hide-images");
  }, [a11yOptions]);

  useEffect(() => {
    if (!a11yOptions.cursor && !a11yOptions.guide) return;
    const trackPointer = (event: PointerEvent) => setPointerPosition({ x: event.clientX, y: event.clientY });
    window.addEventListener("pointermove", trackPointer);
    return () => window.removeEventListener("pointermove", trackPointer);
  }, [a11yOptions.cursor, a11yOptions.guide]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setChatOpen(false);
      }
    };
    const autoOpenTimer = window.setTimeout(() => setChatOpen(true), 30000);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(autoOpenTimer);
    };
  }, []);

  const resetChat = () => {
    setChatStep(0);
    setSelectedService("");
    setSelectedIssue("");
    setFullName("");
    setCustomerPhone("");
    setCustomerEmail("");
    setCustomerDistrict("");
    setFeeChoice("");
    setCustomerNote("");
    setFormError("");
    setSpamTrap("");
    setSendLocked(false);
  };

  const changeLanguage = (next: Language) => {
    setLanguage(next);
    setMenuOpen(false);
    resetChat();
  };

  const toggleA11yOption = (option: keyof typeof a11yOptions) => {
    setA11yOptions((current) => ({ ...current, [option]: !current[option] }));
  };

  const toggleReading = () => {
    if (!("speechSynthesis" in window)) return;
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }
    const pageText = document.querySelector("main")?.innerText ?? "";
    const utterance = new SpeechSynthesisUtterance(pageText.slice(0, 12000));
    utterance.lang = language === "tr" ? "tr-TR" : "en-US";
    utterance.rate = .95;
    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsReading(true);
  };

  const resetAccessibility = () => {
    window.speechSynthesis?.cancel();
    setIsReading(false);
    setA11yOptions({ text: false, contrast: false, links: false, cursor: false, guide: false, images: false });
  };

  const startA11yDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    a11yDragRef.current = { dragging: true, moved: false, startX: event.clientX, startY: event.clientY, originX: a11yPosition.x, originY: a11yPosition.y };
  };

  const moveA11yWidget = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const drag = a11yDragRef.current;
    if (!drag.dragging) return;
    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    if (Math.abs(deltaX) + Math.abs(deltaY) > 5) drag.moved = true;
    setA11yPosition({ x: Math.max(0, Math.min(window.innerWidth - 36, drag.originX + deltaX)), y: Math.max(28, Math.min(window.innerHeight - 42, drag.originY + deltaY)) });
  };

  const finishA11yDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.currentTarget.releasePointerCapture(event.pointerId);
    suppressA11yClickRef.current = a11yDragRef.current.moved;
    a11yDragRef.current.dragging = false;
  };

  const requestQuote = (serviceId: string) => {
    setSelectedService(serviceId);
    setSelectedIssue("");
    setChatStep(1);
    setChatOpen(true);
  };

  const selectedServiceData = services.find((service) => service.id === selectedService);
  const isOtherIssue = /^(Diğer|Other)/i.test(selectedIssue);
  const feeChoiceText = feeChoice === "repair" ? `A) ${t.chat.repair}` : `B) ${t.chat.visit}`;
  const whatsappDraft = [
    t.chat.requestIntro,
    `${t.chat.service}: ${selectedServiceData?.title ?? ""}`,
    `${t.chat.issue}: ${selectedIssue}`,
    `${t.chat.fullName}: ${fullName}`,
    `${t.chat.phoneNumber}: ${customerPhone}`,
    customerEmail.trim() ? `${t.chat.email}: ${customerEmail.trim()}` : "",
    customerDistrict.trim() ? `${t.chat.address}: ${customerDistrict.trim()}` : "",
    `${t.chat.preference}: ${feeChoiceText}`,
    customerNote.trim() ? `${t.chat.customerNote}: ${customerNote.trim()}` : "",
    t.chat.attachments,
  ].filter(Boolean).join("\n");

  const submitCustomerDetails = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const now = Date.now();
    if (spamTrap || (detailsOpenedAtRef.current > 0 && now - detailsOpenedAtRef.current < 800) || now - lastDetailsSubmitRef.current < 1200) {
      setFormError(t.chat.spamError);
      return;
    }
    lastDetailsSubmitRef.current = now;
    if (fullName.trim().length < 3) {
      setFormError(t.chat.nameError);
      return;
    }
    if (!isValidFlexiblePhone(customerPhone)) {
      setFormError(t.chat.phoneError);
      return;
    }
    if (customerEmail.trim() && !isValidEmail(customerEmail)) {
      setFormError(t.chat.emailError);
      return;
    }
    if (isOtherIssue && customerNote.trim().length < 3) {
      setFormError(t.chat.otherNoteError);
      return;
    }
    setFormError("");
    setChatStep(3);
  };

  const openCustomerDetails = (issue: string) => {
    setSelectedIssue(issue);
    setFormError("");
    setChatStep(2);
  };

  const lockWhatsAppSend = () => {
    if (sendLocked) return;
    setSendLocked(true);
    window.setTimeout(() => setSendLocked(false), 8000);
  };

  const trustIcons = [Search, Wrench, ShieldCheck];
  const processIcons = [MessageSquareText, Search, CheckCircle2];
  const a11yDockRight = typeof window !== "undefined" && a11yPosition.x > window.innerWidth / 2;

  return (
    <main>
      <link rel="canonical" href={`${SITE_URL}/`} />
      <header className="site-header">
        <a className="brand" href="#top">
          <span className="brand-emblem" aria-hidden="true"><img src="/assets/logo/logo-128.webp" alt="" width="128" height="128" decoding="async" /></span>
          <span className="brand-copy"><strong>M. Ali Aksoy</strong><small>{t.technicalService}</small></span>
        </a>

        <div className="header-right">
          <nav className={menuOpen ? "nav open" : "nav"} aria-label={t.navLabel}>
            <a className="nav-home" href="#top" onClick={() => setMenuOpen(false)}>{t.home}</a>
            <a href="#hizmetler" onClick={() => setMenuOpen(false)}>{t.services}</a>
            <a href="#guvence" onClick={() => setMenuOpen(false)}>{t.assurance}</a>
            <a href="#iletisim" onClick={() => setMenuOpen(false)}>{t.contact}</a>
          </nav>

          <div className="header-tools">
            <div className="language-switch" aria-label="Dil / Language">
              <button type="button" className={language === "tr" ? "active" : ""} aria-pressed={language === "tr"} onClick={() => changeLanguage("tr")}>TR</button>
              <span aria-hidden="true">/</span>
              <button type="button" className={language === "en" ? "active" : ""} aria-pressed={language === "en"} onClick={() => changeLanguage("en")}>EN</button>
            </div>
            <div className="header-actions">
              <button className="menu-button" type="button" aria-label={t.menu} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
            </div>
          </div>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow reveal"><span /> {t.professional}</div>
          <h1 className="reveal delay-1">{t.heroA}<span className="hero-line"><em>{t.heroB}</em></span></h1>
          <p className="hero-lead reveal delay-2">{t.heroLead}</p>
          <div className="hero-actions reveal delay-3">
            <button className="primary-button" type="button" onClick={() => setChatOpen(true)}><span>{t.quote}</span><b aria-hidden="true"><ArrowUpRight /></b></button>
            <a className="text-button" href="#hizmetler">{t.viewServices} <span><ArrowDown aria-hidden="true" /></span></a>
          </div>
          <div className="micro-trust reveal delay-4">{t.micro.map((item) => <span key={item}><b><Check aria-hidden="true" /></b> {item}</span>)}</div>
        </div>

        <div className="hero-visual" aria-label={t.services}>
          <div className="orbit orbit-one" aria-hidden="true" /><div className="orbit orbit-two" aria-hidden="true" />
          <div className="hero-service-art"><img src={`${heroImage.base}-960.webp`} srcSet={`${heroImage.base}-640.webp 640w, ${heroImage.base}-960.webp 960w, ${heroImage.base}.webp ${heroImage.width}w`} sizes="(max-width: 820px) 100vw, 55vw" alt={heroImage.alt} width={heroImage.width} height={heroImage.height} decoding="async" fetchPriority="high" /></div>
          <div className="availability"><i /><span><b>{t.available}</b>{t.writeWa}</span></div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-rail">
          {[0, 1].map((group) => (
            <div className="ticker-group" key={group}>
              {t.ticker.map((item) => <span className={item.includes(",") ? "ticker-message" : ""} key={item}>{item}<i><CircleDot /></i></span>)}
            </div>
          ))}
        </div>
      </div>

      <section className="services section" id="hizmetler">
        <div className="section-head services-head">
          <div><span className="kicker">{t.servicesKicker}</span><h2>{t.servicesTitleA}<br/><em>{t.servicesTitleB}</em></h2></div>
          <div className="section-support"><span><CircleDot aria-hidden="true" />{t.servicesLeadKicker}</span><p>{t.servicesLead}</p></div>
        </div>
        <div className="service-grid">
          {services.map((service, index) => (
            <article className={`service-card ${activeService === index ? "active" : ""}`} key={service.id} onMouseEnter={() => setActiveService(index)}>
              <img className="service-bg" src={service.image.replace(".webp", "-480.webp")} srcSet={`${service.image.replace(".webp", "-480.webp")} 480w, ${service.image.replace(".webp", "-960.webp")} 960w, ${service.image} ${service.width}w`} sizes="(max-width: 820px) calc(100vw - 40px), (max-width: 1050px) 46vw, 24vw" alt="" width={service.width} height={service.height} loading="lazy" decoding="async" />
              <div className="card-top"><span>{service.no}</span><i>{service.tag}</i></div>
              <div className="card-content">
                <h3><a href={`/hizmetler/${service.slug}`}>{service.title}</a></h3>
                <p>{service.text}</p>
                <button type="button" onClick={() => requestQuote(service.id)}>{t.quote} <span><ArrowUpRight aria-hidden="true" /></span></button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="fee-section section" id="guvence">
        <div className="trust-intro"><span className="trust-icon"><ShieldCheck aria-hidden="true" /></span><div><span className="kicker">{t.assuranceKicker}</span><h2>{t.assuranceTitleA}<br/><em>{t.assuranceTitleB}</em></h2></div></div>
        <div className="trust-points">
          {t.trust.map(([title, text], index) => { const Icon = trustIcons[index]; return <article key={title}><span><Icon aria-hidden="true" /></span><h3>{title}</h3><p>{text}</p></article>; })}
        </div>
      </section>

      <section className="process section" id="nasil">
        <div className="section-head compact"><div><span className="kicker">{t.processKicker}</span><h2>{t.processTitleA}<br/><em>{t.processTitleB}</em></h2></div></div>
        <div className="process-line">
          {t.process.map(([title, text], index) => { const Icon = processIcons[index]; return <article key={title}><span>0{index + 1}</span><div className="process-icon"><Icon aria-hidden="true" /></div><h3>{title}</h3><p>{text}</p></article>; })}
        </div>
      </section>

      <section className="local-seo section" aria-labelledby="local-service-title">
        <div className="local-seo-copy">
          <span className="kicker">{t.localKicker}</span>
          <h2 id="local-service-title">{t.localTitle}</h2>
          <p>{t.localText}</p>
          <div className="district-list" aria-label={language === "tr" ? "Hizmet verilen başlıca ilçeler" : "Main service districts"}>{t.districts.map((district) => <span key={district}><MapPin aria-hidden="true" />{district}</span>)}</div>
        </div>
        <div className="home-faq">
          <h2>{t.faqTitle}</h2>
          {t.faq.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown aria-hidden="true" /></summary><p>{answer}</p></details>)}
        </div>
      </section>

      <section className="contact" id="iletisim">
        <div className="contact-copy">
          <span className="kicker light">{t.contactKicker}</span>
          <h2>{t.heroA}<br/><em>{t.heroB}</em></h2>
          <p>{t.contactLead}</p>
          <div className="contact-actions"><button className="primary-button" type="button" onClick={() => { resetChat(); setChatOpen(true); }}>{t.waQuote} <b><ArrowUpRight aria-hidden="true" /></b></button><a className="contact-phone" href={`tel:+${PHONE_WA}`}><small>{t.phone}</small>{PHONE_DISPLAY}</a></div>
        </div>
        <div className="contact-visual" aria-label={`${t.contactAreaTitle} — ${t.contactAreaBase}`}>
          <div className="contact-radar" aria-hidden="true"><i /><i /><span><MapPin /><small>{t.contactAreaKicker}</small><strong>{t.contactAreaTitle}</strong><em>{t.contactAreaBase}</em></span></div>
          <div className="contact-highlights">{t.contactHighlights.map((item) => <span key={item}><Check aria-hidden="true" />{item}</span>)}</div>
        </div>
      </section>

      <footer>
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-identity"><img src="/assets/logo/logo-128.webp" alt="M. Ali Aksoy Teknik Servis" width="128" height="128" loading="lazy" decoding="async" /><div><strong>M. ALİ AKSOY</strong><span>{t.technicalService}</span><i /></div></div>
            <p>{t.footerSlogan} {t.footerText}</p>
          </div>
          <div className="footer-services">
            <div className="footer-title"><h3>{t.ourServices}</h3></div>
            <div className="footer-service-list">
              {services.map((service) => <a href={`/hizmetler/${service.slug}`} key={service.id}>{service.title}</a>)}
            </div>
          </div>
          <div className="footer-contact">
            <div className="footer-title"><h3>{t.contactUpper}</h3></div>
            <div className="footer-contact-list">
              <a href={`tel:+${PHONE_WA}`}><span><PhoneCall aria-hidden="true" /></span><b>{PHONE_DISPLAY}</b></a>
              <a href="mailto:bilgi@maliaksoy.com"><span><Mail aria-hidden="true" /></span><b>bilgi@maliaksoy.com</b></a>
              <div><span><MapPin aria-hidden="true" /></span><address>Sincan / Ankara</address></div>
            </div>
            <p><Info aria-hidden="true" /> {t.serviceArea}</p>
          </div>
        </div>
        <div className="footer-bottom"><a href="#top"><ArrowUp aria-hidden="true" /> {t.backTop}</a><span>© {new Date().getFullYear()} M. Ali Aksoy Teknik Servis. {t.rights}</span></div>
      </footer>

      <div className={`a11y-widget${a11yDockRight ? " dock-right" : ""}`} style={{ left: a11yPosition.x, top: a11yPosition.y }}>
        <button
          className="a11y-trigger"
          type="button"
          aria-label={t.a11y.open}
          aria-expanded={a11yOpen}
          title={t.a11y.move}
          onPointerDown={startA11yDrag}
          onPointerMove={moveA11yWidget}
          onPointerUp={finishA11yDrag}
          onClick={() => {
            if (suppressA11yClickRef.current) {
              suppressA11yClickRef.current = false;
              return;
            }
            setA11yOpen(!a11yOpen);
          }}
        >
          <SlidersHorizontal aria-hidden="true" />
          <GripVertical className="a11y-grip" aria-hidden="true" />
        </button>
        {a11yOpen && <section className="a11y-panel" role="dialog" aria-label={t.a11y.menu}>
          <div className="a11y-panel-head"><strong>{t.a11y.menu}</strong><button type="button" onClick={() => setA11yOpen(false)} aria-label={t.a11y.close}><X aria-hidden="true" /></button></div>
          <div className="a11y-actions">
            <button type="button" className={a11yOptions.text ? "active" : ""} aria-pressed={a11yOptions.text} onClick={() => toggleA11yOption("text")}><CaseUpper aria-hidden="true" /><span>{t.a11y.text}</span></button>
            <button type="button" className={a11yOptions.contrast ? "active" : ""} aria-pressed={a11yOptions.contrast} onClick={() => toggleA11yOption("contrast")}><Contrast aria-hidden="true" /><span>{t.a11y.contrast}</span></button>
            <button type="button" className={isReading ? "active" : ""} aria-pressed={isReading} onClick={toggleReading}><Volume2 aria-hidden="true" /><span>{isReading ? t.a11y.stopRead : t.a11y.read}</span></button>
            <button type="button" className={a11yOptions.links ? "active" : ""} aria-pressed={a11yOptions.links} onClick={() => toggleA11yOption("links")}><Link2 aria-hidden="true" /><span>{t.a11y.links}</span></button>
            <button type="button" className={a11yOptions.cursor ? "active" : ""} aria-pressed={a11yOptions.cursor} onClick={() => toggleA11yOption("cursor")}><MousePointer2 aria-hidden="true" /><span>{t.a11y.cursor}</span></button>
            <button type="button" className={a11yOptions.guide ? "active" : ""} aria-pressed={a11yOptions.guide} onClick={() => toggleA11yOption("guide")}><Rows3 aria-hidden="true" /><span>{t.a11y.guide}</span></button>
            <button type="button" className={a11yOptions.images ? "active" : ""} aria-pressed={a11yOptions.images} onClick={() => toggleA11yOption("images")}><ImageOff aria-hidden="true" /><span>{t.a11y.images}</span></button>
            <button type="button" className="reset" onClick={resetAccessibility}><RotateCcw aria-hidden="true" /><span>{t.a11y.reset}</span></button>
          </div>
        </section>}
      </div>
      {a11yOptions.guide && <div className="a11y-reading-guide" aria-hidden="true" style={{ top: pointerPosition.y }} />}
      {a11yOptions.cursor && <div className="a11y-cursor" aria-hidden="true" style={{ left: pointerPosition.x, top: pointerPosition.y }} />}

      <aside className={`chat-widget layout-${chatLayout}${chatOpen ? " open" : ""}${chatStep > 0 ? " engaged" : ""}`} aria-label={t.chat.aria}>
        <div className="chat-panel">
          <div className="chat-head">
            <div className="chat-avatar"><img src="/assets/logo/logo-128.webp" alt="" width="128" height="128" loading="lazy" decoding="async" /><span /></div>
            <div className="chat-head-copy"><strong>{t.chat.assistant}</strong><small><i /> {t.chat.online} · {t.chat.step} {chatStep + 1}/{totalChatSteps}</small></div>
            <div className="chat-head-actions">
              <button
                type="button"
                className={chatLayout === "vertical" ? "active" : ""}
                onClick={() => setChatLayout((currentLayout) => currentLayout === "compact" ? "vertical" : "compact")}
                aria-label={`${t.chat.settings}: ${chatLayout === "compact" ? t.chat.verticalView : t.chat.compactView}`}
                aria-pressed={chatLayout === "vertical"}
                title={chatLayout === "compact" ? t.chat.verticalView : t.chat.compactView}
              ><Settings2 aria-hidden="true" /></button>
              <button type="button" onClick={() => setChatOpen(false)} aria-label={t.chat.close}><X aria-hidden="true" /></button>
            </div>
          </div>
          <div className="chat-progress" aria-hidden="true"><span style={{ width: `${((chatStep + 1) / totalChatSteps) * 100}%` }} /></div>
          <div className="chat-phone-bar"><PhoneCall aria-hidden="true" /><span>{t.chat.callUs}</span><a href={`tel:+${PHONE_WA}`}>{PHONE_DISPLAY}</a></div>
          <div className="chat-body" aria-live="polite">
            {chatStep === 0 && <div className="chat-stage"><div className="chat-bubble">{t.chat.hello}</div><div className="chat-options">{services.map((service) => { const Icon = service.icon; return <button key={service.id} type="button" onClick={() => { setSelectedService(service.id); setChatStep(1); }}><span><Icon aria-hidden="true" /></span><b>{service.tag}</b><i><ChevronRight aria-hidden="true" /></i></button>; })}</div></div>}

            {chatStep === 1 && <div className="chat-stage"><button className="chat-back" type="button" onClick={() => setChatStep(0)}><ChevronLeft aria-hidden="true" /> {t.chat.backService}</button><div className="chat-bubble"><b>{selectedServiceData?.tag}</b><br />{t.chat.selectIssue}</div><div className="chat-options issue-options">{selectedServiceData?.issues.map((issue) => <button key={issue} type="button" onClick={() => openCustomerDetails(issue)}><span><Wrench aria-hidden="true" /></span><b>{issue}</b><i><ChevronRight aria-hidden="true" /></i></button>)}</div></div>}

            {chatStep === 2 && <form className="chat-stage chat-form" onSubmit={submitCustomerDetails} noValidate>
              <button className="chat-back" type="button" onClick={() => setChatStep(1)}><ChevronLeft aria-hidden="true" /> {t.chat.backIssue}</button>
              <div className="chat-bubble"><b>{selectedIssue}</b> {t.chat.createRecord}</div>
              {isOtherIssue && <label>{t.chat.otherNoteLabel}<textarea value={customerNote} maxLength={500} onChange={(event) => setCustomerNote(event.target.value)} placeholder={t.chat.otherNotePlaceholder} /></label>}
              <label>{t.chat.fullName}<input value={fullName} maxLength={80} onChange={(event) => setFullName(cleanSingleLine(event.target.value, 80))} autoComplete="name" placeholder={t.chat.fullNamePlaceholder} /></label>
              <label>{t.chat.phoneNumber}<input value={customerPhone} maxLength={40} onChange={(event) => setCustomerPhone(cleanSingleLine(event.target.value, 40))} autoComplete="tel" inputMode="tel" placeholder={t.chat.phonePlaceholder} /><small className="chat-field-hint">{t.chat.phoneHint}</small></label>
              <label>{t.chat.email}<input type="email" value={customerEmail} maxLength={254} onChange={(event) => setCustomerEmail(cleanEmailInput(event.target.value))} autoComplete="email" inputMode="email" placeholder={t.chat.emailPlaceholder} /></label>
              <label>{t.chat.address}<input value={customerDistrict} maxLength={160} onChange={(event) => setCustomerDistrict(cleanSingleLine(event.target.value, 160))} autoComplete="street-address" placeholder={t.chat.addressPlaceholder} /></label>
              <label className="chat-honeypot" aria-hidden="true">Website<input value={spamTrap} onChange={(event) => setSpamTrap(event.target.value)} autoComplete="off" tabIndex={-1} /></label>
              {formError && <p className="chat-error" role="alert">{formError}</p>}
              <button className="chat-next" type="submit">{t.chat.continue} <span><ChevronRight aria-hidden="true" /></span></button>
            </form>}

            {chatStep === 3 && <div className="chat-stage"><button className="chat-back" type="button" onClick={() => setChatStep(2)}><ChevronLeft aria-hidden="true" /> {t.chat.backContact}</button><div className="chat-bubble">{t.chat.feePrompt}</div><div className="fee-options"><button type="button" onClick={() => { setFeeChoice("repair"); setChatStep(4); }}><span><ShieldCheck aria-hidden="true" /></span><b>{t.chat.repair}</b></button><button type="button" onClick={() => { setFeeChoice("visit"); setChatStep(4); }}><span><Search aria-hidden="true" /></span><b>{t.chat.visit}</b></button></div><p className="chat-note"><b>{language === "tr" ? "Not:" : "Note:"}</b> {t.chat.policy}</p></div>}

            {chatStep === 4 && <div className="chat-stage chat-form chat-note-stage"><button className="chat-back" type="button" onClick={() => setChatStep(3)}><ChevronLeft aria-hidden="true" /> {t.chat.backFee}</button><div className="chat-bubble"><NotebookPen aria-hidden="true" /> <span>{t.chat.notePrompt}</span></div><label>{t.chat.noteLabel}<textarea value={customerNote} maxLength={500} onChange={(event) => setCustomerNote(event.target.value)} placeholder={t.chat.notePlaceholder} /></label><p className="chat-media-hint"><span><ImagePlus aria-hidden="true" /><Video aria-hidden="true" /></span>{t.chat.mediaHint}</p><button className="chat-next" type="button" onClick={() => setChatStep(5)}>{customerNote.trim() ? t.chat.continue : t.chat.skip} <span><ChevronRight aria-hidden="true" /></span></button></div>}

            {chatStep === 5 && <div className="chat-stage chat-summary"><button className="chat-back" type="button" onClick={() => setChatStep(4)}><ChevronLeft aria-hidden="true" /> {t.chat.changeNote}</button><div className="chat-bubble">{t.chat.summary}</div><dl><div><dt>{t.chat.service}</dt><dd>{selectedServiceData?.tag}</dd></div><div><dt>{t.chat.issue}</dt><dd>{selectedIssue}</dd></div><div><dt>{t.chat.fullName}</dt><dd>{fullName}</dd></div><div><dt>{t.chat.phoneNumber}</dt><dd>{customerPhone}</dd></div>{customerEmail.trim() && <div><dt>{t.chat.email}</dt><dd>{customerEmail}</dd></div>}{customerDistrict.trim() && <div><dt>{t.chat.address}</dt><dd>{customerDistrict}</dd></div>}<div><dt>{t.chat.preference}</dt><dd>{feeChoiceText}</dd></div><div><dt>{t.chat.customerNote}</dt><dd>{customerNote.trim() || t.chat.optionalNone}</dd></div></dl><p className="chat-note"><b>{language === "tr" ? "Not:" : "Note:"}</b> {t.chat.policy}</p><a className={`chat-send${sendLocked ? " locked" : ""}`} href={whatsappUrl(whatsappDraft)} target="_blank" rel="noopener noreferrer" aria-disabled={sendLocked} onClick={(event) => { if (sendLocked) { event.preventDefault(); return; } lockWhatsAppSend(); }}><FaWhatsapp aria-hidden="true" /> {sendLocked ? t.chat.sending : t.chat.send} <span><ArrowUpRight aria-hidden="true" /></span></a><button className="chat-reset" type="button" onClick={resetChat}>{t.chat.newRequest}</button></div>}
          </div>
        </div>
        <button className="chat-toggle" type="button" aria-label={t.chat.open} onClick={() => setChatOpen(!chatOpen)}><span className="wa-icon"><FaWhatsapp aria-hidden="true" /></span><b>WhatsApp</b><i /></button>
      </aside>
    </main>
  );
}
