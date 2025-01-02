import { setCookie, getCookie } from "cookies-next";

export interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const getCookieConsent = () => {
  try {
    const consent = getCookie("cookie-consent");
    if (consent === "all") {
      return {
        necessary: true,
        analytics: true,
        marketing: true,
      };
    }
    return consent ? (JSON.parse(consent as string) as CookieSettings) : null;
  } catch (error) {
    console.error("Błąd odczytu cookie consent:", error);
    return null;
  }
};

export const setCookieConsent = (settings: CookieSettings) => {
  setCookie("cookie-consent", JSON.stringify(settings), {
    maxAge: 365 * 24 * 60 * 60,
    path: "/",
  });
};
