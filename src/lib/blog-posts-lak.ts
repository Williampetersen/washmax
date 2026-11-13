import type { Route } from "next";
import type { BlogPost } from "@/lib/blog-posts";

const route = (href: string) => href as Route;
const published = "2026-11-13";

// Guides om lak og udvendig finish.
export const lakBlogPosts: BlogPost[] = [
  {
    slug: "fjern-harpiks-fra-bilen",
    title: "Sådan fjerner du harpiks fra bilen uden at skade lakken",
    metaTitle: "Fjern harpiks fra bilen – sådan gør du",
    description:
      "Harpiks fra træer hærder på lakken og kan ikke bare vaskes af. Se hvordan du fjerner frisk og gammel harpiks sikkert – og hvordan du undgår den.",
    category: "Lak og finish",
    keywords: ["fjern harpiks bil", "harpiks på lakken", "træsaft på bil", "harpiks fjerner", "klistret lak"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 5,
    coverImage: { src: "/service/udenfor.jpg", alt: "Udvendig rengøring af billak for harpiks" },
    intro: [
      "Parkerer du under træer, kender du de små, gyldne dråber på tag og kølerhjelm. Harpiks er klistret, når den lander, og hård som lim efter nogle dage i solen.",
      "Den gode nyhed er, at harpiks næsten altid kan fjernes uden spor. Den dårlige er, at de fleste gør det forkert og ender med ridser. Her er den rigtige fremgangsmåde.",
    ],
    keyTakeaways: [
      "Frisk harpiks kan ofte fjernes med varmt vand og bilshampoo.",
      "Hærdet harpiks skal opløses – aldrig skrabes eller gnides af.",
      "Brug isopropylalkohol eller en harpiksfjerner på en blød klud, og lad midlet virke.",
      "Giv området ny voks bagefter, fordi opløsningsmidlet også fjerner beskyttelsen.",
    ],
    sections: [
      {
        heading: "Harpiks eller honningdug?",
        paragraphs: [
          "Ikke alt klistret fra træer er harpiks. Nåletræer som fyr og gran afgiver ægte harpiks: tykke, ravfarvede dråber, der hærder. Løvtræer som lind, ahorn og birk giver oftest honningdug – en tynd, sukkerholdig hinde fra bladlus, der lægger sig som en klistret film over hele bilen.",
          "Forskellen betyder noget. Honningdug er vandopløseligt og går af i en almindelig vask med forvask. Harpiks er ikke vandopløseligt og kræver et opløsningsmiddel.",
        ],
      },
      {
        heading: "Sådan fjerner du frisk harpiks",
        paragraphs: [
          "Er dråben stadig blød, så vask bilen først. Læg derefter en klud vredet op i varmt sæbevand over pletten i et par minutter. Varmen blødgør harpiksen, og den kan ofte tørres forsigtigt af med en ren mikrofiberklud.",
          "Brug ikke neglen, en skraber eller den grove side af en svamp. Harpiks indkapsler støv og sand, og det bliver trukket hen over lakken, hvis du gnider.",
        ],
      },
      {
        heading: "Sådan fjerner du hærdet harpiks",
        paragraphs: [
          "Hård harpiks skal opløses. Brug isopropylalkohol eller en harpiksfjerner beregnet til billak. Kom midlet på en blød klud – ikke direkte på lakken – og hold kluden mod pletten i 30 til 60 sekunder. Tør derefter med lette bevægelser. Gentag, til pletten er væk.",
          "Arbejd i skygge på en kold overflade. I sol fordamper midlet, før det når at virke. Vask området med shampoo bagefter, og læg voks på. Alkohol fjerner den eksisterende voks, så lakken står ubeskyttet, præcis dér hvor harpiksen sad.",
        ],
      },
      {
        heading: "Sådan undgår du harpiks",
        paragraphs: [
          "Det sikreste er at parkere et andet sted i sommermånederne. Kan du ikke det, så hold lakken vokset. På en vokset overflade binder harpiksen sig til voksen i stedet for til lakken og er langt lettere at få af.",
          "Og vent ikke. En dråbe, der er to dage gammel, tager to minutter at fjerne. En, der har siddet hele sommeren, kan efterlade en mat ring i klarlakken.",
        ],
      },
    ],
    faqs: [
      {
        question: "Kan harpiks skade lakken?",
        answer:
          "Ja, hvis den sidder længe. Harpiks kan ætse klarlakken og efterlade en mat eller misfarvet plet, især i varmt vejr.",
      },
      {
        question: "Kan man bruge sprit til at fjerne harpiks?",
        answer:
          "Isopropylalkohol virker godt. Brug det på en klud, lad det virke kort, og vask og voks området bagefter.",
      },
      {
        question: "Går harpiks af i en vaskehal?",
        answer: "Nej. Hverken børster eller højtryk fjerner hærdet harpiks. Den skal opløses.",
      },
      {
        question: "Fjerner CleanWash harpiks?",
        answer:
          "Frisk harpiks fjernes i forbindelse med en udvendig vask. Er der mange hærdede pletter, så skriv det i bookingen, så der er sat tid af.",
      },
    ],
    relatedPosts: ["fjern-tjaerepletter-fra-lakken", "fjern-fugleklatter-insekter-uden-at-ridse-lakken"],
    relatedLinks: [
      { label: "Bilvask med voks", href: route("/bilvask-med-voks") },
      { label: "Udvendig bilvask", href: route("/udvendig-bilvask-koebenhavn") },
      { label: "Bilvask Holte", href: route("/bilvask-holte") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "fjern-tjaerepletter-fra-lakken",
    title: "Tjærepletter på bilen: sådan får du de sorte prikker af",
    metaTitle: "Fjern tjærepletter fra bilen – guide",
    description:
      "Små sorte prikker bag hjulene er tjære fra asfalten. De går ikke af med sæbe. Læs hvordan du fjerner tjærepletter uden at ridse lakken.",
    category: "Lak og finish",
    keywords: ["fjern tjærepletter bil", "tjære på lakken", "sorte prikker på bil", "asfaltpletter bil", "tjærefjerner"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/home/wash-tire.jpg", alt: "Rengøring ved hjul, hvor tjærepletter typisk sidder" },
    intro: [
      "Kig på dørene lige bag forhjulene. Ser du små, sorte prikker, som ikke forsvinder i vask, er det tjære. Den kommer fra asfalten og bliver slynget op af dækkene – især om sommeren og ved vejarbejde.",
      "Tjære er nem at fjerne, når man bruger det rigtige middel. Og umulig, når man ikke gør.",
    ],
    keyTakeaways: [
      "Tjære opløses af tjærefjerner – ikke af vand, sæbe eller affedter.",
      "Lad midlet arbejde. Pletterne skal smelte, ikke skrubbes.",
      "Pletterne sidder lavt: bag hjulene, på dørtrin og på bagkofangeren.",
      "Læg voks på bagefter, så næste omgang slipper lettere.",
    ],
    sections: [
      {
        heading: "Hvor kommer tjæren fra?",
        paragraphs: [
          "Asfalt er sten bundet sammen med bitumen. I varmt vejr bliver bitumen blød, og nylagt asfalt afgiver ekstra meget. Dækkene samler små klatter op og kaster dem mod bilens sider.",
          "Derfor sidder pletterne altid de samme steder: på forskærmens bagkant, langs dørenes nederste del, bag baghjulene og på bagkofangeren. På lyse biler ses de tydeligt. På mørke biler kan man mærke dem som små knopper.",
        ],
      },
      {
        heading: "Sådan fjerner du tjærepletter",
        paragraphs: [
          "Vask og tør bilen først. Sprøjt eller dup tjærefjerner på de ramte områder, og vent et minuts tid. Du kan se pletterne begynde at løbe i brune striber. Tør dem af med en blød klud, og vend kluden ofte.",
          "Skyl området med vand, og vask det med shampoo bagefter. Tjærefjerner er et opløsningsmiddel og må ikke tørre ind på lakken. Brug det ikke i sol eller på en varm bil, og hold det væk fra ulakeret plast og gummi, som kan blive misfarvet.",
        ],
      },
      {
        heading: "Det skal du undgå",
        paragraphs: [
          "Skrab ikke med neglen. Brug ikke skuresvamp. Og lad være med benzin og andre hjemmeløsninger – de virker, men de er hårde ved lak, lister og hænder.",
          "Mange opdager først tjæren, når bilen er nyvasket, og går i gang med at gnide. Det giver ridser i en ring om hver plet, og dem får man ikke af igen uden polering.",
        ],
      },
      {
        heading: "Forebyggelse",
        paragraphs: [
          "Du kan ikke undgå tjære, hvis du kører på vejene. Men voks på lakken gør, at pletterne sidder løsere. Kør langsomt forbi nylagt asfalt og løse skærver. Og fjern pletterne et par gange om året, så de ikke når at sætte sig helt fast.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvad er de sorte prikker bag hjulene på min bil?",
        answer: "Tjære og bitumen fra asfalten, som dækkene har slynget op på lakken.",
      },
      {
        question: "Kan tjærepletter fjernes med almindelig bilshampoo?",
        answer: "Nej. Tjære er ikke vandopløseligt og kræver en tjærefjerner.",
      },
      {
        question: "Skader tjærefjerner lakken?",
        answer:
          "Ikke når den bruges korrekt: på kold lak, i kort tid og skyllet af bagefter. Den fjerner dog voks, så området skal vokses igen.",
      },
      {
        question: "Hvor ofte skal tjære fjernes?",
        answer: "En til to gange om året er nok for de fleste – typisk forår og efterår.",
      },
    ],
    relatedPosts: ["fjern-harpiks-fra-bilen", "flyverust-hvad-er-det"],
    relatedLinks: [
      { label: "Udvendig bilvask", href: route("/udvendig-bilvask-koebenhavn") },
      { label: "Bilvask med voks", href: route("/bilvask-med-voks") },
      { label: "Bilvask Ringsted", href: route("/bilvask-ringsted") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "flyverust-hvad-er-det",
    title: "Flyverust: de små orange prikker på lakken",
    metaTitle: "Flyverust på bilen – hvad er det?",
    description:
      "Små rustfarvede prikker på lakken er ikke rust i bilen, men jernpartikler udefra. Læs hvad flyverust er, hvor det kommer fra, og hvordan det fjernes.",
    category: "Lak og finish",
    keywords: ["flyverust", "rustprikker på bil", "orange prikker lak", "flyverust fjerner", "jernpartikler lak"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/home/dækshine.png", alt: "Fælg og bremser – en kilde til jernpartikler og flyverust" },
    intro: [
      "Har du en hvid eller lys bil, har du måske set dem: bittesmå orange prikker på bagklappen og siderne. De ligner begyndende rust, og mange bliver forskrækkede.",
      "Det er heldigvis ikke bilen, der ruster. Det er flyverust – og det kan fjernes.",
    ],
    keyTakeaways: [
      "Flyverust er små jernpartikler fra luften, der sætter sig i lakken og ruster dér.",
      "De kommer især fra bremser, jernbaner og industri.",
      "De kan ikke vaskes af, men opløses kemisk med en flyverustfjerner.",
      "Alle biler har det – man ser det bare tydeligst på lyse farver.",
    ],
    sections: [
      {
        heading: "Hvad er flyverust?",
        paragraphs: [
          "Når bremser bruges, afgiver skiver og klodser fint metalstøv. Togenes hjul og bremser gør det samme i meget større mængder. Støvet svæver i luften og lander på bilerne.",
          "Partiklerne er varme og skarpe og sætter sig fast i klarlakkens overflade. Når de bliver våde, ruster de. Det er den lille orange plet, du ser. Selve bilens metal er ikke berørt – rusten sidder i partiklen.",
        ],
      },
      {
        heading: "Hvem får mest flyverust?",
        paragraphs: [
          "Biler, der holder tæt på jernbane, S-tog eller metro over jorden. Biler i byer med tæt trafik. Og biler nær havne og industri. Bagklappen og de lodrette flader bag hjulene er mest udsat, fordi de får bilens eget bremsestøv.",
          "På en sort bil ser du det ikke. Men kør en hånd i en tynd plastpose hen over nyvasket lak. Føles den som fint sandpapir, sidder der partikler.",
        ],
      },
      {
        heading: "Sådan fjernes flyverust",
        paragraphs: [
          "Det kræver en flyverustfjerner. Midlet sprøjtes på ren, kold lak og reagerer med jernet. De fleste produkter skifter farve til lilla, når de virker, så man kan se, hvor partiklerne sidder. Efter nogle minutter skylles bilen grundigt.",
          "Sidder der stadig noget tilbage, kan en lakrens med ler tage resten. Bagefter skal lakken have voks, fordi behandlingen fjerner den gamle beskyttelse.",
        ],
      },
      {
        heading: "Er det farligt for lakken?",
        paragraphs: [
          "På kort sigt nej. På lang sigt kan partikler, der får lov at ruste i årevis, give små kratere i klarlakken. En behandling en til to gange om året er rigeligt for de fleste biler. Bor du lige op ad en bane, kan det være nødvendigt lidt oftere.",
        ],
      },
    ],
    faqs: [
      {
        question: "Er flyverust det samme som rust i bilen?",
        answer: "Nej. Det er fremmede jernpartikler, der ruster oven på lakken. Bilens egen plade er ikke angrebet.",
      },
      {
        question: "Kan flyverust vaskes af?",
        answer: "Nej. Det sidder fast i lakken og skal opløses med en flyverustfjerner eller fjernes med lakrens.",
      },
      {
        question: "Hvorfor har kun hvide biler flyverust?",
        answer: "Alle biler får det. Det ses bare kun tydeligt på hvide og lyse farver.",
      },
      {
        question: "Kan CleanWash fjerne flyverust?",
        answer:
          "Skriv i bookingen, at bilen har flyverust, så vurderer vi omfanget og fortæller, hvad der kan gøres.",
      },
    ],
    relatedPosts: ["fjern-tjaerepletter-fra-lakken", "lakrens-og-clay-bar"],
    relatedLinks: [
      { label: "Fælgrens", href: route("/faelgrens") },
      { label: "Udvendig bilvask", href: route("/udvendig-bilvask-koebenhavn") },
      { label: "Bilvask Kalundborg", href: route("/bilvask-kalundborg") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "vandpletter-og-kalkpletter-paa-bilen",
    title: "Kalkpletter på bilen: derfor kommer de, og sådan fjerner du dem",
    metaTitle: "Kalkpletter og vandpletter på bilen",
    description:
      "Hvide ringe på lak og ruder efter vask er kalk fra hårdt vand. Se hvorfor de opstår, hvordan du fjerner dem, og hvordan du undgår dem næste gang.",
    category: "Lak og finish",
    keywords: ["kalkpletter bil", "vandpletter på lak", "kalk på bilruder", "hvide pletter efter bilvask", "hårdt vand bilvask"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/service/helebil.jpg", alt: "Aftørring af bil for at undgå kalkpletter" },
    intro: [
      "Du har vasket bilen, og den ser flot ud – til den er tør. Så dukker der hvide ringe og pletter op på motorhjelm, tag og ruder. Det er kalk.",
      "Vandet i København og på det meste af Sjælland er hårdt. Det gør kalkpletter til et af de mest almindelige problemer for danske bilejere.",
    ],
    keyTakeaways: [
      "Kalkpletter opstår, når vanddråber fordamper og efterlader mineralerne.",
      "Vask aldrig bilen i direkte sol, og tør den altid af.",
      "Friske pletter går af med vask. Ældre kræver et surt middel.",
      "Pletter, der har siddet længe, kan ætse sig ned i klarlakken.",
    ],
    sections: [
      {
        heading: "Hvorfor kommer der kalkpletter?",
        paragraphs: [
          "Postevand indeholder opløst kalk og magnesium. Når en dråbe tørrer, forsvinder vandet, men mineralerne bliver tilbage som en hvid ring. Jo hårdere vand, jo mere bliver der tilbage.",
          "Sol og varme gør det værre. På en varm motorhjelm fordamper dråberne på sekunder, og kalken brænder sig fast. Det samme sker, når en havesprinkler eller en vandingsslange rammer bilen dag efter dag.",
        ],
      },
      {
        heading: "Sådan fjerner du friske kalkpletter",
        paragraphs: [
          "Er pletterne nye, går de ofte af ved en ny vask, hvor bilen bliver tørret ordentligt bagefter. En hurtigvoks eller detailspray på en mikrofiberklud kan også tage dem.",
          "Vent ikke. De første dage ligger kalken oven på lakken. Senere begynder den at bide sig fast.",
        ],
      },
      {
        heading: "Sådan fjerner du gamle kalkpletter",
        paragraphs: [
          "Kalk opløses af syre. Der findes kalkfjernere til billak. Et husråd er husholdningseddike blandet halvt op med vand: kom det på en klud, læg den på pletten i et minut, tør af, og skyl grundigt. Prøv først et sted, der ikke ses, og brug det aldrig på varm lak.",
          "Er der en svag ring tilbage, efter at kalken er væk, er klarlakken blevet ætset. Det kan kun fjernes med polering.",
        ],
      },
      {
        heading: "Sådan undgår du dem",
        paragraphs: [
          "Vask bilen i skygge eller på en overskyet dag. Arbejd på én del ad gangen, og skyl, før sæben tørrer. Og tør altid bilen af med rene mikrofiberhåndklæder, mens den er våd. Voks på lakken hjælper, fordi vandet løber af i stedet for at blive liggende.",
          "Hos CleanWash er aftørring en fast del af den udvendige vask, netop fordi det danske vand er så hårdt.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvorfor får min bil hvide pletter efter vask?",
        answer: "Fordi vanddråberne tørrer ind og efterlader kalk. Det sker især i sol og med hårdt vand.",
      },
      {
        question: "Kan man fjerne kalkpletter med eddike?",
        answer:
          "Ja, fortyndet eddike kan opløse kalk. Brug det kort, på kold lak, og skyl grundigt bagefter. Test først et skjult sted.",
      },
      {
        question: "Skader kalkpletter lakken?",
        answer: "Ja, på sigt. Gamle kalkpletter kan ætse klarlakken og efterlade ringe, der kræver polering.",
      },
      {
        question: "Hvordan undgår jeg kalkpletter på ruderne?",
        answer: "Tør ruderne af efter vask, og lad ikke bilen lufttørre i solen.",
      },
    ],
    relatedPosts: ["bilvask-i-sommervarme", "rene-bilruder-uden-striber"],
    relatedLinks: [
      { label: "Udvendig bilvask", href: route("/udvendig-bilvask-koebenhavn") },
      { label: "Håndvask af bil", href: route("/haandvask-bil-koebenhavn") },
      { label: "Bilvask med voks", href: route("/bilvask-med-voks") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "hvor-laenge-holder-bilvoks",
    title: "Hvor længe holder bilvoks – og hvornår skal bilen vokses igen?",
    metaTitle: "Hvor længe holder bilvoks?",
    description:
      "Bilvoks holder typisk to til tre måneder. Se hvad der slider på voksen, hvordan du tester, om den stadig virker, og hvor ofte bilen bør vokses.",
    category: "Lak og finish",
    keywords: ["hvor længe holder bilvoks", "hvor ofte skal bilen vokses", "voks bil holdbarhed", "bilvoks test", "voks eller forsegling"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/service/helebil.jpg", alt: "Blank billak efter vask og voks" },
    intro: [
      "Voks er ikke permanent. Det er et offerlag, der langsomt slides væk, så lakken nedenunder ikke gør det. Spørgsmålet er, hvor længe det holder.",
      "Svaret afhænger af voksen, vejret og hvordan bilen vaskes. Men der er en enkel måde at tjekke det på.",
    ],
    keyTakeaways: [
      "Traditionel voks holder typisk to til tre måneder på en bil, der holder ude.",
      "Vejsalt, sol, kystluft og børstevask forkorter levetiden.",
      "Perletesten viser, om voksen stadig virker.",
      "Tre til fire gange om året er en god rytme for de fleste.",
    ],
    sections: [
      {
        heading: "Hvad afgør voksens levetid?",
        paragraphs: [
          "Først og fremmest typen. Naturvoks med carnauba giver en varm, dyb glans, men holder kortest – ofte en til to måneder. Syntetiske vokser og forseglinger holder længere, typisk tre til seks måneder. Sprayvoks holder nogle uger.",
          "Derefter miljøet. En garagebil kan beholde voksen i et halvt år. En bil, der holder ude ved kysten og kører på saltede veje, mister den på det halve.",
        ],
      },
      {
        heading: "Det slider voksen af",
        paragraphs: [
          "Vejsalt er den største synder om vinteren. Om sommeren er det UV-lys og varme. Stærke vaskemidler og affedtere fjerner voks effektivt, og det samme gør de kemikalier, der bruges i mange vaskehaller.",
          "En mild, pH-neutral bilshampoo slider til gengæld næsten ikke. Den måde, bilen vaskes på, betyder derfor lige så meget som voksen selv.",
        ],
      },
      {
        heading: "Perletesten",
        paragraphs: [
          "Hæld lidt vand ud over motorhjelmen. På vokset lak trækker vandet sig sammen i små, høje perler, der triller af. På uvokset lak flyder det ud i en flad hinde og bliver liggende.",
          "Begynder perlerne at blive flade og uregelmæssige, er voksen ved at være slidt. Test flere steder: motorhjelm og tag mister voksen først, fordi de får mest sol.",
        ],
      },
      {
        heading: "Hvor ofte skal bilen vokses?",
        paragraphs: [
          "For en hverdagsbil, der holder ude, passer tre til fire gange om året. En enkel plan er ved hvert årstidsskifte. Den vigtigste omgang er om efteråret, før der saltes.",
          "Hos CleanWash er voks en del af pakken Hele bilen. Får du den fire gange om året, er lakken beskyttet hele tiden.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvor længe holder voks på en bil?",
        answer: "Typisk to til tre måneder for en bil, der holder ude. Syntetiske forseglinger holder længere.",
      },
      {
        question: "Hvordan ser jeg, om voksen er slidt af?",
        answer: "Hæld vand på lakken. Perler det, virker voksen. Flyder det ud, er den væk.",
      },
      {
        question: "Kan man vokse for ofte?",
        answer: "Nej. Flere lag skader ikke, men der er heller ingen gevinst ved at vokse hver uge.",
      },
      {
        question: "Fjerner en bilvask voksen?",
        answer:
          "En håndvask med mild shampoo slider meget lidt. Stærke kemikalier og børster i en vaskehal slider mere.",
      },
    ],
    relatedPosts: ["keramisk-forsegling-eller-voks", "vask-af-bil-med-keramisk-coating"],
    relatedLinks: [
      { label: "Bilvask med voks", href: route("/bilvask-med-voks") },
      { label: "Komplet bilvask", href: route("/komplet-bilvask") },
      { label: "Bilvask før vinter", href: route("/bilvask-foer-vinter") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "saadan-holder-du-en-sort-bil-paen",
    title: "Sådan holder du en sort bil pæn",
    metaTitle: "Sort bil: sådan undgår du ridser og støv",
    description:
      "Sort lak viser alt: støv, ridser, kalk og fingeraftryk. Få de vigtigste råd til vask, aftørring og beskyttelse af en sort bil.",
    category: "Lak og finish",
    keywords: ["vask af sort bil", "sort bil ridser", "sort lak pleje", "svirvelridser sort bil", "holde sort bil ren"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/service/udenfor.jpg", alt: "Skånsom håndvask af mørk bil" },
    intro: [
      "Ingen farve er flottere end sort, når den er ren. Og ingen farve er mere krævende. En sort bil er et spejl, og et spejl viser alt.",
      "Sort lak er ikke blødere end anden lak. Den afslører bare det, andre farver skjuler. Det handler derfor om at røre lakken så lidt og så blidt som muligt.",
    ],
    keyTakeaways: [
      "De fleste ridser i sort lak kommer fra selve vasken.",
      "Forvask grundigt, så snavset er væk, før lakken berøres.",
      "Dup og træk aftørringen – gnid ikke i cirkler.",
      "Hold lakken vokset, og hold dig fra børstevask.",
    ],
    sections: [
      {
        heading: "Hvor kommer ridserne fra?",
        paragraphs: [
          "De fine, cirkelformede ridser, man ser i solen, kaldes svirvelridser. De opstår, når noget hårdt bliver trukket hen over lakken: sand i en svamp, støv i et håndklæde eller børsterne i en vaskehal.",
          "På en sølvgrå bil er de usynlige. På en sort bil bryder de lyset og får lakken til at se grå og træt ud.",
        ],
      },
      {
        heading: "Vask med så lidt berøring som muligt",
        paragraphs: [
          "Skyl bilen grundigt først. Læg skum på, og lad det virke, så det løsner snavset. Skyl igen. Først nu skal vaskehandsken i brug – og den skal være ren og blød.",
          "Vask oppefra og ned i lige baner, ikke i cirkler. Skyl handsken ofte i en spand rent vand, så du ikke bærer sand tilbage til lakken. Tag de nederste, beskidte paneler til sidst.",
        ],
      },
      {
        heading: "Aftørring er det farligste trin",
        paragraphs: [
          "Mange gør alt rigtigt og ødelægger det med et gammelt vaskeskind. Brug et stort, blødt mikrofiberhåndklæde. Læg det på lakken, og træk det roligt hen over – eller dup. Tryk ikke.",
          "Lad ikke bilen lufttørre. Sort lak bliver varm, og dråberne efterlader kalkpletter, der ses på lang afstand.",
        ],
      },
      {
        heading: "Mellem vaskene",
        paragraphs: [
          "Tør aldrig støv af en sort bil med en tør klud. Skyl den, eller lad den være. Fjern fugleklatter med det samme ved at bløde dem op. Og hold lakken vokset – voks fylder de allerfineste ridser optisk og giver dybde i farven.",
          "Vælg håndvask. En sort bil og en børstevask er en dårlig kombination, uanset hvor moderne anlægget er.",
        ],
      },
    ],
    faqs: [
      {
        question: "Er sort lak blødere end andre farver?",
        answer: "Ikke generelt. Sort viser bare ridser og støv langt tydeligere end lyse farver.",
      },
      {
        question: "Kan svirvelridser fjernes?",
        answer: "Ja, med maskinpolering. Voks kan dæmpe dem midlertidigt, men fjerner dem ikke.",
      },
      {
        question: "Hvor ofte skal en sort bil vaskes?",
        answer: "Gerne hver anden til tredje uge. Støv, der ligger længe, bliver sværere at fjerne skånsomt.",
      },
      {
        question: "Må en sort bil køres i vaskehal?",
        answer: "Det frarådes, hvis du vil undgå svirvelridser. Vælg håndvask eller berøringsfri vask.",
      },
    ],
    relatedPosts: ["svirvelridser-automatisk-bilvask-eller-haandvask", "to-spands-metoden"],
    relatedLinks: [
      { label: "Håndvask af bil", href: route("/haandvask-bil-koebenhavn") },
      { label: "Bilvask med voks", href: route("/bilvask-med-voks") },
      { label: "Bilvask af BMW", href: route("/bilvask-bmw") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "vask-af-bil-med-mat-lak-eller-folie",
    title: "Vask af bil med mat lak eller folie",
    metaTitle: "Mat lak og folie: sådan vaskes bilen",
    description:
      "Mat lak og folie må ikke vokses, poleres eller køres i børstevask. Se hvordan du vasker en mat eller folieret bil uden at ødelægge finishen.",
    category: "Lak og finish",
    keywords: ["vask af mat lak", "vask af folieret bil", "mat lak pleje", "bilfolie vask", "wrap bil vask"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/service/udenfor.jpg", alt: "Skånsom håndvask af bil med sart overflade" },
    intro: [
      "Mat lak og folie har samme regel: det, man normalt gør for at få en bil til at skinne, er præcis det, man ikke må.",
      "En mat overflade er mat, fordi den er mikroskopisk ru. Fylder eller sliber man ruheden, bliver den blank. Og blanke pletter på en mat bil kan ikke fjernes igen.",
    ],
    keyTakeaways: [
      "Ingen voks, ingen polering og ingen produkter med glansmidler.",
      "Vask i hånden med pH-neutral shampoo uden voks.",
      "Fjern fugleklatter og insekter med det samme – mat lak pletter let.",
      "Hold højtryk på afstand af foliens kanter.",
    ],
    sections: [
      {
        heading: "Hvorfor er mat lak anderledes?",
        paragraphs: [
          "Blank lak spejler lyset, fordi overfladen er glat. Mat lak spreder lyset, fordi overfladen har en fin struktur. Almindelig voks lægger sig i strukturen og gør den glattere. Polering sliber den væk. Begge dele giver blanke skjolder.",
          "Det samme gælder mat folie. Og selv blank folie tåler ikke polering med slibemiddel, fordi folien er blødere end lak.",
        ],
      },
      {
        heading: "Sådan vasker du en mat bil",
        paragraphs: [
          "Skyl grundigt, skum, og vask i hånden med en ren, blød vaskehandske. Brug en shampoo, der er pH-neutral og uden voks eller glansforstærker. Mange almindelige shampooer indeholder voks – læs på flasken.",
          "Tør bilen af med et rent mikrofiberhåndklæde ved at duppe. Gnid ikke hårdt samme sted, heller ikke for at fjerne en plet. Gentagen gnidning polerer overfladen blank.",
        ],
      },
      {
        heading: "Pletter skal væk med det samme",
        paragraphs: [
          "På blank lak kan en ætsning poleres væk. Det kan den ikke på mat lak. Fugleklatter, insekter, harpiks og benzinspild ved tankdækslet skal derfor fjernes hurtigt. Blød op med vand eller et rengøringsmiddel til mat lak, og dup af.",
        ],
      },
      {
        heading: "Særligt om folie",
        paragraphs: [
          "Ny folie skal have lov at sætte sig nogle dage, før bilen vaskes første gang – spørg montøren. Derefter er det kanterne, der er sårbare. Ret aldrig en højtryksstråle mod en foliekant, og hold god afstand generelt.",
          "Børstevask løfter kanter og ridser folien. Håndvask forlænger foliens levetid mærkbart. Fortæl altid den, der vasker bilen, at den er folieret eller mat. Hos CleanWash skriver du det i bookingen, så springer vi voksen over og bruger egnede midler.",
        ],
      },
    ],
    faqs: [
      {
        question: "Må mat lak få voks?",
        answer: "Nej. Almindelig voks giver blanke skjolder. Der findes særlige forseglinger til mat lak.",
      },
      {
        question: "Kan en folieret bil køres i vaskehal?",
        answer: "Det frarådes. Børster kan løfte kanter og ridse folien. Vask i hånden.",
      },
      {
        question: "Hvad gør jeg, hvis mat lak er blevet blank et sted?",
        answer: "Det kan desværre sjældent rettes. Kontakt en lakerer eller foliemontør for en vurdering.",
      },
      {
        question: "Kan CleanWash vaske min matte eller folierede bil?",
        answer: "Ja. Skriv det i bookingen, så vasker vi uden voks og med midler, der passer til overfladen.",
      },
    ],
    relatedPosts: ["vask-af-bil-med-keramisk-coating", "saadan-holder-du-en-sort-bil-paen"],
    relatedLinks: [
      { label: "Håndvask af bil", href: route("/haandvask-bil-koebenhavn") },
      { label: "Bilvask af Polestar", href: route("/bilvask-polestar") },
      { label: "Bilvask af varevogn", href: route("/bilvask-varevogn") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "vask-af-bil-med-keramisk-coating",
    title: "Sådan vasker du en bil med keramisk coating",
    metaTitle: "Vask af bil med keramisk coating",
    description:
      "En keramisk coating gør bilen lettere at vaske, men ikke vedligeholdelsesfri. Se hvordan du vasker en coatet bil, så coatingen holder længst muligt.",
    category: "Lak og finish",
    keywords: ["vask af coatet bil", "keramisk coating vedligeholdelse", "bilvask keramisk coating", "coating shampoo", "pleje af coating"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/service/helebil.jpg", alt: "Håndvask af bil med keramisk coating" },
    intro: [
      "En keramisk coating er en investering. Den giver glans, gør lakken vandafvisende og holder i årevis. Men kun hvis bilen bliver vasket rigtigt.",
      "Den mest udbredte misforståelse er, at en coatet bil ikke behøver vask. Det gør den – bare på en anden måde.",
    ],
    keyTakeaways: [
      "En coating skal vaskes jævnligt. Snavs, der sidder, lukker overfladen til.",
      "Brug pH-neutral shampoo uden voks, og vask i hånden.",
      "Tør altid af – coatede biler får lettere kalkpletter.",
      "Voks oven på en coating er unødvendigt og ændrer dens egenskaber.",
    ],
    sections: [
      {
        heading: "Hvad en coating kan – og ikke kan",
        paragraphs: [
          "En coating er et tyndt, hårdt lag, der binder sig kemisk til klarlakken. Den afviser vand og snavs, tåler kemikalier bedre end voks og giver en dyb glans.",
          "Den gør ikke bilen ridsefri, og den gør den ikke selvrensende. Støv, vejfilm og kalk lægger sig stadig. Forskellen er, at det slipper lettere, når du vasker.",
        ],
      },
      {
        heading: "Sådan vasker du en coatet bil",
        paragraphs: [
          "Skyl, skum, og vask i hånden med en ren vaskehandske. Brug en pH-neutral shampoo uden voks og glansmidler. Voks i shampooen lægger en film oven på coatingen, så vandet ikke længere perler, som det skal.",
          "Hver anden til tredje uge er en god rytme. Lader du snavset sidde i måneder, bliver overfladen tilstoppet, og coatingen virker, som om den er væk. Den er der stadig – den er bare dækket.",
        ],
      },
      {
        heading: "Pas på kalkpletter",
        paragraphs: [
          "På en coatet bil samler vandet sig i høje perler. Det ser flot ud, men hver perle er en lille linse, der efterlader en kalkring, hvis den tørrer ind. Tør derfor bilen af efter vask, og lad den ikke stå våd i solen.",
        ],
      },
      {
        heading: "Det skal du undgå",
        paragraphs: [
          "Børstevask ridser coatingen ligesom lak. Stærkt basiske eller sure rengøringsmidler slider på den over tid. Og polering fjerner den helt.",
          "Fortæl altid, at bilen er coatet, når andre vasker den. Hos CleanWash skriver du det i bookingen. Så bruger vi en egnet shampoo og springer voksen over.",
        ],
      },
    ],
    faqs: [
      {
        question: "Skal en bil med keramisk coating vaskes?",
        answer: "Ja. Coatingen gør vasken lettere, men snavs og kalk skal stadig fjernes regelmæssigt.",
      },
      {
        question: "Må man bruge voks på en coatet bil?",
        answer: "Det er ikke nødvendigt og kan dække coatingens vandafvisende overflade. Undgå også shampoo med voks.",
      },
      {
        question: "Kan en coatet bil køres i vaskehal?",
        answer: "Det frarådes. Børster og stærke kemikalier forkorter coatingens levetid.",
      },
      {
        question: "Hvorfor perler vandet ikke længere på min coating?",
        answer:
          "Ofte fordi overfladen er dækket af vejfilm eller voksrester. En grundig vask med egnet shampoo bringer som regel effekten tilbage.",
      },
    ],
    relatedPosts: ["keramisk-forsegling-eller-voks", "hvor-laenge-holder-bilvoks"],
    relatedLinks: [
      { label: "Håndvask af bil", href: route("/haandvask-bil-koebenhavn") },
      { label: "Udvendig bilvask", href: route("/udvendig-bilvask-koebenhavn") },
      { label: "Bilvask af Tesla", href: route("/bilvask-tesla") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
];
