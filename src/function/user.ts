import { doGraphQLFetch } from "../graphql/fetch";
import { getUserById } from "../graphql/queries";

const apiURL = import.meta.env.VITE_API_URL;
const uploadURL = import.meta.env.VITE_UPLOAD_URL;

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
