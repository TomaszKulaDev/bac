export const INSTRUCTOR_KEYS = {
  JAN_KOWALSKI_ANNA_WISNIEWSKA: "jan-kowalski-and-anna-wisniewska",
  ANNA_WISNIEWSKA: "anna-wisniewska",
  MARCIN_NOWAK: "marcin-nowak",
} as const;

export const instructors = {
  [INSTRUCTOR_KEYS.JAN_KOWALSKI_ANNA_WISNIEWSKA]: {
    id: "1",
    name: "Jan Kowalski & Anna Wiśniewska",
    avatar: `/images/instructors/${INSTRUCTOR_KEYS.JAN_KOWALSKI_ANNA_WISNIEWSKA}.jpg`,
    bio: "Profesjonalny instruktor tańca z 10-letnim doświadczeniem",
    specialization: ["bachata", "salsa"],
    rating: 4.9,
    totalStudents: 1500,
  },
  [INSTRUCTOR_KEYS.ANNA_WISNIEWSKA]: {
    id: "2",
    name: "Anna Wiśniewska1111111111111111111111111",
    avatar: "/images/instructors/anna-wisniewska.jpg",
    bio: "Mistrzyni Polski w bachacie, instruktorka od 8 lat",
    specialization: ["bachata", "sensual"],
    rating: 4.95,
    totalStudents: 2000,
  },
  [INSTRUCTOR_KEYS.MARCIN_NOWAK]: {
    id: "3",
    name: "Marcin Nowak",
    avatar: "/images/instructors/marcin-nowak.jpg",
    bio: "Międzynarodowy instruktor bachaty, zwycięzca World Bachata Masters 2022",
    specialization: ["bachata", "moderna", "fusion"],
    rating: 5.0,
    totalStudents: 3000,
  },
};
