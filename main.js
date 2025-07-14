// 🌐 Rutas reales de tu aplicación
const routes = {
  "/": "src/templates/login.html",
  "/register": "src/templates/register.html",
  "/admin": "src/templates/admin.html",
  "/public": "src/templates/public.html"
};

// 🔐 Funciones para sesión

export function getLoggedUser() {
  return JSON.parse(localStorage.getItem("loggedUser"));
}

export function logoutUser() {
  localStorage.removeItem("loggedUser");
}

// 🚀 Enlaces SPA con data-link y logout
document.body.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    navigate(e.target.getAttribute("href"));
  }

  if (e.target.id === "logout-btn") {
    e.preventDefault();
    Swal.fire({
      title: "Do you want to log out?",
      text: "Your current session will be closed",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, close",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser();
        navigate("/");
      }
    });
  }
});

// 📦 Navegador SPA con validación de sesión y rol
export async function navigate(pathname) {
  const user = getLoggedUser();

  // 🚫 Ya logueado y quiere volver al login → redirigir según rol
  if (pathname === "/" && user) {
    return navigate(user.role === "admin" ? "/admin" : "/public");
  }

  // 🔒 No logueado y quiere acceder a cualquier ruta que no sea login o register
  const publicRoutes = ["/", "/register"];
  if (!user && !publicRoutes.includes(pathname)) {
    Swal.fire("Ups", "First,Log In", "warning");
    return navigate("/");
  }

  // 🔒 Protección para rol admin
  if (pathname === "/admin" && user?.role !== "admin") {
    Swal.fire("Access denied", "You do not have permission to enter here.", "error");
    return navigate("/public");
  }

  const route = routes[pathname];
  if (!route) return navigate("/");

  try {
    const html = await fetch(route).then((res) => res.text());

    const loginContent = document.getElementById("login-content");
    const app = document.getElementById("app");

    if (pathname === "/" || pathname === "/register") {
      // Vistas públicas (login y register)
      app.style.display = "none";
      app.innerHTML = "";
      loginContent.innerHTML = html;

      if (pathname === "/") {
        const { setupLogin } = await import("./src/pages/login.js");
        setupLogin();
      } else {
        const { setupRegister } = await import("./src/pages/register.js");
        setupRegister();
      }
    } else {
      // Vistas protegidas (admin y public)
      loginContent.innerHTML = "";
      app.style.display = "flex";
      app.innerHTML = "";

      const { renderSidebar } = await import("./src/components/sidebar.js");
      const { renderHeader } = await import("./src/components/header.js");

      const sidebar = renderSidebar();
      const header = renderHeader();

      const main = document.createElement("main");
      main.id = "content";
      main.innerHTML = html;

      const mainContent = document.createElement("div");
      mainContent.className = "main-content";
      mainContent.appendChild(header);
      mainContent.appendChild(main);

      app.appendChild(sidebar);
      app.appendChild(mainContent);

      if (pathname === "/admin") {
        const { setupDashboard } = await import("./src/pages/admin.js");
        setupDashboard();
      } else if (pathname === "/public") {
        const { setupPublic } = await import("./src/pages/public.js");
        setupPublic();
      }
    }

    history.pushState({}, "", pathname);
  } catch (err) {
    console.error("Browsing Error:", err);
    Swal.fire("Ups", "Something went wrong", "error");
    if (pathname !== "/") navigate("/");
  }
}

// 🔙 Back/forward del navegador
window.addEventListener("popstate", () => navigate(location.pathname));

// 🚀 Cargar ruta actual al iniciar la app
navigate(location.pathname);

