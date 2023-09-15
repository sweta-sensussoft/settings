FROM amitmpatel27/statitt.baseimage
WORKDIR /app
#RUN npm install -g npm@9.8.1

COPY package.json .
RUN npm install
COPY . .

RUN npm run build

CMD ["npm","start"]