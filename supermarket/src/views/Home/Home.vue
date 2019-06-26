<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <!-- 左侧组件 -->
        <LeftNav/>
      </el-aside>
      <el-container>
        <!-- 上 -->
        <el-header>
          <Top></Top>
        </el-header>
        <!-- 中 -->
        <el-main>
          <!-- 路由出口 -->
          <router-view></router-view>
        </el-main>
        <!-- 下 -->
        <el-footer>
          <Bottom></Bottom>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 引入右菜单组件
import LeftNav from "@/components/LeftNav/LeftNav.vue";
import Top from "@/components/Top/Top.vue";
import Bottom from "@/components/Bottom/Bottom.vue";

export default {
  components: {
    LeftNav,
    Top,
    Bottom
  }
};
</script>

<style lang="less">
.home {
  height: 100%;
  .el-container {
    height: 100%;
    .el-aside {
      background-color: rgb(84, 92, 100);
    }
    .el-container {
      .el-header {
        line-height: 60px;
        font-size:20px;
        border-bottom: 1px solid #545c64;
      }

      .el-footer {
        font-size: 14px;
        border-top: 1px solid #545c64;
        line-height: 60px;
      }
    }
  }
}
</style>