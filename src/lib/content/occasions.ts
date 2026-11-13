import { HOURS_DA, occasionPage, type ContentPage } from "./types";

// Anledninger: tidspunkter og situationer, hvor folk søger efter en bilvask.
export const occasions: ContentPage[] = [
  occasionPage({
    slug: "bilvask-i-weekenden",
    title: "Bilvask i weekenden – lørdag og søndag",
    description:
      "Få bilen vasket lørdag eller søndag uden at bruge weekenden på det. Vi kommer til din adresse med vand og strøm alle ugens dage. Fra 450 kr.",
    h1: "Bilvask i weekenden",
    eyebrow: "Lørdag og søndag",
    intro:
      "Weekenden er den eneste tid, mange har til at få vasket bilen. Det er også den tid, de færreste har lyst til at bruge på det.",
    answer:
      `CleanWash kører alle ugens dage ${HOURS_DA}, også lørdag og søndag. Vi kommer til din adresse med eget vand og strøm, og prisen er den samme som på hverdage: udvendig bilvask fra 450 kr. og hele bilen fra 799 kr. De ledige weekendtider vises i bookingen.`,
    sections: [
      {
        h: "Samme pris lørdag og søndag",
        p: [
          "Der er intet weekendtillæg. En udvendig vask koster det samme søndag formiddag som tirsdag eftermiddag. Du vælger bare en ledig tid i kalenderen.",
          "Weekendtiderne er populære. Vil du være sikker på en bestemt formiddag, så book nogle dage i forvejen.",
        ],
      },
      {
        h: "Køen ved vaskehallen lørdag formiddag",
        p: [
          "Alle, der arbejder i hverdagen, har samme idé: bilen skal vaskes lørdag. Derfor står der kø ved vaskehallerne netop dér. Tyve minutters ventetid er ikke usædvanligt på en solskinsdag efter en uge med regn.",
          "Med mobil bilvask sker det hjemme i indkørslen eller på gaden, mens du spiser morgenmad, er til håndbold med børnene eller ordner haven.",
        ],
      },
      {
        h: "Hvad kan nås på en weekenddag?",
        p: [
          "En udvendig vask tager cirka 65 minutter og en indvendig rengøring cirka 75. Hele bilen tager knap to timer. Har I to biler, kan begge vaskes i samme besøg – så er hele husstanden klaret på en formiddag, og bil nummer to får 15 % rabat på grundprisen.",
        ],
        list: [
          "Lørdag morgen: bilen er ren, før dagens program begynder",
          "Søndag eftermiddag: klar til en ny arbejdsuge",
          "Mens du er væk: udvendig vask kræver ikke, at du er hjemme",
        ],
      },
    ],
    faqs: [
      {
        q: "Vasker I biler om søndagen?",
        a: `Ja. Vi har åbent ${HOURS_DA} både lørdag og søndag, og de ledige tider vises i bookingen.`,
      },
      {
        q: "Koster det ekstra i weekenden?",
        a: "Nej. Prisen er den samme alle dage.",
      },
      {
        q: "Hvor lang tid i forvejen skal jeg booke en lørdag?",
        a: "Gerne nogle dage. Weekendtider bliver hurtigere optaget end hverdagstider.",
      },
      {
        q: "Skal jeg være hjemme?",
        a: "Ikke ved udvendig vask. Ved indvendig rengøring skal vi have adgang til kabinen.",
      },
    ],
    keywords: ["bilvask weekend", "bilvask søndag", "bilvask lørdag", "bilvask åben søndag", "bilvask i weekenden"],
    image: { src: "/service/helebil.jpg", alt: "Bilvask i indkørslen en lørdag formiddag" },
    related: [
      "/bilvask-hjemme",
      "/bilvask-samme-dag",
      "/bilvask-flere-biler",
      "/mobil-bilvask",
      "/bilvask-priser",
      "/bilvask-naer-mig",
    ],
    pkg: "outside",
  }),

  occasionPage({
    slug: "bilvask-samme-dag",
    title: "Bilvask samme dag – book en tid i dag",
    description:
      "Har du brug for bilvask i dag? Se ledige tider med det samme. Vi kommer til din adresse med vand og strøm. Udvendig vask fra 450 kr.",
    h1: "Bilvask samme dag",
    eyebrow: "Når det skal gå hurtigt",
    intro:
      "Kunden kommer i morgen, svigermor i aften, eller bilen skal sælges i eftermiddag. Nogle gange kan bilvasken ikke vente til næste uge.",
    answer:
      "Du kan booke bilvask til samme dag hos CleanWash, når der er ledige tider. Bookingen viser tider tidligst et par timer frem, så vi kan nå ud til dig. Prisen er den samme som ellers: udvendig bilvask fra 450 kr. og hele bilen fra 799 kr.",
    sections: [
      {
        h: "Sådan finder du en tid i dag",
        p: [
          "Gå til bookingen, tast nummerpladen, og vælg pakke. Kalenderen viser dagens ledige tider, hvis der er nogen. Systemet lægger selv et par timer ind, før den første tid, så vi kan nå frem.",
          "Er dagen fyldt, viser kalenderen den første ledige tid i morgen. Du kan også ringe og høre, om vi kan finde en løsning.",
        ],
      },
      {
        h: "Vælg den pakke, der kan nås",
        p: [
          "Har du travlt, så vælg ud fra, hvad der er vigtigst.",
        ],
        list: [
          "Skal bilen bare se ren ud udefra? Udvendig vask, cirka 65 minutter.",
          "Skal nogen sidde i den? Indvendig rengøring, cirka 75 minutter.",
          "Skal den fremvises eller sælges? Hele bilen, cirka 110 minutter.",
        ],
      },
      {
        h: "Ingen hastepris",
        p: [
          "Det koster ikke ekstra at booke til samme dag. Du betaler pakkeprisen og eventuelle tilvalg – ikke for at have travlt.",
          "Jo tidligere på dagen du booker, jo flere tider er der at vælge imellem. Om formiddagen er chancen for en eftermiddagstid god. Sidst på dagen er det sværere.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan jeg få vasket bil i dag?",
        a: "Ja, hvis der er en ledig tid. Bookingen viser dagens tider, tidligst et par timer frem.",
      },
      {
        q: "Koster det ekstra at booke samme dag?",
        a: "Nej. Prisen er den samme, uanset hvornår du booker.",
      },
      {
        q: "Hvad gør jeg, hvis der ikke er tider i dag?",
        a: "Vælg den første ledige tid i kalenderen, eller ring og hør, om vi kan finde en løsning.",
      },
      {
        q: "Hvor hurtigt kan I være her?",
        a: "Tidligst et par timer efter, at du har booket. Det afhænger af, hvor du bor, og hvad der allerede er i kalenderen.",
      },
    ],
    keywords: ["bilvask samme dag", "bilvask i dag", "akut bilvask", "hurtig bilvask", "bilvask nu"],
    image: { src: "/service/udenfor.jpg", alt: "Hurtig bilvask på adressen samme dag" },
    related: [
      "/express-bilvask",
      "/bilvask-naer-mig",
      "/bilvask-i-weekenden",
      "/klargoering-bil-salg",
      "/mobil-bilvask",
      "/kontakt",
    ],
    pkg: "outside",
  }),

  occasionPage({
    slug: "bilvask-efter-ferien",
    title: "Bilvask efter ferien – sand, insekter og krummer",
    description:
      "Kom hjem fra bilferien til en ren bil. Vi fjerner sand, insekter og feriens rod på din adresse. Hele bilen fra 799 kr. – vand og strøm med.",
    h1: "Bilvask efter ferien",
    eyebrow: "Efter bilferie og sommerhus",
    intro:
      "Tre uger, fire personer og to tusind kilometer. Bilen har gjort sit arbejde. Nu ligner den det også.",
    answer:
      "Efter en bilferie anbefaler vi pakken Hele bilen, som koster fra 799 kr. Den fjerner insekter og vejfilm udvendigt, sand og krummer indvendigt og slutter med voks. CleanWash kommer til din adresse med eget vand og strøm, så du kan pakke ud imens.",
    sections: [
      {
        h: "Hvad en ferie gør ved bilen",
        p: [
          "Lange dage på motorvej dækker fronten med insekter. Varmen bager dem fast. Parkering under træer giver harpiks, og strandture giver sand i alle sprækker.",
          "Indvendigt har bilen været spisestue i ugevis. Der er krummer i sæderne, klistrede kopholdere, slikpapir i dørlommerne og en svag lugt af våde håndklæder i bagagerummet.",
        ],
      },
      {
        h: "Vent ikke for længe",
        p: [
          "Fristelsen er at lade bilen stå, til man har overskud. Men ferieskidt bliver ikke bedre af at vente.",
        ],
        list: [
          "Insektrester er sure og ætser sig ned i lakken i sommervarmen",
          "Harpiks hærder og bliver sværere at opløse",
          "Fugtige ting i bagagerummet giver muggen lugt",
          "Spildt juice og is tiltrækker myrer og hvepse",
        ],
      },
      {
        h: "Book hjemkomsten på forhånd",
        p: [
          "Du kan booke op til et halvt år frem. Læg en tid dagen efter, I kommer hjem. Så er det ordnet, før hverdagen begynder, og du skal ikke huske det midt i vasketøj og post.",
          "Har I været i sommerhus på Sjælland, kan vi også vaske bilen dér den sidste dag, hvis adressen ligger i vores område.",
        ],
      },
      {
        h: "Tilvalg, der ofte giver mening efter ferien",
        p: [
          "Har børnene spildt i sæderne, er pletfjernelse eller sæderens oplagt. Har hunden været med, kan dyrehår vælges til. Og er autostolene blevet et kapitel for sig, renser vi dem for 100 kr.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvilken pakke skal jeg vælge efter en bilferie?",
        a: "Hele bilen. Den tager både insekter og vejfilm udvendigt og sand og krummer indvendigt – og lakken får voks.",
      },
      {
        q: "Kan insekter fra motorvejen skade lakken?",
        a: "Ja. Resterne er syreholdige og kan efterlade matte mærker, hvis de sidder længe i varmen.",
      },
      {
        q: "Kan jeg booke, før vi tager afsted?",
        a: "Ja. Du kan booke op til et halvt år frem og vælge en tid lige efter hjemkomsten.",
      },
      {
        q: "Kan I vaske bilen ved sommerhuset?",
        a: "Ja, hvis adressen ligger i vores område. Vi har selv vand og strøm med.",
      },
    ],
    keywords: ["bilvask efter ferie", "bilvask efter sommerferie", "rengøring bil efter ferie", "sand i bilen efter ferie", "bilvask sommerhus"],
    image: { src: "/service/inside.jpg", alt: "Indvendig rengøring af bil efter bilferie" },
    related: [
      "/komplet-bilvask",
      "/bilvask-familiebil",
      "/rens-af-autostol",
      "/bilvask-nordsjaelland",
      "/blog/sand-i-bilen-efter-stranden",
      "/blog/fjern-fugleklatter-insekter-uden-at-ridse-lakken",
    ],
    pkg: "whole",
  }),

  occasionPage({
    slug: "bilvask-foer-bryllup",
    title: "Bilvask før bryllup – bilen klar til den store dag",
    description:
      "Skal bilen bruges til bryllup, konfirmation eller fest? Vi gør den skinnende ren på din adresse dagen før. Hele bilen med voks fra 799 kr.",
    h1: "Bilvask før bryllup og fest",
    eyebrow: "Bryllup, konfirmation og mærkedage",
    intro:
      "På en dag, hvor alt bliver fotograferet, skal bilen også være klar. Vi gør den ren ude og inde – hjemme hos dig, dagen før.",
    answer:
      "Til bryllup og fest anbefaler CleanWash pakken Hele bilen fra 799 kr. med udvendig vask, indvendig rengøring og voks. Læg gerne dækshine og fælgrens til. Vi kommer til din adresse med eget vand og strøm – book til dagen før, og gerne i god tid.",
    sections: [
      {
        h: "Bilen er med på billederne",
        p: [
          "Brudeparret stiger ud foran kirken. Konfirmanden bliver hentet. Gæsterne tager billeder. Bilen står midt i det hele. Blank lak, rene ruder og mørke dæk ses – og det gør det modsatte også.",
          "Det handler ikke kun om det ydre. En brudekjole eller et lyst jakkesæt på et støvet sæde er ikke en god start på dagen.",
        ],
      },
      {
        h: "Det anbefaler vi til en festbil",
        p: [
          "En bil, der skal se ud af noget, har godt af hele turen.",
        ],
        list: [
          "Hele bilen: udvendig håndvask, indvendig rengøring og voks",
          "Fælgrens: så fælgene er rene helt ind i hjørnerne – 149 kr.",
          "Dækshine: mørke, velplejede dæk på billederne – 99 kr.",
          "Læderpleje eller sæderens: hvis sæderne trænger",
        ],
      },
      {
        h: "Book til dagen før",
        p: [
          "Den bedste dag er dagen før festen. Så er bilen frisk, og der er stadig tid, hvis vejret driller. Book i god tid – lørdage i maj, juni og august er travle.",
          "Skal bilen pyntes, så gør det, efter at den er vasket og helt tør. Tape og sugekopper sidder bedst på en ren overflade.",
        ],
      },
      {
        h: "Lånt eller lejet bil?",
        p: [
          "Har du lånt en flot bil af en ven eller onkel til dagen, er en vask bagefter en god måde at sige tak på. Du kan booke på ejerens adresse.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvornår skal bilen vaskes før et bryllup?",
        a: "Dagen før er bedst. Så står den skarpt, og der er luft, hvis tiden skal flyttes på grund af vejret.",
      },
      {
        q: "Hvad koster det at få bilen gjort festklar?",
        a: "Hele bilen koster fra 799 kr. Med fælgrens og dækshine kommer der 248 kr. oveni.",
      },
      {
        q: "Hvad hvis det regner på bryllupsdagen?",
        a: "En nyvokset bil klarer regn pænt – vandet perler af. Tør eventuelt ruder og spejle af, inden I kører.",
      },
      {
        q: "Kan I vaske en veteranbil eller specialbil?",
        a: "Kontakt os først, og fortæl om bilen. Ældre lak og særlige materialer kræver en snak om, hvad der er forsvarligt.",
      },
    ],
    keywords: ["bilvask bryllup", "bryllupsbil klargøring", "bilvask før fest", "bilvask konfirmation", "klargøring bil til bryllup"],
    image: { src: "/home/dækshine.png", alt: "Blank fælg og mørkt dæk på bil klargjort til fest" },
    related: [
      "/komplet-bilvask",
      "/daekshine",
      "/faelgrens",
      "/bilvask-med-voks",
      "/laederpleje-bil",
      "/bilvask-i-weekenden",
    ],
    pkg: "whole",
  }),

  occasionPage({
    slug: "bilvask-foer-vinter",
    title: "Bilvask før vinter – beskyt lakken mod salt",
    description:
      "Gør bilen klar til vinteren med vask og voks, før der saltes. Hele bilen fra 799 kr. på din adresse – vi medbringer vand og strøm.",
    h1: "Bilvask før vinter",
    eyebrow: "Oktober og november",
    intro:
      "Vinteren kan du ikke gøre noget ved. Men du kan sende bilen ind i den med ren lak, voks og tør kabine. Det gør en stor forskel til foråret.",
    answer:
      "Før vinteren anbefaler CleanWash pakken Hele bilen, der koster fra 799 kr. Den omfatter udvendig håndvask, voks på lakken og indvendig rengøring. Voksen gør, at vejsalt og sjap slipper lettere, og en tør kabine giver mindre dug på ruderne.",
    sections: [
      {
        h: "Hvorfor før vinteren?",
        p: [
          "De fleste vasker bilen grundigt om foråret, når saltet skal af. Det er fint. Men skaden sker om vinteren. En bil, der går ind i saltsæsonen med snavset, uvokset lak, har intet lag mellem saltet og klarlakken.",
          "Voks lagt på i oktober eller november sidder der, når saltbilerne kører ud første gang. Saltet lægger sig på voksen i stedet for lakken og vaskes lettere af.",
        ],
      },
      {
        h: "Vinterklargøring punkt for punkt",
        p: [
          "Det her er, hvad der er værd at få gjort, inden frosten kommer.",
        ],
        list: [
          "Grundig udvendig vask, så efterårets blade og snavs er væk",
          "Voks på lakken som beskyttelse mod salt",
          "Rene ruder inde og ude – lav sol og mørke afslører alt",
          "Rene, tørre måtter, så de ikke holder på fugt",
          "Dørkarme og gummilister tørret af, så de ikke fryser fast i snavs",
        ],
      },
      {
        h: "Kabinen betyder mere om vinteren",
        p: [
          "Fugt er vinterens problem indvendigt. Sne og regn kommer ind med skoene, og fugtige måtter fordamper op på ruderne. En fedtet rude dugger hurtigere og er sværere at holde klar.",
          "Efter en indvendig rengøring er ruderne affedtede og måtterne rene. Skift gerne til gummimåtter i vinterhalvåret – de kan tømmes for vand.",
        ],
      },
      {
        h: "Og i løbet af vinteren?",
        p: [
          "Vask bilen, når der har været saltet, og temperaturen er over frysepunktet. Hver tredje uge er en god rytme, og hver anden uge, hvis du kører meget på motorvej. Voksen fornyes igen til foråret.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvornår skal bilen gøres klar til vinter?",
        a: "I oktober eller november, inden der saltes første gang.",
      },
      {
        q: "Hjælper voks virkelig mod vejsalt?",
        a: "Ja. Voks lægger et lag oven på lakken, så saltet ikke sidder direkte på den og er lettere at vaske af.",
      },
      {
        q: "Kan man vaske bil i frostvejr?",
        a: "Ikke i hård frost. Vent til en dag med plusgrader, eller få den vasket midt på dagen.",
      },
      {
        q: "Hvad koster vinterklargøring?",
        a: "Hele bilen med voks koster 799–1.500 kr. afhængigt af bilens størrelse.",
      },
      {
        q: "Hvorfor dugger ruderne mere om vinteren?",
        a: "På grund af fugt i kabinen og fedtfilm på ruden. Rene ruder og tørre måtter hjælper.",
      },
    ],
    keywords: ["bilvask før vinter", "vinterklargøring bil", "klargør bilen til vinter", "voks før vinter", "beskyt bil mod vejsalt"],
    image: { src: "/service/helebil.jpg", alt: "Bilvask og voks som vinterklargøring" },
    related: [
      "/bilvask-efter-vinter",
      "/bilvask-med-voks",
      "/komplet-bilvask",
      "/blog/vejsalt-og-rust-paa-bilen",
      "/blog/gummilister-der-fryser-fast",
      "/blog/kan-man-vaske-bilen-i-frostvejr",
    ],
    pkg: "whole",
  }),

  occasionPage({
    slug: "rengoering-efter-uheld-i-bilen",
    title: "Rengøring efter uheld i bilen – spild og pletter",
    description:
      "Spildt mælk, sodavand, is eller mad i bilen? Vi rengør efter uheldet på din adresse, før det lugter. Pletfjernelse 250 kr., sæderens 300 kr.",
    h1: "Rengøring efter uheld i bilen",
    eyebrow: "Når noget er gået galt",
    intro:
      "En væltet kaffekop, en tabt is eller en køresyg passager. Uheld sker i alle biler. Det afgørende er, hvor hurtigt der bliver gjort noget ved det.",
    answer:
      "CleanWash rengør bilen efter spild og uheld på din adresse. Pletfjernelse fra bilsæde koster 250 kr., sæderens af op til fem sæder 300 kr. og tilvalget ekstra beskidt 299 kr. som tilvalg til en indvendig rengøring fra 600 kr. Jo hurtigere, jo bedre resultat.",
    sections: [
      {
        h: "Førstehjælp i de første minutter",
        p: [
          "Det, du gør lige efter uheldet, betyder mere end noget andet.",
        ],
        list: [
          "Fjern det faste først – skrab det op med en ske eller et stykke pap",
          "Dup væsken op med køkkenrulle eller en ren klud. Tryk, og lad den suge",
          "Gnid ikke. Det masser pletten ned i stoffet og gør den større",
          "Brug koldt vand på mælk, æg og blod – varmt vand får det til at sætte sig",
          "Luft ud, og lad dørene stå åbne, hvis du kan",
        ],
      },
      {
        h: "Hvorfor det lugter bagefter",
        p: [
          "Et bilsæde er stof oven på tykt skum. Væske løber gennem stoffet og ned i skummet på få sekunder. Overfladen kan tørres ren, men det, der er trukket ned, bliver der.",
          "Mælk, juice, sodavand og madrester er næring for bakterier. I en lukket, varm bil går der få dage, før det begynder at lugte surt. Den lugt forsvinder ikke af sig selv.",
        ],
      },
      {
        h: "Det gør vi",
        p: [
          "Vi starter med at fjerne det, der ligger løst, og støvsuger. Derefter behandles det ramte område med rensemiddel, som arbejdes ned og trækkes op igen, så også det, der er sunket ned i sædet, kommer med.",
          "Er uheldet sket på gulvet, tages måtterne ud og rengøres for sig. Er der løbet væske ned under sædet eller i skinnerne, går vi efter det dér.",
        ],
      },
      {
        h: "Fortæl os, hvad der er sket",
        p: [
          "Skriv i bookingen, hvad der er spildt, hvor og hvornår. Så har vi de rigtige midler klar. Er det noget særligt ubehageligt, så ring – det er ikke første gang, og vi siger ærligt, hvad vi kan gøre.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvor hurtigt skal et spild rengøres?",
        a: "Så hurtigt som muligt, helst inden for få dage. Mælk og mad begynder at lugte hurtigt i en varm bil.",
      },
      {
        q: "Hvad koster rengøring efter et uheld?",
        a: "Indvendig rengøring fra 600 kr. plus tilvalg efter behov: pletfjernelse 250 kr., sæderens 300 kr. eller ekstra beskidt 299 kr.",
      },
      {
        q: "Kan lugten af spildt mælk fjernes?",
        a: "Som regel ja, hvis det behandles hurtigt. Er mælken trukket dybt ned og har siddet længe, kan det kræve mere end én behandling.",
      },
      {
        q: "Rengør I efter opkast i bilen?",
        a: "Kontakt os, og beskriv uheldet. Fjern det faste og dup op først, og luft bilen ud.",
      },
      {
        q: "Skal jeg selv prøve med rengøringsmidler først?",
        a: "Dup op, og brug koldt vand. Vent med stærke midler – forkerte produkter kan fiksere pletten eller efterlade skjolder.",
      },
    ],
    keywords: ["rengøring efter uheld bil", "spildt i bilen", "spildt mælk bil rengøring", "plet i bil hjælp", "rengøring bilsæde uheld"],
    image: { src: "/home/uheld.jpg", alt: "Spildt mad og drikke på bilsæde efter uheld" },
    related: [
      "/pletfjernelse-bilsaeder",
      "/saederens-bil",
      "/lugtfjernelse-bil",
      "/rengoering-af-meget-beskidt-bil",
      "/blog/spildt-maelk-i-bilen",
      "/blog/pletguide-til-bilsaeder",
    ],
    pkg: "inside",
  }),
];
