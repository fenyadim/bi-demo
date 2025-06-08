FROM node:20.3.1-alpine AS base

WORKDIR /app

RUN corepack enable pnpm

COPY pnpm-lock.yaml pnpm-workspace.yaml ./

FROM base AS build

COPY . .
RUN pnpm install --ignore-scripts

RUN pnpm b prepare
RUN pnpm b build
RUN pnpm f build

FROM base AS production

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

ENV VITE_BACKEND_URL=http://a0808s8swwwkkg4s0404w044.79.174.86.132.sslip.io/trpc

CMD ["node", "backend/dist/index"]