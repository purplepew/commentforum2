# Use Node.js 22 Alpine image as the build stage, named 'builder'
FROM node:22-alpine AS builder         
# Set working directory inside the container to /app
WORKDIR /app                          

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./                 
# Install dependencies using npm ci for clean, reproducible builds
RUN npm ci                            

# Copy all project files into the container
COPY . .                              
# Build the application (usually compiles frontend assets)
RUN npm run build                     

# Start a new stage from the same Node.js image, named 'runner'
FROM node:22-alpine AS runner         
# Set working directory for the runtime container
WORKDIR /app                          

# Copy built app and dependencies from the builder stage
COPY --from=builder /app ./           

# Expose port 3000 for the application
EXPOSE 3000                           
# Start the application
CMD ["npm", "start"]                  