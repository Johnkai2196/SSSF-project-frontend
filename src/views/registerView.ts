export default function registerView(): string {
  const registerHtml = `
<div class="container" style="margin-top: 75px;">
<section class="vh-100">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style="border-radius: 25px;">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                <div class="form-container">
                  <form id=register>
                    <div class="form-outline mb-4">
                      <label for="youInputUserName">Username</label>
                      <input type="text" id="username" class="form-control" placeholder="Username" required/>
                    </div>
                    <div class="form-outline mb-4">
                     <label for="yourInputEmail">Email</label>
                      <input type="email" id="email" class="form-control" placeholder="Email" required/>
                    </div>
                    <div class="form-outline mb-4">       
                        <label  for="yourInputPassword">Password</label>
                        <input type="password" id="password" class="form-control" placeholder="Password" required/>
                    </div>
                    <div class="form-outline mb-4">
                    <label " for="yourInputPasswordRepeat">Repeat your password</label>
                      <input type="password" id="passwordRepeat" class="form-control" placeholder="Re-enter password" required/>
                        <p id="passwordMatchError" class="text-danger"></p>
                    </div>
                    <div class="d-flex justify-content-center">
                      <button id="registerButton" type="submit" class="btn btn-success btn-block btn-lg text-body">Register</button>
                    </div>
                    <p class="text-center text-muted mt-3 mb-0">Already have an account? <a href="/login" data-navigo
                        class="fw-bold text-body"><u>Login</u></a></p>
                  </form>
                </div>
              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                <img src="./src/image/o-removebg-preview.png" class="img-fluid" alt="Otaku Connect">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</div>`;
  return registerHtml;
}
