<template>
  <div>
    <el-row style="float:left;">
      <!--新增按钮和弹出框的位置-->
      <el-button type="primary" @click="openVisible()">新增</el-button>
      <el-dialog title="新增用户" :visible.sync="dialogFormVisible" width="30%">
        <el-form
          label-position="left"
          label-width="80px"
          :model="form"
          :rules="rules"
          ref="form"
          class="demo-ruleForm"
          style="margin-left:60px;margin-right:60px"
        >
          <el-form-item label="账号" prop="username">
            <el-input v-model="form.username" class="addWidth"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" class="addWidth" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              type="password"
              v-model="form.confirmPassword"
              class="addWidth"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="账号状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择" class="addWidth">
              <el-option label="全部" value="2"></el-option>
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改按钮-->
      <el-button type="primary" @click="get()">修改</el-button>
      <!--删除按钮-->
      <el-button type="primary" @click="deleteOpenTips()">删除</el-button>
    </el-row>
    <!--搜索条件-->
    <el-form :model="formInline" :inline="true" class="demo-form-inline">
      <el-form-item label="账号">
        <el-input v-model="formInline.username"></el-input>
      </el-form-item>
      <el-form-item label="账号状态">
        <el-select v-model="formInline.status" placeholder="请选择">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!--表格内容-->
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="主键" width="300"></el-table-column>
      <el-table-column prop="username" label="账号" width="200"></el-table-column>
      <el-table-column prop="status" label="状态" :formatter="statusFormat"></el-table-column>
      <el-table-column prop="genTime" label="创建时间" :formatter="dateFormat"></el-table-column>
      <el-table-column prop="count" label="登录次数"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
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
import * as userApi from "./api/admin_user";
import { all } from "q";
import { constants } from "fs";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.confirmPassword !== "") {
          this.$refs.form.validateField("confirmPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      tableData: [],
      total: 50,
      params: {
        page: 1, //页码
        size: 10 //每页显示个数
      },
      //选中行的结果
      multipleSelection: [],
      formInline: {
        //搜索条件
        status: "",
        username: "",
        password: "",
        confirmPassword: ""
      },
      dialogFormVisible: false, //弹出页面
      //新增功能弹出框属性
      form: {
        username: "",
        password: "",
        confirmPassword: "",
        status: ""
      },
      formLabelWidth: "120px",
      //表单验证
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 5, max: 11, message: "长度在 3 到 11 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        status: [{ required: true, message: "请选择一个状态", trigger: "blur" }]
      },
      addAndUpdateFlag: ""
    };
  },

  methods: {
    //分页查询
    query: function() {
      let params1 = {};
      params1.isAdmin = "1";
      if (this.formInline.status != "" && this.formInline.status != "2") {
        params1.status = this.formInline.status;
      }
      if (this.formInline.username != "") {
        params1.username = this.formInline.username;
      }
      //ajax请求
      userApi
        .page_list(this.params.page, this.params.size, params1)
        .then(res => {
          if (res.success) {
            this.tableData = res.queryResult.list;
            this.total = res.queryResult.total;
          }
        });
    },
    //更新
    update: function() {
      //发送请求
      userApi.update(this.multipleSelection[0].id, this.form).then(res => {
        if (res.success) {
          //弹出成功提示框
          this.successOpen("修改成功");
          //关闭页面
          this.dialogFormVisible = false;
          this.query();
        } else {
          //弹出失败提示框
          this.errorOpen();
          this.dialogFormVisible = false;
        }
      });
    },
    //根据id查找
    get: function() {
      //进行校验
      if (
        this.multipleSelection.length > 1 ||
        this.multipleSelection.length < 1
      ) {
        this.warningOpen("请选择一条数据");
        return;
      }
      //ajax请求
      userApi.get(this.multipleSelection[0].id).then(res => {
        this.form.username = res.username;
        this.form.password = res.password;
        this.form.confirmPassword = res.password;
        this.form.status = res.status;
      });
      //按钮为修改操作
      this.addAndUpdateFlag = "0";
      this.dialogFormVisible = true;
    },
    //添加
    add: function() {
      this.form.isAdmin = "1";
      this.form.count = 0;
      userApi.add(this.form).then(res => {
        if (res.success) {
          //弹出成功提示框
          this.successOpen("添加成功");
          this.dialogFormVisible = false;
          this.query();
        } else {
          //弹出失败弹出框
          this.errorOpen();
          this.dialogFormVisible = false;
        }
      });
    },
    //删除
    deleteByIds: function() {
      
      let ids = [];
      //获取行结果集
      for (let i = 0; i < this.multipleSelection.length; i++) { 
        ids[i] = this.multipleSelection[i].id;
      }
      console.log(ids);
      userApi.deleteByIds(ids).then(res => {
        if (res.success) {
          //弹出成功提示框
          this.successOpen("删除成功");
          this.dialogFormVisible = false;
          this.query();
        } else {
          this.errorOpen();
          this.dialogFormVisible = false;
        }
      });
    },
    //删除提示框
    deleteOpenTips() {
      //进行校验
      if (this.multipleSelection.length < 1) {
        this.warningOpen("请选择数据");
        return;
      }
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //调用删除
          this.deleteByIds();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //点击页签
    changePage: function(page) {
      this.params.page = page;
      this.query();
    },
    //模糊查询
    onSubmit: function() {
      this.query();
    },
    //提交方法
    submitForm(form) {
      //表单校验
      this.$refs[form].validate(valid => {
        if (valid) {
          //添加与修改判断
          if (this.addAndUpdateFlag == "1") {
            //添加操作
            this.add();
          } else {
            //修改操作
            this.update();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //打开弹出框并清空弹出框内容
    openVisible: function() {
      this.form.username = "";
      this.form.password = "";
      this.form.confirmPassword = "";
      this.form.status = "";
      this.dialogFormVisible = true;
      //按钮为添加操作
      this.addAndUpdateFlag = "1";
    },
    //选中的行赋值
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //格式化时间
    dateFormat(row, column, cellValue, index) {
      const date = row[column.property];
      var dateee = new Date(date).toJSON();
      return new Date(+new Date(dateee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    },
    //状态转换
    statusFormat(row, column, cellValue, index) {
      const status = row[column.property];
      if (status != null) {
        if (status == "1") {
          return "启用";
        } else {
          return "禁用";
        }
      }
    },
    //警告弹出框
    warningOpen(typeStr) {
      this.$message({
        message: "警告哈，" + typeStr,
        type: "warning"
      });
    },
    //成功提示框
    successOpen(typeStr) {
      this.$message({
        message: "成功哈，" + typeStr,
        type: "success"
      });
    },
    //失败提示框
    errorOpen() {
      this.$message.error("错了哈，请稍后重试");
    }
  },
  //暂时没用
  form(formName) {
    this.$refs[formName].resetFields();
  },
  mounted() {
    this.query();
  }
};
</script>
<style scoped>
.addWidth {
  width: 221px;
}
</style>


