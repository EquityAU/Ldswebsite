import type { FabricId } from "./taxonomy";


export type FontId = "script" | "serif" | "sans" | "hand" | "classic";

export type IconId =
  | "heart"
  | "needle"
  | "yarn"
  | "scissors"
  | "leaf"
  | "star"
  | "sparkle"
  | "sun"
  | "moon"
  | "gift"
  | "snowflake"
  | "cloud"
  | "hook";

export type IconPlacement = "left" | "right" | "above" | "below";

export type ThemeId =
  | "handmade"
  | "with-love"
  | "family"
  | "craft"
  | "custom"
  | "baby"
  | "australian"
  | "eco"
  | "care"
  | "sizing"
  | "occasions"
  | "icons";

export type Badge = "bestseller" | "new" | "popular";


export interface Theme {
  id: ThemeId;
  name: string;
  short: string;
  blurb: string;
  hero: string;
}


export interface Design {
  slug: string;
  name: string;
  lines: string[];
  font: FontId;
  icon?: IconId;
  iconPlacement: IconPlacement;
  caps: boolean;
  themes: ThemeId[];
  formats: string[];
  defaultFormat: string;
  defaultFabric: FabricId;
  defaultColour: string;
  description: string;
  badge?: Badge;
  keywords: string[];
}


// ── Themes ─────────────────────────────────────────────────────────────────

export const THEMES: Theme[] = [
  {
    id: "handmade",
    name: "Handmade Classics",
    short: "Handmade",
    blurb: "The essentials every maker needs. Simple, timeless, always in stock.",
    hero: "Say it simply. These are the labels our makers come back to again and again.",
  },
  {
    id: "with-love",
    name: "Made with Love",
    short: "With Love",
    blurb: "Because every stitch has a bit of heart in it.",
    hero: "The sentiment that never goes out of style, in scripts, serifs and clean modern caps.",
  },
  {
    id: "family",
    name: "Made by Nan & Family",
    short: "Family",
    blurb: "Nan, Grandma, Mum, Pop, Aunty and everyone in between.",
    hero: "For the makers whose gifts become heirlooms. Sign your work the way the family says it.",
  },
  {
    id: "craft",
    name: "Knit, Crochet, Quilt & Sew",
    short: "By Craft",
    blurb: "Labels that name the craft behind the piece.",
    hero: "Hand knitted, hand quilted, hand sewn. Let the label tell the story of how it was made.",
  },
  {
    id: "custom",
    name: "Custom & Bespoke",
    short: "Bespoke",
    blurb: "For small batch makers, tailors and made-to-order studios.",
    hero: "Polished, professional labels for makers who sell their work.",
  },
  {
    id: "baby",
    name: "Baby & Kids",
    short: "Baby",
    blurb: "Soft labels for soft things: blankets, bonnets and teddies.",
    hero: "Gentle phrases for the littlest recipients. Velvet-soft against tiny skin.",
  },
  {
    id: "australian",
    name: "Australian Made",
    short: "Aussie Made",
    blurb: "Wear it proudly. Made here, by you.",
    hero: "Locally made deserves a label that says so.",
  },
  {
    id: "eco",
    name: "Slow & Sustainable",
    short: "Eco",
    blurb: "For upcycled, reclaimed and zero-waste creations.",
    hero: "Tell the story of thoughtfully made things, on labels that are eco-friendly too.",
  },
  {
    id: "care",
    name: "Care Instructions",
    short: "Care",
    blurb: "Washing and drying labels that actually get read.",
    hero: "Keep handmade pieces looking their best with clear, soft care labels.",
  },
  {
    id: "sizing",
    name: "Size Tags",
    short: "Sizes",
    blurb: "Clothing and baby sizes in mini squares and circles.",
    hero: "Tiny, tidy size tags for garments, bonnets and booties.",
  },
  {
    id: "occasions",
    name: "Gifting & Occasions",
    short: "Gifting",
    blurb: "Christmas, thank-yous and just-because gifts.",
    hero: "A little label that turns something handmade into a proper gift.",
  },
  {
    id: "icons",
    name: "Icon Only",
    short: "Icons",
    blurb: "Minimal marks for makers who let the work speak.",
    hero: "No words, just a mark. Hearts, needles, yarn and leaves.",
  },
];


// ── Format groups ──────────────────────────────────────────────────────────

export const WIDE = ["rect-50x12", "rect-46x16", "rect-70x12", "rect-37x17", "rect-50x20", "rect-60x30", "fold-32x38", "tag-30x50"];

export const COMPACT = ["rect-27x17", "rect-37x17", "rect-50x20", "rect-60x30", "sq-20", "sq-30", "circle-20", "circle-35", "circle-45", "heart-25", "heart-35", "fold-32x38", "fold-20x40", "tag-30x50"];

export const ALL = [...new Set([...WIDE, ...COMPACT])];

export const TINY = ["sq-20", "sq-30", "circle-20", "circle-35", "heart-25", "rect-27x17", "fold-20x40"];


type DesignInput = Partial<Design> & Pick<Design, "slug" | "name" | "lines" | "font" | "themes" | "description">;


function design(input: DesignInput): Design {
  const formats = input.formats ?? ALL;

  return {
    iconPlacement: "left",
    caps: false,
    formats,
    defaultFormat: input.defaultFormat ?? formats[0],
    defaultFabric: "lux-velvet",
    defaultColour: "black",
    keywords: [],
    ...input,
  };
}


// ── Handmade classics ──────────────────────────────────────────────────────

const handmade: Design[] = [
  design({
    slug: "handmade-script",
    name: "Handmade",
    lines: ["Handmade"],
    font: "script",
    icon: "heart",
    themes: ["handmade"],
    description: "The one-word classic in a flowing script with a small heart. Suits everything from beanies to tote bags.",
    badge: "bestseller",
    defaultFormat: "rect-46x16",
    defaultColour: "ivory",
    keywords: ["hand made"],
  }),
  design({
    slug: "handmade-caps",
    name: "HANDMADE",
    lines: ["HANDMADE"],
    font: "sans",
    caps: true,
    themes: ["handmade", "custom"],
    description: "Clean, letter-spaced capitals for a modern, minimal look. A studio favourite for market stalls.",
    defaultFormat: "rect-50x12",
    formats: WIDE,
    defaultColour: "charcoal",
  }),
  design({
    slug: "hand-made-with-love",
    name: "Hand made with love",
    lines: ["Hand made", "with love"],
    font: "script",
    icon: "heart",
    iconPlacement: "below",
    themes: ["handmade", "with-love"],
    description: "Two lines of script with a heart beneath. Our most gifted label, and it looks beautiful on a heart or circle.",
    badge: "bestseller",
    defaultFormat: "heart-35",
    defaultColour: "blush",
    keywords: ["handmade with love"],
  }),
  design({
    slug: "handcrafted",
    name: "Handcrafted",
    lines: ["Handcrafted"],
    font: "serif",
    themes: ["handmade", "custom"],
    description: "An elegant serif that suits leather goods, homewares and heirloom pieces.",
    defaultFormat: "rect-50x12",
    formats: WIDE,
    defaultColour: "chocolate",
  }),
  design({
    slug: "lovingly-handmade",
    name: "Lovingly handmade",
    lines: ["Lovingly", "handmade"],
    font: "hand",
    themes: ["handmade", "with-love"],
    description: "Relaxed handwriting with a warm, personal feel. Lovely on baby blankets and softies.",
    defaultFormat: "rect-50x20",
    defaultColour: "dusty-rose",
  }),
  design({
    slug: "made-by-hand",
    name: "made by hand",
    lines: ["made by hand"],
    font: "sans",
    icon: "needle",
    themes: ["handmade", "craft"],
    description: "Lowercase and understated, with a needle and thread. A quiet label for considered makers.",
    defaultFormat: "rect-46x16",
    formats: WIDE,
    defaultColour: "olive",
  }),
  design({
    slug: "handmade-by-me",
    name: "Handmade by me",
    lines: ["Handmade", "by me"],
    font: "hand",
    icon: "heart",
    iconPlacement: "right",
    themes: ["handmade"],
    description: "Playful and personal. Perfect for makers who gift their work to friends and family.",
    defaultFormat: "sq-30",
    defaultColour: "mustard",
  }),
  design({
    slug: "handmade-just-for-you",
    name: "Handmade, just for you",
    lines: ["Handmade,", "just for you"],
    font: "script",
    themes: ["handmade", "occasions"],
    description: "A gift-ready label that makes the recipient feel special.",
    defaultFormat: "rect-50x20",
    defaultColour: "emerald",
  }),
  design({
    slug: "handmade-stack",
    name: "Hand / made",
    lines: ["hand", "made"],
    font: "sans",
    icon: "heart",
    iconPlacement: "above",
    caps: true,
    themes: ["handmade", "icons"],
    description: "A stacked, symmetrical layout designed for squares and circles.",
    defaultFormat: "circle-35",
    formats: COMPACT,
    defaultColour: "navy",
  }),
  design({
    slug: "proudly-handmade",
    name: "Proudly handmade",
    lines: ["PROUDLY", "HANDMADE"],
    font: "classic",
    caps: true,
    themes: ["handmade", "australian"],
    description: "Bold and confident. Great on bags, aprons and menswear.",
    defaultFormat: "rect-50x20",
    defaultColour: "forest",
  }),
  design({
    slug: "handmade-heart",
    name: "Handmade ♥",
    lines: ["Handmade"],
    font: "serif",
    icon: "heart",
    iconPlacement: "right",
    themes: ["handmade", "with-love"],
    description: "Classic serif with a trailing heart. Timeless on quilts and cushions.",
    defaultFormat: "rect-50x12",
    formats: WIDE,
    defaultColour: "burgundy",
  }),
  design({
    slug: "small-batch",
    name: "Small batch",
    lines: ["Small batch"],
    font: "serif",
    themes: ["handmade", "custom"],
    description: "For makers who produce a few of each piece and want that to show.",
    defaultFormat: "rect-46x16",
    formats: WIDE,
    defaultColour: "terracotta",
  }),
];


// ── Made with love ─────────────────────────────────────────────────────────

const withLove: Design[] = [
  design({
    slug: "made-with-love-script",
    name: "Made with love",
    lines: ["Made with love"],
    font: "script",
    themes: ["with-love", "handmade"],
    description: "The phrase every maker needs, in our softest script. Our single most popular label.",
    badge: "bestseller",
    defaultFormat: "rect-46x16",
    formats: WIDE,
    defaultColour: "blush",
  }),
  design({
    slug: "made-with-love-caps",
    name: "MADE WITH LOVE",
    lines: ["MADE WITH LOVE"],
    font: "sans",
    icon: "heart",
    caps: true,
    themes: ["with-love", "custom"],
    description: "Modern capitals with a heart. A clean, contemporary take on the classic.",
    defaultFormat: "rect-50x12",
    formats: WIDE,
    defaultColour: "charcoal",
  }),
  design({
    slug: "with-love",
    name: "with love",
    lines: ["with love"],
    font: "script",
    icon: "heart",
    iconPlacement: "below",
    themes: ["with-love", "occasions"],
    description: "Two little words and a heart. Designed for mini hearts, circles and squares.",
    badge: "popular",
    defaultFormat: "heart-25",
    formats: COMPACT,
    defaultColour: "dusty-rose",
  }),
  design({
    slug: "with-love-serif",
    name: "With Love",
    lines: ["With Love"],
    font: "serif",
    themes: ["with-love"],
    description: "A refined serif for a more grown-up gift. Beautiful on ivory or blush velvet.",
    defaultFormat: "rect-50x12",
    formats: WIDE,
    defaultColour: "ivory",
  }),
  design({
    slug: "made-with-love-for-you",
    name: "Made with love, for you",
    lines: ["Made with love,", "for you"],
    font: "script",
    themes: ["with-love", "occasions"],
    description: "A personal note that fits neatly on a standard rectangle or fold-over.",
    defaultFormat: "fold-32x38",
    defaultColour: "plum",
  }),
  design({
    slug: "made-with-heart",
    name: "made with ♥",
    lines: ["made with"],
    font: "sans",
    icon: "heart",
    iconPlacement: "right",
    themes: ["with-love", "icons"],
    description: "Lowercase text with the heart doing the talking.",
    defaultFormat: "rect-50x12",
    formats: WIDE,
    defaultColour: "black",
  }),
  design({
    slug: "sewn-with-love",
    name: "Sewn with love",
    lines: ["Sewn with love"],
    font: "hand",
    icon: "needle",
    themes: ["with-love", "craft"],
    description: "For dressmakers and sewists. The needle icon sits beside relaxed handwriting.",
    defaultFormat: "rect-46x16",
    formats: WIDE,
    defaultColour: "teal",
  }),
  design({
    slug: "stitched-with-love",
    name: "Stitched with love",
    lines: ["Stitched", "with love"],
    font: "serif",
    themes: ["with-love", "craft"],
    description: "A two-line serif that suits embroidery, quilting and cross stitch.",
    defaultFormat: "sq-30",
    defaultColour: "olive",
  }),
  design({
    slug: "love-in-every-stitch",
    name: "Love in every stitch",
    lines: ["Love in", "every stitch"],
    font: "script",
    icon: "heart",
    iconPlacement: "above",
    themes: ["with-love", "craft"],
    description: "Sweet and sentimental. A favourite for quilts made for new babies and weddings.",
    defaultFormat: "circle-35",
    formats: COMPACT,
    defaultColour: "ivory",
  }),
  design({
    slug: "made-with-love-and-swearing",
    name: "Made with love (and a little swearing)",
    lines: ["Made with love", "(and a little swearing)"],
    font: "hand",
    themes: ["with-love", "occasions"],
    description: "For the honest maker. Always gets a laugh, always gets an order.",
    badge: "popular",
    defaultFormat: "rect-60x30",
    formats: ["rect-50x20", "rect-60x30", "sq-30", "circle-45", "fold-32x38", "tag-30x50"],
    defaultColour: "mustard",
  }),
];


// ── Made by Nan & family ───────────────────────────────────────────────────

const familyNames: Array<[string, string, Badge?]> = [
  ["nan", "Nan", "bestseller"],
  ["nanna", "Nanna"],
  ["nana", "Nana"],
  ["grandma", "Grandma", "popular"],
  ["granny", "Granny"],
  ["mum", "Mum", "popular"],
  ["mama", "Mama"],
  ["grandpa", "Grandpa"],
  ["pop", "Pop"],
  ["dad", "Dad"],
  ["aunty", "Aunty"],
  ["oma", "Oma"],
  ["nonna", "Nonna"],
  ["yiayia", "Yiayia"],
];


const family: Design[] = [
  ...familyNames.map(([id, label, badge]) =>
    design({
      slug: `made-by-${id}`,
      name: `Made by ${label}`,
      lines: [`Made by ${label}`],
      font: "script",
      icon: "heart",
      iconPlacement: "right",
      themes: ["family"],
      description: `A script label signed by ${label}. The heirloom finish for knits, quilts and hand-me-downs.`,
      badge,
      defaultFormat: "rect-46x16",
      formats: WIDE,
      defaultColour: "ivory",
      keywords: ["made by", label.toLowerCase()],
    }),
  ),
  design({
    slug: "made-with-love-by-nan",
    name: "Made with love by Nan",
    lines: ["Made with love", "by Nan"],
    font: "script",
    icon: "heart",
    iconPlacement: "below",
    themes: ["family", "with-love"],
    description: "Two lines with a heart beneath. Fits beautifully on a heart or circle.",
    badge: "popular",
    defaultFormat: "heart-35",
    formats: COMPACT,
    defaultColour: "blush",
  }),
  design({
    slug: "made-with-love-by-grandma",
    name: "Made with love by Grandma",
    lines: ["Made with love", "by Grandma"],
    font: "script",
    icon: "heart",
    iconPlacement: "below",
    themes: ["family", "with-love"],
    description: "The Grandma edition of our two-line heart label.",
    defaultFormat: "circle-35",
    formats: COMPACT,
    defaultColour: "dusty-rose",
  }),
  design({
    slug: "made-with-love-by-mum",
    name: "Made with love by Mum",
    lines: ["Made with love", "by Mum"],
    font: "script",
    icon: "heart",
    iconPlacement: "below",
    themes: ["family", "with-love"],
    description: "For the pieces Mum makes for the kids. Soft, sweet and machine-washable.",
    defaultFormat: "heart-35",
    formats: COMPACT,
    defaultColour: "lilac",
  }),
  design({
    slug: "nans-knits",
    name: "Nan's knits",
    lines: ["Nan's knits"],
    font: "hand",
    icon: "yarn",
    themes: ["family", "craft"],
    description: "A yarn ball and a cheerful hand-lettered name. Made for beanies, jumpers and booties.",
    defaultFormat: "rect-46x16",
    formats: WIDE,
    defaultColour: "burnt-orange",
  }),
  design({
    slug: "grandmas-quilts",
    name: "Grandma's quilts",
    lines: ["Grandma's", "quilts"],
    font: "serif",
    themes: ["family", "craft"],
    description: "A large-format serif for the corner of a quilt. Big enough to read across the room.",
    defaultFormat: "rect-60x30",
    defaultColour: "navy",
  }),
  design({
    slug: "handmade-by-nan",
    name: "Handmade by Nan",
    lines: ["Handmade", "by Nan"],
    font: "hand",
    themes: ["family", "handmade"],
    description: "Relaxed handwriting, two lines, endlessly giftable.",
    defaultFormat: "sq-30",
    defaultColour: "sage",
    defaultFabric: "vegan-suede",
  }),
];


// ── By craft ───────────────────────────────────────────────────────────────

const craft: Design[] = [
  design({
    slug: "hand-knitted",
    name: "Hand knitted",
    lines: ["Hand knitted"],
    font: "serif",
    icon: "yarn",
    themes: ["craft"],
    description: "A serif label with a yarn ball for knitwear of all kinds.",
    badge: "popular",
    defaultFormat: "rect-46x16",
    formats: WIDE,
    defaultColour: "ivory",
  }),
  design({
    slug: "hand-knit-with-love",
    name: "Hand knit with love",
    lines: ["Hand knit", "with love"],
    font: "script",
    icon: "yarn",
    iconPlacement: "above",
    themes: ["craft", "with-love"],
    description: "Stacked script with a yarn ball on top. Made for circles and hearts.",
    defaultFormat: "circle-35",
    formats: COMPACT,
    defaultColour: "mustard",
  }),
  design({
    slug: "hand-crocheted",
    name: "Hand crocheted",
    lines: ["Hand crocheted"],
    font: "serif",
    icon: "hook",
    themes: ["craft"],
    description: "With a crochet hook icon. Fits neatly along the edge of a granny square blanket.",
    defaultFormat: "rect-46x16",
    formats: WIDE,
    defaultColour: "terracotta",
  }),
  design({
    slug: "crocheted-with-love",
    name: "Crocheted with love",
    lines: ["Crocheted", "with love"],
    font: "hand",
    icon: "hook",
    iconPlacement: "above",
    themes: ["craft", "with-love"],
    description: "A friendly hand-lettered label for amigurumi, blankets and bags.",
    defaultFormat: "sq-30",
    formats: COMPACT,
    defaultColour: "blush",
  }),
  design({
    slug: "hand-quilted",
    name: "Hand quilted",
    lines: ["Hand quilted"],
    font: "classic",
    themes: ["craft"],
    description: "A confident classic serif for quilt bindings and corners.",
    defaultFormat: "rect-50x20",
    formats: WIDE,
    defaultColour: "forest",
  }),
  design({
    slug: "quilted-with-love",
    name: "Quilted with love",
    lines: ["Quilted", "with love"],
    font: "script",
    icon: "heart",
    iconPlacement: "below",
    themes: ["craft", "with-love"],
    description: "A large label for the corner of a quilt, with a heart beneath the script.",
    defaultFormat: "rect-60x30",
    defaultColour: "burgundy",
  }),
  design({
    slug: "handmade-quilt",
    name: "Handmade quilt",
    lines: ["HANDMADE", "QUILT"],
    font: "sans",
    caps: true,
    themes: ["craft", "handmade"],
    description: "Two clean lines of capitals. Modern quilters love this on a large square.",
    defaultFormat: "sq-30",
    defaultColour: "charcoal",
  }),
  design({
    slug: "hand-sewn",
    name: "Hand sewn",
    lines: ["Hand sewn"],
    font: "serif",
    icon: "needle",
    themes: ["craft"],
    description: "Needle and thread beside a soft serif. For dressmaking, bags and soft toys.",
    defaultFormat: "rect-50x12",
    formats: WIDE,
    defaultColour: "navy",
  }),
  design({
    slug: "hand-stitched",
    name: "Hand stitched",
    lines: ["Hand stitched"],
    font: "hand",
    themes: ["craft"],
    description: "Casual handwriting for embroidery hoops, patches and leather goods.",
    defaultFormat: "rect-46x16",
    formats: WIDE,
    defaultColour: "chocolate",
  }),
  design({
    slug: "hand-dyed",
    name: "Hand dyed",
    lines: ["Hand dyed"],
    font: "sans",
    themes: ["craft", "eco"],
    description: "For naturally dyed yarn, fabric and garments.",
    defaultFormat: "rect-50x12",
    formats: WIDE,
    defaultColour: "olive",
    defaultFabric: "vegan-suede",
  }),
  design({
    slug: "hand-embroidered",
    name: "Hand embroidered",
    lines: ["Hand", "embroidered"],
    font: "serif",
    icon: "needle",
    iconPlacement: "above",
    themes: ["craft"],
    description: "A stacked serif label with a needle above. Suits hoops, linens and heirloom pieces.",
    defaultFormat: "circle-35",
    formats: COMPACT,
    defaultColour: "ivory",
  }),
  design({
    slug: "hand-woven",
    name: "Hand woven",
    lines: ["Hand woven"],
    font: "serif",
    themes: ["craft"],
    description: "A quiet serif for weavers, wall hangings and textiles.",
    defaultFormat: "rect-46x16",
    formats: WIDE,
    defaultColour: "sand",
    defaultFabric: "vegan-suede",
  }),
];


// ── Custom & bespoke ───────────────────────────────────────────────────────

const custom: Design[] = [
  design({
    slug: "custom-made",
    name: "Custom made",
    lines: ["CUSTOM MADE"],
    font: "sans",
    caps: true,
    themes: ["custom"],
    description: "Letter-spaced capitals for tailors, upholsterers and made-to-order makers.",
    badge: "popular",
    defaultFormat: "rect-50x12",
    formats: WIDE,
    defaultColour: "black",
  }),
  design({
    slug: "bespoke",
    name: "Bespoke",
    lines: ["Bespoke"],
    font: "classic",
    themes: ["custom"],
    description: "One elegant word. The finish for suits, gowns and leather.",
    defaultFormat: "rect-46x16",
    formats: WIDE,
    defaultColour: "navy",
  }),
  design({
    slug: "made-to-order",
    name: "Made to order",
    lines: ["Made to order"],
    font: "serif",
    themes: ["custom"],
    description: "For studios that make each piece after the order comes in.",
    defaultFormat: "rect-50x12",
    formats: WIDE,
    defaultColour: "charcoal",
  }),
  design({
    slug: "one-of-a-kind",
    name: "One of a kind",
    lines: ["One of a kind"],
    font: "script",
    icon: "sparkle",
    iconPlacement: "right",
    themes: ["custom", "occasions"],
    description: "A sparkle beside flowing script. For pieces that will never be repeated.",
    defaultFormat: "rect-46x16",
    formats: WIDE,
    defaultColour: "plum",
  }),
  design({
    slug: "limited-edition",
    name: "Limited edition",
    lines: ["LIMITED", "EDITION"],
    font: "sans",
    caps: true,
    themes: ["custom"],
    description: "Stacked capitals for small runs and collections.",
    defaultFormat: "sq-30",
    defaultColour: "black",
  }),
  design({
    slug: "original-design",
    name: "Original design",
    lines: ["Original design"],
    font: "serif",
    themes: ["custom"],
    description: "A quiet claim of authorship for pattern designers and independent labels.",
    defaultFormat: "rect-50x12",
    formats: WIDE,
    defaultColour: "forest",
  }),
  design({
    slug: "handmade-in-small-batches",
    name: "Made in small batches",
    lines: ["Made in", "small batches"],
    font: "hand",
    themes: ["custom", "handmade"],
    description: "Warm handwriting for makers who produce a few at a time.",
    defaultFormat: "rect-50x20",
    defaultColour: "rust",
    defaultFabric: "vegan-suede",
  }),
];


// ── Baby & kids ────────────────────────────────────────────────────────────

const baby: Design[] = [
  design({
    slug: "made-for-baby",
    name: "Made for baby",
    lines: ["Made for baby"],
    font: "script",
    icon: "moon",
    iconPlacement: "right",
    themes: ["baby"],
    description: "Script with a crescent moon. Soft enough for swaddles and bonnets.",
    badge: "popular",
    defaultFormat: "rect-46x16",
    formats: WIDE,
    defaultColour: "blush",
  }),
  design({
    slug: "little-one",
    name: "Little one",
    lines: ["little one"],
    font: "hand",
    icon: "star",
    iconPlacement: "above",
    themes: ["baby"],
    description: "A tiny star above gentle handwriting. Designed for mini circles and hearts.",
    defaultFormat: "circle-20",
    formats: COMPACT,
    defaultColour: "ivory",
  }),
  design({
    slug: "made-with-love-for-a-little-one",
    name: "Made with love for a little one",
    lines: ["Made with love", "for a little one"],
    font: "script",
    icon: "heart",
    iconPlacement: "below",
    themes: ["baby", "with-love"],
    description: "A keepsake label for baby blankets and first quilts.",
    defaultFormat: "rect-60x30",
    formats: ["rect-50x20", "rect-60x30", "sq-30", "circle-35", "circle-45", "heart-35", "fold-32x38", "tag-30x50"],
    defaultColour: "lilac",
  }),
  design({
    slug: "handmade-for-little-hands",
    name: "Handmade for little hands",
    lines: ["Handmade for", "little hands"],
    font: "hand",
    themes: ["baby", "handmade"],
    description: "For toys, softies and mittens. Cheerful and soft.",
    defaultFormat: "rect-50x20",
    defaultColour: "mustard",
  }),
  design({
    slug: "tiny-and-loved",
    name: "Tiny & loved",
    lines: ["tiny & loved"],
    font: "script",
    icon: "heart",
    iconPlacement: "below",
    themes: ["baby", "with-love"],
    description: "Three little words for the smallest pieces.",
    defaultFormat: "heart-25",
    formats: COMPACT,
    defaultColour: "dusty-rose",
  }),
  design({
    slug: "snuggle-me",
    name: "Snuggle me",
    lines: ["snuggle me"],
    font: "hand",
    icon: "cloud",
    iconPlacement: "above",
    themes: ["baby"],
    description: "A cloud above relaxed handwriting. Perfect on comforters and blankies.",
    defaultFormat: "sq-30",
    formats: COMPACT,
    defaultColour: "ivory",
  }),
  design({
    slug: "sweet-dreams",
    name: "Sweet dreams",
    lines: ["Sweet dreams"],
    font: "script",
    icon: "moon",
    themes: ["baby"],
    description: "For sleep sacks, cot quilts and bedtime friends.",
    defaultFormat: "rect-46x16",
    formats: WIDE,
    defaultColour: "navy",
  }),
];


// ── Australian made ────────────────────────────────────────────────────────

const australian: Design[] = [
  design({
    slug: "australian-made",
    name: "Australian made",
    lines: ["AUSTRALIAN MADE"],
    font: "sans",
    icon: "star",
    caps: true,
    themes: ["australian"],
    description: "Bold capitals with a star. A clear, proud statement of origin.",
    badge: "popular",
    defaultFormat: "rect-50x12",
    formats: WIDE,
    defaultColour: "forest",
  }),
  design({
    slug: "handmade-in-australia",
    name: "Handmade in Australia",
    lines: ["Handmade in", "Australia"],
    font: "serif",
    themes: ["australian", "handmade"],
    description: "A two-line serif that suits squares and standard rectangles.",
    defaultFormat: "rect-50x20",
    defaultColour: "ivory",
  }),
  design({
    slug: "made-in-australia",
    name: "Made in Australia",
    lines: ["Made in Australia"],
    font: "serif",
    themes: ["australian"],
    description: "Simple, classic, unambiguous.",
    defaultFormat: "rect-46x16",
    formats: WIDE,
    defaultColour: "navy",
  }),
  design({
    slug: "aussie-made",
    name: "Aussie made",
    lines: ["Aussie made"],
    font: "hand",
    icon: "sun",
    iconPlacement: "right",
    themes: ["australian"],
    description: "Casual and warm, with a little sun. Made for beach towels and market stalls.",
    defaultFormat: "rect-46x16",
    formats: WIDE,
    defaultColour: "mustard",
  }),
  design({
    slug: "made-with-love-in-australia",
    name: "Made with love in Australia",
    lines: ["Made with love", "in Australia"],
    font: "script",
    icon: "heart",
    iconPlacement: "below",
    themes: ["australian", "with-love"],
    description: "The sentiment and the origin together, with a heart.",
    defaultFormat: "circle-35",
    formats: COMPACT,
    defaultColour: "emerald",
  }),
];


// ── Slow & sustainable ─────────────────────────────────────────────────────

const eco: Design[] = [
  design({
    slug: "upcycled",
    name: "Upcycled",
    lines: ["Upcycled"],
    font: "sans",
    icon: "leaf",
    themes: ["eco"],
    description: "For pieces reborn from something else. Leaf icon, lowercase-friendly sans.",
    defaultFormat: "rect-50x12",
    formats: WIDE,
    defaultColour: "sage",
    defaultFabric: "vegan-suede",
  }),
  design({
    slug: "slow-made",
    name: "Slow made",
    lines: ["slow made"],
    font: "serif",
    themes: ["eco", "handmade"],
    description: "A gentle serif for makers who take their time.",
    badge: "new",
    defaultFormat: "rect-46x16",
    formats: WIDE,
    defaultColour: "stone",
    defaultFabric: "vegan-suede",
  }),
  design({
    slug: "reclaimed",
    name: "Made from reclaimed fabric",
    lines: ["Made from", "reclaimed fabric"],
    font: "sans",
    icon: "leaf",
    iconPlacement: "above",
    themes: ["eco"],
    description: "Tells the story of thoughtfully sourced materials.",
    defaultFormat: "sq-30",
    formats: COMPACT,
    defaultColour: "olive",
    defaultFabric: "vegan-suede",
  }),
  design({
    slug: "zero-waste",
    name: "Zero waste",
    lines: ["ZERO WASTE"],
    font: "sans",
    caps: true,
    themes: ["eco"],
    description: "Clean capitals for scrap-busting projects and sustainable studios.",
    defaultFormat: "rect-50x12",
    formats: WIDE,
    defaultColour: "forest",
    defaultFabric: "vegan-suede",
  }),
  design({
    slug: "handmade-with-recycled-yarn",
    name: "Made with recycled yarn",
    lines: ["Made with", "recycled yarn"],
    font: "hand",
    icon: "yarn",
    iconPlacement: "right",
    themes: ["eco", "craft"],
    description: "For knitters and crocheters working with reclaimed fibre.",
    defaultFormat: "rect-50x20",
    defaultColour: "sand",
    defaultFabric: "vegan-suede",
  }),
];


// ── Care instructions ──────────────────────────────────────────────────────

const care: Design[] = [
  design({
    slug: "hand-wash-only",
    name: "Hand wash only",
    lines: ["Hand wash only"],
    font: "sans",
    themes: ["care"],
    description: "Clear, legible care text in a compact sans.",
    badge: "popular",
    defaultFormat: "rect-50x12",
    formats: WIDE,
    defaultColour: "charcoal",
  }),
  design({
    slug: "cold-gentle-wash",
    name: "Cold gentle wash",
    lines: ["Cold gentle wash"],
    font: "sans",
    themes: ["care"],
    description: "For delicate knits and hand-dyed pieces.",
    defaultFormat: "rect-50x12",
    formats: WIDE,
    defaultColour: "navy",
  }),
  design({
    slug: "wool-hand-wash-cold",
    name: "100% wool · hand wash cold",
    lines: ["100% WOOL", "hand wash cold · lay flat to dry"],
    font: "sans",
    caps: true,
    themes: ["care", "craft"],
    description: "A fibre line and a care line on one standard label.",
    defaultFormat: "rect-50x20",
    formats: ["rect-50x20", "rect-60x30", "fold-32x38", "tag-30x50"],
    defaultColour: "ivory",
  }),
  design({
    slug: "machine-washable",
    name: "Machine washable",
    lines: ["Machine washable"],
    font: "sans",
    themes: ["care"],
    description: "For hard-wearing pieces you want people to actually use.",
    defaultFormat: "rect-50x12",
    formats: WIDE,
    defaultColour: "black",
  }),
  design({
    slug: "lay-flat-to-dry",
    name: "Lay flat to dry",
    lines: ["Lay flat to dry"],
    font: "sans",
    themes: ["care"],
    description: "The knitter's most important instruction.",
    defaultFormat: "rect-50x12",
    formats: WIDE,
    defaultColour: "slate",
    defaultFabric: "vegan-suede",
  }),
  design({
    slug: "cotton-machine-wash",
    name: "100% cotton · machine wash",
    lines: ["100% COTTON", "machine wash cold"],
    font: "sans",
    caps: true,
    themes: ["care"],
    description: "Fibre and care together for quilts, tea towels and totes.",
    defaultFormat: "rect-50x20",
    formats: ["rect-50x20", "rect-60x30", "fold-32x38", "tag-30x50"],
    defaultColour: "charcoal",
  }),
];


// ── Size tags ──────────────────────────────────────────────────────────────

const clothingSizes = ["XS", "S", "M", "L", "XL", "XXL"];

const babySizes = ["0-3M", "3-6M", "6-12M", "12-18M", "18-24M", "2Y", "3Y", "4Y"];


const sizing: Design[] = [
  ...clothingSizes.map((size) =>
    design({
      slug: `size-${size.toLowerCase()}`,
      name: `Size ${size}`,
      lines: [size],
      font: "sans",
      caps: true,
      themes: ["sizing"],
      description: `A single ${size} size tag in a mini square or circle. Sew inside a neckline or waistband.`,
      defaultFormat: "sq-20",
      formats: TINY,
      defaultColour: "black",
      keywords: ["size tag", "clothing size"],
    }),
  ),
  ...babySizes.map((size) =>
    design({
      slug: `size-${size.toLowerCase()}`,
      name: `Size ${size}`,
      lines: [size],
      font: "sans",
      caps: true,
      themes: ["sizing", "baby"],
      description: `A ${size} baby size tag. Soft enough for bonnets, booties and onesies.`,
      defaultFormat: "circle-20",
      formats: TINY,
      defaultColour: "ivory",
      keywords: ["baby size", "size tag"],
    }),
  ),
];


// ── Gifting & occasions ────────────────────────────────────────────────────

const occasions: Design[] = [
  design({
    slug: "a-gift-for-you",
    name: "A gift for you",
    lines: ["A gift for you"],
    font: "script",
    icon: "gift",
    iconPlacement: "right",
    themes: ["occasions"],
    description: "Script with a little gift box. Lovely as a hang tag on wrapped pieces.",
    defaultFormat: "tag-30x50",
    defaultColour: "burgundy",
  }),
  design({
    slug: "merry-christmas",
    name: "Merry Christmas",
    lines: ["Merry Christmas"],
    font: "script",
    icon: "snowflake",
    iconPlacement: "right",
    themes: ["occasions"],
    description: "For stockings, tree skirts and handmade decorations.",
    badge: "new",
    defaultFormat: "rect-46x16",
    formats: WIDE,
    defaultColour: "emerald",
  }),
  design({
    slug: "especially-for-you",
    name: "Especially for you",
    lines: ["Especially", "for you"],
    font: "script",
    icon: "sparkle",
    iconPlacement: "above",
    themes: ["occasions", "with-love"],
    description: "A small sparkle above stacked script. For circles, hearts and squares.",
    defaultFormat: "circle-35",
    formats: COMPACT,
    defaultColour: "ivory",
  }),
  design({
    slug: "thank-you",
    name: "Thank you",
    lines: ["Thank you"],
    font: "serif",
    themes: ["occasions"],
    description: "A quiet thank-you for orders, favours and gifts.",
    defaultFormat: "rect-46x16",
    formats: WIDE,
    defaultColour: "sand",
    defaultFabric: "vegan-suede",
  }),
  design({
    slug: "made-for-you",
    name: "Made for you",
    lines: ["Made for you"],
    font: "hand",
    icon: "heart",
    themes: ["occasions", "with-love"],
    description: "Warm and personal for commissioned pieces.",
    defaultFormat: "rect-46x16",
    formats: WIDE,
    defaultColour: "terracotta",
  }),
  design({
    slug: "handmade-gift",
    name: "Handmade gift",
    lines: ["HANDMADE", "GIFT"],
    font: "sans",
    icon: "gift",
    iconPlacement: "above",
    caps: true,
    themes: ["occasions", "handmade"],
    description: "A stacked hang tag for market stalls and gift wrapping.",
    defaultFormat: "tag-30x50",
    formats: COMPACT,
    defaultColour: "black",
  }),
];


// ── Icon only ──────────────────────────────────────────────────────────────

const iconOnly: Array<[IconId, string, string]> = [
  ["heart", "Heart", "A single debossed heart. The simplest way to say it was made with love."],
  ["needle", "Needle & thread", "A needle and thread mark for sewists and embroiderers."],
  ["yarn", "Yarn ball", "A ball of yarn for knitters and crocheters."],
  ["scissors", "Scissors", "A pair of scissors for dressmakers and quilters."],
  ["leaf", "Leaf", "A leaf for sustainable and naturally dyed pieces."],
  ["star", "Star", "A small star for little ones and favourite things."],
  ["sparkle", "Sparkle", "A four-point sparkle for special pieces."],
];


const icons: Design[] = iconOnly.map(([icon, label, description]) =>
  design({
    slug: `icon-${icon}`,
    name: `${label} icon`,
    lines: [],
    font: "sans",
    icon,
    iconPlacement: "above",
    themes: ["icons"],
    description,
    defaultFormat: "sq-20",
    formats: TINY,
    defaultColour: icon === "heart" ? "blush" : "black",
    keywords: ["icon only", "minimal"],
  }),
);


export const DESIGNS: Design[] = [
  ...handmade,
  ...withLove,
  ...family,
  ...craft,
  ...custom,
  ...baby,
  ...australian,
  ...eco,
  ...care,
  ...sizing,
  ...occasions,
  ...icons,
];
