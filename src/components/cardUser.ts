import { User } from "../interfaces/User";

export default function cardUser(user: User): string {
  const fileUrl = import.meta.env.VITE_FILE_URL;
  const image = fileUrl + user.profilePicture;
  console.log(user);

  const cardUser = `
  <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="..." alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`;
  return cardUser;
}
