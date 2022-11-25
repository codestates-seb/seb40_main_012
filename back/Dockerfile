FROM adoptopenjdk/openjdk11
CMD ["./mvnw", "clean", "package"]
ARG JAR_FILE=build/libs/back-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} main-project.jar
ENTRYPOINT ["java", "-jar", "/main-project.jar"]