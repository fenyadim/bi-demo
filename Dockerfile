FROM node:20.3.1-alpine AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN corepack enable pnpm

RUN pnpm fetch

COPY . .

RUN pnpm install --offline --ignore-scripts

ENV DATABASE_URL="postgres://postgres:sasasa@79.174.86.132:5433/bi-demo"

RUN pnpm b prepare
RUN pnpm b build
RUN pnpm f build

FROM build AS production

WORKDIR /app

COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/pnpm-lock.yaml /app/pnpm-lock.yaml
COPY --from=build /app/pnpm-workspace.yaml /app/pnpm-workspace.yaml

COPY --from=build /app/frontend/package.json /app/frontend/package.json
COPY --from=build /app/backend/package.json /app/backend/package.json

COPY --from=build /app/frontend/dist /app/frontend/dist
COPY --from=build /app/backend/dist /app/backend/dist
COPY --from=build /app/backend/src/prisma /app/backend/src/prisma

RUN pnpm install --ignore-scripts --prod

RUN pnpm b pgc

CMD ["node", "backend/dist/index"]