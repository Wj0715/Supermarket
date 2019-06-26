<template>
  <div class="personal">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>个人中心</span>
      </div>
      <div class="text item">
        <h1>账号信息：</h1>
        <h1>用户Id:{{userInfo.id}} </h1>
        <h1>账号：{{userInfo.account}} </h1>
        <h1>密码：{{userInfo.password}} </h1>
        <h1>用户组：{{userInfo.userGroup}} </h1>
        <h1>创建时间：{{userInfo.ctime | filterCtime }} </h1>
        <h1>头像上传：</h1>
      </div>
    </el-card>
  </div>
</template> 

<script>
// 引入请求账号信息函数
import { accountInfo } from "@/api/account";
// 引入时间处理模块
import moment from 'moment'
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  methods: {
    // 请求当前用户信息函数
    getInfo() {
      //  发送请求，获取用户的信息
      accountInfo()
        .then(res => {
          // 接受参数
          let { data } = res;
          //  获取账号
        //   let { account } = data[0];
          this.userInfo = data[0];
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created(){
      this.getInfo();
  },
  filters:{
      filterCtime(ctime){
          return moment(ctime).format('YYY-MM-DD HH:mm:ss')
      }
  }
};
</script>

<style lang="less">
.personal {
  .el-card {
    .el-card__header {
      font-size: 20px;
      font-weight: bold;
      background-color: #f1f1f1;
    }
    .el-card__body{
        h1{
            margin-top:20px;
        }
    }
  }
}
</style>