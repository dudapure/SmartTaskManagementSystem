# 📦 Smart Task Management System - Backend (.NET Core Web API)

This is the **backend API** for the Smart Task Management System. It is built using **.NET Core Web API** and provides secure, RESTful endpoints to support user and admin functionality, JWT-based authentication, task & category management, and role-based access.

---

## 🌐 API Base URL (Local)

```
http://localhost:5000/
```

✅ You should see:  
**`Welcome to the API!`**

---

## 🧰 Tech Stack

| Layer         | Technology             |
|---------------|------------------------|
| Language      | C#, .NET Core          |
| Framework     | ASP.NET Core Web API   |
| ORM           | Entity Framework Core  |
| Auth          | JWT Bearer Tokens      |
| Database      | SQL Server / SQLite    |
| Docs          | Swagger UI             |

---

## 🔑 Features & Modules

### 🔐 Authentication & Roles
- Secure JWT-based authentication
- Admin & User roles
- Role-based access via authorization policies

### 👤 User Management
- Register, Login, Change Password
- Get logged-in user profile
- Admin: View all users, deactivate users, check their task stats

### ✅ Task Management
- CRUD operations on tasks
- Assign tasks to users
- Filter by priority, due date, status, category
- Track task progress

### 🗂️ Category Management (Admin only)
- Admin can create/update/delete predefined task categories
- Users cannot modify categories

---

## 📁 Project Structure

```
SmartTaskManagementApi/
├── Controllers/
│   ├── AuthController.cs
│   ├── UsersController.cs
│   ├── TasksController.cs
│   └── CategoriesController.cs
├── DTOs/
├── Interfaces/
├── Models/
├── Services/
├── Middleware/
├── Program.cs
├── appsettings.json
├── SmartTaskManagementApi.csproj
└── README.md
```

---

## 🧪 How to Run the Backend

### 1️⃣ Prerequisites
- [.NET SDK 8+](https://dotnet.microsoft.com/download)
- SQL Server or SQLite (optional for dev)

### 2️⃣ Run the API

```bash
dotnet restore
dotnet run
```

> You should see output like:  
> `Now listening on: http://localhost:5000`

### 3️⃣ Swagger API Docs

Open in browser:

```
http://localhost:5000/swagger
```

✅ Test login, register, and task APIs directly from Swagger.

---

## 🔗 Connect with Angular Frontend

In Angular `environment.ts`, set:

```ts
apiUrl: 'http://localhost:5000/api'
```

Make sure both frontend (`ng serve`) and backend (`dotnet run`) are running simultaneously.

---

## 🔒 Demo Admin Login (Same as Frontend)

- **Email:** `admin@example.com`  
- **Password:** `11112222`

---

## 🙌 Author

**Dhanshree Udapure**  
Developer of Smart Task Management System  
[GitHub](https://github.com/dudapure) • [LinkedIn](https://www.linkedin.com/in/dhanshree-udapure/)

---
