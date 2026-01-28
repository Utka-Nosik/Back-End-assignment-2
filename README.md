# 🐾 Petit Friend - Pet Shop API

A full-stack web application for a Pet Shop built with **Node.js, Express, and MongoDB**. 
The project implements a **secure MVC architecture** with Role-Based Access Control (RBAC).

## 🚀 Features

### 1. MVC Architecture
The project is refactored from a single-file structure into a professional modular pattern:
- **Models:** Mongoose schemas (`User`, `Item`, `Category`).
- **Views:** Frontend pages (`index.html`, `shop.html`, `admin.html`, etc.).
- **Controllers:** Business logic separated from routing.
- **Routes:** API endpoints definitions.
- **Middleware:** JWT Authentication and Admin Authorization.

### 2. Two Related Objects (CRUD)
The system manages two core connected entities:
- **Primary Object: Items** (Products like Dog Food, Toys).
- **Secondary Object: Categories** (Dogs, Cats, Birds).
*Each item belongs to a specific category.*

### 3. Security & RBAC
- **Authentication:** Users receive a **JWT (JSON Web Token)** upon login.
- **Password Hashing:** Passwords are hashed using **bcryptjs** before storage.
- **Authorization:**
  - **Public:** Everyone can view products (GET requests).
  - **User:** Can manage their profile.
  - **Admin:** Can CREATE, UPDATE, and DELETE products/categories via the **Admin Panel**.

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Frontend:** HTML5, Bootstrap 5, jQuery
- **Security:** JWT, Bcryptjs, Dotenv

---

## ⚙️ Installation & Setup

### 1. Clone the repository
~~~bash
git clone <your-repo-link>
cd <folder-name>
~~~

### 2. Install dependencies
~~~bash
npm install
~~~

### 3. Setup Environment Variables
Create a `.env` file in the root directory and add:
~~~env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
PORT=3000
WEATHER_API_KEY=your_openweather_key
~~~

### 4. Run the server
~~~bash
node app.js
# or
nodemon app.js
~~~

### 5. Open in Browser
Go to `http://localhost:3000`

---

## 🔑 User Roles & Testing

You can register a new user via the Profile page or use Postman.

### 1. Regular User
- Can browse the catalog.
- Can register/login.
- Can edit personal profile info.
- **Cannot** access the Admin Panel.

### 2. Admin User
- Has full access to the Admin Dashboard (`/admin.html`).
- Can Add/Edit/Delete Categories.
- Can Add/Edit/Delete Products.

> **How to create an Admin?**  
> Register a user via Postman with `"role": "admin"` in the JSON body, or manually change the role in MongoDB Atlas.

---

## 📂 Project Structure

~~~text
/project-root
  ├── /controllers     # Logic for Auth, Items, Categories
  ├── /middleware      # Auth & Role verification checks
  ├── /models          # Database Schemas
  ├── /routes          # API Endpoints
  ├── /assets          # CSS, Images, Frontend JS
  ├── app.js           # Main server entry point
  └── *.html           # Frontend Views
~~~

---

## 📝 API Endpoints

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Register new user | Public |
| **POST** | `/api/auth/login` | Login & get Token | Public |
| **GET** | `/api/v2/items` | Get all products | Public |
| **POST** | `/api/v2/items` | Add new product | **Admin** |
| **PUT** | `/api/v2/items/:id` | Update product | **Admin** |
| **DELETE** | `/api/v2/items/:id` | Delete product | **Admin** |