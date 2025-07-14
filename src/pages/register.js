import { get, post } from "../services/api.js";
import { navigate } from "../../main.js"; // o como se llame tu router

export async function setupRegister() {
  const form = document.getElementById("register-form");
  const msg = document.getElementById("register-msg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.querySelector('input[name="role"]:checked')?.value;

    if (!name || !email || !password) {
      msg.textContent = "Please complete all .";
      return;
    }

    const users = await get("http://localhost:3000/users");

    const alreadyExists = users.find(user => user.email === email);

    if (alreadyExists) {
      msg.textContent = "There is already a user with that email.";
      return;
    }

    const newUser = {
      id: Date.now(), // o que lo maneje json-server automáticamente
      name,
      email,
      password,
      role
    };

    await post("http://localhost:3000/users", newUser);

    localStorage.setItem("loggedUser", JSON.stringify(newUser));
    navigate("/users"); // o donde lo quieras redirigir después del registro
  });
}