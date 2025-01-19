Run below command at root level of project folder



mvn clean package
docker build -t transaction-service . 
docker run -p 9097:8080 transaction-service