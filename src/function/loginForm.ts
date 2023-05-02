import { doGraphQLFetch } from "../graphql/fetch";
import { login } from "../graphql/queries";
import { Credentials } from "../interfaces/Credentials";
import LoginMessageResponse from "../interfaces/LoginMessageResponse";

const apiURL = import.meta.env.VITE_API_URL;
export async function loginForm(event: Event): Promise<void> {
  event.preventDefault();

  const username = document.querySelector("#username") as HTMLInputElement;
  const password = document.querySelector("#password") as HTMLInputElement;

  const credentials: Credentials = {
    username: username.value,
    password: password.value,
  };

  try {
    const loginData = (await doGraphQLFetch(apiURL, login, {
      credentials,
    })) as LoginMessageResponse;
    localStorage.setItem("token", loginData.login.token!);
    console.log(loginData.login.token!);
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
}
