export default function profileView(username: unknown): string {
  const profileHtml = `
   <div class="container" style="margin-top: 75px;">
<div class="container">
<div class="jumbotron" style="background-color:#CFD8DC;">
    <div class="row">
        <div class="col-md-3">
            <img src="https://via.placeholder.com/150" alt="Profile Picture" class="img-fluid rounded-circle">
        </div>
        <div class="col-md-9">
            <h1 class="display-4">My Profile Page</h1>
            <hr class="my-4">
            <p class="lead">Welcome to my profile page!</p>
        </div>
    </div>
</div>
</div>`;
  return profileHtml;
}
