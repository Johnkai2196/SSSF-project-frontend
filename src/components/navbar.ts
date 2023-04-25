import { User } from "../interfaces/User";
const uploadUrl = import.meta.env.VITE_UPLOAD_URL;
export default function navbar(user?: User): string {
  const image = uploadUrl + user?.profilePicture;
  const navHtml = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light  mb-4">
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
            src="./src/image/O-removebg-preview.png"
            height="30"
            alt="Otaku Connect"
            loading="lazy"
          />
          Otaku Connect
        </a>

        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

        </ul>
        
      </div>
      <div class="d-flex align-items-center">
        ${
          user
            ? `<a>${user.username}</a>
              <div class="btn-group">
                <a
                  id="navbarDropdownMenuAvatar"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  class="nav-link dropdown-toggle"
                >
                  <img
                    src="´${
                      !user.profilePicture
                        ? `https://loremflickr.com/320/240`
                        : image
                    }"
                    class="rounded-circle"
                    height="25"
                    alt="profile picture"
                    loading="lazy"
                  />
                </a>
                <ul class="dropdown-menu dropdown-menu-right">
                  <li><a class="dropdown-item" href="#">Setting</a></li>
                  <li><a class="dropdown-item" href="#">Log out</a></li>
                </ul>
              </div>`
            : `<a href="/register" class="btn btn-primary" data-navigo>Sign up</a>`
        }
      </div>
    </div>
  </nav>
`;

  return navHtml;
}
