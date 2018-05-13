<template>
  <div class="box">
    <login v-if="!$store.state.login"></login>

    <div id="app" v-if="$store.state.login">
      <div class="head"></div>
      <div class="bottombox clearfix">
        <div class="side">
          <sidebar></sidebar>
        </div>
        <div class="content">
          <router-view></router-view>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
  import sidebar from "./components/sidebar.vue"
  import login from "./components/login.vue"
export default {
  name: 'App',
  components:{sidebar,login},
  data(){
    return{

    }

  }
}
</script>

<style>
  @import "reset.css";
  .box{
    width: 100%;
  }
  #app{
    width: 1440px;
    margin: 0 auto;
    border-left: 1px solid #e6e6e6;
    border-right: 1px solid #e6e6e6;
  }
  .head{
    width: 1440px;
    height: 80px;
    background-color: #3a8ee6;
  }
  .bottombox{
    width: 1440px;
  }
  .side{
    width: 250px;
    height: 900px;
    background-color: #5daf34;
    float: left;
  }
  .content{
    width: 1190px;
    height: 900px;
    /*background-color: #6f7180;*/
    float: left;
  }
</style>
