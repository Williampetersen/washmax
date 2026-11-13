import type { Route } from "next";
import type { BlogPost } from "@/lib/blog-posts";

const route = (href: string) => href as Route;
const published = "2026-11-13";

// Guides om årstider, vejr og omgivelser.
export const aarstiderBlogPosts: BlogPost[] = [
  {
    slug: "pollen-paa-bilen",
    title: "Pollen på bilen: sådan slipper du af med det gule lag",
    metaTitle: "Pollen på bilen – fjern det gule lag",
    description:
      "Om foråret dækkes bilen af gult pollen. Se hvorfor du ikke skal tørre det af, hvordan det vaskes skånsomt væk, og hvordan du holder det ude af kabinen.",
    category: "Årstider",
    keywords: ["pollen på bilen", "gult støv på bil", "birkepollen bil", "bilvask forår", "pollen lak"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/service/udenfor.jpg", alt: "Udvendig vask af bil dækket af pollen" },
    intro: [
      "I april og maj vågner man op til en bil, der har skiftet farve. Et fint, gulgrønt lag dækker motorhjelm, tag og ruder. Det er pollen – først fra birk, senere fra græs.",
      "Det ser harmløst ud. Men den måde, de fleste fjerner det på, er den hurtigste vej til ridser.",
    ],
    keyTakeaways: [
      "Tør aldrig pollen af med en tør klud eller hånden.",
      "Skyl det af, eller vask bilen med forvask.",
      "Vådt pollen, der bager i solen, kan efterlade pletter.",
      "Hold vinduerne lukket, og skift kabinefilter før sæsonen.",
    ],
    sections: [
      {
        heading: "Hvorfor ikke bare tørre det af?",
        paragraphs: [
          "Pollenkorn er bittesmå og har ofte en ru overflade. Sammen med det støv, der altid ligger på bilen, bliver de til et fint slibemiddel, når man gnider. En hurtig tur med en klud giver mikroridser over hele fladen.",
          "Det samme gælder forruden. Tænder du viskerne på en tør, pollendækket rude, trækker de laget frem og tilbage. Brug altid sprinklervæske først.",
        ],
      },
      {
        heading: "Sådan fjernes pollen skånsomt",
        paragraphs: [
          "Vand først. Skyl bilen grundigt oppefra og ned, så det meste løber af. Læg derefter skum på, lad det virke, og skyl igen. Først nu vaskes bilen med vaskehandske.",
          "Glem ikke sprækkerne. Pollen samler sig i dørkarme, ved bagklappen, omkring tanklågen og i luftindtaget foran forruden. Åbn dørene, og tør karmene af.",
        ],
      },
      {
        heading: "Kan pollen skade lakken?",
        paragraphs: [
          "Tørt pollen gør ingen skade. Men når det bliver vådt af dug eller regn og derefter bager i solen, kan det sætte sig som gullige pletter, der er svære at vaske af. På lyse biler ses det tydeligst.",
          "En vokset lak hjælper. Pollen binder sig til voksen i stedet for lakken og skylles lettere af.",
        ],
      },
      {
        heading: "Hold det ude af kabinen",
        paragraphs: [
          "Kør med lukkede vinduer i pollensæsonen, og brug airconditionen. Få skiftet kabinefilteret, inden sæsonen begynder. Og tør instrumentbræt og flader af med en let fugtig klud – en tør klud hvirvler pollen op.",
          "En vask hver anden uge i de værste uger holder både bil og næse i bedre stand.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvordan fjerner man pollen fra bilen?",
        answer: "Skyl bilen grundigt med vand, forvask med skum, og vask derefter i hånden. Tør det aldrig af tørt.",
      },
      {
        question: "Skader pollen lakken?",
        answer: "Ikke i sig selv. Vådt pollen, der tørrer ind i solen, kan dog efterlade pletter.",
      },
      {
        question: "Hvor ofte skal bilen vaskes i pollensæsonen?",
        answer: "Cirka hver anden uge, mens der er mest pollen i luften.",
      },
      {
        question: "Hvornår er der mest pollen?",
        answer: "Birk topper typisk i april og maj, græs i juni og juli.",
      },
    ],
    relatedPosts: ["allergi-og-bilens-kabine", "forvask-og-skum-hvorfor"],
    relatedLinks: [
      { label: "Udvendig bilvask", href: route("/udvendig-bilvask-koebenhavn") },
      { label: "Bilvask med voks", href: route("/bilvask-med-voks") },
      { label: "Bilvask Virum", href: route("/bilvask-virum") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "bilvask-i-sommervarme",
    title: "Bilvask i sommervarme: undgå kalkpletter og fastbrændt sæbe",
    metaTitle: "Bilvask om sommeren – undgå pletter i solen",
    description:
      "Sol og varme gør bilvask sværere. Se hvornår på dagen bilen skal vaskes, hvorfor insekter og fugleklatter haster, og hvordan kabinen beskyttes.",
    category: "Årstider",
    keywords: ["bilvask sommer", "vask bil i solen", "bilvask i varme", "insekter på bil sommer", "kalkpletter sol"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/service/helebil.jpg", alt: "Bilvask om sommeren med aftørring" },
    intro: [
      "Solskin og 25 grader lyder som perfekt vejr til at vaske bil. Det er det ikke. Det er faktisk det sværeste vejr at få et pænt resultat i.",
      "Sommeren kræver lidt planlægning – og lidt mere fart på over for det, der lander på lakken.",
    ],
    keyTakeaways: [
      "Vask i skygge eller tidligt og sent på dagen.",
      "Varm lak får vand og sæbe til at tørre ind som pletter.",
      "Insekter og fugleklatter ætser hurtigere i varme.",
      "Solcreme og UV-lys slider på kabinens flader.",
    ],
    sections: [
      {
        heading: "Hvorfor ikke i direkte sol?",
        paragraphs: [
          "En mørk motorhjelm kan blive over 60 grader i solen. Vand fordamper på sekunder og efterlader kalken. Sæbe tørrer ind, før den bliver skyllet af, og giver striber og skjolder.",
          "Vask derfor om morgenen, sidst på eftermiddagen eller i skygge. Kan det ikke undgås, så arbejd på en lille del ad gangen, og skyl med det samme.",
        ],
      },
      {
        heading: "Sommerens tre fjender",
        paragraphs: [
          "Insekter på fronten er sure, og varmen fremskynder ætsningen. Efter en lang motorvejstur bør de af inden for få dage. Blød dem op – skrub dem ikke.",
          "Fugleklatter er endnu værre. På en varm dag kan de sætte mærker i klarlakken på under et døgn. Harpiks fra træer hærder hurtigt i varmen og bliver svær at fjerne.",
        ],
      },
      {
        heading: "Aftørring er vigtigere end nogensinde",
        paragraphs: [
          "Det danske vand er hårdt. Om sommeren har du ikke tid til at lade bilen stå. Tør den af med rene mikrofiberhåndklæder, så snart den er skyllet – tag, ruder og motorhjelm først.",
          "Voks hjælper her. På en vokset bil løber det meste vand af selv.",
        ],
      },
      {
        heading: "Kabinen i varmen",
        paragraphs: [
          "Sol gennem forruden er hård ved instrumentbrættet. En solskærm i forruden og et plejemiddel med UV-beskyttelse forlænger levetiden. Solcreme på arme og ben sætter sig som hvide skjolder på dørpaneler og læder – tør dem af, før de trækker ind.",
          "Våde badehåndklæder og fugtigt tøj i en varm bil giver hurtigt en muggen lugt. Tag dem med ind.",
        ],
      },
    ],
    faqs: [
      {
        question: "Må man vaske bil i solskin?",
        answer: "Det frarådes. Vand og sæbe tørrer ind og giver pletter. Vask i skygge eller tidligt og sent på dagen.",
      },
      {
        question: "Hvor hurtigt skal insekter fjernes om sommeren?",
        answer: "Inden for få dage. I varme ætser resterne sig hurtigt ned i lakken.",
      },
      {
        question: "Hvordan undgår jeg kalkpletter om sommeren?",
        answer: "Tør bilen af med det samme efter skylning, og lad den ikke lufttørre i solen.",
      },
      {
        question: "Vasker CleanWash i varmt vejr?",
        answer: "Ja. Vi arbejder i sektioner og tørrer bilen af, så der ikke kommer pletter. Kan bilen holde i skygge, er det en fordel.",
      },
    ],
    relatedPosts: ["vandpletter-og-kalkpletter-paa-bilen", "fjern-fugleklatter-insekter-uden-at-ridse-lakken"],
    relatedLinks: [
      { label: "Bilvask efter ferien", href: route("/bilvask-efter-ferien") },
      { label: "Bilvask med voks", href: route("/bilvask-med-voks") },
      { label: "Vinylpleje", href: route("/vinylpleje-bil") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "kan-man-vaske-bil-i-regnvejr",
    title: "Kan man vaske bil i regnvejr – og giver det mening?",
    metaTitle: "Kan man vaske bil i regnvejr?",
    description:
      "Regn gør ikke bilen ren – tværtimod. Læs hvorfor en vask før regnen kan betale sig, hvornår vejret er for dårligt, og hvad voks betyder.",
    category: "Årstider",
    keywords: ["bilvask i regnvejr", "vaske bil når det regner", "regn bilvask", "bliver bilen ren af regn", "bilvask dårligt vejr"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 3,
    coverImage: { src: "/service/udenfor.jpg", alt: "Bilvask i overskyet vejr" },
    intro: [
      "Det er et af de spørgsmål, vi oftest får: Skal jeg flytte min tid, fordi der er regn i udsigten? Svaret er som regel nej.",
      "Mange tror, at regn vasker bilen, eller at en vask er spildt, hvis det regner bagefter. Begge dele er forkert.",
    ],
    keyTakeaways: [
      "Regn fjerner kun løst støv. Vejfilm, salt og fedt bliver siddende.",
      "Regnvand indeholder støv og forurening, der tørrer ind som pletter.",
      "En ren, vokset bil bliver mindre beskidt af regn end en snavset.",
      "Let regn er ikke en hindring. Storm og skybrud er.",
    ],
    sections: [
      {
        heading: "Hvorfor bliver bilen ikke ren af regn?",
        paragraphs: [
          "Snavset på en bil er bundet til lakken af fedt og olie fra vejen. Vand alene opløser det ikke. Regnen skyller det øverste støv af og efterlader den grå film.",
          "Regndråber samler desuden partikler på vej ned gennem luften. Når de tørrer på lakken, bliver partiklerne tilbage. Derfor ser en bil ofte mere beskidt ud efter en byge end før.",
        ],
      },
      {
        heading: "Er vasken spildt, hvis det regner bagefter?",
        paragraphs: [
          "Nej. En ren bil har ingen film, som regnens snavs kan sætte sig i. Og er lakken vokset, perler vandet af og tager det meste med sig. Det er den beskidte bil, der bliver værre af regn.",
          "Det, du betaler for i en vask, er at få fjernet vejfilm, salt og bremsestøv. Det arbejde går ikke tabt, fordi det regner dagen efter.",
        ],
      },
      {
        heading: "Kan man vaske, mens det regner?",
        paragraphs: [
          "I let regn ja. Bilen er allerede våd, og kalkpletter er ikke noget problem, fordi regnvand er blødt. Aftørring og voks er sværere, så resultatet står knap så skarpt med det samme.",
          "I kraftig regn, storm eller frost giver det ikke mening. Så bliver arbejdet dårligere, end bilen fortjener.",
        ],
      },
      {
        heading: "Sådan gør vi",
        paragraphs: [
          "Vi vasker i almindeligt dansk vejr, og det inkluderer småregn. Er vejret for dårligt til et ordentligt resultat, kontakter vi dig og finder en ny tid.",
          "Har du en indkørsel med carport eller overdækning, er det en fordel på en regnvejrsdag – men det er ikke et krav.",
        ],
      },
    ],
    faqs: [
      {
        question: "Bliver bilen ren af regn?",
        answer: "Nej. Regn fjerner kun løst støv. Vejfilm og fedt skal vaskes af med sæbe.",
      },
      {
        question: "Kan det betale sig at vaske bil, når der kommer regn?",
        answer: "Ja. En ren og vokset bil bliver mindre beskidt af regn end en snavset.",
      },
      {
        question: "Vasker I, når det regner?",
        answer: "Let regn stopper os ikke. Ved rigtig dårligt vejr kontakter vi dig og flytter tiden.",
      },
      {
        question: "Hvorfor er bilen plettet efter regn?",
        answer: "Fordi regndråberne indeholder støv og forurening, som bliver tilbage, når vandet fordamper.",
      },
    ],
    relatedPosts: ["hvor-laenge-holder-bilvoks", "kan-man-vaske-bilen-i-frostvejr"],
    relatedLinks: [
      { label: "Garanti og tryghed", href: route("/garanti") },
      { label: "Bilvask med voks", href: route("/bilvask-med-voks") },
      { label: "Spørgsmål og svar", href: route("/bilvask-faq") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "bilvask-om-efteraaret-blade-og-afloeb",
    title: "Efterår og bil: blade, afløb og fugt i kabinen",
    metaTitle: "Bil om efteråret – blade og tilstoppede afløb",
    description:
      "Visne blade stopper bilens afløb og kan sende vand ind i kabinen. Se hvor bladene samler sig, hvordan du fjerner dem, og hvad efteråret ellers gør ved bilen.",
    category: "Årstider",
    keywords: ["blade i bilens afløb", "tilstoppet afløb bil", "bil efterår", "vand i kabinen blade", "bilvask efterår"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/service/udenfor.jpg", alt: "Rengøring af karme og kanter på bil om efteråret" },
    intro: [
      "Efteråret er smukt på afstand og besværligt på nært hold. Bladene falder, bliver våde og lægger sig alle de steder på bilen, hvor vandet skal kunne løbe væk.",
      "De fleste tænker ikke over det, før der en dag står vand i fodrummet.",
    ],
    keyTakeaways: [
      "Bilen har afløb ved forruden, i dørene og ved bagklappen.",
      "Tilstoppede afløb kan lede vand ind i kabinen og elektronikken.",
      "Våde blade kan misfarve lakken, hvis de ligger længe.",
      "Fjern bladene med hånden – skyl dem ikke længere ned.",
    ],
    sections: [
      {
        heading: "Hvor samler bladene sig?",
        paragraphs: [
          "Det vigtigste sted er renden mellem forruden og motorhjelmen. Her løber regnvandet fra ruden ned og ud gennem afløb i siderne. Her sidder også luftindtaget til kabinen.",
          "Andre steder er dørenes bund, hvor små drænhuller leder vand ud, renden omkring bagklappen og – på biler med soltag – afløbene i hjørnerne af tagåbningen.",
        ],
      },
      {
        heading: "Hvad sker der, når de stopper til?",
        paragraphs: [
          "Vandet stiger i renden og finder en anden vej: ind gennem luftindtaget og ned i ventilationsanlægget eller fodrummet. Resultatet er våde tæpper, duggede ruder og muggen lugt. I værste fald rammer det elektronik.",
          "Blade, der ligger og rådner, holder også på fugten mod lak og metal. Det giver grobund for rust i samlinger og kanter.",
        ],
      },
      {
        heading: "Sådan renser du afløbene",
        paragraphs: [
          "Åbn motorhjelmen, og pluk bladene op med hånden. Brug en lille børste eller en støvsuger til det sidste. Skyl ikke bladene ned i afløbet – det er præcis sådan, proppen opstår.",
          "Åbn dørene, og tjek karmen og bunden. Tjek bagklappens rende. Gør det hver anden uge, mens bladene falder, hvis bilen holder under træer.",
        ],
      },
      {
        heading: "Våde blade og lak",
        paragraphs: [
          "Blade indeholder garvesyre. Ligger et vådt blad på lakken i dagevis, kan det efterlade en brunlig aftegning – især på lyse biler. Den går ofte af med en vask, men kan kræve polering, hvis den har siddet længe.",
          "En udvendig håndvask om efteråret tager karme, kanter og sprækker med. Det er også et godt tidspunkt til voks, inden saltet kommer.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvor sidder bilens afløb?",
        answer: "Under forruden, i bunden af dørene, omkring bagklappen og i hjørnerne af et eventuelt soltag.",
      },
      {
        question: "Hvorfor er der vand i fodrummet?",
        answer: "En hyppig årsag om efteråret er afløb under forruden, der er stoppet af blade. Få et værksted til at se på det, hvis det fortsætter.",
      },
      {
        question: "Kan blade skade lakken?",
        answer: "Ja. Våde blade kan efterlade misfarvning, hvis de ligger længe.",
      },
      {
        question: "Fjerner CleanWash blade fra karme og afløb?",
        answer: "Synlige blade i karme, kanter og ved forruden fjernes som en del af den udvendige vask.",
      },
    ],
    relatedPosts: ["dug-paa-ruderne-indvendigt", "vejsalt-og-rust-paa-bilen"],
    relatedLinks: [
      { label: "Bilvask før vinter", href: route("/bilvask-foer-vinter") },
      { label: "Udvendig bilvask", href: route("/udvendig-bilvask-koebenhavn") },
      { label: "Bilvask Bagsværd", href: route("/bilvask-bagsvaerd") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "vejsalt-og-rust-paa-bilen",
    title: "Vejsalt og rust: sådan beskytter du bilen om vinteren",
    metaTitle: "Vejsalt og rust – beskyt bilen om vinteren",
    description:
      "Vejsalt fremskynder rust, især hvor lakken er brudt. Se hvor saltet sætter sig, hvor ofte bilen bør vaskes om vinteren, og hvad der beskytter bedst.",
    category: "Årstider",
    keywords: ["vejsalt bil", "salt og rust bil", "bilvask vinter hvor ofte", "beskyt bil mod salt", "rust fra vejsalt"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/home/wash-tire.jpg", alt: "Rengøring af hjul og hjulbue for vejsalt" },
    intro: [
      "Fra november til marts kører danske biler i saltvand. Saltet holder vejene farbare – og er det hårdeste, bilen bliver udsat for hele året.",
      "Moderne biler er godt rustbeskyttede fra fabrikken. Men beskyttelsen holder kun, så længe overfladen er hel.",
    ],
    keyTakeaways: [
      "Salt gør vand til en bedre leder og fremskynder rust markant.",
      "Det farlige er salt, der får lov at sidde – især i hjulbuer og kanter.",
      "Vask hver anden til tredje uge i saltsæsonen, på dage med plusgrader.",
      "Voks før vinteren, og udbedr stenslag, før saltet kommer.",
    ],
    sections: [
      {
        heading: "Hvorfor ruster bilen af salt?",
        paragraphs: [
          "Rust er jern, der reagerer med ilt og vand. Salt opløst i vand gør reaktionen meget hurtigere. Salt trækker også fugt til sig, så en saltet flade forbliver fugtig, længe efter at vejen er tør.",
          "Hel lak og zink holder saltet væk fra stålet. Problemet opstår, hvor beskyttelsen er brudt: stenslag, ridser, skrab på undervognen og samlinger, hvor to plader mødes.",
        ],
      },
      {
        heading: "Hvor sætter saltet sig?",
        paragraphs: [
          "Hjulene slynger saltvand op i hjulbuerne og hen langs siderne. Det samler sig bag skærmkanterne, i dørbunde, langs dørtrin og på bagklappen. Undervognen får mest.",
          "Du kan se det som hvide rande, når bilen er tør. Det, du ikke kan se, sidder i sprækker og hulrum.",
        ],
      },
      {
        heading: "Hvor ofte skal bilen vaskes om vinteren?",
        paragraphs: [
          "Hver anden til tredje uge, mens der saltes, og gerne oftere, hvis du kører dagligt på motorvej. Vælg en dag med plusgrader, så vandet ikke fryser i låse og lister.",
          "Det vigtigste er skylningen. Hjulbuer, fælge, dørkarme og de nederste paneler skal have rigeligt vand. En hurtig børstevask tager de store flader, men når ikke ind i kanterne.",
        ],
      },
      {
        heading: "Forebyggelse",
        paragraphs: [
          "Giv lakken voks i efteråret. Dæk stenslag med lakstift, før vinteren begynder. Og lad ikke en saltet bil stå uvasket i en opvarmet garage – varme og fugt får saltet til at arbejde hurtigere.",
          "Når vinteren er slut, bør bilen have en grundig vask, så det sidste salt kommer af, inden foråret.",
        ],
      },
    ],
    faqs: [
      {
        question: "Giver vejsalt rust?",
        answer: "Ja. Salt fremskynder rust, især de steder, hvor lak og rustbeskyttelse er beskadiget.",
      },
      {
        question: "Hvor ofte skal bilen vaskes om vinteren?",
        answer: "Hver anden til tredje uge i perioder med salt på vejene.",
      },
      {
        question: "Er det dårligt at parkere en saltet bil i en varm garage?",
        answer: "Ja. Varme og fugt fremskynder saltets virkning. Vask bilen først.",
      },
      {
        question: "Hjælper voks mod salt?",
        answer: "Ja. Voks lægger et lag mellem salt og lak og gør saltet lettere at vaske af.",
      },
    ],
    relatedPosts: ["kan-man-vaske-bilen-i-frostvejr", "gummilister-der-fryser-fast"],
    relatedLinks: [
      { label: "Bilvask før vinter", href: route("/bilvask-foer-vinter") },
      { label: "Bilvask efter vinter", href: route("/bilvask-efter-vinter") },
      { label: "Bilvask med voks", href: route("/bilvask-med-voks") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "gummilister-der-fryser-fast",
    title: "Gummilister, der fryser fast: sådan undgår du låste døre",
    metaTitle: "Døren fryser fast – pleje af gummilister",
    description:
      "Fastfrosne bildøre skyldes vand og snavs i gummilisterne. Se hvordan du plejer listerne før frosten, og hvad du gør, når døren først sidder fast.",
    category: "Årstider",
    keywords: ["gummilister fryser fast", "bildør frosset fast", "pleje af gummilister", "silikonestift bil", "dør fryser fast bil"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 3,
    coverImage: { src: "/service/udenfor.jpg", alt: "Aftørring af dørkarm og gummilister på bil" },
    intro: [
      "En kold morgen efter regn eller tøvejr. Du trykker på nøglen, bilen låser op – og døren rokker sig ikke. Gummilisten er frosset fast til karmen.",
      "Det kan undgås med ti minutters arbejde om efteråret.",
    ],
    keyTakeaways: [
      "Listerne fryser fast, når vand i gummiet bliver til is.",
      "Rene, plejede lister afviser vand og fryser ikke fast.",
      "Brug gummipleje eller silikonestift – ikke olie eller vaseline.",
      "Riv aldrig i en fastfrosset dør. Listen kan flænge.",
    ],
    sections: [
      {
        heading: "Hvorfor fryser døren fast?",
        paragraphs: [
          "Gummilister er let porøse, og med tiden bliver de tørre og ru. Snavs og vand sætter sig i overfladen. Når temperaturen falder under nul, fryser vandet og limer listen til metallet.",
          "Det sker især efter en bilvask, efter regn eller når tøsne smelter og fryser igen. Nye, smidige lister har sjældent problemet.",
        ],
      },
      {
        heading: "Sådan plejer du listerne",
        paragraphs: [
          "Åbn dørene, og tør alle lister af med en fugtig klud og lidt mild sæbe. Tør efter. Påfør derefter gummipleje eller en silikonestift i et tyndt lag på hele listen – også ved bagklappen og motorhjelmen.",
          "Gør det i oktober og gerne igen midt på vinteren. Brug ikke mineralolie, vaseline eller fedt. Det kan få gummiet til at svulme og nedbrydes.",
        ],
      },
      {
        heading: "Når døren allerede sidder fast",
        paragraphs: [
          "Træk ikke hårdt. Tryk i stedet døren indad langs kanten et par gange. Det knækker isen. Prøv også en anden dør, og start bilen derfra, så varmen kan arbejde.",
          "Hæld ikke kogende vand på. Det kan få ruder til at revne, og vandet fryser igen kort efter. En låseopvarmer eller afisningsspray langs kanten er et bedre valg.",
        ],
      },
      {
        heading: "Efter en bilvask om vinteren",
        paragraphs: [
          "Tør dørkarme og lister af efter vask, og åbn og luk dørene et par gange. Så bliver der ikke stående vand. Hos CleanWash tørrer vi karme og kanter af som en del af håndvasken, netop af den grund.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvorfor fryser min bildør fast?",
        answer: "Fordi vand i og på gummilisterne fryser og binder listen til karmen.",
      },
      {
        question: "Hvad skal man smøre gummilister med?",
        answer: "Gummipleje eller silikonestift. Undgå olie, fedt og vaseline.",
      },
      {
        question: "Hvordan åbner man en fastfrosset dør?",
        answer: "Tryk døren indad langs kanten for at knække isen, eller brug en anden dør. Træk ikke hårdt.",
      },
      {
        question: "Hvor ofte skal gummilister plejes?",
        answer: "En til to gange om året – vigtigst lige før vinteren.",
      },
    ],
    relatedPosts: ["kan-man-vaske-bilen-i-frostvejr", "vejsalt-og-rust-paa-bilen"],
    relatedLinks: [
      { label: "Bilvask før vinter", href: route("/bilvask-foer-vinter") },
      { label: "Udvendig bilvask", href: route("/udvendig-bilvask-koebenhavn") },
      { label: "Bilvask efter vinter", href: route("/bilvask-efter-vinter") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "bil-ved-kysten-saltluft",
    title: "Bil ved kysten: sådan beskytter du den mod saltluft",
    metaTitle: "Bil ved kysten – beskyt mod saltluft",
    description:
      "Bor du tæt på havet, får bilen salt hele året. Se hvad saltluft gør ved lak, krom og ruder, og hvor ofte en kystbil bør vaskes og vokses.",
    category: "Årstider",
    keywords: ["bil ved kysten", "saltluft bil", "bil ved havet rust", "bilvask kyst", "salt på bilruder"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/service/udenfor.jpg", alt: "Udvendig vask af bil i kystnært område" },
    intro: [
      "Udsigt til vandet er dejligt. For bilen er det en konstant belastning. Vinden fra havet bærer bittesmå saltdråber langt ind over land, og de lander på alt.",
      "De fleste biler møder kun salt om vinteren. En kystbil møder det hver dag.",
    ],
    keyTakeaways: [
      "Saltdis lægger en usynlig hinde på lak, ruder og metal.",
      "Salt trækker fugt, så overfladen aldrig bliver helt tør.",
      "Vask hver anden til tredje uge – hele året.",
      "Hold lakken vokset, og forny voksen oftere end inde i landet.",
    ],
    sections: [
      {
        heading: "Hvad gør saltluften?",
        paragraphs: [
          "Når bølger brydes, slynges fine saltdråber op i luften. I pålandsvind føres de flere kilometer ind i landet. På bilen tørrer de ind til en tynd saltfilm.",
          "Filmen suger fugt fra luften. En saltet overflade er derfor en smule våd hele tiden. Det giver ideelle vilkår for korrosion, hvor som helst lakken er brudt eller metallet ubeskyttet.",
        ],
      },
      {
        heading: "Hvor ser man det først?",
        paragraphs: [
          "På ruderne, som får en grålig hinde, der smøres ud af viskerne. På krom og blankt metal, der bliver mat og plettet. På bremseskiverne, som ruster hurtigere. Og omkring stenslag, hvor små rustpletter dukker op tidligere end ventet.",
          "Gummilister og plast ældes også hurtigere, fordi saltet udtørrer dem.",
        ],
      },
      {
        heading: "En vaskerytme for kystbiler",
        paragraphs: [
          "Vask bilen hver anden til tredje uge året rundt, og efter storm eller dage med kraftig pålandsvind. Skyl hjulbuer, karme og sprækker grundigt. Puds ruderne ude og inde.",
          "Voks holder kortere tid ved havet – regn med to til tre måneder. Forny den tre til fire gange om året. På en vokset bil ligger saltet oven på voksen og skylles let af.",
        ],
      },
      {
        heading: "Små ting, der hjælper",
        paragraphs: [
          "Parkér i garage eller carport, hvis du har en, og ellers i læ for vinden. Udbedr stenslag med det samme. Skyl bilen af med rent vand, hvis du har været helt nede ved stranden.",
          "Bor du langs Øresund, Køge Bugt eller Storebælt, kommer vi til dig. En fast aftale om udvendig vask er den enkleste måde at holde saltet nede på.",
        ],
      },
    ],
    faqs: [
      {
        question: "Ruster biler hurtigere ved kysten?",
        answer: "Ja, hvis de ikke vaskes regelmæssigt. Saltluft holder overfladerne fugtige og fremskynder rust, hvor lakken er brudt.",
      },
      {
        question: "Hvor ofte skal en bil ved havet vaskes?",
        answer: "Hver anden til tredje uge året rundt, og efter storm.",
      },
      {
        question: "Hvor langt ind i landet når saltluften?",
        answer: "Flere kilometer i kraftig pålandsvind. Tættest på vandet er belastningen størst.",
      },
      {
        question: "Hvorfor er mine ruder altid slørede?",
        answer: "Saltdis lægger en hinde på glasset. Den skal vaskes af med sæbe og pudses efter.",
      },
    ],
    relatedPosts: ["vejsalt-og-rust-paa-bilen", "hvor-laenge-holder-bilvoks"],
    relatedLinks: [
      { label: "Bilvask med voks", href: route("/bilvask-med-voks") },
      { label: "Bilvask Dragør", href: route("/bilvask-dragor") },
      { label: "Bilvask Nordsjælland", href: route("/bilvask-nordsjaelland") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "sand-i-bilen-efter-stranden",
    title: "Sand i bilen efter stranden: sådan får du det ud",
    metaTitle: "Sand i bilen – sådan får du det ud",
    description:
      "Sand sætter sig i tæpper, sømme og sædeskinner og slider på kabinen. Se hvordan du får det op, og hvordan du undgår at få halvdelen af stranden med hjem.",
    category: "Årstider",
    keywords: ["sand i bilen", "fjern sand fra bil", "støvsug sand biltæppe", "sand i bilsæde", "bil efter strandtur"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/service/inside.jpg", alt: "Støvsugning af sand fra bilens gulv og sæder" },
    intro: [
      "En dag på stranden slutter altid på samme måde: med sand i bilen. Det sidder på fødder, håndklæder, legetøj og hunden – og nu også i tæpperne.",
      "Sand er sværere at få op, end man skulle tro. Og det gør mere skade, end de fleste er klar over.",
    ],
    keyTakeaways: [
      "Sandkorn er hårde og sliber på tæppets fibre, når man træder på dem.",
      "Lad sandet tørre, før du støvsuger – vådt sand klistrer.",
      "Børst og bank tæppet, mens du støvsuger, så sandet løftes op.",
      "Gummimåtter og en omklædning ved bilen forebygger det meste.",
    ],
    sections: [
      {
        heading: "Hvorfor er sand et problem?",
        paragraphs: [
          "Sand er små stykker kvarts og sten. Hvert korn har skarpe kanter. I et tæppe arbejder de sig ned mod bunden, og hver gang en fod bevæger sig, sliber de på fibrene. Tæppet bliver tyndt og filtret der, hvor hælen hviler.",
          "Sandet finder også vej ned i sædeskinnerne. Blandet med smørefedt giver det en knasende lyd, når sædet flyttes, og slider på mekanikken.",
        ],
      },
      {
        heading: "Sådan får du det op",
        paragraphs: [
          "Lad kabinen tørre først. Tag måtterne ud, og bank dem mod en væg eller et gelænder. Støvsug dem derefter langsomt i flere retninger.",
          "I selve tæppet skal sandet løftes. Slå let på tæppet med flad hånd, eller brug en stiv børste i den ene hånd og støvsugeren i den anden. Børsten vipper kornene op, og mundstykket tager dem. Det tager tid – sæt et kvarter af til hvert fodrum.",
        ],
      },
      {
        heading: "De steder, man glemmer",
        paragraphs: [
          "Sprækken mellem sæde og ryglæn. Sømmene i sædet. Skinnerne under forsæderne – kør sædet helt frem og helt tilbage. Dørlommerne. Og bagagerummets hjørner og reservehjulsbrønden.",
          "Tør til sidst dørtrin og karme af. Sand, der ligger dér, bliver trukket ind igen ved næste tur.",
        ],
      },
      {
        heading: "Sådan undgår du det",
        paragraphs: [
          "Brug gummimåtter om sommeren. Hav en stor plastkasse eller en pose i bagagerummet til vådt og sandet udstyr. Børst fødder og sandaler af, før I sætter jer ind, og læg et gammelt lagen over bagsædet.",
          "Og har stranden vundet, kan en indvendig rengøring med grundig støvsugning få bilen tilbage til udgangspunktet.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvordan får man sand ud af biltæpper?",
        answer: "Lad det tørre, og støvsug langsomt, mens du børster eller banker tæppet, så kornene løftes op.",
      },
      {
        question: "Skader sand bilens tæpper?",
        answer: "Ja. Sandkorn sliber på fibrene og slider tæppet tyndt over tid.",
      },
      {
        question: "Hvorfor kommer der sand ved med at dukke op?",
        answer: "Fordi det sidder dybt i tæppet og i sprækker og arbejder sig op, når bilen bruges. Det kræver flere grundige omgange.",
      },
      {
        question: "Kan CleanWash fjerne sand fra bilen?",
        answer: "Ja. Grundig støvsugning af sæder, gulv, måtter og bagagerum er en fast del af den indvendige rengøring.",
      },
    ],
    relatedPosts: ["gummimaatter-eller-tekstilmaatter", "indvendig-bilrengoering-tjekliste"],
    relatedLinks: [
      { label: "Bilrengøring", href: route("/bilrengoering") },
      { label: "Bilvask efter ferien", href: route("/bilvask-efter-ferien") },
      { label: "Bilvask Solrød Strand", href: route("/bilvask-solroed-strand") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
];
