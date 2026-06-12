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
  proofPoints?: {
    title: string;
    text: string;
  }[];
  gallery?: {
    src: string;
    alt: string;
    title: string;
    text: string;
  }[];
  keywordGroups?: {
    title: string;
    terms: string[];
  }[];
  relatedLinks: {
    label: string;
    href: Route;
  }[];
  priority: number;
};

const route = (href: string) => href as Route;

const commonRelatedLinks: SeoPageConfig["relatedLinks"] = [
  { label: "Book bilvask", href: route("/booking") },
  { label: "Bilvask København", href: route("/bilvask-koebenhavn") },
  { label: "Mobil bilvask København", href: route("/mobil-bilvask-koebenhavn") },
  { label: "Bilvask Sjælland", href: route("/bilvask-sjaelland") },
  { label: "Indvendig bilrengøring København", href: route("/indvendig-bilrengoering-koebenhavn") },
  { label: "Håndvask af bil København", href: route("/haandvask-bil-koebenhavn") },
  { label: "Udvendig bilvask København", href: route("/udvendig-bilvask-koebenhavn") },
  { label: "Bilvask priser", href: route("/bilvask-priser") },
  { label: "Erhverv bilvask København", href: route("/erhverv-bilvask-koebenhavn") },
];

const relatedLinksWithout = (href: string) =>
  commonRelatedLinks.filter((link) => link.href !== route(href));

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
    relatedLinks: relatedLinksWithout("/bilvask-koebenhavn"),
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
    relatedLinks: relatedLinksWithout("/mobil-bilvask-koebenhavn"),
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
    relatedLinks: relatedLinksWithout("/bilvask-sjaelland"),
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
    relatedLinks: relatedLinksWithout("/indvendig-bilrengoering-koebenhavn"),
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
    relatedLinks: relatedLinksWithout("/haandvask-bil-koebenhavn"),
    priority: 0.89,
  },
];

type AreaSeoTarget = {
  slug: string;
  name: string;
  displayName?: string;
  nearby: string[];
  priority?: number;
};

const coreCopenhagenAreas = [
  "København",
  "Frederiksberg",
  "Amager",
  "Østerbro",
  "Nørrebro",
  "Vesterbro",
  "Valby",
  "Vanløse",
  "Christianshavn",
  "Sydhavnen",
  "Islands Brygge",
  "Nordhavn",
  "Hellerup",
  "Gentofte",
  "Lyngby",
  "Søborg",
  "Rødovre",
  "Hvidovre",
  "Tårnby",
  "Kastrup",
  "Dragør",
  "Storkøbenhavn",
];

const highIntentKeywords = [
  "bilvask København",
  "mobil bilvask København",
  "bilvask hjemme København",
  "bilvask på adressen",
  "håndvask bil København",
  "indvendig bilrengøring København",
  "udvendig bilvask København",
  "bilpleje København",
  "miljøvenlig bilvask København",
  "bilvask pris København",
  "bilvask nær mig",
  "erhverv bilvask København",
];

const defaultProofPoints = [
  {
    title: "Bookbar service",
    text: "Hver SEO-side leder til et konkret bookingflow, så søgningen bliver til en handling.",
  },
  {
    title: "Lokalt dækningsområde",
    text: "Siderne beskriver København, Storkøbenhavn og nærliggende områder med realistisk ruteafklaring.",
  },
  {
    title: "Tydelige servicevalg",
    text: "Kunder kan vælge udvendig vask, indvendig rengøring eller komplet bilpleje efter bilens behov.",
  },
];

const defaultSeoGallery = [
  {
    src: "/service/udenfor.jpg",
    alt: "Udvendig bilvask med rengøring af bilens yderside",
    title: "Udvendig vask",
    text: "Lak, ruder, spejle og fælge får fokus, når bilen skal fremstå renere og mere præsentabel.",
  },
  {
    src: "/service/inside.jpg",
    alt: "Indvendig bilrengøring af kabine og sæder",
    title: "Indvendig rengøring",
    text: "Kabine, måtter, paneler og daglige kontaktflader rengøres, så bilen føles friskere at bruge.",
  },
  {
    src: "/service/helebil.jpg",
    alt: "Komplet bilvask med indvendig og udvendig bilpleje",
    title: "Komplet bilpleje",
    text: "En samlet løsning passer godt, når bilen trænger både indvendigt og udvendigt.",
  },
];

const serviceSeoPages: SeoPageConfig[] = [
  {
    slug: "udvendig-bilvask-koebenhavn",
    title: "Udvendig bilvask København | Skånsom vask på adressen",
    description:
      "Book udvendig bilvask i København hos CleanWash. Skånsom vask af lak, fælge, ruder og spejle med mobil service og nem online booking.",
    h1: "Udvendig bilvask København",
    eyebrow: "Lak, fælge og ruder",
    heroIntro:
      "CleanWash tilbyder udvendig bilvask i København for bilejere, der vil have en renere bil uden kø, ventetid og ekstra tur i vaskehallen.",
    shortSummary: [
      "Målrettet side til søgninger som udvendig bilvask København, håndvask bil og bilvask på adressen.",
      "Servicen passer til bystøv, regn, pollen, bremsestøv, vejsalt og almindelig trafikfilm.",
      "Kunder kan booke udvendig vask eller kombinere den med indvendig bilrengøring.",
    ],
    keywords: [
      "udvendig bilvask København",
      "håndvask bil København",
      "skånsom bilvask København",
      "bilvask på adressen",
      "bilvask nær mig",
    ],
    serviceType: "Udvendig bilvask i København",
    serviceArea: coreCopenhagenAreas,
    schemaAreaServed: ["København", "Copenhagen", "Frederiksberg", "Amager", "Sjælland"],
    image: {
      src: "/service/udenfor.jpg",
      alt: "Udvendig bilvask i København med skånsom vask af bil",
    },
    secondaryCta: {
      label: "Se komplet bilvask",
      href: "/bilvask-koebenhavn",
    },
    benefits: [
      {
        title: "Ren lak og finish",
        text: "Udvendig vask fokuserer på lak, ruder, spejle, fælge og synlige flader.",
      },
      {
        title: "God før møder og salg",
        text: "En ren bil giver et bedre førsteindtryk før arbejde, fremvisning eller fotos.",
      },
      {
        title: "Mobil planlægning",
        text: "Book online, så tidspunkt, adresse og service kan planlægges klart.",
      },
      {
        title: "Kan kombineres",
        text: "Vælg komplet bilpleje, hvis kabinen også skal rengøres grundigt.",
      },
    ],
    process: [
      { title: "Vælg udvendig vask", text: "Start i bookingflowet og vælg den service, bilen har brug for." },
      { title: "Angiv adresse", text: "Oplys hvor bilen holder, så rute og mulighed kan afklares." },
      { title: "Få bilen vasket", text: "CleanWash arbejder med udvendige flader, fælge, ruder og finish." },
      { title: "Kør videre renere", text: "Bilen står mere præsentabel uden en separat tur i vaskehal." },
    ],
    sections: [
      {
        heading: "Udvendig bilvask til københavnsk hverdag",
        paragraphs: [
          "Udvendig bilvask København er en af de mest konkrete søgninger for bilejere, der allerede ved, hvad bilen mangler. Det handler om lak, ruder, spejle, fælge og den synlige finish, der hurtigt bliver påvirket af bytrafik, regn, støv og vejsalt.",
          "CleanWash gør søgningen bookbar. Du kan vælge den relevante service online og give oplysninger om bil, adresse og tidspunkt, så opgaven kan planlægges realistisk.",
        ],
      },
      {
        heading: "Hvornår er udvendig vask nok?",
        paragraphs: [
          "Hvis kabinen er pæn, men bilen ser mat eller beskidt ud udenpå, er udvendig bilvask ofte den rigtige løsning. Den er også oplagt før kundemøder, weekendture, salg, leasingaflevering eller når bilen bare skal se ordentlig ud igen.",
          "Hvis både kabine og yderside trænger, bør du vælge komplet bilvask. På den måde får du både indvendig bilrengøring og udvendig finish i samme booking.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvad omfatter udvendig bilvask?",
        answer:
          "Udvendig bilvask fokuserer på lak, ruder, spejle, fælge og synlige flader. Det præcise indhold afhænger af den valgte service.",
      },
      {
        question: "Kan jeg booke udvendig bilvask på min adresse?",
        answer:
          "Ja, du kan angive adressen i bookingflowet. Den konkrete mulighed afhænger af område, adgang og ledige tider.",
      },
      {
        question: "Dækker I Frederiksberg, Amager og Østerbro?",
        answer:
          "CleanWash er relevant for København, Frederiksberg, Amager, Østerbro og nærliggende områder. Endelig dækning afklares ved booking.",
      },
      {
        question: "Kan udvendig vask kombineres med indvendig rengøring?",
        answer:
          "Ja. Vælg komplet bilvask, hvis bilen både skal vaskes udvendigt og rengøres indvendigt.",
      },
    ],
    keywordGroups: [
      { title: "Primære søgninger", terms: ["udvendig bilvask København", "håndvask bil København", "skånsom bilvask"] },
      { title: "Lokale søgninger", terms: ["bilvask Frederiksberg", "bilvask Amager", "bilvask Østerbro", "bilvask Nørrebro"] },
    ],
    relatedLinks: relatedLinksWithout("/udvendig-bilvask-koebenhavn"),
    priority: 0.88,
  },
  {
    slug: "bilvask-priser",
    title: "Bilvask priser | Pris på mobil bilvask i København",
    description:
      "Se prisniveau for mobil bilvask, indvendig bilrengøring og komplet bilpleje hos CleanWash. Book bilvask i København og på Sjælland online.",
    h1: "Bilvask priser",
    eyebrow: "Pris og pakker",
    heroIntro:
      "Find den rigtige bilvask-pakke hos CleanWash, fra udvendig vask til komplet bilpleje med indvendig rengøring.",
    shortSummary: [
      "Målrettet til søgninger som bilvask pris København, mobil bilvask pris og komplet bilvask pris.",
      "Prisen afhænger af biltype, valgt pakke, bilens stand og eventuelle tilvalg.",
      "Bookingflowet viser den mest præcise pris og gør det nemt at vælge service.",
    ],
    keywords: [
      "bilvask pris København",
      "mobil bilvask pris",
      "indvendig bilrengøring pris",
      "komplet bilvask pris",
      "bilpleje pris København",
    ],
    serviceType: "Bilvask priser og pakker",
    serviceArea: coreCopenhagenAreas,
    schemaAreaServed: ["København", "Copenhagen", "Sjælland", "Denmark"],
    image: {
      src: "/service/helebil.jpg",
      alt: "Bilvask priser og pakker hos CleanWash",
    },
    secondaryCta: {
      label: "Book og se pris",
      href: "/booking",
    },
    benefits: [
      { title: "Klarere valg", text: "Se forskellen på udvendig vask, indvendig rengøring og komplet bilpleje." },
      { title: "Pris efter behov", text: "Biltype, stand og tilvalg kan påvirke den endelige pris." },
      { title: "Online booking", text: "Du kan vælge service og tidspunkt uden at ringe først." },
      { title: "Til private og erhverv", text: "Priser og aftaler kan bruges til både enkeltbiler og flere firmabiler." },
    ],
    process: [
      { title: "Vælg pakke", text: "Start med udvendig, indvendig eller komplet bilvask." },
      { title: "Tilføj bilinfo", text: "Nummerplade og biltype hjælper med at beregne service og tid." },
      { title: "Se ledige tider", text: "Vælg et tidspunkt, der passer med din adresse og rute." },
      { title: "Bekræft booking", text: "Book online, når pris, pakke og tidspunkt passer." },
    ],
    sections: [
      {
        heading: "Hvad koster bilvask i København?",
        paragraphs: [
          "Søgningen bilvask pris København bliver ofte brugt af kunder, der sammenligner vaskehal, håndvask, mobil bilvask og komplet bilpleje. Den bedste pris afhænger af, om bilen kun skal vaskes udvendigt, rengøres indvendigt eller have en samlet behandling.",
          "CleanWash viser pris og valg i bookingflowet, så du kan vælge ud fra bilens behov. Det gør prisen mere relevant end en løs gennemsnitspris, fordi biltype, snavsniveau og tilvalg kan ændre opgaven.",
        ],
      },
      {
        heading: "Billigst er ikke altid bedst",
        paragraphs: [
          "En hurtig vask kan være nok til let snavs, men en bil med beskidt kabine, fælge, måtter, sæder eller meget bysnavs kræver mere tid. Derfor bør du sammenligne pris med indhold, ikke kun med det laveste tal.",
          "Hvis du vil spare tid, er mobil bilvask på adressen ofte stærk, fordi bilen kan blive rengjort uden ekstra kørsel, kø eller ventetid.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvad koster bilvask hos CleanWash?",
        answer:
          "Prisen afhænger af biltype, service, bilens stand og tilvalg. Den mest præcise pris vises i bookingflowet.",
      },
      {
        question: "Er komplet bilvask dyrere end udvendig vask?",
        answer:
          "Ja, komplet bilvask omfatter både udvendig vask og indvendig rengøring og tager derfor typisk længere tid.",
      },
      {
        question: "Kan virksomheder få fast pris?",
        answer:
          "Erhvervskunder med flere biler kan kontakte CleanWash for aftale om fast eller tilbagevendende bilvask.",
      },
      {
        question: "Betaler jeg før eller efter bilvask?",
        answer:
          "Betaling og vilkår afhænger af den konkrete booking og den valgte løsning.",
      },
    ],
    keywordGroups: [
      { title: "Pris-søgninger", terms: ["bilvask pris København", "mobil bilvask pris", "komplet bilvask pris", "indvendig bilrengøring pris"] },
      { title: "Pakker", terms: ["udvendig bilvask", "indvendig bilrengøring", "premium bilpleje", "erhverv bilvask"] },
    ],
    relatedLinks: relatedLinksWithout("/bilvask-priser"),
    priority: 0.9,
  },
  {
    slug: "erhverv-bilvask-koebenhavn",
    title: "Erhverv bilvask København | Firmabiler og flådeaftaler",
    description:
      "CleanWash tilbyder erhverv bilvask i København til firmabiler, leasingbiler, taxa, transport, bilforhandlere og flåder.",
    h1: "Erhverv bilvask København",
    eyebrow: "Firmabiler og faste aftaler",
    heroIntro:
      "CleanWash hjælper virksomheder med professionel bilvask, bilrengøring og bilpleje til firmabiler og bilflåder i København.",
    shortSummary: [
      "Målrettet erhvervssøgninger som firmabil vask, flåde bilvask og erhverv bilvask København.",
      "Relevant for leasingbiler, servicebiler, taxa, transport, bilforhandlere og virksomheder med flere biler.",
      "Kontakt CleanWash for faste aftaler, ruteplanlægning og gentagne bookinger.",
    ],
    keywords: [
      "erhverv bilvask København",
      "firmabil vask København",
      "flåde bilvask",
      "bilvask firmaaftale",
      "mobil bilvask erhverv",
    ],
    serviceType: "Erhverv bilvask i København",
    serviceArea: coreCopenhagenAreas,
    schemaAreaServed: ["København", "Copenhagen", "Storkøbenhavn", "Sjælland", "Denmark"],
    image: {
      src: "/service/helebil.jpg",
      alt: "Erhverv bilvask i København til firmabiler og flåder",
    },
    secondaryCta: {
      label: "Kontakt om aftale",
      href: "/booking",
    },
    benefits: [
      { title: "Flere biler", text: "God løsning til virksomheder med gentagne behov eller flere biler samme sted." },
      { title: "Præsentabel flåde", text: "Rene firmabiler sender et bedre signal til kunder og medarbejdere." },
      { title: "Mindre koordinering", text: "Planlæg faste ruter eller gentagne aftaler efter behov." },
      { title: "Fleksible ydelser", text: "Vælg udvendig vask, indvendig rengøring eller komplet bilpleje." },
    ],
    process: [
      { title: "Kontakt CleanWash", text: "Fortæl hvor mange biler, område og hvor ofte de skal vaskes." },
      { title: "Afklar service", text: "Vælg udvendig, indvendig eller komplet bilpleje." },
      { title: "Planlæg rute", text: "Adresse, adgang og tidsrum aftales, så opgaven passer ind i driften." },
      { title: "Hold bilerne rene", text: "Firmabiler, leasingbiler og servicebiler kan fremstå mere professionelle." },
    ],
    sections: [
      {
        heading: "Bilvask til virksomheder i København",
        paragraphs: [
          "Erhverv bilvask København er for virksomheder, der ikke vil bruge intern tid på at koordinere vaskehal, nøgler, ventetid og enkeltbookinger. CleanWash kan hjælpe med professionel bilvask og bilrengøring til firmabiler, leasingbiler og flåder.",
          "Behovet er ofte praktisk: bilen skal se pæn ud over for kunder, være rar at køre i for medarbejdere og kunne holdes ren med mindre administration.",
        ],
      },
      {
        heading: "Firmabiler, leasingbiler og bilforhandlere",
        paragraphs: [
          "Servicen er relevant for sælgere, servicebiler, taxa, transport, ejendomsselskaber, bilforhandlere og virksomheder med flere biler. Nogle har brug for udvendig vask ofte, mens andre har brug for komplet indvendig og udvendig klargøring.",
          "CleanWash kan tilpasse dialogen efter antal biler, område, ønsket frekvens og adgangsforhold. Det giver bedre forventninger fra starten.",
        ],
      },
    ],
    faqs: [
      {
        question: "Tilbyder CleanWash bilvask til virksomheder?",
        answer:
          "Ja. CleanWash tilbyder erhvervsrettet bilvask til firmabiler, leasingbiler, servicebiler og flåder.",
      },
      {
        question: "Kan vi lave en fast aftale?",
        answer:
          "Ja, virksomheder kan kontakte CleanWash for at afklare fast aftale, rute, frekvens og serviceindhold.",
      },
      {
        question: "Kan flere biler vaskes på samme adresse?",
        answer:
          "Det kan ofte være relevant. Muligheden afhænger af antal biler, adgang, tid og ruteplanlægning.",
      },
      {
        question: "Dækker I Storkøbenhavn?",
        answer:
          "CleanWash er relevant for København, Storkøbenhavn og dele af Sjælland. Endelig dækning aftales konkret.",
      },
    ],
    keywordGroups: [
      { title: "Erhverv", terms: ["erhverv bilvask København", "firmabil vask", "flåde bilvask", "bilvask firmaaftale"] },
      { title: "Målgrupper", terms: ["leasingbiler", "taxa", "transport", "bilforhandlere", "servicebiler"] },
    ],
    relatedLinks: relatedLinksWithout("/erhverv-bilvask-koebenhavn"),
    priority: 0.88,
  },
  {
    slug: "bilpleje-koebenhavn",
    title: "Bilpleje København | Indvendig og udvendig klargøring",
    description:
      "Book bilpleje i København hos CleanWash. Få indvendig bilrengøring, udvendig bilvask, sæderens og klargøring til hverdag, salg eller leasing.",
    h1: "Bilpleje København",
    eyebrow: "Mere end en hurtig vask",
    heroIntro:
      "CleanWash tilbyder bilpleje i København til biler, der skal føles renere, se bedre ud og være klar til hverdag, salg, leasing eller arbejde.",
    shortSummary: [
      "Bilpleje samler søgninger som bilrengøring, klargøring, sæderens, håndvask og komplet bilvask.",
      "Relevant når bilen kræver mere end en hurtig udvendig vask.",
      "Book online og vælg den service, der passer til bilens stand.",
    ],
    keywords: [
      "bilpleje København",
      "klargøring bil København",
      "sæderens bil København",
      "interiørrens bil København",
      "komplet bilvask København",
    ],
    serviceType: "Bilpleje i København",
    serviceArea: coreCopenhagenAreas,
    schemaAreaServed: ["København", "Copenhagen", "Frederiksberg", "Sjælland", "Denmark"],
    image: {
      src: "/service/helebil.jpg",
      alt: "Bilpleje i København med indvendig og udvendig rengøring",
    },
    secondaryCta: {
      label: "Se indvendig rengøring",
      href: "/indvendig-bilrengoering-koebenhavn",
    },
    benefits: [
      { title: "Komplet helhed", text: "Bilpleje kan kombinere udvendig vask, kabine, ruder, måtter og finish." },
      { title: "Før salg", text: "Klargøring kan hjælpe bilen med at fremstå mere velholdt." },
      { title: "Leasing og arbejde", text: "Relevant for biler, der skal afleveres eller bruges professionelt." },
      { title: "Valg efter behov", text: "Book den pakke, der passer til bilens stand og ønsket resultat." },
    ],
    process: [
      { title: "Vurder bilen", text: "Tænk over om bilen primært trænger indvendigt, udvendigt eller begge dele." },
      { title: "Vælg service", text: "Book bilpleje, indvendig rengøring eller komplet bilvask." },
      { title: "Tilføj detaljer", text: "Beskriv pletter, lugt, snavs eller særlige behov i bookingen." },
      { title: "Få bilen frisket op", text: "CleanWash udfører opgaven med fokus på synligt og brugbart resultat." },
    ],
    sections: [
      {
        heading: "Bilpleje når bilen skal mere end bare vaskes",
        paragraphs: [
          "Bilpleje København dækker de kunder, der søger efter en mere grundig løsning end en standardvask. Det kan være indvendig bilrengøring, udvendig bilvask, sæderens, klargøring eller komplet bilpleje.",
          "CleanWash gør det nemt at vælge den rigtige retning gennem online booking, så bilen kan få en service, der passer til stand, brug og ønsket resultat.",
        ],
      },
      {
        heading: "Klargøring til salg, leasing eller hverdag",
        paragraphs: [
          "En ren bil føles bedre i hverdagen, men bilpleje er også praktisk før salg, leasingaflevering eller billeder. Køber, medarbejder eller kunde lægger hurtigt mærke til kabine, ruder, fælge og lak.",
          "Hvis du er i tvivl, kan komplet bilvask være et godt udgangspunkt, fordi den samler indvendig og udvendig rengøring.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvad er forskellen på bilvask og bilpleje?",
        answer:
          "Bilvask fokuserer typisk på rengøring, mens bilpleje kan være en mere komplet opfriskning med indvendig og udvendig fokus.",
      },
      {
        question: "Tilbyder CleanWash klargøring før salg?",
        answer:
          "CleanWash tilbyder bilpleje og rengøring, der kan være relevant før salg, fremvisning eller leasingaflevering.",
      },
      {
        question: "Kan jeg få sæderens?",
        answer:
          "Sæderens afhænger af den valgte service og bilens behov. Beskriv gerne behovet i bookingflowet.",
      },
      {
        question: "Dækker I København og omegn?",
        answer:
          "Ja, CleanWash er relevant for København, Storkøbenhavn og nærliggende områder afhængigt af booking og rute.",
      },
    ],
    keywordGroups: [
      { title: "Bilpleje", terms: ["bilpleje København", "klargøring bil København", "komplet bilvask", "interiørrens bil"] },
      { title: "Tilvalg", terms: ["sæderens", "fælgrens", "ruder", "måtter", "kabinerengøring"] },
    ],
    relatedLinks: relatedLinksWithout("/bilpleje-koebenhavn"),
    priority: 0.87,
  },
  {
    slug: "miljoevenlig-bilvask-koebenhavn",
    title: "Miljøvenlig bilvask København | Mobil bilvask med omtanke",
    description:
      "Book miljøvenlig bilvask i København hos CleanWash. Professionel mobil bilvask med ruteplanlægning, skånsomme metoder og nem online booking.",
    h1: "Miljøvenlig bilvask København",
    eyebrow: "Ren bil med omtanke",
    heroIntro:
      "CleanWash tilbyder mobil bilvask i København med fokus på effektiv planlægning, professionelt udstyr og skånsom behandling af bilen.",
    shortSummary: [
      "Målrettet søgninger som miljøvenlig bilvask København, mobil bilvask og bilvask på adressen.",
      "Ruteplanlægning og mobil service kan spare kundens tid og reducere unødig kørsel til vaskehal.",
      "Servicen er relevant for både private og virksomheder.",
    ],
    keywords: [
      "miljøvenlig bilvask København",
      "mobil bilvask miljøvenlig",
      "skånsom bilvask København",
      "bilvask på adressen",
      "bilpleje København",
    ],
    serviceType: "Miljøvenlig bilvask i København",
    serviceArea: coreCopenhagenAreas,
    schemaAreaServed: ["København", "Copenhagen", "Storkøbenhavn", "Sjælland", "Denmark"],
    image: {
      src: "/service/udenfor.jpg",
      alt: "Miljøvenlig mobil bilvask i København hos CleanWash",
    },
    secondaryCta: {
      label: "Se mobil bilvask",
      href: "/mobil-bilvask-koebenhavn",
    },
    benefits: [
      { title: "Smart planlægning", text: "Mobil service kan mindske unødig tid og kørsel for kunden." },
      { title: "Skånsom metode", text: "Bilen behandles med fokus på lak, flader og ordentlig finish." },
      { title: "Lokale ruter", text: "Planlægning på tværs af København gør servicen mere praktisk." },
      { title: "Nem booking", text: "Adresse, bil og tidspunkt samles online, så opgaven bliver klar." },
    ],
    process: [
      { title: "Book online", text: "Vælg service og angiv hvor bilen holder." },
      { title: "Afklar område", text: "CleanWash planlægger efter område, rute og ledige tider." },
      { title: "Få bilen vasket", text: "Opgaven udføres med professionelt udstyr og skånsom behandling." },
      { title: "Spar tid", text: "Du undgår ekstra tur og ventetid i vaskehal." },
    ],
    sections: [
      {
        heading: "Miljøvenlig bilvask handler også om planlægning",
        paragraphs: [
          "Når kunder søger miljøvenlig bilvask København, leder de ofte efter en løsning, der både passer bedre til bilen, hverdagen og omgivelserne. CleanWash fokuserer på mobil planlægning, professionelt udstyr og skånsom bilpleje.",
          "Det vigtigste er at vælge en service, der passer til bilens behov. En relevant vask bruger tid og metode der, hvor bilen faktisk er beskidt.",
        ],
      },
      {
        heading: "Mobil service kan spare unødig kørsel",
        paragraphs: [
          "Bilvask på adressen kan være praktisk, fordi kunden slipper for at køre til vaskehal og vente. For virksomheder med flere biler kan planlægning også reducere intern koordinering.",
          "Den konkrete mulighed afhænger af adresse, adgang, rute og den valgte service, og derfor er bookingflowet den bedste start.",
        ],
      },
    ],
    faqs: [
      {
        question: "Er CleanWash en miljøvenlig bilvask?",
        answer:
          "CleanWash arbejder med mobil planlægning, professionelt udstyr og skånsomme metoder. Den konkrete service afhænger af valgt pakke.",
      },
      {
        question: "Tilbyder I vandfri bilvask?",
        answer:
          "Hvis du ønsker en bestemt metode, bør du beskrive det ved booking eller kontakte CleanWash, så mulighederne kan bekræftes.",
      },
      {
        question: "Hvorfor vælge mobil bilvask?",
        answer:
          "Mobil bilvask kan spare tid, fordi bilen kan rengøres på adressen eller efter aftale uden en separat tur i vaskehal.",
      },
      {
        question: "Dækker I København og Storkøbenhavn?",
        answer:
          "CleanWash er relevant for København og Storkøbenhavn. Den konkrete dækning afhænger af booking og rute.",
      },
    ],
    keywordGroups: [
      { title: "Miljø og metode", terms: ["miljøvenlig bilvask København", "skånsom bilvask", "mobil bilvask", "bilvask på adressen"] },
      { title: "Lokalt", terms: ["København", "Frederiksberg", "Amager", "Storkøbenhavn"] },
    ],
    relatedLinks: relatedLinksWithout("/miljoevenlig-bilvask-koebenhavn"),
    priority: 0.84,
  },
];

type GuideSeoTarget = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  heroIntro: string;
  keywords: string[];
  serviceType: string;
  image: SeoPageConfig["image"];
  secondaryCta: SeoPageConfig["secondaryCta"];
  sections: SeoPageConfig["sections"];
  faqs: SeoPageConfig["faqs"];
  priority?: number;
};

const guideSeoTargets: GuideSeoTarget[] = [
  {
    slug: "hvad-koster-bilvask-koebenhavn",
    title: "Hvad koster bilvask i København? | Prisguide",
    description:
      "Få en enkel prisguide til bilvask i København. Læs om udvendig vask, indvendig bilrengøring, komplet bilpleje og mobil bilvask på adressen.",
    h1: "Hvad koster bilvask i København?",
    eyebrow: "Prisguide",
    heroIntro:
      "Prisen på bilvask afhænger af biltype, stand, servicevalg og om bilen skal vaskes udvendigt, indvendigt eller komplet.",
    keywords: [
      "hvad koster bilvask i København",
      "bilvask pris København",
      "mobil bilvask pris",
      "indvendig bilrengøring pris",
      "komplet bilvask pris",
    ],
    serviceType: "Prisguide til bilvask i København",
    image: { src: "/service/helebil.jpg", alt: "Prisguide til bilvask i København hos CleanWash" },
    secondaryCta: { label: "Se bilvask priser", href: route("/bilvask-priser") },
    sections: [
      {
        heading: "Pris afhænger af hvor grundig vasken skal være",
        paragraphs: [
          "En udvendig bilvask er normalt billigere end komplet bilpleje, fordi den fokuserer på lak, ruder, spejle og fælge. Indvendig bilrengøring kræver mere arbejde i kabinen, især hvis der er sand, pletter, støv, lugt eller meget daglig brug.",
          "Derfor bør du sammenligne pris med indhold. En lav pris kan være fin til let snavs, men en bil der trænger indvendigt og udvendigt, får typisk mere værdi af en komplet løsning.",
        ],
      },
      {
        heading: "Mobil bilvask kan spare tid",
        paragraphs: [
          "Når du booker mobil bilvask, betaler du ikke kun for vasken. Du får også en løsning, der kan passe bedre ind i hverdagen, fordi du undgår kø, ventetid og ekstra transport til vaskehal.",
          "Bookingflowet er det bedste sted at se den mest relevante pris, fordi biltype, valgte tilvalg og adresse kan påvirke planlægningen.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvad koster mobil bilvask i København?",
        answer:
          "Prisen afhænger af service, biltype, bilens stand og eventuelle tilvalg. Du ser den mest præcise pris i bookingflowet.",
      },
      {
        question: "Er indvendig bilrengøring dyrere end udvendig vask?",
        answer:
          "Ofte ja, fordi indvendig rengøring kræver arbejde med kabine, måtter, paneler, sæder og bagagerum.",
      },
      {
        question: "Hvornår bør jeg vælge komplet bilvask?",
        answer:
          "Vælg komplet bilvask, hvis bilen både er beskidt udenpå og trænger til rengøring i kabinen.",
      },
    ],
    priority: 0.86,
  },
  {
    slug: "mobil-bilvask-vs-vaskehal",
    title: "Mobil bilvask vs vaskehal | Hvad skal du vælge?",
    description:
      "Sammenlign mobil bilvask og vaskehal. Se hvornår bilvask på adressen, håndvask og indvendig bilrengøring giver bedst mening.",
    h1: "Mobil bilvask vs vaskehal",
    eyebrow: "Sammenligning",
    heroIntro:
      "Mobil bilvask og vaskehal løser ikke altid samme behov. Det rigtige valg afhænger af tid, bilens stand og ønsket resultat.",
    keywords: [
      "mobil bilvask vs vaskehal",
      "bilvask på adressen",
      "mobil bilvask København",
      "håndvask bil København",
      "vaskehal eller håndvask",
    ],
    serviceType: "Guide til mobil bilvask og vaskehal",
    image: { src: "/service/udenfor.jpg", alt: "Mobil bilvask som alternativ til vaskehal" },
    secondaryCta: { label: "Book mobil bilvask", href: route("/mobil-bilvask-koebenhavn") },
    sections: [
      {
        heading: "Vaskehal er hurtig, mobil bilvask er fleksibel",
        paragraphs: [
          "En vaskehal kan være hurtig, hvis bilen kun trænger til en enkel standardvask. Mobil bilvask giver mere fleksibilitet, fordi service, adresse og tidspunkt kan planlægges omkring din hverdag.",
          "Hvis bilen også trænger indvendigt, giver mobil bilvask eller komplet bilpleje ofte bedre mening end en ren tur gennem vaskehallen.",
        ],
      },
      {
        heading: "Hvornår er mobil bilvask bedst?",
        paragraphs: [
          "Mobil bilvask er stærk, når du vil spare tid, har en travl kalender, har flere biler eller ønsker indvendig bilrengøring sammen med udvendig vask.",
          "For virksomheder med firmabiler kan mobil planlægning også reducere intern koordinering, fordi flere biler kan håndteres efter aftale.",
        ],
      },
    ],
    faqs: [
      {
        question: "Er mobil bilvask bedre end vaskehal?",
        answer:
          "Det afhænger af behovet. Mobil bilvask er ofte bedre, når tid, indvendig rengøring og fleksibel planlægning betyder meget.",
      },
      {
        question: "Er vaskehal billigere?",
        answer:
          "En standard vaskehal kan være billigere, men den løser ikke altid indvendig rengøring, fælge, detaljer og tidsbesparelse.",
      },
      {
        question: "Kan mobil bilvask foregå på arbejdspladsen?",
        answer:
          "Det kan være muligt efter adresse, adgang og ruteplanlægning. Angiv detaljer i bookingflowet.",
      },
    ],
    priority: 0.83,
  },
  {
    slug: "hvor-ofte-skal-man-vaske-bilen",
    title: "Hvor ofte skal man vaske bilen? | Guide til bilvask",
    description:
      "Læs hvor ofte bilen bør vaskes i Danmark. Få råd om vejsalt, pollen, bystøv, fælge, kabine og indvendig bilrengøring.",
    h1: "Hvor ofte skal man vaske bilen?",
    eyebrow: "Vedligeholdelse",
    heroIntro:
      "Hvor ofte bilen bør vaskes afhænger af årstid, kørsel, parkering, vejsalt og hvor meget bilen bruges i hverdagen.",
    keywords: [
      "hvor ofte skal man vaske bilen",
      "bilvask guide",
      "vaske bil om vinteren",
      "bilpleje København",
      "indvendig bilrengøring",
    ],
    serviceType: "Guide til bilvask og vedligeholdelse",
    image: { src: "/service/udenfor.jpg", alt: "Guide til hvor ofte bilen bør vaskes" },
    secondaryCta: { label: "Se udvendig vask", href: route("/udvendig-bilvask-koebenhavn") },
    sections: [
      {
        heading: "Vask oftere ved salt, pollen og bykørsel",
        paragraphs: [
          "I vintermånederne kan vejsalt og snavs sætte sig på lak, fælge og hjulnære områder. I forår og sommer kan pollen, støv og insekter også gøre bilen mat og beskidt.",
          "For mange hverdagsbiler giver regelmæssig udvendig vask mening, mens kabinen bør rengøres efter brug, børn, sport, arbejde og transportbehov.",
        ],
      },
      {
        heading: "Kabinen har sin egen rytme",
        paragraphs: [
          "Indvendig bilrengøring afhænger af brug. Familiebiler, pendlerbiler og firmabiler samler hurtigt sand, støv, krummer og mærker på kontaktflader.",
          "Hvis bilen skal sælges, afleveres efter leasing eller bruges til kunder, bør den rengøres mere grundigt.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvor ofte bør bilen vaskes om vinteren?",
        answer:
          "Ved vejsalt og meget snavs giver det mening at vaske bilen oftere, så lak, fælge og hjulnære områder holdes pænere.",
      },
      {
        question: "Hvor ofte bør kabinen rengøres?",
        answer:
          "Kabinen bør rengøres efter brugsmønster. Familier, pendlere og firmabiler har ofte brug for indvendig rengøring oftere.",
      },
      {
        question: "Er komplet bilvask nødvendigt hver gang?",
        answer:
          "Nej. Nogle gange er udvendig vask nok. Vælg komplet bilvask, når kabinen også trænger.",
      },
    ],
    priority: 0.8,
  },
  {
    slug: "indvendig-bilrengoering-foer-salg",
    title: "Indvendig bilrengøring før salg | Gør bilen mere præsentabel",
    description:
      "Læs hvorfor indvendig bilrengøring før salg kan hjælpe bilen med at fremstå mere velholdt. Book bilpleje i København hos CleanWash.",
    h1: "Indvendig bilrengøring før salg",
    eyebrow: "Klargøring",
    heroIntro:
      "En ren kabine kan gøre en stor forskel, når bilen skal fotograferes, fremvises eller afleveres til ny ejer.",
    keywords: [
      "indvendig bilrengøring før salg",
      "klargøring bil København",
      "bilpleje før salg",
      "sæderens bil København",
      "rengøring af kabine",
    ],
    serviceType: "Indvendig bilrengøring før salg",
    image: { src: "/service/inside.jpg", alt: "Indvendig bilrengøring før salg af bil" },
    secondaryCta: { label: "Se indvendig rengøring", href: route("/indvendig-bilrengoering-koebenhavn") },
    sections: [
      {
        heading: "Førsteindtryk starter i kabinen",
        paragraphs: [
          "Når en køber åbner døren, lægger de hurtigt mærke til sæder, gulve, måtter, ruder, rat og lugt. En ren kabine kan få bilen til at fremstå mere velholdt.",
          "Indvendig bilrengøring før salg er derfor en praktisk del af klargøring, især hvis bilen har været brugt dagligt af familie, pendler eller erhverv.",
        ],
      },
      {
        heading: "Kombiner med udvendig vask",
        paragraphs: [
          "Hvis bilen skal fotograferes eller fremvises, bør ydersiden også være ren. Komplet bilvask samler indvendig rengøring og udvendig finish i samme booking.",
          "Det giver et mere sammenhængende udtryk, når både kabine, ruder, fælge og lak ser ordentlige ud.",
        ],
      },
    ],
    faqs: [
      {
        question: "Er indvendig rengøring vigtigt før salg?",
        answer:
          "Ja. En ren kabine kan hjælpe bilen med at fremstå bedre ved billeder, fremvisning og prøvetur.",
      },
      {
        question: "Bør bilen også vaskes udvendigt?",
        answer:
          "Ja, ofte giver komplet bilvask bedst mening før salg, fordi både yderside og kabine påvirker førsteindtrykket.",
      },
      {
        question: "Kan sæderens være relevant?",
        answer:
          "Ja, hvis sæderne har pletter, lugt eller tydelig brug. Behovet afhænger af materiale og bilens stand.",
      },
    ],
    priority: 0.82,
  },
  {
    slug: "bilvask-paa-adressen",
    title: "Bilvask på adressen | Mobil bilvask hjemme eller på arbejde",
    description:
      "Book bilvask på adressen hos CleanWash. Mobil bilvask hjemme, på arbejdspladsen eller efter aftale i København og omegn.",
    h1: "Bilvask på adressen",
    eyebrow: "Mobil service",
    heroIntro:
      "Bilvask på adressen gør det lettere at få bilen rengjort uden at bruge ekstra tid på kø, transport og ventetid.",
    keywords: [
      "bilvask på adressen",
      "bilvask hjemme København",
      "mobil bilvask København",
      "bilvask på arbejdspladsen",
      "bilvask nær mig",
    ],
    serviceType: "Bilvask på adressen",
    image: { src: "/service/udenfor.jpg", alt: "Bilvask på adressen med mobil bilvask" },
    secondaryCta: { label: "Book mobil bilvask", href: route("/booking") },
    sections: [
      {
        heading: "Sådan fungerer bilvask på adressen",
        paragraphs: [
          "Du vælger service online, angiver biloplysninger, adresse og ønsket tidspunkt. CleanWash kan derefter planlægge opgaven efter rute, adgang og ledige tider.",
          "Bilvask på adressen kan være relevant hjemme, på arbejdspladsen eller et andet sted, hvor bilen holder lovligt og tilgængeligt.",
        ],
      },
      {
        heading: "Godt til travle bilejere og virksomheder",
        paragraphs: [
          "Mobil bilvask sparer især tid for kunder, der ikke vil planlægge dagen omkring en vaskehal. For virksomheder kan det også være en smartere måde at holde firmabiler præsentable.",
          "Den konkrete mulighed afhænger altid af område, adgangsforhold og booking.",
        ],
      },
    ],
    faqs: [
      {
        question: "Kan jeg få bilvask hjemme?",
        answer:
          "Ja, du kan angive hjemmeadresse i bookingflowet. Muligheden afhænger af område, adgang og rute.",
      },
      {
        question: "Kan bilen vaskes på arbejdspladsen?",
        answer:
          "Det kan være muligt, hvis adgangsforhold og planlægning passer. Angiv adressen ved booking.",
      },
      {
        question: "Hvilke områder dækker CleanWash?",
        answer:
          "CleanWash er relevant for København, Storkøbenhavn og dele af Sjælland afhængigt af booking og rute.",
      },
    ],
    priority: 0.86,
  },
  {
    slug: "bilvask-til-firmabiler-koebenhavn",
    title: "Bilvask til firmabiler København | Mobil erhvervsservice",
    description:
      "CleanWash tilbyder bilvask til firmabiler i København. Mobil bilvask, indvendig bilrengøring og faste aftaler til erhverv.",
    h1: "Bilvask til firmabiler København",
    eyebrow: "Erhvervsguide",
    heroIntro:
      "Firmabiler er en del af virksomhedens førsteindtryk. CleanWash hjælper med mobil bilvask og bilpleje til erhverv.",
    keywords: [
      "bilvask til firmabiler København",
      "erhverv bilvask København",
      "firmabil vask",
      "flåde bilvask",
      "mobil bilvask erhverv",
    ],
    serviceType: "Bilvask til firmabiler i København",
    image: { src: "/service/helebil.jpg", alt: "Bilvask til firmabiler og erhverv i København" },
    secondaryCta: { label: "Se erhverv bilvask", href: route("/erhverv-bilvask-koebenhavn") },
    sections: [
      {
        heading: "Renere firmabiler med mindre koordinering",
        paragraphs: [
          "Virksomheder bruger ofte unødig tid på at koordinere bilvask for sælgere, servicebiler, leasingbiler og flåder. Mobil bilvask kan samle opgaven og gøre den lettere at planlægge.",
          "CleanWash kan hjælpe med udvendig vask, indvendig bilrengøring og komplet bilpleje efter behov.",
        ],
      },
      {
        heading: "Relevant for flere brancher",
        paragraphs: [
          "Bilvask til firmabiler er relevant for salg, service, transport, taxa, ejendom, bilforhandlere og virksomheder med biler, der møder kunder.",
          "En fast aftale kan afklares efter antal biler, område, frekvens og adgangsforhold.",
        ],
      },
    ],
    faqs: [
      {
        question: "Kan CleanWash vaske flere firmabiler samme sted?",
        answer:
          "Det kan ofte være relevant. Muligheden afhænger af antal biler, adresse, adgang og ruteplanlægning.",
      },
      {
        question: "Tilbyder I faste erhvervsaftaler?",
        answer:
          "Ja, virksomheder kan kontakte CleanWash for at afklare fast aftale, serviceindhold og frekvens.",
      },
      {
        question: "Kan firmabiler få indvendig rengøring?",
        answer:
          "Ja, indvendig bilrengøring kan være relevant for firmabiler, leasingbiler og biler med kundekontakt.",
      },
    ],
    priority: 0.84,
  },
];

function makeGuideSeoPage(target: GuideSeoTarget): SeoPageConfig {
  return {
    slug: target.slug,
    title: target.title,
    description: target.description,
    h1: target.h1,
    eyebrow: target.eyebrow,
    heroIntro: target.heroIntro,
    shortSummary: [
      target.description,
      "Guiden er skrevet til kunder, der vil forstå mulighederne før de booker bilvask, bilrengøring eller bilpleje.",
      "Du kan gå direkte videre til booking, når du har valgt den løsning, der passer til bilen.",
    ],
    keywords: target.keywords,
    serviceType: target.serviceType,
    serviceArea: coreCopenhagenAreas,
    schemaAreaServed: ["København", "Copenhagen", "Storkøbenhavn", "Sjælland", "Denmark"],
    image: target.image,
    secondaryCta: target.secondaryCta,
    benefits: [
      {
        title: "Klar forklaring",
        text: "Guiden svarer på konkrete spørgsmål, som kunder ofte søger efter på Google og i AI-søgning.",
      },
      {
        title: "Praktisk valg",
        text: "Indholdet hjælper kunden med at vælge mellem udvendig vask, indvendig rengøring og komplet bilpleje.",
      },
      {
        title: "Lokal relevans",
        text: "Siden kobler svaret til København, Storkøbenhavn og nærliggende områder.",
      },
      {
        title: "Direkte booking",
        text: "Når behovet er afklaret, kan kunden gå direkte videre til online booking.",
      },
    ],
    process: [
      { title: "Læs guiden", text: "Få et kort svar på det spørgsmål, du søger efter." },
      { title: "Vælg service", text: "Find ud af om bilen skal vaskes udvendigt, indvendigt eller komplet." },
      { title: "Book online", text: "Angiv bil, adresse og ønsket tidspunkt i bookingflowet." },
      { title: "Få renere bil", text: "CleanWash planlægger opgaven ud fra din booking." },
    ],
    sections: target.sections,
    faqs: target.faqs,
    keywordGroups: [
      { title: "Guide-søgninger", terms: target.keywords },
      { title: "Relaterede services", terms: ["mobil bilvask", "indvendig bilrengøring", "udvendig bilvask", "komplet bilpleje"] },
      { title: "Lokale områder", terms: ["København", "Frederiksberg", "Amager", "Østerbro", "Nørrebro", "Valby"] },
    ],
    relatedLinks: [
      { label: "Bilvask København", href: route("/bilvask-koebenhavn") },
      { label: "Mobil bilvask København", href: route("/mobil-bilvask-koebenhavn") },
      { label: "Bilvask priser", href: route("/bilvask-priser") },
      { label: "Bilvask på adressen", href: route("/bilvask-paa-adressen") },
      { label: "Erhverv bilvask", href: route("/erhverv-bilvask-koebenhavn") },
      { label: "Book bilvask", href: route("/booking") },
    ],
    priority: target.priority ?? 0.8,
  };
}

const trustSeoPages: SeoPageConfig[] = [
  {
    slug: "kontakt",
    title: "Kontakt CleanWash | Book mobil bilvask i København",
    description:
      "Kontakt CleanWash for mobil bilvask i København og på Sjælland. Ring, skriv eller book online for bilvask på adressen, bilrengøring og bilpleje.",
    h1: "Kontakt CleanWash",
    eyebrow: "Kontakt og booking",
    heroIntro:
      "Har du spørgsmål om bilvask, serviceområder, priser eller erhvervsaftaler, kan du kontakte CleanWash eller booke direkte online.",
    shortSummary: [
      `Ring til CleanWash på ${siteConfig.phoneDisplay} eller skriv til ${siteConfig.email}.`,
      "Du kan booke mobil bilvask, indvendig bilrengøring, udvendig vask og komplet bilpleje online.",
      "CleanWash dækker København, Storkøbenhavn og relevante områder på Sjælland afhængigt af booking og rute.",
    ],
    keywords: [
      "kontakt bilvask København",
      "CleanWash kontakt",
      "book bilvask København",
      "mobil bilvask kontakt",
      "bilvask telefon København",
    ],
    serviceType: "Kontakt og booking af bilvask",
    serviceArea: coreCopenhagenAreas,
    schemaAreaServed: ["København", "Copenhagen", "Storkøbenhavn", "Sjælland", "Denmark"],
    image: { src: "/service/helebil.jpg", alt: "Kontakt CleanWash for bilvask i København" },
    secondaryCta: { label: "Book online", href: route("/booking") },
    benefits: [
      { title: "Telefon og e-mail", text: `Kontakt CleanWash på ${siteConfig.phoneDisplay} eller ${siteConfig.email}.` },
      { title: "Online booking", text: "Book bilvask direkte med bil, adresse, service og ønsket tidspunkt." },
      { title: "Klare svar", text: "Få afklaret serviceområde, adgangsforhold, pris og praktiske forhold før booking." },
      { title: "Private og erhverv", text: "Kontakt os om enkeltbiler, firmabiler og faste aftaler." },
    ],
    process: [
      { title: "Vælg kontaktvej", text: "Ring, skriv eller gå direkte til bookingflowet." },
      { title: "Fortæl om bilen", text: "Oplys biltype, adresse, ønsket service og eventuelle særlige behov." },
      { title: "Afklar mulighed", text: "CleanWash vurderer område, tid og rute ud fra oplysningerne." },
      { title: "Bekræft booking", text: "Når detaljerne passer, kan bookingen gennemføres online." },
    ],
    sections: [
      {
        heading: "Kontakt om mobil bilvask i København",
        paragraphs: [
          `CleanWash kan kontaktes på ${siteConfig.phoneDisplay} og ${siteConfig.email}. Du kan også starte direkte på booking-siden, hvis du allerede ved hvilken service bilen har brug for.`,
          "Kontakt-siden hjælper både kunder og søgemaskiner med at finde tydelige virksomhedsoplysninger, åbningstid, serviceområder og næste handling.",
        ],
      },
      {
        heading: "Hvad skal du oplyse?",
        paragraphs: [
          "Det hjælper at oplyse adresse, biltype, ønsket service, eventuelle pletter eller særlige behov og om bilen holder hjemme, på arbejde eller et andet sted.",
          "For erhverv er det også relevant at oplyse antal biler, område, ønsket frekvens og om bilerne holder samme sted.",
        ],
      },
    ],
    faqs: [
      { question: "Hvordan kontakter jeg CleanWash?", answer: `Ring på ${siteConfig.phoneDisplay}, skriv til ${siteConfig.email}, eller book direkte online.` },
      { question: "Kan jeg booke uden at ringe?", answer: "Ja. Du kan bruge bookingflowet til at vælge service, bil, adresse og tidspunkt." },
      { question: "Hvornår har CleanWash åbent?", answer: "CleanWash oplyser åbningstid alle ugens dage kl. 08-17." },
      { question: "Kan virksomheder kontakte jer om flere biler?", answer: "Ja. CleanWash kan kontaktes om firmabiler, leasingbiler og faste erhvervsaftaler." },
    ],
    keywordGroups: [
      { title: "Kontakt-søgninger", terms: ["CleanWash kontakt", "kontakt bilvask København", "book bilvask", "bilvask telefon"] },
      { title: "Serviceområder", terms: ["København", "Frederiksberg", "Amager", "Storkøbenhavn", "Sjælland"] },
    ],
    relatedLinks: [
      { label: "Book bilvask", href: route("/booking") },
      { label: "Bilvask priser", href: route("/bilvask-priser") },
      { label: "Serviceområder", href: route("/serviceomraader") },
      { label: "Erhverv bilvask", href: route("/erhverv-bilvask-koebenhavn") },
    ],
    proofPoints: [
      { title: "Tydelige kontaktoplysninger", text: "Telefon, e-mail, åbningstid og bookinglink er samlet ét sted." },
      { title: "Direkte handling", text: "Kunder kan gå direkte fra spørgsmål til booking uden ekstra friktion." },
      { title: "Lokal relevans", text: "Siden forklarer dækningsområde og praktiske oplysninger for København og omegn." },
    ],
    priority: 0.9,
  },
  {
    slug: "anmeldelser",
    title: "Anmeldelser af CleanWash | Kundetillid og bilvask-erfaringer",
    description:
      "Læs hvordan CleanWash arbejder med ægte anmeldelser, kundefeedback og kvalitetssikring for mobil bilvask i København og omegn.",
    h1: "Anmeldelser af CleanWash",
    eyebrow: "Kundetillid",
    heroIntro:
      "Ægte anmeldelser og kundefeedback er vigtige tillidssignaler. CleanWash bruger feedback til at forbedre bilvask, bilrengøring og service.",
    shortSummary: [
      "Denne side er lavet til ægte kundefeedback, ikke fabrikerede anmeldelser.",
      "Når CleanWash har godkendte kundeanmeldelser, bør de vises her med navn, service og område.",
      "Kunder kan dele feedback efter bilvask, så kvalitet og service kan forbedres løbende.",
    ],
    keywords: [
      "CleanWash anmeldelser",
      "bilvask anmeldelser København",
      "mobil bilvask anmeldelser",
      "kundefeedback bilvask",
      "bedste bilvask København",
    ],
    serviceType: "Anmeldelser og kundefeedback",
    serviceArea: coreCopenhagenAreas,
    schemaAreaServed: ["København", "Copenhagen", "Storkøbenhavn", "Sjælland", "Denmark"],
    image: { src: "/service/inside.jpg", alt: "Kundefeedback og anmeldelser af bilvask" },
    secondaryCta: { label: "Book bilvask", href: route("/booking") },
    benefits: [
      { title: "Ægte feedback", text: "Siden er for rigtige kundeoplevelser, ikke generiske eller opdigtede citater." },
      { title: "Lokal kontekst", text: "Gode anmeldelser bør nævne service og område, når kunden selv formulerer det." },
      { title: "Kvalitetssikring", text: "Feedback hjælper med at forbedre booking, kommunikation og resultat." },
      { title: "Tryg beslutning", text: "Nye kunder kan bedre forstå, hvad de kan forvente af CleanWash." },
    ],
    process: [
      { title: "Kunden booker", text: "Kunden vælger bilvask, område og tidspunkt." },
      { title: "Opgaven udføres", text: "CleanWash udfører den valgte bilvask eller bilrengøring." },
      { title: "Feedback indsamles", text: "Kunden kan dele feedback efter opgaven." },
      { title: "Forbedringer bruges", text: "CleanWash kan bruge feedback til at forbedre service og kvalitet." },
    ],
    sections: [
      {
        heading: "Hvorfor anmeldelser betyder noget",
        paragraphs: [
          "Anmeldelser hjælper nye kunder med at vurdere, om CleanWash er det rigtige valg til mobil bilvask, indvendig bilrengøring eller komplet bilpleje.",
          "For Google og AI-søgninger er ægte, gennemsigtig feedback et stærkere tillidssignal end en side fyldt med kunstige citater. Derfor bør denne side kun vise rigtige anmeldelser, når de er indsamlet og godkendt.",
        ],
      },
      {
        heading: "Sådan bør en god anmeldelse se ud",
        paragraphs: [
          "En nyttig anmeldelse fortæller hvilken service kunden fik, hvilket område bilen blev vasket i, og hvad der fungerede godt. Eksempler kan være mobil bilvask på Frederiksberg eller indvendig bilrengøring i København, hvis kunden selv skriver det.",
          "Når der kommer rigtige anmeldelser, kan de vises her sammen med service, område og dato. Review schema bør først tilføjes, når der findes ægte førstehåndsanmeldelser på siden.",
        ],
      },
    ],
    faqs: [
      { question: "Viser CleanWash falske anmeldelser?", answer: "Nej. Anmeldelser bør kun vises, når de kommer fra rigtige kunder og er indsamlet på en ordentlig måde." },
      { question: "Kan jeg give feedback efter bilvask?", answer: "Ja. Kunder kan kontakte CleanWash efter en opgave og dele ris, ros eller forslag." },
      { question: "Hvorfor er der ikke stjerner i schema endnu?", answer: "Review schema bør først bruges, når siden indeholder ægte førstehåndsanmeldelser og følger Googles retningslinjer." },
      { question: "Hvad er en god anmeldelse?", answer: "En god anmeldelse beskriver service, område og konkret oplevelse med bilvasken." },
    ],
    keywordGroups: [
      { title: "Anmeldelses-søgninger", terms: ["CleanWash anmeldelser", "bilvask anmeldelser København", "mobil bilvask erfaringer"] },
      { title: "Trust-signaler", terms: ["ægte kundeoplevelser", "feedback", "serviceområde", "bilvask kvalitet"] },
    ],
    relatedLinks: [
      { label: "Kontakt CleanWash", href: route("/kontakt") },
      { label: "Før og efter", href: route("/foer-efter") },
      { label: "Garanti og tryghed", href: route("/garanti") },
      { label: "Book bilvask", href: route("/booking") },
    ],
    proofPoints: [
      { title: "Ingen falske citater", text: "Siden forklarer processen og er klar til rigtige anmeldelser, når de findes." },
      { title: "Kvalitet gennem feedback", text: "Kundefeedback kan bruges til at forbedre service, booking og resultat." },
      { title: "Schema med omtanke", text: "Stjerner og review markup bør kun bruges, når data er ægte og egnet." },
    ],
    priority: 0.84,
  },
  {
    slug: "foer-efter",
    title: "Før og efter bilvask | Resultater og bilpleje hos CleanWash",
    description:
      "Se hvordan CleanWash arbejder med resultater, før/efter-billeder og serviceeksempler for udvendig bilvask, indvendig rengøring og komplet bilpleje.",
    h1: "Før og efter bilvask",
    eyebrow: "Resultater",
    heroIntro:
      "Før/efter-billeder og serviceeksempler hjælper kunder med at se forskellen mellem udvendig vask, indvendig rengøring og komplet bilpleje.",
    shortSummary: [
      "Denne side er lavet til resultater, serviceeksempler og før/efter-billeder fra bilvask.",
      "Når nye kundegodkendte billeder er klar, bør de vises med service, område og dato.",
      "Siden understøtter tillid ved at vise konkrete services frem for kun at beskrive dem.",
    ],
    keywords: [
      "før efter bilvask",
      "bilvask resultater",
      "indvendig bilrengøring før efter",
      "bilpleje København billeder",
      "mobil bilvask resultater",
    ],
    serviceType: "Før og efter resultater for bilvask",
    serviceArea: coreCopenhagenAreas,
    schemaAreaServed: ["København", "Copenhagen", "Storkøbenhavn", "Sjælland", "Denmark"],
    image: { src: "/service/helebil.jpg", alt: "Før og efter resultater for bilvask og bilpleje" },
    secondaryCta: { label: "Book komplet bilvask", href: route("/booking") },
    benefits: [
      { title: "Visuelt bevis", text: "Billeder gør det lettere at forstå forskellen mellem servicepakker." },
      { title: "Servicekontekst", text: "Hvert billede bør knyttes til service, område og bilens behov." },
      { title: "Bedre forventninger", text: "Kunder kan se, hvad udvendig, indvendig og komplet bilvask betyder." },
      { title: "Mere tillid", text: "Realistiske billeder er bedre end overdrevne løfter." },
    ],
    process: [
      { title: "Bilen vurderes", text: "Service vælges efter bilens stand og kundens behov." },
      { title: "Før-billede", text: "Ved godkendelse kan bilens udgangspunkt dokumenteres." },
      { title: "Service udføres", text: "CleanWash udfører den valgte bilvask eller rengøring." },
      { title: "Efter-billede", text: "Resultatet kan dokumenteres med kundens godkendelse." },
    ],
    sections: [
      {
        heading: "Før/efter skaber realistiske forventninger",
        paragraphs: [
          "Før/efter-billeder er stærke, fordi de viser den konkrete forskel en bilvask eller bilrengøring kan gøre. De bør dog være ægte og ikke overredigerede.",
          "CleanWash kan bruge denne side til at samle godkendte resultater fra udvendig bilvask, indvendig bilrengøring, komplet bilpleje og erhvervsopgaver.",
        ],
      },
      {
        heading: "Hvad bør vises på siden?",
        paragraphs: [
          "De bedste resultater viser service, område, bilens behov og dato. For eksempel indvendig bilrengøring i Valby eller udvendig bilvask på Amager, hvis det passer med den rigtige opgave.",
          "Det giver både kunder, Google og AI-søgninger konkrete tegn på erfaring og kvalitet.",
        ],
      },
    ],
    faqs: [
      { question: "Er billederne ægte?", answer: "Før/efter-billeder bør kun vises, når de kommer fra rigtige opgaver og kunden har godkendt brugen." },
      { question: "Hvilke resultater bør vises?", answer: "Udvendig vask, indvendig rengøring, komplet bilpleje, fælge, kabine og firmabiler er gode resultatområder." },
      { question: "Kan min bil blive vist?", answer: "Kun hvis du giver tilladelse til, at CleanWash må bruge billederne." },
      { question: "Kan jeg booke samme type service?", answer: "Ja. Brug bookingflowet og vælg den service, der matcher bilens behov." },
    ],
    keywordGroups: [
      { title: "Resultat-søgninger", terms: ["før efter bilvask", "bilvask resultater", "bilpleje billeder", "indvendig rengøring før efter"] },
      { title: "Services", terms: ["udvendig vask", "indvendig rengøring", "komplet bilpleje", "firmabiler"] },
    ],
    relatedLinks: [
      { label: "Anmeldelser", href: route("/anmeldelser") },
      { label: "Bilpleje København", href: route("/bilpleje-koebenhavn") },
      { label: "Indvendig rengøring", href: route("/indvendig-bilrengoering-koebenhavn") },
      { label: "Udvendig bilvask", href: route("/udvendig-bilvask-koebenhavn") },
    ],
    priority: 0.84,
  },
  {
    slug: "serviceomraader",
    title: "Serviceområder | Bilvask i København og omegn",
    description:
      "Se CleanWash serviceområder for mobil bilvask i København, Frederiksberg, Amager, Østerbro, Nørrebro, Valby, Hellerup, Gentofte og omegn.",
    h1: "Serviceområder",
    eyebrow: "København og omegn",
    heroIntro:
      "CleanWash tilbyder mobil bilvask og bilrengøring i København, Storkøbenhavn og udvalgte områder på Sjælland efter booking og rute.",
    shortSummary: [
      "Find de vigtigste områder for bilvask, mobil bilvask og bilrengøring.",
      "Siden linker videre til lokale by- og bydelsider for bedre navigation og lokal SEO.",
      "Den konkrete mulighed afhænger af adresse, adgangsforhold, ledige tider og rute.",
    ],
    keywords: [
      "bilvask serviceområder",
      "bilvask København områder",
      "mobil bilvask Storkøbenhavn",
      "bilvask Frederiksberg Amager Østerbro",
      "bilvask Sjælland områder",
    ],
    serviceType: "Serviceområder for mobil bilvask",
    serviceArea: coreCopenhagenAreas,
    schemaAreaServed: ["København", "Copenhagen", "Storkøbenhavn", "Sjælland", "Denmark"],
    image: { src: "/service/udenfor.jpg", alt: "Serviceområder for mobil bilvask i København" },
    secondaryCta: { label: "Book i dit område", href: route("/booking") },
    benefits: [
      { title: "Overblik", text: "Se de vigtigste bydele og omegnsbyer samlet ét sted." },
      { title: "Lokal navigation", text: "Siden linker videre til lokale landingssider for de vigtigste områder." },
      { title: "Realistisk dækning", text: "Dækning afhænger af booking, rute og adgangsforhold." },
      { title: "Bedre AI-forståelse", text: "En klar områdeside hjælper søgemaskiner med at forstå geografisk relevans." },
    ],
    process: [
      { title: "Find område", text: "Se om dit område ligger blandt de relevante serviceområder." },
      { title: "Læs lokal side", text: "Klik videre til en bydels- eller byside for mere kontekst." },
      { title: "Book online", text: "Angiv din adresse i bookingflowet." },
      { title: "Afklar rute", text: "CleanWash planlægger ud fra område og ledige tider." },
    ],
    sections: [
      {
        heading: "Bilvask i København og nærområder",
        paragraphs: [
          "CleanWash er relevant for København, Frederiksberg, Amager, Østerbro, Nørrebro, Vesterbro, Valby, Vanløse, Hellerup, Gentofte, Lyngby og flere nærliggende områder.",
          "Denne side fungerer som en samlet indgang til lokale søgninger. Den hjælper kunder med at finde en relevant side, og den hjælper søgemaskiner med at forstå, hvilke områder CleanWash arbejder omkring.",
        ],
      },
      {
        heading: "Områder kræver stadig booking-afklaring",
        paragraphs: [
          "Selvom et område nævnes, afhænger den konkrete mulighed af rute, tidspunkt, adgang og servicevalg. Derfor er bookingflowet den bedste måde at afklare en bestemt adresse.",
          "For erhverv og flere biler kan dækning og rute aftales mere konkret med CleanWash.",
        ],
      },
    ],
    faqs: [
      { question: "Dækker CleanWash hele København?", answer: "CleanWash er relevant for København og Storkøbenhavn, men den konkrete adresse afhænger af booking og rute." },
      { question: "Dækker I Frederiksberg og Amager?", answer: "Ja, Frederiksberg og Amager er blandt de vigtigste områder for CleanWash." },
      { question: "Kan jeg booke uden for listen?", answer: "Du kan forsøge at booke eller kontakte CleanWash, så adressen kan vurderes konkret." },
      { question: "Hvorfor lave lokale sider?", answer: "Lokale sider hjælper kunder med at finde relevant information om deres område og servicebehov." },
    ],
    keywordGroups: [
      { title: "Bydele", terms: ["Frederiksberg", "Amager", "Østerbro", "Nørrebro", "Vesterbro", "Valby", "Vanløse"] },
      { title: "Omegn", terms: ["Hellerup", "Gentofte", "Lyngby", "Søborg", "Rødovre", "Hvidovre", "Kastrup"] },
      { title: "Region", terms: ["København", "Storkøbenhavn", "Sjælland", "Copenhagen"] },
    ],
    relatedLinks: [
      { label: "Bilvask Frederiksberg", href: route("/bilvask-frederiksberg") },
      { label: "Bilvask Amager", href: route("/bilvask-amager") },
      { label: "Bilvask Østerbro", href: route("/bilvask-osterbro") },
      { label: "Bilvask Nørrebro", href: route("/bilvask-norrebro") },
      { label: "Bilvask Valby", href: route("/bilvask-valby") },
      { label: "Bilvask Sjælland", href: route("/bilvask-sjaelland") },
    ],
    priority: 0.9,
  },
  {
    slug: "garanti",
    title: "Garanti og tryghed | CleanWash bilvask",
    description:
      "Læs om tryghed, forventninger, betaling, aflysning, vejr og adgangsforhold ved mobil bilvask hos CleanWash.",
    h1: "Garanti og tryghed",
    eyebrow: "Klar forventning",
    heroIntro:
      "En god bilvask starter med klare forventninger. Her kan du læse om praktiske forhold, kvalitet og hvad du gør, hvis noget ikke lever op til aftalen.",
    shortSummary: [
      "Siden forklarer forventninger, adgang, betaling, vejr og kommunikation omkring mobil bilvask.",
      "Kunder bør kontakte CleanWash hurtigt, hvis noget ikke stemmer med den aftalte service.",
      "Klarhed før booking skaber bedre oplevelser for både kunde og team.",
    ],
    keywords: [
      "bilvask garanti",
      "CleanWash tryghed",
      "mobil bilvask aflysning",
      "bilvask betaling",
      "bilvask vejret",
    ],
    serviceType: "Garanti og tryghed ved bilvask",
    serviceArea: coreCopenhagenAreas,
    schemaAreaServed: ["København", "Copenhagen", "Storkøbenhavn", "Sjælland", "Denmark"],
    image: { src: "/service/helebil.jpg", alt: "Garanti og tryghed ved mobil bilvask" },
    secondaryCta: { label: "Kontakt os", href: route("/kontakt") },
    benefits: [
      { title: "Klar aftale", text: "Service, adresse, tidspunkt og bilens behov bør være tydeligt før opgaven." },
      { title: "Hurtig feedback", text: "Kontakt CleanWash hurtigt, hvis noget ikke svarer til aftalen." },
      { title: "Praktiske forhold", text: "Adgang, parkering, vejr og bilens stand kan påvirke opgaven." },
      { title: "Tryg booking", text: "Siden gør det lettere at vide, hvad du kan forvente." },
    ],
    process: [
      { title: "Book tydeligt", text: "Vælg service og oplys særlige behov i bookingflowet." },
      { title: "Sørg for adgang", text: "Bilen skal holde lovligt og være tilgængelig på aftalt adresse." },
      { title: "Opgaven udføres", text: "CleanWash udfører den aftalte service ud fra bilens stand." },
      { title: "Giv besked", text: "Kontakt CleanWash hurtigt, hvis der er noget, der skal afklares." },
    ],
    sections: [
      {
        heading: "Hvad betyder tryghed ved mobil bilvask?",
        paragraphs: [
          "Tryghed handler om, at kunden ved hvad der er booket, hvad der kan forventes, og hvordan eventuelle spørgsmål håndteres. Mobil bilvask afhænger af adresse, adgang, bilens stand og vejrforhold.",
          "CleanWash bør altid kontaktes hurtigt, hvis en kunde oplever, at noget ikke svarer til den aftalte service. Det giver mulighed for en konkret vurdering.",
        ],
      },
      {
        heading: "Vejr, adgang og parkering",
        paragraphs: [
          "Mobil bilvask kræver, at bilen holder lovligt og tilgængeligt. Dårligt vejr eller adgangsforhold kan påvirke planlægningen, og nogle opgaver kan kræve ny aftale.",
          "Hvis der er port, kælder, tidsbegrænset parkering eller særlige adgangsforhold, bør det oplyses ved booking.",
        ],
      },
    ],
    faqs: [
      { question: "Hvad gør jeg, hvis jeg ikke er tilfreds?", answer: "Kontakt CleanWash hurtigst muligt med bookingoplysninger og en konkret beskrivelse, så sagen kan vurderes." },
      { question: "Kan vejret påvirke bilvasken?", answer: "Ja. Kraftigt vejr kan påvirke mobil bilvask og ruteplanlægning." },
      { question: "Skal bilen holde et bestemt sted?", answer: "Bilen skal holde lovligt, sikkert og tilgængeligt på den aftalte adresse." },
      { question: "Hvordan fungerer betaling?", answer: "Betaling afhænger af den konkrete booking og den valgte løsning." },
    ],
    keywordGroups: [
      { title: "Tryghed", terms: ["bilvask garanti", "kundetilfredshed", "betaling", "aflysning", "vejr"] },
      { title: "Praktisk", terms: ["adgang", "parkering", "adresse", "booking", "servicevalg"] },
    ],
    relatedLinks: [
      { label: "Kontakt CleanWash", href: route("/kontakt") },
      { label: "Anmeldelser", href: route("/anmeldelser") },
      { label: "Bilvask priser", href: route("/bilvask-priser") },
      { label: "Book bilvask", href: route("/booking") },
    ],
    priority: 0.82,
  },
  {
    slug: "miljoe",
    title: "Miljø og ansvar | Mobil bilvask med omtanke",
    description:
      "Læs hvordan CleanWash arbejder med mobil bilvask, ruteplanlægning, skånsomme metoder og ansvarlig bilpleje i København og omegn.",
    h1: "Miljø og ansvar",
    eyebrow: "Bilvask med omtanke",
    heroIntro:
      "Miljø og ansvar handler om planlægning, metoder, realistiske løfter og at vælge den service, bilen faktisk har brug for.",
    shortSummary: [
      "Mobil bilvask kan spare kunden for unødig kørsel og ventetid.",
      "Ruteplanlægning, skånsomme metoder og klare servicevalg er centrale ansvarspunkter.",
      "Hvis du ønsker en bestemt metode eller produkt, bør det afklares ved booking.",
    ],
    keywords: [
      "miljøvenlig bilvask",
      "miljø bilvask København",
      "mobil bilvask miljø",
      "ansvarlig bilpleje",
      "skånsom bilvask København",
    ],
    serviceType: "Miljø og ansvar ved mobil bilvask",
    serviceArea: coreCopenhagenAreas,
    schemaAreaServed: ["København", "Copenhagen", "Storkøbenhavn", "Sjælland", "Denmark"],
    image: { src: "/service/udenfor.jpg", alt: "Miljø og ansvar ved mobil bilvask" },
    secondaryCta: { label: "Se miljøvenlig bilvask", href: route("/miljoevenlig-bilvask-koebenhavn") },
    benefits: [
      { title: "Ruteplanlægning", text: "Mobil service kan planlægges, så kunden undgår ekstra tur og ventetid." },
      { title: "Skånsom behandling", text: "Metoder og udstyr bør passe til bilens stand og overflader." },
      { title: "Ærlige løfter", text: "Siden forklarer ansvar uden at love mere end servicen kan dokumentere." },
      { title: "Service efter behov", text: "Den mest ansvarlige løsning er ofte den service, bilen faktisk har brug for." },
    ],
    process: [
      { title: "Vælg behov", text: "Find ud af om bilen skal vaskes udvendigt, indvendigt eller komplet." },
      { title: "Afklar metode", text: "Spørg CleanWash, hvis du ønsker en bestemt type produkter eller metode." },
      { title: "Planlæg rute", text: "Adresse og tidspunkt bruges til at planlægge opgaven." },
      { title: "Få bilen vasket", text: "Opgaven udføres med fokus på resultat og omtanke." },
    ],
    sections: [
      {
        heading: "Miljø handler om mere end ét ord",
        paragraphs: [
          "Mange søger efter miljøvenlig bilvask, men det vigtigste er at være konkret. Mobil bilvask kan reducere kundens ekstra kørsel, og ruteplanlægning kan gøre opgaver mere praktiske.",
          "CleanWash bør altid beskrive metoder og produkter ærligt. Hvis kunden ønsker en bestemt løsning, bør det afklares før booking.",
        ],
      },
      {
        heading: "Skånsom bilpleje og realistiske valg",
        paragraphs: [
          "En ansvarlig bilvask matcher bilens stand. Let snavs kræver ikke samme service som en bil med beskidt kabine, pletter eller meget vejsnavs.",
          "Ved at vælge korrekt service undgår kunden både for lidt og for meget behandling.",
        ],
      },
    ],
    faqs: [
      { question: "Er mobil bilvask miljøvenlig?", answer: "Mobil bilvask kan spare kunden for ekstra kørsel, men den konkrete miljøprofil afhænger af metode, produkter og planlægning." },
      { question: "Kan jeg spørge om produkter før booking?", answer: "Ja. Kontakt CleanWash, hvis du ønsker oplysninger om metode eller produkter." },
      { question: "Er skånsom bilvask bedre for lakken?", answer: "Skånsom metode og korrekt udstyr kan hjælpe med at behandle bilen mere nænsomt." },
      { question: "Hvordan vælger jeg ansvarligt?", answer: "Vælg den service, der matcher bilens reelle stand og behov." },
    ],
    keywordGroups: [
      { title: "Miljø", terms: ["miljøvenlig bilvask", "mobil bilvask miljø", "ansvarlig bilpleje", "skånsom bilvask"] },
      { title: "Planlægning", terms: ["ruteplanlægning", "bilvask på adressen", "København", "Storkøbenhavn"] },
    ],
    relatedLinks: [
      { label: "Miljøvenlig bilvask", href: route("/miljoevenlig-bilvask-koebenhavn") },
      { label: "Bilvask på adressen", href: route("/bilvask-paa-adressen") },
      { label: "Garanti og tryghed", href: route("/garanti") },
      { label: "Book bilvask", href: route("/booking") },
    ],
    priority: 0.82,
  },
  {
    slug: "erhverv/flaadeaftale",
    title: "Flådeaftale bilvask | Erhvervsaftale til firmabiler",
    description:
      "Få en flådeaftale til bilvask hos CleanWash. Mobil bilvask, indvendig rengøring og faste erhvervsaftaler til firmabiler i København.",
    h1: "Flådeaftale bilvask",
    eyebrow: "Erhverv og firmabiler",
    heroIntro:
      "CleanWash hjælper virksomheder med flådeaftaler, gentagne bilvaske og mobil bilpleje til firmabiler, leasingbiler og servicebiler.",
    shortSummary: [
      "Flådeaftaler er relevante for virksomheder med flere biler eller gentagne behov.",
      "Servicen kan omfatte udvendig vask, indvendig rengøring og komplet bilpleje.",
      "Aftalen bør afklares ud fra antal biler, område, frekvens, adgang og ønsket serviceniveau.",
    ],
    keywords: [
      "flådeaftale bilvask",
      "bilvask firmabiler København",
      "erhverv bilvask aftale",
      "mobil bilvask erhverv",
      "leasingbiler bilvask",
    ],
    serviceType: "Flådeaftale og erhverv bilvask",
    serviceArea: coreCopenhagenAreas,
    schemaAreaServed: ["København", "Copenhagen", "Storkøbenhavn", "Sjælland", "Denmark"],
    image: { src: "/service/helebil.jpg", alt: "Flådeaftale til bilvask og firmabiler i København" },
    secondaryCta: { label: "Kontakt om aftale", href: route("/kontakt") },
    benefits: [
      { title: "Flere biler", text: "Godt til virksomheder med flere firmabiler eller gentagne bilvaske." },
      { title: "Mindre administration", text: "Aftale og planlægning kan reducere intern koordinering." },
      { title: "Præsentabel flåde", text: "Rene biler giver et bedre signal over for kunder og medarbejdere." },
      { title: "Fleksibelt indhold", text: "Vælg udvendig vask, indvendig rengøring eller komplet bilpleje efter behov." },
    ],
    process: [
      { title: "Oplys antal biler", text: "Fortæl hvor mange biler aftalen skal dække." },
      { title: "Afklar område", text: "Angiv hvor bilerne holder og hvornår de er tilgængelige." },
      { title: "Vælg frekvens", text: "Aftal engangsopgave, fast interval eller efter behov." },
      { title: "Start aftalen", text: "CleanWash planlægger service og kommunikation ud fra aftalen." },
    ],
    sections: [
      {
        heading: "Flådeaftale til virksomheder i København",
        paragraphs: [
          "En flådeaftale gør bilvask lettere for virksomheder med flere biler. I stedet for at hver medarbejder selv koordinerer bilvask, kan service planlægges samlet.",
          "CleanWash kan hjælpe med firmabiler, leasingbiler, servicebiler, taxa, transport og bilforhandlere afhængigt af område og aftale.",
        ],
      },
      {
        heading: "Hvad skal en flådeaftale indeholde?",
        paragraphs: [
          "En god aftale beskriver antal biler, adresse, frekvens, serviceindhold, kontaktperson og praktiske adgangsforhold. Det giver færre misforståelser og bedre planlægning.",
          "For nogle virksomheder er udvendig vask nok. Andre har brug for indvendig bilrengøring eller komplet bilpleje, især hvis bilerne bruges i kundesammenhæng.",
        ],
      },
    ],
    faqs: [
      { question: "Hvem passer en flådeaftale til?", answer: "Virksomheder med flere biler, gentagne behov eller biler med kundekontakt kan have glæde af en flådeaftale." },
      { question: "Kan aftalen dække indvendig rengøring?", answer: "Ja. Aftalen kan omfatte udvendig vask, indvendig rengøring eller komplet bilpleje." },
      { question: "Kan bilerne vaskes samme sted?", answer: "Det kan ofte være praktisk, men afhænger af antal biler, adgang og tidsrum." },
      { question: "Hvordan starter vi?", answer: "Kontakt CleanWash med antal biler, område og ønsket service, så en aftale kan afklares." },
    ],
    keywordGroups: [
      { title: "B2B-søgninger", terms: ["flådeaftale bilvask", "erhverv bilvask", "firmabil vask", "mobil bilvask erhverv"] },
      { title: "Målgrupper", terms: ["firmabiler", "leasingbiler", "servicebiler", "taxa", "transport", "bilforhandlere"] },
    ],
    relatedLinks: [
      { label: "Erhverv bilvask", href: route("/erhverv-bilvask-koebenhavn") },
      { label: "Bilvask til firmabiler", href: route("/bilvask-til-firmabiler-koebenhavn") },
      { label: "Kontakt CleanWash", href: route("/kontakt") },
      { label: "Bilvask priser", href: route("/bilvask-priser") },
    ],
    priority: 0.86,
  },
];

const areaSeoTargets: AreaSeoTarget[] = [
  { slug: "bilvask-frederiksberg", name: "Frederiksberg", nearby: ["Vesterbro", "Valby", "Nørrebro", "Vanløse"], priority: 0.87 },
  { slug: "bilvask-amager", name: "Amager", nearby: ["Kastrup", "Tårnby", "Islands Brygge", "Christianshavn"], priority: 0.87 },
  { slug: "bilvask-osterbro", name: "Østerbro", nearby: ["Nordhavn", "Indre By", "Hellerup", "Nørrebro"], priority: 0.86 },
  { slug: "bilvask-norrebro", name: "Nørrebro", nearby: ["Østerbro", "Frederiksberg", "Indre By", "Vanløse"], priority: 0.86 },
  { slug: "bilvask-vesterbro", name: "Vesterbro", nearby: ["Frederiksberg", "Sydhavnen", "Indre By", "Valby"], priority: 0.85 },
  { slug: "bilvask-valby", name: "Valby", nearby: ["Frederiksberg", "Hvidovre", "Vanløse", "Sydhavnen"], priority: 0.85 },
  { slug: "bilvask-vanlose", name: "Vanløse", nearby: ["Frederiksberg", "Rødovre", "Valby", "Nørrebro"], priority: 0.84 },
  { slug: "bilvask-christianshavn", name: "Christianshavn", nearby: ["Amager", "Indre By", "Islands Brygge", "Holmen"], priority: 0.83 },
  { slug: "bilvask-sydhavnen", name: "Sydhavnen", nearby: ["Vesterbro", "Valby", "Islands Brygge", "Hvidovre"], priority: 0.83 },
  { slug: "bilvask-islands-brygge", name: "Islands Brygge", nearby: ["Amager", "Christianshavn", "Indre By", "Sydhavnen"], priority: 0.83 },
  { slug: "bilvask-nordhavn", name: "Nordhavn", nearby: ["Østerbro", "Hellerup", "Indre By", "København"], priority: 0.83 },
  { slug: "bilvask-hellerup", name: "Hellerup", nearby: ["Gentofte", "Østerbro", "Charlottenlund", "Nordhavn"], priority: 0.84 },
  { slug: "bilvask-gentofte", name: "Gentofte", nearby: ["Hellerup", "Charlottenlund", "Søborg", "Lyngby"], priority: 0.84 },
  { slug: "bilvask-charlottenlund", name: "Charlottenlund", nearby: ["Hellerup", "Gentofte", "Klampenborg", "Ordrup"], priority: 0.82 },
  { slug: "bilvask-soborg", name: "Søborg", nearby: ["Gladsaxe", "Gentofte", "Herlev", "Bagsværd"], priority: 0.82 },
  { slug: "bilvask-gladsaxe", name: "Gladsaxe", nearby: ["Søborg", "Bagsværd", "Herlev", "Lyngby"], priority: 0.82 },
  { slug: "bilvask-herlev", name: "Herlev", nearby: ["Gladsaxe", "Ballerup", "Rødovre", "Søborg"], priority: 0.82 },
  { slug: "bilvask-rodovre", name: "Rødovre", nearby: ["Vanløse", "Hvidovre", "Brøndby", "Glostrup"], priority: 0.82 },
  { slug: "bilvask-hvidovre", name: "Hvidovre", nearby: ["Valby", "Rødovre", "Brøndby", "Sydhavnen"], priority: 0.82 },
  { slug: "bilvask-brondby", name: "Brøndby", nearby: ["Hvidovre", "Glostrup", "Rødovre", "Ishøj"], priority: 0.8 },
  { slug: "bilvask-glostrup", name: "Glostrup", nearby: ["Brøndby", "Rødovre", "Albertslund", "Ballerup"], priority: 0.8 },
  { slug: "bilvask-tarnby", name: "Tårnby", nearby: ["Amager", "Kastrup", "Dragør", "Ørestad"], priority: 0.82 },
  { slug: "bilvask-kastrup", name: "Kastrup", nearby: ["Tårnby", "Amager", "Dragør", "Ørestad"], priority: 0.82 },
  { slug: "bilvask-dragor", name: "Dragør", nearby: ["Kastrup", "Tårnby", "Amager", "Store Magleby"], priority: 0.8 },
  { slug: "bilvask-lyngby", name: "Lyngby", nearby: ["Gentofte", "Bagsværd", "Søborg", "Virum"], priority: 0.83 },
  { slug: "bilvask-bagsvaerd", name: "Bagsværd", nearby: ["Lyngby", "Gladsaxe", "Søborg", "Herlev"], priority: 0.8 },
  { slug: "bilvask-ballerup", name: "Ballerup", nearby: ["Herlev", "Glostrup", "Albertslund", "Måløv"], priority: 0.8 },
  { slug: "bilvask-albertslund", name: "Albertslund", nearby: ["Glostrup", "Ballerup", "Brøndby", "Taastrup"], priority: 0.78 },
  { slug: "bilvask-ishoj", name: "Ishøj", nearby: ["Brøndby", "Greve", "Vallensbæk", "Hvidovre"], priority: 0.78 },
  { slug: "bilvask-greve", name: "Greve", nearby: ["Ishøj", "Hundige", "Solrød", "Køge"], priority: 0.76 },
  { slug: "bilvask-roskilde", name: "Roskilde", nearby: ["Trekroner", "Hedehusene", "Lejre", "Køge"], priority: 0.76 },
  { slug: "bilvask-koge", name: "Køge", nearby: ["Greve", "Solrød", "Herfølge", "Roskilde"], priority: 0.76 },
];

function makeAreaSeoPage(area: AreaSeoTarget): SeoPageConfig {
  const areaName = area.displayName ?? area.name;
  const neighboringAreas = area.nearby.join(", ");
  const areaHref = `/${area.slug}` as Route;

  return {
    slug: area.slug,
    title: `Bilvask ${areaName} | Mobil bilvask og bilrengøring`,
    description: `Book bilvask i ${areaName} hos CleanWash. Mobil bilvask, indvendig bilrengøring, udvendig vask og bilpleje nær ${neighboringAreas}.`,
    h1: `Bilvask ${areaName}`,
    eyebrow: `Mobil bilvask i ${areaName}`,
    heroIntro: `CleanWash tilbyder professionel bilvask i ${areaName} med online booking, mobil planlægning og service til både private og erhverv.`,
    shortSummary: [
      `Denne side målretter søgninger som bilvask ${areaName}, mobil bilvask ${areaName} og bilvask nær mig.`,
      `CleanWash kan hjælpe med udvendig bilvask, indvendig bilrengøring og komplet bilpleje i ${areaName} og nærliggende områder.`,
      `Områder tæt på ${areaName} inkluderer ${neighboringAreas}, afhængigt af booking, rute og ledige tider.`,
    ],
    keywords: [
      `bilvask ${areaName}`,
      `mobil bilvask ${areaName}`,
      `bilrengøring ${areaName}`,
      `bilpleje ${areaName}`,
      `indvendig bilrengøring ${areaName}`,
      `udvendig bilvask ${areaName}`,
      `bilvask hjemme ${areaName}`,
      "bilvask nær mig",
      "bilvask på adressen",
    ],
    serviceType: `Bilvask i ${areaName}`,
    serviceArea: [areaName, ...area.nearby, "København", "Storkøbenhavn"],
    schemaAreaServed: [areaName, ...area.nearby, "København", "Copenhagen", "Denmark"],
    image: {
      src: "/service/helebil.jpg",
      alt: `Mobil bilvask og bilrengøring i ${areaName}`,
    },
    secondaryCta: {
      label: "Se priser",
      href: route("/bilvask-priser"),
    },
    benefits: [
      {
        title: "Lokal søgning",
        text: `Siden matcher kunder, der søger bilvask, bilrengøring eller bilpleje i ${areaName}.`,
      },
      {
        title: "Mobil service",
        text: "Adresse, bil og tidspunkt kan oplyses online, så opgaven kan planlægges realistisk.",
      },
      {
        title: "Indvendig og udvendig",
        text: "Vælg udvendig vask, indvendig rengøring eller komplet bilpleje efter bilens stand.",
      },
      {
        title: "Private og erhverv",
        text: "Servicen er relevant for hverdagsbiler, firmabiler, leasingbiler og biler før salg.",
      },
    ],
    process: [
      { title: "Start online", text: `Vælg bilvask i ${areaName} og den service, bilen har brug for.` },
      { title: "Angiv adresse", text: "Oplys hvor bilen holder, så område, adgang og rute kan afklares." },
      { title: "Vælg tidspunkt", text: "Find en ledig tid, der passer med din hverdag og CleanWashs planlægning." },
      { title: "Få bilen rengjort", text: "Bilen vaskes eller rengøres efter den valgte pakke." },
    ],
    sections: [
      {
        heading: `Bilvask i ${areaName} uden unødig ventetid`,
        paragraphs: [
          `Når du søger efter bilvask ${areaName}, leder du sandsynligvis efter en løsning tæt på din hverdag. CleanWash gør det muligt at booke bilvask, bilrengøring og bilpleje online, så du kan vælge service ud fra bilens behov.`,
          `Siden er skrevet til lokale søgninger i ${areaName}, men den er også relevant for nærliggende områder som ${neighboringAreas}. Den konkrete mulighed afhænger af adresse, adgangsforhold, rute og ledige tider.`,
        ],
      },
      {
        heading: `Mobil bilvask og bilrengøring i ${areaName}`,
        paragraphs: [
          `Mobil bilvask ${areaName} er især relevant, hvis du vil undgå kø, ventetid og ekstra tur til vaskehal. Du kan booke udvendig bilvask, indvendig bilrengøring eller komplet bilpleje, alt efter om bilen mest er beskidt udenpå, indeni eller begge dele.`,
          "For familiebiler, pendlerbiler og firmabiler giver det ofte mening at vælge en komplet løsning. Den samler kabine, ruder, måtter, fælge og yderside i samme booking.",
        ],
      },
      {
        heading: `Populære søgninger omkring ${areaName}`,
        paragraphs: [
          `De vigtigste søgninger for området er bilvask ${areaName}, mobil bilvask ${areaName}, bilvask hjemme ${areaName}, indvendig bilrengøring ${areaName} og bilpleje ${areaName}.`,
          `CleanWash forbinder disse søgninger med konkrete services og nærliggende områder, så både kunder, Google og AI-søgninger lettere kan forstå, hvad siden handler om.`,
        ],
      },
    ],
    faqs: [
      {
        question: `Tilbyder CleanWash bilvask i ${areaName}?`,
        answer: `Ja. CleanWash tilbyder bilvask og bilrengøring, der er relevant for ${areaName}. Den konkrete mulighed afhænger af booking, rute og ledige tider.`,
      },
      {
        question: `Kan jeg få mobil bilvask i ${areaName}?`,
        answer:
          "Du kan angive adressen i bookingflowet. Mulighed for mobil service afhænger af adgang, parkering, område og planlægning.",
      },
      {
        question: `Hvilke services kan jeg booke i ${areaName}?`,
        answer:
          "Du kan vælge mellem udvendig bilvask, indvendig bilrengøring og komplet bilpleje afhængigt af bilens behov.",
      },
      {
        question: `Dækker I områder tæt på ${areaName}?`,
        answer: `Ja, nærliggende områder som ${neighboringAreas} kan være relevante afhængigt af rute og booking.`,
      },
      {
        question: `Hvordan booker jeg bilvask i ${areaName}?`,
        answer:
          "Gå til booking-siden, vælg service, udfyld biloplysninger og angiv ønsket tidspunkt og adresse.",
      },
    ],
    keywordGroups: [
      {
        title: "Primære søgninger",
        terms: [
          `bilvask ${areaName}`,
          `mobil bilvask ${areaName}`,
          `bilvask hjemme ${areaName}`,
          `bilrengøring ${areaName}`,
        ],
      },
      {
        title: "Services",
        terms: [
          `indvendig bilrengøring ${areaName}`,
          `udvendig bilvask ${areaName}`,
          `bilpleje ${areaName}`,
          "komplet bilvask",
        ],
      },
      {
        title: "Nærliggende områder",
        terms: area.nearby,
      },
      {
        title: "Stærke København-søgninger",
        terms: highIntentKeywords.slice(0, 6),
      },
    ],
    relatedLinks: [
      { label: "Bilvask København", href: route("/bilvask-koebenhavn") },
      { label: "Mobil bilvask København", href: route("/mobil-bilvask-koebenhavn") },
      { label: "Bilvask priser", href: route("/bilvask-priser") },
      { label: "Indvendig bilrengøring", href: route("/indvendig-bilrengoering-koebenhavn") },
      { label: "Udvendig bilvask", href: route("/udvendig-bilvask-koebenhavn") },
      { label: `Book bilvask ${areaName}`, href: areaHref },
    ],
    priority: area.priority ?? 0.8,
  };
}

seoPages.push(
  ...serviceSeoPages,
  ...guideSeoTargets.map(makeGuideSeoPage),
  ...trustSeoPages,
  ...areaSeoTargets.map(makeAreaSeoPage)
);

seoPages.forEach((page) => {
  page.proofPoints ??= defaultProofPoints;
  page.gallery ??= defaultSeoGallery;
});

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
