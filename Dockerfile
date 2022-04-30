from node

workdir /usr/app

copy package.json ./

run npm install

copy . .

expose 3333

cmd ["npm","run","dev"]