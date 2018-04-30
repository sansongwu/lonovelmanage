<template>
  <div class="financialManageDetail">
    <!--顶部条开始-->
    <div class="top">
      <h1 class="title">资金明细</h1>
      <router-link to="/financialManage"><div><el-button>退出明细</el-button></div></router-link>
    </div>
    <div class="userinfo clearfix">
      <p>用户邮箱:{{userInfo.email}}</p>
      <p>脸书:{{userInfo.facebook}}</p>
      <p>推特:{{userInfo.twitter}}</p>
      <p>google:{{userInfo.google}}</p>
      <p>资金状态:{{userInfo.money}}</p>
      <p>用户状态:{{userInfo.state}}</p>
    </div>
    <!--下面的返回内容带分页-->
    <div class="user-manage-info">
      <!--表格内容-->
      <template>
        <el-table :data="financialDetail" border style="width: 100%">
          <el-table-column prop="id" label="id" width="180"></el-table-column>
          <el-table-column prop="nickname" label="昵称" width="140"></el-table-column>
          <el-table-column prop="beginMoney" label="初始资金" width="80"></el-table-column>
          <el-table-column prop="moneyChange" label="变动资金" width="80"></el-table-column>
          <el-table-column prop="action" label="变动的具体行为" width="340"></el-table-column>
          <el-table-column prop="balance" label="剩余资金" width="80"></el-table-column>
          <el-table-column prop="changeTime" label="变动时间" width="280"></el-table-column>
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
</template>
<script>
  import Vue from 'vue'
  import ajax from '../fun/ajax.js'
  export default{
    name: 'financialManageDetail',

    /*挂载传值方法*/
    /*created (){
      this.userInfo = ''
      var that = this
      bus.$on('userInfo2', (data)=> {
        console.log(data)
        that.userInfo = data
        /!*for (var key in data) {
          console.log(key)
          console.log(data[key])
          console.log(that.userInfo)
          Vue.set(that.userInfo, key, data[key])
        }*!/
        console.log("加载了")
      })
    },*/
    created(){
      this.userInfo = this.$store.state.stateUserInfo
      console.log(this.userInfo)

      this.userInfo.pageNo = 1
      this.userInfo.pageSize = 10
      console.log(this.userInfo)
      this.submit()
      /*var that = this
      ajax.ajax(
        {
          url: "/lonovel/admin/businessdetail", //请求地址
          type: 'post',   //请求方式
          data: that.userInfo, //请求参数
          dataType: "json",     // 返回值类型的设定
          async: true,   //是否异步
          success: function (response, xml) {
            that.totalRows = response.extend.page.total
            var data = response.extend.page.list
            for(var i = 0 ; i < data.length ; i ++){
              that.financialDetail.push(data[i])
            }

          },
          fail: function (status) {
            console.log('状态码为' + status);   // 此处为执行成功后的代码
          }
        }
      )*/
    },
    data(){
      return {
        userInfo: '',
        count: '',
        financialDetail:[{
          id:'',
          beginMoney:'',
          moneyChange:'',
          action:'',
          balance:'',
          changeTime:'',
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
          url: "/lonovel/admin/businessdetail", //请求地址
          type: 'post',   //请求方式
          data: that.userInfo, //请求参数
          dataType: "json",     // 返回值类型的设定
          async: true,   //是否异步
          success: function (response, xml) {
            that.financialDetail = []
            var data = response.extend.page.list
            that.totalRows = response.extend.page.total
            for(let i = 0 ; i < data.length ; i++){
              that.financialDetail.push(data[i])
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
        Vue.set(this.userInfo, "pageNo", val)
        this.submit()
        /*var that = this
        ajax.ajax(
          {
            url: "/lonovel/admin/usermanager", //请求地址
            type: 'post',   //请求方式
            data: that.obj, //请求参数
            dataType: "json",     // 返回值类型的设定
            async: true,   //是否异步
            success: function (response, xml) {
              /!*var response = JSON.parse(response)*!/
              that.userInfo = []
              var data = response.extend.page.list
              that.totalRows = response.extend.page.total
              for(let i = 0 ; i < data.length ; i++){
                that.userInfo.push(data[i])
              }
            },
            fail: function (status) {
              console.log('状态码为' + status);   // 此处为执行成功后的代码
            }
          }
        )*/
      },
    },
  }
</script>
<style>
  .financialManageDetail{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 900px;
    background-color: #ffffff;
    z-index: 2;
  }
  /*顶部*/
  .financialManageDetail .top{
    width: 1190px;
    height: 60px;
    background-color: #8cc5ff;
  }
  .financialManageDetail .title{
    font-size: 18px;
    line-height: 60px;
    margin-left: 20px;
    font-weight: bold;
    display: inline-block;
  }
  .financialManageDetail .top div{
    float: right;
    line-height: 60px;
    display: inline-block;
    margin-right: 20px;

  }
  /*用户信息*/
  .financialManageDetail .userinfo{
    margin-top: 20px;

  }
  .financialManageDetail .userinfo p{
    float: left;
    margin-right: 20px;
  }

  /*信息list*/
  .financialManageDetail .user-manage-info{
    margin-top: 20px;
  }

  /*分页器*/
  .financialManageDetail .user-manage-info .page{
    float: right;
    margin: 20px 20px 0 0;
  }
</style>
