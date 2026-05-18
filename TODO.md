# TODO - Sitemap + Google indexing

- [ ] Enumerate public/SEO pages in `src/app/*/page.tsx` and decide which ones to include in sitemap.
- [ ] Add `src/app/sitemap.ts` (Next.js App Router) to generate sitemap XML.
- [ ] Add `robots.txt` in `public/` to allow crawling `sitemap.xml`.
- [ ] Add README instructions for setting `NEXT_PUBLIC_SITE_URL` (or using `SITE_URL`) for correct absolute URLs.
- [ ] Run `next build` to verify sitemap compiles.
- [ ] Confirm sitemap URL: `https://<domain>/sitemap.xml`.

