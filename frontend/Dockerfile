# ---------- Development Stage ----------
    FROM node:20-alpine AS dev

    WORKDIR /app
    
    # Install pnpm globally
    RUN npm install -g pnpm
    
    # Copy package info and install deps
    COPY package*.json ./
    RUN pnpm install
    
    # Copy the full project
    COPY . .
    
    EXPOSE 5173
    CMD ["pnpm", "dev"]
    
    # ---------- Production Build Stage ----------
    FROM node:20-alpine AS builder
    
    WORKDIR /app
    RUN npm install -g pnpm
    COPY . .
    RUN pnpm install && pnpm build
    
    # ---------- NGINX Serve Stage ----------
    FROM nginx:alpine AS prod
    
    COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
    COPY --from=builder /app/dist /usr/share/nginx/html
    
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
    