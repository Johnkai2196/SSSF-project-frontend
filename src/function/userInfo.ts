import { doGraphQLFetch } from "../graphql/fetch";

export async function getUserInfo(token: string) {
  try {
    const loginData = (await doGraphQLFetch(apiURL, getUserInfo, {
      token,
    })) as LoginMessageResponse;
    console.log(loginData.login.token!);
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
}
