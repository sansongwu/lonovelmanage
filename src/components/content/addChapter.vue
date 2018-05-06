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
            <span>请输入要增加小说的id:</span>
          </div>
          <div class="item-right">
            <input type="text" v-model="id">
            <el-button>提交</el-button>
          </div>

        </div>

        <!--提交之后显示的内容-->

        <!--书的名字展示-->
        <div class="item clearfix">
          <div class="item-left">
            <span>书名:</span>
          </div>
          <div class="item-right">
            <span>{{name}}</span>
          </div>
        </div>
        <!--序号选择-->
        <div class="item">
          <div class="item-left">
            <span>选择要新增的章节序号:</span>
          </div>
          <div class="item-right">
            <template>
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in chapterChoose"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
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
    data(){
      return {
        id:'',
        name:'上山打老虎',
        /*下拉框*/
        chapterChoose: [{
          value: 0,
          label: '不展示'
        }, {
          value: 1,
          label: '展示'
        }],
        value:'',
      }
    },
    methods:{

    }
  }
</script>
<style>
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
