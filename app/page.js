import PostCard from "@/components/PostCard";

const POSTS_URL = `${process.env.SUPABASE_URL}/posts`;
const headers = {
  apikey: process.env.SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

export default async function HomePage() {
  const response = await fetch(POSTS_URL, { headers });
  const posts = await response.json();

  return (
    <main className="app">
      <section className="feed-intro">
        <p className="feed-eyebrow">Post App</p>
        <h1 className="page-title">Explore the latest posts</h1>
      </section>

      <section className="post-grid">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </main>
  );
}
