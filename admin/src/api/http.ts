import axios from "axios";
import { getHistory, getTranslate } from "../history";
import { message } from "antd";

const isProd = process.env.NODE_ENV === "production";

export const http = axios.create({
  baseURL: isProd
    ? "http://localhost:4000/api/v1"
    : "http://localhost:4000/api/v1",
  timeout: 5000
});

http.interceptors.request.use(
  config => {
    let token = window.sessionStorage.getItem("token");

    if (config.url !== "/user/login" && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  err => {
    throw err;
  }
);

http.interceptors.response.use(
  res => {
    if (res.status && res.status === 200) {
      const data = res.data;
      return data;
    } else {
      return res;
    }
  },
  err => {
    const history = getHistory();
    const t = getTranslate();
    const status = +err.response.status;
    const data = err.response.data;

    if (data && data.status === "no") {
      message.error(t(data.msg));
    }

    switch (status) {
      case 400:
        break;

      case 401:
        history.replace("/login");
        message.info(getTranslate()("tokenExpired"));
        break;

      case 403:
        history.replace("/403");
        break;

      case 404:
        history.replace("/404");
        break;

      case 500:
      default:
        history.replace("/500");
        break;
    }

    throw err;
  }
);
