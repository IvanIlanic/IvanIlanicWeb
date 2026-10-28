export type TravelPlace = {
  id: string;
  name: string;
  coordinates: [longitude: number, latitude: number];
  note?: string;
  home?: "origin" | "current";
};

export type TravelDestination = {
  id: string;
  name: string;
  mapId?: string;
  territory?: boolean;
  places: TravelPlace[];
};

// Coordinates identify places, not dates, flight paths, or an exact itinerary.
// The Sahara marker represents a broad region, not an asserted town or camp.
export const travelDestinations: TravelDestination[] = [
  {
    id: "croatia",
    name: "Croatia",
    mapId: "191",
    places: [
      {
        id: "rijeka",
        name: "Rijeka",
        coordinates: [14.4422, 45.3271],
        home: "origin",
        note: "Where I’m originally from.",
      },
    ],
  },
  {
    id: "iceland",
    name: "Iceland",
    mapId: "352",
    places: [
      {
        id: "reykjavik",
        name: "Reykjavík",
        coordinates: [-21.9426, 64.1466],
        home: "current",
        note: "Where I live now.",
      },
    ],
  },
  {
    id: "canada",
    name: "Canada",
    mapId: "124",
    places: [
      { id: "calgary", name: "Calgary", coordinates: [-114.0719, 51.0447] },
      { id: "banff", name: "Banff", coordinates: [-115.5708, 51.1784] },
      {
        id: "regina",
        name: "Regina",
        coordinates: [-104.6189, 50.4452],
        note: "Saskatchewan",
      },
      { id: "halifax", name: "Halifax", coordinates: [-63.5752, 44.6488] },
    ],
  },
  {
    id: "france",
    name: "France",
    mapId: "250",
    places: [
      {
        id: "les-deux-alpes",
        name: "Les Deux Alpes",
        coordinates: [6.1218, 45.0106],
      },
      { id: "paris", name: "Paris", coordinates: [2.3522, 48.8566] },
    ],
  },
  {
    id: "italy",
    name: "Italy",
    mapId: "380",
    places: [
      { id: "trieste", name: "Trieste", coordinates: [13.7768, 45.6495] },
      { id: "rome", name: "Rome", coordinates: [12.4964, 41.9028] },
      { id: "naples", name: "Naples", coordinates: [14.2681, 40.8518] },
    ],
  },
  {
    id: "austria",
    name: "Austria",
    mapId: "040",
    places: [
      { id: "klagenfurt", name: "Klagenfurt", coordinates: [14.3053, 46.6365] },
      { id: "graz", name: "Graz", coordinates: [15.4395, 47.0707] },
    ],
  },
  {
    id: "hungary",
    name: "Hungary",
    mapId: "348",
    places: [
      { id: "budapest", name: "Budapest", coordinates: [19.0402, 47.4979] },
    ],
  },
  {
    id: "poland",
    name: "Poland",
    mapId: "616",
    places: [{ id: "krakow", name: "Kraków", coordinates: [19.945, 50.0647] }],
  },
  {
    id: "morocco",
    name: "Morocco",
    mapId: "504",
    places: [
      { id: "marrakesh", name: "Marrakesh", coordinates: [-7.9811, 31.6295] },
      { id: "essaouira", name: "Essaouira", coordinates: [-9.7595, 31.5085] },
      {
        id: "sahara",
        name: "Eastern Moroccan Sahara",
        coordinates: [-4.1, 31.3],
        note: "Approximate regional marker; the exact stop isn’t specified.",
      },
    ],
  },
  {
    id: "spain",
    name: "Spain",
    mapId: "724",
    places: [
      { id: "malaga", name: "Málaga", coordinates: [-4.4214, 36.7213] },
      { id: "almeria", name: "Almería", coordinates: [-2.4637, 36.834] },
      { id: "cartagena", name: "Cartagena", coordinates: [-0.9812, 37.6257] },
      { id: "alicante", name: "Alicante", coordinates: [-0.4907, 38.3452] },
      { id: "valencia", name: "Valencia", coordinates: [-0.3763, 39.4699] },
      { id: "barcelona", name: "Barcelona", coordinates: [2.1734, 41.3851] },
    ],
  },
  {
    id: "gibraltar",
    name: "Gibraltar",
    territory: true,
    places: [
      {
        id: "gibraltar",
        name: "Gibraltar",
        coordinates: [-5.3536, 36.1408],
        note: "British Overseas Territory",
      },
    ],
  },
];

export const mappedPlaces = travelDestinations.flatMap((destination) =>
  destination.places.map((place) => ({
    ...place,
    destinationId: destination.id,
    destinationName: destination.name,
  })),
);

export const originPlace = mappedPlaces.find(
  (place) => place.home === "origin",
)!;
export const currentPlace = mappedPlaces.find(
  (place) => place.home === "current",
)!;
export const visitedCountryCount = travelDestinations.filter(
  (destination) => !destination.territory,
).length;
