import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home'
import userManage from '@/components/content/userManage'
import financialManage from '@/components/content/financialManage'
import financialManageDetail from '@/components/content/financialManageDetail'
import indexClassify from '@/components/content/indexClassify'
import novelInfo from '@/components/content/novelInfo'
import novelEdit from '@/components/content/novelEdit'
import novelClassify from '@/components/content/novelClassify'
import novelClassifyEdit from '@/components/content/novelClassifyEdit'
import addNovel from '@/components/content/addNovel'
import addNovelClassify from '@/components/content/addNovelClassify'
import addChapter from '@/components/content/addChapter'
import novelChapter from '@/components/content/novelChapter'
import commentManage from '@/components/content/commentManage'


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
    /*资金管理*/
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
    /*资金明细*/

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
    /*内容(小说)管理*/
    {
      path:'/novelInfo',
      name:'novelInfo',
      component:novelInfo,
      children:[
        /*编辑小说*/
        {
          path: 'edit',
          name: 'novelEdit',
          component: novelEdit
        },
        /*小说章节*/
        {
          path:'novelChapter',
          component:novelChapter
        },
      ]
    },



    /*新增小说章节*/
    {
      path:'/novelInfo/addChapter',
      /*name:'addChapter',*/
      component:addChapter
    },
    /*小说分类*/
    {
      path:'/novelClassify',
      name:'novelClassify',
      component:novelClassify
    },
    {
      path:'/novelClassify/edit',
      name:'novelClassifyEdit',
      component:novelClassifyEdit
    },
    /*添加小说分类*/
    {
      path:'/addNovelClassify',
      name:'addNovelClassify',
      component:addNovelClassify
    },
    /*新增小说*/
    {
      path:'/addNovel',
      name:'addNovel',
      component:addNovel
    },


    /*5.评论管理*/
    {
      path:'/commentManage',
      name:'commentManage',
      component:commentManage
    },
  ]
})
