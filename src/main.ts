import carsPost from "./components/cardPost";
import navbar from "./components/navbar";

const element = document.querySelector<HTMLDivElement>("#app");
element!.innerHTML = `
${navbar()}
${carsPost(1)}

`;
