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
              <el-select v-model="subObj.type" placeholder="请选择">
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
            <span>翻译者:</span>
            <input type="text" v-model="subObj.translater">
          </div>

          <!--账号状态下拉框-->
          <div class="item">
            <span>上下架状态:</span>
            <template>
              <el-select v-model="subObj.state" placeholder="请选择">
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
            :data="novelInfo"
            border
            style="width: 100%">
            <el-table-column
              prop="id"
              label="id"
              width="80">
            </el-table-column>
            <el-table-column
              prop="bookName"
              label="书名"
              width="100">
            </el-table-column>
            <el-table-column
              prop="author"
              label="作者"
              width="160">
            </el-table-column>
            <el-table-column
              prop="bookSummary"
              label="简介"
              width="160">
            </el-table-column>
            <el-table-column
              prop="state"
              label="上下架状态"
              width="160">
            </el-table-column>
            <el-table-column
              prop="lastTime"
              label="最后一次更新时间+"
              width="120">
            </el-table-column>
            <el-table-column
              prop="realRead"
              label="实际阅读次数"
              width="80">
            </el-table-column>
            <el-table-column
              prop="showRead"
              label="展示阅读次数"
              width="120 ">
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleUpdown(scope.$index, scope.row)">上下架</el-button>

                <router-link to="/novelInfo/edit">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                </router-link>

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
            :page-size="subObj.pageSize"
            :current-page="subObj.pageNo"
            @current-change="handleCurrentChange">
          </el-pagination>
        </div>

      </div>

    </div>
    <!--编辑信息 子路由-->
    <router-view></router-view>
  </div>
</template>
<script>
  import ajax from '../fun/ajax.js'
  export default{
    name:'novelInfo',
    created(){
      this.init()
      console.log("小说信息组件创建")
    },
    data(){
      return{
        /*小说分类下拉*/
        novelClassify: [/*{classId:'1',label:"武"},{classId:'2',label:"侠"}*/],
        //classId: '',
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
        //state: '',

        /*其他数据*/
        //pageNo:1,
        //pageSize:10,
        /*提交部分*/
        subObj:{
          id:'',
          bookName:'',
          author:'',
          type:'',         //this.classId,
          translater:'',
          state:'',            //this.state,
          pageNo:1,
          pageSize:10
        },

        /*************************内容部分数据*************************/
        /*返回的对象数组*/
        novelInfo:[{
          id:'',
          bookName:'',
          author:'',
          bookSummary:'',
          state:'',
          lastTime:'',
          realRead:'',
          showRead:''
        }],
        totalRows:100
      }
    },
    methods:{
      /*初始化下拉框选项*/
      init(){
        /*测试代码*/
        /*var data = {data:[{id:'3',typeName:"武侠"}]}
        for(var i = 0 ; i < data.data.length ; i ++){
          var obj = {}
          obj.classId = data.data[i].id
          obj.label = data.data[i].typeName
          console.log(obj)
          this.novelClassify.push(obj)
        }*/


        var that = this
        ajax.ajax({
          url: "/lonovel/types", //请求地址
          type: 'post',   //请求方式
          data: {}, //请求参数
          dataType: "json",     // 返回值类型的设定
          async: true,   //是否异步
          success: function (response, xml) {
            var data = response.extend.list
            that.$store.commit('removeNovelClassify')
            for(var i = 0 ; i < data.length ; i ++){
              var obj = {}
              obj.classId = data[i].id
              obj.label = data[i].typeName
              that.novelClassify.push(obj)
              that.$store.commit('getnovelClassify',data[i])
            }
          },
          fail: function (status) {
            console.log('状态码为' + status);   // 此处为执行成功后的代码
          }
        })
      },
      submit(){
        this.novelInfo = []
        var that = this
        ajax.ajax(
          {
            url: "/lonovel/admin/novelmanager", //请求地址
            type: 'post',   //请求方式
            data: that.subObj, //请求参数
            dataType: "json",     // 返回值类型的设定
            async: true,   //是否异步
            success: function (response, xml) {
              var data = response.extend.page.list
              that.totalRows = response.extend.page.total
              for(var i = 0 ; i < data.length ; i ++ ){
                that.novelInfo.push(data[i])
              }
            },
            fail: function (status) {
              console.log('状态码为' + status);   // 此处为执行成功后的代码
            }
          }
        )
      },

      /****************************展示部分的方法****************************/
      /*上下架  编辑  操作*/
      /*上下架  ajax*/
      handleUpdown(index, row) {
        console.log(index, row,"上下架");
        if(row.state==0){
          console.log(row.state);
          ajax.setState({
            url:'',
            id:this.id,
            state:1,   //要修改成的状态的值
            targetRow:row
          })
        }
      },
      /*编辑  ajax*/
      handleEdit(index, row) {
        console.log(index, row,"编辑");
        /*传值*/
        this.$store.commit('getNovelInfo',row)
        //this.$store.commit('getnovelClassify',this.novelClassify)
      },

      /*分页器方法*/
      /*点击分页器页码*/
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        //Vue.set(this.subObj, "pageNo", val)
        this.subObj.pageNo = val
        console.log(this.subObj)
        this.submit()
      },
    }
  }
</script>
<style>
  /*大局观*/
  .novel-info{
    position: relative;
  }
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
