import Navigo from "navigo";
import navbar from "./components/navbar";
import register from "./views/registerView";
import login from "./views/loginView";
import cardPost from "./components/cardPost";
import profileView from "./views/profileViews";
import { initLoginEventListeners } from "./function/loginForm";
import { initRegisterEventListeners } from "./function/registerForm";
import { User } from "./interfaces/User";
import { initLogOutEventListeners } from "./function/logOut";
import { user } from "./main";
import {
  getAllPost,
  initAddPosts,
  initDeleteAndModifyListener,
} from "./function/post";
import { Post } from "./interfaces/Post";
const router = new Navigo("/");

const element = document.querySelector<HTMLDivElement>("#app");
let userData: User | null;
if (!user.user_name) {
  userData = null;
} else {
  userData = user;
}
router
  .on("/", async () => {
    console.log("home");
    const allPost = await getAllPost();

    element!.innerHTML = `
${navbar(userData)}
<div class="container" style="margin-top: 75px;">
${allPost
  .reverse()
  .map((post: Post) => cardPost(post))
  .join("")}
</div>
`;
    allPost
      .reverse()
      .forEach((post: Post) => initDeleteAndModifyListener(post));
    if (userData) {
      initLogOutEventListeners();
      initAddPosts();
    }
  })
  .on("/register", async () => {
    console.log("register");
    element!.innerHTML = `
        ${navbar()}
        ${register()}
        `;
    initRegisterEventListeners();
  })
  .on("/login", async () => {
    console.log("login");
    element!.innerHTML = `
        ${navbar()}
        ${login()}
        `;
    initLoginEventListeners();
  });
router
  .on("/profile/:username", async (data) => {
    console.log("profile" + data?.data?.username);
    element!.innerHTML = `
        ${navbar(userData)}
        //fetch user by username
        ${profileView(data?.data?.username)}
        `;
    if (userData) {
      initLogOutEventListeners();
    }
  })
  .resolve();
export default router;
