<template>
  <div class="goods-stock">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品出库</span>
      </div>
      <!-- 内容 -->
      <div class="text item">
        <!-- 表单 -->
        <div class="kucunForm">
          <el-form
            :model="gdstockFrom"
            status-icon
            :rules="rules"
            ref="gdstockFrom"
            label-width="100px"
            class="demo-gdstockFrom"
            size="small"
          >
            <el-form-item label="商品条形码:" prop="barCode">
              <el-input type="text" v-model="gdstockFrom.barCode" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="数量:" prop="kucunNum">
              <el-input type="text" v-model="gdstockFrom.kucunNum" autocomplete="off"></el-input>
              计重单位为千克
            </el-form-item>

            <el-form-item label="进价:" prop="kucunPrice">
              <el-input v-model.number="gdstockFrom.kucunPrice"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="success" @click="submitForm('gdstockFrom')">加入订单</el-button>
              <el-button type="primary" @click="submitAgain()">重新出库</el-button>
            </el-form-item>
          </el-form>
        </div>

        <!-- 表格 -->
        <el-table :data="tableKucun" style="width: 100%">
          <el-table-column prop="goodsName" label="名称" width="180"></el-table-column>
          <el-table-column prop="goodsNumber" label="数量" width="180"></el-table-column>
          <el-table-column prop="unitPrice" label="单价（元）"></el-table-column>
          <el-table-column prop="Price" label="总价（元）"></el-table-column>
          <el-table-column prop="preferential" label="优惠价（元）"></el-table-column>
        </el-table>
        <p>
          总价：<span>0</span>
          优惠价<span>0</span>
          小计<span>0</span>
        </p>
       
        <div class="input">
          会员卡号：
          <el-input style="width:200px" v-model="input" placeholder="会员卡号"></el-input>
        </div>
        <el-button type="success">确认提交</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gdstockFrom: {},
      rules: {
        barCode:[
            { required: true, message:"请输入商品名称", trigger: "blur" }
        ],
        kucunNum:[
           { required: true, message:"请输入数量", trigger: "blur" }
        ]
      },
      input: "",
      tableKucun: [
      ]
    };
  },
  methods: {
    //   加入订单
    submitForm() {},
    //   重新出库
    submitAgain() {}
  }
};
</script>

<style lang='less'>
.goods-stock {
  .el-card {
    .el-card__header {
      font-size: 20px;
      font-weight: bold;
      background-color: #f1f1f1;
    }
    .el-card__body {
      .item {
        .kucunForm {
          border-bottom: 2px solid #f1f1f1;
          .el-form-item{ 
            .el-input{
             width:auto;
            }
          }
        }
        .input {
          margin: 20px auto;
        }
      }
    }
  }
}
</style>