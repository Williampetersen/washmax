import { areaPage, type ContentPage } from "./types";

// Ballerup, Egedal, Frederikssund, Halsnæs og Gribskov kommuner samt Jyllinge.
export const areasNordvest: ContentPage[] = [
  areaPage({
    slug: "bilvask-ballerup",
    title: "Bilvask Ballerup – hjemme eller i Lautrupparken",
    description:
      "Mobil bilvask i Ballerup. Vi vasker bilen ved hjemmet eller på p-pladsen i Lautrupparken, mens du arbejder. Vand og strøm har vi med. Fra 450 kr.",
    h1: "Bilvask Ballerup",
    eyebrow: "2750 Ballerup",
    intro:
      "Ballerup er en af hovedstadsområdets største erhvervsbyer. Tusindvis af biler holder parkeret her hver dag – og kan blive vasket imens.",
    answer:
      "CleanWash tilbyder mobil bilvask i hele Ballerup – både ved private adresser og på virksomheders p-pladser. Vi medbringer vand og strøm. Udvendig bilvask koster fra 450 kr. og tager cirka 65 minutter.",
    sections: [
      {
        h: "Bilvask i arbejdstiden",
        p: [
          "I Lautrupparken og erhvervsområderne langs Ballerup Boulevard står bilerne stille fra morgen til eftermiddag. Det er spildtid for bilen – men ikke hvis den bliver vasket. Du booker en tid, parkerer som du plejer og kører hjem i en ren bil.",
          "Ved en udvendig vask skal du ikke aflevere nøgler. Skal bilen også rengøres indvendigt, aftaler vi, hvordan vi får adgang.",
        ],
      },
      {
        h: "Aftaler for virksomheder",
        p: [
          "Flere virksomheder tilbyder bilvask som en del af personaleplejen. Vi kommer fast en eller flere dage om måneden, og medarbejderne booker selv. Virksomhedens egne biler kan vaskes efter en plan, så de altid er klar til kundebesøg.",
        ],
      },
      {
        h: "Private adresser i Egebjerg, Pederstrup og Ballerup by",
        p: [
          "Uden for erhvervsområderne er Ballerup parcelhuse, rækkehuse og større boligbebyggelser. I villakvartererne vasker vi i indkørslen. I etagebebyggelserne vasker vi på p-pladsen, hvis boligselskabet tillader det.",
          "Bor du tæt på Frederikssundsmotorvejen eller Ring 4, får bilen et fast lag vejstøv. Det fjerner vi skånsomt med forvask og håndvask.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan min bil blive vasket, mens jeg er på arbejde i Lautrupparken?",
        a: "Ja, hvis vi må arbejde på den p-plads, du bruger. Tjek med din arbejdsgiver, og skriv placeringen i bookingen.",
      },
      {
        q: "Tilbyder I bilvask som personalegode?",
        a: "Ja. Vi laver aftaler med virksomheder om faste vaskedage på p-pladsen. Kontakt os for et forslag.",
      },
      {
        q: "Hvad koster en indvendig rengøring?",
        a: "Fra 600 kr. for en lille bil, 700 kr. for en mellemklassebil og 799 kr. for en stor bil.",
      },
      {
        q: "Dækker I også Måløv og Skovlunde?",
        a: "Ja, hele Ballerup Kommune er med i vores område.",
      },
    ],
    keywords: ["bilvask Ballerup", "mobil bilvask Ballerup", "bilvask Lautrupparken", "bilvask 2750"],
    image: { src: "/service/udenfor.jpg", alt: "Mobil bilvask på firmaparkering i Ballerup" },
    related: [
      "/bilvask-maaloev",
      "/bilvask-skovlunde",
      "/bilvask-herlev",
      "/bilvask-personalegode",
      "/bilvask-paa-arbejdspladsen",
      "/erhverv/flaadeaftale",
    ],
    area: {
      name: "Ballerup",
      kommune: "Ballerup Kommune",
      postal: "2750",
      nearby: ["Måløv", "Skovlunde", "Herlev", "Smørum", "Værløse", "Glostrup"],
    },
  }),

  areaPage({
    slug: "bilvask-maaloev",
    title: "Bilvask Måløv – vi kommer til din adresse",
    description:
      "Mobil bilvask i Måløv og Kildedal. Vi vasker bilen ved rækkehuset eller på arbejdspladsen og medbringer vand og strøm. Hele bilen fra 799 kr.",
    h1: "Bilvask Måløv",
    eyebrow: "2760 Måløv",
    intro:
      "Måløv vokser. Nye rækkehuse og boliger skyder op, og med dem biler, der holder på fælles pladser uden vand i nærheden. Dér kommer vi ind i billedet.",
    answer:
      "CleanWash tilbyder mobil bilvask i Måløv. Vi kommer til din adresse med eget vand og strøm og vasker bilen udvendigt, indvendigt eller begge dele. Priserne begynder ved 450 kr., og pakken Hele bilen koster fra 799 kr.",
    sections: [
      {
        h: "Nybyggeri og fælles parkering",
        p: [
          "I de nye kvarterer deler man ofte p-plads med naboerne. Der er hverken vandhane eller plads til en haveslange, og mange grundejerforeninger har regler for, hvad man må på fællesarealerne. Tjek derfor gerne vedtægterne først.",
          "Når det er på plads, er resten nemt: vi kommer med vand og strøm, vasker bilen på dens plads og efterlader området, som vi fandt det.",
        ],
      },
      {
        h: "Det gamle Måløv",
        p: [
          "Omkring Måløv Hovedgade og i villakvartererne har de fleste egen indkørsel. Her vasker vi bilen foran huset. Det tager cirka en time for en udvendig vask og knap to timer for hele bilen.",
        ],
      },
      {
        h: "Bil ved arbejdspladsen",
        p: [
          "Arbejder du i et af erhvervsområderne ved Måløv eller Kildedal, kan bilen vaskes på p-pladsen i løbet af dagen. Det kræver kun, at vi må være der, og at bilen er til at komme rundt om.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan I vaske på en fælles p-plads i et nyt boligområde?",
        a: "Ja, hvis grundejer- eller ejerforeningen tillader det. Det er dit ansvar at tjekke reglerne – vi sørger for resten.",
      },
      {
        q: "Efterlader I vand eller skum på pladsen?",
        a: "Vi arbejder ryddeligt og skyller efter os, så pladsen ser ordentlig ud, når vi kører.",
      },
      {
        q: "Hvor lang tid tager Hele bilen?",
        a: "Cirka 110 minutter inklusive udvendig vask, indvendig rengøring og voks.",
      },
      {
        q: "Kan jeg booke til en lørdag?",
        a: "Ja, vi kører alle ugens dage. Se de ledige tider i bookingen.",
      },
      {
        q: "Må bilen stå ved en fælles ladestander, mens den vaskes?",
        a: "Vi anbefaler, at bilen ikke lader under vasken. Tag kablet ud, eller flyt bilen til en almindelig plads, inden vi kommer. Vi bruger ikke ladestanderens strøm.",
      },
    ],
    keywords: ["bilvask Måløv", "mobil bilvask Måløv", "bilvask 2760", "bilvask Kildedal"],
    image: { src: "/service/helebil.jpg", alt: "Mobil bilvask i nyt boligområde i Måløv" },
    related: [
      "/bilvask-ballerup",
      "/bilvask-smoerum",
      "/bilvask-vaerloese",
      "/bilvask-skovlunde",
      "/bilvask-i-weekenden",
      "/komplet-bilvask",
    ],
    area: {
      name: "Måløv",
      kommune: "Ballerup Kommune",
      postal: "2760",
      nearby: ["Ballerup", "Smørum", "Værløse", "Skovlunde", "Stenløse"],
    },
  }),

  areaPage({
    slug: "bilvask-skovlunde",
    title: "Bilvask Skovlunde – mobil bilvask i 2740",
    description:
      "Bilvask i Skovlunde, hvor bilen holder. Vi kommer til rækkehuset, villaen eller virksomheden med eget vand og strøm. Udvendig vask fra 450 kr.",
    h1: "Bilvask Skovlunde",
    eyebrow: "2740 Skovlunde",
    intro:
      "Skovlunde er en lille by med stor trafik omkring sig. Vi gør det nemt at holde bilen ren uden at forlade kvarteret.",
    answer:
      "CleanWash vasker biler i hele Skovlunde. Vi kommer til adressen med vand og strøm. Du kan booke udvendig bilvask fra 450 kr., indvendig rengøring fra 600 kr. og hele bilen fra 799 kr. – alle ugens dage.",
    sections: [
      {
        h: "Hvilken pakke passer til din bil?",
        p: [
          "Det mest stillede spørgsmål er, hvad man skal vælge. Svaret afhænger af, hvor bilen er beskidt, og hvor længe siden den sidst fik en ordentlig omgang.",
        ],
        list: [
          "Er lakken grå og fælgene sorte, men kabinen fin? Vælg udvendig bilvask.",
          "Er der krummer, støv og fedtede ruder indeni? Vælg indvendig rengøring.",
          "Er det længe siden sidst – eller skal bilen sælges, afleveres eller bruges til noget særligt? Vælg Hele bilen.",
        ],
      },
      {
        h: "Ring 4 og Ballerup Boulevard",
        p: [
          "Skovlunde ligger klemt inde mellem nogle af Vestegnens mest trafikerede veje. Trafikken giver et fint, sort støv, der især sætter sig på lyse biler og på fælgene. Bremsestøv er varmt, når det lander, og brænder sig fast i fælgens overflade.",
          "Er dine fælge blevet brune eller sorte i hjørnerne, er fælgrens et godt tilvalg. Det koster 149 kr. og gør en overraskende stor forskel på helhedsindtrykket.",
        ],
      },
      {
        h: "Rækkehuse med begrænset plads",
        p: [
          "Mange rækkehuse i Skovlunde har en kort indkørsel eller parkering i en parkeringslomme. Vi har ikke brug for meget plads – bare nok til at åbne dørene og gå rundt om bilen.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad er fælgrens, og hvornår er det nødvendigt?",
        a: "Fælgrens er en grundig behandling, der opløser fastbrændt bremsestøv. Det er relevant, når fælgene ikke bliver rene af almindelig vask.",
      },
      {
        q: "Hvor meget plads skal I bruge?",
        a: "Vi skal kunne åbne bilens døre og gå hele vejen rundt om den. En almindelig parkeringsbås er som regel nok.",
      },
      {
        q: "Hvad koster udvendig vask af en mellemklassebil?",
        a: "600 kr. En lille bil koster 450 kr. og en stor bil 699 kr.",
      },
      {
        q: "Kan jeg vælge tilvalg, når jeg booker?",
        a: "Ja. Alle tilvalg som fælgrens, dækshine og sæderens vises i bookingen med pris.",
      },
    ],
    keywords: ["bilvask Skovlunde", "mobil bilvask Skovlunde", "bilvask 2740", "fælgrens Skovlunde"],
    image: { src: "/home/dækshine.png", alt: "Ren fælg og dæk efter bilvask i Skovlunde" },
    related: [
      "/bilvask-ballerup",
      "/bilvask-herlev",
      "/bilvask-glostrup",
      "/bilvask-maaloev",
      "/faelgrens",
      "/daekshine",
    ],
    area: {
      name: "Skovlunde",
      kommune: "Ballerup Kommune",
      postal: "2740",
      nearby: ["Ballerup", "Herlev", "Glostrup", "Måløv", "Rødovre", "Albertslund"],
    },
  }),

  areaPage({
    slug: "bilvask-smoerum",
    title: "Bilvask Smørum – bilvask i din indkørsel",
    description:
      "Mobil bilvask i Smørum og Ledøje. Vi kommer til indkørslen med vand og strøm og vasker husstandens biler. 15 % rabat på bil nummer to.",
    h1: "Bilvask Smørum",
    eyebrow: "2765 Smørum",
    intro:
      "I Smørum er bilen nøglen til hverdagen. De fleste familier har to – og begge skal holdes rene. Vi kommer hjem til jer og tager dem i ét besøg.",
    answer:
      "CleanWash tilbyder mobil bilvask i Smørum, Smørumnedre og Ledøje. Vi kommer til din adresse med eget vand og strøm. Udvendig bilvask fra 450 kr., hele bilen fra 799 kr. – og 15 % rabat på grundprisen for bil nummer to i samme besøg.",
    sections: [
      {
        h: "En by, hvor alt foregår på hjul",
        p: [
          "Smørum har ingen togstation i selve byen. Arbejde, indkøb, sport og besøg klares i bil, og kilometerne løber hurtigt på. Jo mere en bil bruges, jo hurtigere bliver den slidt indvendigt og beskidt udvendigt.",
          "Mange kører dagligt mod Ballerup eller København ad Frederikssundsmotorvejen. Dertil kommer de små ture: til hallen, til skolen, til centret.",
        ],
      },
      {
        h: "To biler vasket samme formiddag",
        p: [
          "Parcelhusene i Smørum har som regel plads til to biler i indkørslen. Det gør det nemt for os at vaske dem efter hinanden. Du booker begge i samme besøg, og bil nummer to får automatisk 15 % rabat på grundprisen.",
          "Vælger du Hele bilen til begge, får de både udvendig vask, indvendig rengøring og voks.",
        ],
      },
      {
        h: "Marker og golfbane som naboer",
        p: [
          "Smørum er omgivet af åbent land. I tørre perioder blæser der jordstøv ind over byen fra markerne, og efter regn bliver vejene ud mod Ledøje mudrede. Det ses nederst på bilen og i hjulbuerne.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvor meget sparer vi ved at få vasket to biler?",
        a: "Bil nummer to får 15 % rabat på grundprisen. For en mellemklassebil med Hele bilen svarer det til cirka 135 kr.",
      },
      {
        q: "Kan I vaske, selvom vi ikke er hjemme?",
        a: "Ja, hvis det kun er udvendigt. Til indvendig rengøring skal vi kunne komme ind i bilen.",
      },
      {
        q: "Kommer I til Ledøje?",
        a: "Ja, Ledøje og Smørumovre er med i vores område.",
      },
      {
        q: "Hvordan foregår betalingen?",
        a: "Du betaler, når vi er færdige – typisk med MobilePay.",
      },
    ],
    keywords: ["bilvask Smørum", "mobil bilvask Smørum", "bilvask 2765", "bilvask Ledøje"],
    image: { src: "/service/helebil.jpg", alt: "To biler i indkørsel til bilvask i Smørum" },
    related: [
      "/bilvask-maaloev",
      "/bilvask-ballerup",
      "/bilvask-stenloese",
      "/bilvask-albertslund",
      "/bilvask-flere-biler",
      "/bilvask-familiebil",
    ],
    area: {
      name: "Smørum",
      kommune: "Egedal Kommune",
      postal: "2765",
      nearby: ["Måløv", "Ballerup", "Stenløse", "Albertslund", "Taastrup"],
    },
  }),

  areaPage({
    slug: "bilvask-stenloese",
    title: "Bilvask Stenløse og Ølstykke – på adressen",
    description:
      "Mobil bilvask i Stenløse, Ølstykke og Veksø. Vi kommer til din adresse i Egedal med eget vand og strøm. Udvendig vask fra 450 kr. Book online.",
    h1: "Bilvask Stenløse og Ølstykke",
    eyebrow: "3660 Stenløse · 3650 Ølstykke",
    intro:
      "Stenløse og Ølstykke er vokset sammen til én lang by langs S-banen. Vi kører i hele området og vasker bilen hjemme hos dig.",
    answer:
      "CleanWash tilbyder mobil bilvask i Stenløse, Ølstykke og Veksø. Vi medbringer vand og strøm og vasker bilen på din adresse. Udvendig bilvask koster fra 450 kr., indvendig rengøring fra 600 kr. og hele bilen fra 799 kr.",
    sections: [
      {
        h: "Bilvask hjemme i Egedal",
        p: [
          "De fleste boliger i Stenløse og Ølstykke er parcelhuse og rækkehuse med egen parkering. Det er ideelt til mobil bilvask: bilen står for sig selv, og der er plads til at arbejde.",
          "Du behøver ikke at tænke på afløb, slange eller forlængerledning. Alt, hvad vi skal bruge, har vi med.",
        ],
      },
      {
        h: "Station og pendlerparkering",
        p: [
          "Tager du S-toget fra Stenløse, Egedal eller Ølstykke, står bilen måske ved stationen hele dagen. Vi vasker på private adresser og private p-pladser. Det nemmeste er derfor at lægge vasken en dag, hvor bilen står hjemme.",
        ],
      },
      {
        h: "Nye kvarterer og byggeveje",
        p: [
          "I de nyere dele af Stenløse bygges der stadig. Lastbiler trækker jord ud på vejene, og støvet lægger sig på bilerne. Får bilen et lag ler på undersiden af dørene, skal det skylles af, før det tørrer til en hård skorpe.",
        ],
      },
    ],
    faqs: [
      {
        q: "Vasker I både i Stenløse og Ølstykke?",
        a: "Ja. Vi dækker Stenløse, Ølstykke, Veksø og resten af Egedal Kommune.",
      },
      {
        q: "Kan I vaske bilen på stationens p-plads?",
        a: "Vi vasker på private adresser og private p-pladser. På offentlige pladser afhænger det af reglerne på stedet.",
      },
      {
        q: "Hvad gør I ved indtørret ler og jord?",
        a: "Det blødes op og skylles af i forvasken, så det ikke ridser lakken under håndvasken.",
      },
      {
        q: "Er der kørselstillæg til Egedal?",
        a: "Pakkepriserne er de samme. Skulle et tillæg gælde for din adresse, kan du se det i prisen, før du bekræfter.",
      },
      {
        q: "Kan jeg få vasket både pendlerbilen og bil nummer to?",
        a: "Ja. Book begge biler til samme besøg. Vi vasker dem efter hinanden i indkørslen, og den anden bil får 15 % rabat på grundprisen.",
      },
    ],
    keywords: ["bilvask Stenløse", "bilvask Ølstykke", "mobil bilvask Egedal", "bilvask 3660"],
    image: { src: "/service/udenfor.jpg", alt: "Udvendig bilvask ved parcelhus i Stenløse" },
    related: [
      "/bilvask-frederikssund",
      "/bilvask-smoerum",
      "/bilvask-maaloev",
      "/bilvask-slangerup",
      "/bilvask-hjemme",
      "/udvendig-bilvask-koebenhavn",
    ],
    area: {
      name: "Stenløse",
      kommune: "Egedal Kommune",
      postal: "3660",
      nearby: ["Frederikssund", "Smørum", "Måløv", "Slangerup", "Farum", "Jyllinge"],
    },
  }),

  areaPage({
    slug: "bilvask-frederikssund",
    title: "Bilvask Frederikssund – mobil bilvask ved fjorden",
    description:
      "Mobil bilvask i Frederikssund. Vi kommer til din adresse med vand og strøm og vasker bilen ude og inde. Udvendig vask fra 450 kr. Book online.",
    h1: "Bilvask Frederikssund",
    eyebrow: "3600 Frederikssund",
    intro:
      "Frederikssund ligger for enden af S-banen og ved bredden af Roskilde Fjord. Vi kører herud og vasker bilen hjemme hos dig.",
    answer:
      "CleanWash tilbyder mobil bilvask i Frederikssund. Vi kommer til din adresse med eget vand og strøm. En udvendig bilvask koster fra 450 kr., indvendig rengøring fra 600 kr. og hele bilen fra 799 kr. Et eventuelt kørselstillæg vises altid, før du bekræfter.",
    sections: [
      {
        h: "Samme bilvask som i København",
        p: [
          "Mobil bilvask har længe været et byfænomen. Men behovet er mindst lige så stort i Frederikssund, hvor bilen bruges til alt. Vi kører ud til byen og vasker efter samme pakker og priser som i hovedstaden.",
          "Bookingen viser de dage og tider, vi kan være i Frederikssund. Planlæg gerne et par dage frem.",
        ],
      },
      {
        h: "Fjordluft og lange pendlerture",
        p: [
          "Ved fjorden er luften fugtig og let salt, og mågerne er aldrig langt væk. Samtidig kører mange dagligt den lange tur mod Ballerup og København. Kombinationen giver fugleklatter, insekter på fronten og et jævnt lag vejfilm.",
          "Det er netop den slags, der har godt af at blive løsnet med skum først. Insektrester og klatter skal blødes op, ikke skrubbes af.",
        ],
      },
      {
        h: "Efter weekenden i Hornsherred",
        p: [
          "Mange i Frederikssund har sommerhus, båd eller familie på den anden side af broen. Efter en weekend med grusveje, strandture og våde hunde trænger kabinen. En indvendig rengøring med støvsugning af sæder, gulv og bagagerum bringer den tilbage.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kører I helt ud til Frederikssund?",
        a: "Ja. Frederikssund er en del af vores område på Sjælland. De ledige tider fremgår af bookingen.",
      },
      {
        q: "Koster det ekstra at få bilvask i Frederikssund?",
        a: "Pakkepriserne er de samme som andre steder. Hvis et kørselstillæg gælder for adressen, fremgår det tydeligt af prisen før bekræftelse.",
      },
      {
        q: "Kan I fjerne insekter fra kofanger og forrude?",
        a: "Ja. De blødes op og fjernes som en del af den udvendige vask.",
      },
      {
        q: "Vasker I også i Jægerspris?",
        a: "Kontakt os med adressen, så fortæller vi, om vi kan nå ud til dig.",
      },
    ],
    keywords: ["bilvask Frederikssund", "mobil bilvask Frederikssund", "bilvask 3600", "bilrengøring Frederikssund"],
    image: { src: "/service/helebil.jpg", alt: "Mobil bilvask ved bolig i Frederikssund" },
    related: [
      "/bilvask-stenloese",
      "/bilvask-slangerup",
      "/bilvask-jyllinge",
      "/bilvask-frederiksvaerk",
      "/bilvask-nordsjaelland",
      "/indvendig-bilrengoering-koebenhavn",
    ],
    area: {
      name: "Frederikssund",
      kommune: "Frederikssund Kommune",
      postal: "3600",
      nearby: ["Stenløse", "Slangerup", "Jyllinge", "Frederiksværk", "Hillerød"],
    },
  }),

  areaPage({
    slug: "bilvask-slangerup",
    title: "Bilvask Slangerup – vi kører ud til dig",
    description:
      "Mobil bilvask i Slangerup. Ingen vaskehal, ingen kø – vi kommer til din indkørsel med vand og strøm. Udvendig vask fra 450 kr., hele bilen fra 799 kr.",
    h1: "Bilvask Slangerup",
    eyebrow: "3550 Slangerup",
    intro:
      "I Slangerup går der ikke tog, så bilen kører hver dag. Vi kommer ud til dig og giver den en ordentlig vask, mens den holder hjemme.",
    answer:
      "CleanWash tilbyder mobil bilvask i Slangerup. Vi kommer til din adresse og medbringer selv vand og strøm. Udvendig bilvask koster fra 450 kr., indvendig rengøring fra 600 kr. og hele bilen fra 799 kr.",
    sections: [
      {
        h: "Når bilen er eneste transportmiddel",
        p: [
          "Uden jernbane er Slangerup en by, hvor bilen ikke kan undværes. Hver dag går turen mod Hillerød, Farum, Frederikssund eller København. En bil, der kører 25.000 kilometer om året, bliver slidt på en anden måde end en weekendbil.",
          "Rat, gearvælger og armlæn får et blankt, fedtet lag. Førersædet samler støv og hudfedt. Og forruden får en hinde på indersiden. Det er ting, en indvendig rengøring retter op på.",
        ],
      },
      {
        h: "Landeveje hele vejen rundt",
        p: [
          "Uanset hvilken vej du kører ud af Slangerup, er det landevej. Det betyder mudder om efteråret, salt om vinteren og insekter om sommeren. Særligt fronten og siderne bag hjulene tager imod.",
          "En udvendig vask med grundig rengøring af hjulbuer og fælge holder bilen pæn – og gør det nemmere at opdage stenslag og små skader i tide.",
        ],
      },
      {
        h: "Nemt at booke",
        p: [
          "Du booker online på to minutter. Indtast nummerpladen, vælg pakke og find en tid. Vi bekræfter på mail og kommer til den aftalte tid.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kommer I til Slangerup, selvom det ligger et stykke fra København?",
        a: "Ja. Vi kører i store dele af Nordsjælland. Bookingen viser de tider, vi kan være hos dig.",
      },
      {
        q: "Hvorfor bliver rattet blankt?",
        a: "Det er en blanding af hudfedt, håndcreme og snavs. Det tørres af med et egnet rengøringsmiddel, så overfladen bliver mat og ren igen.",
      },
      {
        q: "Hvad koster Hele bilen for en almindelig stationcar?",
        a: "En mellemklassebil koster 899 kr. – en stor bil 999 kr.",
      },
      {
        q: "Kan jeg få vasket bil en søndag?",
        a: "Ja, vi kører alle ugens dage. De ledige tider vises i bookingen.",
      },
    ],
    keywords: ["bilvask Slangerup", "mobil bilvask Slangerup", "bilvask 3550", "bilrengøring Slangerup"],
    image: { src: "/service/inside.jpg", alt: "Indvendig rengøring af pendlerbil i Slangerup" },
    related: [
      "/bilvask-frederikssund",
      "/bilvask-hilleroed",
      "/bilvask-farum",
      "/bilvask-stenloese",
      "/bilvask-alleroed",
      "/blog/blankt-og-fedtet-rat",
    ],
    area: {
      name: "Slangerup",
      kommune: "Frederikssund Kommune",
      postal: "3550",
      nearby: ["Frederikssund", "Hillerød", "Farum", "Stenløse", "Allerød"],
    },
  }),

  areaPage({
    slug: "bilvask-frederiksvaerk",
    title: "Bilvask Frederiksværk – mobil bilvask i Halsnæs",
    description:
      "Mobil bilvask i Frederiksværk og Halsnæs. Vi kommer til helårshuset eller sommerhuset med vand og strøm. Udvendig vask fra 450 kr.",
    h1: "Bilvask Frederiksværk",
    eyebrow: "3300 Frederiksværk",
    intro:
      "Mellem Arresø og Roskilde Fjord ligger Frederiksværk – porten til sommerhusene ved Liseleje og Asserbo. Vi vasker både hverdagsbilen og feriebilen.",
    answer:
      "CleanWash tilbyder mobil bilvask i Frederiksværk og omegn. Vi kommer til adressen med eget vand og strøm. Udvendig bilvask koster fra 450 kr., hele bilen fra 799 kr. Et eventuelt kørselstillæg fremgår af prisen, før du bekræfter.",
    sections: [
      {
        h: "Sommerhusbilen",
        p: [
          "En uge i sommerhus er hård ved en bil. Den holder under fyrretræer, der drypper harpiks. Den kører på grusveje. Og den fyldes med sand, våde håndklæder og strandlegetøj. Når ferien er slut, er det sidste, man orker, at gøre bilen ren.",
          "Vi kan vaske bilen ved sommerhuset, inden du kører hjem. Vi har vand og strøm med, så det spiller ingen rolle, om huset har udendørs hane.",
        ],
      },
      {
        h: "Fyrrenåle og harpiks",
        p: [
          "Fyrrenåle kiler sig ned i afløbene ved forrude og bagklap. Stopper afløbene, kan vandet finde vej ind i kabinen. Harpiks fra fyr og gran er sejere end fra løvtræer og bør fjernes, mens den er frisk.",
        ],
      },
      {
        h: "Hverdagen i Frederiksværk",
        p: [
          "For fastboende handler det om det samme som alle andre steder: en ren bil uden besvær. Du booker online, og vi kommer til din adresse – uanset om du bor ved kanalen, på Enghaven eller i et af villakvartererne.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan I vaske bilen ved mit sommerhus?",
        a: "Ja, hvis adressen ligger inden for vores område. Skriv sommerhusets adresse i bookingen – vi har selv vand og strøm med.",
      },
      {
        q: "Hvordan fjernes harpiks fra fyrretræer?",
        a: "Den opløses med et egnet middel og tørres forsigtigt af. Den må ikke skrabes, da det ridser lakken.",
      },
      {
        q: "Kører I til Liseleje og Asserbo?",
        a: "Kontakt os med adressen, eller prøv at booke. Bookingen viser, om vi har tider i området.",
      },
      {
        q: "Kan jeg booke i god tid før ferien?",
        a: "Ja. Du kan booke op til et halvt år frem.",
      },
      {
        q: "Kan sand og fyrrenåle fjernes fra bagagerummet?",
        a: "Ja. Bagagerummet støvsuges i bund ved en indvendig rengøring – også i hjørnerne og under bunden, hvor nåle og sand fra sommerhusturen gemmer sig.",
      },
    ],
    keywords: ["bilvask Frederiksværk", "mobil bilvask Halsnæs", "bilvask 3300", "bilvask sommerhus"],
    image: { src: "/service/udenfor.jpg", alt: "Bilvask ved sommerhus nær Frederiksværk" },
    related: [
      "/bilvask-frederikssund",
      "/bilvask-helsinge",
      "/bilvask-hilleroed",
      "/bilvask-efter-ferien",
      "/bilvask-nordsjaelland",
      "/blog/fjern-harpiks-fra-bilen",
    ],
    area: {
      name: "Frederiksværk",
      kommune: "Halsnæs Kommune",
      postal: "3300",
      nearby: ["Frederikssund", "Helsinge", "Hillerød", "Slangerup"],
    },
  }),

  areaPage({
    slug: "bilvask-helsinge",
    title: "Bilvask Helsinge – mobil bilvask i Gribskov",
    description:
      "Mobil bilvask i Helsinge og Gribskov. Vi kommer til din adresse med vand og strøm – også før eller efter sommerhusturen. Hele bilen fra 799 kr.",
    h1: "Bilvask Helsinge",
    eyebrow: "3200 Helsinge",
    intro:
      "Helsinge ligger midt i Gribskov Kommune med skoven på den ene side og kysten på den anden. Vi kører herop og vasker bilen på din adresse.",
    answer:
      "CleanWash tilbyder mobil bilvask i Helsinge. Vi medbringer eget vand og strøm og vasker bilen, hvor den holder. Udvendig bilvask fra 450 kr., indvendig rengøring fra 600 kr. og hele bilen fra 799 kr.",
    sections: [
      {
        h: "Midt mellem skov og strand",
        p: [
          "Fra Helsinge er der få kilometer til både Gribskov og strandene ved Tisvildeleje og Rågeleje. Bilen bliver brugt til det hele, og det afspejler sig i snavset: skovbund og nåle den ene dag, sand og salt den næste.",
          "Hele bilen er den pakke, der passer bedst, når både yderside og kabine har fået deres del. Her får du udvendig vask, indvendig rengøring og voks på lakken i ét besøg.",
        ],
      },
      {
        h: "Sommertrafik og insekter",
        p: [
          "I juli fyldes vejene mod kysten. Lange køreture på landevej i sommervarmen giver en front dækket af insekter. De er nemme at fjerne den første dag og besværlige efter en uge i solen.",
        ],
      },
      {
        h: "En by med plads",
        p: [
          "I Helsinge har næsten alle egen indkørsel. Det gør mobil bilvask helt enkel. Du parkerer som normalt, vi kommer til tiden, og bilen bliver vasket på stedet.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kører I så langt nordpå som Helsinge?",
        a: "Ja, Helsinge ligger inden for vores område i Nordsjælland. Bookingen viser de tider, vi kan tilbyde.",
      },
      {
        q: "Hvad er forskellen på de tre pakker?",
        a: "Udvendig bilvask tager lak, fælge og ruder. Indvendig rengøring tager kabine og bagagerum. Hele bilen er begge dele plus voks.",
      },
      {
        q: "Kan I vaske ved sommerhuse i Tisvildeleje?",
        a: "Kontakt os med adressen, så finder vi ud af, om vi kan nå ud til dig.",
      },
      {
        q: "Skal jeg have vand og strøm klar?",
        a: "Nej. Vi medbringer begge dele.",
      },
      {
        q: "Kan I vaske to biler i samme indkørsel?",
        a: "Ja. De fleste huse i Helsinge har plads til det. Tilføj den ekstra bil i bookingen, så vasker vi dem efter hinanden, og bil nummer to får 15 % rabat på grundprisen.",
      },
    ],
    keywords: ["bilvask Helsinge", "mobil bilvask Gribskov", "bilvask 3200", "bilrengøring Helsinge"],
    image: { src: "/service/helebil.jpg", alt: "Mobil bilvask i indkørsel i Helsinge" },
    related: [
      "/bilvask-hilleroed",
      "/bilvask-frederiksvaerk",
      "/bilvask-fredensborg",
      "/bilvask-efter-ferien",
      "/komplet-bilvask",
      "/bilvask-nordsjaelland",
    ],
    area: {
      name: "Helsinge",
      kommune: "Gribskov Kommune",
      postal: "3200",
      nearby: ["Hillerød", "Frederiksværk", "Fredensborg", "Helsingør"],
    },
  }),

  areaPage({
    slug: "bilvask-jyllinge",
    title: "Bilvask Jyllinge – bilvask hjemme ved fjorden",
    description:
      "Mobil bilvask i Jyllinge og Jyllinge Nordmark. Vi kommer med vand og strøm og fjerner grusstøv og fjordsalt fra bilen. Udvendig vask fra 450 kr.",
    h1: "Bilvask Jyllinge",
    eyebrow: "4040 Jyllinge",
    intro:
      "Jyllinge er fjordby med havn, parcelhuse og de små veje i Nordmarken. Vi kommer hjem til dig og vasker bilen.",
    answer:
      "CleanWash tilbyder mobil bilvask i Jyllinge. Vi kommer til din adresse med eget vand og strøm. Udvendig bilvask koster fra 450 kr., indvendig rengøring fra 600 kr. og hele bilen fra 799 kr.",
    sections: [
      {
        h: "Grusveje i Nordmarken",
        p: [
          "Jyllinge Nordmark er vokset fra sommerhusområde til helårsby, og mange veje er stadig smalle og belagt med grus. Hver tur hvirvler støv op. Det lægger sig på bagklappen, i dørkarmene og i alle sprækker.",
          "Grusstøv er hårdt. Tørrer du det af med en klud, ridser det. Det skal skylles af og løsnes med skum, og dørkarmene skal tørres af for sig – ellers drysser det ind i kabinen, hver gang døren åbnes.",
        ],
      },
      {
        h: "Havnen og fjorden",
        p: [
          "Ved lystbådehavnen og langs fjorden er der altid vind. Den bærer fugt og lidt salt ind over byen. For biler, der holder ude hele året, betyder det, at snavset binder bedre, og at gummilister og plast ældes hurtigere uden rengøring.",
        ],
      },
      {
        h: "Mellem Roskilde og Stenløse",
        p: [
          "Jyllinge ligger et stykke fra de større byer. Mange kører til Roskilde eller mod København hver dag. Vi kører i hele området, så du kan få bilen vasket derhjemme i stedet for at lægge en ekstra tur ind.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan I vaske bilen på en grusvej?",
        a: "Ja, så længe bilen holder på egen grund eller lovligt på vejen, og vi kan komme rundt om den.",
      },
      {
        q: "Rengør I dørkarme?",
        a: "Ja. Dørkarme og kanter tørres af som en del af den udvendige håndvask.",
      },
      {
        q: "Hvor tit skal en bil på grusvej vaskes?",
        a: "Cirka hver tredje uge, hvis du vil holde støvet ude af kabinen og væk fra lakken.",
      },
      {
        q: "Dækker I også Gundsømagle?",
        a: "Kontakt os med adressen, eller prøv i bookingen. Vi kører i store dele af området mellem Roskilde og Stenløse.",
      },
    ],
    keywords: ["bilvask Jyllinge", "mobil bilvask Jyllinge", "bilvask 4040", "bilvask Jyllinge Nordmark"],
    image: { src: "/service/udenfor.jpg", alt: "Udvendig bilvask ved hus i Jyllinge" },
    related: [
      "/bilvask-roskilde",
      "/bilvask-stenloese",
      "/bilvask-frederikssund",
      "/bilvask-hjemme",
      "/udvendig-bilvask-koebenhavn",
      "/bilvask-sjaelland",
    ],
    area: {
      name: "Jyllinge",
      kommune: "Roskilde Kommune",
      postal: "4040",
      nearby: ["Roskilde", "Stenløse", "Frederikssund", "Smørum"],
    },
  }),
];
