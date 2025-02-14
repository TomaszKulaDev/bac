export const CITIES = [
  { value: "", label: "Miejscowość" },
  { value: "Warszawa", label: "Warszawa" },
  { value: "Kraków", label: "Kraków" },
  { value: "Łódź", label: "Łódź" },
  { value: "Wrocław", label: "Wrocław" },
  { value: "Poznań", label: "Poznań" },
  { value: "Gdańsk", label: "Gdańsk" },
  { value: "Szczecin", label: "Szczecin" },
  { value: "Bydgoszcz", label: "Bydgoszcz" },
  { value: "Lublin", label: "Lublin" },
  { value: "Białystok", label: "Białystok" },
  { value: "Katowice", label: "Katowice" },
  { value: "Gdynia", label: "Gdynia" },
  { value: "Częstochowa", label: "Częstochowa" },
  { value: "Radom", label: "Radom" },
  { value: "Sosnowiec", label: "Sosnowiec" },
  { value: "Toruń", label: "Toruń" },
  { value: "Kielce", label: "Kielce" },
  { value: "Rzeszów", label: "Rzeszów" },
  { value: "Gliwice", label: "Gliwice" },
  { value: "Zabrze", label: "Zabrze" },
  { value: "Olsztyn", label: "Olsztyn" },
  { value: "Bielsko-Biała", label: "Bielsko-Biała" },
  { value: "Bytom", label: "Bytom" },
  { value: "Zielona Góra", label: "Zielona Góra" },
  { value: "Rybnik", label: "Rybnik" },
  { value: "Ruda Śląska", label: "Ruda Śląska" },
  { value: "Opole", label: "Opole" },
  { value: "Tychy", label: "Tychy" },
  { value: "Gorzów Wielkopolski", label: "Gorzów Wielkopolski" },
  { value: "Dąbrowa Górnicza", label: "Dąbrowa Górnicza" },
  { value: "Płock", label: "Płock" },
  { value: "Elbląg", label: "Elbląg" },
  { value: "Wałbrzych", label: "Wałbrzych" },
  { value: "Włocławek", label: "Włocławek" },
  { value: "Tarnów", label: "Tarnów" },
  { value: "Chorzów", label: "Chorzów" },
  { value: "Koszalin", label: "Koszalin" },
  { value: "Kalisz", label: "Kalisz" },
  { value: "Legnica", label: "Legnica" },
  { value: "Mielec", label: "Mielec" },
] as const;

export type CityValue = (typeof CITIES)[number]["value"];
