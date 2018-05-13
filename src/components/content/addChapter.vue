<template>
  <div class="add-chapter">
    <div class="top">
      <h1 class="title">新增章节</h1>
      <span class="close" v-on:click="close"><el-button>关闭</el-button></span>
    </div>

    <!--内容-->
    <div class="content">
      <div class="flex-wrap">
        <div class="item clearfix">
          <div class="item-left">
            <span>书id:</span>
          </div>
          <div class="item-right">
            <span>{{novelInfo.id}}</span>
          </div>
        </div>

        <!--书的名字展示-->
        <div class="item clearfix">
          <div class="item-left">
            <span>书名:</span>
          </div>
          <div class="item-right">
            <span>{{novelInfo.bookName}}</span>
          </div>
        </div>
        <!--章节序号-->
        <div class="item clearfix">
          <div class="item-left">
            <span>章节序号:</span>
          </div>
          <div class="item-right">
            <span>{{index}}</span>
          </div>

        </div>

        <!--章节名字-->
        <div class="item clearfix">
          <div class="item-left">
            <span>请输入章节名:</span>
          </div>
          <div class="item-right">
            <input type="text" v-model="chapterName">
          </div>
        </div>
        <!--翻译者-->
        <div class="item clearfix">
          <div class="item-left">
            <span>翻译者:</span>
          </div>
          <div class="item-right">
            <input type="text" v-model="translator">
          </div>
        </div>

        <form ref="uploadform2" id = "fileform">
          <input id="file" type="file" name="chapterContent">
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
    name:'addChapter',
    created(){
      console.log("弹窗生成")
      /*获取页面传值的小说数据*/
      this.novelInfo = this.$store.state.stateNovelInfo

      var data = this.$store.state.novelChapterInfo
      this.id = data.id
      this.novelId = data.novelId
      this.index = data.index
      /*提交小说id 获取章数*/

      console.log(this.novelInfo)
    },
    data(){
      return {
        novelInfo:'',
        chapterName:'',
        translator:'',

        id:'',
        novelId:'',
        index:''
      }
    },
    methods:{
      close(){
        this.$store.commit('getChapterDark',false)
      },
      submit(){
        if(this.chapterName == '' || this.translator == ''){
          alert("不能为空")
          return
        }

        var that = this
        var data = new FormData(that.$refs.uploadform2)
        console.log(this.novelId)
        data.append("name",this.chapterName)
        data.append("index",this.index)
        data.append("id",this.id)
        data.append("novelId",this.novelInfo.id)
        data.append("translator",this.translator)

        ajax.file({
         url: "/lonovel/admin/addchapter", //请求地址
         type: 'post',   //请求方式
         data: data, //请求参数
         dataType: "json",     // 返回值类型的设定
         async: true,   //是否异步
         success: function (response, xml) {
           if(response.code == 200){
             alert("提交成功")
             this.$store.commit('getChapterDark',false)
           }else{
             alert("必须上传文件  并且上传正确格式的文件")
           }

         },
         fail: function (status) {
           alert("失败了")
         console.log('状态码为' + status);   // 此处为执行成功后的代码
         }
        })
      }
    },

  }
</script>
<style>
  .add-chapter{
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 500px;
    height: 500px;
    background-color: #ffffff;
    border: 2px solid red;
    z-index: 3;
  }
  /*顶部*/
  .add-chapter .top{
    width: 100%;
    height: 60px;
    background-color: #8cc5ff;
  }
  .add-chapter .title{
    font-size: 18px;
    line-height: 60px;
    margin-left: 20px;
    font-weight: bold;
  }
  .add-chapter .close{
    float: right;
    margin-right: 20px;
  }

  /*内容*/
  .add-chapter .content{
    width: 100%;
    height: 100%;

  }
  .add-chapter .content .flex-wrap{
    display: flex;
    display: -webkit-flex;
    flex-direction: column;

    align-items: center;
  }
  .add-chapter .content .flex-wrap .item{


    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  .add-chapter .content .flex-wrap .item input{
    height: 30px;
    font-size: 20px;
  }
  .add-chapter .item-left,.add-chapter .item-right{
    float: left;
    width: 140px;

  }
  .add-chapter .item-left{
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    align-items: center;
  }
  .add-chapter .item-right{
    margin-right: 80px;
  }
  .add-chapter .submit{
    margin-top: 20px;
    margin-left: 20px;
  }
</style>
