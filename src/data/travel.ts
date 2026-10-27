export type TravelPhoto = {
  id: string;
  src: string;
  objectPosition?: string;
  alt: string;
  caption: string;
};

export const travel = {
  story: [
    "I love travelling with enough room in the plan for something unexpected. A new place, a conversation, or an opportunity I hadn’t considered can change the direction of a trip—and that’s part of what I enjoy.",
    "Being outside my comfort zone isn’t always easy, but it makes me pay attention. I learn to be more adaptable, meet people with different perspectives, and say yes to experiences I might otherwise miss. I want to stay open to what a place can teach me, even when it isn’t what I expected.",
  ],
  thought: "I don’t need every turn mapped out.",
};

// Personal travel photographs. Captions describe moments without inventing dates or itineraries.
export const travelPhotos: TravelPhoto[] = [
  {
    id: "01",
    src: "/images/Travel1.png",
    alt: "Two snowboarders raising their arms on a snowy mountain slope",
    caption: "A little further up",
    objectPosition: "50% 45%",
  },
  {
    id: "02",
    src: "/images/Travel4.png",
    alt: "Kayakers on calm water beside a coastal town at sunset",
    caption: "The long way round",
    objectPosition: "50% 50%",
  },
  {
    id: "03",
    src: "/images/Travel18.png",
    alt: "A camel rider in a blue headscarf among golden desert dunes",
    caption: "Into the unfamiliar",
    objectPosition: "50% 35%",
  },
  {
    id: "04",
    src: "/images/Travel3.png",
    alt: "Three snowboarders wearing helmets and goggles on a ski lift",
    caption: "Better with company",
    objectPosition: "50% 45%",
  },
  {
    id: "05",
    src: "/images/Travel5.png",
    alt: "A traveller jumping between dark rocks beneath a blue sky",
    caption: "Say yes to the detour",
    objectPosition: "50% 40%",
  },
  {
    id: "06",
    src: "/images/Travel14.png",
    alt: "A helmeted hiker on a narrow cliffside walkway above a river",
    caption: "Outside the comfort zone",
    objectPosition: "50% 60%",
  },
  {
    id: "07",
    src: "/images/Travel12.png",
    alt: "Scuba divers exploring a submerged structure in blue-green water",
    caption: "A quieter world",
    objectPosition: "50% 50%",
  },
  {
    id: "08",
    src: "/images/Travel16.png",
    alt: "Bright green northern lights sweeping across a dark night sky",
    caption: "Look up, stay a while",
    objectPosition: "50% 40%",
  },
  {
    id: "09",
    src: "/images/Travel123.png",
    alt: "A hiker with trekking poles before rugged mountains and clouds",
    caption: "Another kind of perspective",
    objectPosition: "50% 45%",
  },
  {
    id: "10",
    src: "/images/Travel17.png",
    alt: "A low-angle night view beneath the illuminated Eiffel Tower",
    caption: "After the city lights up",
    objectPosition: "50% 50%",
  },
  {
    id: "11",
    src: "/images/Travel24.png",
    alt: "A traveller posing in front of the towers of the Sagrada Fam\u00edlia",
    caption: "Something around every corner",
    objectPosition: "50% 55%",
  },
  {
    id: "12",
    src: "/images/Travel121.png",
    alt: "A traveller in a sunlit street lined with stone buildings and palm trees",
    caption: "No hurry to get there",
    objectPosition: "50% 55%",
  },
  {
    id: "13",
    src: "/images/Travel2.png",
    alt: "Two people in kayaks silhouetted against an orange sunset over the sea",
    caption: "One more moment",
    objectPosition: "50% 50%",
  },
  {
    id: "14",
    src: "/images/Travel10.png",
    alt: "A traveller in a patterned scarf taking a selfie with a group in the desert",
    caption: "New faces, new stories",
    objectPosition: "50% 45%",
  },
  {
    id: "15",
    src: "/images/Travel15.png",
    alt: "A traveller with a backpack beside a red telephone box",
    caption: "A familiar little landmark",
    objectPosition: "50% 45%",
  },
  {
    id: "16",
    src: "/images/Travel19.png",
    alt: "A sideways selfie of a smiling traveller in a blue headscarf beside a camel",
    caption: "An unexpected hello",
    objectPosition: "50% 65%",
  },
  {
    id: "17",
    src: "/images/Travel20.png",
    alt: "A hiker with a red backpack standing near a monkey on a viewpoint wall",
    caption: "Sharing the view",
    objectPosition: "50% 50%",
  },
  {
    id: "18",
    src: "/images/Travel22.png",
    alt: "A traveller beside a reflecting pool and curved modern architecture at sunset",
    caption: "Room for the unexpected",
    objectPosition: "50% 55%",
  },
];
