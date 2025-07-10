# Dockerfile for Spring Boot Backend
FROM openjdk:17-jdk-alpine AS backend
WORKDIR /app
COPY HospitalManagementSystembackend /app/HospitalManagementSystembackend
WORKDIR /app/HospitalManagementSystembackend
RUN ./mvnw clean package -DskipTests || mvn clean package -DskipTests

# Use a lightweight image to run the jar
FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY --from=backend /app/HospitalManagementSystembackend/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

# ---
# To build the frontend, use a separate Dockerfile in the UI folder:
# FROM nginx:alpine
# COPY . /usr/share/nginx/html
# EXPOSE 80
