# Hospital Management System

## Overview
A full-stack Hospital Management System with a modern UI (HTML/CSS/JS) and a robust Spring Boot backend using MySQL.

---

## 🚀 Quick Start with Docker Compose

### 1. Prerequisites
- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/) installed

### 2. Clone the Repository
```sh
git clone <your-repo-url>
cd Hospital-Management-System
```

### 3. Build and Run All Services
```sh
docker-compose up --build
```

### 4. Access the Application
- **Frontend:** http://localhost
- **Backend API:** http://localhost:8080
- **MySQL:** localhost:3306 (user: `root`, pass: `root`, db: `HMS`)

---

## 🐳 Dockerfile Structure

### Backend (Spring Boot)
- Located at project root (`Dockerfile`)
- Uses OpenJDK 17
- Builds and runs the Spring Boot JAR

### Frontend (UI)
- Add a `Dockerfile` in `Hospital Management System ui/`:
  ```Dockerfile
  FROM nginx:alpine
  COPY . /usr/share/nginx/html
  EXPOSE 80
  ```

---

## 🛠️ Environment Variables
- `SPRING_DATASOURCE_URL` (default: `jdbc:mysql://db:3306/HMS`)
- `SPRING_DATASOURCE_USERNAME` (default: `root`)
- `SPRING_DATASOURCE_PASSWORD` (default: `root`)

---

## 📝 Notes
- The backend waits for MySQL to be ready before starting.
- Update API URLs in frontend JS if deploying to a different host/port.
- For production, change all default passwords and secrets.

---

## 📂 Project Structure
- `HospitalManagementSystembackend/` - Spring Boot backend
- `Hospital Management System ui/` - Frontend (HTML/CSS/JS)
- `docker-compose.yml` - Multi-service orchestration
- `Dockerfile` - Backend Docker build

---

## 📣 Need Help?
Open an issue or contact the maintainer. 


