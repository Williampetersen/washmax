import type { Route } from "next";
import type { BlogPost } from "@/lib/blog-posts";

const route = (href: string) => href as Route;
const published = "2026-11-13";

// Guides om pletter, lugt og indeklima i bilen.
export const pletterLugtBlogPosts: BlogPost[] = [
  {
    slug: "pletguide-til-bilsaeder",
    title: "Pletguide til bilsæder: kaffe, chokolade, fedt og kuglepen",
    metaTitle: "Pletguide til bilsæder – fjern pletter rigtigt",
    description:
      "Forskellige pletter kræver forskellig behandling. Få en enkel guide til kaffe, sodavand, chokolade, fedt, blod og kuglepen på bilsæder.",
    category: "Pletter og lugt",
    keywords: ["pletter på bilsæde", "fjern kaffeplet bilsæde", "pletfjernelse bil", "chokolade plet bilsæde", "kuglepen på bilsæde"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 5,
    coverImage: { src: "/home/seat.jpg", alt: "Bilsæde i stof med pletter" },
    intro: [
      "En plet på bilsædet er ikke bare en plet. Kaffe opfører sig anderledes end chokolade, og kuglepen er noget helt tredje. Bruger du den forkerte metode, kan du gøre pletten permanent.",
      "Her er de mest almindelige pletter på stofsæder – og hvad der virker på hver.",
    ],
    keyTakeaways: [
      "Dup altid – gnid aldrig. Arbejd udefra og ind mod midten.",
      "Koldt vand til æg, mælk og blod. Varme får proteiner til at sætte sig.",
      "Fedtpletter kræver et middel, der opløser fedt.",
      "Jo hurtigere du reagerer, jo større er chancen for, at pletten forsvinder helt.",
    ],
    sections: [
      {
        heading: "Grundreglerne",
        paragraphs: [
          "Fjern først alt fast med en ske eller et stykke pap. Dup derefter væsken op med en ren, hvid klud eller køkkenrulle. Tryk, og lad kluden suge. Gnider du, bliver pletten større og går dybere.",
          "Brug så lidt væske som muligt. Et bilsæde er skum under stoffet. Gennembløder du det, flytter du pletten ned, hvor den ikke kan nås, og får skjolder, når det tørrer. Prøv altid et rensemiddel på et skjult sted først.",
        ],
      },
      {
        heading: "Kaffe, te, sodavand og juice",
        paragraphs: [
          "Det er vandbaserede pletter med farvestof og ofte sukker. Dup op, og behandl med lunkent vand tilsat lidt mild sæbe eller et tekstilrens til bilinteriør. Dup, skift til en ren klud, og gentag.",
          "Kaffe med mælk er også en proteinplet. Brug koldt vand først. Sukkeret i sodavand og juice gør stoffet stift og klistret, hvis det ikke kommer helt op, så skyl efter med rent vand på en klud.",
        ],
      },
      {
        heading: "Chokolade, is, mad og fedt",
        paragraphs: [
          "Lad chokolade stivne, og skrab det af, før du gør noget andet. Varm, blød chokolade bliver bare smurt ud. Resten er en fedtplet.",
          "Fedt opløses ikke af vand alene. Brug et tekstilrens med fedtopløsende virkning, og lad det virke et par minutter, før du dupper. Friske fedtpletter kan drysses med kartoffelmel, som suger fedtet og støvsuges op efter en halv time.",
        ],
      },
      {
        heading: "Blod, kuglepen og farve fra tøj",
        paragraphs: [
          "Blod skal altid have koldt vand. Varmt vand får det til at binde sig til fibrene. Dup med koldt vand og lidt sæbe.",
          "Kuglepen og tusch er farvestoffer. Lidt isopropylalkohol på en vatpind, duppet meget forsigtigt, kan løsne det – men det kan også få farven til at løbe. Stop, hvis pletten breder sig. Blå afsmitning fra cowboybukser på lyse sæder er svær og kræver ofte en professionel rens.",
        ],
      },
      {
        heading: "Når pletten ikke vil gå af",
        paragraphs: [
          "Giver det ikke resultat efter et par forsøg, så stop. Bliver du ved, slider du på stoffet og risikerer en lys ring. Gamle og dybe pletter kræver udstyr, der kan skylle stoffet igennem og suge snavset op igen.",
          "Hos CleanWash kan du vælge pletfjernelse til enkelte pletter eller sæderens, hvis hele sædet trænger.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvordan fjerner man en kaffeplet fra et bilsæde?",
        answer: "Dup væsken op, behandl med lunkent sæbevand eller tekstilrens, og dup igen med en ren klud. Gnid ikke.",
      },
      {
        question: "Hvorfor skal man bruge koldt vand på blod og mælk?",
        answer: "Fordi varme får proteinerne til at stivne og binde sig til stoffets fibre.",
      },
      {
        question: "Kan kuglepen fjernes fra et bilsæde?",
        answer: "Nogle gange, med isopropylalkohol brugt meget forsigtigt. Der er risiko for, at farven breder sig.",
      },
      {
        question: "Hvorfor kommer der en ring omkring pletten, når den tørrer?",
        answer: "Fordi der er brugt for meget væske. Snavs fra skummet trækkes op og sætter sig i kanten af det våde område.",
      },
    ],
    relatedPosts: ["spildt-maelk-i-bilen", "fjern-tyggegummi-fra-bilsaede"],
    relatedLinks: [
      { label: "Pletfjernelse fra bilsæder", href: route("/pletfjernelse-bilsaeder") },
      { label: "Sæderens af bil", href: route("/saederens-bil") },
      { label: "Rengøring efter uheld", href: route("/rengoering-efter-uheld-i-bilen") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "spildt-maelk-i-bilen",
    title: "Spildt mælk i bilen: sådan undgår du den sure lugt",
    metaTitle: "Spildt mælk i bilen – fjern lugten",
    description:
      "Spildt mælk giver en af de værste lugte i en bil. Se hvad du skal gøre de første minutter, og hvad der kræves, hvis lugten allerede har sat sig.",
    category: "Pletter og lugt",
    keywords: ["spildt mælk i bil", "mælkelugt i bil", "sur lugt i bilen", "fjern mælk fra bilsæde", "lugt af mælk bil"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/home/uheld.jpg", alt: "Spildt mad og drikke på bilsæde" },
    intro: [
      "En væltet sutteflaske, en indkøbspose, der tipper, eller en kakao på bagsædet. Det ser uskyldigt ud. Tre dage senere lugter hele bilen surt, og lugten bliver værre for hver varm dag.",
      "Mælk er det sværeste spild at slippe af med i en bil. Men det kan lade sig gøre, hvis du handler hurtigt.",
    ],
    keyTakeaways: [
      "Mælk er fedt, sukker og protein – perfekt føde for bakterier.",
      "Lugten kommer fra det, der er sivet ned i sædets skum eller under tæppet.",
      "Brug koldt vand, og sug så meget op som muligt med det samme.",
      "Duftspray dækker kun lugten. Kilden skal fjernes.",
    ],
    sections: [
      {
        heading: "Hvorfor lugter mælk så slemt?",
        paragraphs: [
          "Mælk indeholder alt, hvad bakterier har brug for. I en lukket bil, der bliver varm i solen, formerer de sig eksplosivt. Affaldsstofferne er det, du kan lugte: en skarp, sur stank, der minder om opkast.",
          "Problemet er, at mælken ikke bliver på overfladen. Den løber gennem sædestoffet og ned i skummet, eller gennem tæppet og ned i filtlaget under. Dér kan den ligge fugtig i ugevis.",
        ],
      },
      {
        heading: "De første ti minutter",
        paragraphs: [
          "Sug mælken op med køkkenrulle eller håndklæder. Tryk hårdt, og skift, til der ikke kommer mere. Hæld lidt koldt vand på området, og sug op igen. Gentag flere gange – du fortynder og fjerner det, der er sunket ned.",
          "Brug ikke varmt vand. Varme får mælkens protein til at stivne og sætte sig fast. Lad døre eller vinduer stå åbne bagefter, så området kan tørre.",
        ],
      },
      {
        heading: "Hvis lugten allerede er der",
        paragraphs: [
          "Så er mælken i skummet eller under tæppet. Overfladerengøring hjælper ikke. Området skal skylles igennem med rensemiddel og suges op igen, så det, der sidder dybt, kommer med ud. Et enzymbaseret rensemiddel nedbryder proteinerne og er det, der virker bedst på mælk.",
          "Er mælken løbet under tæppet, kan det være nødvendigt at løfte det, så filten nedenunder kan tørre. Det er et større arbejde.",
        ],
      },
      {
        heading: "Det virker ikke",
        paragraphs: [
          "Duftfriskere, kaffebønner og eddike i en skål dæmper lugten et øjeblik, men bakterierne arbejder videre. Bagepulver kan suge lidt lugt fra overfladen, men når ikke ned til kilden.",
          "Hos CleanWash kan du bestille pletfjernelse eller sæderens sammen med en indvendig rengøring. Skriv i bookingen, at det drejer sig om mælk, og hvor længe det er siden.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvordan fjerner man lugten af spildt mælk i en bil?",
        answer: "Mælken skal skylles ud af stof og skum og suges op. Enzymbaserede rensemidler virker bedst. Duftspray løser ikke problemet.",
      },
      {
        question: "Hvor hurtigt begynder mælk at lugte?",
        answer: "I en varm bil efter et par dage. Om sommeren kan det gå endnu hurtigere.",
      },
      {
        question: "Må man bruge varmt vand på mælk?",
        answer: "Nej. Varmt vand får proteinet til at stivne og gør det sværere at fjerne.",
      },
      {
        question: "Kan lugten komme igen?",
        answer: "Ja, hvis der stadig sidder mælk dybt nede. Så kræver det endnu en behandling.",
      },
    ],
    relatedPosts: ["pletguide-til-bilsaeder", "duftfrisker-eller-lugtfjernelse"],
    relatedLinks: [
      { label: "Rengøring efter uheld", href: route("/rengoering-efter-uheld-i-bilen") },
      { label: "Sæderens af bil", href: route("/saederens-bil") },
      { label: "Lugtfjernelse", href: route("/lugtfjernelse-bil") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "fjern-tyggegummi-fra-bilsaede",
    title: "Sådan fjerner du tyggegummi fra bilsæde og gulvtæppe",
    metaTitle: "Fjern tyggegummi fra bilsæde – sådan",
    description:
      "Tyggegummi i bilsædet skal fryses, ikke gnides. Se den enkle metode med is, og hvad du gør ved resterne på stof, læder og tæppe.",
    category: "Pletter og lugt",
    keywords: ["fjern tyggegummi bilsæde", "tyggegummi i bil", "tyggegummi på sæde", "tyggegummi biltæppe", "tyggegummi læder"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 3,
    coverImage: { src: "/home/kids.jpg", alt: "Bagsæde med autostol, hvor tyggegummi og slik ofte ender" },
    intro: [
      "Tyggegummi på bagsædet er en klassiker i børnefamilier. Den første indskydelse er at pille det af. Det trækker det ud i lange tråde og masser det ned i stoffet.",
      "Tricket er det modsatte af varme: kulde.",
    ],
    keyTakeaways: [
      "Frys tyggegummiet med isterninger i en pose, til det er hårdt.",
      "Knæk og løft det af – træk ikke.",
      "Rester på stof opløses med lidt isopropylalkohol eller eddike.",
      "På læder skal du være ekstra forsigtig og undgå opløsningsmidler.",
    ],
    sections: [
      {
        heading: "Trin 1: frys det",
        paragraphs: [
          "Kom isterninger i en frysepose, og hold den mod tyggegummiet i fem til ti minutter. Posen forhindrer, at smeltevand gør sædet vådt. Tyggegummiet bliver hårdt og sprødt.",
          "Du kan også bruge en kølespray, men is virker lige så godt og er altid ved hånden.",
        ],
      },
      {
        heading: "Trin 2: løft det af",
        paragraphs: [
          "Når det er hårdt, kan det knækkes af med en ske, en plastskraber eller kanten af et gammelt kreditkort. Arbejd udefra og ind, og løft stykkerne væk. Bliver det blødt igen, så frys en gang til.",
          "Brug ikke kniv eller noget skarpt. Stoffet under er tyndere, end man tror.",
        ],
      },
      {
        heading: "Trin 3: fjern resterne",
        paragraphs: [
          "Tilbage sidder som regel en tynd, klistret skygge i fibrene. Dup med en klud med lidt isopropylalkohol eller lun eddike, og gnid forsigtigt med en blød børste. Slut af med lidt sæbevand på en klud, og dup tørt.",
          "Prøv midlet et skjult sted først. Nogle farver kan løbe.",
        ],
      },
      {
        heading: "Tyggegummi på læder og tæppe",
        paragraphs: [
          "På læder fryser du på samme måde og løfter forsigtigt af. Resterne fjernes med et læderrens – ikke alkohol, som udtørrer overfladen. Giv læderet pleje bagefter.",
          "På gulvtæppe er metoden den samme som på stof, men tyggegummiet sidder ofte dybere, fordi det er trådt ned. Det kan kræve flere omgange med is.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvordan fjerner man tyggegummi fra et bilsæde?",
        answer: "Frys det med is i en pose, knæk det af, og fjern resterne med lidt isopropylalkohol eller eddike.",
      },
      {
        question: "Hvorfor skal tyggegummi fryses?",
        answer: "Fordi koldt tyggegummi bliver hårdt og kan knækkes af. Varmt tyggegummi trækkes ud og masses ned i stoffet.",
      },
      {
        question: "Kan man bruge olie eller peanutbutter?",
        answer: "Det kan løsne tyggegummi, men efterlader en fedtplet i stoffet. Is er et bedre valg i en bil.",
      },
      {
        question: "Hvad hvis der stadig er en plet?",
        answer: "Så kan pletfjernelse eller sæderens tage resten.",
      },
    ],
    relatedPosts: ["pletguide-til-bilsaeder", "saadan-rydder-og-rengoer-du-bilen-med-boern"],
    relatedLinks: [
      { label: "Pletfjernelse fra bilsæder", href: route("/pletfjernelse-bilsaeder") },
      { label: "Bilvask af familiebil", href: route("/bilvask-familiebil") },
      { label: "Rens af autostol", href: route("/rens-af-autostol") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "fjern-skimmel-i-bilen",
    title: "Skimmel i bilen: derfor opstår det, og sådan kommer du af med det",
    metaTitle: "Skimmel i bilen – årsager og løsning",
    description:
      "Grønne eller hvide pletter på sæder og seler er skimmel. Se hvorfor det opstår, hvordan det fjernes sikkert, og hvordan du undgår, at det kommer igen.",
    category: "Pletter og lugt",
    keywords: ["skimmel i bilen", "mug i bil", "skimmelsvamp bil", "fugt i bilen skimmel", "muggen lugt bil"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/home/extra.jpg", alt: "Fugtig og tilsmudset kabine med risiko for skimmel" },
    intro: [
      "Du åbner bilen efter et par uger og bliver mødt af en tung, jordagtig lugt. På sæder, rat eller seler er der grønlige eller hvide, lodne pletter. Det er skimmel.",
      "Skimmel i biler er mere almindeligt, end man tror – især om efteråret og i biler, der står stille.",
    ],
    keyTakeaways: [
      "Skimmel kræver fugt, føde og stillestående luft.",
      "Fugtkilden skal findes og fjernes, ellers kommer skimlen igen.",
      "Luft ud, og beskyt dig selv, når du rengør.",
      "Udbredt skimmel i sæder og tæpper kræver professionel hjælp.",
    ],
    sections: [
      {
        heading: "Hvorfor kommer der skimmel?",
        paragraphs: [
          "Skimmelsporer findes overalt i luften. De slår kun rod, når der er fugt. I en bil kan fugten komme fra våde måtter, et glemt vindue, en utæt dørliste, tilstoppede afløb eller et spild, der aldrig tørrede.",
          "Støv, hudskæl og madrester er føde nok. Står bilen lukket i en fugtig periode, kan der gå få uger, før de første pletter viser sig.",
        ],
      },
      {
        heading: "Find fugtkilden først",
        paragraphs: [
          "Mærk efter i tæpperne – også under måtterne og i bagagerummets bund. Er der vådt uden forklaring, er der en utæthed. Tjek dørlister, afløbene under forruden og eventuelle afløb i soltaget.",
          "Rengør du skimlen uden at stoppe fugten, er den tilbage om en måned.",
        ],
      },
      {
        heading: "Sådan rengør du",
        paragraphs: [
          "Åbn alle døre, og lad bilen lufte godt ud. Brug handsker og gerne en maske, hvis der er meget. Støvsug ikke tør skimmel uden et godt filter – det spreder sporerne.",
          "Tør hårde flader af med et rengøringsmiddel på en klud, og kassér kluden bagefter. Tekstiler skal renses i dybden, ikke bare tørres af. Det vigtigste trin er det sidste: bilen skal tørre helt. Lad den stå åben i sol og vind, eller brug en affugter.",
        ],
      },
      {
        heading: "Hvornår skal du have hjælp?",
        paragraphs: [
          "Er skimlen begrænset til overfladen, kan en grundig indvendig rengøring med sæderens som regel klare det. Er den vokset ned i sædeskum og tæppefilt, eller er bilen gennemvåd, er det en større opgave.",
          "Kontakt os, og beskriv omfanget, før du booker. Så siger vi ærligt, hvad vi kan gøre. Har du astma eller allergi, bør du lade andre tage rengøringen.",
        ],
      },
    ],
    faqs: [
      {
        question: "Er skimmel i bilen farligt?",
        answer: "Skimmelsporer kan genere luftvejene, især hos personer med astma eller allergi. Det bør fjernes.",
      },
      {
        question: "Hvorfor kommer skimlen igen?",
        answer: "Fordi fugtkilden ikke er fjernet. Uden fugt kan skimmel ikke vokse.",
      },
      {
        question: "Kan man selv fjerne skimmel i bilen?",
        answer: "Let overfladeskimmel ja, med udluftning, rengøringsmiddel og grundig tørring. Udbredt skimmel kræver professionel rens.",
      },
      {
        question: "Hvordan forebygger man skimmel?",
        answer: "Hold bilen tør: tørre måtter, ingen våde ting i kabinen, og luft ud jævnligt, hvis bilen står stille.",
      },
    ],
    relatedPosts: ["bil-der-har-staaet-stille-laenge", "dug-paa-ruderne-indvendigt"],
    relatedLinks: [
      { label: "Bilrengøring", href: route("/bilrengoering") },
      { label: "Sæderens af bil", href: route("/saederens-bil") },
      { label: "Rengøring af meget beskidt bil", href: route("/rengoering-af-meget-beskidt-bil") },
      { label: "Kontakt", href: route("/kontakt") },
    ],
  },
  {
    slug: "lugt-fra-aircondition",
    title: "Sur lugt fra airconditionen: årsagen og kuren",
    metaTitle: "Lugt fra aircondition i bilen – hvad gør man?",
    description:
      "Lugter det surt eller muggent, når du tænder for bilens aircondition? Læs hvorfor det sker, hvad en rens gør, og hvordan du undgår lugten.",
    category: "Pletter og lugt",
    keywords: ["lugt fra aircondition bil", "aircondition lugter surt", "klimaanlæg lugter", "muggen lugt blæser bil", "AC rens bil"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/home/voks.jpg", alt: "Behandling ved instrumentbræt og ventilationsdyser" },
    intro: [
      "Du starter bilen, tænder blæseren, og de første sekunder kommer der en lugt af våd karklud ud af dyserne. Efter et halvt minut er den væk – til næste gang.",
      "Det er et af de mest almindelige lugtproblemer i biler. Og det har en ganske bestemt årsag.",
    ],
    keyTakeaways: [
      "Lugten kommer fra bakterier og skimmel på anlæggets fordamper.",
      "Den opstår, fordi fordamperen er våd og mørk, når bilen parkeres.",
      "En AC-rengøring fjerner belægningen. Et nyt kabinefilter hjælper også.",
      "Sluk for kølingen et par minutter før ankomst, så anlægget tørrer.",
    ],
    sections: [
      {
        heading: "Hvad sker der inde i anlægget?",
        paragraphs: [
          "Airconditionen køler luften ved at lede den hen over en kold flade, fordamperen. Fugten i luften fortættes på den, ligesom dug på et koldt glas. Vandet løber ud under bilen – det er pytten, du ser på en varm dag.",
          "Når du slukker bilen, er fordamperen stadig våd. Den sidder i et mørkt, lukket rum bag instrumentbrættet sammen med støv og pollen. Det er ideelle vilkår for bakterier og skimmel.",
        ],
      },
      {
        heading: "Hvorfor lugter det kun i starten?",
        paragraphs: [
          "Fordi den første luft blæser lugtstofferne ud af den fugtige belægning. Når anlægget bliver koldt og luften tør, aftager lugten. Belægningen er der stadig.",
          "Med tiden bliver den tykkere, og lugten varer længere. Til sidst lugter det, hver gang blæseren kører.",
        ],
      },
      {
        heading: "Hvad gør en AC-rengøring?",
        paragraphs: [
          "Et rensemiddel føres ind i ventilationssystemet, hvor det når fordamperen og kanalerne og nedbryder belægningen. Bagefter køres anlægget igennem, så systemet tørrer.",
          "Det er en rengøring – ikke en service. Køler anlægget dårligt, mangler det kølemiddel eller har en fejl, og så skal det på værksted. Skift også kabinefilteret, hvis det er gammelt. Et tilstoppet filter lugter selv.",
        ],
      },
      {
        heading: "Sådan undgår du lugten",
        paragraphs: [
          "Sluk for kølingen to til tre minutter, før du er fremme, og lad blæseren køre videre. Så tørrer fordamperen, inden bilen parkeres. Det er den vane, der gør størst forskel.",
          "Brug anlægget hele året, og kør ikke altid med recirkulation. Hos CleanWash er AC-rengøring et tilvalg til 300 kr., som bookes sammen med en bilvask.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvorfor lugter min aircondition surt?",
        answer: "På grund af bakterier og skimmel, der vokser på den fugtige fordamper inde i anlægget.",
      },
      {
        question: "Hjælper det at skifte kabinefilter?",
        answer: "Ja, hvis filteret er gammelt. Men belægningen på fordamperen skal renses for sig.",
      },
      {
        question: "Hvor ofte skal airconditionen renses?",
        answer: "En gang om året er passende for de fleste biler.",
      },
      {
        question: "Er AC-rengøring det samme som AC-service?",
        answer: "Nej. Rengøring fjerner lugt. Service handler om kølemiddel og funktion og udføres af et værksted.",
      },
    ],
    relatedPosts: ["duftfrisker-eller-lugtfjernelse", "allergi-og-bilens-kabine"],
    relatedLinks: [
      { label: "Aircondition rens", href: route("/aircondition-rens-bil") },
      { label: "Lugtfjernelse", href: route("/lugtfjernelse-bil") },
      { label: "Bilrengøring", href: route("/bilrengoering") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "duftfrisker-eller-lugtfjernelse",
    title: "Duftfrisker eller lugtfjernelse: hvad virker mod dårlig lugt i bilen?",
    metaTitle: "Duftfrisker eller lugtfjernelse i bilen?",
    description:
      "En duftfrisker skjuler lugten, men fjerner den ikke. Se hvor dårlig lugt i bilen kommer fra, og hvad der skal til for at slippe af med den.",
    category: "Pletter og lugt",
    keywords: ["dårlig lugt i bilen", "duftfrisker bil", "fjern lugt i bil", "lugtfjerner bil", "bilen lugter"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/home/cigarret.jpg", alt: "Røg i bilkabine – en almindelig årsag til dårlig lugt" },
    intro: [
      "Et duftetræ i bakspejlet er den mest solgte løsning på dårlig lugt i biler. Det er også den mindst effektive.",
      "Lugt er ikke noget, der hænger i luften. Den kommer fra noget. Og så længe det noget er der, kommer lugten tilbage.",
    ],
    keyTakeaways: [
      "Duftfriskere lægger en ny duft oven på den gamle – de fjerner intet.",
      "Find kilden: tekstiler, spild, fugt, anlæg eller affald.",
      "Rengøring fjerner kilden. Lugtbehandling tager resten.",
      "En ren bil lugter af ingenting.",
    ],
    sections: [
      {
        heading: "Hvor kommer lugten fra?",
        paragraphs: [
          "Der er fem almindelige kilder, og de lugter forskelligt.",
          "Røg sidder i loft, sæder og ventilationsanlæg og lugter gammelt og skarpt. Fugt giver en jordagtig, muggen lugt fra måtter og tæpper. Spild som mælk og mad lugter surt. Kæledyr efterlader lugt i tekstiler. Og airconditionen kan give en lugt af våd klud, når blæseren starter.",
        ],
      },
      {
        heading: "Hvorfor duftfriskere ikke virker",
        paragraphs: [
          "En duftfrisker afgiver parfume. Den konkurrerer med den dårlige lugt, men ændrer ikke på den. Resultatet er ofte en blanding, der er værre end udgangspunktet – tænk på vanilje oven på cigaretrøg.",
          "Næsen vænner sig desuden til en konstant duft på få dage. Så lugter du ikke længere friskeren, men passagererne lugter begge dele.",
        ],
      },
      {
        heading: "Hvad virker så?",
        paragraphs: [
          "Først: fjern det, der lugter. Tøm bilen, støvsug, tag måtterne ud, og rengør alle flader. Meget lugt forsvinder allerede dér.",
          "Dernæst: gå efter den specifikke kilde. Sæderens til lugt i tekstiler. Pletfjernelse eller dybderens ved spild. AC-rengøring ved lugt fra anlægget. Og en egentlig lugtbehandling til røg, der sidder i hele kabinen.",
        ],
      },
      {
        heading: "Hjemmeråd – virker de?",
        paragraphs: [
          "Bagepulver drysset på tæpper og støvsuget op næste dag kan tage lidt lugt fra overfladen. En skål eddike eller kaffebønner optager en smule fra luften. Udluftning i sol og vind hjælper altid.",
          "Ingen af delene fjerner en kilde, der sidder nede i sædeskum eller ventilationskanaler. Men de er udmærkede som supplement, når kilden er fjernet.",
        ],
      },
    ],
    faqs: [
      {
        question: "Virker duftfriskere mod dårlig lugt?",
        answer: "De dækker over lugten i en periode, men fjerner ikke årsagen.",
      },
      {
        question: "Hvordan finder jeg ud af, hvor lugten kommer fra?",
        answer: "Lugt til måtter, sæder, bagagerum og ventilationsdyser hver for sig. Læg mærke til, om lugten er værst i varme, fugt eller når blæseren starter.",
      },
      {
        question: "Kan en almindelig indvendig rengøring fjerne lugt?",
        answer: "Ofte ja, hvis lugten skyldes snavs og affald. Sidder den i tekstiler eller anlæg, skal der tilvalg til.",
      },
      {
        question: "Hvad koster lugtfjernelse hos CleanWash?",
        answer: "Fjernelse af røglugt koster 300 kr., AC-rengøring 300 kr. og sæderens 300 kr. som tilvalg til en bilvask.",
      },
    ],
    relatedPosts: ["lugt-fra-aircondition", "fjern-rygelugt-og-muffen-lugt-fra-bilen"],
    relatedLinks: [
      { label: "Lugtfjernelse", href: route("/lugtfjernelse-bil") },
      { label: "Aircondition rens", href: route("/aircondition-rens-bil") },
      { label: "Sæderens af bil", href: route("/saederens-bil") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "allergi-og-bilens-kabine",
    title: "Allergi og bilen: sådan får du mindre pollen og støv i kabinen",
    metaTitle: "Allergi i bilen – mindre pollen og støv",
    description:
      "Kabinen samler pollen, støv og dyrehår. Se hvordan rengøring, kabinefilter og gode vaner giver bedre luft i bilen for allergikere.",
    category: "Pletter og lugt",
    keywords: ["allergi bil", "pollen i bilen", "kabinefilter pollen", "støvmider i bil", "allergivenlig bilrengøring"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/service/inside.jpg", alt: "Grundig indvendig rengøring af bil for støv og pollen" },
    intro: [
      "For en allergiker kan bilen være et tilflugtssted – eller en fælde. En lukket kabine med rent filter holder pollen ude. En kabine fuld af støv, hår og gammelt pollen gør det modsatte.",
      "Forskellen ligger i rengøringen og et par vaner.",
    ],
    keyTakeaways: [
      "Pollen kommer ind på tøj, sko og gennem åbne vinduer og sætter sig i tekstiler.",
      "Kabinefilteret er første forsvar – skift det efter planen.",
      "Grundig støvsugning og aftørring fjerner det, der har lagt sig.",
      "Har der været dyr i bilen, sidder allergenerne længe.",
    ],
    sections: [
      {
        heading: "Hvad samler sig i kabinen?",
        paragraphs: [
          "Pollen er den store synder forår og sommer. Det kommer ind, hver gang en dør åbnes, og sidder på tøj og i hår. I kabinen lander det på instrumentbræt, sæder og tæpper og hvirvles op igen, når blæseren kører.",
          "Dertil kommer almindeligt støv, hudskæl og – hvis der har været dyr i bilen – hår og skæl fra dem. Tekstilsæder og tæpper holder på det hele.",
        ],
      },
      {
        heading: "Kabinefilteret",
        paragraphs: [
          "Al luft, der blæses ind, går gennem kabinefilteret. Et nyt filter fanger pollen og støv effektivt. Et gammelt er tilstoppet og kan selv blive en kilde til lugt.",
          "Det skiftes typisk ved service. Har du allergi, så spørg efter et filter med aktivt kul, og få det skiftet inden pollensæsonen.",
        ],
      },
      {
        heading: "Rengøring, der gør en forskel",
        paragraphs: [
          "Støvsug grundigt og langsomt – sæder, sprækker, gulv og bagagerum. Tør alle hårde flader af med en let fugtig mikrofiberklud, der binder støvet. En tør klud flytter det bare rundt.",
          "Puds ruderne indefra. Pollen sætter sig i den fedtede film. Og få sæderne renset en gang om året, så det, der er trukket ned i stoffet, kommer op.",
        ],
      },
      {
        heading: "Gode vaner i pollensæsonen",
        paragraphs: [
          "Kør med lukkede vinduer og aircondition. Brug recirkulation i korte perioder, når pollentallet er højt. Ryst jakken, før du sætter dig ind, og lad ikke vasketøj eller tæpper ligge i bilen.",
          "Vask også bilen udvendigt. Pollen, der ligger på kølerhjelmen ved luftindtaget, bliver suget direkte ind.",
        ],
      },
    ],
    faqs: [
      {
        question: "Kan en ren bil hjælpe på pollenallergi?",
        answer: "Ja. Mindre pollen og støv i kabinen betyder færre symptomer under kørslen.",
      },
      {
        question: "Hvor ofte skal kabinefilteret skiftes?",
        answer: "Følg bilens serviceplan – typisk en gang om året. Skift det gerne før pollensæsonen.",
      },
      {
        question: "Fjerner sæderens allergener?",
        answer: "Den fjerner meget af det støv, pollen og skæl, der sidder i stoffet.",
      },
      {
        question: "Kan en bil, der har haft hund i, blive allergivenlig?",
        answer: "Den kan blive meget bedre med fjernelse af dyrehår og sæderens, men det er svært at fjerne alle allergener helt.",
      },
    ],
    relatedPosts: ["pollen-paa-bilen", "lugt-fra-aircondition"],
    relatedLinks: [
      { label: "Bilrengøring", href: route("/bilrengoering") },
      { label: "Fjernelse af dyrehår", href: route("/fjernelse-af-dyrehaar-bil") },
      { label: "Aircondition rens", href: route("/aircondition-rens-bil") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
];
