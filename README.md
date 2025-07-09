# Hospital Management System

## Running with Docker

This project contains both a Java Spring Boot backend and a static HTML/JS/CSS UI. You can run both together using Docker with the provided Dockerfile at the root of the project.

### Prerequisites
- [Docker](https://www.docker.com/get-started) installed on your system.

### Build the Docker Image

Open a terminal in the root directory of the project and run:

```sh
docker build -t hospital-management-system .
```

### Run the Docker Container

After building the image, start the container with:

```sh
docker run -p 8080:8080 -p 8081:8081 hospital-management-system
```

- The **backend** (Spring Boot) will be available at: [http://localhost:8080](http://localhost:8080)
- The **UI** (static files) will be available at: [http://localhost:8081](http://localhost:8081)

### Notes
- The backend and UI are served from the same container for simplicity. In production, it is recommended to use separate containers for each service.
- The backend is built from the `HospitalManagementSystembackend` directory.
- The UI is served from the `Hospital Management System ui` directory using a simple static server (`http-server`).

---

If you have any issues or need further customization, please ask! 