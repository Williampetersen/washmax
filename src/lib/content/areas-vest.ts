import { areaPage, type ContentPage } from "./types";

// Vestegnen og Køge Bugt: fra Rødovre til Solrød Strand.
export const areasVest: ContentPage[] = [
  areaPage({
    slug: "bilvask-rodovre",
    title: "Bilvask Rødovre – mobil bilvask ved din bolig",
    description:
      "Mobil bilvask i Rødovre og Islev. Vi vasker bilen ved lejligheden, rækkehuset eller villaen med eget vand og strøm. Udvendig vask fra 450 kr.",
    h1: "Bilvask Rødovre",
    eyebrow: "2610 Rødovre",
    intro:
      "I Rødovre kører de fleste korte ture: til centret, til arbejde, til Damhussøen. Korte ture slider mere på bilen, end man tror – vi holder den i form.",
    answer:
      "CleanWash tilbyder mobil bilvask i hele Rødovre, også Islev og Irmabyen. Vi kommer til adressen med eget vand og strøm. Udvendig bilvask koster fra 450 kr., indvendig rengøring fra 600 kr. og hele bilen fra 799 kr.",
    sections: [
      {
        h: "Korte ture giver sorte fælge og duggede ruder",
        p: [
          "Bykørsel betyder mange opbremsninger. Hver gang afgiver bremserne varmt metalstøv, som lander på fælgene og brænder sig fast. Efter få uger er sølvfarvede fælge blevet grå, og i hjørnerne er de sorte.",
          "Indvendigt når bilen aldrig at blive varm nok til at tørre ud. Fugten fra våde sko og overtøj bliver i kabinen, og ruderne dugger. En fedtet hinde på indersiden af ruden gør det værre, fordi duggen sætter sig i den.",
        ],
      },
      {
        h: "Det gør vi ved det",
        p: [
          "Udvendigt renser vi fælge, dæksider og hjulbuer som en fast del af vasken. Sidder bremsestøvet rigtig godt fast, kan fælgrens vælges til.",
          "Indvendigt pudser vi ruderne, så hinden forsvinder. Det giver mindre dug og markant bedre udsyn i mørke og modlys. Måtterne bliver rengjort, så de ikke ligger og holder på fugt.",
        ],
      },
      {
        h: "Lejlighed, rækkehus eller villa",
        p: [
          "Rødovre har alle boligformer. Ved villaerne i Islev vasker vi i indkørslen. Ved rækkehusene i parkeringslommen. Og ved etageboligerne på p-pladsen, når boligselskabet tillader det. Vi har alt med og skal ikke låne noget.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvorfor dugger mine ruder hele tiden?",
        a: "Typisk på grund af fugt i kabinen og en fedtet hinde på rudens inderside. Rene ruder og tørre måtter hjælper meget.",
      },
      {
        q: "Er fælgrens med i den udvendige vask?",
        a: "Fælgene vaskes altid. Fælgrens til 149 kr. er en dybere behandling til fastbrændt bremsestøv.",
      },
      {
        q: "Kan I vaske ved en etagebolig i Rødovre?",
        a: "Ja, hvis vask er tilladt på p-pladsen. Tjek husordenen, og oplys blok og plads i bookingen.",
      },
      {
        q: "Hvor ofte bør en bybil vaskes?",
        a: "Udvendigt cirka en gang om måneden. Indvendigt fire til seks gange om året.",
      },
    ],
    keywords: ["bilvask Rødovre", "mobil bilvask Rødovre", "bilvask Islev", "bilvask 2610"],
    image: { src: "/home/wash-tire.jpg", alt: "Vask af fælg med børste ved bilvask i Rødovre" },
    related: [
      "/bilvask-vanlose",
      "/bilvask-hvidovre",
      "/bilvask-glostrup",
      "/bilvask-broenshoej",
      "/faelgrens",
      "/blog/dug-paa-ruderne-indvendigt",
    ],
    area: {
      name: "Rødovre",
      kommune: "Rødovre Kommune",
      postal: "2610",
      nearby: ["Vanløse", "Hvidovre", "Glostrup", "Brøndby", "Herlev", "Brønshøj"],
    },
  }),

  areaPage({
    slug: "bilvask-brondby",
    title: "Bilvask Brøndby – privat og erhverv",
    description:
      "Mobil bilvask i Brøndbyøster, Brøndbyvester og Brøndby Strand. Vi vasker privatbiler og varevogne på adressen med vand og strøm. Fra 450 kr.",
    h1: "Bilvask Brøndby",
    eyebrow: "2605 Brøndby · 2660 Brøndby Strand",
    intro:
      "Brøndby er tre byer i én – og en af Vestegnens store erhvervskommuner. Vi vasker både familiens bil og firmaets varevogne.",
    answer:
      "CleanWash tilbyder mobil bilvask i Brøndbyøster, Brøndbyvester og Brøndby Strand. Vi kommer med eget vand og strøm. Personbiler vaskes udvendigt fra 450 kr. Varevogne koster 899 kr. udvendigt og 1.500 kr. for hele bilen.",
    sections: [
      {
        h: "Varevogne og servicebiler i erhvervsområderne",
        p: [
          "I Brøndbys erhvervskvarterer holder der varevogne i lange rækker. De kører ud til kunder hver dag og er virksomhedens visitkort. Støvede sider og en førerkabine fuld af kaffekopper og følgesedler giver ikke det bedste indtryk.",
          "Vi vasker bilerne på jeres egen plads. Det kan være en fast dag om måneden eller efter behov. Bilerne er ikke ude af drift, og ingen medarbejder skal bruge tid på det.",
        ],
        list: [
          "Udvendig vask af varevogn: 899 kr.",
          "Indvendig rengøring af førerkabine: 899 kr.",
          "Hele bilen: 1.500 kr.",
        ],
      },
      {
        h: "Brøndby Strand: højhuse og havluft",
        p: [
          "I Brøndby Strand holder bilerne på store p-pladser ved boligblokkene, få hundrede meter fra Køge Bugt. Vinden fra bugten bærer salt og sand med sig. Det lægger sig på bilerne og kradser i lakken, hvis det tørres af.",
          "Vi kan vaske på p-pladsen, når boligselskabet tillader det. Vand og strøm har vi med.",
        ],
      },
      {
        h: "Brøndbyøster og Brøndbyvester",
        p: [
          "I de ældre kvarterer med villaer og rækkehuse vasker vi i indkørslen. Mange kører dagligt på de store motorveje, der mødes lige her. Det giver vejfilm året rundt og salt om vinteren.",
        ],
      },
    ],
    faqs: [
      {
        q: "Vasker I varevogne for virksomheder i Brøndby?",
        a: "Ja. Vi vasker både enkelte varevogne og hele bilparker. Kontakt os for en fast aftale.",
      },
      {
        q: "Hvad er med i indvendig rengøring af en varevogn?",
        a: "Førerkabinen: støvsugning, aftørring af flader og paneler, måtter og ruder indefra.",
      },
      {
        q: "Kan I vaske på p-pladsen ved højhusene i Brøndby Strand?",
        a: "Ja, hvis boligselskabet tillader det. Oplys blok og plads, når du booker.",
      },
      {
        q: "Kan en virksomhed betale med faktura?",
        a: "Ja. Erhvervskunder faktureres efter aftale.",
      },
    ],
    keywords: ["bilvask Brøndby", "bilvask Brøndby Strand", "varevogn vask Brøndby", "mobil bilvask Brøndby"],
    image: { src: "/bilsize/varevogn.png", alt: "Varevogn – vask af firmabiler i Brøndby" },
    related: [
      "/bilvask-hvidovre",
      "/bilvask-glostrup",
      "/bilvask-vallensbaek",
      "/bilvask-varevogn",
      "/bilvask-servicebiler",
      "/erhverv/flaadeaftale",
    ],
    area: {
      name: "Brøndby",
      kommune: "Brøndby Kommune",
      postal: "2605",
      nearby: ["Hvidovre", "Glostrup", "Vallensbæk", "Rødovre", "Albertslund", "Ishøj"],
    },
  }),

  areaPage({
    slug: "bilvask-glostrup",
    title: "Bilvask Glostrup – sådan foregår et besøg",
    description:
      "Mobil bilvask i Glostrup, Hvissinge og Ejby. Se trin for trin, hvad der sker, når vi kommer til din adresse med vand og strøm. Fra 450 kr.",
    h1: "Bilvask Glostrup",
    eyebrow: "2600 Glostrup",
    intro:
      "Har du aldrig prøvet mobil bilvask før? Her er, hvad der helt konkret sker, når du booker en tid i Glostrup.",
    answer:
      "CleanWash tilbyder mobil bilvask i Glostrup, Hvissinge og Ejby. Du booker online, og vi kommer til din adresse med eget vand og strøm. Udvendig bilvask tager cirka 65 minutter og koster fra 450 kr. Du betaler, når bilen er færdig.",
    sections: [
      {
        h: "Før vi kommer",
        p: [
          "Du booker på hjemmesiden. Nummerpladen fortæller os bilens mærke, model og størrelse, så prisen er rigtig fra start. Du vælger pakke, eventuelle tilvalg og et tidspunkt. Bekræftelsen kommer på mail.",
          "På dagen skal bilen holde, så vi kan gå rundt om den. Tag værdigenstande ud, hvis vi skal gøre rent indvendigt.",
        ],
      },
      {
        h: "Mens vi vasker",
        p: [
          "Vi ankommer med vand, strøm og udstyr. Bilen skylles og dækkes med skum, der løsner snavset. Derefter håndvasker vi lakken, renser fælge og hjulbuer, skyller og tørrer bilen af, så den ikke får kalkpletter.",
          "Har du valgt indvendig rengøring, støvsuger vi sæder, gulv, måtter og bagagerum. Instrumentbræt, konsol og dørpaneler tørres af, og ruderne pudses indefra.",
        ],
        list: [
          "Udvendig bilvask: cirka 65 minutter",
          "Indvendig rengøring: cirka 75 minutter",
          "Hele bilen med voks: cirka 110 minutter",
        ],
      },
      {
        h: "Når vi er færdige",
        p: [
          "Du får besked, når bilen er klar. Kig den gerne igennem, mens vi er der. Betalingen sker bagefter, for eksempel med MobilePay.",
          "Vi kører i hele Glostrup – fra villavejene i Hvissinge til erhvervsområdet i Ejby og kvartererne omkring hospitalet og stationen.",
        ],
      },
    ],
    faqs: [
      {
        q: "Skal jeg være til stede under bilvasken?",
        a: "Ikke ved en udvendig vask. Ved indvendig rengøring skal vi have adgang til kabinen, så vi aftaler nøgleoverdragelse.",
      },
      {
        q: "Hvad sker der, hvis I bliver forsinket?",
        a: "Så kontakter vi dig hurtigst muligt. Trafikken på Vestegnen kan drille, men vi planlægger med luft mellem besøgene.",
      },
      {
        q: "Kan jeg tilføje tilvalg på dagen?",
        a: "Ofte ja, hvis der er tid i kalenderen. Det sikreste er at vælge tilvalg, når du booker.",
      },
      {
        q: "Hvad hvis jeg ikke er tilfreds?",
        a: "Sig det med det samme, eller kontakt os inden for kort tid. Så finder vi en løsning.",
      },
    ],
    keywords: ["bilvask Glostrup", "mobil bilvask Glostrup", "bilvask Hvissinge", "bilvask 2600"],
    image: { src: "/service/udenfor.jpg", alt: "Bilvask med skum og skyl på adresse i Glostrup" },
    related: [
      "/bilvask-brondby",
      "/bilvask-albertslund",
      "/bilvask-rodovre",
      "/bilvask-skovlunde",
      "/mobil-bilvask",
      "/blog/hvor-lang-tid-tager-en-bilvask",
    ],
    area: {
      name: "Glostrup",
      kommune: "Glostrup Kommune",
      postal: "2600",
      nearby: ["Brøndby", "Albertslund", "Rødovre", "Skovlunde", "Ballerup", "Taastrup"],
    },
  }),

  areaPage({
    slug: "bilvask-albertslund",
    title: "Bilvask Albertslund – vask på den fælles p-plads",
    description:
      "Mobil bilvask i Albertslund. Bilen holder langt fra din vandhane – vi kommer med eget vand og strøm og vasker på p-pladsen. Fra 450 kr.",
    h1: "Bilvask Albertslund",
    eyebrow: "2620 Albertslund",
    intro:
      "Albertslund er bygget, så bilerne holder for sig og boligerne for sig. Smart for børnene – besværligt, når bilen skal vaskes. Medmindre vasken kommer til bilen.",
    answer:
      "CleanWash tilbyder mobil bilvask i Albertslund. Vi kommer til p-pladsen med eget vand og strøm, så det ikke betyder noget, at bilen holder langt fra boligen. Udvendig bilvask fra 450 kr., hele bilen fra 799 kr.",
    sections: [
      {
        h: "En by med adskilt trafik",
        p: [
          "I store dele af Albertslund er boligområderne bilfri. Man parkerer på fælles pladser i udkanten af kvarteret og går det sidste stykke hjem ad stierne. Det er trygt og roligt, men det betyder også, at der er hundrede meter eller mere fra bilen til den nærmeste vandhane og stikkontakt.",
          "Derfor passer mobil bilvask med eget vand og strøm usædvanligt godt her. Vi har ikke brug for noget fra din bolig. Vi skal bare vide, hvilken plads bilen holder på.",
        ],
      },
      {
        h: "Aftal det med boligafdelingen",
        p: [
          "P-pladserne tilhører typisk boligafdelingen eller grundejerforeningen. De fleste steder er bilvask ikke noget problem, men reglerne varierer. Spørg afdelingsbestyrelsen eller ejendomskontoret, inden du booker første gang.",
          "Er der flere naboer, der gerne vil have vasket bil, kan vi tage flere biler på samme plads i ét besøg.",
        ],
      },
      {
        h: "Vestskoven og erhvervsområderne",
        p: [
          "Bor du op mod Vestskoven, kommer der pollen, blade og fugleklatter på bilen. Arbejder du i Hersted Industripark, er det støv og vejsnavs. Begge dele klarer en udvendig håndvask.",
        ],
      },
    ],
    faqs: [
      {
        q: "Min bil holder langt fra huset. Er det et problem?",
        a: "Nej. Vi medbringer vand og strøm og vasker bilen på p-pladsen. Skriv pladsens navn eller nummer i bookingen.",
      },
      {
        q: "Må man få vasket bil på de fælles p-pladser?",
        a: "Det afgør boligafdelingen eller grundejerforeningen. Tjek reglerne, før du booker.",
      },
      {
        q: "Kan flere naboer booke samtidig?",
        a: "Ja. Kontakt os, så planlægger vi et samlet besøg på jeres p-plads.",
      },
      {
        q: "Hvad koster hele bilen for en lille bil?",
        a: "799 kr. inklusive udvendig vask, indvendig rengøring og voks.",
      },
    ],
    keywords: ["bilvask Albertslund", "mobil bilvask Albertslund", "bilvask 2620", "bilrengøring Albertslund"],
    image: { src: "/service/helebil.jpg", alt: "Mobil bilvask på fælles parkeringsplads i Albertslund" },
    related: [
      "/bilvask-glostrup",
      "/bilvask-taastrup",
      "/bilvask-brondby",
      "/bilvask-vallensbaek",
      "/bilvask-boligforening",
      "/bilvask-lejlighed",
    ],
    area: {
      name: "Albertslund",
      kommune: "Albertslund Kommune",
      postal: "2620",
      nearby: ["Glostrup", "Taastrup", "Brøndby", "Vallensbæk", "Ballerup", "Smørum"],
    },
  }),

  areaPage({
    slug: "bilvask-vallensbaek",
    title: "Bilvask Vallensbæk – mobil bilvask ved stranden",
    description:
      "Mobil bilvask i Vallensbæk og Vallensbæk Strand. Vi fjerner sand, salt og hverdagssnavs på din adresse med eget vand og strøm. Fra 450 kr.",
    h1: "Bilvask Vallensbæk",
    eyebrow: "2625 Vallensbæk · 2665 Vallensbæk Strand",
    intro:
      "Vallensbæk er en lille kommune med både strandpark, havn og mose. Vi vasker bilen hjemme hos dig – nord eller syd for motorvejen.",
    answer:
      "CleanWash tilbyder mobil bilvask i Vallensbæk og Vallensbæk Strand. Vi kommer til adressen med eget vand og strøm. Udvendig bilvask koster fra 450 kr., indvendig rengøring fra 600 kr. og hele bilen fra 799 kr.",
    sections: [
      {
        h: "Strandparken sætter sig i bilen",
        p: [
          "Køge Bugt Strandpark ligger for enden af vejen, og hele sommeren kører bilen frem og tilbage med badetøj, paddleboards og sandede børn. Sandet ender i fodrummet og bliver trådt ned i tæpperne.",
          "Fint sand er sværere at få op end groft. Det kræver en kraftig støvsuger og tålmodighed langs sædeskinner, under sæder og i bagagerummets hjørner. Det er en fast del af vores indvendige rengøring.",
        ],
      },
      {
        h: "Havnen og vinden",
        p: [
          "Omkring Vallensbæk Havn er der sjældent vindstille. Vinden bærer saltdis ind over de nærmeste veje. Biler, der holder ude, får en mat hinde på ruder og lak. Den skal vaskes af med sæbe – regn alene fjerner den ikke.",
        ],
      },
      {
        h: "Rækkehuse med korte indkørsler",
        p: [
          "En stor del af Vallensbæk er rækkehuse og tætliggende parcelhuse. Vi kan arbejde på lidt plads. Bilen skal bare holde, så dørene kan åbnes, og vi kan komme omkring den.",
          "Rider du, eller har du hund med i mosen, kender du også hår og halm i bagagerummet. Fjernelse af dyrehår kan vælges til for 200 kr.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan I få fint strandsand op af tæpperne?",
        a: "Ja. Vi støvsuger grundigt og går efter de steder, hvor sandet gemmer sig: sædeskinner, sømme og hjørner.",
      },
      {
        q: "Dækker I både Vallensbæk Nord og Strand?",
        a: "Ja, hele kommunen er med – og nabobyerne Ishøj, Brøndby og Albertslund.",
      },
      {
        q: "Hvad koster fjernelse af hestehår og hundehår?",
        a: "Tilvalget dyrehår koster 200 kr. og omfatter sæder, måtter og bagagerum.",
      },
      {
        q: "Kan jeg få vasket bil i weekenden?",
        a: "Ja, vi kører alle ugens dage.",
      },
    ],
    keywords: ["bilvask Vallensbæk", "bilvask Vallensbæk Strand", "mobil bilvask Vallensbæk", "bilvask 2665"],
    image: { src: "/service/inside.jpg", alt: "Støvsugning af sand i bil i Vallensbæk Strand" },
    related: [
      "/bilvask-ishoj",
      "/bilvask-brondby",
      "/bilvask-albertslund",
      "/bilvask-i-weekenden",
      "/fjernelse-af-dyrehaar-bil",
      "/blog/sand-i-bilen-efter-stranden",
    ],
    area: {
      name: "Vallensbæk",
      kommune: "Vallensbæk Kommune",
      postal: "2625",
      nearby: ["Ishøj", "Brøndby", "Albertslund", "Glostrup", "Taastrup"],
    },
  }),

  areaPage({
    slug: "bilvask-ishoj",
    title: "Bilvask Ishøj – vi kommer til bilen",
    description:
      "Mobil bilvask i Ishøj, ved boligblokken, villaen eller virksomheden. Vi har vand og strøm med. Udvendig vask fra 450 kr., varevogn fra 899 kr.",
    h1: "Bilvask Ishøj",
    eyebrow: "2635 Ishøj",
    intro:
      "Strand, bycenter, landsby og et af Sjællands store erhvervsområder – Ishøj rummer det hele. Og bilerne skal vaskes alle steder.",
    answer:
      "CleanWash tilbyder mobil bilvask i Ishøj. Vi kommer til adressen med eget vand og strøm og vasker privatbiler, firmabiler og varevogne. Udvendig bilvask fra 450 kr. Hele bilen fra 799 kr.",
    sections: [
      {
        h: "Tre slags Ishøj",
        p: [
          "Omkring bycentret bor man i etageboliger med p-pladser foran blokkene. I Ishøj Landsby og Tranegilde holder bilen i indkørslen bag stengærdet. Og i erhvervsområdet står lastbiler og varevogne side om side.",
          "Vi vasker alle tre steder. Det eneste, der ændrer sig, er, hvor vi parkerer vores bil.",
        ],
      },
      {
        h: "Biler i erhvervsområdet",
        p: [
          "Ishøj er et knudepunkt for transport og lager. Varevogne og firmabiler kører lange dage på motorvejen og kommer hjem med et lag vejfilm, som tryklufttørrede vaskehaller sjældent får helt af.",
          "En håndvask fjerner filmen, også på bagdøre og i dørkarme, hvor snavset samler sig. Førerkabinen kan rengøres i samme besøg.",
        ],
      },
      {
        h: "Efter en dag ved Ishøj Strand",
        p: [
          "Stranden ved Arken trækker folk fra hele Vestegnen. Bor du i Ishøj, er du der ofte – og sandet følger med hjem. Vælg indvendig rengøring, når tæpperne begynder at knase.",
        ],
      },
    ],
    faqs: [
      {
        q: "Vasker I ved boligblokkene omkring Ishøj Bycenter?",
        a: "Ja, hvis vask er tilladt på p-pladsen. Spørg ejendomskontoret, og oplys blok og plads i bookingen.",
      },
      {
        q: "Hvad koster vask af en firma-varevogn?",
        a: "899 kr. udvendigt, 899 kr. indvendigt eller 1.500 kr. for hele bilen.",
      },
      {
        q: "Kan I komme i Ishøj Landsby?",
        a: "Ja. Vi dækker hele postnummer 2635 inklusive landsbyen og Tranegilde.",
      },
      {
        q: "Skal jeg betale på forhånd?",
        a: "Nej. Du betaler, når vasken er udført.",
      },
      {
        q: "Kan I få sand ud af bilen efter en tur til Ishøj Strand?",
        a: "Ja. Vælg indvendig rengøring. Den omfatter grundig støvsugning af sæder, gulv, måtter og bagagerum – også nede langs sædeskinnerne, hvor sandet samler sig.",
      },
      {
        q: "Får biler i Ishøj saltskader fra Køge Bugt?",
        a: "I pålandsvind lægger der sig en fin saltfilm på biler i den sydlige del af byen. Den ses først på ruderne. En udvendig vask hver tredje uge og voks på lakken holder den nede.",
      },
    ],
    keywords: ["bilvask Ishøj", "mobil bilvask Ishøj", "bilvask 2635", "varevogn vask Ishøj"],
    image: { src: "/service/udenfor.jpg", alt: "Udvendig håndvask af bil i Ishøj" },
    related: [
      "/bilvask-vallensbaek",
      "/bilvask-greve",
      "/bilvask-taastrup",
      "/bilvask-brondby",
      "/bilvask-varevogn",
      "/bilvask-lejlighed",
    ],
    area: {
      name: "Ishøj",
      kommune: "Ishøj Kommune",
      postal: "2635",
      nearby: ["Vallensbæk", "Greve", "Taastrup", "Brøndby", "Albertslund", "Hedehusene"],
    },
  }),

  areaPage({
    slug: "bilvask-hedehusene",
    title: "Bilvask Hedehusene – væk med grusstøvet",
    description:
      "Mobil bilvask i Hedehusene og NærHeden. Vi fjerner grusstøv og byggestøv skånsomt på din adresse – vi har vand og strøm med. Fra 450 kr.",
    h1: "Bilvask Hedehusene",
    eyebrow: "2640 Hedehusene",
    intro:
      "Hedehusene ligger ved Hedeland, hvor der i årtier er gravet grus. Det giver et særligt støv i luften – og på bilerne.",
    answer:
      "CleanWash tilbyder mobil bilvask i Hedehusene, NærHeden, Fløng og Baldersbrønde. Vi kommer til adressen med eget vand og strøm. Udvendig bilvask koster fra 450 kr. og hele bilen fra 799 kr.",
    sections: [
      {
        h: "Grusstøv er hårdere end almindeligt støv",
        p: [
          "Omkring Hedehusene kører der tunge lastbiler med grus og jord. Støvet fra dem er lyst, fint og mineralsk. Det lægger sig som mel på motorhjelm og tag, og mange børster det bare af med hånden eller en klud.",
          "Det er den hurtigste vej til en ridset lak. Mineralstøv består af bittesmå, skarpe korn. De skal løftes af med vand og skum – ikke gnides hen over overfladen.",
        ],
      },
      {
        h: "NærHeden: ny bydel, nyt støv",
        p: [
          "I NærHeden bygges der stadig. Byggepladser betyder cementstøv, og det er basisk. Får det lov at ligge på lakken i fugtigt vejr, kan det efterlade matte skjolder.",
          "Bor du i bydelen, er en vask hver tredje uge en god tommelfingerregel, så længe der bygges omkring dig.",
        ],
      },
      {
        h: "Fra Fløng til Baldersbrønde",
        p: [
          "Vi kører i hele området omkring Hedehusene. I landsbyerne vasker vi på gårdspladsen eller i indkørslen. I de nye kvarterer på p-pladsen ved boligen. Du booker online og kan se prisen, så snart nummerpladen er tastet.",
        ],
      },
    ],
    faqs: [
      {
        q: "Må jeg tørre støv af bilen med en klud?",
        a: "Helst ikke. Tørt støv ridser, når det gnides. Skyl det af, eller lad os forvaske bilen med skum.",
      },
      {
        q: "Kan cementstøv skade lakken?",
        a: "Ja, hvis det får lov at ligge og blive vådt gentagne gange. Det bør vaskes af løbende.",
      },
      {
        q: "Kører I i NærHeden?",
        a: "Ja. Oplys adresse og p-plads i bookingen.",
      },
      {
        q: "Hvad koster udvendig vask af en stor bil?",
        a: "699 kr. for en stor bil eller SUV.",
      },
      {
        q: "Hvor ofte skal bilen vaskes, når der bygges lige ved siden af?",
        a: "Cirka hver tredje uge, så længe byggeriet står på. Cementstøv bør ikke ligge længe på lakken, og slet ikke i fugtigt vejr, hvor det kan sætte sig fast.",
      },
    ],
    keywords: ["bilvask Hedehusene", "mobil bilvask Hedehusene", "bilvask NærHeden", "bilvask 2640"],
    image: { src: "/service/udenfor.jpg", alt: "Skånsom forvask af støvet bil i Hedehusene" },
    related: [
      "/bilvask-taastrup",
      "/bilvask-roskilde",
      "/bilvask-ishoj",
      "/bilvask-albertslund",
      "/udvendig-bilvask-koebenhavn",
      "/blog/forvask-og-skum-hvorfor",
    ],
    area: {
      name: "Hedehusene",
      kommune: "Høje-Taastrup Kommune",
      postal: "2640",
      nearby: ["Taastrup", "Roskilde", "Ishøj", "Albertslund", "Greve"],
    },
  }),

  areaPage({
    slug: "bilvask-greve",
    title: "Bilvask Greve – slip for endnu en køretur",
    description:
      "Mobil bilvask i Greve, Hundige og Tune. Vi kommer til indkørslen med vand og strøm, så du slipper for kø og vaskehal. Hele bilen fra 799 kr.",
    h1: "Bilvask Greve",
    eyebrow: "2670 Greve",
    intro:
      "Bor du i Greve, sidder du i forvejen længe nok i kø på motorvejen. Bilvasken behøver ikke at koste dig endnu en tur.",
    answer:
      "CleanWash tilbyder mobil bilvask i Greve, Hundige, Mosede og Tune. Vi kommer til din adresse med eget vand og strøm. Udvendig bilvask koster fra 450 kr., indvendig rengøring fra 600 kr. og hele bilen fra 799 kr.",
    sections: [
      {
        h: "Tiden er den dyreste del af en bilvask",
        p: [
          "Køge Bugt Motorvejen er en af landets mest trafikerede strækninger, og pendlere fra Greve kender køerne. Når weekenden kommer, er lysten til at sætte sig ind i bilen igen for at køre i vaskehal til at overse.",
          "Mobil bilvask vender regnestykket om. Du bruger to minutter på at booke. Bilen bliver vasket i indkørslen, mens du er hjemme, på arbejde eller på stranden.",
        ],
      },
      {
        h: "Strandvejen, Mosede Havn og saltet",
        p: [
          "Langs Greve Strandvej og ned mod Mosede Havn ligger husene tæt på vandet. Her får bilerne en saltfilm i pålandsvind og sand i dørkarmene. Længere inde, i Hundige og Greve Midt, er det mere vejstøv fra de store veje.",
          "Uanset hvor i kommunen du bor, er svaret det samme: en regelmæssig håndvask og voks på lakken et par gange om året.",
        ],
      },
      {
        h: "Parcelhuse med plads til to",
        p: [
          "Greve er parcelhusenes by. De fleste indkørsler har plads til to biler, og vi vasker gerne begge i samme besøg. Bil nummer to får 15 % rabat på grundprisen.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kører I til Tune?",
        a: "Ja. Tune, Hundige, Mosede og Greve Landsby er alle med i vores område.",
      },
      {
        q: "Hvor meget tid sparer jeg med mobil bilvask?",
        a: "Typisk en til halvanden time: kørsel frem og tilbage, kø og selve vasken. Bookingen tager et par minutter.",
      },
      {
        q: "Hvor ofte skal bilen have voks?",
        a: "To til fire gange om året er passende for de fleste. Voks følger med, når du vælger Hele bilen.",
      },
      {
        q: "Giver I rabat på to biler?",
        a: "Ja, 15 % på grundprisen for bil nummer to, når de vaskes i samme besøg.",
      },
    ],
    keywords: ["bilvask Greve", "mobil bilvask Greve", "bilvask Hundige", "bilvask 2670"],
    image: { src: "/service/helebil.jpg", alt: "Mobil bilvask i indkørsel i Greve" },
    related: [
      "/bilvask-ishoj",
      "/bilvask-karlslunde",
      "/bilvask-solroed-strand",
      "/bilvask-koege",
      "/bilvask-flere-biler",
      "/bilvask-med-voks",
    ],
    area: {
      name: "Greve",
      kommune: "Greve Kommune",
      postal: "2670",
      nearby: ["Ishøj", "Karlslunde", "Solrød Strand", "Køge", "Roskilde", "Hedehusene"],
    },
  }),

  areaPage({
    slug: "bilvask-karlslunde",
    title: "Bilvask Karlslunde – bilvask hjemme hos dig",
    description:
      "Mobil bilvask i Karlslunde og Karlslunde Strand. Vi kommer til din adresse med eget vand og strøm og vasker bilen ude og inde. Fra 450 kr.",
    h1: "Bilvask Karlslunde",
    eyebrow: "2690 Karlslunde",
    intro:
      "Karlslunde er to steder: strandbyen ved bugten og landsbyen oppe ved kirken. Vi kører begge steder og vasker bilen, hvor du bor.",
    answer:
      "CleanWash tilbyder mobil bilvask i Karlslunde og Karlslunde Strand. Vi medbringer vand og strøm. Udvendig bilvask koster fra 450 kr. og tager cirka 65 minutter. Indvendig rengøring koster fra 600 kr.",
    sections: [
      {
        h: "Hvad skal jeg vælge første gang?",
        p: [
          "Mange, der booker for første gang, vælger Hele bilen. Det giver mening: har bilen ikke fået en professionel rengøring før, er der som regel noget at hente både ude og inde. Pakken tager cirka 110 minutter og inkluderer voks.",
          "Derefter kan du holde bilen ved lige med en udvendig vask en gang om måneden og en indvendig rengøring et par gange om året.",
        ],
      },
      {
        h: "Strandbyen",
        p: [
          "I Karlslunde Strand ligger villavejene mellem banen og vandet. Bilerne står ude i saltdis og blæst det meste af året. Gummilister og plastdele tørrer ud og bliver grå. Lakken mister glans.",
          "Voks på lakken og en ordentlig rengøring af lister og kanter bremser den udvikling.",
        ],
      },
      {
        h: "Landsbyen og markerne",
        p: [
          "Oppe i Karlslunde Landsby er naboerne marker. I høst og efterår betyder det støv og jord på vejene. En udvendig vask med grundig skylning af hjulbuer holder det nede.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvilken pakke anbefaler I første gang?",
        a: "Hele bilen. Så starter du fra et rent udgangspunkt ude og inde – og lakken får voks.",
      },
      {
        q: "Kan falmet plast og gummi reddes?",
        a: "Rengøring og pleje får det til at se bedre ud og bremser yderligere udtørring. Vinylpleje indvendigt kan vælges til for 249 kr.",
      },
      {
        q: "Kører I både i strandbyen og landsbyen?",
        a: "Ja, hele postnummer 2690 er dækket.",
      },
      {
        q: "Hvor lang tid i forvejen skal jeg booke?",
        a: "Du kan ofte finde en tid inden for få dage. Bookingen viser alle ledige tider.",
      },
      {
        q: "Hvor ofte bør en bil ved Karlslunde Strand vaskes?",
        a: "Hver tredje uge er passende så tæt på bugten. Efter dage med kraftig vind fra øst kan det betale sig at få saltet af lidt tidligere.",
      },
    ],
    keywords: ["bilvask Karlslunde", "mobil bilvask Karlslunde", "bilvask Karlslunde Strand", "bilvask 2690"],
    image: { src: "/home/vinyl.jpg", alt: "Pleje af instrumentbræt ved bilvask i Karlslunde" },
    related: [
      "/bilvask-greve",
      "/bilvask-solroed-strand",
      "/bilvask-koege",
      "/komplet-bilvask",
      "/vinylpleje-bil",
      "/blog/falmet-plastik-paa-bilen",
    ],
    area: {
      name: "Karlslunde",
      kommune: "Greve Kommune",
      postal: "2690",
      nearby: ["Greve", "Solrød Strand", "Køge", "Roskilde"],
    },
  }),

  areaPage({
    slug: "bilvask-solroed-strand",
    title: "Bilvask Solrød Strand – sand ud, glans ind",
    description:
      "Mobil bilvask i Solrød Strand, Jersie og Havdrup. Vi støvsuger sandet ud og vasker saltet af på din adresse. Vand og strøm har vi med.",
    h1: "Bilvask Solrød Strand",
    eyebrow: "2680 Solrød Strand",
    intro:
      "Kilometer efter kilometer med sandstrand er grunden til at bo i Solrød. Det er også grunden til, at bilen aldrig er helt fri for sand.",
    answer:
      "CleanWash tilbyder mobil bilvask i Solrød Strand, Jersie Strand og Havdrup. Vi kommer til din adresse med eget vand og strøm. Indvendig rengøring med grundig støvsugning koster fra 600 kr., hele bilen fra 799 kr.",
    sections: [
      {
        h: "Sand er kabinens værste fjende",
        p: [
          "Sand virker uskyldigt. Men hvert korn er et lille stykke kvarts, og når det ligger i tæppet, sliber det på fibrene, hver gang en fod flytter sig. Over tid bliver tæpper og måtter tynde og filtede.",
          "Sandet finder også vej ned i sædeskinnerne, hvor det blandes med fedt og giver en knasende lyd, når sædet flyttes. Vi støvsuger derfor også under og omkring sæderne.",
        ],
      },
      {
        h: "Gummimåtter om sommeren?",
        p: [
          "Et godt råd til strandfamilier: brug gummimåtter i sommerhalvåret. De fanger sandet, og det kan bankes ud på et øjeblik. Tekstilmåtter holder på det. Uanset måttetype rengør vi dem som en del af den indvendige rengøring.",
        ],
      },
      {
        h: "Udvendigt: salt og sol",
        p: [
          "På solrige dage ved vandet bager solen saltet fast på lakken. Det ses som matte pletter, når bilen er vasket. Voks beskytter mod netop det, og den følger med i pakken Hele bilen.",
          "Vi kører også i Jersie og Havdrup, hvor det mere er landevejsstøv end sand, der skal af.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan sand skade bilens tæpper?",
        a: "Ja. Sandkorn sliber på tæppefibrene og slider dem tynde over tid. Regelmæssig støvsugning forlænger tæppernes levetid.",
      },
      {
        q: "Rengør I både gummi- og tekstilmåtter?",
        a: "Ja, måtterne tages ud og rengøres som en del af den indvendige rengøring.",
      },
      {
        q: "Dækker I Havdrup?",
        a: "Ja. Havdrup, Jersie og Solrød Landsby er med i vores område.",
      },
      {
        q: "Hvornår er det bedst at få bilen vasket om sommeren?",
        a: "Når den ikke står i direkte middagssol. Vi tørrer altid bilen af, så der ikke kommer kalkpletter.",
      },
    ],
    keywords: ["bilvask Solrød Strand", "mobil bilvask Solrød", "bilvask 2680", "bilvask Havdrup"],
    image: { src: "/service/inside.jpg", alt: "Støvsugning af sand fra bilkabine i Solrød Strand" },
    related: [
      "/bilvask-greve",
      "/bilvask-karlslunde",
      "/bilvask-koege",
      "/indvendig-bilrengoering-koebenhavn",
      "/blog/sand-i-bilen-efter-stranden",
      "/blog/gummimaatter-eller-tekstilmaatter",
    ],
    area: {
      name: "Solrød Strand",
      kommune: "Solrød Kommune",
      postal: "2680",
      nearby: ["Greve", "Karlslunde", "Køge", "Roskilde"],
    },
  }),
];
