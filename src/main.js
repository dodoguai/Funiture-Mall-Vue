import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'

axios.defaults.baseURL='http://127.0.0.1:9000'
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$axios=axios
Vue.use(Vuex)

router.beforeEach((to,from,next)=>{
  const token=store.state.token;
  if(!token && to.path!=='/login'){
    next('/login')
    console.log('是的，没登录')
  }else{
    next();
    console.log('登陆了')
    
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
