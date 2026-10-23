# Next.js Supabase Post App

En lille CRUD Post App bygget med [Next.js](https://nextjs.org) (App Router) og Supabase som backend.

Appen er en Next.js-version af [post-app-supabase](https://github.com/cederdorff/post-app-supabase), som er bygget med React, Vite og React Router. Design og sider er de samme. Forskellen er, at data hentes og gemmes på serveren med Server Components og Server Actions.

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
SUPABASE_URL=https://dit-project-id.supabase.co/rest/v1
SUPABASE_APIKEY=din_sb_publishable_key
```

Variablerne har ikke `NEXT_PUBLIC_` foran, fordi de kun bruges på serveren. Så bliver din API key aldrig sendt til browseren.

## Routes

I Next.js bestemmer mappestrukturen i `app` dine routes. Der er ingen `<Routes>` og `<Route>` som i React Router.

| Route               | Fil                             | Side           |
| ------------------- | ------------------------------- | -------------- |
| `/`                 | `app/page.js`                   | HomePage       |
| `/create`           | `app/create/page.js`            | CreatePage     |
| `/posts/:id`        | `app/posts/[id]/page.js`        | PostDetailPage |
| `/posts/:id/update` | `app/posts/[id]/update/page.js` | UpdatePage     |

## Server Components: hent data (GET)

Alle sider er Server Components. De kører på serveren, så du kan bruge `await fetch` direkte i komponenten. Du behøver hverken `useState` eller `useEffect`:

```jsx
export default async function HomePage() {
  const response = await fetch(POSTS_URL, { headers });
  const posts = await response.json();

  return <section className="post-grid">{/* ... */}</section>;
}
```

`id` fra URL'en får du med `params` i stedet for `useParams()`:

```jsx
export default async function PostDetailPage({ params }) {
  const { id } = await params;
  // ...
}
```

Hvis posten ikke findes, kaldes `notFound()`, som viser Next.js' 404-side.

`app/loading.js` vises, mens en side henter data.

## Server Actions: gem data (POST, PATCH, DELETE)

I stedet for `handleSubmit` med `event.preventDefault()` og `useState` bruger formularen en Server Action. Det er en funktion med `"use server"`, som kører på serveren, når formularen sendes:

```jsx
async function createPost(formData) {
  "use server";

  await fetch(POSTS_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      image: formData.get("image").trim(),
      caption: formData.get("caption").trim(),
    }),
  });

  revalidatePath("/");
  redirect("/");
}

<form action={createPost}>
  <input name="image" required />
  <textarea name="caption" required />
  <button type="submit">Save</button>
</form>;
```

- Værdierne hentes med `formData.get("...")` ud fra feltets `name`.
- `revalidatePath("/")` sørger for, at forsiden henter posts igen, så ændringen bliver vist.
- `redirect("/")` erstatter `navigate("/")`.

## Client Components

Kun to komponenter har `"use client"`, fordi de har brug for browseren:

- `components/Header.js` bruger `usePathname()` til at markere det aktive link.
- `components/DeleteButton.js` bruger `window.confirm(...)`, før formularen sender delete.

## Fra React til Next.js

| React (Vite + React Router)            | Next.js                                    |
| -------------------------------------- | ------------------------------------------ |
| `src/App.jsx` med `<Routes>`           | Mapper og `page.js` filer i `app`          |
| `<Header />` i `App.jsx`               | `<Header />` i `app/layout.js`             |
| `<Link to="/create">`                  | `<Link href="/create">` fra `next/link`    |
| `<NavLink>` med `active` class         | `<Link>` + `usePathname()`                 |
| `useEffect` + `fetch` + `useState`     | `await fetch` i en Server Component        |
| `useParams()`                          | `const { id } = await params`              |
| `onSubmit={handleSubmit}` + `useState` | `action={createPost}` + `formData.get()`   |
| `navigate("/")`                        | `redirect("/")`                            |
| `import.meta.env.VITE_...`             | `process.env....` (kun på serveren)        |
| `src/main.css`                         | `app/globals.css`                          |
