"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const POSTS_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/posts`;
const headers = {
  apikey: process.env.NEXT_PUBLIC_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

export default function PostDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState({});

  useEffect(() => {
    async function getPost() {
      const response = await fetch(`${POSTS_URL}?id=eq.${id}`, { headers });
      const data = await response.json();
      setPost(data[0]);
    }

    getPost();
  }, [id]);

  async function handleDelete() {
    const confirmed = window.confirm("Delete this post?");

    if (!confirmed) return;

    await fetch(`${POSTS_URL}?id=eq.${id}`, { method: "DELETE", headers });
    router.push("/");
  }

  return (
    <main className="app">
      <h1 className="page-title">Post Details</h1>
      <article className="post-detail">
        <img src={post.image} alt={post.caption} />
        <div className="post-detail-body">
          <p className="post-meta">Post #{post.id}</p>
          <p className="post-detail-caption">{post.caption}</p>
          <div className="post-detail-actions">
            <Link href={`/posts/${id}/update`} className="btn btn-primary">
              Edit
            </Link>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </article>
    </main>
  );
}
