# Step 1: Use the official Node.js image to build the Vite React app
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all source files and build the project
COPY . .
RUN npm run build

# Step 2: Use an Nginx image to serve the built app
FROM nginx:1.23

# Copy the build output from the previous step to the Nginx server's directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port Nginx will run on
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]

# # Step 2: Create a simple Node.js server to serve the build output
# FROM node:18

# WORKDIR /app

# # Copy the build output from the previous step to the current container
# COPY --from=build /app/dist /app/dist

# # Install a simple static file server (like serve)
# RUN npm install -g serve

# # Expose the port the app will run on
# EXPOSE 80

# # Start the server with the built app
# CMD ["serve", "-s", "dist", "-l", "80"]

# export http_proxy="" && export https_proxy="" && docker build -t creditcard_manager_ui .
# docker run -d -p 80:80 --name ccm_ui creditcard_manager_ui


