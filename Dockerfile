# Builder -------------------------------------------------------------
FROM node:18-alpine as builder

WORKDIR /app

# First install the dependencies (as they change less often)
COPY . .
RUN yarn install

# Build the project
RUN yarn build

# Runner --------------------------------------------------------------
FROM nginx as runner

# Copy build files
COPY --from=builder /app/dist /app

# Copy nginx config
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Replace .env variables (done in entrypoing)
COPY ./docker-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
