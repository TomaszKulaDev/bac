import { TextContent } from "../TextContent";
import Image from "next/image";
import { INSTRUCTOR_KEYS, instructors } from "../../data/instructors";

export const AuthorLesson = () => {
  // const mainInstructor = instructors[INSTRUCTOR_KEYS.TOMASZ_KULA];

  const content = {
    sections: [
      {
        title: "Zanim zaczniesz",
        content: `
### O czym jest ten kurs?
Kurs ten stanowi kompleksowe wprowadzenie do podstaw bachaty sensual. Przeanalizujemy kluczowe elementy ruchu, które musisz znać i opanować.


Nie będziemy koncentrować się na aspektach, które nie są niezbędne – tym zajmie się Twój instruktor, instruktorka podczas zajęć stacjonarnych.

### Dla kogo jest ten kurs?

Ten kurs jest idealny dla:

- Osób, które pragną nauczyć się bachaty od podstaw.
- Osób, które znają podstawowy angielski.
- Osób, które wcześniej nie miały styczności z bachatą.
- Osób otwartych na naukę oraz interakcje z partnerem – zarówno kobietą, jak i mężczyzną.
- Osób, które mają w domu duże lub średniej wielkości lustro (to nie jest konieczne, ale zdecydowanie ułatwia naukę).


### Dla kogo ten kurs nie jest?

Kurs może nie być odpowiedni dla:

- Żon, które chcą zmusić swoich mężów do występu na weselu.
- Osób oczekujących zaawansowanych figur i technik.


### Jak bedziemy cwiczyć?

Kurs będzie wielojęzyczny, prowadzony przez różnych instruktorów. Naszym celem jest pokazanie Ci, co musisz umieć, aby jak najszybciej zacząć tańczyć i ewentualnie uczestniczyć w zajęciach stacjonarnych lub imprezach, czując się na nich swobodnie.

### Doświadczenie instruktorów

W sieci dostępne są tysiące filmów nagranych przez różnych instruktorów, które mogą znacząco przyspieszyć Twoją naukę.
Skupimy się na nich, aby zajęcia stacjonarne były uzupełnieniem, a nie zaskoczeniem.

Powodzenia!
`,
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Sekcja ze zdjęciem i podstawowymi informacjami */}
      {/* <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="w-48 h-48 relative rounded-lg overflow-hidden">
            <Image
              src={mainInstructor.avatar}
              alt={mainInstructor.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {mainInstructor.name}
            </h2>
            <p className="text-gray-600 mb-4">{mainInstructor.title}</p>
            <div className="flex gap-4 mb-4">
              {mainInstructor.socialMedia?.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-500 hover:text-amber-600 transition-colors"
                >
                  {social.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div> */}

      {/* Sekcje z treścią */}
      {content.sections.map((section, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {section.title}
          </h2>
          <div className="prose prose-blue max-w-none text-gray-600">
            <TextContent sections={[{ ...section, title: "" }]} />
          </div>
        </div>
      ))}
    </div>
  );
};
