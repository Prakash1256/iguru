# Task Management System

This project is a full-stack task management system that allows users to manage their tasks efficiently. The application includes user authentication, task creation, deletion, updating, filtering, and proper validation. The backend is implemented using Node.js and Express, while the frontend is built with React and styled using Material UI.

---

## Features

### Backend (Node.js + Express)
1. **User Authentication:**
   - Register new users (`POST /api/auth/register`).
   - Login users and return a token (`POST /api/auth/login`).

2. **Task Management:**
   - Create a task (`POST /api/tasks`) - Requires authentication.
   - Retrieve all tasks for the logged-in user (`GET /api/tasks`).
   - Update a task's description or due date (`PUT /api/tasks/:id`).
   - Delete a task (`DELETE /api/tasks/:id`).
   - Filter tasks based on their status (`GET /api/tasks/filter?status=<today|overdue>`).

3. **Security:**
   - Users can only manage their own tasks.
   - Proper authentication using tokens.

4. **Validation & Error Handling:**
   - Validates input fields to ensure data integrity.
   - Handles common edge cases such as missing fields or invalid data.

### Frontend (React)
1. **Task Form:**
   - A form to create tasks with a description and due date.
   - Validates input before submission.

2. **Task List:**
   - Displays a list of tasks with descriptions and due dates.
   - Each task has a delete button to remove it from the list.
   - Shows the total number of tasks.

3. **Task Filters:**
   - Filters to display tasks due today or overdue.

4. **Styling:**
   - Uses Material UI version 5+ for a responsive and modern design.

---

## Installation

### Prerequisites
- Node.js (v16 or above)
- npm (v8 or above)
- A modern web browser

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_name>
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and configure the following variables:
   ```
   PORT=5000
   DATABASE_URL=<your_database_url>
   JWT_SECRET=<your_jwt_secret>
   ```

4. Run the backend server:
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:5000`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`.

---

## Usage

1. **Register and Login:**
   - Access the authentication endpoints to register and log in.
   - Use the token provided to authenticate further requests.

2. **Manage Tasks:**
   - Add, view, update, delete, and filter tasks through the provided UI.

---

## Folder Structure

```
root
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middlewares
│   ├── utils
│   └── server.js
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── styles
│   │   └── App.js
└── README.md
```

---

## Technologies Used
- **Backend:** Node.js, Express.js, MongoDB (or any other database).
- **Frontend:** React.js, Material UI (v5).
- **Authentication:** JWT (JSON Web Tokens).

---

## API Endpoints

### Authentication
| Endpoint               | Method | Description          |
|------------------------|--------|----------------------|
| `/api/auth/register`   | POST   | User registration.   |
| `/api/auth/login`      | POST   | User login.          |

### Task Management
| Endpoint                    | Method | Description                        |
|-----------------------------|--------|------------------------------------|
| `/api/tasks`                | POST   | Create a task.                     |
| `/api/tasks`                | GET    | Retrieve all tasks.                |
| `/api/tasks/:id`            | PUT    | Update a task.                     |
| `/api/tasks/:id`            | DELETE | Delete a task.                     |
| `/api/tasks/filter`         | GET    | Filter tasks (today/overdue).      |

---

## Future Improvements
1. Add support for task priorities.
2. Implement notifications for due tasks.
3. Add sorting and search functionality for tasks.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contributors
- **Kunwar Prakash Singh**

---

## Acknowledgements
Special thanks to the open-source community for providing tools and libraries that made this project possible.

