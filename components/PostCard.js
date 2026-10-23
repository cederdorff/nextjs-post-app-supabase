import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <Link href={`/posts/${post.id}`} className="post-card">
      <img src={post.image} alt={post.caption} />
      <div className="post-card-body">
        <p className="post-card-id">Post #{post.id}</p>
        <h2>{post.caption}</h2>
      </div>
    </Link>
  );
}
