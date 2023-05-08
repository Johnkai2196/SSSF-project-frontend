import { doGraphQLFetch } from "../graphql/fetch";
import { createLike, deleteLike } from "../graphql/queries";
import { Post } from "../interfaces/Post";
const apiURL = import.meta.env.VITE_API_URL;
export async function likePosts(post: Post) {
  try {
    const token = localStorage.getItem("token");
    if (token !== null) {
      const likeData = await doGraphQLFetch(
        apiURL,
        createLike,
        { post: post.id },
        token
      );
      if (likeData.createLike) {
        const button = document.querySelector(
          `#like${post.id}`
        ) as HTMLButtonElement;
        button.textContent = `Likes ${post.likes + 1}`;
      }

      if (!likeData.createLike) {
        unLikePosts(post);
      }
    }
  } catch (error) {
    console.log(error);
  }
}
export async function unLikePosts(post: Post) {
  try {
    const token = localStorage.getItem("token");
    if (token !== null) {
      const likeData = await doGraphQLFetch(
        apiURL,
        deleteLike,
        { deleteLikeId: post.id },
        token
      );
      const button = document.querySelector(
        `#like${post.id}`
      ) as HTMLButtonElement;

      if (likeData.deleteLike) {
        button.textContent = `Likes ${post.likes}`;
      }
      if (!likeData.deleteLike) {
        likePosts(post);
      }
    }
  } catch (error) {
    console.log(error);
  }
}
export function initLikePost(post: Post): void {
  const button = document.querySelector(`#like${post.id}`) as HTMLButtonElement;
  const token = localStorage.getItem("token");
  if (token === null) {
    button.disabled = true;
  }

  button.addEventListener("click", (event) => {
    event.preventDefault();
    likePosts(post);
  });
}
