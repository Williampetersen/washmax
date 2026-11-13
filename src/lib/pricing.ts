// Single source of truth for the prices shown in marketing copy and structured data.
// These mirror the live booking catalog (admin → Booking setup). When a price is
// changed in the admin, update it here too so pages, schema and llms.txt keep
// matching what customers are actually charged.

export type VehicleSizeId = "small" | "medium" | "large" | "van";
export type PackageId = "outside" | "inside" | "whole";

export const vehicleSizes: {
  id: VehicleSizeId;
  label: string;
  hint: string;
  image: string;
}[] = [
  {
    id: "small",
    label: "Lille bil",
    hint: "Kompakte biler med en totalvægt op til 1.300 kg",
    image: "/bilsize/lille.png",
  },
  {
    id: "medium",
    label: "Mellem bil",
    hint: "Almindelige personbiler med en totalvægt over 1.300 kg",
    image: "/bilsize/mellembil.png",
  },
  {
    id: "large",
    label: "Stor bil",
    hint: "Store familiebiler, SUV'er og tunge elbiler med en totalvægt over 2.000 kg",
    image: "/bilsize/storbil.png",
  },
  {
    id: "van",
    label: "Varevogn",
    hint: "Varebiler og køretøjer med en totalvægt over 2.500 kg",
    image: "/bilsize/varevogn.png",
  },
];

export const packages: Record<
  PackageId,
  {
    id: PackageId;
    name: string;
    shortName: string;
    minutes: number;
    summary: string;
    includes: string[];
    prices: Record<VehicleSizeId, number>;
  }
> = {
  outside: {
    id: "outside",
    name: "Udvendig bilvask",
    shortName: "Udvendigt",
    minutes: 65,
    summary: "Skånsom håndvask af lak, fælge, hjulbuer og ruder med skum, skyl og aftørring.",
    includes: [
      "Forvask med skum, der løsner snavs før lakken berøres",
      "Håndvask og skyl af hele karrosseriet",
      "Rengøring af fælge, dæksider og hjulbuer",
      "Ruder og spejle pudset udvendigt",
      "Aftørring, så bilen står uden kalkpletter",
    ],
    prices: { small: 450, medium: 600, large: 699, van: 899 },
  },
  inside: {
    id: "inside",
    name: "Indvendig bilrengøring",
    shortName: "Indvendigt",
    minutes: 75,
    summary: "Grundig rengøring af kabine og bagagerum: støvsugning, aftørring af flader og ruder indefra.",
    includes: [
      "Støvsugning af sæder, gulv, måtter og bagagerum",
      "Aftørring af instrumentbræt, midterkonsol og dørpaneler",
      "Rengøring af handskerum, kopholdere og dørlommer",
      "Gulvmåtter rengjort",
      "Ruder pudset indvendigt",
    ],
    prices: { small: 600, medium: 700, large: 799, van: 899 },
  },
  whole: {
    id: "whole",
    name: "Hele bilen",
    shortName: "Hele bilen",
    minutes: 110,
    summary: "Udvendig bilvask og indvendig bilrengøring i ét besøg – afsluttet med voks og finish.",
    includes: [
      "Alt fra udvendig bilvask",
      "Alt fra indvendig bilrengøring",
      "Voksbehandling af lakken uden merpris",
      "Finish af dæk, lister og ruder",
    ],
    prices: { small: 799, medium: 899, large: 999, van: 1500 },
  },
};

export const packageOrder: PackageId[] = ["outside", "inside", "whole"];

export type AddOnId =
  | "dyrehaar"
  | "ekstra-beskidt"
  | "boernesaeder"
  | "laederpleje"
  | "vinylpleje"
  | "tag"
  | "ac-rens"
  | "toemning"
  | "roeglugt"
  | "pletfjernelse"
  | "saederens"
  | "faelgrens"
  | "daekshine"
  | "motorvask";

export const addOns: Record<AddOnId, { name: string; price: number; text: string; href?: string }> = {
  saederens: {
    name: "Sæderens (op til 5 sæder)",
    price: 300,
    text: "Dybdegående rens af tekstilsæder, der løsner indgroet snavs, pletter og lugt.",
    href: "/saederens-bil",
  },
  pletfjernelse: {
    name: "Pletfjernelse fra bilsæde",
    price: 250,
    text: "Målrettet behandling af synlige pletter på sæder.",
    href: "/pletfjernelse-bilsaeder",
  },
  laederpleje: {
    name: "Læderpleje af sæder",
    price: 399,
    text: "Rens og pleje, der beskytter læderet og holder det blødt.",
    href: "/laederpleje-bil",
  },
  dyrehaar: {
    name: "Fjernelse af dyrehår",
    price: 200,
    text: "Hår fra hund og kat fjernes fra sæder, måtter og bagagerum.",
    href: "/fjernelse-af-dyrehaar-bil",
  },
  roeglugt: {
    name: "Fjernelse af røglugt",
    price: 300,
    text: "Behandling, der neutraliserer røglugt i kabinen.",
    href: "/lugtfjernelse-bil",
  },
  "ac-rens": {
    name: "AC-rengøring",
    price: 300,
    text: "Rens af airconditionanlægget mod dårlig lugt og for friskere luft.",
    href: "/aircondition-rens-bil",
  },
  boernesaeder: {
    name: "Rens af børnesæde",
    price: 100,
    text: "Skånsom rens af autostol eller selepude.",
    href: "/rens-af-autostol",
  },
  vinylpleje: {
    name: "Vinylpleje",
    price: 249,
    text: "Pleje af instrumentbræt, paneler og plastflader.",
    href: "/vinylpleje-bil",
  },
  tag: {
    name: "Rens af loft (tag)",
    price: 300,
    text: "Rengøring af bilens indvendige loftbeklædning.",
  },
  "ekstra-beskidt": {
    name: "Ekstra beskidt bil",
    price: 299,
    text: "Ekstra tid til biler, der er meget tilsmudsede.",
    href: "/rengoering-af-meget-beskidt-bil",
  },
  toemning: {
    name: "Tømning af bil",
    price: 99,
    text: "Affald og løse ting ryddes ud, før rengøringen går i gang.",
  },
  faelgrens: {
    name: "Fælgrens",
    price: 149,
    text: "Grundig rens af fælge for bremsestøv og fastbrændt snavs.",
    href: "/faelgrens",
  },
  daekshine: {
    name: "Dækshine",
    price: 99,
    text: "Dækkene får en mørk, velplejet glans.",
    href: "/daekshine",
  },
  motorvask: {
    name: "Motorvask",
    price: 350,
    text: "Skånsom rengøring af motorrummet for snavs og fedt.",
    href: "/motorvask",
  },
};

export const interiorAddOnIds: AddOnId[] = [
  "saederens",
  "pletfjernelse",
  "laederpleje",
  "dyrehaar",
  "roeglugt",
  "ac-rens",
  "boernesaeder",
  "vinylpleje",
  "tag",
  "ekstra-beskidt",
  "toemning",
];

export const exteriorAddOnIds: AddOnId[] = ["faelgrens", "daekshine", "motorvask"];

/** Second car in the same visit gets this discount on its base price (terms § 4). */
export const secondCarDiscountPercent = 15;

const allPrices = packageOrder.flatMap((id) => Object.values(packages[id].prices));

export const lowestPrice = Math.min(...allPrices);
export const highestPrice = Math.max(...allPrices);

export const fromPrice = (id: PackageId) => Math.min(...Object.values(packages[id].prices));

export const kr = (amount: number) => `${amount.toLocaleString("da-DK")} kr.`;

/** "450 kr." style helper for copy: `fra ${fromKr("outside")}`. */
export const fromKr = (id: PackageId) => kr(fromPrice(id));

export const priceRangeText = `${lowestPrice}-${highestPrice} DKK`;
