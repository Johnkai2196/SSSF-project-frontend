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

  const user: RegisterData = {
    user_name: username.value,
    email: email.value,
    password: password.value,
  };

  try {
    const registerData = (await doGraphQLFetch(apiURL, register, {
      user,
    })) as LoginMessageResponse;
    localStorage.setItem("token", registerData.register.token!);
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
}
