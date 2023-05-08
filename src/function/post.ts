import { doGraphQLFetch } from "../graphql/fetch";
import { getPostsByUserId, updatePostAsAdmin } from "../graphql/queries";
import {
  getAllPosts,
  deletePost,
  deletePostAsAdmin,
  createPost,
  updatePost,
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
export async function getPostsByUserIds(id: string) {
  try {
    const postData = await doGraphQLFetch(apiURL, getPostsByUserId, {
      postsByUserId: id,
    });
    return postData.postsByUser;
  } catch (error) {
    console.log(error);
  }
}
export async function deletePosts(id: string) {
  try {
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
export async function modifyForm(event: Event, id: string) {
  const text = document.querySelector("#modText") as HTMLInputElement;
  const image = document.querySelector("#modImage") as HTMLInputElement;

  event.preventDefault();
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

      const postData = await doGraphQLFetch(
        apiURL,
        updatePost,
        {
          updatePostId: id,
          post: {
            text: text.value,
            image: imageUploadData.data.filename,
          },
        },
        localStorage.getItem("token")!
      );
      console.log(postData);
    }

    const postData = await doGraphQLFetch(
      apiURL,
      updatePost,
      {
        updatePostId: id,
        post: {
          text: text.value,
        },
      },
      localStorage.getItem("token")!
    );
    window.location.href = "/";
    console.log(postData);
  } catch (error) {
    console.log(error);
  }
}
export async function modifyFormAsAdmin(event: Event, id: string) {
  const text = document.querySelector("#modText") as HTMLInputElement;
  const image = document.querySelector("#modImage") as HTMLInputElement;

  event.preventDefault();
  try {
    console.log("modify", id);

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

      const postData = await doGraphQLFetch(
        apiURL,
        updatePostAsAdmin,
        {
          updatePostAsAdminId: id,
          post: {
            text: text.value,
            image: imageUploadData.data.filename,
          },
        },
        localStorage.getItem("token")!
      );
      console.log(postData);
    }

    const postData = await doGraphQLFetch(
      apiURL,
      updatePostAsAdmin,
      {
        updatePostAsAdminId: id,
        post: {
          text: text.value,
        },
      },
      localStorage.getItem("token")!
    );

    console.log(postData);
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
}
export function initAddPosts(): void {
  const button = document.querySelector("#submitPost") as HTMLButtonElement;
  const text = document.querySelector("#text") as HTMLInputElement;
  const error = document.querySelector("#textError") as HTMLElement;

  button.addEventListener("click", (event) => {
    if (text.value === "") {
      error.innerText = "Please enter a text";
    } else {
      button.disabled = true;
      button.innerHTML =
        '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
      addPostForm(event);
    }
  });
}
export function initModPosts(id: string, role: string): void {
  const button = document.querySelector("#submitModify") as HTMLButtonElement;
  const text = document.querySelector("#modText") as HTMLInputElement;
  const error = document.querySelector("#modTextError") as HTMLElement;

  button.addEventListener("click", (event) => {
    if (text.value === "") {
      error.innerText = "Please enter a text";
    } else {
      button.disabled = true;
      button.innerHTML =
        '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
      if (role === "admin") {
        modifyFormAsAdmin(event, id);
      } else {
        modifyForm(event, id);
      }
    }
  });
}

export function initDeleteAndModifyListener(post: Post): void {
  const deletes = document.querySelector(
    `#delete${post.id}`
  ) as HTMLFormElement;
  const modify = document.querySelector("#modify" + post.id) as HTMLFormElement;

  modify?.addEventListener("click", (event) => {
    event.preventDefault();
    if (user.role) {
      initModPosts(post.id, user.role);
    }
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
