<template>
  <div class="top">
    <el-row :gutter="20">
      <!-- 左侧标题 -->
      <el-col :span="19">
        <div class="title">
          <h3>
            <i class="el-icon-menu"></i> 华联超市管理系统
          </h3>
        </div>
      </el-col>
      <!-- 右侧头像 账户名 -->
      <el-col :span="5">
        <el-row>
          <el-col :span="6">
            <div class="avatar">
              <img src="./02.jpg" alt>
            </div>
          </el-col>
          <el-col :span="18">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                {{ userName }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                <el-dropdown-item command="logout">退出系统</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { accountInfo } from "@/api/account";
export default {
  data() {
    return {
      userName: "" //账号名
      // account: window.localStorage.getItem("user")
    };
  },
  methods: {
    handleCommand(command) {
      // console.log(command);
      if (command === "personal") {
        this.$router.push("/home/personal");
      } else if (command === "logout") {
        // 优化提示
        this.$confirm("是否确认退出", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "退出成功，欢迎回来!"
            });
            // 清除token
            window.localStorage.removeItem("wj_token");
            // 跳转登录页面
            this.$router.push("/login");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    // 请求当前用户信息函数
    getInfo() {
      //  发送请求，获取用户的信息
      accountInfo()
        .then(res => {
          // 接受参数
          let { data } = res;
          //  获取账号
          let { account } = data[0];
          this.userName = account;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getInfo();
  }
};
</script>

<style lang="less">
.top {
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-top: 5px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }
}
</style>