import cardPost from "./components/cardPost";
import navbar from "./components/navbar";
import profileView from "./views/profileViews";

const element = document.querySelector<HTMLDivElement>("#app");
element!.innerHTML = `
${navbar()}
${profileView()}
`;
/*${posts.foreach((post) => cardPost(post))}*/
