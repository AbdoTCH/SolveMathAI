# SolveMath AI

Structured math problem solver using the 4-step method: Variable selection, Equation setup, Resolution, and Verification. Powered by Google Gemini.

## Features
- **4-Step Methodology**: Choix de l'inconnue, Mise en système, Résolution, et Vérification.
- **AI Powered**: Uses Gemini 3.1 Pro for solving complex equations.
- **LaTeX Support**: Beautiful mathematical rendering using KaTeX.
- **High Density UI**: Efficient, professional layout designed for productivity.

## Deployment on GitHub Pages

This project is configured to be deployed automatically to GitHub Pages via GitHub Actions.

### Steps to Deploy:
1. Push this code to a GitHub repository.
2. Go to **Settings > Secrets and variables > Actions** in your GitHub repository.
3. Click on **New repository secret**.
4. Name it `GEMINI_API_KEY` and paste your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
5. Go to **Settings > Pages**.
6. Under **Build and deployment > Source**, select **GitHub Actions**.
7. The workflow will automatically trigger on every push to the `main` branch.

## Local Development
1. Clone the repository.
2. Install dependencies: `npm install`
3. Create a `.env` file with your `GEMINI_API_KEY`.
4. Run the dev server: `npm run dev`
