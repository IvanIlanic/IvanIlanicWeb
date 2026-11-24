export const photographCategories = [
  "Restaurant & bar",
  "Automotive",
  "Portraits",
  "Events",
] as const;

export type Photograph = {
  id: string;
  title: string;
  category: (typeof photographCategories)[number];
  src: string;
  alt: string;
  width: number;
  height: number;
  location: string;
  credit: string;
};

// Personal photographs supplied by Ivan. Keep dimensions in sync with new files
// so each preview preserves the original composition without a forced crop.
const individuallyCaptionedPhotographs: Omit<Photograph, "id">[] = [
  {
    title: "Chasing the last light",
    category: "Automotive",
    src: "/images/Gallery/Carmeet6-116.jpg",
    alt: "A white sports car and a burgundy sports car parked beneath a golden sunset sky",
    width: 5934,
    height: 3956,
    location: "Car meet · The golden hour",
    credit: "Ivan Ilanić",
  },
  {
    title: "A little rhythm behind the bar",
    category: "Restaurant & bar",
    src: "/images/Gallery/Cocktailweek-07.jpg",
    alt: "A smiling bartender holding two metal cocktail shakers behind a colorful bar",
    width: 3044,
    height: 4566,
    location: "Cocktail week · Behind the bar",
    credit: "Ivan Ilanić",
  },
  {
    title: "Sexy looking fellow",
    category: "Portraits",
    src: "/images/Gallery/DSC06136.jpg",
    alt: "A man in a black T-shirt looking toward the camera beside a warmly lit bar",
    width: 4672,
    height: 7008,
    location: "A portrait study",
    credit: "Ivan Ilanić",
  },
  {
    title: "Amazed by nature",
    category: "Events",
    src: "/images/Gallery/MicroConf2026-03.jpg",
    alt: "People in outdoor jackets smiling and talking beside steam rising from a rocky landscape",
    width: 7008,
    height: 4672,
    location: "MicroConf 2026 · Candid moments",
    credit: "Ivan Ilanić",
  },
  {
    title: "In good company",
    category: "Events",
    src: "/images/Gallery/TravelPerlan-02.jpg",
    alt: "A woman with glasses smiling during a conversation at a warmly lit gathering",
    width: 7008,
    height: 4672,
    location: "A candid conversation",
    credit: "Ivan Ilanić",
  },
];

type GalleryFrame = [
  filename: string,
  width: number,
  height: number,
  title: string,
  alt: string,
];

type GallerySeries = {
  category: Photograph["category"];
  location: string;
  frames: GalleryFrame[];
};

const gallerySeries: GallerySeries[] = [
  {
    category: "Restaurant & bar",
    location: "Bruno Bar",
    frames: [
      ["Bruno Bar Edit-03.jpg", 4481, 6721, "By candlelight", "A candle and glassware on a dark wooden table"],
      ["Bruno Bar Edit-11.jpg", 6917, 4508, "A seat at the bar", "A shaded lamp beside red seating and illuminated bottles"],
      ["Bruno Bar Edit-12.jpg", 6655, 4437, "Behind the counter", "A bartender beneath shelves filled with brightly lit bottles"],
      ["Bruno Bar Edit-13.jpg", 6449, 4342, "Across the room", "A wide view of the bar with warm pendant lights and mirrored walls"],
      ["Bruno Bar Edit-18.jpg", 4672, 7008, "In amber light", "A row of liquor bottles lit from below along a shelf"],
      ["Bruno Bar Edit-25.jpg", 5781, 3936, "Through the leaves", "Dark green leaves against a warmly lit interior"],
      ["Bruno Bar Edit-37.jpg", 6807, 4163, "Top shelf", "Colorful bottle labels viewed from below"],
      ["Bruno Bar Edit-43.jpg", 6952, 4635, "A quiet corner", "Red seating and a table lamp with the bar blurred behind them"],
    ],
  },
  {
    category: "Automotive",
    location: "Car meet",
    frames: [
      ["Carmeet6-007.jpg", 4672, 7008, "After dark", "The illuminated taillights of a yellow car against a black background"],
      ["Carmeet6-009.jpg", 4232, 6348, "Under the lamps", "A car parked beside a concrete wall under bright exterior lamps"],
      ["Carmeet6-183.jpg", 6231, 4154, "Red and blue", "A blue sports car beneath a red-lit storefront"],
    ],
  },
  {
    category: "Restaurant & bar",
    location: "Cocktail week",
    frames: [
      ["Cocktailweek-02.jpg", 2088, 3132, "Ready to pour", "A bartender standing behind rows of bottles and metal bar tools"],
      ["Cocktailweek-06.jpg", 2803, 4205, "At the table", "Three guests leaning in around a candlelit table"],
      ["Cocktailweek-11.jpg", 4203, 6304, "Across the bar", "A bartender framed by blurred silhouettes in the foreground"],
    ],
  },
  {
    category: "Restaurant & bar",
    location: "Holt",
    frames: [
      ["HoltFood-12.jpg", 4672, 7008, "From above", "An overhead view of drinks and small plates on a dark table"],
      ["HoltFood-14.jpg", 4672, 7008, "At the pass", "A hand reaches over a table of fries and plated food"],
    ],
  },
  {
    category: "Events",
    location: "MicroConf 2026",
    frames: [
      ["MicroConf2026-14.jpg", 4672, 7008, "Across the boardwalk", "Two hikers in orange and green jackets cross a wooden footpath"],
      ["MicroConf2026-30.jpg", 4672, 7008, "On the rocky path", "A group in outdoor jackets walks up a rocky trail"],
      ["MicroConf2026-39.jpg", 7008, 4672, "Looking out", "Two hikers look across a wide valley under a gray sky"],
      ["MicroConf2026-53.jpg", 6612, 4408, "A pause on the trail", "A group in hiking jackets stands beside a building with a hillside behind them"],
      ["MicroConf2026-56.jpg", 4240, 6360, "Bright jackets, gray skies", "Hikers in bright orange and yellow jackets stand on a paved path"],
    ],
  },
  {
    category: "Portraits",
    location: "Premier League",
    frames: [
      ["Premier League-09.jpg", 4217, 4217, "Inside the circle", "A person in a cap in front of a glowing red and blue dartboard"],
    ],
  },
  {
    category: "Events",
    location: "Premier League",
    frames: [
      ["Premier League-11.jpg", 4672, 4672, "Lining up the shot", "A pool player bends over a red table to aim a cue"],
    ],
  },
  {
    category: "Automotive",
    location: "Rescue vehicle exhibition",
    frames: [
      ["RescueVExp-28.jpg", 6139, 4093, "Rescue lineup", "Orange and black emergency vehicles parked in a row"],
      ["RescueVExp-51.jpg", 4181, 6271, "High visibility", "A rescue vehicle with red and yellow chevrons beneath a glass building"],
      ["RescueVExp-55.jpg", 4179, 6268, "On wet pavement", "A white off-road rescue truck parked on a rain-slick street"],
      ["RescueVExp-60.jpg", 4672, 7008, "In the side mirror", "Emergency vehicles reflected in a vehicle side mirror"],
    ],
  },
  {
    category: "Events",
    location: "Conference",
    frames: [
      ["TravelDay1-04.jpg", 7008, 4672, "From the audience", "A speaker at a podium in front of a projected slide"],
      ["TravelDay1-09.jpg", 4672, 3115, "A warm welcome", "A smiling conference guest raises a hand in a crowded room"],
      ["TravelDay1-10.jpg", 4672, 3115, "Between sessions", "Conference guests talk in a room with tall curtained windows"],
      ["TravelDay1-19.jpg", 4271, 6407, "Applause", "An audience member claps from a seat among other attendees"],
      ["TravelDay1-26.jpg", 7008, 4672, "A full room", "Rows of seated attendees face a speaker in a bright conference hall"],
    ],
  },
  {
    category: "Events",
    location: "Perlan",
    frames: [
      ["TravelPerlan-08.jpg", 6429, 4286, "Around the table", "Two guests with glasses sit at a dinner table beside dark windows"],
      ["TravelPerlan-12.jpg", 4672, 7008, "An evening conversation", "Two guests talk beside angled windows at an evening gathering"],
      ["TravelPerlan-13.jpg", 4672, 3115, "Across the table", "A guest in glasses and a plaid shirt talks with another diner"],
      ["TravelPerlan-17.jpg", 6162, 4108, "A shared story", "Four diners gather around a table with drinks"],
      ["TravelPerlan-22.jpg", 4413, 2942, "Blue hour at dinner", "A guest framed by two diners sits beside a window at dusk"],
      ["TravelPerlan-24.jpg", 4672, 3115, "Dinner by the windows", "A group talks around a long dinner table beside angled windows"],
      ["TravelPerlan-34.jpg", 4672, 7008, "A crowded table", "Guests share dinner at a table beside a wall of greenery"],
    ],
  },
  {
    category: "Restaurant & bar",
    location: "Perlan",
    frames: [
      ["TravelPerlan-36.jpg", 4672, 7008, "Warm tones", "A close-up of an orange dish with soft lights in the background"],
      ["TravelPerlan-37.jpg", 4672, 7008, "At the table’s edge", "A close-up of a dish with green garnish against a softly lit background"],
    ],
  },
  {
    category: "Automotive",
    location: "Car study",
    frames: [
      ["car1-148.jpg", 7008, 4672, "A line of light", "Bright red and amber taillights on a car in the dark"],
      ["car1-374.jpg", 4410, 6615, "Yellow in the dark", "A yellow car viewed from above with people beside it"],
      ["car1-384.jpg", 4511, 6767, "Headlights on", "A red car faces the camera with bright headlights in a dark garage"],
    ],
  },
  {
    category: "Events",
    location: "Classroom",
    frames: [
      ["car1-204.jpg", 7008, 4672, "In the classroom", "Three people sit at a row of desks in a sunlit classroom"],
      ["car1-223.jpg", 7008, 4672, "At the whiteboard", "A hand draws a diagram with a marker on a whiteboard"],
      ["car1-226.jpg", 7008, 4672, "Working it out", "A group collaborates around a table in a classroom"],
      ["car1-232.jpg", 7008, 4672, "Side by side", "Three people work at laptops along a row of desks"],
      ["car1-238.jpg", 7008, 4672, "A shared screen", "People smile and lean in around a laptop at a table"],
    ],
  },
];

const featuredFilenames = [
  "Bruno Bar Edit-11.jpg",
  "Cocktailweek-07.jpg",
  "HoltFood-12.jpg",
  "Carmeet6-116.jpg",
  "MicroConf2026-39.jpg",
];
const featuredOrder = new Map(
  featuredFilenames.map((filename, index) => [`/images/Gallery/${filename}`, index]),
);
export const featuredPhotographCount = featuredFilenames.length;

export const photographs: Photograph[] = [
  ...individuallyCaptionedPhotographs,
  ...gallerySeries.flatMap(({ category, location, frames }) =>
    frames.map(([filename, width, height, title, alt]) => ({
      src: `/images/Gallery/${filename}`,
      category,
      location,
      width,
      height,
      title,
      alt,
      credit: "Ivan Ilanić",
    })),
  ),
]
  .sort(
    (a, b) =>
      (featuredOrder.get(a.src) ?? featuredPhotographCount) -
      (featuredOrder.get(b.src) ?? featuredPhotographCount),
  )
  .map((frame, index) => ({
    ...frame,
    id: String(index + 1).padStart(2, "0"),
  }));
