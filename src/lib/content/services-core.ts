import { servicePage, type ContentPage } from "./types";

// Kernesider: de brede søgninger, som beskriver selve ydelsen.
export const servicesCore: ContentPage[] = [
  servicePage({
    slug: "bilvask-hjemme",
    title: "Bilvask hjemme – vi vasker bilen på din adresse",
    description:
      "Få bilvask hjemme hos dig selv. Vi kommer til din adresse med eget vand og strøm og vasker bilen ude og inde. Udvendig vask fra 450 kr. Book online.",
    h1: "Bilvask hjemme",
    eyebrow: "Bilvask på din adresse",
    intro:
      "Bilvask hjemme betyder, at du ikke skal nogen steder. Vi kommer til din adresse, har vand og strøm med og vasker bilen, mens du bruger tiden på noget andet.",
    answer:
      "Hos CleanWash kan du bestille bilvask hjemme i København og på Sjælland. Vi kommer til din adresse med eget vand, strøm og udstyr. Udvendig bilvask koster fra 450 kr., indvendig rengøring fra 600 kr. og hele bilen fra 799 kr. Du betaler, når bilen er færdig.",
    sections: [
      {
        h: "Sådan foregår bilvask hjemme",
        p: [
          "Du booker online. Når du taster nummerpladen, finder systemet bilens størrelse, og du ser prisen med det samme. Du vælger en pakke, eventuelle tilvalg og et tidspunkt, der passer dig.",
          "På dagen kommer vi kørende med alt, hvad der skal bruges. Bilen vaskes dér, hvor den holder: i indkørslen, i carporten, på vejen foran huset eller på p-pladsen ved din lejlighed. Når vi er færdige, får du besked og betaler.",
        ],
      },
      {
        h: "Du skal ikke stille noget til rådighed",
        p: [
          "Det mest almindelige spørgsmål om bilvask hjemme er, om vi skal låne vand og strøm. Det skal vi ikke. Vi har begge dele med, og derfor kan vi også vaske biler ved lejligheder, rækkehuse og andre steder, hvor der ikke er en udendørs hane.",
          "Det eneste, vi har brug for, er adgang til bilen. Den skal holde lovligt, og vi skal kunne komme rundt om den. Ved indvendig rengøring skal vi kunne åbne den.",
        ],
        list: [
          "Ingen haveslange eller forlængerledning",
          "Du behøver ikke at være hjemme ved udvendig vask",
          "Vi rydder op efter os",
          "Betaling, når opgaven er udført",
        ],
      },
      {
        h: "Hvad kan du få lavet derhjemme?",
        p: [
          "Alt, hvad vi tilbyder, kan udføres på din adresse. Udvendig bilvask omfatter forvask med skum, håndvask, fælge, hjulbuer, ruder og aftørring. Indvendig rengøring omfatter støvsugning af kabine og bagagerum, aftørring af flader og paneler og pudsning af ruder indefra.",
          "Pakken Hele bilen samler begge dele og slutter med voks på lakken. Derudover kan du vælge tilvalg som sæderens, læderpleje, fjernelse af dyrehår, lugtfjernelse, fælgrens og motorvask.",
        ],
      },
      {
        h: "Hvorfor vælge bilvask hjemme frem for vaskehal?",
        p: [
          "Den oplagte grund er tid. En tur i vaskehal koster nemt en time med kørsel, kø og vask. Bilvask hjemme koster dig de to minutter, det tager at booke.",
          "Den anden grund er resultatet. En vaskehal har få minutter pr. bil og børster, der rammer ens hver gang. En håndvask tager den tid, bilen har brug for, og kommer ind i karme, lister og hjørner. Og så bliver bilen også rengjort indvendigt, hvis du vil – det kan en vaskehal ikke.",
        ],
      },
    ],
    faqs: [
      {
        q: "Skal I bruge mit vand eller min strøm?",
        a: "Nej. Vi medbringer selv både vand og strøm, så du skal ikke stille noget til rådighed.",
      },
      {
        q: "Hvad koster bilvask hjemme?",
        a: "Udvendig bilvask koster 450–899 kr., indvendig rengøring 600–899 kr. og hele bilen 799–1.500 kr. Prisen afhænger af bilens størrelse og vises, når du har tastet nummerpladen.",
      },
      {
        q: "Skal jeg være hjemme, mens bilen bliver vasket?",
        a: "Ikke ved en udvendig vask. Ved indvendig rengøring skal vi have adgang til kabinen, så vi aftaler, hvordan vi får nøglen.",
      },
      {
        q: "Kan I vaske bilen, hvis jeg bor i lejlighed?",
        a: "Ja. Fordi vi har vand og strøm med, kan vi vaske bilen på gaden, i gården eller på p-pladsen, når den holder lovligt, og vask er tilladt på stedet.",
      },
      {
        q: "Hvor i landet tilbyder I bilvask hjemme?",
        a: "I København, Storkøbenhavn og store dele af Sjælland. Bookingen viser de ledige tider for din adresse.",
      },
    ],
    keywords: ["bilvask hjemme", "bilvask på adressen", "bilvask derhjemme", "få vasket bil hjemme", "mobil bilvask"],
    image: { src: "/service/helebil.jpg", alt: "Bilvask hjemme i indkørslen udført af CleanWash" },
    related: [
      "/mobil-bilvask",
      "/bilvask-lejlighed",
      "/bilvask-paa-arbejdspladsen",
      "/komplet-bilvask",
      "/bilvask-priser",
      "/serviceomraader",
    ],
    pkg: "whole",
  }),

  servicePage({
    slug: "mobil-bilvask",
    title: "Mobil bilvask – vi kommer med vand og strøm",
    description:
      "Mobil bilvask i København og på Sjælland. Vi kører ud til dig med eget vand, strøm og udstyr og vasker bilen i hånden. Fra 450 kr. – betal bagefter.",
    h1: "Mobil bilvask",
    eyebrow: "Bilvasken, der kommer til dig",
    intro:
      "Mobil bilvask er en bilvask på hjul. I stedet for at du kører bilen hen til vasken, kører vasken hen til bilen – med alt, hvad der skal bruges.",
    answer:
      "Mobil bilvask betyder, at bilen bliver vasket der, hvor den holder. CleanWash kører ud i København og på Sjælland med eget vand, strøm og udstyr og vasker bilen i hånden. Priserne begynder ved 450 kr. for udvendig vask og 799 kr. for hele bilen.",
    sections: [
      {
        h: "Hvad er mobil bilvask?",
        p: [
          "En mobil bilvask er en professionel bilvask, der udføres på kundens adresse i stedet for i en hal. Vaskeren kommer i en bil udstyret med vandtank, strøm, sæbe, klude, støvsuger og resten af udstyret.",
          "Ydelsen er den samme som hos en håndvask: forvask, vask, fælge, aftørring og – hvis du ønsker det – indvendig rengøring. Forskellen er, at det sker hos dig.",
        ],
      },
      {
        h: "Hvor kan en mobil bilvask udføres?",
        p: [
          "Fordi vi selv har vand og strøm med, er der få begrænsninger. Bilen skal holde lovligt, vi skal kunne komme rundt om den, og bilvask skal være tilladt på stedet.",
        ],
        list: [
          "I indkørslen eller carporten",
          "På vejen foran boligen",
          "På p-pladsen ved lejligheden eller rækkehuset",
          "På arbejdspladsens parkering",
          "Ved sommerhuset",
          "I gårde, p-huse og p-kældre efter aftale",
        ],
      },
      {
        h: "Hvad koster mobil bilvask?",
        p: [
          "Prisen afhænger af pakken og bilens størrelse. En lille bil koster 450 kr. for udvendig vask, 600 kr. for indvendig rengøring og 799 kr. for hele bilen. En mellemklassebil koster 600, 700 og 899 kr. En stor bil eller SUV koster 699, 799 og 999 kr.",
          "Du ser den præcise pris, når du har indtastet nummerpladen i bookingen. Alle priser er inklusive moms, og du betaler først, når bilen er vasket.",
        ],
      },
      {
        h: "Hvem er mobil bilvask til?",
        p: [
          "Til dig, der ikke har tid til at køre i vaskehal. Til dig, der bor i lejlighed uden mulighed for at vaske selv. Til familien med to biler og fyldte weekender. Til dig, der vil have bilen vasket i hånden uden selv at stå med svampen.",
          "Og til virksomheder: firmabiler, varevogne og medarbejdernes biler kan vaskes på virksomhedens p-plads, mens folk arbejder.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvordan virker mobil bilvask?",
        a: "Du booker online, og vi kommer til din adresse med vand, strøm og udstyr. Bilen vaskes i hånden på stedet, og du betaler, når den er færdig.",
      },
      {
        q: "Har I selv vand med?",
        a: "Ja. Vi medbringer både vand og strøm og behøver ikke adgang til din vandhane eller stikkontakt.",
      },
      {
        q: "Er mobil bilvask dyrere end en vaskehal?",
        a: "En mobil håndvask koster mere end den billigste automatvask, fordi der bruges en times håndarbejde på bilen. Til gengæld sparer du transporten, og bilen vaskes mere grundigt.",
      },
      {
        q: "Hvor lang tid tager en mobil bilvask?",
        a: "Udvendig vask cirka 65 minutter, indvendig rengøring cirka 75 minutter og hele bilen cirka 110 minutter.",
      },
      {
        q: "Hvad sker der, hvis det regner?",
        a: "Let regn er sjældent et problem. Er vejret for dårligt til et godt resultat, kontakter vi dig og finder en ny tid.",
      },
    ],
    keywords: ["mobil bilvask", "mobil bilvask Sjælland", "mobil bilvask pris", "bilvask der kommer til dig", "mobil bilpleje"],
    image: { src: "/service/udenfor.jpg", alt: "Mobil bilvask udført på kundens adresse" },
    related: [
      "/bilvask-hjemme",
      "/mobil-bilvask-koebenhavn",
      "/mobil-bilvask-vs-vaskehal",
      "/bilvask-paa-arbejdspladsen",
      "/bilvask-priser",
      "/bilvask-faq",
    ],
    pkg: "outside",
  }),

  servicePage({
    slug: "bilvask-paa-arbejdspladsen",
    title: "Bilvask på arbejdspladsen – ren bil til fyraften",
    description:
      "Få bilen vasket på jobbets p-plads, mens du arbejder. Vi kommer med vand og strøm. Udvendig vask fra 450 kr. – uden at du forlader skrivebordet.",
    h1: "Bilvask på arbejdspladsen",
    eyebrow: "Mens du arbejder",
    intro:
      "Bilen holder stille otte timer om dagen på firmaets p-plads. Det er det perfekte tidspunkt at få den vasket – du mærker det først, når du kører hjem.",
    answer:
      "CleanWash vasker din bil på arbejdspladsens p-plads i København og på Sjælland. Vi har vand og strøm med, og ved en udvendig vask skal du ikke forlade arbejdet. Udvendig bilvask koster fra 450 kr., hele bilen fra 799 kr.",
    sections: [
      {
        h: "Brug de timer, bilen alligevel står stille",
        p: [
          "De fleste biler kører en time om dagen og holder parkeret resten. Weekenden er fyldt op, og aftenerne er korte. Arbejdsdagen er det eneste tidspunkt, hvor bilen står helt stille i mange timer – og hvor det ikke koster dig fritid at få den vasket.",
          "Du booker en tid inden for din arbejdsdag og parkerer som normalt. Vi finder bilen ud fra nummerpladen og din beskrivelse af p-pladsen.",
        ],
      },
      {
        h: "Det skal være i orden med arbejdsgiveren",
        p: [
          "P-pladsen tilhører virksomheden eller udlejeren, så spørg, inden du booker første gang. De fleste siger ja – det er trods alt en service til en medarbejder, som ikke koster virksomheden noget.",
          "Ved udvendig vask rører vi ikke ved bilens indre, og du skal ikke aflevere nøglen. Skal bilen rengøres indvendigt, kommer du kort ned og låser op, eller vi aftaler en anden løsning.",
        ],
      },
      {
        h: "Flere kolleger på samme dag",
        p: [
          "Er I flere, der vil have vasket bil, kan vi tage bilerne efter hinanden på samme p-plads. Det er effektivt for os og praktisk for jer. Mange steder begynder det med én kollega og bliver hurtigt til en fast dag om måneden.",
          "Vil virksomheden selv stå for ordningen som et personalegode, laver vi en samlet aftale.",
        ],
      },
    ],
    faqs: [
      {
        q: "Skal jeg aflevere bilnøglen?",
        a: "Ikke ved udvendig vask. Ved indvendig rengøring skal bilen låses op, så vi aftaler, hvordan det sker.",
      },
      {
        q: "Hvad hvis min arbejdsgiver siger nej?",
        a: "Så kan vi vaske bilen hjemme hos dig i stedet – også i weekenden.",
      },
      {
        q: "Hvordan finder I min bil på en stor p-plads?",
        a: "Ud fra nummerplade, mærke og farve. Skriv gerne række eller område i bemærkningsfeltet.",
      },
      {
        q: "Kan virksomheden betale for medarbejdernes bilvask?",
        a: "Ja. Vi laver aftaler, hvor virksomheden betaler helt eller delvist. Læs mere under bilvask som personalegode.",
      },
      {
        q: "Hvor lang tid holder bilen optaget?",
        a: "Cirka 65 minutter ved udvendig vask og cirka 110 minutter ved hele bilen.",
      },
    ],
    keywords: ["bilvask på arbejdspladsen", "bilvask på arbejde", "bilvask firmaparkering", "bilvask i arbejdstiden"],
    image: { src: "/service/udenfor.jpg", alt: "Bilvask på arbejdspladsens parkeringsplads" },
    related: [
      "/bilvask-personalegode",
      "/bilvask-hjemme",
      "/mobil-bilvask",
      "/erhvervs-bilvask",
      "/bilvask-ballerup",
      "/bilvask-priser",
    ],
    pkg: "outside",
  }),

  servicePage({
    slug: "bilvask-lejlighed",
    title: "Bilvask når du bor i lejlighed – uden vandhane",
    description:
      "Bor du i lejlighed uden mulighed for at vaske bil? Vi kommer til gaden, gården eller p-pladsen med eget vand og strøm. Udvendig vask fra 450 kr.",
    h1: "Bilvask, når du bor i lejlighed",
    eyebrow: "Ingen have, ingen slange – intet problem",
    intro:
      "Bor du på tredje sal, har du hverken vandhane, stikkontakt eller indkørsel. Derfor har vi det hele med – og vasker bilen dér, hvor du har parkeret.",
    answer:
      "Ja, du kan få vasket bil, selvom du bor i lejlighed. CleanWash medbringer eget vand og strøm og vasker bilen på gaden, i gården eller på p-pladsen, når den holder lovligt, og vask er tilladt på stedet. Udvendig bilvask koster fra 450 kr.",
    sections: [
      {
        h: "Lejlighedsbeboerens bilvask-problem",
        p: [
          "I et hus kan man trække slangen frem. I en lejlighed er der tre muligheder: en vaskehal med børster, en selvvaskehal, hvor du selv står med lansen, eller slet ingen vask. De fleste ender med det sidste i længere perioder, end de bryder sig om.",
          "Mobil bilvask er den fjerde mulighed. Den kræver ikke, at du har noget som helst – ud over en bil og et sted, den holder.",
        ],
      },
      {
        h: "Hvor kan bilen stå?",
        p: [
          "De fleste lejlighedsbiler holder ét af fire steder. Sådan forholder vi os til dem.",
        ],
        list: [
          "Gaden: Bilen skal holde lovligt, og der skal være plads til at arbejde ved siden af den.",
          "Gården: Tjek, at ejer- eller andelsforeningen tillader bilvask i gården.",
          "Privat p-plads ved ejendommen: Som regel uproblematisk. Oplys pladsnummer.",
          "P-kælder: Kan ofte lade sig gøre. Skriv det i bookingen, så vi kan afklare adgang og regler.",
        ],
      },
      {
        h: "Tjek foreningens regler én gang",
        p: [
          "Nogle foreninger har regler for brug af fællesarealer. Det er dit ansvar som beboer at sikre, at bilvask er tilladt, hvor bilen holder. Et hurtigt spørgsmål til bestyrelsen eller et kig i husordenen er nok – og så ved du det fremover.",
        ],
      },
      {
        h: "Indvendig rengøring er lige så vigtig",
        p: [
          "Uden adgang til en støvsuger ved bilen bliver kabinen sjældent gjort ren. Krummer, støv og sand hober sig op. Ved en indvendig rengøring støvsuger vi sæder, gulv, måtter og bagagerum og tørrer alle flader af. Det er ofte dét, lejlighedsbeboere lægger mest mærke til bagefter.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan I vaske bilen, når den holder på gaden?",
        a: "Ja, hvis den holder lovligt, og vi kan komme til den. Vi har selv vand og strøm med.",
      },
      {
        q: "Skal jeg trække en ledning ned fra lejligheden?",
        a: "Nej. Vi bruger hverken din strøm eller dit vand.",
      },
      {
        q: "Må man vaske bil i gården?",
        a: "Det afgør din forening. Tjek husordenen, eller spørg bestyrelsen, inden du booker.",
      },
      {
        q: "Kan I vaske i en p-kælder?",
        a: "Ofte ja. Det afhænger af kælderens regler og pladsforholdene. Skriv det i bemærkningsfeltet, så afklarer vi det.",
      },
      {
        q: "Hvad koster det?",
        a: "Det samme som alle andre steder: udvendig vask fra 450 kr., indvendig rengøring fra 600 kr. og hele bilen fra 799 kr.",
      },
    ],
    keywords: ["bilvask lejlighed", "bilvask uden vandhane", "bilvask på gaden", "bilvask i gården", "bilvask p-kælder"],
    image: { src: "/service/udenfor.jpg", alt: "Bilvask af bil parkeret på gaden foran lejligheder" },
    related: [
      "/bilvask-hjemme",
      "/bilvask-storkoebenhavn",
      "/bilvask-boligforening",
      "/bilvask-indre-by",
      "/bilvask-noerrebro",
      "/indvendig-bilrengoering-koebenhavn",
    ],
    pkg: "outside",
  }),

  servicePage({
    slug: "komplet-bilvask",
    title: "Komplet bilvask – ude og inde fra 799 kr.",
    description:
      "Komplet bilvask med udvendig håndvask, indvendig rengøring og voks i ét besøg. Hele bilen fra 799 kr. Vi kommer til dig med vand og strøm.",
    h1: "Komplet bilvask",
    eyebrow: "Pakken Hele bilen",
    intro:
      "En komplet bilvask er både ude og inde – i ét besøg. Hos os hedder pakken Hele bilen, og den slutter med voks på lakken.",
    answer:
      "Komplet bilvask hos CleanWash hedder Hele bilen. Pakken omfatter udvendig håndvask, indvendig rengøring og voks og tager cirka 110 minutter. Prisen er 799 kr. for en lille bil, 899 kr. for en mellemklassebil, 999 kr. for en stor bil og 1.500 kr. for en varevogn.",
    sections: [
      {
        h: "Det får du i en komplet bilvask",
        p: [
          "Hele bilen er pakken, der tager det hele på én gang. Du behøver ikke at tage stilling til, hvad bilen mangler.",
        ],
        list: [
          "Forvask med skum og håndvask af hele karrosseriet",
          "Rengøring af fælge, dæksider og hjulbuer",
          "Ruder og spejle pudset ude og inde",
          "Støvsugning af sæder, gulv, måtter og bagagerum",
          "Aftørring af instrumentbræt, konsol og dørpaneler",
          "Voks på lakken",
        ],
      },
      {
        h: "Hvornår skal du vælge komplet frem for kun udvendig?",
        p: [
          "Vælg komplet bilvask, første gang du får bilen vasket hos os, når det er længe siden sidst, når årstiden skifter, og når bilen skal bruges til noget særligt: salg, aflevering af leasingbil, ferie eller fest.",
          "Imellem de komplette vaske kan du nøjes med en udvendig bilvask. En god rytme for de fleste er komplet bilvask fire gange om året og udvendig vask cirka en gang om måneden.",
        ],
      },
      {
        h: "Hvad koster det – og hvad sparer du?",
        p: [
          "Køber du udvendig vask og indvendig rengøring hver for sig, koster det 1.050 kr. for en lille bil og 1.300 kr. for en mellemklassebil. Som komplet bilvask koster det 799 og 899 kr. – og voksen følger med.",
          "Tilvalg som sæderens, læderpleje og fælgrens kan lægges oveni, hvis bilen har særlige behov.",
        ],
      },
      {
        h: "Voks er med i prisen",
        p: [
          "Voks lægger et tyndt, beskyttende lag oven på klarlakken. Det giver dybere glans, får vand til at perle af og gør det sværere for snavs, salt og fugleklatter at bide sig fast. Mange steder er voks et tilkøb. I Hele bilen er det inkluderet.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster en komplet bilvask?",
        a: "799 kr. for en lille bil, 899 kr. for en mellemklassebil, 999 kr. for en stor bil eller SUV og 1.500 kr. for en varevogn.",
      },
      {
        q: "Hvor lang tid tager en komplet bilvask?",
        a: "Cirka 110 minutter. Tilvalg som sæderens kan lægge lidt tid oveni.",
      },
      {
        q: "Er voks inkluderet?",
        a: "Ja. Voks på lakken er en fast del af pakken Hele bilen.",
      },
      {
        q: "Er sæderens med i en komplet bilvask?",
        a: "Sæderne støvsuges. Dybdegående sæderens er et tilvalg til 300 kr. for op til fem sæder.",
      },
      {
        q: "Hvor ofte bør man få en komplet bilvask?",
        a: "Cirka fire gange om året passer til de fleste – typisk ved hvert årstidsskifte.",
      },
    ],
    keywords: ["komplet bilvask", "bilvask indvendig og udvendig", "hele bilen vask", "komplet bilvask pris", "komplet bilrengøring"],
    image: { src: "/service/helebil.jpg", alt: "Komplet bilvask med udvendig vask og indvendig rengøring" },
    related: [
      "/bilvask-med-voks",
      "/udvendig-bilvask-koebenhavn",
      "/indvendig-bilrengoering-koebenhavn",
      "/bilvask-priser",
      "/saederens-bil",
      "/bilvask-hjemme",
    ],
    pkg: "whole",
  }),

  servicePage({
    slug: "bilrengoering",
    title: "Bilrengøring – professionel rengøring af bilen",
    description:
      "Professionel bilrengøring på din adresse. Støvsugning, aftørring, ruder, sæderens og lugtfjernelse. Indvendig bilrengøring fra 600 kr. Book online.",
    h1: "Bilrengøring",
    eyebrow: "Ren kabine, frisk bil",
    intro:
      "Bilrengøring handler om det, du sidder i hver dag. Vi gør kabinen ren fra forrude til bagagerum – hjemme hos dig.",
    answer:
      "CleanWash tilbyder professionel bilrengøring på din adresse i København og på Sjælland. Indvendig bilrengøring koster fra 600 kr. og tager cirka 75 minutter. Tilvalg som sæderens, læderpleje, dyrehår og lugtfjernelse kan lægges til efter behov.",
    sections: [
      {
        h: "Hvad er forskellen på bilvask og bilrengøring?",
        p: [
          "I daglig tale bruges ordene i flæng. Hos os dækker bilvask det udvendige – lak, fælge og ruder – mens bilrengøring er det indvendige: sæder, gulv, flader og bagagerum. Vil du have begge dele, hedder pakken Hele bilen.",
        ],
      },
      {
        h: "Det indgår i en indvendig bilrengøring",
        p: [
          "En grundig bilrengøring følger en fast rækkefølge, så intet bliver glemt, og snavs ikke flyttes fra ét sted til et andet.",
        ],
        list: [
          "Måtterne tages ud og rengøres for sig",
          "Sæder, gulv og bagagerum støvsuges – også under og mellem sæderne",
          "Instrumentbræt, rat, midterkonsol og dørpaneler tørres af",
          "Handskerum, kopholdere og dørlommer rengøres",
          "Ruderne pudses indvendigt",
        ],
      },
      {
        h: "Når almindelig rengøring ikke er nok",
        p: [
          "Nogle biler har brug for mere end støvsuger og klud. Pletter i sæderne kræver en våd rens. Hår fra hund eller kat skal løsnes mekanisk. Røglugt sidder i tekstiler og ventilationsanlæg. Og læder skal både renses og plejes for ikke at tørre ud.",
          "Derfor kan du vælge tilvalg, så du kun betaler for det, bilen har brug for. Priserne står i oversigten længere nede på siden.",
        ],
      },
      {
        h: "Hvor ofte skal bilen rengøres indvendigt?",
        p: [
          "Fire til seks gange om året er passende for en almindelig hverdagsbil. Har du børn, hund eller spiser du ofte i bilen, er hver anden måned bedre. En ren kabine er ikke kun pænere. Rene ruder giver bedre udsyn, og mindre støv giver bedre luft – det mærkes især, hvis du har allergi.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster bilrengøring?",
        a: "Indvendig bilrengøring koster 600 kr. for en lille bil, 700 kr. for en mellemklassebil, 799 kr. for en stor bil og 899 kr. for en varevogn.",
      },
      {
        q: "Hvor lang tid tager en indvendig bilrengøring?",
        a: "Cirka 75 minutter uden tilvalg.",
      },
      {
        q: "Vasker I sæderne?",
        a: "Sæderne støvsuges i standardpakken. Våd sæderens er et tilvalg til 300 kr. for op til fem sæder.",
      },
      {
        q: "Skal bilen være tømt på forhånd?",
        a: "Fjern værdigenstande og personlige ting. Vil du have os til at rydde affald og løse ting ud, kan tømning vælges til for 99 kr.",
      },
      {
        q: "Kan I fjerne dårlig lugt?",
        a: "Ja. Lugtfjernelse og AC-rengøring er tilvalg, der går efter lugtens kilde i tekstiler og ventilationsanlæg.",
      },
    ],
    keywords: ["bilrengøring", "indvendig bilrengøring", "professionel bilrengøring", "rengøring af bil", "kabinerengøring"],
    image: { src: "/service/inside.jpg", alt: "Professionel indvendig bilrengøring af kabine" },
    related: [
      "/indvendig-bilrengoering-pris",
      "/indvendig-bilrengoering-koebenhavn",
      "/saederens-bil",
      "/lugtfjernelse-bil",
      "/fjernelse-af-dyrehaar-bil",
      "/komplet-bilvask",
    ],
    pkg: "inside",
  }),

  servicePage({
    slug: "indvendig-bilrengoering-pris",
    title: "Indvendig bilrengøring pris – fra 600 kr.",
    description:
      "Hvad koster indvendig bilrengøring? Se priser for alle bilstørrelser og tilvalg som sæderens, læderpleje og dyrehår. Fra 600 kr. på din adresse.",
    h1: "Indvendig bilrengøring – pris",
    eyebrow: "Prisoversigt",
    intro:
      "Prisen på indvendig bilrengøring afhænger af to ting: hvor stor bilen er, og om der skal mere til end støvsugning og aftørring. Her er tallene.",
    answer:
      "Indvendig bilrengøring hos CleanWash koster 600 kr. for en lille bil, 700 kr. for en mellemklassebil, 799 kr. for en stor bil eller SUV og 899 kr. for en varevogn. Prisen er inklusive moms og kørsel til din adresse med eget vand og strøm.",
    sections: [
      {
        h: "Prisen efter bilens størrelse",
        p: [
          "En større kabine tager længere tid. Derfor er prisen delt i fire størrelser. Systemet finder selv den rigtige ud fra nummerpladen og bilens totalvægt, og du ser kategorien, før du bekræfter.",
        ],
        list: [
          "Lille bil (totalvægt op til 1.300 kg): 600 kr.",
          "Mellem bil (totalvægt over 1.300 kg): 700 kr.",
          "Stor bil (totalvægt over 2.000 kg): 799 kr.",
          "Varevogn (varebil eller over 2.500 kg): 899 kr.",
        ],
      },
      {
        h: "Hvad er med i prisen?",
        p: [
          "Grundprisen dækker en fuld indvendig rengøring: støvsugning af sæder, gulv, måtter og bagagerum, aftørring af instrumentbræt, konsol og dørpaneler, rengøring af handskerum og kopholdere samt pudsning af ruder indefra. Det tager cirka 75 minutter.",
        ],
      },
      {
        h: "Tilvalg og hvad de koster",
        p: [
          "Tilvalgene er til biler med særlige behov. Du vælger dem i bookingen, og de udføres i samme besøg.",
        ],
        list: [
          "Sæderens, op til fem sæder: 300 kr.",
          "Pletfjernelse fra bilsæde: 250 kr.",
          "Læderpleje af sæder: 399 kr.",
          "Fjernelse af dyrehår: 200 kr.",
          "Fjernelse af røglugt: 300 kr.",
          "AC-rengøring: 300 kr.",
          "Vinylpleje: 249 kr.",
          "Rens af børnesæde: 100 kr.",
          "Ekstra beskidt bil: 299 kr.",
        ],
      },
      {
        h: "Er det billigere at tage hele bilen?",
        p: [
          "Ja, hvis bilen også trænger udvendigt. Hele bilen koster 799 kr. for en lille bil – altså 199 kr. mere end indvendig rengøring alene – og så får du både udvendig håndvask og voks med.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster indvendig rengøring af en almindelig personbil?",
        a: "700 kr. for en mellemklassebil, altså en personbil med en totalvægt mellem 1.300 og 2.000 kg.",
      },
      {
        q: "Hvad koster sæderens oveni?",
        a: "300 kr. for op til fem sæder.",
      },
      {
        q: "Er moms og kørsel med i prisen?",
        a: "Ja. Priserne er inklusive moms. Hvis der gælder et kørselstillæg for en adresse langt fra vores ruter, vises det i prisen, før du bekræfter.",
      },
      {
        q: "Koster det ekstra, hvis bilen er meget beskidt?",
        a: "Er bilen meget tilsmudset, vælger du tilvalget ekstra beskidt til 299 kr. Det giver den ekstra tid, opgaven kræver.",
      },
      {
        q: "Hvornår betaler jeg?",
        a: "Når rengøringen er udført – typisk med MobilePay.",
      },
    ],
    keywords: ["indvendig bilrengøring pris", "hvad koster indvendig rengøring af bil", "bilrengøring pris", "indvendig bilvask pris"],
    image: { src: "/service/inside.jpg", alt: "Indvendig bilrengøring – prisoversigt" },
    related: [
      "/bilrengoering",
      "/bilvask-priser",
      "/komplet-bilvask",
      "/saederens-bil",
      "/laederpleje-bil",
      "/indvendig-bilrengoering-koebenhavn",
    ],
    pkg: "inside",
  }),

  servicePage({
    slug: "bilvask-med-voks",
    title: "Bilvask med voks – inkluderet i Hele bilen",
    description:
      "Bilvask med voks beskytter lakken og giver dybere glans. Hos CleanWash er voks inkluderet i pakken Hele bilen fra 799 kr. Vi kommer til dig.",
    h1: "Bilvask med voks",
    eyebrow: "Glans og beskyttelse",
    intro:
      "Vask gør bilen ren. Voks holder den ren længere. Hos os følger voksen med, når du vælger Hele bilen.",
    answer:
      "CleanWash tilbyder bilvask med voks som en del af pakken Hele bilen. Den omfatter udvendig håndvask, indvendig rengøring og voks på lakken og koster fra 799 kr. Voksen beskytter mod salt, sol, harpiks og fugleklatter og holder typisk to til tre måneder.",
    sections: [
      {
        h: "Hvad gør voks ved lakken?",
        p: [
          "Bilens lak er dækket af et gennemsigtigt lag klarlak. Det er dét, der giver glans, og dét, der beskytter farven. Klarlakken er hård, men ikke uforgængelig: sol, syre fra fugleklatter, salt og vaskeridser slider på den.",
          "Voks lægger et ekstra lag ovenpå. Laget er blødt og midlertidigt, og det er netop pointen. Det er voksen, der bliver slidt, i stedet for lakken. Når den er væk, lægger man et nyt lag.",
        ],
      },
      {
        h: "Det mærker du i hverdagen",
        p: [
          "En vokset bil opfører sig anderledes end en uvokset.",
        ],
        list: [
          "Vand samler sig i perler og løber af i stedet for at ligge som en hinde",
          "Snavs og vejfilm hæfter dårligere, så næste vask er lettere",
          "Fugleklatter og harpiks kan fjernes, inden de når ned i lakken",
          "Farven ser dybere ud, især på mørke biler",
        ],
      },
      {
        h: "Hvor længe holder voks?",
        p: [
          "To til tre måneder er realistisk for en bil, der holder ude og bruges dagligt. Tæt på kysten, om vinteren med salt på vejene, og hvis bilen jævnligt kører i børstevask, holder den kortere.",
          "En enkel test: hæld lidt vand på motorhjelmen. Samler det sig i runde perler, virker voksen. Flyder det ud i en flad sø, er det tid til et nyt lag.",
        ],
      },
      {
        h: "Voks eller keramisk coating?",
        p: [
          "Keramisk coating er et hårdt, kemisk lag, der holder i år og kræver grundigt forarbejde. Voks er den enkle og billige løsning, som fornyes nogle gange om året. For de fleste hverdagsbiler er regelmæssig voks rigeligt – og den er med i prisen, hver gang du vælger Hele bilen.",
        ],
      },
    ],
    faqs: [
      {
        q: "Koster voks ekstra?",
        a: "Nej, ikke i pakken Hele bilen. Her er voks inkluderet i prisen fra 799 kr.",
      },
      {
        q: "Hvor ofte skal bilen vokses?",
        a: "Tre til fire gange om året passer til de fleste. Ved kysten og om vinteren gerne lidt oftere.",
      },
      {
        q: "Kan en ny bil få voks?",
        a: "Ja. En ny bil har godt af beskyttelse fra første dag.",
      },
      {
        q: "Må en bil med keramisk coating få voks?",
        a: "Det er ikke nødvendigt og kan ændre coatingens egenskaber. Fortæl os i bookingen, hvis bilen er coatet.",
      },
      {
        q: "Hvordan ser jeg, om voksen stadig virker?",
        a: "Hæld vand på lakken. Perler det, virker voksen. Flyder det ud, er den slidt af.",
      },
    ],
    keywords: ["bilvask med voks", "voksbehandling bil", "voks bil pris", "bilvoks", "lakbeskyttelse"],
    image: { src: "/service/helebil.jpg", alt: "Bilvask med voks – blank lak efter behandling" },
    related: [
      "/komplet-bilvask",
      "/blog/hvor-laenge-holder-bilvoks",
      "/blog/keramisk-forsegling-eller-voks",
      "/bilvask-foer-vinter",
      "/udvendig-bilvask-koebenhavn",
      "/bilvask-priser",
    ],
    pkg: "whole",
  }),

  servicePage({
    slug: "bilvask-naer-mig",
    title: "Bilvask nær mig – den nærmeste er din egen adresse",
    description:
      "Søger du bilvask nær mig? Med mobil bilvask kommer vi til dig i København og på Sjælland. Se om vi dækker dit område, og book fra 450 kr.",
    h1: "Bilvask nær mig",
    eyebrow: "Tættere bliver det ikke",
    intro:
      "Når du søger efter bilvask i nærheden, leder du efter den korteste vej. Den korteste vej er nul meter: vi kommer til dig.",
    answer:
      "Den nærmeste bilvask er den, der kommer til din adresse. CleanWash tilbyder mobil bilvask i København, Storkøbenhavn og store dele af Sjælland. Vi har vand og strøm med. Tast din adresse i bookingen for at se ledige tider – udvendig vask fra 450 kr.",
    sections: [
      {
        h: "Dækker I mit område?",
        p: [
          "Vi kører i København, på Frederiksberg, i hele Storkøbenhavn og i store dele af Sjælland: Nordsjælland, Vestegnen, Køge Bugt, Roskilde og videre ud mod Holbæk, Ringsted, Slagelse og Næstved.",
          "Den sikreste måde at finde ud af det på er at begynde en booking. Når du har valgt pakke og tastet adressen, viser kalenderen de tider, vi kan være hos dig.",
        ],
      },
      {
        h: "Hvorfor afstand ikke er det vigtigste",
        p: [
          "En vaskehal 800 meter væk lyder nemt. Men turen består af mere end afstanden: du skal ud ad døren, køre derhen, holde i kø, vaske, måske støvsuge selv og køre hjem. Det tager sjældent under 45 minutter.",
          "Mobil bilvask har ingen af de led. Den reelle afstand er fra sofaen til telefonen.",
        ],
      },
      {
        h: "Åbent alle ugens dage",
        p: [
          "Vi kører alle ugens dage, og bookingen er åben døgnet rundt. Du kan ofte finde en tid allerede samme dag eller dagen efter. Systemet viser tider tidligst et par timer frem, så vi kan nå ud til dig.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvor ligger den nærmeste CleanWash?",
        a: "Vi har ingen vaskehal, du skal køre til. Vi er en mobil bilvask og kommer til din adresse.",
      },
      {
        q: "Hvordan ser jeg, om I kører i min by?",
        a: "Se listen over serviceområder, eller begynd en booking. Kalenderen viser de tider, vi har på din adresse.",
      },
      {
        q: "Kan jeg få vasket bil i dag?",
        a: "Ofte, hvis der er en ledig tid. Bookingen viser tider tidligst et par timer frem.",
      },
      {
        q: "Hvad koster det, at I kommer til mig?",
        a: "Kørslen er med i pakkeprisen. Udvendig vask fra 450 kr. Et eventuelt tillæg for adresser langt væk vises, før du bekræfter.",
      },
    ],
    keywords: ["bilvask nær mig", "bilvask i nærheden", "nærmeste bilvask", "bilvask tæt på mig", "håndvask bil nær mig"],
    image: { src: "/service/udenfor.jpg", alt: "Mobil bilvask, der kommer til kundens adresse" },
    related: [
      "/serviceomraader",
      "/bilvask-hjemme",
      "/bilvask-storkoebenhavn",
      "/bilvask-nordsjaelland",
      "/bilvask-samme-dag",
      "/mobil-bilvask",
    ],
    pkg: "outside",
  }),

  servicePage({
    slug: "bilvask-flere-biler",
    title: "Bilvask af flere biler – 15 % rabat på bil nr. 2",
    description:
      "Få vasket to eller flere biler i samme besøg og spar 15 % på grundprisen for bil nummer to. Vi kommer til adressen med vand og strøm.",
    h1: "Bilvask af flere biler",
    eyebrow: "Mængderabat til husstanden",
    intro:
      "Har husstanden to biler, giver det mening at få dem vasket samtidig. Det sparer en aftale – og 15 % på den anden bil.",
    answer:
      "Booker du to biler til samme besøg hos CleanWash, får bil nummer to 15 % rabat på grundprisen. Rabatten trækkes fra i bookingen. For en mellemklassebil med pakken Hele bilen svarer det til cirka 135 kr.",
    sections: [
      {
        h: "Sådan får du rabatten",
        p: [
          "Når du har valgt pakke til den første bil, kan du tilføje en ekstra bil i bookingen. Den får sin egen nummerplade, pakke og eventuelle tilvalg. Rabatten på 15 % af grundprisen beregnes automatisk for bil nummer to og vises, før du bekræfter.",
          "Bilerne skal vaskes på samme adresse i samme besøg. De behøver ikke at få samme pakke.",
        ],
      },
      {
        h: "Regneeksempler",
        p: [
          "Rabatten gælder grundprisen for den anden bil, ikke tilvalg.",
        ],
        list: [
          "To mellemklassebiler, udvendig vask: 600 + 510 = 1.110 kr.",
          "To mellemklassebiler, Hele bilen: 899 + cirka 764 = cirka 1.663 kr.",
          "Stor bil + lille bil, Hele bilen: 999 + cirka 679 = cirka 1.678 kr.",
        ],
      },
      {
        h: "Gå sammen med naboen",
        p: [
          "Rabatten er tænkt til husstande, men det praktiske ved et samlet besøg gælder også naboer, kolleger og familie. Jo flere biler på samme sted, jo lettere er det for os at finde en tid – især uden for København.",
          "Er I mange, for eksempel en hel vej eller en afdeling på arbejdet, så kontakt os. Så planlægger vi en dag.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvor meget rabat får jeg på bil nummer to?",
        a: "15 % af grundprisen for den anden bil, når begge vaskes i samme besøg.",
      },
      {
        q: "Skal begge biler have samme pakke?",
        a: "Nej. Du vælger pakke og tilvalg for hver bil.",
      },
      {
        q: "Gælder rabatten også tilvalg?",
        a: "Nej, rabatten beregnes af grundprisen for bil nummer to.",
      },
      {
        q: "Kan vi være tre eller flere biler?",
        a: "Ja. Kontakt os, hvis I er flere end to, så planlægger vi besøget.",
      },
      {
        q: "Tager det dobbelt så lang tid?",
        a: "Cirka. To gange Hele bilen tager omkring tre en halv time i alt.",
      },
    ],
    keywords: ["bilvask to biler", "bilvask flere biler rabat", "bilvask rabat", "familie bilvask", "mængderabat bilvask"],
    image: { src: "/service/helebil.jpg", alt: "To biler vaskes i samme besøg" },
    related: [
      "/bilvask-hjemme",
      "/komplet-bilvask",
      "/bilvask-familiebil",
      "/bilvask-priser",
      "/erhverv/flaadeaftale",
      "/bilvask-boligforening",
    ],
    pkg: "whole",
  }),

  servicePage({
    slug: "bilvask-faq",
    title: "Spørgsmål og svar om mobil bilvask",
    description:
      "Svar på de mest stillede spørgsmål om CleanWash: pris, vand og strøm, betaling, aflysning, vejr, parkering, tidsforbrug og serviceområde.",
    h1: "Spørgsmål og svar om bilvask",
    eyebrow: "Alt samlet ét sted",
    intro:
      "Her har vi samlet de spørgsmål, vi oftest får – om pris, booking, betaling, vejr og alt det praktiske omkring en mobil bilvask.",
    answer:
      "CleanWash er en mobil bilvask, der kommer til din adresse i København og på Sjælland med eget vand og strøm. Udvendig vask koster fra 450 kr., hele bilen fra 799 kr. Du booker online, betaler bagefter og kan aflyse gratis indtil 24 timer før.",
    sections: [
      {
        h: "Booking og betaling",
        p: [
          "Du booker online. Nummerpladen fortæller systemet, hvilken bil du har, og prisen vises med det samme. Du vælger pakke, tilvalg, adresse og tidspunkt og får en bekræftelse på mail. Du kan booke op til et halvt år frem.",
          "Du betaler, når bilen er færdig. De fleste bruger MobilePay. Bankoverførsel og kontant betaling kan aftales. Erhvervskunder faktureres. Alle priser er inklusive moms.",
        ],
      },
      {
        h: "Aflysning, ændringer og vejr",
        p: [
          "Du kan flytte eller aflyse en tid uden gebyr indtil 24 timer før. Ved senere afbud kan der opkræves et gebyr, fordi tiden ikke kan nå at blive brugt af en anden.",
          "Vi vasker i al slags hverdagsvejr. Er vejret for dårligt til et ordentligt resultat – kraftig regn, storm eller hård frost – kontakter vi dig og finder en ny tid.",
        ],
      },
      {
        h: "På dagen",
        p: [
          "Bilen skal holde lovligt og sådan, at vi kan komme rundt om den. Tag værdigenstande og personlige ting ud, hvis vi skal gøre rent indvendigt. Fortæl os om særlige materialer som alcantara eller sart læder og om eksisterende skader, du vil gøre os opmærksom på.",
          "Vi medbringer vand, strøm og alt udstyr. Du behøver ikke at være til stede ved en udvendig vask.",
        ],
      },
    ],
    faqs: [
      {
        q: "Skal jeg stille vand eller strøm til rådighed?",
        a: "Nej. Vi medbringer selv både vand og strøm.",
      },
      {
        q: "Hvad koster en bilvask?",
        a: "Udvendig bilvask 450–899 kr., indvendig rengøring 600–899 kr. og hele bilen 799–1.500 kr. afhængigt af bilens størrelse.",
      },
      {
        q: "Hvordan betaler jeg?",
        a: "Efter vasken – med MobilePay, bankoverførsel eller kontant efter aftale. Erhvervskunder får faktura.",
      },
      {
        q: "Kan jeg aflyse?",
        a: "Ja, uden gebyr indtil 24 timer før det aftalte tidspunkt.",
      },
      {
        q: "Hvor lang tid tager det?",
        a: "Udvendig vask cirka 65 minutter, indvendig rengøring cirka 75 minutter og hele bilen cirka 110 minutter.",
      },
      {
        q: "Skal jeg være hjemme?",
        a: "Ikke ved udvendig vask. Ved indvendig rengøring skal vi have adgang til kabinen.",
      },
      {
        q: "Hvilke dage kører I?",
        a: "Alle ugens dage. De ledige tider fremgår af bookingen.",
      },
      {
        q: "Kan jeg booke til samme dag?",
        a: "Ja, hvis der er en ledig tid. Systemet viser tider tidligst et par timer frem.",
      },
      {
        q: "Hvad sker der, hvis det regner?",
        a: "Let regn stopper os ikke. Ved rigtig dårligt vejr kontakter vi dig og finder en ny tid.",
      },
      {
        q: "Hvor kører I?",
        a: "København, Frederiksberg, Storkøbenhavn og store dele af Sjælland.",
      },
      {
        q: "Vasker I elbiler?",
        a: "Ja. Elbiler og hybridbiler vaskes på samme måde som andre biler, og vi bruger ikke din ladestander eller din strøm.",
      },
      {
        q: "Giver I rabat ved flere biler?",
        a: "Ja. Bil nummer to i samme besøg får 15 % rabat på grundprisen.",
      },
      {
        q: "Hvad gør jeg, hvis jeg ikke er tilfreds?",
        a: "Sig det med det samme, eller kontakt os hurtigst muligt bagefter. Så ser vi på det og finder en løsning.",
      },
      {
        q: "Kan virksomheder få en fast aftale?",
        a: "Ja. Vi laver faste aftaler for firmabiler, varevogne og medarbejderbilvask med samlet faktura.",
      },
    ],
    keywords: ["bilvask spørgsmål", "mobil bilvask FAQ", "CleanWash spørgsmål og svar", "bilvask betaling", "bilvask aflysning"],
    image: { src: "/service/helebil.jpg", alt: "CleanWash mobil bilvask – spørgsmål og svar" },
    related: [
      "/mobil-bilvask",
      "/bilvask-priser",
      "/garanti",
      "/kontakt",
      "/handelsbetingelser",
      "/serviceomraader",
    ],
  }),
];
