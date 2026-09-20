# 🔐 Authify: Full-Stack Authentication System

A full-stack authentication system built as a ready-to-use project to implement and compare authentication workflows using **Spring Boot** and **Node.js/Express**, with a single React frontend and shared MySQL database.

## ✨ Features

* 🔑 User Registration & Login
* 🎟️ JWT Authentication
* 📧 Email Verification with 6-digit OTP
* 🔄 Password Reset via Email OTP
* 🚪 Logout
* 🛡️ Protected Routes
* 👥 Role-Based Access Control — Admin & User
* 🔒 Password Hashing
* 📡 REST API Integration
* 📱 Responsive Authentication UI
* 🎨 Modern UI with Tailwind CSS & GSAP

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │      React App      │
                    │ Tailwind + GSAP     │
                    └──────────┬──────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
                    ▼                     ▼
          ┌─────────────────┐   ┌─────────────────┐
          │   Spring Boot   │   │  Node.js/Express│
          │ Spring Security │   │      JWT        │
          └────────┬────────┘   └────────┬────────┘
                   │                     │
                   └──────────┬──────────┘
                              ▼
                    ┌──────────────────┐
                    │   MySQL (Aiven)  │
                    └──────────────────┘
```

The frontend can interact with either backend implementation, while both use the same MySQL database.

## 🛠️ Tech Stack

### Frontend

* React
* Tailwind CSS
* GSAP
* REST API

### Backend — Spring Boot

* Java
* Spring Boot
* Spring Security
* JWT
* JavaMailSender
* MySQL

### Backend — Node.js

* Node.js
* Express.js
* JWT
* bcrypt.js
* Nodemailer
* cookie-parser
* MySQL

### Database

* MySQL
* Aiven

## 📁 Project Structure

```text
auth-system/
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── backend/
│   │
│   ├── spring-boot/
│   │   ├── src/
│   │   ├── pom.xml
│   │   └── ...
│   │
│   └── node-express/
│       ├── src/
│       ├── package.json
│       └── ...
│
├── .gitignore
└── README.md
```

## 🔐 Authentication Flow

```text
Register
   ↓
Create Account
   ↓
Send OTP to Email
   ↓
Verify Email
   ↓
Login
   ↓
Generate JWT
   ↓
Access Protected Routes
```

Password recovery:

```text
Forgot Password
      ↓
Enter Email
      ↓
Send OTP
      ↓
Verify OTP
      ↓
Set New Password
      ↓
Login
```

## 🎯 Purpose

This project is primarily built for **learning and practice**, with the same authentication requirements implemented using two different backend technologies:

* **Spring Boot + Spring Security**
* **Node.js + Express**

The goal is to understand authentication, authorization, JWTs, email verification, password recovery, API integration, and full-stack application architecture across both ecosystems.

## 🚀 Getting Started

Clone the repository:

```bash
git clone <your-repository-url>
cd auth-system
```

Then configure the environment variables for the frontend and both backend implementations.

### Environment variables

Typical configuration includes:

```env
DB_HOST=
DB_PORT=
DB_NAME=
DB_USERNAME=
DB_PASSWORD=

JWT_SECRET=

MAIL_HOST=
MAIL_PORT=
MAIL_USERNAME=
MAIL_PASSWORD=
```

Refer to the individual backend directories for setup instructions.

## 📌 Note

This project contains **two independent backend implementations** sharing the same database schema and frontend.

It is intended as a learning project rather than a production-ready authentication service.
