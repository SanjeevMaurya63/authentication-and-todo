# 🚀 TaskFlow — MERN Stack Todo App

Full-stack todo application with JWT authentication built on the MERN stack.

## Tech Stack

- **MongoDB** — Database
- **Express.js** — Backend framework
- **React.js** — Frontend (Vite + Tailwind CSS)
- **Node.js** — Runtime

## Features

- ✅ JWT-based register & login
- ✅ Password hashing with bcrypt
- ✅ Protected routes (frontend + backend)
- ✅ Full CRUD for todos
- ✅ Priority levels (Low / Medium / High)
- ✅ Mark complete / incomplete toggle
- ✅ Filter by status & priority
- ✅ Search todos
- ✅ Clear all completed
- ✅ Password strength meter
- ✅ Premium dark glassmorphism UI
- ✅ Responsive design
- ✅ Toast notifications

## Project Structure

```
mern-todo/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── todoController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Todo.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── todoRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js
    │   ├── components/
    │   │   ├── StatsBar.jsx
    │   │   ├── TodoForm.jsx
    │   │   └── TodoItem.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

## API Endpoints

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/api/auth/register` | Public | Register user |
| POST | `/api/auth/login` | Public | Login user |
| GET | `/api/auth/me` | Private | Get current user |
| GET | `/api/todos` | Private | Get all todos |
| POST | `/api/todos` | Private | Create todo |
| PUT | `/api/todos/:id` | Private | Update todo |
| DELETE | `/api/todos/:id` | Private | Delete todo |
| PATCH | `/api/todos/:id/toggle` | Private | Toggle complete |

## Setup & Run

### Prerequisites
- Node.js >= 18
- MongoDB (local or MongoDB Atlas)

### 1. Clone & Setup Backend

```bash
cd backend
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern-todo
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
```

```bash
npm install
npm run dev
```

Backend runs on: `http://localhost:5000`

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

### 3. Open Browser

Go to `http://localhost:5173` → Register → Start adding tasks!

## MongoDB Atlas (Cloud) Setup

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create free cluster
3. Get connection string
4. Replace `MONGO_URI` in `.env`:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-todo
```

---

Made with ❤️ — MERN Stack College Project
