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
  // outfitPollForHer: {
  //   id: "outfitPollForHer",
  //   title: "ANKIETA",
  //   question: "Co najbardziej przyciąga uwagę w stroju tancerki bachaty?",
  //   totalVotes: 167,
  //   options: [
  //     { id: "dress", text: "Zwiewna sukienka", votes: 48 },
  //     { id: "heels", text: "Wysokie obcasy", votes: 62 },
  //     { id: "makeup", text: "Makijaż i biżuteria", votes: 34 },
  //     { id: "fit", text: "Dopasowany strój", votes: 23 },
  //   ],
  // },
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
};
