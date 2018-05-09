<template>
  <div class="novel-classify-edit">
    <!--顶部条开始-->
    <div class="top">
      <h1 class="title">编辑小说分类</h1>
      <router-link to="/novelClassify"><div><el-button>退出编辑</el-button></div></router-link>
    </div>
    <!--顶部条结束-->
    <!--内容-->
    <div class="content">
      <div class="flex-wrap">
        <div class="item clearfix">
          <div class="item-left">
            <span>ID:</span>
          </div>
          <div class="item-right">
            <input type="text" readonly v-model="id">
          </div>
        </div>
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
          <el-button>确认修改</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ajax from '../fun/ajax.js'
  export default{
    name:'novelClassifyEdit',
    created(){
      this.id = this.$store.state.novelClassifyId
      this.name = this.$store.state.novelClassifyName
    },
    data(){
      return{
        id:'',
        name:''
      }
    },
    methods:{
      /*提交 确认修改*/
      submit(){
        var that = this
        ajax.ajax({
          url: "/lonovel/admin/edittype", //请求地址
          type: 'post',   //请求方式
          data: {id:that.id,name:that.name}, //请求参数
          dataType: "json",     // 返回值类型的设定
          async: true,   //是否异步
          success: function (response, xml) {
            alert("修改成功")
          },
          fail: function (status) {
            console.log('状态码为' + status);   // 此处为执行成功后的代码
          }
        })
      }
    }

  }
</script>
<style>
  /*顶部*/
  .novel-classify-edit .top{
    width: 1190px;
    height: 60px;
    background-color: #8cc5ff;
  }
  .novel-classify-edit .title{
    font-size: 18px;
    line-height: 60px;
    margin-left: 20px;
    font-weight: bold;
    display: inline-block;
  }
  .novel-classify-edit .top div{
    float: right;
    line-height: 60px;
    display: inline-block;
    margin-right: 20px;
  }

  /*内容*/
  .novel-classify-edit .content .flex-wrap{
    display: flex;
    display: -webkit-flex;
    flex-direction: column;

    align-items: center;
  }
  .novel-classify-edit .content .flex-wrap .item{

    width: 400px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  .novel-classify-edit .content .flex-wrap .item input{
    height: 30px;
    font-size: 20px;
  }
  .novel-classify-edit .item-left,.novel-classify-edit .item-right{
    float: left;
    width: 50%;

  }
  .novel-classify-edit .item-left{
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 20px;
  }
  .novel-classify-edit .submit{
    margin-top: 20px;
    margin-left: 140px;
  }
</style>
