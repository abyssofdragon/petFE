import axios from 'axios'
const api = axios.create()

api.interceptors.request.use(
  (config) => {
    // 这里的config包含每次请求的内容
    return config
  },
  (err) => {
    console.error('api request 请求出错：', err)
    return Promise.reject(err)
  }
)
export default api
