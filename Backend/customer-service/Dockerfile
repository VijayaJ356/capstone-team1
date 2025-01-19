# Use an OpenJDK base image
FROM openjdk:17-jdk-slim

# Add a volume for logs (optional)
VOLUME /tmp

# Copy the JAR file into the container
COPY target/customer-service-0.0.1-SNAPSHOT.jar app.jar

# Expose the port (adjust to match your application settings)
EXPOSE 9095

RUN apt-get update && apt-get install -y curl


# Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]
