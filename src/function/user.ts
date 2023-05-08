import { doGraphQLFetch } from "../graphql/fetch";
import {
  deleteUser,
  deleteUserAsAdmin,
  getUserById,
  getUsers,
  updateUser,
} from "../graphql/queries";
import { UploadResponse } from "../interfaces/UploadResponse";
import { User } from "../interfaces/User";

const apiURL = import.meta.env.VITE_API_URL;
const uploadURL = import.meta.env.VITE_UPLOAD_URL;
export async function getAllUser() {
  try {
    const userData = await doGraphQLFetch(apiURL, getUsers, {});

    return userData.users;
  } catch (error) {
    console.log(error);
  }
}
export async function getUserByIds(id: string) {
  try {
    console.log("get", id);
    console.log(getUserById);
    console.log(apiURL);

    const userData = await doGraphQLFetch(apiURL, getUserById, {
      userByIdId: id,
    });
    console.log(userData);

    return userData;
  } catch (error) {
    console.log(error);
  }
}
export async function modifyUser(user: any) {
  try {
    const userData = await doGraphQLFetch(
      apiURL,
      updateUser,
      {
        user: user,
      },
      localStorage.getItem("token")!
    );
    return userData;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteUsersAsAdmin(id: string) {
  try {
    const deleteData = await doGraphQLFetch(
      apiURL,
      deleteUserAsAdmin,
      {
        deleteUserAsAdminId: id,
      },
      localStorage.getItem("token")!
    );
    console.log(deleteData);

    return deleteData;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteUsers() {
  try {
    const deleteData = await doGraphQLFetch(
      apiURL,
      deleteUser,
      {},
      localStorage.getItem("token")!
    );
    console.log(deleteData);
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
}

export function initDeleteButtonsAsAdmin(user: User): void {
  const deleteButton = document.querySelector(
    "#delete" + user.id
  ) as HTMLElement;
  deleteButton.addEventListener("click", async (event) => {
    event.preventDefault();
    if (user.id === undefined) return;
    const deleteData = await deleteUsersAsAdmin(user.id);
    console.log(deleteData);
    window.location.href = "/admin";
  });
}
export function initDeleteUserButton(): void {
  const deleteButton = document.querySelector("#deleteUser") as HTMLElement;
  deleteButton.addEventListener("click", async (event) => {
    event.preventDefault();
    await deleteUsers();
  });
}

export function initModUser(): void {
  const button = document.querySelector("#submitSetting") as HTMLButtonElement;
  const userName = document.querySelector("#userName") as HTMLInputElement;
  const email = document.querySelector("#email") as HTMLInputElement;
  const bio = document.querySelector("#bio") as HTMLInputElement;
  const image = document.querySelector("#userImage") as HTMLInputElement;
  const userNameError = document.querySelector(
    "#settingTextErrorUsername"
  ) as HTMLElement;
  const emailError = document.querySelector(
    "#settingTextErrorEmail"
  ) as HTMLElement;
  const bioError = document.querySelector(
    "#settingTextErrorBio"
  ) as HTMLElement;

  button.addEventListener("click", async () => {
    let user = {};
    user = {
      user_name: userName.value,
      email: email.value,
      bio: bio.value,
    };
    if (image.value !== "") {
      const imageFile = image.files![0];
      const formData = new FormData();
      formData.append("picture", imageFile);
      const imageUpload = await fetch(`${uploadURL}/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")!}`,
        },
        body: formData,
      });

      const imageUploadData = (await imageUpload.json()) as UploadResponse;
      console.log(imageUploadData);

      user = {
        user_name: userName.value,
        email: email.value,
        bio: bio.value,
        profilePicture: imageUploadData.data.filename,
      };
    }
    if (userName.value === "") {
      userNameError.innerText = "Please enter a user name";
      return;
    }
    if (email.value === "") {
      emailError.innerText = "Please enter a email";
      return;
    }
    if (bio.value === "") {
      bioError.innerText = "Please enter a bio";
      return;
    }
    button.disabled = true;
    button.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
    await modifyUser(user);
    window.location.href = "/";
  });
}
