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
  },
  mutations:{
    /*用户信息的传值*/
    getuserInfo(state,data){
       state.stateUserInfo = data
    },

    setIndexClassify(state,data){
      state.indexClassify = data
    },
  }
})
