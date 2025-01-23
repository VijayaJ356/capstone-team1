To Dockerise the customer service
	Go to root level of the project folder and run below

		mvn clean package 
		docker build -t customer-service . 
		docker run -p 9095:8080 customer-service

To Push to Docker hub
		docker login
		docker build -t nitinchandrasp/customer-service:v1 .

		 # To push to docker hub
		docker push nitinchandrasp/customer-service:v1

		# To pull from docker hub to test



