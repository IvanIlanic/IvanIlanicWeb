export type ProjectCaseStudy = {
  id: string;
  theme: "beerluga" | "defend" | "business";
  title: string;
  category: string;
  headline: string;
  problem: string;
  approach: string;
  tags: string[];
  detail: { title: string; body: string };
  links: { label: string; href: string }[];
  paperUrl?: string | null;
};

// Descriptions are grounded in the public project repositories. Do not add
// performance, adoption, client, or academic claims without supporting details.
export const projects: ProjectCaseStudy[] = [
  {
    id: "01",
    theme: "beerluga",
    title: "Beerluga",
    category: "HAPPY-HOUR DISCOVERY / REYKJAVÍK",
    headline: "A better answer to “where next?”",
    problem:
      "Happy-hour times, prices, and locations are scattered across venues. Finding an offer that fits your plans can take more searching than it should.",
    approach:
      "I built Beerluga to bring that information together on an interactive map of Reykjavík. It helps people explore bars, compare drink prices, filter by time and price, and see which happy hours are active.",
    tags: ["React", "MapLibre", "Time & price filters"],
    detail: {
      title: "Making the information useful in the moment.",
      body: "The app distinguishes active, upcoming, and later offers, with logic for day-specific schedules and happy hours that cross midnight. Location support and bar details connect the map to the decision someone is trying to make: where to go next.",
    },
    links: [
      { label: "Open Beerluga", href: "https://beerluga.com" },
      { label: "View code", href: "https://github.com/IvanIlanic/beerluga" },
    ],
  },
  {
    id: "02",
    theme: "defend",
    title: "Defend the Flag",
    category: "CYBERSECURITY / PROJECT & WRITING",
    headline: "Learning security by building it.",
    problem:
      "Cybersecurity can feel abstract until you have a system to build, decisions to make, and a team depending on how well you understand it.",
    approach:
      "Defend the Flag is my cybersecurity project and paper. The public application explores hands-on, team-based learning, pairing a React interface with a Django API for profiles, teams, and game sessions.",
    tags: ["React", "Django", "Team-based learning"],
    detail: {
      title: "Connecting system design with practical challenges.",
      body: "The project’s learning model asks teams to create and secure a system, then explore its weaknesses in a game setting. The repository includes game-master roles and practice challenges, making teamwork and application design part of the same exploration.",
    },
    links: [
      {
        label: "Explore the project",
        href: "https://github.com/IvanIlanic/defendTheFlag",
      },
    ],
    // Add the paper's actual public URL when supplied. Its text has not yet
    // been reviewed, so no publication details or research findings are claimed.
    paperUrl: null,
  },
  {
    id: "03",
    theme: "business",
    title: "Small businesses, more digital",
    category: "PRACTICAL DIGITALIZATION / KAZUNI NINA",
    headline: "Less friction in the everyday.",
    problem:
      "A small business needs to be easy to find, explain what it offers, and keep track of customer requests. Those everyday jobs can become harder when information lives in several places.",
    approach:
      "I help bring that work into clearer digital experiences. One example is Kazuni Nina, a storefront project for handmade kazuni, with a product catalogue, a multilingual interface, and pickup or delivery requests.",
    tags: ["Storefronts", "Simple workflows", "React + Node.js"],
    detail: {
      title: "Starting with how the business actually works.",
      body: "The project gives the seller tools to manage listings and appointment availability while customers can make purchase requests without creating an account. English, Croatian, and German interfaces make the storefront more approachable. The focus is a manageable request workflow, rather than adding complexity for its own sake.",
    },
    links: [
      {
        label: "See the storefront project",
        href: "https://github.com/IvanIlanic/KazuniNina",
      },
      { label: "Discuss a business problem", href: "#contact" },
    ],
  },
];
