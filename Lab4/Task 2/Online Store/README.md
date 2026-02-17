# Online Store — Web Development Lab 4 (Task 2)

An Angular application that displays a catalog of real products from [kaspi.kz](https://kaspi.kz).

## Features

- **12 products** from kaspi.kz with real links
- Responsive product grid (4 → 3 → 2 → 1 columns)
- Product image gallery with thumbnail navigation
- Star rating display (supports half-stars)
- **Share** button with WhatsApp and Telegram options
- Component-scoped CSS with Angular best practices
- TypeScript interfaces for strong typing

## Tech Stack

- Angular 17+ (Standalone Components)
- TypeScript
- CSS Grid / Flexbox

## Getting Started

### Prerequisites

- Node.js v18 or later
- npm (comes with Node.js)
- Angular CLI: `npm install -g @angular/cli`

### Installation

```bash
# Install dependencies
npm install

# Run the development server
ng serve
```

Open your browser and navigate to `http://localhost:4200`.

## Project Structure

```
src/
└── app/
    ├── models/
    │   └── product.model.ts          # Product interface
    ├── components/
    │   ├── product-list/
    │   │   ├── product-list.component.ts
    │   │   ├── product-list.component.html
    │   │   └── product-list.component.css
    │   └── product-card/
    │       ├── product-card.component.ts
    │       ├── product-card.component.html
    │       └── product-card.component.css
    ├── app.component.ts
    ├── app.component.html
    ├── app.component.css
    ├── app.routes.ts
    └── app.config.ts
```

## Angular Concepts Used

- **Components** — `ProductListComponent`, `ProductCardComponent`, `AppComponent`
- **@Input()** — passing product data from list to card
- **\*ngFor** — rendering product list dynamically
- **\*ngIf** — conditional rendering of share menu and thumbnails
- **Event binding** — `(click)` for share button and gallery thumbnails
- **Property binding** — `[src]`, `[href]`, `[class]`
- **Interpolation** — `{{ product.name }}`, `{{ product.price }}`
- **Routing** — configured with `provideRouter`
- **Standalone Components** — Angular 17+ default
