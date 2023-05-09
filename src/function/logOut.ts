export function logOut(event: Event) {
  event.preventDefault();
  localStorage.removeItem("token");

  window.location.href = "/";
}

export function initLogOutEventListeners() {
  const logOutButton = document.querySelector("#logOut") as HTMLFormElement;
  if (logOutButton) {
    logOutButton.addEventListener("click", (event) => {
      logOut(event);
    });
  }
}
