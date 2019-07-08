# build environment
FROM node:12
WORKDIR /usr/plarum/admin
COPY package*.json ./
RUN npm install --silent
COPY . .
RUN npm run build

# production environment
FROM nginx:latest
COPY --from=0 /usr/plarum/admin/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=0 /usr/plarum/admin/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
