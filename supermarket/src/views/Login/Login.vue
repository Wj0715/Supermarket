<template>
  <div class="login">
    <div class="login-wrap">
      <!-- 标题 -->
      <div class="title">
        <span class="el-icon-user-solid"></span>华联超市管理系统
      </div>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="account">
          <el-input type="text" v-model="loginForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="text" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="loginForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">登录</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 引入验证密码函数
import { passwordReg } from "../../utils/validator";
// 引入请求函数
import { loginCheck } from '@/api/login'
export default {
  data() {
    // 确认密码自定义验证函数
       var validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("确认密码不能为空"));
        } else if (value !== this.loginForm.password) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();//成功，，
        }
      }

      // 密码自定义验证函数
      const ckeckPassword = (rule,value ,callback)=>{
        if(value===''){
          callback(new Error('密码不能为空'))
        }else if(value.length<3||value.length>6){
          callback (new Error('长度在3-6位之间'))

        }else if(!passwordReg(value)){
          callback(new Error(' 以字母开头，只能包含、数字和下划线'))//错误提示
        }else{
          if(this.loginForm.checkPass!==''){//如果确认密码不为空
          //触发一次性验证
          this.$refs.loginForm.validateField('checkPass')

          }
          callback()
        }
      }
    return {
      //  登录数据
      loginForm: {
        account: "",
        password: "",
        checkPass: ""
      },
      //验证规则
      rules: {
        // 账号
        account: [
          { required: true, message: "请输入账号", trigger: "blur" }, // 非空
          { min: 3, max: 6, message: "账号长度 3~6 位", trigger: "blur" } // 长度
        ],
        // 密码
        password: [
          { required: true, validator:ckeckPassword, trigger: "blur" }, // 非空
          // { min: 3, max: 6, message: "密码长度 3~6 位", trigger: "blur" } // 长度
        ],
        // 确认密码
        checkPass: [
          { required: true,validator:validatePass, trigger: "blur" }, // 非空
          // { min: 3, max: 6, message: "账号长度 3~6 位", trigger: "blur" } // 长度
        ]
      }
    };
  },
  methods: {
    submitForm() {
      // 页面中使用ref属性声明的标签dom，可以使用 this.$refs.ref属性的值 获取
      // element内置了验证方法 validate 传入一个函数 函数中的变量如果是true就验证通过 否则验证不通过
      //登录
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // console.log("前端验证通过，可以提交");
          // 收集账户，密码参数
          let params={
            account:this.loginForm.account,
            password:this.loginForm.password
          }
          // console.log(loginCheck());
          
          // 提交账户，密码给后台
          loginCheck(params)
          .then(response=>{
            // console.log(response.data);
            let {code,message,token} = response;
            if(code===0){
              console.log('我登录成功了，看一下后台到底有没有给我令牌token:', token)
              // 把token存入在本地存储
              window.localStorage.setItem('wj_token',token);
              // window.localStorage.setItem('user',account)
              this.$message({
                type:"success",
                message:message
              })
              this.$router.push('/home')  //登录成功，跳转后端首页
            }else if(code===1){
              this.$message.error(message)
            }
            
          })
          .catch(err=>{
            console.log(err);
            
          })
        } else {
          console.log("前端验证不通过");
          return false;
        }
      });
    },
    resetForm() {
      //重置
      this.$refs.loginForm.resetFields();
    }
  }
};
</script>

<style lang="less">
@import "./Login.less";
</style>