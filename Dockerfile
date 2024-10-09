# STAGE 1
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

# STAGE 2
FROM alpine:3.9
WORKDIR /
RUN mkdir /webapp/
COPY --from=builder /app/dist/ /webapp/
CMD ["/bin/cp","-a", "/webapp/.", "/srv/"]