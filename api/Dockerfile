FROM node:current-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx tsc -p ./api/tsconfig.json --outDir ./api/dist

FROM node:current-alpine

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY package*.json ./
# Copy package manifests again for pruning

RUN npm ci --omit=dev
# Install ONLY production dependencies from the root package.json

# Copy ONLY the compiled API output and necessary runtime files
COPY --from=builder /app/api/dist ./api/dist
# If you have shared modules needed at runtime, copy them too:
# COPY --from=builder /app/shared ./shared

USER appuser

EXPOSE ${PORT:-3000}
ENV PORT=${PORT:-3000}

# Adjust CMD path relative to WORKDIR /app
CMD ["node", "api/dist/server.js"]
