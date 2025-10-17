# withFarook Portfolio

A modern, animated portfolio website built with React and GSAP featuring the withFarook brand and its sub-brands.

## Features

- **Animated Text Transitions**: "withFarook" appears on first render with a smooth animation
- **Scroll-Triggered Sub-Brand Changes**: As you scroll, different sub-brands appear in sequence:
  - code
  - nextgen
  - brand
  - design
  - creative
  - digital
  - studio
- **Amoresa Font**: Beautiful typography using the Amoresa font family
- **GSAP Animations**: Smooth, professional animations powered by GSAP
- **Responsive Design**: Works on all device sizes

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Build for Production

```bash
npm run build
```

## Technologies Used

- React 18
- TypeScript
- GSAP (GreenSock Animation Platform)
- Webpack
- Amoresa Font

## Project Structure

```
with-farook-portfolio/
├── src/
│   ├── App.tsx          # Main application component
│   ├── App.css          # Styles for the application
│   └── index.tsx        # React entry point
├── public/
│   └── index.html       # HTML template
├── assets/
│   └── icons/           # SVG icons (1.svg through 7.svg)
├── package.json
├── tsconfig.json
└── webpack.config.js
``` 