<template>
  <div class="index-classify">
    <div class="top">
      <h1 class="title">首页管理-类目{{indexClassify}}</h1>
    </div>
    <div class="index-classify-sort-name clearfix">
      <div class="item">
        <span>分类名</span>
        <el-input v-model="obj.categoryName" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>是否展示该类</span>
        <template>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </div>
    </div>
    <!--第一行-->
    <div class="index-classify-line-top clearfix">
      <div class="item">
        <span>顶部左边小说id</span>
        <el-input v-model="obj.top01" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>顶部右边小说id</span>
        <el-input v-model="obj.top02" placeholder="请输入内容"></el-input>
      </div>
    </div>

    <!--第二行-->
    <div class="index-classify-line-middle clearfix">
      <div class="item">
        <span>第一行01</span>
        <el-input v-model="obj.show01" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>第一行02</span>
        <el-input v-model="obj.show02" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>第一行03</span>
        <el-input v-model="obj.show03" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>第一行04</span>
        <el-input v-model="obj.show04" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>第一行05</span>
        <el-input v-model="obj.show05" placeholder="请输入内容"></el-input>
      </div>
    </div>

    <!--第三行-->
    <div class="index-classify-line-bottom clearfix">
      <div class="item">
        <span>第二行01</span>
        <el-input v-model="obj.show06" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>第二行02</span>
        <el-input v-model="obj.show07" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>第二行03</span>
        <el-input v-model="obj.show08" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>第二行04</span>
        <el-input v-model="obj.show09" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>第二行05</span>
        <el-input v-model="obj.show10" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <!--按钮-->
    <div class="button" v-on:click="submit">
      <el-button>提交</el-button>
    </div>
  </div>
</template>
<script>
  import ajax from '../fun/ajax.js'
  export default {
    name:'lonovel',
    created(){
      /*this.indexClassify = this.$store.state.indexClassify
      console.log(this.indexClassify)*/
      this.tab()
    },
    data() {
      return {
        indexClassify:0,
        show:true,

        options: [{
          value: 0,
          label: '不展示'
        }, {
          value: 1,
          label: '展示'
        }],
        value:'',
        obj:{
          id:this.indexClassify,
          state: 0,
          /*分类名字*/
          categoryName: '',
          /*置顶的两个*/
          top01: '',
          top02: '',
          /*下面10个*/
          show01: '',
          show02: '',
          show03: '',
          show04: '',
          show05: '',
          show06: '',
          show07: '',
          show08: '',
          show09: '',
          show10: '',
        },
        /*初始化提交的obj*/
        initObj:{},
        /*提交obj*/
        subObj:{}
      }


    },
    methods:{
      /*初始化方法*/
      tab(){
        this.indexClassify = this.$store.state.indexClassify
        console.log(this.indexClassify)
        this.init()
      },
      /*初始化*/
      init(){
        this.initObj.id = this.indexClassify
        console.log(this.initObj)
        var that = this
        ajax.ajax({
          url: "/lonovel/admin/initindexmanager", //请求地址
          type: 'post',   //请求方式
          data: that.initObj, //请求参数
          dataType: "json",     // 返回值类型的设定
          async: true,   //是否异步
          success: function (response, xml) {
            var data = response.extend.index
            console.log(data)
            /*that.categoryName = data.categoryName
            that.state = data.state
            that.show01 = data.show01
            that.show02 = data.show02
            that.show03 = data.show03
            that.show04 = data.show04
            that.show05 = data.show05
            that.show06 = data.show06
            that.show07 = data.show07
            that.show08 = data.show08
            that.show09 = data.show09
            that.show10 = data.show10*/
            that.value = data.state
            for(var key in data){
              that.obj[key] = data[key]
            }
            console.log(that.obj)
          },
          fail: function (status) {
            console.log('状态码为' + status);   // 此处为执行成功后的代码
          }
        })
      },
      /*提交*/
      submit(){
        /*this.subObj.categoryName = this.categoryName
        this.subObj.state = this.state
        this.subObj.show01 = this.show01
        this.subObj.show02 = this.show02
        this.subObj.show03 = this.show03
        this.subObj.show04 = this.show04
        this.subObj.show05 = this.show05
        this.subObj.show06 = this.show06
        this.subObj.show07 = this.show07
        this.subObj.show08 = this.show08
        this.subObj.show09 = this.show09
        this.subObj.show10 = this.show10*/
        var that = this
        ajax.ajax({
          url: "/lonovel/admin/changeindex", //请求地址
          type: 'post',   //请求方式
          data: that.obj, //请求参数
          dataType: "json",     // 返回值类型的设定
          async: true,   //是否异步
          success: function (response, xml) {
            if (response.code == 200){
              alert("修改成功")
            }else {
              alert("请仔细检查输入内容  id不能是不存在的小说")
            }

          },
          fail: function (status) {
            console.log('状态码为' + status);   // 此处为执行成功后的代码
          }
        })
      }
    },
    watch:{
      "$route":"tab"
    }
  }
</script>
<style>
  .index-classify{
    width: 1190px;
    height: 900px;
    background-color: burlywood;

  }
  .index-classify .item {
    float: left;
  }
  .index-classify .item input {
    width: 120px;
    height: 40px;
  }

  .index-classify .el-input{

  }

  /*顶部*/
  .index-classify .top{
    width: 1190px;
    height: 60px;
    background-color: #8cc5ff;
  }
  .index-classify .title{
    font-size: 18px;
    line-height: 60px;
    margin-left: 20px;
    font-weight: bold;
  }
  .index-classify .button{
    float: right;
    margin-right: 40px;
  }


  .clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}
  .clearfix{*+height:1%;}
</style>
