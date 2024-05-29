FROM node:lts-alpine

WORKDIR /app

# Install pnpm globally in the docker image
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml files to the working directory
COPY package.json pnpm-lock.yaml ./

# Install project dependencies
RUN pnpm install --frozen-lockfile

COPY . .

# Generate Prisma client
RUN npx prisma generate

# Define the command to run the app
CMD ["pnpm", "start"]
