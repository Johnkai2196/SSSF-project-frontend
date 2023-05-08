const fileUrl = import.meta.env.VITE_FILE_URL;
export default function navbar(user?: any): string {
  console.log(fileUrl + user?.profilePicture);

  const image = fileUrl + user?.profilePicture;

  const navHtml = `
<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
  <div class="container-fluid">
    <button
      class="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <a class="navbar-brand mt-2 mt-lg-0" href="/" data-navigo>
        <img
          src="../src/image/O-removebg-preview.png"
          height="30"
          alt="Otaku Connect"
          loading="lazy"
        />
        Otaku Connect
      </a>

      <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
    </div>

    <div class="d-flex align-items-center">
      ${
        user
          ? `<img
                  id="addPost"
                  src="../src/image/icons8-plus-+-48.png"
                  class="rounded-circle mr-2"
                  height="25"
                  alt="add post"
                  loading="lazy"
                  style="cursor: pointer"
                  data-toggle="modal"
                  data-target="#exampleModal"
                />
              <a>${user.user_name}</a>

              <div class="btn-group">
                <a
                  id="navbarDropdownMenuAvatar"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  class="nav-link dropdown-toggle"
                  style="cursor: pointer"
                >
                  <img
                    src="${image}"
                    class="rounded-circle"
                    height="25"
                    alt="profile picture"
                    style="cursor: pointer"
                    loading="lazy"
                  />
                </a>
                <ul class="dropdown-menu dropdown-menu-right">
                  <li>
                    <a 
                    style="cursor: pointer" 
                    class="dropdown-item" 
                    data-toggle="modal"
                    data-target="#settingModal" >Setting</a>
                  </li>
                  ${
                    user.role === "admin"
                      ? `<li><a href="/admin" style="cursor: pointer" class="dropdown-item" data-navigo>Admin</a></li>`
                      : ""
                  }
                  <li>
                    <a id="logOut" style="cursor: pointer" class="dropdown-item">Log out</a>
                  </li>
                </ul>
              </div>`
          : `<a href="/register" class="btn btn-primary" data-navigo>Sign up</a>`
      }
    </div>
  </div>
</nav>

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Post</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="add-post">
          <div class="mb-3">
            <label for="image" class="form-label">Image</label>
            <input type="file" class="form-control" id="image">
          </div>
          <div class="mb-3">
            <label for="text" class="form-label">Text</label>
            <textarea class="form-control" id="text" rows="3" placeholder="Add text" required></textarea>
            <p id="textError" class="text-danger"></p>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button id="submitPost" type="submit" class="btn btn-primary">Post</button>
      </div>
    </div>
  </div>
</div>
 ${
   user
     ? `<div class="modal fade" id="settingModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Setting</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       <form id="add-post">
          <div class="mb-3">
            <label for="image" class="form-label">Profile Picture</label>
            <input type="file" class="form-control" id="userImage">
          </div>
          <div class="mb-3">
            <label for="text" class="form-label">Username</label>
            <input class="form-control" id="userName" value="${user.user_name}" required>
            <p id="settingTextErrorUsername" class="text-danger"></p>
          </div>
          <div class="mb-3">
            <label for="text" class="form-label">Email</label>
            <input class="form-control" id="email" value="${user.email}" required>
            <p id="settingTextErrorEmail" class="text-danger"></p>
          </div>
          <div class="mb-3">
            <label for="text" class="form-label">Bio</label>
            <input class="form-control" id="bio" value="${user.bio}" required>
            <p id="settingTextErrorBio" class="text-danger"></p>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button id="deleteUser"type="button" class="btn btn-danger">Delete</button>
        <button id="submitSetting" type="submit" class="btn btn-primary">Modify user</button>
      </div>
    </div>
  </div>
</div>
`
     : ""
 }`;
  console.log(user);

  return navHtml;
}
