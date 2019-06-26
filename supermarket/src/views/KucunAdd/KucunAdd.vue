<template>
  <div class="kucun-add">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品入库</span>
      </div>
      <div class="text item">
        <el-form
          :model="kucunFrom"
          status-icon
          :rules="rules"
          ref="kucunFrom"
          label-width="100px"
          class="demo-kucunFrom"
          label-position="top"
          style="width:200px;"
           size="small"
        >
          <el-form-item label="商品条形码:" prop="barCode">
            <el-input type="text" v-model="kucunFrom.barCode" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="数量:" prop="kucunNum">
            <el-input type="text" v-model="kucunFrom.kucunNum" autocomplete="off"></el-input><span style="font-size:12px">计重单位为千克</span>
          </el-form-item>
          <el-form-item label="进价:" prop="kucunPrice">
            <el-input v-model.number="kucunFrom.kucunPrice"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="submitForm('kucunFrom')">入库</el-button>
           
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kucunFrom: {
        barCode:"",
        kucunNum:"",
        kucunPrice:""
      },
      rules:{
        barCode:[
          { required:true,}
        ],
        kucunNum:[
           { required:true,}
        ],
        kucunPrice:[
            { required:true,}
        ]
        
      }
    };
  },
  methods:{
    // 入库
    submitForm(){

    }
  }
};
</script>

<style lang='less'>
.kucun-add {
  .el-card {
    .el-card__header {
      font-size: 20px;
      font-weight: bold;
      background-color: #f1f1f1;
    }
  }
}
</style>