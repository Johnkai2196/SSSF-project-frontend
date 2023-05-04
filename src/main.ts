import { doGraphQLFetch } from "./graphql/fetch";
import { checkToken } from "./graphql/queries";
import { User } from "./interfaces/User";

const apiURL = import.meta.env.VITE_API_URL;
export let user: User = {};
const token = localStorage.getItem("token");

if (token !== null) {
  try {
    const isTokenValid = await doGraphQLFetch(apiURL, checkToken, {}, token);
    if (isTokenValid.checkToken?.message === "Token is valid") {
      console.log("token valid");
      isTokenValid.checkToken.user;
      user = isTokenValid.checkToken.user;
      console.log(1);
    }
  } catch (error) {
    console.log(error);
  }
}
