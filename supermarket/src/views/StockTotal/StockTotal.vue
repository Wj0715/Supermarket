<template>
  <div class="stock-total">
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>进货数据统计</span>
      </div>
      <!-- 内容部分 -->
      <div class="text item">
        <el-row :gutter="20">
          <el-col :span="9">
            <div class="demo-input-suffix">
              <div class="block">
                <span class="demonstration">时间：</span>
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </div>
            </div>
          </el-col>
         
          <el-col :span="4">
            <el-button type="success">查询</el-button>
          </el-col>
        </el-row>

        <!-- Echarts报表 -->
      
        <div id="mychart" style="width: 100%px;height:400px;"> </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stockForm: {},
      value1: ""
    };
  },
  mounted() {
    let this_ = this;
    let myChart = this.$echarts.init(document.getElementById("mychart"));
    let option = {
      xAxis: [
        {
          type: "category",
          data: [
            "12-02-5",
            "12-02-6",
            "12-02-7",
            "12-02-8",
            "12-02-9",
            "12-02-10",
            "12-02-11"
          ]
        }
      ],
      title: { text: '进货统计', x: 'center' },
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line"
        }
      ]
    };
    myChart.setOption(option);
    window.addEventListener("resize", function() {
      myChart.resize();
    });
  },
  methods: {},
  watch: {},
  created() {}
};
</script>

<style lang="less">
.stock-total {
  .el-card {
    .el-card__header {
      font-size: 20px;
      font-weight: bold;
      background-color: #f1f1f1;
    }
  }
}
</style>