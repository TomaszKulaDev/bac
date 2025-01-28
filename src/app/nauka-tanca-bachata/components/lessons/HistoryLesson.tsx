// import { TextContent } from "../TextContent";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Historia Bachaty - Od początków po współczesność | Kurs Tańca",
//   description:
//     "Poznaj fascynującą historię bachaty - od jej skromnych początków w Dominikanie lat 60. po światową popularność. Dowiedz się o rozwoju tego gatunku muzycznego i tańca.",
//   keywords:
//     "historia bachaty, taniec bachata, muzyka dominikańska, nauka bachaty, kurs bachaty",
// };

// export const HistoryLesson = () => {
//   const content = {
//     sections: [
//       {
//         title: "Historia bachaty",
//         content: `
// Bachata powstała w Dominikanie w latach 60. XX wieku. Początkowo była muzyką biedoty, ale z czasem zyskała popularność na całym świecie.

// ## Rozwój stylu

// ### Lata 60-70: Powstanie gatunku
// - Początki w barach i klubach dla klasy robotniczej
// - Proste instrumenty i melodie
// - Teksty o miłości i życiu codziennym

// ### Lata 80-90: Rosnąca popularność
// - Pojawienie się pierwszych profesjonalnych nagrań
// - Rozwój charakterystycznego brzmienia gitary
// - Pierwsze międzynarodowe występy

// ### Od 2000: Międzynarodowy sukces
// - Fuzja z innymi stylami muzycznymi
// - Powstanie nowoczesnej bachaty
// - Globalna popularność jako muzyka i taniec
//         `,
//       },
//     ],
//   };

//   return (
//     <div className="space-y-6">
//       {content.sections.map((section, index) => (
//         <div key={index} className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">
//             {section.title}
//           </h2>
//           <div className="prose prose-blue max-w-none text-gray-600">
//             <TextContent sections={[{ ...section, title: "" }]} />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };
