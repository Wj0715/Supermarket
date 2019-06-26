<template>
  <div class="kucun-manage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>库存管理</span>
      </div>
      <div class="text item">
        <!-- 内容 -->
        <el-row :gutter="20">
          <el-col :span="6">
            <!-- <el-dropdown>
              <el-button type="primary">
                ---选择分类---
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>食品类</el-dropdown-item>
                <el-dropdown-item>洗护类</el-dropdown-item>
                <el-dropdown-item>日用类</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>-->
            <span class="demonstration">分类：</span>
            <el-select v-model="kucunMgFrom.region" placeholder="--选择分类--">
              <el-option label="食品类" value></el-option>
              <el-option label="洗护类" value></el-option>
              <el-option label="日用类" value></el-option>
            </el-select>
          </el-col>
          <!-- 关键字 -->
          <el-col :span="18">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="关键字：">
                <el-input v-model="formInline.goodsName" placeholder="商品名称，条形码"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="success">查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="goodsCode" label="商品条形码"></el-table-column>
          <el-table-column prop="goodsName" label="商品名称"></el-table-column>

          <el-table-column prop="Price" label="进价（元）"></el-table-column>
          <el-table-column prop="putStorag" label="入库"></el-table-column>

          <el-table-column prop="stockNum" label="库存"></el-table-column>

          <el-table-column prop="sold" label="已售"></el-table-column>
          <!-- 操作管理 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                <i class="el-icon-edit"></i>
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                <i class="el-icon-delete"></i>
              </el-button>
            </template>
          </el-table-column>
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
      formInline: {
        goodsName: "",
        region: ""
      },
      kucunMgFrom: {},
      tableData: [
        {
          goodsCode: 62628374764,
          goodsName: "蓝月亮",
          Price: "46.90",
          putStorag: 12,
          stockNum: 13,
          sold: 0
        },
        {
          goodsCode: 62628374764,
          goodsName: "康师傅红烧面",
          Price: "4.00",
          putStorag: 6,
          stockNum: 6,
          sold: 1
        }
      ],
      // 分页
      // 分页
      currentPage: 1,
      pageSize: 4,
      Total: 12
    };
  },
  methods:{
    // 
    handleEdit(){},
    handleDelete(){},
    handleSizeChange(){},
    handleCurrentChange(){}
  }
};
</script>

<style lang='less'>
</style>