import Navigo from "navigo";
import navbar from "./components/navbar";
import register from "./views/registerView";
import login from "./views/loginView";
import cardPost from "./components/cardPost";
import profileView from "./views/profileViews";
import { loginForm } from "./function/loginForm";
import { registerForm } from "./function/registerForm";
const router = new Navigo("");

const element = document.querySelector<HTMLDivElement>("#app");

router.on("/", async () => {
  console.log("home");
  element!.innerHTML = `
    ${navbar()}
    ${cardPost()}
    `;
});
router.on("/register", async () => {
  console.log("register");
  element!.innerHTML = `
        ${navbar()}
        ${register()}
        `;
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
      registers.addEventListener("submit", registerForm);
    }
  });
});
router.on("/login", async () => {
  console.log("login");
  element!.innerHTML = `
        ${navbar()}
        ${login()}
        `;
  const logins = document.querySelector("#login") as HTMLFormElement;
  logins.addEventListener("submit", loginForm);
});
router.on("/profile/:username", async (data) => {
  console.log("profile" + data?.data?.username);
  element!.innerHTML = `
        ${navbar()}
        //fetch user by username
        ${profileView(data?.data?.username)}
        `;
});
