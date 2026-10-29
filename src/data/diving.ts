export type DivePhoto = {
  id: string;
  src: string | null;
  alt: string;
  caption: string;
};

export const diving = {
  story: [
    "Wanna hit another dimension, your should try scuba diving. I would even compare it to Ricks portal gun HAHA!!",
    "As a kid I was surrounded by the sea, that led to unhealty oppsesion with breath diving, discovering the underwater world was an incredible never ending novel of fish, weird looking sea objects and grass. Then one day I saw a bunch of dudes in blacksuits and big tanks on their back. I asked my dad who are those pals. Its the divers son, the ultimative exploreres of the sea. From that day, I was hooked. ",
    "I have completed my Open water and Advanced Open Water diver license and how next big step is the DiveMaster.",
  ],
  qualifications: [
    { title: "Open Water Diver", status: "Completed", completed: true },
    {
      title: "Advanced Open Water Diver",
      status: "Completed",
      completed: true,
    },
    {
      title: "Divemaster",
      status: "Next goal · this summer",
      completed: false,
    },
  ],
};

// Add your files to public/images/ and replace null with a public image path,
// e.g. "/images/diving-01.jpg". Update alt text to describe each actual photo.
export const divePhotos: DivePhoto[] = [
  {
    id: "01",
    src: "/images/Dive1.jpg",
    alt: "Two scuba divers in masks and regulators posing together underwater",
    caption: "Diving with me wify<3",
  },
  {
    id: "02",
    src: "/images/Dive2.jpg",
    alt: "A group of scuba divers hovering above a submerged structure in blue-green water",
    caption: "Diving on Krk by the shipwreck GRK",
  },
  {
    id: "03",
    src: "/images/Dive3.jpg",
    alt: "A diver in scuba equipment making a playful hand gesture outdoors",
    caption: "Some dumbass posing, oh wait thats me",
  },
];
