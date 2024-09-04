import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(6, "Hasło musi mieć co najmniej 6 znaków")
  .max(72, "Hasło nie może być dłuższe niż 72 znaki")
  .regex(/[A-Z]/, "Hasło musi zawierać przynajmniej jedną dużą literę")
  .regex(/[a-z]/, "Hasło musi zawierać przynajmniej jedną małą literę")
  .regex(/[0-9]/, "Hasło musi zawierać przynajmniej jedną cyfrę")
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Hasło musi zawierać przynajmniej jeden znak specjalny"
  );
