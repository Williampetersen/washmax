import type { Route } from "next";
import type { BlogPost } from "@/lib/blog-posts";

const route = (href: string) => href as Route;
const published = "2026-11-13";

// Baggrundsviden: begreber, sammenligninger og praktiske spørgsmål.
export const videnBlogPosts: BlogPost[] = [
  {
    slug: "hvad-er-bilpleje-og-detailing",
    title: "Hvad er bilpleje og detailing – og hvad er forskellen på en bilvask?",
    metaTitle: "Hvad er bilpleje og detailing?",
    description:
      "Bilvask, bilpleje, klargøring og detailing bruges i flæng. Få en enkel forklaring på begreberne, og find ud af, hvad din bil egentlig har brug for.",
    category: "Viden om bilvask",
    keywords: ["hvad er detailing", "hvad er bilpleje", "bilpleje eller bilvask", "detailing bil betydning", "klargøring af bil"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/service/helebil.jpg", alt: "Professionel bilpleje af bil ude og inde" },
    intro: [
      "Søger du efter nogen til at gøre bilen ren, møder du hurtigt en række ord: bilvask, bilpleje, klargøring, detailing. De lyder som det samme. Det er de ikke helt.",
      "Her er forskellen – og en enkel måde at vælge på.",
    ],
    keyTakeaways: [
      "Bilvask fjerner snavs. Bilpleje bevarer og beskytter.",
      "Detailing er den mest grundige form: rens, korrektion og beskyttelse i detaljen.",
      "De fleste hverdagsbiler har brug for regelmæssig vask og lidt pleje – ikke fuld detailing.",
      "Vælg efter bilens stand og dit formål, ikke efter ordet.",
    ],
    sections: [
      {
        heading: "Bilvask",
        paragraphs: [
          "En bilvask gør bilen ren udvendigt. Det kan være en automatisk vaskehal, en selvvaskehal eller en håndvask. Formålet er at fjerne snavs her og nu.",
          "Kvaliteten spænder vidt. En hurtig børstevask og en times håndvask er begge bilvask, men resultatet og belastningen på lakken er meget forskellige.",
        ],
      },
      {
        heading: "Bilpleje og bilrengøring",
        paragraphs: [
          "Bilpleje er et bredere ord. Det dækker alt, der holder bilen pæn over tid: vask, indvendig rengøring, voks, læderpleje, rens af sæder og behandling af plast og gummi.",
          "Bilrengøring bruges ofte om det indvendige. Klargøring bruges om en samlet omgang ude og inde, typisk før et salg eller en aflevering.",
        ],
      },
      {
        heading: "Detailing",
        paragraphs: [
          "Detailing kommer fra engelsk og betyder at arbejde i detaljen. En fuld detailing kan tage en hel dag eller mere. Den omfatter typisk grundig vask, kemisk og mekanisk lakrens, maskinpolering for at fjerne ridser og en holdbar beskyttelse som forsegling eller keramisk coating.",
          "Indvendigt renses hver flade, hver sprække og hvert sæde. Det er håndværk, og prisen ligger derefter – ofte flere tusinde kroner.",
        ],
      },
      {
        heading: "Hvad har din bil brug for?",
        paragraphs: [
          "En bil i daglig brug har mest glæde af en fast rytme: en ordentlig håndvask cirka en gang om måneden, indvendig rengøring fire til seks gange om året og voks ved årstidsskifte. Det holder den pæn og bevarer værdien.",
          "CleanWash tilbyder netop det: udvendig håndvask, indvendig bilrengøring og hele bilen med voks, plus tilvalg som sæderens og læderpleje. Maskinpolering og coating er ikke en del af vores faste pakker.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvad betyder detailing?",
        answer: "En meget grundig rengøring, istandsættelse og beskyttelse af bilen ude og inde, ofte med polering og forsegling.",
      },
      {
        question: "Er bilpleje det samme som bilvask?",
        answer: "Nej. Bilvask fjerner snavs. Bilpleje omfatter også beskyttelse og vedligehold som voks, læderpleje og sæderens.",
      },
      {
        question: "Har min bil brug for detailing?",
        answer: "De fleste hverdagsbiler klarer sig fint med regelmæssig håndvask, indvendig rengøring og voks.",
      },
      {
        question: "Tilbyder CleanWash detailing?",
        answer: "Vi tilbyder håndvask, indvendig rengøring, voks og en række tilvalg. Maskinpolering og keramisk coating er ikke faste pakker.",
      },
    ],
    relatedPosts: ["lakrens-og-clay-bar", "keramisk-forsegling-eller-voks"],
    relatedLinks: [
      { label: "Alle ydelser", href: route("/ydelser") },
      { label: "Komplet bilvask", href: route("/komplet-bilvask") },
      { label: "Bilpleje guide", href: route("/bilpleje-guide") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "selvvask-eller-professionel-bilvask",
    title: "Selvvask eller professionel bilvask: hvad kan bedst betale sig?",
    metaTitle: "Selvvask eller professionel bilvask?",
    description:
      "Selvvaskehal, vask derhjemme eller en professionel håndvask? Se en ærlig sammenligning af tid, pris, resultat og risiko for lakken.",
    category: "Viden om bilvask",
    keywords: ["selvvask eller bilvask", "selvvaskehal", "vaske bil selv", "professionel bilvask fordele", "selvvask ridser"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/service/udenfor.jpg", alt: "Professionel håndvask af bil" },
    intro: [
      "At vaske bil selv er billigst. At lade andre gøre det er nemmest. Men regnestykket har flere led end prisen på vasken.",
      "Her er en nøgtern sammenligning af de tre muligheder, de fleste vælger imellem.",
    ],
    keyTakeaways: [
      "Selvvask er billigt, men kræver tid, udstyr og den rigtige teknik.",
      "Børsten i selvvaskehallen er den største risiko for ridser.",
      "En professionel håndvask koster mere, men sparer tid og skåner lakken.",
      "Indvendig rengøring er dér, professionel hjælp gør størst forskel.",
    ],
    sections: [
      {
        heading: "Selvvaskehallen",
        paragraphs: [
          "Du får højtryk, skum og en børste for en lille pris. Bruger du lansen rigtigt og holder afstand, er det en udmærket måde at skylle salt og snavs af på.",
          "Faldgruben er børsten. Den har været brugt på hundredvis af beskidte biler, fælge og trailere før din og er fuld af sand. Bruger du den på lakken, ridser den. Du står desuden udenfor i al slags vejr, og bilen bliver ikke tørret af.",
        ],
      },
      {
        heading: "Vask derhjemme",
        paragraphs: [
          "Har du plads, udstyr og lyst, kan du gøre det helt rigtigt: forvask, to spande, ren vaskehandske og mikrofiberhåndklæder. Det giver et flot resultat.",
          "Det tager halvanden til to timer med indvendig rengøring. Og det kræver, at du har det rigtige udstyr – ellers ender det med en svamp, en spand og de ridser, du ville undgå.",
        ],
      },
      {
        heading: "Professionel håndvask",
        paragraphs: [
          "Her betaler du for tid og rutine. Bilen bliver forvasket, vasket i hånden, tørret af og – hvis du vælger det – rengjort indvendigt og vokset. Du bruger ikke din egen tid.",
          "Hos en mobil bilvask sparer du også transporten. Prisen er højere end selvvask: fra 450 kr. for udvendig vask hos CleanWash.",
        ],
      },
      {
        heading: "Så hvad kan betale sig?",
        paragraphs: [
          "Holder du af at vaske bil og har udstyret, så bliv ved. Du gør det sandsynligvis godt. Skyller du mest salt af om vinteren, er selvvask med lanse fint – bare lad børsten hænge.",
          "Har du ikke tiden, bor du uden adgang til vand, eller er det kabinen, der trænger, giver professionel hjælp mest for pengene. Mange kombinerer: selv en hurtig skylning indimellem og en professionel omgang nogle gange om året.",
        ],
      },
    ],
    faqs: [
      {
        question: "Er selvvask dårligt for lakken?",
        answer: "Ikke hvis du kun bruger lansen. Børsten i hallen kan indeholde sand og give ridser.",
      },
      {
        question: "Hvad koster en professionel håndvask?",
        answer: "Hos CleanWash fra 450 kr. for udvendig vask og fra 799 kr. for hele bilen, afhængigt af bilens størrelse.",
      },
      {
        question: "Hvor lang tid tager det at vaske bil selv?",
        answer: "En grundig vask ude og inde tager typisk halvanden til to timer.",
      },
      {
        question: "Kan man kombinere selvvask og professionel vask?",
        answer: "Ja. Mange skyller selv bilen indimellem og får en grundig professionel omgang nogle gange om året.",
      },
    ],
    relatedPosts: ["to-spands-metoden", "svirvelridser-automatisk-bilvask-eller-haandvask"],
    relatedLinks: [
      { label: "Mobil bilvask vs. vaskehal", href: route("/mobil-bilvask-vs-vaskehal") },
      { label: "Håndvask af bil", href: route("/haandvask-bil-koebenhavn") },
      { label: "Bilvask hjemme", href: route("/bilvask-hjemme") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "hvor-lang-tid-tager-en-bilvask",
    title: "Hvor lang tid tager en bilvask?",
    metaTitle: "Hvor lang tid tager en bilvask?",
    description:
      "En udvendig håndvask tager cirka 65 minutter, indvendig rengøring 75 og hele bilen 110. Se hvad der påvirker tiden, og hvad tilvalg lægger til.",
    category: "Viden om bilvask",
    keywords: ["hvor lang tid tager en bilvask", "bilvask varighed", "hvor lang tid tager indvendig rengøring", "tid bilvask", "bilvask tid"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 3,
    coverImage: { src: "/service/helebil.jpg", alt: "Håndvask af bil – tidsforbrug" },
    intro: [
      "En tur gennem en vaskehal tager fem minutter. En ordentlig håndvask tager en time. Forskellen er ikke spildtid – det er dér, resultatet ligger.",
      "Her er de tider, du kan regne med hos CleanWash, og hvad der kan gøre dem længere.",
    ],
    keyTakeaways: [
      "Udvendig bilvask: cirka 65 minutter.",
      "Indvendig bilrengøring: cirka 75 minutter.",
      "Hele bilen med voks: cirka 110 minutter.",
      "Tilvalg lægger typisk 10 til 30 minutter til hver.",
    ],
    sections: [
      {
        heading: "Hvad går tiden med?",
        paragraphs: [
          "En udvendig vask består af skyl, skum, ventetid mens skummet virker, håndvask af hele bilen, rens af fælge og hjulbuer, skyl, aftørring og pudsning af ruder. Hvert trin tager fra fem til femten minutter.",
          "Indvendigt er det støvsugningen, der tager længst: sæder, gulv, måtter, bagagerum og alle sprækker. Derefter kommer aftørring af flader og ruder indefra.",
        ],
      },
      {
        heading: "Hvad lægger tilvalgene til?",
        paragraphs: [
          "Tilvalg udføres i samme besøg. Som tommelfingerregel lægger de små tilvalg omkring ti minutter til og de større op til en halv time.",
          "Fælgrens og fjernelse af dyrehår tager cirka ti minutter ekstra. Sæderens og AC-rengøring cirka et kvarter. Motorvask cirka tyve minutter. Rens af loftet cirka en halv time.",
        ],
      },
      {
        heading: "Hvad kan gøre det længere?",
        paragraphs: [
          "Bilens størrelse: en stor SUV har mere lak og mere kabine end en bybil. Bilens stand: indtørret mudder, mange insekter eller en meget rodet kabine tager tid. Og adgangen: holder bilen klemt inde, går arbejdet langsommere.",
          "Er bilen meget beskidt indvendigt, er tilvalget ekstra beskidt beregnet til netop det. Så er tiden sat af på forhånd.",
        ],
      },
      {
        heading: "Hvornår kan du bruge bilen igen?",
        paragraphs: [
          "Med det samme efter en udvendig vask og en almindelig indvendig rengøring. Har sæderne fået en våd rens, er de let fugtige i nogle timer. Du kan godt køre, men luft gerne ud.",
          "Du behøver ikke at vente ved bilen imens. Ved en udvendig vask behøver du ikke engang at være hjemme.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvor lang tid tager en udvendig bilvask?",
        answer: "Cirka 65 minutter for en håndvask med forvask, fælge og aftørring.",
      },
      {
        question: "Hvor lang tid tager indvendig rengøring af en bil?",
        answer: "Cirka 75 minutter uden tilvalg.",
      },
      {
        question: "Hvor lang tid tager det at få vasket hele bilen?",
        answer: "Cirka 110 minutter inklusive udvendig vask, indvendig rengøring og voks.",
      },
      {
        question: "Skal jeg blive ved bilen under vasken?",
        answer: "Nej. Ved udvendig vask behøver du ikke at være til stede.",
      },
    ],
    relatedPosts: ["forberedelse-foer-mobil-bilvask", "forvask-og-skum-hvorfor"],
    relatedLinks: [
      { label: "Bilvask priser", href: route("/bilvask-priser") },
      { label: "Komplet bilvask", href: route("/komplet-bilvask") },
      { label: "Bilvask samme dag", href: route("/bilvask-samme-dag") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "forberedelse-foer-mobil-bilvask",
    title: "Sådan forbereder du dig, før den mobile bilvask kommer",
    metaTitle: "Forberedelse før mobil bilvask – tjekliste",
    description:
      "Fem ting, du skal gøre, før vi kommer: parkering, adgang, værdigenstande, særlige forhold og regler på adressen. Så går besøget hurtigt og godt.",
    category: "Viden om bilvask",
    keywords: ["forberedelse bilvask", "før mobil bilvask", "hvad skal jeg gøre før bilvask", "mobil bilvask tjekliste", "parkering bilvask"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 3,
    coverImage: { src: "/home/emptycar.jpg", alt: "Løse ting i bilens kabine, der bør fjernes før rengøring" },
    intro: [
      "En mobil bilvask kræver næsten ingenting af dig. Vi har vand, strøm og udstyr med. Men der er fem små ting, som gør besøget hurtigere og resultatet bedre.",
      "De tager tilsammen fem minutter.",
    ],
    keyTakeaways: [
      "Parkér, så vi kan komme hele vejen rundt om bilen.",
      "Fjern værdigenstande og personlige ting fra kabinen.",
      "Fortæl os om skader, løse dele og særlige materialer.",
      "Tjek, at bilvask er tilladt, hvor bilen holder.",
    ],
    sections: [
      {
        heading: "1. Parkér med plads omkring",
        paragraphs: [
          "Bilen skal holde lovligt og tilgængeligt på den adresse, du har oplyst. Vi skal kunne åbne dørene og gå rundt om den. Holder den op ad en mur eller en hæk, så træk den en meter ud.",
          "Holder bilen bag en port, i en gård eller i en p-kælder, så skriv det i bemærkningsfeltet, når du booker – gerne med portkode og pladsnummer.",
        ],
      },
      {
        heading: "2. Tøm kabinen for det vigtige",
        paragraphs: [
          "Skal vi gøre rent indvendigt, så tag pung, nøgler, papirer, elektronik og andre personlige ting ud. Det gør arbejdet hurtigere, og du ved, hvor tingene er.",
          "Tag gerne autostole ud, hvis du kan, så vi kommer til sædet nedenunder. Vil du have os til at rydde affald og løse ting ud, findes tilvalget tømning af bil.",
        ],
      },
      {
        heading: "3. Fortæl os om særlige forhold",
        paragraphs: [
          "Har bilen lakskader, løse lister, en revnet rude eller eftermonteret udstyr? Er sæderne i sart læder eller alcantara? Er lakken mat, folieret eller keramisk coatet? Skriv det i bookingen.",
          "Det er ikke for at dække os ind. Det er, fordi vi så vælger de rigtige midler og metoder fra start.",
        ],
      },
      {
        heading: "4. Tjek reglerne på adressen",
        paragraphs: [
          "Bor du i ejer-, andels- eller boligforening, så tjek, at bilvask er tilladt på p-pladsen eller i gården. Holder bilen på gaden, skal parkeringsreglerne være overholdt i hele det tidsrum, vasken varer.",
        ],
      },
      {
        heading: "5. Adgang og nøgle",
        paragraphs: [
          "Til en udvendig vask skal vi ikke bruge nøglen, og du behøver ikke at være hjemme. Til indvendig rengøring skal bilen kunne låses op. Aftal med os, om du er der, eller hvordan vi får nøglen.",
          "Har du bestilt motorvask, så lad bilen stå en times tid inden, så motoren er kold. Og så er der ikke mere. Resten klarer vi.",
        ],
      },
    ],
    faqs: [
      {
        question: "Skal jeg stille vand og strøm frem?",
        answer: "Nej. Vi medbringer selv begge dele.",
      },
      {
        question: "Skal bilen være tømt helt?",
        answer: "Fjern værdigenstande og personlige ting. Resten arbejder vi omkring, eller du kan vælge tømning som tilvalg.",
      },
      {
        question: "Hvad hvis jeg ikke er hjemme?",
        answer: "En udvendig vask kan udføres uden dig. Til indvendig rengøring aftaler vi adgang til bilen.",
      },
      {
        question: "Hvorfor skal I vide, om bilen har skader?",
        answer: "Så vi kan tage hensyn og vælge den rigtige metode – for eksempel omkring løse lister eller sarte materialer.",
      },
    ],
    relatedPosts: ["hvor-lang-tid-tager-en-bilvask", "indvendig-bilrengoering-tjekliste"],
    relatedLinks: [
      { label: "Mobil bilvask", href: route("/mobil-bilvask") },
      { label: "Bilvask i lejlighed", href: route("/bilvask-lejlighed") },
      { label: "Spørgsmål og svar", href: route("/bilvask-faq") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "brugt-bil-rengoering-efter-koeb",
    title: "Nykøbt brugt bil: sådan gør du den til din egen",
    metaTitle: "Rengøring af brugt bil efter køb",
    description:
      "En brugt bil er fuld af den forrige ejers liv. Se hvilke steder der bør rengøres først, og hvilke behandlinger der giver mest for pengene.",
    category: "Viden om bilvask",
    keywords: ["rengøring af brugt bil", "brugt bil lugter", "nykøbt brugt bil rengøring", "sæderens brugt bil", "klargøring efter køb"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/home/newseat.jpg", alt: "Rens af bilsæde i brugt bil" },
    intro: [
      "Du har hentet bilen. Den er pæn, den kører godt, og forhandleren har vasket den. Alligevel er der noget: en svag fremmed lugt, et blankt rat, en plet på bagsædet.",
      "En brugt bil bærer flere års brug af nogen, du ikke kender. En grundig rengøring er det, der gør den til din.",
    ],
    keyTakeaways: [
      "Forhandlerens klargøring er ofte en overfladebehandling.",
      "Sæder, rat og ventilationsanlæg gemmer mest fra den forrige ejer.",
      "Sæderens og AC-rengøring giver mest for pengene i en brugt bil.",
      "En frisk start gør det lettere at holde bilen pæn fremover.",
    ],
    sections: [
      {
        heading: "Hvad gemmer en brugt bil på?",
        paragraphs: [
          "Sæderne har suget års hudfedt, sved og spild til sig. Rattet og gearknoppen har et lag fra andres hænder. I ventilationsanlægget sidder støv og eventuelt røg. Under sæderne ligger mønter, legetøj og krummer.",
          "Meget af det kan man ikke se. Men man kan mærke det – på lugten, og på at kabinen ikke føles frisk.",
        ],
      },
      {
        heading: "De fire vigtigste behandlinger",
        paragraphs: [
          "Skal du prioritere, er det disse fire, der flytter mest.",
          "Indvendig rengøring med støvsugning i bund og aftørring af alle flader. Sæderens, der trækker det gamle snavs op af stoffet – eller læderpleje, hvis sæderne er i læder. AC-rengøring, så luften, du indånder, kommer gennem et rent anlæg. Og lugtfjernelse, hvis der har været røget i bilen.",
        ],
      },
      {
        heading: "Udvendigt: start med et rent udgangspunkt",
        paragraphs: [
          "Få bilen vasket grundigt i hånden og vokset. Så kan du se lakkens reelle stand: stenslag, ridser og mærker, som en hurtig forhandlervask og lidt glansmiddel kan have skjult.",
          "Det er også det bedste tidspunkt at fjerne forhandlerens klistermærke, mens du alligevel er i gang.",
        ],
      },
      {
        heading: "Det, vi ikke kan klare",
        paragraphs: [
          "Kabinefilteret bør skiftes – det gør et værksted ved første service. Er der fugt i tæpperne eller en lugt, der ikke forsvinder, kan der være en utæthed, som skal findes. Og ridser i lakken kræver polering.",
          "Til en nykøbt brugt bil anbefaler vi pakken Hele bilen med sæderens og AC-rengøring. Så er både kabine, sæder, luft og lak startet forfra.",
        ],
      },
    ],
    faqs: [
      {
        question: "Skal en brugt bil rengøres, når forhandleren har klargjort den?",
        answer: "Det er en god idé. En forhandlerklargøring er ofte overfladisk, og sæder og ventilationsanlæg bliver sjældent renset.",
      },
      {
        question: "Hvordan fjerner man lugten af den forrige ejer?",
        answer: "Med grundig indvendig rengøring, sæderens og AC-rengøring. Har der været røget, kan lugtfjernelse lægges til.",
      },
      {
        question: "Hvad koster det hos CleanWash?",
        answer: "Hele bilen koster fra 799 kr. Sæderens og AC-rengøring koster 300 kr. hver som tilvalg.",
      },
      {
        question: "Bør kabinefilteret skiftes?",
        answer: "Ja. Det er billigt og gøres af et værksted, typisk ved service.",
      },
    ],
    relatedPosts: ["duftfrisker-eller-lugtfjernelse", "blankt-og-fedtet-rat"],
    relatedLinks: [
      { label: "Sæderens af bil", href: route("/saederens-bil") },
      { label: "Aircondition rens", href: route("/aircondition-rens-bil") },
      { label: "Komplet bilvask", href: route("/komplet-bilvask") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "bil-der-har-staaet-stille-laenge",
    title: "Bil, der har stået stille længe: sådan får du den frisk igen",
    metaTitle: "Bil der har stået stille længe – rengøring",
    description:
      "En bil, der har holdt stille i måneder, samler støv, alger, fugt og dårlig lugt. Se hvad der skal gøres udvendigt og indvendigt, før den er klar igen.",
    category: "Viden om bilvask",
    keywords: ["bil har stået stille længe", "bil stillestående rengøring", "bil efter vinteropbevaring", "muggen lugt stillestående bil", "alger på bil"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/service/udenfor.jpg", alt: "Udvendig vask af bil, der har holdt stille længe" },
    intro: [
      "En bil har ikke godt af at stå stille. Efter et par måneder under et træ eller i en carport er den grøn i kanterne, grå af støv og indelukket indeni.",
      "Det meste kan bringes tilbage med en grundig omgang. Her er rækkefølgen.",
    ],
    keyTakeaways: [
      "Stillestående biler samler mere snavs end biler, der kører.",
      "Fugt i kabinen er det største problem – den giver mug og lugt.",
      "Start udvendigt med forvask, så det gamle lag blødes op.",
      "Batteri, dæk og bremser er værkstedets område – ikke bilvaskens.",
    ],
    sections: [
      {
        heading: "Hvad sker der med en bil, der holder stille?",
        paragraphs: [
          "Udvendigt lægger støv, blade, harpiks og fugleklatter sig i lag. Uden regn og fart bliver de siddende. I skygge gror der alger i lister, omkring ruder og på gummikanter. Bremseskiverne får et lag rust.",
          "Indvendigt bliver luften stående. Fugt, der kom ind sidst bilen blev brugt, kan ikke komme ud. Den sætter sig i tæpper og sæder, og efter nogle uger lugter kabinen muggent.",
        ],
      },
      {
        heading: "Udvendigt: blød op før du vasker",
        paragraphs: [
          "Det gamle lag er tørt og hårdt. Skyl bilen grundigt, læg skum på, og lad det arbejde. Gentag gerne. Først når laget er blødt op, vaskes bilen i hånden.",
          "Rens afløbene ved forruden og i dørkarmene for blade. Fjern alger fra lister og kanter med en blød børste. Fugleklatter og harpiks, der har siddet i måneder, kan have efterladt mærker i lakken, som ikke går af i vask.",
        ],
      },
      {
        heading: "Indvendigt: fugten skal ud",
        paragraphs: [
          "Åbn alle døre, og lad bilen lufte ud en tør dag. Tag måtterne ud. Støvsug alt, og tør alle flader af. Er der hvide eller grønne belægninger på sæder, rat eller seler, er det skimmel, og så skal tekstilerne renses i dybden.",
          "En AC-rengøring er en god idé. Anlægget har stået med fugt og støv i lang tid og lugter ofte, første gang det tændes.",
        ],
      },
      {
        heading: "Skal bilen stå stille igen?",
        paragraphs: [
          "Så vask og voks den først, og gør kabinen ren og helt tør. Lad ikke mad, drikke eller våde ting ligge. Stil gerne en affugter i kabinen, og luft ud en gang imellem.",
          "Batteri, dæktryk og bremser hører under værkstedet. Kører bilen mærkeligt efter en lang pause, så få den tjekket.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvorfor lugter en bil, der har stået stille?",
        answer: "Fordi fugt i kabinen ikke kan komme væk. Den giver mug i tæpper, sæder og ventilationsanlæg.",
      },
      {
        question: "Kan grønne alger på bilen vaskes af?",
        answer: "Ja. De fjernes med forvask, shampoo og en blød børste i lister og kanter.",
      },
      {
        question: "Er rust på bremseskiverne farligt?",
        answer: "Et tyndt lag overfladerust forsvinder ved de første opbremsninger. Bliver bremserne ved med at larme eller ryste, skal et værksted se på dem.",
      },
      {
        question: "Hvilken pakke anbefaler I til en bil, der har stået længe?",
        answer: "Hele bilen, gerne med AC-rengøring og tilvalget ekstra beskidt, hvis kabinen er hårdt ramt.",
      },
    ],
    relatedPosts: ["fjern-skimmel-i-bilen", "lugt-fra-aircondition"],
    relatedLinks: [
      { label: "Komplet bilvask", href: route("/komplet-bilvask") },
      { label: "Aircondition rens", href: route("/aircondition-rens-bil") },
      { label: "Bilvask Sorø", href: route("/bilvask-soroe") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
];
