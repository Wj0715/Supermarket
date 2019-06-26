<template>
  <div class="goods-add">
    <el-card class="box-card">
      <!-- 头 -->
      <div slot="header" class="clearfix">
        <span>商品添加</span>
      </div>
      <!-- 内容 -->
      <div class="text item">
        <el-form
          :model="goodsForm"
          :rules="rules"
          ref="goodsForm"
          label-width="100px"
          class="demo-goodsForm"
          size="mini"
        >
          <!-- 所属分类  -->
          <el-form-item label="所属分类" prop="classify">
            <el-select v-model="goodsForm.classify" placeholder="--选择分类--">
              <el-option label="全部分类" value="全部分类"></el-option>
              <el-option label="食品类" value="食品类"></el-option>
              <el-option label="洗护类" value="洗护类"></el-option>
              <el-option label="日用类" value="日用类"></el-option>
            </el-select>
          </el-form-item>
          <!-- 商品条形码  -->
          <el-form-item label="商品条形码" prop="goodsCode">
            <el-input type="text" v-model="goodsForm.goodsCode"></el-input>
            <el-button style="margin-left:15px;" type="primary">生成条形码</el-button>
          </el-form-item>
          <!-- 商品名称  -->
          <el-form-item label="商品名称" prop="goodsName">
            <el-input type="text" v-model="goodsForm.goodsName"></el-input>
          </el-form-item>
          <!-- 商品进价  -->
          <el-form-item label="商品进价" prop="purchase">
            <el-input type="text" @blur="autoPrice" v-model="goodsForm.purchase"></el-input>
          </el-form-item>
          <!-- 商品售价  -->
          <el-form-item label="商品售价" prop="goodsPrice">
            <el-input type="text" v-model="goodsForm.goodsPrice"></el-input>
          </el-form-item>
          <!-- 市场价  -->
          <el-form-item label="市场价" prop="marketPrice">
            <el-input type="text" v-model="goodsForm.marketPrice"></el-input>
            <span style="font-size:12px;margin-left:15px;">默认市场价为售价的1.2倍</span>
          </el-form-item>

          <!-- 入库数量  -->
          <el-form-item label="入库数量" prop="storageNum">
            <el-input type="text" v-model="goodsForm.storageNum"></el-input>
          </el-form-item>
          <!-- 商品重量  -->
          <el-form-item label="商品重量" prop="goodsWeight">
            <el-input type="text" v-model="goodsForm.goodsWeight"></el-input>
          </el-form-item>
          <!-- 商品单位  -->
          <el-form-item label="商品单位" prop="goodsUnit">
            <el-input type="text" v-model="goodsForm.goodsUnit"></el-input>
            <span style="font-size:12px;margin-left:15px;">计重商品单位为千克</span>
          </el-form-item>
          <!-- 会员优惠  -->
          <el-form-item label="会员优惠" prop="memberDeals">
            <el-radio-group v-model="goodsForm.memberDeals">
              <el-radio label="享受" style="margin-left:15px;">享受</el-radio>
              <el-radio label="不享受">不享受</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 是否促销  -->
          <el-form-item label="是否促销" prop="isPromotion">
            <el-radio-group v-model="goodsForm.isPromotion">
              <el-radio label="促销" style="margin-left:15px;">促销</el-radio>
              <el-radio label="不促销">不促销</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 商品简介  -->
          <el-form-item label="商品简介" prop="goodsDesc">
            <el-input type="textarea" v-model="goodsForm.goodsDesc"></el-input>
            <span style="font-size:12px">不超过200个汉字</span>
          </el-form-item>
          <!-- 添加按钮 -->
          <el-button @click="submitForm" size="small" type="success">添加</el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入请求函数
import { goodsAdd } from "@/api/goods";
export default {
  data() {
    return {
      goodsForm: {
        classify: "",
        goodsCode: "",
        goodsName: "",
        goodsPrice: "",
        marketPrice: "",
        purchase: "",
        storageNum: "",
        goodsWeight: "",
        goodsUnit: "",
        memberDeals: "",
        isPromotion: "",
        goodsDesc: ""
      },
      // 验证规则：
      rules: {
        classify: [
          { required: true, message: "请选择分类", trigger: "change" }
        ],
        goodsCode: [
          { required: true, message: "请输入商品条形码", trigger: "blur" }
        ],
        goodsName: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        goodsPrice: [
          { required: true, message: "请输入商品价格", trigger: "blur" }
        ],
        marketPrice: [
          { required: true, message: "请输入商品价格", trigger: "blur" }
        ],
        purchase: [
          { required: true, message: "请输入商品价格", trigger: "blur" }
        ],
        storageNum: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
          { pattern: /^[1-9]\d*/, message: "必须是非负的整数", trigger: "blur" }
        ],
        goodsWeight: [{ required: true, message: "不能为空", trigger: "blur" }],
        goodsUnit: [{ required: true, message: "不能为空", trigger: "blur" }],
        memberDeals: [{ required: true, message: "不能为空", trigger: "blur" }],
        isPromotion: [
          { required: true, message: "不能为空", trigger: "change" }
        ],
        goodsDesc: [{ required: true, message: "不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 自动补全价格
    autoPrice() {
      // 商品售价为进价的1.5倍
      this.goodsForm.goodsPrice = (
        parseFloat(this.goodsForm.purchase) * 1.5
      ).toFixed(2);
      // 市场价为商品售价的2倍
      this.goodsForm.marketPrice = (
        parseFloat(this.goodsForm.purchase) * 1.2
      ).toFixed(2);
    },

    // 提交
    submitForm() {
      // 所有前端的验证用过，才能提交
      this.$refs.goodsForm.validate(valid => {
        if (valid) {
          // 收集参数
          let params = {
            classify: this.goodsForm.classify,
            goodsCode: this.goodsForm.goodsCode,
            goodsName: this.goodsForm.goodsName,
            goodsPrice: this.goodsForm.goodsPrice,
            marketPrice: this.goodsForm.marketPrice,
            purchase: this.goodsForm.purchase,
            storageNum: this.goodsForm.storageNum,
            goodsWeight: this.goodsForm.goodsWeight,
            goodsUnit: this.goodsForm.goodsUnit,
            memberDeals: this.goodsForm.memberDeals,
            isPromotion: this.goodsForm.isPromotion,
            goodsDesc: this.goodsForm.goodsDesc
          };
          // console.log(params);

          // 发送给后端
          goodsAdd(params)
            .then(response => {
              //  接受后台响应的数据
              let { code, message } = response;
              if (code === 0) {
                this.$message({
                  message: message,
                  type: "success"
                });
                // 添加成功   跳转商品管理页面
                this.$router.push('/home/goodsmanage')


              } else if (code === 1) {
                this.$message.error(message);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("前端验证不通过，不允许添加");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
.goods-add {
  .el-card {
    .el-card__header {
      font-size: 20px;
      font-weight: bold;
      background-color: #f1f1f1;
    }
    .el-card__body {
      .item {
        .el-form {
          font-size: 12px;
          .el-input {
            width: 220px;
          }
        }
      }
    }
  }
}
</style>