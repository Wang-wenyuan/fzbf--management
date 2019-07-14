<template>
  <div>
    <el-row style="float:left;">
      <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <el-button type="primary">修改</el-button>
      <el-button type="primary">删除</el-button>
    </el-row>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="账号">
        <el-input v-model="formInline.username" placeholder></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="formInline.nickname" placeholder></el-input>
      </el-form-item>
      <el-form-item label="账号状态">
        <el-select v-model="formInline.status" placeholder="请选择">
          <el-option label="全部" value="2"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="主键" width="180"></el-table-column>
      <el-table-column prop="username" label="账号" width="180"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
      <el-table-column prop="headPortraitUrl" label="头像" width="180"></el-table-column>
      <el-table-column prop="status" label="状态" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="phone" label="手机" width="180"></el-table-column>
      <el-table-column prop="genTime" label="创建时间" width="180"></el-table-column>
      <el-table-column prop="count" label="登录次数" width="180"></el-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      :page-size="this.params.size"
      v-on:current-change="changePage"
      :total="total"
      :current-page="this.params.page"
      style="float:right;"
    ></el-pagination>
  </div>
</template>


<script>
import * as userApi from "./api/public_user";
export default {
  data() {
    return {
      tableData: [],
      total: 50,
      params: {
        page: 1, //页码
        size: 10 //每页显示个数
      },
      formInline: {
        //搜索条件
        username: "",
        nickname: "",
        status: ""
      },
      dialogFormVisible: false, //弹出页面
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    query: function() {
      let params1 = {};
      params1.isAdmin = "0";
      if (this.formInline.status != "" && this.formInline.status != "2") {
        params1.status = this.formInline.status;
      }
      if (this.formInline.username != "") {
        params1.username = this.formInline.username;
      }
      if(this.formInline.nickname!=""){
          params1.nickname = this.formInline.nickname;
      }
      userApi
        .page_list(this.params.page, this.params.size, params1)
        .then(res => {
          if (res.success) {
            this.tableData = res.queryResult.list;
            this.total = res.queryResult.total;
          }
        });
    },
    changePage: function(page) {
      this.params.page = page;
      query();
    },
    onSubmit: function() {
        //查询按钮
        this.query();
    }
  },
  mounted() {
    this.query();
  }
};
</script>
<style scoped>
</style>


