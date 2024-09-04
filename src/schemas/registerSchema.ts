import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Imię jest wymagane")
      .max(20, "Imię nie może być dłuższe niż 20 znaków"),
    email: z.string().email("Nieprawidłowy adres email"),
    password: z
      .string()
      .min(6, "Hasło musi mieć co najmniej 6 znaków")
      .max(72, "Hasło nie może być dłuższe niż 72 znaki")
      .regex(/[A-Z]/, "Hasło musi zawierać przynajmniej jedną dużą literę")
      .regex(/[a-z]/, "Hasło musi zawierać przynajmniej jedną małą literę")
      .regex(/[0-9]/, "Hasło musi zawierać przynajmniej jedną cyfrę")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Hasło musi zawierać przynajmniej jeden znak specjalny"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Hasła nie są identyczne",
    path: ["confirmPassword"],
  });
