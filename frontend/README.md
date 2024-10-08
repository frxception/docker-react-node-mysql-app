# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.


## Features

- ⚡ [React.js](https://react.dev/)
- ⚡ [Material-UI](https://mui.com/)
- 🔥 Type checking [TypeScript](https://www.typescriptlang.org)
- 💎 Integrate with [Tailwind CSS](https://tailwindcss.com)
- ✅ Strict Mode for TypeScript and React 18
- 📏 Linter with [ESLint](https://eslint.org) (default NextJS, NextJS Core Web Vitals, Tailwind CSS and Airbnb configuration)
- ⚡ [Zustand(https://Zustand.com/)
- 💖 Code Formatter with [Prettier](https://prettier.io)
- 🚫 Lint-staged for running linters on Git staged files

### Requirements

- Node.js 16+ and pnpm

### Getting started

Run the following command on your local environment:

```shell
$ pnpm install
```

Then, you can run locally in development mode with live reload:

```shell
$ pnpm run dev
```

Open http://localhost:5173 (development) with your favorite browser to see your project.

> **Important:** 
> Backend should be already running at http://localhost:8888 or whatever the .env settings is configured

##  Project Structure
```shell
.
├── README.md                       # README file
├── .github                         # GitHub folder
├── public                          # Public assets folder
├── src
│   ├── apis                        # Common apis folder
│   ├── components                  # Component folder
│   ├── configs                     # Config and constants
│   └── api                         # api and services hooks
│   ├── hooks                       # Hooks customs folder
│   ├── layouts                     # Layout Pages
│   └── pages                       # React JS Pages
│   ├── providers                   # Provider folder
│   └── routes                      # Routes folder
│   ├── helpers                     # Shared types and utils functions
│   ├── @types                      # typescript defintions
├── tailwind.config.js              # Tailwind CSS configuration
└── tsconfig.json                   # TypeScript configuration
```

### Customization

- `src/index.css`: your CSS file using Tailwind CSS
- `src/main.tsx`: default theme

You have access to the whole code source if you need further customization. The provided code is only example for you to start your project. The sky is the limit 🚀.


---


Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

------

## Demo Preview

![Screenshot 2024-09-21 at 15.20.20.png](screenshots/Screenshot%202024-09-21%20at%2015.20.20.png)
![Screenshot 2024-09-21 at 16.21.05.png](screenshots/Screenshot%202024-09-21%20at%2016.21.05.png)
![Screenshot 2024-09-21 at 16.21.11.png](screenshots/Screenshot%202024-09-21%20at%2016.21.11.png)
![Screenshot 2024-09-21 at 16.21.19.png](screenshots/Screenshot%202024-09-21%20at%2016.21.19.png)
![Screenshot 2024-09-21 at 16.21.26.png](screenshots/Screenshot%202024-09-21%20at%2016.21.26.png)
![Screenshot 2024-09-21 at 16.21.34.png](screenshots/Screenshot%202024-09-21%20at%2016.21.34.png)
