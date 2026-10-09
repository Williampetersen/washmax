import type { Route } from "next";
import type { BlogPost } from "@/lib/blog-posts";

const route = (href: string) => href as Route;

export const udvendigBlogPosts: BlogPost[] = [
  {
    slug: "kan-man-vaske-bilen-i-frostvejr",
    title: "Kan man vaske bilen i frostvejr? Sådan gør du det uden at fryse dørene fast",
    metaTitle: "Vask bilen i frostvejr? Sådan gør du",
    description:
      "Vejsalt skader bilen, men vand og frost er en risikabel kombination. Se, hvornår du kan vaske bilen om vinteren, og hvordan du undgår fastfrosne dørgummier.",
    category: "Bilpleje",
    keywords: [
      "vaske bil i frostvejr",
      "bilvask om vinteren",
      "vejsalt bil",
      "fastfrosne dørgummier",
      "vask bil vinter",
    ],
    publishedAt: "2026-10-09",
    updatedAt: "2026-10-09",
    readingMinutes: 7,
    coverImage: {
      src: "/service/udenfor.jpg",
      alt: "Udvendig bilvask af lak og fælge i koldt vejr",
    },
    intro: [
      "Hver vinter dukker det samme spørgsmål op: Er det overhovedet en god idé at vaske bilen, når det fryser? Svaret er både ja og nej. Vejsalt og snavs gør mest skade, når de får lov at sidde på bilen i ugevis, men vand i frostvejr kan fryse fast i lås, dørgummier og bremser, hvis du ikke tager højde for det.",
      "I denne guide får du en praktisk gennemgang af, hvornår det giver mening at vaske bilen om vinteren, hvad du skal passe på, og hvordan du får vandet væk igen, før det kan nå at fryse.",
    ],
    keyTakeaways: [
      "Vejsalt bidrager til rustdannelse, så det er bedre at skylle bilen af jævnligt end at lade saltet sidde hele vinteren.",
      "Undgå at vaske bilen, når temperaturen ligger under frysepunktet, medmindre du kan tørre og køre bilen bagefter.",
      "Dørgummier, låse, hjulbuer og bremser er de steder, hvor vand oftest fryser fast.",
      "Tør tætningslister og dørkanter af med en klud og lad bilen køre en tur, så bremserne bliver tørre.",
      "Vælg en tør dag med plusgrader, hvis du kan. Det giver det bedste resultat med mindst risiko.",
    ],
    sections: [
      {
        heading: "Hvorfor vejsalt er et problem for bilen",
        paragraphs: [
          "Når vejene saltes i vinterhalvåret, havner saltet som en fin, fugtig belægning på lak, fælge, undervogn og hjulbuer. Salt i sig selv er ikke et lakfjerner, men det holder fugten tilbage og fremskynder rustdannelse, især i stenslag, ridser og skjulte falser, hvor lakken er tyndest.",
          "Problemet vokser, hvis bilen kun bliver vasket få gange om vinteren. Saltet får lov at arbejde i ugevis, og den hvide, støvede belægning, du ser på lakken efter en tør vinterdag, er netop tørret salt. Derfor er en afskylning med jævne mellemrum bedre for bilen end at vente til foråret.",
        ],
      },
      {
        heading: "Hvornår kan du vaske bilen om vinteren?",
        paragraphs: [
          "Den bedste tid er en dag med temperaturer over nul, hvor bilen kan nå at tørre, før natten kommer. Hvis du ved, at det fryser i løbet af aftenen, bør du undgå at gøre bilen våd, medmindre den kan stå indendørs eller du kan tørre de kritiske steder grundigt.",
          "Er det kun let frost om morgenen, men plusgrader i løbet af dagen, er det ofte fint at vaske midt på dagen. Det vigtigste er, at vandet ikke bliver stående i tætningslister, låse og fuger, når temperaturen falder igen.",
        ],
      },
      {
        heading: "De steder, hvor vand fryser fast",
        paragraphs: [
          "Dørgummier er den klassiske synder. Fugt, der er trængt ind mellem gummi og dørramme, kan fryse sammen, så døren sidder fast, og i værste fald rives gummiet itu, når du trækker i håndtaget. Det samme gælder bagklap, tankklap og motorhjelm.",
          "Låse og håndtag kan også fryse til, hvis der er kommet vand ind. Bremseklodser og skiver kan fryse fast, hvis bilen står stille natten over med våde bremser, og tørre ruder og vinduesviskere er også værd at tjekke, så viskerbladene ikke sidder fast i ruden.",
        ],
      },
      {
        heading: "Sådan vasker og tørrer du bilen i koldt vejr",
        paragraphs: [
          "Start med en grundig afskylning af hjulbuer, undervogn og lave partier, hvor salt og mudder samler sig mest. Vask derefter bilen oppefra og ned med en pH-neutral bilshampoo og rene klude eller handsker, så du ikke slæber grus rundt på lakken.",
          "Tør derefter bilen af med en blød mikrofiberklud, og brug særlig tid på dørkanter, tætningslister, låse og tankklap. Åbn og luk dørene et par gange, så eventuelt vand ikke får lov at sidde. Kør til sidst en lille tur og brug bremserne et par gange, så skiver og klodser bliver tørre.",
        ],
      },
      {
        heading: "Pleje af dørgummier og tætningslister",
        paragraphs: [
          "En let behandling af tætningslisterne med et gummipleje- eller silikonebaseret produkt gør det sværere for fugten at binde sig og fryse fast. Det kan også forlænge gummiets levetid, fordi det holder sig blødt og elastisk i stedet for at tørre ud.",
          "Gør det til en vane at behandle listerne, når du alligevel gør bilen ren, og især før de første frostnætter. Det er en lille indsats, der kan spare dig for en irriterende morgen med en dør, der ikke vil op.",
        ],
      },
      {
        heading: "Sådan klarer CleanWash vinterens bilvask",
        paragraphs: [
          "Hos CleanWash kommer vi til din adresse, så du ikke selv skal stå ude i kulden. Vi planlægger bilvasken efter vejret og tager højde for tørring af tætningslister og kritiske områder, så bilen er klar til at stå ude igen efter vasken.",
          "Vil du have et samlet overblik over bilens tilstand, når vinteren er slut, kan du læse vores guide til bilvask efter vinter. Her gennemgår vi, hvad der bør rengøres, når salt og snavs har siddet på bilen i flere måneder.",
        ],
      },
    ],
    faqs: [
      {
        question: "Er det farligt at vaske bilen, når det fryser?",
        answer:
          "Det er ikke farligt for lakken, men der er risiko for, at vand fryser fast i dørgummier, låse og bremser. Hvis du vasker i frostvejr, skal du tørre de kritiske steder grundigt og køre bilen en tur bagefter.",
      },
      {
        question: "Hvor ofte bør jeg vaske bilen om vinteren?",
        answer:
          "Det afhænger af, hvor meget bilen bruges, og hvor meget salt der ligger på vejene. Som tommelfingerregel er en afskylning hver anden til fjerde uge bedre end at vente til foråret.",
      },
      {
        question: "Hjælper det at skylle undervognen?",
        answer:
          "Ja. Undervognen og hjulbuerne samler det meste af saltet, og det er her, rust ofte begynder. En grundig skylning af de lave partier er en af de vigtigste dele af en vinterbilvask.",
      },
      {
        question: "Kan jeg få bilen vasket derhjemme om vinteren?",
        answer:
          "Ja. CleanWash tilbyder mobil bilvask på adressen, og vi planlægger efter vejret, så du ikke selv skal stå ude i kulden. Du kan booke online og få en fast pris.",
      },
    ],
    relatedPosts: ["fjern-fugleklatter-insekter-uden-at-ridse-lakken", "keramisk-forsegling-eller-voks"],
    relatedLinks: [
      { label: "Bilvask efter vinter", href: route("/bilvask-efter-vinter") },
      { label: "Mobil bilvask København", href: route("/mobil-bilvask-koebenhavn") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "saadan-rengoer-du-faelge-og-fjerner-bremsestoev",
    title: "Sådan rengør du fælge og fjerner bremsestøv uden at skade overfladen",
    metaTitle: "Rens fælge og fjern bremsestøv",
    description:
      "Bremsestøv brænder sig fast på fælgene. Få en trin-for-trin guide til sikker fælgrens, de typiske fejl og hvornår en professionel behandling giver mening.",
    category: "Guide",
    keywords: [
      "rens fælge",
      "fjern bremsestøv",
      "fælgrens",
      "rengøre alufælge",
      "bremsestøv på fælge",
    ],
    publishedAt: "2026-10-09",
    updatedAt: "2026-10-09",
    readingMinutes: 7,
    coverImage: {
      src: "/home/wash-tire.jpg",
      alt: "Rengøring af fælge og dæk ved bilvask",
    },
    intro: [
      "Fælgene er det sted på bilen, der bliver mest beskidt, og som tager mest skade af det. Bremsestøv består blandt andet af små metalpartikler, der varmes op, hver gang du bremser, og som brænder sig fast på overfladen, hvis de ikke bliver fjernet.",
      "Her gennemgår vi, hvad bremsestøv egentlig er, hvordan du rengør fælgene sikkert, og hvilke fejl du skal undgå, så du ikke ender med at ødelægge overfladen i forsøget på at gøre den ren.",
    ],
    keyTakeaways: [
      "Bremsestøv er metalpartikler og fedt fra bremseklodser og skiver, som sætter sig hårdt på fælgens overflade.",
      "Rengør altid fælgene, når de er kolde, og skyl grundigt før og efter, så rengøringsmidlet ikke tørrer ind.",
      "Brug et fælgrensmiddel, der passer til fælgtypen. Sure produkter kan skade nogle overflader.",
      "Brug separate børster og klude til fælge, så grus og metalstøv ikke kommer tilbage på lakken.",
      "Regelmæssig rengøring og en beskyttende behandling gør det nemmere at holde fælgene rene.",
    ],
    sections: [
      {
        heading: "Hvad er bremsestøv, og hvorfor sætter det sig så hårdt fast?",
        paragraphs: [
          "Når bremseklodserne gnider mod bremseskiven, slides der små partikler af begge dele. Partiklerne er varme, når de lander på fælgen, og de brænder sig delvist fast i lak eller overfladebehandling. Med tiden oxiderer metalpartiklerne og efterlader orange eller brune pletter, som kan se ud som små rustprikker.",
          "Jo længere støvet får lov at sidde, desto sværere er det at fjerne. På fælge, der aldrig bliver rengjort ordentligt, kan støvet ætse sig ind i overfladen og efterlade pletter, som en almindelig bilvask ikke kan få væk.",
        ],
      },
      {
        heading: "Hvad skal du bruge til fælgrens?",
        paragraphs: [
          "Du har brug for en spand med vand, en blød fælgbørste med lang skaft til de bageste dele af fælgen, en lille børste til skruehuller og et fælgrensmiddel. Vælg et produkt, der er pH-neutralt, hvis du er i tvivl om fælgtypen. Det er mildere ved lakerede og polerede overflader.",
          "Brug aldrig de samme klude og børster til fælge og lak. Fælgene er fulde af grus og metalpartikler, og de partikler kan efterlade ridser på lakken, hvis de følger med videre til resten af bilen.",
        ],
      },
      {
        heading: "Sådan rengør du fælgene trin for trin",
        paragraphs: [
          "Start med at skylle fælgene med koldt vand for at få det løse snavs væk. Sørg for, at fælgene er kolde, for ellers fordamper rengøringsmidlet for hurtigt og kan efterlade pletter. Sprøjt derefter fælgrens på og lad det virke i den tid, produktet angiver, uden at lade det tørre ind.",
          "Børst fælgen grundigt, både forsiden, indersiden og mellem egerne, og skyl det hele af med rigeligt vand. Gentag om nødvendigt, hvis fælgene er meget snavsede. Afslut med at tørre fælgene og tjek, at der ikke er rester, der sidder tilbage.",
        ],
      },
      {
        heading: "Jernfjerner og kraftig rens: hvornår er det relevant?",
        paragraphs: [
          "Sidder der fastbrændte metalpartikler tilbage, kan en jernfjerner hjælpe. Produktet reagerer med jernet og skifter ofte farve til lilla, mens det opløser partiklerne, så de kan skylles væk. Det er en effektiv metode, men kræver, at du følger vejledningen og skyller grundigt.",
          "Brug aldrig stærke, sure produkter på fælge, hvis du ikke ved, hvad de er lavet af. Nogle overflader, som polerede eller lakerede alufælge, kan blive matte eller misfarvede af forkert rengøring.",
        ],
      },
      {
        heading: "Typiske fejl, du bør undgå",
        paragraphs: [
          "Den mest almindelige fejl er at rengøre varme fælge direkte efter en køretur. Varmen får rengøringsmidlet til at tørre ind og efterlade pletter, og det kan også skabe uønskede reaktioner på overfladen. Vent altid, til fælgene er afkølede.",
          "En anden fejl er at bruge for hårde børster eller slibende svampe, som ridser fælgens overflade. Lad være med at blande forskellige rengøringsmidler, og skyl altid grundigt, så kemikalierne ikke bliver siddende i skruehuller og sprækker.",
        ],
      },
      {
        heading: "Sådan hjælper CleanWash med fælgene",
        paragraphs: [
          "Hos CleanWash er rengøring af fælge en fast del af den udvendige bilvask, og du kan også vælge fælgrens som tilvalg, hvis fælgene har brug for ekstra opmærksomhed. Vi bruger metoder og produkter, der er skånsomme mod overfladen.",
          "Er fælgene meget slidte eller har dybe pletter, kan en polering eller beskyttende behandling give et pænere resultat. Kontakt os, så finder vi den rigtige løsning til din bil.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvor ofte bør man rengøre fælgene?",
        answer:
          "Som udgangspunkt hver gang bilen vaskes. Er du ofte ude at køre på motorvej eller i bytrafik med meget bremsning, kan det være en god idé at gøre det oftere.",
      },
      {
        question: "Kan almindelig sæbe fjerne bremsestøv?",
        answer:
          "Til let snavs ja, men fastbrændt bremsestøv kræver ofte et dedikeret fælgrensmiddel eller en jernfjerner for at blive fjernet helt.",
      },
      {
        question: "Kan fælgrens ødelægge fælgene?",
        answer:
          "Forkerte produkter kan, især sure midler på polerede eller lakerede overflader. Vælg et produkt, der passer til din fælgtype, og læs vejledningen.",
      },
      {
        question: "Kan I rengøre fælge hos mig derhjemme?",
        answer:
          "Ja. CleanWash tilbyder mobil bilvask på din adresse i København og på Sjælland, og fælgrens kan vælges som tilvalg i bookingen.",
      },
    ],
    relatedPosts: ["kan-man-vaske-bilen-i-frostvejr", "keramisk-forsegling-eller-voks"],
    relatedLinks: [
      { label: "Håndvask af bil København", href: route("/haandvask-bil-koebenhavn") },
      { label: "Polering af bil København", href: route("/polering-bil-koebenhavn") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "skal-motorrummet-vaskes",
    title: "Skal motorrummet vaskes? Fordele, risici og den sikre metode",
    metaTitle: "Skal motorrummet vaskes? Risici og metode",
    description:
      "Et rent motorrum afslører lækager og pynter ved salg, men forkert vask kan skade elektronikken. Se, hvornår det giver mening, og hvordan det gøres sikkert.",
    category: "Guide",
    keywords: [
      "vaske motorrum",
      "motorvask bil",
      "rengøre motor",
      "motorrum rens",
      "vask motor før salg",
    ],
    publishedAt: "2026-10-09",
    updatedAt: "2026-10-09",
    readingMinutes: 6,
    coverImage: {
      src: "/home/motorvask.png",
      alt: "Rengøring af motorrum på personbil",
    },
    intro: [
      "Motorrummet er det sted på bilen, de fleste aldrig rører ved. Det samler støv, olie, insekter og blade, og med tiden bliver det så beskidt, at det kan være svært at se, hvad der foregår under motorhjelmen. Men skal man overhovedet vaske motorrummet?",
      "Svaret er, at det kan give mening i nogle situationer, men at det også er en opgave, hvor forkerte valg kan koste dyrt. Her gennemgår vi fordele, risici og den sikre fremgangsmåde.",
    ],
    keyTakeaways: [
      "Et rent motorrum gør det lettere at spotte olielækager og andre fejl tidligt.",
      "Det kan give et pænere indtryk ved salg, men er ikke nødvendigt for hverdagsbrug.",
      "Elektronik, stik, sikringsbokse og luftindtag må ikke udsættes for kraftigt vand.",
      "Brug lavt tryk, afdæk følsomme dele og lad motoren være kold eller kun let varm.",
      "Er du i tvivl, er det bedre at lade en professionel gøre det eller springe det over.",
    ],
    sections: [
      {
        heading: "Hvorfor vaske motorrummet?",
        paragraphs: [
          "Det mest praktiske argument er, at et rent motorrum gør det lettere at opdage lækager. Olie og kølervæske, der siver ud, ses tydeligere mod en ren baggrund end mod et lag af gammelt snavs. Det kan hjælpe både dig selv og værkstedet med at finde fejl hurtigere.",
          "Et andet argument er salgsværdien. En bil med et pænt og rent motorrum signalerer, at den har været passet, og det kan give en bedre første fornemmelse hos en potentiel køber. Til hverdagsbrug er det derimod sjældent nødvendigt.",
        ],
      },
      {
        heading: "Risici ved at vaske motorrummet",
        paragraphs: [
          "Moderne motorer er fyldt med elektronik. Sensorer, stik, tændspoler, sikringsbokse og styreenheder tåler ikke altid vand, og fugt, der trænger ind i stik, kan give fejlmeldinger eller start-problemer, som først viser sig dage senere.",
          "Højt tryk er særligt risikabelt, fordi vandet kan presses forbi tætninger og ind i komponenter, der ikke er beregnet til det. Derfor bør du aldrig bruge en kraftig højtryksrenser direkte på motoren, og du bør undgå at spule mod luftindtag og generator.",
        ],
      },
      {
        heading: "Sådan gør du det sikkert",
        paragraphs: [
          "Start med at lade motoren køle ned, så den kun er let varm. Afdæk luftfilter, sikringsboks, generator og eventuelle åbne stik med plastikpose eller tape. Tag derefter støv og løse blade væk med børste eller støvsuger, før du bruger vand.",
          "Brug et mildt affedtningsmiddel til de fedtede områder, lad det virke kort og skyl med lavt tryk og begrænsede mængder vand. Tør efter med trykluft eller en klud, fjern afdækning og lad motorrummet lufttørre med motorhjelmen åben, før du starter motoren igen.",
        ],
      },
      {
        heading: "Hvad du ikke bør gøre",
        paragraphs: [
          "Undgå at spraye vand på en varm motor, fordi den hurtige afkøling kan belaste komponenter, og rengøringsmidler kan fordampe og efterlade pletter. Brug heller ikke aggressive kemikalier, der kan angribe gummislanger, kabler og plast.",
          "Undlad også at give dig til at vaske motorrummet, hvis du har mistanke om en lækage eller fejl, som du endnu ikke har fået undersøgt. Her kan det være klogere at få en mekaniker til at kigge på bilen først.",
        ],
      },
      {
        heading: "Hvornår giver det mening at få hjælp?",
        paragraphs: [
          "Hvis bilen skal sælges, hvis motorrummet er meget snavset, eller hvis du er usikker på, hvilke dele der tåler vand, er det en god idé at få hjælp fra en, der har erfaring. En professionel ved, hvor der skal afdækkes, og hvilke produkter der er sikre.",
          "Motorrumsvask er en specialopgave, så kontakt os, hvis du overvejer det i forbindelse med en bilvask eller klargøring til salg, så vi kan afklare, hvad der er muligt for din bil.",
        ],
      },
    ],
    faqs: [
      {
        question: "Er det skadeligt at vaske motoren?",
        answer:
          "Det kan det være, hvis der bruges for højt tryk eller for meget vand, eller hvis elektronik ikke er afdækket. Udført forsigtigt og med de rette produkter er risikoen lav.",
      },
      {
        question: "Hvor ofte bør motorrummet vaskes?",
        answer:
          "Der er ingen fast regel. Mange nøjes med at gøre det i forbindelse med salg eller hvis motorrummet er meget snavset.",
      },
      {
        question: "Kan jeg bruge højtryksrenser på motorrummet?",
        answer:
          "Det frarådes. Brug lavt tryk og mindre vandmængder, og undgå at spule direkte mod elektronik, stik og luftindtag.",
      },
      {
        question: "Skal motoren være varm eller kold?",
        answer:
          "Den bør være kold eller kun let varm. En varm motor kan give pletter og kan blive belastet af hurtig afkøling.",
      },
    ],
    relatedPosts: ["saadan-rengoer-du-faelge-og-fjerner-bremsestoev", "bilvask-foer-syn"],
    relatedLinks: [
      { label: "Klargøring af bil til salg", href: route("/klargoering-bil-salg") },
      { label: "Bilvask København", href: route("/bilvask-koebenhavn") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "svirvelridser-automatisk-bilvask-eller-haandvask",
    title: "Svirvelridser i lakken: Automatisk bilvask eller håndvask?",
    metaTitle: "Svirvelridser: vaskehal eller håndvask?",
    description:
      "Fine cirkelformede ridser i lakken opstår ofte ved forkert vask. Se, hvad der forårsager svirvelridser, og hvordan du undgår dem med automatisk vask eller håndvask.",
    category: "Bilpleje",
    keywords: [
      "svirvelridser",
      "ridser efter bilvask",
      "automatisk bilvask lak",
      "håndvask bil",
      "undgå ridser i lakken",
    ],
    publishedAt: "2026-10-09",
    updatedAt: "2026-10-09",
    readingMinutes: 7,
    coverImage: {
      src: "/home/voks.jpg",
      alt: "Håndpolering af bil for at fjerne ridser i lakken",
    },
    intro: [
      "Har du nogensinde set din bil i direkte sol og opdaget et net af fine, cirkelformede ridser i lakken? Det er svirvelridser, og de er en af de mest almindelige årsager til, at en ellers pæn bil ser mat og træt ud.",
      "Her ser vi på, hvad der skaber svirvelridser, hvordan forskellige vaskemetoder påvirker lakken, og hvordan du holder bilen ren uden at gøre skaden værre.",
    ],
    keyTakeaways: [
      "Svirvelridser opstår, når grus og snavs trækkes hen over lakken under vask eller aftørring.",
      "Børster i automatiske vaskehaller kan bære grus fra tidligere biler, mens touchless-anlæg bruger kraftigere kemi.",
      "Håndvask er skånsom, men kun hvis den udføres korrekt med ren klud, rigeligt vand og forvask.",
      "Rene mikrofiberklude og en forvask er de vigtigste redskaber mod ridser.",
      "Eksisterende svirvelridser kan som regel fjernes med polering, så længe de ikke er dybe.",
    ],
    sections: [
      {
        heading: "Hvad er svirvelridser?",
        paragraphs: [
          "Svirvelridser er mikroskopiske ridser i bilens klarlak. De ser ud som cirkelformede mønstre eller spindelvæv, når lyset rammer lakken i en bestemt vinkel, og de er især synlige på mørke biler.",
          "De opstår, når små partikler som grus, sand og tørret støv trækkes hen over lakken af en klud, børste eller svamp. Hver bevægelse efterlader en hårfin streg, og med tiden bliver de til et synligt mønster.",
        ],
      },
      {
        heading: "Automatisk bilvask med børster",
        paragraphs: [
          "Automatiske vaskehaller er hurtige og praktiske, men børsterne er i kontakt med mange biler hver dag. Hvis de ikke vedligeholdes og skylles ordentligt, kan de bære grus og snavs fra bil til bil, som så kan efterlade fine ridser i lakken.",
          "Det betyder ikke, at alle vaskehaller skader lakken, men risikoen er større end ved en vask, hvor du selv kontrollerer, hvad der rører ved bilen. Kvaliteten varierer fra anlæg til anlæg.",
        ],
      },
      {
        heading: "Touchless-vask: ingen børster, men stærk kemi",
        paragraphs: [
          "Touchless-anlæg rører ikke bilen med børster, men bruger i stedet højt tryk og kraftige rengøringsmidler for at løsne snavset. Det mindsker risikoen for mekaniske ridser, men de stærke midler kan over tid slide på voks og lakbeskyttelse.",
          "Resultatet er ofte pænt nok til hverdagsbrug, men fastsiddende snavs som trafikfilm og insekter kan blive siddende, og der er ingen manuel kontrol med de steder, der bliver overset.",
        ],
      },
      {
        heading: "Håndvask: skånsom, men kun hvis den gøres rigtigt",
        paragraphs: [
          "En korrekt udført håndvask er den mest skånsomme metode, fordi du kan kontrollere hvert trin. Det starter med en grundig skylning for at fjerne grus, og derefter bruges rene vaskehandsker eller mikrofiberklude og en pH-neutral shampoo.",
          "Fejlene opstår, når der bruges en snavset svamp, en tør klud eller samme vand til hele bilen. Så er håndvask ikke bedre end en dårlig vaskehal. En to-spand-metode, hvor sæbe og skyllevand holdes adskilt, hjælper med at holde grus væk fra lakken.",
        ],
      },
      {
        heading: "Sådan undgår du svirvelridser i hverdagen",
        paragraphs: [
          "Skyl bilen grundigt, før du rører ved den, og vask altid oppefra og ned. Brug rene mikrofiberklude, skift dem ofte, og tør bilen med en blød, absorberende klud i stedet for en gammel håndklæde eller vaskeskind, der har ligget i bilen.",
          "Undgå at tørre en tør, støvet bil af med en klud, og lad være med at gnide pletter af i en cirkulær bevægelse. En voks- eller keramisk beskyttelse gør også, at snavs glider lettere af og kan reducere risikoen.",
        ],
      },
      {
        heading: "Kan svirvelridser fjernes?",
        paragraphs: [
          "Ja, i de fleste tilfælde. Svirvelridser sidder i klarlakken, og en let maskinpolering kan jævne overfladen, så ridserne forsvinder. Hvis ridserne er dybe nok til at kunne mærkes med en fingernegl, kan det være svært at fjerne dem helt.",
          "Polering fjerner et tyndt lag lak, så det bør gøres med omtanke og af en, der har erfaring. Læs mere om vores polering i København, hvis lakken er begyndt at miste glansen.",
        ],
      },
    ],
    faqs: [
      {
        question: "Er automatisk bilvask dårlig for lakken?",
        answer:
          "Det afhænger af anlægget. Børstevaskehaller kan medføre fine ridser over tid, mens touchless-anlæg er mere skånsomme mekanisk, men bruger stærkere kemi.",
      },
      {
        question: "Kan jeg selv fjerne svirvelridser?",
        answer:
          "Meget lette ridser kan mindskes med en mild poleringsmiddel, men for et ensartet resultat anbefales professionel maskinpolering.",
      },
      {
        question: "Hjælper voks mod ridser?",
        answer:
          "Voks eller forsegling forhindrer ikke alle ridser, men gør det lettere for snavs at glide af og kan mindske risikoen ved vask.",
      },
      {
        question: "Hvor lang tid tager en håndvask?",
        answer:
          "En grundig håndvask udenpå tager typisk en til to timer, afhængigt af bilens størrelse og hvor snavset den er.",
      },
    ],
    relatedPosts: ["keramisk-forsegling-eller-voks", "saadan-rengoer-du-faelge-og-fjerner-bremsestoev"],
    relatedLinks: [
      { label: "Håndvask af bil København", href: route("/haandvask-bil-koebenhavn") },
      { label: "Polering af bil København", href: route("/polering-bil-koebenhavn") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
  {
    slug: "bilvask-af-elbil-saadan-goer-du-det-sikkert",
    title: "Bilvask af elbil: Kan man vaske en elbil, og hvad skal man passe på?",
    metaTitle: "Bilvask af elbil: sådan gør du det sikkert",
    description:
      "Kan en elbil tåle vand og bilvask? Ja, men der er få punkter, du bør kende: ladeport, højtryksrenser og undervogn. Her er svaret trin for trin.",
    category: "Guide",
    keywords: [
      "bilvask elbil",
      "vaske elbil",
      "elbil højtryksrenser",
      "ladeport vand",
      "elbil rengøring",
    ],
    publishedAt: "2026-10-09",
    updatedAt: "2026-10-09",
    readingMinutes: 6,
    coverImage: {
      src: "/service/helebil.jpg",
      alt: "Komplet bilvask af moderne personbil",
    },
    intro: [
      "Elbiler er blevet almindelige på danske veje, og mange ejere stiller sig det samme spørgsmål: Må man overhovedet vaske en elbil med vand? Svaret er ja. Elbiler er bygget til at køre i regn, sne og gennem vandpytter, og en almindelig bilvask er ikke et problem.",
      "Der er dog nogle få forhold, der adskiller sig fra en benzin- eller dieselbil, og som det er godt at kende, før du går i gang.",
    ],
    keyTakeaways: [
      "Elbiler tåler vand og almindelig bilvask, fordi batteri og elektronik er designet til det.",
      "Vask aldrig elbilen, mens den er tilsluttet en lader, og sørg for, at ladeporten er lukket.",
      "Undgå at ramme ladeport, tætninger og sensorer med højt tryk på kort afstand.",
      "Skyl undervognen efter vinteren, fordi vejsalt kan give rust på ophæng og skruer.",
      "Tjek altid bilens instruktionsbog, da nogle producenter har særlige anbefalinger.",
    ],
    sections: [
      {
        heading: "Må man vaske en elbil med vand?",
        paragraphs: [
          "Ja. Batteripakken og de elektriske komponenter i en elbil er tætnet mod vand og støv, og bilerne bliver testet i regn, sne og gennem oversvømmede veje. En almindelig håndvask eller skylning udgør derfor ikke en risiko.",
          "Det er en udbredt myte, at vand og elbiler ikke hører sammen. Men der er alligevel enkelte detaljer, du bør tage højde for, så du ikke skaber problemer ved et uheld.",
        ],
      },
      {
        heading: "Ladeport og ladekabel",
        paragraphs: [
          "Vask aldrig elbilen, mens den lader, og sørg for, at ladeklappen er lukket helt, før du går i gang. Selv om ladeporten er beskyttet, er det uhensigtsmæssigt at spule direkte ind i den.",
          "Hvis ladeporten er snavset, kan du tørre den af med en tør klud, når bilen ikke er tilsluttet. Brug ikke rengøringsmidler direkte på selve stikkene.",
        ],
      },
      {
        heading: "Højtryksrenser og tætninger",
        paragraphs: [
          "Brug højtryksrenser med omtanke. Hold afstand til tætningslister, ladeport, kameraer og sensorer, fordi kraftigt tryk på kort afstand kan presse vand forbi tætninger eller løsne mærker og folier.",
          "Almindeligt lavt tryk og en skånsom afskylning er rigeligt til at fjerne snavs. Er du i tvivl, kan du læse bilens instruktionsbog, hvor producenten ofte angiver, hvor tæt og med hvilket tryk du kan vaske.",
        ],
      },
      {
        heading: "Undervognen og vintersalt",
        paragraphs: [
          "Elbilens batteri sidder typisk i bunden af bilen, og undervognen er derfor ofte beskyttet af skjolde. Alligevel samler salt og mudder sig i ophæng, bolte og hjulbuer, hvor det kan give rust over tid.",
          "En afskylning af undervognen efter vinteren, og gerne jævnligt i løbet af vinteren, er en billig måde at beskytte bilen på, og den gælder lige så meget for elbiler som for andre biler.",
        ],
      },
      {
        heading: "Dæk, støv og lakken",
        paragraphs: [
          "Elbiler er ofte tungere end sammenlignelige benzinbiler, og det kan give lidt mere slid på dækkene. Fælgene samler mindre bremsestøv, fordi mange elbiler bremser med motoren, men de kan stadig blive snavsede af vejsnavs og dæksnavs.",
          "Lakken behandles som på enhver anden bil. Brug pH-neutral shampoo, rene klude og en skånsom metode, og overvej en beskyttende behandling, hvis bilen er ny eller mørk.",
        ],
      },
      {
        heading: "Mobil bilvask til elbilen",
        paragraphs: [
          "CleanWash vasker elbiler på din adresse, og vi tager højde for ladeport og sensorer. Det gør det nemt at holde bilen ren, uden at du skal forlade ladestanderen eller finde en vaskehal med plads.",
          "Du kan booke online med nummerpladeopslag og se prisen, før du bestiller. Vi vasker både private elbiler og firmabiler, og vi tilbyder også indvendig rengøring.",
        ],
      },
    ],
    faqs: [
      {
        question: "Kan en elbil få elektrisk stød af vand?",
        answer:
          "Nej. Højspændingssystemet er isoleret og tætnet, og elbiler er designet til at køre i regn og gennem vand. Vask alligevel ikke bilen, mens den er tilsluttet en lader.",
      },
      {
        question: "Må elbiler komme i automatisk vaskehal?",
        answer:
          "I de fleste tilfælde ja, men tjek bilens instruktionsbog. Nogle modeller kræver, at du aktiverer en vaskeindstilling eller lukker visse funktioner.",
      },
      {
        question: "Skal ladeporten være lukket under vask?",
        answer:
          "Ja. Sørg for, at ladeklappen er lukket og låst, så vand ikke trænger ind i ladeporten.",
      },
      {
        question: "Tilbyder I bilvask af elbiler?",
        answer:
          "Ja. CleanWash vasker alle typer personbiler, herunder elbiler, på din adresse i København og på Sjælland.",
      },
    ],
    relatedPosts: ["kan-man-vaske-bilen-i-frostvejr", "svirvelridser-automatisk-bilvask-eller-haandvask"],
    relatedLinks: [
      { label: "Mobil bilvask København", href: route("/mobil-bilvask-koebenhavn") },
      { label: "Bilvask til firmabiler", href: route("/bilvask-til-firmabiler-koebenhavn") },
      { label: "Book bilvask", href: route("/booking") },
    ],
  },
];
