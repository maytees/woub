# deps stage
FROM --platform=linux/amd64 node:20-alpine3.18 AS deps
RUN apk add --no-cache libc6-compat openssl1.1-compat
WORKDIR /app

# install prisma
COPY prisma ./

# install deps 
COPY package.json package-lock.json* ./
RUN npm ci

# build stage
FROM --platform=linux/amd64 node:20-alpine3.18 AS builder
ARG DATABASE_PATH
ARG NEXT_PUBLIC_CLIENTVAR
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN SKIP_ENV_VALIDATION=1 npm run build

# runner stage
FROM --platform=linux/amd64 node:20-alpine3.18 AS runner
WORKDIR /app

ENV NODE_ENV production

# Add SQLite dependency
RUN apk add --no-cache sqlite

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY prisma ./prisma/
COPY ./start.sh ./

ENV HOSTNAME 0.0.0.0

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["sh", "./start.sh"]