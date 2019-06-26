<template>
  <div class="account-manage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账号管理</span>
      </div>
      <div class="text item">
        <!-- 账户管理表格 -->
        <el-table
          ref="accountData"
          :data="accountData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="selectChange"
        >
          <!-- 多选框 -->
          <el-table-column type="selection" width="55"></el-table-column>

          <!-- 日期 -->
          <el-table-column label="日期">
            <template slot-scope="scope">{{ scope.row.ctime |filterCtime}}</template>
          </el-table-column>

          <!-- 账户 -->
          <el-table-column prop="account" label="账号" width="180"></el-table-column>
          <!-- 用户组 -->
          <el-table-column prop="userGroup" label="用户组" width="180"></el-table-column>

          <!-- 操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row.id)">
                <i class="el-icon-edit"></i>编辑
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
                <i class="el-icon-delete"></i>删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div style="margin-top:30px;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 2, 4, 6]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>

        <!-- 批量删除 -->
        <div style="margin-top:20px;">
          <el-button @click="bachDel" type="danger" size="small">批量删除</el-button>
          <el-button @click="deselect" type="primary" size="small">取消选择</el-button>
        </div>
        <!-- 修改模态框 -->
        <el-dialog title="修改账户" width="400px" :visible.sync="visible">
          <!-- 修改表单 -->
          <el-form :model="editform" style="width:316px" ref="editform" :rules="rules">
            <el-form-item label="账户" prop="account" label-width="120px">
              <el-input v-model="editform.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="选择分组" label-width="120px">
              <el-select v-model="editform.userGroup" placeholder="请选择分组">
                <el-option label="超级管理员" value="超级管理员"></el-option>
                <el-option label="普通用户" value="普通用户"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入时间模块
import moment from "moment";
// 引入封装好的请求
import {
  accountEdit,
  accountsaveEdit,
  accountDel,
  bachDelete,
  getaccountByPage
} from "@/api/account";
export default {
  data() {
    return {
      accountData: [], //账号列表数据
      currentPage: 1, //当前页
      total: 0, //总数据条数
      pageSize: 4, //每页的数据条数
      visible: false,
      editId: "",
      editform: {
        account: "",
        userGroup: ""
      },
      delArr: [], //批量删除id数组
      rules: {
        account: [
          { required: true, message: "账号不能为空", trigger: "change" },
          { min: 3, max: 6, message: "长度3 ~ 6位", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    // 编辑
    handleEdit(id) {
      console.log(id);
      // 弹出模态框
      this.visible = true;
      // 保留id 这个id就是要修改的是数据的id
      this.editId = id;
      accountEdit({ id })
        .then(response => {
          // console.log(reponse.data);
          // 接受后端数据响应的数据
          let { data } = response;
          // 回填表单
          this.editform.account = data[0].account;
          this.editform.userGroup = data[0].userGroup;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 保存修改
    saveEdit() {
      // 调用前端验证
      this.$refs.editform.validate(valid => {
        if (valid) {
          this.visible = false;
          // 收集参数
          let params = {
            account: this.editform.account,
            userGroup: this.editform.userGroup,
            id: this.editId
          };
          // 发送数据给后台
          accountsaveEdit(params)
            .then(response => {
              // console.log(response.data);
              // 接受后台响应数据
              let { code, message } = response;
              // 判断
              if (code === 0) {
                this.$message({
                  type: "success",
                  message: message
                });
                // 刷新列表
                this.getaccountPage();
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    // 删除
    handleDelete(id) {
      this.$confirm("你确定要删除吗：", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //如果确认走then
          accountDel({ id })
            .then(reponse => {
              // 接受后端响应的数据
              let { code, message } = reponse;
              if (code === 0) {
                // 弹成功提示
                this.$message({
                  type: "success",
                  message: message
                });
                // 刷新列表
                this.getaccountPage();
              } else if (code === 1) {
                this.$message.error(message);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 表格选中状态改变事件
    selectChange(selectData) {
      // 循环选中的id，放入新的数组中
      this.delArr = selectData.map(v => v.id);
    },
    // 取消选择
    deselect() {
      this.$refs.accountData.clearSelection(); //选中整个表格 调用取消选择方法
    },
    // 批量删除
    bachDel() {
       console.log(this.delArr.length);
      if (!this.delArr.length) {
        this.$message.error("请选择以后再操作");
        return;
      }
      // 优化提示
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = { idArr:this.delArr};
          bachDelete(params)
            .then(response => {
             
              //  接受后台响应数据
              let { code, message } = response;
              if (code === 0) {
                this.$message({
                  type: "success",
                  message: message
                });
                // 渲染列表
                this.getaccountPage();
              } else if (code === 1) {
                this.$message.error(message);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // pageSize 每条页数改变
    handleSizeChange(pageSize) {
      //  获取用户选择的每页条数，赋值给data的pageSize
      this.pageSize = pageSize;
      // console.log(this.pageSize);
      // console.log(pageSize);
      this.getaccountPage();
    },
    // currentPage 当前页改变
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getaccountPage(); //获取用户选择的当前页，赋值给data中的currentPage；
    },

    // 分页函数
    getaccountPage() {
      //   // 手机参数
      let params = {
        pageSize: this.pageSize,
        currentPage: this.currentPage
      };
      getaccountByPage(params)
        .then(response => {
          console.log(response.data);
          //       // 接受后台传来的数据
          let { total, data } = response;
          //       // 渲染
          
          this.accountData = data;
          this.total = total;
          //       // 边界判断
          if (!data.length && this.currentPage !== 1) {
            this.currentPage -= 1;
            this.getaccountPage();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  // 钩子函数 发送请求
  created() {
    this.getaccountPage();
  },
  filters: {
    filterCtime(ctime) {
      return moment(ctime).format("YYYY-MM-DD hh:mm:ss");
    }
  }
};
</script>

<style lang="less">
.account-manage {
  .el-card {
    .el-card__header {
      font-size: 20px;
      font-weight: bold;
      background-color: #f1f1f1;
    }
  }
}
</style>