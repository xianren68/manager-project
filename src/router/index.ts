import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView/index.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children:[
      {
        path:"goods",
        name:'goods',
        meta:{
          isShow:true,
          title:"商品列表"
        },
        component:()=>import('@/views/HomeView/GoodsView.vue')

      },
      {
        path:'user',
        name:"user",
        meta:{
          isShow:true,
          title:"用户列表"
        },
        component:()=>import("@/views/HomeView/UserView.vue")
      },
      {
        path:"role",
        name:'role',
        meta:{
          isShow:true,
          title:"角色列表"
        },
        component:()=>import("@/views/HomeView/RoleView.vue"),
        props:true
      },
      {
        path:"permission",
        name:'permission',
        meta:{
          isShow:false,
          title:"权限列表"
        },
        component:()=>import("@/views/HomeView/PermView.vue")
      },
      {
        path:"/",
        redirect:'goods',
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from,next)=>{
  const token = localStorage.getItem("token")
  if(token){
    next()
  }else{
    if(to.path === "/login"){
      next()
    }
    next('/login')
  }
})

export default router
