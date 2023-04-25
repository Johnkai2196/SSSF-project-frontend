import { Post } from "../interfaces/Post";

export default function carsPosts(post: Post[]): string {
  const cardPost = `
<div class="container">
  <div class="row">
    <div class="col-md-6">
      <!-- First card -->
      <div class="card">
        <div class="card-header">
                <a>
                  <img
                    src="${
                      !post.profilePicture
                        ? `https://loremflickr.com/320/240`
                        : ""
                    }"
                    class="rounded-circle"
                    height="25"
                    alt="profile picture"
                    loading="lazy"
                  />
                </a>
                <a>${post.username}</a>
        </div>
        ${
          post
            ? `<img src="https://loremflickr.com/320/240" class="card-img-top" alt="...">`
            : ""
        }
        <div class="card-body">
          <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in sem augue. Maecenas vel mauris non ligula semper commodo ac non nulla. Suspendisse eleifend odio eu ante vestibulum efficitur. Praesent vitae suscipit dolor. Etiam auctor velit et ipsum vestibulum, sit amet semper justo fermentum. Proin eleifend bibendum cursus. Vivamus ultrices id metus id tempus. Aenean posuere feugiat ante at suscipit. Nulla facilisi. Aenean quis ipsum dui. Integer pellentesque eros nec tellus lacinia, in consectetur enim interdum. Suspendisse eget quam tristique, posuere elit ut, bibendum nulla. Morbi pharetra, nisi a pellentesque eleifend, mi felis vestibulum neque, vel scelerisque quam odio a mi. Cras consequat, sapien ac malesuada luctus, tortor risus dignissim odio, vel venenatis turpis arcu et sapien. Sed in eros id risus congue interdum.

Maecenas quis nulla dignissim, ullamcorper lacus ac, cursus justo. Donec et dui sagittis, dignissim tellus vel, tristique massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras nec risus lectus. Vestibulum convallis tincidunt velit ac accumsan. Vivamus pharetra convallis erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse tristique eros orci, id feugiat odio congue id. Nulla facilisi. Nam feugiat risus eget mi volutpat, a luctus sem luctus. Donec ac magna et purus pellentesque egestas. In hac habitasse platea dictumst. Quisque at placerat massa, sit amet semper ipsum. Curabitur dignissim consectetur mi vitae fermentum. Vivamus bibendum aliquet varius. Vivamus condimentum sagittis libero, id tincidunt risus dictum nec. Quisque iaculis malesuada tellus ac fringilla.
</p>
        </div>
      </div>
    </div>

  </div>
</div>



`;
  return cardPost;
}
