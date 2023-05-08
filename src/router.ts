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
import {
  getAllUser,
  getUserByIds,
  initDeleteButtonsAsAdmin,
  initDeleteUserButton,
  initModUser,
} from "./function/user";
import cardUser from "./components/cardUser";
import { initLikePost } from "./function/likes";
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

    allPost.reverse().forEach((post: Post) => {
      initDeleteAndModifyListener(post);
      initLikePost(post);
    });

    if (userData) {
      initLogOutEventListeners();
      initAddPosts();
      initModUser();
      initDeleteUserButton();
    }
  })
  .on("/register", async () => {
    element!.innerHTML = `
      ${navbar()}
      ${register()}
    `;

    initRegisterEventListeners();
  })
  .on("/login", async () => {
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

    usersPost.reverse().forEach((post: Post) => {
      initDeleteAndModifyListener(post);
      initLikePost(post);
    });

    if (userData) {
      initLogOutEventListeners();
      initAddPosts();
      initModUser();
      initDeleteUserButton();
    }
  })
  .on("/admin", async () => {
    const usersData = await getAllUser();

    element!.innerHTML = `
      ${navbar(userData)}
      <div class="container" style="margin-top: 75px;">
      ${usersData
        .reverse()
        .map((user: User) => cardUser(user))
        .join("")}}
      </div>
      `;
    usersData.reverse().forEach((user: User) => initDeleteButtonsAsAdmin(user));
    if (userData) {
      initLogOutEventListeners();
      initAddPosts();
      initModUser();
    }
  })

  .resolve();

export default router;
