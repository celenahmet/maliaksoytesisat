# M. Ali Aksoy Teknik Servis

Ankara ve Sincan merkezli elektrik arıza tespiti, küçük ev aletleri bakımı, kombi-petek temizliği ve su tesisatı hizmetleri için hazırlanmış kurumsal web sitesi.

## Özellikler

- Türkçe ve İngilizce dil desteği
- WhatsApp üzerinden yönlendirmeli servis kaydı
- Mobil, tablet ve masaüstü uyumlu tasarım
- Erişilebilirlik araçları
- Hizmet bazlı arama motoru sayfaları
- Özel hata sayfaları ve eski adres yönlendirmeleri

## Yerel çalışma

```bash
npm install
npm run dev
```


## Kontroller

```bash
npm test
npm run audit:seo
```

## Yayın

Proje Vercel tarafından Next.js olarak otomatik algılanır. Standart üretim komutu `npm run build` şeklindedir.

Özel alan adı bağlandığında Vercel ortam değişkeni olarak aşağıdaki değer tanımlanmalıdır:

```text
NEXT_PUBLIC_SITE_URL=https://alanadiniz.com
```
