import Vue from 'vue'
import App from './App.vue'
import router from './router'
// // 引入axios
// import axios from 'axios'
// import qs from 'qs'

// 引入Echarts
import echarts from 'echarts'
// 引入重置样式
import './assets/css/reset.css'
import './assets/css/common.css'
// 引入Element
import ElementUI from 'element-ui'
// 引入Element样式
import 'element-ui/lib/theme-chalk/index.css'

// 注册Element-ui
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts 

router.beforeEach((to,from,next)=>{
  const token = window.localStorage.getItem('wj_token')
  if(token){
    next() //如果有token  就放行
  }else{
    if(to.path==='/login'){
      next();
    }else{
      next({path:'/login'})//如果没有token  去其他的页面 就直接跳转到登录页面
    }
  }
})

Vue.config.productionTip = false  //阻止生成提示
// 挂载
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
