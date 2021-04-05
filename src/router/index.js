import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=>import('../components/Home.vue'),
    children:[{
      path:'/usermanage',
      component:()=>import('../components/usermanage.vue')
    },{
      path:'/brands',
      component:()=>import('../components/Brand.vue')
    },
    {
      path:'/brandinfo',
      component:()=>import('../components/Brandinfo.vue')
    },
    {
      path:'/productcategory',
      component:()=>import('../components/ProductCategory.vue')
    },
    {
      path:'/productattributecategory',
      component:()=>import('../components/ProductAttributeCategory.vue')
    },
    {
      path:'/attributespec',
      component:()=>import('../components/AttributeSpec.vue')
    },
  ]
  },
  {
    path: '/header',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Header.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
