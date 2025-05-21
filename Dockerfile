# Step 1, based on Node.js to build and compile the Angular application.
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
# Step 2, based on Nginx to have only the compiled content to serve with Nginx.
FROM nginx:1.27-alpine
COPY --from=build /app/dist/ouaf-front/browser/ /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
