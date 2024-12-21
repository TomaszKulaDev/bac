1. Najpierw dodaj nową ankietę w data.ts:

src/app/news/components/Polls/data.ts

```
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


2. Następnie możesz użyć tej ankiety w dowolnym miejscu w page.tsx:

<Poll data={pollsState.partnerPoll} onVote={handleVote} />
```
