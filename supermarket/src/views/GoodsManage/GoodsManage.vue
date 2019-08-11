<template>
  <div class="goods-manage">
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>商品管理</span>
      </div>
      <!-- 内容 -->
      <div class="text item">
        <!-- 选择分类 -->
        <!-- <el-row :gutter="20"> -->
        <!-- <el-col :span="6"> -->
        <el-form size="small" :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="所属分类">
            <el-select v-model="searchForm.classify" placeholder="--选择分类--">
              <el-option label="全部分类" value="全部分类"></el-option>
              <el-option label="食品类" value="食品类"></el-option>
              <el-option label="洗护类" value="洗护类"></el-option>
              <el-option label="日用类" value="日用类"></el-option>
            </el-select>
          </el-form-item>
          <!-- </el-col> -->
          <!-- 关键字 -->
          <!-- <el-col :span="18"> -->

          <el-form-item label="关键字：">
            <el-input v-model="searchForm.keyWord" placeholder="商品名称，条形码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="success" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
        <!-- </el-col> -->
        <!-- </el-row> -->
        <!-- 商品内容 -->
        <el-table
          ref="goodsMgForm"
          :data="goodsMgForm"
          stripe
          style="width: 100%"
          @selection-change="selectChange"
        >
          <!-- 多选框 -->
          <el-table-column type="selection" width="55"></el-table-column>

          <el-table-column prop="goodsCode" label="商品条形码"></el-table-column>
          <el-table-column prop="goodsName" label="商品名称"></el-table-column>
          <el-table-column prop="classify" label="所属分类"></el-table-column>
          <el-table-column prop="goodsPrice" label="售价（元）"></el-table-column>
          <el-table-column prop="isPromotion" label="是否促销"></el-table-column>
          <!-- 日期 -->
          <el-table-column label="日期">
            <template slot-scope="scope">{{ scope.row.ctime | filterCtime }}</template>
          </el-table-column>
          <!-- 操作管理 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row.id)">
                <i class="el-icon-edit"></i>
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
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
            :page-sizes="[1,3, 4, 6]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
        <!-- 批量删除 -->
        <div style="margin-top:20px;">
          <el-button @click="bachDel" type="danger" size="small">批量删除</el-button>
          <el-button @click="deselect" type="primary" size="small">取消选择</el-button>
        </div>

        <!-- 修改模态框 -->
        <el-dialog title="修改账户" width="400px" :visible.sync="visible">
          <!-- 修改表单 -->
          <el-form :model="editform" style="width:316px" ref="editform" :rules="rules">
            <el-form-item label="商品名称" prop="goodsName" label-width="120px">
              <el-input v-model="editform.goodsName" autocomplete="off"></el-input>
            </el-form-item>
          
            <el-form-item label="是否促销" prop="isPromotion">
              <el-radio-group v-model="editform.isPromotion">
                <el-radio label="促销" style="margin-left:15px;">促销</el-radio>
                <el-radio label="不促销">不促销</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="选择分类" label-width="120px">
              <el-select v-model="editform.classify" placeholder="请选择分组">
                <el-option label="食品类" value="食品类"></el-option>
                <el-option label="洗护类" value="洗护类"></el-option>
                <el-option label="日用类" value="日用类"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入时间模块
import moment from "moment";
// 引入请求函数
import {
  goodsList,
  goodsRemolve,
  goodsEdit,
  saveEdit,
  bachDel,
  searchGoods
} from "@/api/goods";
export default {
  data() {
    return {
      // 模糊查询关键字
      searchForm: {
        keyWord: "",
        classify: ""
      },
      goodsMgForm: [], //商品管理数据
      editform: {}, // 模态框
      visible: false,
      rules: {}, //验证规则
      editId: "", //修改数据id
      delArr: [], //批量删除的id；
      // 模态框
      editform: {
        goodsName: "",
        classify: "",
        isPromotion: ""
      },
      // 分页
      currentPage: 1,
      pageSize: 3,
      total: 0
    };
  },
  methods: {
    // 编辑
    handleEdit(id) {
      // console.log(id);
      // 弹出模态框
      this.visible = true;
      // 保留id 这个id就是要修改的是数据的id
      this.editId = id;
      goodsEdit({ id: id })
        .then(res => {
          // console.log(res);
          // 接受后端数据响应的数据
          let { data } = res;
          // 回填表单
          this.editform.goodsName = data[0].goodsName;
          this.editform.classify = data[0].classify;
          this.editform.isPromotion = data[0].isPromotion;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 保存修改
    saveEdit() {
      // 调用前端验证
      this.$refs.editform.validate(valid => {
        if (valid) {
          this.visible = false;
          // 收集参数
          let params = {
            goodsName: this.editform.goodsName,
            classify: this.editform.classify,
            isPromotion: this.editform.isPromotion,
            id: this.editId
          };
          saveEdit(params)
            .then(res => {
              // 接受响应数据
              let { code, message } = res;
              if (code === 0) {
                this.$message({
                  type: "success",
                  message: message
                });
                // 刷新列表
                this.goodsData();
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    // 删除
    handleDelete(id) {
      this.$confirm("你确定要删除吗：", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //如果确认走then
          goodsRemolve({ id })
            .then(reponse => {
              // 接受后端响应的数据
              let { code, message } = reponse;
              if (code === 0) {
                // 弹成功提示
                this.$message({
                  type: "success",
                  message: message
                });
                // 刷新列表
                this.goodsData();
              } else if (code === 1) {
                this.$message.error(message);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 每页条数
    handleSizeChange(pageSize) {
      this.pageSize = pageSize; //每页条数改变
      this.goodsData();
    },
    //当前页
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage; //当前页
      this.goodsData();
    },
    // 多选框监听动态
    selectChange(selectData) {
      // 循环选中的id，放入新的数组中
      this.delArr = selectData.map(v => v.id);
    },

    // 批量删除
    bachDel() {
      console.log(this.delArr.length);
      if (!this.delArr.length) {
        this.$message.error("请先选中再操作");
        return;
      }
      // 优化提示
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 收集参数
          let params = { idArr: this.delArr };
          // 发送请求
          bachDel(params)
            .then(res => {
              //  接受后台响应的数据
              let { code, message } = res;
              if (code === 0) {
                this.$message({
                  type: "success",
                  message: message
                });
                // 渲染页面
                this.goodsData();
              } else if (code === 1) {
                this.$message.error(message);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    deselect() {
      this.$refs.goodsMgForm.clearSelection();
    },

    // 分页函数
    goodsData() {
      // 手机参数
      let params = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        classify: this.searchForm.classify,
        keyWord: this.searchForm.keyWord
      };
      goodsList(params)
        .then(response => {
          let { data ,total} = response;
          // 渲染页面
          this.goodsMgForm = data;
          this.total = total;
          // 边界判定
          // if (!data.length && this.currentPage !== 1) {
          //   this.currentPage -= 1;
          //   this.goodsData();
          // }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 模糊查询
    search() {
    this.goodsData();
      // // 收集参数
      let params = {
        classify: this.searchForm.classify,
        keyWord: this.searchForm.keyWord
      };
      // 发送给后台
      searchGoods(params)
        .then(res => {
          // // 接受后台响应的参数
          let { data} = res;
          // 渲染
          this.goodsMgForm = data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.goodsData();
  },

  filters: {
    filterCtime(ctime) {
      return moment(ctime).format("YYYY-MM-DD");
    }
  }

  // }
};
</script>

<style lang="less">
.goods-manage {
  .el-card {
    .el-card__header {
      font-size: 20px;
      font-weight: bold;
      background-color: #f1f1f1;
    }
    .el-card__body {
      .item {
        .el-row {
          border-bottom: 2px solid #dcdfe6;
        }
        .el-dropdown {
          .el-button--primary {
            background-color: #fff;
            color: #606266;
            border: 1px solid #dcdfe6;
          }
        }
      }
    }
  }
}
</style>