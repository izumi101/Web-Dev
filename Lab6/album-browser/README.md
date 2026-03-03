# Album Browser (Lab 6)

Angular SPA for **Routing, HTTP & Services**.

## Features
- Routing:
  - `/` → redirect to `/home`
  - `/home`, `/about`, `/albums`, `/albums/:id`, `/albums/:id/photos`
- Global navigation with `routerLink` + `routerLinkActive`
- API calls through `AlbumService` only (`HttpClient`)
- CRUD-like operations with JSONPlaceholder:
  - Read albums list and album details
  - Update album title
  - Delete album from UI list
- Type-safe models: `Album`, `Photo`
- Loading, empty, and error states
- Responsive photo grid

## Tech Stack
- Angular (standalone components)
- Angular Router
- HttpClient
- RxJS Observables

## Run Project
```bash
npm install
npm start
```
Open: `http://localhost:4200`

## Build
```bash
npm run build
```

## Notes
- API: `https://jsonplaceholder.typicode.com`
- PUT/DELETE are simulated by JSONPlaceholder and do not persist on server.
