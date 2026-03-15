# Lawren Ling | Personal Portfolio & Resume

A premium, modern, editorial-style personal resume website designed for Lawren Ling.

## Features
- **Editorial Design**: High-end typography and layout inspired by modern magazines.
- **Interactive Experience**: Smooth scrolling, reveal animations, and hover effects.
- **Project Showcase**: A horizontal gallery for highlighting key analytical projects.
- **Responsive**: Optimized for all devices from mobile to desktop.
- **Static Deployment**: Fully compatible with GitHub Pages.

## Tech Stack
- **React 19**
- **Vite**
- **Tailwind CSS 4**
- **Motion** (Animations)
- **Lucide React** (Icons)

## Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to preview.

## Customization

- **Content**: Edit `src/constants.ts` to update personal details, experience, projects, and skills.
- **Styling**: Modify `src/index.css` to adjust colors, fonts, and global styles.
- **Images**: Replace placeholder URLs in `src/constants.ts` with your own project screenshots.

## Deployment to GitHub Pages

1. **Build the project**:
   ```bash
   npm run build
   ```
   This generates a `dist` folder with static files.

2. **Deploy**:
   - **Option A (Manual)**: Upload the contents of the `dist` folder to your GitHub repository's `gh-pages` branch.
   - **Option B (Automated)**: Use the `gh-pages` package:
     ```bash
     npm install gh-pages --save-dev
     ```
     Add these scripts to `package.json`:
     ```json
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
     ```
     Then run:
     ```bash
     npm run deploy
     ```

3. **GitHub Settings**:
   - Go to your repository on GitHub.
   - Navigate to **Settings > Pages**.
   - Under **Build and deployment**, ensure the source is set to "Deploy from a branch" and the branch is set to `gh-pages`.

## Notes for GitHub Pages
- If your repository is not at the root (e.g., `username.github.io/repo-name/`), update the `base` property in `vite.config.ts`:
  ```typescript
  export default defineConfig({
    base: '/repo-name/',
    // ...
  });
  ```
