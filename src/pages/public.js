import { get, post } from "../services/api.js";
import { getLoggedUser } from "../../main.js";

export async function setupPublic() {
  const user = getLoggedUser();

  // Validación del usuario (ya se hace en main.js, pero por seguridad se vuelve a comprobar)
  if (!user || user.role !== "visitante") {
    Swal.fire("Ups", "No tienes permiso para estar aquí.", "warning");
    return;
  }

  // Mostrar nombre del usuario si hay un contenedor con ID correspondiente
  const userNameEl = document.getElementById("visitante-name");
  if (userNameEl) userNameEl.textContent = user.name;

  // Obtener cursos y enrolamientos del servidor
  try {
    const [courses, enrollments] = await Promise.all([
      get("http://localhost:3000/courses"),
      get("http://localhost:3000/enrollments"),
    ]);

    // Filtrar enrolamientos del usuario actual
    const userEnrollments = enrollments.filter(e => e.userId === user.id);
    const enrolledCourseIds = userEnrollments.map(e => e.courseId);

    // Contenedor de cursos
    const container = document.getElementById("courses-list");
    container.innerHTML = "";

    courses.forEach(course => {
      const isEnrolled = enrolledCourseIds.includes(course.id);

      const card = document.createElement("div");
      card.className = "course-card";
      card.innerHTML = `
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <p><strong>Inicio:</strong> ${course.startDate}</p>
        <p><strong>Duración:</strong> ${course.duration}</p>
        <button 
          class="enroll-btn" 
          data-course-id="${course.id}"
          ${isEnrolled ? "disabled" : ""}
        >
          ${isEnrolled ? "Ya inscrito" : "Inscribirse"}
        </button>
      `;

      container.appendChild(card);
    });

    // Manejo de clicks en botones de inscripción
    container.addEventListener("click", async (e) => {
      if (e.target.classList.contains("enroll-btn")) {
        const courseId = parseInt(e.target.dataset.courseId);
        if (!enrolledCourseIds.includes(courseId)) {
          await post("http://localhost:3000/enrollments", {
            userId: user.id,
            courseId: courseId
          });

          Swal.fire("¡Inscripción exitosa!", "Te has inscrito correctamente.", "success");
          setupPublic(); // Recargar lista actualizada
        }
      }
    });

  } catch (error) {
    console.error("Error cargando cursos:", error);
    Swal.fire("Error", "No se pudieron cargar los cursos.", "error");
  }
}
