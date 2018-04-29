import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home'
import userManage from '@/components/content/userManage'
import financialManage from '@/components/content/financialManage'
import financialManageDetail from '@/components/content/financialManageDetail'
import indexClassify from '@/components/content/indexClassify'
import novelInfo from '@/components/content/novelInfo'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path:'/usermanage',
      name:'userManage',
      component:userManage
    },
    {
      path:'/financialManage',
      name:'financialManage',
      component:financialManage,
      children:[{
        path: 'Detail',
        name: 'financialManageDetail',
        component: financialManageDetail
      }]
    },
    /*首页管理*/
    {
      path:'/indexClassify1',
      name:'indexClassify1',
      component:indexClassify
    },
    {
      path:'/indexClassify2',
      name:'indexClassify2',
      component:indexClassify
    },
    {
      path:'/indexClassify3',
      name:'indexClassify3',
      component:indexClassify
    },
    {
      path:'/indexClassify4',
      name:'indexClassify4',
      component:indexClassify
    },
    /*内容管理*/
    {
      path:'/novelInfo',
      name:'novelInfo',
      component:novelInfo
    },
  ]
})
