// Suspense fallback for /posts/[id] and /posts/[id]/update while useParams resolves
export default function Loading() {
  return (
    <main className="app">
      <p>Loading post...</p>
    </main>
  );
}
