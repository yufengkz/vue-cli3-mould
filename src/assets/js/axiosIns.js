import axios from "axios";
import md5 from "js-md5";
import { Base64 } from "js-base64";

let axiosIns = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 50000 // 请求超时时间
});

axiosIns.defaults.headers.post["X-Requested-With"] = "XMLHttpRequest";
axiosIns.defaults.headers.get["X-Requested-With"] = "XMLHttpRequest";
axiosIns.defaults.responseType = "json";

axiosIns.interceptors.request.use(function(config) {
  //配置config
  config.headers.Accept = "*/*";
  config.headers["Content-Type"] = "application/json;charset=UTF-8";

  console.log(config.data);
  //config.headers.System = 'vue'
  const token = "";
  let timestamp = parseInt(+new Date() / 1000);
  config.headers.timestamp = timestamp;
  config.headers.signature = sign(config.data, timestamp);
  config.headers.token = token;

  return config;
});
axiosIns.interceptors.response.use(function(response) {
  let status = response.status;
  if (status === 200) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
});

// header签名
function sign(body, timestamp) {
  let salt = {
    H5: "4c77e2945b5bd2cecf8dd983ee7531d98d9565f1"
  };
  let token = "";
  // token逻辑
  let str = "";
  body &&
    Object.keys(body)
      .sort()
      .forEach(key => (str += key + body[key]));
  let sign = md5(Base64.encode(String(timestamp)) + token + salt.H5 + str);
  return sign;
}

export default axiosIns;
