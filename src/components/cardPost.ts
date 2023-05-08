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
              post.user?.id
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
                    <li><a id="${modifyId}" data-toggle="modal" data-target="#modifyModal" style="cursor: pointer" class="dropdown-item">Modify</a></li>
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
          <button id="like${
            post.id
          }"class="btn btn-primary btn-lg btn-block">Likes ${
    post.likes
  }</button>
        </div>
      </div>
    </div>
  </div>
</div>


<div class="modal fade" id="modifyModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modify Post</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="add-post">
          <div class="mb-3">
            <label for="image" class="form-label">Image</label>
            <input type="file" class="form-control" id="modImage">
          </div>
          <div class="mb-3">
            <label for="text" class="form-label">Text</label>
            <textarea class="form-control" id="modText" rows="3" placeholder="Add text" required></textarea>
            <p id="modTextError" class="text-danger"></p>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button id="submitModify" type="submit" class="btn btn-primary">Modify</button>
      </div>
    </div>
  </div>
</div>
`;

  return cardPost;
}
