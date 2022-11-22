//重写axios方法
import axios from 'axios'
const requests = axios.create({
    baseURL:'https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api',
    timeout:5000
})
//设置请求与响应拦截器
requests.interceptors.request.use((config)=>{
    return config
})
requests.interceptors.response.use((res)=>{
    return res.data 
},error=>{
    return Promise.reject(error)
})
export default requests