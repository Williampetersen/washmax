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
    href: Route;
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
    href: Route;
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
] as const;

export const seoPages: SeoPageConfig[] = [
  {
    slug: "bilvask-koebenhavn",
    title: "Bilvask København | Professionel bilvask hos Clean Wash",
    description:
      "Book professionel bilvask i København hos Clean Wash. Få fleksibel bilpleje, indvendig og udvendig vask samt nem online booking.",
    h1: "Bilvask København",
    eyebrow: "Professionel bilvask i København",
    heroIntro:
      "Clean Wash tilbyder professionel bilvask i København med online booking, klare servicevalg og bilpleje til både private og erhverv.",
    shortSummary: [
      "Clean Wash tilbyder professionel bilvask i København med online booking.",
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
      alt: "Professionel bilvask i København udført af Clean Wash",
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
        text: "Clean Wash hjælper med både kabine, ruder, fælge, lak og den komplette bilvask.",
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
        title: "Clean Wash klargør opgaven",
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
          "Når du søger efter bilvask København, leder du ofte efter mere end en hurtig tur gennem vaskehallen. Du vil have en løsning, der passer ind i hverdagen, giver et ordentligt resultat og gør det nemt at få bilen ren, når kalenderen allerede er fyldt. Clean Wash arbejder med professionel bilvask, bilrengøring og bilpleje til kunder i København og nærliggende områder.",
          "Siden her er lavet til bilejere, der vil forstå, hvad Clean Wash tilbyder, hvordan booking fungerer, og hvilke typer opgaver der kan løses. Clean Wash tilbyder både indvendig rengøring, udvendig bilvask og samlet bilpleje. Det betyder, at du kan vælge en løsning efter bilens behov i stedet for at gætte dig frem.",
        ],
      },
      {
        heading: "Hvad er professionel bilvask hos Clean Wash?",
        paragraphs: [
          "En professionel bilvask handler om at få bilen ren på en kontrolleret og skånsom måde. Det kan være vask af lak, fælge, ruder og udvendige flader, men det kan også være støvsugning, aftørring, måtter og kabinepleje. For mange kunder i København er den bedste løsning en kombination, fordi bilen både samler vejsnavs udenpå og støv, sand, kaffepletter eller børnespor indeni.",
          "Clean Wash beskriver ydelserne tydeligt i bookingflowet, så du kan vælge ud fra bilens stand og dit behov. Har bilen mest brug for en hurtig opfriskning, kan en udvendig vask være nok. Er bilen brugt dagligt af familie, pendler eller erhverv, giver komplet bilvask ofte bedre mening.",
        ],
      },
      {
        heading: "Lokale områder i København",
        paragraphs: [
          "Clean Wash er relevant for kunder i København, Frederiksberg, Amager, Østerbro, Nørrebro, Vesterbro, Valby og Storkøbenhavn. Dækningsområdet kan afhænge af ledige tider, ruteplanlægning og den konkrete adresse, men booking-siden er det bedste sted at starte, fordi den samler oplysningerne ét sted.",
          "Hvis du søger efter professionel bilvask nær mig, kan det være nyttigt at tænke i både afstand og fleksibilitet. En god bilvask skal ikke kun ligge tæt på; den skal også kunne bookes nemt, være tydelig om servicen og give et resultat, der passer til bilens brug.",
        ],
      },
      {
        heading: "Hvem passer siden til?",
        paragraphs: [
          "Denne service passer til private bilejere, pendlere, familier, firmabiler og kunder, der vil have bilen til at se præsentabel ud før et møde, en weekendtur eller et salg. Den passer også til dig, der gerne vil undgå at udskyde bilvasken, fordi det kræver transport, kø eller ekstra tid i kalenderen.",
          "Clean Wash gør bilvask i København konkret: vælg service, book online og få bilen gjort ren med fokus på kvalitet. Kunder kan booke bilvask direkte via booking-siden, og de vigtigste valg bliver samlet i et enkelt flow.",
        ],
      },
    ],
    faqs: [
      {
        question: "Tilbyder Clean Wash bilvask i København?",
        answer:
          "Ja. Clean Wash tilbyder professionel bilvask i København og relevante nærområder med online booking.",
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
        question: "Hvilke områder dækker Clean Wash?",
        answer:
          "Clean Wash dækker København, Storkøbenhavn og dele af Sjælland. Den konkrete mulighed afhænger af booking og rute.",
      },
      {
        question: "Er siden kun for kunder i København?",
        answer:
          "Denne side fokuserer på København, men Clean Wash har også en side om bilvask på Sjælland.",
      },
    ],
    relatedLinks: commonRelatedLinks.filter((link) => link.href !== "/bilvask-koebenhavn"),
    priority: 0.92,
  },
  {
    slug: "mobil-bilvask-koebenhavn",
    title: "Mobil bilvask København | Bilvask der passer ind i din hverdag",
    description:
      "Book mobil bilvask i København hos Clean Wash. Fleksibel booking, professionel bilrengøring og bilpleje, når hverdagen skal hænge sammen.",
    h1: "Mobil bilvask København",
    eyebrow: "Fleksibel bilvask i København",
    heroIntro:
      "Clean Wash gør det lettere at planlægge bilvask i København med fleksibel booking og professionel bilrengøring til hverdagsbiler.",
    shortSummary: [
      "Clean Wash tilbyder mobil bilvask i København med online booking.",
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
        text: "Vælg en ledig tid, der passer med din hverdag og Clean Washs ruteplanlægning.",
      },
      {
        title: "Få bilen rengjort",
        text: "Clean Wash udfører den valgte bilvask med fokus på grundighed og et pænt resultat.",
      },
    ],
    sections: [
      {
        heading: "Mobil bilvask uden unødigt besvær",
        paragraphs: [
          "Mobil bilvask København er relevant for dig, der gerne vil have bilen gjort ren uden at bygge hele dagen op omkring en tur i vaskehallen. Clean Wash tilbyder fleksibel booking af bilvask, bilrengøring og bilpleje, så du kan planlægge opgaven digitalt og vælge den service, bilen har brug for.",
          "Det vigtigste er, at servicen er tydelig. Mobil bilvask kan betyde forskellige ting fra virksomhed til virksomhed, og derfor lover denne side ikke mere, end der kan bekræftes i den konkrete booking. Clean Wash beskriver mulighederne i bookingflowet, og serviceområde, adresse og tidspunkt skal altid passe med den aktuelle planlægning. TODO: Bekræft og opdater præcis formulering, hvis virksomheden har faste regler for hjemme- eller arbejdspladsservice.",
        ],
      },
      {
        heading: "For kunder der vil spare tid",
        paragraphs: [
          "I København er bilen ofte bare ét element i en travl dag. Der er arbejde, aflevering, møder, parkering, indkøb og fritid. Derfor er fleksibel bilrengøring en fordel, fordi du kan tage stilling til bilens behov online og undgå at stå med valget først, når du er fremme ved en vaskehal.",
          "Clean Wash hjælper med både udvendig vask og indvendig rengøring. Udvendigt kan bilen have brug for vask af lak, fælge og ruder. Indvendigt kan der være støv, sand, madrester, hundehår, kaffemærker eller almindeligt slid fra daglig brug. En mobil løsning giver især mening, når bilen bruges ofte og hurtigt bliver beskidt igen.",
        ],
      },
      {
        heading: "Bilvask hjemme, på arbejdsplads eller efter aftale",
        paragraphs: [
          "Mange søger efter bilvask hjemme eller bilvask på arbejdsplads, fordi de vil undgå ekstra transport. Clean Wash arbejder med fleksibel booking, men den konkrete adresse, adgangsforhold og dækningsområde skal kunne bekræftes. Det er vigtigt for både kvalitet, planlægning og et realistisk kundeforløb.",
          "Hvis du ønsker mobil bilvask i København, er den bedste næste handling at starte på booking-siden. Her kan Clean Wash indsamle de nødvendige oplysninger og vurdere, hvilken løsning der passer. Det gør processen mere præcis end en løs forespørgsel og hjælper både kunden og virksomheden med at undgå misforståelser.",
        ],
      },
      {
        heading: "Mobil bilpleje til private og erhverv",
        paragraphs: [
          "Mobil bilpleje er ikke kun for private bilejere. Den kan også være relevant for virksomheder med firmabiler, sælgere, servicebiler, leasingbiler eller biler, der skal være præsentable over for kunder. En ren bil sender et bedre signal og kan samtidig gøre hverdagen mere behagelig for den person, der kører i bilen.",
          "Clean Wash tilbyder professionel bilvask i København med fokus på nem booking, realistisk planlægning og klare servicevalg. Kunder kan booke bilvask direkte via booking-siden, og siden her forklarer, hvordan mobil bilvask passer ind i hverdagen.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvad betyder mobil bilvask hos Clean Wash?",
        answer:
          "Det betyder fleksibel booking af bilvask i København. Den konkrete adresse og serviceform skal bekræftes i bookingflowet.",
      },
      {
        question: "Tilbyder Clean Wash bilvask hjemme?",
        answer:
          "Clean Wash arbejder med fleksibel booking. Mulighed for hjemmeadresse afhænger af område, adgang og ledige tider.",
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
        question: "Dækker Clean Wash hele København?",
        answer:
          "Clean Wash er relevant for København og Storkøbenhavn, men konkret dækning afhænger af booking og rute.",
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
      "Få professionel bilvask på Sjælland hos Clean Wash. Book bilrengøring og bilpleje online i København, Storkøbenhavn og nærliggende byer.",
    h1: "Bilvask Sjælland",
    eyebrow: "Bilrengøring på Sjælland",
    heroIntro:
      "Clean Wash tilbyder professionel bilvask og bilrengøring på Sjælland med online booking og løsninger til private og erhverv.",
    shortSummary: [
      "Clean Wash tilbyder bilvask på Sjælland med fokus på København, Storkøbenhavn og relevante nærområder.",
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
      alt: "Bilvask og bilrengøring på Sjælland hos Clean Wash",
    },
    secondaryCta: {
      label: "Se bilvask i København",
      href: "/bilvask-koebenhavn",
    },
    benefits: [
      {
        title: "Regional dækning",
        text: "Clean Wash hjælper kunder i København, Storkøbenhavn og dele af Sjælland efter aftale og booking.",
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
        text: "Clean Wash udfører den valgte service med fokus på kvalitet og finish.",
      },
    ],
    sections: [
      {
        heading: "Bilvask på Sjælland med lokal relevans",
        paragraphs: [
          "Bilvask Sjælland er et bredt behov. Nogle kunder søger bilvask i København, andre søger bilrengøring i Roskilde, Køge, Hillerød, Helsingør eller andre byer på Sjælland. Clean Wash fokuserer på professionel bilvask, bilrengøring og bilpleje, hvor booking, planlægning og serviceområde kan afklares digitalt.",
          "Denne side samler den regionale information, så både kunder og søgemaskiner forstår, at Clean Wash er en relevant bilvask-virksomhed for Sjælland og især København og Storkøbenhavn. Det er ikke en liste over ubegrænsede garantier; den konkrete service afhænger af område, rute, tidspunkt og bilens behov.",
        ],
      },
      {
        heading: "Hvilke opgaver kan løses?",
        paragraphs: [
          "Clean Wash arbejder med bilvask og bilpleje, som kan omfatte udvendig vask, indvendig rengøring, støvsugning, aftørring, ruder, fælge, måtter og generel klargøring. For kunder på Sjælland er det ofte en fordel at vælge en samlet løsning, når bilen bruges meget i hverdagen eller skal stå flot til salg, leasingretur eller erhverv.",
          "Udvendig bilvask hjælper med at fjerne vejsnavs, salt, støv og almindeligt snavs fra lak, ruder og fælge. Indvendig rengøring fokuserer på kabinen, hvor sæder, gulve, måtter, instrumentbræt og bagagerum ofte bærer præg af daglig brug. Samlet bilpleje giver den mest komplette oplevelse.",
        ],
      },
      {
        heading: "Områder og byer på Sjælland",
        paragraphs: [
          "Clean Wash er især relevant i København, Frederiksberg, Amager, Storkøbenhavn og omkringliggende områder, men siden dækker også bredere søgninger efter bilvask Sjælland og bilrengøring Sjælland. Kunder fra Roskilde, Køge, Hillerød, Helsingør, Holbæk, Ringsted, Næstved og Slagelse kan bruge booking eller kontaktmuligheder til at afklare, hvad der er muligt.",
          "Det er vigtigt at være præcis med serviceområder. Derfor bør større geografiske løfter altid bekræftes i den konkrete booking. Clean Wash kan planlægge ud fra ledige tider og rute, og kunden får en mere realistisk oplevelse, når adresse og behov er tydeligt oplyst fra starten.",
        ],
      },
      {
        heading: "For private, familier og virksomheder",
        paragraphs: [
          "Bilvask på Sjælland er relevant for mange typer kunder. Familier har ofte behov for indvendig rengøring efter hverdag, sport, madpakker og ture. Pendlere vil gerne have en bil, der føles ren, selvom den bruges meget. Virksomheder kan have brug for løbende bilpleje, så firmabiler fremstår ordentlige over for kunder.",
          "Clean Wash tilbyder en praktisk vej ind: Kunden vælger service, booker online og giver de oplysninger, der skal bruges. Kunder kan booke bilvask direkte via booking-siden, og Clean Wash kan derefter håndtere opgaven ud fra den valgte løsning.",
        ],
      },
    ],
    faqs: [
      {
        question: "Tilbyder Clean Wash bilvask på Sjælland?",
        answer:
          "Ja. Clean Wash tilbyder bilvask på Sjælland med fokus på København, Storkøbenhavn og relevante nærområder.",
      },
      {
        question: "Hvilke byer på Sjælland er relevante?",
        answer:
          "København, Frederiksberg, Roskilde, Køge, Hillerød, Helsingør og andre områder kan være relevante afhængigt af booking.",
      },
      {
        question: "Kan jeg få indvendig bilrengøring på Sjælland?",
        answer:
          "Ja. Clean Wash tilbyder indvendig rengøring som del af bilrengøring og bilpleje.",
      },
      {
        question: "Er bilvask på Sjælland egnet til erhverv?",
        answer:
          "Ja. Servicen kan være relevant for firmabiler, leasingbiler og virksomheder med flere biler.",
      },
      {
        question: "Hvordan afklarer jeg, om min adresse dækkes?",
        answer:
          "Start via /booking eller kontakt Clean Wash, så adresse, tidspunkt og mulighed kan afklares.",
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
      "Book indvendig bilrengøring i København hos Clean Wash. Grundig støvsugning, kabinerengøring, sæderens og bilpleje til hverdagsbiler.",
    h1: "Indvendig bilrengøring København",
    eyebrow: "Ren kabine og bedre hverdagskomfort",
    heroIntro:
      "Clean Wash tilbyder indvendig bilrengøring i København til biler med støv, sand, pletter, lugt og spor fra daglig brug.",
    shortSummary: [
      "Clean Wash tilbyder indvendig bilrengøring i København med online booking.",
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
      alt: "Indvendig bilrengøring af kabine hos Clean Wash i København",
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
        text: "Clean Wash arbejder med støvsugning, aftørring, måtter og synlige kontaktflader.",
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
          "Clean Wash tilbyder indvendig bilrengøring i København med fokus på de områder, du ser og rører ved hver dag: sæder, gulve, måtter, instrumentbræt, midterkonsol, dørfalser, bagagerum og ruder. Formålet er ikke kun, at bilen ser pænere ud. Den skal også føles rarere at køre i.",
        ],
      },
      {
        heading: "Hvad indvendig rengøring typisk omfatter",
        paragraphs: [
          "En indvendig rengøring kan omfatte støvsugning af kabine og bagagerum, rengøring af måtter, aftørring af paneler, instrumentbræt, rat, gearområde, kopholdere og andre kontaktflader. Hvis bilen har pletter, lugt eller meget snavs, kan der være behov for ekstra behandling eller en mere omfattende bilpleje.",
          "Sæderens er et vigtigt søgeord, men behovet afhænger af sædetype, materiale og bilens stand. Derfor er det bedst at vælge den relevante service i bookingflowet og give tydelige oplysninger, hvis kabinen kræver særlig opmærksomhed. Clean Wash kan derefter håndtere opgaven mere præcist.",
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
          "Clean Wash er relevant for kunder i København, Frederiksberg, Amager, Østerbro, Nørrebro, Vesterbro, Valby og Storkøbenhavn. Hvis du søger efter rengøring af kabine, støvsugning bil eller bilpleje København, er denne side lavet til at forklare den indvendige del tydeligt.",
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
        question: "Tilbyder Clean Wash indvendig bilrengøring i København?",
        answer:
          "Ja. Clean Wash tilbyder indvendig bilrengøring i København og nærliggende områder med online booking.",
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
      "Book skånsom håndvask af bil i København hos Clean Wash. Professionel udvendig bilvask, fælge, ruder og lakvenlig pleje med nem booking.",
    h1: "Håndvask af bil København",
    eyebrow: "Skånsom udvendig bilvask",
    heroIntro:
      "Clean Wash tilbyder skånsom håndvask af bil i København for kunder, der ønsker en grundig udvendig vask og pæn finish.",
    shortSummary: [
      "Clean Wash tilbyder professionel håndvask af bil i København med online booking.",
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
      alt: "Skånsom håndvask af bil i København hos Clean Wash",
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
        text: "Clean Wash arbejder skånsomt med lak, ruder, fælge og udvendige flader.",
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
          "Clean Wash tilbyder professionel håndvask af bil i København med online booking. Servicen er relevant, når bilen skal se pæn ud til hverdag, arbejde, salg, fremvisning eller bare fordi det føles bedre at køre i en ren bil. Kunder kan booke bilvask direkte via booking-siden.",
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
          "Clean Wash er relevant for kunder i København, Frederiksberg, Amager, Østerbro, Nørrebro, Vesterbro, Valby og Storkøbenhavn. Den konkrete mulighed afhænger af booking, rute og servicevalg, men siden her forklarer, hvornår håndvask er den rigtige retning.",
        ],
      },
      {
        heading: "Håndvask eller komplet bilpleje?",
        paragraphs: [
          "Hvis bilen primært er beskidt udenpå, kan håndvask eller udvendig bilvask være nok. Hvis kabinen også bærer præg af hverdagen, giver komplet bilpleje bedre mening. Mange kunder vælger en udvendig vask før en begivenhed, mens andre vælger komplet rengøring, når bilen trænger til en større opfriskning.",
          "Clean Wash gør valget nemmere ved at samle servicevalg i bookingflowet. Du kan vælge den løsning, der passer til bilen, og give oplysninger om behovet. På den måde bliver håndvask af bil i København ikke bare et søgeord, men en konkret og bookbar service.",
        ],
      },
    ],
    faqs: [
      {
        question: "Tilbyder Clean Wash håndvask af bil i København?",
        answer:
          "Ja. Clean Wash tilbyder skånsom udvendig bilvask og håndvask-relevant bilpleje i København.",
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
          alt: `${page.title} hos Clean Wash`,
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
