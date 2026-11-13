import { brandPage, type ContentPage } from "./types";

// Bilmærker: hvad der er værd at vide om rengøring af netop det mærke.
// CleanWash er uafhængig og ikke tilknyttet nogen af producenterne.
export const brands: ContentPage[] = [
  brandPage({
    slug: "bilvask-tesla",
    title: "Bilvask af Tesla – håndvask i stedet for børster",
    description:
      "Skånsom håndvask af Tesla Model 3, Model Y, S og X på din adresse. Vi tager hensyn til kameraer, glastag og lyse sæder. Vand og strøm medbringes.",
    h1: "Bilvask af Tesla",
    eyebrow: "Model 3 · Model Y · Model S · Model X",
    intro:
      "Tesla anbefaler selv at undgå vaskehaller med børster. Vi vasker din Tesla i hånden, dér hvor den holder – også mens du arbejder.",
    answer:
      "CleanWash vasker Tesla i hånden på din adresse med eget vand og strøm. Det passer til Teslas egen anbefaling om at undgå børstevask. Prisen følger bilens størrelseskategori, som bookingen fastlægger ud fra nummerpladen og totalvægten. Teslaer er tunge og ligger i de øverste kategorier – du ser prisen, før du bekræfter.",
    sections: [
      {
        h: "Det skal en Tesla-vask tage højde for",
        p: [
          "En Tesla er bygget anderledes end de fleste biler, og det mærkes, når den skal vaskes.",
        ],
        list: [
          "Kameraer i front, sideskærme, dørstolper og bag styrer Autopilot. Linserne skal være rene – og må ikke ridses.",
          "Rammeløse ruder sænker sig lidt, når døren åbnes. Dørene åbnes derfor roligt under rengøring.",
          "Glastaget er stort og viser kalkpletter. Det tørres af for sig.",
          "De forsænkede dørhåndtag og ladeporten skal ikke spules direkte.",
          "Den store skærm rengøres med en blød, ren mikrofiberklud.",
        ],
      },
      {
        h: "Hvide sæder og blå bukser",
        p: [
          "Har din Tesla det hvide interiør, kender du det: siddefladen på førersædet bliver langsomt blålig. Det er farve fra cowboybukser. Jo længere den sidder, jo sværere er den at få af.",
          "Vi renser kunstlæderet med et mildt middel under læderpleje. Gøres det et par gange om året, når farven ikke at sætte sig.",
        ],
      },
      {
        h: "Praktisk før vi kommer",
        p: [
          "Sæt gerne bilen i Car Wash Mode, hvis du er hjemme. Så lukker ruderne, ladeporten låses, og viskerne slås fra. Er Sentry Mode slået til, optager bilen os, mens vi arbejder – det er helt i orden.",
          "Lad ikke bilen lade under vasken. Skal vi gøre rent indvendigt, kan du give adgang via appen eller låse op, når vi ankommer.",
        ],
      },
    ],
    faqs: [
      {
        q: "Må en Tesla køres i vaskehal?",
        a: "Tesla anbefaler i instruktionsbogen berøringsfri vask, hvis man bruger en automatisk vaskehal, og fraråder børster. Håndvask er det skånsomme alternativ.",
      },
      {
        q: "Hvad koster bilvask af en Tesla Model 3 eller Model Y?",
        a: "Prisen følger bilens totalvægt, som bookingen slår op via nummerpladen. Over 2.000 kg er stor bil (699 kr. udvendigt, 999 kr. for hele bilen), og over 2.500 kg er den øverste kategori (899 kr. og 1.500 kr.). Teslaer ligger i en af de to.",
      },
      {
        q: "Kan I fjerne misfarvning på hvide Tesla-sæder?",
        a: "Ofte ja, især hvis den ikke har siddet længe. Vælg læderpleje som tilvalg.",
      },
      {
        q: "Skal jeg bruge Car Wash Mode?",
        a: "Det er en hjælp, men ikke et krav. Det vigtigste er, at ladeporten er lukket, og at bilen ikke lader.",
      },
      {
        q: "Er CleanWash tilknyttet Tesla?",
        a: "Nej. CleanWash er en uafhængig mobil bilvask.",
      },
    ],
    keywords: ["bilvask Tesla", "Tesla bilvask", "håndvask Tesla", "vask af Tesla Model Y", "Tesla Model 3 bilvask"],
    image: { src: "/service/helebil.jpg", alt: "Håndvask af elbil på kundens adresse" },
    related: [
      "/bilvask-elbil",
      "/bilvask-polestar",
      "/laederpleje-bil",
      "/haandvask-bil-koebenhavn",
      "/blog/rengoering-af-skaerm-og-pianolak",
      "/bilvask-med-voks",
    ],
    pkg: "whole",
  }),

  brandPage({
    slug: "bilvask-volkswagen",
    title: "Bilvask af Volkswagen – fra Up til ID.4",
    description:
      "Bilvask af VW Golf, Polo, Passat, Tiguan og ID-modeller på din adresse. Håndvask, fælge og indvendig rengøring. Vi har vand og strøm med.",
    h1: "Bilvask af Volkswagen",
    eyebrow: "Golf · Polo · Passat · Tiguan · ID",
    intro:
      "Volkswagen har i årtier været blandt de mest solgte biler i Danmark. Vi vasker dem alle – fra bybilen til den elektriske familie-SUV.",
    answer:
      "CleanWash vasker Volkswagen på din adresse med eget vand og strøm. Prisen afhænger af bilens størrelseskategori, som bookingen finder ud fra nummerpladen og totalvægten. Udvendig vask koster fra 450 kr. og hele bilen fra 799 kr.; de tunge ID-modeller ligger i de øverste kategorier.",
    sections: [
      {
        h: "Fælgene er det første, man ser",
        p: [
          "Mange Volkswagen-ejere oplever, at forfælgene bliver sorte hurtigt. Bremsestøvet er varmt, når det lander, og brænder sig fast. På lyse alufælge ses det efter få uger.",
          "Fælgene vaskes altid i en udvendig vask. Er de blevet brune i hjørnerne, er fælgrens til 149 kr. et godt tilvalg.",
        ],
      },
      {
        h: "ID-modellernes kabine",
        p: [
          "ID.3, ID.4 og ID.5 har en enkel kabine med store skærme, berøringsfølsomme felter og blanke, sorte flader. De ser flotte ud i udstillingen og viser hvert fingeraftryk i hverdagen.",
          "Blank plast ridser let. Den skal tørres af med en ren, blød mikrofiberklud – aldrig køkkenrulle. Lyse sæder og lyse dørbeklædninger har godt af regelmæssig rengøring, så snavs ikke sætter sig.",
        ],
      },
      {
        h: "Stofsæder, velour og læder",
        p: [
          "Volkswagen bruger mange forskellige sædematerialer: almindeligt stof, mikrofiber, der minder om ruskind, og læder. De skal behandles forskelligt. Stof kan få en sæderens. Mikrofiber skal renses forsigtigt uden at blive gennemblødt. Læder skal renses og plejes.",
          "Skriv gerne i bookingen, hvad din bil har, hvis du vil have sæderne renset.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster bilvask af en VW Golf?",
        a: "En Golf med benzin- eller dieselmotor ligger normalt i kategorien mellem bil: 600 kr. for udvendig vask, 700 kr. for indvendig rengøring og 899 kr. for hele bilen. Bookingen bekræfter kategorien ud fra nummerpladen.",
      },
      {
        q: "Hvorfor bliver fælgene på min Volkswagen så hurtigt sorte?",
        a: "Det er bremsestøv. Det brænder sig fast, mens det er varmt. Regelmæssig vask og fælgrens et par gange om året holder det nede.",
      },
      {
        q: "Hvordan rengøres de blanke flader i en ID.4?",
        a: "Med en ren, blød mikrofiberklud og et mildt middel. Grove klude og papir giver fine ridser.",
      },
      {
        q: "Vasker I også VW Transporter og Caddy?",
        a: "Ja. Er bilen registreret som varebil, hører den til kategorien varevogn.",
      },
      {
        q: "Er CleanWash et Volkswagen-værksted?",
        a: "Nej. Vi er en uafhængig mobil bilvask og udfører ikke service eller reparation.",
      },
    ],
    keywords: ["bilvask Volkswagen", "bilvask VW", "bilvask Golf", "bilvask ID.4", "VW bilvask"],
    image: { src: "/home/wash-tire.jpg", alt: "Vask af fælg på personbil" },
    related: [
      "/faelgrens",
      "/bilvask-skoda",
      "/bilvask-audi",
      "/bilvask-elbil",
      "/blog/rengoering-af-skaerm-og-pianolak",
      "/bilvask-priser",
    ],
    pkg: "outside",
  }),

  brandPage({
    slug: "bilvask-bmw",
    title: "Bilvask af BMW – pas på lakken og fælgene",
    description:
      "Håndvask af BMW på din adresse. Skånsom mod mørk lak, grundig ved fælge med bremsestøv. Voks inkluderet i Hele bilen. Vi har vand og strøm med.",
    h1: "Bilvask af BMW",
    eyebrow: "1-serie til X5 · i4 · iX",
    intro:
      "En BMW skal føles skarp – også at se på. Det kræver en vask, der passer på lakken og får styr på fælgene.",
    answer:
      "CleanWash vasker BMW i hånden på din adresse med eget vand og strøm. Håndvask med forvask beskytter mørk lak mod fine ridser, og fælgrens fjerner det bremsestøv, mange BMW'er er kendt for. Hele bilen med voks koster fra 899 kr. i kategorien mellem bil; prisen følger bilens totalvægt og vises i bookingen.",
    sections: [
      {
        h: "Mørk lak tilgiver ikke",
        p: [
          "Sort, mørkeblå og mørkegrå er klassiske BMW-farver. De er også de farver, der viser fine vaskeridser tydeligst. I solskin ligner de spindelvæv i lakken.",
          "Ridserne kommer fra børster og fra svampe, der trækker snavs hen over overfladen. Vi løsner snavset med skum først og vasker med rene vaskehandsker. Voks, som følger med i Hele bilen, giver dybde i farven og et beskyttende lag.",
        ],
      },
      {
        h: "Bremsestøv i mængder",
        p: [
          "Mange BMW-ejere genkender det: få dage efter en vask er forfælgene grå igen. Bremserne er kraftige og afgiver meget støv. På fælge med mange eger sætter det sig i hvert hjørne.",
          "Et par gange om året bør fælgene have en fælgrens, der opløser det, som er brændt fast. Ellers bliver de aldrig helt rene.",
        ],
      },
      {
        h: "Læder, kunstlæder og blanke lister",
        p: [
          "BMW bruger både ægte læder og kunstlæder. Begge dele bliver blanke af hudfedt og skal renses for at blive matte igen. Midterkonsollens blanke, sorte flader og skærmen tørres af med bløde klude.",
          "Har bilen rammeløse døre, som på coupé-modellerne, åbner vi dem roligt, så ruderne når at sænke sig.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvordan undgår jeg ridser i sort BMW-lak?",
        a: "Undgå børstevask, og vælg håndvask med forvask. Tør aldrig støv af med en tør klud.",
      },
      {
        q: "Hvad koster bilvask af en BMW 3-serie eller X3?",
        a: "Det afhænger af totalvægten. Op til 2.000 kg er mellem bil (899 kr. for hele bilen), op til 2.500 kg er stor bil (999 kr.). Tast nummerpladen i bookingen for at se, hvor din BMW ligger.",
      },
      {
        q: "Kan fælgene blive helt rene igen?",
        a: "Som regel ja med fælgrens. Har bremsestøvet siddet i årevis, kan det have sat mærker i fælgens lak.",
      },
      {
        q: "Tilbyder I læderpleje til BMW?",
        a: "Ja, som tilvalg til 399 kr.",
      },
      {
        q: "Er CleanWash tilknyttet BMW?",
        a: "Nej. Vi er en uafhængig mobil bilvask.",
      },
    ],
    keywords: ["bilvask BMW", "BMW bilvask", "håndvask BMW", "BMW fælge bremsestøv", "bilpleje BMW"],
    image: { src: "/home/dækshine.png", alt: "Ren alufælg og dæk efter fælgrens" },
    related: [
      "/faelgrens",
      "/bilvask-med-voks",
      "/laederpleje-bil",
      "/bilvask-audi",
      "/bilvask-mercedes",
      "/blog/saadan-holder-du-en-sort-bil-paen",
    ],
    pkg: "whole",
  }),

  brandPage({
    slug: "bilvask-audi",
    title: "Bilvask af Audi – ren grill, rene skærme",
    description:
      "Håndvask af Audi på din adresse: A3, A4, A6, Q3, Q5 og e-tron. Vi renser grill, fælge og alcantara skånsomt. Vand og strøm medbringes.",
    h1: "Bilvask af Audi",
    eyebrow: "A3 · A4 · A6 · Q3 · Q5 · e-tron",
    intro:
      "Audi er kendt for stramme linjer og kabiner i høj kvalitet. Begge dele ser bedst ud, når de er rene.",
    answer:
      "CleanWash vasker Audi i hånden på din adresse med eget vand og strøm. Vi rengør den store grill for insekter, vasker fælgene og tager hensyn til alcantara og blanke skærme i kabinen. Hele bilen med voks koster fra 899 kr.; den præcise pris følger bilens totalvægt og vises i bookingen.",
    sections: [
      {
        h: "Den store grill fanger alt",
        p: [
          "Audis brede grill er et gitter med hundredvis af små åbninger. Om sommeren sidder der insekter i hver eneste. De kan ikke vaskes af med én bevægelse – de skal blødes op og børstes forsigtigt ud.",
          "Bag grillen og i fronten sidder der på mange modeller radar og sensorer. De virker bedst, når fronten er ren.",
        ],
      },
      {
        h: "Alcantara kræver en let hånd",
        p: [
          "Mange Audier med sportsudstyr har alcantara på sæder, dørsider eller rat. Det er et mikrofibermateriale, der ligner ruskind. Det bliver fladt og blankt af hudfedt og tåler ikke at blive gennemblødt eller skrubbet hårdt.",
          "Fortæl os i bookingen, hvis bilen har alcantara, så vi renser det på den rigtige måde.",
        ],
      },
      {
        h: "Skærme og sort højglans",
        p: [
          "Nyere Audier har to eller tre store skærme og blanke, sorte paneler omkring dem. Fingeraftryk og støv ses med det samme. Vi tørrer dem af med rene, bløde mikrofiberklude, der ikke ridser.",
          "Har bilen sort optikpakke udvendigt, gælder det samme for de blanke lister og grillrammen: de viser fine ridser og har godt af håndvask.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvordan får I insekter ud af grillen?",
        a: "De blødes op og fjernes med en blød børste som en del af den udvendige vask.",
      },
      {
        q: "Kan alcantara-sæder renses?",
        a: "Ja, men forsigtigt og uden meget væske. Skriv det i bookingen, så tager vi hensyn til det.",
      },
      {
        q: "Hvad koster bilvask af en Audi A4 eller Q5?",
        a: "Det afhænger af bilens totalvægt. Hele bilen koster 899 kr. i kategorien mellem bil og 999 kr. i stor bil. Bookingen viser din Audis kategori, når nummerpladen er tastet.",
      },
      {
        q: "Vasker I Audi e-tron og Q4 e-tron?",
        a: "Ja. De er tunge og ligger i de øverste priskategorier. Bookingen viser den præcise pris ud fra nummerpladen.",
      },
      {
        q: "Er CleanWash tilknyttet Audi?",
        a: "Nej. Vi er en uafhængig mobil bilvask.",
      },
    ],
    keywords: ["bilvask Audi", "Audi bilvask", "håndvask Audi", "rens af alcantara Audi", "bilpleje Audi"],
    image: { src: "/service/udenfor.jpg", alt: "Udvendig håndvask af bil på kundens adresse" },
    related: [
      "/bilvask-bmw",
      "/bilvask-volkswagen",
      "/blog/rens-af-alcantara",
      "/blog/rengoering-af-skaerm-og-pianolak",
      "/faelgrens",
      "/komplet-bilvask",
    ],
    pkg: "whole",
  }),

  brandPage({
    slug: "bilvask-mercedes",
    title: "Bilvask af Mercedes-Benz – skånsom håndvask",
    description:
      "Håndvask af Mercedes-Benz på din adresse. Vi passer på blank midterkonsol, store skærme, træ og læder. Hele bilen med voks fra 899 kr.",
    h1: "Bilvask af Mercedes-Benz",
    eyebrow: "A-klasse til GLE · EQ-modeller",
    intro:
      "En Mercedes er lavet til at blive passet. Vi vasker den i hånden og behandler kabinens materialer, som de skal behandles.",
    answer:
      "CleanWash vasker Mercedes-Benz i hånden på din adresse med eget vand og strøm. Vi tager hensyn til blanke flader, store skærme, træindlæg og læder. Hele bilen med voks koster 899 kr. i kategorien mellem bil og 999 kr. i stor bil; bookingen finder kategorien ud fra nummerpladen.",
    sections: [
      {
        h: "Kabinen med de mange overflader",
        p: [
          "Ingen kabiner har flere forskellige materialer end en Mercedes. Det er dét, der gør dem flotte – og dét, der gør rengøringen til et håndværk.",
        ],
        list: [
          "Blank, sort midterkonsol: ridser, hvis den tørres af med en grov klud.",
          "Store skærme og glaspaneler: skal have en ren mikrofiberklud og ingen stærke midler.",
          "Træ med åbne porer: må ikke mættes med væske eller fedtede plejemidler.",
          "Læder og kunstlæder: skal renses, før det plejes.",
          "Ventilationsdyser i metal: samler støv mellem lamellerne.",
        ],
      },
      {
        h: "Stjernen i fronten",
        p: [
          "På nyere modeller er den store stjerne i grillen en flad plade. Bag den sidder radaren til fartpilot og nødbremse. Den skal være ren for at virke og må ikke ridses. Vi vasker den som resten af fronten: med skum og en blød vaskehandske.",
        ],
      },
      {
        h: "Fælge med mange eger",
        p: [
          "AMG-fælge og mange af de større fælge har tynde eger og dybe hjørner. Bremsestøvet sætter sig hurtigt. I en udvendig vask rengøres fælgene altid. Fælgrens er tilvalget, når støvet har brændt sig fast.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvordan rengøres den blanke midterkonsol uden ridser?",
        a: "Med en ren, blød mikrofiberklud og et mildt middel. Støv skal løftes af, ikke gnides rundt.",
      },
      {
        q: "Kan I pleje lædersæderne i min Mercedes?",
        a: "Ja. Læderpleje er et tilvalg til 399 kr., hvor sæderne både renses og plejes.",
      },
      {
        q: "Hvad koster bilvask af en C-klasse eller GLC?",
        a: "Det afhænger af totalvægten. Hele bilen koster 899 kr. i mellem bil og 999 kr. i stor bil; de tungeste udgaver ligger en kategori højere. Bookingen viser det.",
      },
      {
        q: "Vasker I Mercedes Vito og Sprinter?",
        a: "Ja. De hører til kategorien varevogn.",
      },
      {
        q: "Er CleanWash tilknyttet Mercedes-Benz?",
        a: "Nej. Vi er en uafhængig mobil bilvask.",
      },
    ],
    keywords: ["bilvask Mercedes", "Mercedes bilvask", "håndvask Mercedes", "bilpleje Mercedes-Benz", "læderpleje Mercedes"],
    image: { src: "/home/newseat.jpg", alt: "Rens af lædersæde i bilkabine" },
    related: [
      "/laederpleje-bil",
      "/vinylpleje-bil",
      "/bilvask-bmw",
      "/bilvask-audi",
      "/blog/rengoering-af-skaerm-og-pianolak",
      "/bilvask-med-voks",
    ],
    pkg: "whole",
  }),

  brandPage({
    slug: "bilvask-skoda",
    title: "Bilvask af Skoda – til familie og firmabil",
    description:
      "Bilvask af Skoda Octavia, Superb, Fabia, Kodiaq og Enyaq på din adresse. Vi rengør det store bagagerum og hele kabinen. Vand og strøm med.",
    h1: "Bilvask af Skoda",
    eyebrow: "Fabia · Octavia · Superb · Kodiaq · Enyaq",
    intro:
      "Skoda er bilen, der bliver brugt. Til børn, hunde, kunder og lange ture. Det kan ses indvendigt – og det gør vi noget ved.",
    answer:
      "CleanWash vasker Skoda på din adresse med eget vand og strøm. Indvendig rengøring omfatter hele kabinen og det store bagagerum og koster 700 kr. i kategorien mellem bil. Prisen følger bilens totalvægt og vises i bookingen.",
    sections: [
      {
        h: "Meget plads – meget at gøre rent",
        p: [
          "Octavia og Superb har nogle af klassens største bagagerum. Det er grunden til, at mange vælger dem. Det betyder også, at der er meget tæppe at støvsuge, og at bagagerummet ofte er der, hvor snavset samler sig: jord fra planter, sand fra stranden, hår fra hunden.",
          "Vi støvsuger bagagerummet helt ud i hjørnerne og under bunden, hvis den kan løftes.",
        ],
      },
      {
        h: "Små smarte detaljer skal også rengøres",
        p: [
          "Skoda er kendt for praktiske detaljer: affaldsspanden i dørlommen, paraplyen i døren og isskraberen i tankdækslet. De er geniale – og de bliver beskidte. Affaldsspanden tømmer og tørrer vi af. Dørlommer og kopholdere rengøres, så de ikke klistrer.",
        ],
      },
      {
        h: "Firmabiler, taxaer og Enyaq",
        p: [
          "Mange Skodaer kører som firmabil eller taxa og får mange kilometer. Rat, gearvælger og førersæde bliver hurtigt blanke af slid og snavs. En fast indvendig rengøring holder bilen præsentabel over for kunder og passagerer.",
          "Enyaq fås med sædebetræk i uld og genanvendte tekstiler. De er smukke og skal renses med milde midler. Skriv i bookingen, hvis din bil har dem, og du ønsker sæderens.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster indvendig rengøring af en Skoda Octavia?",
        a: "Det afhænger af udgaven. I kategorien mellem bil koster indvendig rengøring 700 kr., i stor bil 799 kr. Bookingen viser, hvor din Octavia ligger.",
      },
      {
        q: "Rengør I bagagerummet?",
        a: "Ja. Bagagerummet støvsuges som en fast del af den indvendige rengøring.",
      },
      {
        q: "Kan I fjerne hundehår fra bagagerummet?",
        a: "Ja, med tilvalget dyrehår til 200 kr.",
      },
      {
        q: "Vasker I Skoda-taxaer?",
        a: "Ja. Vi vasker taxaer og laver gerne en fast aftale.",
      },
      {
        q: "Er CleanWash tilknyttet Skoda?",
        a: "Nej. Vi er en uafhængig mobil bilvask.",
      },
    ],
    keywords: ["bilvask Skoda", "Skoda bilvask", "bilvask Octavia", "bilvask Enyaq", "rengøring Skoda"],
    image: { src: "/service/inside.jpg", alt: "Indvendig rengøring af bilkabine" },
    related: [
      "/bilrengoering",
      "/bilvask-familiebil",
      "/bilvask-taxa",
      "/bilvask-volkswagen",
      "/fjernelse-af-dyrehaar-bil",
      "/bilvask-priser",
    ],
    pkg: "inside",
  }),

  brandPage({
    slug: "bilvask-toyota",
    title: "Bilvask af Toyota – hybrid, Yaris og RAV4",
    description:
      "Bilvask af Toyota Yaris, Corolla, C-HR, RAV4 og Aygo X på din adresse. Vi holder plastkanter, kabine og hybridens luftindtag rene.",
    h1: "Bilvask af Toyota",
    eyebrow: "Aygo X · Yaris · Corolla · C-HR · RAV4",
    intro:
      "En Toyota holder længe. Så er det værd at sørge for, at den også ser godt ud længe.",
    answer:
      "CleanWash vasker Toyota på din adresse med eget vand og strøm. Udvendig vask koster fra 450 kr. og hele bilen fra 799 kr.; prisen følger bilens størrelseskategori. Vi rengør også området omkring hybridbatteriets luftindtag ved bagsædet.",
    sections: [
      {
        h: "Hybridens luftindtag ved bagsædet",
        p: [
          "Mange Toyota-hybrider har et lille gitter ved siden af eller under bagsædet. Det er luftindtaget, der køler hybridbatteriet. Det suger kabineluft ind – og dermed også støv og hår.",
          "Toyota anbefaler, at indtaget holdes fri og rent. Vi støvsuger omkring gitteret under den indvendige rengøring. Har du hund, er det ekstra vigtigt, fordi hår kan stoppe filteret til.",
        ],
      },
      {
        h: "Sort plast på skærmkanterne",
        p: [
          "C-HR, Yaris Cross og RAV4 har kanter af ufarvet, sort plast omkring hjulbuerne. Med årene bliver plasten grå og mat af sol og vaskemidler. Den samler også voksrester og bliver hvidplettet, hvis den ikke rengøres ordentligt.",
          "Vi vasker plastkanterne sammen med resten af bilen og passer på, at voks ikke sætter sig i dem.",
        ],
      },
      {
        h: "Mindre bremsestøv – men ikke ingen vask",
        p: [
          "Hybrider bremser ofte med elmotoren, og det giver renere fælge end på en almindelig benzinbil. Det er en fordel. Men lak, ruder og kabine bliver præcis lige så beskidte.",
          "Fordi mange beholder deres Toyota i ti år eller mere, er kabinen det sted, hvor regelmæssig rengøring gør størst forskel for både komfort og gensalgsværdi.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster bilvask af en Toyota Yaris?",
        a: "En Yaris ligger normalt i kategorien mellem bil: 600 kr. for udvendig vask og 899 kr. for hele bilen. Bookingen bekræfter kategorien ud fra nummerpladen.",
      },
      {
        q: "Hvad er gitteret ved bagsædet i min hybrid?",
        a: "Det er luftindtaget til hybridbatteriets køling. Det skal holdes frit for støv og hår.",
      },
      {
        q: "Kan grå plast på skærmkanterne blive sort igen?",
        a: "Rengøring hjælper meget. Meget falmet plast kan kræve et plejemiddel til udvendig plast.",
      },
      {
        q: "Er Aygo X en lille bil?",
        a: "Det afhænger af totalvægten. Grænsen går ved 1.300 kg, og bookingen viser kategorien.",
      },
      {
        q: "Er CleanWash tilknyttet Toyota?",
        a: "Nej. Vi er en uafhængig mobil bilvask.",
      },
    ],
    keywords: ["bilvask Toyota", "Toyota bilvask", "bilvask Yaris", "bilvask RAV4", "bilvask hybrid Toyota"],
    image: { src: "/service/helebil.jpg", alt: "Bilvask af personbil på kundens adresse" },
    related: [
      "/bilvask-elbil",
      "/bilrengoering",
      "/blog/falmet-plastik-paa-bilen",
      "/bilvask-kia",
      "/bilvask-hyundai",
      "/bilvask-priser",
    ],
    pkg: "outside",
  }),

  brandPage({
    slug: "bilvask-kia",
    title: "Bilvask af Kia – Picanto, Sportage og EV6",
    description:
      "Bilvask af Kia på din adresse: Picanto, Ceed, Niro, Sportage, EV6 og EV9. Skånsom rengøring af blanke flader og genbrugstekstiler.",
    h1: "Bilvask af Kia",
    eyebrow: "Picanto · Ceed · Niro · Sportage · EV6 · EV9",
    intro:
      "Kia spænder fra mikrobil til syvpersoners elbil. Vi vasker dem alle på din adresse.",
    answer:
      "CleanWash vasker Kia på din adresse med eget vand og strøm. Prisen følger bilens størrelseskategori – fra 450 kr. for udvendig vask af en lille bil. Bookingen finder kategorien ud fra nummerpladen og totalvægten, og de tunge elmodeller ligger øverst.",
    sections: [
      {
        h: "Elbilernes kabiner",
        p: [
          "EV6 og EV9 har kabiner med store, buede skærme, blanke paneler og sædebetræk, hvor der indgår genanvendte materialer. Det ser moderne ud og er rart at røre ved, men det kræver milde rengøringsmidler og bløde klude.",
          "Vi bruger ikke stærke opløsningsmidler på tekstiler og kunstlæder og tørrer skærme og højglans af for sig.",
        ],
      },
      {
        h: "Forsænkede håndtag og rene linjer",
        p: [
          "På EV6 ligger dørhåndtagene plant med døren. Bag dem samler der sig vand og snavs, som løber ud i en stribe ned ad døren efter vask. Vi tørrer efter omkring håndtag, spejle og lister, så bilen ikke får løbere.",
        ],
      },
      {
        h: "Fra bybil til familie-SUV",
        p: [
          "Picanto er en ægte bybil med korte ture og gadeparkering. Sportage og Sorento er familiebiler med store bagagerum. Niro er pendlernes valg. Behovene er forskellige, men metoden er den samme: forvask, håndvask, fælge, aftørring – og en kabine, der bliver støvsuget i bund.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster bilvask af en Kia Sportage?",
        a: "Det afhænger af motor og udgave. I mellem bil koster hele bilen 899 kr., i stor bil 999 kr. Bookingen viser din Sportages kategori.",
      },
      {
        q: "Hvad koster bilvask af en Kia Picanto?",
        a: "Picanto ligger tæt på grænsen mellem lille og mellem bil. Udvendig vask koster 450 eller 600 kr. – bookingen viser den rigtige kategori.",
      },
      {
        q: "Kan sæderne i EV6 tåle en sæderens?",
        a: "Tekstilsæder kan renses. Kunstlæder renses under læderpleje. Skriv i bookingen, hvilken type din bil har.",
      },
      {
        q: "Vasker I EV9 med syv sæder?",
        a: "Ja. EV9 er en meget tung bil og ligger i den øverste priskategori: 899 kr. for udvendig vask og 1.500 kr. for hele bilen.",
      },
      {
        q: "Er CleanWash tilknyttet Kia?",
        a: "Nej. Vi er en uafhængig mobil bilvask.",
      },
    ],
    keywords: ["bilvask Kia", "Kia bilvask", "bilvask EV6", "bilvask Sportage", "bilvask Picanto"],
    image: { src: "/service/udenfor.jpg", alt: "Udvendig bilvask med aftørring" },
    related: [
      "/bilvask-hyundai",
      "/bilvask-elbil",
      "/bilvask-lille-bil",
      "/bilvask-suv",
      "/blog/rengoering-af-skaerm-og-pianolak",
      "/bilvask-priser",
    ],
    pkg: "outside",
  }),

  brandPage({
    slug: "bilvask-hyundai",
    title: "Bilvask af Hyundai – i10, Kona og Ioniq 5",
    description:
      "Bilvask af Hyundai på din adresse: i10, i20, Kona, Tucson, Ioniq 5 og Ioniq 6. Vi holder bagruden, den lyse kabine og fælgene rene.",
    h1: "Bilvask af Hyundai",
    eyebrow: "i10 · i20 · Kona · Tucson · Ioniq",
    intro:
      "Hyundai har på få år fyldt de danske veje med elbiler i markant design. De fortjener at blive holdt rene.",
    answer:
      "CleanWash vasker Hyundai på din adresse med eget vand og strøm. Udvendig bilvask koster fra 450 kr. og hele bilen fra 799 kr. Prisen følger bilens totalvægt; Ioniq 5 og Ioniq 6 er tunge og ligger i de øverste kategorier.",
    sections: [
      {
        h: "Ioniq 5 og den beskidte bagrude",
        p: [
          "De første årgange af Ioniq 5 blev leveret uden visker på bagruden. Bilens kantede bagende suger vejsnavs til sig, og i regnvejr er bagruden hurtigt uigennemsigtig. Det er noget af det, ejerne oftest nævner.",
          "En ren bagrude holder sig ren længere, hvis den er vasket ordentligt og ikke har en fed film, som snavset kan sætte sig i. Vi pudser den ude og inde.",
        ],
      },
      {
        h: "Lys kabine med fladt gulv",
        p: [
          "Ioniq-modellerne har åbne kabiner med fladt gulv og ofte lyse farver. Det giver en dejlig rumfornemmelse. Lyse tæpper og lyst kunstlæder viser dog hurtigt jord fra sko og farve fra tøj.",
          "Vi støvsuger det flade gulv fra dør til dør og tørrer alle flader af. Læderpleje kan vælges til, hvis sæderne er blevet misfarvede.",
        ],
      },
      {
        h: "De små og de praktiske",
        p: [
          "i10 og i20 er bybiler. De får bremsestøv og gadesnavs og har godt af en udvendig vask en gang om måneden. Kona og Tucson er hverdagens arbejdsheste, hvor kabinen er det, der trænger mest. Vælg pakke efter, hvor bilen er beskidt.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster bilvask af en Ioniq 5?",
        a: "Ioniq 5 er tung. Afhængigt af udgaven ligger den i stor bil (699 kr. udvendigt, 999 kr. for hele bilen) eller i den øverste kategori (899 kr. og 1.500 kr.). Bookingen viser det ud fra nummerpladen.",
      },
      {
        q: "Hvorfor bliver bagruden på min Ioniq 5 så hurtigt beskidt?",
        a: "Den lodrette bagende danner et undertryk, som suger vejsnavs op. Uden bagrudevisker bliver det siddende.",
      },
      {
        q: "Hvad koster bilvask af en Hyundai i10?",
        a: "i10 ligger tæt på grænsen mellem lille og mellem bil. Udvendig vask koster 450 eller 600 kr. – bookingen viser den rigtige kategori.",
      },
      {
        q: "Kan lyse sæder blive rene igen?",
        a: "Som regel ja. Jo før de renses, jo bedre resultat.",
      },
      {
        q: "Er CleanWash tilknyttet Hyundai?",
        a: "Nej. Vi er en uafhængig mobil bilvask.",
      },
    ],
    keywords: ["bilvask Hyundai", "Hyundai bilvask", "bilvask Ioniq 5", "bilvask Kona", "bilvask i10"],
    image: { src: "/service/helebil.jpg", alt: "Mobil bilvask af elbil" },
    related: [
      "/bilvask-kia",
      "/bilvask-elbil",
      "/laederpleje-bil",
      "/blog/rene-bilruder-uden-striber",
      "/bilvask-lille-bil",
      "/bilvask-priser",
    ],
    pkg: "outside",
  }),

  brandPage({
    slug: "bilvask-volvo",
    title: "Bilvask af Volvo – lyse kabiner og hundehår",
    description:
      "Bilvask af Volvo XC40, XC60, XC90, V60 og V90 på din adresse. Vi renser lyst læder og uld og fjerner hundehår fra bagagerummet.",
    h1: "Bilvask af Volvo",
    eyebrow: "XC40 · XC60 · XC90 · V60 · V90 · EX30",
    intro:
      "Volvo er lyse, skandinaviske kabiner og plads til familie og hund. Begge dele kræver lidt ekstra, når bilen skal gøres ren.",
    answer:
      "CleanWash vasker Volvo på din adresse med eget vand og strøm. Volvoer er solide og tunge, så de fleste ligger i kategorien stor bil eller derover. Bookingen viser prisen ud fra nummerpladen. Læderpleje og fjernelse af dyrehår kan vælges til.",
    sections: [
      {
        h: "Lyst læder og uldblanding",
        p: [
          "Volvos lyse indtræk er en del af mærkets udtryk. De gør kabinen lys og rolig. De viser også alt: jord, kaffe og blå farve fra bukser.",
          "Lyst læder skal renses regelmæssigt, så misfarvning ikke når at trænge ned. Betræk med uld skal behandles mildt og må ikke gennemblødes. Fortæl os, hvad din bil har, når du booker.",
        ],
      },
      {
        h: "Stationcar og hund hører sammen",
        p: [
          "V60 og V90 er klassiske hundebiler. Bagagerummet er stort og fladt, og hunden har sin faste plads. Det betyder hår i tæppet, på siderne og i sprækkerne ved bagklappen.",
          "Med tilvalget dyrehår løsner og fjerner vi hårene fra bagagerum, sæder og måtter. Et bagagerumsbetræk gør det lettere at holde nede mellem rengøringerne.",
        ],
      },
      {
        h: "Store biler, stor overflade",
        p: [
          "XC60 og XC90 er høje og lange. Taget og bagklappen er de steder, der oftest bliver glemt, og hvor der gror alger, hvis bilen holder under træer. Vi vasker hele bilen i hånden – også de flader, du ikke selv kan se.",
          "XC90 har syv sæder. Den bagerste række støvsuges med, når vi gør rent indvendigt.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster bilvask af en Volvo XC60?",
        a: "Det afhænger af udgaven. I kategorien stor bil koster hele bilen 999 kr. Plug-in-hybriderne er tungere og kan ligge i den øverste kategori til 1.500 kr. Bookingen viser det ud fra nummerpladen.",
      },
      {
        q: "Kan I rense lyst Volvo-læder?",
        a: "Ja. Vælg læderpleje til 399 kr. som tilvalg.",
      },
      {
        q: "Hvordan får I hundehår ud af bagagerummet?",
        a: "Hårene løsnes mekanisk og støvsuges op. Tilvalget dyrehår koster 200 kr.",
      },
      {
        q: "Tåler uldbetræk at blive renset?",
        a: "Ja, med milde midler og lidt væske. Skriv det i bookingen, så vi tager hensyn til det.",
      },
      {
        q: "Er CleanWash tilknyttet Volvo?",
        a: "Nej. Vi er en uafhængig mobil bilvask.",
      },
    ],
    keywords: ["bilvask Volvo", "Volvo bilvask", "bilvask XC60", "bilvask XC90", "læderpleje Volvo"],
    image: { src: "/home/dyrhår.png", alt: "Hund i bil – fjernelse af hundehår" },
    related: [
      "/fjernelse-af-dyrehaar-bil",
      "/laederpleje-bil",
      "/bilvask-suv",
      "/bilvask-polestar",
      "/bilvask-familiebil",
      "/bilvask-priser",
    ],
    pkg: "whole",
  }),

  brandPage({
    slug: "bilvask-polestar",
    title: "Bilvask af Polestar – håndvask på adressen",
    description:
      "Håndvask af Polestar 2, 3 og 4 på din adresse. Vi tager hensyn til glastag, rammeløse spejle, kameraer og veganske betræk. Vand og strøm med.",
    h1: "Bilvask af Polestar",
    eyebrow: "Polestar 2 · Polestar 3 · Polestar 4",
    intro:
      "Polestar er design ned i detaljen. Den slags biler skal ikke en tur gennem børsterne – de skal vaskes i hånden.",
    answer:
      "CleanWash vasker Polestar i hånden på din adresse med eget vand og strøm. Vi tager hensyn til glastag, rammeløse spejle, kameraer og tekstilbetræk. Polestar-modellerne er tunge og ligger i de øverste priskategorier. Bookingen viser den præcise pris ud fra nummerpladen.",
    sections: [
      {
        h: "Detaljer, der kræver omtanke",
        p: [
          "Polestar har valgt løsninger, der ser enkle ud, men som skal behandles rigtigt.",
        ],
        list: [
          "Rammeløse sidespejle: spejlglasset går helt ud til kanten og skal tørres forsigtigt af.",
          "Panoramaglastag: en stor flade, hvor kalkpletter ses tydeligt.",
          "Veganske tekstilbetræk: renses med milde midler, ikke læderprodukter.",
          "Den stående skærm: tørres af med en ren mikrofiberklud.",
          "Kameraer og sensorer: holdes rene, så assistentsystemerne virker.",
        ],
      },
      {
        h: "Polestar 4 har ingen bagrude",
        p: [
          "På Polestar 4 er bagruden erstattet af et kamera, der sender billedet til bakspejlet. Bliver kameralinsen beskidt, forsvinder udsynet bagud. Den skal derfor holdes ren, og den må ikke ridses.",
          "Vi rengør linsen forsigtigt som en del af vasken.",
        ],
      },
      {
        h: "Mat og blank",
        p: [
          "Polestars farver er dæmpede og elegante. På de mørke nuancer ses vaskeridser tydeligt. Håndvask med forvask er den sikre vej, og voks giver dybde og beskyttelse.",
          "Har din bil folie eller en mat finish, så skriv det i bookingen. Mat lak må ikke vokses eller poleres på almindelig vis.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster bilvask af en Polestar 2?",
        a: "Polestar 2 er tung. Afhængigt af udgaven ligger den i stor bil (699 kr. udvendigt, 999 kr. for hele bilen) eller i den øverste kategori (899 kr. og 1.500 kr.). Bookingen viser det.",
      },
      {
        q: "Kan de veganske sæder renses?",
        a: "Ja, med milde midler, der passer til tekstil. Skriv i bookingen, hvis du ønsker sæderens.",
      },
      {
        q: "Hvordan holder I kameraet på Polestar 4 rent?",
        a: "Linsen rengøres forsigtigt med en blød klud, så den ikke bliver ridset.",
      },
      {
        q: "Må en Polestar få voks?",
        a: "Ja, hvis lakken er blank. Mat lak og folie skal ikke vokses.",
      },
      {
        q: "Er CleanWash tilknyttet Polestar?",
        a: "Nej. Vi er en uafhængig mobil bilvask.",
      },
    ],
    keywords: ["bilvask Polestar", "Polestar bilvask", "håndvask Polestar 2", "bilvask Polestar 4", "bilpleje Polestar"],
    image: { src: "/service/udenfor.jpg", alt: "Skånsom håndvask af elbil" },
    related: [
      "/bilvask-tesla",
      "/bilvask-volvo",
      "/bilvask-elbil",
      "/bilvask-med-voks",
      "/blog/vask-af-bil-med-mat-lak-eller-folie",
      "/haandvask-bil-koebenhavn",
    ],
    pkg: "whole",
  }),

  brandPage({
    slug: "bilvask-peugeot",
    title: "Bilvask af Peugeot – 208, 2008 og 3008",
    description:
      "Bilvask af Peugeot 208, e-208, 2008, 308 og 3008 på din adresse. Vi passer på blanke skærmkanter og den kompakte kabine. Vand og strøm med.",
    h1: "Bilvask af Peugeot",
    eyebrow: "208 · e-208 · 2008 · 308 · 3008",
    intro:
      "Peugeot 208 er en af de biler, man ser flest af i Danmark. Vi holder den – og dens større søskende – skarpe.",
    answer:
      "CleanWash vasker Peugeot på din adresse med eget vand og strøm. Udvendig bilvask koster fra 450 kr. og hele bilen fra 799 kr. Bookingen finder bilens størrelseskategori ud fra nummerpladen og totalvægten.",
    sections: [
      {
        h: "Blanke, sorte skærmkanter",
        p: [
          "Flere udstyrsvarianter af 2008 og 3008 har skærmkanter og lister i blank, sort plast. De ser eksklusive ud, men er bilens mest sårbare flade. De sidder lavt, får sand og grus fra hjulene og viser hver eneste ridse.",
          "De skal aldrig tørres af tørre. Vi skyller og skummer dem, før vi vasker, så sandet er væk, inden noget rører dem.",
        ],
      },
      {
        h: "En kabine med mange knapper og kanter",
        p: [
          "Peugeots førerplads er kompakt: lille rat, instrumenter højt oppe og en række blanke vippekontakter under skærmen. Det er flot og samler støv og fingeraftryk i alle kanter.",
          "Vi rengør mellem kontakterne og omkring skærmen med bløde børster og klude. Har bilen alcantara på sæder eller dørsider, renses det forsigtigt.",
        ],
      },
      {
        h: "Elbil eller benzin – samme vask",
        p: [
          "e-208 og e-2008 vaskes som deres benzinversioner. Vi bruger ikke din lader, og ladeporten skal blot være lukket. Elversionerne er tungere og kan ligge en kategori højere i pris. Det viser bookingen.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster bilvask af en Peugeot 208?",
        a: "En 208 ligger normalt i kategorien mellem bil: 600 kr. for udvendig vask og 899 kr. for hele bilen. Bookingen bekræfter kategorien ud fra nummerpladen.",
      },
      {
        q: "Hvordan undgår man ridser på de blanke skærmkanter?",
        a: "Ved at skylle sand og støv af, før de berøres, og kun bruge rene, bløde vaskehandsker.",
      },
      {
        q: "Er e-208 dyrere at få vasket end 208?",
        a: "Kun hvis totalvægten bringer den op i en højere kategori. Det ser du i bookingen.",
      },
      {
        q: "Vasker I Peugeot Partner og Expert?",
        a: "Ja. Varebiler hører til kategorien varevogn.",
      },
      {
        q: "Er CleanWash tilknyttet Peugeot?",
        a: "Nej. Vi er en uafhængig mobil bilvask.",
      },
    ],
    keywords: ["bilvask Peugeot", "Peugeot bilvask", "bilvask 208", "bilvask 3008", "bilvask e-208"],
    image: { src: "/service/helebil.jpg", alt: "Bilvask af personbil på adressen" },
    related: [
      "/bilvask-elbil",
      "/bilvask-volkswagen",
      "/bilvask-toyota",
      "/blog/rengoering-af-skaerm-og-pianolak",
      "/blog/rens-af-alcantara",
      "/bilvask-priser",
    ],
    pkg: "outside",
  }),
];
