FROM node:18

RUN npm i -g pnpm

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY prisma/schema.prisma ./prisma/
RUN npx prisma generate

COPY . .

EXPOSE 4000
CMD [ "pnpm", "dev" ]