FROM node:25

WORKDIR /usr/src/app

COPY . .

RUN npm install 

EXPOSE 3000

CMD ["npm", "run", "start:dev"]


