import { site } from "@/lib/site";
import { profile } from "@/data/profile";

export function ProfileStructuredData() {
  const person = {
    "@type": "Person",
    ...(site.url && { "@id": `${site.url}/#ivan`, url: `${site.url}/` }),
    name: site.name,
    alternateName: site.alternateName,
    description: profile.summary,
    homeLocation: {
      "@type": "City",
      name: "Reykjavík, Iceland",
    },
    sameAs: [profile.contact.instagram.url],
    knowsAbout: [
      "Cybersecurity",
      "Programming",
      "User interface design",
      "Photography",
      "Scuba diving",
      "Snowboarding",
    ],
  };
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    ...(site.url && { url: `${site.url}/` }),
    name: `${site.name} — Personal portfolio`,
    mainEntity: person,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
