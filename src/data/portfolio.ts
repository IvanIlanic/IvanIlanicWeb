export const photographCategories = [
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
export const photographs: Photograph[] = [
  {
    id: "01",
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
    id: "02",
    title: "A little rhythm behind the bar",
    category: "Events",
    src: "/images/Gallery/Cocktailweek-07.jpg",
    alt: "A smiling bartender holding two metal cocktail shakers behind a colorful bar",
    width: 3044,
    height: 4566,
    location: "Cocktail week · Behind the bar",
    credit: "Ivan Ilanić",
  },
  {
    id: "03",
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
    id: "04",
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
    id: "05",
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
