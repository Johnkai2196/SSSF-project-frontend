import Navigo from "navigo";
import navbar from "./components/navbar";
import register from "./views/registerView";
import login from "./views/loginView";
import cardPost from "./components/cardPost";
import profileView from "./views/profileViews";
const router = new Navigo("");

const element = document.querySelector<HTMLDivElement>("#app");

router.on("/", async () => {
  console.log("home");
  element!.innerHTML = `
    ${navbar()}
    ${cardPost(1)}
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
router.on("/profile/:username", async (data) => {
  console.log("profile" + data?.data?.username);
  element!.innerHTML = `
        ${navbar()}
        //fetch user by username
        ${profileView(data?.data?.username)}
        `;
});
