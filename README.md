This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## This project is build with these 4 topics in mind:

- Code reusability: ensuring a good Component Composition through the use of `early returns` that enhances the cohesion of components, `custom hooks`, `context provider` that helps to avoid prop drilling, `conditional rendering` and breaking the application in `small components` that obey to the Single Responsibility Principle.

- Performance: through the use of React's Memoization (memo, useMemo, useCallback), React-Query a library.

- Accessibility: Making the app inclusive this project has implemented accessibility that ensures users with disabilities can access this web app through screen readers.

- Responsive: The application is designed to be fully responsive, ensuring it works seamlessly on various devices and screen sizes. This is achieved through the use of CSS media queries. Additionally, components are built to adapt to different screen resolutions, providing an optimal user experience on mobile, tablet, and desktop devices.

## Tech Stack

- Next.js v15.1.5: React framework with incredible features out of the box tools, components, directives performance optimizations.

- Tanstack/react-query v5.64.1: Server API State Management that comes with easy to implement abstractions like caching API responses for a given time, enabling better web app performance for large datasets.

- Lodash v.4.17.21: library that exposes javascript APIs that accelerate development process. This project uses `debounce` method, to execute each search after 300 ms, avoiding unnecessary re-renders.

## Design Choices
