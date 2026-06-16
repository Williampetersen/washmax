import type { Metadata } from "next";
import type { Route } from "next";
import { siteConfig } from "@/lib/site";

export type SeoPageConfig = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  heroIntro: string;
  shortSummary: string[];
  keywords: string[];
  serviceType: string;
  serviceArea: string[];
  schemaAreaServed: string[];
  image: {
    src: string;
    alt: string;
  };
  secondaryCta: {
    label: string;
    href: Route | string;
  };
  benefits: {
    title: string;
    text: string;
  }[];
  process: {
    title: string;
    text: string;
  }[];
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedLinks: {
    label: string;
    href: Route | string;
  }[];
  priority: number;
};

const commonRelatedLinks = [
  { label: "Book bilvask", href: "/booking" },
  { label: "Bilvask København", href: "/bilvask-koebenhavn" },
  { label: "Mobil bilvask København", href: "/mobil-bilvask-koebenhavn" },
  { label: "Bilvask Sjælland", href: "/bilvask-sjaelland" },
  { label: "Indvendig bilrengøring København", href: "/indvendig-bilrengoering-koebenhavn" },
  { label: "Håndvask af bil København", href: "/haandvask-bil-koebenhavn" },
  { label: "Bilvask Frederiksberg", href: "/bilvask-frederiksberg" },
  { label: "Bilvask Amager", href: "/bilvask-amager" },
  { label: "Bilvask Østerbro", href: "/bilvask-osterbro" },
  { label: "Bilvask Roskilde", href: "/bilvask-roskilde" },
  { label: "Bilvask Køge", href: "/bilvask-koege" },
  { label: "Bilvask Hellerup", href: "/bilvask-hellerup" },
  { label: "Bilvask pris", href: "/bilvask-pris" },
  { label: "Car wash Copenhagen", href: "/car-wash-copenhagen" },
] as const;

export const seoPages: SeoPageConfig[] = [
  {
    slug: "bilvask-koebenhavn",
    title: "Bilvask København | Professionel bilvask hos CleanWash",
    description:
      "Book professionel bilvask i København hos CleanWash. Få fleksibel bilpleje, indvendig og udvendig vask samt nem online booking.",
    h1: "Bilvask København",
    eyebrow: "Professionel bilvask i København",
    heroIntro:
      "CleanWash tilbyder professionel bilvask i København med online booking, klare servicevalg og bilpleje til både private og erhverv.",
    shortSummary: [
      "CleanWash tilbyder professionel bilvask i København med online booking.",
      "Kunder kan booke bilvask direkte via booking-siden og vælge indvendig, udvendig eller komplet bilpleje.",
      "Servicen er relevant for bilejere i København, Frederiksberg, Amager, brokvartererne og Storkøbenhavn.",
    ],
    keywords: [
      "bilvask København",
      "professionel bilvask København",
      "bilvask nær mig",
      "bilpleje København",
      "bilrengøring København",
    ],
    serviceType: "Professionel bilvask i København",
    serviceArea: [
      "København",
      "Frederiksberg",
      "Amager",
      "Østerbro",
      "Nørrebro",
      "Vesterbro",
      "Valby",
      "Hvidovre",
      "Gentofte",
      "Storkøbenhavn",
    ],
    schemaAreaServed: ["København", "Copenhagen", "Sjælland", "Denmark"],
    image: {
      src: "/service/helebil.jpg",
      alt: "Professionel bilvask i København udført af CleanWash",
    },
    secondaryCta: {
      label: "Se mobil bilvask",
      href: "/mobil-bilvask-koebenhavn",
    },
    benefits: [
      {
        title: "Nem online booking",
        text: "Du kan vælge service, tidspunkt og oplysninger om bilen direkte i bookingflowet.",
      },
      {
        title: "Indvendig og udvendig vask",
        text: "CleanWash hjælper med både kabine, ruder, fælge, lak og den komplette bilvask.",
      },
      {
        title: "Lokal forståelse",
        text: "Servicen er bygget til travle bilejere i København, hvor tid, parkering og planlægning betyder meget.",
      },
      {
        title: "Professionel finish",
        text: "Bilen bliver behandlet med fokus på synligt resultat, skånsomme metoder og ordentlig aflevering.",
      },
    ],
    process: [
      {
        title: "Vælg bilvask",
        text: "Start på booking-siden og vælg den type bilvask eller bilpleje, der passer til bilen.",
      },
      {
        title: "Angiv bil og tidspunkt",
        text: "Udfyld nummerplade, kontaktoplysninger og ønsket tidspunkt, så bookingen kan planlægges.",
      },
      {
        title: "CleanWash klargør opgaven",
        text: "Teamet forbereder service, udstyr og rute ud fra den valgte løsning.",
      },
      {
        title: "Bilen vaskes grundigt",
        text: "Du får en renere bil uden at skulle bruge tid på kø i en vaskehal.",
      },
    ],
    sections: [
      {
        heading: "Bilvask i København for en travl hverdag",
        paragraphs: [
          "Når du søger efter bilvask København, leder du ofte efter mere end en hurtig tur gennem vaskehallen. Du vil have en løsning, der passer ind i hverdagen, giver et ordentligt resultat og gør det nemt at få bilen ren, når kalenderen allerede er fyldt. CleanWash arbejder med professionel bilvask, bilrengøring og bilpleje til kunder i København og nærliggende områder.",
          "Siden her er lavet til bilejere, der vil forstå, hvad CleanWash tilbyder, hvordan booking fungerer, og hvilke typer opgaver der kan løses. CleanWash tilbyder både indvendig rengøring, udvendig bilvask og samlet bilpleje. Det betyder, at du kan vælge en løsning efter bilens behov i stedet for at gætte dig frem.",
        ],
      },
      {
        heading: "Hvad er professionel bilvask hos CleanWash?",
        paragraphs: [
          "En professionel bilvask handler om at få bilen ren på en kontrolleret og skånsom måde. Det kan være vask af lak, fælge, ruder og udvendige flader, men det kan også være støvsugning, aftørring, måtter og kabinepleje. For mange kunder i København er den bedste løsning en kombination, fordi bilen både samler vejsnavs udenpå og støv, sand, kaffepletter eller børnespor indeni.",
          "CleanWash beskriver ydelserne tydeligt i bookingflowet, så du kan vælge ud fra bilens stand og dit behov. Har bilen mest brug for en hurtig opfriskning, kan en udvendig vask være nok. Er bilen brugt dagligt af familie, pendler eller erhverv, giver komplet bilvask ofte bedre mening.",
        ],
      },
      {
        heading: "Lokale områder i København",
        paragraphs: [
          "CleanWash er relevant for kunder i København, Frederiksberg, Amager, Østerbro, Nørrebro, Vesterbro, Valby og Storkøbenhavn. Dækningsområdet kan afhænge af ledige tider, ruteplanlægning og den konkrete adresse, men booking-siden er det bedste sted at starte, fordi den samler oplysningerne ét sted.",
          "Hvis du søger efter professionel bilvask nær mig, kan det være nyttigt at tænke i både afstand og fleksibilitet. En god bilvask skal ikke kun ligge tæt på; den skal også kunne bookes nemt, være tydelig om servicen og give et resultat, der passer til bilens brug.",
        ],
      },
      {
        heading: "Hvem passer siden til?",
        paragraphs: [
          "Denne service passer til private bilejere, pendlere, familier, firmabiler og kunder, der vil have bilen til at se præsentabel ud før et møde, en weekendtur eller et salg. Den passer også til dig, der gerne vil undgå at udskyde bilvasken, fordi det kræver transport, kø eller ekstra tid i kalenderen.",
          "CleanWash gør bilvask i København konkret: vælg service, book online og få bilen gjort ren med fokus på kvalitet. Kunder kan booke bilvask direkte via booking-siden, og de vigtigste valg bliver samlet i et enkelt flow.",
        ],
      },
    ],
    faqs: [
      {
        question: "Tilbyder CleanWash bilvask i København?",
        answer:
          "Ja. CleanWash tilbyder professionel bilvask i København og relevante nærområder med online booking.",
      },
      {
        question: "Kan jeg booke både indvendig og udvendig bilvask?",
        answer:
          "Ja. Du kan vælge indvendig rengøring, udvendig bilvask eller en samlet løsning afhængigt af bilens behov.",
      },
      {
        question: "Hvordan booker jeg bilvask?",
        answer:
          "Du booker via /booking, hvor du vælger service, tidspunkt og de nødvendige oplysninger om bilen.",
      },
      {
        question: "Er bilvasken relevant for firmabiler?",
        answer:
          "Ja. Professionel bilvask kan være relevant for firmabiler, leasingbiler og biler, der skal fremstå præsentable.",
      },
      {
        question: "Hvilke områder dækker CleanWash?",
        answer:
          "CleanWash dækker København, Storkøbenhavn og dele af Sjælland. Den konkrete mulighed afhænger af booking og rute.",
      },
      {
        question: "Er siden kun for kunder i København?",
        answer:
          "Denne side fokuserer på København, men CleanWash har også en side om bilvask på Sjælland.",
      },
    ],
    relatedLinks: commonRelatedLinks.filter((link) => link.href !== "/bilvask-koebenhavn"),
    priority: 0.92,
  },
  {
    slug: "mobil-bilvask-koebenhavn",
    title: "Mobil bilvask København | Bilvask der passer ind i din hverdag",
    description:
      "Book mobil bilvask i København hos CleanWash. Fleksibel booking, professionel bilrengøring og bilpleje, når hverdagen skal hænge sammen.",
    h1: "Mobil bilvask København",
    eyebrow: "Fleksibel bilvask i København",
    heroIntro:
      "CleanWash gør det lettere at planlægge bilvask i København med fleksibel booking og professionel bilrengøring til hverdagsbiler.",
    shortSummary: [
      "CleanWash tilbyder mobil bilvask i København med online booking.",
      "Kunder kan booke bilvask direkte via booking-siden og vælge den service, der passer til bilen.",
      "Serviceområdet og den præcise mulighed for hjemme- eller arbejdspladsservice bør bekræftes i bookingflowet.",
    ],
    keywords: [
      "mobil bilvask København",
      "bilvask hjemme",
      "bilvask på arbejdsplads",
      "fleksibel bilrengøring København",
      "bilpleje København",
    ],
    serviceType: "Mobil bilvask i København",
    serviceArea: [
      "København",
      "Frederiksberg",
      "Amager",
      "Østerbro",
      "Nørrebro",
      "Vesterbro",
      "Valby",
      "Storkøbenhavn",
    ],
    schemaAreaServed: ["København", "Copenhagen", "Sjælland", "Denmark"],
    image: {
      src: "/service/udenfor.jpg",
      alt: "Mobil bilvask i København med udvendig bilrengøring",
    },
    secondaryCta: {
      label: "Læs om bilvask København",
      href: "/bilvask-koebenhavn",
    },
    benefits: [
      {
        title: "Fleksibel planlægning",
        text: "Bookingen samler servicevalg og tid, så bilvasken er lettere at få ind i hverdagen.",
      },
      {
        title: "Mindre spildtid",
        text: "Du slipper for at bruge unødig tid på at koordinere, vente eller finde den rigtige løsning.",
      },
      {
        title: "Til hverdag og arbejde",
        text: "Mobil bilvask er relevant for private, pendlere og erhvervskunder med biler i brug hver dag.",
      },
      {
        title: "Tydelige servicevalg",
        text: "Du vælger mellem indvendig, udvendig eller komplet bilvask ud fra bilens stand.",
      },
    ],
    process: [
      {
        title: "Start online",
        text: "Gå til booking-siden og vælg den bilvask, du ønsker.",
      },
      {
        title: "Oplys bil og behov",
        text: "Angiv nummerplade, kontaktoplysninger og relevante detaljer for opgaven.",
      },
      {
        title: "Vælg tidspunkt",
        text: "Vælg en ledig tid, der passer med din hverdag og CleanWashs ruteplanlægning.",
      },
      {
        title: "Få bilen rengjort",
        text: "CleanWash udfører den valgte bilvask med fokus på grundighed og et pænt resultat.",
      },
    ],
    sections: [
      {
        heading: "Mobil bilvask uden unødigt besvær",
        paragraphs: [
          "Mobil bilvask København er relevant for dig, der gerne vil have bilen gjort ren uden at bygge hele dagen op omkring en tur i vaskehallen. CleanWash tilbyder fleksibel booking af bilvask, bilrengøring og bilpleje, så du kan planlægge opgaven digitalt og vælge den service, bilen har brug for.",
          "Det vigtigste er, at servicen er tydelig. Mobil bilvask kan betyde forskellige ting fra virksomhed til virksomhed, og derfor lover denne side ikke mere, end der kan bekræftes i den konkrete booking. CleanWash beskriver mulighederne i bookingflowet, og serviceområde, adresse og tidspunkt skal altid passe med den aktuelle planlægning. TODO: Bekræft og opdater præcis formulering, hvis virksomheden har faste regler for hjemme- eller arbejdspladsservice.",
        ],
      },
      {
        heading: "For kunder der vil spare tid",
        paragraphs: [
          "I København er bilen ofte bare ét element i en travl dag. Der er arbejde, aflevering, møder, parkering, indkøb og fritid. Derfor er fleksibel bilrengøring en fordel, fordi du kan tage stilling til bilens behov online og undgå at stå med valget først, når du er fremme ved en vaskehal.",
          "CleanWash hjælper med både udvendig vask og indvendig rengøring. Udvendigt kan bilen have brug for vask af lak, fælge og ruder. Indvendigt kan der være støv, sand, madrester, hundehår, kaffemærker eller almindeligt slid fra daglig brug. En mobil løsning giver især mening, når bilen bruges ofte og hurtigt bliver beskidt igen.",
        ],
      },
      {
        heading: "Bilvask hjemme, på arbejdsplads eller efter aftale",
        paragraphs: [
          "Mange søger efter bilvask hjemme eller bilvask på arbejdsplads, fordi de vil undgå ekstra transport. CleanWash arbejder med fleksibel booking, men den konkrete adresse, adgangsforhold og dækningsområde skal kunne bekræftes. Det er vigtigt for både kvalitet, planlægning og et realistisk kundeforløb.",
          "Hvis du ønsker mobil bilvask i København, er den bedste næste handling at starte på booking-siden. Her kan CleanWash indsamle de nødvendige oplysninger og vurdere, hvilken løsning der passer. Det gør processen mere præcis end en løs forespørgsel og hjælper både kunden og virksomheden med at undgå misforståelser.",
        ],
      },
      {
        heading: "Mobil bilpleje til private og erhverv",
        paragraphs: [
          "Mobil bilpleje er ikke kun for private bilejere. Den kan også være relevant for virksomheder med firmabiler, sælgere, servicebiler, leasingbiler eller biler, der skal være præsentable over for kunder. En ren bil sender et bedre signal og kan samtidig gøre hverdagen mere behagelig for den person, der kører i bilen.",
          "CleanWash tilbyder professionel bilvask i København med fokus på nem booking, realistisk planlægning og klare servicevalg. Kunder kan booke bilvask direkte via booking-siden, og siden her forklarer, hvordan mobil bilvask passer ind i hverdagen.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvad betyder mobil bilvask hos CleanWash?",
        answer:
          "Det betyder fleksibel booking af bilvask i København. Den konkrete adresse og serviceform skal bekræftes i bookingflowet.",
      },
      {
        question: "Tilbyder CleanWash bilvask hjemme?",
        answer:
          "CleanWash arbejder med fleksibel booking. Mulighed for hjemmeadresse afhænger af område, adgang og ledige tider.",
      },
      {
        question: "Kan jeg booke bilvask på arbejdspladsen?",
        answer:
          "Det kan være muligt efter adresse og planlægning. Brug booking-siden for at give de nødvendige oplysninger.",
      },
      {
        question: "Hvilke bilvask-typer kan jeg vælge?",
        answer:
          "Du kan vælge service efter behov, typisk udvendig vask, indvendig rengøring eller komplet bilpleje.",
      },
      {
        question: "Dækker CleanWash hele København?",
        answer:
          "CleanWash er relevant for København og Storkøbenhavn, men konkret dækning afhænger af booking og rute.",
      },
      {
        question: "Hvordan booker jeg mobil bilvask?",
        answer:
          "Gå til /booking, vælg service og udfyld oplysninger om bil, tid og kontakt.",
      },
    ],
    relatedLinks: commonRelatedLinks.filter((link) => link.href !== "/mobil-bilvask-koebenhavn"),
    priority: 0.9,
  },
  {
    slug: "bilvask-sjaelland",
    title: "Bilvask Sjælland | Professionel bilrengøring på Sjælland",
    description:
      "Få professionel bilvask på Sjælland hos CleanWash. Book bilrengøring og bilpleje online i København, Storkøbenhavn og nærliggende byer.",
    h1: "Bilvask Sjælland",
    eyebrow: "Bilrengøring på Sjælland",
    heroIntro:
      "CleanWash tilbyder professionel bilvask og bilrengøring på Sjælland med online booking og løsninger til private og erhverv.",
    shortSummary: [
      "CleanWash tilbyder bilvask på Sjælland med fokus på København, Storkøbenhavn og relevante nærområder.",
      "Kunder kan booke bilvask direkte via booking-siden.",
      "Servicen omfatter bilvask, bilrengøring og bilpleje til biler, der bruges i hverdagen.",
    ],
    keywords: [
      "bilvask Sjælland",
      "bilrengøring Sjælland",
      "bilpleje Sjælland",
      "professionel bilvask",
      "mobil bilvask Sjælland",
    ],
    serviceType: "Professionel bilvask på Sjælland",
    serviceArea: [
      "Sjælland",
      "Storkøbenhavn",
      "København",
      "Roskilde",
      "Køge",
      "Hillerød",
      "Helsingør",
      "Holbæk",
      "Ringsted",
      "Næstved",
      "Slagelse",
    ],
    schemaAreaServed: ["Sjælland", "Zealand", "København", "Copenhagen", "Denmark"],
    image: {
      src: "/service/helebil.jpg",
      alt: "Bilvask og bilrengøring på Sjælland hos CleanWash",
    },
    secondaryCta: {
      label: "Se bilvask i København",
      href: "/bilvask-koebenhavn",
    },
    benefits: [
      {
        title: "Regional dækning",
        text: "CleanWash hjælper kunder i København, Storkøbenhavn og dele af Sjælland efter aftale og booking.",
      },
      {
        title: "Til flere biltyper",
        text: "Servicen passer til familiebiler, firmabiler, pendlerbiler, leasingbiler og biler før salg.",
      },
      {
        title: "Samlet bilpleje",
        text: "Vælg indvendig rengøring, udvendig vask eller en komplet løsning i ét bookingflow.",
      },
      {
        title: "Klar kommunikation",
        text: "Booking gør det lettere at afklare service, område, tidspunkt og bilens behov.",
      },
    ],
    process: [
      {
        title: "Vælg service",
        text: "Find den bilvask eller bilpleje, der matcher bilens stand.",
      },
      {
        title: "Udfyld booking",
        text: "Indtast oplysninger om bil, kontakt og ønsket tidspunkt.",
      },
      {
        title: "Afklar område",
        text: "Den konkrete dækning afhænger af adresse, rute og ledige tider.",
      },
      {
        title: "Få professionel bilrengøring",
        text: "CleanWash udfører den valgte service med fokus på kvalitet og finish.",
      },
    ],
    sections: [
      {
        heading: "Bilvask på Sjælland med lokal relevans",
        paragraphs: [
          "Bilvask Sjælland er et bredt behov. Nogle kunder søger bilvask i København, andre søger bilrengøring i Roskilde, Køge, Hillerød, Helsingør eller andre byer på Sjælland. CleanWash fokuserer på professionel bilvask, bilrengøring og bilpleje, hvor booking, planlægning og serviceområde kan afklares digitalt.",
          "Denne side samler den regionale information, så både kunder og søgemaskiner forstår, at CleanWash er en relevant bilvask-virksomhed for Sjælland og især København og Storkøbenhavn. Det er ikke en liste over ubegrænsede garantier; den konkrete service afhænger af område, rute, tidspunkt og bilens behov.",
        ],
      },
      {
        heading: "Hvilke opgaver kan løses?",
        paragraphs: [
          "CleanWash arbejder med bilvask og bilpleje, som kan omfatte udvendig vask, indvendig rengøring, støvsugning, aftørring, ruder, fælge, måtter og generel klargøring. For kunder på Sjælland er det ofte en fordel at vælge en samlet løsning, når bilen bruges meget i hverdagen eller skal stå flot til salg, leasingretur eller erhverv.",
          "Udvendig bilvask hjælper med at fjerne vejsnavs, salt, støv og almindeligt snavs fra lak, ruder og fælge. Indvendig rengøring fokuserer på kabinen, hvor sæder, gulve, måtter, instrumentbræt og bagagerum ofte bærer præg af daglig brug. Samlet bilpleje giver den mest komplette oplevelse.",
        ],
      },
      {
        heading: "Områder og byer på Sjælland",
        paragraphs: [
          "CleanWash er især relevant i København, Frederiksberg, Amager, Storkøbenhavn og omkringliggende områder, men siden dækker også bredere søgninger efter bilvask Sjælland og bilrengøring Sjælland. Kunder fra Roskilde, Køge, Hillerød, Helsingør, Holbæk, Ringsted, Næstved og Slagelse kan bruge booking eller kontaktmuligheder til at afklare, hvad der er muligt.",
          "Det er vigtigt at være præcis med serviceområder. Derfor bør større geografiske løfter altid bekræftes i den konkrete booking. CleanWash kan planlægge ud fra ledige tider og rute, og kunden får en mere realistisk oplevelse, når adresse og behov er tydeligt oplyst fra starten.",
        ],
      },
      {
        heading: "For private, familier og virksomheder",
        paragraphs: [
          "Bilvask på Sjælland er relevant for mange typer kunder. Familier har ofte behov for indvendig rengøring efter hverdag, sport, madpakker og ture. Pendlere vil gerne have en bil, der føles ren, selvom den bruges meget. Virksomheder kan have brug for løbende bilpleje, så firmabiler fremstår ordentlige over for kunder.",
          "CleanWash tilbyder en praktisk vej ind: Kunden vælger service, booker online og giver de oplysninger, der skal bruges. Kunder kan booke bilvask direkte via booking-siden, og CleanWash kan derefter håndtere opgaven ud fra den valgte løsning.",
        ],
      },
    ],
    faqs: [
      {
        question: "Tilbyder CleanWash bilvask på Sjælland?",
        answer:
          "Ja. CleanWash tilbyder bilvask på Sjælland med fokus på København, Storkøbenhavn og relevante nærområder.",
      },
      {
        question: "Hvilke byer på Sjælland er relevante?",
        answer:
          "København, Frederiksberg, Roskilde, Køge, Hillerød, Helsingør og andre områder kan være relevante afhængigt af booking.",
      },
      {
        question: "Kan jeg få indvendig bilrengøring på Sjælland?",
        answer:
          "Ja. CleanWash tilbyder indvendig rengøring som del af bilrengøring og bilpleje.",
      },
      {
        question: "Er bilvask på Sjælland egnet til erhverv?",
        answer:
          "Ja. Servicen kan være relevant for firmabiler, leasingbiler og virksomheder med flere biler.",
      },
      {
        question: "Hvordan afklarer jeg, om min adresse dækkes?",
        answer:
          "Start via /booking eller kontakt CleanWash, så adresse, tidspunkt og mulighed kan afklares.",
      },
      {
        question: "Kan jeg vælge komplet bilpleje?",
        answer:
          "Ja. Du kan vælge en løsning, der kombinerer indvendig og udvendig bilvask, hvis den passer til bilens behov.",
      },
    ],
    relatedLinks: commonRelatedLinks.filter((link) => link.href !== "/bilvask-sjaelland"),
    priority: 0.88,
  },
  {
    slug: "indvendig-bilrengoering-koebenhavn",
    title: "Indvendig bilrengøring København | Grundig rengøring af bilen",
    description:
      "Book indvendig bilrengøring i København hos CleanWash. Grundig støvsugning, kabinerengøring, sæderens og bilpleje til hverdagsbiler.",
    h1: "Indvendig bilrengøring København",
    eyebrow: "Ren kabine og bedre hverdagskomfort",
    heroIntro:
      "CleanWash tilbyder indvendig bilrengøring i København til biler med støv, sand, pletter, lugt og spor fra daglig brug.",
    shortSummary: [
      "CleanWash tilbyder indvendig bilrengøring i København med online booking.",
      "Servicen er relevant for kabine, måtter, sæder, instrumentbræt, bagagerum og hverdagsbiler.",
      "Kunder kan booke bilvask direkte via booking-siden og vælge indvendig rengøring eller komplet bilpleje.",
    ],
    keywords: [
      "indvendig bilrengøring København",
      "sæderens",
      "støvsugning bil",
      "rengøring af kabine",
      "bilpleje København",
    ],
    serviceType: "Indvendig bilrengøring i København",
    serviceArea: [
      "København",
      "Frederiksberg",
      "Amager",
      "Østerbro",
      "Nørrebro",
      "Vesterbro",
      "Valby",
      "Storkøbenhavn",
    ],
    schemaAreaServed: ["København", "Copenhagen", "Sjælland", "Denmark"],
    image: {
      src: "/service/inside.jpg",
      alt: "Indvendig bilrengøring af kabine hos CleanWash i København",
    },
    secondaryCta: {
      label: "Se håndvask af bil",
      href: "/haandvask-bil-koebenhavn",
    },
    benefits: [
      {
        title: "Renere kabine",
        text: "Fokus på støv, måtter, sæder, paneler, bagagerum og de flader, du bruger hver dag.",
      },
      {
        title: "Bedre følelse i bilen",
        text: "Indvendig rengøring gør bilen mere behagelig for fører, passagerer, børn og kunder.",
      },
      {
        title: "God før salg eller leasing",
        text: "En ren kabine hjælper bilen med at fremstå mere velholdt ved fremvisning eller aflevering.",
      },
      {
        title: "Kan kombineres med vask",
        text: "Du kan vælge komplet bilpleje, hvis bilen også skal vaskes grundigt udvendigt.",
      },
    ],
    process: [
      {
        title: "Vælg indvendig service",
        text: "Start på booking-siden og vælg indvendig rengøring eller komplet bilpleje.",
      },
      {
        title: "Beskriv bilens behov",
        text: "Oplys biltype og relevante detaljer, så opgaven kan planlægges korrekt.",
      },
      {
        title: "Kabinen rengøres",
        text: "CleanWash arbejder med støvsugning, aftørring, måtter og synlige kontaktflader.",
      },
      {
        title: "Afslut med frisk fornemmelse",
        text: "Bilen afleveres med en renere kabine og en mere behagelig oplevelse.",
      },
    ],
    sections: [
      {
        heading: "Indvendig bilrengøring til biler der bruges",
        paragraphs: [
          "Indvendig bilrengøring København er for dig, der mærker hverdagen i bilen. Kabinen samler støv, sand, pollen, krummer, hår, fugt, lugt og små pletter. Det sker især i familiebiler, pendlerbiler, firmabiler og biler, der bruges til transport af børn, udstyr eller kunder.",
          "CleanWash tilbyder indvendig bilrengøring i København med fokus på de områder, du ser og rører ved hver dag: sæder, gulve, måtter, instrumentbræt, midterkonsol, dørfalser, bagagerum og ruder. Formålet er ikke kun, at bilen ser pænere ud. Den skal også føles rarere at køre i.",
        ],
      },
      {
        heading: "Hvad indvendig rengøring typisk omfatter",
        paragraphs: [
          "En indvendig rengøring kan omfatte støvsugning af kabine og bagagerum, rengøring af måtter, aftørring af paneler, instrumentbræt, rat, gearområde, kopholdere og andre kontaktflader. Hvis bilen har pletter, lugt eller meget snavs, kan der være behov for ekstra behandling eller en mere omfattende bilpleje.",
          "Sæderens er et vigtigt søgeord, men behovet afhænger af sædetype, materiale og bilens stand. Derfor er det bedst at vælge den relevante service i bookingflowet og give tydelige oplysninger, hvis kabinen kræver særlig opmærksomhed. CleanWash kan derefter håndtere opgaven mere præcist.",
        ],
      },
      {
        heading: "For familiebiler, pendlerbiler og firmabiler",
        paragraphs: [
          "Familiebiler bliver ofte beskidte indefra, selv når ejeren passer godt på dem. Børnesæder, sportstasker, sko, snacks og daglige ture sætter spor. Pendlere bruger mange timer i bilen og får en bedre oplevelse, når kabinen ikke er støvet eller rodet. Firmabiler skal ofte fremstå professionelle, fordi de er en del af virksomhedens ansigt udadtil.",
          "Indvendig bilrengøring er også relevant før salg, leasingretur eller overdragelse. En ren kabine kan gøre bilen mere attraktiv, fordi køber eller modtager oplever bilen som bedre vedligeholdt. Det er en praktisk investering, når bilen skal vurderes visuelt.",
        ],
      },
      {
        heading: "København og nærområder",
        paragraphs: [
          "CleanWash er relevant for kunder i København, Frederiksberg, Amager, Østerbro, Nørrebro, Vesterbro, Valby og Storkøbenhavn. Hvis du søger efter rengøring af kabine, støvsugning bil eller bilpleje København, er denne side lavet til at forklare den indvendige del tydeligt.",
          "Kunder kan booke bilvask direkte via booking-siden. Her kan du vælge indvendig rengøring, udvendig vask eller komplet bilpleje. Den bedste løsning afhænger af bilens brug, hvor længe siden den sidst blev rengjort, og hvilket resultat du ønsker.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvad er indvendig bilrengøring?",
        answer:
          "Det er rengøring af kabine, måtter, sæder, paneler, gulve, bagagerum og andre indvendige flader.",
      },
      {
        question: "Tilbyder CleanWash indvendig bilrengøring i København?",
        answer:
          "Ja. CleanWash tilbyder indvendig bilrengøring i København og nærliggende områder med online booking.",
      },
      {
        question: "Kan jeg få støvsuget bilen?",
        answer:
          "Ja. Støvsugning af bil er en central del af indvendig rengøring, afhængigt af valgt service.",
      },
      {
        question: "Er sæderens inkluderet?",
        answer:
          "Sæderens afhænger af den valgte service og bilens behov. Vælg eller beskriv behovet i bookingflowet.",
      },
      {
        question: "Kan indvendig rengøring kombineres med udvendig vask?",
        answer:
          "Ja. Du kan vælge komplet bilpleje, hvis bilen både skal rengøres indvendigt og vaskes udvendigt.",
      },
      {
        question: "Hvordan booker jeg indvendig bilrengøring?",
        answer:
          "Gå til /booking, vælg relevant service og udfyld oplysninger om bilen og ønsket tidspunkt.",
      },
    ],
    relatedLinks: commonRelatedLinks.filter(
      (link) => link.href !== "/indvendig-bilrengoering-koebenhavn"
    ),
    priority: 0.89,
  },
  {
    slug: "haandvask-bil-koebenhavn",
    title: "Håndvask af bil København | Skånsom og professionel bilvask",
    description:
      "Book skånsom håndvask af bil i København hos CleanWash. Professionel udvendig bilvask, fælge, ruder og lakvenlig pleje med nem booking.",
    h1: "Håndvask af bil København",
    eyebrow: "Skånsom udvendig bilvask",
    heroIntro:
      "CleanWash tilbyder skånsom håndvask af bil i København for kunder, der ønsker en grundig udvendig vask og pæn finish.",
    shortSummary: [
      "CleanWash tilbyder professionel håndvask af bil i København med online booking.",
      "Servicen fokuserer på skånsom udvendig bilvask, fælge, ruder og lakvenlig bilpleje.",
      "Kunder kan booke bilvask direkte via booking-siden.",
    ],
    keywords: [
      "håndvask bil København",
      "skånsom bilvask",
      "udvendig bilvask København",
      "professionel håndvask",
      "bilpleje København",
    ],
    serviceType: "Håndvask af bil i København",
    serviceArea: [
      "København",
      "Frederiksberg",
      "Amager",
      "Østerbro",
      "Nørrebro",
      "Vesterbro",
      "Valby",
      "Storkøbenhavn",
    ],
    schemaAreaServed: ["København", "Copenhagen", "Sjælland", "Denmark"],
    image: {
      src: "/service/udenfor.jpg",
      alt: "Skånsom håndvask af bil i København hos CleanWash",
    },
    secondaryCta: {
      label: "Se indvendig rengøring",
      href: "/indvendig-bilrengoering-koebenhavn",
    },
    benefits: [
      {
        title: "Skånsom udvendig vask",
        text: "Håndvask giver god kontrol omkring lak, ruder, spejle, fælge og detaljer.",
      },
      {
        title: "Premium følelse",
        text: "Bilen får en mere gennemført finish end en hurtig standardvask.",
      },
      {
        title: "God til velholdte biler",
        text: "Passer til bilejere, der vil passe på lakken og holde bilen præsentabel.",
      },
      {
        title: "Kan udvides",
        text: "Håndvask kan kombineres med indvendig rengøring, hvis hele bilen skal friskes op.",
      },
    ],
    process: [
      {
        title: "Vælg udvendig vask",
        text: "Book en udvendig eller komplet service, alt efter hvad bilen har brug for.",
      },
      {
        title: "Oplys biltype",
        text: "Nummerplade og biloplysninger hjælper med pris, tid og planlægning.",
      },
      {
        title: "Bilen håndvaskes",
        text: "CleanWash arbejder skånsomt med lak, ruder, fælge og udvendige flader.",
      },
      {
        title: "Afslut med finish",
        text: "Bilen afleveres renere, pænere og mere præsentabel i hverdagen.",
      },
    ],
    sections: [
      {
        heading: "Håndvask af bil for en mere kontrolleret vask",
        paragraphs: [
          "Håndvask bil København er for kunder, der ønsker en skånsom og mere kontrolleret udvendig bilvask. En håndvask giver mulighed for at arbejde mere opmærksomt omkring fælge, ruder, spejle, lister og områder, hvor snavs ofte sætter sig fast. Det er især relevant for bilejere, der går op i bilens udtryk og vil undgå en tilfældig standardoplevelse.",
          "CleanWash tilbyder professionel håndvask af bil i København med online booking. Servicen er relevant, når bilen skal se pæn ud til hverdag, arbejde, salg, fremvisning eller bare fordi det føles bedre at køre i en ren bil. Kunder kan booke bilvask direkte via booking-siden.",
        ],
      },
      {
        heading: "Skånsom bilvask og lakvenlig bilpleje",
        paragraphs: [
          "En skånsom bilvask handler om mere end at fjerne synligt snavs. Lak, ruder og detaljer skal behandles med omtanke, så resultatet bliver rent uden unødig hård behandling. Det betyder, at udstyr, rækkefølge og grundighed har betydning. Håndvask giver bedre kontrol end en hurtig automatisk løsning, især når bilen har særlige områder, der kræver opmærksomhed.",
          "For mange bilejere i København er håndvask også et spørgsmål om premium følelse. Bilen skal ikke bare være mindre beskidt; den skal stå skarpt. Det gælder især mørke biler, nyere biler, firmabiler, biler før foto eller biler, der ofte bruges i kundesammenhæng.",
        ],
      },
      {
        heading: "Udvendig bilvask i København",
        paragraphs: [
          "Udvendig bilvask kan omfatte vask af lak, ruder, spejle, fælge, hjulnære områder og synlige flader. København giver bilen mange typer snavs: bystøv, regn, pollen, bremsestøv, vejsalt og almindelig trafikfilm. En regelmæssig udvendig vask hjælper bilen med at se bedre ud og gør den mere behagelig at bruge.",
          "CleanWash er relevant for kunder i København, Frederiksberg, Amager, Østerbro, Nørrebro, Vesterbro, Valby og Storkøbenhavn. Den konkrete mulighed afhænger af booking, rute og servicevalg, men siden her forklarer, hvornår håndvask er den rigtige retning.",
        ],
      },
      {
        heading: "Håndvask eller komplet bilpleje?",
        paragraphs: [
          "Hvis bilen primært er beskidt udenpå, kan håndvask eller udvendig bilvask være nok. Hvis kabinen også bærer præg af hverdagen, giver komplet bilpleje bedre mening. Mange kunder vælger en udvendig vask før en begivenhed, mens andre vælger komplet rengøring, når bilen trænger til en større opfriskning.",
          "CleanWash gør valget nemmere ved at samle servicevalg i bookingflowet. Du kan vælge den løsning, der passer til bilen, og give oplysninger om behovet. På den måde bliver håndvask af bil i København ikke bare et søgeord, men en konkret og bookbar service.",
        ],
      },
    ],
    faqs: [
      {
        question: "Tilbyder CleanWash håndvask af bil i København?",
        answer:
          "Ja. CleanWash tilbyder skånsom udvendig bilvask og håndvask-relevant bilpleje i København.",
      },
      {
        question: "Hvorfor vælge håndvask frem for automatisk vask?",
        answer:
          "Håndvask giver mere kontrol omkring lak, fælge, ruder og detaljer, hvor bilen ofte kræver ekstra opmærksomhed.",
      },
      {
        question: "Kan håndvask kombineres med indvendig rengøring?",
        answer:
          "Ja. Du kan vælge komplet bilpleje, hvis bilen både skal vaskes udvendigt og rengøres indvendigt.",
      },
      {
        question: "Er håndvask relevant før salg?",
        answer:
          "Ja. En grundig udvendig vask kan gøre bilen mere præsentabel før billeder, fremvisning eller salg.",
      },
      {
        question: "Hvilke områder i København er relevante?",
        answer:
          "København, Frederiksberg, Amager, brokvartererne, Valby og Storkøbenhavn kan være relevante efter booking.",
      },
      {
        question: "Hvordan booker jeg håndvask af bil?",
        answer:
          "Gå til /booking og vælg den udvendige eller komplette service, der passer til bilen.",
      },
    ],
    relatedLinks: commonRelatedLinks.filter((link) => link.href !== "/haandvask-bil-koebenhavn"),
    priority: 0.89,
  },

  // ── Neighborhood pages ──────────────────────────────────────────────────────

  {
    slug: "bilvask-frederiksberg",
    title: "Bilvask Frederiksberg | Professionel bilpleje hos CleanWash",
    description:
      "Book professionel bilvask i Frederiksberg hos CleanWash. Udvendig vask, indvendig rengøring og komplet bilpleje med nem online booking.",
    h1: "Bilvask Frederiksberg",
    eyebrow: "Professionel bilvask i Frederiksberg",
    heroIntro:
      "CleanWash tilbyder professionel bilvask i Frederiksberg med online booking og klare servicevalg til private og erhverv.",
    shortSummary: [
      "CleanWash tilbyder bilvask i Frederiksberg med online booking og tydelige servicevalg.",
      "Du kan vælge udvendig vask, indvendig rengøring eller komplet bilpleje direkte i bookingflowet.",
      "Servicen er relevant for bilejere i Frederiksberg, Valby, Vanløse, Bispebjerg og nærliggende bydele.",
    ],
    keywords: [
      "bilvask Frederiksberg",
      "bilrengøring Frederiksberg",
      "bilpleje Frederiksberg",
      "mobil bilvask Frederiksberg",
      "bilvask nær mig Frederiksberg",
    ],
    serviceType: "Professionel bilvask i Frederiksberg",
    serviceArea: [
      "Frederiksberg",
      "Valby",
      "Vanløse",
      "Bispebjerg",
      "Vesterbro",
      "København",
      "Storkøbenhavn",
    ],
    schemaAreaServed: ["Frederiksberg", "København", "Copenhagen", "Denmark"],
    image: { src: "/service/udenfor.jpg", alt: "Professionel bilvask i Frederiksberg hos CleanWash" },
    secondaryCta: { label: "Se bilvask København", href: "/bilvask-koebenhavn" },
    benefits: [
      { title: "Lokal service", text: "CleanWash er relevant for bilejere i Frederiksberg og nærliggende bydele i København." },
      { title: "Nem online booking", text: "Vælg service, tidspunkt og biloplysninger direkte i bookingflowet uden kø." },
      { title: "Indvendig og udvendig", text: "Book udvendig vask, indvendig rengøring eller komplet bilpleje efter bilens behov." },
      { title: "Til private og erhverv", text: "Passer til familiebiler, firmabiler, leasingbiler og pendlerbiler i hverdagen." },
    ],
    process: [
      { title: "Book online", text: "Gå til booking-siden og vælg den bilvask, der passer til bilen." },
      { title: "Oplys bil og adresse", text: "Angiv nummerplade, kontaktoplysninger og ønsket tidspunkt." },
      { title: "CleanWash klargør", text: "Teamet forbereder service og rute ud fra din booking." },
      { title: "Bilen vaskes", text: "Du får en renere bil uden kø og uden transport til en vaskehal." },
    ],
    sections: [
      {
        heading: "Bilvask i Frederiksberg til den travle hverdag",
        paragraphs: [
          "Frederiksberg er en tæt bebygget bydel med mange bilejere, der bruger bilen dagligt til pendling, familieliv og arbejde. Når du søger efter bilvask Frederiksberg, leder du efter en løsning, der passer ind i hverdagen uden unødigt besvær. CleanWash tilbyder professionel bilvask, bilrengøring og bilpleje med online booking, så du kan planlægge opgaven digitalt.",
          "Bilen samler snavs fra byens gader, parkeringspladser, vejsalt og daglig brug. En professionel bilvask hjælper bilen med at se bedre ud og giver en mere behagelig oplevelse. CleanWash tilbyder både udvendig vask og indvendig rengøring, så du kan vælge den service, der passer til bilens stand.",
        ],
      },
      {
        heading: "Hvad tilbyder CleanWash i Frederiksberg?",
        paragraphs: [
          "CleanWash tilbyder bilvask i Frederiksberg med fokus på udvendig vask, indvendig rengøring og komplet bilpleje. Udvendig vask omfatter lak, ruder, fælge og hjulbuer. Indvendig rengøring fokuserer på kabine, måtter, sæder, instrumentbræt og bagagerum. Komplet bilpleje kombinerer begge dele for det bedste resultat.",
          "Booking fungerer online, og du vælger service, biloplysninger og tidspunkt i ét flow. Den konkrete mulighed afhænger af adresse, rute og ledige tider, men bookingflowet samler alle oplysninger, så CleanWash kan planlægge opgaven præcist.",
        ],
      },
      {
        heading: "Lokale områder og nærliggende bydele",
        paragraphs: [
          "Frederiksberg grænser op til Valby, Vanløse, Bispebjerg, Vesterbro og Indre By. CleanWash er relevant for kunder i hele dette område og kan håndtere booking fra kunder i Storkøbenhavn. Den konkrete dækning afhænger af booking, rute og tidspunkt, men du kan starte processen online.",
          "Hvis du søger bilvask nær mig i Frederiksberg, er det bedste næste skridt at starte booking-processen. Her kan du se tilgængelighed, vælge service og give de oplysninger, der er nødvendige for at planlægge bilvasken korrekt.",
        ],
      },
      {
        heading: "Frederiksberg: firmabiler og private bilejere",
        paragraphs: [
          "I Frederiksberg finder du mange virksomheder, kontorer og selvstændige, der har behov for regelmæssig bilpleje. Firmabiler og leasingbiler skal fremstå præsentable, og CleanWash kan hjælpe med at sikre, at bilen er ren og klar til brug. Private bilejere nyder godt af en professionel bilvask, der sparer tid og giver et bedre resultat end en hurtig standardvask.",
          "Kunder kan booke bilvask direkte via booking-siden. Vælg den service, der passer til bilen, og CleanWash håndterer resten.",
        ],
      },
    ],
    faqs: [
      { question: "Tilbyder CleanWash bilvask i Frederiksberg?", answer: "Ja. CleanWash tilbyder professionel bilvask i Frederiksberg og nærliggende bydele med online booking." },
      { question: "Kan jeg booke indvendig rengøring i Frederiksberg?", answer: "Ja. Du kan vælge indvendig rengøring, udvendig vask eller komplet bilpleje i bookingflowet." },
      { question: "Dækker CleanWash hele Frederiksberg?", answer: "CleanWash er relevant for Frederiksberg og nærliggende områder. Konkret dækning afhænger af booking og rute." },
      { question: "Hvad koster bilvask i Frederiksberg?", answer: "Prisen afhænger af den valgte service. Se priser og book online via /booking." },
      { question: "Kan firmabiler bookes i Frederiksberg?", answer: "Ja. CleanWash tilbyder bilvask til private og erhverv, herunder firmabiler og leasingbiler." },
      { question: "Hvordan booker jeg bilvask i Frederiksberg?", answer: "Gå til /booking, vælg service og udfyld oplysninger om bil, adresse og ønsket tidspunkt." },
    ],
    relatedLinks: commonRelatedLinks.filter((link) => link.href !== "/bilvask-frederiksberg"),
    priority: 0.88,
  },

  {
    slug: "bilvask-amager",
    title: "Bilvask Amager | Professionel bilvask hos CleanWash",
    description:
      "Book professionel bilvask på Amager hos CleanWash. Udvendig vask, indvendig bilrengøring og bilpleje med nem online booking.",
    h1: "Bilvask Amager",
    eyebrow: "Professionel bilvask på Amager",
    heroIntro:
      "CleanWash tilbyder professionel bilvask på Amager med online booking og klare servicevalg til private og erhverv.",
    shortSummary: [
      "CleanWash tilbyder bilvask på Amager med online booking og tydelige servicevalg.",
      "Servicen dækker Amager, Sundby, Kastrup, Dragør og nærliggende bydele.",
      "Du kan vælge udvendig vask, indvendig rengøring eller komplet bilpleje direkte i bookingflowet.",
    ],
    keywords: [
      "bilvask Amager",
      "bilrengøring Amager",
      "bilpleje Amager",
      "mobil bilvask Amager",
      "bilvask Kastrup",
    ],
    serviceType: "Professionel bilvask på Amager",
    serviceArea: [
      "Amager",
      "Sundby",
      "Kastrup",
      "Dragør",
      "Ørestad",
      "Islands Brygge",
      "København",
    ],
    schemaAreaServed: ["Amager", "København", "Copenhagen", "Denmark"],
    image: { src: "/service/helebil.jpg", alt: "Professionel bilvask på Amager hos CleanWash" },
    secondaryCta: { label: "Se bilvask København", href: "/bilvask-koebenhavn" },
    benefits: [
      { title: "Amager og omegn", text: "CleanWash er relevant for kunder i Amager, Sundby, Kastrup, Dragør og Ørestad." },
      { title: "Fleksibel booking", text: "Book bilvask online og vælg den service, der passer til bilens stand og behov." },
      { title: "Komplet bilpleje", text: "Udvendig vask, indvendig rengøring eller komplet bilpleje — vælg i bookingflowet." },
      { title: "Til private og erhverv", text: "Passer til familiebiler, pendlerbiler, firmabiler og biler, der bruges dagligt." },
    ],
    process: [
      { title: "Book online", text: "Vælg service på booking-siden og angiv biloplysninger og tidspunkt." },
      { title: "Oplys adresse", text: "Angiv den adresse, hvor bilen holder, og kontaktoplysninger." },
      { title: "CleanWash planlægger", text: "Teamet forbereder rute og service ud fra din booking." },
      { title: "Bilen vaskes grundigt", text: "Du får en renere bil uden ventetid eller transport til vaskehal." },
    ],
    sections: [
      {
        heading: "Bilvask på Amager med professionel service",
        paragraphs: [
          "Amager er en stor og varieret del af København med mange bilejere fra Sundby, Kastrup, Dragør, Ørestad og Islands Brygge. Bilvask Amager er et relevant søgeord for alle, der bor eller arbejder her og vil have bilen gjort ren uden at bruge unødigt tid på det. CleanWash tilbyder professionel bilvask med online booking og klare servicevalg.",
          "Bilerne på Amager møder de samme udfordringer som andre biler i storbyen: vejsnavs, bremsestøv, pollen, regn og daglig brug. En regelmæssig bilvask holder bilen pænere og giver en bedre oplevelse. CleanWash kan hjælpe med udvendig vask, indvendig rengøring og komplet bilpleje.",
        ],
      },
      {
        heading: "Hvad tilbyder CleanWash på Amager?",
        paragraphs: [
          "CleanWash tilbyder bilvask på Amager med fokus på udvendig vask, indvendig rengøring og komplet bilpleje. Udvendig vask fjerner snavs fra lak, ruder, fælge og hjulbuer. Indvendig rengøring fokuserer på kabine, støvsugning, måtter, sæder og instrumentbræt. Komplet bilpleje giver det mest gennemførte resultat.",
          "Booking foregår online, og du vælger den service, der passer til bilen. Den konkrete mulighed afhænger af adresse, rute og ledige tider, men bookingflowet samler oplysningerne, så CleanWash kan planlægge effektivt.",
        ],
      },
      {
        heading: "Amager: bydele og serviceområde",
        paragraphs: [
          "Amager dækker mange forskelligartede bydele: det tætte bykvarter i Sundby, det moderne Ørestad, havneområdet ved Islands Brygge og de rolige villakvarterer i Kastrup og Dragør. CleanWash er relevant for kunder i hele dette område og kan håndtere booking fra bilejere langs hele Amager.",
          "Hvis du søger efter bilvask nær mig på Amager, er det bedste første skridt at starte booking-processen online. Her kan du se tilgængelighed og vælge den service, der passer til bilens behov.",
        ],
      },
      {
        heading: "Bilejere med specielle behov på Amager",
        paragraphs: [
          "Mange bilejere på Amager har specifikke behov. Familier med børn har brug for grundig indvendig rengøring. Pendlere ønsker en hurtig og effektiv bilvask. Erhvervsfolk med firmabiler vil have bilen til at fremstå professionel. CleanWash tilbyder løsninger til alle disse grupper.",
          "Kunder kan booke bilvask direkte via booking-siden. Vælg den service, der passer til bilen, og angiv relevante oplysninger. CleanWash håndterer resten og leverer et professionelt resultat.",
        ],
      },
    ],
    faqs: [
      { question: "Tilbyder CleanWash bilvask på Amager?", answer: "Ja. CleanWash tilbyder professionel bilvask på Amager og i nærliggende bydele med online booking." },
      { question: "Dækker I Kastrup og Dragør?", answer: "Kastrup og Dragør kan dækkes afhængigt af rute og ledige tider. Start booking for at afklare muligheder." },
      { question: "Kan jeg få komplet bilpleje på Amager?", answer: "Ja. Du kan vælge udvendig vask, indvendig rengøring eller komplet bilpleje i bookingflowet." },
      { question: "Er CleanWash relevant for Ørestad?", answer: "Ja. Ørestad er en del af Amager og er relevant for CleanWashs serviceområde." },
      { question: "Hvad koster bilvask på Amager?", answer: "Prisen afhænger af den valgte service. Se priser og book online via /booking." },
      { question: "Hvordan booker jeg bilvask på Amager?", answer: "Gå til /booking, vælg service og udfyld oplysninger om bil og ønsket tidspunkt." },
    ],
    relatedLinks: commonRelatedLinks.filter((link) => link.href !== "/bilvask-amager"),
    priority: 0.87,
  },

  {
    slug: "bilvask-osterbro",
    title: "Bilvask Østerbro | Professionel bilvask i København",
    description:
      "Book professionel bilvask på Østerbro hos CleanWash. Udvendig bilvask, indvendig bilrengøring og bilpleje med nem online booking.",
    h1: "Bilvask Østerbro",
    eyebrow: "Professionel bilvask på Østerbro",
    heroIntro:
      "CleanWash tilbyder professionel bilvask på Østerbro med online booking og fleksible servicevalg til private og erhverv.",
    shortSummary: [
      "CleanWash tilbyder bilvask på Østerbro med online booking og tydelige servicevalg.",
      "Servicen er relevant for bilejere i Østerbro, Nordhavn, Hellerup og nærliggende bydele.",
      "Book udvendig vask, indvendig rengøring eller komplet bilpleje direkte i bookingflowet.",
    ],
    keywords: [
      "bilvask Østerbro",
      "bilrengøring Østerbro",
      "bilpleje Østerbro",
      "mobil bilvask Østerbro",
      "bilvask nær mig Østerbro",
    ],
    serviceType: "Professionel bilvask på Østerbro",
    serviceArea: [
      "Østerbro",
      "Nordhavn",
      "Hellerup",
      "Gentofte",
      "Nørrebro",
      "København",
      "Storkøbenhavn",
    ],
    schemaAreaServed: ["Østerbro", "København", "Copenhagen", "Denmark"],
    image: { src: "/service/udenfor.jpg", alt: "Professionel bilvask på Østerbro hos CleanWash" },
    secondaryCta: { label: "Se mobil bilvask", href: "/mobil-bilvask-koebenhavn" },
    benefits: [
      { title: "Østerbro og Nordhavn", text: "CleanWash er relevant for bilejere på Østerbro, i Nordhavn og nærliggende bydele." },
      { title: "Online booking", text: "Book bilvask direkte online og vælg service, tidspunkt og biloplysninger på én gang." },
      { title: "Alle servicetyper", text: "Udvendig vask, indvendig rengøring og komplet bilpleje — alt kan bookes online." },
      { title: "Til travle bilejere", text: "Perfekt for pendlere, familier og virksomheder med biler i daglig brug." },
    ],
    process: [
      { title: "Vælg service", text: "Gå til booking-siden og vælg den bilvask, der passer til bilen." },
      { title: "Angiv bil og tidspunkt", text: "Udfyld nummerplade, adresse og ønsket tidspunkt for bilvasken." },
      { title: "CleanWash forbereder", text: "Teamet planlægger service og rute ud fra din booking." },
      { title: "Ren bil leveret", text: "Bilen bliver vasket professionelt uden kø og uden ventetid." },
    ],
    sections: [
      {
        heading: "Bilvask på Østerbro — nem og professionel",
        paragraphs: [
          "Østerbro er en af Københavns mest travle bydele med mange bilejere, der dagligt bruger bilen til pendling, familieliv og arbejde. Bilvask Østerbro er et søgeord for alle, der vil have en renere bil uden at bruge en hel dag på det. CleanWash tilbyder professionel bilvask med online booking, klare servicevalg og fokus på kvalitet.",
          "Biler på Østerbro er udsat for typisk storbysnavs: bremsestøv fra bytrafik, pollen fra parkerne, vejsalt om vinteren og dagligt vejsnavs. En professionel bilvask giver et bedre resultat end en hurtig tur i en automatisk vaskehal og er skånsom over for lakken.",
        ],
      },
      {
        heading: "Serviceområde: Østerbro, Nordhavn og omegn",
        paragraphs: [
          "CleanWash dækker Østerbro og nærliggende bydele som Nordhavn, Hellerup, Gentofte og Nørrebro. Det er en central del af København med mange boligblokke, rækkehuse og erhvervsadresser med tilhørende biler. Den konkrete dækning afhænger af booking og rute, men du kan starte processen online.",
          "Nordhavn er vokset markant de seneste år og er hjemsted for mange bilejere, der pendler til kontorer i indre by eller kører dagligt til børnepasning og aktiviteter. Professionel bilvask i Nordhavn er relevant for alle, der vil spare tid og have en bedre hverdagsoplevelse.",
        ],
      },
      {
        heading: "Hvad CleanWash tilbyder på Østerbro",
        paragraphs: [
          "CleanWash tilbyder udvendig bilvask, indvendig bilrengøring og komplet bilpleje til kunder på Østerbro. Udvendig vask omfatter lak, fælge, ruder og hjulbuer. Indvendig rengøring fokuserer på kabine, støvsugning, måtter og synlige flader. Komplet bilpleje kombinerer begge dele.",
          "Alle servicetyper kan bookes online. Du vælger service, angiver biloplysninger og ønsket tidspunkt. CleanWash planlægger opgaven ud fra rute og tilgængelighed. Kunder kan booke bilvask direkte via booking-siden.",
        ],
      },
      {
        heading: "Firmabiler og private bilejere på Østerbro",
        paragraphs: [
          "Østerbro har mange kontorer, ambassader, konsulater og internationale virksomheder. Firmabiler skal fremstå præsentable, og CleanWash kan hjælpe med regelmæssig bilvask og bilpleje. Private bilejere nyder godt af en professionel bilvask, der sparer tid og giver et godt resultat.",
          "Kunder kan booke bilvask direkte via booking-siden. Vælg den service, der passer til bilen, og angiv relevante oplysninger. CleanWash håndterer resten.",
        ],
      },
    ],
    faqs: [
      { question: "Tilbyder CleanWash bilvask på Østerbro?", answer: "Ja. CleanWash tilbyder professionel bilvask på Østerbro og i nærliggende bydele med online booking." },
      { question: "Dækker CleanWash Nordhavn?", answer: "Ja. Nordhavn er del af Østerbro-området og er relevant for CleanWashs serviceområde." },
      { question: "Kan jeg booke komplet bilpleje på Østerbro?", answer: "Ja. Du kan vælge udvendig vask, indvendig rengøring eller komplet bilpleje i bookingflowet." },
      { question: "Er servicen relevant for firmabiler på Østerbro?", answer: "Ja. CleanWash tilbyder bilvask til private og erhverv, herunder firmabiler og leasingbiler." },
      { question: "Hvad koster bilvask på Østerbro?", answer: "Prisen afhænger af den valgte service. Se aktuelle priser og book online via /booking." },
      { question: "Hvordan booker jeg bilvask på Østerbro?", answer: "Gå til /booking, vælg service og udfyld oplysninger om bil, adresse og ønsket tidspunkt." },
    ],
    relatedLinks: commonRelatedLinks.filter((link) => link.href !== "/bilvask-osterbro"),
    priority: 0.87,
  },

  {
    slug: "bilvask-roskilde",
    title: "Bilvask Roskilde | Professionel bilrengøring i Roskilde",
    description:
      "Book professionel bilvask i Roskilde hos CleanWash. Udvendig vask, indvendig bilrengøring og komplet bilpleje med nem online booking.",
    h1: "Bilvask Roskilde",
    eyebrow: "Professionel bilvask i Roskilde",
    heroIntro:
      "CleanWash tilbyder professionel bilvask og bilrengøring i Roskilde med online booking og klare servicevalg.",
    shortSummary: [
      "CleanWash tilbyder bilvask i Roskilde og på Sjælland med online booking.",
      "Servicen er relevant for bilejere i Roskilde og nærliggende byer på Sjælland.",
      "Book udvendig vask, indvendig rengøring eller komplet bilpleje direkte i bookingflowet.",
    ],
    keywords: [
      "bilvask Roskilde",
      "bilrengøring Roskilde",
      "bilpleje Roskilde",
      "mobil bilvask Roskilde",
      "bilvask Sjælland",
    ],
    serviceType: "Professionel bilvask i Roskilde",
    serviceArea: [
      "Roskilde",
      "Lejre",
      "Greve",
      "Køge",
      "Holbæk",
      "Sjælland",
      "Storkøbenhavn",
    ],
    schemaAreaServed: ["Roskilde", "Sjælland", "Zealand", "Denmark"],
    image: { src: "/service/helebil.jpg", alt: "Professionel bilvask i Roskilde hos CleanWash" },
    secondaryCta: { label: "Se bilvask Sjælland", href: "/bilvask-sjaelland" },
    benefits: [
      { title: "Roskilde og omegn", text: "CleanWash er relevant for bilejere i Roskilde og nærliggende kommuner på Sjælland." },
      { title: "Online booking", text: "Book bilvask direkte online uden kø eller telefonopkald." },
      { title: "Alle servicetyper", text: "Vælg udvendig vask, indvendig rengøring eller komplet bilpleje i bookingflowet." },
      { title: "Til private og erhverv", text: "Passer til familiebiler, pendlerbiler, firmabiler og leasingbiler." },
    ],
    process: [
      { title: "Book online", text: "Gå til booking-siden og vælg den bilvask, der passer til bilen." },
      { title: "Oplys bil og adresse", text: "Angiv nummerplade, kontaktoplysninger og ønsket tidspunkt." },
      { title: "CleanWash forbereder", text: "Teamet klargør service og rute ud fra din booking." },
      { title: "Bilen vaskes", text: "Du får en renere bil leveret professionelt uden ventetid." },
    ],
    sections: [
      {
        heading: "Bilvask i Roskilde — professionel og nem",
        paragraphs: [
          "Roskilde er en af de største byer på Sjælland og et vigtigt trafikknudepunkt med mange pendlere til og fra København. Bilejere i Roskilde har brug for en nem og professionel bilvaskløsning, der passer ind i en travl hverdag. CleanWash tilbyder bilvask i Roskilde med online booking og klare servicevalg.",
          "Biler, der bruges til pendling på motorvejen, samler snavs hurtigt. Vejsnavs, vejsalt om vinteren og insekter om sommeren belaster lakken og kræver regelmæssig vask for at beholde et pænt udtryk. CleanWash hjælper med at holde bilen ren og præsentabel.",
        ],
      },
      {
        heading: "Hvad tilbyder CleanWash i Roskilde?",
        paragraphs: [
          "CleanWash tilbyder udvendig bilvask, indvendig bilrengøring og komplet bilpleje til kunder i Roskilde. Udvendig vask fjerner vejsnavs fra lak, ruder, fælge og hjulbuer. Indvendig rengøring fokuserer på kabine, støvsugning, måtter og sæder. Komplet bilpleje giver den mest grundige løsning.",
          "Booking foregår online. Du vælger service, angiver biloplysninger og ønsket tidspunkt. Den konkrete mulighed afhænger af adresse, rute og ledige tider, men bookingflowet samler oplysningerne, så opgaven kan planlægges effektivt.",
        ],
      },
      {
        heading: "Roskilde: pendlerbiler og familiebiler",
        paragraphs: [
          "Mange af Roskildes bilejere bruger bilen dagligt til pendling til København og andre byer på Sjælland. Pendlerbiler bruges hårdt og trænger til jævnlig bilvask, både udvendigt for lakken og indvendigt for kabinens komfort. CleanWash er en relevant løsning for pendlere, der vil have bilen ren uden at bruge tid på det i en travl uge.",
          "Familier i Roskilde bruger bilen til børnekørsel, indkøb og weekendture. Indvendig rengøring er særlig relevant for familiebiler, hvor kabinen hurtigt samler støv, sand og rester fra daglig brug. En professionel rengøring giver kabinen en frisk start.",
        ],
      },
      {
        heading: "Roskilde og nærliggende byer på Sjælland",
        paragraphs: [
          "CleanWash er relevant for kunder i Roskilde og nærliggende kommuner som Lejre, Greve og Køge. Den konkrete dækning afhænger af booking og ruteplanlægning. Kunder fra disse områder kan starte booking-processen online og afklare muligheder direkte.",
          "Bilvask i Roskilde er en del af CleanWashs bredere fokus på professionel bilpleje på Sjælland. Kunder kan booke bilvask direkte via booking-siden og vælge den service, der passer til bilen.",
        ],
      },
    ],
    faqs: [
      { question: "Tilbyder CleanWash bilvask i Roskilde?", answer: "Ja. CleanWash tilbyder professionel bilvask i Roskilde og på Sjælland med online booking." },
      { question: "Er CleanWash relevant for pendlere i Roskilde?", answer: "Ja. Pendlerbiler trænger jævnligt til bilvask, og CleanWash gør booking nem og fleksibel." },
      { question: "Kan jeg få indvendig rengøring i Roskilde?", answer: "Ja. Du kan vælge indvendig rengøring, udvendig vask eller komplet bilpleje i bookingflowet." },
      { question: "Dækker CleanWash hele Roskilde?", answer: "CleanWash er relevant for Roskilde og nærliggende kommuner. Konkret dækning afhænger af booking og rute." },
      { question: "Hvad koster bilvask i Roskilde?", answer: "Prisen afhænger af den valgte service. Se aktuelle priser og book online via /booking." },
      { question: "Hvordan booker jeg bilvask i Roskilde?", answer: "Gå til /booking, vælg service og udfyld oplysninger om bil og ønsket tidspunkt." },
    ],
    relatedLinks: commonRelatedLinks.filter((link) => link.href !== "/bilvask-roskilde"),
    priority: 0.86,
  },

  {
    slug: "bilvask-koege",
    title: "Bilvask Køge | Professionel bilvask hos CleanWash",
    description:
      "Book professionel bilvask i Køge hos CleanWash. Udvendig vask, indvendig bilrengøring og komplet bilpleje med nem online booking på Sjælland.",
    h1: "Bilvask Køge",
    eyebrow: "Professionel bilvask i Køge",
    heroIntro:
      "CleanWash tilbyder professionel bilvask og bilrengøring i Køge med online booking og klare servicevalg til private og erhverv.",
    shortSummary: [
      "CleanWash tilbyder bilvask i Køge og på Sydsjælland med online booking.",
      "Servicen er relevant for bilejere i Køge, Stevns, Greve og nærliggende kommuner.",
      "Book udvendig vask, indvendig rengøring eller komplet bilpleje direkte i bookingflowet.",
    ],
    keywords: [
      "bilvask Køge",
      "bilrengøring Køge",
      "bilpleje Køge",
      "mobil bilvask Køge",
      "bilvask Sydsjælland",
    ],
    serviceType: "Professionel bilvask i Køge",
    serviceArea: [
      "Køge",
      "Greve",
      "Stevns",
      "Solrød",
      "Ringsted",
      "Sjælland",
      "Storkøbenhavn",
    ],
    schemaAreaServed: ["Køge", "Sjælland", "Zealand", "Denmark"],
    image: { src: "/service/udenfor.jpg", alt: "Professionel bilvask i Køge hos CleanWash" },
    secondaryCta: { label: "Se bilvask Sjælland", href: "/bilvask-sjaelland" },
    benefits: [
      { title: "Køge og omegn", text: "CleanWash er relevant for bilejere i Køge og nærliggende kommuner på Sjælland." },
      { title: "Fleksibel booking", text: "Book bilvask online og vælg den service, der passer til bilens stand og behov." },
      { title: "Komplet bilpleje", text: "Udvendig vask, indvendig rengøring eller komplet bilpleje kan bookes online." },
      { title: "Til alle biltyper", text: "Passer til familiebiler, pendlerbiler, firmabiler og leasingbiler." },
    ],
    process: [
      { title: "Book online", text: "Gå til booking-siden og vælg den bilvask, der passer til bilen." },
      { title: "Oplys bil og behov", text: "Angiv nummerplade, adresse og ønsket tidspunkt for bilvasken." },
      { title: "CleanWash klargør", text: "Teamet forbereder rute og service ud fra din booking." },
      { title: "Bilen vaskes professionelt", text: "Du får en renere bil leveret uden kø og ventetid." },
    ],
    sections: [
      {
        heading: "Bilvask i Køge — professionel bilpleje på Sjælland",
        paragraphs: [
          "Køge er en voksende by på Sydsjælland med mange bilejere, der pendler til København og andre byer. Bilvask Køge er et relevant søgeord for alle, der vil have bilen gjort ren uden at køre til en vaskehal i storbyen. CleanWash tilbyder professionel bilvask i Køge med online booking og tydelige servicevalg.",
          "Med S-tog til København og motorvejsadgang er Køge et centralt punkt på Sjælland. Pendlerbiler og familiebiler i Køge bruges hårdt og trænger til jævnlig bilvask for at bevare et pænt udtryk. CleanWash hjælper med udvendig vask og indvendig rengøring.",
        ],
      },
      {
        heading: "Hvad tilbyder CleanWash i Køge?",
        paragraphs: [
          "CleanWash tilbyder udvendig bilvask, indvendig bilrengøring og komplet bilpleje til kunder i Køge. Udvendig vask fjerner snavs fra lak, ruder og fælge. Indvendig rengøring fokuserer på kabine, støvsugning og sæder. Komplet bilpleje kombinerer begge dele for det bedste resultat.",
          "Booking foregår online. Du vælger service, angiver biloplysninger og ønsket tidspunkt. Den konkrete mulighed afhænger af rute og ledige tider, men bookingflowet giver alle relevante oplysninger.",
        ],
      },
      {
        heading: "Køge og nærliggende kommuner",
        paragraphs: [
          "Køge grænser op til Greve, Stevns, Solrød og Ringsted. CleanWash er relevant for kunder i disse kommuner og kan håndtere booking fra hele Sydsjælland. Den konkrete dækning afhænger af adresse og ruteplanlægning.",
          "Bilejere fra Køge og omegn kan starte booking-processen online og afklare muligheder direkte. Kunder kan booke bilvask direkte via booking-siden.",
        ],
      },
      {
        heading: "Erhvervskunder og private i Køge",
        paragraphs: [
          "Køge har et stærkt erhvervsliv med mange virksomheder, lagerhoteller og industri. Firmabiler og erhvervsbiler skal fremstå præsentable, og CleanWash kan hjælpe med regelmæssig bilvask og bilpleje. Private bilejere nyder godt af en professionel service, der sparer tid.",
          "Kunder kan booke bilvask direkte via booking-siden. Vælg den service, der passer til bilen, og angiv relevante oplysninger. CleanWash håndterer resten.",
        ],
      },
    ],
    faqs: [
      { question: "Tilbyder CleanWash bilvask i Køge?", answer: "Ja. CleanWash tilbyder professionel bilvask i Køge og på Sjælland med online booking." },
      { question: "Dækker CleanWash Greve og Stevns?", answer: "CleanWash er relevant for Køge og nærliggende kommuner. Konkret dækning afhænger af booking og rute." },
      { question: "Kan jeg booke indvendig rengøring i Køge?", answer: "Ja. Du kan vælge indvendig rengøring, udvendig vask eller komplet bilpleje i bookingflowet." },
      { question: "Er CleanWash relevant for erhvervskunder i Køge?", answer: "Ja. CleanWash tilbyder bilvask til private og erhverv, herunder firmabiler og flådeaftaler." },
      { question: "Hvad koster bilvask i Køge?", answer: "Prisen afhænger af den valgte service. Se aktuelle priser og book online via /booking." },
      { question: "Hvordan booker jeg bilvask i Køge?", answer: "Gå til /booking, vælg service og udfyld oplysninger om bil og ønsket tidspunkt." },
    ],
    relatedLinks: commonRelatedLinks.filter((link) => link.href !== "/bilvask-koege"),
    priority: 0.85,
  },

  {
    slug: "bilvask-hellerup",
    title: "Bilvask Hellerup | Professionel bilpleje hos CleanWash",
    description:
      "Book professionel bilvask i Hellerup hos CleanWash. Skånsom udvendig vask, indvendig bilrengøring og premium bilpleje med online booking.",
    h1: "Bilvask Hellerup",
    eyebrow: "Professionel bilvask i Hellerup",
    heroIntro:
      "CleanWash tilbyder professionel bilvask og premium bilpleje i Hellerup med online booking og klare servicevalg.",
    shortSummary: [
      "CleanWash tilbyder bilvask i Hellerup og Gentofte-området med online booking.",
      "Servicen er relevant for bilejere i Hellerup, Gentofte, Charlottenlund og nærliggende bydele.",
      "Book udvendig vask, indvendig rengøring eller premium bilpleje direkte i bookingflowet.",
    ],
    keywords: [
      "bilvask Hellerup",
      "bilrengøring Hellerup",
      "bilpleje Hellerup",
      "mobil bilvask Hellerup",
      "bilvask Gentofte",
    ],
    serviceType: "Professionel bilvask i Hellerup",
    serviceArea: [
      "Hellerup",
      "Gentofte",
      "Charlottenlund",
      "Ordrup",
      "Klampenborg",
      "Østerbro",
      "Storkøbenhavn",
    ],
    schemaAreaServed: ["Hellerup", "Gentofte", "København", "Copenhagen", "Denmark"],
    image: { src: "/service/helebil.jpg", alt: "Professionel bilvask i Hellerup hos CleanWash" },
    secondaryCta: { label: "Se håndvask af bil", href: "/haandvask-bil-koebenhavn" },
    benefits: [
      { title: "Hellerup og Gentofte", text: "CleanWash er relevant for bilejere i Hellerup, Gentofte, Charlottenlund og nærliggende villakvarterer." },
      { title: "Premium bilpleje", text: "Skånsom og grundig bilvask med fokus på lak, finish og professionelt resultat." },
      { title: "Nem online booking", text: "Book bilvask direkte online og vælg den service, der passer til bilen." },
      { title: "Til private og erhverv", text: "Passer til velholdte privatbiler, firmabiler, leasingbiler og biler før salg." },
    ],
    process: [
      { title: "Book online", text: "Gå til booking-siden og vælg den bilvask, der passer til bilen." },
      { title: "Oplys bil og adresse", text: "Angiv nummerplade, kontaktoplysninger og ønsket tidspunkt." },
      { title: "CleanWash planlægger", text: "Teamet forbereder rute og service ud fra din booking." },
      { title: "Professionelt resultat", text: "Bilen vaskes grundigt og afleveres med et pænt og præsentabelt udtryk." },
    ],
    sections: [
      {
        heading: "Bilvask i Hellerup — premium bilpleje nord for København",
        paragraphs: [
          "Hellerup er et velhavende villakvarter nord for København med mange bilejere, der sætter pris på kvalitet og professionel service. Bilvask Hellerup er et relevant søgeord for bilejere, der vil have bilen gjort ordentlig ren med fokus på skånsom behandling og godt finish. CleanWash tilbyder professionel bilvask med online booking og klare servicevalg.",
          "Biler i Hellerup og Gentofte-området er ofte velholdte og køres af ejere, der går op i bilens stand. Udvendig vask, indvendig rengøring og komplet bilpleje er alle relevante services. CleanWash arbejder grundigt og skånsomt, så bilen bevarer sit gode udtryk.",
        ],
      },
      {
        heading: "Hvad tilbyder CleanWash i Hellerup?",
        paragraphs: [
          "CleanWash tilbyder udvendig bilvask, indvendig bilrengøring og komplet bilpleje til kunder i Hellerup. Udvendig vask fjerner snavs fra lak, ruder, fælge og spejle. Indvendig rengøring fokuserer på kabine, støvsugning, sæder og instrumentbræt. Komplet bilpleje giver det mest gennemførte resultat.",
          "Booking foregår online. Du vælger service, angiver biloplysninger og ønsket tidspunkt. Den konkrete mulighed afhænger af adresse og rute, men bookingflowet samler alle oplysninger.",
        ],
      },
      {
        heading: "Hellerup, Gentofte og Charlottenlund",
        paragraphs: [
          "Hellerup grænser op til Gentofte, Charlottenlund, Ordrup og Klampenborg. CleanWash er relevant for kunder i hele dette villakvarter nord for København. Dækningsområdet afhænger af booking og ruteplanlægning, men du kan starte processen online.",
          "Mange bilejere i dette område søger en professionel bilvask, der tager sig af bilen med omhu. CleanWash tilbyder en service, der er skånsom over for lakken og giver et synligt og pænt resultat.",
        ],
      },
      {
        heading: "Bilvask til salg, fremvisning og hverdag",
        paragraphs: [
          "I Hellerup og Gentofte-området skifter mange bilejere bil hyppigt. En professionel bilvask inden salg eller fremvisning kan gøre bilen mere attraktiv og løfte dens oplevede stand. CleanWash kan hjælpe med en grundig vask, der gør bilen klar til billeder eller fremvisning.",
          "Kunder kan booke bilvask direkte via booking-siden. Vælg den service, der passer til bilen, og angiv relevante oplysninger. CleanWash håndterer resten og leverer et professionelt resultat.",
        ],
      },
    ],
    faqs: [
      { question: "Tilbyder CleanWash bilvask i Hellerup?", answer: "Ja. CleanWash tilbyder professionel bilvask i Hellerup og nærliggende bydele som Gentofte og Charlottenlund." },
      { question: "Er CleanWash relevant for Gentofte og Charlottenlund?", answer: "Ja. Gentofte og Charlottenlund er del af CleanWashs serviceområde nord for København." },
      { question: "Tilbyder I premium bilpleje i Hellerup?", answer: "Ja. Du kan vælge premium bilpleje med polering og voksbeskyttelse i bookingflowet." },
      { question: "Er servicen relevant inden bilsalg?", answer: "Ja. En professionel bilvask kan gøre bilen mere præsentabel inden billeder, fremvisning eller salg." },
      { question: "Hvad koster bilvask i Hellerup?", answer: "Prisen afhænger af den valgte service. Se aktuelle priser og book online via /booking." },
      { question: "Hvordan booker jeg bilvask i Hellerup?", answer: "Gå til /booking, vælg service og udfyld oplysninger om bil og ønsket tidspunkt." },
    ],
    relatedLinks: commonRelatedLinks.filter((link) => link.href !== "/bilvask-hellerup"),
    priority: 0.85,
  },

  // ── Pricing page ─────────────────────────────────────────────────────────────

  {
    slug: "bilvask-pris",
    title: "Bilvask pris København | Hvad koster en bilvask? | CleanWash",
    description:
      "Se priser på bilvask i København hos CleanWash. Udvendig bilvask fra 349 kr., komplet bilpleje fra 599 kr. Klar pris — ingen skjulte gebyrer.",
    h1: "Bilvask pris",
    eyebrow: "Priser og pakker",
    heroIntro:
      "CleanWash tilbyder professionel bilvask fra 349 kr. med klar pris, ingen skjulte gebyrer og nem online booking i København og på Sjælland.",
    shortSummary: [
      "Udvendig bilvask fra 349 kr. — skånsom vask med skum og skyl, fælge og ruder.",
      "Komplet bilvask fra 599 kr. — udvendig vask og grundig indvendig rengøring af kabinen.",
      "Premium bilpleje fra 849 kr. — komplet vask med polering, voksbeskyttelse og klargøring til salg.",
    ],
    keywords: [
      "bilvask pris",
      "hvad koster en bilvask",
      "bilvask pris København",
      "bilrengøring pris",
      "komplet bilvask pris",
    ],
    serviceType: "Bilvask og bilpleje med klar pris",
    serviceArea: [
      "København",
      "Frederiksberg",
      "Amager",
      "Østerbro",
      "Sjælland",
      "Storkøbenhavn",
    ],
    schemaAreaServed: ["København", "Copenhagen", "Sjælland", "Denmark"],
    image: { src: "/service/helebil.jpg", alt: "Bilvask pris og pakker hos CleanWash" },
    secondaryCta: { label: "Book bilvask online", href: "/booking" },
    benefits: [
      { title: "Klar pris fra start", text: "Du ser prisen, inden du booker. Ingen skjulte gebyrer eller tillæg ved levering." },
      { title: "Betal efter vask", text: "Du betaler kun, når bilvasken er udført og du er tilfreds med resultatet." },
      { title: "Fast pris per pakke", text: "Prisen afhænger af valgt service og biltype — alt er tydeligt i bookingflowet." },
      { title: "Nem sammenligning", text: "Tre tydelige pakker gør det nemt at vælge den rigtige service til bilens behov." },
    ],
    process: [
      { title: "Se priser online", text: "Se alle priser og pakker direkte i bookingflowet og vælg den, der passer." },
      { title: "Book og betal", text: "Bekræft booking og se den endelige pris, inden du forpligter dig." },
      { title: "Bilen vaskes", text: "CleanWash udfører den valgte bilvask med professionelt udstyr." },
      { title: "Betal ved levering", text: "Du betaler kun, når bilen er vasket og du er tilfreds med resultatet." },
    ],
    sections: [
      {
        heading: "Hvad koster en bilvask hos CleanWash?",
        paragraphs: [
          "Bilvask pris er et af de mest søgte spørgsmål, når man overvejer at få bilen vasket professionelt. CleanWash tilbyder tre klare pakker: udvendig bilvask fra 349 kr., komplet bilvask fra 599 kr. og premium bilpleje fra 849 kr. Prisen afhænger af biltype og konkret service, men udgangspunktet er altid tydeligt i bookingflowet.",
          "Det er vigtigt at sammenligne mere end bare prisen. En billig bilvask, der ikke rengør ordentligt, er ingen besparelse. CleanWash tilbyder en klar pris, professionelt udstyr og et synligt resultat. Du betaler kun, når bilvasken er udført.",
        ],
      },
      {
        heading: "Udvendig bilvask fra 349 kr.",
        paragraphs: [
          "Udvendig bilvask er den hurtige løsning til biler, der primært er beskidte udenpå. Prisen starter fra 349 kr. og inkluderer skånsom vask med skum og skyl, rengøring af fælge og hjulbuer, aftørring af ruder og spejle samt finish og tøring af bil.",
          "Udvendig vask er relevant for biler, der ser pæne ud indvendigt men har samlet vejsnavs, regn, pollen eller bremsestøv på lakken. En regelmæssig udvendig vask holder lakken i bedre stand og giver bilen et pænere udtryk i hverdagen.",
        ],
      },
      {
        heading: "Komplet bilvask fra 599 kr.",
        paragraphs: [
          "Komplet bilvask fra 599 kr. inkluderer alt fra udvendig vask og tilføjer grundig indvendig rengøring: støvsugning af kabine og bagagerum, rengøring af instrumentbræt og paneler, behandling af vinyl, rat og sæder samt frisk og klar bil ved aflevering.",
          "Komplet bilvask er den mest populære service og giver det bedste helhedsbillede af bilen. Det er den rigtige valg for familier, pendlere og erhvervskunder, der vil have en bil, der er ren både ude og inde.",
        ],
      },
      {
        heading: "Premium bilpleje fra 849 kr.",
        paragraphs: [
          "Premium bilpleje fra 849 kr. inkluderer alt fra komplet bilvask og tilføjer polering og voksbeskyttelse, dybderens af sæder og tæpper samt klargøring til salg eller fremvisning. Det er den mest grundige service og er relevant for bilejere, der vil have det absolut bedste resultat.",
          "Premium bilpleje er særligt populær inden bilsalg, leasingretur eller fremvisning, fordi det giver bilen det bedst mulige udtryk. Polering fjerner fine ridser og matte pletter, mens voks beskytter lakken og giver en glansfuld finish.",
        ],
      },
    ],
    faqs: [
      { question: "Hvad koster en udvendig bilvask hos CleanWash?", answer: "Udvendig bilvask starter fra 349 kr. og inkluderer vask, fælge, ruder og finish." },
      { question: "Hvad koster komplet bilvask?", answer: "Komplet bilvask starter fra 599 kr. og inkluderer udvendig vask og grundig indvendig rengøring." },
      { question: "Hvad koster premium bilpleje?", answer: "Premium bilpleje starter fra 849 kr. og inkluderer alt fra komplet bilvask plus polering og voksbeskyttelse." },
      { question: "Er der skjulte gebyrer?", answer: "Nej. CleanWash tilbyder klar pris fra start. Du ser prisen, inden du booker, og betaler kun, når vasken er udført." },
      { question: "Kan jeg se den præcise pris, inden jeg booker?", answer: "Ja. Den endelige pris vises i bookingflowet, inden du bekræfter din bestilling." },
      { question: "Hvordan booker jeg bilvask til den viste pris?", answer: "Gå til /booking, vælg den pakke, der passer til bilen, og udfyld oplysninger. Den endelige pris vises under booking." },
    ],
    relatedLinks: commonRelatedLinks.filter((link) => link.href !== "/bilvask-pris"),
    priority: 0.91,
  },

  // ── English page ─────────────────────────────────────────────────────────────

  {
    slug: "car-wash-copenhagen",
    title: "Car Wash Copenhagen | Professional Mobile Car Wash | CleanWash",
    description:
      "Book professional car wash in Copenhagen with CleanWash. Mobile car wash at your address, interior cleaning, exterior wash and business accounts.",
    h1: "Car Wash Copenhagen",
    eyebrow: "Professional mobile car wash",
    heroIntro:
      "CleanWash offers professional car wash in Copenhagen and Zealand. Book online, choose your service and get your car cleaned without queuing.",
    shortSummary: [
      "CleanWash offers professional car wash in Copenhagen with online booking and transparent pricing.",
      "Choose exterior wash, interior cleaning or complete car detailing directly in the booking flow.",
      "The service covers Copenhagen, Frederiksberg, Amager, the bridge districts and Greater Copenhagen.",
    ],
    keywords: [
      "car wash Copenhagen",
      "mobile car wash Copenhagen",
      "car cleaning Copenhagen",
      "professional car wash Denmark",
      "car detailing Copenhagen",
    ],
    serviceType: "Professional car wash in Copenhagen",
    serviceArea: [
      "Copenhagen",
      "Frederiksberg",
      "Amager",
      "Østerbro",
      "Nørrebro",
      "Vesterbro",
      "Hellerup",
      "Gentofte",
    ],
    schemaAreaServed: ["København", "Copenhagen", "Sjælland", "Zealand", "Denmark"],
    image: { src: "/service/helebil.jpg", alt: "Professional car wash in Copenhagen by CleanWash" },
    secondaryCta: { label: "Book car wash", href: "/booking" },
    benefits: [
      { title: "Mobile service", text: "We come to your address in Copenhagen — no queuing, no wasted time driving to a car wash." },
      { title: "Online booking", text: "Book your car wash online in minutes. Choose service, time and car details in one simple flow." },
      { title: "Transparent pricing", text: "Clear prices from the start. You see the full price before you confirm your booking." },
      { title: "For private and business", text: "Suitable for private car owners, commuters, company cars and fleet accounts." },
    ],
    process: [
      { title: "Book online", text: "Go to the booking page and choose the car wash service that fits your needs." },
      { title: "Enter car details", text: "Provide your license plate, address and preferred time for the car wash." },
      { title: "CleanWash prepares", text: "Our team prepares the service and plans the route based on your booking." },
      { title: "Car washed and delivered", text: "Your car is professionally washed and delivered without queues or delays." },
    ],
    sections: [
      {
        heading: "Professional car wash in Copenhagen",
        paragraphs: [
          "Finding a professional car wash in Copenhagen can be challenging when you are busy with work, family and daily life. CleanWash makes it easier by offering mobile car wash with online booking, clear service options and transparent pricing. You choose when and where — we take care of the rest.",
          "Copenhagen cars accumulate city dirt quickly: brake dust from traffic, pollen from the parks, road salt in winter and everyday grime. Regular professional car washing keeps your car looking good and protects the paintwork from long-term damage.",
        ],
      },
      {
        heading: "What does CleanWash offer in Copenhagen?",
        paragraphs: [
          "CleanWash offers three main services: exterior car wash from 349 DKK, complete car wash from 599 DKK and premium car detailing from 849 DKK. Exterior wash covers paintwork, windows, alloy wheels and wheel arches. Complete car wash adds interior cleaning including vacuuming, dashboard, seats and mats. Premium detailing adds polishing, wax protection and preparation for sale or presentation.",
          "All services can be booked online. You select the service, provide car details and choose a time that works for you. The booking flow gives you a clear price before you confirm your order.",
        ],
      },
      {
        heading: "Copenhagen neighbourhoods we cover",
        paragraphs: [
          "CleanWash is relevant for car owners across Copenhagen, including Frederiksberg, Amager, Østerbro, Nørrebro, Vesterbro, Valby, Hellerup, Gentofte and Greater Copenhagen. We also serve parts of Zealand including Roskilde, Køge, Hillerød and Helsingør. The exact coverage depends on availability and routing — check the booking page for your address.",
          "Whether you live in a city apartment in Nørrebro, a house in Gentofte, or work in an office near Nordhavn, CleanWash can help you get your car cleaned without disrupting your day.",
        ],
      },
      {
        heading: "Business car wash and fleet accounts",
        paragraphs: [
          "CleanWash works with businesses in Copenhagen that need regular car washing for their fleet. Company cars, lease vehicles, taxis, transport companies and car dealerships can all benefit from a professional and reliable car wash service. Contact us to discuss a business account tailored to your needs.",
          "A clean company car makes a better impression on clients and colleagues. CleanWash handles the logistics so your team does not need to coordinate car washing themselves.",
        ],
      },
    ],
    faqs: [
      { question: "Does CleanWash offer car wash in Copenhagen?", answer: "Yes. CleanWash offers professional car wash in Copenhagen and Greater Copenhagen with online booking." },
      { question: "How much does a car wash cost in Copenhagen?", answer: "Exterior wash starts from 349 DKK, complete car wash from 599 DKK and premium detailing from 849 DKK." },
      { question: "Can I book a car wash at my home address?", answer: "Yes. You can book car wash at your home, workplace or any other location where the car is legally parked." },
      { question: "Do you offer interior car cleaning?", answer: "Yes. Our complete car wash includes full interior cleaning: vacuuming, dashboard, seats, mats and windows." },
      { question: "Does CleanWash serve expats and tourists in Copenhagen?", answer: "Yes. CleanWash serves all car owners in Copenhagen regardless of nationality. Booking is available online." },
      { question: "How do I book a car wash in Copenhagen?", answer: "Go to /booking, select your preferred service and enter your car details, address and preferred time." },
    ],
    relatedLinks: commonRelatedLinks.filter((link) => link.href !== "/car-wash-copenhagen"),
    priority: 0.88,
  },

  // ── More neighborhoods ───────────────────────────────────────────────────────

  {
    slug: "bilvask-noerrebro",
    title: "Bilvask Nørrebro | Professionel bilvask hos CleanWash",
    description:
      "Book professionel bilvask på Nørrebro hos CleanWash. Udvendig vask, indvendig bilrengøring og komplet bilpleje med online booking.",
    h1: "Bilvask Nørrebro",
    eyebrow: "Professionel bilvask på Nørrebro",
    heroIntro:
      "CleanWash tilbyder professionel bilvask på Nørrebro med online booking og klare servicevalg til private og erhverv i en travl bydel.",
    shortSummary: [
      "CleanWash tilbyder bilvask på Nørrebro og i nærliggende bydele med online booking.",
      "Du kan vælge udvendig vask, indvendig rengøring eller komplet bilpleje i bookingflowet.",
      "Servicen er relevant for bilejere på Nørrebro, Bispebjerg, Frederiksberg og Ydre Nørrebro.",
    ],
    keywords: [
      "bilvask Nørrebro",
      "bilrengøring Nørrebro",
      "bilpleje Nørrebro",
      "mobil bilvask Nørrebro",
      "bilvask nær mig Nørrebro",
    ],
    serviceType: "Professionel bilvask på Nørrebro",
    serviceArea: ["Nørrebro", "Bispebjerg", "Ydre Nørrebro", "Frederiksberg", "Østerbro", "København"],
    schemaAreaServed: ["Nørrebro", "København", "Copenhagen", "Denmark"],
    image: { src: "/service/udenfor.jpg", alt: "Professionel bilvask på Nørrebro hos CleanWash" },
    secondaryCta: { label: "Se bilvask København", href: "/bilvask-koebenhavn" },
    benefits: [
      { title: "Lokal service", text: "CleanWash er relevant for bilejere på Nørrebro, Bispebjerg og nærliggende bydele." },
      { title: "Online booking", text: "Book bilvask online og vælg service, tidspunkt og biloplysninger i ét flow." },
      { title: "Alle servicetyper", text: "Udvendig vask, indvendig rengøring eller komplet bilpleje — alt bookes online." },
      { title: "Til private og erhverv", text: "Passer til hverdagsbiler, firmabiler og pendlerbiler i bydelen." },
    ],
    process: [
      { title: "Book online", text: "Gå til booking-siden og vælg den bilvask, der passer til bilen." },
      { title: "Oplys bil og adresse", text: "Angiv nummerplade, kontaktoplysninger og ønsket tidspunkt." },
      { title: "CleanWash klargør", text: "Teamet forbereder rute og service ud fra din booking." },
      { title: "Ren bil", text: "Du får en renere bil uden kø og transport til vaskehal." },
    ],
    sections: [
      {
        heading: "Bilvask på Nørrebro — professionel og nem",
        paragraphs: [
          "Nørrebro er en af Københavns mest levende bydele med mange bilejere, der kæmper med begrænset parkering og en travl hverdag. Bilvask Nørrebro er relevant for alle, der vil have bilen gjort ren uden at bruge ekstra tid på transport og kø. CleanWash tilbyder professionel bilvask med online booking og klare servicevalg.",
          "Biler på Nørrebro samler typisk bysnavs fra tæt trafik, cykelstier og den intensive daglige brug. Vejsnavs, bremsestøv og pollen er hyppige udfordringer. En professionel bilvask holder bilen pænere og giver en bedre hverdagsoplevelse.",
        ],
      },
      {
        heading: "Nørrebro og nærliggende bydele",
        paragraphs: [
          "Nørrebro grænser op til Bispebjerg, Frederiksberg, Østerbro og det indre København. CleanWash er relevant for bilejere i hele dette område. Den konkrete dækning afhænger af adresse, rute og ledige tider, men booking-siden samler alle oplysninger.",
          "Ydre Nørrebro og Bispebjerg har mange parcelhuse og større boligblokke med tilhørende biler. Disse bilejere søger ofte efter en professionel og fleksibel bilvaskløsning, der ikke kræver transport til en vaskehal.",
        ],
      },
      {
        heading: "Hvad CleanWash tilbyder på Nørrebro",
        paragraphs: [
          "CleanWash tilbyder udvendig bilvask, indvendig bilrengøring og komplet bilpleje til kunder på Nørrebro. Udvendig vask fjerner snavs fra lak, ruder og fælge. Indvendig rengøring fokuserer på kabine, støvsugning og sæder. Komplet bilpleje kombinerer begge dele.",
          "Kunder kan booke bilvask direkte via booking-siden. Vælg den service, der passer til bilen, og angiv relevante oplysninger. CleanWash håndterer resten.",
        ],
      },
      {
        heading: "Parkering og bilvask på Nørrebro",
        paragraphs: [
          "Parkering er en daglig udfordring på Nørrebro. Mange bilejere parkerer langt fra hjemmet og har ikke mulighed for at flytte bilen til en vaskehal i åbningstiden. En mobil bilvask løser dette problem, fordi bilen kan vaskes, hvor den allerede holder.",
          "CleanWash planlægger ruter effektivt og kan bookes til den adresse, hvor bilen holder. Det gør bilvask på Nørrebro mere tilgængeligt og nemmere at passe ind i en travl hverdag.",
        ],
      },
    ],
    faqs: [
      { question: "Tilbyder CleanWash bilvask på Nørrebro?", answer: "Ja. CleanWash tilbyder professionel bilvask på Nørrebro og nærliggende bydele med online booking." },
      { question: "Kan I vaske bilen, selv om jeg har begrænset parkering?", answer: "Ja. CleanWash vasker bilen, hvor den holder. Angiv adressen i bookingflowet for at afklare muligheder." },
      { question: "Dækker I Bispebjerg og Ydre Nørrebro?", answer: "Ja. Bispebjerg og Ydre Nørrebro er del af CleanWashs serviceområde nord for indre by." },
      { question: "Kan jeg booke komplet bilpleje på Nørrebro?", answer: "Ja. Du kan vælge udvendig vask, indvendig rengøring eller komplet bilpleje i bookingflowet." },
      { question: "Hvad koster bilvask på Nørrebro?", answer: "Udvendig bilvask fra 349 kr., komplet bilvask fra 599 kr. Se alle priser via /booking." },
      { question: "Hvordan booker jeg bilvask på Nørrebro?", answer: "Gå til /booking, vælg service og udfyld oplysninger om bil, adresse og ønsket tidspunkt." },
    ],
    relatedLinks: [
      { label: "Book bilvask", href: "/booking" },
      { label: "Bilvask København", href: "/bilvask-koebenhavn" },
      { label: "Bilvask Frederiksberg", href: "/bilvask-frederiksberg" },
      { label: "Bilvask Østerbro", href: "/bilvask-osterbro" },
      { label: "Mobil bilvask København", href: "/mobil-bilvask-koebenhavn" },
      { label: "Bilvask pris", href: "/bilvask-pris" },
      { label: "Indvendig bilrengøring", href: "/indvendig-bilrengoering-koebenhavn" },
      { label: "Bilvask Vesterbro", href: "/bilvask-vesterbro" },
    ],
    priority: 0.87,
  },

  {
    slug: "bilvask-vesterbro",
    title: "Bilvask Vesterbro | Professionel bilvask hos CleanWash",
    description:
      "Book professionel bilvask på Vesterbro hos CleanWash. Udvendig bilvask, indvendig bilrengøring og komplet bilpleje med nem online booking.",
    h1: "Bilvask Vesterbro",
    eyebrow: "Professionel bilvask på Vesterbro",
    heroIntro:
      "CleanWash tilbyder professionel bilvask på Vesterbro med online booking og klare servicevalg til private og erhverv.",
    shortSummary: [
      "CleanWash tilbyder bilvask på Vesterbro og i nærliggende bydele med online booking.",
      "Servicen er relevant for bilejere på Vesterbro, Sydhavn, Carlsberg Byen og Valby.",
      "Book udvendig vask, indvendig rengøring eller komplet bilpleje i bookingflowet.",
    ],
    keywords: [
      "bilvask Vesterbro",
      "bilrengøring Vesterbro",
      "bilpleje Vesterbro",
      "mobil bilvask Vesterbro",
      "bilvask Sydhavn",
    ],
    serviceType: "Professionel bilvask på Vesterbro",
    serviceArea: ["Vesterbro", "Sydhavn", "Carlsberg Byen", "Valby", "Frederiksberg", "København"],
    schemaAreaServed: ["Vesterbro", "København", "Copenhagen", "Denmark"],
    image: { src: "/service/helebil.jpg", alt: "Professionel bilvask på Vesterbro hos CleanWash" },
    secondaryCta: { label: "Se bilvask Valby", href: "/bilvask-valby" },
    benefits: [
      { title: "Vesterbro og Sydhavn", text: "CleanWash er relevant for bilejere på Vesterbro, i Sydhavn, Carlsberg Byen og nærliggende bydele." },
      { title: "Online booking", text: "Book bilvask online og vælg service, tidspunkt og biloplysninger i ét flow." },
      { title: "Komplet bilpleje", text: "Udvendig vask, indvendig rengøring eller komplet bilpleje — vælg efter bilens behov." },
      { title: "Til travle bilejere", text: "Perfekt for pendlere, familier og erhvervskunder, der bruger bilen dagligt." },
    ],
    process: [
      { title: "Book online", text: "Vælg service på booking-siden og angiv biloplysninger og tidspunkt." },
      { title: "Oplys adresse", text: "Angiv den adresse, hvor bilen holder, og kontaktoplysninger." },
      { title: "CleanWash planlægger", text: "Teamet forbereder rute og service ud fra din booking." },
      { title: "Bilen vaskes", text: "Du får en renere bil leveret professionelt uden ventetid." },
    ],
    sections: [
      {
        heading: "Bilvask på Vesterbro — nem og professionel",
        paragraphs: [
          "Vesterbro er en af Københavns mest forandrede bydele med mange nye boliger, kontorer og familier. Mange bilejere på Vesterbro kæmper med begrænset parkering og en travl hverdag. Bilvask Vesterbro er for alle, der vil have bilen ren uden unødigt besvær. CleanWash tilbyder professionel bilvask med online booking.",
          "Vesterbro dækker et stort område fra Kødbyen og Halmtorvet til de roligere kvarterer mod Frederiksberg og Sydhavn. Biler i bydelen samler typisk bysnavs fra tæt bytrafik. En professionel bilvask giver et bedre resultat end en hurtig standardvask og er skånsom over for lakken.",
        ],
      },
      {
        heading: "Sydhavn og Carlsberg Byen",
        paragraphs: [
          "Sydhavn og Carlsberg Byen er to af Vesterbros hurtigst voksende delområder med mange nye boliger og kontorer. Bilejere her søger fleksible og professionelle løsninger, der passer ind i en moderne hverdag. CleanWash er relevant for kunder i begge områder og kan håndtere booking fra hele Vesterbro.",
          "Med adgang til Sydhavnsmotorvejen og let adgang til resten af København er Vesterbro et populært sted at bo for pendlere. Pendlerbiler bruges hårdt og trænger til jævnlig bilvask for at se pæne ud.",
        ],
      },
      {
        heading: "Hvad CleanWash tilbyder på Vesterbro",
        paragraphs: [
          "CleanWash tilbyder udvendig bilvask, indvendig bilrengøring og komplet bilpleje til kunder på Vesterbro. Udvendig vask fjerner snavs fra lak, ruder og fælge. Indvendig rengøring fokuserer på kabine, støvsugning og sæder. Komplet bilpleje kombinerer begge dele for det bedste resultat.",
          "Kunder kan booke bilvask direkte via booking-siden. Vælg den service, der passer til bilen, og angiv relevante oplysninger. CleanWash håndterer resten og leverer et professionelt resultat.",
        ],
      },
      {
        heading: "Vesterbro: familier og erhvervskunder",
        paragraphs: [
          "Vesterbro har mange familier med børn, der bruger bilen dagligt til børnekørsel, indkøb og weekend­ture. Indvendig rengøring er særlig relevant for familiebiler, hvor kabinen hurtigt samler støv og rester fra daglig brug. Erhvervskunder med firmabiler nyder godt af regelmæssig bilpleje.",
          "CleanWash gør det nemt at booke bilvask på Vesterbro. Kunder kan booke direkte via booking-siden og vælge den service, der passer til bilen.",
        ],
      },
    ],
    faqs: [
      { question: "Tilbyder CleanWash bilvask på Vesterbro?", answer: "Ja. CleanWash tilbyder professionel bilvask på Vesterbro og nærliggende bydele med online booking." },
      { question: "Dækker I Sydhavn og Carlsberg Byen?", answer: "Ja. Sydhavn og Carlsberg Byen er del af CleanWashs serviceområde på Vesterbro." },
      { question: "Kan jeg booke indvendig rengøring på Vesterbro?", answer: "Ja. Du kan vælge indvendig rengøring, udvendig vask eller komplet bilpleje i bookingflowet." },
      { question: "Hvad koster bilvask på Vesterbro?", answer: "Udvendig bilvask fra 349 kr., komplet bilvask fra 599 kr. Se alle priser via /booking." },
      { question: "Er servicen relevant for firmabiler på Vesterbro?", answer: "Ja. CleanWash tilbyder bilvask til private og erhverv, herunder firmabiler og leasingbiler." },
      { question: "Hvordan booker jeg bilvask på Vesterbro?", answer: "Gå til /booking, vælg service og udfyld oplysninger om bil, adresse og ønsket tidspunkt." },
    ],
    relatedLinks: [
      { label: "Book bilvask", href: "/booking" },
      { label: "Bilvask København", href: "/bilvask-koebenhavn" },
      { label: "Bilvask Valby", href: "/bilvask-valby" },
      { label: "Bilvask Nørrebro", href: "/bilvask-noerrebro" },
      { label: "Bilvask Frederiksberg", href: "/bilvask-frederiksberg" },
      { label: "Bilvask pris", href: "/bilvask-pris" },
      { label: "Mobil bilvask København", href: "/mobil-bilvask-koebenhavn" },
      { label: "Indvendig bilrengøring", href: "/indvendig-bilrengoering-koebenhavn" },
    ],
    priority: 0.87,
  },

  {
    slug: "bilvask-valby",
    title: "Bilvask Valby | Professionel bilvask hos CleanWash",
    description:
      "Book professionel bilvask i Valby hos CleanWash. Udvendig vask, indvendig bilrengøring og komplet bilpleje med nem online booking.",
    h1: "Bilvask Valby",
    eyebrow: "Professionel bilvask i Valby",
    heroIntro:
      "CleanWash tilbyder professionel bilvask i Valby med online booking og klare servicevalg til familier, pendlere og erhverv.",
    shortSummary: [
      "CleanWash tilbyder bilvask i Valby og nærliggende bydele med online booking.",
      "Servicen er relevant for bilejere i Valby, Brønshøj, Vanløse og Rødovre.",
      "Book udvendig vask, indvendig rengøring eller komplet bilpleje direkte i bookingflowet.",
    ],
    keywords: [
      "bilvask Valby",
      "bilrengøring Valby",
      "bilpleje Valby",
      "mobil bilvask Valby",
      "bilvask nær mig Valby",
    ],
    serviceType: "Professionel bilvask i Valby",
    serviceArea: ["Valby", "Brønshøj", "Vanløse", "Rødovre", "Hvidovre", "København"],
    schemaAreaServed: ["Valby", "København", "Copenhagen", "Denmark"],
    image: { src: "/service/udenfor.jpg", alt: "Professionel bilvask i Valby hos CleanWash" },
    secondaryCta: { label: "Se bilvask Vesterbro", href: "/bilvask-vesterbro" },
    benefits: [
      { title: "Valby og omegn", text: "CleanWash er relevant for bilejere i Valby, Brønshøj, Vanløse og Rødovre." },
      { title: "Familievenlig service", text: "Professionel bilvask der passer til familier, som bruger bilen til hverdag, sport og weekendture." },
      { title: "Online booking", text: "Book bilvask direkte online uden kø eller telefonopkald." },
      { title: "Klar pris", text: "Udvendig bilvask fra 349 kr., komplet bilvask fra 599 kr. — ingen skjulte gebyrer." },
    ],
    process: [
      { title: "Book online", text: "Gå til booking-siden og vælg den bilvask, der passer til bilen." },
      { title: "Oplys bil og adresse", text: "Angiv nummerplade, kontaktoplysninger og ønsket tidspunkt." },
      { title: "CleanWash planlægger", text: "Teamet forbereder rute og service ud fra din booking." },
      { title: "Bilen vaskes grundigt", text: "Du får en renere bil leveret professionelt uden ventetid." },
    ],
    sections: [
      {
        heading: "Bilvask i Valby — til familier og pendlere",
        paragraphs: [
          "Valby er et roligt og familievenligt kvarter syd for København med mange villa- og rækkehusejere, der bruger bilen dagligt. Bilvask Valby er relevant for alle, der vil have en ren bil uden at køre langt til en vaskehal. CleanWash tilbyder professionel bilvask med online booking og klare servicevalg.",
          "Familiebiler i Valby bruges til børnekørsel, sportsaktiviteter, indkøb og weekendture. Kabinen samler hurtigt snavs, og lakken udsættes for vejrsnavs og pollen. En professionel bilvask hjælper bilen med at se bedre ud og holder kabinen frisk og behagelig.",
        ],
      },
      {
        heading: "Valby: et familiekvarter med mange bilejere",
        paragraphs: [
          "Valby er et af de grønnere kvarterer i København med gode butiksforhold, skoler og grønne arealer. Mange familier vælger Valby for bydelens rolige karakter og gode adgangsforhold til resten af København. Bilejere i Valby søger professionelle og fleksible løsninger, der passer til en travl familiekøreplan.",
          "CleanWash er relevant for kunder i Valby og nærliggende bydele som Brønshøj, Vanløse og Rødovre. Den konkrete dækning afhænger af booking og ruteplanlægning. Start booking-processen online for at se tilgængelighed.",
        ],
      },
      {
        heading: "Hvad tilbyder CleanWash i Valby?",
        paragraphs: [
          "CleanWash tilbyder udvendig bilvask, indvendig bilrengøring og komplet bilpleje i Valby. Udvendig vask fjerner vejsnavs fra lak, ruder og fælge. Indvendig rengøring fokuserer på kabine, støvsugning, måtter og sæder. Komplet bilpleje kombinerer begge dele.",
          "Kunder kan booke bilvask direkte via booking-siden. Vælg den service, der passer til bilen, og angiv relevante oplysninger. CleanWash håndterer resten og leverer et professionelt resultat.",
        ],
      },
      {
        heading: "Indvendig rengøring til familiebiler i Valby",
        paragraphs: [
          "Familiebiler samler snavs hurtigt, og indvendig rengøring er særlig relevant for bilejere med børn. Sæder, gulve, måtter, bagagerum og kabinen generelt kræver regelmæssig rengøring for at holde bilen frisk og behagelig. CleanWash tilbyder indvendig bilrengøring, der adresserer alle disse områder.",
          "En professionel indvendig rengøring giver familien en bedre oplevelse i bilen og gør bilen mere attraktiv, hvis den skal sælges eller returneres. Kunder i Valby kan booke bilvask direkte via booking-siden.",
        ],
      },
    ],
    faqs: [
      { question: "Tilbyder CleanWash bilvask i Valby?", answer: "Ja. CleanWash tilbyder professionel bilvask i Valby og nærliggende bydele med online booking." },
      { question: "Er servicen relevant for familiebiler i Valby?", answer: "Ja. Familiebiler trænger ofte til indvendig rengøring, og CleanWash tilbyder grundig kabinerengøring." },
      { question: "Dækker I Brønshøj og Vanløse?", answer: "CleanWash er relevant for Valby og nærliggende bydele. Konkret dækning afhænger af booking og rute." },
      { question: "Kan jeg booke komplet bilpleje i Valby?", answer: "Ja. Du kan vælge udvendig vask, indvendig rengøring eller komplet bilpleje i bookingflowet." },
      { question: "Hvad koster bilvask i Valby?", answer: "Udvendig bilvask fra 349 kr., komplet bilvask fra 599 kr. Se alle priser via /booking." },
      { question: "Hvordan booker jeg bilvask i Valby?", answer: "Gå til /booking, vælg service og udfyld oplysninger om bil, adresse og ønsket tidspunkt." },
    ],
    relatedLinks: [
      { label: "Book bilvask", href: "/booking" },
      { label: "Bilvask København", href: "/bilvask-koebenhavn" },
      { label: "Bilvask Vesterbro", href: "/bilvask-vesterbro" },
      { label: "Bilvask Frederiksberg", href: "/bilvask-frederiksberg" },
      { label: "Bilvask Hvidovre", href: "/bilvask-hvidovre" },
      { label: "Indvendig bilrengøring", href: "/indvendig-bilrengoering-koebenhavn" },
      { label: "Bilvask pris", href: "/bilvask-pris" },
      { label: "Mobil bilvask København", href: "/mobil-bilvask-koebenhavn" },
    ],
    priority: 0.86,
  },

  {
    slug: "bilvask-lyngby",
    title: "Bilvask Lyngby | Professionel bilvask hos CleanWash",
    description:
      "Book professionel bilvask i Lyngby hos CleanWash. Udvendig vask, indvendig bilrengøring og komplet bilpleje med nem online booking nord for København.",
    h1: "Bilvask Lyngby",
    eyebrow: "Professionel bilvask i Lyngby",
    heroIntro:
      "CleanWash tilbyder professionel bilvask i Lyngby og Lyngby-Taarbæk med online booking og klare servicevalg til private og erhverv.",
    shortSummary: [
      "CleanWash tilbyder bilvask i Lyngby og nærliggende kommuner nord for København.",
      "Servicen er relevant for bilejere i Lyngby, Virum, Sorgenfri og Klampenborg.",
      "Book udvendig vask, indvendig rengøring eller komplet bilpleje direkte i bookingflowet.",
    ],
    keywords: [
      "bilvask Lyngby",
      "bilrengøring Lyngby",
      "bilpleje Lyngby",
      "mobil bilvask Lyngby",
      "bilvask Lyngby-Taarbæk",
    ],
    serviceType: "Professionel bilvask i Lyngby",
    serviceArea: ["Lyngby", "Virum", "Sorgenfri", "Klampenborg", "Gentofte", "Hellerup"],
    schemaAreaServed: ["Lyngby", "Lyngby-Taarbæk", "København", "Copenhagen", "Denmark"],
    image: { src: "/service/helebil.jpg", alt: "Professionel bilvask i Lyngby hos CleanWash" },
    secondaryCta: { label: "Se bilvask Hellerup", href: "/bilvask-hellerup" },
    benefits: [
      { title: "Lyngby og omegn", text: "CleanWash er relevant for bilejere i Lyngby, Virum, Sorgenfri og nærliggende kommuner." },
      { title: "Pendlere og familier", text: "Professionel bilvask der passer til pendlere fra Lyngby til København og familier i forstaden." },
      { title: "Online booking", text: "Book bilvask direkte online og vælg den service, der passer til bilens stand." },
      { title: "Premium bilpleje", text: "Udvendig vask, indvendig rengøring og premium bilpleje — alt kan bookes online." },
    ],
    process: [
      { title: "Book online", text: "Gå til booking-siden og vælg den bilvask, der passer til bilen." },
      { title: "Oplys bil og adresse", text: "Angiv nummerplade, kontaktoplysninger og ønsket tidspunkt." },
      { title: "CleanWash planlægger", text: "Teamet forbereder rute og service ud fra din booking." },
      { title: "Bilen vaskes professionelt", text: "Du får en renere bil leveret uden kø og ventetid." },
    ],
    sections: [
      {
        heading: "Bilvask i Lyngby — professionel service nord for København",
        paragraphs: [
          "Lyngby er en velhavende og grøn forstad nord for København med mange bilejere, der pendler dagligt til arbejde i storbyen. Bilvask Lyngby er relevant for alle, der vil have bilen gjort ren professionelt uden at bruge unødigt tid på det. CleanWash tilbyder bilvask i Lyngby med online booking og klare servicevalg.",
          "Pendlerbiler fra Lyngby bruges hårdt på motorveje og indfaldsveje. Vejsnavs, vejsalt om vinteren og insekter om sommeren belaster lakken og kræver regelmæssig vask. En professionel bilvask holder bilen pænere og i bedre stand.",
        ],
      },
      {
        heading: "Lyngby, Virum og Sorgenfri",
        paragraphs: [
          "Lyngby-Taarbæk Kommune dækker Lyngby, Virum og Sorgenfri — tre velhavende villakvarterer med mange bilejere, der sætter pris på kvalitet og god service. CleanWash er relevant for kunder i hele dette område og kan håndtere booking fra bilejere langs hele den nordlige korridor.",
          "Klampenborg og Gentofte grænser op til Lyngby-Taarbæk og er ligeledes relevante. Den konkrete dækning afhænger af booking og ruteplanlægning. Start processen online for at afklare muligheder.",
        ],
      },
      {
        heading: "Hvad CleanWash tilbyder i Lyngby",
        paragraphs: [
          "CleanWash tilbyder udvendig bilvask, indvendig bilrengøring og komplet bilpleje i Lyngby. Udvendig vask fjerner vejsnavs fra lak, ruder og fælge. Indvendig rengøring fokuserer på kabine, støvsugning og sæder. Komplet bilpleje giver det mest gennemførte resultat.",
          "Kunder kan booke bilvask direkte via booking-siden. Vælg den service, der passer til bilen, angiv relevante oplysninger, og CleanWash håndterer resten.",
        ],
      },
      {
        heading: "DTU og Lyngby Storcenter — mange biler",
        paragraphs: [
          "Lyngby er hjemsted for DTU og Lyngby Storcenter med mange studerende, ansatte og besøgende, der ankommer i bil. Virksomheder i Lyngby-Taarbæk har mange firmabiler, der skal fremstå præsentable. CleanWash kan hjælpe med regelmæssig bilvask og bilpleje til disse kunder.",
          "Kunder i Lyngby og Lyngby-Taarbæk kan booke bilvask direkte via booking-siden. Vælg den service, der passer til bilen, og angiv relevante oplysninger.",
        ],
      },
    ],
    faqs: [
      { question: "Tilbyder CleanWash bilvask i Lyngby?", answer: "Ja. CleanWash tilbyder professionel bilvask i Lyngby og Lyngby-Taarbæk med online booking." },
      { question: "Dækker I Virum og Sorgenfri?", answer: "Ja. Virum og Sorgenfri er del af Lyngby-Taarbæk Kommune og er relevant for CleanWashs serviceområde." },
      { question: "Er servicen relevant for pendlere fra Lyngby?", answer: "Ja. Pendlerbiler trænger jævnligt til bilvask, og CleanWash gør booking nem og fleksibel." },
      { question: "Kan jeg booke komplet bilpleje i Lyngby?", answer: "Ja. Du kan vælge udvendig vask, indvendig rengøring eller komplet bilpleje i bookingflowet." },
      { question: "Hvad koster bilvask i Lyngby?", answer: "Udvendig bilvask fra 349 kr., komplet bilvask fra 599 kr. Se alle priser via /booking." },
      { question: "Hvordan booker jeg bilvask i Lyngby?", answer: "Gå til /booking, vælg service og udfyld oplysninger om bil og ønsket tidspunkt." },
    ],
    relatedLinks: [
      { label: "Book bilvask", href: "/booking" },
      { label: "Bilvask Hellerup", href: "/bilvask-hellerup" },
      { label: "Bilvask Østerbro", href: "/bilvask-osterbro" },
      { label: "Bilvask Sjælland", href: "/bilvask-sjaelland" },
      { label: "Mobil bilvask København", href: "/mobil-bilvask-koebenhavn" },
      { label: "Bilvask pris", href: "/bilvask-pris" },
      { label: "Håndvask af bil", href: "/haandvask-bil-koebenhavn" },
      { label: "Bilpleje guide", href: "/bilpleje-guide" },
    ],
    priority: 0.85,
  },

  {
    slug: "bilvask-hvidovre",
    title: "Bilvask Hvidovre | Professionel bilvask hos CleanWash",
    description:
      "Book professionel bilvask i Hvidovre hos CleanWash. Udvendig vask, indvendig bilrengøring og komplet bilpleje med nem online booking syd for København.",
    h1: "Bilvask Hvidovre",
    eyebrow: "Professionel bilvask i Hvidovre",
    heroIntro:
      "CleanWash tilbyder professionel bilvask i Hvidovre med online booking og klare servicevalg til familier, pendlere og erhverv.",
    shortSummary: [
      "CleanWash tilbyder bilvask i Hvidovre og nærliggende kommuner syd for København.",
      "Servicen er relevant for bilejere i Hvidovre, Brøndby, Rødovre og Ishøj.",
      "Book udvendig vask, indvendig rengøring eller komplet bilpleje i bookingflowet.",
    ],
    keywords: [
      "bilvask Hvidovre",
      "bilrengøring Hvidovre",
      "bilpleje Hvidovre",
      "mobil bilvask Hvidovre",
      "bilvask Brøndby",
    ],
    serviceType: "Professionel bilvask i Hvidovre",
    serviceArea: ["Hvidovre", "Brøndby", "Rødovre", "Ishøj", "Valby", "Storkøbenhavn"],
    schemaAreaServed: ["Hvidovre", "København", "Copenhagen", "Denmark"],
    image: { src: "/service/udenfor.jpg", alt: "Professionel bilvask i Hvidovre hos CleanWash" },
    secondaryCta: { label: "Se bilvask Valby", href: "/bilvask-valby" },
    benefits: [
      { title: "Hvidovre og omegn", text: "CleanWash er relevant for bilejere i Hvidovre, Brøndby, Rødovre og nærliggende kommuner." },
      { title: "Nem online booking", text: "Book bilvask online og vælg service, tidspunkt og biloplysninger i ét flow." },
      { title: "Klar pris", text: "Udvendig bilvask fra 349 kr., komplet bilvask fra 599 kr. — ingen skjulte gebyrer." },
      { title: "Til private og erhverv", text: "Passer til familiebiler, pendlerbiler, firmabiler og leasingbiler." },
    ],
    process: [
      { title: "Book online", text: "Gå til booking-siden og vælg den bilvask, der passer til bilen." },
      { title: "Oplys bil og adresse", text: "Angiv nummerplade, kontaktoplysninger og ønsket tidspunkt." },
      { title: "CleanWash klargør", text: "Teamet forbereder rute og service ud fra din booking." },
      { title: "Bilen vaskes", text: "Du får en renere bil leveret professionelt uden ventetid." },
    ],
    sections: [
      {
        heading: "Bilvask i Hvidovre — professionel service syd for København",
        paragraphs: [
          "Hvidovre er en aktiv forstad syd for København med mange familier og erhvervsvirksomheder. Mange bilejere i Hvidovre pendler til arbejde i storbyen eller bruger bilen dagligt til transport af børn og indkøb. Bilvask Hvidovre er relevant for alle, der vil have bilen ren uden at transportere sig til en vaskehal. CleanWash tilbyder bilvask med online booking.",
          "Bilejere i Hvidovre og nærliggende kommuner som Brøndby, Rødovre og Ishøj bruger bilen hårdt til pendling og familieliv. Vejsnavs, vejsalt og daglig brug belaster lakken og kabinen. En professionel bilvask hjælper bilen med at se bedre ud og forlænger dens stand.",
        ],
      },
      {
        heading: "Hvidovre, Brøndby og Rødovre",
        paragraphs: [
          "Hvidovre grænser op til Brøndby, Rødovre og Ishøj — tre kommuner med mange bilejere og et stærkt erhvervsliv. CleanWash er relevant for kunder i hele dette sydvestlige Storkøbenhavn. Den konkrete dækning afhænger af adresse og ruteplanlægning, men du kan starte processen online.",
          "Hvidovre Hospital, Avedøre Holme og Hvidovrevej er store trafikknudepunkter, som dagligt trækker tusindvis af biler til og fra området. Professionel bilvask er relevant for både private og erhvervskunder i dette område.",
        ],
      },
      {
        heading: "Hvad tilbyder CleanWash i Hvidovre?",
        paragraphs: [
          "CleanWash tilbyder udvendig bilvask, indvendig bilrengøring og komplet bilpleje i Hvidovre. Udvendig vask fjerner vejsnavs, vejsalt og snavs fra lak, ruder og fælge. Indvendig rengøring fokuserer på kabine, støvsugning og sæder. Komplet bilpleje kombinerer begge dele.",
          "Kunder kan booke bilvask direkte via booking-siden. Vælg den service, der passer til bilen, og angiv relevante oplysninger. CleanWash håndterer resten.",
        ],
      },
      {
        heading: "Erhverv og flåder i Hvidovre",
        paragraphs: [
          "Hvidovre og Avedøre Holme har mange industri- og erhvervsvirksomheder med firmabiler og flåder. CleanWash kan hjælpe virksomheder med regelmæssig bilvask og bilpleje. Firmabiler skal fremstå præsentable, og CleanWash gør det nemt at holde flåden ren.",
          "Virksomheder i Hvidovre kan kontakte CleanWash for at drøfte erhvervsaftaler og flådeservice. Kunder kan booke bilvask direkte via booking-siden.",
        ],
      },
    ],
    faqs: [
      { question: "Tilbyder CleanWash bilvask i Hvidovre?", answer: "Ja. CleanWash tilbyder professionel bilvask i Hvidovre og nærliggende kommuner med online booking." },
      { question: "Dækker I Brøndby og Rødovre?", answer: "CleanWash er relevant for Hvidovre og nærliggende kommuner. Konkret dækning afhænger af booking og rute." },
      { question: "Kan jeg booke indvendig rengøring i Hvidovre?", answer: "Ja. Du kan vælge indvendig rengøring, udvendig vask eller komplet bilpleje i bookingflowet." },
      { question: "Er CleanWash relevant for virksomheder i Hvidovre?", answer: "Ja. CleanWash tilbyder bilvask til private og erhverv, herunder firmabiler og flådeaftaler." },
      { question: "Hvad koster bilvask i Hvidovre?", answer: "Udvendig bilvask fra 349 kr., komplet bilvask fra 599 kr. Se alle priser via /booking." },
      { question: "Hvordan booker jeg bilvask i Hvidovre?", answer: "Gå til /booking, vælg service og udfyld oplysninger om bil, adresse og ønsket tidspunkt." },
    ],
    relatedLinks: [
      { label: "Book bilvask", href: "/booking" },
      { label: "Bilvask Valby", href: "/bilvask-valby" },
      { label: "Bilvask Amager", href: "/bilvask-amager" },
      { label: "Bilvask København", href: "/bilvask-koebenhavn" },
      { label: "Erhvervs bilvask", href: "/erhvervs-bilvask" },
      { label: "Bilvask pris", href: "/bilvask-pris" },
      { label: "Mobil bilvask København", href: "/mobil-bilvask-koebenhavn" },
      { label: "Indvendig bilrengøring", href: "/indvendig-bilrengoering-koebenhavn" },
    ],
    priority: 0.85,
  },

  // ── High-value service pages ──────────────────────────────────────────────────

  {
    slug: "erhvervs-bilvask",
    title: "Erhvervs bilvask | Bilvask til firmabiler og flåder | CleanWash",
    description:
      "Professionel erhvervs bilvask til firmabiler, leasingbiler og flåder. Faste aftaler, nem koordinering og klar pris. Book eller kontakt CleanWash i dag.",
    h1: "Erhvervs bilvask",
    eyebrow: "Bilvask til virksomheder og flåder",
    heroIntro:
      "CleanWash tilbyder erhvervs bilvask til virksomheder i København og på Sjælland. Fast aftale, fleksibel planlægning og professionel bilpleje til hele flåden.",
    shortSummary: [
      "CleanWash tilbyder erhvervs bilvask til firmabiler, leasingbiler og flåder med faste aftaler.",
      "Servicen er relevant for virksomheder, der vil have en præsentabel bilflåde uden intern koordinering.",
      "Book online eller kontakt CleanWash for at drøfte en erhvervsaftale til din virksomhed.",
    ],
    keywords: [
      "erhvervs bilvask",
      "bilvask firmabiler",
      "flåde bilvask",
      "bilvask leasingbil",
      "bilvask virksomhed",
    ],
    serviceType: "Erhvervs bilvask til firmabiler og flåder",
    serviceArea: ["København", "Storkøbenhavn", "Sjælland", "Frederiksberg", "Amager", "Hvidovre"],
    schemaAreaServed: ["København", "Copenhagen", "Sjælland", "Denmark"],
    image: { src: "/service/helebil.jpg", alt: "Erhvervs bilvask til firmabiler og flåder hos CleanWash" },
    secondaryCta: { label: "Bilvask leasingbil", href: "/bilvask-leasingbil" },
    benefits: [
      { title: "Fast erhvervsaftale", text: "Få en aftale, der passer til virksomhedens størrelse, bilflåde og ønskede frekvens." },
      { title: "Nem koordinering", text: "CleanWash håndterer planlægning og ruter, så I ikke skal koordinere internt." },
      { title: "Præsentable firmabiler", text: "En ren firmabil sender et bedre signal til kunder og samarbejdspartnere." },
      { title: "Til alle biltyper", text: "Passer til firmabiler, leasingbiler, taxa, transport, servicebiler og bilforhandlere." },
    ],
    process: [
      { title: "Kontakt eller book", text: "Book online eller kontakt CleanWash for at drøfte en erhvervsaftale." },
      { title: "Aftal frekvens", text: "Beslut sammen, hvor ofte bilerne skal vaskes og hvilken service der ønskes." },
      { title: "CleanWash planlægger", text: "Teamet koordinerer ruter og tidsplaner, så virksomheden ikke skal tænke på det." },
      { title: "Ren flåde løbende", text: "Bilerne vaskes regelmæssigt og præsentabelt uden unødigt ophold." },
    ],
    sections: [
      {
        heading: "Erhvervs bilvask — ren flåde uden intern koordinering",
        paragraphs: [
          "Erhvervs bilvask er relevant for virksomheder, der vil have en præsentabel bilflåde uden at bruge intern tid og ressourcer på koordinering. En ren firmabil sender et professionelt signal til kunder, leverandører og samarbejdspartnere. CleanWash tilbyder erhvervs bilvask med faste aftaler, fleksibel planlægning og professionel bilpleje.",
          "Mange virksomheder har firmabiler, der bruges dagligt af sælgere, serviceteknikere, direktører eller ansatte. Disse biler repræsenterer virksomheden og bør fremstå velholdte. CleanWash gør det nemt at holde flåden ren uden at belaste den administrative koordinering.",
        ],
      },
      {
        heading: "Hvem er erhvervs bilvask relevant for?",
        paragraphs: [
          "Erhvervs bilvask er relevant for mange typer virksomheder i København og på Sjælland: bilforhandlere, der vil klargøre brugte biler til salg; leasingselskaber, der vil vedligeholde bilernes stand; transportvirksomheder, der vil fremstå professionelle; ejendomsselskaber med servicebiler; og kontorvirksomheder med firmabiler til sælgere og direktører.",
          "Servicen er også relevant for taxa- og limousineudbydere, sundhedsklinikker med visitationsbiler, catering- og leveringsvirksomheder og alle andre, der har biler, som skal se præsentable ud i mødet med kunder.",
        ],
      },
      {
        heading: "Erhvervsaftale og flådeservice",
        paragraphs: [
          "CleanWash kan indgå en erhvervsaftale, der passer til virksomhedens behov. Det kan være en ugentlig vask af alle firmabiler, en månedlig dybderengøring eller en ad hoc-service, der bookes efter behov. Den konkrete aftale afhænger af antal biler, frekvens, servicetyper og virksomhedens lokation.",
          "En erhvervsaftale giver virksomheden en forudsigelig bilplejeplan og fri virksomheden fra koordinering. Kontakt CleanWash for at drøfte mulighederne, eller brug booking-siden til at starte med en enkelt bilvask.",
        ],
      },
      {
        heading: "Erhvervs bilvask i København og på Sjælland",
        paragraphs: [
          "CleanWash tilbyder erhvervs bilvask i hele København, Storkøbenhavn og på Sjælland. Virksomheder med adresser i indre by, Frederiksberg, Amager, Østerbro, Vesterbro, Hvidovre og andre bydele kan alle booke eller drøfte en erhvervsaftale.",
          "Den konkrete dækning afhænger af bilantal, adresser og ruteplanlægning. Kontakt CleanWash for at afklare, hvad der er muligt for din virksomhed.",
        ],
      },
    ],
    faqs: [
      { question: "Tilbyder CleanWash erhvervs bilvask?", answer: "Ja. CleanWash tilbyder erhvervs bilvask til firmabiler, leasingbiler og flåder med faste aftaler." },
      { question: "Kan vi få en fast aftale for vores flåde?", answer: "Ja. CleanWash kan indgå erhvervsaftaler tilpasset virksomhedens størrelse, frekvens og behov." },
      { question: "Hvilke virksomheder er erhvervs bilvask relevant for?", answer: "Bilforhandlere, leasingselskaber, transportvirksomheder, kontorer med firmabiler, taxa og alle med præsentable biler." },
      { question: "Dækker I hele København til erhverv?", answer: "Ja. CleanWash er relevant for virksomheder i hele København, Storkøbenhavn og på Sjælland." },
      { question: "Hvad koster erhvervs bilvask?", answer: "Prisen afhænger af antal biler, frekvens og servicetyper. Kontakt os eller book via /booking for et tilbud." },
      { question: "Hvordan indgår vi en erhvervsaftale?", answer: "Kontakt CleanWash direkte, eller start med en enkelt booking via /booking for at afprøve servicen." },
    ],
    relatedLinks: [
      { label: "Book bilvask", href: "/booking" },
      { label: "Bilvask leasingbil", href: "/bilvask-leasingbil" },
      { label: "Bilvask København", href: "/bilvask-koebenhavn" },
      { label: "Klargøring til salg", href: "/klargoering-bil-salg" },
      { label: "Bilvask pris", href: "/bilvask-pris" },
      { label: "Mobil bilvask København", href: "/mobil-bilvask-koebenhavn" },
      { label: "Bilvask Hvidovre", href: "/bilvask-hvidovre" },
      { label: "Car wash Copenhagen", href: "/car-wash-copenhagen" },
    ],
    priority: 0.92,
  },

  {
    slug: "klargoering-bil-salg",
    title: "Klargøring af bil til salg | Professionel bilklargøring | CleanWash",
    description:
      "Få bilen klar til salg med professionel bilklargøring hos CleanWash. Udvendig polering, indvendig rengøring og komplet klargøring for den bedste salgspris.",
    h1: "Klargøring af bil til salg",
    eyebrow: "Professionel bilklargøring",
    heroIntro:
      "CleanWash hjælper dig med at gøre bilen klar til salg med professionel vask, rengøring og klargøring, der kan øge den oplevede stand og salgsprisen.",
    shortSummary: [
      "En professionel bilklargøring kan gøre bilen mere attraktiv for køber og løfte salgsprisen.",
      "CleanWash tilbyder komplet klargøring: udvendig vask, polering, indvendig rengøring og finish.",
      "Book bilklargøring online og få bilen præsentabel inden billeder og fremvisning.",
    ],
    keywords: [
      "klargøring bil til salg",
      "bilklargøring",
      "bil klar til salg",
      "bilvask inden salg",
      "polering bil salg",
    ],
    serviceType: "Klargøring af bil til salg",
    serviceArea: ["København", "Frederiksberg", "Amager", "Storkøbenhavn", "Sjælland"],
    schemaAreaServed: ["København", "Copenhagen", "Sjælland", "Denmark"],
    image: { src: "/service/helebil.jpg", alt: "Klargøring af bil til salg hos CleanWash" },
    secondaryCta: { label: "Se polering af bil", href: "/polering-bil-koebenhavn" },
    benefits: [
      { title: "Højere salgspris", text: "En velrengjort og præsentabel bil kan opnå en højere pris og sælges hurtigere." },
      { title: "Bedre billeder", text: "Professionel klargøring giver bedre billeder til salgsannoncen, der tiltrækker flere køberinteresser." },
      { title: "Komplet service", text: "Udvendig vask, polering, indvendig rengøring og finish samlet i én booking." },
      { title: "Hurtig levering", text: "Book online og få bilen klar inden fremvisning eller planlagt fotografering." },
    ],
    process: [
      { title: "Book klargøring", text: "Gå til booking-siden og vælg premium bilpleje eller komplet bilklargøring." },
      { title: "Beskriv bilens stand", text: "Angiv relevante detaljer om bilens stand, så CleanWash kan forberede den rigtige service." },
      { title: "Bilen klargøres", text: "CleanWash udfører udvendig vask, polering og indvendig rengøring." },
      { title: "Klar til salg", text: "Bilen afleveres præsentabel og klar til billeder, fremvisning eller overlevering." },
    ],
    sections: [
      {
        heading: "Klargøring af bil til salg — den rigtige start",
        paragraphs: [
          "Når du skal sælge din bil, er det første indtryk afgørende. En køber danner sig en holdning allerede i salgsannoncen — og det billede er alt afgørende for, om de kontakter dig. En professionel bilklargøring kan gøre bilen mere attraktiv, fremstå bedre vedligeholdt og potentielt løfte salgsprisen.",
          "Klargøring af bil til salg handler om at præsentere bilen i sin bedste stand. Det inkluderer en grundig udvendig vask og polering, indvendig rengøring af kabine, sæder, måtter og bagagerum samt finish, der giver bilen et pænt og velholdt udtryk. CleanWash tilbyder bilklargøring med online booking.",
        ],
      },
      {
        heading: "Hvad indeholder en professionel bilklargøring?",
        paragraphs: [
          "En professionel bilklargøring kan inkludere udvendig skånsom vask og skyl, polering af lak for at fjerne fine ridser og matte pletter, voksbeskyttelse for glans og beskyttelse, indvendig støvsugning og rengøring af kabine, rengøring af sæder, måtter, instrumentbræt og paneler samt aftørring og finish af alle flader.",
          "Det er vigtigt at tilpasse klargøringen til bilens stand. En bil med matte pletter og ridser i lakken drager størst nytte af polering. En bil med en beskidt kabine prioriterer indvendig rengøring. CleanWash hjælper dig med at vælge den rigtige service i bookingflowet.",
        ],
      },
      {
        heading: "Klargøring giver bedre billeder og hurtigere salg",
        paragraphs: [
          "Gode billeder i salgsannoncen er den vigtigste faktor for hurtig og god salgspris. En vasket og poleret bil fotograferet i godt lys fremstår meget mere attraktiv end en snavset og mat bil. Mange bilkøbere sorterer annoncerne på billedkvalitet og bilens umiddelbare stand.",
          "En professionel klargøring tager typisk et par timer og kan gøres, inden du fotograferer bilen. Det er en lille investering, der kan have stor effekt på salgsprisen og salgstiden.",
        ],
      },
      {
        heading: "Klargøring inden leasingretur",
        paragraphs: [
          "Klargøring af bil er også relevant inden leasingretur. Leasingselskaber foretager en tilstandsrapport ved aflevering, og slid ud over normal brug kan udløse ekstraomkostninger. En professionel vask og rengøring kan reducere risikoen for sådanne tillæg.",
          "CleanWash tilbyder klargøring til leasingretur med fokus på de flader og elementer, leasingselskaberne typisk kontrollerer. Kunder kan booke bilklargøring direkte via booking-siden.",
        ],
      },
    ],
    faqs: [
      { question: "Hvad er bilklargøring til salg?", answer: "Det er en professionel vask, polering og indvendig rengøring, der gør bilen præsentabel inden salg." },
      { question: "Kan bilklargøring øge salgsprisen?", answer: "Ja. En velrengjort bil fremstår bedre vedligeholdt, tiltrækker flere interesserede og kan opnå en højere pris." },
      { question: "Tilbyder CleanWash bilklargøring i København?", answer: "Ja. CleanWash tilbyder professionel bilklargøring i København og på Sjælland med online booking." },
      { question: "Er klargøring relevant inden leasingretur?", answer: "Ja. En grundig rengøring kan reducere risikoen for ekstraomkostninger ved aflevering af leasingbil." },
      { question: "Hvad koster bilklargøring til salg?", answer: "Premium bilpleje starter fra 849 kr. og inkluderer polering, voksbeskyttelse og komplet indvendig rengøring." },
      { question: "Hvordan booker jeg bilklargøring?", answer: "Gå til /booking, vælg premium bilpleje eller komplet bilvask og udfyld oplysninger om bilen." },
    ],
    relatedLinks: [
      { label: "Book bilvask", href: "/booking" },
      { label: "Polering af bil", href: "/polering-bil-koebenhavn" },
      { label: "Bilvask leasingbil", href: "/bilvask-leasingbil" },
      { label: "Indvendig bilrengøring", href: "/indvendig-bilrengoering-koebenhavn" },
      { label: "Håndvask af bil", href: "/haandvask-bil-koebenhavn" },
      { label: "Bilvask pris", href: "/bilvask-pris" },
      { label: "Bilvask København", href: "/bilvask-koebenhavn" },
      { label: "Bilpleje guide", href: "/bilpleje-guide" },
    ],
    priority: 0.91,
  },

  {
    slug: "bilvask-leasingbil",
    title: "Bilvask leasingbil | Aflevering og retur | CleanWash",
    description:
      "Book professionel bilvask af leasingbil hos CleanWash. Grundig vask og rengøring inden aflevering af leasingbil for at undgå ekstraomkostninger.",
    h1: "Bilvask leasingbil",
    eyebrow: "Bilvask inden leasingretur",
    heroIntro:
      "CleanWash hjælper dig med at gøre leasingbilen klar til aflevering med professionel vask og rengøring, der kan reducere risikoen for ekstraomkostninger.",
    shortSummary: [
      "En grundig bilvask inden leasingretur kan reducere risikoen for ekstraomkostninger ved aflevering.",
      "CleanWash tilbyder professionel vask og rengøring af leasingbiler i København og på Sjælland.",
      "Book online og få leasingbilen klar til tilstandsrapport og aflevering.",
    ],
    keywords: [
      "bilvask leasingbil",
      "rengøring leasingbil",
      "klargøring leasingbil aflevering",
      "leasingbil klar til retur",
      "bilvask inden leasingretur",
    ],
    serviceType: "Professionel bilvask af leasingbil",
    serviceArea: ["København", "Frederiksberg", "Amager", "Storkøbenhavn", "Sjælland"],
    schemaAreaServed: ["København", "Copenhagen", "Sjælland", "Denmark"],
    image: { src: "/service/udenfor.jpg", alt: "Bilvask af leasingbil inden aflevering hos CleanWash" },
    secondaryCta: { label: "Klargøring til salg", href: "/klargoering-bil-salg" },
    benefits: [
      { title: "Undgå ekstraomkostninger", text: "En grundig vask kan reducere risikoen for ekstrakrav fra leasingselskabet ved aflevering." },
      { title: "Udvendig og indvendig", text: "CleanWash rengør både lakken, ruder, fælge og kabinen — de flader, der kontrolleres." },
      { title: "Hurtig levering", text: "Book online og få leasingbilen klar til aflevering inden din aftalte dato." },
      { title: "Til alle leasingtyper", text: "Passer til private leasingbiler, firmabiler og flåder med leasingaftaler." },
    ],
    process: [
      { title: "Book online", text: "Gå til booking-siden og vælg komplet bilvask eller premium bilpleje til leasingbilen." },
      { title: "Oplys leasingbilens stand", text: "Beskriv bilens stand og eventuelle særlige behov i bookingflowet." },
      { title: "Leasingbilen rengøres", text: "CleanWash udfører grundig udvendig og indvendig rengøring med fokus på afleveringskritier." },
      { title: "Klar til aflevering", text: "Bilen afleveres ren og præsentabel og klar til tilstandsrapport." },
    ],
    sections: [
      {
        heading: "Bilvask af leasingbil — undgå ekstraomkostninger ved aflevering",
        paragraphs: [
          "Mange leasingtagere oplever uventede ekstraomkostninger ved aflevering af leasingbilen, fordi tilstanden bedømmes som dårligere end forventet. Snavs, pletter, cigaretlugt, ridser i interiøret og manglende rengøring kan alle give anledning til tillæg. En professionel bilvask inden aflevering kan reducere risikoen for sådanne udgifter.",
          "CleanWash tilbyder bilvask af leasingbiler med fokus på de elementer, leasingselskaber typisk kontrollerer: udvendig lak, ruder og fælge, indvendig kabine, sæder, måtter og bagagerum. En grundig vask inden aflevering er en lille investering sammenlignet med de tillæg, man kan undgå.",
        ],
      },
      {
        heading: "Hvad kontrollerer leasingselskabet ved aflevering?",
        paragraphs: [
          "Ved aflevering af en leasingbil foretager leasingselskabet typisk en tilstandsrapport, der vurderer bilens udvendige og indvendige stand. Udvendigt kontrolleres lak for ridser, buler og misfarvninger, ruder for stenslag og skrammer, fælge for skader og hjulbuer. Indvendigt kontrolleres sæder for pletter og rids, måtter for slid, bagagerum for snavs og kabinen generelt.",
          "En professionel bilvask adresserer mange af disse punkter. Lakken ser bedre ud efter en grundig vask og polering, og kabinen ser mere velholdt ud efter en komplet indvendig rengøring. Det reducerer risikoen for tillæg og giver en bedre afleveringsoplevelse.",
        ],
      },
      {
        heading: "Hvornår skal leasingbilen vaskes?",
        paragraphs: [
          "Det anbefales at bestille bilvask af leasingbilen senest et par dage inden aflevering, så der er tid til at udbedre eventuelle fund. Book bilvask online, og vælg en tid, der giver plads til aflevering i god ro.",
          "CleanWash kan bookes med kort varsel og leverer bilen ren og klar til aflevering. Det er nemt at booke online og vælge det tidspunkt, der passer i perioden op til afleveringsdatoen.",
        ],
      },
      {
        heading: "Leasingbil til erhverv og privat",
        paragraphs: [
          "Bilvask af leasingbil er relevant for både private leasingtagere og virksomheder med firmabiler på leasing. Private leasingtagere ønsker at undgå personlige ekstraomkostninger ved aflevering. Virksomheder ønsker at holde flåden i god stand og minimere afleveringstillæg, der belaster firmaets økonomi.",
          "CleanWash tilbyder bilvask til leasingbiler i København og på Sjælland. Kunder kan booke bilvask direkte via booking-siden.",
        ],
      },
    ],
    faqs: [
      { question: "Kan bilvask reducere ekstraomkostninger ved leasingretur?", answer: "Ja. En grundig vask og rengøring inden aflevering kan forbedre bilens tilstand og reducere risikoen for tillæg." },
      { question: "Hvad tilbyder CleanWash til leasingbiler?", answer: "CleanWash tilbyder udvendig vask, indvendig rengøring og komplet bilpleje, der klargør leasingbilen til aflevering." },
      { question: "Hvornår skal jeg booke bilvask inden leasingretur?", answer: "Book senest 2-3 dage inden aflevering, så der er tid til at se resultatet, inden bilen afleveres." },
      { question: "Er servicen relevant for firmabiler på leasing?", answer: "Ja. Virksomheder med firmabiler på leasing kan spare afleveringstillæg med regelmæssig bilpleje." },
      { question: "Hvad koster bilvask af leasingbil?", answer: "Komplet bilvask fra 599 kr., premium bilpleje fra 849 kr. Se priser og book via /booking." },
      { question: "Hvordan booker jeg bilvask af leasingbil?", answer: "Gå til /booking, vælg komplet bilvask eller premium bilpleje og udfyld oplysninger om leasingbilen." },
    ],
    relatedLinks: [
      { label: "Book bilvask", href: "/booking" },
      { label: "Klargøring til salg", href: "/klargoering-bil-salg" },
      { label: "Erhvervs bilvask", href: "/erhvervs-bilvask" },
      { label: "Indvendig bilrengøring", href: "/indvendig-bilrengoering-koebenhavn" },
      { label: "Bilvask pris", href: "/bilvask-pris" },
      { label: "Bilvask København", href: "/bilvask-koebenhavn" },
      { label: "Polering af bil", href: "/polering-bil-koebenhavn" },
      { label: "Bilpleje guide", href: "/bilpleje-guide" },
    ],
    priority: 0.90,
  },

  {
    slug: "polering-bil-koebenhavn",
    title: "Polering af bil København | Professionel polering hos CleanWash",
    description:
      "Book professionel polering af bil i København hos CleanWash. Fjern ridser, matte pletter og vejsnavs og giv bilen en glansfuld og beskyttet finish.",
    h1: "Polering af bil København",
    eyebrow: "Professionel lakpolering",
    heroIntro:
      "CleanWash tilbyder professionel polering af bil i København. Fjern fine ridser og matte pletter og giv lakken en beskyttet og glansfuld finish.",
    shortSummary: [
      "Polering af bil fjerner fine ridser, swirls og matte pletter i lakken og giver en glansfuld finish.",
      "CleanWash tilbyder professionel lakpolering i København med online booking.",
      "Poleringen kombineres typisk med voksbeskyttelse for at bevare det gode resultat.",
    ],
    keywords: [
      "polering bil København",
      "lakpolering",
      "polering af bil",
      "voks bil",
      "ridser bil polering",
    ],
    serviceType: "Professionel polering af bil i København",
    serviceArea: ["København", "Frederiksberg", "Amager", "Østerbro", "Hellerup", "Storkøbenhavn"],
    schemaAreaServed: ["København", "Copenhagen", "Denmark"],
    image: { src: "/service/helebil.jpg", alt: "Professionel polering af bil i København hos CleanWash" },
    secondaryCta: { label: "Klargøring til salg", href: "/klargoering-bil-salg" },
    benefits: [
      { title: "Fjern ridser og swirls", text: "Polering fjerner fine ridser, ridsemærker og matte pletter, der giver lakken et dæmpet udtryk." },
      { title: "Glansfuld finish", text: "Efter polering ser lakken skarpere og mere glansfuld ud — som da bilen var ny." },
      { title: "Voksbeskyttelse", text: "En voksbehandling efter polering beskytter lakken mod vejrsnavs og forlænger resultatet." },
      { title: "God inden salg", text: "Polering giver bilen et langt bedre visuelt udtryk og kan løfte salgsprisen markant." },
    ],
    process: [
      { title: "Book polering", text: "Gå til booking-siden og vælg premium bilpleje, der inkluderer polering og voks." },
      { title: "Oplys biltype", text: "Angiv bilens farve, stand og eventuelle særlige ønsker til behandlingen." },
      { title: "Lakken poleres", text: "CleanWash udfører skånsom polering af lak og behandler efterfølgende med voks." },
      { title: "Glansfuld levering", text: "Bilen afleveres med en klar, glansfuld og beskyttet lak." },
    ],
    sections: [
      {
        heading: "Polering af bil — hvad er det, og hvornår er det relevant?",
        paragraphs: [
          "Polering af bil er en behandling, der fjerner det øverste slidte lag af lakken og afslører en friskere og mere glansfuld overflade nedenunder. Det fjerner fine ridser, swirls (cirkelformede ridser fra vask), matte pletter og vejrsnavs, der har sat sig i lakken over tid. Resultatet er en lak, der ser langt mere skarp og velholdt ud.",
          "Polering er relevant for biler, der er blevet matte eller kedelige at se på, biler der har mange fine ridser fra carwash eller daglig brug, biler der skal sælges og trænger til et bedre visuelt udtryk, og biler der er ældre men ellers i god stand.",
        ],
      },
      {
        heading: "Polering og voksbeskyttelse — den komplette behandling",
        paragraphs: [
          "Polering alene fjerner materialet fra lakken, men åbner også porerne i overfladen. Voksbeskyttelse efter polering er derfor vigtig for at forsegle lakken og beskytte den mod ny tilsmudning. Voks giver en ekstra glans og gør det nemmere at holde bilen ren i hverdagen.",
          "CleanWash anbefaler kombinationen af polering og voks, fordi det giver det bedste og mest holdbare resultat. Premium bilpleje hos CleanWash inkluderer begge behandlinger samt en grundig udvendig vask inden poleringen.",
        ],
      },
      {
        heading: "Hvornår bør du polere din bil?",
        paragraphs: [
          "Bilen bør poleres, når lakken ser mat ud og har mistet sin glans, når der er synlige swirls eller fine ridser i lakken, inden salg for at maksimere den visuelle stand og salgsprisen, og som del af en sæsonmæssig bilpleje efter vinteren, når vejsalt og snavs har sat sig i lakken.",
          "For de fleste biler er én til to poleringer om året tilstrækkeligt. Biler, der bruges hårdt eller parkeres udendørs hele tiden, kan have glæde af hyppigere behandling.",
        ],
      },
      {
        heading: "Polering af bil i København",
        paragraphs: [
          "CleanWash tilbyder polering af bil i København, Frederiksberg, Amager, Østerbro, Hellerup og Storkøbenhavn. Poleringen er inkluderet i premium bilpleje-pakken, der også indeholder indvendig rengøring og voksbeskyttelse.",
          "Kunder kan booke polering af bil direkte via booking-siden. Vælg premium bilpleje og angiv relevante oplysninger om bilen. CleanWash håndterer resten.",
        ],
      },
    ],
    faqs: [
      { question: "Hvad er polering af bil?", answer: "Polering fjerner det øverste slidte lag af lakken og fjerner fine ridser, swirls og matte pletter for en glansfuld finish." },
      { question: "Tilbyder CleanWash polering af bil i København?", answer: "Ja. Polering er inkluderet i premium bilpleje-pakken hos CleanWash." },
      { question: "Fjerner polering ridser?", answer: "Polering fjerner fine ridser og swirls. Dybere ridser ned i grundlakken kan ikke fjernes med polering alene." },
      { question: "Hvad koster polering af bil?", answer: "Premium bilpleje inkl. polering og voks starter fra 849 kr. Se priser og book via /booking." },
      { question: "Bør man vokse bilen efter polering?", answer: "Ja. Voksbeskyttelse efter polering er anbefalet for at forsegle lakken og forlænge resultatet." },
      { question: "Hvordan booker jeg polering af bil i København?", answer: "Gå til /booking, vælg premium bilpleje og udfyld oplysninger om bilen." },
    ],
    relatedLinks: [
      { label: "Book bilvask", href: "/booking" },
      { label: "Klargøring til salg", href: "/klargoering-bil-salg" },
      { label: "Håndvask af bil", href: "/haandvask-bil-koebenhavn" },
      { label: "Bilvask leasingbil", href: "/bilvask-leasingbil" },
      { label: "Bilvask pris", href: "/bilvask-pris" },
      { label: "Bilvask efter vinter", href: "/bilvask-efter-vinter" },
      { label: "Bilvask København", href: "/bilvask-koebenhavn" },
      { label: "Bilpleje guide", href: "/bilpleje-guide" },
    ],
    priority: 0.89,
  },

  // ── Seasonal + Guide pages ────────────────────────────────────────────────────

  {
    slug: "bilvask-efter-vinter",
    title: "Bilvask efter vinter | Fjern vejsalt og vintersmudset | CleanWash",
    description:
      "Book bilvask efter vinter hos CleanWash. Fjern vejsalt, sand og vintergrus fra lak, fælge og bund — og giv bilen en frisk start på foråret.",
    h1: "Bilvask efter vinter",
    eyebrow: "Forårsrengøring af bilen",
    heroIntro:
      "CleanWash hjælper dig med at fjerne vinternes vejsalt, grus og snavs fra bilen. En grundig bilvask efter vinter beskytter lakken og giver bilen en frisk start.",
    shortSummary: [
      "Vejsalt fra vintermånederne er skadeligt for lak, fælge og bundramme og bør fjernes hurtigst muligt.",
      "CleanWash tilbyder grundig bilvask efter vinter med fokus på salt, grus og vintergrus.",
      "Book din bilvask efter vinter online og giv bilen den forårsrengøring den trænger til.",
    ],
    keywords: [
      "bilvask efter vinter",
      "fjern vejsalt bil",
      "bilvask forår",
      "vinterbilvask",
      "saltskader bil",
    ],
    serviceType: "Bilvask og forårsrengøring efter vinter",
    serviceArea: ["København", "Storkøbenhavn", "Sjælland", "Frederiksberg", "Amager"],
    schemaAreaServed: ["København", "Copenhagen", "Sjælland", "Denmark"],
    image: { src: "/service/udenfor.jpg", alt: "Bilvask efter vinter og fjernelse af vejsalt hos CleanWash" },
    secondaryCta: { label: "Se polering af bil", href: "/polering-bil-koebenhavn" },
    benefits: [
      { title: "Fjern vejsalt", text: "Vejsalt fra vintervejene er korrosivt og kan over tid skade lak, fælge og metal på bilen." },
      { title: "Beskyt lakken", text: "En grundig vask og efterfølgende voks beskytter lakken mod fremtidigt snavs og korrosion." },
      { title: "Fælge og bundramme", text: "Særlig fokus på fælge og hjulbuer, hvor salt og grus sætter sig fast om vinteren." },
      { title: "Frisk kabine", text: "Kombiner med indvendig rengøring for at fjerne vintermånedernes sand og snavs fra kabinen." },
    ],
    process: [
      { title: "Book bilvask", text: "Book en komplet bilvask eller premium bilpleje til bilvask efter vinter." },
      { title: "Oplys bilens stand", text: "Angiv eventuelle særlige fokusområder som fælge, bundramme eller kabine." },
      { title: "Grundig vintevrengøring", text: "CleanWash fjerner salt, grus og vintergrus fra lak, fælge, hjulbuer og kabine." },
      { title: "Frisk bil til foråret", text: "Bilen afleveres ren og klar til en ny sæson — eventuelt med voks for ekstra beskyttelse." },
    ],
    sections: [
      {
        heading: "Bilvask efter vinter — hvorfor er det vigtigt?",
        paragraphs: [
          "Dansk vinter betyder vejsalt, grus og fugt — alle elementer, der er skadelige for bilens lak, fælge og metalundervogn. Vejsalt er korrosivt og kan over tid fremkalde rust, hvis det får lov at sidde. En grundig bilvask efter vinter er ikke bare en æstetisk forbedring; det er en vigtig del af bilens vedligeholdelse.",
          "Mange bilejere glemmer at vaske bilen grundigt i vinteren, fordi det virker formålsløst, når vejret er dårligt. Men jo længere vejsaltet sidder, jo dybere arbejder det sig. En grundig forårsrengøring bør prioriteres, så snart vinteren er ovre og vejene er saltfri.",
        ],
      },
      {
        heading: "Hvad indeholder bilvask efter vinter?",
        paragraphs: [
          "En god bilvask efter vinter fokuserer særligt på de udsatte områder: fælge og hjulbuer, hvor salt og grus samler sig; bundrammen, hvor salt fra vejene kan starte rustdannelse; lakken, som kan miste glans fra vejsalt og sandfygning; og kabinen, som samler sand, snavs og fugt fra vintermånedernes brug.",
          "CleanWash anbefaler en komplet bilvask, der dækker alle disse områder. Premium bilpleje med polering og voks er ideelt efter en hård vinter, fordi det giver lakken den ekstra beskyttelse, den trænger til. En voksbehandling beskytter mod fremtidig tilsmudning og giver en glansfuld finish.",
        ],
      },
      {
        heading: "Salt og rust — risikoen ved at vente",
        paragraphs: [
          "Vejsalt fungerer ved at sænke frysepunktet for vand, men det er kemisk aggressivt over for metaller. Rust starter typisk i mikroskopiske revner i lakken, under tætningslister og i hjulbuer og bundramme, hvor salt og fugt samler sig. Rustdannelse kan som regel ikke ses, inden det er for sent at afhjælpe billigt.",
          "En professionel bilvask med fokus på disse udsatte områder er den bedste forebyggelse. Jo tidligere efter vinterens afslutning, jo bedre. CleanWash tilbyder bilvask efter vinter med online booking i hele København og på Sjælland.",
        ],
      },
      {
        heading: "Forårsrengøring — den komplette bilfornyelse",
        paragraphs: [
          "Mange bilejere bruger forårsrengøringen som anledning til en komplet bilfornyelse: udvendig vask og polering, indvendig rengøring af kabine og bagagerum, voksbehandling for beskyttelse, og et kig på fælge og gummi. Det giver bilen et friskt udtryk og en god start på den lyse halvdel af året.",
          "CleanWash tilbyder alle disse services i ét bookingflow. Kunder kan booke bilvask efter vinter direkte via booking-siden og vælge den service, der passer til bilens behov.",
        ],
      },
    ],
    faqs: [
      { question: "Hvorfor er bilvask efter vinter vigtigt?", answer: "Vejsalt fra vintervejene er korrosivt og kan fremkalde rust i lak, fælge og bundramme, hvis det ikke fjernes." },
      { question: "Hvornår bør jeg vaske bilen efter vinter?", answer: "Så snart vejene er saltfri — typisk i marts eller april. Jo tidligere desto bedre for lakken." },
      { question: "Tilbyder CleanWash bilvask efter vinter?", answer: "Ja. CleanWash tilbyder grundig bilvask og forårsrengøring med online booking i København og på Sjælland." },
      { question: "Bør jeg vokse bilen efter vintervask?", answer: "Ja. Voks beskytter lakken mod fremtidigt snavs og korrosion og forlænger resultatet af vasken." },
      { question: "Hvad koster bilvask efter vinter?", answer: "Udvendig bilvask fra 349 kr., komplet bilvask fra 599 kr., premium med polering og voks fra 849 kr." },
      { question: "Hvordan booker jeg bilvask efter vinter?", answer: "Gå til /booking, vælg komplet bilvask eller premium bilpleje og udfyld oplysninger om bilen." },
    ],
    relatedLinks: [
      { label: "Book bilvask", href: "/booking" },
      { label: "Polering af bil", href: "/polering-bil-koebenhavn" },
      { label: "Håndvask af bil", href: "/haandvask-bil-koebenhavn" },
      { label: "Indvendig bilrengøring", href: "/indvendig-bilrengoering-koebenhavn" },
      { label: "Bilvask pris", href: "/bilvask-pris" },
      { label: "Bilpleje guide", href: "/bilpleje-guide" },
      { label: "Bilvask København", href: "/bilvask-koebenhavn" },
      { label: "Bilvask Sjælland", href: "/bilvask-sjaelland" },
    ],
    priority: 0.88,
  },

  {
    slug: "bilpleje-guide",
    title: "Bilpleje guide | Hvor tit skal bilen vaskes? | CleanWash",
    description:
      "Komplet bilpleje guide fra CleanWash. Lær hvornår og hvor tit du bør vaske bilen, hvad der sker ved for sjælden vask, og hvad forskellen er på udvendig og komplet bilvask.",
    h1: "Bilpleje guide",
    eyebrow: "Guide til bilpleje og bilvask",
    heroIntro:
      "Alt du behøver at vide om bilpleje. Hvornår bør du vaske bilen? Hvad er forskellen på vask og polering? Og hvad sker der, hvis du venter for længe?",
    shortSummary: [
      "Bilen bør vaskes udvendigt minimum én gang om måneden — hyppigere om vinteren, når vejsalt belaster lakken.",
      "Indvendig rengøring anbefales 4-6 gange om året, men familiebiler og pendlerbiler trænger til det oftere.",
      "Polering og voks anbefales 1-2 gange om året for at bevare lakkens glans og beskytte mod korrosion.",
    ],
    keywords: [
      "bilpleje guide",
      "hvor tit skal bilen vaskes",
      "bilvask tips",
      "bilpleje tips",
      "hvornår skal bilen vaskes",
    ],
    serviceType: "Professionel bilpleje og bilvask",
    serviceArea: ["København", "Storkøbenhavn", "Sjælland", "Frederiksberg", "Amager"],
    schemaAreaServed: ["København", "Copenhagen", "Sjælland", "Denmark"],
    image: { src: "/service/helebil.jpg", alt: "Bilpleje guide fra CleanWash" },
    secondaryCta: { label: "Se bilvask pris", href: "/bilvask-pris" },
    benefits: [
      { title: "Bevar lakkens stand", text: "Regelmæssig vask fjerner snavs, salt og syrer, der over tid kan skade lakkens overflade." },
      { title: "Frisk kabine", text: "Regelmæssig indvendig rengøring giver en mere behagelig oplevelse og fjerner allergener og bakterier." },
      { title: "Højere salgsværdi", text: "En velplejet bil med dokumenteret vedligeholdelse opnår typisk en bedre salgspris." },
      { title: "Forebyg rust", text: "Fjernelse af vejsalt og snavs fra fælge og bundramme forebygger korrosion og rustdannelse." },
    ],
    process: [
      { title: "Udvendig vask månedligt", text: "Planlæg en udvendig vask mindst én gang om måneden for at holde lakken i god stand." },
      { title: "Indvendig rengøring 4-6x", text: "Rengør kabinen 4-6 gange om året — hyppigere for familiebiler og pendlerbiler." },
      { title: "Polering 1-2x om året", text: "Poler lakken en til to gange om året for at fjerne ridser og bevare glansen." },
      { title: "Voks efter polering", text: "Påfør voks efter polering for at beskytte lakken og forlænge resultatet." },
    ],
    sections: [
      {
        heading: "Hvor tit skal bilen vaskes?",
        paragraphs: [
          "Det korte svar er: oftere end de fleste gør. Mange bilejere vasker bilen, når den ser synligt beskidt ud — men på det tidspunkt har snavset allerede haft tid til at arbejde sig ind i lakken. Eksperter anbefaler en udvendig bilvask mindst én gang om måneden under normale omstændigheder.",
          "Om vinteren bør hyppigheden øges til to gange om måneden, fordi vejsalt fra glatførebekæmpelse sætter sig på lak, fælge og bundramme. Vejsalt er kemisk aggressivt og kan starte rustdannelse, hvis det ikke fjernes regelmæssigt. En simpel tommelfingerregel: vask bilen, hver gang vejene har været saltet.",
        ],
      },
      {
        heading: "Udvendig vask vs. komplet bilvask — hvad er forskellen?",
        paragraphs: [
          "Udvendig bilvask fokuserer på bilens ydre: lak, ruder, fælge, hjulbuer og spejle. Det er den hurtige løsning, der holder bilen præsentabel og fjerner det meste vejsnavs. En udvendig vask tager typisk 30-60 minutter og er den hyppigste form for bilvask.",
          "Komplet bilvask inkluderer alt fra udvendig vask og tilføjer indvendig rengøring af kabinen: støvsugning af gulve og sæder, aftørring af instrumentbræt og paneler, rengøring af måtter og bagagerum. Det er den løsning, de fleste bilejere bør vælge regelmæssigt — særligt familier, pendlere og erhvervskunder.",
        ],
      },
      {
        heading: "Hvornår er polering nødvendig?",
        paragraphs: [
          "Polering er nødvendig, når lakken ser mat ud og har mistet sin naturlige glans, når der er synlige swirls (cirkelformede ridser) fra tidligere vask, inden salg for at maksimere det visuelle udtryk og salgsprisen, og som del af forårsrengøringen efter en hård vinter.",
          "Polering anbefales typisk én til to gange om året. For biler, der parkeres udendørs og udsættes for direkte sol, snavs og vejr, kan hyppigere polering give mening. Kombiner altid polering med voks for at forsegle og beskytte den nypoleringen lak.",
        ],
      },
      {
        heading: "Hvad sker der, hvis bilen ikke vaskes?",
        paragraphs: [
          "Manglende bilvask har konsekvenser, der går ud over det æstetiske. Vejsnavs, pollen og syre fra fugleekskrementer angriber lakkens clearcoat og kan forårsage varige misfarvninger. Vejsalt korroderer metaldele og kan starte rustdannelse i fælge, hjulbuer og bundramme. Fine partikler fra snavs ridser lakken, når vinden bevæger dem over overfladen.",
          "Indvendigt samler støv, pollen, bakterier og allergener sig i kabinen, hvilket kan påvirke indeklimaluften og give anledning til dårlig lugt. Pletter og mærker i sæder og tæpper bliver sværere at fjerne, jo længere de sidder.",
        ],
      },
      {
        heading: "Bilpleje-tjekliste for årets gang",
        paragraphs: [
          "Forår (marts-maj): Grundig bilvask for at fjerne vinternes vejsalt. Poler lakken og påfør voks. Rengør kabinen grundigt. Kontrollér fælge for saltskader. Sommer (juni-august): Månedlig udvendig vask. Fjern insekter fra forrude og front hurtigt, da de er syreholdige. Indvendig rengøring efter ferieture.",
          "Efterår (september-november): Komplet bilvask inden vintervejret sætter ind. Påfør voks for ekstra beskyttelse. Kontrollér dørpakninger og gummi. Vinter (december-februar): Vask bilen hver 1-2 uge, når vejene er saltet. Fokus på fælge og hjulbuer. Hold kabinen ren for sand og fugt.",
        ],
      },
    ],
    faqs: [
      { question: "Hvor tit bør man vaske bilen?", answer: "Udvendig vask mindst én gang om måneden. Om vinteren to gange om måneden pga. vejsalt." },
      { question: "Hvad er forskellen på udvendig og komplet bilvask?", answer: "Udvendig vask rengør lakken og fælge. Komplet bilvask inkluderer også grundig indvendig rengøring af kabinen." },
      { question: "Hvornår bør man polere bilen?", answer: "Når lakken ser mat ud, der er ridser eller swirls, inden salg, eller som del af forårsrengøringen. 1-2 gange om året." },
      { question: "Er vejsalt skadeligt for bilen?", answer: "Ja. Vejsalt er korrosivt og kan starte rustdannelse i lak, fælge og metal, hvis det ikke fjernes regelmæssigt." },
      { question: "Hvad sker der, hvis man aldrig vasker bilen?", answer: "Snavs og salt angriber lakken, korrosion starter i metaldele, og kabinen samler støv, allergener og bakterier." },
      { question: "Kan CleanWash hjælpe med løbende bilpleje?", answer: "Ja. Book regelmæssige bilvask online via /booking, eller kontakt CleanWash for at drøfte en fast aftale." },
    ],
    relatedLinks: [
      { label: "Book bilvask", href: "/booking" },
      { label: "Bilvask efter vinter", href: "/bilvask-efter-vinter" },
      { label: "Polering af bil", href: "/polering-bil-koebenhavn" },
      { label: "Indvendig bilrengøring", href: "/indvendig-bilrengoering-koebenhavn" },
      { label: "Bilvask pris", href: "/bilvask-pris" },
      { label: "Klargøring til salg", href: "/klargoering-bil-salg" },
      { label: "Bilvask København", href: "/bilvask-koebenhavn" },
      { label: "Håndvask af bil", href: "/haandvask-bil-koebenhavn" },
    ],
    priority: 0.89,
  },

  // ── Diverse keyword pages ─────────────────────────────────────────────────────

  {
    slug: "billig-bilvask-koebenhavn",
    title: "Billig bilvask København | Overkommelig bilvask fra 349 kr. | CleanWash",
    description:
      "Billig bilvask i København fra 349 kr. Professionel udvendig vask, komplet bilpleje og klar pris uden skjulte gebyrer. Book online hos CleanWash.",
    h1: "Billig bilvask København",
    eyebrow: "Overkommelig bilpleje med professionel kvalitet",
    heroIntro:
      "CleanWash tilbyder professionel bilvask i København fra 349 kr. Klar pris fra start, ingen skjulte gebyrer og nem online booking.",
    shortSummary: [
      "Udvendig bilvask starter fra 349 kr. — komplet vask af lak, fælge, ruder og finish.",
      "Komplet bilvask fra 599 kr. inkluderer udvendig vask og grundig indvendig rengøring af kabinen.",
      "Du betaler kun, når bilen er vasket. Ingen skjulte gebyrer, ingen overraskelser.",
    ],
    keywords: [
      "billig bilvask København",
      "billig bilrengøring",
      "overkommelig bilvask",
      "bilvask billig pris",
      "budget bilvask København",
    ],
    serviceType: "Professionel bilvask i København til klar pris",
    serviceArea: ["København", "Frederiksberg", "Amager", "Østerbro", "Nørrebro", "Vesterbro", "Storkøbenhavn"],
    schemaAreaServed: ["København", "Copenhagen", "Sjælland", "Denmark"],
    image: { src: "/service/udenfor.jpg", alt: "Billig bilvask i København fra 349 kr. hos CleanWash" },
    secondaryCta: { label: "Se alle priser", href: "/bilvask-pris" },
    benefits: [
      { title: "Fra 349 kr.", text: "Udvendig bilvask fra 349 kr. — skånsom vask, fælge, ruder og finish uden skjulte tillæg." },
      { title: "Klar pris fra start", text: "Du ser den samlede pris, inden du bekræfter booking. Ingen overraskelser ved levering." },
      { title: "Betal efter vask", text: "Du betaler kun, når bilen er vasket og du er tilfreds med resultatet." },
      { title: "Tre pakker", text: "Vælg udvendig vask, komplet bilvask eller premium bilpleje afhængigt af bilens behov og dit budget." },
    ],
    process: [
      { title: "Vælg pakke", text: "Se priserne og vælg den pakke, der passer til din bil og dit budget." },
      { title: "Book online", text: "Book på 2 minutter uden opkald — vælg bil, adresse og tidspunkt." },
      { title: "Bilen vaskes", text: "CleanWash møder op og udfører den valgte bilvask professionelt." },
      { title: "Betal ved levering", text: "Du betaler til den pris, du så, da du bookede. Ingen tillæg." },
    ],
    sections: [
      {
        heading: "Hvad koster professionel bilvask i København?",
        paragraphs: [
          "Mange søger efter billig bilvask i København uden at gå på kompromis med kvaliteten. CleanWash tilbyder en klar prisstruktur: udvendig bilvask fra 349 kr., komplet bilvask fra 599 kr. og premium bilpleje fra 849 kr. Prisen afhænger af valgt service og biltype, men udgangspunktet er altid tydeligt inden booking.",
          "Det er vigtigt at forstå, hvad en bilvask inkluderer, når man sammenligner priser. Hos CleanWash er prisen for udvendig vask dækkende for skånsom vask med skum og skyl, rengøring af fælge og hjulbuer, aftørring af ruder og spejle samt tøring og finish. Der er ingen skjulte gebyrer eller tillæg.",
        ],
      },
      {
        heading: "Billig bilvask er ikke det samme som dårlig bilvask",
        paragraphs: [
          "Billig bilvask handler om gennemsigtighed, ikke om at spare på kvaliteten. En bilvasker, der lover meget lav pris men lægger tillæg til ved levering, er ikke billig — den er bare uigennemsigtig. CleanWash tilbyder klar pris fra start, fordi vi tror på, at tillid bygges på ærlighed.",
          "Professionel bilvask behøver ikke at koste en formue. For 349 kr. kan du få en grundig udvendig vask, der fjerner bysnavs, vejsalt, pollen og bremsestøv. For 599 kr. kan du tilføje en grundig indvendig kabinerengøring. Det er overkommelig bilpleje med et professionelt resultat.",
        ],
      },
      {
        heading: "Hvad får du for prisen?",
        paragraphs: [
          "Udvendig bilvask fra 349 kr. inkluderer: skånsom håndvask med skum og skyl for at løsne snavs fra lakken, grundig rengøring af fælge, hjulbuer og dæksider, aftørring af ruder, spejle og lister, finish og tøring af bil så den ser skarp ud ved aflevering.",
          "Komplet bilvask fra 599 kr. tilføjer: grundig støvsugning af kabine og bagagerum, aftørring af instrumentbræt, rat, gearknap og alle kontaktflader, rengøring af måtter og gulve, behandling af sæder og rygstød. Premium bilpleje fra 849 kr. tilføjer polering og voksbeskyttelse.",
        ],
      },
      {
        heading: "Spar penge med regelmæssig booking",
        paragraphs: [
          "En god måde at holde udgifterne nede på er at vaske bilen regelmæssigt frem for sjældent. Biler, der vaskes månedligt, kræver typisk kun en hurtig udvendig vask, fordi snavslaget aldrig når at opbygge sig. Biler, der sjældent vaskes, kræver mere intensiv rengøring og kan have saltskader, der er dyrere at udbedre.",
          "CleanWash gør det nemt at booke regelmæssig bilvask i København. Kunder kan booke via booking-siden og vælge den pakke, der passer bedst til budget og behov.",
        ],
      },
    ],
    faqs: [
      { question: "Hvad koster billig bilvask i København?", answer: "Udvendig bilvask starter fra 349 kr. Komplet bilvask fra 599 kr. Premium bilpleje fra 849 kr. Ingen skjulte gebyrer." },
      { question: "Er billig bilvask af dårlig kvalitet?", answer: "Nej. CleanWash tilbyder professionel kvalitet til klar pris. Billig bilvask handler om gennemsigtighed, ikke dårligt arbejde." },
      { question: "Hvad inkluderer udvendig bilvask til 349 kr.?", answer: "Skånsom vask, rengøring af fælge og hjulbuer, aftørring af ruder og spejle, finish og tøring af bilen." },
      { question: "Er der skjulte gebyrer?", answer: "Nej. Du ser den samlede pris, inden du bekræfter booking. Du betaler kun, når bilen er vasket." },
      { question: "Kan jeg spare ved at booke regelmæssigt?", answer: "Regelmæssig vask forhindrer opbygning af snavs og saltskader, som kan være dyre at udbedre." },
      { question: "Hvordan booker jeg billig bilvask i København?", answer: "Gå til /booking, vælg den pakke, der passer til dit budget, og udfyld oplysninger om bil og tidspunkt." },
    ],
    relatedLinks: [
      { label: "Book bilvask", href: "/booking" },
      { label: "Bilvask pris", href: "/bilvask-pris" },
      { label: "Bilvask København", href: "/bilvask-koebenhavn" },
      { label: "Udvendig bilvask", href: "/haandvask-bil-koebenhavn" },
      { label: "Komplet bilvask", href: "/indvendig-bilrengoering-koebenhavn" },
      { label: "Bilvask abonnement", href: "/bilvask-abonnement" },
      { label: "Mobil bilvask", href: "/mobil-bilvask-koebenhavn" },
      { label: "Bilpleje guide", href: "/bilpleje-guide" },
    ],
    priority: 0.91,
  },

  {
    slug: "express-bilvask",
    title: "Express bilvask | Hurtig bilvask samme dag | CleanWash",
    description:
      "Hurtig express bilvask hos CleanWash. Book bilvask samme dag i København og på Sjælland. Nem online booking, klar pris og professionelt resultat.",
    h1: "Express bilvask",
    eyebrow: "Hurtig bilvask uden ventetid",
    heroIntro:
      "Har bilen brug for en hurtig vask? CleanWash tilbyder express bilvask med nem online booking og professionelt resultat — samme dag eller til dit næste ledige tidspunkt.",
    shortSummary: [
      "Book express bilvask online og vælg det tidspunkt, der passer dig bedst.",
      "CleanWash udfører bilvask uden kø og ventetid — direkte til din adresse.",
      "Hurtig udvendig vask, komplet bilpleje eller express kabinerengøring — vælg i bookingflowet.",
    ],
    keywords: [
      "express bilvask",
      "hurtig bilvask",
      "bilvask samme dag",
      "bilvask i dag København",
      "hurtigt bilvask online",
    ],
    serviceType: "Express bilvask og hurtig bilpleje",
    serviceArea: ["København", "Frederiksberg", "Amager", "Østerbro", "Nørrebro", "Vesterbro", "Storkøbenhavn"],
    schemaAreaServed: ["København", "Copenhagen", "Sjælland", "Denmark"],
    image: { src: "/service/udenfor.jpg", alt: "Express bilvask og hurtig bilpleje hos CleanWash" },
    secondaryCta: { label: "Se bilvask pris", href: "/bilvask-pris" },
    benefits: [
      { title: "Ingen kø", text: "Slipper for kø i vaskehallen. Book online og vælg et tidspunkt, der passer ind i din kalender." },
      { title: "Hurtig booking", text: "Book express bilvask online på under 2 minutter uden telefonopkald." },
      { title: "Til din adresse", text: "CleanWash møder op, hvor bilen holder — hjemme, på arbejde eller et andet passende sted." },
      { title: "Klar pris", text: "Du ser den samlede pris, inden du bekræfter. Ingen overraskelser." },
    ],
    process: [
      { title: "Book online nu", text: "Gå til booking-siden og vælg service, bil og tidspunkt — det tager under 2 minutter." },
      { title: "Angiv adresse", text: "Oplys den adresse, hvor bilen holder, og kontaktoplysninger." },
      { title: "CleanWash møder op", text: "Teamet ankommer til det aftalte tidspunkt og udfører bilvasken." },
      { title: "Ren bil — hurtigt", text: "Du får en renere bil uden at bruge tid på transport eller kø." },
    ],
    sections: [
      {
        heading: "Hurtig bilvask uden kø og ventetid",
        paragraphs: [
          "Express bilvask er for dig, der har brug for en ren bil hurtigt. Måske er der et vigtigt møde, en begivenhed eller du har simpelthen opdaget, at bilen trænger til vask. CleanWash gør det muligt at booke bilvask online og få det udført hurtigt uden kø i en vaskehal.",
          "Online booking er kernen i express bilvask. Du vælger service, angiver biloplysninger og adresse, og vælger det tidspunkt, der passer dig bedst. CleanWash håndterer resten. Ingen opkald, ingen ventetid i butik — blot en professionel bilvask leveret til din dør.",
        ],
      },
      {
        heading: "Bilvask samme dag — er det muligt?",
        paragraphs: [
          "Det afhænger af tilgængelighed og rute, men CleanWash tilbyder booking med kort varsel. Via booking-siden kan du se ledige tider og vælge det nærmeste tilgængelige tidspunkt. Mange kunder kan få bilen vasket samme dag eller inden for 24 timer.",
          "Hurtig bilvask handler ikke bare om hastighed. Det handler om at gøre det nemt at passe bilvask ind i en travl hverdag. CleanWash er designet til kunder, der vil have en ren bil uden at det tager en hel dag.",
        ],
      },
      {
        heading: "Express udvendig vask vs. komplet express bilvask",
        paragraphs: [
          "Hvis du har travlt og primært har brug for en ren ydre, er udvendig bilvask den hurtigste løsning. Den fokuserer på lak, fælge, ruder og finish og tager typisk kortere tid end komplet bilvask. Det er den ideelle løsning, når bilen har en synlig udtorring, men kabinen er OK.",
          "Komplet express bilvask inkluderer udvendig vask og indvendig kabinerengøring. Det tager lidt længere tid men giver en mere grundig oplevelse. For kunder, der skal bruge bilen til en begivenhed eller har gæster i bilen, er komplet bilvask den bedre løsning.",
        ],
      },
      {
        heading: "Express bilvask i København og nærliggende bydele",
        paragraphs: [
          "CleanWash tilbyder express bilvask i hele København, Frederiksberg, Amager, Østerbro, Nørrebro, Vesterbro og Storkøbenhavn. Den konkrete tilgængelighed afhænger af rute og ledige tider, men booking-siden viser de nærmeste ledige tider i realtid.",
          "Kunder kan booke express bilvask direkte via booking-siden. Vælg service, bil og tidspunkt, og CleanWash håndterer resten.",
        ],
      },
    ],
    faqs: [
      { question: "Kan jeg booke express bilvask samme dag?", answer: "Det afhænger af tilgængelighed. Se ledige tider på booking-siden — mange kunder kan booke inden for 24 timer." },
      { question: "Hvad er forskellen på express og normal bilvask?", answer: "Express bilvask har fokus på hurtig levering. Bookingprocessen er den samme — det handler om at vælge et tidspunkt tæt på nu." },
      { question: "Er express bilvask dyrere?", answer: "Nej. Prisen er den samme uanset, om du booker til i dag eller næste uge. Udvendig fra 349 kr." },
      { question: "Kan jeg booke express bilvask uden opkald?", answer: "Ja. Booking foregår helt online via /booking. Ingen telefonopkald nødvendigt." },
      { question: "Dækker express bilvask hele København?", answer: "Ja. CleanWash dækker hele København og Storkøbenhavn. Konkret tilgængelighed vises i bookingflowet." },
      { question: "Hvor lang tid tager en express bilvask?", answer: "Udvendig vask tager typisk 30-60 min. Komplet bilvask 60-90 min. afhængigt af biltype og stand." },
    ],
    relatedLinks: [
      { label: "Book bilvask nu", href: "/booking" },
      { label: "Bilvask pris", href: "/bilvask-pris" },
      { label: "Bilvask København", href: "/bilvask-koebenhavn" },
      { label: "Mobil bilvask", href: "/mobil-bilvask-koebenhavn" },
      { label: "Billig bilvask", href: "/billig-bilvask-koebenhavn" },
      { label: "Håndvask af bil", href: "/haandvask-bil-koebenhavn" },
      { label: "Bilvask abonnement", href: "/bilvask-abonnement" },
      { label: "Indvendig bilrengøring", href: "/indvendig-bilrengoering-koebenhavn" },
    ],
    priority: 0.89,
  },

  {
    slug: "bilvask-abonnement",
    title: "Bilvask abonnement | Fast bilvask aftale | CleanWash",
    description:
      "Spar tid og penge med et bilvask abonnement hos CleanWash. Fast aftale, regelmæssig bilvask og professionel bilpleje i København og på Sjælland.",
    h1: "Bilvask abonnement",
    eyebrow: "Regelmæssig bilpleje med fast aftale",
    heroIntro:
      "Et bilvask abonnement hos CleanWash giver dig en ren bil måned efter måned uden at tænke over det. Fast aftale, fleksibel planlægning og professionel bilpleje.",
    shortSummary: [
      "Et bilvask abonnement giver regelmæssig bilpleje til fast pris og uden intern koordinering.",
      "CleanWash tilbyder faste aftaler til private bilejere og virksomheder med firmabiler.",
      "Regelmæssig bilvask beskytter lakken og bevarer bilens stand og salgsværdi.",
    ],
    keywords: [
      "bilvask abonnement",
      "fast bilvask aftale",
      "månedlig bilvask",
      "regelmæssig bilvask",
      "bilvask med abonnement",
    ],
    serviceType: "Bilvask abonnement og fast bilplejeaftale",
    serviceArea: ["København", "Frederiksberg", "Amager", "Østerbro", "Storkøbenhavn", "Sjælland"],
    schemaAreaServed: ["København", "Copenhagen", "Sjælland", "Denmark"],
    image: { src: "/service/helebil.jpg", alt: "Bilvask abonnement og fast bilvask aftale hos CleanWash" },
    secondaryCta: { label: "Erhvervs bilvask", href: "/erhvervs-bilvask" },
    benefits: [
      { title: "Altid ren bil", text: "Med et abonnement er bilen altid præsentabel — du behøver ikke huske at booke." },
      { title: "Forudsigelig udgift", text: "Fast månedlig udgift til bilpleje — nemt at budgettere for private og virksomheder." },
      { title: "Beskytter bilen", text: "Regelmæssig vask fjerner vejsalt og snavs, der over tid skader lak og metal." },
      { title: "Til private og erhverv", text: "Passer til private bilejere og virksomheder med firmabiler eller flåder." },
    ],
    process: [
      { title: "Vælg service og frekvens", text: "Beslut hvilken bilvask du ønsker og hvor ofte — ugentligt, to gange om måneden eller månedligt." },
      { title: "Aftal med CleanWash", text: "Kontakt CleanWash eller start med en enkelt booking for at afprøve servicen." },
      { title: "Planlæg faste tider", text: "CleanWash planlægger faste tider, der passer ind i din hverdag eller virksomhedens kalender." },
      { title: "Altid ren bil", text: "Bilen vaskes regelmæssigt uden at du behøver tænke over det." },
    ],
    sections: [
      {
        heading: "Bilvask abonnement — hvad er det, og hvem er det til?",
        paragraphs: [
          "Et bilvask abonnement er en fast aftale om regelmæssig bilvask til forudsigelig pris og planlægning. I stedet for at booke hver gang, kører bilvask automatisk på det aftalte tidspunkt. Det er ideelt for private bilejere, der vil have en altid præsentabel bil, og for virksomheder med firmabiler, der vil spare koordineringstid.",
          "Regelmæssig bilvask er ikke kun praktisk — det er også god bilpleje. Biler, der vaskes regelmæssigt, bevarer lakken bedre, er lettere at holde rene og har typisk en højere salgsværdi end biler, der sjældent vaskes.",
        ],
      },
      {
        heading: "Hvorfor er regelmæssig bilvask vigtig?",
        paragraphs: [
          "Vejsnavs, pollen, fugleekskrementer og vejsalt er alle kemisk aggressive over for bilens lak og metal. Biler, der sjældent vaskes, opbygger lag af snavs, der arbejder sig ind i lakken og kan forårsage matte pletter, ridser og på sigt rustdannelse i fælge og bundramme.",
          "En bil, der vaskes månedligt, behøver kun en hurtig udvendig vask, fordi snavslaget aldrig når at opbygge sig. Det sparer tid og penge på lang sigt og holder bilen i bedre stand. Et bilvask abonnement er den nemmeste måde at sikre regelmæssig vask.",
        ],
      },
      {
        heading: "Bilvask abonnement til private bilejere",
        paragraphs: [
          "For den private bilejere er et abonnement en nem måde at slippe for at huske bilvask. Du aftaler frekvens og service med CleanWash, og resten kører automatisk. Bilen er altid præsentabel, og du bruger ikke tid på at koordinere.",
          "Det passer særlig godt til pendlere, familier med to biler og bilejere, der bruger bilen dagligt i arbejdssammenhæng. For disse grupper er en ren bil en naturlig del af hverdagen, og et abonnement gør det ubesværet.",
        ],
      },
      {
        heading: "Bilvask abonnement til virksomheder",
        paragraphs: [
          "Virksomheder med firmabiler, leasingbiler eller flåder bruger intern tid og ressourcer på at koordinere bilvask, medmindre de har en fast aftale. Et erhvervs bilvask abonnement frigiver denne tid og sikrer, at alle biler er præsentable over for kunder og samarbejdspartnere.",
          "CleanWash tilbyder faste aftaler til virksomheder med tilpasset frekvens og servicevalg. Kontakt os for at drøfte et abonnement, der passer til jeres flåde og behov.",
        ],
      },
    ],
    faqs: [
      { question: "Hvad er et bilvask abonnement?", answer: "En fast aftale om regelmæssig bilvask til forudsigelig pris. Bilen vaskes automatisk på det aftalte tidspunkt." },
      { question: "Tilbyder CleanWash bilvask abonnement?", answer: "Ja. CleanWash tilbyder faste aftaler til private bilejere og virksomheder. Kontakt os for at drøfte en aftale." },
      { question: "Hvad koster et bilvask abonnement?", answer: "Prisen afhænger af frekvens og servicevalg. Start med en enkelt booking, eller kontakt os for et abonnementstilbud." },
      { question: "Kan virksomheder få bilvask abonnement?", answer: "Ja. CleanWash tilbyder erhvervs bilvask abonnement til virksomheder med firmabiler og flåder." },
      { question: "Hvor tit skal bilen vaskes med abonnement?", answer: "De fleste bilejere vælger månedlig vask. Pendlere og firmabiler vælger typisk to gange om måneden." },
      { question: "Hvordan starter jeg et bilvask abonnement?", answer: "Kontakt CleanWash eller start med en enkelt booking via /booking for at afprøve servicen." },
    ],
    relatedLinks: [
      { label: "Book bilvask", href: "/booking" },
      { label: "Erhvervs bilvask", href: "/erhvervs-bilvask" },
      { label: "Bilvask pris", href: "/bilvask-pris" },
      { label: "Bilpleje guide", href: "/bilpleje-guide" },
      { label: "Mobil bilvask", href: "/mobil-bilvask-koebenhavn" },
      { label: "Bilvask leasingbil", href: "/bilvask-leasingbil" },
      { label: "Bilvask København", href: "/bilvask-koebenhavn" },
      { label: "Express bilvask", href: "/express-bilvask" },
    ],
    priority: 0.90,
  },

  {
    slug: "miljoevenlig-bilvask",
    title: "Miljøvenlig bilvask | Bæredygtig bilpleje | CleanWash",
    description:
      "Book miljøvenlig bilvask hos CleanWash. Professionel bilvask med omtanke for miljøet — vandsparende metoder, skånsomme produkter og effektiv ruteplanlægning.",
    h1: "Miljøvenlig bilvask",
    eyebrow: "Bilvask med omtanke for miljøet",
    heroIntro:
      "CleanWash arbejder med professionel bilvask og miljøbevidst tankegang. Effektiv ruteplanlægning, skånsomme produkter og metoder der passer til den moderne bilejers værdier.",
    shortSummary: [
      "CleanWash planlægger ruter effektivt for at minimere transport og reducere CO₂-udledning.",
      "Vi bruger skånsomme produkter, der er effektive over for snavs og hensynsfulde over for miljøet.",
      "Mobil bilvask kan i mange tilfælde bruge mindre vand end en traditionel vaskehal.",
    ],
    keywords: [
      "miljøvenlig bilvask",
      "bæredygtig bilvask",
      "grøn bilpleje",
      "øko bilvask",
      "vandsparende bilvask",
    ],
    serviceType: "Miljøvenlig bilvask og bæredygtig bilpleje",
    serviceArea: ["København", "Frederiksberg", "Amager", "Storkøbenhavn", "Sjælland"],
    schemaAreaServed: ["København", "Copenhagen", "Sjælland", "Denmark"],
    image: { src: "/service/udenfor.jpg", alt: "Miljøvenlig bilvask hos CleanWash" },
    secondaryCta: { label: "Se bilpleje guide", href: "/bilpleje-guide" },
    benefits: [
      { title: "Effektiv ruteplanlægning", text: "CleanWash planlægger ruter, der minimerer kørsel og reducerer CO₂-udledning fra service." },
      { title: "Skånsomme produkter", text: "Vi bruger produkter, der er effektive over for snavs og hensynsfulde over for miljøet." },
      { title: "Ingen unødigt spild", text: "Professionelt udstyr giver et godt resultat med korrekte mængder vand og rensemiddel." },
      { title: "Mobil service", text: "Mobil bilvask eliminerer kundens transport til vaskehal og den medfølgende CO₂-udledning." },
    ],
    process: [
      { title: "Book online", text: "Book bilvask online og bidrag til effektiv ruteplanlægning i din bydel." },
      { title: "Skånsom vask", text: "CleanWash vasker bilen med skånsomme metoder og miljøbevidste produkter." },
      { title: "Ingen unødig transport", text: "Mobil service betyder, at du ikke kører til en vaskehal — CleanWash kommer til dig." },
      { title: "Rent resultat", text: "Du får en ren bil og kan føle dig godt tilpas med, at vasken er udført med omtanke." },
    ],
    sections: [
      {
        heading: "Miljøvenlig bilvask — hvad betyder det i praksis?",
        paragraphs: [
          "Miljøvenlig bilvask handler om at minimere unødigt ressourceforbrug og vælge metoder og produkter, der er skånsomme over for naturen. For CleanWash betyder det effektiv ruteplanlægning, der reducerer unødig kørsel, brug af professionelt udstyr, der giver godt resultat med korrekte mængder, og valg af produkter, der er effektive og hensynsfulde over for miljøet.",
          "Mobil bilvask har et særligt potentiale for miljøvenlighed, fordi det eliminerer kundens tur til en vaskehal. Mange bilejere kører kilometervis for at finde en vaskehal — det transport er unødigt, når bilvask kan komme til dem. CleanWash tilbyder netop denne løsning.",
        ],
      },
      {
        heading: "Produkter og metoder med omtanke",
        paragraphs: [
          "Valget af renseprodukter er vigtigt for en miljøvenlig bilvask. CleanWash bruger produkter, der er effektive over for vejsnavs, vejsalt og bysnavs, men som ikke indeholder unødigt aggressive kemikalier. Skum, shampoo og rensemidler er valgt med tanke på både effektivitet og miljøpåvirkning.",
          "Professionelt udstyr giver et bedre resultat med præcise mængder vand og produkt sammenlignet med en standard havepose og spand. Det reducer spild og giver et mere konsistent og skånsomt resultat for lakken.",
        ],
      },
      {
        heading: "Regelmæssig vask er mere bæredygtigt end sjælden vask",
        paragraphs: [
          "Et lidt overraskende faktum: regelmæssig bilvask er faktisk mere bæredygtigt end sjælden vask. Biler, der vaskes månedligt, kræver langt kortere vask og færre ressourcer per vask, fordi snavslaget aldrig opbygger sig. Biler, der sjældent vaskes, kræver lang tid, mere vand og stærkere produkter for at fjerne det opbyggede lag.",
          "Derudover beskytter regelmæssig vask bilens lak og metal mod korrosion og saltskader, hvilket forlænger bilens levetid. En bil i bedre stand i længere tid er mere bæredygtigt end tidlig udskiftning.",
        ],
      },
      {
        heading: "Miljøbevidst bilvask i København",
        paragraphs: [
          "I København er der et voksende fokus på bæredygtighed og miljøbevidste valg. Mange bilejere leder bevidst efter tjenester, der passer til deres værdier. CleanWash tilbyder professionel bilvask i København med en tilgang, der tager miljøet alvorligt uden at gå på kompromis med kvaliteten.",
          "Kunder kan booke miljøvenlig bilvask direkte via booking-siden. Vælg den service, der passer til bilen, og bidrag til en mere effektiv og bæredygtig bilvaskkultur i København.",
        ],
      },
    ],
    faqs: [
      { question: "Er CleanWash miljøvenlig?", answer: "CleanWash arbejder med effektiv ruteplanlægning, skånsomme produkter og metoder der minimerer unødigt ressourceforbrug." },
      { question: "Bruger mobil bilvask mere eller mindre vand end en vaskehal?", answer: "Professionelt udstyr bruger præcise mængder vand. Hertil sparer kunden transport til vaskehal, som reducerer CO₂." },
      { question: "Hvilke produkter bruger CleanWash?", answer: "Vi bruger produkter, der er effektive over for vejsnavs og skånsomme over for miljøet. Ingen unødigt aggressive kemikalier." },
      { question: "Er regelmæssig bilvask mere miljøvenlig?", answer: "Ja. Månedlig vask kræver kortere tid og færre ressourcer end sjælden vask af et opbygget snavslag." },
      { question: "Tilbyder CleanWash miljøvenlig bilvask i København?", answer: "Ja. CleanWash tilbyder professionel og miljøbevidst bilvask i hele København og på Sjælland." },
      { question: "Hvordan booker jeg miljøvenlig bilvask?", answer: "Gå til /booking, vælg den service der passer, og bidrag til mere effektiv og bæredygtig bilvask." },
    ],
    relatedLinks: [
      { label: "Book bilvask", href: "/booking" },
      { label: "Bilpleje guide", href: "/bilpleje-guide" },
      { label: "Bilvask efter vinter", href: "/bilvask-efter-vinter" },
      { label: "Mobil bilvask", href: "/mobil-bilvask-koebenhavn" },
      { label: "Bilvask København", href: "/bilvask-koebenhavn" },
      { label: "Bilvask pris", href: "/bilvask-pris" },
      { label: "Håndvask af bil", href: "/haandvask-bil-koebenhavn" },
      { label: "Bilvask abonnement", href: "/bilvask-abonnement" },
    ],
    priority: 0.87,
  },

  {
    slug: "bilvask-taastrup",
    title: "Bilvask Taastrup | Professionel bilvask i Høje-Taastrup | CleanWash",
    description:
      "Book professionel bilvask i Taastrup og Høje-Taastrup hos CleanWash. Udvendig vask, indvendig bilrengøring og komplet bilpleje med nem online booking vest for København.",
    h1: "Bilvask Taastrup",
    eyebrow: "Professionel bilvask i Taastrup",
    heroIntro:
      "CleanWash tilbyder professionel bilvask i Taastrup og Høje-Taastrup med online booking og klare servicevalg til private og erhverv.",
    shortSummary: [
      "CleanWash tilbyder bilvask i Taastrup og Høje-Taastrup med online booking.",
      "Servicen er relevant for bilejere i Taastrup, Hedehusene, Roskilde og nærliggende kommuner.",
      "Book udvendig vask, indvendig rengøring eller komplet bilpleje i bookingflowet.",
    ],
    keywords: [
      "bilvask Taastrup",
      "bilvask Høje-Taastrup",
      "bilrengøring Taastrup",
      "bilpleje Taastrup",
      "mobil bilvask Taastrup",
    ],
    serviceType: "Professionel bilvask i Taastrup",
    serviceArea: ["Taastrup", "Høje-Taastrup", "Hedehusene", "Albertslund", "Glostrup", "Roskilde"],
    schemaAreaServed: ["Taastrup", "Høje-Taastrup", "København", "Sjælland", "Denmark"],
    image: { src: "/service/helebil.jpg", alt: "Professionel bilvask i Taastrup og Høje-Taastrup hos CleanWash" },
    secondaryCta: { label: "Se bilvask Roskilde", href: "/bilvask-roskilde" },
    benefits: [
      { title: "Taastrup og omegn", text: "CleanWash er relevant for bilejere i Taastrup, Hedehusene, Albertslund og nærliggende kommuner vest for København." },
      { title: "Pendlerbiler", text: "Mange pendlere fra Taastrup kører dagligt til København — professionel bilvask er en naturlig del af den hverdag." },
      { title: "Online booking", text: "Book bilvask online og vælg service, tidspunkt og biloplysninger i ét flow." },
      { title: "Erhverv og private", text: "Passer til familiebiler, pendlerbiler, firmabiler og leasingbiler." },
    ],
    process: [
      { title: "Book online", text: "Gå til booking-siden og vælg den bilvask, der passer til bilen." },
      { title: "Oplys bil og adresse", text: "Angiv nummerplade, kontaktoplysninger og ønsket tidspunkt." },
      { title: "CleanWash klargør", text: "Teamet forbereder rute og service ud fra din booking." },
      { title: "Bilen vaskes", text: "Du får en renere bil leveret professionelt uden ventetid." },
    ],
    sections: [
      {
        heading: "Bilvask i Taastrup — professionel service vest for København",
        paragraphs: [
          "Høje-Taastrup er et af de største erhvervs- og boligområder vest for København med mange pendlere, familier og virksomheder. Bilejere i Taastrup søger professionel og fleksibel bilvask, der passer ind i en travl hverdag. CleanWash tilbyder bilvask i Taastrup med online booking og klare servicevalg.",
          "Med motorvejsadgang til E20 og Ring 4 er Taastrup et centralt trafikknudepunkt. Pendlerbiler og firmabiler fra Taastrup bruges hårdt og trænger til regelmæssig bilvask. En professionel bilvask holder bilen præsentabel og i bedre stand.",
        ],
      },
      {
        heading: "Høje-Taastrup: erhverv og beboelse",
        paragraphs: [
          "Høje-Taastrup Kommune er et af Sjællands vigtigste erhvervscentre med mange kontorer, lagerhaller og industrivirksomheder. Firmabiler og erhvervsbiler fra disse virksomheder skal fremstå præsentable. CleanWash kan hjælpe med regelmæssig bilvask og bilpleje til erhvervskunder.",
          "Taastrup, Hedehusene og Albertslund har mange familier og private bilejere, der bruger bilen til pendling, børnekørsel og hverdagstransport. For disse kunder er en fleksibel og professionel bilvaskløsning en stor fordel.",
        ],
      },
      {
        heading: "Hvad tilbyder CleanWash i Taastrup?",
        paragraphs: [
          "CleanWash tilbyder udvendig bilvask, indvendig bilrengøring og komplet bilpleje til kunder i Taastrup. Udvendig vask fjerner vejsnavs fra lak, ruder og fælge. Indvendig rengøring fokuserer på kabine, støvsugning og sæder. Komplet bilpleje kombinerer begge.",
          "Kunder kan booke bilvask direkte via booking-siden. Den konkrete dækning afhænger af adresse og rute, men bookingflowet samler alle oplysninger, så CleanWash kan planlægge effektivt.",
        ],
      },
      {
        heading: "Taastrup og nærliggende kommuner",
        paragraphs: [
          "Høje-Taastrup grænser op til Roskilde, Albertslund, Glostrup og Hvidovre. CleanWash er relevant for kunder i hele dette vestlige Storkøbenhavn. Start booking-processen online for at se tilgængelighed og vælge den service, der passer til bilen.",
          "Kunder fra Taastrup og nærliggende kommuner kan booke bilvask direkte via booking-siden og afklare muligheder for deres specifikke adresse.",
        ],
      },
    ],
    faqs: [
      { question: "Tilbyder CleanWash bilvask i Taastrup?", answer: "Ja. CleanWash tilbyder professionel bilvask i Taastrup og Høje-Taastrup med online booking." },
      { question: "Dækker I Hedehusene og Albertslund?", answer: "CleanWash er relevant for Taastrup og nærliggende kommuner. Konkret dækning afhænger af booking og rute." },
      { question: "Er CleanWash relevant for erhvervskunder i Taastrup?", answer: "Ja. Høje-Taastrup har mange erhvervsvirksomheder, og CleanWash tilbyder bilvask til firmabiler og flåder." },
      { question: "Kan jeg booke komplet bilpleje i Taastrup?", answer: "Ja. Du kan vælge udvendig vask, indvendig rengøring eller komplet bilpleje i bookingflowet." },
      { question: "Hvad koster bilvask i Taastrup?", answer: "Udvendig bilvask fra 349 kr., komplet bilvask fra 599 kr. Se priser og book via /booking." },
      { question: "Hvordan booker jeg bilvask i Taastrup?", answer: "Gå til /booking, vælg service og udfyld oplysninger om bil og ønsket tidspunkt." },
    ],
    relatedLinks: [
      { label: "Book bilvask", href: "/booking" },
      { label: "Bilvask Roskilde", href: "/bilvask-roskilde" },
      { label: "Bilvask Hvidovre", href: "/bilvask-hvidovre" },
      { label: "Bilvask Køge", href: "/bilvask-koege" },
      { label: "Erhvervs bilvask", href: "/erhvervs-bilvask" },
      { label: "Bilvask pris", href: "/bilvask-pris" },
      { label: "Bilvask Sjælland", href: "/bilvask-sjaelland" },
      { label: "Mobil bilvask", href: "/mobil-bilvask-koebenhavn" },
    ],
    priority: 0.84,
  },

  {
    slug: "bilvask-hilleroed",
    title: "Bilvask Hillerød | Professionel bilvask i Nordsjælland | CleanWash",
    description:
      "Book professionel bilvask i Hillerød hos CleanWash. Udvendig vask, indvendig bilrengøring og komplet bilpleje med nem online booking i Nordsjælland.",
    h1: "Bilvask Hillerød",
    eyebrow: "Professionel bilvask i Hillerød",
    heroIntro:
      "CleanWash tilbyder professionel bilvask i Hillerød og Nordsjælland med online booking og klare servicevalg til private og erhverv.",
    shortSummary: [
      "CleanWash tilbyder bilvask i Hillerød og Nordsjælland med online booking.",
      "Servicen er relevant for bilejere i Hillerød, Allerød, Fredensborg og nærliggende kommuner.",
      "Book udvendig vask, indvendig rengøring eller komplet bilpleje i bookingflowet.",
    ],
    keywords: [
      "bilvask Hillerød",
      "bilrengøring Hillerød",
      "bilpleje Hillerød",
      "mobil bilvask Hillerød",
      "bilvask Nordsjælland",
    ],
    serviceType: "Professionel bilvask i Hillerød og Nordsjælland",
    serviceArea: ["Hillerød", "Allerød", "Fredensborg", "Frederikssund", "Birkerød", "Nordsjælland"],
    schemaAreaServed: ["Hillerød", "Nordsjælland", "Sjælland", "Zealand", "Denmark"],
    image: { src: "/service/udenfor.jpg", alt: "Professionel bilvask i Hillerød og Nordsjælland hos CleanWash" },
    secondaryCta: { label: "Se bilvask Sjælland", href: "/bilvask-sjaelland" },
    benefits: [
      { title: "Hillerød og Nordsjælland", text: "CleanWash er relevant for bilejere i Hillerød, Allerød, Fredensborg og nærliggende nordsjællandske kommuner." },
      { title: "Pendlere fra Hillerød", text: "Mange pendler dagligt fra Hillerød til København — professionel bilvask passer til denne travle hverdag." },
      { title: "Online booking", text: "Book bilvask online og vælg service, tidspunkt og biloplysninger i ét flow." },
      { title: "Til alle biltyper", text: "Passer til familiebiler, pendlerbiler, firmabiler og leasingbiler." },
    ],
    process: [
      { title: "Book online", text: "Gå til booking-siden og vælg den bilvask, der passer til bilen." },
      { title: "Oplys bil og adresse", text: "Angiv nummerplade, kontaktoplysninger og ønsket tidspunkt." },
      { title: "CleanWash planlægger", text: "Teamet forbereder rute og service ud fra din booking." },
      { title: "Bilen vaskes professionelt", text: "Du får en renere bil leveret uden kø og ventetid." },
    ],
    sections: [
      {
        heading: "Bilvask i Hillerød — professionel service i Nordsjælland",
        paragraphs: [
          "Hillerød er Nordsjællands administrative centrum og en af regionens største byer med mange bilejere, der pendler til København og Storkøbenhavn. Bilvask Hillerød er relevant for alle, der vil have bilen gjort ren professionelt uden at køre langt til en vaskehal. CleanWash tilbyder bilvask i Hillerød med online booking.",
          "Med togforbindelse til København og adgang til Helsingørmotorvejen er Hillerød et centralt punkt i Nordsjælland. Pendlerbiler fra Hillerød bruges hårdt og trænger til regelmæssig bilvask for at bevare et præsentabelt udtryk.",
        ],
      },
      {
        heading: "Hillerød og nærliggende kommuner",
        paragraphs: [
          "Hillerød grænser op til Allerød, Fredensborg, Frederikssund og Birkerød. CleanWash er relevant for kunder i hele dette nordsjællandske område. Den konkrete dækning afhænger af booking og ruteplanlægning. Start processen online for at afklare muligheder.",
          "Nordsjælland er et område med mange velhavende kommuner og bilejere, der sætter pris på professionel og kvalitetsbevidst service. CleanWash tilbyder netop dette med online booking og klare servicevalg.",
        ],
      },
      {
        heading: "Hvad tilbyder CleanWash i Hillerød?",
        paragraphs: [
          "CleanWash tilbyder udvendig bilvask, indvendig bilrengøring og komplet bilpleje til kunder i Hillerød. Udvendig vask fjerner vejsnavs fra lak, ruder og fælge. Indvendig rengøring fokuserer på kabine, støvsugning og sæder. Komplet bilpleje kombinerer begge dele for det bedste resultat.",
          "Kunder kan booke bilvask direkte via booking-siden. Vælg den service, der passer til bilen, og angiv relevante oplysninger. CleanWash håndterer resten.",
        ],
      },
      {
        heading: "Erhvervskunder og private i Hillerød",
        paragraphs: [
          "Hillerød er hjemsted for mange offentlige institutioner, hospitaler og private virksomheder med firmabiler. CleanWash kan hjælpe med regelmæssig bilvask og bilpleje til erhvervskunder. Private bilejere i Hillerød nyder godt af en professionel service, der sparer tid og giver et godt resultat.",
          "Kunder kan booke bilvask direkte via booking-siden. Vælg den service, der passer til bilen.",
        ],
      },
    ],
    faqs: [
      { question: "Tilbyder CleanWash bilvask i Hillerød?", answer: "Ja. CleanWash tilbyder professionel bilvask i Hillerød og Nordsjælland med online booking." },
      { question: "Dækker I Allerød og Fredensborg?", answer: "CleanWash er relevant for Hillerød og nærliggende kommuner. Konkret dækning afhænger af booking og rute." },
      { question: "Er CleanWash relevant for pendlere fra Hillerød?", answer: "Ja. Pendlerbiler bruges hårdt, og CleanWash gør det nemt at booke regelmæssig bilvask." },
      { question: "Kan jeg booke komplet bilpleje i Hillerød?", answer: "Ja. Du kan vælge udvendig vask, indvendig rengøring eller komplet bilpleje i bookingflowet." },
      { question: "Hvad koster bilvask i Hillerød?", answer: "Udvendig bilvask fra 349 kr., komplet bilvask fra 599 kr. Se priser og book via /booking." },
      { question: "Hvordan booker jeg bilvask i Hillerød?", answer: "Gå til /booking, vælg service og udfyld oplysninger om bil og ønsket tidspunkt." },
    ],
    relatedLinks: [
      { label: "Book bilvask", href: "/booking" },
      { label: "Bilvask Hellerup", href: "/bilvask-hellerup" },
      { label: "Bilvask Lyngby", href: "/bilvask-lyngby" },
      { label: "Bilvask Sjælland", href: "/bilvask-sjaelland" },
      { label: "Bilvask Roskilde", href: "/bilvask-roskilde" },
      { label: "Bilvask pris", href: "/bilvask-pris" },
      { label: "Mobil bilvask", href: "/mobil-bilvask-koebenhavn" },
      { label: "Bilpleje guide", href: "/bilpleje-guide" },
    ],
    priority: 0.84,
  },
];

export const seoPagesBySlug = Object.fromEntries(
  seoPages.map((page) => [page.slug, page])
) as Record<string, SeoPageConfig>;

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

export function createSeoMetadata(page: SeoPageConfig): Metadata {
  const canonical = `/${page.slug}`;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      type: "website",
      locale: "da_DK",
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${page.title} hos CleanWash`,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
    keywords: page.keywords,
  };
}
