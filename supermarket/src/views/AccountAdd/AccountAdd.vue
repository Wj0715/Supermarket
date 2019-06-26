<template>
  <div class="account-add">
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix accountAddTop">
        <span>添加账号管理</span>
      </div>
      <!-- 内容 -->
      <div class="text item">
        <el-form
          style="width:350px;"
          size="small"
          :model="accountaddForm"
          status-icon
          :rules="rules"
          ref="accountaddForm"
          label-width="100px"
          class="demo-ruleForm"
          label-position="top"
        >
          <!-- 添加账号 -->
          <el-form-item label="账号:" prop="account">
            <el-input type="text" v-model="accountaddForm.account" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码:" prop="password">
            <el-input type="text" v-model="accountaddForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 确认密码 -->
          <el-form-item label="确认密码:" prop="checkPass">
            <el-input type="text" v-model="accountaddForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 选择分组 -->
          <el-form-item label="选择用户组:" prop="userGroup">
            <el-select v-model="accountaddForm.userGroup" placeholder="请选择用户组">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通用户" value="普通用户"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm()">确定</el-button>
            <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入工具模块
import { passwordReg } from "../../utils/validator";
import { accountAdd } from '@/api/account'
export default {
  data() {
    // 密码自定义验证函数
    var validatorPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 3 || value.length > 6) {
        callback(new Error("长度在3-6位之间"));
      } else if (!passwordReg(value)) {
        callback(new Error("以字母开头，只能包含、数字和下划线"));
      } else {
        if (this.accountaddForm.checkPass !== "") {
          //  触发一致性验证
          this.$refs.accountaddForm.validateField("checkPass");
        }
        callback();
      }
    };
    // 确认密码验证
    var checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("确认密码不能为空 "));
      } else if (value !== this.accountaddForm.password) {
        callback(new Error("两次密码不一样 "));
      } else {
        callback(); //成功！！
      }
    };

    return {
      // 添加账号数据
      accountaddForm: {
        account: "",
        password: "",
        checkPass: "",
        userGroup: ""
      },
      // 验证规则
      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" }, // 非空
          { min: 3, max: 6, message: "账号长度 3~6 位", trigger: "blur" } // 长度
        ],
        password: [
          { required: true, validator: validatorPass, trigger: "blur" } // 非空
        ],
        checkPass: [
          { required: true, validator: checkPass, trigger: "blur" } // 非空
        ],
        userGroup: [
          { required: true, message: "请选择分组", trigger: "change" }
        ]
      }
    }
    
  },
   methods: {
        // 添加 获取整个表单  ，调用验证方法
        submitForm() {
          this.$refs.accountaddForm.validate(valid => {
            if (valid) {
              console.log("前端验证通过，可以添加");
              // 收集数据 给后台
              let params = {
                account: this.accountaddForm.account,
                password: this.accountaddForm.password,
                userGroup: this.accountaddForm.userGroup
              }

              // 发送数据给后台
             accountAdd( params )

              .then(reponse=>{
                console.log(reponse.data);
                // 接受后台返回的数据
                let { code,message} = reponse
                // 判断
                if(code===0){ //成功
                  this.$message({  //弹成功提示框
                  message:message,
                  type:"success"
                  })
                   
                  //  添加账户成功后，跳转账户管理页面
                   this.$router.push('/home/accountmanage')

                }else if(code===1){
                  this.$message.error(message)
                }
                
              })
              .catch(err=>{
                console.log(err);
                
              })
            
            } else {
              console.log("前端验证不通过，不允许添加");
            }
          });
        },
        resetForm() {
          this.$refs.accountaddForm.resetFields() //调用表单重置
        }
      }
};
</script>

<style lang="less">
.account-add {
 
  // 面板组件
  .el-card {
    // 面板头

    .el-card__header {
      font-size: 20px;
      font-weight: bold;
      background-color: #f1f1f1;
    }
    .el-card__body {
      .item {
        .el-form {
          .el-form-item {
            .el-form-item__content {
              .el-dropdown {
                .el-button {
                  background-color: #fff;
                  color: #606266;
                  border: 1px solid #dcdfe6;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>