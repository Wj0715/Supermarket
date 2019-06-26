<template>
  <div class="system-info">
    <!-- 卡片组件 -->
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>系统信息</span>
      </div>
      <!-- 内容 -->
      <div class="text item">
        <!--提示信息  -->
        <el-alert title="成功提示的文案" type="success" show-icon></el-alert>
        <el-alert title="消息提示的文案" type="info" show-icon></el-alert>

        <el-row :gutter="30">
          <el-col :span="12">
            <!-- 左表格 -->
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>销售排行</span>
              </div>
              <div class="text item">
                <!-- 表格内容 -->
                <el-table :data="saleRank" style="width: 100%" height="250">
                  <el-table-column fixed prop="goodsName" label="商品名称" width="420"></el-table-column>
                  <el-table-column prop="sellNum" label="销量" width="120"></el-table-column>
                </el-table>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <!-- 右表格 -->
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>缺货的商品</span>
              </div>
              <div class="text item">
                <el-table :data="stockNum" style="width: 100%" height="250">
                  <el-table-column fixed prop="goodsName" label="商品名称" width="310"></el-table-column>
                  <el-table-column prop="storeNum" label="库存" width="120"></el-table-column>  <el-table-column prop="action" label="操作" width="120"></el-table-column>
                </el-table>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      saleRank: [
        {
          goodsName: "霸王洗发水",
          sellNum: 12
        },
        {
          goodsName: "霸王洗发水",
          sellNum: 12
        },
        {
          goodsName: "霸王洗发水",
          sellNum: 12
        }
      ],
      stockNum:[
          {
              goodsName:'我的优乐美',
              storeNum:1,
              action:"入库"

          },
           {
              goodsName:'小白心里软',
              storeNum:1,
              action:"入库"

          }
      ]

    };
  }
};
</script>

<style lang="less">
.system-info {
  height: 100%;
  .el-card {
    height: 100%;
    .el-card__header {
      font-size: 20px;
      font-weight: bold;
      background-color: #f1f1f1;
    }
    .el-card__body {
      .item {
        .el-alert {
          margin: 20px auto;
        }
          .el-table{
              .el-table__body-wrapper{
                  .el-table__body{
                      .el-table__row{
                          .el-table_2_column_5{
                              .cell{
                                  color:green
                              }
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