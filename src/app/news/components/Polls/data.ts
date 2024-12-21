import { PollsRecord } from "./types";

export const polls: PollsRecord = {
  partnerPoll: {
    id: "partnerPoll",
    title: "ANKIETA",
    question: "Co najbardziej pociąga Cię w partnerze podczas tańca?",
    totalVotes: 145,
    options: [
      { id: "dominicana", text: "Pewność siebie i prowadzenie", votes: 45 },
      { id: "sensual", text: "Zmysłowe ruchy i bliskość", votes: 52 },
      { id: "moderna", text: "Technika i precyzja ruchów", votes: 28 },
      { id: "fusion", text: "Kreatywność i spontaniczność", votes: 20 },
    ],
  },
  frequencyPoll: {
    id: "frequencyPoll",
    title: "ANKIETA",
    question: "Ile razy w tygodniu tańczysz bachatę?",
    totalVotes: 98,
    options: [
      { id: "1-2", text: "1-2 razy", votes: 35 },
      { id: "3-4", text: "3-4 razy", votes: 42 },
      { id: "5-6", text: "5-6 razy", votes: 15 },
      { id: "daily", text: "Codziennie", votes: 6 },
    ],
  },
  stylePoll: {
    id: "stylePoll",
    title: "ANKIETA",
    question: "Jakie inne style tańca oprócz bachaty tańczysz?",
    totalVotes: 212,
    options: [
      { id: "salsa", text: "Salsa", votes: 82 },
      { id: "kizomba", text: "Kizomba", votes: 65 },
      { id: "zouk", text: "Zouk", votes: 38 },
      { id: "none", text: "Tylko bachata", votes: 27 },
      { id: "west", text: "West Coast Swing", votes: 42 },
      { id: "towarzyski", text: "Taniec towarzyski", votes: 35 },
    ],
  },

  // TRENDY W MODZIE TANECZNEJ DLA NIEJ
  // Ankiety dla niej

  dressStylePollForHer: {
    id: "dressStylePollForHer",
    title: "ANKIETA",
    question: "Jaki styl do bachaty preferujesz?",
    totalVotes: 134,
    options: [
      { id: "shorts", text: "Wygodne spodniczko/spodenki taneczne", votes: 29 },
      { id: "maxi", text: "Długa maxi z rozcięciem", votes: 22 },
      { id: "leggings", text: "Elastyczne leginsy taneczne", votes: 15 },
      { id: "body", text: "Body podkreślające sylwetkę", votes: 12 },
      { id: "crop", text: "Krótki top z jeansami", votes: 8 },
    ],
  },
  shoesPollForHer: {
    id: "shoesPollForHer",
    title: "ANKIETA",
    question: "Jakie buty do tańca są Twoim faworytem?",
    totalVotes: 156,
    options: [
      { id: "block", text: "Stabilny słupek 5-6 cm", votes: 44 },
      { id: "high", text: "Sportowe buty do tańca", votes: 38 },
      { id: "flats", text: "Wygodne baleriny", votes: 22 },
      { id: "barefoot", text: "Tańczę boso", votes: 18 },
    ],
  },
  accessoriesPollForHer: {
    id: "accessoriesPollForHer",
    title: "ANKIETA",
    question: "Które dodatki są dla Ciebie niezbędne podczas tańca?",
    totalVotes: 145,
    options: [
      { id: "earrings", text: "Efektowne kolczyki", votes: 48 },
      { id: "hairpiece", text: "Ozdoba do włosów", votes: 42 },
      { id: "bracelet", text: "Bransoletka/Pierścionki", votes: 35 },
      { id: "minimal", text: "Minimalistyczna biżuteria", votes: 20 },
      { id: "none", text: "Żadna biżuteria - naturalny look", votes: 15 },
    ],
  },

  // ZWYCIĘZCY I WYDARZENIA
  // Relacje z najważniejszych turniejów i konkursów Bachatowych.

  winnersPoll: {
    id: "winnersPoll",
    title: "ANKIETA",
    question: "Który zwycięzca turnieju najbardziej Cię zaskoczył?",
    totalVotes: 178,
    options: [
      {
        id: "couple1",
        text: "Para z Polski na World Bachata Masters",
        votes: 52,
      },
      { id: "couple2", text: "Debiutanci na BachataStars", votes: 45 },
      { id: "couple3", text: "Zwycięzcy Bachata Open", votes: 43 },
      { id: "couple4", text: "Mistrzowie European Bachata Cup", votes: 38 },
    ],
  },

  eventsPoll: {
    id: "eventsPoll",
    title: "ANKIETA",
    question: "Jaki format turniejów preferujesz?",
    totalVotes: 165,
    options: [
      { id: "jack", text: "Jack&Jill - losowe pary", votes: 48 },
      { id: "showcase", text: "Pokazy choreograficzne", votes: 42 },
      {
        id: "pro",
        text: "Rywalizacja profesjonalistów - własne pary",
        votes: 35,
      },
      { id: "amateur", text: "Brak turniejów - wolę social dance", votes: 40 },
    ],
  },

  judgingPoll: {
    id: "judgingPoll",
    title: "ANKIETA",
    question: "Co jest najważniejsze w ocenie tańca?",
    totalVotes: 189,
    options: [
      { id: "musicality", text: "Muzykalność i interpretacja", votes: 58 },
      { id: "technique", text: "Technika i precyzja", votes: 52 },
      { id: "chemistry", text: "Chemistry między partnerami", votes: 45 },
      { id: "style", text: "Styl i osobowość", votes: 34 },
    ],
  },
};
