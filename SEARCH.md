# Help people find Ivan’s portfolio on Google

The site includes a descriptive title and summary, the accented and unaccented name, visible hometown/current-city context, Person/ProfilePage structured data, crawl directives, and static search metadata. These help search engines understand the page; indexing and ranking are still controlled by Google.

## 1. Preferred public address

Ivan's confirmed preferred address is **https://ivanilanic.com**. It is configured in `src/lib/site.ts` and used for the canonical URL, Open Graph metadata, structured profile data, `robots.txt`, and `sitemap.xml`. No Cloudflare environment variable is required for this address. The deployment must serve the site publicly on that domain.

If a `SITE_URL` build variable was set previously, remove it or set it to the same address in **Cloudflare → Workers & Pages → ivanilanicweb → Settings → Build → Variables and secrets**:

```text
SITE_URL = https://ivanilanic.com
```

This optional override is a **build variable**, not a runtime Worker binding. Use an HTTPS origin without a page path, query, or fragment. Rebuild the latest `main` commit after changing it. Copies served on a Cloudflare-provided address should keep `https://ivanilanic.com` as the preferred canonical origin.

After deployment, check [robots.txt](https://ivanilanic.com/robots.txt) and [sitemap.xml](https://ivanilanic.com/sitemap.xml). The sitemap should contain `https://ivanilanic.com/` once. For local development, `.env.example` documents the optional overrides.

## 2. Verify ownership in Google Search Console

1. Open [Google Search Console](https://search.google.com/search-console/).
2. Add a **URL prefix** property for `https://ivanilanic.com/`. A **Domain** property for `ivanilanic.com` is an alternative, verified through DNS.
3. For URL-prefix verification, choose **HTML tag**. Copy only the `content` value from Google's verification tag.
4. Add another Cloudflare **build** variable named `GOOGLE_SITE_VERIFICATION` with that value. It is public verification metadata; do not paste account passwords or API keys.
5. Rebuild the latest commit, confirm the tag is present in the live page source, then click **Verify** in Search Console. Keep the verification value configured after verification.

## 3. Request indexing

1. Open the live `/robots.txt` URL. It should allow `/` and list your production `/sitemap.xml` address.
2. Open `/sitemap.xml`. It should list the homepage once. The portfolio's sections are anchors on that single page, so they do not need separate sitemap entries.
3. In Search Console → **Sitemaps**, submit `sitemap.xml`.
4. In **URL inspection**, enter the homepage address, choose **Test live URL**, and then **Request indexing** if eligible.
5. If Google's live test reports a block, check the reported reason: the production page should be public, return HTTP 200, and have no `noindex` response header. Cloudflare Access, bot challenges, or preview-deployment policies can prevent crawling independently of the HTML metadata. Adjust the specific reported setting rather than disabling protection broadly.

Google may take days or weeks to discover/index a new site, and neither a sitemap nor an indexing request guarantees inclusion or a particular ranking. Search Console's indexing report gives better evidence than searching your name alone. Link the preferred website address from your Instagram bio and other public profiles you use so people and crawlers can discover it.

## Implementation notes

- Search configuration: `src/lib/site.ts`; public biography and summary: `src/data/profile.ts`.
- Metadata: `src/app/layout.tsx`; structured data: `src/components/profile-structured-data.tsx`.
- Crawl endpoints: `src/app/robots.ts` and `src/app/sitemap.ts`, exported as static files for Cloudflare.
- Cache Components/partial prefetching are not enabled: this portfolio is pre-rendered and the crawl endpoints use static route handlers. Interactive galleries and other browser features are unchanged.
- An optional verification token is read at build time. There is no Google account integration or automated submission in this repository.

References: [Google's indexing guide](https://developers.google.com/search/docs/fundamentals/get-on-google), [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview), and [canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).
