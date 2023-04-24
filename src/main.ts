import navbar from "./components/navbar";

const element = document.querySelector<HTMLDivElement>("#app");
element!.innerHTML = `
${navbar()}
`;
