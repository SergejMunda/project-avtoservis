FROM node:8.6-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY . .
ENV NODE_ENV="production"
ENV JWT_PASS=password
EXPOSE 3000
CMD ["npm", "start"]