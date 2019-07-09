# Plarum

> A simple full stack demo writen by React & Koa

Admin is build with React, Redux, and support i18n.
Server is powered by Koa2 + PostgreSQL.

## 启动

服务启动之前先确保 **数据库** 可连接（推荐使用 docker: `docker container run -d -p 5432:5432 --name postgres postgres:11-alpine`）。
数据库相关配置位于 [server/src/config](./server/src/config)，请根据需要改动。

### 开发模式

1. 首先启动 `api` 服务：

```shell
cd server
npm i
npm run dev
```

2. 启动 `admin` 网页:

```shell
cd admin
npm i
npm start
```

`api` 接口默认运行在 `http://localhost:4000`，`admin` 网页运行在 `http://localhost:3000`。

### 生产模式

1. `api` 服务构建与运行：

```shell
cd server
npm run build
npm start # 可根据需要自行配置 pm2
```

2. `admin` 构建：

```shell
cd admin
npm run build
```

`admin` 是 `React SPA`，构建后需要自行配置 `nginx` 服务。

#### 使用 docker

如果安装了 `docker`，可以使用 `docker-compose` 直接启动本项目。本项目编写了生产模式部署用的 `docker-compose.yml`，直接在项目根目录执行。

```shell
docker-compose build
docker-compose up -d
```

然后浏览器打开 `http://localhost:8080` 即可。

## LICENSE

MIT
