# Weather App

A responsive weather dashboard built with Next.js (App Router), TypeScript and Tailwind (shadcn/ui). It queries OpenWeather through local API route handlers to display current conditions and forecast, includes a city search, and supports Celsius/Fahrenheit toggling.

**Additional Features:**
- Dynamic background/theme changes based on current weather.
- Stores the last searched city in `localStorage` for quick access.
- 5-day weather forecast display.
- Temperature toggle: Celsius ↔ Fahrenheit.

## 1) Quick Start (Local)

Prerequisites:
- Node.js 18+ (recommended)
- pnpm or npm

Setup:
1) Install dependencies
- pnpm install
  -or-
- npm install

2) Create an environment file
- Create a `.env.local` at the project root with:
  \`\`\`
  OPENWEATHER_API_KEY=YOUR_OPENWEATHER_API_KEY
  \`\`\`

3) Run the dev server
- pnpm dev
  -or-
- npm run dev

4) Open the app
- Visit http://localhost:3000

## 2) Project Scripts

Common scripts:
- Dev: `pnpm dev` or `npm run dev`
- Build: `pnpm build` or `npm run build`
- Start (production): `pnpm start` or `npm run start`

## 3) Running Tests

This project uses Jest and React Testing Library for unit and component tests.

- Run all tests locally:
  - `node scripts/run-jest.mjs`

- What gets tested:
  - Unit tests for pure utilities (e.g., temperature conversion) are in `tests/weather-utils.test.ts`.
  - Component tests with React Testing Library (e.g., WeatherDisplay, SearchBar) are in:
    - `tests/components/weather-display.test.tsx`
    - `tests/components/search-bar.test.tsx`

Note: If you prefer an npm script, you can add `"test": "node scripts/run-jest.mjs"` under "scripts" in package.json for `npm test`/`pnpm test`.

## 4) Configuration & Environment

- Environment variables:
  - `OPENWEATHER_API_KEY`: Your OpenWeather API key (used by server route handlers and passed to the client as needed).

- API routes:
  - `app/api/weather/route.ts` — current weather
  - `app/api/forecast/route.ts` — forecast data
  These routes call OpenWeather on the server to avoid exposing your API key directly in client code.

## 5) Assumptions & Design Choices

- Framework: Next.js App Router with server components where appropriate.
- Styling: Tailwind CSS with shadcn/ui components.
- Error Handling: Assumes any API error or invalid city input shows a user-friendly message.
- Icons: React-icons for consistent iconography.
- Testing scope: Unit tests for pure logic + React Testing Library for component rendering and behavior.
