<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="主键" width="180"></el-table-column>
    <el-table-column prop="username" label="账号" width="180"></el-table-column>
    <el-table-column prop="nickname" label="昵称"></el-table-column>
    <el-table-column prop="headPortraitUrl" label="头像"></el-table-column>
    <el-table-column prop="status" label="状态"></el-table-column>
    <el-table-column prop="email" label="邮箱"></el-table-column>
    <el-table-column prop="phone" label="手机"></el-table-column>
    <el-table-column prop="genTime" label="创建时间"></el-table-column>
    <el-table-column prop="count" label="登录次数"></el-table-column>
  </el-table>
</template>
<script>
import * as userApi from './api/user'
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    query: function() {
      userApi.page_list(0, 10).then(res => {
        if (res.success) {
          this.tableData = res.queryResult.list;
        }
      });
    }
  },mounted(){
    this.query();
  }
};
</script>
<style scoped>
</style>


