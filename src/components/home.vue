<template>
  <div class="home">
    <p>welcome to lonovel !</p>
  </div>
</template>
<script>
  import ajax from './fun/ajax.js'
  export default{
    name:'home',
    created(){
      /*var data = {
        id:"d711f63d-07f7-4ac6-9a1d-7c3d5ced0bdf"
      }
      ajax.ajax({
        url: "/lonovel/novel/novelchapter", //请求地址
        type: 'post',   //请求方式
        data: data, //请求参数
        dataType: "json",     // 返回值类型的设定
        async: true,   //是否异步
        success: function (response, xml) {
          var data = response.extend.contents


        },
        fail: function (status) {
          alert("失败了。。。")
          console.log('状态码为' + status);   // 此处为执行成功后的代码
        }
      })*/
    },
    data(){
      return {
        content:[]
      }
    }
  }
</script>
