import { areaPage, HOURS_DA, type ContentPage } from "./types";

// Bydele i Københavns Kommune. Hver side er skrevet til netop det kvarter:
// parkeringsforhold, boligtyper og det snavs, bilerne typisk samler dér.
export const areasKoebenhavn: ContentPage[] = [
  areaPage({
    slug: "bilvask-indre-by",
    title: "Bilvask Indre By – vi kommer til København K",
    description:
      "Mobil bilvask i Indre By. Vi vasker bilen, hvor den holder i København K – med eget vand og strøm. Udvendig vask fra 450 kr. Book online.",
    h1: "Bilvask Indre By",
    eyebrow: "København K",
    intro:
      "I Indre By er det sværeste ved en bilvask ofte at komme ud af byen og hen til en vaskehal. Derfor kommer vi til bilen i stedet – i gården, på p-pladsen eller der, hvor du har parkeret.",
    answer:
      "CleanWash tilbyder mobil bilvask i hele Indre By og København K. Vi medbringer selv vand og strøm, så bilen kan vaskes, hvor den holder lovligt. Udvendig bilvask koster fra 450 kr., og hele bilen ude og inde fra 799 kr.",
    sections: [
      {
        h: "Bilvask uden at flytte bilen fra København K",
        p: [
          "Har du først fundet en plads i middelalderbyen, flytter du nødig bilen igen. En tur til en vaskehal betyder kø ud ad H.C. Andersens Boulevard, ventetid ved hallen og en ny jagt på parkering bagefter. Med mobil bilvask bliver bilen stående, og du kan passe arbejde, møder eller ærinder imens.",
          "Vi vasker både privatbiler og firmabiler i Indre By – i gårdanlæg, på private p-pladser og ved erhvervslejemål omkring Kongens Nytorv, Nørreport og Frederiksstaden.",
        ],
      },
      {
        h: "Det skal du vide om adgang og parkering",
        p: [
          "Bilen skal holde lovligt, og vi skal kunne komme rundt om den. Holder den i en gård bag en port eller i en p-kælder, skriver du det i bemærkningsfeltet, når du booker, så vi kender adgangsforholdene på forhånd.",
          "Bor du i en ejer- eller andelsforening, er det en god idé at tjekke, at bilvask er tilladt på foreningens areal. Det er sjældent et problem, men det er rarest at have afklaret, før vi kommer.",
        ],
      },
      {
        h: "Bysnavs sætter sig hurtigt",
        p: [
          "Biler i centrum samler en særlig blanding af bremsestøv, sod fra trafikken og støv fra de mange byggepladser. Det lægger sig som en grå film på lak og ruder og brænder sig fast på fælgene. En håndvask med forvask løsner filmen, før lakken berøres, så bilen ikke får nye ridser.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan I vaske bilen, når den holder i en gård eller p-kælder?",
        a: "Som regel ja, hvis vi kan komme til bilen, og vask er tilladt på stedet. Skriv adgangsforholdene i bemærkningsfeltet ved booking, så vurderer vi det inden besøget.",
      },
      {
        q: "Skal jeg selv sørge for vand eller strøm i Indre By?",
        a: "Nej. Vi har både vand og strøm med, så du skal ikke finde en vandhane eller trække en ledning ned fra lejligheden.",
      },
      {
        q: "Hvad koster bilvask i København K?",
        a: "Udvendig bilvask koster fra 450 kr., indvendig rengøring fra 600 kr. og hele bilen fra 799 kr. Prisen afhænger af bilens størrelse og vises, når du har tastet nummerpladen.",
      },
      {
        q: "Vasker I også firmabiler ved kontorer i centrum?",
        a: "Ja. Mange vælger at få bilen vasket i arbejdstiden, mens den alligevel står parkeret ved kontoret. Har virksomheden flere biler, kan vi tage dem i samme besøg.",
      },
    ],
    keywords: ["bilvask Indre By", "bilvask København K", "mobil bilvask Indre By", "bilrengøring København K"],
    image: { src: "/service/udenfor.jpg", alt: "Mobil bilvask af bil parkeret i Indre By, København K" },
    related: [
      "/bilvask-christianshavn",
      "/bilvask-osterbro",
      "/bilvask-vesterbro",
      "/bilvask-lejlighed",
      "/bilvask-paa-arbejdspladsen",
      "/bilvask-koebenhavn",
    ],
    area: {
      name: "Indre By",
      kommune: "Københavns Kommune",
      postal: "1000–1499",
      nearby: ["Christianshavn", "Østerbro", "Nørrebro", "Vesterbro", "Frederiksberg", "Islands Brygge"],
    },
  }),

  areaPage({
    slug: "bilvask-oerestad",
    title: "Bilvask Ørestad – mobil bilvask ved din bolig",
    description:
      "Få bilen vasket i Ørestad uden at køre til en vaskehal. Vi kommer til p-pladsen ved din bolig eller dit kontor med vand og strøm. Fra 450 kr.",
    h1: "Bilvask Ørestad",
    eyebrow: "2300 København S",
    intro:
      "Ørestad er bygget til metro og cykel – ikke til at have en haveslange i nærheden af bilen. Vi kommer til dig med alt udstyr og vasker bilen ved boligen eller kontoret.",
    answer:
      "CleanWash vasker biler i hele Ørestad: Ørestad Nord, City og Syd. Du booker online, og vi kommer til adressen med eget vand og strøm. En udvendig bilvask tager cirka 65 minutter og koster fra 450 kr.",
    sections: [
      {
        h: "Bilvask i en bydel uden vandhane ved bilen",
        p: [
          "I Ørestad bor de fleste i lejligheder med parkering på terræn, i p-hus eller på vejen. Det giver ingen mulighed for selv at vaske bilen, og en tur i vaskehal koster hurtigt en time af dagen. Mobil bilvask løser det ved at flytte vasken hen til bilen.",
          "Vi har både vand og strøm med, så det eneste, vi har brug for, er adgang til bilen. Holder den i et p-hus, så skriv etage og eventuelle regler for huset i bookingen.",
        ],
      },
      {
        h: "Vind, byggestøv og Amager Fælled",
        p: [
          "Ørestad ligger åbent mod Fælleden, og blæsten bærer både støv fra byggepladserne og pollen fra de grønne områder ind over bilerne. Om foråret lægger pollen sig som et gult lag, og i tørre perioder bliver lakken hurtigt mat af fint støv.",
          "Støvet er ikke bare et kosmetisk problem. Tørrer man det af med en klud, virker det som sandpapir. Derfor skyller og forvasker vi altid, før svampen rører lakken.",
        ],
      },
      {
        h: "Vask ved kontoret, mens du arbejder",
        p: [
          "Arbejder du i et af kontorhusene langs Ørestads Boulevard eller ved Field's, står bilen alligevel parkeret hele dagen. Så kan den lige så godt blive vasket imens. Du afleverer ikke nøgler ved en udvendig vask – bilen skal bare være til at komme rundt om.",
        ],
      },
    ],
    faqs: [
      {
        q: "Vasker I biler i p-husene i Ørestad?",
        a: "Det kan vi ofte, men det afhænger af p-husets regler og pladsen omkring bilen. Skriv p-hus og etage i bemærkningsfeltet, så afklarer vi det inden besøget.",
      },
      {
        q: "Hvor lang tid tager en bilvask i Ørestad?",
        a: "Udvendig vask tager cirka 65 minutter, indvendig rengøring cirka 75 minutter og hele bilen cirka 110 minutter.",
      },
      {
        q: "Kan jeg få fjernet pollen og byggestøv fra bilen?",
        a: "Ja. En udvendig bilvask med forvask fjerner pollen og støv skånsomt. Er kabinen også støvet, er pakken Hele bilen det oplagte valg.",
      },
      {
        q: "Skal jeg være hjemme, når I vasker bilen?",
        a: "Ikke ved en udvendig vask. Ved indvendig rengøring skal vi have adgang til kabinen, så her aftaler vi, hvordan vi får nøglen.",
      },
    ],
    keywords: ["bilvask Ørestad", "mobil bilvask Ørestad", "bilvask København S", "bilrengøring Ørestad"],
    image: { src: "/service/helebil.jpg", alt: "Bilvask på parkeringsplads ved boliger i Ørestad" },
    related: [
      "/bilvask-amager",
      "/bilvask-islands-brygge",
      "/bilvask-tarnby",
      "/bilvask-lejlighed",
      "/komplet-bilvask",
      "/blog/pollen-paa-bilen",
    ],
    area: {
      name: "Ørestad",
      kommune: "Københavns Kommune",
      postal: "2300",
      nearby: ["Amager", "Islands Brygge", "Tårnby", "Kastrup", "Sydhavnen"],
    },
  }),

  areaPage({
    slug: "bilvask-broenshoej",
    title: "Bilvask Brønshøj – bilvask i din indkørsel",
    description:
      "Mobil bilvask i Brønshøj og Husum. Vi vasker bilen i indkørslen eller på vejen foran huset og har selv vand og strøm med. Hele bilen fra 799 kr.",
    h1: "Bilvask Brønshøj",
    eyebrow: "2700 Brønshøj",
    intro:
      "Brønshøj og Husum er villaer, rækkehuse og biler, der bruges hver dag. Vi kommer til indkørslen og vasker bilen, mens du gør noget andet.",
    answer:
      "CleanWash tilbyder mobil bilvask i Brønshøj, Husum og Tingbjerg. Vi kommer til din adresse med eget vand og strøm og vasker bilen ude, inde eller begge dele. Priserne starter ved 450 kr. for en udvendig vask af en lille bil.",
    sections: [
      {
        h: "Bilvask hjemme i Brønshøj",
        p: [
          "I et villakvarter som Brønshøj er der plads til at få bilen vasket derhjemme – men de færreste har tid, udstyr eller lyst til at bruge en lørdag formiddag på det. Vi overtager opgaven og kommer med skumkanon, rene vaskehandsker, støvsuger og alt det andet.",
          "Du behøver ikke at rulle en slange ud eller finde en stikkontakt. Bilen skal bare stå, så vi kan gå hele vejen rundt om den.",
        ],
      },
      {
        h: "Træer, Utterslev Mose og familiebiler",
        p: [
          "Kvarteret er grønt, og det kan ses på bilerne. Under de store vejtræer drypper der harpiks og honningdug om sommeren, og tæt på Utterslev Mose kommer der fugleklatter og pollen oveni. Begge dele skal væk hurtigt, fordi de kan ætse sig ned i klarlakken, når solen bager.",
          "Indvendigt er det ofte familiebilens klassikere, vi møder: krummer i børnesædet, sand fra legepladsen og hår fra hunden efter en tur i mosen. Det klarer en indvendig rengøring – med tilvalg til dyrehår og rens af børnesæder, hvis der er brug for det.",
        ],
      },
      {
        h: "To biler i samme indkørsel?",
        p: [
          "Mange husstande i Brønshøj har to biler. Booker du begge til samme besøg, får bil nummer to 15 % rabat på grundprisen, og du sparer en ekstra aftale.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan I vaske bilen på vejen foran huset?",
        a: "Ja, hvis bilen holder lovligt, og der er plads til at arbejde omkring den. Har du en indkørsel, er det som regel det nemmeste sted.",
      },
      {
        q: "Fjerner I harpiks og fugleklatter?",
        a: "Friske fugleklatter og let harpiks kommer af ved en almindelig vask. Er det brændt fast, så skriv det i bookingen, så sætter vi tid af til det.",
      },
      {
        q: "Hvad koster en indvendig rengøring i Brønshøj?",
        a: "Indvendig rengøring koster fra 600 kr. for en lille bil og 700 kr. for en almindelig mellemklassebil. Fjernelse af dyrehår kan vælges til for 200 kr.",
      },
      {
        q: "Kører I også til Husum og Tingbjerg?",
        a: "Ja. Vi dækker hele postnummer 2700 og de omkringliggende bydele som Vanløse, Bispebjerg og Herlev.",
      },
    ],
    keywords: ["bilvask Brønshøj", "mobil bilvask Brønshøj", "bilvask Husum", "bilrengøring 2700"],
    image: { src: "/service/inside.jpg", alt: "Indvendig bilrengøring af familiebil i Brønshøj" },
    related: [
      "/bilvask-vanlose",
      "/bilvask-bispebjerg",
      "/bilvask-herlev",
      "/bilvask-hjemme",
      "/fjernelse-af-dyrehaar-bil",
      "/bilvask-flere-biler",
    ],
    area: {
      name: "Brønshøj",
      kommune: "Københavns Kommune",
      postal: "2700",
      nearby: ["Vanløse", "Bispebjerg", "Herlev", "Rødovre", "Søborg", "Nørrebro"],
    },
  }),

  areaPage({
    slug: "bilvask-bispebjerg",
    title: "Bilvask Bispebjerg og Nordvest – på adressen",
    description:
      "Bilvask i Bispebjerg og Nordvest uden vaskehal. Vi kommer til gaden eller gården i 2400 København NV med vand, strøm og udstyr. Fra 450 kr.",
    h1: "Bilvask Bispebjerg og Nordvest",
    eyebrow: "2400 København NV",
    intro:
      "I Nordvest holder de fleste biler på gaden eller i gården. Vi vasker dem, hvor de står – uden at du skal bruge tid på at køre til og fra en vaskehal.",
    answer:
      "CleanWash kører ud til hele Bispebjerg og Nordvestkvarteret. Vi har vand og strøm med og kan vaske bilen på gaden, i gården eller på en privat p-plads. Udvendig bilvask fra 450 kr., hele bilen fra 799 kr.",
    sections: [
      {
        h: "Mobil bilvask til et kvarter med gadeparkering",
        p: [
          "Etageejendommene omkring Frederikssundsvej, Tomsgårdsvej og Bispebjerg Bakke har én ting til fælles: der er ingen steder at vaske bil. Du har hverken vand eller strøm ved kantstenen, og det har du heller ikke brug for, når vi kommer med det hele.",
          "Det eneste, du skal sørge for, er, at bilen holder lovligt, og at der ikke står en anden bil helt op ad den på begge sider. Så klarer vi resten.",
        ],
      },
      {
        h: "Bil ved hospitalet eller på arbejdet",
        p: [
          "Arbejder du på Bispebjerg Hospital eller i et af erhvervsområderne i Nordvest, kan bilen blive vasket på p-pladsen, mens du er på vagt. Det er en nem måde at bruge de timer, hvor bilen alligevel står stille.",
          "Ved en udvendig vask behøver du ikke at komme ud til bilen. Vi skriver, når vi er færdige.",
        ],
      },
      {
        h: "Når bilen bor udenfor hele året",
        p: [
          "En bil, der altid holder på gaden, får det hele: regn med sod, blade i afløbene ved forruden, vejsalt om vinteren og fugleklatter fra gadens træer. Regelmæssig vask – og voks på lakken, som er inkluderet i pakken Hele bilen – gør, at snavset slipper lettere næste gang.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan I vaske en bil, der holder på gaden i Nordvest?",
        a: "Ja. Bilen skal holde lovligt, og der skal være plads til at arbejde på mindst den ene side ad gangen. Vi medbringer selv vand og strøm.",
      },
      {
        q: "Hvornår kan I komme?",
        a: `Vi kører alle ugens dage ${HOURS_DA}. Ledige tider vises i bookingen, og ofte kan du finde en tid allerede samme dag eller dagen efter.`,
      },
      {
        q: "Hvordan betaler jeg?",
        a: "Du betaler, når bilen er færdig – de fleste bruger MobilePay. Prisen kender du fra bookingen, så der kommer ingen overraskelser.",
      },
      {
        q: "Hvad hvis det regner på dagen?",
        a: "Let regn er sjældent et problem. Er vejret for dårligt til et ordentligt resultat, kontakter vi dig og finder en ny tid.",
      },
    ],
    keywords: ["bilvask Bispebjerg", "bilvask Nordvest", "bilvask København NV", "mobil bilvask 2400"],
    image: { src: "/service/udenfor.jpg", alt: "Udvendig bilvask på gaden i Københavns Nordvestkvarter" },
    related: [
      "/bilvask-noerrebro",
      "/bilvask-broenshoej",
      "/bilvask-soborg",
      "/bilvask-osterbro",
      "/bilvask-lejlighed",
      "/bilvask-med-voks",
    ],
    area: {
      name: "Bispebjerg",
      kommune: "Københavns Kommune",
      postal: "2400",
      nearby: ["Nørrebro", "Brønshøj", "Søborg", "Østerbro", "Vanløse", "Gentofte"],
    },
  }),

  areaPage({
    slug: "bilvask-vanlose",
    title: "Bilvask Vanløse – mobil bilvask ved din dør",
    description:
      "Book bilvask i Vanløse. Vi kommer til villavejen eller p-pladsen i 2720 med eget vand og strøm. Udvendig vask fra 450 kr., hele bilen fra 799 kr.",
    h1: "Bilvask Vanløse",
    eyebrow: "2720 Vanløse",
    intro:
      "Vanløse er villaveje, rækkehuse og lejligheder omkring Jernbane Allé – og en bydel, hvor bilen stadig bruges til det meste. Vi vasker den hjemme hos dig.",
    answer:
      "CleanWash tilbyder mobil bilvask i hele Vanløse. Du vælger pakke og tidspunkt online, og vi kommer til adressen med vand, strøm og udstyr. En udvendig bilvask koster fra 450 kr. og tager cirka 65 minutter.",
    sections: [
      {
        h: "Slip for turen til vaskehallen",
        p: [
          "Fra Vanløse er der kort til både Roskildevej og Jyllingevej, men en bilvask i en hal æder alligevel hurtigt en time, når kø og ventetid tælles med. Når vi kommer til dig, bruger du to minutter på at booke – og så er din del af opgaven overstået.",
          "Vi vasker i indkørslen på villavejene omkring Grøndals Parkvej og Katrinedal, på p-pladser ved etageejendommene og ved butikkerne omkring Galleria-området, hvis det er dér, bilen holder.",
        ],
      },
      {
        h: "Hvad har bilen brug for?",
        p: [
          "Kører du mest korte ture i byen, er det typisk fælge og ruder, der trænger først. Bremsestøv brænder sig fast på fælgene, og indersiden af forruden får en fedtet film, der giver genskin i modlys.",
          "Bruges bilen til børn, indkøb og weekendture, er kabinen som regel det sted, hvor en professionel rengøring gør størst forskel. Her støvsuger vi sæder, gulv og bagagerum og tørrer alle flader af.",
        ],
        list: [
          "Udvendig bilvask: lak, fælge, hjulbuer og ruder",
          "Indvendig rengøring: støvsugning, aftørring og ruder indefra",
          "Hele bilen: begge dele plus voks på lakken",
        ],
      },
      {
        h: "Grønne veje giver grønne biler",
        p: [
          "Vanløse har mange gamle vejtræer og ligger tæt på Damhussøen og Grøndalsparken. Det er dejligt at bo i, men bilerne får alger i lister og gummikanter og harpiks på tag og kølerhjelm. En grundig håndvask kommer ind i de kanter, en vaskehal springer over.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster bilvask i Vanløse?",
        a: "Udvendig bilvask koster 450–899 kr. afhængigt af bilens størrelse. Indvendig rengøring koster 600–899 kr., og hele bilen 799–1.500 kr.",
      },
      {
        q: "Kan I komme på hverdage, mens jeg er på arbejde?",
        a: "Ja. Ved en udvendig vask behøver du ikke at være hjemme. Skal bilen også rengøres indvendigt, aftaler vi, hvordan vi får adgang til kabinen.",
      },
      {
        q: "Fjerner I grønne alger i lister og kanter?",
        a: "Ja, det tager vi med i den udvendige vask, hvor vi også rengør dørkarme og kanter, som en automatvask ikke når.",
      },
      {
        q: "Dækker I også Grøndal og Damhuskvarteret?",
        a: "Ja. Vi dækker hele 2720 Vanløse og nabobydelene Frederiksberg, Rødovre, Valby og Brønshøj.",
      },
    ],
    keywords: ["bilvask Vanløse", "mobil bilvask Vanløse", "bilrengøring Vanløse", "bilvask 2720"],
    image: { src: "/service/helebil.jpg", alt: "Mobil bilvask på villavej i Vanløse" },
    related: [
      "/bilvask-frederiksberg",
      "/bilvask-rodovre",
      "/bilvask-valby",
      "/bilvask-broenshoej",
      "/bilvask-hjemme",
      "/faelgrens",
    ],
    area: {
      name: "Vanløse",
      kommune: "Københavns Kommune",
      postal: "2720",
      nearby: ["Frederiksberg", "Rødovre", "Valby", "Brønshøj", "Nørrebro", "Hvidovre"],
    },
  }),

  areaPage({
    slug: "bilvask-christianshavn",
    title: "Bilvask Christianshavn – vi vasker, hvor du holder",
    description:
      "Mobil bilvask på Christianshavn og Holmen. Ingen kørsel over broerne til en vaskehal – vi kommer til bilen med vand og strøm. Book online fra 450 kr.",
    h1: "Bilvask Christianshavn",
    eyebrow: "København K",
    intro:
      "På Christianshavn er en parkeringsplads guld værd, og ingen har lyst til at opgive den for at køre i vaskehal. Vi vasker bilen, mens den bliver stående.",
    answer:
      "CleanWash vasker biler på Christianshavn, Holmen og Margretheholm. Vi kommer til bilen med eget vand og strøm, så den ikke skal flyttes. Udvendig vask koster fra 450 kr., indvendig rengøring fra 600 kr.",
    sections: [
      {
        h: "Bilvask uden at miste din parkeringsplads",
        p: [
          "Brosten, kanaler og smalle gader gør Christianshavn til et af byens smukkeste kvarterer – og et af de mest besværlige at have bil i. Skal bilen vaskes, kræver det normalt en tur over Knippelsbro eller ud ad Amager, og bagefter begynder parkeringsjagten forfra.",
          "Med mobil bilvask sker det hele på stedet. Bilen holder lovligt, vi kommer med udstyret, og du får den tilbage ren uden at have rørt nøglen.",
        ],
      },
      {
        h: "Havneluft, måger og brostensstøv",
        p: [
          "Tæt på vandet er der altid lidt salt i luften, og mågerne gør deres for at mærke bilerne. Fugleklatter er sure og kan efterlade matte pletter i lakken efter få dage i sol, så de bør vaskes af hurtigt.",
          "Brostenene hvirvler desuden fint støv op, der sætter sig i hjulbuer og på de nederste paneler. Det fjerner vi i forvasken, før vi går videre med håndvasken.",
        ],
      },
      {
        h: "Holmen og Margretheholm",
        p: [
          "På Holmen og ved de nye boliger på Margretheholm er der mere luft omkring bilerne, og vasken foregår typisk på private p-pladser. Holder bilen bag en bom eller i en p-kælder, skriver du det blot i bookingen.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan I vaske bilen på gaden på Christianshavn?",
        a: "Ja, når bilen holder lovligt, og vi kan komme til den. I de smalleste gader er der ikke altid plads nok – er du i tvivl, så ring til os først.",
      },
      {
        q: "Skal I bruge vand fra min lejlighed?",
        a: "Nej. Vi medbringer både vand og strøm og er ikke afhængige af noget fra dig.",
      },
      {
        q: "Kan fugleklatter skade lakken?",
        a: "Ja. De er syreholdige og kan ætse klarlakken, især i varmt vejr. Jo hurtigere de vaskes af, jo mindre er risikoen for varige mærker.",
      },
      {
        q: "Kører I også til Refshaleøen?",
        a: "Ja, vi dækker hele området fra Christianshavn over Holmen til Refshaleøen samt nabokvartererne Islands Brygge og Amager.",
      },
    ],
    keywords: ["bilvask Christianshavn", "mobil bilvask Christianshavn", "bilvask Holmen", "bilvask København K"],
    image: { src: "/service/udenfor.jpg", alt: "Håndvask af bil parkeret på Christianshavn" },
    related: [
      "/bilvask-indre-by",
      "/bilvask-islands-brygge",
      "/bilvask-amager",
      "/bilvask-lejlighed",
      "/udvendig-bilvask-koebenhavn",
      "/blog/fjern-fugleklatter-insekter-uden-at-ridse-lakken",
    ],
    area: {
      name: "Christianshavn",
      kommune: "Københavns Kommune",
      postal: "1400–1449",
      nearby: ["Indre By", "Islands Brygge", "Amager", "Ørestad", "Vesterbro"],
    },
  }),

  areaPage({
    slug: "bilvask-sydhavnen",
    title: "Bilvask Sydhavnen – mobil bilvask i 2450",
    description:
      "Bilvask i Sydhavnen, på Sluseholmen og Teglholmen. Vi kommer til p-pladsen eller p-huset med vand og strøm. Udvendig vask fra 450 kr. Book online.",
    h1: "Bilvask Sydhavnen",
    eyebrow: "2450 København SV",
    intro:
      "Fra de gamle arbejderboliger til kanalbyen på Sluseholmen: i Sydhavnen bor man tæt, og bilen holder sjældent et sted med vand og strøm. Det tager vi med.",
    answer:
      "CleanWash tilbyder mobil bilvask i hele Sydhavnen – Kongens Enghave, Sluseholmen, Teglholmen og Enghave Brygge. Vi kommer til bilen med eget vand og strøm. Priser fra 450 kr. for udvendig vask og 799 kr. for hele bilen.",
    sections: [
      {
        h: "To slags Sydhavn – samme løsning",
        p: [
          "I det gamle Sydhavnen omkring Mozarts Plads holder bilerne på gaden foran karréerne. På Sluseholmen og Teglholmen står de i p-huse og på private pladser mellem de nye byggerier. Fælles for begge er, at man ikke bare kan trække en slange ud.",
          "Derfor fungerer mobil bilvask godt her. Vi kommer til bilen, vasker den på stedet og kører igen – du skal hverken flytte bilen eller stille noget til rådighed.",
        ],
      },
      {
        h: "Byggestøv og motorvejsnavs",
        p: [
          "Sydhavnen er stadig under udbygning, og støvet fra byggepladserne lægger sig på alt. Samtidig pendler mange herfra ad Sydmotorvejen og Vasbygade, hvor bilen får et lag af dækstøv, olierester og om vinteren salt.",
          "Den slags snavs binder sig til lakken og skal løsnes med forvask. Bare at spule bilen af fjerner kun det øverste lag og efterlader den grå film.",
        ],
      },
      {
        h: "Praktisk ved p-huse og bomme",
        p: [
          "Skal vi ind i et p-hus eller forbi en bom, har vi brug for at vide det på forhånd. Skriv gerne portkode, etage og pladsnummer i bemærkningsfeltet. Tjek også, om din ejerforening har regler for bilvask på området.",
        ],
      },
    ],
    faqs: [
      {
        q: "Vasker I biler i p-husene på Sluseholmen og Teglholmen?",
        a: "Ofte ja, men det afhænger af husets regler og pladsen omkring bilen. Oplys p-hus, etage og adgang i bookingen, så vender vi tilbage, hvis noget skal afklares.",
      },
      {
        q: "Hvad koster det at få vasket hele bilen i Sydhavnen?",
        a: "Pakken Hele bilen koster 799 kr. for en lille bil, 899 kr. for en mellemklassebil og 999 kr. for en stor bil. Voks på lakken er inkluderet.",
      },
      {
        q: "Kan jeg booke til samme dag?",
        a: "Ja, hvis der er en ledig tid. Bookingen viser de tider, vi kan nå – tidligst et par timer frem.",
      },
      {
        q: "Hvordan får I byggestøv af uden at ridse?",
        a: "Vi forvasker med skum og skyller, så støvet løsnes og løber af, inden vi vasker i hånden med rene vaskehandsker.",
      },
    ],
    keywords: ["bilvask Sydhavnen", "bilvask Sluseholmen", "bilvask Teglholmen", "bilvask København SV"],
    image: { src: "/service/helebil.jpg", alt: "Mobil bilvask ved nye boliger i Sydhavnen" },
    related: [
      "/bilvask-vesterbro",
      "/bilvask-valby",
      "/bilvask-islands-brygge",
      "/bilvask-hvidovre",
      "/bilvask-samme-dag",
      "/komplet-bilvask",
    ],
    area: {
      name: "Sydhavnen",
      kommune: "Københavns Kommune",
      postal: "2450",
      nearby: ["Vesterbro", "Valby", "Islands Brygge", "Hvidovre", "Ørestad"],
    },
  }),

  areaPage({
    slug: "bilvask-islands-brygge",
    title: "Bilvask Islands Brygge – vi kommer til bilen",
    description:
      "Mobil bilvask på Islands Brygge og Havnestad. Bilen bliver vasket, hvor den holder – vi har vand og strøm med. Udvendig vask fra 450 kr.",
    h1: "Bilvask Islands Brygge",
    eyebrow: "2300 København S",
    intro:
      "På Bryggen er der langt mellem ledige pladser og endnu længere til en vaskehal. Vi vasker bilen på stedet, så du kan beholde din plads.",
    answer:
      "CleanWash tilbyder mobil bilvask på hele Islands Brygge, i Havnestad og ved Amager Fælled. Vi har selv vand og strøm med. Du kan vælge udvendig vask fra 450 kr., indvendig rengøring fra 600 kr. eller hele bilen fra 799 kr.",
    sections: [
      {
        h: "Bilvask på Bryggen uden besvær",
        p: [
          "De gamle karréer langs Njalsgade og Isafjordsgade har gadeparkering, mens Havnestad og byggerierne mod syd har p-kældre og private pladser. Ingen af delene giver adgang til vand ved bilen, og derfor er en mobil løsning den oplagte.",
          "Vi kommer med et lukket system: vand, strøm, skum, klude og støvsuger. Du skal blot sørge for, at bilen kan nås.",
        ],
      },
      {
        h: "Den typiske Brygge-bil",
        p: [
          "Mange biler på Islands Brygge bruges mest i weekenden – til sommerhus, indkøb og besøg uden for byen. Når bilen står stille i hverdagen, samler den støv, blade og fugleklatter, og kabinen bliver hurtigt indelukket.",
          "En bil, der holder stille, har faktisk mere brug for regelmæssig vask end en, der kører dagligt, fordi snavset får lov at sidde længe. Vi anbefaler en udvendig vask cirka en gang om måneden og en indvendig rengøring et par gange om året.",
        ],
      },
      {
        h: "Efter stranden og Fælleden",
        p: [
          "Sand fra Amager Strandpark og græs og mudder fra Fælleden ender i måtter og bagagerum. Sand sliber på tæpperne, hver gang nogen sætter fødderne ned, så det er værd at få det støvsuget grundigt op – også nede langs sædeskinnerne, hvor det gemmer sig.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan I vaske min bil, når den holder på gaden på Islands Brygge?",
        a: "Ja. Bilen skal holde lovligt, og vi skal kunne komme omkring den. Vand og strøm har vi selv med.",
      },
      {
        q: "Hvor tit bør en bil, der mest står stille, vaskes?",
        a: "Cirka en gang om måneden udvendigt. Fugleklatter og harpiks bør dog fjernes inden for få dage, fordi de kan skade lakken.",
      },
      {
        q: "Kan I få sand ud af bilen efter en strandtur?",
        a: "Ja. En indvendig rengøring omfatter grundig støvsugning af sæder, gulv, måtter og bagagerum.",
      },
      {
        q: "Hvad hvis bilen står i en p-kælder?",
        a: "Skriv det i bemærkningsfeltet, når du booker. Så afklarer vi adgang, og om vask er tilladt i kælderen.",
      },
    ],
    keywords: ["bilvask Islands Brygge", "mobil bilvask Islands Brygge", "bilvask Havnestad", "bilvask Bryggen"],
    image: { src: "/service/inside.jpg", alt: "Indvendig rengøring af bil på Islands Brygge" },
    related: [
      "/bilvask-amager",
      "/bilvask-oerestad",
      "/bilvask-christianshavn",
      "/bilvask-sydhavnen",
      "/indvendig-bilrengoering-koebenhavn",
      "/blog/sand-i-bilen-efter-stranden",
    ],
    area: {
      name: "Islands Brygge",
      kommune: "Københavns Kommune",
      postal: "2300",
      nearby: ["Amager", "Ørestad", "Christianshavn", "Sydhavnen", "Indre By"],
    },
  }),

  areaPage({
    slug: "bilvask-nordhavn",
    title: "Bilvask Nordhavn – mobil bilvask i 2150",
    description:
      "Bilvask i Nordhavn uden at køre ud af bydelen. Vi kommer til Århusgadekvarteret, Sundmolen og Levantkaj med vand og strøm. Fra 450 kr.",
    h1: "Bilvask Nordhavn",
    eyebrow: "2150 Nordhavn",
    intro:
      "Nordhavn er tænkt som en by, hvor bilen står i p-hus, og hverdagen klares til fods. Når bilen skal vaskes, kommer vi til den.",
    answer:
      "CleanWash vasker biler i hele Nordhavn. Vi kommer til p-pladsen eller p-huset med eget vand og strøm, så du slipper for turen til en vaskehal. Udvendig bilvask fra 450 kr. – hele bilen fra 799 kr.",
    sections: [
      {
        h: "En bydel, hvor bilen står i p-hus",
        p: [
          "I Århusgadekvarteret, på Sundmolen og ved Levantkaj er der caféer, kontorer og boliger helt ned til vandet, men ikke meget plads til at vaske bil. En tur i vaskehal betyder som regel, at bilen skal ud i trafikken på Kalkbrænderihavnsgade.",
          "Mobil bilvask passer til måden, bydelen er bygget på: bilen bliver, hvor den er, og servicen kommer til den.",
        ],
      },
      {
        h: "Salt, vind og byggeri",
        p: [
          "Nordhavn ligger åbent ud mod Øresund. Vinden bærer saltpartikler ind over bilerne, og de sætter sig sammen med støv fra de mange byggepladser. På ruderne giver det en hinde, som vinduesviskerne bare smører ud.",
          "Salt binder fugt og er hårdt ved både lak og metal. En regelmæssig udvendig vask med grundig skylning af hjulbuer og kanter er den enkleste måde at holde det nede på.",
        ],
      },
      {
        h: "Firmabiler ved kontorhusene",
        p: [
          "Flere store virksomheder har hovedsæde i Nordhavn. Vi vasker gerne medarbejdernes biler eller firmaets egne biler på p-pladsen i arbejdstiden. Er I flere, der vil have vasket bil samme dag, kan vi samle det i ét besøg.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan I vaske bilen i et p-hus i Nordhavn?",
        a: "Det afhænger af p-husets regler og pladsforholdene. Skriv p-hus og etage i bookingen, så afklarer vi det på forhånd.",
      },
      {
        q: "Hjælper bilvask mod saltluft?",
        a: "Ja. Regelmæssig vask fjerner saltet, før det når at binde fugt til lak og metal. Voks på lakken gør, at det slipper nemmere.",
      },
      {
        q: "Kan flere kolleger booke bilvask samme dag?",
        a: "Ja. Kontakt os, så planlægger vi et samlet besøg på jeres p-plads.",
      },
      {
        q: "Hvad koster en udvendig bilvask i Nordhavn?",
        a: "Fra 450 kr. for en lille bil, 600 kr. for en mellemklassebil og 699 kr. for en stor bil eller SUV.",
      },
    ],
    keywords: ["bilvask Nordhavn", "mobil bilvask Nordhavn", "bilvask 2150", "bilvask Århusgadekvarteret"],
    image: { src: "/service/udenfor.jpg", alt: "Udvendig bilvask ved boliger i Nordhavn" },
    related: [
      "/bilvask-osterbro",
      "/bilvask-hellerup",
      "/bilvask-indre-by",
      "/bilvask-personalegode",
      "/bilvask-paa-arbejdspladsen",
      "/blog/bil-ved-kysten-saltluft",
    ],
    area: {
      name: "Nordhavn",
      kommune: "Københavns Kommune",
      postal: "2150",
      nearby: ["Østerbro", "Hellerup", "Indre By", "Gentofte", "Charlottenlund"],
    },
  }),
];
