<template>
  <div class="add-novel-classify">
    <!--顶部条开始-->
    <div class="top">
      <h1 class="title">新增小说分类</h1>
    </div>
    <!--顶部条结束-->
    <!--内容-->
    <div class="content">
      <div class="flex-wrap">

        <div class="item clearfix">
          <div class="item-left">
            <span>分类名:</span>
          </div>
          <div class="item-right">
            <input type="text" v-model="name">
          </div>
        </div>
        <!--提交-->
        <div class="submit" v-on:click="submit">
          <el-button>提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ajax from '../fun/ajax.js'
  export default{
    name:'addNovelClassify',
    data(){
      return{
        id:'',
        name:''
      }
    },
    methods:{
      submit(){
        var that = this
        ajax.ajax({
          url: "/lonovel/admin/addtype", //请求地址
          type: 'post',   //请求方式
          data: {name:that.name}, //请求参数
          dataType: "json",     // 返回值类型的设定
          async: true,   //是否异步
          success: function (response, xml) {
            alert("新增成功")
          },
          fail: function (status) {
            alert("新增失败")
            console.log('状态码为' + status);   // 此处为执行成功后的代码
          }
        })
      }
    }
  }
</script>
<style>
  /*顶部*/
  .add-novel-classify .top{
    width: 1190px;
    height: 60px;
    background-color: #8cc5ff;
  }
  .add-novel-classify .title{
    font-size: 18px;
    line-height: 60px;
    margin-left: 20px;
    font-weight: bold;
    display: inline-block;
  }
  .add-novel-classify .top div{
    float: right;
    line-height: 60px;
    display: inline-block;
    margin-right: 20px;
  }

  /*内容*/
  .add-novel-classify .content .flex-wrap{
    display: flex;
    display: -webkit-flex;
    flex-direction: column;

    align-items: center;
  }
  .add-novel-classify .content .flex-wrap .item{

    width: 400px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  .add-novel-classify .content .flex-wrap .item input{
    height: 30px;
    font-size: 20px;
  }
  .add-novel-classify .item-left,.novel-classify-edit .item-right{
    float: left;
    width: 50%;

  }
  .add-novel-classify .item-left{
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 20px;
  }
  .add-novel-classify .submit{
    margin-top: 20px;
    margin-left: 140px;
  }
</style>
