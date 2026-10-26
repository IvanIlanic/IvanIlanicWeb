export type Photograph = {
  id: string;
  title: string;
  category: "Landscapes" | "Details";
  src: string;
  alt: string;
  location: string;
  credit: string;
  creditUrl: string;
};

// Sample imagery, not Ivan's photographs. Replace these records with personal work.
export const photographs: Photograph[] = [
  {
    id: "01",
    title: "Where the world stands still",
    category: "Landscapes",
    src: "/images/alpine.jpg",
    alt: "Rocky mountain peaks mirrored in a blue alpine lake",
    location: "Moraine Lake, Canada",
    credit: "John Lee",
    creditUrl: "https://unsplash.com/@john_artifexfilms",
  },
  {
    id: "02",
    title: "A softer kind of silence",
    category: "Landscapes",
    src: "/images/lake.jpg",
    alt: "A quiet lake framed by evergreen forest and distant mountains",
    location: "Canadian wilderness",
    credit: "Tj Holowaychuk",
    creditUrl: "https://unsplash.com/@tjholowaychuk",
  },
  {
    id: "03",
    title: "The art of slowing down",
    category: "Details",
    src: "/images/maple.jpg",
    alt: "Sunlight falling through red maple leaves",
    location: "An autumn study",
    credit: "Guillaume Jaillet",
    creditUrl: "https://unsplash.com/@i_am_g",
  },
  {
    id: "04",
    title: "Somewhere, beyond",
    category: "Landscapes",
    src: "/images/ocean.jpg",
    alt: "An expansive ocean beneath a soft, open sky",
    location: "Along the coast",
    credit: "YUCAR FotoGrafik",
    creditUrl: "https://unsplash.com/@yucar",
  },
];
