FROM node:22-alpine AS builder
WORKDIR /src

# Copy root workspace manifests
COPY package.json package-lock.json ./

# Copy workspace package manifests
COPY product/package.json ./product/
COPY storybook/package.json ./storybook/

# Install all workspace dependencies from root lockfile only
RUN npm ci

# Copy source files
COPY product/ ./product/
COPY storybook/ ./storybook/

# Build the Next.js product app (storybook components are included via workspace)
RUN npm run build --workspace=product

FROM node:22-alpine
WORKDIR /src

COPY --from=builder /src/package.json ./
COPY --from=builder /src/node_modules ./node_modules
COPY --from=builder /src/product/package.json ./product/
COPY --from=builder /src/product/node_modules ./product/node_modules
COPY --from=builder /src/product/.next ./product/.next
COPY --from=builder /src/product/public ./product/public
COPY --from=builder /src/storybook/package.json ./storybook/
COPY --from=builder /src/storybook/src ./storybook/src

ENV NODE_ENV=production
EXPOSE 8080
CMD ["npm", "run", "start", "--workspace=product"]
