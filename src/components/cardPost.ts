import { Post } from "../interfaces/Post";
import { user } from "../main";

const fileUrl = import.meta.env.VITE_FILE_URL;

export default function cardPosts(post: Post): string {
  const image = fileUrl + post.user.profilePicture;
  const postImage = fileUrl + post.image;

  const modifyId = `modify${post.id}`;
  const deleteId = `delete${post.id}`;

  const cardPost = `
<div class="d-flex justify-content-center align-items-center">
  <div class="col-md-6 mb-3">
    <div class="card">
      <div class="card-header">
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center">
            <a href="/profile/${
              post.user?.user_name
            }" class="nav-link disabled" data-navigo>
              <img src="${image}" class="rounded-circle" height="25" alt="profile picture" loading="lazy"/>
              ${post.user?.user_name}
            </a>
          </div>
          ${
            user.id === post.user.id || user.role === "admin"
              ? `<div class="dropdown">
                  <a 
                    class="dropdown-toggle" 
                    role="button" 
                    id="dropdownMenuLink" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false" 
                    style="cursor: pointer; width: 20px; height: 20px;">
                  </a>
                  <ul id="test" class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                    <li><a id="${modifyId}" style="cursor: pointer" class="dropdown-item">Modify</a></li>
                    <li><a id="${deleteId}" style="cursor: pointer" class="dropdown-item">Delete</a></li>
                  </ul>
                </div>`
              : ""
          }
        </div>
      </div>
      ${
        post.image
          ? `<img src="${postImage}"  alt="${post.image}" loading="lazy"/>`
          : ""
      }
      <div class="card-body">
        <p class="card-text">${post.text}</p>
      </div>
      <div class="text-right">
        <div>
          <button class="btn btn-primary d-inline-flex">Likes ${
            post.likes
          }</button>
        </div>
      </div>
    </div>
  </div>
</div>
`;

  return cardPost;
}
