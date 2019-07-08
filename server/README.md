# Server

API 接口服务。

## 如何启动

服务端采用数据库 `postgresql`。在启动服务之前，请确保：

1. 数据库 `postgresql` 可连接
2. 用户名和密码正确
3. 目标数据库已创建

### 使用 docker 创建 `postgresql` 数据库服务

首先启动 `postgresql` 服务：

```shell
docker container run -d -p 5432:5432 --name postgres postgres:11-alpine
```

然后进入启动的数据库服务，进行用户和数据库的创建：

```shell
docker container exec -it postgres bash

# 切换到 postgres
su - postgres

# 输入 psql
psql

# 创建用户
create user plarum with password 'plarum';

# 创建数据库
create database plarum owner plarum;
```

## 接口设计

### 全局错误码

| 错误码                  | 说明     |
| ----------------------- | -------- |
| `AUTHENTICATION_FAILED` | 认证失败 |
| `AUTHORIZATION_EXPIRED` | 授权过期 |
| `MISSING_PARAMETERS`    | 缺少参数 |

### 模块

#### 用户

##### 模型定义

<details>
  <div>
  
  ```ts
  interface IUser {
    id?: string
    name: string
    password: string
    role?: string
    status?: 'disabled' | 'activate'
    createAt?: string
    updateAt?: string
    lastLoginAt?: string
    articles?: IArticle[]
  }
  ```

  </div>
</details>

##### 功能划分

###### 用户登录

<details>
  <ul>

- 请求方式：`POST`
- 请求地址：`/user/login`
- 请求参数：

  | 参数名     | 类型   | 说明     |
  | ---------- | ------ | -------- |
  | `name`     | string | 用户名   |
  | `password` | string | 用户密码 |

- 错误码：

  | 错误码                   | 说明           |
  | ------------------------ | -------------- |
  | `NAME_OR_PASSWORD_ERROR` | 账户或密码错误 |

- 返回值:

  ```json
  {
    "status": "ok",
    "data": {},
    "token": ""
  }
  ```

  或：

  ```json
  {
    "status": "no",
    "msg": ""
  }
  ```

    </ul>
  </details>

###### 用户注册

<details>
  <ul>

- 请求方式：`POST`
- 请求地址：`/user/register`
- 请求参数：

  | 参数名     | 类型   | 说明     |
  | ---------- | ------ | -------- |
  | `name`     | string | 用户名   |
  | `password` | string | 用户密码 |

- 错误码：

  | 错误码               | 说明       |
  | -------------------- | ---------- |
  | `NAME_ALREADY_EXSIT` | 账户已存在 |

- 返回值:

  ```json
  {
    "status": "ok",
    "data": {}
  }
  ```

  或：

  ```json
  {
    "status": "no",
    "msg": ""
  }
  ```

    </ul>
  </details>

###### 查看所用用户

该接口会根据请求头携带的 Token 来判断用户角色，只有管理员可查看。

<details>
  <ul>
  
- 请求方式：`GET`
- 请求地址：`/user`
- 错误码：

| 错误码                  | 说明     |
| ----------------------- | -------- |
| `AUTHENTICATION_FAILED` | 认证失败 |

- 返回值:

```json
{
  "status": "ok",
  "data": []
}
```

或：

```json
{
  "status": "no",
  "msg": ""
}
```

  </ul>
</details>

###### 查看特定用户

该接口用于管理员查看指定用户的信息（不包含密码），也可以用于用户查看自身信息（非管理员不可查看他人信息）。

<details>
  <ul>

- 请求方式：`GET`
- 请求地址：`/user/:id`
- 错误码：

| 错误码                  | 说明     |
| ----------------------- | -------- |
| `AUTHENTICATION_FAILED` | 认证失败 |

- 返回值:

```json
{
  "status": "ok",
  "data": {}
}
```

或：

```json
{
  "status": "no",
  "msg": ""
}
```

  </ul>
</details>

###### 更新用户信息

该接口用于管理员更新指定用户的信息（包含用户权限，不包含密码），也可以用于用户更新自身信息（非管理员不可查看他人信息，同时不可以改变自己的权限）。

<details>
  <ul>

- 请求方式：`PATCH`
- 请求地址：`/user/:id`
- 错误码：

| 错误码                  | 说明     |
| ----------------------- | -------- |
| `AUTHENTICATION_FAILED` | 认证失败 |

- 返回值:

```json
{
  "status": "ok",
  "data": {}
}
```

或：

```json
{
  "status": "no",
  "msg": ""
}
```

  </ul>
</details>

###### 删除用户

该接口用于管理员删除特定账户。

<details>
  <ul>

- 请求方式：`DELETE`
- 请求地址：`/user/:id`
- 错误码：

  | 错误码                  | 说明     |
  | ----------------------- | -------- |
  | `AUTHENTICATION_FAILED` | 认证失败 |

- 返回值:

  ```json
  {
    "status": "ok"
  }
  ```

  或：

  ```json
  {
    "status": "no",
    "msg": ""
  }
  ```

    </ul>
  </details>

其他模块接口设计同理
