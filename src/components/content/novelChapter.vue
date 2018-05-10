<template>
  <div class="novel-chapter">

      <!--顶部条开始-->
      <div class="top">
        <h1 class="title">小说章节</h1>
        <router-link to="/novelInfo"><div><el-button>返回小说信息</el-button></div></router-link>
      </div>
      <!--顶部条结束-->
      <div class="userinfo clearfix">
        <p>书名:{{novelInfo.bookName}}</p>
        <p>id:{{novelInfo.id}}</p>
        <p>作者:{{novelInfo.author}}</p>
        <p>上下架状态:{{novelInfo.state}}</p>
        <span class="new-chapter" v-on:click="newChapter"><el-button>新增章节</el-button></span>

      </div>
      <!--下面的返回内容带分页-->
      <div class="user-manage-info">
        <!--表格内容-->
        <template>
          <el-table :data="chapterInfo" border style="width: 100%">
            <el-table-column prop="index" label="序号" width="120"></el-table-column>
            <el-table-column prop="indexName" label="章节名" width="340"></el-table-column>
            <el-table-column prop="translator" label="翻译者" width="240"></el-table-column>
            <el-table-column prop="c1" label="更新时间" width="380"></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="setChapter(scope.$index, scope.row)">修改章节</el-button>



              </template>
            </el-table-column>
          </el-table>
        </template>
        <!--分页器-->
        <div class="page">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="totalRows"
            :page-size="pageSize"
            :current-page="pageNo"
            @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </div>
      <div class="dark" v-show="this.$store.state.newChapterDark" v-on:click="closeDark"></div>
      <div v-show="this.$store.state.newChapterDark">
        <addChapter></addChapter>
      </div>


  </div>
</template>
<script>
  import Vue from 'vue'
  import ajax from '../fun/ajax.js'
  import addChapter from '@/components/content/addChapter'
  export default{
    name: 'novelChapter',
    components:{addChapter},
    created(){
      this.novelInfo = this.$store.state.stateNovelInfo

      this.novelInfo.pageNo = 1
      this.novelInfo.pageSize = 10
      console.log(this.novelInfo)
      this.submit()

    },
    data(){
      return {
        novelInfo: '',
        count: '',
        chapterInfo:[{
          index:'',
          indexName:'',
          translator:'',
          c1:'',
        }
        ],
        /*分页器*/
        totalRows:0,
        pageSize:10,
        pageNo:1
      }
    },
    methods: {
      /*获取数据*/
      submit(){
        var that = this
        ajax.ajax({
          url: "/lonovel/admin/chaptermanager", //请求地址
          type: 'post',   //请求方式
          data: that.novelInfo, //请求参数
          dataType: "json",     // 返回值类型的设定
          async: true,   //是否异步
          success: function (response, xml) {
            that.chapterInfo = []
            var data = response.extend.page.list
            for(var i = 0 ; i < data.length ; i ++){
              that.chapterInfo.push(data[i])
            }
            that.totalRows = response.extend.page.total
          },
          fail: function (status) {
            alert("加载错误")
            console.log('状态码为' + status);   // 此处为执行成功后的代码
          }
        })
      },
      /*新增章节*/
      newChapter(){
        this.$store.commit('getChapterDark',true)
      },
      /*操作 修改章节*/
      setChapter(index, row) {
        console.log(index, row,"修改章节");
        this.$store.commit('getChapterDark',true)
      },
      /*关闭遮罩*/
      closeDark(){
        //this.show = false
        this.$store.commit('getChapterDark',false)
      },
      /*分页器方法*/
      /*点击分页器页码*/
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        Vue.set(this.novelInfo, "pageNo", val)
        this.submit()
      },
    },
  }

</script>
<style>
  .novel-chapter{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 900px;
    background-color: #ffffff;
    z-index: 2;
  }
  /*顶部*/
  .novel-chapter .top{
    width: 1190px;
    height: 60px;
    background-color: #8cc5ff;
  }
  .novel-chapter .title{
    font-size: 18px;
    line-height: 60px;
    margin-left: 20px;
    font-weight: bold;
    display: inline-block;
  }
  .novel-chapter .top div{
    float: right;
    line-height: 60px;
    display: inline-block;
    margin-right: 20px;

  }
  /*用户信息*/
  .novel-chapter .userinfo{
    margin-top: 20px;

  }
  .novel-chapter .userinfo p{
    float: left;
    margin-right: 20px;
    line-height: 40px;
  }
  .novel-chapter .userinfo .new-chapter{
    float: right;
    margin-right: 20px;
  }

  /*信息list*/
  .novel-chapter .user-manage-info{
    margin-top: 20px;
  }

  /*分页器*/
  .novel-chapter .user-manage-info .page{
    float: right;
    margin: 20px 20px 0 0;
  }


  .novel-chapter .dark{
    background-color: rgba(0,0,0,0.4);
    width: 1190px;
    height: 900px;
    position: absolute;
    top:0;
    left:0;
    z-index: 2;
  }

</style>
