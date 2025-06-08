FROM node:20.3.1-alpine AS base

WORKDIR /app

RUN corepack enable pnpm

COPY pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --ignore-scripts

FROM base AS build

COPY . .

CMD cd backend && pnpm run prepare 
CMD cd backend && pnpm run build
CMD cd frontend && pnpm run build

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

CMD ["node", "backend/dist/index"]