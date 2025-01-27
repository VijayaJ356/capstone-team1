Building the Docker Image:
    Ensure the Dockerfile is in the root of the app.
    Run the following command:
        docker build -t creditcard_manager_ui .
Running the Docker Container:
    Run the container:
    docker run -d -p 80:80 --restart=always -e REACT_APP_API_ENDPOINT=http://51.8.188.255:9095 --name ccm_ui creditcard_manager_ui     
Open a browser and navigate to http://51.8.188.255:80.

51.8.188.255 - Public IP of the Cloud VM Instance
http://creaditcardmanager-com.eastus2.cloudapp.azure.com/

