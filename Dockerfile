FROM node:12-alpine

WORKDIR /example-implementation
COPY . ./
COPY package.json package-lock.json tsconfig.json ./
RUN npm install

CMD ["npm", "start"]
EXPOSE 3000