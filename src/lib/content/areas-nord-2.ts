import { areaPage, HOURS_DA, type ContentPage } from "./types";

// Nordsjælland: Rudersdal, Furesø, Allerød, Hørsholm, Fredensborg og Helsingør kommuner.
export const areasNord2: ContentPage[] = [
  areaPage({
    slug: "bilvask-birkeroed",
    title: "Bilvask Birkerød – mobil bilvask på din adresse",
    description:
      "Mobil bilvask i Birkerød, Bistrup og Høsterkøb. Vi kommer hjem til dig med vand og strøm og vasker bilen ude og inde. Udvendig vask fra 450 kr.",
    h1: "Bilvask Birkerød",
    eyebrow: "3460 Birkerød",
    intro:
      "Birkerød er pendlerby med skov og sø i ryggen. Bilen kører mange kilometer om ugen – vi sørger for, at den ikke også skal en tur omkring vaskehallen.",
    answer:
      "CleanWash tilbyder mobil bilvask i Birkerød, Bistrup, Kajerød og Høsterkøb. Vi kommer til adressen med eget vand og strøm. Udvendig bilvask koster fra 450 kr., indvendig rengøring fra 600 kr. og hele bilen fra 799 kr.",
    sections: [
      {
        h: "Pendlerbilen samler mere, end man tror",
        p: [
          "Fra Birkerød går turen ad Kongevejen eller Hillerødmotorvejen mod København – hver dag, året rundt. Det giver en jævn strøm af vejsnavs: dækstøv, olietåge og om vinteren salt, der sprøjter op bag forhjulene og lægger sig langs dørene.",
          "Laget kommer snigende. Man opdager det først, når man stryger en finger hen over lakken, og den føles ru. Så er det tid til en vask, der starter med forvask i stedet for bare en hurtig skylning.",
        ],
      },
      {
        h: "Efter turen rundt om Sjælsø",
        p: [
          "Sjælsø og Rude Skov er populære til hundeluftning og løbeture. Tilbage i bilen følger der mudder, våde poter og hundehår med. Hår fra korthårede hunde borer sig ned i tæpper og sædestof og kan ikke bare støvsuges op.",
          "Vi løsner hårene mekanisk, før vi støvsuger. Fjernelse af dyrehår er et tilvalg til den indvendige rengøring og koster 200 kr.",
        ],
      },
      {
        h: "Hjemme, mens du arbejder hjemmefra",
        p: [
          "Arbejder du hjemme et par dage om ugen, er det oplagt at lægge bilvasken dér. Bilen står i indkørslen, vi kommer med udstyret, og du bliver ikke forstyrret – vi skal hverken bruge din vandhane eller din stikkontakt.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvordan ved jeg, om bilen trænger til mere end en hurtig skylning?",
        a: "Føl på lakken, når bilen er nyvasket. Er den ru, sidder der fastgroet vejsnavs. Det kræver forvask og håndvask – ikke bare vand.",
      },
      {
        q: "Kan I fjerne hundehår fra bagagerummet?",
        a: "Ja. Vælg tilvalget dyrehår til 200 kr., så fjerner vi hår fra sæder, måtter og bagagerum.",
      },
      {
        q: "Kører I til Høsterkøb og Bistrup?",
        a: "Ja, vi dækker hele postnummer 3460 og nabobyerne Holte, Allerød, Farum og Hørsholm.",
      },
      {
        q: "Hvornår betaler jeg?",
        a: "Når vasken er færdig. Du betaler for eksempel med MobilePay.",
      },
    ],
    keywords: ["bilvask Birkerød", "mobil bilvask Birkerød", "bilvask 3460", "bilrengøring Birkerød"],
    image: { src: "/home/dyrhår.png", alt: "Hund i bil – fjernelse af hundehår ved bilvask i Birkerød" },
    related: [
      "/bilvask-holte",
      "/bilvask-alleroed",
      "/bilvask-farum",
      "/bilvask-horsholm",
      "/fjernelse-af-dyrehaar-bil",
      "/bilvask-hjemme",
    ],
    area: {
      name: "Birkerød",
      kommune: "Rudersdal Kommune",
      postal: "3460",
      nearby: ["Holte", "Allerød", "Farum", "Hørsholm", "Vedbæk", "Nærum"],
    },
  }),

  areaPage({
    slug: "bilvask-farum",
    title: "Bilvask Farum – vi vasker, hvor bilen holder",
    description:
      "Bilvask i Farum ved rækkehuset, på p-dækket eller i erhvervsområdet. Vi medbringer vand og strøm. Udvendig vask fra 450 kr., hele bilen fra 799 kr.",
    h1: "Bilvask Farum",
    eyebrow: "3520 Farum",
    intro:
      "Farum har det hele: parcelhuse ved søen, tætte boligområder og et stort erhvervskvarter. Vi vasker bilen dér, hvor den holder til daglig.",
    answer:
      "CleanWash vasker biler i hele Farum. Vi kommer til din adresse eller arbejdsplads og medbringer selv vand og strøm. En udvendig bilvask koster fra 450 kr. og tager cirka 65 minutter. Hele bilen koster fra 799 kr.",
    sections: [
      {
        h: "Fra Farum Sø til Farum Midtpunkt",
        p: [
          "Ved Farum Sø og i Stavnsholt vasker vi i indkørsler og carporte. I de tætte boligområder holder bilerne på fælles p-pladser og parkeringsdæk – og her er mobil bilvask ofte den eneste realistiske måde at få vasket bilen uden at køre af sted.",
          "Holder bilen på et fælles areal, så tjek gerne boligforeningens regler først. Og skriv i bookingen, hvor på pladsen bilen står, så vi finder den med det samme.",
        ],
      },
      {
        h: "Bilvask i erhvervsområdet",
        p: [
          "I Farum Erhvervsområde står firmabiler og medarbejderbiler parkeret det meste af dagen. Vi kan vaske dem på stedet. For virksomheder med servicebiler eller varevogne betyder det, at bilerne er rene uden at være ude af drift.",
        ],
      },
      {
        h: "Motorvejsstøv og vinterens salt",
        p: [
          "Hillerødmotorvejen er Farums livsnerve, og den sætter sit præg på bilerne. Om vinteren lægger saltet sig som en hvid skorpe bag hjulene. Salt, der får lov at sidde, binder fugt mod metallet – så selv i frostperioder er det en god idé at få bilen vasket, når temperaturen tillader det.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan I vaske bilen på et parkeringsdæk i Farum?",
        a: "Ofte ja, hvis boligforeningen tillader det, og der er plads omkring bilen. Oplys placeringen i bookingen, så afklarer vi resten.",
      },
      {
        q: "Vasker I om vinteren?",
        a: "Ja. Vi vasker hele året, så længe vejret tillader et ordentligt resultat. I hård frost finder vi en anden dag sammen med dig.",
      },
      {
        q: "Hvad koster vask af en varevogn?",
        a: "899 kr. for udvendig vask, 899 kr. for indvendig rengøring og 1.500 kr. for hele bilen.",
      },
      {
        q: "Hvor hurtigt kan jeg få en tid?",
        a: "Det afhænger af kalenderen, men bookingen viser alle ledige tider – ofte også til samme eller næste dag.",
      },
    ],
    keywords: ["bilvask Farum", "mobil bilvask Farum", "bilvask 3520", "bilrengøring Farum"],
    image: { src: "/service/udenfor.jpg", alt: "Udvendig bilvask på parkeringsplads i Farum" },
    related: [
      "/bilvask-vaerloese",
      "/bilvask-birkeroed",
      "/bilvask-alleroed",
      "/bilvask-bagsvaerd",
      "/bilvask-servicebiler",
      "/blog/vejsalt-og-rust-paa-bilen",
    ],
    area: {
      name: "Farum",
      kommune: "Furesø Kommune",
      postal: "3520",
      nearby: ["Værløse", "Birkerød", "Allerød", "Bagsværd", "Holte", "Stenløse"],
    },
  }),

  areaPage({
    slug: "bilvask-vaerloese",
    title: "Bilvask Værløse – mobil bilvask i Furesø",
    description:
      "Mobil bilvask i Værløse, Hareskovby og på den gamle flyvestation. Vi kommer til dig med vand og strøm og vasker bilen ude og inde. Fra 450 kr.",
    h1: "Bilvask Værløse",
    eyebrow: "3500 Værløse",
    intro:
      "Skoven ligger lige uden for døren i Værløse. Det betyder mountainbikes i bagagerummet, mudder på måtterne – og en bil, der har godt af en grundig tur.",
    answer:
      "CleanWash tilbyder mobil bilvask i Værløse, Hareskovby, Kirke Værløse og de nye boligområder på den tidligere flyvestation. Vi medbringer vand og strøm. Udvendig vask fra 450 kr., indvendig rengøring fra 600 kr.",
    sections: [
      {
        h: "Når skoven flytter med ind i bilen",
        p: [
          "Hareskoven og Nørreskoven trækker cyklister, løbere og hundeejere til fra hele Storkøbenhavn – og bor du i Værløse, er du der hele tiden. Mudder fra dæk og sko tørrer ind i gulvtæpperne, og fugtige ting i bagagerummet giver med tiden en indelukket lugt.",
          "En indvendig rengøring med grundig støvsugning og rengøring af måtter får kabinen tilbage til udgangspunktet. Er bilen virkelig hårdt ramt, kan tilvalget ekstra beskidt vælges, så der er tid til det hele.",
        ],
      },
      {
        h: "Nye boligområder, nyt byggestøv",
        p: [
          "På den gamle flyvestation skyder nye kvarterer op. Så længe der bygges, er der støv – og det lægger sig på bilerne i hele området. Lyst byggestøv er basisk og hårdt og bør skylles af, ikke tørres af.",
        ],
      },
      {
        h: "Carport, indkørsel eller fælles p-plads",
        p: [
          "I Hareskovby og det gamle Værløse vasker vi mest i private indkørsler. I de nyere bebyggelser holder bilerne ofte på fælles pladser. Begge dele fungerer, fordi vi selv har vand og strøm med. Du skal bare fortælle os, hvor bilen står.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan I rense måtter, der er fulde af indtørret mudder?",
        a: "Ja. Måtterne tages ud, bankes, støvsuges og rengøres som en del af den indvendige rengøring.",
      },
      {
        q: "Hvad betyder tilvalget ekstra beskidt?",
        a: "Det giver ekstra tid til biler, der er meget tilsmudsede indvendigt. Tilvalget koster 299 kr.",
      },
      {
        q: "Kommer I også til Hareskovby?",
        a: "Ja. Hareskovby hører med til vores område sammen med Værløse, Farum og Bagsværd.",
      },
      {
        q: "Skal bilen være tømt, inden I kommer?",
        a: "Fjern værdigenstande og personlige ting. Vil du have os til at rydde affald og løse ting ud, kan tømning af bilen vælges til for 99 kr.",
      },
    ],
    keywords: ["bilvask Værløse", "mobil bilvask Værløse", "bilvask Hareskovby", "bilvask 3500"],
    image: { src: "/home/extra.jpg", alt: "Meget beskidt bagsæde før indvendig rengøring i Værløse" },
    related: [
      "/bilvask-farum",
      "/bilvask-bagsvaerd",
      "/bilvask-ballerup",
      "/bilvask-maaloev",
      "/rengoering-af-meget-beskidt-bil",
      "/indvendig-bilrengoering-koebenhavn",
    ],
    area: {
      name: "Værløse",
      kommune: "Furesø Kommune",
      postal: "3500",
      nearby: ["Farum", "Bagsværd", "Ballerup", "Måløv", "Virum", "Herlev"],
    },
  }),

  areaPage({
    slug: "bilvask-alleroed",
    title: "Bilvask Allerød – bilvask hjemme i Lillerød",
    description:
      "Mobil bilvask i Allerød, Lillerød, Blovstrød og Lynge. Vi kommer til hjemmet eller arbejdspladsen med eget vand og strøm. Hele bilen fra 799 kr.",
    h1: "Bilvask Allerød",
    eyebrow: "3450 Allerød",
    intro:
      "Allerød ligger midt mellem København og Hillerød – og bilen bruges i begge retninger. Vi vasker den hjemme hos dig i Lillerød, Blovstrød eller Lynge.",
    answer:
      "CleanWash tilbyder mobil bilvask i hele Allerød Kommune. Vi kommer til adressen med vand, strøm og udstyr. Priserne er de samme som i København: udvendig bilvask fra 450 kr., indvendig rengøring fra 600 kr. og hele bilen fra 799 kr.",
    sections: [
      {
        h: "Bilvask uden for byen – samme service",
        p: [
          "Man behøver ikke at bo i København for at få mobil bilvask. Vi kører fast i Nordsjælland og vasker biler i Lillerød, Blovstrød, Lynge og landsbyerne imellem. Du booker på samme måde, og bookingen viser de tider, vi kan være hos dig.",
          "Skulle der gælde et kørselstillæg for en adresse, kan du se det i prisen, inden du bekræfter. Der kommer ikke noget oveni bagefter.",
        ],
      },
      {
        h: "Hverdagsbilen i en familieby",
        p: [
          "Allerød er skoler, sportshaller og fritidsaktiviteter spredt ud over hele kommunen. Bilen er taxa for børnene, varevogn til haveaffald og kontor på hjul. Det slider mest indvendigt.",
          "Vi støvsuger sæder, gulv og bagagerum, tørrer instrumentbræt, dørpaneler og kopholdere af og pudser ruderne indefra. Bagefter føles bilen som en anden.",
        ],
      },
      {
        h: "Virksomheder ved motorvejen",
        p: [
          "Erhvervsområderne ved Hillerødmotorvejen huser mange virksomheder med firmabiler. Vi vasker gerne flere biler på samme adresse og kan lægge faste vaskedage ind, så bilparken altid er præsentabel.",
        ],
      },
    ],
    faqs: [
      {
        q: "Koster bilvask mere i Allerød end i København?",
        a: "Nej, pakkepriserne er de samme. Et eventuelt kørselstillæg vil altid fremgå af prisen, før du bekræfter bookingen.",
      },
      {
        q: "Kører I også til Lynge og Blovstrød?",
        a: "Ja, vi dækker hele Allerød Kommune samt Birkerød, Farum og Hillerød.",
      },
      {
        q: "Hvad er inkluderet i indvendig rengøring?",
        a: "Støvsugning af sæder, gulv, måtter og bagagerum, aftørring af instrumentbræt, konsol og dørpaneler samt pudsning af ruder indefra.",
      },
      {
        q: "Kan en virksomhed få vasket flere biler på én gang?",
        a: "Ja. Kontakt os med antal biler og adresse, så planlægger vi et samlet besøg.",
      },
    ],
    keywords: ["bilvask Allerød", "bilvask Lillerød", "mobil bilvask Allerød", "bilvask Blovstrød"],
    image: { src: "/service/inside.jpg", alt: "Indvendig rengøring af familiebil i Allerød" },
    related: [
      "/bilvask-hilleroed",
      "/bilvask-birkeroed",
      "/bilvask-farum",
      "/bilvask-nordsjaelland",
      "/bilvask-familiebil",
      "/erhvervs-bilvask",
    ],
    area: {
      name: "Allerød",
      kommune: "Allerød Kommune",
      postal: "3450",
      nearby: ["Hillerød", "Birkerød", "Farum", "Hørsholm", "Fredensborg", "Slangerup"],
    },
  }),

  areaPage({
    slug: "bilvask-rungsted",
    title: "Bilvask Rungsted Kyst – håndvask ved havnen",
    description:
      "Mobil bilvask i Rungsted Kyst. Skånsom håndvask og voks hjemme hos dig – vi har selv vand og strøm med. Hele bilen fra 799 kr. Book online.",
    h1: "Bilvask Rungsted Kyst",
    eyebrow: "2960 Rungsted Kyst",
    intro:
      "I Rungsted er bilen en del af helhedsindtrykket. Vi vasker den i hånden på din adresse og slutter af med voks, så lakken står skarpt.",
    answer:
      "CleanWash tilbyder mobil håndvask af biler i Rungsted Kyst. Vi kommer til din adresse med eget vand og strøm. Pakken Hele bilen omfatter udvendig vask, indvendig rengøring og voks og koster fra 799 kr.",
    sections: [
      {
        h: "Lak, der kan tåle at blive set på",
        p: [
          "Mørke, blanke biler er smukke – og nådesløse. Hver eneste fine ridse fra en børstevask kan ses, når solen står lavt over Øresund. Det eneste, der holder lakken fri for nye ridser, er en vask, hvor snavset løsnes med skum, og hvor vaskehandsken er ren.",
          "Sådan vasker vi. Og når bilen er tør, lægger vi voks på som en del af pakken Hele bilen. Voksen giver dybde i farven og gør, at vandet perler af.",
        ],
      },
      {
        h: "Salt fra to sider",
        p: [
          "Ved Rungsted Havn og langs Strandvejen kommer saltet fra havet. Om vinteren kommer det også fra vejen. Krom, fælge og gummilister tager først skade, så de bør skylles grundigt – ikke kun de store flader.",
          "Fælgrens kan vælges til for 149 kr., hvis bremsestøvet har sat sig fast.",
        ],
      },
      {
        h: "Læder og lyse kabiner",
        p: [
          "Lyst læder og lyse tæpper viser alt. Vi tørrer flader af og støvsuger grundigt i den almindelige indvendige rengøring. Vil du have læderet renset og plejet, så det holder sig blødt og ikke blanker op, kan læderpleje vælges til.",
        ],
      },
    ],
    faqs: [
      {
        q: "Er voks inkluderet?",
        a: "Ja, når du vælger pakken Hele bilen. Voksen lægges på efter den udvendige vask.",
      },
      {
        q: "Hvad koster læderpleje?",
        a: "Læderpleje af sæder er et tilvalg til 399 kr.",
      },
      {
        q: "Kan I vaske en bil med meget følsom lak?",
        a: "Ja. Fortæl os i bookingen, hvis bilen har mat lak, folie eller en nylig coating, så tager vi hensyn til det.",
      },
      {
        q: "Vasker I også ved Rungsted Havn?",
        a: "Vi vasker på private adresser og private p-pladser. Er du i tvivl om et bestemt sted, så ring til os.",
      },
    ],
    keywords: ["bilvask Rungsted", "bilvask Rungsted Kyst", "håndvask bil Rungsted", "bilpleje Rungsted"],
    image: { src: "/home/plejej.jpg", alt: "Læderpleje af bilsæde ved bilvask i Rungsted Kyst" },
    related: [
      "/bilvask-horsholm",
      "/bilvask-vedbaek",
      "/bilvask-kokkedal",
      "/bilvask-med-voks",
      "/laederpleje-bil",
      "/faelgrens",
    ],
    area: {
      name: "Rungsted",
      kommune: "Hørsholm Kommune",
      postal: "2960",
      nearby: ["Hørsholm", "Vedbæk", "Kokkedal", "Nivå", "Birkerød"],
    },
  }),

  areaPage({
    slug: "bilvask-vedbaek",
    title: "Bilvask Vedbæk – mobil bilvask ved Øresund",
    description:
      "Bilvask i Vedbæk og Trørød på din adresse. Vi fjerner salt, harpiks og vejsprøjt med skånsom håndvask og har selv vand og strøm med. Fra 450 kr.",
    h1: "Bilvask Vedbæk",
    eyebrow: "2950 Vedbæk",
    intro:
      "Mellem skoven og Sundet ligger Vedbæk og Trørød. Bilen får det bedste fra begge verdener: salt fra øst og harpiks fra vest. Vi vasker det af.",
    answer:
      "CleanWash vasker biler i Vedbæk og Trørød. Vi kommer til adressen med eget vand og strøm. En udvendig håndvask koster fra 450 kr., indvendig rengøring fra 600 kr. og hele bilen fra 799 kr.",
    sections: [
      {
        h: "Strandvejens sprøjt",
        p: [
          "Kører du på Vedbæk Strandvej i regnvejr, kender du sprøjtet fra modkørende. Det er ikke rent vand: det er en blanding af vejsnavs, sand og – tæt på vandet – salt. Det tørrer ind i en plettet hinde, som regnen ikke selv vasker af.",
          "Vi starter altid med at skylle og skumme bilen, så hinden løsner sig. Først derefter vasker vi i hånden.",
        ],
      },
      {
        h: "Trørød: hække, træer og skygge",
        p: [
          "I Trørød holder mange biler bag høje hække og under gamle træer. Skyggen holder på fugten, og det giver grønne belægninger i lister og på gummikanter. Samtidig drysser der frø og nåle ned i sprækkerne omkring motorhjelm og bagklap.",
          "Den slags sidder steder, hvor kun hænder kan komme til. Det er en af grundene til, at en håndvask gør bilen synligt renere end en tur i en automat.",
        ],
      },
      {
        h: "Praktisk bilvask for dem, der har travlt",
        p: [
          "Du vælger en tid online. Vi kommer, vasker og giver besked, når bilen er klar. Betalingen klarer du bagefter. Skal vi også gøre rent indvendigt, aftaler vi blot, hvordan vi får nøglen.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvorfor bliver bilen ikke ren af regn?",
        a: "Regnvand skyller kun løst støv af. Vejfilm, salt og fedt binder sig til lakken og skal løsnes med sæbe og forvask.",
      },
      {
        q: "Kan I fjerne grønne alger omkring ruder og lister?",
        a: "Ja. Lister, karme og kanter rengøres som en del af den udvendige håndvask.",
      },
      {
        q: "Kører I i Trørød?",
        a: "Ja, Trørød og Vedbæk dækkes begge, ligesom Nærum, Holte og Rungsted.",
      },
      {
        q: "Hvor lang tid tager en udvendig vask?",
        a: "Cirka 65 minutter afhængigt af bilens størrelse og hvor beskidt den er.",
      },
    ],
    keywords: ["bilvask Vedbæk", "bilvask Trørød", "mobil bilvask Vedbæk", "bilvask 2950"],
    image: { src: "/service/udenfor.jpg", alt: "Håndvask af bil ved villa i Vedbæk" },
    related: [
      "/bilvask-rungsted",
      "/bilvask-naerum",
      "/bilvask-holte",
      "/bilvask-klampenborg",
      "/udvendig-bilvask-koebenhavn",
      "/blog/bil-ved-kysten-saltluft",
    ],
    area: {
      name: "Vedbæk",
      kommune: "Rudersdal Kommune",
      postal: "2950",
      nearby: ["Rungsted", "Nærum", "Holte", "Klampenborg", "Hørsholm", "Birkerød"],
    },
  }),

  areaPage({
    slug: "bilvask-kokkedal",
    title: "Bilvask Kokkedal – vi kommer til din p-plads",
    description:
      "Mobil bilvask i Kokkedal for private og virksomheder. Vi vasker ved boligen eller i industriparken og har vand og strøm med. Fra 450 kr.",
    h1: "Bilvask Kokkedal",
    eyebrow: "2980 Kokkedal",
    intro:
      "Kokkedal er etageboliger, parcelhuse og en industripark side om side. Fælles for dem alle: bilen kan blive vasket på stedet.",
    answer:
      "CleanWash tilbyder mobil bilvask i Kokkedal. Vi kommer til boligen eller virksomheden med eget vand og strøm. Udvendig bilvask koster fra 450 kr. Varevogne og firmabiler vasker vi også – en varevogn koster fra 899 kr.",
    sections: [
      {
        h: "Bor du i etagebolig?",
        p: [
          "I de større bebyggelser holder bilerne på fælles p-pladser uden adgang til vand. Det har hidtil betydet vaskehal eller ingen vask. Når vi kommer med eget vand og strøm, kan bilen vaskes på sin plads, forudsat at boligselskabet tillader det.",
          "Skriv blok og pladsnummer i bookingen. Så står vi ved den rigtige bil fra start.",
        ],
      },
      {
        h: "Håndværkerbiler og firmabiler i industriparken",
        p: [
          "I Kokkedal Industripark kører varevogne ud om morgenen og kommer støvede hjem om eftermiddagen. En ren bil hos kunden betyder noget, men ingen har lyst til at bruge den sidste halve time af arbejdsdagen i en vaskehal.",
          "Vi vasker bilerne på jeres plads – først på dagen, sidst på dagen eller mens de alligevel holder stille. Både karrosseri og førerkabine.",
        ],
      },
      {
        h: "Parcelhuskvartererne",
        p: [
          "I villakvartererne mod Øresund og ind mod Hørsholm vasker vi i indkørslen. Har husstanden to biler, kan begge tages i samme besøg, og den anden får 15 % rabat på grundprisen.",
        ],
      },
    ],
    faqs: [
      {
        q: "Må man få vasket bil på boligselskabets p-plads?",
        a: "Det bestemmer boligselskabet. Spørg ejendomskontoret eller tjek husordenen, inden du booker.",
      },
      {
        q: "Vasker I varevogne indvendigt?",
        a: "Ja. Indvendig rengøring af en varevogn omfatter førerkabinen og koster 899 kr.",
      },
      {
        q: "Kan I komme tidligt om morgenen?",
        a: `Vores åbningstid er alle ugens dage ${HOURS_DA}, så de første tider ligger om morgenen. De ledige tider ses i bookingen, og virksomheder kan aftale faste dage direkte med os.`,
      },
      {
        q: "Hvilke byer ligger tæt på Kokkedal i jeres område?",
        a: "Hørsholm, Rungsted, Nivå, Humlebæk og Fredensborg.",
      },
      {
        q: "Kan flere naboer i samme bebyggelse booke samme dag?",
        a: "Ja. Flere biler på samme p-plads gør det lettere for os at planlægge dagen. Kontakt os, så samler vi besøgene, eller book hver for sig med samme adresse.",
      },
    ],
    keywords: ["bilvask Kokkedal", "mobil bilvask Kokkedal", "bilvask 2980", "varevogn vask Kokkedal"],
    image: { src: "/bilsize/varevogn.png", alt: "Varevogn – bilvask af firmabiler i Kokkedal" },
    related: [
      "/bilvask-horsholm",
      "/bilvask-nivaa",
      "/bilvask-rungsted",
      "/bilvask-varevogn",
      "/bilvask-lejlighed",
      "/bilvask-servicebiler",
    ],
    area: {
      name: "Kokkedal",
      kommune: "Fredensborg Kommune",
      postal: "2980",
      nearby: ["Hørsholm", "Nivå", "Rungsted", "Humlebæk", "Fredensborg"],
    },
  }),

  areaPage({
    slug: "bilvask-nivaa",
    title: "Bilvask Nivå – mobil bilvask ved Nivå Bugt",
    description:
      "Få bilen vasket i Nivå uden at køre i vaskehal. Vi kommer til dig med vand og strøm. Udvendig vask fra 450 kr. Book online.",
    h1: "Bilvask Nivå",
    eyebrow: "2990 Nivå",
    intro:
      "Nivå ligger smukt ved bugten, og det gør bilen også. Vi sparer dig turen i vaskehal og vasker den derhjemme.",
    answer:
      "CleanWash tilbyder mobil bilvask i Nivå. Vi kommer til din adresse og medbringer selv vand og strøm. Du kan vælge udvendig bilvask fra 450 kr., indvendig rengøring fra 600 kr. eller hele bilen fra 799 kr.",
    sections: [
      {
        h: "Fuglelivet ved bugten er flot – på afstand",
        p: [
          "Nivå Bugt er kendt for sine mange fugle. For bilejere i nærheden betyder det flere fugleklatter end de fleste steder. Klatterne indeholder syre, og på en varm dag kan de sætte mærker i klarlakken på under en uge.",
          "Det bedste, du selv kan gøre, er at bløde klatten op med vand og tørre den forsigtigt af. Resten klarer vi ved en udvendig vask – og med voks på lakken bider klatterne sig ikke lige så let fast.",
        ],
      },
      {
        h: "Sand fra stranden og havnen",
        p: [
          "Nivå Strandpark og havnen er sommerens samlingspunkt. Sand i bilen er prisen. Det sætter sig i sædernes sømme og under måtterne og slider på tæpperne, hver gang du træder ind. En grundig støvsugning er den eneste kur.",
        ],
      },
      {
        h: "Slip for turen ad Strandvejen",
        p: [
          "En tur i vaskehal med kørsel, kø og ventetid tager hurtigt halvanden time. En booking hos os tager to minutter, og du kan lave noget andet, mens vi vasker.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvor hurtigt skal fugleklatter væk?",
        a: "Helst inden for et par dage, og hurtigere i varmt vejr. Blød dem op med vand først, så du ikke ridser lakken.",
      },
      {
        q: "Beskytter voks mod fugleklatter?",
        a: "Voks lægger et tyndt lag oven på lakken, så klatter og harpiks har sværere ved at ætse sig ned – og er lettere at vaske af.",
      },
      {
        q: "Kan I støvsuge sand op fra bagagerummet?",
        a: "Ja, bagagerummet støvsuges som en fast del af den indvendige rengøring.",
      },
      {
        q: "Hvordan booker jeg en tid i Nivå?",
        a: "Gå til bookingen, tast nummerpladen, vælg pakke og tidspunkt, og skriv din adresse. Du får en bekræftelse på mail.",
      },
    ],
    keywords: ["bilvask Nivå", "mobil bilvask Nivå", "bilvask 2990", "bilrengøring Nivå"],
    image: { src: "/service/helebil.jpg", alt: "Mobil bilvask ved hus i Nivå" },
    related: [
      "/bilvask-kokkedal",
      "/bilvask-humlebaek",
      "/bilvask-fredensborg",
      "/bilvask-horsholm",
      "/bilvask-med-voks",
      "/blog/fjern-fugleklatter-insekter-uden-at-ridse-lakken",
    ],
    area: {
      name: "Nivå",
      kommune: "Fredensborg Kommune",
      postal: "2990",
      nearby: ["Kokkedal", "Humlebæk", "Fredensborg", "Hørsholm", "Rungsted"],
    },
  }),

  areaPage({
    slug: "bilvask-humlebaek",
    title: "Bilvask Humlebæk – ren pendlerbil på adressen",
    description:
      "Mobil bilvask i Humlebæk og Sletten. Vi vasker bilen hjemme hos dig med eget vand og strøm – også indvendigt. Indvendig rengøring fra 600 kr.",
    h1: "Bilvask Humlebæk",
    eyebrow: "3050 Humlebæk",
    intro:
      "Bor du i Humlebæk, tilbringer du sandsynligvis mange timer i bilen. Vi sørger for, at den er rar at sidde i – og pæn at se på.",
    answer:
      "CleanWash tilbyder mobil bilvask i Humlebæk og Sletten. Vi kommer til adressen med vand og strøm. Indvendig rengøring koster fra 600 kr. og tager cirka 75 minutter; hele bilen ude og inde koster fra 799 kr.",
    sections: [
      {
        h: "Kabinen er dit andet kontor",
        p: [
          "En time hver vej på Helsingørmotorvejen bliver til mange hundrede timer om året. Kaffe i kopholderen, morgenmad på farten og telefonmøder undervejs. Det sætter spor: ringe i konsollen, krummer mellem sæderne og en fedtet hinde på rat og skærm.",
          "En indvendig rengøring gør mere end at se pæn ud. Rene ruder indefra giver bedre udsyn i modlys, og et aftørret rat og gearvælger er simpelthen mere hygiejnisk.",
        ],
      },
      {
        h: "Pletter i sæderne",
        p: [
          "Kaffe er den klassiske pendlerplet. Jo længere den sidder, jo dybere trænger den ned i stoffet. Vi tilbyder pletfjernelse som tilvalg, og har sæderne fået rigtig mange år på bagen, er en sæderens det, der løfter hele kabinen.",
        ],
        list: [
          "Pletfjernelse fra bilsæde: 250 kr.",
          "Sæderens af op til fem sæder: 300 kr.",
          "AC-rengøring mod dårlig lugt: 300 kr.",
        ],
      },
      {
        h: "Kyst og motorvej",
        p: [
          "Udvendigt får bilen salt fra Øresund ved Sletten og Humlebæk Havn og insekter og vejstøv fra motorvejen. En udvendig vask hver tredje til fjerde uge holder begge dele i skak.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan kaffepletter fjernes fra bilsæder?",
        a: "Som regel ja. Friske pletter er nemmest, men også ældre pletter kan ofte fjernes eller dæmpes markant med pletfjernelse eller sæderens.",
      },
      {
        q: "Hvor lang tid tager en indvendig rengøring?",
        a: "Cirka 75 minutter. Med sæderens eller andre tilvalg kommer der lidt tid oveni.",
      },
      {
        q: "Kan sæderne bruges lige efter en sæderens?",
        a: "Sæderne er let fugtige bagefter og tørrer hurtigst med lidt udluftning. Fortæl os, hvis du skal bruge bilen kort tid efter.",
      },
      {
        q: "Dækker I Sletten og Gl. Humlebæk?",
        a: "Ja, hele postnummer 3050 samt Nivå, Espergærde og Fredensborg.",
      },
    ],
    keywords: ["bilvask Humlebæk", "mobil bilvask Humlebæk", "indvendig bilrengøring Humlebæk", "bilvask 3050"],
    image: { src: "/home/seat.jpg", alt: "Pletter på bilsæde før rens ved bilvask i Humlebæk" },
    related: [
      "/bilvask-nivaa",
      "/bilvask-espergaerde",
      "/bilvask-fredensborg",
      "/pletfjernelse-bilsaeder",
      "/saederens-bil",
      "/aircondition-rens-bil",
    ],
    area: {
      name: "Humlebæk",
      kommune: "Fredensborg Kommune",
      postal: "3050",
      nearby: ["Nivå", "Espergærde", "Fredensborg", "Kokkedal", "Helsingør"],
    },
  }),

  areaPage({
    slug: "bilvask-fredensborg",
    title: "Bilvask Fredensborg – vi kører ud til dig",
    description:
      "Mobil bilvask i Fredensborg og Asminderød. Vi kommer til din adresse med vand og strøm og fjerner landevejsstøv, mudder og pollen. Fra 450 kr.",
    h1: "Bilvask Fredensborg",
    eyebrow: "3480 Fredensborg",
    intro:
      "Omkring Fredensborg er der landeveje, marker og skov i alle retninger. Det er smukt at køre i – og det sætter sig på bilen.",
    answer:
      "CleanWash tilbyder mobil bilvask i Fredensborg, Asminderød og omegn. Vi kommer til din adresse og har selv vand og strøm med. Udvendig bilvask koster fra 450 kr. og hele bilen fra 799 kr.",
    sections: [
      {
        h: "Landevejens snavs er anderledes end byens",
        p: [
          "Kører du mellem Fredensborg, Hillerød og kysten, får bilen ikke bysod, men jord. Traktorer trækker mudder ud på vejene i efteråret, og i høsten hænger støvet i luften. Mudderet sætter sig tykt i hjulbuer og langs dørtrinene.",
          "Indtørret jord holder på fugt mod metallet. Derfor skyller vi hjulbuer og de nederste paneler særligt grundigt, inden resten af bilen vaskes.",
        ],
      },
      {
        h: "Ved Esrum Sø og slotsparken",
        p: [
          "Tæt på søen og de gamle alléer ved slottet er der pollen og frø i luften hele foråret. Det lægger sig i luftindtag og karme. Bor du her, er en vask i maj og igen i juni en god investering.",
        ],
      },
      {
        h: "Ingen vaskehal lige om hjørnet",
        p: [
          "I en by på Fredensborgs størrelse er udvalget af vaskehaller begrænset. Med mobil bilvask er det lige meget. Vi kommer til dig, og du får en håndvask, der kommer ud i alle hjørner.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan I få indtørret mudder af hjulbuerne?",
        a: "Ja. Hjulbuer og dæksider skylles og rengøres som en del af den udvendige vask.",
      },
      {
        q: "Kører I ud til adresser uden for selve byen?",
        a: "Ja. Skriv adressen i bookingen. Et eventuelt kørselstillæg vises i prisen, inden du bekræfter.",
      },
      {
        q: "Hvor tit skal bilen vaskes, når man kører meget på landevej?",
        a: "Hver tredje til fjerde uge er passende, og oftere i perioder med mudder eller salt på vejene.",
      },
      {
        q: "Hvilke pakker kan jeg vælge?",
        a: "Udvendig bilvask, indvendig bilrengøring eller Hele bilen, hvor du får begge dele plus voks.",
      },
      {
        q: "Fjerner I pollen og frø fra renden under forruden?",
        a: "Synligt pollen, frø og blade i renden ved forruden bliver fjernet, når vi rengør karme og kanter under den udvendige vask. Det er vigtigt, fordi luftindtaget til kabinen sidder dér.",
      },
    ],
    keywords: ["bilvask Fredensborg", "mobil bilvask Fredensborg", "bilvask 3480", "bilvask Asminderød"],
    image: { src: "/home/wash-tire.jpg", alt: "Rengøring af hjul og hjulbue ved bilvask i Fredensborg" },
    related: [
      "/bilvask-hilleroed",
      "/bilvask-humlebaek",
      "/bilvask-nivaa",
      "/bilvask-alleroed",
      "/bilvask-nordsjaelland",
      "/komplet-bilvask",
    ],
    area: {
      name: "Fredensborg",
      kommune: "Fredensborg Kommune",
      postal: "3480",
      nearby: ["Hillerød", "Humlebæk", "Nivå", "Kokkedal", "Allerød", "Helsingør"],
    },
  }),

  areaPage({
    slug: "bilvask-espergaerde",
    title: "Bilvask Espergærde – mobil bilvask hjemme",
    description:
      "Bilvask i Espergærde, Mørdrup og Tibberup. Vi kommer hjem til dig med vand og strøm. Udvendig vask fra 450 kr. – to biler samme dag giver rabat.",
    h1: "Bilvask Espergærde",
    eyebrow: "3060 Espergærde",
    intro:
      "Espergærde er en by, hvor de fleste har hus, have og mindst én bil i indkørslen. Vi kommer forbi og vasker den – eller dem.",
    answer:
      "CleanWash tilbyder mobil bilvask i Espergærde, Mørdrup og Tibberup. Vi medbringer eget vand og strøm. Udvendig bilvask koster fra 450 kr., hele bilen fra 799 kr., og bil nummer to i samme besøg får 15 % rabat på grundprisen.",
    sections: [
      {
        h: "Lørdag formiddag er til noget andet",
        p: [
          "At vaske bil selv tager et par timer, når det skal gøres ordentligt: forvask, to spande, fælge, aftørring og støvsugning. De fleste ender med en hurtig omgang med svampen – og den giver ridser, fordi snavset ikke er løsnet først.",
          "Lader du os tage opgaven, får bilen en korrekt håndvask, og du får din formiddag tilbage.",
        ],
      },
      {
        h: "Strand, havn og sommerliv",
        p: [
          "Med stranden og havnen midt i byen er der sand i bilen fra maj til september. Og ligger du i læ bag klitterne, gør bilen det ikke – den får salt fra Øresund.",
          "Sandet tager vi med støvsugeren ved en indvendig rengøring. Saltet kommer af ved en udvendig vask, hvor vi skyller godt efter i kanter og hjulbuer.",
        ],
      },
      {
        h: "Hele husstandens biler på én gang",
        p: [
          "Har I to biler, giver det mening at få dem vasket samme dag. Du booker begge i ét besøg, og bil nummer to får 15 % rabat på grundprisen. Det er både billigere og nemmere end to separate aftaler.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvordan får jeg rabat på bil nummer to?",
        a: "Tilføj den ekstra bil i bookingen, så de vaskes i samme besøg. Rabatten på 15 % af grundprisen trækkes automatisk fra.",
      },
      {
        q: "Hvorfor giver hjemmevask med svamp ridser?",
        a: "Fordi sand og støv bliver trukket hen over lakken, når snavset ikke er løsnet først. En forvask med skum fjerner det meste, før lakken berøres.",
      },
      {
        q: "Kører I også til Snekkersten?",
        a: "Ja. Vi dækker kyststrækningen fra Humlebæk over Espergærde og Snekkersten til Helsingør.",
      },
      {
        q: "Kan jeg flytte min tid?",
        a: "Ja, du kan ombooke eller aflyse uden gebyr indtil 24 timer før.",
      },
    ],
    keywords: ["bilvask Espergærde", "mobil bilvask Espergærde", "bilvask 3060", "bilvask Mørdrup"],
    image: { src: "/service/helebil.jpg", alt: "Mobil bilvask i indkørsel i Espergærde" },
    related: [
      "/bilvask-helsingoer",
      "/bilvask-humlebaek",
      "/bilvask-fredensborg",
      "/bilvask-flere-biler",
      "/bilvask-hjemme",
      "/blog/to-spands-metoden",
    ],
    area: {
      name: "Espergærde",
      kommune: "Helsingør Kommune",
      postal: "3060",
      nearby: ["Helsingør", "Humlebæk", "Fredensborg", "Nivå"],
    },
  }),
];
