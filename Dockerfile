# Build stage
FROM node:20-alpine AS build

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .

# Pass VITE_API_BASE_URL during build
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build

# Production stage - Nginx
FROM nginx:stable-alpine

# Copy built assets to nginx
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Create a custom nginx configuration template
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Use a script to replace the port at runtime and then start Nginx
CMD ["/bin/sh", "-c", "sed -i \"s/listen 80;/listen ${PORT:-80};/\" /etc/nginx/conf.d/default.conf && nginx -g \"daemon off;\""]
