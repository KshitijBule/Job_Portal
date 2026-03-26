# ── Build Stage ──────────────────────────────────────────────
FROM maven:3.9.6-openjdk-21 AS build

WORKDIR /app

# Cache dependencies before copying source code
COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests

# ── Run Stage
FROM eclipse-temurin:21-jdk-jammy

WORKDIR /app

# Create a non-root user for security
RUN addgroup --system spring && adduser --system --ingroup spring spring
USER spring:spring

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]