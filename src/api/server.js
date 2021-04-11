import axios from 'axios';
import { Toast } from 'antd-mobile';

const HOST = 'https://api.mtnhao.com';

export const get = (url, params) =>
  new Promise((resolve, reject) => {
    axios
      .get(HOST + url, {
        params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        Toast.offline('网络错误');
        reject(err.data);
      });
  });
