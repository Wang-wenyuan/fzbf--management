<template>
  <el-container>
    <!--顶部菜单-->
    <el-header>
      <!--logo-->
      <el-aside width="200px" :style="note">
        logo
      </el-aside>
      <!--其他区域-->
      <el-aside></el-aside>
    </el-header>
    <!--中部--->
    <el-container style="height: 630px; border: 1px solid #eee">
      <!--左边导航栏-->
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <!--控制默认需要展开的-->
        <el-menu :default-openeds="[]" :default-active="$route.path" router>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>首页
            </template>
            <el-menu-item-group>
              <el-menu-item index="/">首页</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-message"></i>管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="/user">用户管理</el-menu-item>
              <el-menu-item index="/user2">用户管理2</el-menu-item>
              <el-menu-item index="1-1">选项3</el-menu-item>
              <el-menu-item index="1-2">选项4</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-message"></i>导航二
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
              <el-menu-item index="1-1">选项3</el-menu-item>
              <el-menu-item index="1-2">选项4</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-message"></i>导航三
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
              <el-menu-item index="1-1">选项3</el-menu-item>
              <el-menu-item index="1-2">选项4</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-message"></i>导航四
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
              <el-menu-item index="1-1">选项3</el-menu-item>
              <el-menu-item index="1-2">选项4</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-message"></i>导航一
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
              <el-menu-item index="1-1">选项3</el-menu-item>
              <el-menu-item index="1-2">选项4</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--右边区域-->
      <el-container>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <!--底部-->
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
     note: {
            backgroundImage: "url(" + require("../assets/logo.png") + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "auto auto",
            marginTop: "cover",
            height: "60px"
          }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header {
  background-color: #02b9e3;
  color: #333;
  line-height: 60px;
  padding-left: 0px;
}

.el-aside {
  color: #333;
}
.el-footer {
  background-color: #02b9e3;
  line-height: 60px;
}
 .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 60px;
  }
</style>
