<template>
  <div class="sell-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>销售列表</span>
      </div>
      <!-- 内容部分 -->
      <div class="text item">
        <el-row :gutter="30">
          <el-col :span="7">
            <div class="block">
              <span class="demonstration">开始时间：</span>
              <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="block">
              <span class="demonstration">结束时间：</span>
              <el-date-picker v-model="value2" type="date" placeholder="选择日期"></el-date-picker>
            </div>
          </el-col>
        </el-row>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="关键字：">
            <el-input v-model="formInline.goodsName" placeholder="商品名称，条形码"></el-input>
          </el-form-item>
          <span style="font-size:14px ;line-height: 40px;">商品名称、订单号、会员名称、会员卡号</span>

          <el-form-item>
            <el-button type="success">查询</el-button>
          </el-form-item>
        </el-form>
        <!-- 表格 -->
        <!-- 商品内容 -->
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="orderNumber" label="订单号"></el-table-column>
          <el-table-column prop="goodsName" label="名称"></el-table-column>
          <el-table-column prop="number" label="数量"></el-table-column>
          <el-table-column prop="Price" label="实际售价（元）"></el-table-column>
          <el-table-column prop="promotionPrice" label="优惠促销/会员价（元）"></el-table-column>
          <el-table-column prop="refund" label="退款"></el-table-column>
          <el-table-column prop="sellTime" label="销售时间"></el-table-column>
          
        
        </el-table>
        <!-- 分页 -->

        <div style="margin-top:30px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1,2, 4, 6]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="Total"
          ></el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: "",
      value2: "",
      // input: "",
      formInline: {},
       tableData: [
        {
          orderNumber: "61112556389",
          goodsName: "优乐美",
          number: "食品类",
          Price: "12.00",
          promotionPrice: "2.00",
          refund: "无退款",
          sellTime:"2019-2-07"
        },
       {
          orderNumber: "61112556389",
          goodsName: "优乐美",
          number: "食品类",
          Price: "12.00",
          promotionPrice: "2.00",
          refund: "无退款",
          sellTime:"2019-2-07"
        },
         {
          orderNumber: "61112556389",
          goodsName: "优乐美",
          number: "食品类",
          Price: "12.00",
          promotionPrice: "2.00",
          refund: "无退款",
          sellTime:"2019-2-07"
        },
      ],
      // 分页
      currentPage:1,
      pageSize:4,
      Total:12
    };
  },
  methods:{
    handleSizeChange(){},
    handleCurrentChange(){}
  }
};
</script>

<style lang='less'>
.sell-list {
  .el-card {
    .el-card__header {
      font-size: 20px;
      font-weight: bold;
      background-color: #f1f1f1;
    }
    .el-card__body {
      // .search {
      //   input {
      //     width: auto;
      //     margin-top: 20px;
      //   }
      // }
      .item {
        .el-row {
          margin-bottom: 20px;
          text-align: center;
        }
      }
    }
  }
}
</style>