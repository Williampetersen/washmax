import { businessPage, type ContentPage } from "./types";

// Erhverv: én side pr. branche med det, der er særligt for netop den.
export const business: ContentPage[] = [
  businessPage({
    slug: "bilvask-taxa",
    title: "Bilvask af taxa – ren vogn til hver vagt",
    description:
      "Mobil bilvask til taxaer og limousiner. Vi vasker vognen ude og inde ved din bopæl eller på holdepladsen efter aftale. Faste aftaler og faktura.",
    h1: "Bilvask af taxa",
    eyebrow: "Taxa, limousine og persontransport",
    intro:
      "I en taxa er bilen selve produktet. Passageren bedømmer turen på sædet, lugten og ruderne – længe før taxameteret stopper.",
    answer:
      "CleanWash vasker taxaer og limousiner på adressen med eget vand og strøm. Vi tilbyder udvendig vask, indvendig rengøring og tilvalg som sæderens og lugtfjernelse. Vognmænd kan få en fast aftale med faste vaskedage og samlet faktura.",
    sections: [
      {
        h: "En kabine med hundredvis af passagerer",
        p: [
          "En privatbil har måske fire faste brugere. En taxa har flere hundrede forskellige om måneden. De har våde jakker, mad, kufferter, børn og en gang imellem en dårlig aften bag sig. Det slider på bagsædet, dørhåndtagene og gulvet.",
          "Den daglige aftørring klarer chaufføren selv. Men med jævne mellemrum skal kabinen i bund: sæder og tæpper støvsuges ordentligt, alle kontaktflader tørres af, og ruderne pudses indefra.",
        ],
      },
      {
        h: "Det, passagerer lægger mærke til",
        p: [
          "Tre ting afgør førstehåndsindtrykket, når døren åbnes.",
        ],
        list: [
          "Lugten: mad, røg og fugt sætter sig i tekstilerne. Sæderens og lugtfjernelse går efter kilden.",
          "Bagsædet: pletter og krummer ses med det samme. Pletfjernelse kan tages efter behov.",
          "Ruderne: fedtede bagruder og sideruder er det, passageren ser ud ad hele turen.",
        ],
      },
      {
        h: "Vask uden tabt køretid",
        p: [
          "Tid i vaskehal er tid uden passagerer. Vi vasker vognen, mens den alligevel holder stille: ved din bopæl mellem to vagter eller hos vognmanden. Du skal ikke køre nogen steder, og vi har vand og strøm med.",
          "Kører vognen i to hold, kan vasken lægges i vagtskiftet. Aftal det med os, så finder vi en fast rytme.",
        ],
      },
      {
        h: "For vognmænd med flere vogne",
        p: [
          "Har du flere vogne, laver vi en samlet aftale. Vognene vaskes efter en plan, og du får én faktura. Det giver en ensartet standard på tværs af vogne og chauffører.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster bilvask af en taxa?",
        a: "Prisen følger bilens størrelse ligesom for private: udvendig vask fra 450 kr. og hele bilen fra 799 kr. Vognmænd med flere vogne kan få et tilbud på en fast aftale.",
      },
      {
        q: "Kan I vaske vognen mellem to vagter?",
        a: "Ja. Fortæl os, hvornår vognen holder stille, så planlægger vi efter det.",
      },
      {
        q: "Kan I fjerne lugt efter passagerer?",
        a: "Ja. Lugtfjernelse, sæderens og AC-rengøring er tilvalg, der går efter lugtens kilde.",
      },
      {
        q: "Får jeg en faktura med moms?",
        a: "Ja. Erhvervskunder får faktura, og priserne er inklusive moms, medmindre andet er aftalt.",
      },
      {
        q: "Vasker I også minibusser til persontransport?",
        a: "Kontakt os med oplysninger om køretøjet, så giver vi en pris.",
      },
    ],
    keywords: ["bilvask taxa", "taxa rengøring", "vask af taxa", "taxi bilvask", "rengøring limousine"],
    image: { src: "/service/inside.jpg", alt: "Indvendig rengøring af kabine i taxa" },
    related: [
      "/erhverv/flaadeaftale",
      "/erhvervs-bilvask",
      "/lugtfjernelse-bil",
      "/saederens-bil",
      "/bilvask-kastrup",
      "/bilvask-skoda",
    ],
    pkg: "whole",
  }),

  businessPage({
    slug: "bilvask-bilforhandler",
    title: "Bilvask for bilforhandlere – klargøring på pladsen",
    description:
      "Klargøring af brugte biler og byttebiler hos jer. Vi vasker, rengør og gør bilerne klar til foto og fremvisning. Vand og strøm medbringes.",
    h1: "Bilvask for bilforhandlere",
    eyebrow: "Klargøring af brugte biler",
    intro:
      "En bil, der står skarpt på billederne, bliver solgt hurtigere. Vi klargør jeres biler på pladsen, så de er klar til foto og fremvisning.",
    answer:
      "CleanWash klargør biler for bilforhandlere på forhandlerens egen plads. Vi medbringer vand og strøm og udfører udvendig vask, indvendig rengøring, voks og tilvalg som sæderens, lugtfjernelse og motorvask. Kontakt os for en fast aftale og pris pr. bil.",
    sections: [
      {
        h: "Fra byttebil til salgsklar",
        p: [
          "En byttebil kommer sjældent ind, som den skal ud. Der er børnekrummer, hundehår, røglugt og en lak, der ikke har set voks i årevis. Hver dag bilen står og venter på klargøring, er en dag, hvor den ikke kan sælges.",
          "Vi kommer ud og tager bilerne, efterhånden som de kommer ind. I slipper for at binde en medarbejder til vaskepladsen eller køre bilerne ud af huset.",
        ],
      },
      {
        h: "Det, køberen ser først",
        p: [
          "Købere af brugte biler kigger efter de samme ting. Det er dem, klargøringen skal ramme.",
        ],
        list: [
          "Lak med glans og uden vejfilm – Hele bilen med voks",
          "Rene fælge og mørke dæk – fælgrens og dækshine",
          "Sæder uden skjolder – sæderens eller læderpleje",
          "En kabine, der dufter af ingenting – lugtfjernelse og AC-rengøring",
          "Et motorrum, man tør åbne – motorvask",
        ],
      },
      {
        h: "Fleksibelt efter jeres flow",
        p: [
          "Nogle forhandlere har brug for os en fast dag om ugen. Andre ringer, når der er kommet tre biler ind. Begge dele kan lade sig gøre. Vi aftaler en pris pr. bil ud fra pakke og størrelse, og I får en samlet faktura.",
          "Vi klargør også biler, der allerede er solgt og skal udleveres, så kunden får nøglen til en ren bil.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan I klargøre biler på vores plads?",
        a: "Ja. Vi medbringer vand, strøm og udstyr og arbejder dér, hvor bilerne står.",
      },
      {
        q: "Hvad koster klargøring pr. bil?",
        a: "Udgangspunktet er vores pakkepriser og tilvalg. Forhandlere med løbende behov får et samlet tilbud.",
      },
      {
        q: "Kan I fjerne røglugt fra en byttebil?",
        a: "Som regel ja eller forbedre den markant. Kraftig, mangeårig røglugt kan kræve flere behandlinger.",
      },
      {
        q: "Polerer I lakken?",
        a: "Vi vasker, renser og lægger voks. Maskinpolering af ridser er ikke en del af vores faste pakker.",
      },
      {
        q: "Hvor hurtigt kan I komme?",
        a: "Det afhænger af kalenderen. Med en fast aftale har I faste dage, hvor vi kommer.",
      },
    ],
    keywords: ["bilvask bilforhandler", "klargøring brugte biler", "bilklargøring forhandler", "klargøring af byttebil", "bilpleje forhandler"],
    image: { src: "/home/motorvask.png", alt: "Motorrum klargjort til salg af brugt bil" },
    related: [
      "/klargoering-bil-salg",
      "/erhverv/flaadeaftale",
      "/motorvask",
      "/lugtfjernelse-bil",
      "/saederens-bil",
      "/erhvervs-bilvask",
    ],
    pkg: "whole",
  }),

  businessPage({
    slug: "bilvask-biludlejning",
    title: "Bilvask til biludlejning og delebiler",
    description:
      "Rengøring af udlejningsbiler og delebiler mellem lejere. Vi kommer til bilens faste plads med vand og strøm. Faste aftaler for flere biler.",
    h1: "Bilvask til biludlejning og delebiler",
    eyebrow: "Mellem to lejere",
    intro:
      "Når mange deler den samme bil, er der ingen, der føler ansvar for at gøre den ren. Det gør vi så.",
    answer:
      "CleanWash rengør udlejningsbiler og delebiler på bilens faste plads med eget vand og strøm. Vi tilbyder udvendig vask og indvendig rengøring efter en fast plan eller efter behov. Udlejere og delebilsforeninger kan få en samlet aftale.",
    sections: [
      {
        h: "Delebilens udfordring",
        p: [
          "En delebil eller udlejningsbil bliver brugt af mennesker, der ikke ejer den. De fleste efterlader den pænt. Nogle gør ikke. Den næste lejer åbner døren til en fremmed persons kaffekop og sand fra en strandtur.",
          "Det giver dårlige bedømmelser og klager. Og det får ordentlige brugere til at behandle bilen dårligere, fordi standarden allerede er lav.",
        ],
      },
      {
        h: "Rengøring, hvor bilen bor",
        p: [
          "Delebiler har typisk en fast plads på gaden eller i en gård. Dér er der hverken vand eller strøm, og det er grunden til, at de sjældent bliver vasket. Vi har begge dele med og vasker bilen på pladsen, mens den ikke er booket.",
          "I fortæller os, hvornår bilen er ledig. Skal vi ind i kabinen, aftaler vi adgang via jeres nøgleboks eller app.",
        ],
      },
      {
        h: "Fast plan eller efter behov",
        p: [
          "To modeller går igen hos udlejere og delebilsordninger.",
        ],
        list: [
          "Fast rytme: for eksempel indvendig rengøring hver anden uge og udvendig vask en gang om måneden.",
          "Efter behov: I bestiller, når en lejer melder, at bilen er beskidt.",
          "Sæsonrens: Hele bilen med sæderens forår og efterår.",
        ],
      },
      {
        h: "Udlejer du din egen bil privat?",
        p: [
          "Lejer du din bil ud gennem en delebilsplatform, betyder bedømmelserne alt. En professionel rengøring mellem lejerne i højsæsonen kan være forskellen på fire og fem stjerner. Du booker som privatkunde – bilen skal bare holde hjemme.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan I rengøre en delebil på dens faste plads?",
        a: "Ja. Vi medbringer vand og strøm og vasker bilen, hvor den holder, når den ikke er booket.",
      },
      {
        q: "Hvordan får I adgang til bilen?",
        a: "Efter aftale – typisk via nøgleboks eller en digital nøgle fra jeres system.",
      },
      {
        q: "Kan vi få en fast aftale for flere biler?",
        a: "Ja. Vi laver en plan for alle biler og sender én samlet faktura.",
      },
      {
        q: "Hvad gør I, hvis en lejer har efterladt bilen meget beskidt?",
        a: "Så lægges tilvalget ekstra beskidt til, og I får besked om, hvordan bilen så ud, da vi kom.",
      },
      {
        q: "Kan jeg som privat udlejer bruge jer?",
        a: "Ja. Du booker online som alle andre.",
      },
    ],
    keywords: ["bilvask biludlejning", "rengøring udlejningsbil", "rengøring delebil", "bilvask delebil", "klargøring udlejningsbil"],
    image: { src: "/home/emptycar.jpg", alt: "Efterladt affald i midterkonsol i udlejningsbil" },
    related: [
      "/erhverv/flaadeaftale",
      "/rengoering-af-meget-beskidt-bil",
      "/bilrengoering",
      "/bilvask-lejlighed",
      "/erhvervs-bilvask",
      "/bilvask-boligforening",
    ],
    pkg: "inside",
  }),

  businessPage({
    slug: "bilvask-servicebiler",
    title: "Bilvask af servicebiler og håndværkerbiler",
    description:
      "Fast bilvask til servicebiler og håndværkerbiler på jeres adresse. Ingen medarbejdertid i vaskehal. Varevogn fra 899 kr. Samlet faktura.",
    h1: "Bilvask af servicebiler",
    eyebrow: "Håndværkere og servicefirmaer",
    intro:
      "Jeres biler holder foran kundens hus hver dag med firmanavnet på siden. De er jeres største reklameflade – og den er enten ren eller beskidt.",
    answer:
      "CleanWash vasker servicebiler og håndværkerbiler på virksomhedens adresse med eget vand og strøm. En varevogn koster 899 kr. udvendigt, 899 kr. for førerkabinen og 1.500 kr. for hele bilen. Virksomheder med flere biler får faste vaskedage og samlet faktura.",
    sections: [
      {
        h: "Hvad koster en beskidt bil?",
        p: [
          "Det er svært at måle, men let at forstå. En montør, der parkerer en mudret varevogn i en nyanlagt indkørsel, starter kundebesøget i minus. En ren bil signalerer orden – også i det arbejde, der skal udføres.",
          "Den anden omkostning er tid. Sender I en medarbejder i vaskehal, betaler I for kørsel, kø og vask til timepris. Det er ofte dyrere end selve vasken.",
        ],
      },
      {
        h: "Sådan kører en fast aftale",
        p: [
          "Vi aftaler, hvor ofte bilerne skal vaskes, og hvornår de holder hjemme. Derefter kører det af sig selv.",
        ],
        list: [
          "Vi kommer på faste dage – typisk tidligt, sent eller i weekenden, når bilerne står stille",
          "Bilerne vaskes udvendigt hver gang og indvendigt efter aftalt rytme",
          "I får én faktura for alle biler",
          "Bilparken kan justeres løbende, når I får nye biler",
        ],
      },
      {
        h: "Førerkabinen er en arbejdsplads",
        p: [
          "En servicetekniker tilbringer flere timer om dagen i kabinen. Der bliver spist frokost, skrevet arbejdssedler og skiftet sko. Støv fra byggepladser og jord fra haver ender på måtter og sæder.",
          "En ren kabine er ikke luksus. Det er arbejdsmiljø. Og rene ruder indefra er trafiksikkerhed, når solen står lavt.",
        ],
      },
      {
        h: "Folie og reklamer",
        p: [
          "Firmabilens folie holder længere, når den vaskes i hånden. Børster og højtryk slider på kanterne, så de løfter sig. Vi vasker skånsomt og giver besked, hvis vi opdager kanter, der er ved at slippe.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster vask af en servicebil?",
        a: "En varevogn koster 899 kr. udvendigt, 899 kr. indvendigt og 1.500 kr. for hele bilen. Ved faste aftaler for flere biler giver vi et samlet tilbud.",
      },
      {
        q: "Kan I vaske uden for arbejdstiden?",
        a: "Vi kører alle ugens dage. Tidspunkterne aftales, så de passer med, hvornår bilerne holder stille.",
      },
      {
        q: "Hvor mange biler skal vi have for at få en aftale?",
        a: "Der er ingen fast grænse. Kontakt os, uanset om I har to eller tyve biler.",
      },
      {
        q: "Vasker I varerummet?",
        a: "Standardrengøringen gælder førerkabinen. Har I brug for rengøring af varerum, så beskriv opgaven, og få en pris.",
      },
      {
        q: "Hvordan betaler vi?",
        a: "Erhvervskunder faktureres. Betalingsbetingelsen fremgår af aftalen.",
      },
    ],
    keywords: ["bilvask servicebiler", "vask af håndværkerbil", "firmabil vask fast aftale", "vask af firmabiler", "bilvask varebiler erhverv"],
    image: { src: "/bilsize/varevogn.png", alt: "Hvid servicebil – fast bilvask til erhverv" },
    related: [
      "/bilvask-varevogn",
      "/erhverv/flaadeaftale",
      "/erhvervs-bilvask",
      "/bilvask-vestegnen",
      "/bilvask-personalegode",
      "/kontakt",
    ],
    pkg: "whole",
  }),

  businessPage({
    slug: "bilvask-boligforening",
    title: "Bilvask til boligforeninger – fælles vaskedag",
    description:
      "Tilbyd beboerne bilvask på foreningens p-plads. Vi kommer med vand og strøm, og hver beboer booker og betaler selv. Gratis for foreningen.",
    h1: "Bilvask til boligforeninger",
    eyebrow: "Ejer-, andels- og almene boliger",
    intro:
      "De færreste beboere i en etageejendom har et sted at vaske bil. En fælles vaskedag løser det – uden at foreningen skal investere en krone.",
    answer:
      "CleanWash tilbyder vaskedage for boligforeninger. Vi kommer til foreningens p-plads med eget vand og strøm, og beboerne booker og betaler selv for deres bil. Det koster ikke foreningen noget. Kontakt os for at aftale en dag.",
    sections: [
      {
        h: "Sådan fungerer en vaskedag",
        p: [
          "Bestyrelsen eller afdelingen godkender, at vi må vaske på p-pladsen en bestemt dag. Beboerne får besked – for eksempel med et opslag i opgangen eller en mail. De, der vil, booker en tid og betaler selv.",
          "På dagen kommer vi og vasker bilerne én efter én på deres pladser. Beboerne behøver ikke at flytte bilen eller være til stede ved en udvendig vask.",
        ],
        list: [
          "Ingen udgift for foreningen",
          "Ingen installation af vand eller el",
          "Beboerne vælger selv pakke og tilvalg",
          "Vi rydder op og efterlader pladsen pæn",
        ],
      },
      {
        h: "Hvorfor foreninger siger ja",
        p: [
          "Mange foreninger har regler mod bilvask på fællesarealer, fordi det giver rod, vandspild og slanger på tværs af fortovet. En organiseret vaskedag er noget andet. Den er tidsbegrænset, foregår kontrolleret og udføres af folk, der har udstyret med.",
          "For beboerne er det en service, de ellers ikke har adgang til. For foreningen er det et gode, der ikke belaster budgettet.",
        ],
      },
      {
        h: "Faste dage eller en enkelt gang",
        p: [
          "Nogle foreninger prøver en enkelt forårsdag. Andre gør det til en fast ordning en gang om måneden eller hver anden måned. Jo flere biler der er tilmeldt på samme dag, jo mere effektivt bliver det.",
        ],
      },
      {
        h: "Garageanlæg og p-kældre",
        p: [
          "Har foreningen p-kælder, afklarer vi sammen, om og hvor der kan vaskes. Skriv til os med lidt information om forholdene, så vender vi tilbage med et forslag.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster det for foreningen?",
        a: "Ingenting. Beboerne booker og betaler selv for deres egen bil.",
      },
      {
        q: "Skal foreningen stille vand eller strøm til rådighed?",
        a: "Nej. Vi medbringer begge dele.",
      },
      {
        q: "Hvor mange beboere skal tilmelde sig?",
        a: "Det aftaler vi med bestyrelsen. Jo flere biler, jo lettere er det at lægge en hel dag hos jer.",
      },
      {
        q: "Hvordan booker beboerne?",
        a: "Online, ligesom alle andre kunder. De vælger pakke og tid og betaler, når bilen er vasket.",
      },
      {
        q: "Kan en enkelt beboer booke uden en fælles vaskedag?",
        a: "Ja, hvis foreningens regler tillader bilvask på p-pladsen. Det er beboerens ansvar at tjekke.",
      },
    ],
    keywords: ["bilvask boligforening", "bilvask ejerforening", "bilvask andelsforening", "vaskedag beboere", "bilvask p-plads forening"],
    image: { src: "/service/udenfor.jpg", alt: "Bilvask på boligforenings parkeringsplads" },
    related: [
      "/bilvask-lejlighed",
      "/bilvask-flere-biler",
      "/bilvask-albertslund",
      "/bilvask-vestegnen",
      "/bilvask-personalegode",
      "/kontakt",
    ],
    pkg: "outside",
  }),

  businessPage({
    slug: "bilvask-personalegode",
    title: "Bilvask som personalegode – på firmaets p-plads",
    description:
      "Giv medarbejderne bilvask på p-pladsen i arbejdstiden. Vi kommer med vand og strøm på faste dage. Medarbejderen eller virksomheden betaler.",
    h1: "Bilvask som personalegode",
    eyebrow: "Til virksomheder med medarbejderparkering",
    intro:
      "Et personalegode, som medarbejderne faktisk bruger: de kører hjem i en ren bil – uden at have brugt et minut af deres fritid på det.",
    answer:
      "CleanWash tilbyder bilvask som personalegode på virksomhedens p-plads. Vi kommer på faste dage med eget vand og strøm, og medarbejderne booker selv en tid. Virksomheden kan vælge, om medarbejderen betaler selv, eller om virksomheden betaler helt eller delvist.",
    sections: [
      {
        h: "Et gode, der sparer fritid",
        p: [
          "Frugtordning og massage er rart. Men tid er det, de fleste medarbejdere mangler. En bilvask koster normalt en time af lørdagen. Når den foregår på p-pladsen i arbejdstiden, koster den ingenting af fritiden.",
          "Det er et lille gode, der bliver lagt mærke til. Særligt af dem, der pendler langt, og af dem, der har børn og fyldte weekender.",
        ],
      },
      {
        h: "Tre måder at gøre det på",
        p: [
          "Virksomheder vælger typisk én af tre modeller.",
        ],
        list: [
          "Medarbejderen betaler selv: Virksomheden stiller p-plads til rådighed. Ingen udgift og ingen administration for jer.",
          "Virksomheden giver tilskud: I betaler en del, medarbejderen resten.",
          "Virksomheden betaler: For eksempel et antal vaske om året pr. medarbejder, med samlet faktura.",
        ],
      },
      {
        h: "Husk skatten",
        p: [
          "Betaler virksomheden for vask af medarbejdernes private biler, kan det være et skattepligtigt personalegode. Reglerne afhænger af beløb og ordning. Tal med jeres revisor, inden I vælger model.",
          "Vælger I modellen, hvor medarbejderen selv betaler, er der normalt ikke noget at tage stilling til. Firmabiler, som virksomheden ejer eller leaser, er en driftsudgift.",
        ],
      },
      {
        h: "Sådan kommer I i gang",
        p: [
          "Skriv eller ring til os med antal medarbejdere og adresse. Vi foreslår en første dag. Medarbejderne får et link og booker selv. Efter første gang ved I, hvor stor interessen er, og om det skal være en fast dag hver måned.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster ordningen for virksomheden?",
        a: "Ingenting, hvis medarbejderne betaler selv. Vælger I at betale helt eller delvist, giver vi et tilbud.",
      },
      {
        q: "Er bilvask skattefrit for medarbejderen?",
        a: "Ikke nødvendigvis. Arbejdsgiverbetalt vask af private biler kan være skattepligtig. Spørg jeres revisor.",
      },
      {
        q: "Hvor meget plads skal I bruge?",
        a: "Vi vasker bilerne på deres parkeringspladser og skal bare kunne komme rundt om dem.",
      },
      {
        q: "Hvor ofte kommer I?",
        a: "Efter aftale – ofte en fast dag om måneden. Ved stor interesse oftere.",
      },
      {
        q: "Skal medarbejderne aflevere nøgler?",
        a: "Kun hvis bilen skal rengøres indvendigt. Det kan klares i receptionen eller ved, at medarbejderen låser op.",
      },
    ],
    keywords: ["bilvask personalegode", "bilvask medarbejdere", "bilvask på firmaets p-plads", "medarbejdergode bilvask", "bilvask virksomhed"],
    image: { src: "/service/udenfor.jpg", alt: "Bilvask af medarbejderbiler på firmaparkering" },
    related: [
      "/bilvask-paa-arbejdspladsen",
      "/erhvervs-bilvask",
      "/erhverv/flaadeaftale",
      "/bilvask-ballerup",
      "/bilvask-servicebiler",
      "/kontakt",
    ],
    pkg: "outside",
  }),

  businessPage({
    slug: "bilvask-hjemmepleje",
    title: "Bilvask af hjemmeplejens biler og kommunale biler",
    description:
      "Fast rengøring af hjemmeplejebiler og kommunale biler på jeres adresse. Rene kontaktflader og kabiner, når mange deler samme bil.",
    h1: "Bilvask af hjemmeplejens biler",
    eyebrow: "Kommuner og plejeleverandører",
    intro:
      "Hjemmeplejens biler deles af mange og kører hele døgnet. Rengøringen falder let mellem to stole – medmindre den er sat i system.",
    answer:
      "CleanWash rengør hjemmeplejebiler og kommunale biler på jeres adresse med eget vand og strøm. Vi tilbyder fast indvendig rengøring med fokus på kontaktflader samt udvendig vask efter en aftalt plan. Kontakt os for et tilbud på hele bilparken.",
    sections: [
      {
        h: "Mange hænder på samme rat",
        p: [
          "En hjemmeplejebil kan have fem eller ti forskellige chauffører på en uge. De stiger ind og ud tyve gange på en vagt, ofte med handsker, sprit og udstyr. Rat, gearvælger, dørhåndtag, selespænde og skærm bliver rørt hundredvis af gange.",
          "Når ingen har bilen som sin egen, er der heller ingen, der gør den ren. Det bliver først opdaget, når den er rigtig beskidt.",
        ],
      },
      {
        h: "Rengøring med fokus på kontaktflader",
        p: [
          "I vores indvendige rengøring tørres alle hårde flader af. I biler, der deles af mange, lægger vi særlig vægt på de steder, hænderne rører.",
        ],
        list: [
          "Rat, blinklysarm og gearvælger",
          "Dørhåndtag inde og ude",
          "Selespænder og håndbremse",
          "Skærm, knapper og nøgle",
          "Bagagerummets håndtag og kant",
        ],
      },
      {
        h: "En plan, der passer til vagtskiftet",
        p: [
          "Bilerne holder stille i korte perioder. Vi lægger rengøringen dér, hvor flest biler er hjemme – typisk omkring vagtskifte eller i weekenden. Vi kommer til jeres p-plads og har alt med.",
          "I får en fast rytme og en samlet faktura. Og medarbejderne får en bil, der er rar at sætte sig ind i.",
        ],
      },
      {
        h: "Små elbiler i drift",
        p: [
          "Mange kommuner har skiftet til små elbiler. De vaskes som alle andre biler. Vi bruger ikke jeres ladestandere, og bilerne kan blive stående på deres pladser.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan I rengøre biler, mens de holder ved plejecentret eller gruppelokalet?",
        a: "Ja. Vi kommer til p-pladsen med vand, strøm og udstyr.",
      },
      {
        q: "Desinficerer I bilerne?",
        a: "Vi rengør og tørrer kontaktflader grundigt af. Har I særlige hygiejnekrav eller bestemte midler, så aftaler vi det på forhånd.",
      },
      {
        q: "Kan kommuner få elektronisk faktura?",
        a: "Kontakt os, så afklarer vi fakturering og betalingsbetingelser.",
      },
      {
        q: "Hvor ofte bør delte biler rengøres indvendigt?",
        a: "Det afhænger af brugen, men hver anden til fjerde uge er almindeligt for biler i daglig drift med mange chauffører.",
      },
      {
        q: "Kan private leverandører af hjemmepleje bruge jer?",
        a: "Ja. Vi laver aftaler med både kommuner og private leverandører.",
      },
    ],
    keywords: ["bilvask hjemmepleje", "rengøring hjemmeplejebiler", "bilvask kommune", "rengøring kommunale biler", "bilvask plejebiler"],
    image: { src: "/home/vinyl.jpg", alt: "Aftørring af instrumentbræt og kontaktflader i bil" },
    related: [
      "/erhverv/flaadeaftale",
      "/erhvervs-bilvask",
      "/bilrengoering",
      "/bilvask-elbil",
      "/blog/hygiejne-i-bilens-kabine",
      "/kontakt",
    ],
    pkg: "inside",
  }),

  businessPage({
    slug: "bilvask-koereskole",
    title: "Bilvask af skolevogn – til kørelærere",
    description:
      "Rengøring af skolevogne for kørelærere og køreskoler. Vi kommer til din adresse med vand og strøm. Ren bil til elever og køreprøve.",
    h1: "Bilvask af skolevogn",
    eyebrow: "Kørelærere og køreskoler",
    intro:
      "Skolevognen er dit kontor, dit undervisningslokale og dit visitkort. Og den har nye mennesker bag rattet hver eneste time.",
    answer:
      "CleanWash vasker skolevogne for kørelærere på adressen med eget vand og strøm. Indvendig rengøring koster fra 600 kr. og omfatter rat, pedalområde, sæder og ruder. Du kan booke efter behov eller få en fast rytme.",
    sections: [
      {
        h: "Otte elever om dagen sætter spor",
        p: [
          "En skolevogn kører mere bykørsel på en uge end de fleste biler på en måned. Hver time er der en ny elev: nye sko på måtten, nye hænder på rattet, ny indstilling af sæde og spejle.",
          "Førersædet og måtten slides først. Rattet bliver blankt. Og fordi lektionerne ligger tæt, er der sjældent tid til mere end at tømme askebægeret for tyggegummipapir.",
        ],
      },
      {
        h: "Rene ruder er undervisning",
        p: [
          "En elev skal lære at orientere sig. Det er svært gennem en forrude med fedtfilm i modlys eller sideruder med fingeraftryk. Rene ruder og spejle er ikke kosmetik i en skolevogn – de er en del af arbejdsredskabet.",
          "Vi pudser alle ruder indefra og udefra og tørrer spejle af.",
        ],
      },
      {
        h: "Klar til køreprøven",
        p: [
          "Til den praktiske prøve sidder den prøvesagkyndige i din bil. En ren og ryddelig vogn giver et professionelt indtryk af både skole og elev. Mange kørelærere lægger en rengøring ind før perioder med mange prøver.",
        ],
      },
      {
        h: "En rytme, der passer til kalenderen",
        p: [
          "Du kender dine huller i skemaet. Book os dér, hvor bilen alligevel holder – hjemme om aftenen, i en frokostpause eller på en teoriaften. Vi skal ikke bruge dit vand eller din strøm. Har skolen flere vogne, laver vi en samlet aftale.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster rengøring af en skolevogn?",
        a: "Indvendig rengøring koster fra 600 kr. og hele bilen fra 799 kr., afhængigt af bilens størrelse.",
      },
      {
        q: "Kan I komme, mens jeg underviser i teori?",
        a: "Ja, hvis bilen holder et sted, hvor vi må vaske. Skriv adressen og tidsrummet i bookingen.",
      },
      {
        q: "Rengør I omkring dobbeltpedalerne?",
        a: "Ja. Fodrum og måtter i begge sider støvsuges og rengøres.",
      },
      {
        q: "Kan en køreskole med flere vogne få en fast aftale?",
        a: "Ja. Kontakt os, så laver vi en plan og en samlet faktura.",
      },
      {
        q: "Hvor ofte bør en skolevogn rengøres?",
        a: "Indvendigt hver tredje til fjerde uge er passende for en vogn i fuld drift.",
      },
    ],
    keywords: ["bilvask skolevogn", "rengøring skolevogn", "bilvask kørelærer", "bilvask køreskole", "rengøring kørelærerbil"],
    image: { src: "/service/inside.jpg", alt: "Indvendig rengøring af førerplads i skolevogn" },
    related: [
      "/bilrengoering",
      "/erhvervs-bilvask",
      "/blog/rene-bilruder-uden-striber",
      "/blog/blankt-og-fedtet-rat",
      "/erhverv/flaadeaftale",
      "/bilvask-taxa",
    ],
    pkg: "inside",
  }),
];
