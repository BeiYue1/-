import Vue from 'vue' ;
import Router from 'vue-router' ;
import shopping from '@/components/shopping';
import comment from '@/components/comment' ;
import business from '@/components/business' ;
Vue.use(Router) ;

export default new Router({
    routes: [
      {
        path: '/',
        name: 'shopping',
        component: shopping,
        direction:'/shopping',
        children:[
          {
            path:'shopping' ,
            name:'shop' ,
            component:shopping ,
          }
        ]
      } ,

      {
        path: '/comment',
        name: 'comment',
        component: comment,
      },
      {
        path: '/business',
        name: 'business',
        component: business,
      }
    ] ,
})
