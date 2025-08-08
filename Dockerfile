FROM node:20.3.1-alpine AS build

RUN apk add --no-cache openssl libc6-compat python3 make g++ git

RUN corepack enable && corepack prepare pnpm@9.1.0 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

ENV DATABASE_URL="postgresql://root:sasasa@45.9.40.200:5432/bi-db"
ENV CI=true

RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm ci --ignore-scripts

COPY . .

RUN pnpm --filter backend exec prisma generate
RUN pnpm b prepare
RUN pnpm b build
RUN pnpm f build

FROM build AS production

WORKDIR /app

RUN apk add --no-cache openssl libc6-compat

COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/pnpm-lock.yaml /app/pnpm-lock.yaml
COPY --from=build /app/pnpm-workspace.yaml /app/pnpm-workspace.yaml

COPY --from=build /app/frontend/package.json /app/frontend/package.json
COPY --from=build /app/backend/package.json /app/backend/package.json

COPY --from=build /app/frontend/dist /app/frontend/dist
COPY --from=build /app/backend/dist /app/backend/dist
COPY --from=build /app/backend/src/prisma /app/backend/src/prisma

RUN corepack enable && corepack prepare pnpm@9.1.0 --activate
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --prod --ignore-scripts

RUN pnpm b pgc

ENV NODE_ENV=production
ENV DATABASE_URL="postgresql://root:sasasa@45.9.40.200:5432/bi-db"

CMD ["node", "backend/dist/index"]
