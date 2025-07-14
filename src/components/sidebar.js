export function renderSidebar() {
  const aside = document.createElement("aside");
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      logoutUser();
      navigate("/");
    });
  }

  aside.className = "sidebar";
  aside.innerHTML = `
    <h2>Menu</h2>
    <nav>
      <a href="/public" data-link>Home</a>
      <a href="/admin" data-link>Admin</a>
      <button id="logout-btn">Logout</button>
    </nav>
  `;
  return aside;
}
