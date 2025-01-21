FROM node:18

WORKDIR /usr/src/app

COPY package.json ./
RUN yarn install

# Add Parcel globally for development
RUN yarn global add parcel-bundler

COPY . .

EXPOSE 5000
CMD ["yarn", "start"]