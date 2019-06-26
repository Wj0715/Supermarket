<template>
  <div class="password-modify">
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix accountAddTop">
        <span>修改账号密码</span>
      </div>
      <!-- 内容 -->
      <div class="text item">
        <el-form
          style="width:350px;"
          size="small"
          :model="passwordModifyForm"
          status-icon
          :rules="rules"
          ref="passwordModifyForm"
          label-width="100px"
          class="demo-ruleForm"
          label-position="top"
        >
          <!-- 原密码 -->
          <el-form-item label="原密码:" prop="oldPassword">
            <el-input type="text" v-model="passwordModifyForm.oldPassword" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 新密码 -->
          <el-form-item label="新密码:" prop="newPassword">
            <el-input type="text" v-model="passwordModifyForm.newPassword" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 再次确认新密码 -->
          <el-form-item label="再次确认新密码:" prop="newOncePwd">
            <el-input type="text" v-model="passwordModifyForm.newOncePwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { passwordReg } from "../../utils/validator";
// 引入请求函数
import { checkOldPass, passwrodModify } from "@/api/account";
export default {
  data() {
    // 自定义密码验证
    const oldPassword = (rules, value, callback) => {
      if (value === "") {
        callback(new Error("请输入原密码 "));
      } else {
        // 把旧密码发送到后台
        checkOldPass({ oldPwd: value })
          .then(res => {
            // 接受后台响应的数据
            let { code, message } = res;

            if (code === 1) {
              callback(new Error(message));
            } else if (code === 0) {
              callback();
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    };
    //  新密码验证、
    const newPassword = (rules, value, callback) => {
      if (value === "") {
        callback(new Error("新密码不能为空"));
      } else if (value.length < 3 || value.length > 6) {
        callback(new Error("新密码长度在3-6位之间"));
      } else if (!passwordReg(value)) {
        callback(new Error("以字母开头，只能包含、数字和下划线"));
      } else if (value == this.passwordModifyForm.oldPassword) {
        callback(new Error("不能与原密码一样 "));
      } else {
        if (this.passwordModifyForm.newOncePwd !== "") {
          this.$refs.passwordModifyForm.validateField("newOncePwd");
        }
        callback();
      }
    };

    // 再次确认密码验证
    const newOncePwd = (rules, value, callback) => {
      if (value === "") {
        callback(new Error("请确认新密码 "));
      } else if (value !== this.passwordModifyForm.newPassword) {
        callback(new Error("两次密码不一样"));
      } else {
        callback();
      }
    };
    return {
      passwordModifyForm: {
        oldPassword: "", //旧密码
        newPassword: "", //新密码
        newOncePwd: "" //确认新密码
      },
      rules: {
        oldPassword: [
          { required: true, validator: oldPassword, trigger: "blur" } // 非空
        ],
        newPassword: [
          { required: true, validator: newPassword, trigger: "blur" } // 非空
        ],
        newOncePwd: [
          { required: true, validator: newOncePwd, trigger: "blur" } // 非空
        ]
      }
    };
  },
  methods: {
    submitForm() {
      // 获取整个表单  调用验证方法
      this.$refs.passwordModifyForm.validate(valid => {
        if (valid) {
          // 发送请求
          passwrodModify({ newPassword: this.passwordModifyForm.newPassword })
            .then(res => {
              //  接受后台响应数据
              let { code, message } = res;
              if (code === 0) {
                this.$message({
                  type: "success",
                  message: message
                });
                // 清除当前账号的token
                window.localStorage.removeItem('wj_token')
                // 更改密码后，跳转到登录页面，重新登录
                this.$router.push('/login')

              } else if (code === 1) {
                this.$message.error(message);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("前端验证不通过，不允许提交");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
.password-modify {
  .el-card {
    .el-card__header {
      font-size: 20px;
      font-weight: bold;
      background-color: #f1f1f1;
    }
  }
}
</style>