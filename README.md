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

## Requirements

Login screen:

● The creds consist of a username/password form. You should validate the user creds
locally. (admin as username and admin as password, anything different should be
considered as incorrect creds). Shows all the validation that you think makes sense.

● The user should remain logged against a storage instance that fits your
preference (Local db, Local storage, cookies), so if the user tries to log in already
logged, it should be redirected to the main page, and if it is not logged and it tries
to go to the main page it should be redirected to the login page.

Main page:

● The home screen will have a search bar with a list of Pokemon. You’ll have to use
this API for it: https://pokeapi.co/. The API is paginated so you should create a
solution for it.
● Each Pokemon should be shown with its photo and name.

Detail view:

● If the user clicks on a Pokemon from the list, a modal should be shown with
detailed information about the Pokemon (Abilities, moves, and forms).

## User story

Pokemon app, enables end-users to search for pokemons through an easy to use interface with support for screen readers. The application is designed to be fully responsive, ensuring it works seamlessly on various devices and screen sizes providing an optimal user experience on mobile, tablet, and desktop devices.

The solution is shipped 🚀, you can check it out here: https://bla-pokemon-app.vercel.app/

The initial page is the Login form, the credentials are username: `admin` and password: `admin`. If you're already logged then you'll be redirected to the Pokedex.

The Pokedex, as I called the main screen, shows a search bar and the paginated pokemons list with a limit of 25 by default .

The user can select to show 25, 50, 100 pokemons from the select in the PokemonPagination.

On the search bar, the end user can search for any component in the first 25 pokemons.

- If the searched pokemon is not on the list then a message saying "No pokemon matches this search" will be displayed.
- If the word entered matches more pokemons then all of them will be shown on the list.
- If a pokemon is `clicked` then a modal will appear showing it's abilities, moves and forms.

## This project was built with these 3 topics in mind:

- Code reusability: ensuring a good Component Composition through the use of `early returns` that enhances the cohesion of components, `custom hooks`, `Context API`, `conditional rendering` and breaking the application in `small components` that obey to the Single Responsibility Principle.

- Performance: through the use of React's Memoization `memo`, `useMemo`, `useCallback` and `useQuery` from tanstack/react-query.

- Accessibility: Making the app inclusive this application ensures that users with visual disabilities can access this web app through screen readers.

## Tech Stack

- Next.js v15.1.5: React framework with incredible features out of the box tools, components, directives performance optimizations.

- Tanstack/react-query v5.64.1: API State Management that comes with easy to implement abstractions like caching API responses for a given time, enabling better web app performance for large datasets.

- Lodash v.4.17.21: library that exposes Javascript APIs that accelerate development process. This project uses `debounce` method that delays any search for x time. matching common typing needs (most people type 200 - 300 characters/min) and avoiding unnecessary re-renders.

## Design Choices

### Architecture

1. Component-Based Architecture
   Uses React components with a clear separation of concerns
   Implements atomic design methodology with components organized by complexity:

   Atoms: `<Chip />`, `<Message />`, `<Modal />`, `<OptimizedImage />`, `<SearchBar />`, `<Select />`, `<Spinner />`.

   Screens: `<Login />, <Logout />, <Pokedex />, <PokemonModal />, <PokemonList />, <PokemonCard />, <PokemonSearchBar />, <PokemonPagination />`

   You can see the component graph here: https://app.eraser.io/workspace/MTftQNJdtGdPNswh9P53

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
- Performance via memoization (memo, useMemo, useCallback)
- Type safety with TypeScript interfaces
- Accessibility with ARIA attributes
- Code reusability through custom hooks

### State Management

The selected state management solution is React's ContextAPI. It holds three key states with their respective setters:

- `selectedPokemon`
- `isModalOpen`

## TypeScript Strategy

This project is strongly typed, ensuring better DX and a robust error-prone less application.
Each `component`, `hooks`,`API response` has it's own `interface`.
Furthermore using type annotations, type assertions, union types, type aliases.

## Types organization

The `interfaces/` directory has two key files `pokemom.ts` & `user.ts`. Each file exposes the reusable `types` and `interfaces`.

## Styling Methodology

Pure CSS and using `BEM` methodology that helps to create reusable components.

## Testing Strategy

Using Jest & React Testing library, there are tests for key screens and reusable components:
`<MainPokedex />`: Integration test of the main features of the app.
`<Login />`: Tests for correct rendering, log in with correct credentials & show error if invalid credentials.
`<Message />`: Tests correct rendering of both variants `info` & `error` of this reusable component.
`<PokemonPagination />`: Ensures correct redering of pagination and it's use cases
`<Select />`: Unit test of select

- Coverage goals: The project reaches up to 88% of code coverage. Please run `pnpm test:cov` for detailed info.
