import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const POSTS_URL = `${process.env.SUPABASE_URL}/posts`;
const headers = {
  apikey: process.env.SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

export default function CreatePage() {
  // Server Action: runs on the server when the form is submitted
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

    revalidatePath("/"); // show the new post on the home page
    redirect("/");
  }

  return (
    <main className="app">
      <h1 className="page-title">Create Post</h1>
      <form className="post-form" action={createPost}>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="image">Image URL</label>
            <input id="image" name="image" placeholder="https://..." required />
          </div>

          <div className="form-field">
            <label htmlFor="caption">Caption *</label>
            <textarea
              id="caption"
              name="caption"
              rows="4"
              placeholder="Write a caption for your post..."
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
