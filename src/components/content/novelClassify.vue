<template>
  <div class="novol-classify">
    <!--顶部条开始-->
    <div class="top">
      <h1 class="title">小说分类</h1>
    </div>
    <!--顶部条结束-->
    <!--内容开始-->
    <div class="content">
      <!--表格内容-->
      <template>
        <el-table :data="novelclassify" border style="width: 100%">
          <el-table-column prop="id" label="id" width="288"></el-table-column>
          <el-table-column prop="name" label="分类名称" width="300"></el-table-column>
          <el-table-column prop="num" label="小说数量" width="300"></el-table-column>

          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <router-link to="/novelClassify/edit">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              </router-link>
              <el-button size="mini" @click="handleRecover(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import ajax from '../fun/ajax.js'
  export default{
    name:'novolClassify',
    created(){
      var that = this
      ajax.ajax({
        url: "/lonovel/admin/noveltypes", //请求地址
        type: 'post',   //请求方式
        data: {}, //请求参数
        dataType: "json",     // 返回值类型的设定
        async: true,   //是否异步
        success: function (response, xml) {
          console.log(response)
          var data = response.extend.list
          for(var i = 0 ; i < data.length ; i++ ){
            var obj = {
              id:data[i].id,
              name:data[i].name,
              num:data[i].num,
            }
            that.novelclassify.push(obj)
          }
          console.log(that.novelclassify)
        },
        fail: function (status) {
          console.log('状态码为' + status);   // 此处为执行成功后的代码
        }
      })
    },
    data(){
      return{
        obj:{

          pageNo:1,
          pageSize:10
        },
        /*表格数据*/
        novelclassify:[{
            id:'',
            name:'',
            num:'',
          }]
      }
    },
    methods:{
      /*表格操作方法*/
      /*编辑分类*/
      handleEdit(index,row){
        console.log(index,row,'编辑')
        var obj = {id:row.id,name:row.name}
        this.$store.commit('setNovelClassify',obj)
      },
      /*删除分类*/
      handleRecover(index,row){
        console.log(index,row,'删除')

        ajax.ajax({
          url: "", //请求地址
          type: 'post',   //请求方式
          data: {id:row.id,name:row.name}, //请求参数
          dataType: "json",     // 返回值类型的设定
          async: true,   //是否异步
          success: function (response, xml) {
            alert("修改成功")
          },
          fail: function (status) {
            console.log('状态码为' + status);   // 此处为执行成功后的代码
          }
        })
      },

    }
  }
</script>
<style>
/*顶部*/
/*顶部*/
.novol-classify .top{
  width: 1190px;
  height: 60px;
  background-color: #8cc5ff;
}
.novol-classify .title{
  font-size: 18px;
  line-height: 60px;
  margin-left: 20px;
  font-weight: bold;
}
</style>
