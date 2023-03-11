# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3001
EXPOSE 3001

# Set the environment variables for MongoDB connection
ENV MONGO_URI mongodb+srv://admin:vetDB2022SPE@vetdb.qbxlez2.mongodb.net/vetDB?retryWrites=true&w=majority
ENV NODE_ENV production

# Start the application
CMD ["npm", "start"]
