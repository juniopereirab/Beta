FROM node:18.18-alpine

WORKDIR /frontend

COPY package*.json ./
COPY tsconfig.json ./
#Copy the source code to work directory
COPY . /frontend

#Installing the dependencies inside the Docker
RUN npm install --silent

EXPOSE 3000