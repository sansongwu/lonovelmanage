<template>
  <div class="login">
    <div class="box">
      <div class="item">
        <span>账号</span>
        <input type="text" v-model="admin">
      </div>
      <div class="item">
        <span>密码</span>
        <input type="password" v-model="password">
      </div>
      <div class="btn" v-on:click="login">
        <el-button>登陆</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import ajax from './fun/ajax.js'
  export default{
    name:'login',
    data(){
      return {
        admin:'',
        password:''
      }
    },
    methods:{
      loginTest:function () {
        this.$store.commit('getLogin')
      },
      login:function () {
        var that = this
        ajax.ajax({
          url: "/lonovel/admin/login", //请求地址
          type: 'post',   //请求方式
          data: {
            admin:that.admin,
            password:that.password,
          }, //请求参数
          dataType: "json",     // 返回值类型的设定
          async: true,   //是否异步
          success: function (response, xml) {
            if(response.code == 200){
              that.$store.commit('getLogin')
            }else{
              alert("账号或密码错误")
            }

          },
          fail: function (status) {
            alert("失败了")
            console.log('状态码为' + status);   // 此处为执行成功后的代码
          }
        })
      }
    }
  }
</script>
<style>
.login .box{
  width: 500px;
  height: 200px;
  background-color: #2b81af;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
</style>
