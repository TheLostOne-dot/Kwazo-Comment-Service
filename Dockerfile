FROM node:16.14.0
WORKDIR /Kwazo-Comment-Service
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD node index.js