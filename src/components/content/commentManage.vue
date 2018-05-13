<template>
  <div class="comment-manage">
    <!--顶部条开始-->
    <div class="top">
      <h1 class="title">用户管理</h1>
    </div>
    <!--顶部条结束-->
    <!--用户管理内容开始-->
    <div class="um-content">
      <!--上面提交的表单部分-->
      <div class="form">
        <!--表格最上行-->
        <div class="line-top clearfix">
          <div class="item">
            <span>书名:</span>
            <input type="text" v-model="id">
          </div>
          <div class="item">
            <span>书id:</span>
            <input type="text" v-model="userName">
          </div>
          <div class="item">
            <span>用户名:</span>
            <input type="text" v-model="novelName">
          </div>
          <div class="item">
            <span>评论内容:</span>
            <input type="text" v-model="content">
          </div>
        </div>

        <!--表格最下行-->
        <div class="line-bottom clearfix">
          <!--注册时间 起始日期-->
          <div class="signin-time lf">
            <!--选择日期-->
            <div class="date lf">
              <template>
                <div class="block">
                  <span class="demonstration">评论时间:</span>
                  <el-date-picker
                    v-model="time_date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd">
                    <!--:picker-options="pickerOptions2">-->
                    <!--@change="setDate"-->

                  </el-date-picker>
                </div>
              </template>
            </div>

            <!--选择时间-->
            <div class="time lf">
              <template>
                <el-time-picker
                  is-range
                  v-model="time_time"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  placeholder="选择时间范围"
                  value-format="HH:mm:ss">
                  <!--@change="setTime"-->
                </el-time-picker>
              </template>
            </div>
          </div>


          <div class="btn-submit">
            <el-button type="info" v-on:click="submit">查询</el-button>
          </div>

        </div>
      </div>
      <!--下面的返回内容带分页-->
      <div class="user-manage-info">
        <!--表格内容-->
        <template>
          <el-table :data="commentInfo" border style="width: 100%">
            <el-table-column prop="userName" label="用户名称" width="80"></el-table-column>
            <el-table-column prop="novelName" label="小说名称" width="100"></el-table-column>
            <el-table-column prop="content" label="评论内容" width="160"></el-table-column>
            <el-table-column prop="commentTime" label="评论时间" width="160"></el-table-column>

            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleBrowse(scope.$index, scope.row)">查看完整评论</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import ajax from '../fun/ajax.js'
  export default{
    name: 'commentManage',
    data() {
      return {


        /*日期选择*/

        time_date: '',
        /*时间选择*/
        time_time: ['00:00:00', '00:00:00'],
        commentTime: [],
        /*其他提交的数据*/
        id:'',
        userName:'',
        novelName:'',
        content:'',
        /*分页数据*/
        pageNo: 1,
        pageSize: 10,

        /*提交对象*/
        obj: {},
        /*提交的表单部分结束*/

        /*********************返回的内容开始*********************/
        commentInfo: [
          {
            userName:'',
            novelName:'',
            content:'',
            commentTime:'',
            commentId:'',
          }
        ],
        /*总条数*/
        totalRows: 100,
      }
    },
    methods: {
      /*提交按钮提交  生成提交数据*/
      submit: function () {
        var that = this
        var data = {
          id:this.id,
          userName:this.userName,
          novelName:this.novelName,
          content:this.content,
          commentTime:this.commentTime,
          pageNo:this.pageNo,
          pageSize:this.pageSize,
        }
        console.log(data)
        ajax.ajax({
          url: "/lonovel/admin/commentmanager", //请求地址
          type: 'post',   //请求方式
          data: data, //请求参数
          dataType: "json",     // 返回值类型的设定
          async: true,   //是否异步
          success: function (response, xml) {
            that.commentInfo = []
            var data = response.extend.page.list
            for(var i = 0 ; i < data.length ; i ++){
              that.commentInfo.push(data[i])
            }
            that.totalRows = response.extend.page.total
          },
          fail: function (status) {
            console.log('状态码为' + status);   // 此处为执行成功后的代码
          }
        })
      },
      /*浏览全部 删除 操作*/
      /*浏览全部*/
      handleBrowse(index, row) {
        console.log(index, row,"浏览全部");


      },
      /*删除*/
      handleDelete(index, row) {
        console.log(index, row,"删除");
        var that = this
        ajax.ajax({
          url: "/lonovel/admin/deletecomment", //请求地址
          type: 'post',   //请求方式
          data:{commentId:row.commentId} , //请求参数
          dataType: "json",     // 返回值类型的设定
          async: true,   //是否异步
          success: function (response, xml) {
            if(response.code == 200){
              alert("删除成功")
              that.submit()
            }else{
              alert("删除失败")
            }

          },
          fail: function (status) {
            console.log('状态码为' + status);   // 此处为执行成功后的代码
          }
        })
      },
      /*分页器方法*/
      /*点击分页器页码*/
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageNo = val
        this.submit()
      },
    },
    watch: {
      time_date: function () {
        this.commentTime[0] = this.time_date[0] + " " + this.time_time[0]
        this.commentTime[1] = this.time_date[1] + " " + this.time_time[1]
      },
      time_time: function () {
        this.commentTime[0] = this.time_date[0] + " " + this.time_time[0]
        this.commentTime[1] = this.time_date[1] + " " + this.time_time[1]
      }
    }
  }
</script>
<style>
  /*顶部*/
  .comment-manage .top{
    width: 1190px;
    height: 60px;
    background-color: #8cc5ff;
  }
  .comment-manage .title{
    font-size: 18px;
    line-height: 60px;
    margin-left: 20px;
    font-weight: bold;
  }
  /*提交表单*/
  .comment-manage .form{
    background-color: #ffffff;
    margin-top: 20px;
    border-bottom: solid 1px #cccccc;
    padding-bottom: 20px;
  }
  .comment-manage .form .item input{
    height: 20px;
    outline: none;
    border-radius: 4px;
    border: solid 2px #dddddd;
  }
  .comment-manage .form .line-top{

  }
  .comment-manage .form .line-middle{
    margin-top: 20px;

  }
  .comment-manage .form .line-bottom{
    margin-top: 20px;

  }
  .comment-manage .form .signin-time{
    margin-left: 20px;
  }
  .comment-manage .form .item{
    float: left;
    margin-left: 20px;
  }
  .comment-manage .form .time{
    margin-left: 20px;
  }
  .comment-manage .form .item .el-select{
    width: 100px;
  }
  .comment-manage .form .btn-submit{
    float: right;
    margin-right: 30px;
  }

  /*********************表格开始*********************/
  .comment-manage .user-manage-info .has-gutter th{
    text-align: center;
  }
  .comment-manage .user-manage-info td{
    padding: 10px 0;
    overflowX: scroll;
    white-space:nowrap;
  }
  .comment-manage .user-manage-info .page{
    float: right;
    margin: 20px 20px 0 0;
  }
</style>
