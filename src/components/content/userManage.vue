<template>
  <div class="user-manage">
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
            <span>用户昵称</span>
            <input type="text" v-model="nickname">
          </div>
          <div class="item">
            <span>用户邮箱</span>
            <input type="text" v-model="email">
          </div>
          <div class="item">
            <span>Facebook</span>
            <input type="text" v-model="facebook">
          </div>
          <div class="item">
            <span>Twitter</span>
            <input type="text" v-model="twitter">
          </div>
        </div>
        <!--表格中间行-->
        <div class="line-middle clearfix">

          <div class="item">
            <span>Google+</span>
            <input type="text" v-model="google">
          </div>
          <!--用户等级下拉框-->
          <!--<div class="item">
            <span>{{value}}</span>
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
          </div>-->
          <!--资金范围-->
          <div class="item">
            <span>资金范围</span>
            <input type="text" v-model="moneyRangeMin">
            <span>~</span>
            <input type="text" v-model="moneyRangeMax">
          </div>
        </div>
        <!--表格最下行-->
        <!--注册时间 起始日期-->
        <div class="line-bottom clearfix">
          <div class="signin-time lf">
            <!--选择日期-->
            <div class="date lf">
              <template>
                <div class="block">
                  <span class="demonstration">注册时间</span>
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

          <!--账号状态下拉框-->
          <div class="item">
            <span>账号状态</span>
            <template>
              <el-select v-model="state" placeholder="请选择">
                <el-option
                  v-for="item in userState"
                  :key="item.state"
                  :label="item.label"
                  :value="item.state">
                </el-option>
              </el-select>
            </template>
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
          <el-table
            :data="userInfo"
            border
            style="width: 100%">
            <el-table-column
              prop="id"
              label="id"
              width="80">
            </el-table-column>
            <el-table-column
              prop="nickname"
              label="昵称"
              width="100">
            </el-table-column>
            <el-table-column
            prop="email"
            label="邮箱"
            width="160">
            </el-table-column>
            <el-table-column
              prop="facebook"
              label="Facebook"
              width="160">
            </el-table-column>
            <el-table-column
              prop="twitter"
              label="Twitter"
              width="160">
            </el-table-column>
            <el-table-column
              prop="google"
              label="google+"
              width="120">
            </el-table-column>
            <el-table-column
              prop="money"
              label="用户资金"
              width="80">
            </el-table-column>
            <el-table-column
              prop="registerTime"
              label="注册时间"
              width="120 ">
            </el-table-column>
            <el-table-column
              prop="state"
              label="状态"
              width="40">
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">恢复</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">停封</el-button>
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
    name: 'userManage',
    data() {
      return {
        /*用户状态下拉*/
        userState: [{
          state: '0',
          label: '停封'
        }, {
          state: '1',
          label: '正常'
        }, {
          state: '2',
          label: '异常'
        }],
        state: '',

        /*日期选择*/

        time_date: '',
        /*时间选择*/
        time_time: ['00:00:00', '00:00:00'],
        registerTime: [],
        /*其他提交的数据*/
        nickname: '',
        email: '',
        facebook: '',
        twitter: '',
        google: '',
        moneyRangeMin: '',
        moneyRangeMax: '',
        /*分页数据*/
        pageNo: 1,
        pageSize: 10,

        /*提交对象*/
        obj: {},
        /*提交的表单部分结束*/

        /*********************返回的内容开始*********************/
        userInfo: [],
        /*总条数*/
        totalRows: 100,
        id: 0
      }
    },
    methods: {
      /*提交按钮提交  生成提交数据*/
      submit: function () {
        if (true) {
          Vue.set(this.obj, "nickname", this.nickname)
        } else {
          alert("用户昵称输入有误")
        }
        if (true) {
          Vue.set(this.obj, "email", this.email)
        } else {
          alert("用户昵称输入有误")
        }
        if (true) {
          Vue.set(this.obj, "facebook", this.facebook)
        } else {
          alert("用户昵称输入有误")
        }
        if (true) {
          Vue.set(this.obj, "twitter", this.twitter)
        } else {
          alert("用户昵称输入有误")
        }
        if (true) {
          Vue.set(this.obj, "google", this.google)
        } else {
          alert("用户昵称输入有误")
        }
        if (true) {
          Vue.set(this.obj, "moneyRangeMin", this.moneyRangeMin)
        } else {
          alert("用户昵称输入有误")
        }
        if (true) {
          Vue.set(this.obj, "moneyRangeMax", this.moneyRangeMax)
        } else {
          alert("用户昵称输入有误")
        }
        if (JSON.stringify(this.registerTime).indexOf('undefined') == -1) {
          Vue.set(this.obj, "registerTime", this.registerTime)
        } else {
          alert("日期需要完整")
          return false
        }
        if (true) {
          Vue.set(this.obj, "state", this.state)
        } else {
          alert("用户昵称输入有误")
        }
        /*分页数据*/
        if (true) {
          Vue.set(this.obj, "pageNo", this.pageNo)
        } else {
          alert("用户昵称输入有误")
        }
        if (true) {
          Vue.set(this.obj, "pageSize", this.pageSize)
        } else {
          alert("用户昵称输入有误")
        }
        console.log(this.obj)
        console.log(JSON.stringify(this.obj))

        var that = this
        ajax.ajax(
          {
            //url: "/lonovel/admin/usermanager", //请求地址
            //url: "/news/index/usermanage", //请求地址
            url: "/lonovel/admin/usermanager", //请求地址
            type: 'post',   //请求方式
            data: that.obj, //请求参数
            dataType: "json",     // 返回值类型的设定
            async: true,   //是否异步
            success: function (response, xml) {
              /*var response = JSON.parse(response)*/
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
        )
      },
      /*停封 恢复 操作*/
      /*恢复  ajax*/
      handleEdit(index, row) {
        console.log(index, row,"恢复");
        if(row.state==0){
          ajax.setState({
            url:'/lonovel/admin/operateuser',
            id:row.id,
            state:1,   //要修改成的状态的值
            targetRow:row
          })
        }
      },
      /*停封  ajax*/
      handleDelete(index, row) {
        console.log(index, row,"停封");
        if(row.state==1){
          /*console.log(row.state);
          var changeState = 0
          ajax.ajax(
            {
              url: "/lonovel/admin/operateuser", //请求地址
              type: 'post',   //请求方式
              data: {id:row.id,state:changeState}, //请求参数
              dataType: "json",     // 返回值类型的设定
              async: true,   //是否异步
              success: function (response, xml) {
                if(response.code == 200){
                  row.state = changeState
                }
              },
              fail: function (status) {
                alert('状态码为' + status);   // 此处为执行成功后的代码
              }
            }
          )*/

          ajax.setState({
            url:'/lonovel/admin/operateuser',
            id:row.id,
            state:0,   //要修改成的状态的值
            targetRow:row
          })
        }
      },
      /*分页器方法*/
      /*点击分页器页码*/
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        Vue.set(this.obj, "pageNo", val)
        console.log(this.obj)
        var that = this
        ajax.ajax(
          {
            url: "/lonovel/admin/usermanager", //请求地址
            type: 'post',   //请求方式
            data: that.obj, //请求参数
            dataType: "json",     // 返回值类型的设定
            async: true,   //是否异步
            success: function (response, xml) {
              /*var response = JSON.parse(response)*/
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
        )
      },
      /*this.ajax*/
      /*ajax:function (url,data,method,success) {
        // 异步对象
        var ajax = new XMLHttpRequest();

        // get 跟post  需要分别写不同的代码
        if (method=='get') {
          // get请求
          if (data) {
            // 如果有值
            url+='?';
            url+=data;
          }else{

          }
          // 设置 方法 以及 url
          ajax.open(method,url);

          // send即可
          ajax.send();
        }else {
          // post请求
          // post请求 url 是不需要改变
          ajax.open(method, url);

          // 需要设置请求报文
          ajax.setRequestHeader("Content-type", "application/json;charset=utf-8");

          // 判断data send发送数据
          if (data) {
            // 如果有值 从send发送
            ajax.send(data);
          } else {
            // 木有值 直接发送即可
            ajax.send();
          }
        }
      }*/
    },
    watch: {
      time_date: function () {
        this.registerTime[0] = this.time_date[0] + " " + this.time_time[0]
        this.registerTime[1] = this.time_date[1] + " " + this.time_time[1]
      },
      time_time: function () {
        this.registerTime[0] = this.time_date[0] + " " + this.time_time[0]
        this.registerTime[1] = this.time_date[1] + " " + this.time_time[1]
      }
    }
  }
</script>
<style>
  /*顶部*/
  .user-manage .top{
  width: 1190px;
  height: 60px;
  background-color: #8cc5ff;
}
  .user-manage .title{
    font-size: 18px;
    line-height: 60px;
    margin-left: 20px;
    font-weight: bold;
  }
  /*提交表单*/
  .user-manage .form{
    background-color: #ffffff;
    margin-top: 20px;
    border-bottom: solid 1px #cccccc;
    padding-bottom: 20px;
  }
  .user-manage .form .item input{
    height: 20px;
    outline: none;
    border-radius: 4px;
    border: solid 2px #dddddd;
  }
  .user-manage .form .line-top{

  }
  .user-manage .form .line-middle{
  margin-top: 20px;

}
  .user-manage .form .line-bottom{
  margin-top: 20px;

}
  .user-manage .form .signin-time{
    margin-left: 20px;
  }
  .user-manage .form .item{
    float: left;
    margin-left: 20px;
  }
  .user-manage .form .time{
    margin-left: 20px;
  }
  .user-manage .form .item .el-select{
    width: 100px;
  }
  .user-manage .form .btn-submit{
    float: right;
    margin-right: 30px;
  }

  /*********************表格开始*********************/
  .user-manage .user-manage-info .has-gutter th{
    text-align: center;
  }
  .user-manage .user-manage-info td{
    padding: 10px 0;
    overflowX: scroll;
    white-space:nowrap;
  }
  .user-manage .user-manage-info .page{
    float: right;
    margin: 20px 20px 0 0;
  }
</style>
