import { doGraphQLFetch } from "../graphql/fetch";
import { login } from "../graphql/queries";
import { Credentials } from "../interfaces/Credentials";
import LoginMessageResponse from "../interfaces/LoginMessageResponse";
import router from "../router";

const apiURL = import.meta.env.VITE_API_URL;
export async function loginForm(event: Event): Promise<void> {
  event.preventDefault();

  const username = document.querySelector("#username") as HTMLInputElement;
  const password = document.querySelector("#password") as HTMLInputElement;
  const button = document.querySelector("#loginButton") as HTMLButtonElement;
  const credentials: Credentials = {
    username: username.value,
    password: password.value,
  };

  try {
    const loginData = (await doGraphQLFetch(apiURL, login, {
      credentials,
    })) as LoginMessageResponse;
    console.log(loginData);

    if (loginData.login === null) {
      const error = document.querySelector("#Error") as HTMLElement;
      error.innerText = "Invalid credentials";
      button.disabled = false;
      button.innerHTML = "Login";
      return;
    }
    localStorage.setItem("token", loginData.login.token!);
    console.log(loginData.login.token!);
    console.log(2);

    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
}

export function initLoginEventListeners(): void {
  const logins = document.querySelector("#login") as HTMLFormElement;
  const button = document.querySelector("#loginButton") as HTMLButtonElement;

  logins.addEventListener("submit", (event) => {
    button.disabled = true;
    button.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
    loginForm(event);
  });
}
