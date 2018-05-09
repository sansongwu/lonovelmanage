<template>
  <div class="add-novel">
    <!--顶部条开始-->
    <div class="top">
      <h1 class="title">新增小说</h1>
      <router-link to="/novelInfo"><div><el-button>退出编辑</el-button></div></router-link>
    </div>
    <!--顶部条结束-->
    <!--内容-->
    <div class="content">
      <div class="flex-wrap">
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
            <span>标签(以&分割):</span>
          </div>
          <div class="item-right">
            <input type="text" v-model="novelInfo.label">
          </div>
        </div>
        <div class="item clearfix">
          <div class="item-left">
            <span>分类:</span>
          </div>
          <div class="item-right">
            <template>
              <el-select v-model="novelInfo.type" placeholder="请选择">
                <el-option
                  v-for="item in novelClassify"
                  :key="item.classId"
                  :label="item.label"
                  :value="item.classId">
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
        <form ref="uploadform" id = "fileform">
          <input id="file" type="file" name="coverImg">
          <!--<button id="upload" type="button" v-on:click="subfile">upload</button>-->
        </form>


        <!--提交按钮-->
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
    name:'addNovel',
    created(){
      /*初始化 拿值*/
      this.init()
    },
    data(){
      return{
        /*接收的值*/
        /*默认的小说信息*/
        novelInfo:{
          bookName:'',
          author:'',
          label:'',
          type:'',
          translater:'',
          showRead:'',

        },
        /*下拉框内容*/
        novelClassify:[],

      }
    },
    methods:{
      /*初始化下拉框选项*/
      init(){
        var that = this
        ajax.ajax({
          url: "/lonovel/types", //请求地址
          type: 'post',   //请求方式
          data: {}, //请求参数
          dataType: "json",     // 返回值类型的设定
          async: true,   //是否异步
          success: function (response, xml) {
            var data = response.extend.list
            for(var i = 0 ; i < data.length ; i ++){
              var obj = {}
              obj.classId = data[i].id
              obj.label = data[i].typeName
              that.novelClassify.push(obj)
            }
          },
          fail: function (status) {
            console.log('状态码为' + status);   // 此处为执行成功后的代码
          }
        })
      },
      /*提交*/
      submit(){
        /*if (this.$refs.uploadform.files.length !== 0) {
          var image = new FormData()
          image.append('avatar', this.$refs.uploadform.files[0])
        }*/
        this.novelInfo.label = ''
        this.novelInfo.label = this.novelInfo.label.split('&')
        console.log(this.novelClassify)
        console.log(this.novelInfo)
        var that = this
        var data = new FormData(that.$refs.uploadform)
        for(var key in this.novelInfo){
          data.append(key,this.novelInfo[key])
        }
        alert(data)
        ajax.file({
          url: "/lonovel/admin/addnovel", //请求地址
          type: 'post',   //请求方式
          data: data, //请求参数
          dataType: "json",     // 返回值类型的设定
          async: true,   //是否异步
          success: function (response, xml) {
            alert("成功了")
          },
          fail: function (status) {
            alert("失败了。。。")
            console.log('状态码为' + status);   // 此处为执行成功后的代码
          }
        })


        /*var that = this
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
        })*/
      },
      /*提交文件方法*/
      subfile(){
        var form=document.getElementById("fileform");
        var formData=new FormData(form);
        ajax.file({
          url: "aappii/lonovel/admin/addnovel", //请求地址
          data: formData, //请求参数
          dataType: "json",     // 返回值类型的设定
          async: true,   //是否异步
          success: function (response, xml) {
            alert("成功了")

          },
          fail: function (status) {
            alert("失败了。。。")
            console.log('状态码为' + status);   // 此处为执行成功后的代码
          }
        })

        /*之前的*/
        /*var oReq = new XMLHttpRequest();
        oReq.onreadystatechange=function(){
          if(oReq.readyState==4){
            if(oReq.status==200){
              alert("成功了")
            }
          }
        };
        oReq.open("POST", "aappii/lonovel/admin/addnovel");
        oReq.send(formData);
        return false;*/
      }
    }

  }
</script>
<style>


  /*顶部*/
  .add-novel .top{
    width: 1190px;
    height: 60px;
    background-color: #8cc5ff;
  }
  .add-novel .title{
    font-size: 18px;
    line-height: 60px;
    margin-left: 20px;
    font-weight: bold;
    display: inline-block;
  }
  .add-novel .top div{
    float: right;
    line-height: 60px;
    display: inline-block;
    margin-right: 20px;

  }

  /*内容*/
  .add-novel .content .flex-wrap{
    display: flex;
    display: -webkit-flex;
    flex-direction: column;

    align-items: center;
  }
  .add-novel .content .flex-wrap .item{

    width: 400px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  .add-novel .content .flex-wrap .item input{
    height: 30px;
    font-size: 20px;
  }
  .add-novel .item-left,.novel-edit .item-right{
    float: left;
    width: 50%;

  }
  .add-novel .item-left{
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 20px;
  }
  .add-novel .submit{
    margin-top: 20px;
    margin-left: 140px;
  }
</style>
