export default function cardUser(user: any): string {
  const fileUrl = import.meta.env.VITE_FILE_URL;
  const image = fileUrl + user.profilePicture;
  console.log("image", user.id);

  const cardUser = `
<div class="d-flex justify-content-center align-items-center">
    <div class="col-md-6 mb-3">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${image}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${user.user_name}</h5>
                <p class="card-text">${user.bio}</p>
                <a href="" id="delete${user.id}" class="btn btn-primary btn-lg btn-block">Delete user</a>
            </div>
        </div>  
    </div>
</div>`;
  return cardUser;
}
