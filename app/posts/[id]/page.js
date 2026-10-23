import Link from "next/link";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import DeleteButton from "@/components/DeleteButton";

const POSTS_URL = `${process.env.SUPABASE_URL}/posts`;
const headers = {
  apikey: process.env.SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

export default async function PostDetailPage({ params }) {
  const { id } = await params;
  const response = await fetch(`${POSTS_URL}?id=eq.${id}`, { headers });
  const data = await response.json();
  const post = data[0];

  if (!post) notFound();

  async function deletePost() {
    "use server";

    await fetch(`${POSTS_URL}?id=eq.${id}`, { method: "DELETE", headers });

    revalidatePath("/");
    redirect("/");
  }

  return (
    <main className="app">
      <h1 className="page-title">Post Details</h1>
      <article className="post-detail">
        <img src={post.image} alt={post.caption} />
        <div className="post-detail-body">
          <p className="post-meta">Post #{post.id}</p>
          <p className="post-detail-caption">{post.caption}</p>
          <form className="post-detail-actions" action={deletePost}>
            <Link href={`/posts/${id}/update`} className="btn btn-primary">
              Edit
            </Link>
            <DeleteButton />
          </form>
        </div>
      </article>
    </main>
  );
}
