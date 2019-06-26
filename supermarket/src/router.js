import Vue from 'vue'
import Router from 'vue-router'
// 注册路由
Vue.use(Router)

export default new Router({
  routes: [
    // 根目录重定向到登录
    {
    path:"/",
    redirect:'/login'
    },
    // 登录界面
    {
     path:'/login',//路径
     component:()=>import('./views/Login/Login.vue')//组件
    },
    // 父组件
    {
      path:'/home',
      component:()=>import('./views/Home/Home.vue'),
      // 重定向home
      redirect:'/home/goodsmanage',
      children:[//子组件
        {//系统信息
          path:'/home/systeminfo',
          component:()=>import('./views/SystemInfo/SystemInfo.vue')
        },
        {//账号添加
          path:'/home/accountadd',
          component:()=>import('./views/AccountAdd/AccountAdd.vue')
        },
        {//账号管理
          path:'/home/accountmanage',
          component:()=>import('./views/AccountManage/AccountManage.vue')
        },
        {//商品管理
          path:'/home/goodsmanage',
          component:()=>import('./views/GoodsManage/GoodsManage.vue')
        },
        {//商品添加
          path:'/home/goodsadd',
          component:()=>import('./views/GoodsAdd/GoodsAdd.vue')
        },
        {//密码修改：
          path:'/home/passwordmodify',
          component:()=>import('./views/PasswordModify/PasswordModify.vue')
        },
        {//销售统计
          path:'/home/selltotal',
          component:()=>import('./views/SellTotal/SellTotal.vue')
        },
        {//进货统计
          path:'/home/stocktotal',
          component:()=>import('./views/StockTotal/StockTotal.vue')
        },
        {// 商品退货
           path:'/home/salesreturn',
           component:()=>import('./views/SalesReturn/SalesReturn.vue')
        },
        {//销售列表
          path:"/home/selllist",
          component:()=>import('./views/SellList/SellList.vue')
        },
        {//商品出库
           path:'/home/goodsstock',
           component:()=>import('./views/GoodsStock/GoodsStock.vue')
        },
        {//添加库存
           path:"/home/kucunadd",
           component:()=>import('./views/KucunAdd/KucunAdd.vue')
        },
        {//库存管理
           path:"/home/kucunmanage",
           component:()=>import('./views/KucunManage/KucunManage.vue')
        },
        // 个人中心
        {
          path:'/home/personal',
          component:()=>import('./views/Personal/Personal.vue')
        }
       

      ]
    }
  ]
})
