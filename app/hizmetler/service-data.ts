export type ServicePageData = {
  slug: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  intro: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  services: string[];
  signs: string[];
  faq: Array<[string, string]>;
};

export const servicePages: ServicePageData[] = [
  {
    slug: "elektrik-ariza-tespit",
    title: "Ankara Elektrik Arıza Tespit Servisi",
    shortTitle: "Elektrik Arıza Tespit",
    metaTitle: "Ankara Elektrik Arıza Tespit | M. Ali Aksoy",
    description: "Ankara genelinde sigorta atması, priz, anahtar, aydınlatma ve elektrik hattı arızaları için yerinde arıza tespiti. Sincan merkezli servis.",
    eyebrow: "ELEKTRİK ARIZA TESPİTİ",
    intro: "Sigorta atması, çalışmayan priz veya anahtar, aydınlatma sorunu ve elektrik hattındaki düzensizliklerde arızanın kaynağını doğru belirlemeye odaklanıyoruz. Sincan merkezli olarak Ankara içindeki yerinde servis taleplerini değerlendiriyoruz.",
    image: "/assets/cards/01.webp",
    imageWidth: 1536,
    imageHeight: 1024,
    imageAlt: "Ankara elektrik arıza tespit servisi",
    services: ["Sigorta ve kaçak akım kontrolü", "Priz ve anahtar arıza tespiti", "Aydınlatma arızası kontrolü", "Elektrik hattı ve bağlantı kontrolü"],
    signs: ["Sigortanın sık sık atması", "Priz veya anahtarın çalışmaması", "Aydınlatmada kesinti ya da titreme", "Yanık kokusu, ısınma veya düzensiz elektrik"],
    faq: [["Elektrik arızasını servis öncesinde nasıl anlatmalıyım?", "Arızanın bulunduğu alanı, ne zaman başladığını ve sigorta atması gibi belirtileri yazmanız ilk değerlendirmeyi kolaylaştırır."], ["Priz ve aydınlatma arızaları için servis veriliyor mu?", "Evet. Priz, anahtar, aydınlatma ve elektrik hattıyla ilgili arıza tespit talepleri değerlendirilmektedir."], ["Arıza fotoğrafı veya videosu gönderebilir miyim?", "Evet. Risk oluşturmadan uzaktan çekebildiğiniz fotoğraf veya videoyu WhatsApp servis kaydından sonra iletebilirsiniz."], ["Servis ücreti nasıl uygulanır?", "Arıza tespiti için servis ücreti uygulanır. Arıza tarafımızca garanti edilerek tamir edildiğinde servis ücreti alınmaz."]],
  },
  {
    slug: "kucuk-ev-aletleri-tamiri",
    title: "Ankara Küçük Ev Aletleri Tamir Servisi",
    shortTitle: "Küçük Ev Aletleri Tamiri",
    metaTitle: "Küçük Ev Aletleri Tamiri Ankara | M. Ali Aksoy",
    description: "Ankara'da kahve makinesi, elektrikli süpürge, ütü ve mutfak yardımcıları için küçük ev aletleri bakım ve tamir servisi.",
    eyebrow: "KÜÇÜK EV ALETLERİ SERVİSİ",
    intro: "Günlük kullanımda aksayan kahve makinesi, elektrikli süpürge, ütü ve mutfak yardımcıları için arıza tespiti, bakım ve onarım desteği sunuyoruz. Ankara içindeki talepler için cihaz bilgisiyle fiyat alabilirsiniz.",
    image: "/assets/cards/02.webp",
    imageWidth: 1536,
    imageHeight: 1024,
    imageAlt: "Ankara küçük ev aletleri bakım ve tamir servisi",
    services: ["Kahve makinesi bakım ve tamiri", "Elektrikli süpürge arıza tespiti", "Ütü bakım ve onarımı", "Mutfak yardımcıları teknik kontrolü"],
    signs: ["Cihazın hiç çalışmaması", "Güç, ısı veya çekiş kaybı", "Su kaçırma ya da normal dışı ses", "Kablo, düğme veya bağlantı problemi"],
    faq: [["Hangi küçük ev aletleri için destek veriliyor?", "Kahve makinesi, süpürge, ütü ve çeşitli mutfak yardımcıları için servis talepleri değerlendirilmektedir."], ["Cihazın marka ve modelini iletmeli miyim?", "Evet. Marka, model ve arıza belirtisi uygun servis değerlendirmesi için önemlidir."], ["Önceden fiyat alabilir miyim?", "Cihaz ve arıza bilgilerini WhatsApp üzerinden ileterek talebinize özel fiyat bilgisi isteyebilirsiniz."], ["Tamir işlemi güvence kapsamında mı?", "Yaptığımız işlemler, belirtilen koşul ve süre boyunca garanti kapsamındadır."]],
  },
  {
    slug: "kombi-bakimi-petek-temizligi",
    title: "Ankara Kombi Bakımı ve Petek Temizliği",
    shortTitle: "Kombi Bakımı ve Petek Temizliği",
    metaTitle: "Kombi Bakımı ve Petek Temizliği Ankara | M. Ali Aksoy",
    description: "Ankara genelinde kombi bakımı, kombi arıza tespiti ve petek temizliği. Dengeli ısınma ve verimli kullanım için Sincan merkezli servis.",
    eyebrow: "ISITMA SİSTEMLERİ SERVİSİ",
    intro: "Kombi bakımı ve petek temizliğiyle ısıtma sisteminin daha dengeli çalışmasına yardımcı oluyoruz. Isınmayan petek, basınç sorunu veya kombi arızası gibi talepleri Ankara genelinde değerlendiriyoruz.",
    image: "/assets/cards/03.webp",
    imageWidth: 1254,
    imageHeight: 1254,
    imageAlt: "Ankara kombi bakımı ve petek temizliği servisi",
    services: ["Periyodik kombi bakımı", "Kombi arıza tespiti", "Petek ve tesisat temizliği", "Isınma ve basınç problemi kontrolü"],
    signs: ["Peteklerin geç veya dengesiz ısınması", "Kombinin sık sık hata vermesi", "Basıncın sürekli düşmesi veya yükselmesi", "Enerji tüketiminde belirgin artış"],
    faq: [["Petek temizliği ne zaman gerekli olur?", "Petekler dengesiz ısınıyor, alt bölümleri soğuk kalıyor veya sistem geç ısınıyorsa kontrol ve temizlik gerekebilir."], ["Kombi bakımında hangi kontroller yapılır?", "Cihazın genel çalışma durumu, bağlantıları, basınç ve ısıtma performansı değerlendirilir; ihtiyaç görülen işlemler paylaşılır."], ["Ankara'nın hangi ilçelerine servis veriliyor?", "Sincan merkezli olarak Ankara genelindeki kombi ve petek servisi talepleri değerlendirilmektedir."], ["Fiyat bilgisi nasıl belirlenir?", "Kombi modeli, arıza belirtisi ve talep edilen işlem bilgisine göre hizmete özel fiyat paylaşılır."]],
  },
  {
    slug: "su-tesisati-tamiri",
    title: "Ankara Su Tesisatı Tamir ve Bakım Servisi",
    shortTitle: "Su Tesisatı Tamir ve Bakım",
    metaTitle: "Su Tesisatı ve Su Kaçağı Ankara | M. Ali Aksoy",
    description: "Ankara'da su kaçağı, tıkanıklık, armatür değişimi ve su tesisatı tamiri için yerinde servis. Sincan merkezli hızlı değerlendirme.",
    eyebrow: "SU TESİSATI SERVİSİ",
    intro: "Su kaçağı, tıkanıklık, armatür değişimi ve tesisat bakımında sorunun kaynağını belirleyerek kalıcı çözüme odaklanıyoruz. Sincan merkezli olarak Ankara içindeki yerinde servis taleplerini değerlendiriyoruz.",
    image: "/assets/cards/04.webp",
    imageWidth: 1402,
    imageHeight: 1122,
    imageAlt: "Ankara su tesisatı tamir ve bakım servisi",
    services: ["Su kaçağı kontrolü ve tamiri", "Tıkanıklık açma", "Musluk ve armatür değişimi", "Su tesisatı bakım ve onarımı"],
    signs: ["Duvar veya zeminde nem ve su izi", "Düşük su basıncı", "Yavaş akan ya da geri tepen gider", "Damlatan musluk veya bağlantı noktaları"],
    faq: [["Su kaçağı şüphesinde ne yapmalıyım?", "Görünen suyu kontrol altına alın, mümkünse ilgili vanayı kapatın ve kaçağın bulunduğu bölgenin fotoğrafını WhatsApp üzerinden iletin."], ["Tıkanıklık için yerinde servis veriliyor mu?", "Evet. Ankara içindeki tıkanıklık ve tesisat talepleri adres bilgisine göre değerlendirilir."], ["Armatür değişimi yapılıyor mu?", "Evet. Musluk ve armatür değişimi su tesisatı hizmetleri kapsamındadır."], ["Servis talebi nasıl oluşturulur?", "WhatsApp servis asistanından su tesisatını ve ilgili arıza türünü seçerek ad, telefon ve ilçe bilginizi iletebilirsiniz."]],
  },
];

export const legacyServiceSlugs: Record<string, string> = {
  elektrik: "elektrik-ariza-tespit",
  "elektrik-ariza-tespiti": "elektrik-ariza-tespit",
  elektronik: "elektrik-ariza-tespit",
  "elektronik-tamir": "elektrik-ariza-tespit",
  "elektronik-ariza-tamiri": "elektrik-ariza-tespit",
  "kucuk-ev-aletleri": "kucuk-ev-aletleri-tamiri",
  "kucuk-ev-aletleri-servisi": "kucuk-ev-aletleri-tamiri",
  "kombi-bakimi": "kombi-bakimi-petek-temizligi",
  "petek-temizligi": "kombi-bakimi-petek-temizligi",
  "kombi-petek-bakimi": "kombi-bakimi-petek-temizligi",
  "su-tesisati": "su-tesisati-tamiri",
  "su-kacagi": "su-tesisati-tamiri",
  "tikaniklik-acma": "su-tesisati-tamiri",
};

export function getServicePage(slug: string) {
  return servicePages.find((service) => service.slug === slug);
}
