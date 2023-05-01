import cardPost from "./components/cardPost";
import navbar from "./components/navbar";
import { logOut } from "./function/logOut";
import { loginForm } from "./function/login";
import { doGraphQLFetch } from "./graphql/fetch";
import { checkToken } from "./graphql/queries";
import { User } from "./interfaces/User";
import profileView from "./views/profileViews";

const apiURL = import.meta.env.VITE_API_URL;
const uploadURL = import.meta.env.VITE_UPLOAD_URL;
let user: User = {};
/*${posts.foreach((post) => cardPost(post))}*/
// check token
const element = document.querySelector<HTMLDivElement>("#app");

element!.innerHTML = `
${navbar()}
`;
const token = localStorage.getItem("token");
if (token !== null) {
  try {
    const isTokenValid = await doGraphQLFetch(apiURL, checkToken, {}, token);
    if (isTokenValid.checkToken?.message === "Token is valid") {
      console.log("token valid");
      isTokenValid.checkToken.user;
      user = isTokenValid.checkToken.user;
      element!.innerHTML = `
    ${navbar(user)}
`;
      const logOutButton = document.querySelector("#logOut") as HTMLFormElement;
      logOutButton.addEventListener("click", logOut);
    }
  } catch (error) {
    console.log(error);
  }
}
