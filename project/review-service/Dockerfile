# This line defines which node.js Docker image to leverage
# Available versions are described at https://hub.docker.com/_/node/
FROM node:10-alpine
 
# Denotes to copy all files in the project to 'app' folder in the container
COPY . /app
 
# Sets the default working directory to /app which is where we've copied the project files to.
WORKDIR /app
 
# Install service dependencies relevant for production builds skipping all development dependencies.
RUN npm install --production --no-optional
# Starts the service
CMD ["node", "."]