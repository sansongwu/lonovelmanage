<template>
  <div class="sort-01">
    <div class="sort-01-sort-name clearfix">
      <div class="item">
        <span>分类名</span>
        <el-input v-model="input1" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>选择类目</span>
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
      </div>
    </div>
    <!--第一行-->
    <div class="sort-01-line-top clearfix">
      <div class="item">
        <span>顶部左边小说id</span>
        <el-input v-model="input2" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>顶部右边小说id</span>
        <el-input v-model="input3" placeholder="请输入内容"></el-input>
      </div>
    </div>

    <!--第二行-->
    <div class="sort-01-line-middle clearfix">
      <div class="item">
        <span>第一行01</span>
        <el-input v-model="input11" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>第一行02</span>
        <el-input v-model="input12" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>第一行03</span>
        <el-input v-model="input13" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>第一行04</span>
        <el-input v-model="input14" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>第一行05</span>
        <el-input v-model="input15" placeholder="请输入内容"></el-input>
      </div>
    </div>

    <!--第三行-->
    <div class="sort-01-line-bottom clearfix">
      <div class="item">
        <span>第二行01</span>
        <el-input v-model="input21" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>第二行02</span>
        <el-input v-model="input22" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>第二行03</span>
        <el-input v-model="input23" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>第二行04</span>
        <el-input v-model="input24" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>第二行05</span>
        <el-input v-model="input25" placeholder="请输入内容"></el-input>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'lonovel',
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        input1: '',
        input2: '',
        input3: '',
        input11: '',
        input12: '',
        input13: '',
        input14: '',
        input15: '',
        input21: '',
        input22: '',
        input23: '',
        input24: '',
        input25: '',
      }
    }
  }
</script>
<style>
  .sort-01{
    width: 1190px;
    height: 900px;
    background-color: burlywood;

  }
  .sort-01 .item {
    float: left;
  }
  .sort-01 .item input {
    width: 120px;
    height: 40px;
  }
  .clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}
  .clearfix{*+height:1%;}
</style>
