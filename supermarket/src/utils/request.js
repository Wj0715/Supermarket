// /*
// * axios 发送请求封装
// 2019-6-19 by  佳佳
// *
// */

// import axios from "axios"
// import qs from "qs";

// // 设置请求默认服务器地址
// axios.defaults.baseURL = 'http://127.0.0.1:3000'

// export default {
//     get(url,params ={}){
//         return new Promise((resolve,reject)=>{
//             axios.get(url,{
//                 params
//             })
//             .then(response=>{
//                 resolve(response.data)
//             })
//             .cacth(err=>{
//                 reject(err)
//             })
//         })
//     },
//     post(url,params={}){
//         return new Promise((resolve,reject)=>{
//             axios.post(url,qs.stringify(params))
//             .then(response=>{
//                 resolve(response.data)
//             })
//             .cacth(err=>{
//                 reject(err)
//             })
//         })
//     }
// }



/**
 * axios发送请求函数封装
 * 2019-06-19 by 夏公子
 */

// 引入axios
import axios from 'axios'
// 引入qs
import qs from 'qs';

// 设置请求默认服务器地址
axios.defaults.baseURL = 'http://127.0.0.1:3000'




//设置请求拦截器
axios.interceptors.request.use(function(config) {
    // 获取token
    let token = window.localStorage.getItem('wj_token')
    config.headers.authorization = `Bearer ${token}` 
    return config;
})

export default {
    get(url, params={}) {
       return new Promise((resolve, reject) => {
            axios.get(url, { 
                params
            })
                .then(response => {
                    resolve(response.data)   // 成功
                })
                .catch(err => {
                    reject(err)   // 失败
                })
       })
    },
    post(url, params={}) {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify( params ))
                .then(response => {
                    resolve(response.data)   // 成功
                })
                .catch(err => {
                    reject(err)   // 失败
                })
        })
    }
}

