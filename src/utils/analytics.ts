import { CookieSettings } from "./cookies";

export const initializeAnalytics = (cookieSettings: CookieSettings) => {
  if (cookieSettings.analytics) {
    window.gtag("consent", "update", {
      analytics_storage: "granted",
    });
  } else {
    window.gtag("consent", "update", {
      analytics_storage: "denied",
    });
  }
};
