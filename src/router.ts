import Navigo from "navigo";
import navbar from "./components/navbar";
import register from "./views/registerView";
import login from "./views/loginView";
const router = new Navigo("");

const element = document.querySelector<HTMLDivElement>("#app");

router.on("/", async () => {
  console.log("home");
  element!.innerHTML = `
    ${navbar()}
    `;
});
router.on("/register", async () => {
  console.log("register");
  element!.innerHTML = `
        ${navbar()}
        ${register()}
        `;
});
router.on("/login", async () => {
  console.log("login");
  element!.innerHTML = `
        ${navbar()}
        ${login()}
        `;
});
