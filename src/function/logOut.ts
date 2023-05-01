export function logOut(event: Event) {
  event.preventDefault();
  localStorage.removeItem("token");
  window.location.href = "/";
}
