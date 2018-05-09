<template>
  <div class="novel-edit">
    <!--顶部条开始-->
    <div class="top">
      <h1 class="title">编辑小说信息</h1>
      <router-link to="/novelInfo"><div><el-button>退出编辑</el-button></div></router-link>
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
            <input type="text" readonly v-model="novelInfo.id">
          </div>
        </div>
        <div class="item clearfix">
          <div class="item-left">
            <span>书名:</span>
          </div>
          <div class="item-right">
            <input type="text" v-model="novelInfo.bookName">
          </div>
        </div>
        <div class="item clearfix">
          <div class="item-left">
            <span>作者:</span>
          </div>
          <div class="item-right">
            <input type="text" v-model="novelInfo.author">
          </div>
        </div>
        <div class="item clearfix">
          <div class="item-left">
            <span>分类:</span>
          </div>
          <div class="item-right">
            <template>
              <el-select v-model="novelClassify.id" placeholder="请选择">
                <el-option
                  v-for="item in novelClassify"
                  :key="item.id"
                  :label="item.typeName"
                  :value="item.id">
                </el-option>
              </el-select>
            </template>
          </div>
        </div>
        <div class="item clearfix">
          <div class="item-left">
            <span>翻译者:</span>
          </div>
          <div class="item-right">
            <input type="text" v-model="novelInfo.translater">
          </div>
        </div>
        <div class="item clearfix">
          <div class="item-left">
            <span>展示阅读次数:</span>
          </div>
          <div class="item-right">
            <input type="text" v-model="novelInfo.showRead">
          </div>
        </div>
        <!--提交按钮-->
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
    name:'novelEdit',
    created(){
      /*初始化 拿值*/
      this.init()
      console.log(this.novelInfo)
      console.log(this.novelClassify)
    },
    data(){
      return{
        /*接收的值*/
        /*默认的小说信息*/
        novelInfo:{},
        /*下拉框内容*/
        novelClassify:[],
        state:''
      }
    },
    methods:{
      /*初始化*/
      init(){
        this.novelInfo = this.$store.state.stateNovelInfo
        //this.novelClassify = this.$store.state.novelClassify
        var arr = this.$store.state.novelClassify
        console.log(this.$store.state.novelClassify)
        for(var i = 0 ; i < arr.length ; i ++ ){
          this.novelClassify.push(arr[i])
        }
      },
      /*提交*/
      submit(){

        var that = this
        this.novelInfo.typeId = this.novelClassify.id
        console.log(this.novelInfo)
        ajax.ajax({
          url: "/lonovel/admin/editnovel", //请求地址
          type: 'post',   //请求方式
          data: that.novelInfo, //请求参数
          dataType: "json",     // 返回值类型的设定
          async: true,   //是否异步
          success: function (response, xml) {
            if (response.code == 200){
              alert("修改成功")
            }
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
  .novel-edit{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 900px;
    background-color: #ffffff;
    z-index: 2;
  }
  /*顶部*/
  .novel-edit .top{
    width: 1190px;
    height: 60px;
    background-color: #8cc5ff;
  }
  .novel-edit .title{
    font-size: 18px;
    line-height: 60px;
    margin-left: 20px;
    font-weight: bold;
    display: inline-block;
  }
  .novel-edit .top div{
    float: right;
    line-height: 60px;
    display: inline-block;
    margin-right: 20px;

  }

  /*内容*/
  .novel-edit .content .flex-wrap{
    display: flex;
    display: -webkit-flex;
    flex-direction: column;

    align-items: center;
  }
  .novel-edit .content .flex-wrap .item{

    width: 400px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  .novel-edit .content .flex-wrap .item input{
    height: 30px;
    font-size: 20px;
  }
  .novel-edit .item-left,.novel-edit .item-right{
    float: left;
    width: 50%;

  }
  .novel-edit .item-left{
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 20px;
  }
  .novel-edit .submit{
    margin-top: 20px;
    margin-left: 140px;
  }
</style>
