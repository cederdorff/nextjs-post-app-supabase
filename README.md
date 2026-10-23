# Next.js Supabase Post App

En lille CRUD Post App bygget med [Next.js](https://nextjs.org) (App Router) og Supabase som backend.

Appen er en Next.js-version af [post-app-supabase](https://github.com/cederdorff/post-app-supabase), som er bygget med React, Vite og React Router. Funktionalitet, design og kode er så tæt på React-versionen som muligt.

## Kom i gang

```bash
npm install
npm run dev
```

Åbn [http://localhost:3000](http://localhost:3000).

## Supabase og `.env.local`

Du skal have et Supabase-projekt med en `posts`-tabel med felterne `id`, `image` og `caption` (se React-versionens README for opsætning).

Opret en `.env.local` fil i projektets rod:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://dit-project-id.supabase.co/rest/v1
NEXT_PUBLIC_SUPABASE_APIKEY=din_sb_publishable_key
```

I Next.js skal variabler, der bruges i browseren, starte med `NEXT_PUBLIC_` (i Vite var det `VITE_`), og de læses med `process.env` i stedet for `import.meta.env`:

```js
const POSTS_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/posts`;
```

## Routes

I Next.js bestemmer mappestrukturen i `src/app` dine routes. Der er ingen `<Routes>` og `<Route>` som i React Router.

| Route               | Fil                                | Side           |
| ------------------- | ---------------------------------- | -------------- |
| `/`                 | `src/app/page.js`                  | HomePage       |
| `/create`           | `src/app/create/page.js`           | CreatePage     |
| `/posts/:id`        | `src/app/posts/[id]/page.js`       | PostDetailPage |
| `/posts/:id/update` | `src/app/posts/[id]/update/page.js`| UpdatePage     |

## Fra React Router til Next.js

| React (Vite + React Router)              | Next.js                                       |
| ---------------------------------------- | --------------------------------------------- |
| `src/App.jsx` med `<Routes>`             | Mapper og `page.js` filer i `src/app`         |
| `<Header />` i `App.jsx`                 | `<Header />` i `src/app/layout.js`            |
| `import { Link } from "react-router"`    | `import Link from "next/link"`                |
| `<Link to="/create">`                    | `<Link href="/create">`                       |
| `<NavLink>` med `active` class           | `<Link>` + `usePathname()`                    |
| `useNavigate()` og `navigate("/")`       | `useRouter()` og `router.push("/")`           |
| `useParams()` fra `react-router`         | `useParams()` fra `next/navigation`           |
| `import.meta.env.VITE_...`               | `process.env.NEXT_PUBLIC_...`                 |
| `src/main.css`                           | `src/app/globals.css`                         |

Siderne bruger `useState`, `useEffect` og event handlers, og derfor starter de med `"use client"`. Så bliver de Client Components ligesom i React-versionen.

`src/app/posts/[id]/loading.js` vises, mens Next.js læser `id` fra URL'en. Header er pakket ind i `<Suspense>` i `layout.js`, fordi den læser URL'en med `usePathname()`.
