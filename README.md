# Simulacro Platform

A Single Page Application (SPA) for course and user management, built with Vite, Vanilla JS, and SweetAlert2.

## Features

- **User login and registration**
- **Roles:** admin and visitor
- **Admin dashboard:** manage users and courses
- **Public panel:** enroll in available courses
- **SPA navigation:** no page reloads
- **User-friendly alerts:** SweetAlert2

## Folder Structure

```
src/
  assets/           # CSS styles
  components/       # Sidebar and header components
  pages/            # admin.js, public.js, login.js, register.js
  services/         # api.js (fetch requests)
  templates/        # HTML for each view
main.js             # Main SPA logic and routing
db.json             # Mock database (json-server)
```

## Installation

1. Install dependencies:

   ```
   npm install
   ```

2. Start the development server:

   ```
   npm run dev
   ```

3. (Optional) If you use json-server for the REST API:

   ```
   npx json-server --watch db.json --port 3000
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

- **Login:**  
  Log in with an existing user (see `db.json`).
- **Admin:**  
  Access `/admin` if your role is `admin`.
- **Visitor:**  
  Access `/public` if your role is `visitante`.
- **Enrollment:**  
  Visitors can enroll in available courses.

## Main Code (`main.js`)

- **SPA Routes:**  
  Defines routes and their HTML files.
- **Session:**  
  Stores and removes the logged-in user in localStorage.
- **SPA Navigation:**  
  Intercepts links and buttons to navigate without reloading.
- **Route Protection:**  
  Only allows access to routes according to user role.
- **Dynamic Loading:**  
  Loads the HTML and JS needed for each view.

## Dependencies

- [Vite](https://vitejs.dev/)
- [SweetAlert2](https://sweetalert2.github.io/)
- [json-server](https://github.com/typicode/json-server) (optional for REST API simulation)

---

If you need more details about any file or function, feel free to ask!
