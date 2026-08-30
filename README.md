# College Placement Management System (PMS)

A full-stack web application designed to **centralize and streamline campus placement activities within an institution**. The system connects students, recruiters, placement administrators, and super administrators through a secure, role-based platform.

It manages the placement lifecycle from student and recruiter management to placement drives, eligibility verification, applications, shortlisting, notifications, and placement reporting.

The system is designed with a **modular and scalable architecture**, allowing the platform to be extended with additional placement features and broader institutional deployment in the future.

## Features

* JWT-based authentication and role-based access control
* Student profile and resume management
* Company and recruiter management
* Placement drive creation and management
* Automated eligibility verification
* Online applications and application tracking
* Candidate shortlisting and recruitment status updates
* Recruitment activity and interview scheduling
* Placement-related notifications
* Placement reports and analytics
* Audit logging for important administrative activities

## User Roles

| Role                | Key Responsibilities                                                                                                                                  |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Super Admin**     | Manage Placement Admin, system settings, and audit logs                                                                                      |
| **Placement Admin** | Manage students, recruiters, companies, monitor placement activities, and generate reports                                                            |
| **Recruiter**       | Manage company placement drives and recruitment activities, define eligibility criteria for drives, review applicants, shortlist candidates, update recruitment status, and publish results |
| **Student**         | Maintain profile, upload resume, view drives and eligibility status, apply to drives, and track applications                                          |


### Placement Drive Ownership

Placement drives are associated with the recruiter's company. Recruiters can create and manage their company's drives, while Placement Admins can monitor placement activities across the system.


## Placement Workflow

```text
Placement Admin
      │
      ├── Manage Students
      ├── Manage Recruiters
      └── Manage Companies
                │
                ▼
             Recruiter
                │
                ├── Create Placement Drive
                ├── Define Eligibility Criteria
                ├── Manage Recruitment Activities
                └── Publish / Close Drive
                         │
                         ▼
                      Student
                         │
                         ├── View Eligible Drives
                         └── Apply
                               │
                               ▼
                           Recruiter
                               │
                               ├── Review Applications
                               ├── Shortlist Candidates
                               ├── Update Recruitment Status
                               └── Publish Results
```

## Technology Stack

### Frontend

* React
* React Router
* Axios
* Tailwind CSS

### Backend

* Java 21
* Spring Boot 3
* Spring Data JPA / Hibernate
* Spring Security
* JWT
* Maven

### Database

* MySQL
* MySQL Workbench

### Development & Testing Tools

* IntelliJ IDEA Ultimate
* Visual Studio Code
* Postman
* Git

## Architecture

The application follows a **three-tier layered architecture**:

```text
┌──────────────────────────────┐
│       Presentation Layer     │
│     React + Tailwind CSS     │
└──────────────┬───────────────┘
               │ REST APIs
┌──────────────▼───────────────┐
│       Application Layer      │
│ Spring Boot + Spring Security│
│      Business Logic + JWT    │
└──────────────┬───────────────┘
               │ JPA / Hibernate
┌──────────────▼───────────────┐
│          Data Layer          │
│            MySQL             │
└──────────────────────────────┘
```

The backend is organized using a **Controller → Service → Repository → Database** structure, with separate security, entity, exception-handling, and utility components.

## Database

The database uses MySQL with a normalized relational schema and JPA/Hibernate for object-relational mapping.

Major entities include:

* Users
* Students
* Recruiters
* Companies
* Placement Drives
* Eligibility Criteria
* Recruitment Activities
* Applications
* Resumes
* Notifications
* Password Reset Tokens
* Audit Logs

Key relationships include:

```text
User ─────────────── Student
User ─────────────── Recruiter
Company ──────────── Recruiters
Company ──────────── Placement Drives
Placement Drive ──── Eligibility Criteria
Placement Drive ──── Recruitment Activities
Student ──────────── Applications
Placement Drive ──── Applications
Student ──────────── Resume
User ─────────────── Notifications
User ─────────────── Audit Logs
```

The schema uses primary keys, foreign keys, unique constraints, and normalized relationships to maintain data integrity and reduce redundancy.

## Project Structure

```text
placement-management-system/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── ...
│   │       └── resources/
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── ...
│   └── package.json
│
└── README.md
```

## How to Run

### Prerequisites

Make sure the following are installed:

* Java 21
* Maven
* Node.js and npm
* MySQL
* Git

### 1. Clone the Repository

```bash
git clone <repository-url>
cd placement-management-system
```

### 2. Configure MySQL

Create a MySQL database for the application.

The backend configuration uses environment variables for database connectivity. Configure the required database properties in your local environment or backend configuration.

Example:

```env
DB_URL=jdbc:mysql://localhost:3306/pms_db?createDatabaseIfNotExist=true
DB_NAME=pms_db
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
```

> Do not commit passwords, JWT secrets, or other sensitive credentials to the repository.

### 3. Run the Backend

Navigate to the backend directory:

```bash
cd backend
```

Build and run the Spring Boot application:

```bash
mvn clean install
mvn spring-boot:run
```

### 4. Run the Frontend

Open another terminal and navigate to the frontend:

```bash
cd frontend
npm install
npm run dev
```

The frontend will start using the development server configured by the project.

## Authentication & Security

The application uses **JWT-based stateless authentication** with Spring Security.

The authentication flow is:

```text
User Login
    ↓
Credential Verification
    ↓
JWT Token Generation
    ↓
Token Sent with Subsequent Requests
    ↓
JWT Validation
    ↓
Role-Based Authorization
    ↓
Protected Resource
```

Passwords are securely stored using BCrypt hashing, while protected APIs require valid authentication and appropriate role permissions.

## API Documentation

The backend exposes RESTful APIs for communication between the React frontend and Spring Boot backend.

API testing and development can be performed using **Postman**. The project also includes **Swagger/OpenAPI** support.

## Development

The project follows these architectural principles:

* Layered backend architecture
* RESTful API design
* DTO-based API communication
* Centralized exception handling
* Backend validation
* JWT authentication
* Role-Based Access Control (RBAC)
* Normalized relational database design
* Modular and maintainable components

## Future Enhancements

Potential future improvements include:

* Multi-institution support
* AI-based resume analysis and job recommendations
* Automated calendar-based interview scheduling
* Advanced placement analytics
* Mobile application
* Integration with institutional ERP/SIS systems
* Cloud deployment
* Enhanced email/SMS notifications

## Team

Developed as a team project as part of the **PG Certificate Programme in Advanced Computing (PGCP-AC), C-DAC Bangalore**.


## License

This project was developed for academic/project purposes.
