import type { Route } from "next";
import type { BlogPost } from "@/lib/blog-posts";

const route = (href: string) => href as Route;
const published = "2026-11-13";

// Guides om kabinen: ruder, flader, sæder og hygiejne.
export const kabineBlogPosts: BlogPost[] = [
  {
    slug: "dug-paa-ruderne-indvendigt",
    title: "Dug på ruderne indvendigt: årsager og løsninger",
    metaTitle: "Dug på ruderne indvendigt – sådan stopper du det",
    description:
      "Dugger bilens ruder indvendigt hver morgen? Årsagen er fugt i kabinen og fedtede ruder. Se hvad der virker – både her og nu og på længere sigt.",
    category: "Kabine",
    keywords: ["dug på ruder indvendigt", "ruder dugger bil", "fugt i bilen", "dug på forruden", "affugter bil"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/service/inside.jpg", alt: "Rengøring af bilens ruder indefra mod dug" },
    intro: [
      "Du sætter dig ind en kold morgen, og forruden er dækket af dug på indersiden. Blæseren kører på fuld kraft i fem minutter, før du kan se noget.",
      "Dug er ikke bare irriterende. Det er et tegn på, at der er for meget fugt i bilen. Og det kan man gøre noget ved.",
    ],
    keyTakeaways: [
      "Dug opstår, når fugtig kabineluft møder en kold rude.",
      "En fedtet rude dugger hurtigere end en ren.",
      "Våde måtter er den hyppigste fugtkilde.",
      "Aircondition affugter luften – brug den også om vinteren.",
    ],
    sections: [
      {
        heading: "Hvor kommer fugten fra?",
        paragraphs: [
          "Den kommer ind med dig. Sne og regn på sko og jakker, våde paraplyer, en fugtig hund. Vandet ender i måtter og tæpper, og når varmen tændes, fordamper det og sætter sig på det koldeste sted: ruderne.",
          "Kommer duggen meget voldsomt, eller er tæpperne våde uden grund, kan der være en utæthed – for eksempel et tilstoppet afløb under forruden eller en dårlig dørliste. Det skal et værksted se på.",
        ],
      },
      {
        heading: "Den fedtede hinde gør det værre",
        paragraphs: [
          "Plast og vinyl i kabinen afgiver dampe, der sætter sig som en fedtet film på indersiden af ruderne. Røg og fingeraftryk lægger mere til. Dug har lettere ved at sætte sig på en beskidt rude, og filmen gør den sværere at få væk.",
          "En grundig pudsning af ruderne indefra er derfor den hurtigste forbedring, du kan lave.",
        ],
      },
      {
        heading: "Hurtig hjælp, når ruden er dugget",
        paragraphs: [
          "Tænd for airconditionen sammen med varmen, og ret luften mod forruden. Anlægget tørrer luften, før den varmes op. Slå recirkulation fra, så der kommer frisk luft ind.",
          "Tør ikke duggen af med hånden. Det efterlader fedt, som giver mere dug næste gang.",
        ],
      },
      {
        heading: "Sådan slipper du af med problemet",
        paragraphs: [
          "Hold måtterne tørre. Tag dem ind og tør dem, eller skift til gummimåtter om vinteren, og tøm dem for vand. Få ruderne pudset indefra. Og tjek, hvornår kabinefilteret sidst blev skiftet – et tilstoppet filter giver dårlig luftgennemstrømning.",
          "En affugterpose på instrumentbrættet kan hjælpe i biler, der holder ude. En indvendig rengøring fjerner både fedtfilmen på ruderne og snavset i måtterne, som holder på fugten.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvorfor dugger ruderne indvendigt?",
        answer: "Fordi fugtig luft i kabinen fortættes på den kolde rude. Fugten kommer især fra våde sko, tøj og måtter.",
      },
      {
        question: "Hjælper det at pudse ruderne?",
        answer: "Ja. En ren rude dugger mindre og bliver hurtigere klar end en med fedtfilm.",
      },
      {
        question: "Skal airconditionen være tændt om vinteren?",
        answer: "Ja, gerne. Den affugter luften og fjerner dug meget hurtigere end varme alene.",
      },
      {
        question: "Hvornår er dug et tegn på en fejl?",
        answer: "Hvis tæpperne er våde, eller duggen er usædvanlig kraftig. Så kan der være en utæthed, som et værksted bør finde.",
      },
    ],
    relatedPosts: ["rene-bilruder-uden-striber", "gummimaatter-eller-tekstilmaatter"],
    relatedLinks: [
      { label: "Bilrengøring", href: route("/bilrengoering") },
      { label: "Aircondition rens", href: route("/aircondition-rens-bil") },
      { label: "Bilvask før vinter", href: route("/bilvask-foer-vinter") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "rene-bilruder-uden-striber",
    title: "Rene bilruder uden striber: sådan gør du",
    metaTitle: "Rene bilruder uden striber – sådan gør du",
    description:
      "Striber og slør på forruden skyldes forkert klud, for meget middel eller en fedtet inderside. Få metoden til helt klare ruder ude og inde.",
    category: "Kabine",
    keywords: ["rene bilruder", "pudse bilruder uden striber", "fedtet forrude", "rengøring af forrude indvendigt", "striber på bilrude"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/service/inside.jpg", alt: "Pudsning af bilens ruder indvendigt" },
    intro: [
      "Lav sol i øjnene og en forrude, der pludselig bliver hvid af slør. De fleste har prøvet det. Og de fleste har forsøgt at pudse sig ud af det – med striber som resultat.",
      "Klare ruder kræver ikke et særligt middel. De kræver den rigtige metode.",
    ],
    keyTakeaways: [
      "Brug to klude: én til at vaske og én tør til at pudse efter.",
      "Indersiden er som regel det største problem.",
      "Pudse lodret udvendigt og vandret indvendigt, så du kan se, hvor striben sidder.",
      "Rens viskerbladene, ellers smører de den rene rude til.",
    ],
    sections: [
      {
        heading: "Hvorfor kommer der striber?",
        paragraphs: [
          "Striber er rester: af rensemiddel, af snavs, der er flyttet rundt, eller af fedt fra en brugt klud. Bruger man for meget middel, eller pudser man i sol, tørrer det ind, før det er tørret af.",
          "En klud, der har været vasket med skyllemiddel, efterlader også en film. Brug rene mikrofiberklude uden skyllemiddel.",
        ],
      },
      {
        heading: "Indersiden først",
        paragraphs: [
          "Indersiden af forruden er dækket af en fedtet film fra kabinens plast. Den er svær at komme til, og derfor bliver den sjældent gjort ordentligt. Sæt dig på passagersædet, og arbejd med håndryggen mod ruden for at nå ned i hjørnerne.",
          "Fugt den første klud med glasrens, og vask ruden. Tør straks efter med den tørre klud. Er ruden meget fedtet, så gør det to gange. Sprøjt på kluden, ikke på ruden, så du ikke rammer instrumentbrættet.",
        ],
      },
      {
        heading: "Tricket med retningen",
        paragraphs: [
          "Pudse med vandrette strøg indvendigt og lodrette strøg udvendigt. Ser du en stribe bagefter, afslører retningen, hvilken side den sidder på.",
          "Rul sideruderne et par centimeter ned, og tag den øverste kant, som ellers gemmer sig i listen.",
        ],
      },
      {
        heading: "Glem ikke viskerne",
        paragraphs: [
          "Viskerbladene samler vejfilm og voksrester. Tør gummikanten af med en fugtig klud, til kluden ikke længere bliver sort. Ellers trækker de en fedtet bue hen over den nypudsede rude ved første regnbyge.",
          "Har ruderne tonet film på indersiden, så brug et glasrens uden ammoniak. Ammoniak kan skade filmen.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvorfor bliver min forrude stribet, når jeg pudser den?",
        answer: "Typisk på grund af for meget middel, en uren klud eller fordi midlet tørrer ind, før det er tørret af.",
      },
      {
        question: "Hvad er den fedtede hinde på indersiden af forruden?",
        answer: "Dampe fra kabinens plast og vinyl, der sætter sig på glasset. Den skal vaskes af med glasrens.",
      },
      {
        question: "Kan man bruge almindeligt vinduesrens i bilen?",
        answer: "Ja, på almindeligt glas. Har bilen tonet film, skal midlet være uden ammoniak.",
      },
      {
        question: "Pudser CleanWash ruderne indvendigt?",
        answer: "Ja, ved indvendig rengøring og i pakken Hele bilen pudses alle ruder indefra.",
      },
    ],
    relatedPosts: ["dug-paa-ruderne-indvendigt", "mikrofiberklude-til-bilen"],
    relatedLinks: [
      { label: "Bilrengøring", href: route("/bilrengoering") },
      { label: "Komplet bilvask", href: route("/komplet-bilvask") },
      { label: "Bilvask Korsør", href: route("/bilvask-korsoer") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "rengoering-af-skaerm-og-pianolak",
    title: "Rengøring af bilens skærm og blanke flader uden ridser",
    metaTitle: "Rengør bilens skærm og pianolak uden ridser",
    description:
      "Touchskærme og blank, sort plast ridser utroligt let. Se hvordan du fjerner fingeraftryk og støv uden at efterlade mærker.",
    category: "Kabine",
    keywords: ["rengøring af bilskærm", "pianolak bil ridser", "blank sort plast bil", "touchskærm bil rengøring", "fingeraftryk skærm bil"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/home/vinyl.jpg", alt: "Forsigtig aftørring af instrumentbræt og blanke flader" },
    intro: [
      "Nye biler er fulde af skærme og blankt, sort plast – ofte kaldet pianolak. Det ser eksklusivt ud i udstillingen. En uge senere er det dækket af fingeraftryk og støv.",
      "Og så sker fejlen: man tørrer det af med ærmet eller et stykke køkkenrulle. Det er sådan, de fine ridser opstår.",
    ],
    keyTakeaways: [
      "Blank plast er blød og ridser af støv, papir og grove klude.",
      "Brug altid en ren, blød mikrofiberklud – og intet tryk.",
      "Sluk skærmen først, så du kan se snavset.",
      "Undgå glasrens med ammoniak eller alkohol på skærme.",
    ],
    sections: [
      {
        heading: "Hvorfor ridser det så let?",
        paragraphs: [
          "Pianolak er ikke lak, men blank plast. Overfladen er væsentligt blødere end glas og billak. Støv indeholder små, hårde korn, og når de trækkes hen over fladen, efterlader de hårfine ridser.",
          "Ridserne ses som et gråt slør, når lyset falder skråt ind. De kan ikke vaskes væk.",
        ],
      },
      {
        heading: "Sådan rengør du blank plast",
        paragraphs: [
          "Fjern først det løse støv. Blæs det væk, eller dup med en ren, langhåret mikrofiberklud. Træk ikke en tør klud hen over en støvet flade.",
          "Fugt derefter kluden let med vand eller et mildt interiørrens, og tør fladen af i lige strøg uden tryk. Tør efter med en tør del af kluden. Vend kluden ofte.",
        ],
      },
      {
        heading: "Sådan rengør du skærmen",
        paragraphs: [
          "Sluk skærmen, eller brug bilens rengøringstilstand, hvis den har en. På en sort skærm kan du se fingeraftrykkene, og du kommer ikke til at trykke på noget.",
          "Tør af med en tør mikrofiberklud. Er det ikke nok, så fugt kluden ganske let med vand. Mange skærme har en belægning mod genskin og fingeraftryk, som stærke midler kan opløse. Hold derfor glasrens, sprit og universalrens væk, medmindre bilens instruktionsbog tillader det.",
        ],
      },
      {
        heading: "En klud i handskerummet",
        paragraphs: [
          "Det enkleste råd er at have en ren mikrofiberklud liggende i bilen – i en pose, så den ikke samler støv. Så griber du ikke efter ærmet.",
          "Ved en indvendig rengøring tørres skærme og blanke flader af for sig med rene, bløde klude.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvordan rengør man en touchskærm i bilen?",
        answer: "Sluk den, og tør af med en ren, tør mikrofiberklud. Fugt kluden let med vand, hvis det er nødvendigt.",
      },
      {
        question: "Kan ridser i pianolak fjernes?",
        answer: "Fine ridser kan ofte poleres ned med et plastpolermiddel. Det bedste er at undgå dem.",
      },
      {
        question: "Må man bruge vådservietter på skærmen?",
        answer: "Helst ikke. Mange indeholder alkohol eller rengøringsmidler, der kan skade skærmens belægning.",
      },
      {
        question: "Hvorfor skal man ikke bruge køkkenrulle?",
        answer: "Papirfibre er grove og ridser blank plast og skærme. Brug mikrofiber.",
      },
    ],
    relatedPosts: ["mikrofiberklude-til-bilen", "blankt-og-fedtet-rat"],
    relatedLinks: [
      { label: "Vinylpleje", href: route("/vinylpleje-bil") },
      { label: "Bilrengøring", href: route("/bilrengoering") },
      { label: "Bilvask af Tesla", href: route("/bilvask-tesla") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "rens-af-alcantara",
    title: "Rens af alcantara i bilen: rat, sæder og dørsider",
    metaTitle: "Rens af alcantara i bilen – sådan gør du",
    description:
      "Alcantara bliver blankt og fladt af hudfedt. Se hvordan du renser alcantara på rat og sæder, og hvad du aldrig må bruge.",
    category: "Kabine",
    keywords: ["rens af alcantara", "alcantara rat rengøring", "alcantara sæder pleje", "blankt alcantara", "ruskind bil rengøring"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/home/vaskseat.jpg", alt: "Skånsom rens af bilsæde med blød børste" },
    intro: [
      "Alcantara sidder i mange sportslige biler: på rat, gearstang, sæder og dørsider. Det ligner ruskind, giver godt greb og føles eksklusivt.",
      "Efter et par år er det ofte fladt, blankt og lidt klistret. Det er ikke slidt. Det er beskidt.",
    ],
    keyTakeaways: [
      "Alcantara er et syntetisk mikrofiberstof, ikke læder.",
      "Det bliver blankt, når fibrene klistrer sammen af hudfedt.",
      "Rens med let fugtig klud og blød børste – aldrig gennemblødt.",
      "Brug ikke læderpleje, silikone eller stærke rengøringsmidler.",
    ],
    sections: [
      {
        heading: "Hvad er alcantara?",
        paragraphs: [
          "Alcantara er et varemærke for et stof lavet af meget fine syntetiske fibre. Overfladen består af tusindvis af små, opretstående fibre – en luv – som giver det bløde, matte udseende.",
          "Når hudfedt, sved og håndcreme sætter sig i luven, klistrer fibrene sammen og lægger sig ned. Så bliver stoffet glat og blankt, især på rattet.",
        ],
      },
      {
        heading: "Sådan renser du det",
        paragraphs: [
          "Støvsug først med et blødt mundstykke. Fugt derefter en ren mikrofiberklud med vand eller et rensemiddel til alcantara, og vrid den hårdt op. Tør stoffet af uden at gnide hårdt.",
          "Brug en blød børste til at arbejde midlet ned og løfte luven. Arbejd i flere retninger. Tør efter med en ren, tør klud, og lad det lufttørre. Børst luven let op igen, når det er tørt.",
        ],
      },
      {
        heading: "Det må du ikke",
        paragraphs: [
          "Gennemblød aldrig stoffet. Vand kan trække ind i underlaget og give skjolder. Brug ikke læderrens eller læderbalsam – det fedter fibrene til. Og brug ikke damp tæt på eller hårde børster, som kan give fnuller.",
          "Opløsningsmidler og universalrens kan affarve stoffet. Prøv altid et skjult sted først.",
        ],
      },
      {
        heading: "Rattet kræver mest",
        paragraphs: [
          "Et alcantara-rat er i kontakt med hænderne hele tiden. Det har godt af en let aftørring hver måned og en grundig rens et par gange om året. Venter du, til det er helt blankt, er det sværere at få tilbage.",
          "Får du bilen rengjort hos os, så skriv i bookingen, at den har alcantara. Så bliver det renset særskilt og forsigtigt.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvorfor bliver alcantara blankt?",
        answer: "Fordi hudfedt og snavs får de fine fibre til at klistre sammen og lægge sig ned.",
      },
      {
        question: "Kan blankt alcantara reddes?",
        answer: "Som regel ja. En forsigtig rens og børstning rejser luven igen.",
      },
      {
        question: "Må man bruge læderpleje på alcantara?",
        answer: "Nej. Alcantara er ikke læder, og læderprodukter fedter fibrene til.",
      },
      {
        question: "Kan alcantara tåle vand?",
        answer: "Let fugt ja. Det må ikke gennemblødes, da det kan give skjolder og skade underlaget.",
      },
    ],
    relatedPosts: ["blankt-og-fedtet-rat", "pleje-af-laedersaeder-i-bilen"],
    relatedLinks: [
      { label: "Bilrengøring", href: route("/bilrengoering") },
      { label: "Sæderens", href: route("/saederens-bil") },
      { label: "Bilvask af Audi", href: route("/bilvask-audi") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "blankt-og-fedtet-rat",
    title: "Blankt og fedtet rat: sådan får du det mat igen",
    metaTitle: "Blankt rat i bilen – sådan renses det",
    description:
      "Et blankt rat er ikke slidt, men beskidt. Se hvordan du renser et læderrat sikkert, og hvorfor du aldrig skal bruge plejemidler, der gør det glat.",
    category: "Kabine",
    keywords: ["blankt rat", "fedtet rat bil", "rengøring af læderrat", "rens af rat", "rat klistrer"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 3,
    coverImage: { src: "/home/cigarret.jpg", alt: "Hånd på bilens rat – den flade, der bliver blank af brug" },
    intro: [
      "Se på dit rat. Er det blankt øverst og i siderne, hvor hænderne ligger, og mat nederst? Så er det ikke slid, du ser. Det er et lag hudfedt.",
      "Rattet er den flade i bilen, der bliver rørt mest, og den, der bliver rengjort mindst.",
    ],
    keyTakeaways: [
      "Nyt læder er mat. Blankt læder er dækket af fedt og snavs.",
      "Rens med et mildt middel, en blød børste og en mikrofiberklud.",
      "Brug aldrig silikone eller glansmidler på rattet – det bliver glat.",
      "En aftørring en gang om måneden holder det pænt.",
    ],
    sections: [
      {
        heading: "Hvad består laget af?",
        paragraphs: [
          "Hudfedt, sved, håndcreme, håndsprit, madrester og støv. Det gnides ind i læderets narv hver dag og bygger sig op til en glat, blank belægning.",
          "Belægningen er let sur og nedbryder med tiden læderets beskyttende overflade. Så begynder rattet at slide for alvor, og farven kan gå af.",
        ],
      },
      {
        heading: "Sådan renser du et læderrat",
        paragraphs: [
          "Sprøjt et mildt læder- eller interiørrens på en blød børste eller en klud – ikke direkte på rattet, hvor det kan løbe ned i knapper og kontakter. Arbejd dig rundt i små felter med lette, cirklende bevægelser.",
          "Tør straks af med en ren mikrofiberklud. Du vil se kluden blive grå eller brun. Gentag, til den ikke tager mere farve. Rattet skal ende mat og tørt at røre ved.",
        ],
      },
      {
        heading: "Ingen glansmidler",
        paragraphs: [
          "Cockpitspray og silikoneholdige plejemidler gør rattet glat. Det er et sikkerhedsproblem. Et rat skal give greb, også med fugtige hænder. Det samme gælder gearknop og pedaler.",
          "Vil du pleje læderet, så brug en læderpleje, der trækker ind og efterlader en mat overflade – og kun et tyndt lag.",
        ],
      },
      {
        heading: "Rat i kunstlæder, plast og alcantara",
        paragraphs: [
          "Kunstlæder og plast renses på samme måde, men har ikke brug for pleje bagefter. Alcantara er noget helt andet og kræver en mere forsigtig metode med meget lidt væske.",
          "Ved en indvendig rengøring hos CleanWash rengøres rat, gearvælger og øvrige kontaktflader som en fast del af opgaven.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvorfor er mit rat blevet blankt?",
        answer: "På grund af hudfedt og snavs, der er gnedet ind i overfladen. Det kan renses af.",
      },
      {
        question: "Kan et blankt læderrat blive mat igen?",
        answer: "Ja, i de fleste tilfælde. Er overfladen slidt igennem, kan farven dog ikke vaskes tilbage.",
      },
      {
        question: "Må man bruge håndsprit til at rense rattet?",
        answer: "Det frarådes til regelmæssig brug. Alkohol udtørrer læder og kan trække farven af.",
      },
      {
        question: "Hvor ofte skal rattet rengøres?",
        answer: "En let aftørring månedligt og en grundig rens et par gange om året.",
      },
    ],
    relatedPosts: ["rens-af-alcantara", "hygiejne-i-bilens-kabine"],
    relatedLinks: [
      { label: "Læderpleje", href: route("/laederpleje-bil") },
      { label: "Bilrengøring", href: route("/bilrengoering") },
      { label: "Bilvask af skolevogn", href: route("/bilvask-koereskole") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "rengoering-af-sikkerhedsseler",
    title: "Rengøring af sikkerhedsseler: sådan gør du det sikkert",
    metaTitle: "Rengøring af sikkerhedsseler i bilen",
    description:
      "Beskidte seler ruller langsomt ind og smitter af på tøjet. Se hvordan du rengør dem uden at svække stoffet – og hvad du aldrig må bruge.",
    category: "Kabine",
    keywords: ["rengøring af sikkerhedsseler", "vask af sele bil", "sele ruller langsomt ind", "beskidt sikkerhedssele", "pletter på sele"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 3,
    coverImage: { src: "/home/kids.jpg", alt: "Sikkerhedssele og autostol på bagsædet" },
    intro: [
      "Sikkerhedsselen ligger mod hals og tøj hver dag. Den samler hudfedt, makeup, kaffe og snavs fra hænderne. Alligevel bliver den næsten aldrig rengjort.",
      "En beskidt sele er stiv, grå og ruller dovent ind. Den er let at rengøre, men den er sikkerhedsudstyr, så det skal gøres rigtigt.",
    ],
    keyTakeaways: [
      "Brug kun mildt sæbevand eller et mildt tekstilrens.",
      "Aldrig blegemiddel, opløsningsmidler eller stærke kemikalier – de svækker fibrene.",
      "Selen skal være helt tør, før den ruller ind.",
      "Flossede, skårne eller stive seler skal udskiftes, ikke rengøres.",
    ],
    sections: [
      {
        heading: "Træk selen helt ud",
        paragraphs: [
          "Træk selen ud i fuld længde, og sæt en klemme på ved rullen, så den ikke kører ind igen. Det snavsede stykke er det, der ligger mod kroppen, men hele selen har godt af en tur.",
        ],
      },
      {
        heading: "Vask med mildt sæbevand",
        paragraphs: [
          "Bland lunkent vand med lidt mild sæbe eller et tekstilrens til bilinteriør. Fugt en mikrofiberklud eller en blød børste, og arbejd dig ned ad selen i dens længderetning. Gnid ikke på tværs – det kan få fibrene til at rejse sig.",
          "Tør efter med en ren, fugtig klud for at fjerne sæberester og derefter med en tør. Gentag ved pletter.",
        ],
      },
      {
        heading: "Lad den tørre helt",
        paragraphs: [
          "Det vigtigste trin. En fugtig sele, der ruller ind i mekanismen, kan give mug og dårlig lugt, og den kan sætte sig fast. Lad selen hænge udtrukket, til den er helt tør. Det tager nogle timer – gerne med åbne døre eller vinduer.",
        ],
      },
      {
        heading: "Det må du aldrig",
        paragraphs: [
          "Brug ikke klor, pletfjerner med blegemiddel, affedter eller opløsningsmidler. De kan nedbryde selens fibre, uden at det kan ses. Brug heller ikke højtryk eller meget varmt vand.",
          "Ruller selen stadig langsomt ind efter rengøring, er det ofte snavs i styret øverst ved stolpen. Er selen flosset, har hak eller har været i brug under et uheld, skal den skiftes på et værksted.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvordan rengør man en sikkerhedssele?",
        answer: "Træk den helt ud, vask den med mildt sæbevand og en blød klud, og lad den tørre helt, før den ruller ind.",
      },
      {
        question: "Hvorfor ruller min sele langsomt ind?",
        answer: "Ofte på grund af snavs på selen og i styret. En rengøring hjælper i mange tilfælde.",
      },
      {
        question: "Må man bruge pletfjerner på seler?",
        answer: "Ikke midler med blegemiddel eller opløsningsmidler. De kan svække stoffet.",
      },
      {
        question: "Hvor længe skal selen tørre?",
        answer: "Til den er helt tør – typisk nogle timer. Den må ikke rulle fugtig ind.",
      },
    ],
    relatedPosts: ["hygiejne-i-bilens-kabine", "pletguide-til-bilsaeder"],
    relatedLinks: [
      { label: "Bilrengøring", href: route("/bilrengoering") },
      { label: "Rens af autostol", href: route("/rens-af-autostol") },
      { label: "Bilvask af familiebil", href: route("/bilvask-familiebil") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "gummimaatter-eller-tekstilmaatter",
    title: "Gummimåtter eller tekstilmåtter – og hvordan holder man dem rene?",
    metaTitle: "Gummimåtter eller tekstilmåtter i bilen?",
    description:
      "Gummimåtter fanger vand og sand, tekstilmåtter ser pænere ud. Se fordele og ulemper, og hvordan begge typer rengøres rigtigt.",
    category: "Kabine",
    keywords: ["gummimåtter bil", "tekstilmåtter bil", "rengøring af bilmåtter", "bilmåtter vinter", "vask af gummimåtter"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/home/extra.jpg", alt: "Beskidt gulv og måtter i bil før rengøring" },
    intro: [
      "Måtterne er bilens første forsvar. Alt, hvad du har under skoene, ender på dem: vand, sne, salt, sand og jord. Det, de ikke fanger, går i tæppet nedenunder.",
      "Valget mellem gummi og tekstil handler mindre om smag og mere om årstid.",
    ],
    keyTakeaways: [
      "Gummimåtter er bedst om vinteren og til strand, hund og børn.",
      "Tekstilmåtter ser pænere ud, men holder på fugt og sand.",
      "Måtter skal være helt tørre, før de lægges i igen.",
      "Måtten i førersiden skal altid sidde fast i sine beslag.",
    ],
    sections: [
      {
        heading: "Gummimåtter: praktiske og nemme",
        paragraphs: [
          "En gummimåtte med høje kanter er en lille bakke. Smeltevand og sjap bliver liggende i måtten og kan hældes ud. Sand og jord kan bankes af på ti sekunder.",
          "Ulempen er udseendet, og at de kan blive glatte, når de er våde. Vælg måtter, der er formstøbt til bilen. Universalmåtter passer sjældent og kan glide.",
        ],
      },
      {
        heading: "Tekstilmåtter: pæne, men krævende",
        paragraphs: [
          "Tekstilmåtter dæmper støj og ser bedst ud. Men de suger vand. En våd tekstilmåtte er dage om at tørre i en lukket bil og er den mest almindelige årsag til duggede ruder og indelukket lugt.",
          "Sand sætter sig dybt i luven og slider på fibrene. De bliver tynde ved hælen længe før resten af måtten.",
        ],
      },
      {
        heading: "Sådan rengøres de",
        paragraphs: [
          "Gummimåtter tages ud, skylles og børstes med sæbevand, skylles igen og tørres. Brug ikke plejemidler, der gør dem blanke – de bliver glatte under fødderne.",
          "Tekstilmåtter bankes, støvsuges grundigt i begge retninger og renses med tekstilrens, hvis de er plettede. Lad dem tørre helt uden for bilen. Læg aldrig en fugtig måtte tilbage.",
        ],
      },
      {
        heading: "Den bedste løsning: begge dele",
        paragraphs: [
          "Mange skifter efter sæson: gummi fra oktober til april og tekstil om sommeren. Læg aldrig én måtte oven på en anden i førersiden. Den øverste kan skride frem og komme i klemme under pedalerne.",
          "Ved en indvendig rengøring tager vi måtterne ud og rengør dem for sig, uanset type.",
        ],
      },
    ],
    faqs: [
      {
        question: "Er gummimåtter bedre end tekstilmåtter?",
        answer: "Om vinteren og i biler med børn, hund eller strandture ja. Tekstil er pænere, men holder på fugt.",
      },
      {
        question: "Hvordan rengør man gummimåtter?",
        answer: "Skyl dem, børst med sæbevand, skyl igen, og lad dem tørre, før de lægges i bilen.",
      },
      {
        question: "Må man lægge gummimåtter oven på tekstilmåtter?",
        answer: "Nej, ikke i førersiden. Måtten kan glide og blokere pedalerne.",
      },
      {
        question: "Hvorfor lugter bilen, når måtterne er våde?",
        answer: "Fordi fugten ikke kan komme væk i en lukket kabine. Det giver grobund for mug og dårlig lugt.",
      },
    ],
    relatedPosts: ["dug-paa-ruderne-indvendigt", "sand-i-bilen-efter-stranden"],
    relatedLinks: [
      { label: "Bilrengøring", href: route("/bilrengoering") },
      { label: "Bilvask før vinter", href: route("/bilvask-foer-vinter") },
      { label: "Bilvask Solrød Strand", href: route("/bilvask-solroed-strand") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "hygiejne-i-bilens-kabine",
    title: "Hygiejne i bilen: de flader, du rører mest",
    metaTitle: "Hygiejne i bilen – de mest berørte flader",
    description:
      "Rat, gearvælger, dørhåndtag og skærm bliver rørt hundredvis af gange om ugen. Se hvilke flader der bør rengøres oftest, og hvordan du gør det skånsomt.",
    category: "Kabine",
    keywords: ["hygiejne i bilen", "bakterier i bilen", "rengøring kontaktflader bil", "desinficere bil", "rent rat"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/home/emptycar.jpg", alt: "Rod og brugte kopper i bilens midterkonsol" },
    intro: [
      "Vi vasker hænder, når vi kommer hjem. Men mellem butikken og hoveddøren har vi rørt ved rattet, gearvælgeren, dørhåndtaget og skærmen – med de samme hænder som indkøbsvognen.",
      "Bilen er et lille, lukket rum, hvor de samme flader bliver rørt igen og igen. De har godt af en regelmæssig aftørring.",
    ],
    keyTakeaways: [
      "Rat, gearvælger og dørhåndtag er de mest berørte flader.",
      "Almindelig rengøring med et mildt middel fjerner det meste.",
      "Sprit og stærke midler kan skade læder, skærme og plast.",
      "Delte biler bør rengøres oftere end private.",
    ],
    sections: [
      {
        heading: "De flader, hænderne rører mest",
        paragraphs: [
          "Tænk på en helt almindelig køretur. Det er de her flader, hænderne lander på: rattet, blinklys- og viskerarm, gearvælger, håndbremse, startknap, skærm og volumenknap, dørhåndtag inde og ude, selespændet og kanten på bagklappen. Dertil kommer kopholderne, som samler spild og krummer.",
          "I en bil med børn kan du lægge ryglænene på forsæderne, dørlommerne og vinduesknapperne bagi til listen.",
        ],
      },
      {
        heading: "Rengøring er nok i de fleste tilfælde",
        paragraphs: [
          "At tørre en flade af med et mildt interiørrens og en ren mikrofiberklud fjerner snavs, fedt og langt de fleste mikroorganismer sammen med det. Det er den mekaniske aftørring, der gør arbejdet.",
          "Skift til en ren side af kluden undervejs, så du ikke flytter snavset fra dørhåndtaget til rattet.",
        ],
      },
      {
        heading: "Pas på med sprit",
        paragraphs: [
          "Håndsprit og desinfektionsservietter er effektive, men hårde ved bilens materialer. Alkohol udtørrer læder og kan trække farven af. Det kan gøre blank plast mat og opløse belægningen på skærme.",
          "Vil du desinficere, så brug et middel, der er godkendt til bilinteriør, og hold det til hårde flader som dørhåndtag og selespænder. Læder og skærme rengøres med milde midler.",
        ],
      },
      {
        heading: "Hvor ofte?",
        paragraphs: [
          "I en privat bil er en aftørring af kontaktfladerne hver anden uge fint, og oftere i influenzasæsonen. I biler, der deles af mange – firmabiler, delebiler, taxaer og hjemmeplejens biler – bør det ske langt hyppigere.",
          "Ved en indvendig rengøring hos CleanWash tørres alle hårde flader og kontaktpunkter af som en fast del af arbejdet.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvilke flader i bilen er mest beskidte?",
        answer: "Rat, gearvælger, dørhåndtag, selespænder, skærm og kopholdere – de steder, hænderne rører oftest.",
      },
      {
        question: "Skal man spritte bilen af?",
        answer: "Almindelig rengøring er nok i de fleste tilfælde. Sprit kan skade læder, plast og skærme.",
      },
      {
        question: "Hvor ofte skal kontaktflader rengøres?",
        answer: "Cirka hver anden uge i en privat bil og oftere i biler, der deles af mange.",
      },
      {
        question: "Fjerner en indvendig rengøring bakterier?",
        answer: "Aftørring med rengøringsmiddel fjerner snavs og hovedparten af mikroorganismerne fra fladerne.",
      },
    ],
    relatedPosts: ["blankt-og-fedtet-rat", "rengoering-af-skaerm-og-pianolak"],
    relatedLinks: [
      { label: "Bilrengøring", href: route("/bilrengoering") },
      { label: "Bilvask af hjemmeplejens biler", href: route("/bilvask-hjemmepleje") },
      { label: "Bilvask til biludlejning", href: route("/bilvask-biludlejning") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "indvendig-bilrengoering-tjekliste",
    title: "Tjekliste: indvendig rengøring af bilen trin for trin",
    metaTitle: "Indvendig bilrengøring – tjekliste trin for trin",
    description:
      "Gør bilen ren indvendigt i den rigtige rækkefølge. En komplet tjekliste med ni trin – fra tømning til ruder – og de fejl, de fleste begår.",
    category: "Kabine",
    keywords: ["indvendig bilrengøring tjekliste", "rengøring af bil indvendigt", "sådan gør du bilen ren", "støvsugning af bil", "kabinerengøring trin for trin"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 5,
    coverImage: { src: "/service/inside.jpg", alt: "Indvendig rengøring af bil trin for trin" },
    intro: [
      "At gøre en bil ren indvendigt er ikke svært. Men gør man det i forkert rækkefølge, gør man det to gange. Støv fra instrumentbrættet lander på det nystøvsugede gulv, og ruderne bliver fedtede af plejemiddel.",
      "Her er den rækkefølge, professionelle følger.",
    ],
    keyTakeaways: [
      "Arbejd oppefra og ned og fra tørt til vådt.",
      "Måtterne skal ud først og ind sidst.",
      "Ruderne pudses til allersidst.",
      "Sæt en til to timer af, hvis det skal gøres ordentligt.",
    ],
    sections: [
      {
        heading: "Trin 1–3: gør klar",
        paragraphs: [
          "Tøm bilen helt. Affald, mønter, ladekabler og alt i dørlommer, handskerum og bagagerum. Du kan ikke rengøre omkring ting.",
          "Tag måtterne ud, bank dem, og læg dem til side. Kør derefter forsæderne helt frem, og senere helt tilbage, så du kan komme til under dem. Det er dér, det meste ligger.",
        ],
      },
      {
        heading: "Trin 4–5: støv og støvsugning",
        paragraphs: [
          "Start øverst. Børst støv ud af ventilationsdyser, sprækker og knapper med en blød pensel, mens støvsugeren holdes tæt på. Støvet skal suges væk, ikke flyttes.",
          "Støvsug derefter sæderne – husk sprækken mellem sæde og ryglæn – og til sidst gulvet og bagagerummet. Arbejd langsomt, og gå hen over samme sted flere gange. Sand i tæpper kommer ikke op på første træk.",
        ],
      },
      {
        heading: "Trin 6–7: flader og sæder",
        paragraphs: [
          "Tør instrumentbræt, midterkonsol, dørpaneler, rat og gearvælger af med et mildt interiørrens på en mikrofiberklud. Sprøjt på kluden, ikke på fladen. Skærme og blank plast tager du for sig med en ren, blød klud.",
          "Behandl nu pletter på sæder og tæpper. Dup, lad midlet virke, og dup igen. Læder renses og plejes til sidst.",
        ],
      },
      {
        heading: "Trin 8–9: måtter og ruder",
        paragraphs: [
          "Rengør måtterne uden for bilen, og lad dem tørre helt, inden de lægges tilbage. Tjek, at førermåtten sidder i sine beslag.",
          "Slut med ruderne indefra. De har fået stænk og dampe fra alt det andet, og derfor skal de være sidst. Brug to klude: én til at vaske, én til at pudse efter.",
        ],
      },
      {
        heading: "Fejlene, de fleste begår",
        paragraphs: [
          "At støvsuge, før der er støvet af. At bruge for meget væske på sæder, så de er dage om at tørre. At lægge våde måtter tilbage. Og at bruge et glansmiddel på rat og pedaler.",
          "Har du ikke en eftermiddag til overs, kan du lade os tage den. En indvendig rengøring hos CleanWash følger de samme trin og tager cirka 75 minutter på din adresse.",
        ],
      },
    ],
    faqs: [
      {
        question: "I hvilken rækkefølge skal man gøre bilen ren indvendigt?",
        answer: "Tøm bilen, tag måtter ud, støv af, støvsug, tør flader af, behandl sæder, rengør måtter og puds ruderne til sidst.",
      },
      {
        question: "Hvor lang tid tager det at gøre en bil ren indvendigt?",
        answer: "En til to timer for en privatperson. En professionel indvendig rengøring tager cirka 75 minutter.",
      },
      {
        question: "Hvorfor skal ruderne pudses til sidst?",
        answer: "Fordi de får stænk og dampe fra rengøringen af resten af kabinen.",
      },
      {
        question: "Hvor ofte skal bilen rengøres indvendigt?",
        answer: "Fire til seks gange om året for en almindelig hverdagsbil, oftere med børn eller hund.",
      },
    ],
    relatedPosts: ["rene-bilruder-uden-striber", "pletguide-til-bilsaeder"],
    relatedLinks: [
      { label: "Bilrengøring", href: route("/bilrengoering") },
      { label: "Indvendig bilrengøring – pris", href: route("/indvendig-bilrengoering-pris") },
      { label: "Bilvask hjemme", href: route("/bilvask-hjemme") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
];
