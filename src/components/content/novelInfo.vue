<template>
  <div class="novel-info">
    <!--顶部条开始-->
    <div class="top">
      <h1 class="title">小说信息</h1>
    </div>
    <!--顶部条结束-->
    <!--内容开始-->
    <div class="um-content">
      <!--上面提交的表单部分-->
      <div class="form">
        <!--表格最上行-->
        <div class="line-top clearfix">
          <div class="item">
            <span>ID:</span>
            <input type="text" v-model="subObj.id">
          </div>
          <div class="item">
            <span>书名:</span>
            <input type="text" v-model="subObj.bookName">
          </div>
          <div class="item">
            <span>作者:</span>
            <input type="text" v-model="subObj.author">
          </div>
          <div class="item">
            <span>分类:</span>
            <template>
              <el-select v-model="classId" placeholder="请选择">
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
        <!--表格中间行-->
        <div class="line-middle clearfix">

          <div class="item">
            <span>翻译者:+</span>
            <input type="text" v-model="subObj.translater">
          </div>

          <!--账号状态下拉框-->
          <div class="item">
            <span>上下架状态:</span>
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
      <!--<div class="user-manage-info">
        &lt;!&ndash;表格内容&ndash;&gt;
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
        &lt;!&ndash;分页器&ndash;&gt;
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

      </div>-->

    </div>
  </div>
</template>
<script>
  import ajax from '../fun/ajax.js'
  export default{
    name:'novelInfo',
    created(){
      this.init()
    },
    data(){
      return{
        /*小说分类下拉*/
        novelClassify: [{classId:11,lable:"武侠"},{classId:11,lable:"武侠"}],
        classId: '',
        /*上下架状态下拉*/
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

        /*其他数据*/
        pageNo:1,
        pageSize:10,
        /*提交部分*/
        subObj:{
          id:'',
          bookName:'',
          author:'',
          type:this.classId,
          translater:'',
          state:this.state,
          pageNo:this.pageNo,
          pageSize:this.pageSize
        }


      }
    },
    methods:{
      init(){
        var data = {data:[{id:'11',typeName:"武侠"}]}
        for(var i = 0 ; i < data.data.length ; i ++){
          var obj = {}
          obj.classId = data.data[i].id
          obj.label = data.data[i].typeName
          console.log(obj)
          this.novelClassify.push(obj)
        }


        /*var that = this
        ajax.ajax({
          url: "/lonovel/admin/usermanager", //请求地址
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
        })*/
      },
      submit(){
        console.log(this.subObj)
        console.log(this.novelClassify)
      }
    }
  }
</script>
<style>
  /*顶部*/
  .novel-info .top{
    width: 1190px;
    height: 60px;
    background-color: #8cc5ff;
  }
  .novel-info .title{
    font-size: 18px;
    line-height: 60px;
    margin-left: 20px;
    font-weight: bold;
  }
  /*提交表单*/
  .novel-info .form{
    background-color: #ffffff;
    margin-top: 20px;
    border-bottom: solid 1px #cccccc;
    padding-bottom: 20px;
  }
  .novel-info .form .item input{
    height: 20px;
    outline: none;
    border-radius: 4px;
    border: solid 2px #dddddd;
  }
  .novel-info .form .line-top{

  }
  .novel-info .form .line-middle{
    margin-top: 20px;

  }
  .novel-info .form .line-bottom{
    margin-top: 20px;

  }
  .novel-info .form .signin-time{
    margin-left: 20px;
  }
  .novel-info .form .item{
    float: left;
    margin-left: 20px;
  }
  .novel-info .form .time{
    margin-left: 20px;
  }
  .novel-info .form .item .el-select{
    width: 100px;
  }
  .novel-info .form .btn-submit{
    float: right;
    margin-right: 30px;
  }

  /*********************表格开始*********************/
  .novel-info .user-manage-info .has-gutter th{
    text-align: center;
  }
  .novel-info .user-manage-info td{
    padding: 10px 0;
    overflowX: scroll;
    white-space:nowrap;
  }
  .novel-info .user-manage-info .page{
    float: right;
    margin: 20px 20px 0 0;
  }
</style>
