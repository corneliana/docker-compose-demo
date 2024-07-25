# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Bundle the app source inside the Docker container
COPY . .

# Install any needed packages specified in package.json
RUN npm install

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Define environment variable (adjust as necessary)
ENV NODE_ENV=production

# Run the app when the container launches
CMD ["node", "src/index.js"]
