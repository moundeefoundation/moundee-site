# moundee.org

Static site, no build step. Bilingual (中/英) homepage with a language toggle, plus a `books/` folder for future ebook downloads.

## Deploy to Cloudflare Pages

1. Push this repo to your new GitHub account (see commands below).
2. In Cloudflare dashboard → Workers & Pages → Create → Pages → connect to Git → select this repo.
3. Build settings: none needed (framework preset "None", no build command, output directory `/`).
4. After first deploy, add `moundee.org` as a custom domain in the Pages project settings.

## Push to GitHub

```bash
git add .
git commit -m "Initial site scaffold"
git remote add origin git@github.com:<your-username>/moundee-site.git
git push -u origin main
```

(Create the empty `moundee-site` repo on GitHub first, then run the above.)
