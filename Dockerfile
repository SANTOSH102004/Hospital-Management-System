# Use an official OpenJDK image for backend
FROM openjdk:17-jdk-slim as backend-build

# Set workdir for backend
WORKDIR /app/backend

# Copy backend source
COPY HospitalManagementSystembackend /app/backend

# Build the backend (skip tests for speed)
RUN ./mvnw clean package -DskipTests || mvn clean package -DskipTests

# Use a node image to build the UI static server
FROM node:18-slim as ui-build

# Set workdir for UI
WORKDIR /app/ui

# Copy UI source
COPY "Hospital Management System ui"/ /app/ui/

# Install http-server to serve static files
RUN npm install -g http-server

# Final image
FROM openjdk:17-jdk-slim

# Create app directories
WORKDIR /app

# Copy backend jar
COPY --from=backend-build /app/backend/target/*.jar /app/backend/app.jar

# Copy UI files
COPY --from=ui-build /app/ui /app/ui

# Copy http-server from node image
COPY --from=ui-build /usr/local/bin/http-server /usr/local/bin/http-server
COPY --from=ui-build /usr/local/lib/node_modules /usr/local/lib/node_modules

# Add startup script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Expose ports (8080 for backend, 8081 for UI)
EXPOSE 8080 8081

CMD ["/app/start.sh"] 