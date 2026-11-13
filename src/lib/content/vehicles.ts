import { vehiclePage, type ContentPage } from "./types";

// Biltyper: hvad der er særligt ved at vaske netop den slags bil, og hvad det koster.
export const vehicles: ContentPage[] = [
  vehiclePage({
    slug: "bilvask-elbil",
    title: "Bilvask af elbil – håndvask uden børster",
    description:
      "Skånsom håndvask af elbiler på din adresse. Vi bruger ikke din ladestander eller strøm og tager hensyn til sensorer og kameraer. Fra 450 kr.",
    h1: "Bilvask af elbil",
    eyebrow: "Elbiler og plug-in-hybrider",
    intro:
      "En elbil vaskes i princippet som enhver anden bil. Men der er nogle få ting, der er anderledes – og dem har vi styr på.",
    answer:
      "CleanWash vasker elbiler og hybridbiler i hånden på din adresse. Vi medbringer egen strøm og vand og bruger ikke din ladestander. Prisen følger bilens størrelse: udvendig vask fra 450 kr. og hele bilen fra 799 kr. Elbiler er tunge og ligger derfor ofte i de øverste priskategorier.",
    sections: [
      {
        h: "Det er anderledes ved en elbil",
        p: [
          "Elbiler er tætte og kan sagtens tåle vand. Det er ikke dér, forskellen ligger. Den ligger i udstyret uden på og inde i bilen.",
        ],
        list: [
          "Kameraer og sensorer: Førerassistenter ser gennem linser i front, sider og bag. De skal være rene for at virke – og må ikke ridses.",
          "Glastage og store ruder: Viser kalk- og vandpletter tydeligt. Aftørring er vigtig.",
          "Skærme og blanke flader: Store touchskærme og højglans i kabinen kræver bløde klude.",
          "Ladeporten: Skal være lukket under vask og må ikke spules direkte.",
          "Lyse kabiner: Mange elbiler har lyst kunstlæder, der tager farve fra mørkt tøj.",
        ],
      },
      {
        h: "Hvorfor håndvask passer godt til elbiler",
        p: [
          "Flere elbilsproducenter fraråder i instruktionsbogen børstevask og anbefaler berøringsfri vask eller håndvask. Lakken skal holde i mange år, og roterende børster giver fine ridser, der ses tydeligt på mørke farver.",
          "En håndvask med forvask er den skånsomme vej. Vi løsner snavset med skum, vasker med rene vaskehandsker og tørrer af, så de store glasflader står uden pletter.",
        ],
      },
      {
        h: "Bremser, fælge og regenerering",
        p: [
          "Elbiler bremser mest med motoren. Det giver mindre bremsestøv på fælgene end på benzin- og dieselbiler. Til gengæld bliver bremseskiverne brugt så lidt, at de får et tyndt lag overfladerust efter vask eller regn. Det er normalt og forsvinder ved de første opbremsninger.",
        ],
      },
      {
        h: "Størrelse og pris",
        p: [
          "Prisen afhænger af bilens størrelseskategori, som bookingen finder ud fra nummerpladen og bilens totalvægt. Batteriet gør elbiler tunge. Derfor lander mange mellemstore elbiler i kategorien stor bil (over 2.000 kg), og de tungeste i den øverste kategori (over 2.500 kg). Du ser kategorien og prisen i bookingen, før du bekræfter.",
          "Bilen behøver ikke at være afbrudt fra laderen, når vi kommer, men vi anbefaler, at den ikke lader, mens den bliver vasket.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan en elbil tåle at blive vasket?",
        a: "Ja. Elbiler er bygget til regn og vask ligesom andre biler. Man skal blot undgå at spule direkte på ladeporten og være forsigtig med højt tryk.",
      },
      {
        q: "Bruger I min ladestander eller min strøm?",
        a: "Nej. Vi medbringer selv både strøm og vand.",
      },
      {
        q: "Må bilen lade, mens den bliver vasket?",
        a: "Vi anbefaler, at ladekablet er taget ud, og ladeporten lukket under vasken.",
      },
      {
        q: "Hvorfor er min elbil i kategorien stor bil?",
        a: "Kategorien bestemmes af bilens totalvægt. Batteriet gør elbiler tungere end tilsvarende benzinbiler, så mange ligger over 2.000 kg – og de tungeste over 2.500 kg, som er den øverste kategori.",
      },
      {
        q: "Er rust på bremseskiverne efter vask et problem?",
        a: "Nej. Det er et tyndt lag overfladerust, som forsvinder, så snart du bremser et par gange.",
      },
    ],
    keywords: ["bilvask elbil", "vask af elbil", "håndvask elbil", "elbil bilvask pris", "bilvask hybridbil"],
    image: { src: "/service/udenfor.jpg", alt: "Skånsom håndvask af elbil på kundens adresse" },
    related: [
      "/bilvask-tesla",
      "/bilvask-polestar",
      "/blog/bilvask-af-elbil-saadan-goer-du-det-sikkert",
      "/haandvask-bil-koebenhavn",
      "/komplet-bilvask",
      "/bilvask-priser",
    ],
    pkg: "outside",
  }),

  vehiclePage({
    slug: "bilvask-varevogn",
    title: "Bilvask af varevogn – fra 899 kr. på adressen",
    description:
      "Vask af varevogn og kassevogn på din adresse. Udvendig vask 899 kr., førerkabine 899 kr., hele bilen 1.500 kr. Vi medbringer vand og strøm.",
    h1: "Bilvask af varevogn",
    eyebrow: "Varebiler og kassevogne",
    intro:
      "En varevogn er for stor til mange vaskehaller og for travl til at holde stille. Vi vasker den, hvor den parkerer – hjemme eller ved firmaet.",
    answer:
      "CleanWash vasker varevogne på din adresse med eget vand og strøm. Udvendig vask koster 899 kr., indvendig rengøring af førerkabinen 899 kr. og hele bilen 1.500 kr. Kategorien gælder varebiler og køretøjer med en totalvægt over 2.500 kg.",
    sections: [
      {
        h: "Hvorfor varevogne er svære at få vasket",
        p: [
          "Mange vaskehaller har en højdegrænse, som en kassevogn med højt tag ikke kommer under. Tagbøjler, stiger og rørholdere gør det værre. Selvvaskehaller kan bruges, men så står chaufføren selv med lansen i regntøj, og taget når man alligevel ikke.",
          "Resultatet er, at mange varevogne kun bliver vasket, når det regner. Det er ærgerligt, for varevognen er ofte det første, kunden ser.",
        ],
      },
      {
        h: "Det får du",
        p: [
          "Vi vasker hele køretøjet i hånden: sider, bagdøre, front, fælge og hjulbuer. Udvendig vask tager udgangspunkt i samme metode som på personbiler – forvask med skum, vask, skyl og aftørring.",
          "Indvendig rengøring gælder førerkabinen, hvor chaufføren tilbringer dagen: støvsugning, aftørring af instrumentbræt, dørpaneler og konsol, rengøring af måtter og pudsning af ruder indefra.",
        ],
        list: [
          "Udvendig vask: 899 kr.",
          "Førerkabine indvendigt: 899 kr.",
          "Hele bilen, ude og inde: 1.500 kr.",
        ],
      },
      {
        h: "Folie, logo og reklamer",
        p: [
          "De fleste firmavogne har folie med logo og kontaktoplysninger. Folie tåler vask, men kanterne er sårbare over for højt tryk og hårde børster. Håndvask er den skånsomme måde at holde reklamen pæn og læsbar på.",
        ],
      },
      {
        h: "En eller mange",
        p: [
          "Har du én varevogn, booker du online som alle andre. Har virksomheden flere, laver vi en fast aftale med vaskedage på jeres adresse og samlet faktura. Bilerne vaskes, når de holder stille – ingen medarbejder skal bruge tid på det.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster det at få vasket en varevogn?",
        a: "899 kr. for udvendig vask, 899 kr. for indvendig rengøring af førerkabinen og 1.500 kr. for hele bilen.",
      },
      {
        q: "Vasker I også varerummet?",
        a: "Den indvendige rengøring gælder førerkabinen. Har du brug for rengøring af varerummet, så kontakt os, og beskriv opgaven.",
      },
      {
        q: "Kan I vaske en varevogn med højt tag?",
        a: "Ja. Vi vasker i hånden og er ikke begrænset af højden i en vaskehal. Oplys gerne, hvis bilen har tagudstyr.",
      },
      {
        q: "Tåler folien at blive vasket?",
        a: "Ja. Håndvask er skånsom mod folie og kanter. Fortæl os, hvis folien er ny eller har løse kanter.",
      },
      {
        q: "Hvornår regnes en bil som varevogn?",
        a: "Når den er registreret som varebil, eller når totalvægten er over 2.500 kg. Bookingen finder kategorien ud fra nummerpladen.",
      },
    ],
    keywords: ["bilvask varevogn", "vask af varevogn", "varevogn vask pris", "vask af kassevogn", "rengøring af varebil"],
    image: { src: "/bilsize/varevogn.png", alt: "Hvid varevogn – vask af varebil på adressen" },
    related: [
      "/bilvask-servicebiler",
      "/erhvervs-bilvask",
      "/erhverv/flaadeaftale",
      "/bilvask-vestegnen",
      "/bilvask-suv",
      "/bilvask-priser",
    ],
    pkg: "whole",
  }),

  vehiclePage({
    slug: "bilvask-suv",
    title: "Bilvask af SUV – stor bil fra 699 kr.",
    description:
      "Bilvask af SUV og store biler på din adresse. Udvendig vask 699 kr., indvendig rengøring 799 kr., hele bilen 999 kr. Vand og strøm medbringes.",
    h1: "Bilvask af SUV",
    eyebrow: "SUV'er og store familiebiler",
    intro:
      "En SUV har mere af det hele: mere lak, højere tag, større hjul og ofte en ekstra sæderække. Det tager længere tid – og det er taget med i prisen.",
    answer:
      "CleanWash vasker SUV'er og store biler på din adresse. I kategorien stor bil – biler med en totalvægt over 2.000 kg – koster udvendig vask 699 kr., indvendig rengøring 799 kr. og hele bilen med voks 999 kr.",
    sections: [
      {
        h: "Derfor koster en SUV lidt mere",
        p: [
          "Prisen på en bilvask er tid. En stor SUV har markant mere overflade end en mellemklassebil, taget kræver, at man kan nå, og kabinen har flere kubikmeter at støvsuge. Derfor er der en kategori for store biler.",
          "Kategorien bestemmes af bilens totalvægt. Er den over 2.000 kg, er bilen en stor bil i bookingen. Det gælder mange SUV'er, store stationcars og en del elbiler. De allertungeste – over 2.500 kg – prissættes i den øverste kategori sammen med varevogne.",
        ],
      },
      {
        h: "Steder, en SUV samler snavs",
        p: [
          "SUV'er har nogle faste snavsfælder, som en hurtig vask sjældent kommer omkring.",
        ],
        list: [
          "Taget og tagrælingen: Uden for synsvidde – og derfor ofte grønt af alger.",
          "Hjulbuernes plastkanter: Samler mudder og bliver grå og falmede.",
          "Bagklappen: Den lodrette bagende suger vejsnavs til sig og er altid beskidtest.",
          "Dørtrin og trinbrætter: Får snavs fra sko, hver gang nogen stiger ind.",
          "Tredje sæderække: Sjældent brugt, sjældent støvsuget.",
        ],
      },
      {
        h: "Syv sæder og stort bagagerum",
        p: [
          "Har bilen syv sæder, støvsuger vi også den bagerste række og rummet omkring den. Er sæderne slået ned, bliver bagagerummet rengjort som ét stort rum. Sæderens dækker op til fem sæder; har du brug for alle syv, så skriv det i bookingen.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster bilvask af en SUV?",
        a: "I kategorien stor bil koster udvendig vask 699 kr., indvendig rengøring 799 kr. og hele bilen 999 kr.",
      },
      {
        q: "Hvordan ved jeg, om min bil er en stor bil?",
        a: "Bookingen afgør det ud fra nummerpladen. Biler med en totalvægt mellem 2.000 og 2.500 kg hører til kategorien stor bil. Over 2.500 kg gælder den øverste kategori.",
      },
      {
        q: "Vasker I taget på en høj SUV?",
        a: "Ja. Taget vaskes sammen med resten af bilen.",
      },
      {
        q: "Rengør I tredje sæderække?",
        a: "Ja, den støvsuges som en del af den indvendige rengøring.",
      },
      {
        q: "Hvad med en pickup eller firehjulstrækker?",
        a: "Den vaskes på samme måde. Kategorien – stor bil eller varevogn – afgøres af registrering og totalvægt.",
      },
    ],
    keywords: ["bilvask SUV", "vask af SUV", "bilvask stor bil", "bilvask SUV pris", "bilvask 7-personers"],
    image: { src: "/bilsize/storbil.png", alt: "Stor SUV – bilvask af stor bil" },
    related: [
      "/bilvask-familiebil",
      "/bilvask-varevogn",
      "/komplet-bilvask",
      "/bilvask-volvo",
      "/bilvask-elbil",
      "/bilvask-priser",
    ],
    pkg: "whole",
  }),

  vehiclePage({
    slug: "bilvask-familiebil",
    title: "Bilvask af familiebil – børn, krummer og sand",
    description:
      "Indvendig rengøring af familiebilen på din adresse. Vi fjerner krummer, sand og pletter og renser autostole. Indvendig rengøring fra 600 kr.",
    h1: "Bilvask af familiebilen",
    eyebrow: "Til børnefamilier",
    intro:
      "Familiebilen er spisestue, omklædningsrum og legeplads på samme tid. Det er helt i orden. Vi sørger for, at den bliver ren igen.",
    answer:
      "CleanWash gør familiebilen ren på din adresse. Indvendig rengøring koster fra 600 kr. og fjerner krummer, sand og støv fra sæder, gulv og bagagerum. Rens af autostol koster 100 kr., sæderens 300 kr. og pletfjernelse 250 kr. som tilvalg.",
    sections: [
      {
        h: "Familiebilens fem klassikere",
        p: [
          "Efter nogle år med børn i bilen er der fem ting, vi møder næsten hver gang.",
        ],
        list: [
          "Krummer i og under autostolen – kiks, rosiner og majskager i lag",
          "Klistrede kopholdere og dørlommer efter juice og saftevand",
          "Sand og småsten fra legeplads, strand og fodboldbane",
          "Fedtede fingeraftryk på ruder og ryglæn",
          "Fodspor på bagsiden af forsæderne",
        ],
      },
      {
        h: "Sådan gør vi den ren",
        p: [
          "Vi tager måtterne ud, støvsuger alt og går særligt efter sprækkerne mellem sæde og ryglæn og skinnerne under forsæderne, hvor det meste gemmer sig. Derefter tørrer vi alle hårde flader af: paneler, kopholdere, dørlommer og ryglæn. Til sidst pudser vi ruderne indefra.",
          "Autostolene kan renses som tilvalg. Det sæde, de står på, bliver rengjort som en del af pakken.",
        ],
      },
      {
        h: "Hvor ofte – og hvornår?",
        p: [
          "For de fleste børnefamilier er hver anden til tredje måned passende. Gode tidspunkter er efter sommerferien, efter efterårets mudder og før jul, hvor bilen skal rumme gæster, gaver og bedsteforældre.",
          "Bor I to voksne med hver sin bil, kan begge vaskes i samme besøg med 15 % rabat på grundprisen for den anden.",
        ],
      },
      {
        h: "Tre vaner, der hjælper",
        p: [
          "En lille affaldspose i bilen, gummimåtter i vinterhalvåret og et tæppe under autostolen gør en stor forskel. Det holder ikke bilen ren, men det gør rengøringen hurtigere og beskytter sædet mod tryk og pletter.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster det at få gjort familiebilen ren indvendigt?",
        a: "Fra 600 kr. for en lille bil, 700 kr. for en mellemklassebil og 799 kr. for en stor bil.",
      },
      {
        q: "Renser I autostole?",
        a: "Ja, som tilvalg til 100 kr.",
      },
      {
        q: "Kan I fjerne mælk- og juicepletter?",
        a: "Som regel ja. Vælg pletfjernelse til enkelte pletter eller sæderens, hvis hele sædet trænger.",
      },
      {
        q: "Skal autostolene tages ud inden?",
        a: "Det er en fordel, hvis du kan tage dem ud, så vi kommer til sædet under. Ellers arbejder vi omkring dem.",
      },
      {
        q: "Er rengøringsmidlerne sikre for børn?",
        a: "Vi bruger midler, der er beregnet til bilkabiner, og tørrer efter. Luft gerne ud en halv times tid, inden børnene sætter sig ind.",
      },
    ],
    keywords: ["bilvask familiebil", "rengøring af familiebil", "bil med børn rengøring", "indvendig rengøring børn", "bilrengøring børnefamilie"],
    image: { src: "/home/kids.jpg", alt: "Autostol i familiebil før indvendig rengøring" },
    related: [
      "/rens-af-autostol",
      "/saederens-bil",
      "/bilvask-flere-biler",
      "/bilvask-suv",
      "/blog/saadan-rydder-og-rengoer-du-bilen-med-boern",
      "/bilrengoering",
    ],
    pkg: "inside",
  }),

  vehiclePage({
    slug: "bilvask-lille-bil",
    title: "Bilvask af lille bil – fra 450 kr.",
    description:
      "Har du en lille bil? Så får du vores laveste priser: udvendig vask 450 kr., indvendig rengøring 600 kr., hele bilen 799 kr. Vi kommer til dig.",
    h1: "Bilvask af lille bil",
    eyebrow: "Mikrobiler og små bybiler",
    intro:
      "Små biler er hurtigere at vaske end store. Det skal du ikke betale for meget for – derfor har de deres egen pris.",
    answer:
      "For små biler med en totalvægt op til 1.300 kg koster udvendig bilvask hos CleanWash 450 kr., indvendig rengøring 600 kr. og hele bilen inklusive voks 799 kr. Vi kommer til din adresse med eget vand og strøm.",
    sections: [
      {
        h: "Hvad er en lille bil?",
        p: [
          "I vores booking er en lille bil en bil med en totalvægt op til 1.300 kg. Det er typisk mikrobiler og de mindste bybiler. Du behøver ikke selv at kende vægten. Når du taster nummerpladen, finder systemet kategorien og viser prisen.",
          "Ligger din bil lige over grænsen, hører den til kategorien mellem bil. Det vil du kunne se, før du bekræfter.",
        ],
      },
      {
        h: "Små biler bliver også beskidte",
        p: [
          "Bybiler kører korte ture med mange opbremsninger. Det giver bremsestøv på fælgene. De parkeres på gaden under træer og lygtepæle og får fugleklatter og harpiks. Og fordi kabinen er lille, fylder lidt rod og lidt snavs forholdsvis meget.",
          "En lille bil har også mindre lakflade at fordele slitagen på. Hver ridse og hver mat plet ses.",
        ],
      },
      {
        h: "Tre måder at bruge os på",
        p: [
          "Mange med små biler vælger én af tre rytmer.",
        ],
        list: [
          "Den enkle: Hele bilen to gange om året, forår og efterår – 799 kr. pr. gang.",
          "Den faste: Udvendig vask en gang om måneden – 450 kr. – og Hele bilen ved årstidsskifte.",
          "Efter behov: Indvendig rengøring, når kabinen trænger – 600 kr.",
        ],
      },
      {
        h: "Første bil eller delebil med naboen?",
        p: [
          "En lille bil er ofte den første bil, bil nummer to i husstanden eller en bil, flere deles om. I alle tilfælde er det rarere, når den er ren – og det behøver ikke at koste en formue at holde den sådan.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hvad koster bilvask af en lille bil?",
        a: "Udvendig vask 450 kr., indvendig rengøring 600 kr. og hele bilen 799 kr.",
      },
      {
        q: "Hvordan ved jeg, om min bil tæller som lille?",
        a: "Tast nummerpladen i bookingen. Systemet viser kategorien ud fra bilens totalvægt. Grænsen går ved 1.300 kg.",
      },
      {
        q: "Er vasken mindre grundig, fordi prisen er lavere?",
        a: "Nej. Metoden er den samme. Prisen er lavere, fordi en lille bil tager kortere tid.",
      },
      {
        q: "Er voks med til en lille bil?",
        a: "Ja, når du vælger Hele bilen.",
      },
      {
        q: "Kan jeg få rabat, hvis vi har to små biler?",
        a: "Ja. Bil nummer to i samme besøg får 15 % rabat på grundprisen.",
      },
    ],
    keywords: ["bilvask lille bil", "billig bilvask lille bil", "bilvask mikrobil", "bilvask bybil pris", "bilvask 450 kr"],
    image: { src: "/bilsize/lille.png", alt: "Lille bybil – bilvask af lille bil" },
    related: [
      "/bilvask-priser",
      "/billig-bilvask-koebenhavn",
      "/komplet-bilvask",
      "/bilvask-lejlighed",
      "/bilvask-flere-biler",
      "/faelgrens",
    ],
    pkg: "outside",
  }),
];
