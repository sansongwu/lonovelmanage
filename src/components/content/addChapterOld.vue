<template>
  <div class="add-chapter">
    <div class="top">
      <h1 class="title">新增章节</h1>
    </div>

    <!--内容-->
    <div class="content">
      <div class="flex-wrap">
        <div class="item clearfix">
          <div class="item-left">
            <span>id:</span>
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

        <!--章节名字-->
        <div class="item clearfix">
          <div class="item-left">
            <span>请输入章节名:</span>
          </div>
          <div class="item-right">
            <input type="text" v-model="id">
          </div>

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
      /*获取页面传值的小说数据*/
      this.novelInfo = this.$store.state.stateNovelInfo
      /*提交小说id 获取章数*/
      var that = this
      ajax.ajax({
        url: "", //请求地址
        type: 'post',   //请求方式
        data: {id:that.novelInfo.id}, //请求参数
        dataType: "json",     // 返回值类型的设定
        async: true,   //是否异步
        success: function (response, xml) {
          var data = response.extend.chapterSum
          that.chapterSum = data + 1
        },
        fail: function (status) {
          console.log('状态码为' + status);   // 此处为执行成功后的代码
        }
      })
    },
    data(){
      return {



        novelInfo:'',
        chapterSum:''
      }
    },
    methods:{

    }
  }
</script>
<style>
  .add-chapter{
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 50%;
    height: 500px;
    background-color: #ffffff;
    border: 2px solid red;
    z-index: 3;
  }
  /*顶部*/
  .add-chapter .top{
    width: 1190px;
    height: 60px;
    background-color: #8cc5ff;
  }
  .add-chapter .title{
    font-size: 18px;
    line-height: 60px;
    margin-left: 20px;
    font-weight: bold;
  }

  /*内容*/
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
    width: 300px;

  }
  .add-chapter .item-left{
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 20px;

  }
  .add-chapter .submit{
    margin-top: 20px;
    margin-left: 140px;
  }
</style>
