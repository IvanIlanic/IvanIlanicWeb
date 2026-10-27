export const editingStory = {
  image: {
    // Replace with the full-resolution source photo when it is available.
    src: "/images/editing-study-example.png",
    alt: "A blue Icelandic rescue vehicle with large tires beneath red rescue flags",
    caption: "Reference example · AI-retouched",
  },
  duration: 12,
  steps: [
    {
      title: "Lift the shadows",
      note: "There’s detail hiding in the tires and under the vehicles. I want to bring it back without flattening the whole frame.",
    },
    {
      title: "Let the subjects stand out",
      note: "A soft mask and a little more light on the vehicles give the eye somewhere to land.",
    },
    {
      title: "Quiet the background",
      note: "I’d pull the surroundings down slightly so they support the subjects, instead of competing for attention.",
    },
    {
      title: "Find the light",
      note: "A warm flare from the upper-right corner gives the frame a direction and a little atmosphere.",
    },
  ],
  // Masks use the sample's 640 × 960 coordinate system. A higher-resolution
  // copy with the same framing can use these; a different crop needs alignment.
  subjectPath:
    "M48 512 65 421 148 397 181 337Q205 309 270 307L408 300Q439 306 462 345L499 359 542 431 566 492 591 550 604 598 566 636 532 639 507 618 436 613Q421 660 373 663L342 651 321 616 173 613Q149 657 104 659L72 645 54 611Z",
  bodyPath:
    "M51 511 69 425 151 400 184 340Q207 312 270 312L407 305Q437 311 458 350L495 364 538 435 560 494 579 544 543 566 471 565 437 536 403 505 365 505 335 550 182 555 150 533 92 551 57 539Z",
};
