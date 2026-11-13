import { areaPage, type ContentPage } from "./types";

// Amager uden for Københavns Kommune samt byerne længere ude på Sjælland.
export const areasAmagerSjaelland: ContentPage[] = [
  areaPage({
    slug: "bilvask-tarnby",
    title: "Bilvask Tårnby – lad os tage det tunge arbejde",
    description:
      "Mobil bilvask i Tårnby. Slip for spande, slange og ømme knæ – vi kommer til indkørslen med vand og strøm og vasker bilen. Udvendig vask fra 450 kr.",
    h1: "Bilvask Tårnby",
    eyebrow: "2770 Tårnby",
    intro:
      "Har du vasket bilen selv i mange år, ved du, hvor meget arbejde der er i det. I Tårnby kommer vi forbi og gør det for dig – ordentligt.",
    answer:
      "CleanWash tilbyder mobil bilvask i Tårnby. Vi kommer til din adresse med eget vand og strøm, og du skal ikke løfte en finger. Udvendig bilvask koster fra 450 kr., indvendig rengøring fra 600 kr. og hele bilen fra 799 kr.",
    sections: [
      {
        h: "Bilvask er hårdt arbejde",
        p: [
          "En ordentlig bilvask kræver, at man bukker sig ned til fælge og paneler, strækker sig ind over taget og ligger halvt inde i kabinen med en støvsuger. Det er fint, når man er 30. Det bliver sværere med årene – eller med en dårlig ryg.",
          "Mange i Tårnbys villakvarterer har altid selv holdt bilen. Når kræfterne eller lysten ikke er til det længere, er alternativet ikke nødvendigvis vaskehallens børster. Vi vasker bilen i hånden, sådan som du selv ville have gjort det.",
        ],
      },
      {
        h: "Ingen slange, ingen ledning, intet rod",
        p: [
          "Vi har vand og strøm med i bilen. Du skal ikke åbne garagen, finde en forlængerledning eller rulle slangen ud. Vi rydder op efter os, og indkørslen ser ud, som da vi kom.",
          "Vil du gerne se, hvordan vi arbejder, er du velkommen. Vil du hellere drikke kaffe indenfor, giver vi besked, når bilen er klar.",
        ],
      },
      {
        h: "Hjælp til en forælder eller nabo?",
        p: [
          "Du kan også booke på vegne af andre. Mange bestiller en bilvask til en forælder, der stadig kører bil, men ikke længere kan holde den selv. Skriv blot den rigtige adresse og et telefonnummer, vi kan ringe til ved ankomst.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan jeg bestille bilvask til min mor eller far i Tårnby?",
        a: "Ja. Book med deres adresse, og skriv i bemærkningsfeltet, hvem vi skal kontakte, når vi ankommer.",
      },
      {
        q: "Skal jeg hjælpe til under vasken?",
        a: "Nej. Vi klarer det hele og har alt udstyr med.",
      },
      {
        q: "Kan jeg betale kontant?",
        a: "De fleste betaler med MobilePay, men kontant betaling kan aftales. Nævn det, når du booker.",
      },
      {
        q: "Vasker I lige så grundigt som en håndvask derhjemme?",
        a: "Ja – og med forvask, rene vaskehandsker og aftørring. Fælge, hjulbuer, karme og ruder er med hver gang.",
      },
    ],
    keywords: ["bilvask Tårnby", "mobil bilvask Tårnby", "bilvask 2770", "bilvask hjemme Tårnby"],
    image: { src: "/service/helebil.jpg", alt: "Mobil bilvask i indkørsel i Tårnby" },
    related: [
      "/bilvask-kastrup",
      "/bilvask-amager",
      "/bilvask-dragor",
      "/bilvask-oerestad",
      "/bilvask-hjemme",
      "/haandvask-bil-koebenhavn",
    ],
    area: {
      name: "Tårnby",
      kommune: "Tårnby Kommune",
      postal: "2770",
      nearby: ["Kastrup", "Amager", "Dragør", "Ørestad"],
    },
  }),

  areaPage({
    slug: "bilvask-kastrup",
    title: "Bilvask Kastrup – ren bil, når du lander",
    description:
      "Mobil bilvask i Kastrup. Få bilen vasket hjemme, mens du er på vagt i lufthavnen eller ude at rejse. Vi har vand og strøm med. Fra 450 kr.",
    h1: "Bilvask Kastrup",
    eyebrow: "2770 Kastrup",
    intro:
      "Kastrup lever efter lufthavnens ur: tidlige vagter, sene vagter og rejser ud i verden. Vi vasker bilen, når det passer dig – alle ugens dage.",
    answer:
      "CleanWash tilbyder mobil bilvask i Kastrup. Vi kommer til din adresse med eget vand og strøm alle ugens dage. Udvendig bilvask koster fra 450 kr. og kan udføres, uden at du er hjemme. Hele bilen koster fra 799 kr.",
    sections: [
      {
        h: "Til dig med skæve arbejdstider",
        p: [
          "Arbejder du i skiftehold, passer en vaskehal sjældent ind. Enten sover du, eller også er du på vagt. Vi kører alle ugens dage, og en udvendig vask kræver ikke, at du er til stede. Bilen skal bare holde hjemme.",
          "Skal kabinen også have en tur, aftaler vi, hvordan vi får nøglen.",
        ],
      },
      {
        h: "Kom hjem fra rejsen til en ren bil",
        p: [
          "Står bilen hjemme i indkørslen, mens du er væk, kan den blive vasket imens. Book en udvendig vask til en dag i ferien, så holder den klar, når du kommer hjem med kufferterne.",
          "En bil, der står stille i to uger, samler i øvrigt mere, end man tror: støv, blade, fugleklatter og harpiks. Jo længere det sidder, jo sværere er det at få af.",
        ],
      },
      {
        h: "Havnen, stranden og Øresund",
        p: [
          "Mellem Kastrup Havn og Amager Strandpark er der åbent ud mod Sundet. Saltdisen lægger sig på bilerne, og om sommeren kommer der sand oveni. Kører du taxa eller limousine fra lufthavnen, ved du, hvor hurtigt en sort bil ser støvet ud herude.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan I vaske bilen, mens jeg er ude at rejse?",
        a: "Ja, en udvendig vask kan udføres, uden at du er hjemme, hvis bilen holder tilgængeligt på din adresse. Betalingen aftaler vi på forhånd.",
      },
      {
        q: "Vasker I på lufthavnens parkeringspladser?",
        a: "Nej. Vi vasker på private adresser og private p-pladser.",
      },
      {
        q: "Vasker I taxaer?",
        a: "Ja. Vi vasker taxaer og limousiner og laver gerne en fast aftale.",
      },
      {
        q: "Kører I også om søndagen?",
        a: "Ja, alle ugens dage. De ledige tider står i bookingen.",
      },
    ],
    keywords: ["bilvask Kastrup", "mobil bilvask Kastrup", "bilvask lufthavnen", "bilvask 2770"],
    image: { src: "/service/udenfor.jpg", alt: "Udvendig bilvask ved bolig i Kastrup" },
    related: [
      "/bilvask-tarnby",
      "/bilvask-amager",
      "/bilvask-dragor",
      "/bilvask-taxa",
      "/bilvask-i-weekenden",
      "/bilvask-efter-ferien",
    ],
    area: {
      name: "Kastrup",
      kommune: "Tårnby Kommune",
      postal: "2770",
      nearby: ["Tårnby", "Amager", "Dragør", "Ørestad"],
    },
  }),

  areaPage({
    slug: "bilvask-dragor",
    title: "Bilvask Dragør – mod salt og blæst",
    description:
      "Mobil bilvask i Dragør, Søvang og Store Magleby. Vi vasker saltet af bilen på din adresse og beskytter lakken med voks. Vand og strøm medbringes.",
    h1: "Bilvask Dragør",
    eyebrow: "2791 Dragør",
    intro:
      "Dragør har vand på tre sider og vind fra dem alle. Det er godt for sejlerne og hårdt ved bilerne. Vi holder saltet nede.",
    answer:
      "CleanWash tilbyder mobil bilvask i Dragør, Søvang og Store Magleby. Vi kommer til din adresse med eget vand og strøm. Udvendig bilvask koster fra 450 kr., og Hele bilen med voks – der beskytter mod salt – koster fra 799 kr.",
    sections: [
      {
        h: "Salt hele året",
        p: [
          "De fleste biler møder kun salt om vinteren. I Dragør kommer det med vinden fra Øresund hver eneste uge. Det sætter sig som hvide rande på ruderne og kryber ind i sprækker ved lygter, lister og håndtag.",
          "Salt trækker fugt ud af luften. En saltet overflade er derfor altid en smule våd, og det er dét, der sætter gang i rust på stenslag og ridser. Den enkleste forebyggelse er at vaske saltet af, før det får lov at arbejde.",
        ],
      },
      {
        h: "Voks gør en forskel herude",
        p: [
          "Et lag voks er en tynd barriere mellem lakken og omverdenen. Vand og salt perler af i stedet for at ligge som en hinde. Ved kysten holder voks kortere tid end inde i landet, så vi anbefaler ny voks tre til fire gange om året. Den følger med, hver gang du vælger Hele bilen.",
        ],
      },
      {
        h: "Den gamle by og de nye kvarterer",
        p: [
          "I den gamle bydel med de gule huse er stræderne så smalle, at bilerne holder på pladserne i udkanten. Dér kan vi ofte vaske dem – spørg os, hvis du er i tvivl om et bestemt sted.",
          "I Søvang, på Nordstranden og i Store Magleby har de fleste egen indkørsel, og her foregår vasken foran huset.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvor ofte bør en bil i Dragør vaskes?",
        a: "Hver anden til tredje uge er passende så tæt på havet – og oftere efter storm eller perioder med meget pålandsvind.",
      },
      {
        q: "Hvor længe holder voks ved kysten?",
        a: "Typisk to til tre måneder. Salt, sol og vind slider hurtigere på voksen end inde i landet.",
      },
      {
        q: "Kan I vaske biler, der holder uden for den gamle by?",
        a: "Ofte ja, hvis det er tilladt på pladsen, og vi kan komme omkring bilen. Kontakt os gerne først.",
      },
      {
        q: "Kører I til Søvang og Store Magleby?",
        a: "Ja, hele Dragør Kommune er dækket.",
      },
    ],
    keywords: ["bilvask Dragør", "mobil bilvask Dragør", "bilvask Søvang", "bilvask 2791"],
    image: { src: "/service/udenfor.jpg", alt: "Udvendig bilvask af bil i Dragør" },
    related: [
      "/bilvask-kastrup",
      "/bilvask-tarnby",
      "/bilvask-amager",
      "/bilvask-med-voks",
      "/blog/bil-ved-kysten-saltluft",
      "/blog/hvor-laenge-holder-bilvoks",
    ],
    area: {
      name: "Dragør",
      kommune: "Dragør Kommune",
      postal: "2791",
      nearby: ["Kastrup", "Tårnby", "Amager", "Ørestad"],
    },
  }),

  areaPage({
    slug: "bilvask-holbaek",
    title: "Bilvask Holbæk – en plan for hele året",
    description:
      "Mobil bilvask i Holbæk. Vi kommer til din adresse med vand og strøm. Se hvornår på året bilen har mest brug for vask. Udvendig vask fra 450 kr.",
    h1: "Bilvask Holbæk",
    eyebrow: "4300 Holbæk",
    intro:
      "Holbæk har fjord, havn og motorvej lige til København. Vi kører herud og vasker bilen hjemme hos dig – og her er en enkel plan for året.",
    answer:
      "CleanWash tilbyder mobil bilvask i Holbæk. Vi kommer til din adresse med eget vand og strøm. Udvendig bilvask koster fra 450 kr., indvendig rengøring fra 600 kr. og hele bilen fra 799 kr. Et eventuelt kørselstillæg vises, før du bekræfter.",
    sections: [
      {
        h: "Fire tidspunkter, hvor bilen har mest brug for det",
        p: [
          "Du behøver ikke at vaske bilen hver uge. Men der er fire tidspunkter på året, hvor en grundig omgang betaler sig særligt godt.",
        ],
        list: [
          "Marts–april: Vinterens salt skal af, og kabinen trænger efter måneder med våde sko. Vælg Hele bilen.",
          "Juni: Pollen, insekter og harpiks. En udvendig vask, inden solen bager det fast.",
          "September: Efter sommerens ture. Sand og krummer ud af kabinen med en indvendig rengøring.",
          "November: Hele bilen med voks, så lakken er beskyttet, før saltbilerne kører ud.",
        ],
      },
      {
        h: "Pendler du ad Holbækmotorvejen?",
        p: [
          "Så får bilen mere vejsnavs end gennemsnittet. Tre kvarter hver vej i tæt trafik giver et lag af dækstøv og olietåge, og om vinteren står saltet i en sky bag lastbilerne. Læg en ekstra udvendig vask ind i januar og februar.",
        ],
      },
      {
        h: "Vi kører i Holbæk og omegn",
        p: [
          "Vi vasker i villakvartererne, ved havnefrontens nye boliger og i byerne omkring Holbæk. Bookingen viser, hvilke dage vi har tider. Skal flere biler vaskes på samme adresse, tager vi dem i ét besøg.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kommer I helt til Holbæk?",
        a: "Ja. Holbæk er en del af vores område på Sjælland. Se de ledige tider i bookingen.",
      },
      {
        q: "Hvornår på året er det vigtigst at vaske bilen?",
        a: "Efter vinteren, hvor saltet skal af, og før vinteren, hvor lakken skal have voks. Det er de to vigtigste.",
      },
      {
        q: "Er priserne de samme i Holbæk som i København?",
        a: "Pakkepriserne er de samme. Hvis der gælder et kørselstillæg for din adresse, vises det i prisen, inden du bekræfter.",
      },
      {
        q: "Kan I vaske ved de nye boliger på havnen?",
        a: "Ja, hvis ejerforeningen tillader det, og vi kan komme til bilen. Skriv p-plads eller p-kælder i bookingen.",
      },
    ],
    keywords: ["bilvask Holbæk", "mobil bilvask Holbæk", "bilvask 4300", "bilrengøring Holbæk"],
    image: { src: "/service/helebil.jpg", alt: "Mobil bilvask ved bolig i Holbæk" },
    related: [
      "/bilvask-roskilde",
      "/bilvask-ringsted",
      "/bilvask-kalundborg",
      "/bilvask-lejre",
      "/bilvask-vestsjaelland",
      "/bilvask-foer-vinter",
    ],
    area: {
      name: "Holbæk",
      kommune: "Holbæk Kommune",
      postal: "4300",
      nearby: ["Roskilde", "Ringsted", "Kalundborg", "Lejre", "Sorø"],
    },
  }),

  areaPage({
    slug: "bilvask-ringsted",
    title: "Bilvask Ringsted – væk med tjære og insekter",
    description:
      "Mobil bilvask i Ringsted. Vi fjerner motorvejens tjærepletter og insekter skånsomt på din adresse. Vand og strøm har vi med. Fra 450 kr.",
    h1: "Bilvask Ringsted",
    eyebrow: "4100 Ringsted",
    intro:
      "Ringsted ligger midt på Sjælland, hvor motorvej og landeveje mødes. Biler herfra kører langt – og det kan ses på fronten og siderne.",
    answer:
      "CleanWash tilbyder mobil bilvask i Ringsted. Vi kommer til din adresse med eget vand og strøm. Udvendig bilvask koster fra 450 kr. og omfatter lak, fælge, hjulbuer og ruder. Hele bilen koster fra 799 kr.",
    sections: [
      {
        h: "Sorte prikker bag hjulene",
        p: [
          "Kører du meget på motorvej, har du set dem: små sorte prikker på dørene bag for- og baghjul. Det er tjære og bitumen fra asfalten, som dækkene slynger op. De ses tydeligst på lyse biler og kan ikke vaskes af med almindelig sæbe.",
          "Tjærepletter skal opløses, ikke skrubbes. Bruger man neglen eller en grov svamp, ridser man lakken omkring pletten. Nævn det i bookingen, hvis bilen har mange, så vi kan sætte tid af til dem.",
        ],
      },
      {
        h: "Insekter på lange stræk",
        p: [
          "Fra Ringsted er der motorvej i begge retninger, og om sommeren bliver kofanger, spejle og forrude dækket af insekter. Deres rester er sure. I varmen ætser de sig ned i klarlakken på få dage.",
          "Vi bløder insekterne op og fjerner dem som en del af den udvendige vask. Jo oftere bilen vaskes om sommeren, jo lettere slipper de.",
        ],
      },
      {
        h: "Hjemme i Ringsted",
        p: [
          "Vi kører i Ringsted by, Benløse og landsbyerne omkring. Du booker en tid online, og vi kommer til din indkørsel eller p-plads. Du skal hverken stille vand eller strøm til rådighed.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad er de sorte prikker på siden af bilen?",
        a: "Tjære og bitumen fra vejen. De skal opløses med et egnet middel og tørres af – ikke skrabes.",
      },
      {
        q: "Skader insekter lakken?",
        a: "Ja, hvis de får lov at sidde i varmen. Resterne er syreholdige og kan efterlade matte mærker.",
      },
      {
        q: "Kører I til Benløse og landsbyerne omkring Ringsted?",
        a: "Ja. Skriv adressen i bookingen. Et eventuelt kørselstillæg vises i prisen før bekræftelse.",
      },
      {
        q: "Hvor lang tid tager en udvendig vask?",
        a: "Cirka 65 minutter. Er der mange tjærepletter eller insekter, kan det tage lidt længere.",
      },
    ],
    keywords: ["bilvask Ringsted", "mobil bilvask Ringsted", "bilvask 4100", "tjærepletter bil"],
    image: { src: "/service/udenfor.jpg", alt: "Udvendig bilvask af pendlerbil i Ringsted" },
    related: [
      "/bilvask-soroe",
      "/bilvask-koege",
      "/bilvask-haslev",
      "/bilvask-roskilde",
      "/blog/fjern-tjaerepletter-fra-lakken",
      "/blog/fjern-fugleklatter-insekter-uden-at-ridse-lakken",
    ],
    area: {
      name: "Ringsted",
      kommune: "Ringsted Kommune",
      postal: "4100",
      nearby: ["Sorø", "Køge", "Haslev", "Roskilde", "Næstved", "Holbæk"],
    },
  }),

  areaPage({
    slug: "bilvask-soroe",
    title: "Bilvask Sorø – også til bilen, der står stille",
    description:
      "Mobil bilvask i Sorø. Vi kommer til din adresse med vand og strøm. Særligt godt til biler, der sjældent kører og samler alger, støv og fugt.",
    h1: "Bilvask Sorø",
    eyebrow: "4180 Sorø",
    intro:
      "Sorø er søer, skov og rolige villaveje. Mange biler her kører ikke langt om ugen – og netop de biler har mest brug for at blive passet.",
    answer:
      "CleanWash tilbyder mobil bilvask i Sorø. Vi kommer til din adresse og medbringer selv vand og strøm. Udvendig bilvask fra 450 kr., indvendig rengøring fra 600 kr. og hele bilen fra 799 kr.",
    sections: [
      {
        h: "En bil bliver ikke renere af at stå stille",
        p: [
          "Man skulle tro, at en bil, der kun kører et par ture om ugen, holder sig pæn. Det er omvendt. Den står under træerne og samler blade, harpiks og fugleklatter. I skyggen gror der alger i lister og sprækker. Og fordi den aldrig bliver kørt varm, bliver fugten i kabinen.",
          "Resultatet er en bil, der lugter indelukket, har duggede ruder og grønne kanter. Det er helt almindeligt, og det er let at gøre noget ved.",
        ],
      },
      {
        h: "Det hjælper",
        p: [
          "Udvendigt fjerner en håndvask alger, blade og belægninger – også i dørkarme og omkring bagklappen, hvor vandet ellers bliver stående.",
          "Indvendigt handler det om at få fugten og dens føde væk. Vi støvsuger, rengør måtter og tørrer flader af. Lugter kabinen muggent, kan AC-rengøring vælges til. Luft gerne bilen ud en tør dag bagefter.",
        ],
      },
      {
        h: "Under bøgetræerne ved søen",
        p: [
          "Sorø er omgivet af bøgeskov. Om efteråret drysser der bog og blade, og om foråret klistrer knopskællene til lakken. Holder bilen under træer, bør afløbene ved forruden renses for blade et par gange om året.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvorfor lugter min bil indelukket, når den ikke bruges ret meget?",
        a: "Fordi fugt fra sko, tøj og luft ikke bliver tørret ud på korte ture. Fugten giver grobund for lugt i tæpper, måtter og ventilationsanlæg.",
      },
      {
        q: "Kan I fjerne grønne alger på bilen?",
        a: "Ja. Alger i lister, karme og på gummikanter fjernes ved den udvendige håndvask.",
      },
      {
        q: "Hvad koster AC-rengøring?",
        a: "AC-rengøring er et tilvalg til 300 kr. og bookes sammen med en bilvask.",
      },
      {
        q: "Kører I ud til Sorø?",
        a: "Ja. Bookingen viser de tider, vi har i området. Et eventuelt kørselstillæg vises, før du bekræfter.",
      },
    ],
    keywords: ["bilvask Sorø", "mobil bilvask Sorø", "bilvask 4180", "bilrengøring Sorø"],
    image: { src: "/service/inside.jpg", alt: "Indvendig rengøring af bil i Sorø" },
    related: [
      "/bilvask-ringsted",
      "/bilvask-slagelse",
      "/bilvask-holbaek",
      "/aircondition-rens-bil",
      "/blog/bil-der-har-staaet-stille-laenge",
      "/blog/fjern-skimmel-i-bilen",
    ],
    area: {
      name: "Sorø",
      kommune: "Sorø Kommune",
      postal: "4180",
      nearby: ["Ringsted", "Slagelse", "Holbæk", "Næstved"],
    },
  }),

  areaPage({
    slug: "bilvask-kalundborg",
    title: "Bilvask Kalundborg – mobil bilvask i Vestsjælland",
    description:
      "Mobil bilvask i Kalundborg. Vi kommer til din adresse med vand og strøm og fjerner salt, støv og små rustprikker fra lakken. Fra 450 kr.",
    h1: "Bilvask Kalundborg",
    eyebrow: "4400 Kalundborg",
    intro:
      "Kalundborg er havneby og industriby yderst på Vestsjælland. Vi kører herud, når der er tider i kalenderen, og vasker bilen hjemme hos dig.",
    answer:
      "CleanWash tilbyder mobil bilvask i Kalundborg efter ledige tider. Vi medbringer eget vand og strøm. Udvendig bilvask koster fra 450 kr. og hele bilen fra 799 kr. Bookingen viser tider og et eventuelt kørselstillæg, før du bekræfter.",
    sections: [
      {
        h: "Små orange prikker på lakken",
        p: [
          "Har du en lys bil, og har du set små, rustfarvede prikker på bagklap og sider? Det kaldes flyverust. Det er ikke bilen, der ruster. Det er bittesmå jernpartikler fra luften, som har sat sig i lakken og er begyndt at ruste dér.",
          "Partiklerne kommer blandt andet fra bremser, jernbaner og industri, og i byer med havn og tung trafik ses de oftere. De kan ikke vaskes af med svamp og sæbe, men de kan opløses kemisk. Skriv det i bookingen, hvis din bil er ramt.",
        ],
      },
      {
        h: "Fjordluft og vestenvind",
        p: [
          "Kalundborg ligger åbent mod vest. Vinden kommer ind over fjorden med fugt og salt. Det giver et hårdt klima for lak, gummilister og krom. En fast vaskerytme og voks på lakken er de to ting, der virker.",
        ],
      },
      {
        h: "Book i god tid",
        p: [
          "Kalundborg ligger i den yderste del af vores område. Vi samler derfor gerne flere besøg på samme dag. Book et par dage frem, og gå gerne sammen med en nabo eller kollega – så er chancen for en tid, der passer, størst.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad er flyverust?",
        a: "Små jernpartikler fra luften, der sætter sig i lakken og ruster. Det ses som orange prikker, især på lyse biler, og skal opløses kemisk.",
      },
      {
        q: "Kører I fast i Kalundborg?",
        a: "Vi kører i Kalundborg, når der er ledige tider. Bookingen viser, hvilke dage vi kan komme.",
      },
      {
        q: "Er der kørselstillæg til Kalundborg?",
        a: "Hvis der gælder et tillæg for din adresse, vises det tydeligt i prisen, inden du bekræfter bookingen.",
      },
      {
        q: "Kan flere i samme gade booke samme dag?",
        a: "Ja, og det er en god idé. Kontakt os, så samler vi besøgene.",
      },
    ],
    keywords: ["bilvask Kalundborg", "mobil bilvask Kalundborg", "bilvask 4400", "flyverust bil"],
    image: { src: "/service/udenfor.jpg", alt: "Udvendig håndvask af bil i Kalundborg" },
    related: [
      "/bilvask-holbaek",
      "/bilvask-slagelse",
      "/bilvask-vestsjaelland",
      "/bilvask-med-voks",
      "/blog/flyverust-hvad-er-det",
      "/blog/bil-ved-kysten-saltluft",
    ],
    area: {
      name: "Kalundborg",
      kommune: "Kalundborg Kommune",
      postal: "4400",
      nearby: ["Holbæk", "Slagelse", "Sorø"],
    },
  }),

  areaPage({
    slug: "bilvask-haslev",
    title: "Bilvask Haslev – pas på bilens værdi",
    description:
      "Mobil bilvask i Haslev. Vi kommer til din adresse med vand og strøm. Regelmæssig rengøring holder bilens værdi oppe. Udvendig vask fra 450 kr.",
    h1: "Bilvask Haslev",
    eyebrow: "4690 Haslev",
    intro:
      "Fra Haslev er der langt til det meste, og bilerne får mange kilometer. Jo flere kilometer, jo vigtigere er det, at bilen ellers er velholdt.",
    answer:
      "CleanWash tilbyder mobil bilvask i Haslev. Vi kommer til din adresse med eget vand og strøm. Udvendig bilvask koster fra 450 kr., indvendig rengøring fra 600 kr. og hele bilen fra 799 kr.",
    sections: [
      {
        h: "Stand betyder mere end årgang",
        p: [
          "To ens biler med samme kilometertal kan have vidt forskellig værdi. Forskellen er standen. En køber eller forhandler ser på lakken, sæderne, rattet og lugten i kabinen, før de ser i servicebogen.",
          "Slid kan man ikke fjerne. Men det meste af det, der ligner slid, er i virkeligheden snavs, der har fået lov at sidde for længe.",
        ],
        list: [
          "Blankslidt rat og gearknop er oftest fedt og snavs – det kan renses.",
          "Mørke skjolder på sæderne er indgroet snavs – en sæderens fjerner meget.",
          "Mat lak skyldes ofte vejfilm og manglende beskyttelse – vask og voks hjælper.",
          "Dårlig lugt sætter sig i tekstiler og anlæg – jo før, jo lettere at fjerne.",
        ],
      },
      {
        h: "Landeveje, skov og godser",
        p: [
          "Omkring Haslev er der skov og landbrug i alle retninger. Det giver mudder om vinteren og støv om sommeren. Kører du på Sydmotorvejen til arbejde, kommer der vejsalt og insekter oveni.",
        ],
      },
      {
        h: "Vi kommer til dig",
        p: [
          "Du behøver ikke at køre til Køge eller Næstved for at få en ordentlig bilvask. Vi kører til Haslev og vasker i din indkørsel. Bookingen viser de tider, vi har i området.",
        ],
      },
    ],
    faqs: [
      {
        q: "Øger en ren bil virkelig salgsprisen?",
        a: "En velholdt bil er lettere at sælge og giver et bedre førsteindtryk. Hvor meget det betyder i kroner, afhænger af bilen, men standen er altid en del af vurderingen.",
      },
      {
        q: "Hvad koster en sæderens?",
        a: "Sæderens af op til fem sæder er et tilvalg til 300 kr.",
      },
      {
        q: "Kører I til Haslev?",
        a: "Ja, efter ledige tider. Et eventuelt kørselstillæg vises i prisen, før du bekræfter.",
      },
      {
        q: "Kan I gøre en bil klar til salg?",
        a: "Ja. Vælg Hele bilen og eventuelt sæderens. Så står bilen skarpt til billeder og fremvisning.",
      },
    ],
    keywords: ["bilvask Haslev", "mobil bilvask Haslev", "bilvask 4690", "klargøring bil Haslev"],
    image: { src: "/home/vaskseat.jpg", alt: "Rens af bilsæde ved bilvask i Haslev" },
    related: [
      "/bilvask-ringsted",
      "/bilvask-koege",
      "/bilvask-naestved",
      "/klargoering-bil-salg",
      "/saederens-bil",
      "/bilvask-sydsjaelland",
    ],
    area: {
      name: "Haslev",
      kommune: "Faxe Kommune",
      postal: "4690",
      nearby: ["Ringsted", "Køge", "Næstved", "Vordingborg"],
    },
  }),

  areaPage({
    slug: "bilvask-vordingborg",
    title: "Bilvask Vordingborg – gør bilen klar til vinter",
    description:
      "Mobil bilvask i Vordingborg. Vi kommer til din adresse med vand og strøm. Hele bilen med voks fra 799 kr. – god beskyttelse før saltsæsonen.",
    h1: "Bilvask Vordingborg",
    eyebrow: "4760 Vordingborg",
    intro:
      "Vordingborg ligger ved Storstrømmen med broer og vand til alle sider. Her er der salt i luften og blæst over vejene – især om vinteren.",
    answer:
      "CleanWash tilbyder mobil bilvask i Vordingborg efter ledige tider. Vi medbringer eget vand og strøm. Pakken Hele bilen med udvendig vask, indvendig rengøring og voks koster fra 799 kr. Udvendig vask alene fra 450 kr.",
    sections: [
      {
        h: "Tre ting, bilen har brug for før vinteren",
        p: [
          "Vinteren er den årstid, der slider mest på en bil. Det kan man ikke ændre, men man kan forberede bilen, så den kommer bedre igennem.",
        ],
        list: [
          "Ren lak med voks: Salt og sjap slipper lettere, og lakken er beskyttet mod fugt.",
          "Rene ruder inde og ude: Lav sol og mørke morgener afslører hver eneste stribe på forruden.",
          "Tør kabine: Rene måtter og tæpper holder mindre på fugten, så ruderne dugger mindre.",
        ],
      },
      {
        h: "Broer, blæst og salt",
        p: [
          "Kører du over Storstrømmen eller Farøbroerne, ved du, hvor udsat der er. Vinden pisker saltvand og vejsalt ind over kørebanen. Efter sådan en tur sidder der salt i hjulbuer, på bagklap og i dørkarme.",
          "Skyl ikke bare bilen – få den vasket. Salt, der er tørret ind, kommer kun af med sæbe og grundig skylning.",
        ],
      },
      {
        h: "Vi kører til Sydsjælland",
        p: [
          "Vordingborg ligger i den sydlige ende af vores område. Bookingen viser, hvornår vi har tider. Book gerne et par dage frem, og skriv i bemærkningsfeltet, hvis flere biler skal vaskes.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvornår skal bilen have voks før vinteren?",
        a: "I oktober eller november, inden der saltes på vejene. Voks er inkluderet i pakken Hele bilen.",
      },
      {
        q: "Kan man få vasket bil om vinteren?",
        a: "Ja, så længe det ikke er hård frost. Det er faktisk om vinteren, bilen har mest brug for det.",
      },
      {
        q: "Kører I til Vordingborg?",
        a: "Ja, efter ledige tider. Et eventuelt kørselstillæg vises i prisen, inden du bekræfter.",
      },
      {
        q: "Hvorfor dugger ruderne mere om vinteren?",
        a: "Fordi der er mere fugt i kabinen fra sne, regn og våde sko. Rene ruder og tørre måtter mindsker problemet.",
      },
    ],
    keywords: ["bilvask Vordingborg", "mobil bilvask Vordingborg", "bilvask 4760", "bilvask før vinter"],
    image: { src: "/service/helebil.jpg", alt: "Bilvask og voks før vinter i Vordingborg" },
    related: [
      "/bilvask-naestved",
      "/bilvask-haslev",
      "/bilvask-sydsjaelland",
      "/bilvask-foer-vinter",
      "/bilvask-med-voks",
      "/blog/vejsalt-og-rust-paa-bilen",
    ],
    area: {
      name: "Vordingborg",
      kommune: "Vordingborg Kommune",
      postal: "4760",
      nearby: ["Næstved", "Haslev"],
    },
  }),

  areaPage({
    slug: "bilvask-korsoer",
    title: "Bilvask Korsør – klare ruder ved Storebælt",
    description:
      "Mobil bilvask i Korsør og Halsskov. Vi fjerner saltfilm fra ruder og lak på din adresse og har selv vand og strøm med. Udvendig vask fra 450 kr.",
    h1: "Bilvask Korsør",
    eyebrow: "4220 Korsør",
    intro:
      "I Korsør er Storebælt nabo. Udsigten er fantastisk – gennem en ren rude. Saltet fra bæltet gør sit for at sløre den.",
    answer:
      "CleanWash tilbyder mobil bilvask i Korsør og Halsskov efter ledige tider. Vi kommer med eget vand og strøm. Udvendig bilvask koster fra 450 kr. og omfatter pudsning af ruder og spejle. Hele bilen koster fra 799 kr.",
    sections: [
      {
        h: "Saltfilm på ruderne",
        p: [
          "Ved Storebælt er luften salt, og det ses først på ruderne. Der kommer en grålig hinde, som viskerne smører ud til striber. Sprinklervæske hjælper et øjeblik, og så er hinden der igen.",
          "Hinden består af salt, støv og fedt. Den skal vaskes af med sæbe og pudses efter. Samtidig bør viskerbladene tørres af – ellers trækker de det gamle snavs ud over den rene rude.",
        ],
      },
      {
        h: "Indersiden betyder lige så meget",
        p: [
          "Halvdelen af dårligt udsyn sidder på indersiden. Plast og vinyl i kabinen afgiver dampe, som sætter sig som en fedtet film på forruden. I modlys over bæltet eller i mørke med modkørende lygter bliver den til et hvidt slør.",
          "Ved indvendig rengøring pudser vi alle ruder indefra. Det er en af de ting, man lægger mest mærke til bagefter.",
        ],
      },
      {
        h: "Bropendlere og havnebyens biler",
        p: [
          "Kører du dagligt over Storebæltsbroen, får bilen en ordentlig omgang salt og vind. Bor du ved havnen eller på Halsskov, står den i det hele døgnet. Begge dele taler for en fast aftale om udvendig vask.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvorfor bliver forruden stribet, lige efter jeg har vasket den?",
        a: "Ofte fordi viskerbladene er beskidte, eller fordi der sidder en fedtfilm, som almindelig sprinklervæske ikke opløser.",
      },
      {
        q: "Pudser I ruderne indvendigt?",
        a: "Ja, ved indvendig rengøring og ved Hele bilen. Ved udvendig vask pudses ruder og spejle udefra.",
      },
      {
        q: "Kører I til Korsør?",
        a: "Ja, efter ledige tider. Bookingen viser mulige dage og et eventuelt kørselstillæg.",
      },
      {
        q: "Hvor tit skal en bil ved Storebælt vaskes?",
        a: "Hver anden til tredje uge, hvis den holder ude tæt på vandet.",
      },
    ],
    keywords: ["bilvask Korsør", "mobil bilvask Korsør", "bilvask Halsskov", "bilvask 4220"],
    image: { src: "/service/udenfor.jpg", alt: "Pudsning af ruder ved bilvask i Korsør" },
    related: [
      "/bilvask-slagelse",
      "/bilvask-soroe",
      "/bilvask-vestsjaelland",
      "/udvendig-bilvask-koebenhavn",
      "/blog/rene-bilruder-uden-striber",
      "/blog/bil-ved-kysten-saltluft",
    ],
    area: {
      name: "Korsør",
      kommune: "Slagelse Kommune",
      postal: "4220",
      nearby: ["Slagelse", "Sorø", "Kalundborg"],
    },
  }),

  areaPage({
    slug: "bilvask-lejre",
    title: "Bilvask Lejre – til biler fra landet",
    description:
      "Mobil bilvask i Lejre, Hvalsø og Kirke Hyllinge. Vi kommer ud på landet med vand og strøm og vasker mudder og grusstøv af. Fra 450 kr.",
    h1: "Bilvask Lejre",
    eyebrow: "4320 Lejre",
    intro:
      "I Lejre Kommune er der længere mellem husene end mellem bakkerne. Bilerne kører på grus, markveje og små landeveje – og det kan ses.",
    answer:
      "CleanWash tilbyder mobil bilvask i Lejre og omegn. Vi kommer til gården, huset eller landsbyen med eget vand og strøm. Udvendig bilvask koster fra 450 kr., hele bilen fra 799 kr. Et eventuelt kørselstillæg vises, før du bekræfter.",
    sections: [
      {
        h: "Mudder skjuler det, du burde se",
        p: [
          "En bil fra landet har som regel et fast lag jord langs dørtrin, bag hjulene og under kofangerne. Det er ikke bare grimt. Laget skjuler stenslag og små skader i lakken. Og hvor lakken er brudt, og jorden holder på fugten, begynder rusten.",
          "Når bilen er vasket ordentligt, kan du se, hvad der er sket med den siden sidst. Et stenslag, der opdages i tide, kan udbedres for få penge. Et, der har rustet i to vintre, kan ikke.",
        ],
      },
      {
        h: "Grusveje og dørkarme",
        p: [
          "På grusvej suges støvet ind i alle sprækker. Åbn bagklappen eller en dør, og du finder en grå stribe hele vejen rundt. Hver gang døren lukkes, drysser lidt af det ind på måtter og sæder.",
          "Vi tørrer karme og kanter af som en del af håndvasken. Det er dét, der holder støvet ude af kabinen.",
        ],
      },
      {
        h: "Vi kører ud til dig",
        p: [
          "Lejre, Hvalsø, Kirke Hyllinge, Osted og landsbyerne imellem. Skriv adressen i bookingen, og giv gerne en kort beskrivelse, hvis indkørslen er svær at finde. Vi har vand og strøm med, så det er lige meget, hvor langt der er til stuehuset.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan I komme ud på en gård eller et landsted?",
        a: "Ja. Vi skal bare kunne køre hen til bilen. Skriv gerne en kort vejbeskrivelse i bookingen.",
      },
      {
        q: "Hvorfor er det vigtigt at vaske mudder af?",
        a: "Fordi indtørret jord holder på fugt og skjuler stenslag. Tilsammen giver det rust, som opdages for sent.",
      },
      {
        q: "Vasker I pickups og firehjulstrækkere?",
        a: "Ja. Prisen følger bilens størrelse, som bookingen finder ud fra nummerpladen. Store SUV'er og pickups ligger i kategorien stor bil eller varevogn.",
      },
      {
        q: "Er der kørselstillæg på landet?",
        a: "Hvis der gælder et tillæg for din adresse, vises det i prisen, inden du bekræfter.",
      },
    ],
    keywords: ["bilvask Lejre", "mobil bilvask Lejre", "bilvask Hvalsø", "bilvask 4320"],
    image: { src: "/service/udenfor.jpg", alt: "Vask af mudret bil på landet ved Lejre" },
    related: [
      "/bilvask-roskilde",
      "/bilvask-holbaek",
      "/bilvask-jyllinge",
      "/bilvask-suv",
      "/udvendig-bilvask-koebenhavn",
      "/blog/vejsalt-og-rust-paa-bilen",
    ],
    area: {
      name: "Lejre",
      kommune: "Lejre Kommune",
      postal: "4320",
      nearby: ["Roskilde", "Holbæk", "Jyllinge", "Ringsted"],
    },
  }),
];
