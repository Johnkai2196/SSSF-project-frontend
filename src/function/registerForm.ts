import { doGraphQLFetch } from "../graphql/fetch";
import { register } from "../graphql/queries";
import LoginMessageResponse from "../interfaces/LoginMessageResponse";
import { RegisterData } from "../interfaces/RegisterData";

const apiURL = import.meta.env.VITE_API_URL;
export async function registerForm(event: Event): Promise<void> {
  event.preventDefault();

  const username = document.querySelector("#username") as HTMLInputElement;
  const email = document.querySelector("#email") as HTMLInputElement;
  const password = document.querySelector("#password") as HTMLInputElement;
  const button = document.querySelector("#registerButton") as HTMLButtonElement;
  const passwordMatchError = document.getElementById(
    "passwordMatchError"
  ) as HTMLElement;
  const user: RegisterData = {
    user_name: username.value,
    email: email.value,
    password: password.value,
  };

  try {
    const registerData = (await doGraphQLFetch(apiURL, register, {
      user,
    })) as LoginMessageResponse;
    console.log(registerData);
    if (registerData.register === null) {
      console.log("registerData is null");

      passwordMatchError.innerText = "username or email already exists";
      button.disabled = false;
      button.innerHTML = "Register";
    }
    localStorage.setItem("token", registerData.register.token!);
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
}

export function initRegisterEventListeners(): void {
  const password = document.querySelector("#password") as HTMLInputElement;
  const password2 = document.querySelector(
    "#passwordRepeat"
  ) as HTMLInputElement;
  const passwordMatchError = document.getElementById(
    "passwordMatchError"
  ) as HTMLElement;
  password2.addEventListener("input", async () => {
    if (password.value !== password2.value) {
      passwordMatchError.innerText = "Passwords do not match";
    } else {
      passwordMatchError.innerText = "";
      const registers = document.querySelector("#register") as HTMLFormElement;
      const button = document.querySelector(
        "#registerButton"
      ) as HTMLButtonElement;
      registers.addEventListener("submit", (event) => {
        button.disabled = true;
        button.innerHTML =
          '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
        registerForm(event);
      });
    }
  });
}
