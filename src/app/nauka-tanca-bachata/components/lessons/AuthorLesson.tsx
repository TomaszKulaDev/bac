import { TextContent } from "../TextContent";
import Image from "next/image";
import { INSTRUCTOR_KEYS, instructors } from "../../data/instructors";

export const AuthorLesson = () => {
  const mainInstructor = instructors[INSTRUCTOR_KEYS.TOMASZ_KULA];

  const content = {
    sections: [
      {
        title: "Przeczytaj zanim zaczniesz",
        content: `
### O czym jest ten kurs?

Ten kurs to kompleksowe wprowadzenie do "podstaw". Przejdziemy przez rzeczy konieczne pod kątem ruchu ktore musisz znać i umieć.
 
Nie bedziemy sie skupiac na rzeczach które nie są konieczne od tego bedziesz miał miała instruktora na zajeciach stacjonarnych.

### Dla kogo jest ten kurs?

Ten kurs jest idealny dla:

- Osób, które chcą nauczyć się bachaty od podstaw
- Osób, które znają podstawowy angielski
- Osób, które wcześniej nie miały styczności z bachatą
- Dla osób, które są otwarte mentalnie na naukę oraz interakcje z druga osobą "Kobieta" albo "Mężczyzna".
- Dla osób, które mają w domu duże lub średniej wielkości lustro "nie jest to konieczne ale pomaga".


### Dla kogo ten kurs nie jest?

Ten kurs może nie być odpowiedni dla:
- Dla żon które chcą zmusić swojego męża do zrobienia show na swoim weselu
- Dla Kobiet które tanczą Salse i dbają o swoje granice
- Osób oczekujących zaawansowanych figur i technik
- Osob mentalnie oraz emocjonalnie zamkniętych, kursy tancą towarzyskiego są w każdym mieście i też są super przygodą.

### Jak bedziemy cwiczyć?

Kurs będzie wielojęzyczny, prowadzony przez różnych instruktorów. Celem jest pokazać Ci co musisz umieć żeby jak najszybciej zacząć tanczyć i ewentualnie zacząć jeździć na zajecia stacjonarne albo imprezy i czuć sie na nich swobodnie.


### Doświadczenie instruktorów

W sieci są tysiące filmów nagranych przez różnych instruktorów, które mogą Ci pomóc i znacząco przyśpieszyć naukę. 
I na nich sie właśnie skupimy tak żeby zajęcia stacjonarne były uzupełnieniem a nie zaskoczeniem.

Powodzenia!
`,
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Sekcja ze zdjęciem i podstawowymi informacjami */}
      <div className="bg-white rounded-lg shadow p-6">
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
      </div>

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
