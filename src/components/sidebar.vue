<template>
  <el-menu
    default-active="0"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose">
    <router-link to="/">
      <el-menu-item index="0">
        <i class="el-icon-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
    </router-link>
    <router-link to="/usermanage">
      <el-menu-item index="1">
        <i class="el-icon-home"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
    </router-link>
    <router-link to="/financialManage">
    <el-menu-item index="2">
      <i class="el-icon-home"></i>
      <span slot="title">资金管理</span>
    </el-menu-item>
    </router-link>


    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>首页管理</span>
      </template>
        <router-link to="/indexClassify1"><el-menu-item index="1-1" v-on:click="setindexClassify(1)">类目1</el-menu-item></router-link>
        <router-link to="/indexClassify2"><el-menu-item index="1-2" v-on:click="setindexClassify(2)">类目2</el-menu-item></router-link>
        <router-link to="/indexClassify3"><el-menu-item index="1-3" v-on:click="setindexClassify(3)">类目3</el-menu-item></router-link>
        <router-link to="/indexClassify4"><el-menu-item index="1-4" v-on:click="setindexClassify(4)">类目4</el-menu-item></router-link>
    </el-submenu>

    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>内容管理</span>
      </template>
      <router-link to="/novelInfo"><el-menu-item index="2-1">小说信息</el-menu-item></router-link>
      <router-link to="/novelClassify"><el-menu-item index="2-2">小说分类</el-menu-item></router-link>
      <router-link to="/addNovelClassify"><el-menu-item index="2-3">添加小说分类</el-menu-item></router-link>
      <router-link to="/addNovel"><el-menu-item index="2-4">新增小说</el-menu-item></router-link>
      <router-link to="/addChapter"><el-menu-item index="2-5">新增章节</el-menu-item></router-link>

    </el-submenu>
  </el-menu>
</template>
<script>
  export default{
    name:'sidebar',
    methods: {
      /*首页管理 内容管理下拉*/
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },

      setindexClassify:function (data) {
        this.$store.commit('setIndexClassify',data)
      }
    }
  }
</script>
<style>

</style>
