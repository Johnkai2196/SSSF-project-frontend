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
  getPostsByUserIds,
  initAddPosts,
  initDeleteAndModifyListener,
} from "./function/post";
import { Post } from "./interfaces/Post";
import { getUserByIds, initModUser } from "./function/user";
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
    console.log(allPost);

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
      initModUser();
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
  })
  .on("/profile/:id", async (data) => {
    const profileData = await getUserByIds(data?.data?.id!);

    const usersPost = await getPostsByUserIds(data?.data?.id!);

    element!.innerHTML = `
        ${navbar(userData)}
        ${profileView(profileData.userById)}
<div class="container" style="margin-top: 75px;">
${usersPost
  .reverse()
  .map((post: Post) => cardPost(post))
  .join("")}
</div>

        `;
    usersPost
      .reverse()
      .forEach((post: Post) => initDeleteAndModifyListener(post));
    if (userData) {
      initLogOutEventListeners();
      initAddPosts();
      initModUser();
    }
  })
  .resolve();
export default router;
