/* 
*账号管理模块的相关请求
*
*/

// 引入封装好的axios请求
import req from "@/utils/request"


// 编辑
export function accountEdit(params){
    return req.get('/account/accountedit',params)
}

// 保存修改
export function accountsaveEdit (params){
    return req.post('/account/saveedit',params)
}

// 删除
export function accountDel(params){
    return req.get('/account/accountedel',params)
}

// 批量删除
export function bachDelete(params){
    return req.get('account/bachdel',params)
}

// 分页
export function getaccountByPage(params){
    return req.get('account/accountpage',params)
}

// 账号添加
export function accountAdd(params) {
    return req.post('/account/accountadd',  params)
}
// 验证旧密码是否正确
export function checkOldPass(params){
    return req.post('/account/checkoldpass',params)
}

// 修改密码
export function passwrodModify(params){
    return req.post('/account/passwordmodify',params)
}

// 获取当前登录用户的信息
export function accountInfo(){
    return req.get('/account/accountinfo')
}

// 获取权限
export function getRole(){
    return req.get('/account/role')
}