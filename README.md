# Full-Stack Registration & Login Application

A full-stack web application that provides user registration, secure login, JWT-based authentication, and a protected user dashboard. Built using React, Java Spring Boot, and PostgreSQL.

## 🚀 Features

- **User Registration** — Create an account with first name, last name, email, and password.
- **Secure Password Storage** — Hash passwords using BCrypt before saving them to the database.
- **User Login** — Authenticate users using their registered email and password.
- **JWT Authentication** — Generate signed JSON Web Tokens after successful login.
- **Protected API Endpoints** — Restrict access to authenticated users using Spring Security.
- **User Dashboard** — Display the authenticated user's email after successful token validation.
- **Logout** — Remove the current session's stored authentication token.
- **Input Validation** — Validate registration fields and return meaningful error responses.
- **Duplicate Email Handling** — Prevent registration using an already registered email.

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React, JavaScript, Vite, HTML, CSS |
| Backend | Java 21, Spring Boot |
| Security | Spring Security, JWT, BCrypt |
| Database | PostgreSQL |
| Build Tool | Maven |
| Version Control | Git and GitHub |

## 📁 Project Structure

```text
registration-login-app/
├── backend/
│   ├── src/main/java/com/example/backend/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── exception/
│   │   ├── model/
│   │   ├── repository/
│   │   └── service/
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── pom.xml
│   └── mvnw
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── Dashboard.jsx
│   │   └── Dashboard.css
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## ⚙️ Prerequisites

Install the following before running the application:

- Java Development Kit (JDK) 21
- Node.js and npm
- PostgreSQL
- Git

## 💻 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/NiharikaKollikonda/registration-login-app.git
cd registration-login-app
```

### 2. Configure PostgreSQL

Create a database named `registration_app`:

```sql
CREATE DATABASE registration_app;
```

Configure your PostgreSQL username and password in `backend/src/main/resources/application.properties`.

The application uses Spring Data JPA to interact with PostgreSQL. Ensure the configured database user has the required permissions.

### 3. Configure environment variables

The backend expects a JWT signing secret through the `JWT_SECRET` environment variable.

Generate a Base64-encoded secret:

```bash
openssl rand -base64 32
```

Create a `backend/.env` file containing:

```env
JWT_SECRET=YOUR_GENERATED_SECRET
```

Replace `YOUR_GENERATED_SECRET` with the generated value.

**Important:** Spring Boot does not automatically load `.env` files. Load the variable into your terminal environment before starting the backend. Never commit `.env` or expose the signing secret.

### 4. Start the backend

Open a terminal and run:

```bash
cd backend
set -a
source .env
set +a
./mvnw spring-boot:run
```

The backend runs at:

`http://localhost:8080`

### 5. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually:

`http://localhost:5173`

## 🔐 API Endpoints

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | Not required |
| POST | `/api/auth/login` | Authenticate a user and receive a JWT | Not required |
| GET | `/api/user/me` | Retrieve the authenticated user's email | JWT required |

### Example registration request

```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  "password": "Example123"
}
```

### Example login request

```json
{
  "email": "jane@example.com",
  "password": "Example123"
}
```

A successful login returns the user's public information and a JWT token.

### Accessing a protected endpoint

Include the token in the authorization header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

Requests without a valid token are rejected by Spring Security.

## 🧪 Testing

You can test the application by following these steps:

1. Open the frontend in your browser.
2. Register a new user.
3. Log in using the registered credentials.
4. Confirm that the protected dashboard displays the authenticated user's email.
5. Sign out and verify that you return to the login page.
6. Test `/api/user/me` without a token and confirm that the request is rejected.

## 🔒 Security Considerations

- Passwords are stored as BCrypt hashes, not plaintext.
- JWT signing secrets must be kept outside source control.
- Protected endpoints require valid JWT authentication.
- Registration and login requests are validated by the backend.
- Authentication tokens are stored in browser `sessionStorage` in this implementation.

For a production deployment, consider using secure, HttpOnly cookies or another carefully designed token-storage strategy, HTTPS, rate limiting, stricter validation, and managed secrets.

## 🌱 Future Improvements

- Password reset and email verification
- Automated backend and frontend tests
- Role-based authorization
- Improved token expiration and refresh handling
- Production deployment with HTTPS
- CI/CD pipeline integration

## 👩‍💻 Author

**Niharika Kollikonda**

GitHub: [NiharikaKollikonda](https://github.com/NiharikaKollikonda)

---

If you find this project useful, feel free to explore the code and suggest improvements.