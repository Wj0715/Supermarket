
// 引入封装好的axios请求
import req from "@/utils/request"

// 商品添加
export function goodsAdd(params){
return req.post('/goods/goodsadd',params)
}

// 商品列表
export function goodsList(params){
    return req.get('/goods/goodslist',params)
}

// 删除
export function goodsRemolve(params){
    return req.get('/goods/goodsmolve',params)
}

// 编辑
export function goodsEdit(params){
    return req.get('/goods/goodsedit',params)
}
// 编辑修改
export function saveEdit(params){
return req.post('/goods/saveedit/',params)
}

// 批量删除
export function bachDel(params){
    return req.get('/goods/bachdel',params)
}

// // 模糊查询
// export function searchGoods(params){
// return req.get('/goods/search',params)
// }