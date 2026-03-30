# Build stage
FROM node:14.21.3

USER node

WORKDIR /var/www/install

RUN chown node:node /var/www/install

COPY --chown=node:node package.json  .
COPY --chown=node:node package-lock.json .
COPY --chown=node:node entrypoint.sh .
COPY --chown=node:node babel.config.js .
COPY --chown=node:node public/ .
COPY --chown=node:node src/ .
RUN chmod +x entrypoint.sh

RUN npm install --prefer-offline --no-audit --progress=false

WORKDIR /var/www/app
RUN chown node:node /var/www/app

EXPOSE 8080

CMD ["sh", "-c", "/var/www/install/entrypoint.sh"]