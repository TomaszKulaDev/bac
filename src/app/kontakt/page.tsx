"use client";

import { PageHeader } from "../szukam-partnera-do-tanca/components/PageHeader";
import { useState } from "react";
import { z } from "zod";
import ReCAPTCHA from "react-google-recaptcha";
import DOMPurify from "dompurify";

// Dodajemy typy dla reCAPTCHA
type RecaptchaValue = string | null;

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Imię musi mieć minimum 2 znaki")
    .max(100, "Imię nie może przekraczać 100 znaków")
    .regex(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/, "Niedozwolone znaki w imieniu"),
  email: z
    .string()
    .email("Nieprawidłowy format email")
    .max(255, "Email nie może przekraczać 255 znaków"),
  company: z
    .string()
    .max(200, "Nazwa firmy nie może przekraczać 200 znaków")
    .regex(
      /^[a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-_.]+$/,
      "Niedozwolone znaki w nazwie firmy"
    )
    .optional(),
  subject: z
    .string()
    .min(3, "Temat musi mieć minimum 3 znaki")
    .max(200, "Temat nie może przekraczać 200 znaków")
    .regex(
      /^[a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-_.,:!?]+$/,
      "Niedozwolone znaki w temacie"
    ),
  message: z
    .string()
    .min(10, "Wiadomość musi mieć minimum 10 znaków")
    .max(5000, "Wiadomość nie może przekraczać 5000 znaków"),
});

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const RATE_LIMIT = {
    maxAttempts: 5,
    timeWindow: 3600000,
    minTimeBetween: 10000,
  };

  const sanitizeInput = (input: string) => {
    return DOMPurify.sanitize(input.trim());
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = async () => {
    try {
      await contactSchema.parseAsync(formData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const checkRateLimit = () => {
    const now = Date.now();

    if (now - lastSubmitTime < RATE_LIMIT.minTimeBetween) {
      throw new Error("Proszę poczekać przed kolejną próbą wysłania.");
    }

    if (submitCount >= RATE_LIMIT.maxAttempts) {
      const timeElapsed = now - lastSubmitTime;
      if (timeElapsed < RATE_LIMIT.timeWindow) {
        throw new Error("Przekroczono limit prób. Spróbuj ponownie później.");
      }
      setSubmitCount(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      checkRateLimit();

      if (!recaptchaValue) {
        throw new Error("Proszę potwierdzić, że nie jesteś robotem.");
      }

      const isValid = await validateForm();
      if (!isValid) {
        return;
      }

      const sanitizedData = {
        ...formData,
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        company: sanitizeInput(formData.company),
        subject: sanitizeInput(formData.subject),
        message: sanitizeInput(formData.message),
        recaptchaToken: recaptchaValue,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedData),
      });

      if (!response.ok) {
        throw new Error("Wystąpił błąd podczas wysyłania wiadomości.");
      }

      setSubmitCount((prev) => prev + 1);
      setLastSubmitTime(Date.now());

      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
      });
      setRecaptchaValue(null);

      alert("Wiadomość została wysłana pomyślnie!");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Wystąpił nieznany błąd.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-16">
        <PageHeader title="Kontakt Biznesowy" />

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Imię i nazwisko *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border 
                         ${errors.name ? "border-red-500" : "border-amber-200"} 
                         focus:outline-none focus:ring-2 
                         ${
                           errors.name
                             ? "focus:ring-red-500"
                             : "focus:ring-amber-500"
                         }`}
                  required
                  maxLength={100}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border 
                         ${
                           errors.email ? "border-red-500" : "border-amber-200"
                         } 
                         focus:outline-none focus:ring-2 
                         ${
                           errors.email
                             ? "focus:ring-red-500"
                             : "focus:ring-amber-500"
                         }`}
                  required
                  maxLength={255}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="company">
                Firma
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border 
                       ${
                         errors.company ? "border-red-500" : "border-amber-200"
                       } 
                       focus:outline-none focus:ring-2 
                       ${
                         errors.company
                           ? "focus:ring-red-500"
                           : "focus:ring-amber-500"
                       }`}
                maxLength={200}
                disabled={isSubmitting}
              />
              {errors.company && (
                <p className="mt-1 text-sm text-red-500">{errors.company}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="subject">
                Temat *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border 
                       ${
                         errors.subject ? "border-red-500" : "border-amber-200"
                       } 
                       focus:outline-none focus:ring-2 
                       ${
                         errors.subject
                           ? "focus:ring-red-500"
                           : "focus:ring-amber-500"
                       }`}
                required
                maxLength={200}
                disabled={isSubmitting}
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="message">
                Wiadomość *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border 
                       ${
                         errors.message ? "border-red-500" : "border-amber-200"
                       } 
                       focus:outline-none focus:ring-2 
                       ${
                         errors.message
                           ? "focus:ring-red-500"
                           : "focus:ring-amber-500"
                       }`}
                rows={6}
                required
                maxLength={5000}
                disabled={isSubmitting}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message}</p>
              )}
            </div>

            <div className="flex justify-center mb-6">
              {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
                <>
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    onChange={(value: RecaptchaValue) =>
                      setRecaptchaValue(value)
                    }
                  />
                  {!recaptchaValue && errors.recaptcha && (
                    <p className="mt-2 text-sm text-red-500">
                      Proszę potwierdzić, że nie jesteś robotem
                    </p>
                  )}
                </>
              ) : (
                <div className="text-amber-600 bg-amber-50 p-4 rounded-lg">
                  Trwa ładowanie zabezpieczeń...
                </div>
              )}
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 bg-gradient-to-r from-amber-500 to-red-500 
                       text-white rounded-lg transition-all duration-300
                       ${
                         isSubmitting
                           ? "opacity-50 cursor-not-allowed"
                           : "hover:from-amber-600 hover:to-red-600"
                       }`}
              >
                {isSubmitting ? "Wysyłanie..." : "Wyślij wiadomość"}
              </button>
            </div>
          </form>

          <div className="mt-16 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Dane kontaktowe
            </h3>
            <p className="text-gray-600">
              Email: kontakt@baciata.pl
              <br />
              Tel: +48 123 456 789
              <br />
              Godziny pracy: Pon-Pt 9:00-17:00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
