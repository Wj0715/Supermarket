<template>
  <div class="sales-return">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品退货</span>
      </div>
      <!-- 内容 -->
      <div class="text item">
        <div  class="search">
          订单号： 
          <el-input v-model="input" placeholder=""></el-input>
           <el-button type="success">查询</el-button>
        </div> 
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ''
    };
  }
};
</script>

<style lang='less'>
.sales-return {
  .el-card {
    .el-card__header {
      font-size: 20px;
      font-weight: bold;
      background-color: #f1f1f1;
    }
    .el-card__body{
      .item{
        .el-input{
            width:auto;
          margin-right: 30px;
        }
      }
    }
  }
}
</style>