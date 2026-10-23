import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

const POSTS_URL = `${process.env.SUPABASE_URL}/posts`;
const headers = {
  apikey: process.env.SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

export default async function UpdatePage({ params }) {
  const { id } = await params;
  const response = await fetch(`${POSTS_URL}?id=eq.${id}`, { headers });
  const data = await response.json();
  const post = data[0];

  if (!post) notFound();

  async function updatePost(formData) {
    "use server";

    await fetch(`${POSTS_URL}?id=eq.${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        image: formData.get("image").trim(),
        caption: formData.get("caption").trim(),
      }),
    });

    revalidatePath("/");
    revalidatePath(`/posts/${id}`);
    redirect(`/posts/${id}`);
  }

  return (
    <main className="app">
      <h1 className="page-title">Update Post</h1>

      <form className="post-form" action={updatePost}>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="image">Image URL</label>
            <input
              id="image"
              name="image"
              placeholder="https://..."
              defaultValue={post.image}
              required
            />
            <img src={post.image} alt="Preview" className="image-preview" />
          </div>

          <div className="form-field">
            <label htmlFor="caption">Caption *</label>
            <textarea
              id="caption"
              name="caption"
              rows="4"
              placeholder="Write a caption for your post..."
              defaultValue={post.caption}
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </main>
  );
}
