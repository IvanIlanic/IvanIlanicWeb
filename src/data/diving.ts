export type DivePhoto = {
  id: string;
  src: string | null;
  alt: string;
  caption: string;
};

export const diving = {
  story: [
    "I’ve fallen in love with scuba diving. Underwater, the noise of everyday life falls away. There’s a kind of peace in slowing down, staying present, and paying attention to every breath.",
    "What draws me in is the balance: feeling calm and in control while knowing the environment demands respect. Conditions can become critical, and that makes awareness, preparation, and good decisions matter. For me, diving brings adventure and discipline into the same moment.",
    "I’ve completed my Open Water Diver and Advanced Open Water Diver certifications. This summer, I’m working toward my next goal: Divemaster.",
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
    caption: "Below the surface",
  },
  {
    id: "02",
    src: "/images/Dive2.jpg",
    alt: "A group of scuba divers hovering above a submerged structure in blue-green water",
    caption: "A different kind of quiet",
  },
  {
    id: "03",
    src: "/images/Dive3.jpg",
    alt: "A diver in scuba equipment making a playful hand gesture outdoors",
    caption: "More to discover",
  },
];
