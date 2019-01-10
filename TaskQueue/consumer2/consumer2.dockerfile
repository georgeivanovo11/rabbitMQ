FROM node:latest
LABEL author="GeorgeM"

COPY . /app
WORKDIR /app
RUN npm install
ENTRYPOINT npm start