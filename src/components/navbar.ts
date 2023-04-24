export default function navbar(): string {
  return `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
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
          </a>

          <ul class="navbar-nav me-auto mb-2 mb-lg-0">

          </ul>
          
        </div>
            <div class="d-flex align-items-center">
                    <button type="button" class="btn btn-primary " href="/register" data-navigo>Sign up</button>
            </div>
      </div>
    </nav>`;
}
