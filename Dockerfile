FROM node:20-alpine

WORKDIR /app

# Install pnpm globally in the docker image
RUN npm install -g pnpm@9.6.0

# Copy package.json and pnpm-lock.yaml files to the working directory
COPY package.json pnpm-lock.yaml ./

# Install project dependencies
RUN pnpm install

COPY prisma ./prisma
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Define the command to run the app
CMD ["pnpm", "start"]
