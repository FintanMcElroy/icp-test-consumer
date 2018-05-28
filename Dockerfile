FROM node:6
 
COPY app.js app.js
COPY package.json package.json

RUN npm install

RUN npm start