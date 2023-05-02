import { Post } from "../interfaces/Post";
const fileUrl = import.meta.env.VITE_FILE_URL;
export default function cardPosts(post: Post): string {
  const image = fileUrl + post?.profilePicture;
  const cardPost = `
    <div class="container" style="margin-top: 75px;">
      <div class="row">
        <div class="col-md-6 mb-3">
          <div class="card">
            <div class="card-header">
              <a href="/profile/${
                post.user?.user_name
              }"  class="nav-link disabled" data-navigo>
                <img
                  src="${image}"
                  class="rounded-circle"
                  height="25"
                  alt="profile picture"
                  loading="lazy"
                />
              ${post.user?.user_name} 
              </a>
            </div>
            ${
              !post.image
                ? `<img src="https://loremflickr.com/320/240" class="card-img-top" alt="...">`
                : ""
            }
            <div class="card-body">
              <p class="card-text">${post.text}</p>
            </div>
              <div class="text-right">
    <button type="button" class="btn btn-outline-secondary">
      <i class="fas fa-thumbs-up"></i> Like
    </button>
  </div>
          </div>
        </div>
      </div>
    </div>
    
  `;
  return cardPost;
}
