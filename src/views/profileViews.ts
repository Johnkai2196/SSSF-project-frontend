const fileUrl = import.meta.env.VITE_FILE_URL;
export default function profileView(user: any): string {

  const image = fileUrl + user.profilePicture;
  const profileHtml = `
<div class="container" style="margin-top: 75px;">
    <div class="container">
        <div class="jumbotron" style="background-color:#CFD8DC;">
            <div class="row">
                    <div class="col-md-3">
                        <img src="${image}" alt="Profile Picture" class="img-fluid rounded-circle">
                    </div>
                    <div class="col-md-9">
                        <h1 class="display-4">${user.user_name}</h1>
                        <hr class="my-4">
                        <p class="lead">${user.bio}</p>
                    </div>
            </div>
        </div>
    </div>
</div>`;
  return profileHtml;
}
