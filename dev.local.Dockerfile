# Use Node.js version 18 Alpine for a smaller image size
FROM node:18-alpine

# Set the working directory in the Docker image
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml to the Docker image
COPY package.json pnpm-lock.yaml ./

# Copy the rest of your project into the Docker image
COPY . .

RUN rm -rf node_modules

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Generate Prisma client
RUN pnpx prisma generate

# Expose the port your app runs on
EXPOSE 3000

# Define the command to start your app
CMD ["pnpm", "dev"]