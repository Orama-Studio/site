# Deploy to GitHub Pages

## 1. Create GitHub repository
- Create a new repo on GitHub (public for free Pages)
- Initialize git locally: `git init && git remote add origin <repo-url>`

## 2. Update hugo.toml
- Set `baseURL` to `https://<username>.github.io/<repo-name>/`
- Or if using a custom domain: `https://yourdomain.com`

## 3. Create GitHub Actions workflow
- Create `.github/workflows/hugo.yml`
- The workflow should:
  - Checkout the repo
  - Install Hugo extended (same version as Dockerfile: 0.145.0)
  - Install Dart Sass (same version as Dockerfile: 1.98.0)
  - Run `npm install`
  - Run `hugo --minify`
  - Deploy the `public/` folder to GitHub Pages using `actions/deploy-pages`

## 4. Enable GitHub Pages in repo settings
- Go to Settings > Pages
- Set source to "GitHub Actions"

## 5. (Optional) Custom domain
- Add a `CNAME` file in `static/` with the domain name
- Configure DNS: CNAME record pointing to `<username>.github.io`
- Enable "Enforce HTTPS" in repo Pages settings

## 6. Push and deploy
- `git add . && git commit -m "initial commit"`
- `git push -u origin main`
- The GitHub Action will build and deploy automatically

## Notes
- The Docker setup is for local development only; GitHub Actions builds natively
- The `public/` directory is already in `.gitignore` — the action builds it fresh
- Node modules are needed for Bulma Sass — the workflow must run `npm install`
