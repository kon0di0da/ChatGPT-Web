# 使用 Node.js 16 Alpine 作为基础镜像
FROM node:18.17.0-alpine as build

ENV NEXT_PUBLIC_API_HOST_URL="http://13.49.181.170:80"

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 到容器中
COPY package*.json ./

# 安装依赖
RUN npm install --force

# 将应用程序代码复制到容器中
#COPY ./src ./src
#COPY ./public ./public
#COPY ./next.config.js ./next.config.js
#COPY ./tsconfig.json ./tsconfig.json
#COPY ./package.json ./package.json
#COPY ./package-lock.json ./package-lock.json
#COPY ./server ./server

COPY . .


# 构建 TypeScript 代码
RUN npm run build

# 使用多阶段构建
FROM node:18.17.0-alpine

WORKDIR /app

# 从构建阶段复制构建的产物
COPY --from=build /app ./
#COPY . .



# 暴露 3000 端口
EXPOSE 3000

# 启动应用程序
#CMD ["npm", "start"]
CMD ["npm“，”start"]
