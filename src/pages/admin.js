import { get } from "../services/api.js";

export async function setupDashboard() {
  const user = getLoggedUser();

  const userName = document.getElementById("admin-name");
  if (userName) userName.textContent = user.name;

  const users = await get("http://localhost:3000/users");
  const usersTable = document.getElementById("users-table-body");

  if (usersTable) {
    usersTable.innerHTML = "";
    users.forEach((u) => {
      usersTable.innerHTML += `
        <tr>
          <td>${u.id}</td>
          <td>${u.name}</td>
          <td>${u.email}</td>
          <td>${u.role}</td>
          <td>
            <button data-edit-id="${u.id}">✏️</button>
            <button data-delete-id="${u.id}">🗑️</button>
          </td>
        </tr>
      `;
    });
  }

  const courses = await get("http://localhost:3000/courses");
  const coursesTable = document.getElementById("courses-table-body");

  if (coursesTable) {
    coursesTable.innerHTML = "";
    courses.forEach((c) => {
      coursesTable.innerHTML += `
        <tr>
          <td>${c.id}</td>
          <td>${c.title}</td>
          <td>${c.description}</td>
          <td>${c.startDate}</td>
          <td>${c.duration}</td>
          <td>
            <button data-edit-id="${c.id}">✏️</button>
            <button data-delete-id="${c.id}">🗑️</button>
          </td>
        </tr>
      `;
    });
  }
}
