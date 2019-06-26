/**
 * 登录模块相关的请求
 */

// 引入封装好的 request.js
import req from '@/utils/request'

/* 检查用户名和密码是否正确 */
export function loginCheck(params) {
    return req.post('/login/checklogin',  params)
}