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

// Descriptions are grounded in the public repositories and the uploaded thesis. Do not add
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
    category: "DEFENSIVE CYBERSECURITY / BACHELOR’S THESIS",
    headline: "Making cyber defense hands-on.",
    problem:
      "Beginners often encounter cybersecurity through offensive challenges. I wanted to make defensive skills—finding weaknesses, prioritizing fixes, and securing systems—engaging and approachable through practical learning.",
    approach:
      "For my bachelor’s thesis at Reykjavík University in 2026, I designed and implemented narrative-led defensive challenges in local Ubuntu virtual machines. A cyberpunk terminal guide, progressive hints, and automated system checks help learners work through SQL injection and system-configuration problems.",
    tags: ["Cyber defense", "Ubuntu VMs", "Game-based learning"],
    detail: {
      title: "Designing a learning loop around defensive decisions.",
      body: "A system-state checker tracks mitigations, while a narrative watcher delivers guidance and feedback. Defense in depth, prioritization, and immediate response shape the learning path. The thesis documents two challenge instances—SQL injection and Ubuntu administration—and a reusable template for designing more. Evaluating the challenges with learners from different backgrounds is a next step identified in the thesis. The accompanying React/Django project explores the separate team-based web model described in the paper.",
    },
    links: [
      {
        label: "Explore the project",
        href: "https://github.com/IvanIlanic/defendTheFlag",
      },
    ],
    // Reviewed against Ivan's uploaded thesis, especially chapters 1, 3, 6–8.
    paperUrl: "https://skemman.is/handle/1946/53559?locale=en",
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
