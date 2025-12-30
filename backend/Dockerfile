# Base image
FROM node:20-alpine AS build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

# Set node environment
ENV NODE_ENV=production

# Create app directory
WORKDIR /usr/src/app

# Only copy necessary files from build stage
COPY --from=build /usr/src/app/package*.json ./
RUN npm install --omit=dev

COPY --from=build /usr/src/app/dist ./dist

# Expose the API port
EXPOSE 3000

# Run the app
CMD ["node", "dist/main"]
