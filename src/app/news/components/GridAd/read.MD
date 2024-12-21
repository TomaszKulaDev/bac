1. Dodawanie nowej reklamy w pliku ads.ts:

```ts
export const gridAds = {
  defaultAd: {
    imageUrl: "/ads/grid-default.jpg",
    title: "Szkoła Tańca Latino",
    description: "Naucz się tańczyć bachatę w profesjonalnej szkole tańca",
    link: "https://szkola-tanca.pl",
  },
} as const;
```

2. Wymagania dla obrazów reklamowych:
   Wymiary: 300x180 pikseli
   Format: JPG, PNG lub WebP
   Ścieżka: /public/ads/
   Optymalna waga: do 100KB

3. Struktura reklamy:
   <GridAd {...gridAds.newAd} />
   // lub
   <GridAd 
     imageUrl="/ads/new-ad.jpg"
     title="Tytuł reklamy"
     description="Opis reklamy"
     link="https://twoj-link.pl"
   />
