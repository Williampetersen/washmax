import { regionPage, type ContentPage } from "./types";

// Regionssider: overblik over et større område med links til de enkelte byer.
export const areasRegioner: ContentPage[] = [
  regionPage({
    slug: "bilvask-nordsjaelland",
    title: "Bilvask Nordsjælland – mobil bilvask ved din dør",
    description:
      "Mobil bilvask i Nordsjælland: fra Lyngby og Holte til Hillerød, Helsingør og Frederikssund. Vi kommer til adressen med vand og strøm. Fra 450 kr.",
    h1: "Bilvask Nordsjælland",
    eyebrow: "Fra Øresund til Roskilde Fjord",
    intro:
      "Nordsjælland er kyst, skov og pendlerbyer. Vi kører i hele området og vasker bilen dér, hvor den holder – hjemme, ved sommerhuset eller på arbejdspladsen.",
    answer:
      "CleanWash tilbyder mobil bilvask i Nordsjælland, blandt andet i Lyngby, Holte, Hørsholm, Hillerød, Helsingør, Allerød, Farum og Frederikssund. Vi medbringer vand og strøm. Udvendig bilvask koster fra 450 kr., hele bilen fra 799 kr.",
    sections: [
      {
        h: "Tre slags Nordsjælland – tre slags snavs",
        p: [
          "Hvor i Nordsjælland du bor, afgør, hvad bilen samler. Det er værd at vide, fordi det bestemmer, hvor ofte den bør vaskes, og hvad du skal være opmærksom på.",
        ],
        list: [
          "Kysten fra Klampenborg til Helsingør: salt fra Øresund hele året, sand om sommeren. Vask hver tredje uge, og hold lakken vokset.",
          "Skovbyerne som Holte, Birkerød, Værløse og Fredensborg: harpiks, nåle, pollen og alger i skyggen. Hold øje med afløb og lister.",
          "Pendlerbyerne langs motorvejene som Allerød, Farum og Hillerød: vejfilm, insekter og vintersalt. Forvask er vigtig, så filmen ikke ridser.",
        ],
      },
      {
        h: "Sådan dækker vi området",
        p: [
          "Vi planlægger vores ruter, så flere besøg i samme del af Nordsjælland ligger på samme dag. Bookingen viser de tider, der er ledige på din adresse. I de nærmeste byer er der som regel tider inden for et par dage. Længst mod nord og vest kan det betale sig at booke lidt frem.",
          "Priserne for pakkerne er de samme i hele området. Skulle en adresse udløse et kørselstillæg, står det i prisen, før du bekræfter.",
        ],
      },
      {
        h: "Sommerhus i Nordsjælland?",
        p: [
          "Vi vasker også ved sommerhuse, når adressen ligger inden for vores område. Det er populært at få bilen gjort ren den sidste dag i ferien, så sand og fyrrenåle ikke kommer med hjem. Vi har selv vand og strøm med, så huset behøver ikke at have en udendørs hane.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvilke byer i Nordsjælland kører I i?",
        a: "Blandt andet Lyngby, Virum, Holte, Nærum, Vedbæk, Birkerød, Hørsholm, Rungsted, Kokkedal, Nivå, Humlebæk, Espergærde, Helsingør, Fredensborg, Hillerød, Allerød, Farum, Værløse, Slangerup, Frederikssund, Frederiksværk og Helsinge.",
      },
      {
        q: "Koster det mere at få vasket bil i Nordsjælland?",
        a: "Nej, pakkepriserne er de samme som i København. Et eventuelt kørselstillæg for en adresse vises altid, før du bekræfter.",
      },
      {
        q: "Hvor hurtigt kan I komme?",
        a: "Det afhænger af, hvor du bor, og hvad der er i kalenderen. Bookingen viser de ledige tider for netop din adresse.",
      },
      {
        q: "Kan I vaske ved mit sommerhus?",
        a: "Ja, hvis adressen ligger i vores område. Skriv sommerhusets adresse i bookingen.",
      },
    ],
    keywords: ["bilvask Nordsjælland", "mobil bilvask Nordsjælland", "bilrengøring Nordsjælland", "bilvask hjemme Nordsjælland"],
    image: { src: "/service/helebil.jpg", alt: "Mobil bilvask i Nordsjælland" },
    related: [
      "/bilvask-storkoebenhavn",
      "/bilvask-sjaelland",
      "/bilvask-hjemme",
      "/mobil-bilvask",
      "/bilvask-efter-ferien",
      "/bilvask-priser",
    ],
    area: {
      name: "Nordsjælland",
      kommune: "Kyst, skov og pendlerbyer nord for København",
      postal: "",
      nearby: [
        "Lyngby",
        "Virum",
        "Holte",
        "Nærum",
        "Vedbæk",
        "Birkerød",
        "Hørsholm",
        "Rungsted",
        "Kokkedal",
        "Nivå",
        "Humlebæk",
        "Espergærde",
        "Helsingør",
        "Fredensborg",
        "Hillerød",
        "Allerød",
        "Farum",
        "Værløse",
        "Slangerup",
        "Frederikssund",
        "Frederiksværk",
        "Helsinge",
      ],
    },
  }),

  regionPage({
    slug: "bilvask-storkoebenhavn",
    title: "Bilvask Storkøbenhavn – uanset hvor du parkerer",
    description:
      "Mobil bilvask i Storkøbenhavn. Gade, gård, p-kælder eller indkørsel – se hvor vi kan vaske din bil. Vi har vand og strøm med. Fra 450 kr.",
    h1: "Bilvask Storkøbenhavn",
    eyebrow: "Hovedstadsområdet",
    intro:
      "I Storkøbenhavn er spørgsmålet sjældent, om bilen trænger. Det er, hvor den kan blive vasket. Her er svaret for hver type parkering.",
    answer:
      "CleanWash tilbyder mobil bilvask i hele Storkøbenhavn. Vi medbringer vand og strøm og kan derfor vaske bilen de fleste steder, hvor den holder lovligt: i indkørslen, på gaden, i gården eller på en privat p-plads. Udvendig bilvask fra 450 kr.",
    sections: [
      {
        h: "Hvor kan bilen vaskes?",
        p: [
          "Fordi vi ikke skal bruge din vandhane eller stikkontakt, er der få begrænsninger. Det afgørende er, at vi kan komme til bilen, og at vask er tilladt på stedet.",
        ],
        list: [
          "Indkørsel og carport: Det nemmeste. Vi skal bare kunne gå rundt om bilen.",
          "Gaden: Fint, når bilen holder lovligt, og der er plads til at arbejde.",
          "Gård og fælles p-plads: Tjek ejer-, andels- eller boligforeningens regler først.",
          "P-kælder og p-hus: Kan ofte lade sig gøre. Skriv det i bookingen, så afklarer vi adgang og regler.",
          "Firmaparkering: Oplagt i arbejdstiden. Aftal det med arbejdsgiveren.",
        ],
      },
      {
        h: "Fra brokvarterer til forstæder",
        p: [
          "I de tætte bydele – Indre By, Vesterbro, Nørrebro, Østerbro og Frederiksberg – er mobil bilvask ofte den eneste måde at få vasket bil uden at opgive sin parkeringsplads. I forstæderne handler det mere om tid: man har pladsen, men ikke lysten til at bruge lørdagen på det.",
          "Vi kører i hele ringen omkring København: nord til Gentofte og Lyngby, vest til Ballerup og Glostrup, syd til Hvidovre, Brøndby og Amager.",
        ],
      },
      {
        h: "Bybilens tre problemer",
        p: [
          "Biler i Storkøbenhavn kører korte ture i tæt trafik. Det giver bremsestøv på fælgene, sod og dækstøv på lakken og fugt i kabinen, fordi bilen aldrig bliver kørt varm. Alle tre ting løses af en fast rytme: udvendig vask cirka en gang om måneden og indvendig rengøring fire til seks gange om året.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan I vaske min bil, når jeg bor i lejlighed uden egen parkering?",
        a: "Ja. Vi medbringer vand og strøm og kan vaske bilen på gaden eller i gården, når den holder lovligt, og vask er tilladt på stedet.",
      },
      {
        q: "Hvilke kommuner dækker I i Storkøbenhavn?",
        a: "København, Frederiksberg, Gentofte, Lyngby-Taarbæk, Gladsaxe, Herlev, Ballerup, Rødovre, Hvidovre, Brøndby, Glostrup, Albertslund, Vallensbæk, Ishøj, Høje-Taastrup, Tårnby og Dragør.",
      },
      {
        q: "Kan I komme samme dag?",
        a: "Ofte, hvis der er ledige tider. Bookingen viser de tider, vi kan nå – tidligst et par timer frem.",
      },
      {
        q: "Hvad koster bilvask i Storkøbenhavn?",
        a: "Udvendig bilvask 450–899 kr., indvendig rengøring 600–899 kr. og hele bilen 799–1.500 kr. afhængigt af bilens størrelse.",
      },
    ],
    keywords: ["bilvask Storkøbenhavn", "mobil bilvask Storkøbenhavn", "bilvask hovedstadsområdet", "bilvask nær mig"],
    image: { src: "/service/udenfor.jpg", alt: "Mobil bilvask på gaden i Storkøbenhavn" },
    related: [
      "/bilvask-koebenhavn",
      "/bilvask-vestegnen",
      "/bilvask-nordsjaelland",
      "/bilvask-lejlighed",
      "/bilvask-naer-mig",
      "/bilvask-priser",
    ],
    area: {
      name: "Storkøbenhavn",
      kommune: "København og de omkringliggende kommuner",
      postal: "",
      nearby: [
        "København",
        "Indre By",
        "Frederiksberg",
        "Østerbro",
        "Nørrebro",
        "Vesterbro",
        "Amager",
        "Valby",
        "Vanløse",
        "Brønshøj",
        "Bispebjerg",
        "Hellerup",
        "Gentofte",
        "Charlottenlund",
        "Lyngby",
        "Søborg",
        "Gladsaxe",
        "Herlev",
        "Ballerup",
        "Rødovre",
        "Hvidovre",
        "Tårnby",
        "Kastrup",
        "Dragør",
      ],
    },
  }),

  regionPage({
    slug: "bilvask-vestegnen",
    title: "Bilvask Vestegnen – private, firmaer og foreninger",
    description:
      "Mobil bilvask på Vestegnen: Rødovre, Hvidovre, Brøndby, Glostrup, Albertslund, Taastrup og Ishøj. Til privatbiler, varevogne og hele p-pladser.",
    h1: "Bilvask Vestegnen",
    eyebrow: "Vest for København",
    intro:
      "Vestegnen er boligområder, erhvervskvarterer og motorveje vævet sammen. Vi vasker biler alle tre steder – én ad gangen eller mange på én dag.",
    answer:
      "CleanWash tilbyder mobil bilvask på hele Vestegnen. Vi kommer med eget vand og strøm til private adresser, virksomheder og boligforeninger. Personbiler vaskes udvendigt fra 450 kr., varevogne fra 899 kr. Faste aftaler tilbydes til erhverv.",
    sections: [
      {
        h: "Til virksomheder med biler på vejen",
        p: [
          "Vestegnen er hjemsted for håndværkere, servicefirmaer, transportvirksomheder og lagre. Fælles for dem er, at bilerne er på vejen hele dagen og er en del af firmaets ansigt.",
          "Vi vasker på jeres plads, når bilerne alligevel holder stille. I slipper for at sende medarbejdere i vaskehal, og I kender prisen pr. bil på forhånd.",
        ],
        list: [
          "Varevogn udvendigt: 899 kr.",
          "Varevogn, førerkabine indvendigt: 899 kr.",
          "Varevogn, hele bilen: 1.500 kr.",
          "Faste aftaler og samlet faktura for flere biler",
        ],
      },
      {
        h: "Til boligforeninger og naboer",
        p: [
          "Mange på Vestegnen bor i almene boliger, andelsboliger eller rækkehusbebyggelser med fælles parkering. Dér kan en enkelt beboer booke os – eller foreningen kan aftale en vaskedag, hvor alle, der vil, får vasket bil på p-pladsen.",
          "Det giver os en effektiv dag og beboerne en nem løsning. Kontakt os, hvis din afdelingsbestyrelse vil høre mere.",
        ],
      },
      {
        h: "Til dig, der bare vil have en ren bil",
        p: [
          "De fleste af vores besøg er helt almindelige: én bil, én indkørsel, én time. Du booker online, vi kommer til tiden, og du betaler, når bilen er færdig. Vestegnens motorveje giver rigeligt med vejfilm, så en vask hver tredje til fjerde uge er et godt udgangspunkt.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvilke byer hører til jeres område på Vestegnen?",
        a: "Rødovre, Hvidovre, Brøndby, Glostrup, Albertslund, Vallensbæk, Ishøj, Taastrup, Hedehusene, Ballerup, Skovlunde og Herlev.",
      },
      {
        q: "Kan en boligforening booke en fælles vaskedag?",
        a: "Ja. Vi aftaler en dag, og beboerne booker selv deres bil. Kontakt os for at høre, hvordan det foregår.",
      },
      {
        q: "Tilbyder I fast pris til firmaer?",
        a: "Ja. Virksomheder med flere biler kan få en fast aftale med faste vaskedage og samlet faktura.",
      },
      {
        q: "Vasker I varevogne indvendigt i varerummet?",
        a: "Den indvendige rengøring gælder førerkabinen. Har I brug for rengøring af varerummet, så kontakt os, og beskriv opgaven.",
      },
    ],
    keywords: ["bilvask Vestegnen", "mobil bilvask Vestegnen", "varevogn vask Vestegnen", "erhverv bilvask Vestegnen"],
    image: { src: "/bilsize/varevogn.png", alt: "Varevogn – mobil bilvask til erhverv på Vestegnen" },
    related: [
      "/bilvask-storkoebenhavn",
      "/bilvask-servicebiler",
      "/bilvask-boligforening",
      "/bilvask-varevogn",
      "/erhverv/flaadeaftale",
      "/bilvask-priser",
    ],
    area: {
      name: "Vestegnen",
      kommune: "Kommunerne vest for København",
      postal: "",
      nearby: [
        "Rødovre",
        "Hvidovre",
        "Brøndby",
        "Glostrup",
        "Albertslund",
        "Vallensbæk",
        "Ishøj",
        "Taastrup",
        "Hedehusene",
        "Ballerup",
        "Skovlunde",
        "Herlev",
        "Greve",
      ],
    },
  }),

  regionPage({
    slug: "bilvask-vestsjaelland",
    title: "Bilvask Vestsjælland – sådan booker du",
    description:
      "Mobil bilvask i Vestsjælland: Holbæk, Slagelse, Sorø, Ringsted, Korsør og Kalundborg. Se hvordan booking og kørsel fungerer længere fra København.",
    h1: "Bilvask Vestsjælland",
    eyebrow: "Holbæk · Slagelse · Kalundborg",
    intro:
      "Mobil bilvask er ikke kun for hovedstaden. Vi kører også i Vestsjælland. Her kan du læse, hvordan det foregår, når afstandene er større.",
    answer:
      "CleanWash tilbyder mobil bilvask i Vestsjælland efter ledige tider – blandt andet i Holbæk, Ringsted, Sorø, Slagelse, Korsør og Kalundborg. Pakkepriserne er de samme som i København: udvendig vask fra 450 kr., hele bilen fra 799 kr.",
    sections: [
      {
        h: "Sådan fungerer det, når vi kører langt",
        p: [
          "I København kan vi nå mange adresser på en dag. I Vestsjælland bruger vi mere tid på vejen. Derfor samler vi besøgene, så en dag i for eksempel Slagelse og Sorø er fyldt godt op.",
          "For dig betyder det tre ting. Book gerne nogle dage frem. Vær fleksibel med tidspunktet, hvis du kan. Og gå gerne sammen med en nabo, kollega eller familie i nærheden – flere biler i samme område gør det lettere for os at komme.",
        ],
      },
      {
        h: "Pris og kørselstillæg",
        p: [
          "Pakkepriserne ændrer sig ikke med postnummeret. En udvendig vask af en mellemklassebil koster 600 kr. i Kalundborg ligesom på Østerbro. Hvis der gælder et kørselstillæg for en adresse, vises det i prissummen, før du bekræfter bookingen. Du betaler aldrig noget, du ikke har set på forhånd.",
        ],
      },
      {
        h: "Vestsjællands biler",
        p: [
          "Her kører man langt. Motorvejene E20 og rute 21 bærer pendlere mod København og Storebælt, og landevejene imellem er lange. Det giver insekter, tjærepletter og salt – og kabiner, der bruges mange timer om ugen. Hele bilen er derfor et godt valg første gang.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kører I fast i Vestsjælland?",
        a: "Vi kører i Vestsjælland, når der er ledige tider. Bookingen viser, hvilke dage vi kan være på din adresse.",
      },
      {
        q: "Er bilvask dyrere i Vestsjælland?",
        a: "Pakkepriserne er de samme. Et eventuelt kørselstillæg vises tydeligt, inden du bekræfter.",
      },
      {
        q: "Hvordan øger jeg chancen for en tid?",
        a: "Book nogle dage frem, og saml gerne flere biler på samme adresse eller i samme by.",
      },
      {
        q: "Hvilke byer dækker I?",
        a: "Blandt andet Holbæk, Ringsted, Sorø, Slagelse, Korsør, Kalundborg og Lejre.",
      },
    ],
    keywords: ["bilvask Vestsjælland", "mobil bilvask Vestsjælland", "bilvask hjemme Vestsjælland", "bilrengøring Vestsjælland"],
    image: { src: "/service/helebil.jpg", alt: "Mobil bilvask i Vestsjælland" },
    related: [
      "/bilvask-sjaelland",
      "/bilvask-sydsjaelland",
      "/bilvask-flere-biler",
      "/komplet-bilvask",
      "/mobil-bilvask",
      "/bilvask-priser",
    ],
    area: {
      name: "Vestsjælland",
      kommune: "Fra Isefjord til Storebælt",
      postal: "",
      nearby: ["Holbæk", "Ringsted", "Sorø", "Slagelse", "Korsør", "Kalundborg", "Lejre", "Roskilde"],
    },
  }),

  regionPage({
    slug: "bilvask-sydsjaelland",
    title: "Bilvask Sydsjælland – mobil bilvask på adressen",
    description:
      "Mobil bilvask i Sydsjælland: Køge, Næstved, Haslev og Vordingborg. Vi kommer med vand og strøm. Udvendig vask fra 450 kr., hele bilen fra 799 kr.",
    h1: "Bilvask Sydsjælland",
    eyebrow: "Køge · Næstved · Vordingborg",
    intro:
      "Fra Køge Bugt til Storstrømmen: vi kører i Sydsjælland og vasker bilen dér, hvor du bor eller arbejder.",
    answer:
      "CleanWash tilbyder mobil bilvask i Sydsjælland, blandt andet i Køge, Næstved, Haslev og Vordingborg, efter ledige tider. Vi medbringer vand og strøm. Udvendig bilvask koster fra 450 kr., indvendig rengøring fra 600 kr. og hele bilen fra 799 kr.",
    sections: [
      {
        h: "Hvor ofte bør bilen vaskes hernede?",
        p: [
          "Sydsjælland er landbrugsland med kyst på flere sider. Det giver en blanding af markstøv, mudder og salt. Hvor ofte bilen har brug for vask, afhænger af, hvordan den bruges.",
        ],
        list: [
          "Pendlerbil på Sydmotorvejen: hver tredje uge – og hver anden uge i saltsæsonen.",
          "Hverdagsbil i byen: en gang om måneden udvendigt.",
          "Bil på landet med grus- og markveje: hver tredje uge, så mudder ikke bliver siddende.",
          "Indvendigt for alle: fire til seks gange om året, oftere med børn eller hund.",
        ],
      },
      {
        h: "Fra Køge til Vordingborg",
        p: [
          "Jo tættere du bor på Køge, jo flere tider er der som regel at vælge imellem. Længere mod syd, omkring Næstved og Vordingborg, planlægger vi i ruter, og dér betaler det sig at booke lidt frem.",
        ],
      },
      {
        h: "Samme pakker, samme fremgangsmåde",
        p: [
          "Du booker online med nummerpladen. Vi kommer med vand, strøm og udstyr. Bilen vaskes i hånden. Du betaler, når den er færdig. Sådan er det i København, og sådan er det i Sydsjælland.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvilke byer i Sydsjælland kører I i?",
        a: "Blandt andet Køge, Næstved, Haslev og Vordingborg. Prøv din adresse i bookingen for at se ledige tider.",
      },
      {
        q: "Hvor ofte skal en pendlerbil vaskes om vinteren?",
        a: "Hver anden uge i perioder med salt på vejene, hvis du kører dagligt på motorvej.",
      },
      {
        q: "Koster det ekstra, at I kører til Sydsjælland?",
        a: "Pakkepriserne er de samme. Gælder der et kørselstillæg for din adresse, vises det, før du bekræfter.",
      },
      {
        q: "Kan I vaske flere biler på en gård eller i en landsby samme dag?",
        a: "Ja, og det gør det lettere at finde en tid. Bil nummer to på samme adresse får 15 % rabat på grundprisen.",
      },
    ],
    keywords: ["bilvask Sydsjælland", "mobil bilvask Sydsjælland", "bilvask hjemme Sydsjælland", "bilrengøring Sydsjælland"],
    image: { src: "/service/udenfor.jpg", alt: "Mobil bilvask i Sydsjælland" },
    related: [
      "/bilvask-sjaelland",
      "/bilvask-vestsjaelland",
      "/bilvask-foer-vinter",
      "/bilvask-flere-biler",
      "/blog/vejsalt-og-rust-paa-bilen",
      "/bilvask-priser",
    ],
    area: {
      name: "Sydsjælland",
      kommune: "Fra Køge Bugt til Storstrømmen",
      postal: "",
      nearby: ["Køge", "Næstved", "Haslev", "Vordingborg", "Ringsted", "Solrød Strand"],
    },
  }),
];
