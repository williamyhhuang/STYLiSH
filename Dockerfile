FROM node:10.15.3

WORKDIR /stylish
ADD package.json /stylish/
RUN npm i && npm cache clean --force
RUN npm i pm2 -g
RUN pm2 update
COPY . /stylish
EXPOSE 3001
CMD ["pm2-runtime", "process.yaml"]