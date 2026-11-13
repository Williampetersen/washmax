import { addOnPage, type ContentPage } from "./types";

// Tilvalg: hver side beskriver ét tilvalg fra bookingen med den aktuelle pris.
export const servicesAddOns: ContentPage[] = [
  addOnPage({
    slug: "saederens-bil",
    title: "Sæderens af bil – rens af bilsæder fra 300 kr.",
    description:
      "Professionel sæderens af bilsæder på din adresse. Vi fjerner indgroet snavs, skjolder og lugt fra op til fem sæder for 300 kr. som tilvalg.",
    h1: "Sæderens af bil",
    eyebrow: "Dybderens af bilsæder",
    intro:
      "Bilsæder ser rene ud længe efter, at de ikke er det. En sæderens trækker det op, som støvsugeren ikke kan nå.",
    answer:
      "CleanWash tilbyder sæderens af bilsæder som tilvalg til en bilvask. Rens af op til fem sæder koster 300 kr. og udføres på din adresse i samme besøg. Sæderensen fjerner indgroet snavs, skjolder og lugt fra tekstilsæder.",
    sections: [
      {
        h: "Hvorfor støvsugning ikke er nok",
        p: [
          "Et bilsæde er en svamp. Stoffet ligger oven på tykt skum, og alt, hvad der lander på sædet, bliver med tiden presset ned i det: sved, hudfedt, spildt kaffe, støv fra tøjet og fugt fra regnvåde jakker.",
          "Støvsugeren tager det løse snavs på overfladen. Det, der er trukket ned i fibrene, bliver siddende. Det er dét, der giver mørke skygger på siddefladen, en stiv fornemmelse i stoffet og en svag, sur lugt i varmt vejr.",
        ],
      },
      {
        h: "Sådan foregår en sæderens",
        p: [
          "Først støvsuges sæderne grundigt, så løst snavs ikke bliver til mudder. Derefter påføres et rensemiddel, som arbejdes ned i stoffet, så det løsner snavset fra fibrene. Til sidst trækkes væske og snavs op igen.",
          "Sæderne er let fugtige bagefter. De tørrer i løbet af nogle timer, hurtigst hvis bilen kan stå med vinduerne på klem eller køre en tur med varmen på.",
        ],
        list: [
          "Rens af op til fem sæder: 300 kr.",
          "Bookes sammen med indvendig rengøring eller Hele bilen",
          "Udføres på din adresse med vores eget udstyr",
        ],
      },
      {
        h: "Hvornår bør sæderne renses?",
        p: [
          "En gang om året er en god rytme for en hverdagsbil. Oftere, hvis du har børn, hund eller spiser i bilen. Og altid før et salg: rene sæder er noget af det første, en køber lægger mærke til.",
          "Har du købt en brugt bil, er en sæderens også en god start. Så sidder du i dit eget snavs fremover – ikke den forrige ejers.",
        ],
      },
      {
        h: "Hvad med læder og alcantara?",
        p: [
          "Sæderens er til tekstilsæder. Lædersæder skal renses og plejes med produkter til læder – det hedder læderpleje hos os. Alcantara og ruskindslignende stof kræver en mere forsigtig metode, så skriv det i bookingen, hvis bilen har det.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster sæderens af en bil?",
        a: "300 kr. for op til fem sæder som tilvalg til en indvendig rengøring eller Hele bilen.",
      },
      {
        q: "Hvor længe er sæderne våde efter en sæderens?",
        a: "De er let fugtige og tørrer i løbet af nogle timer. Udluftning eller en køretur med varme på får det til at gå hurtigere.",
      },
      {
        q: "Kan alle pletter fjernes?",
        a: "De fleste bliver fjernet eller dæmpet markant. Meget gamle pletter og farvestoffer, der har sat sig i fibrene, kan efterlade en svag skygge.",
      },
      {
        q: "Fjerner sæderens lugt?",
        a: "Ja, når lugten sidder i sæderne. Sidder den også i loft, tæpper eller ventilationsanlæg, kan lugtfjernelse og AC-rengøring vælges til.",
      },
      {
        q: "Kan jeg kun booke sæderens?",
        a: "Sæderens er et tilvalg og bookes sammen med en bilvask, typisk indvendig rengøring.",
      },
    ],
    keywords: ["sæderens bil", "rens af bilsæder", "dybderens bilsæder", "sæderens pris", "rens af sæder i bil"],
    image: { src: "/home/vaskseat.jpg", alt: "Sæderens af bilsæde med børste og rensemiddel" },
    related: [
      "/pletfjernelse-bilsaeder",
      "/laederpleje-bil",
      "/bilrengoering",
      "/lugtfjernelse-bil",
      "/indvendig-bilrengoering-pris",
      "/blog/pletguide-til-bilsaeder",
    ],
    pkg: "inside",
    addOn: "saederens",
  }),

  addOnPage({
    slug: "pletfjernelse-bilsaeder",
    title: "Fjern pletter fra bilsæder – pletfjernelse 250 kr.",
    description:
      "Kaffe, sodavand eller chokolade på bilsædet? Vi fjerner pletter fra bilsæder på din adresse. Pletfjernelse koster 250 kr. som tilvalg.",
    h1: "Pletfjernelse fra bilsæder",
    eyebrow: "Målrettet mod pletten",
    intro:
      "Én plet kan få en ellers pæn kabine til at se forsømt ud. Pletfjernelse går direkte efter den – uden at hele bilen skal renses.",
    answer:
      "CleanWash fjerner pletter fra bilsæder som tilvalg til en bilvask for 250 kr. Behandlingen er målrettet synlige pletter som kaffe, sodavand, mad og mudder. Friske pletter fjernes lettest; ældre pletter dæmpes som regel tydeligt.",
    sections: [
      {
        h: "Hvilke pletter kan fjernes?",
        p: [
          "Pletter falder groft sagt i tre grupper, og de opfører sig forskelligt.",
        ],
        list: [
          "Vandbaserede pletter – kaffe, te, sodavand, juice, mudder: de letteste. De fleste forsvinder helt.",
          "Fedtholdige pletter – mad, chokolade, creme, makeup: kræver et middel, der opløser fedt. Går som regel væk.",
          "Farvestoffer – kuglepen, rødvin, farvet slik, afsmitning fra tøj: de sværeste. Kan ofte dæmpes, ikke altid fjernes helt.",
        ],
      },
      {
        h: "Tiden er din værste fjende",
        p: [
          "En frisk plet ligger oven på fibrene. En gammel plet har bundet sig til dem. Varme fremskynder processen, så en plet i en bil, der står i solen, sætter sig hurtigere end en plet på en sofa.",
          "Det bedste, du selv kan gøre, er at duppe – ikke gnide – med en ren, tør klud med det samme. Gnider du, masser du pletten ned i stoffet og gør den større. Vent med rengøringsmidler, hvis du er i tvivl. Forkerte midler kan fiksere pletten.",
        ],
      },
      {
        h: "Pletfjernelse eller sæderens?",
        p: [
          "Har sædet en eller to tydelige pletter, er pletfjernelse det rigtige. Er hele sædet blevet mørkere, eller er der pletter mange steder, giver en sæderens et mere ensartet resultat. Renser man kun ét punkt på et generelt beskidt sæde, kan man ende med en ren plet i stedet.",
          "Er du i tvivl, så beskriv pletterne i bookingen. Så vurderer vi på stedet, hvad der giver det bedste resultat.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster det at få fjernet en plet fra et bilsæde?",
        a: "Pletfjernelse fra bilsæde koster 250 kr. som tilvalg til en bilvask.",
      },
      {
        q: "Kan gamle kaffepletter fjernes?",
        a: "Ofte ja, eller i hvert fald dæmpes så meget, at de ikke springer i øjnene. Jo ældre pletten er, jo sværere er den.",
      },
      {
        q: "Hvad skal jeg gøre, lige når uheldet sker?",
        a: "Dup med en ren, tør klud, og sug så meget op som muligt. Gnid ikke, og undgå varmt vand på pletter fra mælk, æg og blod.",
      },
      {
        q: "Kan I fjerne pletter fra lædersæder?",
        a: "Læder behandles under læderpleje, hvor sæderne renses med midler, der er beregnet til det.",
      },
      {
        q: "Hvad hvis pletten ikke går helt af?",
        a: "Så fortæller vi dig det ærligt. Nogle farvestoffer kan ikke fjernes fuldstændigt uden at skade stoffet.",
      },
    ],
    keywords: ["fjern pletter bilsæde", "pletfjernelse bil", "pletter på bilsæde", "kaffeplet bilsæde", "rens af plet i bil"],
    image: { src: "/home/seat.jpg", alt: "Tekstilsæde med pletter før pletfjernelse" },
    related: [
      "/saederens-bil",
      "/rengoering-efter-uheld-i-bilen",
      "/bilrengoering",
      "/laederpleje-bil",
      "/blog/pletguide-til-bilsaeder",
      "/blog/spildt-maelk-i-bilen",
    ],
    pkg: "inside",
    addOn: "pletfjernelse",
  }),

  addOnPage({
    slug: "laederpleje-bil",
    title: "Læderpleje af bilsæder – rens og pleje 399 kr.",
    description:
      "Læderpleje af bilens sæder på din adresse. Vi renser læderet skånsomt og plejer det, så det holder sig blødt og mat. 399 kr. som tilvalg.",
    h1: "Læderpleje af bilsæder",
    eyebrow: "Rens og pleje af læder",
    intro:
      "Lædersæder skal ikke skinne. Blankt læder er beskidt læder. Vi renser det tilbage til den matte overflade, det havde fra fabrikken.",
    answer:
      "CleanWash tilbyder læderpleje af bilsæder som tilvalg for 399 kr. Sæderne renses skånsomt for snavs og hudfedt og plejes derefter, så læderet holder sig smidigt. Behandlingen udføres på din adresse sammen med en indvendig rengøring.",
    sections: [
      {
        h: "Hvorfor bliver lædersæder blanke?",
        p: [
          "Nyt billæder er mat eller svagt silkemat. Det blanke, glatte udseende, mange forbinder med læder, er et lag af hudfedt, sved, creme og snavs, der er gnedet ind i overfladen. Det ses først på førersædets yderste vange, hvor du glider ind og ud.",
          "Laget er ikke kun et kosmetisk problem. Det er let surt og nedbryder med tiden den beskyttende overflade, så læderet bliver tørt og begynder at krakelere.",
        ],
      },
      {
        h: "Rens først – pleje bagefter",
        p: [
          "Den vigtigste del af læderpleje er rensen. Et plejemiddel oven på beskidt læder lukker snavset inde. Derfor renser vi først sæderne med et mildt middel til læder og en blød børste, der kommer ned i narven og sømmene.",
          "Når læderet er rent og tørt, får det et plejemiddel. Det holder overfladen smidig og gør den mere modstandsdygtig over for slid og afsmitning.",
        ],
      },
      {
        h: "Lyst læder og afsmitning fra tøj",
        p: [
          "Lyse sæder – hvide, beige og lysegrå – bliver med tiden blålige på siddefladen. Det er farve fra cowboybukser og mørkt tøj. Jo længere den sidder, jo dybere trænger den ned.",
          "Regelmæssig rens holder afsmitningen nede. Har du lyse sæder, er to til tre gange om året en god rytme.",
        ],
      },
      {
        h: "Kunstlæder og vegansk læder",
        p: [
          "Mange nyere biler har kunstlæder i stedet for ægte læder. Det skal også renses, men det har ikke brug for den samme pleje. Vi tilpasser behandlingen til materialet. Skriv gerne i bookingen, hvad du har, hvis du ved det.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster læderpleje af bilsæder?",
        a: "399 kr. som tilvalg til en indvendig rengøring eller Hele bilen.",
      },
      {
        q: "Hvor ofte skal lædersæder plejes?",
        a: "To gange om året passer til de fleste. Lyst læder og biler, der bruges meget, har godt af tre til fire gange.",
      },
      {
        q: "Bliver sæderne fedtede eller glatte bagefter?",
        a: "Nej. Rent og plejet læder er mat og tørt at røre ved. Bliver sæder blanke eller glatte, er der brugt for meget eller forkert produkt.",
      },
      {
        q: "Kan I fjerne blå farve fra cowboybukser på lyst læder?",
        a: "Ofte ja, hvis det ikke har siddet for længe. Meget gammel afsmitning kan være trængt så dybt ned, at den kun kan dæmpes.",
      },
      {
        q: "Kan revner i læderet repareres?",
        a: "Nej, læderpleje er rens og vedligehold. Egentlige skader kræver en lædersadelmager.",
      },
    ],
    keywords: ["læderpleje bil", "rens af lædersæder", "læderpleje bilsæder pris", "pleje af læder i bil", "læderrens bil"],
    image: { src: "/home/DeepSeat.jpg", alt: "Rens af lædersæde med børste ved læderpleje" },
    related: [
      "/saederens-bil",
      "/vinylpleje-bil",
      "/bilrengoering",
      "/blog/pleje-af-laedersaeder-i-bilen",
      "/blog/blankt-og-fedtet-rat",
      "/indvendig-bilrengoering-pris",
    ],
    pkg: "inside",
    addOn: "laederpleje",
  }),

  addOnPage({
    slug: "fjernelse-af-dyrehaar-bil",
    title: "Fjernelse af dyrehår i bil – hundehår væk 200 kr.",
    description:
      "Vi fjerner hundehår og kattehår fra sæder, måtter og bagagerum. Fjernelse af dyrehår koster 200 kr. som tilvalg til bilvask på din adresse.",
    h1: "Fjernelse af dyrehår i bilen",
    eyebrow: "Hundehår og kattehår",
    intro:
      "Hundehår sidder fast i biltæpper, som om det var vævet ind. Det kræver andet end en støvsuger at få det ud.",
    answer:
      "CleanWash fjerner dyrehår fra bilen som tilvalg til en bilvask for 200 kr. Hårene løsnes mekanisk fra sæder, måtter og bagagerum og støvsuges derefter op. Behandlingen udføres på din adresse sammen med den indvendige rengøring.",
    sections: [
      {
        h: "Hvorfor er hundehår så svære at få ud?",
        p: [
          "Korte, stive hår fra racer som labrador, mops og jack russell fungerer som små nåle. De borer sig ind i tæppets løkker og sædestoffets vævning og sætter sig på tværs. Sugekraft alene kan ikke trække dem ud.",
          "Lange, bløde hår fra for eksempel golden retriever og de fleste katte ligger mere løst, men til gengæld er der mange af dem, og de bliver statisk elektriske og klæber til alt.",
        ],
      },
      {
        h: "Sådan fjerner vi dem",
        p: [
          "Hårene skal først løsnes. Det sker med værktøj, der skaber friktion mod stoffet og river hårene fri, så de samler sig i totter. Derefter kan støvsugeren tage dem. Vi arbejder os systematisk gennem sæder, ryglæn, gulv, måtter og bagagerum.",
          "Det er tålmodighedsarbejde, og det er grunden til, at det er et tilvalg. En bil med meget hår kan tage væsentligt længere tid end en uden.",
        ],
      },
      {
        h: "Gode vaner mellem rengøringerne",
        p: [
          "Du kan ikke undgå hår, hvis hunden kører med. Men du kan gøre det lettere at holde nede.",
        ],
        list: [
          "Brug et hundetæppe eller et bagagerumsbetræk – glat stof holder mindre på håret",
          "Børst hunden, før den hopper ind, især i fældeperioden forår og efterår",
          "Gå over sæderne med en fugtig gummihandske en gang imellem",
          "Lad ikke håret ligge i månedsvis – det arbejder sig dybere ned",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster det at få fjernet hundehår fra bilen?",
        a: "200 kr. som tilvalg til en indvendig rengøring eller Hele bilen.",
      },
      {
        q: "Får I alle hår med?",
        a: "Vi får langt de fleste. I meget tætte tæpper kan enkelte hår sidde så dybt, at de ikke kan trækkes ud uden at skade stoffet.",
      },
      {
        q: "Fjerner I også lugten af hund?",
        a: "En grundig rengøring og fjernelse af hår tager meget af lugten. Sidder den i sæderne, hjælper en sæderens.",
      },
      {
        q: "Gælder tilvalget også bagagerummet?",
        a: "Ja. Sæder, måtter og bagagerum er omfattet.",
      },
      {
        q: "Er det godt for allergikere?",
        a: "Det hjælper. Mindre hår og skæl i kabinen betyder færre allergener, men en bil, der har haft dyr i, bliver sjældent helt fri for dem.",
      },
    ],
    keywords: ["fjern hundehår bil", "dyrehår i bil", "hundehår bilsæde", "rengøring bil hund", "fjernelse af dyrehår"],
    image: { src: "/home/dyrhår.png", alt: "Hund på passagersædet – fjernelse af dyrehår i bil" },
    related: [
      "/bilrengoering",
      "/saederens-bil",
      "/lugtfjernelse-bil",
      "/blog/fjern-hundehaar-og-kaeledyrslugt-fra-bilen",
      "/blog/allergi-og-bilens-kabine",
      "/indvendig-bilrengoering-pris",
    ],
    pkg: "inside",
    addOn: "dyrehaar",
  }),

  addOnPage({
    slug: "lugtfjernelse-bil",
    title: "Lugtfjernelse i bil – fjern røglugt for 300 kr.",
    description:
      "Lugter bilen af røg? Vi behandler kabinen mod røglugt på din adresse. Fjernelse af røglugt koster 300 kr. som tilvalg til en bilvask.",
    h1: "Lugtfjernelse i bilen",
    eyebrow: "Røglugt og dårlig lugt",
    intro:
      "En duftfrisker dækker lugten i en uge. Skal den væk, skal det, der lugter, væk. Det er forskellen på at maskere og at fjerne.",
    answer:
      "CleanWash tilbyder fjernelse af røglugt i biler som tilvalg til en bilvask for 300 kr. Behandlingen neutraliserer lugten i kabinen og kombineres med en indvendig rengøring. Ved kraftig lugt anbefales også sæderens, rens af loft og AC-rengøring.",
    sections: [
      {
        h: "Hvor sidder lugten?",
        p: [
          "Lugt er ikke luft. Det er partikler, der har sat sig på overflader og bliver ved med at afgive duftstoffer. Tobaksrøg er særligt slem, fordi den indeholder tjære og nikotin, som lægger sig som en klæbrig, gullig film.",
          "Filmen sætter sig overalt, men især fire steder: i loftsbeklædningen, hvor røgen stiger op, i sæder og tæpper, på indersiden af ruderne og i ventilationsanlægget, som har suget røgen rundt.",
        ],
      },
      {
        h: "Sådan går vi til den",
        p: [
          "Lugtfjernelse virker kun oven på en grundig rengøring. Derfor udføres den altid sammen med en indvendig rengøring, hvor flader tørres af, og tekstiler støvsuges. Selve behandlingen neutraliserer de lugtstoffer, der sidder tilbage.",
          "I en bil, der kun lugter let, er det nok. I en bil, der er blevet røget i dagligt i årevis, skal kilderne tages én for én.",
        ],
        list: [
          "Fjernelse af røglugt: 300 kr.",
          "Sæderens, op til fem sæder: 300 kr.",
          "Rens af loftsbeklædning: 300 kr.",
          "AC-rengøring: 300 kr.",
        ],
      },
      {
        h: "Ærlige forventninger",
        p: [
          "Let til moderat røglugt kan fjernes. Meget kraftig, mangeårig røglugt kan altid forbedres markant, men den kan dukke svagt op igen på varme dage, fordi skummet i sæder og isoleringen bag panelerne har suget lugt til sig. I de tilfælde kan en gentagelse efter nogle uger være nødvendig.",
          "Vi fortæller dig, hvad vi vurderer, når vi har set bilen.",
        ],
      },
      {
        h: "Andre lugte end røg",
        p: [
          "Dårlig lugt kan også komme fra fugt, spildt mælk, mad, kæledyr eller airconditionanlægget. Hver lugt har sin egen kilde, og den skal findes først. Beskriv lugten i bookingen – hvornår den kommer, og hvor den er stærkest – så kan vi anbefale den rigtige kombination.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster det at få fjernet røglugt fra en bil?",
        a: "300 kr. som tilvalg til en indvendig rengøring. Ved kraftig lugt anbefaler vi også sæderens, loftrens og AC-rengøring.",
      },
      {
        q: "Kan røglugt fjernes helt?",
        a: "Let til moderat lugt som regel ja. Meget kraftig lugt efter mange års rygning kan forbedres markant, men kan kræve flere behandlinger.",
      },
      {
        q: "Hvorfor virker duftfriskere ikke?",
        a: "Fordi de kun lægger en ny duft oven på den gamle. Kilden sidder stadig i tekstiler og ventilationsanlæg.",
      },
      {
        q: "Jeg har købt en brugt bil, der lugter af røg. Hvad anbefaler I?",
        a: "Hele bilen eller indvendig rengøring med lugtfjernelse, sæderens og AC-rengøring. Det tager de steder, hvor røgen sætter sig.",
      },
      {
        q: "Hvor længe skal bilen stå bagefter?",
        a: "Den kan bruges med det samme, men luft gerne ud. Har sæderne fået en rens, er de let fugtige i nogle timer.",
      },
    ],
    keywords: ["fjern røglugt bil", "lugtfjernelse bil", "røglugt i bil", "dårlig lugt i bil", "lugtsanering bil"],
    image: { src: "/home/cigarret.jpg", alt: "Rygning i bil – årsag til røglugt i kabinen" },
    related: [
      "/aircondition-rens-bil",
      "/saederens-bil",
      "/bilrengoering",
      "/blog/fjern-rygelugt-og-muffen-lugt-fra-bilen",
      "/blog/duftfrisker-eller-lugtfjernelse",
      "/blog/lugt-fra-aircondition",
    ],
    pkg: "inside",
    addOn: "roeglugt",
  }),

  addOnPage({
    slug: "aircondition-rens-bil",
    title: "Aircondition rens til bil – AC-rengøring 300 kr.",
    description:
      "Lugter det surt, når du tænder for airconditionen? AC-rengøring fjerner lugten og giver friskere luft i kabinen. 300 kr. som tilvalg.",
    h1: "Aircondition rens til bilen",
    eyebrow: "AC-rengøring",
    intro:
      "Den sure lugt, når blæseren starter, kommer inde fra anlægget. En AC-rengøring går efter kilden – ikke kun symptomet.",
    answer:
      "CleanWash tilbyder AC-rengøring som tilvalg til en bilvask for 300 kr. Behandlingen renser bilens ventilations- og airconditionsystem for det, der giver dårlig lugt, og giver friskere luft i kabinen. Det er en rengøring – ikke påfyldning af kølemiddel.",
    sections: [
      {
        h: "Hvorfor lugter airconditionen?",
        p: [
          "Når airconditionen køler luften, dannes der kondensvand på en kold flade dybt inde i instrumentbrættet. Den hedder fordamperen. Den er mørk, fugtig og fuld af støv og pollen, der er suget ind udefra.",
          "Det er perfekte forhold for bakterier og skimmel. Lugten beskrives typisk som sur, muggen eller som en våd karklud, og den er stærkest de første sekunder, efter at anlægget tændes.",
        ],
      },
      {
        h: "Rens er ikke det samme som service",
        p: [
          "Der er to forskellige ting, som begge kaldes aircondition-noget, og de bliver ofte forvekslet.",
        ],
        list: [
          "AC-rengøring: Renser kanaler og fordamper for det, der lugter. Det er dét, vi tilbyder.",
          "AC-service: Tjek og påfyldning af kølemiddel, når anlægget ikke køler nok. Det udføres af et værksted.",
        ],
      },
      {
        h: "Køler anlægget dårligt, eller lugter det?",
        p: [
          "Lugter det, men køler fint, er en rengøring svaret. Køler det dårligt, skal du på værksted – en rengøring ændrer ikke på køleevnen. Gør det begge dele, har du brug for begge dele.",
          "Kabinefilteret spiller også ind. Et gammelt filter er selv en lugtkilde. Det skiftes typisk ved service, og det er billigt. Spørg dit værksted, hvornår det sidst blev gjort.",
        ],
      },
      {
        h: "Sådan undgår du, at lugten kommer igen",
        p: [
          "Sluk for airconditionen et par minutter, før du er fremme, men lad blæseren køre. Så tørrer fordamperen, inden bilen parkeres. Brug anlægget jævnligt, også om vinteren – det holder det i gang og affugter kabinen. Og brug ikke kun recirkulation; anlægget har brug for frisk luft.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster aircondition rens af en bil?",
        a: "AC-rengøring koster 300 kr. som tilvalg til en bilvask.",
      },
      {
        q: "Fylder I kølemiddel på?",
        a: "Nej. Vi renser anlægget for lugt. Påfyldning og fejlfinding udføres af et værksted.",
      },
      {
        q: "Hvor ofte bør airconditionen renses?",
        a: "En gang om året er passende – gerne om foråret, inden anlægget skal bruges meget.",
      },
      {
        q: "Er lugten fra airconditionen usund?",
        a: "Lugten skyldes bakterier og skimmel i anlægget. Det kan genere især allergikere og astmatikere, og det er en god grund til at få det renset.",
      },
      {
        q: "Hjælper det at skifte kabinefilter?",
        a: "Ja, et friskt filter hjælper og bør skiftes efter bilens serviceplan. Men det fjerner ikke belægninger, der allerede sidder i anlægget.",
      },
    ],
    keywords: ["aircondition rens bil", "AC rens bil", "aircondition lugter", "rens af aircondition pris", "klimaanlæg rens bil"],
    image: { src: "/home/voks.jpg", alt: "Behandling ved instrumentbræt og ventilation i bil" },
    related: [
      "/lugtfjernelse-bil",
      "/bilrengoering",
      "/blog/lugt-fra-aircondition",
      "/blog/dug-paa-ruderne-indvendigt",
      "/blog/allergi-og-bilens-kabine",
      "/indvendig-bilrengoering-pris",
    ],
    pkg: "inside",
    addOn: "ac-rens",
  }),

  addOnPage({
    slug: "rens-af-autostol",
    title: "Rens af autostol og børnesæde – 100 kr.",
    description:
      "Rens af autostol på din adresse. Vi fjerner krummer, pletter og lugt fra børnesædet skånsomt. 100 kr. som tilvalg til en bilvask.",
    h1: "Rens af autostol",
    eyebrow: "Børnesæder og selepuder",
    intro:
      "Ingen del af bilen bliver så beskidt som autostolen. Kiks, juice, sand og det, der er værre, samler sig i hver en fold.",
    answer:
      "CleanWash renser autostole og børnesæder som tilvalg til en bilvask for 100 kr. Sædet rengøres skånsomt for krummer, pletter og lugt på din adresse. Selve fastspændingen af stolen står du selv for bagefter.",
    sections: [
      {
        h: "Hvad gemmer der sig i en autostol?",
        p: [
          "Løft et børnesæde ud af bilen, og vend det om. Der drysser som regel en overraskende mængde ud: krummer, rosiner, sand, småsten, legetøj. Under betrækket og i selespænderne sidder resten – indtørret mælk, juice og frugtmos.",
          "Madrester og mælk er ikke bare ulækkert. Det surner, lugter og giver grobund for bakterier, lige dér hvor barnet sidder med hænder og ansigt.",
        ],
      },
      {
        h: "Skånsom rens",
        p: [
          "En autostol er sikkerhedsudstyr. Derfor renser vi den skånsomt. Vi fjerner løst snavs, støvsuger folder og sprækker og rengør betræk og plastdele med milde midler. Selerne tørres af – de må ikke gennemblødes eller behandles med stærke midler, fordi det kan svække fibrene.",
          "Sædet under og omkring autostolen bliver rengjort som en del af den indvendige rengøring. Det er ofte dér, det meste ligger.",
        ],
      },
      {
        h: "Du spænder selv stolen fast",
        p: [
          "Skal autostolen tages ud for at komme ordentligt til, er det dig, der monterer den igen. Det er vigtigt, at den sidder præcis, som producenten foreskriver – og det er forældrene, der kender stolen og barnet. Tjek altid, at stolen sidder stramt, og at selen er ført rigtigt, før næste tur.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster rens af en autostol?",
        a: "100 kr. som tilvalg til en bilvask.",
      },
      {
        q: "Vasker I betrækket i maskine?",
        a: "Nej. Vi rengør stolen på stedet. Mange betræk kan tages af og maskinvaskes derhjemme – se stolens brugsanvisning.",
      },
      {
        q: "Kan selerne tåle at blive renset?",
        a: "De tørres af med et mildt middel. Seler bør aldrig lægges i blød eller vaskes med stærke rengøringsmidler.",
      },
      {
        q: "Monterer I autostolen igen?",
        a: "Nej, det gør du selv. Korrekt montering er afgørende for sikkerheden, og den skal følge producentens anvisning.",
      },
      {
        q: "Renser I også sædet under autostolen?",
        a: "Ja, det er en del af den indvendige rengøring.",
      },
    ],
    keywords: ["rens af autostol", "rens af børnesæde", "rengøring autostol", "vask af autostol", "børnesæde rengøring bil"],
    image: { src: "/home/kids.jpg", alt: "Autostol med bamse på bagsædet før rens" },
    related: [
      "/bilvask-familiebil",
      "/saederens-bil",
      "/pletfjernelse-bilsaeder",
      "/bilrengoering",
      "/blog/saadan-rydder-og-rengoer-du-bilen-med-boern",
      "/blog/spildt-maelk-i-bilen",
    ],
    pkg: "inside",
    addOn: "boernesaeder",
  }),

  addOnPage({
    slug: "vinylpleje-bil",
    title: "Vinylpleje til bil – instrumentbræt og paneler",
    description:
      "Vinylpleje giver instrumentbræt, dørpaneler og plast et rent, mat og velholdt udseende og beskytter mod sol. 249 kr. som tilvalg til bilvask.",
    h1: "Vinylpleje til bilen",
    eyebrow: "Instrumentbræt, paneler og plast",
    intro:
      "Kabinens plast og vinyl bliver grå, støvet og tør af sollys. Vinylpleje bringer farven tilbage – uden det fedtede skær.",
    answer:
      "CleanWash tilbyder vinylpleje som tilvalg til en bilvask for 249 kr. Instrumentbræt, dørpaneler og øvrige plast- og vinylflader rengøres og plejes, så de fremstår rene og velholdte og er bedre beskyttet mod solens udtørring.",
    sections: [
      {
        h: "Hvad sker der med plast i en bil?",
        p: [
          "Instrumentbrættet ligger lige under forruden og får mere sol end nogen anden del af kabinen. UV-lys og varme trækker blødgørerne ud af materialet. Det gør overfladen lysere, tørrere og med tiden sprød.",
          "De samme blødgørere fordamper op på indersiden af forruden. Det er dén fedtede film, der giver genskin i modlys.",
        ],
      },
      {
        h: "Forskellen på rengøring og pleje",
        p: [
          "I en almindelig indvendig rengøring tørrer vi alle flader af, så støv og fingeraftryk forsvinder. Vinylpleje er et ekstra trin. Efter rengøringen får overfladerne et plejemiddel, der genopfrisker farven og lægger et beskyttende lag.",
          "Resultatet skal være mat til silkemat. Et instrumentbræt, der skinner, giver reflekser i forruden og er ubehageligt at køre med. Vi bruger ikke produkter, der efterlader en fedtet overflade.",
        ],
      },
      {
        h: "Hvornår giver det mening?",
        p: [
          "Vinylpleje er oplagt, når kabinen ser træt ud, selvom den er ren. Typisk i biler på fem år og opefter, biler, der holder meget ude i solen, og biler, der skal sælges eller afleveres.",
        ],
        list: [
          "Instrumentbræt og midterkonsol",
          "Dørpaneler og armlæn",
          "Plastdele ved sæder og dørtrin",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster vinylpleje?",
        a: "249 kr. som tilvalg til en indvendig rengøring eller Hele bilen.",
      },
      {
        q: "Bliver instrumentbrættet blankt?",
        a: "Nej. Målet er en mat til silkemat finish, som ikke giver genskin i forruden.",
      },
      {
        q: "Hvor længe holder behandlingen?",
        a: "Typisk nogle måneder, afhængigt af hvor meget sol bilen får, og hvor ofte fladerne tørres af.",
      },
      {
        q: "Behandler I rat og pedaler?",
        a: "Nej. Rat, gearknop og pedaler rengøres, men får ikke plejemiddel, fordi de ikke må blive glatte.",
      },
      {
        q: "Hjælper vinylpleje på falmet plast udvendigt?",
        a: "Tilvalget gælder kabinen. Udvendig plast kræver andre produkter – læs vores guide om falmet plastik.",
      },
    ],
    keywords: ["vinylpleje bil", "pleje af instrumentbræt", "plastpleje bil", "rengøring af instrumentbræt", "vinyl bil"],
    image: { src: "/home/vinyl.jpg", alt: "Vinylpleje af instrumentbræt med svamp" },
    related: [
      "/laederpleje-bil",
      "/bilrengoering",
      "/blog/falmet-plastik-paa-bilen",
      "/blog/rengoering-af-skaerm-og-pianolak",
      "/klargoering-bil-salg",
      "/indvendig-bilrengoering-pris",
    ],
    pkg: "inside",
    addOn: "vinylpleje",
  }),

  addOnPage({
    slug: "rengoering-af-meget-beskidt-bil",
    title: "Rengøring af meget beskidt bil – ekstra tid",
    description:
      "Er bilen rigtig beskidt indvendigt? Med tilvalget ekstra beskidt til 299 kr. sætter vi den tid af, der skal til. Vi kommer til din adresse.",
    h1: "Rengøring af meget beskidt bil",
    eyebrow: "Tilvalg: ekstra beskidt",
    intro:
      "Nogle biler har bare brug for mere tid. Det er ingen skam – men det er godt at sige det på forhånd, så vi kan gøre arbejdet ordentligt.",
    answer:
      "Er din bil meget beskidt indvendigt, vælger du tilvalget ekstra beskidt for 299 kr., når du booker en bilvask hos CleanWash. Det giver den ekstra tid, der skal til for at komme i bund. Vi kommer til din adresse med eget vand og strøm.",
    sections: [
      {
        h: "Hvornår er en bil ekstra beskidt?",
        p: [
          "En almindelig indvendig rengøring er beregnet til en bil, der bruges normalt og bliver gjort ren nogle gange om året. Hvis en eller flere af disse ting passer på din bil, bør du vælge tilvalget.",
        ],
        list: [
          "Bilen er ikke blevet rengjort indvendigt i et år eller mere",
          "Der er indtørret mudder, jord eller sand i store mængder",
          "Der ligger madrester, emballage og affald i kabinen",
          "Sæder og tæpper har mange pletter",
          "Bilen har været brugt som arbejdsbil, flyttebil eller til dyr",
        ],
      },
      {
        h: "Hvorfor koster det ekstra?",
        p: [
          "Fordi tid er det eneste, der gør en meget beskidt bil ren. Indtørret snavs skal løsnes, før det kan fjernes. Sprækker og skinner skal gås efter flere gange. Og hver flade skal ofte have to omgange.",
          "Uden tilvalget ville vi enten skulle skynde os eller overskride tiden til den næste kunde. Ingen af delene er fair. Med tilvalget er tiden sat af fra start.",
        ],
      },
      {
        h: "Kombinér efter behov",
        p: [
          "Ekstra beskidt handler om tid til den grundlæggende rengøring. Er der også pletter i sæderne, dyrehår eller lugt, kan de tilvalg lægges oveni. Og ligger der meget affald og løse ting, kan tømning af bilen vælges til for 99 kr., så vi rydder ud, før vi går i gang.",
          "Er du i tvivl om, hvad bilen har brug for, så skriv et par linjer i bookingen – eller ring. Vi har set det meste.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster tilvalget ekstra beskidt?",
        a: "299 kr. oven i prisen for indvendig rengøring eller Hele bilen.",
      },
      {
        q: "Hvordan ved jeg, om min bil er ekstra beskidt?",
        a: "Hvis den ikke er blevet rengjort indvendigt i over et år, eller der er meget mudder, madrester eller pletter, er svaret som regel ja.",
      },
      {
        q: "Hvad sker der, hvis jeg ikke vælger det, og bilen er meget beskidt?",
        a: "Så kontakter vi dig på stedet og aftaler, om tilvalget skal lægges til, så resultatet bliver, som det skal være.",
      },
      {
        q: "Rydder I affald ud af bilen?",
        a: "Ja, med tilvalget tømning af bil til 99 kr.",
      },
      {
        q: "Kan en meget beskidt bil blive helt ren igen?",
        a: "Som regel bliver forskellen meget stor. Slid og misfarvning, der har siddet i årevis, kan dog ikke altid fjernes helt.",
      },
    ],
    keywords: ["meget beskidt bil", "rengøring af beskidt bil", "ekstra beskidt bil", "grundig bilrengøring", "bil der trænger"],
    image: { src: "/home/extra.jpg", alt: "Meget beskidt bagsæde og gulv før rengøring" },
    related: [
      "/bilrengoering",
      "/saederens-bil",
      "/rengoering-efter-uheld-i-bilen",
      "/fjernelse-af-dyrehaar-bil",
      "/lugtfjernelse-bil",
      "/indvendig-bilrengoering-pris",
    ],
    pkg: "inside",
    addOn: "ekstra-beskidt",
  }),

  addOnPage({
    slug: "faelgrens",
    title: "Fælgrens – fjern bremsestøv fra fælgene 149 kr.",
    description:
      "Fælgrens opløser fastbrændt bremsestøv, som almindelig vask ikke får af. 149 kr. som tilvalg til udvendig bilvask på din adresse.",
    h1: "Fælgrens",
    eyebrow: "Mod fastbrændt bremsestøv",
    intro:
      "Rene fælge løfter hele bilen. Sorte fælge trækker den ned, uanset hvor blank lakken er.",
    answer:
      "CleanWash tilbyder fælgrens som tilvalg til en udvendig bilvask for 149 kr. Behandlingen opløser fastbrændt bremsestøv og snavs, som en almindelig vask ikke fjerner. Fælgene vaskes altid i en bilvask – fælgrens er den dybere behandling.",
    sections: [
      {
        h: "Hvad er bremsestøv?",
        p: [
          "Hver gang du bremser, slides der lidt af bremseklodser og skiver. Det bliver til et fint, mørkt støv af metal og bindemidler. Støvet er glohedt, når det forlader bremsen, og det lander på fælgen få centimeter væk.",
          "Fordi det er varmt, brænder det sig fast i fælgens overflade. Det, der sidder løst, vaskes af. Det, der er brændt fast, bliver siddende som brune og sorte skygger – især i hjørner, omkring bolte og på indersiden af egerne.",
        ],
      },
      {
        h: "Hvorfor almindelig vask ikke er nok",
        p: [
          "Sæbe og vand fjerner snavs, der ligger på overfladen. Fastbrændt bremsestøv er jernpartikler, som sidder i overfladen. De skal opløses kemisk med et middel, der er lavet til det, og derefter børstes og skylles væk.",
          "Det er det, fælgrens er. Efter behandlingen er fælgen ren helt ind i hjørnerne, og næste vask bliver lettere.",
        ],
      },
      {
        h: "Hvilke biler har mest brug for det?",
        p: [
          "Bremsestøv afhænger af bilen og kørslen. Nogle biler sviner fælgene til på en uge, andre holder dem pæne i månedsvis.",
        ],
        list: [
          "Tunge biler og biler med store bremser støver mest på forhjulene",
          "Bykørsel med mange opbremsninger giver mere støv end motorvej",
          "Elbiler og hybrider bremser meget med motoren og støver mindre",
          "Lyse og blanke fælge viser støvet tydeligst",
        ],
      },
      {
        h: "Pas på fælgene mellem vaskene",
        p: [
          "Jo længere støvet sidder, jo dybere brænder det sig fast. Bliver det ved i årevis, kan det skade fælgens lak. En udvendig vask en gang om måneden og fælgrens et par gange om året holder dem pæne.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster fælgrens?",
        a: "149 kr. som tilvalg til en udvendig bilvask eller Hele bilen.",
      },
      {
        q: "Bliver fælgene ikke vasket i en almindelig bilvask?",
        a: "Jo. Fælge, dæksider og hjulbuer vaskes altid. Fælgrens er en ekstra behandling mod det bremsestøv, der er brændt fast.",
      },
      {
        q: "Kan fælgrens skade fælgene?",
        a: "Nej, når der bruges midler, som er beregnet til fælge, og de skylles grundigt af. Fortæl os, hvis fælgene er polerede, ulakerede eller har skader i lakken.",
      },
      {
        q: "Hvor ofte skal fælgene have fælgrens?",
        a: "To til fire gange om året, afhængigt af hvor meget bilen støver.",
      },
      {
        q: "Renser I også fælgenes inderside?",
        a: "Vi renser så langt ind, som der kan nås mellem egerne, uden at hjulene tages af.",
      },
    ],
    keywords: ["fælgrens", "rens af fælge", "bremsestøv fælge", "fælgrens pris", "rengøring af alufælge"],
    image: { src: "/home/wash-tire.jpg", alt: "Fælgrens med børste på alufælg" },
    related: [
      "/daekshine",
      "/udvendig-bilvask-koebenhavn",
      "/komplet-bilvask",
      "/blog/saadan-rengoer-du-faelge-og-fjerner-bremsestoev",
      "/blog/flyverust-hvad-er-det",
      "/bilvask-priser",
    ],
    pkg: "outside",
    addOn: "faelgrens",
  }),

  addOnPage({
    slug: "daekshine",
    title: "Dækshine – mørke, velplejede dæk for 99 kr.",
    description:
      "Dækshine giver dækkene en dyb, mørk finish, så bilen ser nyvasket ud hele vejen rundt. 99 kr. som tilvalg til udvendig bilvask.",
    h1: "Dækshine",
    eyebrow: "Prikken over i'et",
    intro:
      "Grå, falmede dæk får selv en nyvasket bil til at se halvfærdig ud. Dækshine er den lille detalje, der gør forskellen.",
    answer:
      "CleanWash tilbyder dækshine som tilvalg til en udvendig bilvask for 99 kr. Dækkenes sider rengøres og får et plejemiddel, der giver en mørk, velplejet finish. Det er en kosmetisk behandling og påvirker ikke dækkets slidbane.",
    sections: [
      {
        h: "Hvorfor bliver dæk grå og brune?",
        p: [
          "Dækgummi indeholder stoffer, der beskytter mod ozon og sollys. De vandrer langsomt ud til overfladen, hvor de reagerer med luften og bliver brunlige. Oven i det kommer vejsnavs og bremsestøv.",
          "Det er helt normalt og betyder ikke, at dækket er dårligt. Men det ser kedeligt ud ved siden af en ren fælg og en blank skærm.",
        ],
      },
      {
        h: "Hvad er dækshine?",
        p: [
          "Dækshine er et plejemiddel til dækkets sider. Det påføres, efter at dækket er vasket rent og tørret. Midlet giver gummiet en ensartet, mørk farve og en finish fra mat til let blank.",
          "Det påføres kun på siden af dækket – aldrig på slidbanen, hvor dækket har kontakt med vejen.",
        ],
      },
      {
        h: "Hvor længe holder det?",
        p: [
          "Det afhænger af vejret. I tørt vejr holder finishen typisk en til tre uger. Regn, vandpytter og vask slider den hurtigere af. Det er derfor et tilvalg, mange tager, når bilen skal se ekstra skarp ud: til et salg, en fest, en fremvisning eller bare fordi.",
        ],
        list: [
          "Før et salg eller billeder til annoncen",
          "Ved aflevering af leasingbil",
          "Sammen med fælgrens for det fulde resultat",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster dækshine?",
        a: "99 kr. som tilvalg til en udvendig bilvask eller Hele bilen.",
      },
      {
        q: "Bliver dækkene glatte?",
        a: "Nej. Midlet påføres kun på dækkets sider, ikke på slidbanen.",
      },
      {
        q: "Hvor længe holder dækshine?",
        a: "Typisk en til tre uger, kortere i regnfulde perioder.",
      },
      {
        q: "Sprøjter det op på lakken?",
        a: "Ikke når det påføres korrekt og får lov at sætte sig, inden bilen kører.",
      },
      {
        q: "Skal jeg vælge fælgrens samtidig?",
        a: "Det er ikke et krav, men de to tilvalg passer godt sammen: rene fælge og mørke dæk giver det største løft.",
      },
    ],
    keywords: ["dækshine", "dækglans", "dækpleje", "sorte dæk bil", "tyre shine"],
    image: { src: "/home/dækshine.png", alt: "Dæk med mørk finish efter dækshine" },
    related: [
      "/faelgrens",
      "/udvendig-bilvask-koebenhavn",
      "/klargoering-bil-salg",
      "/komplet-bilvask",
      "/bilvask-foer-bryllup",
      "/bilvask-priser",
    ],
    pkg: "outside",
    addOn: "daekshine",
  }),

  addOnPage({
    slug: "motorvask",
    title: "Motorvask – skånsom vask af motorrum 350 kr.",
    description:
      "Motorvask fjerner snavs, støv og fedt fra motorrummet på en skånsom måde. 350 kr. som tilvalg til bilvask på din adresse. Book online.",
    h1: "Motorvask",
    eyebrow: "Rengøring af motorrum",
    intro:
      "Et rent motorrum er lettere at holde øje med, pænere at vise frem og rarere at arbejde i. Men det skal vaskes med omtanke.",
    answer:
      "CleanWash tilbyder motorvask som tilvalg til en bilvask for 350 kr. Motorrummet rengøres skånsomt for støv, snavs og fedt uden højt tryk direkte på følsomme dele. Behandlingen tager cirka 20 minutter ekstra og udføres på din adresse.",
    sections: [
      {
        h: "Hvorfor vaske motorrummet?",
        p: [
          "Motorrummet er åbent nedefra og samler alt, hvad vejen kaster op: støv, salt, blade og olietåge. Det lægger sig som et fedtet, gråt lag på alle flader.",
          "Der er tre gode grunde til at fjerne det. Et rent motorrum gør det let at opdage en lækage, før den bliver dyr. Det giver et bedre indtryk ved salg og syn. Og blade og skidt, der ligger og holder på fugten, er ikke godt for hverken metal eller gummi.",
        ],
      },
      {
        h: "Skånsomt – ikke med højtryk",
        p: [
          "Moderne motorrum er fulde af stik, sensorer og styreenheder. De er lavet til at tåle regn og sprøjt, men ikke en højtryksstråle på klos hold. Derfor foregår motorvask skånsomt.",
          "Motoren skal være kølig. Følsomme dele skånes. Snavs og fedt løsnes med rensemiddel og børste og skylles af med lavt tryk. Til sidst tørres der efter, så der ikke står vand i fordybninger.",
        ],
        list: [
          "Motoren skal være kold eller højst lunken ved start",
          "Fortæl os om åbne luftfiltre eller eftermonteret elektronik",
          "Start gerne bilen og lad den gå et par minutter bagefter",
        ],
      },
      {
        h: "Hvornår er motorvask en god idé?",
        p: [
          "Før et salg, hvor køberen sandsynligvis åbner motorhjelmen. Før syn, hvis motorrummet er meget tilsmudset. Efter en vinter med meget salt. Og når en lækage er blevet repareret, så du kan se, om den er væk.",
          "De fleste biler har ikke brug for motorvask mere end en gang om året. Er bilen ældre eller har kendte elektriske problemer, så nævn det, inden vi går i gang.",
        ],
      },
      {
        h: "Elbiler og hybrider",
        p: [
          "Elbiler har ingen forbrændingsmotor, men stadig et rum under fronthjelmen med komponenter og ofte et bagagerum. Her er der sjældent fedt og olie, og en aftørring er som regel nok. Højspændingsdele skal aldrig spules. Skriv i bookingen, hvis bilen er en elbil eller plug-in-hybrid.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster en motorvask?",
        a: "350 kr. som tilvalg til en bilvask.",
      },
      {
        q: "Er det farligt at vaske motoren?",
        a: "Ikke når det gøres skånsomt, på en kold motor og uden højt tryk på elektriske dele. Det er forkert metode, der giver problemer.",
      },
      {
        q: "Hvor lang tid tager en motorvask?",
        a: "Cirka 20 minutter oven i den øvrige bilvask.",
      },
      {
        q: "Skal motoren være kold?",
        a: "Ja. Parkér gerne bilen en times tid, før vi kommer, hvis motorvask er bestilt.",
      },
      {
        q: "Vasker I motorrummet på elbiler?",
        a: "På elbiler er en forsigtig aftørring af rummet under fronthjelmen normalt nok. Højspændingsdele spules ikke.",
      },
    ],
    keywords: ["motorvask", "vask af motorrum", "motorvask pris", "rens af motorrum", "motorrumsvask"],
    image: { src: "/home/motorvask.png", alt: "Motorrum i bil klar til motorvask" },
    related: [
      "/klargoering-bil-salg",
      "/udvendig-bilvask-koebenhavn",
      "/blog/skal-motorrummet-vaskes",
      "/blog/bilvask-foer-syn",
      "/bilvask-elbil",
      "/bilvask-priser",
    ],
    pkg: "outside",
    addOn: "motorvask",
  }),
];
