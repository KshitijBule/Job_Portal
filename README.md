# HireMe – Job Portal Web Application

## Overview

HireMe is a full-stack Job Portal web application designed to connect job seekers with recruiters through a modern and responsive platform. The project focuses on providing an efficient hiring experience with secure authentication, job management, application tracking, and recruiter dashboards.

The backend is built using Java Spring Boot following a layered architecture with Controllers, Services, Repositories, DTOs, and Entity classes. The frontend is designed using modern web technologies and Tailwind CSS for responsive UI development.

---

# Features

## User Features

* User Registration & Login
* Secure Authentication
* Profile Management
* Upload Resume
* Browse Available Jobs
* Search & Filter Jobs
* Apply for Jobs
* View Applied Jobs

## Recruiter Features

* Recruiter Registration & Login
* Post New Jobs
* Update/Delete Jobs
* View Applicants
* Manage Hiring Process

## Admin Features

* Manage Users
* Manage Recruiters
* Monitor Job Listings

---

# Tech Stack

## Frontend

* React.js
* Tailwind CSS
* JavaScript
* HTML5
* CSS3

## Backend

* Java
* Spring Boot
* Spring Data MongoDB
* Spring Web
* REST APIs
* Maven

## Database

* MongoDB Atlas

## Tools & Platforms

* Git & GitHub
* Postman
* IntelliJ IDEA / VS Code
* MongoDB Compass

---

# Project Architecture

The backend follows a traditional layered architecture:

```text
Controller Layer
       ↓
Service Layer
       ↓
Repository Layer
       ↓
MongoDB Database
```

### Main Components

* Controllers → Handle API requests
* Services → Business logic
* Repositories → Database operations
* DTOs → Data transfer between layers
* Entities → MongoDB document models

---

# Folder Structure

```text
HireMe/
│
├── backend/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── dto/
│   ├── entity/
│   └── config/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── assets/
│   └── styles/
│
└── README.md
```

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/your-username/HireMe.git
cd HireMe
```

---


## Authentication APIs

* POST `/api/auth/register`
* POST `/api/auth/login`

## Job APIs

* GET `/api/jobs`
* POST `/api/jobs`
* PUT `/api/jobs/{id}`
* DELETE `/api/jobs/{id}`

## Application APIs

* POST `/api/apply`
* GET `/api/applications`

---

# Database

The application uses MongoDB Atlas cloud database for storing:

* User Data
* Recruiter Data
* Job Listings
* Applications
* Authentication Details

---

# Future Enhancements

* JWT Authentication
* Role-Based Authorization
* AI Resume Screening
* Email Notifications
* Real-Time Chat
* Admin Analytics Dashboard
* Interview Scheduling
* Resume Parsing

---

# Learning Outcomes

Through this project, the following concepts were implemented and learned:

* REST API Development
* Spring Boot Architecture
* MongoDB Integration
* Layered Backend Design
* Frontend-Backend Integration
* Responsive UI Design
* CRUD Operations
* Authentication & Authorization
* Deployment Workflow

---

# Author

## Kshitij Bule

B.Tech CSE Student – Ramdeobaba University, Nagpur
Programming Enthusiast | Full Stack Developer | Competitive Programmer

---

# License

This project is developed for educational and learning purposes.
