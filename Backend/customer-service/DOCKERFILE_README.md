Go to root level of the project folder and run below

mvn clean package 
docker build -t customer-service . 
docker run -p 9095:8080 customer-service