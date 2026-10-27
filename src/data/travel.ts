export type TravelPhoto = {
  id: string;
  src: string | null;
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

// Add your images to public/images/ and set each src to its public path,
// e.g. "/images/travel-01.jpg". Captions and alt text should match the real photos.
export const travelPhotos: TravelPhoto[] = [
  {
    id: "01",
    src: null,
    alt: "Travel photograph 1",
    caption: "A new perspective",
  },
  {
    id: "02",
    src: null,
    alt: "Travel photograph 2",
    caption: "Somewhere unfamiliar",
  },
  {
    id: "03",
    src: null,
    alt: "Travel photograph 3",
    caption: "The unexpected",
  },
  {
    id: "04",
    src: null,
    alt: "Travel photograph 4",
    caption: "Worth the detour",
  },
];
