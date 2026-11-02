// Ivan's preferred public origin; SITE_URL remains an optional build override.
// Keep the custom domain canonical when serving the same site on workers.dev.
const configuredUrl = process.env.SITE_URL?.trim() || "https://ivanilanic.com";

function publicOrigin(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const url = new URL(value);
  if (
    url.protocol !== "https:" ||
    url.pathname !== "/" ||
    url.search ||
    url.hash ||
    url.username ||
    url.password
  )
    throw new Error(
      "SITE_URL must be an HTTPS origin, such as https://your-domain.com, without a path or query.",
    );
  return url.origin;
}

export const site = {
  url: publicOrigin(configuredUrl),
  name: "Ivan Ilanić",
  alternateName: "Ivan Ilanic",
  title: "Ivan Ilanić | Cybersecurity, Photography & Creative Projects",
  googleVerification: process.env.GOOGLE_SITE_VERIFICATION?.trim(),
};
