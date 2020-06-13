import Vue from 'vue'
import VueRouter from 'vue-router'
import Frame from '../views/frame'
import Index from "../views/index"
import Login from "../views/login"
import auth from '../utils/auth'
import ProjectList from "../views/projectList"
import ProjectDetail from "../views/projectDetail"
import Settings from "../views/settings"

Vue.use(VueRouter);

  const routes = [
  {
    path: '/',
    component: Frame,
    name: "frame",
    redirect: '/index',
    children:
        [
            {
                path: "/index",
                component: Index,
                name: "index"
            },
            {
                path: "/project",
                component: ProjectList,
                name: "projectList"
            },
            {
                path: "/project/:project_id",
                component: ProjectDetail,
                name: "ProjectDetail"
            },
            {
                path: "settings",
                component: Settings,
                name: "settings"
            }
        ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// 権限インターセプト
router.beforeEach((to, from, next) =>{
   if (to.name !== 'login' && !auth.is_authed) {
      next({
          name:"login"
      })
   }else {
       next()
   }
});

export default router
