# 📋 Smart Task Management System - Frontend (Angular)

A modern and responsive **Task Management System** built using Angular 16+ and integrated with a .NET Core Web API backend. This project features a **role-based interface** for Admins and Users, with dashboards, task filtering, JWT authentication, and profile management.

---

## 🔑 Demo Admin Credentials

> ✅ Use this to log in and explore the Admin features:

- **Email:** `admin@example.com`  
- **Password:** `11112222`

---

## 🚀 Features Overview

### 🔐 Authentication
- Login, Registration with validations
- JWT token storage and user session management

### 👤 Role-Based System
- **Admin**
  - Manage predefined task categories
  - Assign and track tasks for users
  - View all users and their task progress
- **User**
  - View, filter, and update their own tasks
  - Track completion progress
  - View upcoming tasks due in next 7 days
  - View/edit profile and change password

### 📊 Dashboard Views
- Summary of total, completed, and pending tasks
- Progress bar and recent task previews

### ✅ Task Management
- Filter by category, priority, status
- Sort by due date
- Update task status directly from the table

### 📅 Upcoming Tasks
- Highlight tasks based on days left (warning/danger styling)
- Pagination and status updates

### 👤 Profile Section
- User details, role, join date
- Task stats badges (Pending, In Progress, Completed)

### ⚙️ Settings
- Change password with old-password verification
- Update profile (username/email)

---

## 🧰 Tech Stack

| Layer           | Technology                   |
|----------------|------------------------------|
| Frontend       | Angular 16+, TypeScript      |
| Styling        | Bootstrap 5, Custom CSS      |
| State Storage  | LocalStorage (JWT + User)    |
| Backend        | .NET Core Web API            |
| Auth           | JWT Token Authentication     |
| Icons          | Bootstrap Icons              |

---

## 🛠️ Development URLs (Local)

| Layer     | URL                        |
|-----------|----------------------------|
| Frontend  | [http://localhost:4200](http://localhost:4200) |
| Backend   | [http://localhost:5000](http://localhost:5000) |

> ℹ️ Make sure both frontend and backend servers are running locally to access the full functionality.

---

## 📸 UI Screenshots

### 🔐 Login Page
![Login](src/assets/screenshots/login.png)

### 🧑‍💼 User Dashboard
![User Dashboard](src/assets/screenshots/user-dashboard.png)

### 🧑‍💼 Admin Dashboard
![Admin Dashboard](src/assets/screenshots/Admin-dashboard.png)

### 🗂️ User Tasks
![User Tasks](src/assets/screenshots/user-Tasks.png)


---

## 📁 Folder Structure Overview

```text
SmartTaskManagementFrontend/
├── src/
│   ├── app/
│   ├── assets/
│   │   └── screenshots/
│   ├── environments/
│   └── index.html
├── angular.json
├── README.md
└── package.json

---

## Dhanshree Udapure  
Developer of Smart Task Management System  
[GitHub](https://github.com/dudapure) • [LinkedIn](https://www.linkedin.com/in/dhanshree-udapure/)

---
