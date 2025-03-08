# Next.js Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, install node modules:

```bash
npm install
# or
yarn install
```

Second, run the development server:

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

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This
endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)
instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new
font family for Vercel.

## Project Structure

```
📂 Gyde-Web
├── 📂 .next                          # Next.js build output
├── 📂 node_modules                  # Node.js dependencies (auto-generated)
├── 📂 public
│   ├── 📂 assets
│   │   ├── 📂 images
│   │   │   ├── landing.png
│   │   │   ├── profile-auth.png
│   ├── favicon.ico                  # Site favicon
├── 📂 locales                       # Localization files
│   ├── de.json
│   ├── en.json
├── 📂 src
│   ├── 📂 app
│   │   ├── 📂 [lang]
│   │   │   ├── 📂 auth
│   │   │   ├── 📂 dashboard
│   │   │   │   ├── 📂 profile
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── 📂 rides
│   │   │   │   │   ├── 📂 book-ride
│   │   │   │   │   │   ├── 📂 includes
│   │   │   │   │   │   │   ├── BookRideForm.tsx
│   │   │   │   │   │   │   ├── ChaufferModal.tsx
│   │   │   │   │   │   │   ├── GoogleMap.tsx
│   │   │   │   │   │   │   ├── Map.tsx
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── 📂 upcoming
│   │   │   │   │   │   └── page.tsx
│   │   │   │   └── layout.tsx
│   │   ├── 📂 onboarding
│   │   │   ├── 📂 email
│   │   │   │   ├── 📂 includes
│   │   │   │   └── page.tsx
│   │   │   ├── 📂 profile
│   │   │   │   ├── 📂 includes
│   │   │   │   └── page.tsx
│   │   │   └── 📂 welcome
│   │   │       └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── 📂 assets
│   │   ├── 📂 fonts
│   │   │   ├── HelveticaNeue
│   │   │   └── PPNeueMontreal
│   │   ├── 📂 images
│   │   │   ├── 📂 logo
│   │   │   │   ├── logo.png
│   │   │   ├── car.png
│   ├── 📂 components
│   │   ├── 📂 icons
│   │   │   ├── Apple.tsx
│   │   │   ├── BankCard.tsx
│   │   │   ├── Camera.tsx
│   │   │   └── Car.tsx
│   │   └── Welcome.tsx
│   ├── 📂 constants
│   │   └── index.ts
│   ├── 📂 hooks
│   │   ├── useOutsideClick.tsx
│   │   └── useWindowWidth.tsx
│   ├── 📂 i18n
│   │   ├── request.ts
│   │   └── routing.ts
│   ├── 📂 layout
│   │   ├── AuthLayout.tsx
│   │   ├── DashboardLayout.tsx
│   │   └── LayoutClient.tsx
│   ├── 📂 lib
│   │   └── moment.ts
│   └── 📂 utils
│       ├── index.ts
│       └── middleware.ts
├── .env.local
├── .gitignore
├── eslint.config.js
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
├── tsconfig.json
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use
the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of
Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
