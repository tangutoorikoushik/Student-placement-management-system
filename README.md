# Student Placement Management System

A full-stack solution utilizing the MERN stack for the web portal and React Native (Expo) for the mobile application.
It provides distinct interfaces for students to find and apply for jobs, and for administrators to manage job postings and track applicant status.

## Technologies Used

- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JSON Web Tokens (JWT) for authentication.
- **Frontend (Web):** React, Vite, React Router, TailwindCSS.
- **Mobile App:** React Native, Expo, React Navigation.

## Prerequisites

- [Node.js](https://nodejs.org/) and npm installed on your machine.
- A local MongoDB instance running, or a MongoDB Atlas connection string (update `MONGO_URI` in `backend/.env`).

## How to Run Locally

### 1. Backend Server

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Ensure your MongoDB is running or the `.env` `MONGO_URI` is correct.
4. Start the server (runs on port 5000 by default):
   ```bash
   npm run dev
   ```

### 2. Frontend Web Portal

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Access the web app at `http://localhost:5173` (or the port Vite provides).

### 3. Mobile App (React Native + Expo)

1. Open a new terminal and navigate to the mobile directory:
   ```bash
   cd mobile
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Expo development server:
   ```bash
   npm start
   ```
4. Download the **Expo Go** app on your iOS or Android device.
5. Scan the QR code presented in the terminal or browser window with the Expo Go app to view the mobile app.

---

## Authors & Acknowledgments

Built as a Final Year B.Tech Project.
