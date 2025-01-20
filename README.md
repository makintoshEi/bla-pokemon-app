This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install dependencies

```bash
npm i
# or
pnpm i
```

Then, run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## User story

Pokemon app, enables end-users to search for pokemons through an easy to use interface or screen readers. The application is designed to be fully responsive, ensuring it works seamlessly on various devices and screen sizes providing an optimal user experience on mobile, tablet, and desktop devices.

The solution is shipped 🚀, you can check it out here: https://bla-pokemon-app.vercel.app/

The initial page is the Login form, the credentials are username: `admin` and password: `admin`. If you're already logged then you'll be redirected to the Pokedex.

The Pokedex as I called the main screen shows a search bar and the paginated pokemons list. On the search bar, the end user can search for any component in the first 100 pokemons.

- If the searched pokemon is not on the list then a message saying "No pokemon matches this search" will be displayed.
- If the word entered matches more pokemons then all of them will be shown on the list.
- If a pokemon is `clicked` then a modal will appear showing it's abilities, moves and forms.

## This project was built with these 4 topics in mind:

- Code reusability: ensuring a good Component Composition through the use of `early returns` that enhances the cohesion of components, `custom hooks`, `Context API`, `conditional rendering` and breaking the application in `small components` that obey to the Single Responsibility Principle.

- Performance: through the use of React's Memoization `memo`, `useMemo`, `useCallback`.

- Accessibility: Making the app inclusive this project has implemented accessibility that ensures users with disabilities can access this web app through screen readers.

## Tech Stack

- Next.js v15.1.5: React framework with incredible features out of the box tools, components, directives performance optimizations.

- Tanstack/react-query v5.64.1: API State Management that comes with easy to implement abstractions like caching API responses for a given time, enabling better web app performance for large datasets.

- Lodash v.4.17.21: library that exposes javascript APIs that accelerate development process. This project uses `debounce` method, to execute each search after 300 ms, avoiding unnecessary re-renders.

## Design Choices

### Architecture

1. Component-Based Architecture
   Uses React components with a clear separation of concerns
   Implements atomic design methodology with components organized by complexity:
   Atoms: `<Chip />`, `<Message />`, `<Modal />`, `<SearchBar />`
   Screens: `<Login />`, `<Pokedex />`

2. Client-Side Routing
   Next.js App Router for page routing and navigation

3. Data Flow Patterns

   - Top-Down Data Flow
   - State managed at context level
   - Props passed down to child components
   - Events bubble up through callbacks

   API Data Management

   - TanStack Query for API state management
   - Caching and data persistence
   - Debounced search with Lodash (300ms delay)

The architecture promotes:

- Reusability through component composition
- Performance via memoization (useMemo, useCallback)
- Type safety with TypeScript interfaces
- Accessibility with ARIA attributes

### State Management

The selected state management solution is React's ContextAPI. If the project grows. It holds three key states with their respective setters:

- `pokemons`
- `selectedPokemon`
- `isModalOpen`

### TypeScript Strategy

This project is stronly typed, ensuring . Each `component`,hooks has it's own `interfaces`.

# Types organization

The `interfaces/` directory has two key files `pokemom.ts` & `user.ts`. Each file exposes the reusable `types` and `interfaces`.

### Styling Methodology

With pure CSS and using `BEM` methodology that helps to create reusable components.

### Testing Strategy

With Jest & React Testing library. I created tests for key screens and components:
`<Login />`: Tests for correct rendering, log in with correct credentials & show error if invalid credentials.  
`<Pokedex />`: Integration test of the main features of the app .
`<Message />`: Tests correct rendering of both variants `info` & `error` of this reusable component
`<PokemonPagination />`: Tests correct redering of pagination

- Coverage goals: The project reaches up to 88% of coverage. Run `pnpm test:cov` for detailed info.
