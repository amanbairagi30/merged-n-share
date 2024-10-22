FROM node:20.12.0-alpine3.19

WORKDIR /src/app

COPY ..

ENV DATABASE_URL = ${DATABASE_URL}

# Install dependencies
RUN npm install
# Can you add a script to the global package.json that does this?
RUN npx prisma generate

# Can you filter the build down to just one app?
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]