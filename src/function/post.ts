import { doGraphQLFetch } from "../graphql/fetch";
import {
  getAllPosts,
  deletePost,
  deletePostAsAdmin,
  createPost,
} from "../graphql/queries";
import { Post } from "../interfaces/Post";
import { UploadResponse } from "../interfaces/UploadResponse";
import { user } from "../main";

const apiURL = import.meta.env.VITE_API_URL;
const uploadURL = import.meta.env.VITE_UPLOAD_URL;

export async function getAllPost() {
  try {
    const postData = await doGraphQLFetch(apiURL, getAllPosts, {});
    return postData.posts;
  } catch (error) {
    console.log(error);
  }
}
export async function deletePosts(id: string) {
  try {
    console.log("delete", id);

    const token = localStorage.getItem("token");
    if (token !== null) {
      const deleteData = await doGraphQLFetch(
        apiURL,
        deletePost,
        { deletePostId: id },
        token
      );
      window.location.href = "/";
      return deleteData;
    }
  } catch (error) {
    console.log(error);
  }
}
export async function deletePostsAsAdmin(id: string) {
  try {
    console.log("delete", id);

    const token = localStorage.getItem("token");
    if (token !== null) {
      const deleteData = await doGraphQLFetch(
        apiURL,
        deletePostAsAdmin,
        { deletePostAsAdminId: id },
        token
      );
      window.location.href = "/";
      return deleteData;
    }
  } catch (error) {
    console.log(error);
  }
}
export function initAddPosts(): void {
  const button = document.querySelector("#submitPost") as HTMLButtonElement;
  const text = document.querySelector("#text") as HTMLInputElement;
  const error = document.querySelector("#textError") as HTMLElement;
  console.log(error);

  button.addEventListener("click", (event) => {
    console.log(!text.value);

    if (text.value === "") {
      error.innerText = "Please enter a text";
    } else {
      addPostForm(event);
    }
  });
}
export async function addPostForm(event: Event) {
  const text = document.querySelector("#text") as HTMLInputElement;
  const image = document.querySelector("#image") as HTMLInputElement;
  event.preventDefault();
  let imagePlaceholder = "";
  try {
    if (image.value !== "") {
      const imageFile = image.files![0];
      const formData = new FormData();
      formData.append("picture", imageFile);
      const imageUpload = await fetch(`${uploadURL}/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")!}`,
        },
        body: formData,
      });

      const imageUploadData = (await imageUpload.json()) as UploadResponse;
      imagePlaceholder = imageUploadData.data.filename;
    }

    const postData = await doGraphQLFetch(
      apiURL,
      createPost,
      {
        text: text.value,
        image: imagePlaceholder,
      },
      localStorage.getItem("token")!
    );
    console.log(postData);
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
}

export function initDeleteAndModifyListener(post: Post): void {
  const deletes = document.querySelector(
    `#delete${post.id}`
  ) as HTMLFormElement;
  const logins = document.querySelector("#modify" + post.id) as HTMLFormElement;

  logins?.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("modify", post.id);
  });

  deletes?.addEventListener("click", (event) => {
    event.preventDefault();

    if (user.role === "admin") {
      const confirmDelete = confirm("Are you sure you want to delete?");
      if (confirmDelete) {
        deletePostsAsAdmin(post.id);
      }
    } else {
      const confirmDelete = confirm("Are you sure you want to delete?");
      if (confirmDelete) {
        deletePosts(post.id);
      }
    }
  });
}
