<template>
  <div class="sell-total">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>销售数据统计</span>
      </div>
      <div class="text item">
        <!-- 内容部分 -->
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
            <el-select v-model="sellForm.region" placeholder="销售统计情况">
              <el-option label="区域一" value></el-option>
              <el-option label="区域二" value></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-button @click="search" type="success">查询</el-button>
          </el-col>
        </el-row>

        <!-- Echarts报表部分 -->

        <div id="mychart" style="width: 100%px;height:400px;"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: "",
      sellForm: {},
      // X轴
      Xdata: [
        "2019-9-05",
        "2019-6-10",
        "2019-6-12",
        "2019-6-13",
        "2019-6-14",
        "2019-6-15",
        "2019-6-16"
      ],
      // 核心数据
      seriesData: [820, 932, 901, 934, 1290, 1330, 1320]
    };
  },
  // 报表数据
  mounted() {
   let myChart = this.$echarts.init(document.getElementById("mychart"));
    let option = {
      // x轴
      xAxis: [
        {
          type: "category",
          data: this.Xdata
        }
      ],
      // Y轴
      yAxis: [
        {
          type: "value"
        }
      ],
      // 核心数据
      series: [
        {
          data: this.seriesData,
          type: "line",
          smooth: true
        }
      ],
      title: { text: "销售统计表", x: "center" }
    };
    this.drawCharys(option);
  },
  methods: {
    drawCharys(option) {
      // 初始化报表、
      let this_ = this;
      let myChart = this.$echarts.init(document.getElementById("mychart"));
      // 绘制报表
      myChart.setOption(option);
    },
    // 重新加载数据
    search(){

    }
  },
  created() {
    this.drawCharys();
  }
};
</script>

<style lang="less">
.sell-total {
  .el-card {
    .el-card__header {
      font-size: 20px;
      font-weight: bold;
      background-color: #f1f1f1;
    }
  }
}
</style>