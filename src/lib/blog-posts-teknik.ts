import type { Route } from "next";
import type { BlogPost } from "@/lib/blog-posts";

const route = (href: string) => href as Route;
const published = "2026-11-13";

// Guides om lak, vaskemetoder og udstyr.
export const teknikBlogPosts: BlogPost[] = [
  {
    slug: "foerste-vask-af-ny-bil",
    title: "Første vask af en ny bil: sådan passer du på lakken fra dag ét",
    metaTitle: "Første vask af ny bil – gør det rigtigt",
    description:
      "Hvornår må en ny bil vaskes, og hvordan? Få rådene til den første vask, de første måneder og den beskyttelse, der holder lakken flot.",
    category: "Lak og finish",
    keywords: ["første vask ny bil", "vask af ny bil", "ny bil lak beskyttelse", "hvornår må ny bil vaskes", "ny bil voks"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/service/helebil.jpg", alt: "Skånsom første vask af ny bil" },
    intro: [
      "En ny bil har den bedste lak, den nogensinde får. Hver vask derfra enten bevarer den eller slider på den. Derfor betyder de første vaske mere end de fleste tror.",
      "Du behøver ikke specialudstyr. Du skal bare undgå de to–tre ting, der giver ridser fra starten.",
    ],
    keyTakeaways: [
      "En fabriksny bil må gerne vaskes med det samme – lakken er hærdet.",
      "Undgå børstevask, især de første år, hvis du vil bevare glansen.",
      "Få lakken beskyttet med voks eller forsegling tidligt.",
      "Er bilen omlakeret, gælder andre regler: spørg lakereren.",
    ],
    sections: [
      {
        heading: "Hvornår må en ny bil vaskes?",
        paragraphs: [
          "Med det samme. Fabrikslak er ovnhærdet og fuldt færdig, når bilen forlader fabrikken. Rådet om at vente flere uger stammer fra en tid med andre laktyper og gælder i dag kun biler, der er blevet omlakeret på værksted.",
          "Tværtimod har en ny bil ofte brug for en vask. Den har stået på pladser, kørt på transporter og samlet støv og jernpartikler fra jernbane og havn.",
        ],
      },
      {
        heading: "Den første vask",
        paragraphs: [
          "Vask i hånden. Skyl, læg skum på, skyl igen, og vask derefter med en ren, blød vaskehandske og pH-neutral shampoo. Tør af med et rent mikrofiberhåndklæde.",
          "Det er ikke kompliceret, men det er afgørende, at alt, der rører lakken, er rent. De første svirvelridser kommer næsten altid fra en beskidt svamp eller en tur gennem børsterne i god tro.",
        ],
      },
      {
        heading: "Beskyt lakken tidligt",
        paragraphs: [
          "Ny lak er ubeskyttet. Voks eller en forsegling lægger et lag ovenpå, som tager imod sol, salt, fugleklatter og harpiks. Jo tidligere bilen får det, jo længere holder den sig som ny.",
          "Voks er den enkle løsning og fornyes nogle gange om året. En keramisk coating holder i år, men koster mere og kræver forarbejde. Begge dele er bedre end ingenting.",
        ],
      },
      {
        heading: "De første måneder",
        paragraphs: [
          "Læg en god vane fra starten: udvendig vask cirka en gang om måneden, fugleklatter væk samme dag, og voks ved årstidsskifte. Gør kabinen ren, før snavset sætter sig – nye sæder er lettere at holde pæne end at redde.",
          "Leaser du bilen, er det også en økonomisk fordel. En velholdt bil giver færre bemærkninger, når den skal afleveres.",
        ],
      },
    ],
    faqs: [
      {
        question: "Skal man vente med at vaske en ny bil?",
        answer: "Nej. Fabrikslak er hærdet og kan vaskes med det samme. Kun omlakerede dele skal have ro.",
      },
      {
        question: "Må en ny bil køres i vaskehal?",
        answer: "Den tager ikke skade første gang, men børster giver med tiden fine ridser. Håndvask bevarer glansen bedst.",
      },
      {
        question: "Skal en ny bil have voks?",
        answer: "Ja, gerne tidligt. Ny lak har ingen beskyttelse ud over klarlakken.",
      },
      {
        question: "Hvad er bedst til en ny bil: voks eller coating?",
        answer:
          "Coating holder længst og koster mest. Voks er billigt og effektivt, hvis det fornyes tre til fire gange om året.",
      },
    ],
    relatedPosts: ["keramisk-forsegling-eller-voks", "to-spands-metoden"],
    relatedLinks: [
      { label: "Bilvask med voks", href: route("/bilvask-med-voks") },
      { label: "Håndvask af bil", href: route("/haandvask-bil-koebenhavn") },
      { label: "Bilvask af leasingbil", href: route("/bilvask-leasingbil") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "lakrens-og-clay-bar",
    title: "Lakrens med ler: hvad er clay bar, og hvornår er det nødvendigt?",
    metaTitle: "Lakrens og clay bar – hvad er det?",
    description:
      "Føles lakken ru, selvom bilen er nyvasket? Så sidder der fastgroet snavs. Læs hvad lakrens med ler er, hvordan det virker, og hvornår det giver mening.",
    category: "Lak og finish",
    keywords: ["lakrens", "clay bar", "ru lak", "ler til bil", "dekontaminering af lak"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/service/udenfor.jpg", alt: "Rengøring af billak før lakrens" },
    intro: [
      "Stryg hånden hen over en nyvasket motorhjelm. Føles den glat som glas, er alt godt. Føles den som fint sandpapir, sidder der noget i lakken, som vasken ikke har fjernet.",
      "Det kaldes bundet forurening, og det fjernes med lakrens – ofte med et stykke rensende ler, på engelsk clay bar.",
    ],
    keyTakeaways: [
      "Lakrens fjerner partikler, der sidder fast i klarlakken efter vask.",
      "Posetesten afslører, om din bil har brug for det.",
      "Leret skal altid bruges med glidemiddel – ellers ridser det.",
      "Bagefter er lakken helt ubeskyttet og skal have voks.",
    ],
    sections: [
      {
        heading: "Hvad sidder der i lakken?",
        paragraphs: [
          "Flyverust fra bremser og tog, tjærerester, harpiks, industrinedfald og sprøjtetåge fra maling. Det er partikler, der har sat sig fast i overfladen og stikker en anelse op.",
          "De gør lakken ru, får den til at se mat ud og forhindrer voks i at binde ordentligt. Vand og sæbe glider hen over dem.",
        ],
      },
      {
        heading: "Posetesten",
        paragraphs: [
          "Vask og tør bilen. Stik hånden i en tynd plastpose, og lad fingerspidserne glide let hen over lakken. Posen forstærker følesansen. Kan du mærke små knopper, er der bundet forurening.",
          "Prøv flere steder. Motorhjelm, tag og området bag hjulene er typisk værst.",
        ],
      },
      {
        heading: "Sådan virker leret",
        paragraphs: [
          "Rensende ler er en blød, formbar masse. Den glider hen over lakken på et lag glidemiddel og griber fat i de partikler, der stikker op. De trækkes ud og bliver siddende i leret.",
          "Glidemidlet er afgørende. Uden det hænger leret i og laver ridser. Leret foldes løbende, så en ren flade vender ud. Taber man det på jorden, skal det kasseres.",
        ],
      },
      {
        heading: "Hvornår er det nødvendigt?",
        paragraphs: [
          "Ikke ved hver vask. En til to gange om året er passende for de fleste biler – typisk om foråret efter vinterens salt og bremsestøv. Det er også det rigtige forarbejde før voks, forsegling eller polering.",
          "Lakrens fjerner al gammel voks. Lakken skal derfor altid beskyttes bagefter.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvad er en clay bar?",
        answer: "Et stykke rensende ler, der sammen med et glidemiddel trækker fastsiddende partikler ud af lakken.",
      },
      {
        question: "Fjerner lakrens ridser?",
        answer: "Nej. Lakrens fjerner forurening oven på og i overfladen. Ridser kræver polering.",
      },
      {
        question: "Kan ler ridse lakken?",
        answer: "Ja, hvis det bruges uden glidemiddel, eller hvis leret er beskidt. Brugt korrekt er det skånsomt.",
      },
      {
        question: "Hvor ofte skal en bil have lakrens?",
        answer: "En til to gange om året – eller når posetesten viser, at lakken er ru.",
      },
    ],
    relatedPosts: ["flyverust-hvad-er-det", "hvor-laenge-holder-bilvoks"],
    relatedLinks: [
      { label: "Bilvask med voks", href: route("/bilvask-med-voks") },
      { label: "Udvendig bilvask", href: route("/udvendig-bilvask-koebenhavn") },
      { label: "Bilvask efter vinter", href: route("/bilvask-efter-vinter") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "ridser-i-lakken-hvad-kan-fjernes",
    title: "Ridser i lakken: hvilke kan fjernes, og hvilke kan ikke?",
    metaTitle: "Ridser i lakken – hvad kan fjernes?",
    description:
      "Ikke alle ridser er ens. Lær negletesten, forstå lakkens lag, og find ud af, om din ridse kan poleres væk, dækkes eller skal lakeres.",
    category: "Lak og finish",
    keywords: ["ridser i lakken", "fjerne ridser bil", "kan ridser poleres væk", "ridse i klarlak", "stenslag lak"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/service/udenfor.jpg", alt: "Billak, der efterses for ridser efter vask" },
    intro: [
      "En ridse i lakken føles som en personlig fornærmelse. Men før du bestiller tid hos lakereren, er det værd at finde ud af, hvor dyb den er.",
      "Lak består af flere lag. Hvilket lag ridsen når ned i, afgør, hvad der kan gøres.",
    ],
    keyTakeaways: [
      "Lak har tre lag: grunder, farve og klarlak øverst.",
      "Hænger neglen ikke i ridsen, sidder den i klarlakken og kan ofte poleres væk.",
      "Kan du se en anden farve eller bart metal, skal der lakeres.",
      "Bart metal skal dækkes hurtigt, så det ikke ruster.",
    ],
    sections: [
      {
        heading: "Lakkens tre lag",
        paragraphs: [
          "Nederst sidder grunderen, som får lakken til at hæfte på pladen. I midten sidder farvelaget. Øverst ligger klarlakken – et gennemsigtigt lag, der giver glans og beskytter farven.",
          "Klarlakken er tykkest og tåler mest. De fleste hverdagsridser når aldrig igennem den.",
        ],
      },
      {
        heading: "Negletesten",
        paragraphs: [
          "Vask området, så du kan se, hvad der er ridse, og hvad der er snavs eller afsmitning. Lad derefter en fingernegl glide let på tværs af ridsen.",
          "Glider neglen over uden at hænge, er ridsen overfladisk. Hænger neglen i, er den dybere. Ser du hvidt, gråt eller metal i bunden, er den gået gennem farvelaget.",
        ],
      },
      {
        heading: "Hvad kan gøres ved hver type?",
        paragraphs: [
          "Svirvelridser og lette mærker i klarlakken kan poleres væk. Polering fjerner et mikroskopisk lag klarlak, så overfladen bliver plan igen. Voks kan dæmpe dem midlertidigt ved at fylde dem optisk.",
          "Dybere ridser, der stadig sidder i klarlakken, kan ofte forbedres meget, men ikke altid fjernes helt. Ridser gennem farven kræver reparationslak eller en lakerer. Meget af det, der ligner ridser, er faktisk afsmitning fra en anden bil eller en pullert – det kan ofte fjernes helt.",
        ],
      },
      {
        heading: "Stenslag og bart metal",
        paragraphs: [
          "Et stenslag er en lille ridse, der er gået hele vejen ned. Er der bart metal, begynder det at ruste, så snart det bliver vådt. En lakstift i bilens farvekode koster ikke meget og stopper udviklingen.",
          "Det er en god grund til at holde bilen ren. Under et lag vejsnavs opdager man først stenslaget, når rusten er begyndt.",
        ],
      },
    ],
    faqs: [
      {
        question: "Kan ridser i lakken poleres væk?",
        answer: "Ja, hvis de kun sidder i klarlakken. Dybere ridser kræver reparationslak eller lakering.",
      },
      {
        question: "Hvordan ved jeg, hvor dyb en ridse er?",
        answer: "Brug negletesten. Hænger neglen ikke i, er ridsen overfladisk.",
      },
      {
        question: "Fjerner voks ridser?",
        answer: "Nej. Voks kan gøre fine ridser mindre synlige i en periode, men fjerner dem ikke.",
      },
      {
        question: "Tilbyder CleanWash polering?",
        answer: "Polering er ikke en fast pakke i bookingen. Kontakt os, hvis du vil have en vurdering af din bil.",
      },
    ],
    relatedPosts: ["svirvelridser-automatisk-bilvask-eller-haandvask", "saadan-holder-du-en-sort-bil-paen"],
    relatedLinks: [
      { label: "Håndvask af bil", href: route("/haandvask-bil-koebenhavn") },
      { label: "Polering af bil", href: route("/polering-bil-koebenhavn") },
      { label: "Bilvask med voks", href: route("/bilvask-med-voks") },
      { label: "Kontakt", href: route("/kontakt") },
    ],
  },
  {
    slug: "fjern-klistermaerker-og-lim-fra-bilen",
    title: "Sådan fjerner du klistermærker og limrester fra bilen",
    metaTitle: "Fjern klistermærker og lim fra bilen",
    description:
      "Gamle klistermærker, parkeringsmærker og limrester kan fjernes uden ridser. Se fremgangsmåden for både ruder og lak.",
    category: "Lak og finish",
    keywords: ["fjern klistermærke bil", "limrester på bil", "fjerne lim fra lak", "klistermærke på rude", "fjern forhandlermærke"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/service/udenfor.jpg", alt: "Rengøring af bilrude og lak for limrester" },
    intro: [
      "Forhandlerens logo på bagklappen, en gammel parkeringslicens i forruden eller børnenes klistermærker på sideruden. Før eller siden skal de af.",
      "Det er let at gøre uden skader, hvis man husker to ting: varme og tålmodighed.",
    ],
    keyTakeaways: [
      "Varme blødgør limen, så mærket kan trækkes af i ét stykke.",
      "Træk langsomt og fladt – ikke lige ud fra overfladen.",
      "Limrester opløses med limfjerner eller isopropylalkohol.",
      "Brug aldrig barberblad på lak, og pas på varmetråde i bagruden.",
    ],
    sections: [
      {
        heading: "Trin 1: varm mærket op",
        paragraphs: [
          "Brug en hårtørrer på mellem varme i et minuts tid. Hold den i bevægelse. Limen bliver blød, og mærket slipper lettere. På en varm sommerdag kan solen gøre arbejdet.",
          "Brug ikke varmepistol tæt på lak eller plast. Den bliver hurtigt varm nok til at skade.",
        ],
      },
      {
        heading: "Trin 2: træk det af",
        paragraphs: [
          "Løft et hjørne med en negl eller en plastskraber. Træk mærket bagover i en flad vinkel, tæt på overfladen. Går det i stykker, så varm op igen.",
          "På glas må du gerne bruge et skraberblad i en flad vinkel på en våd rude. På lak må du ikke. Og på bagruden skal du holde bladet væk fra varmetrådene – de er trykt på indersiden og kan skrabes over.",
        ],
      },
      {
        heading: "Trin 3: fjern limresterne",
        paragraphs: [
          "Tilbage sidder som regel en klistret film. Kom limfjerner eller isopropylalkohol på en blød klud, og lad den ligge på resten et øjeblik. Tør af i rolige strøg, og gentag.",
          "Gnid ikke hårdt. Limen samler støv, og du risikerer at ridse lakken. På ulakeret plast kan opløsningsmidler misfarve, så prøv først et skjult sted.",
        ],
      },
      {
        heading: "Skyggen af et gammelt mærke",
        paragraphs: [
          "Har mærket siddet i mange år, kan lakken nedenunder være mørkere end resten, fordi den har været beskyttet mod solen. Den forskel kan ikke vaskes væk. En polering af området kan udligne den noget.",
          "Vask og voks området til sidst. Opløsningsmidlet har fjernet den beskyttelse, der var.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvordan fjerner man et klistermærke fra billak?",
        answer: "Varm det op med en hårtørrer, træk det langsomt af, og fjern limresterne med limfjerner på en blød klud.",
      },
      {
        question: "Må man bruge barberblad på bilen?",
        answer: "Kun på glas og kun på en våd rude. Aldrig på lak, og ikke hen over varmetrådene i bagruden.",
      },
      {
        question: "Hvad opløser limrester?",
        answer: "Limfjerner til bil eller isopropylalkohol. Vask og voks området bagefter.",
      },
      {
        question: "Kan forhandlerens logo fjernes?",
        answer: "Ja. Det er som regel et klistermærke eller et limet skilt og kan fjernes på samme måde.",
      },
    ],
    relatedPosts: ["fjern-harpiks-fra-bilen", "rene-bilruder-uden-striber"],
    relatedLinks: [
      { label: "Udvendig bilvask", href: route("/udvendig-bilvask-koebenhavn") },
      { label: "Klargøring til salg", href: route("/klargoering-bil-salg") },
      { label: "Bilvask med voks", href: route("/bilvask-med-voks") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "falmet-plastik-paa-bilen",
    title: "Falmet plastik på bilen: derfor bliver den grå, og det kan du gøre",
    metaTitle: "Falmet plastik på bilen – sådan reddes den",
    description:
      "Sorte plastlister og skærmkanter bliver grå og hvidplettede med tiden. Se hvorfor det sker, hvordan du får farven tilbage, og hvordan du undgår voksmærker.",
    category: "Lak og finish",
    keywords: ["falmet plastik bil", "grå plastik bil", "sort plast pleje", "voks på plastik", "plastlister bil"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/home/vinyl.jpg", alt: "Pleje af plast- og vinylflader på bil" },
    intro: [
      "Kofangerlister, skærmkanter, spejlhuse og viskerarme i ufarvet plast er dybsorte, når bilen er ny. Fem år senere er de grå og kridtede.",
      "Det får hele bilen til at se ældre ud, end den er. Heldigvis er det noget af det nemmeste at forbedre.",
    ],
    keyTakeaways: [
      "Sollys nedbryder plastens overflade og trækker farven ud.",
      "Hvide pletter på plast er ofte indtørret voks eller polermiddel.",
      "Rens plasten grundigt, før du plejer den.",
      "Et plejemiddel med UV-beskyttelse holder farven længere.",
    ],
    sections: [
      {
        heading: "Hvorfor falmer plasten?",
        paragraphs: [
          "Ulakeret plast har ingen klarlak til at beskytte sig. UV-lys nedbryder det yderste lag, og de stoffer, der holder plasten smidig og sort, forsvinder. Tilbage står en tør, porøs overflade, der ser grå ud.",
          "Stærke vaskemidler og affedtere fremskynder processen. Det samme gør gentagne ture i vaskehaller med aggressive kemikalier.",
        ],
      },
      {
        heading: "De hvide pletter",
        paragraphs: [
          "Har plasten hvide skjolder eller striber, er det næsten altid voks eller polermiddel, der er kommet på ved en fejl og er tørret ind i porerne. Det sidder godt fast.",
          "En blød børste, lidt universalrens og tålmodighed får det meste op. Et viskelæder kan tage de sidste rester i struktureret plast.",
        ],
      },
      {
        heading: "Sådan får du farven tilbage",
        paragraphs: [
          "Rens først. Plejemiddel oven på snavs holder ikke. Vask plasten med shampoo og en børste, så den er ren helt ned i strukturen, og lad den tørre.",
          "Påfør derefter et plejemiddel til udvendig plast med en svamp. Arbejd det ind, og tør overskuddet af. De bedste midler trænger ind og holder i måneder. De billigste er silikoneolier, der ser flotte ud i en uge og vaskes af i første regnskyl.",
        ],
      },
      {
        heading: "Forebyggelse",
        paragraphs: [
          "Hold voks væk fra plasten, eller dæk den af, når bilen vokses. Giv plasten et plejemiddel et par gange om året. Og parkér i skygge, når du kan – solen er hovedårsagen.",
          "Indvendigt gælder det samme for instrumentbræt og paneler. Her hedder behandlingen vinylpleje.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvorfor bliver sort plastik på bilen grå?",
        answer: "Fordi sollys nedbryder overfladen. Plasten tørrer ud og mister farven.",
      },
      {
        question: "Hvordan fjerner man voks fra plastik?",
        answer: "Med universalrens og en blød børste. Et rent viskelæder kan tage de sidste rester.",
      },
      {
        question: "Kan falmet plast blive sort igen?",
        answer: "Ja, i de fleste tilfælde med grundig rens og et godt plejemiddel. Meget nedbrudt plast kan kræve gentagne behandlinger.",
      },
      {
        question: "Hvor længe holder plastpleje?",
        answer: "Fra en uge til flere måneder afhængigt af produktet og vejret.",
      },
    ],
    relatedPosts: ["hvor-laenge-holder-bilvoks", "rengoering-af-skaerm-og-pianolak"],
    relatedLinks: [
      { label: "Vinylpleje", href: route("/vinylpleje-bil") },
      { label: "Udvendig bilvask", href: route("/udvendig-bilvask-koebenhavn") },
      { label: "Bilvask af Toyota", href: route("/bilvask-toyota") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "forvask-og-skum-hvorfor",
    title: "Forvask og skum: derfor er det første trin det vigtigste",
    metaTitle: "Forvask med skum – hvorfor er det vigtigt?",
    description:
      "Forvask løsner snavset, før noget rører lakken. Læs hvorfor skum og skylning er det, der afgør, om en bilvask giver ridser eller ej.",
    category: "Viden om bilvask",
    keywords: ["forvask bil", "skumvask bil", "snow foam", "forvask skum", "undgå ridser ved bilvask"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/service/udenfor.jpg", alt: "Forvask af bil med skum før håndvask" },
    intro: [
      "De fleste tror, at en bil bliver ren, når man gnider på den. Professionelle ved, at den bliver ren, før man rører den.",
      "Forvasken er det trin, der skiller en skånsom vask fra en, der langsomt ødelægger lakken.",
    ],
    keyTakeaways: [
      "Ridser opstår, når sand og støv trækkes hen over lakken.",
      "Forvask fjerner det meste snavs uden berøring.",
      "Skum virker ved at blive siddende og bløde snavset op.",
      "Jo mere der skylles af i forvasken, jo mindre er der til at ridse.",
    ],
    sections: [
      {
        heading: "Problemet med at gå direkte til svampen",
        paragraphs: [
          "En beskidt bil er dækket af et lag støv, sand og vejfilm. Sætter du en våd svamp på det, bliver de hårde partikler klemt mellem svamp og lak og trukket rundt. Hver bevægelse laver bittesmå ridser.",
          "Én vask gør ingen skade, man kan se. Halvtreds vaske gør. Det er sådan, en blank lak bliver mat over nogle år.",
        ],
      },
      {
        heading: "Hvad forvasken gør",
        paragraphs: [
          "Først skylles bilen, så det løse støv forsvinder. Derefter lægges der skum på. Skummet hænger på lakken i nogle minutter. I den tid trænger det ind under snavset, opløser fedt og vejfilm og løfter partiklerne fri.",
          "Når skummet skylles af, tager det størstedelen af snavset med sig. Det, der er tilbage, er en tynd film, som vaskehandsken kan fjerne uden at slæbe sand rundt.",
        ],
      },
      {
        heading: "Hvorfor skum og ikke bare sæbevand?",
        paragraphs: [
          "Sæbevand løber af lodrette flader på sekunder. Skum bliver hængende. Det giver kontakttid, og det er tiden, der gør arbejdet.",
          "Skummet må ikke tørre ind. Derfor forvasker man i skygge og arbejder ikke på en varm bil. Hjulbuer, fælge og de nederste paneler får en ekstra omgang, fordi de er mest tilsmudsede.",
        ],
      },
      {
        heading: "Sådan gør vi",
        paragraphs: [
          "Hos CleanWash begynder enhver udvendig vask med skyl og skum. Det er ikke for syns skyld. Det er grunden til, at en håndvask kan være skånsommere end en vaskehal, selvom begge dele rører lakken.",
          "Vasker du selv, er rådet det samme: brug mere tid på at skylle og mindre på at gnide.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvad er forvask?",
        answer: "Det første trin i en bilvask, hvor snavs løsnes og skylles af med vand og skum, før lakken berøres.",
      },
      {
        question: "Er skum nødvendigt?",
        answer: "Det er den mest effektive måde at løsne snavs uden berøring, fordi skummet bliver siddende på lakken.",
      },
      {
        question: "Kan forvask erstatte selve vasken?",
        answer: "Nej. Den fjerner det meste, men en tynd film sidder tilbage og skal vaskes af i hånden.",
      },
      {
        question: "Hvor længe skal skummet sidde?",
        answer: "Nogle minutter – længe nok til at virke, men ikke så længe, at det tørrer ind.",
      },
    ],
    relatedPosts: ["to-spands-metoden", "svirvelridser-automatisk-bilvask-eller-haandvask"],
    relatedLinks: [
      { label: "Håndvask af bil", href: route("/haandvask-bil-koebenhavn") },
      { label: "Udvendig bilvask", href: route("/udvendig-bilvask-koebenhavn") },
      { label: "Mobil bilvask", href: route("/mobil-bilvask") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "to-spands-metoden",
    title: "To-spands-metoden: den enkleste måde at undgå ridser på",
    metaTitle: "To-spands-metoden – bilvask uden ridser",
    description:
      "To spande, én til sæbe og én til skyl, holder sandet væk fra lakken. Se hvordan metoden virker, og hvorfor professionelle bruger den.",
    category: "Viden om bilvask",
    keywords: ["to-spands-metoden", "to spande bilvask", "vask bil uden ridser", "vaskehandske bil", "korrekt håndvask bil"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/home/wash-tire.jpg", alt: "Håndvask af bil med børste og sæbevand" },
    intro: [
      "Den klassiske bilvask med én spand og en svamp har en indbygget fejl. Efter første dyp er vandet beskidt. Derefter vasker man bilen i sit eget snavs.",
      "Løsningen koster en ekstra spand.",
    ],
    keyTakeaways: [
      "Én spand med shampoo, én med rent vand til at skylle handsken.",
      "Skyl handsken efter hvert panel, før den dyppes i sæben igen.",
      "Brug en vaskehandske i mikrofiber eller uld – ikke en svamp.",
      "Vask oppefra og ned, og tag de beskidte dele til sidst.",
    ],
    sections: [
      {
        heading: "Sådan virker det",
        paragraphs: [
          "Du har to spande. Den ene indeholder vand med bilshampoo. Den anden indeholder rent vand. Du dypper handsken i sæben, vasker et panel og skyller handsken i det rene vand, før den kommer tilbage i sæben.",
          "På den måde ender sand og snavs i skyllespanden. Sæbespanden forbliver ren hele vasken igennem.",
        ],
      },
      {
        heading: "Risten i bunden",
        paragraphs: [
          "Mange lægger en rist i bunden af spandene. Når handsken gnides mod risten, falder partiklerne ned under den og bliver dér. Uden rist hvirvles de op igen, hver gang man dypper.",
          "Det er en lille ting, men den gør forskellen mærkbar, især på mørke biler.",
        ],
      },
      {
        heading: "Handske frem for svamp",
        paragraphs: [
          "En flad svamp har ingen steder at gøre af snavset. Det ligger mellem svamp og lak. En vaskehandske med lange fibre trækker partiklerne op i fibrene, væk fra overfladen.",
          "Brug gerne to handsker: én til de øverste to tredjedele af bilen og én til de nederste paneler, dørtrin og kofangere, hvor det grove snavs sidder.",
        ],
      },
      {
        heading: "Rækkefølgen",
        paragraphs: [
          "Start med fælgene, med deres egen børste og spand. Forvask derefter hele bilen. Vask så tag, ruder, motorhjelm og de øverste sider. Slut med de nederste dele. Skyl løbende, så sæben ikke tørrer ind.",
          "Det er den fremgangsmåde, professionelle følger. Den tager lidt længere tid end en hurtig omgang med svampen – og den er grunden til, at lakken stadig er blank efter ti år.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvad er to-spands-metoden?",
        answer: "En vaskemetode med én spand til sæbevand og én til at skylle vaskehandsken, så snavs ikke kommer tilbage på lakken.",
      },
      {
        question: "Hvorfor ikke bruge en svamp?",
        answer: "En svamp holder snavset mod lakken. En vaskehandske med lange fibre trækker det væk fra overfladen.",
      },
      {
        question: "Er to spande nok til at undgå ridser?",
        answer: "Det hjælper meget, men forvask og korrekt aftørring er lige så vigtige.",
      },
      {
        question: "Hvor ofte skal skyllevandet skiftes?",
        answer: "Når det er tydeligt beskidt. På en meget snavset bil kan det være nødvendigt undervejs.",
      },
    ],
    relatedPosts: ["forvask-og-skum-hvorfor", "mikrofiberklude-til-bilen"],
    relatedLinks: [
      { label: "Håndvask af bil", href: route("/haandvask-bil-koebenhavn") },
      { label: "Bilvask hjemme", href: route("/bilvask-hjemme") },
      { label: "Udvendig bilvask", href: route("/udvendig-bilvask-koebenhavn") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "ph-neutral-bilshampoo",
    title: "pH-neutral bilshampoo: hvad betyder det, og hvorfor er det vigtigt?",
    metaTitle: "pH-neutral bilshampoo – hvad betyder det?",
    description:
      "Opvaskemiddel og stærke rensemidler fjerner voks og udtørrer lister. Læs hvad pH-neutral bilshampoo er, og hvornår der skal noget stærkere til.",
    category: "Viden om bilvask",
    keywords: ["pH-neutral bilshampoo", "bilshampoo", "opvaskemiddel bilvask", "bilvask sæbe", "skånsom bilshampoo"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/service/udenfor.jpg", alt: "Bilvask med skånsom, pH-neutral shampoo" },
    intro: [
      "Sæbe er sæbe, tænker mange, og griber opvaskemidlet. Det får bilen ren. Det fjerner også den voks, der skulle beskytte den.",
      "Forskellen ligger i pH-værdien.",
    ],
    keyTakeaways: [
      "pH 7 er neutralt. Lavere er surt, højere er basisk.",
      "pH-neutral shampoo fjerner snavs, men lader voks og forsegling sidde.",
      "Opvaskemiddel og affedter er basiske og fjerner beskyttelsen.",
      "Sure og basiske midler har deres plads – til bestemte opgaver.",
    ],
    sections: [
      {
        heading: "pH-skalaen kort",
        paragraphs: [
          "Skalaen går fra 0 til 14. Rent vand ligger på 7. Eddike og citron er sure og ligger lavt. Opvaskemiddel, affedter og mange vaskehalskemikalier er basiske og ligger højt.",
          "Jo længere et middel ligger fra 7, jo mere aggressivt er det – over for snavs og over for alt andet.",
        ],
      },
      {
        heading: "Hvad gør en neutral shampoo?",
        paragraphs: [
          "En pH-neutral bilshampoo er lavet til at løsne vejsnavs og samtidig lade voks, forsegling og coating være. Den indeholder også glidemidler, så vaskehandsken glider let hen over lakken.",
          "Den er skånsom ved gummilister, plast og krom, som stærke midler udtørrer eller misfarver over tid.",
        ],
      },
      {
        heading: "Hvorfor ikke opvaskemiddel?",
        paragraphs: [
          "Opvaskemiddel er skabt til at fjerne fedt. Voks er fedt. En enkelt vask fjerner ikke det hele, men nogle få gør. Derudover udtørrer det gummi og plast og mangler de glidemidler, der beskytter mod ridser.",
          "Det eneste tidspunkt, hvor det kan give mening, er, når man bevidst vil fjerne gammel voks, før der lægges ny beskyttelse på.",
        ],
      },
      {
        heading: "Hvornår skal der noget stærkere til?",
        paragraphs: [
          "Til bestemte opgaver. Basiske midler bruges til forvask af meget tilsmudsede biler og til motorrum. Sure midler opløser kalkpletter og bremsestøv. Men de bruges målrettet, kort og bliver skyllet af.",
          "Til den regelmæssige vask er pH-neutral shampoo det rigtige valg. Det er også den, der gør, at voks holder de måneder, den skal.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvad betyder pH-neutral?",
        answer: "At midlet hverken er surt eller basisk, men ligger omkring pH 7 ligesom rent vand.",
      },
      {
        question: "Kan man vaske bil i opvaskemiddel?",
        answer: "Bilen bliver ren, men voksen forsvinder, og gummi og plast udtørres. Det frarådes til almindelig vask.",
      },
      {
        question: "Fjerner pH-neutral shampoo voks?",
        answer: "Nej, ikke i nævneværdig grad. Det er netop pointen med den.",
      },
      {
        question: "Er pH-neutral shampoo stærk nok til en meget beskidt bil?",
        answer: "Sammen med en god forvask ja. Til tjære, harpiks og bremsestøv skal der særlige midler til.",
      },
    ],
    relatedPosts: ["hvor-laenge-holder-bilvoks", "forvask-og-skum-hvorfor"],
    relatedLinks: [
      { label: "Bilvask med voks", href: route("/bilvask-med-voks") },
      { label: "Håndvask af bil", href: route("/haandvask-bil-koebenhavn") },
      { label: "Miljø og ansvar", href: route("/miljoe") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "mikrofiberklude-til-bilen",
    title: "Mikrofiberklude til bilen: derfor er kluden vigtigere end midlet",
    metaTitle: "Mikrofiberklude til bil – guide",
    description:
      "En forkert klud ridser lak og ruder. Læs hvorfor mikrofiber er skånsomt, hvilke klude du skal bruge til hvad, og hvordan de skal vaskes.",
    category: "Viden om bilvask",
    keywords: ["mikrofiberklude bil", "mikrofiberklud lak", "aftørring bil", "vaskeskind eller mikrofiber", "vask af mikrofiberklude"],
    publishedAt: published,
    updatedAt: published,
    readingMinutes: 4,
    coverImage: { src: "/home/vinyl.jpg", alt: "Aftørring af bilens flader med blød klud" },
    intro: [
      "Man kan have de bedste produkter i verden og stadig ridse bilen, hvis kluden er forkert. Et gammelt håndklæde, en T-shirt eller køkkenrulle er alle hårdere, end de føles.",
      "Mikrofiber er standarden i professionel bilpleje. Her er hvorfor – og hvordan du bruger det.",
    ],
    keyTakeaways: [
      "Mikrofiber har fine, spaltede fibre, der løfter snavs i stedet for at skubbe det.",
      "Brug forskellige klude til lak, ruder, kabine og fælge.",
      "Vask kludene uden skyllemiddel og ved lav temperatur.",
      "En klud, der har ligget på jorden, hører ikke hjemme på lakken.",
    ],
    sections: [
      {
        heading: "Hvad er mikrofiber?",
        paragraphs: [
          "Mikrofiber er syntetiske fibre, der er langt tyndere end et hår og spaltet på langs. Det giver en enorm overflade og små kanaler, som suger vand og fanger partikler.",
          "Bomuldsfibre er runde og glatte. De skubber snavset foran sig. Køkkenrulle er træfibre og ridser både lak, blank plast og skærme.",
        ],
      },
      {
        heading: "Den rigtige klud til opgaven",
        paragraphs: [
          "Tykke, langhårede klude er til lak: aftørring, voks og detailspray. De har plads til at gemme partikler væk fra overfladen. Store, vaffelvævede håndklæder er bedst til at tørre en våd bil.",
          "Tynde, glatte klude er til ruder, hvor fnug er fjenden. Almindelige korthårede klude er til kabinens flader. Og fælge og dørkarme får deres egne klude, som aldrig bruges andre steder.",
        ],
      },
      {
        heading: "Farvekoder holder styr på det",
        paragraphs: [
          "Professionelle bruger faste farver til faste opgaver. Det forhindrer, at en klud med bremsestøv ender på lakken, eller at en klud med plejemiddel smører ruden til. Derhjemme er to–tre farver nok.",
        ],
      },
      {
        heading: "Sådan vasker du dem",
        paragraphs: [
          "Vask mikrofiber for sig, ved 40 til 60 grader, med flydende vaskemiddel og uden skyllemiddel. Skyllemiddel lægger en film i fibrene, så kluden ikke længere suger. Tør dem ved lav varme eller på snor.",
          "Kassér en klud til lak, når den er blevet stiv, eller hvis den har ligget på jorden. Den kan få et nyt liv til fælge og motorrum.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvorfor er mikrofiber bedre end et vaskeskind?",
        answer: "Mikrofiber løfter partikler op i fibrene. Et vaskeskind er fladt og trækker dem hen over lakken.",
      },
      {
        question: "Kan man bruge køkkenrulle til bilruder?",
        answer: "Det frarådes. Papir fnugger og kan ridse, især blank plast og skærme.",
      },
      {
        question: "Må mikrofiberklude vaskes med skyllemiddel?",
        answer: "Nej. Skyllemiddel tilstopper fibrene, så kluden mister sin sugeevne.",
      },
      {
        question: "Hvor mange klude skal man bruge til en bil?",
        answer: "Mindst fire: én til aftørring af lak, én til ruder, én til kabinen og én til fælge.",
      },
    ],
    relatedPosts: ["to-spands-metoden", "rene-bilruder-uden-striber"],
    relatedLinks: [
      { label: "Håndvask af bil", href: route("/haandvask-bil-koebenhavn") },
      { label: "Bilrengøring", href: route("/bilrengoering") },
      { label: "Udvendig bilvask", href: route("/udvendig-bilvask-koebenhavn") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
];
