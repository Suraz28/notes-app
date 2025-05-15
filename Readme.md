# 📝 MERN Note App

A full-stack **Note Taking App** built with the **MERN Stack (MongoDB, Express, React, Node.js)**. The app allows users to **sign up, log in, create, read, update, and delete notes** securely. Styled using **Tailwind CSS** and secured with **JWT-based authentication**.

---

## 🚀 Features

- ✅ User Authentication (JWT-based)
- 🧠 Create, Read, Update, Delete Notes
- 🌙 Responsive UI with Tailwind CSS
- 🔐 Protected Routes for Authenticated Users
- ⚙️ Backend REST API using Express and MongoDB
- 🧾 Timestamps and user-specific note storage

---

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- Tailwind CSS
- Axios
- React Router

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- bcryptjs for password hashing

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/suraz28/mern-note-app.git
cd mern-note-app

## Backend Setup
cd backend
npm install

##create .env file in the backend/ direactory
PORT=5000
MONGO_URI=your_mongo_connection_string(in config.js file)
JWT_SECRET=your_jwt_secret_key

## Start the server:
backend: npm start
frontend: npm run dev


🔐 Authentication Flow
Register: User signs up with name, email, and password.

Login: JWT token is returned and stored in localStorage.

Protected Routes: Only logged-in users can access their notes.

Token Validation: Middleware checks for valid JWT on protected routes.