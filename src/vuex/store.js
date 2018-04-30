/**
 * Created by wayne on 2018/4/23.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state:{
    stateUserInfo: {},
    indexClassify:0,
    stateNovelInfo: {},
    /*小说分类下拉内容*/
    novelClassify:[]
  },
  mutations:{
    /*用户信息的传值*/
    getuserInfo(state,data){
       state.stateUserInfo = data
    },

    /*首页类目index传值*/
    setIndexClassify(state,data){
      state.indexClassify = data
    },

    /*小说明细传值*/
    getNovelInfo(state,data){
      state.stateNovelInfo = data
    },

    /*小说分类传值*/
    getnovelClassify(state,arr){
      state.novelClassify.push(arr)
    },
    /*清除小说分类的传值  因为这里重复加载会重复push*/
    removeNovelClassify(state){
      state.novelClassify = []
    }
  }
})
