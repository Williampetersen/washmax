import { areaPage, type ContentPage } from "./types";

// Gentofte, Gladsaxe, Herlev, Lyngby-Taarbæk og Rudersdal – de nærmeste
// kommuner nord for København.
export const areasNord1: ContentPage[] = [
  areaPage({
    slug: "bilvask-gentofte",
    title: "Bilvask Gentofte – håndvask i din indkørsel",
    description:
      "Mobil bilvask i Gentofte, Vangede, Jægersborg og Dyssegård. Skånsom håndvask i indkørslen – vi har vand og strøm med. Hele bilen med voks fra 799 kr.",
    h1: "Bilvask Gentofte",
    eyebrow: "2820 Gentofte",
    intro:
      "I Gentofte holder mange biler i carport eller indkørsel og bliver passet godt på. Vi vasker bilen i hånden hjemme hos dig, så lakken bliver behandlet ordentligt.",
    answer:
      "CleanWash tilbyder mobil bilvask i hele Gentofte Kommune. Vi kommer til din adresse med eget vand og strøm og vasker bilen i hånden. Udvendig bilvask koster fra 450 kr., og pakken Hele bilen med voks koster fra 799 kr.",
    sections: [
      {
        h: "Håndvask frem for børster",
        p: [
          "Ejer eller leaser du en bil, der skal holde sig pæn i mange år, er vaskemetoden ikke ligegyldig. Roterende børster i en vaskehal kan efterlade fine, cirkelformede ridser, som især ses på mørk lak i solskin. Ved en håndvask løsnes snavset først med skum, og bilen vaskes derefter med rene vaskehandsker.",
          "Derfor vælger mange i Gentofte at få bilen vasket derhjemme, hvor vi kan bruge den tid, bilen har brug for – i stedet for de få minutter, en automat har.",
        ],
      },
      {
        h: "Fra Vangede til Jægersborg",
        p: [
          "Vi kører i hele kommunen: Gentofte by, Vangede, Dyssegård, Jægersborg og kvartererne omkring Gentofte Sø og Bernstorffsparken. De fleste adresser har indkørsel eller carport, og dér er der god plads til at arbejde.",
          "Har du perlegrus i indkørslen, kender du støvet, der lægger sig på de nederste paneler og i hjulbuerne. Det skyller vi væk i forvasken, inden vi rører lakken.",
        ],
      },
      {
        h: "Leasingbilen skal også afleveres pæn",
        p: [
          "Mange biler i Gentofte er leasede, og en velholdt bil giver færre diskussioner, når den skal tilbage. Regelmæssig indvendig rengøring forhindrer, at pletter og slid sætter sig fast, og voks på lakken beskytter mod sol, harpiks og fugleklatter i leasingperioden.",
        ],
      },
    ],
    faqs: [
      {
        q: "Er håndvask bedre for lakken end en vaskehal?",
        a: "En korrekt udført håndvask med forvask og rene vaskehandsker er den mest skånsomme metode og mindsker risikoen for de fine ridser, børster kan give.",
      },
      {
        q: "Hvad koster det at få vasket en SUV i Gentofte?",
        a: "I kategorien stor bil koster udvendig vask 699 kr., indvendig rengøring 799 kr. og hele bilen inklusive voks 999 kr. Bookingen finder kategorien ud fra nummerpladen.",
      },
      {
        q: "Kan I vaske bilen, mens den står i carporten?",
        a: "Ja, hvis der er plads til at komme rundt om den. Ellers kører vi den gerne et par meter frem i indkørslen efter aftale med dig.",
      },
      {
        q: "Tilbyder I læderpleje?",
        a: "Ja. Læderpleje af sæder kan vælges til en indvendig rengøring for 399 kr.",
      },
    ],
    keywords: ["bilvask Gentofte", "mobil bilvask Gentofte", "håndvask bil Gentofte", "bilpleje Gentofte"],
    image: { src: "/service/helebil.jpg", alt: "Håndvask af bil i indkørsel i Gentofte" },
    related: [
      "/bilvask-hellerup",
      "/bilvask-charlottenlund",
      "/bilvask-lyngby",
      "/bilvask-med-voks",
      "/laederpleje-bil",
      "/bilvask-leasingbil",
    ],
    area: {
      name: "Gentofte",
      kommune: "Gentofte Kommune",
      postal: "2820",
      nearby: ["Hellerup", "Charlottenlund", "Klampenborg", "Lyngby", "Søborg", "Bispebjerg"],
    },
  }),

  areaPage({
    slug: "bilvask-charlottenlund",
    title: "Bilvask Charlottenlund – vi kommer til dig",
    description:
      "Bilvask i Charlottenlund og Ordrup. Vi fjerner harpiks, honningdug og saltluft fra bilen hjemme hos dig. Vand og strøm har vi med. Fra 450 kr.",
    h1: "Bilvask Charlottenlund",
    eyebrow: "2920 Charlottenlund",
    intro:
      "Gamle alléer og Øresund lige uden for døren er svært at slå – men begge dele sætter spor på bilen. Vi kommer til Charlottenlund og vasker den hjemme hos dig.",
    answer:
      "CleanWash vasker biler i Charlottenlund, Ordrup og Skovshoved. Vi kommer til adressen med eget vand og strøm. Udvendig bilvask tager cirka 65 minutter og koster fra 450 kr.; hele bilen ude og inde koster fra 799 kr.",
    sections: [
      {
        h: "Klistret lak under lindetræerne",
        p: [
          "Holder bilen under træerne på Jægersborg Allé eller en af sidevejene, kender du den klistrede hinde, der kommer om sommeren. Det er honningdug – sukkerholdige dråber fra bladlus i trækronerne. Hinden binder støv og pollen og bliver efterhånden sort, hvis den får lov at sidde.",
          "Honningdug er vandopløseligt, så længe det er friskt, men bagt fast af solen kræver det en ordentlig forvask. Vi løsner det med skum, så det ikke skal gnides af.",
        ],
      },
      {
        h: "Strandvejen og saltet fra Øresund",
        p: [
          "Langs Strandvejen og ved Charlottenlund Fort og Skovshoved Havn får bilerne salt fra havgusen – især i blæsevejr fra øst. Saltet ses som hvide skjolder på ruderne og sætter sig i sprækker og hjulbuer.",
          "Det er ikke kun vintervejene, der salter bilen her. Derfor giver en fast vaskerytme mening hele året, og voks på lakken gør det sværere for saltet at bide sig fast.",
        ],
      },
      {
        h: "Nemt for travle hverdage i Ordrup",
        p: [
          "Skole, arbejde, sport og indkøb – bilen er i gang hele ugen. Når vi kommer til dig, behøver du ikke at finde et hul i kalenderen til en tur i vaskehal. Du booker en tid, lader bilen stå, og vi klarer resten.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan I fjerne den klistrede hinde fra træerne?",
        a: "Ja. Honningdug og let harpiks fjernes i en udvendig vask med forvask. Er det bagt hårdt fast, så nævn det i bookingen, så vi sætter tid af.",
      },
      {
        q: "Hvor ofte bør bilen vaskes, når man bor tæt på Øresund?",
        a: "Cirka hver tredje til fjerde uge – og gerne lidt oftere i perioder med meget blæst fra havet eller salt på vejene.",
      },
      {
        q: "Kan jeg få voks på bilen?",
        a: "Ja. Voks er inkluderet, når du booker pakken Hele bilen.",
      },
      {
        q: "Kommer I også til Skovshoved?",
        a: "Ja, vi dækker Charlottenlund, Ordrup og Skovshoved samt Hellerup, Gentofte og Klampenborg.",
      },
    ],
    keywords: ["bilvask Charlottenlund", "bilvask Ordrup", "mobil bilvask Charlottenlund", "bilvask Skovshoved"],
    image: { src: "/service/udenfor.jpg", alt: "Udvendig bilvask af bil i Charlottenlund" },
    related: [
      "/bilvask-hellerup",
      "/bilvask-gentofte",
      "/bilvask-klampenborg",
      "/bilvask-med-voks",
      "/blog/fjern-harpiks-fra-bilen",
      "/blog/bil-ved-kysten-saltluft",
    ],
    area: {
      name: "Charlottenlund",
      kommune: "Gentofte Kommune",
      postal: "2920",
      nearby: ["Hellerup", "Gentofte", "Klampenborg", "Lyngby", "Nordhavn"],
    },
  }),

  areaPage({
    slug: "bilvask-klampenborg",
    title: "Bilvask Klampenborg – mobil bilvask ved kysten",
    description:
      "Mobil bilvask i Klampenborg og Taarbæk. Vi fjerner sand, salt og skovsnavs fra bilen på din adresse – med eget vand og strøm. Book fra 450 kr.",
    h1: "Bilvask Klampenborg",
    eyebrow: "2930 Klampenborg",
    intro:
      "Bellevue på den ene side og Dyrehaven på den anden. I Klampenborg får bilen både sand, salt og skovbund med hjem – vi vasker det af på din adresse.",
    answer:
      "CleanWash tilbyder mobil bilvask i Klampenborg og Taarbæk. Vi kommer til din adresse og medbringer selv vand og strøm. Priserne begynder ved 450 kr. for udvendig vask, 600 kr. for indvendig rengøring og 799 kr. for hele bilen.",
    sections: [
      {
        h: "Sand fra Bellevue og mudder fra Dyrehaven",
        p: [
          "En sommerdag ved Bellevue Strand ender som regel med sand i fodrummet, i sædernes sømme og i bagagerummet. En gåtur i Dyrehaven i efteråret giver våde støvler, blade og hundepoter. Begge dele er hårde ved kabinen, fordi sand og grus slider på tæpper og måtter.",
          "Ved en indvendig rengøring støvsuger vi helt ned langs sædeskinner og under måtterne, hvor sandet samler sig. Har hunden været med, kan fjernelse af dyrehår vælges til.",
        ],
      },
      {
        h: "Biler ved vandet har brug for mere vask",
        p: [
          "Klampenborg og Taarbæk ligger helt ud til Øresund, og saltet kommer med vinden året rundt. Det lægger sig som en tynd hinde på lak, ruder og gummilister. Hinden trækker fugt til sig, og det er den kombination, der er hård ved metal og krom.",
          "En grundig udvendig vask med skylning af hjulbuer, dørkarme og kanter holder saltet nede. Vi vasker altid i hånden, så de udsatte steder kommer med.",
        ],
      },
      {
        h: "Praktisk på smalle veje",
        p: [
          "Mange veje i Taarbæk og det gamle Klampenborg er smalle. Holder bilen i indkørslen eller på egen grund, er det nemmest. Holder den på vejen, skal der være plads til, at vi kan arbejde uden at spærre for trafikken – ring gerne, hvis du er i tvivl.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan I få sand ud af sæder og måtter?",
        a: "Ja. Grundig støvsugning af sæder, gulv, måtter og bagagerum er en fast del af den indvendige rengøring.",
      },
      {
        q: "Kan I vaske bilen ved Klampenborg Station eller ved stranden?",
        a: "Vi vasker på private adresser og private p-pladser. På offentlige p-pladser afhænger det af reglerne på stedet, så kontakt os først.",
      },
      {
        q: "Hvad koster fjernelse af hundehår?",
        a: "Dyrehår kan vælges til en indvendig rengøring for 200 kr.",
      },
      {
        q: "Vasker I også i Taarbæk?",
        a: "Ja. Taarbæk hører til vores område sammen med Klampenborg, Skovshoved og Charlottenlund.",
      },
    ],
    keywords: ["bilvask Klampenborg", "bilvask Taarbæk", "mobil bilvask Klampenborg", "bilrengøring Klampenborg"],
    image: { src: "/service/inside.jpg", alt: "Støvsugning af sand i bil i Klampenborg" },
    related: [
      "/bilvask-charlottenlund",
      "/bilvask-hellerup",
      "/bilvask-lyngby",
      "/bilvask-vedbaek",
      "/fjernelse-af-dyrehaar-bil",
      "/blog/sand-i-bilen-efter-stranden",
    ],
    area: {
      name: "Klampenborg",
      kommune: "Gentofte og Lyngby-Taarbæk Kommune",
      postal: "2930",
      nearby: ["Charlottenlund", "Hellerup", "Gentofte", "Lyngby", "Vedbæk", "Nærum"],
    },
  }),

  areaPage({
    slug: "bilvask-soborg",
    title: "Bilvask Søborg – bilvask hjemme eller på jobbet",
    description:
      "Få bilen vasket i Søborg, hvor den holder: foran rækkehuset eller på firmaets p-plads. Vi medbringer vand og strøm. Udvendig vask fra 450 kr.",
    h1: "Bilvask Søborg",
    eyebrow: "2860 Søborg",
    intro:
      "Søborg er tæt bebygget med rækkehuse, villaer og store arbejdspladser. Uanset om bilen holder hjemme eller ved jobbet, kan vi vaske den dér.",
    answer:
      "CleanWash tilbyder mobil bilvask i hele Søborg. Vi kommer til din bopæl eller arbejdsplads og har selv vand og strøm med. Udvendig bilvask koster fra 450 kr., indvendig rengøring fra 600 kr. og hele bilen fra 799 kr.",
    sections: [
      {
        h: "Bilvask foran rækkehuset",
        p: [
          "På vejene omkring Søborg Hovedgade ligger husene tæt, og mange parkerer på vejen foran huset. Det er helt fint til en mobil bilvask, så længe bilen holder lovligt, og der er plads til at gå omkring den.",
          "Du behøver ikke at være hjemme til en udvendig vask. Vi giver besked, når bilen er færdig, og du betaler bagefter.",
        ],
      },
      {
        h: "Få bilen vasket i arbejdstiden",
        p: [
          "Søborg har nogle af kommunens største arbejdspladser, og p-pladserne er fyldt fra morgen til eftermiddag. De timer kan bruges fornuftigt: book en tid, mens du er på arbejde, og kør hjem i en ren bil.",
          "Er I flere kolleger, der gerne vil have vasket bil samme dag, kan vi planlægge det som ét samlet besøg.",
        ],
      },
      {
        h: "Motorring 3 sætter sit præg",
        p: [
          "Pendler du ad Motorring 3 eller Hillerødmotorvejen, får bilen et lag af dækstøv og vejsnavs, der med tiden gør lakken ru at røre ved. Om vinteren kommer der vejsalt oveni. En vask hver tredje til fjerde uge holder laget nede og gør næste vask lettere.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan I vaske bilen på min arbejdsplads i Søborg?",
        a: "Ja, når bilen holder på en p-plads, hvor vi må arbejde. Tjek gerne med arbejdspladsen, og skriv p-pladsens placering i bookingen.",
      },
      {
        q: "Hvor længe tager det at få vasket hele bilen?",
        a: "Cirka 110 minutter for både udvendig vask, indvendig rengøring og voks.",
      },
      {
        q: "Skal jeg stille vand eller strøm til rådighed?",
        a: "Nej, begge dele har vi med i bilen.",
      },
      {
        q: "Kan jeg aflyse, hvis planerne ændrer sig?",
        a: "Ja. Du kan aflyse eller flytte tiden uden gebyr indtil 24 timer før det aftalte tidspunkt.",
      },
    ],
    keywords: ["bilvask Søborg", "mobil bilvask Søborg", "bilvask 2860", "bilrengøring Søborg"],
    image: { src: "/service/udenfor.jpg", alt: "Mobil bilvask foran rækkehus i Søborg" },
    related: [
      "/bilvask-gladsaxe",
      "/bilvask-bagsvaerd",
      "/bilvask-gentofte",
      "/bilvask-bispebjerg",
      "/bilvask-paa-arbejdspladsen",
      "/bilvask-personalegode",
    ],
    area: {
      name: "Søborg",
      kommune: "Gladsaxe Kommune",
      postal: "2860",
      nearby: ["Gladsaxe", "Bagsværd", "Gentofte", "Bispebjerg", "Herlev", "Brønshøj"],
    },
  }),

  areaPage({
    slug: "bilvask-gladsaxe",
    title: "Bilvask Gladsaxe – mobil bilvask i hele kommunen",
    description:
      "Mobil bilvask i Gladsaxe: Buddinge, Mørkhøj, Høje Gladsaxe og erhvervskvarteret. Vi kommer med vand og strøm. Privat og erhverv. Fra 450 kr.",
    h1: "Bilvask Gladsaxe",
    eyebrow: "Gladsaxe Kommune",
    intro:
      "Fra højhusene i Høje Gladsaxe til erhvervskvarteret ved Gladsaxe Møllevej: vi vasker biler i hele Gladsaxe – for private og for virksomheder.",
    answer:
      "CleanWash kører ud til hele Gladsaxe Kommune, herunder Buddinge, Mørkhøj, Søborg og Bagsværd. Vi medbringer selv vand og strøm og vasker bilen på din adresse. Priserne starter ved 450 kr. for en udvendig vask.",
    sections: [
      {
        h: "Private biler i Buddinge, Mørkhøj og Høje Gladsaxe",
        p: [
          "Gladsaxe rummer alle boligtyper: parcelhuse i Mørkhøj, rækkehuse i Buddinge og etagebyggeri i Høje Gladsaxe. I huset har du indkørslen; i højhuset har du p-pladsen foran blokken. Begge steder kan vi vaske bilen, fordi vi ikke skal bruge andet end adgang til den.",
          "Bor du i en boligforening, så tjek gerne, om der er regler for bilvask på fællesarealerne, inden du booker.",
        ],
      },
      {
        h: "Firmabiler i Gladsaxe Erhvervskvarter",
        p: [
          "Erhvervskvarteret er fuldt af servicebiler, sælgerbiler og varevogne, der er virksomhedens ansigt udadtil. En beskidt firmabil med logo på siden sender det forkerte signal hos kunden.",
          "Vi vasker firmabiler på jeres egen p-plads, så medarbejderne ikke skal bruge arbejdstid i en vaskehal. Varevogne vasker vi også – både udvendigt og i førerkabinen.",
        ],
        list: [
          "Varevogn udvendigt: 899 kr.",
          "Varevogn indvendigt (førerkabine): 899 kr.",
          "Varevogn, hele bilen: 1.500 kr.",
        ],
      },
      {
        h: "Tæt på to motorveje",
        p: [
          "Med Motorring 3 og Hillerødmotorvejen som nærmeste naboer får biler i Gladsaxe rigeligt med vejsnavs. Det fine, sorte støv fra dæk og asfalt sætter sig især bag hjulene og på bagklappen, og det kommer kun ordentligt af med en vask, der starter med forvask.",
        ],
      },
    ],
    faqs: [
      {
        q: "Vasker I varevogne i Gladsaxe?",
        a: "Ja. En varevogn koster 899 kr. udvendigt, 899 kr. indvendigt og 1.500 kr. for hele bilen.",
      },
      {
        q: "Kan virksomheder få en fast aftale?",
        a: "Ja. Har I flere biler, laver vi en aftale om faste vaskedage på jeres adresse. Kontakt os for et tilbud.",
      },
      {
        q: "Kan I vaske på p-pladsen ved Høje Gladsaxe?",
        a: "Ja, hvis vask er tilladt på området, og bilen holder, så vi kan komme til den.",
      },
      {
        q: "Hvordan booker jeg?",
        a: "Online. Du indtaster nummerpladen, vælger pakke og tidspunkt og får en bekræftelse på mail.",
      },
    ],
    keywords: ["bilvask Gladsaxe", "mobil bilvask Gladsaxe", "bilvask Buddinge", "bilvask Mørkhøj"],
    image: { src: "/service/helebil.jpg", alt: "Bilvask af firmabil i Gladsaxe" },
    related: [
      "/bilvask-soborg",
      "/bilvask-bagsvaerd",
      "/bilvask-herlev",
      "/bilvask-varevogn",
      "/bilvask-servicebiler",
      "/erhvervs-bilvask",
    ],
    area: {
      name: "Gladsaxe",
      kommune: "Gladsaxe Kommune",
      postal: "2860–2880",
      nearby: ["Søborg", "Bagsværd", "Herlev", "Lyngby", "Brønshøj", "Gentofte"],
    },
  }),

  areaPage({
    slug: "bilvask-bagsvaerd",
    title: "Bilvask Bagsværd – vi vasker bilen på adressen",
    description:
      "Bilvask i Bagsværd ved hjemmet eller arbejdspladsen. Vi kommer med eget vand og strøm og fjerner skovsnavs, pollen og vejsalt. Fra 450 kr.",
    h1: "Bilvask Bagsværd",
    eyebrow: "2880 Bagsværd",
    intro:
      "Sø, skov og store arbejdspladser ligger side om side i Bagsværd. Vi vasker din bil hjemme i indkørslen eller på p-pladsen ved jobbet.",
    answer:
      "CleanWash tilbyder mobil bilvask i Bagsværd. Vi kommer til adressen med vand, strøm og udstyr. Udvendig bilvask koster fra 450 kr. og tager cirka 65 minutter; hele bilen koster fra 799 kr. og tager cirka 110 minutter.",
    sections: [
      {
        h: "Naturen omkring Bagsværd Sø ses på bilen",
        p: [
          "Bor du tæt på Bagsværd Sø, Hareskoven eller Aldershvile Slotspark, parkerer du sandsynligvis under eller ved siden af store træer. Det giver nåle og blade i afløbene ved forruden, harpiks på taget og et gulgrønt lag pollen i foråret.",
          "Blade, der ligger og rådner i afløb og dørkarme, holder på fugten og kan give lugt i kabinen. Dem fjerner vi som en del af vasken, når vi rengør karme og kanter.",
        ],
      },
      {
        h: "Vask ved arbejdspladsen",
        p: [
          "Bagsværd har flere store virksomheder, og mange kører hertil fra hele Nordsjælland. Bilen holder stille i otte timer – det er rigelig tid til en vask ude og inde.",
          "Aftal med din arbejdsgiver, at vi må arbejde på p-pladsen, og book så en tid i arbejdstiden.",
        ],
      },
      {
        h: "Vælg efter behov",
        p: [
          "Er det mest det udvendige, der trænger, er en udvendig vask nok. Har kabinen fået sand, krummer og støv, er indvendig rengøring svaret. Og er der gået længe siden sidst, giver Hele bilen det bedste resultat – her er voks på lakken med i prisen.",
        ],
      },
    ],
    faqs: [
      {
        q: "Fjerner I blade og nåle fra afløbene ved forruden?",
        a: "Ja, synlige blade og nåle i karme og ved forruden fjerner vi i forbindelse med den udvendige vask.",
      },
      {
        q: "Kan bilen blive vasket, mens jeg er på arbejde i Bagsværd?",
        a: "Ja. Det kræver kun, at vi må være på p-pladsen, og at vi kan komme til bilen.",
      },
      {
        q: "Hvad er forskellen på udvendig vask og Hele bilen?",
        a: "Udvendig vask omfatter lak, fælge, hjulbuer og ruder. Hele bilen omfatter desuden støvsugning og aftørring indvendigt samt voks på lakken.",
      },
      {
        q: "Hvilke nabobyer dækker I?",
        a: "Blandt andet Søborg, Gladsaxe, Lyngby, Herlev, Værløse og Virum.",
      },
    ],
    keywords: ["bilvask Bagsværd", "mobil bilvask Bagsværd", "bilvask 2880", "bilrengøring Bagsværd"],
    image: { src: "/service/udenfor.jpg", alt: "Udvendig bilvask i villakvarter i Bagsværd" },
    related: [
      "/bilvask-gladsaxe",
      "/bilvask-soborg",
      "/bilvask-lyngby",
      "/bilvask-vaerloese",
      "/bilvask-paa-arbejdspladsen",
      "/blog/bilvask-om-efteraaret-blade-og-afloeb",
    ],
    area: {
      name: "Bagsværd",
      kommune: "Gladsaxe Kommune",
      postal: "2880",
      nearby: ["Gladsaxe", "Søborg", "Lyngby", "Herlev", "Værløse", "Virum"],
    },
  }),

  areaPage({
    slug: "bilvask-herlev",
    title: "Bilvask Herlev – mobil bilvask i 2730",
    description:
      "Mobil bilvask i Herlev ved boligen, hospitalet eller virksomheden. Vi har vand og strøm med og vasker bilen, hvor den holder. Fra 450 kr.",
    h1: "Bilvask Herlev",
    eyebrow: "2730 Herlev",
    intro:
      "I Herlev kører alt forbi Ring 3. Bilen bliver hurtigt støvet – og du har sjældent tid til at gøre noget ved det. Det har vi.",
    answer:
      "CleanWash vasker biler i hele Herlev. Vi kommer til din adresse eller arbejdsplads med eget vand og strøm. Du kan booke udvendig bilvask fra 450 kr., indvendig rengøring fra 600 kr. eller hele bilen fra 799 kr.",
    sections: [
      {
        h: "Støv fra Ringvejen",
        p: [
          "Herlev Ringvej er en af Storkøbenhavns travleste veje, og tæt trafik og anlægsarbejde sender støv ud over de nærmeste kvarterer. Det sætter sig som et lyst lag på lak og ruder og bliver til mudderstriber, så snart det regner.",
          "Anlægsstøv indeholder små, hårde partikler. Kører man bilen gennem en børstevask med det lag på, bliver partiklerne trukket hen over lakken. Vi skyller dem af først.",
        ],
      },
      {
        h: "Til dig, der arbejder på skiftende tider",
        p: [
          "Arbejder du på Herlev Hospital eller i et af erhvervsområderne, passer vaskehallens åbningstider ikke altid med din vagtplan. Vi kører alle ugens dage, og bilen kan blive vasket, mens du er på vagt.",
        ],
      },
      {
        h: "Villaveje i Hjortespring og rækkehuse ved bymidten",
        p: [
          "Uden for erhvervsområderne er Herlev roligt og grønt. I Hjortespring vasker vi typisk i indkørslen, og omkring Herlev Bymidte på p-pladserne ved rækkehuse og etageboliger. Er I to biler i husstanden, får bil nummer to 15 % rabat på grundprisen, når de vaskes i samme besøg.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan I vaske bilen på p-pladsen ved Herlev Hospital?",
        a: "Det afhænger af reglerne på p-pladsen. Kontakt os, så finder vi ud af, om det kan lade sig gøre der, hvor du parkerer.",
      },
      {
        q: "Kører I også i weekenden?",
        a: "Ja, vi kører alle ugens dage. De ledige tider fremgår af bookingen.",
      },
      {
        q: "Hvordan får I anlægsstøv af uden at ridse lakken?",
        a: "Vi forvasker med skum og skyller grundigt, inden vi vasker i hånden. På den måde bliver de hårde partikler fjernet, før noget rører lakken.",
      },
      {
        q: "Giver I rabat ved to biler?",
        a: "Ja. Vaskes to biler i samme besøg, får den anden bil 15 % rabat på grundprisen.",
      },
    ],
    keywords: ["bilvask Herlev", "mobil bilvask Herlev", "bilvask 2730", "bilrengøring Herlev"],
    image: { src: "/service/helebil.jpg", alt: "Mobil bilvask på p-plads i Herlev" },
    related: [
      "/bilvask-ballerup",
      "/bilvask-gladsaxe",
      "/bilvask-skovlunde",
      "/bilvask-rodovre",
      "/bilvask-i-weekenden",
      "/bilvask-flere-biler",
    ],
    area: {
      name: "Herlev",
      kommune: "Herlev Kommune",
      postal: "2730",
      nearby: ["Ballerup", "Gladsaxe", "Skovlunde", "Rødovre", "Brønshøj", "Søborg"],
    },
  }),

  areaPage({
    slug: "bilvask-virum",
    title: "Bilvask Virum – bilvask hjemme i carporten",
    description:
      "Mobil bilvask i Virum. Vi kommer til villavejen med vand og strøm og vasker familiens biler ude og inde. To biler samme dag? 15 % rabat på nr. to.",
    h1: "Bilvask Virum",
    eyebrow: "2830 Virum",
    intro:
      "Virum er familiebiler, carporte og fyldte kalendere. Vi vasker bilen hjemme hos dig, så weekenden kan bruges på noget sjovere.",
    answer:
      "CleanWash tilbyder mobil bilvask i Virum og Brede. Vi kommer til din adresse med eget vand og strøm. Udvendig vask koster fra 450 kr., indvendig rengøring fra 600 kr., og vasker vi to biler i samme besøg, får den anden 15 % rabat.",
    sections: [
      {
        h: "Familiebilen har det hårdt",
        p: [
          "Fodboldstøvler, madpakker, cykelhjelme og våde flyverdragter – bilen i en børnefamilie er i brug fra morgen til aften. Det ses hurtigt på bagsædet, i dørlommerne og under børnesæderne.",
          "En indvendig rengøring tager det hele: støvsugning af sæder og gulv, aftørring af paneler og kopholdere og rene ruder indefra. Rens af børnesæde kan vælges til for 100 kr.",
        ],
      },
      {
        h: "To biler, ét besøg",
        p: [
          "I Virum har mange husstande to biler – én til pendling og én til alt det andet. Det er mest praktisk at få dem vasket samme dag, og det er også billigst: bil nummer to får 15 % rabat på grundprisen.",
        ],
      },
      {
        h: "Pollen fra skoven og søen",
        p: [
          "Med Furesøen, Frederiksdal og skovene lige ved siden af bliver bilerne gule af pollen i april og maj. Pollen i sig selv er harmløst for lakken, men blandet med regn og sol bliver det til en hinde, der er svær at få af. Det er også en plage for allergikere, når det trækkes ind i kabinen.",
          "En udvendig vask fjerner laget, og en indvendig rengøring tager det støv, der er kommet med ind.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan I vaske begge vores biler samme dag?",
        a: "Ja. Book begge biler til samme besøg – så får den anden bil 15 % rabat på grundprisen.",
      },
      {
        q: "Renser I børnesæder?",
        a: "Ja, rens af børnesæde er et tilvalg til 100 kr.",
      },
      {
        q: "Skal vi være hjemme under vasken?",
        a: "Ikke til den udvendige del. Til indvendig rengøring skal vi have adgang til bilen, så vi aftaler, hvordan nøglen overdrages.",
      },
      {
        q: "Hjælper bilvask mod pollen i kabinen?",
        a: "En indvendig rengøring fjerner det pollen og støv, der har lagt sig på flader, sæder og måtter. Det mærkes tydeligt, hvis nogen i familien har allergi.",
      },
    ],
    keywords: ["bilvask Virum", "mobil bilvask Virum", "bilvask 2830", "bilrengøring Virum"],
    image: { src: "/home/kids.jpg", alt: "Børnesæde i familiebil, der skal rengøres i Virum" },
    related: [
      "/bilvask-lyngby",
      "/bilvask-holte",
      "/bilvask-bagsvaerd",
      "/bilvask-familiebil",
      "/rens-af-autostol",
      "/bilvask-flere-biler",
    ],
    area: {
      name: "Virum",
      kommune: "Lyngby-Taarbæk Kommune",
      postal: "2830",
      nearby: ["Lyngby", "Holte", "Bagsværd", "Nærum", "Værløse", "Farum"],
    },
  }),

  areaPage({
    slug: "bilvask-holte",
    title: "Bilvask Holte – skånsom håndvask på adressen",
    description:
      "Bilvask i Holte, Søllerød og Øverød. Vi kommer til din indkørsel med vand og strøm og fjerner harpiks, nåle og pollen skånsomt. Fra 450 kr.",
    h1: "Bilvask Holte",
    eyebrow: "2840 Holte",
    intro:
      "Store haver, gamle træer og Furesøen i baghaven – Holte er grønt hele vejen rundt. Det er bilen også, hvis den ikke bliver vasket.",
    answer:
      "CleanWash tilbyder mobil bilvask i Holte, Søllerød, Øverød og Dronninggård. Vi kommer til din indkørsel og medbringer selv vand og strøm. Udvendig håndvask koster fra 450 kr., og hele bilen inklusive voks koster fra 799 kr.",
    sections: [
      {
        h: "Når bilen holder under store træer",
        p: [
          "I Holte holder de fleste biler i indkørsler omgivet af bøg, birk og gran. Det giver skygge om sommeren – og harpiks, nåle, frø og fugleklatter hele året. Harpiks hærder på få dage i solen og kan ikke bare vaskes af med vand, når først den sidder fast.",
          "Vi fjerner frisk harpiks i forbindelse med vasken. Er der mange hærdede pletter, så skriv det i bookingen. Voks på lakken – som følger med pakken Hele bilen – gør, at harpiks og klatter slipper langt nemmere næste gang.",
        ],
      },
      {
        h: "Grønne belægninger i lister og kanter",
        p: [
          "Skygge og fugt giver alger. De viser sig som grønne striber i gummilister, omkring ruderne og i tanklågen. Det er ikke farligt, men det får selv en ny bil til at se forsømt ud. En håndvask kommer ind i alle de kanter, hvor algerne gror.",
        ],
      },
      {
        h: "Lange indkørsler og grus",
        p: [
          "Mange huse i Søllerød og Øverød har lange grusindkørsler. Grusstøv sætter sig i hjulbuer og på dørtrin og bliver trukket med ind i kabinen. Ved Hele bilen tager vi både det ydre lag og det, der er endt på måtterne.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan harpiks fjernes uden at skade lakken?",
        a: "Ja, når det gøres rigtigt. Frisk harpiks opløses og tørres af; den må aldrig skrabes af. Meget gamle pletter kan kræve en ekstra behandling.",
      },
      {
        q: "Hvor ofte bør en bil under træer vaskes?",
        a: "Cirka hver tredje uge i sommerhalvåret. Fugleklatter og harpiks bør fjernes inden for få dage.",
      },
      {
        q: "Hvad koster Hele bilen for en stor SUV?",
        a: "I kategorien stor bil 999 kr. inklusive udvendig vask, indvendig rengøring og voks. De tungeste SUV'er ligger en kategori højere – det viser bookingen.",
      },
      {
        q: "Kører I også til Søllerød og Trørød?",
        a: "Ja, vi dækker Holte, Søllerød, Øverød, Trørød og resten af Rudersdal Kommune.",
      },
    ],
    keywords: ["bilvask Holte", "mobil bilvask Holte", "bilvask Søllerød", "håndvask bil Holte"],
    image: { src: "/service/helebil.jpg", alt: "Håndvask af bil i indkørsel i Holte" },
    related: [
      "/bilvask-virum",
      "/bilvask-naerum",
      "/bilvask-birkeroed",
      "/bilvask-lyngby",
      "/bilvask-med-voks",
      "/blog/fjern-harpiks-fra-bilen",
    ],
    area: {
      name: "Holte",
      kommune: "Rudersdal Kommune",
      postal: "2840",
      nearby: ["Virum", "Nærum", "Birkerød", "Lyngby", "Vedbæk", "Farum"],
    },
  }),

  areaPage({
    slug: "bilvask-naerum",
    title: "Bilvask Nærum – til private og firmabiler",
    description:
      "Mobil bilvask i Nærum. Vi vasker bilen hjemme eller på virksomhedens p-plads langs Helsingørmotorvejen – med eget vand og strøm. Fra 450 kr.",
    h1: "Bilvask Nærum",
    eyebrow: "2850 Nærum",
    intro:
      "Nærum er både roligt boligområde og adresse for en lang række virksomheder langs motorvejen. Vi vasker biler begge steder.",
    answer:
      "CleanWash vasker biler i Nærum – hjemme hos private og på virksomheders p-pladser. Vi medbringer vand og strøm. Udvendig bilvask koster fra 450 kr., hele bilen fra 799 kr., og virksomheder med flere biler kan få en fast aftale.",
    sections: [
      {
        h: "Firmabiler i erhvervsområdet",
        p: [
          "Langs Helsingørmotorvejen ligger kontorhuse med hundredvis af parkerede biler. For den enkelte medarbejder er bilvask på jobbet en nem måde at spare en time i fritiden. For virksomheden er det et personalegode, der ikke kræver andet end en aftale og lidt plads på p-pladsen.",
          "Vi kan køre faste dage hos jer, så medarbejderne selv booker en tid, eller vaske virksomhedens egne biler efter en plan.",
        ],
      },
      {
        h: "Motorvejspendlerens bil",
        p: [
          "Kører du dagligt på Helsingørmotorvejen, samler fronten insekter om sommeren og salt og sjap om vinteren. Insektrester er sure og kan sætte mærker i lak og plast, hvis de får lov at sidde i varmen.",
          "Vi bløder dem op, før vi vasker, så de ikke skal gnides af. Forruden og forlygterne får en ekstra omgang.",
        ],
      },
      {
        h: "Hjemme på villavejen",
        p: [
          "I boligkvartererne omkring Nærum Hovedgade og op mod Jægersborg Hegn vasker vi i indkørsler og carporte. Du booker online, og prisen er den samme, uanset om vi kommer til hjemmet eller arbejdspladsen.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan vores virksomhed i Nærum få bilvask til medarbejderne?",
        a: "Ja. Vi aftaler en eller flere faste dage, hvor vi vasker på jeres p-plads. Kontakt os, så sender vi et forslag.",
      },
      {
        q: "Fjerner I insekter fra fronten?",
        a: "Ja. Insektrester blødes op og fjernes som en del af den udvendige vask.",
      },
      {
        q: "Koster det ekstra, at I kommer ud til Nærum?",
        a: "Prisen følger pakken og bilens størrelse. Skulle der være et kørselstillæg til en adresse, fremgår det tydeligt af prisen, før du bekræfter bookingen.",
      },
      {
        q: "Kan jeg få en faktura til firmaet?",
        a: "Ja. Erhvervskunder faktureres efter aftale.",
      },
    ],
    keywords: ["bilvask Nærum", "mobil bilvask Nærum", "firmabil vask Nærum", "bilvask 2850"],
    image: { src: "/service/udenfor.jpg", alt: "Bilvask af firmabil på p-plads i Nærum" },
    related: [
      "/bilvask-holte",
      "/bilvask-vedbaek",
      "/bilvask-lyngby",
      "/bilvask-personalegode",
      "/erhverv/flaadeaftale",
      "/blog/fjern-fugleklatter-insekter-uden-at-ridse-lakken",
    ],
    area: {
      name: "Nærum",
      kommune: "Rudersdal Kommune",
      postal: "2850",
      nearby: ["Holte", "Vedbæk", "Lyngby", "Klampenborg", "Virum", "Hørsholm"],
    },
  }),
];
