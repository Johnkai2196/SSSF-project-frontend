// Import our custom CSS
import navBar from "../components/navbar";

import * as mdb from "mdb-ui-kit"; // lib
import { Input } from "mdb-ui-kit"; // module
import register from "../views/register";
document.querySelector("#app").innerHTML = `
${navBar()}

${register()}
`;
