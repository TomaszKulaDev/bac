import { z } from "zod";

// Lista powszechnych słów, które nie powinny być używane w hasłach
const commonWords = ["password", "qwerty", "admin", "user", "login"];

// Schemat walidacji hasła za pomocą biblioteki Zod
export const passwordSchema = z
  .string()
  .min(8, "Hasło musi mieć co najmniej 8 znaków") // Minimalna długość hasła to 8 znaków
  .max(80, "Hasło nie może być dłuższe niż 80 znaków") // Maksymalna długość hasła to 80 znaków
  .regex(/[a-z]/, "Hasło musi zawierać co najmniej jedną małą literę") // Hasło musi zawierać co najmniej jedną małą literę
  .regex(/[A-Z]/, "Hasło musi zawierać co najmniej jedną wielką literę") // Hasło musi zawierać co najmniej jedną wielką literę
  .regex(/[0-9]/, "Hasło musi zawierać co najmniej jedną cyfrę") // Hasło musi zawierać co najmniej jedną cyfrę
  .regex(/[^a-zA-Z0-9]/, "Hasło musi zawierać co najmniej jeden znak specjalny") // Hasło musi zawierać co najmniej jeden znak specjalny
  .refine(
    (password) => !hasSequence(password),
    "Hasło nie może zawierać sekwencji znaków (np. '123', 'abc')" // Hasło nie może zawierać sekwencji znaków
  )
  .refine(
    (password) => !containsCommonWord(password),
    "Hasło nie może zawierać powszechnych słów" // Hasło nie może zawierać powszechnych słów
  );

// Funkcja sprawdzająca, czy hasło zawiera sekwencje znaków
function hasSequence(password: string): boolean {
  const sequences = [
    // Numeryczne (krótkie i dłuższe sekwencje)
    "123",
    "234",
    "345",
    "456",
    "567",
    "678",
    "789",
    "890",
    "012",
    "1234",
    "2345",
    "3456",
    "4567",
    "5678",
    "6789",
    "7890",

    // Literowe (krótkie i dłuższe sekwencje)
    "abc",
    "bcd",
    "cde",
    "def",
    "efg",
    "fgh",
    "ghi",
    "hij",
    "ijk",
    "jkl",
    "klm",
    "lmn",
    "mno",
    "nop",
    "opq",
    "pqr",
    "qrs",
    "rst",
    "stu",
    "tuv",
    "uvw",
    "vwx",
    "wxy",
    "xyz",
    "abcd",
    "bcde",
    "cdef",
    "defg",
    "efgh",
    "fghi",
    "ghij",
    "hijk",
    "ijkl",
    "jklm",
    "klmn",
    "lmno",
    "mnop",
    "nopq",
    "opqr",
    "pqrs",
    "qrst",
    "rstu",
    "stuv",
    "tuvw",
    "uvwx",
    "vwxy",
    "wxyz",

    // Wzorce klawiaturowe
    "qwe",
    "rty",
    "uio",
    "asd",
    "sdf",
    "dfg",
    "ghj",
    "zxc",
    "xcv",
    "cvb",
    "bnm",
    "qaz",
    "wsx",
    "edc",
    "rfv",
    "tgb",
    "yhn",
    "ujm",
    "qwert",
    "asdfg",
    "zxcvb",
    "qazwsx",
    "edcrfv",
    "tgbyhn",
    "yhnujm",
  ];

  // Sprawdzenie, czy hasło zawiera którąkolwiek z sekwencji
  return sequences.some((seq) => password.toLowerCase().includes(seq));
}

// Funkcja sprawdzająca, czy hasło zawiera powszechne słowa
function containsCommonWord(password: string): boolean {
  // Sprawdzenie, czy hasło zawiera któreś z powszechnych słów
  return commonWords.some((word) => password.toLowerCase().includes(word));
}

// Funkcja walidująca hasło i zwracająca komunikat o błędzie lub null, jeśli hasło jest poprawne
export const validatePassword = (password: string): string | null => {
  const result = passwordSchema.safeParse(password);
  if (result.success) {
    return null; // Hasło jest poprawne
  } else {
    return result.error.errors[0].message; // Zwrócenie komunikatu o błędzie
  }
};
