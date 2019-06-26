<template>
  <div class="left-nav">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      router
    >
      <!-- 导航 -->
      <el-submenu :index="(index + 1) + ''" v-for="(item, index) in leftNav" :key="index">
        <template slot="title">
          <i :class="item.iconClass"></i>
          <span>{{ item.title }}</span>
        </template>

        <el-menu-item
          v-for="(submenu,index) in item.children"
          :index="submenu.path"
          :key="index"
        >{{ submenu.subTitle}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
// 引入请求
import { getRole } from "@/api/account";
export default {
  data() {
    return {
      // 导航菜单数据
      leftNav: []
    };
  },
  created() {
    getRole()
      .then(res => {
        // 获取角色信息
        let { role } = res;
        let menus = [
          //账号管理
          {
            iconClass: "el-icon-s-custom",
            title: "账号管理",
            role: ["超级管理员"],
            children: [
              {
                path: "/home/accountmanage",
                subTitle: "账号管理"
              },
              {
                path: "/home/passwordmodify",
                subTitle: "密码修改"
              },
              {
                path: "/home/accountadd",
                subTitle: "账号添加"
              }
            ]
          },
          // 商品管理
          {
            iconClass: "el-icon-s-order",
            title: "商品管理",
            role: ["超级管理员", "普通用户"],
            children: [
              {
                path: "/home/goodsmanage",
                subTitle: "商品管理"
              },
              {
                path: "/home/goodsadd",
                subTitle: "商品添加"
              }
            ]
          },
          // 统计管理
          {
            iconClass: "el-icon-edit",
            title: "统计管理",
            role: ["超级管理员"],
            children: [
              {
                path: "/home/selltotal",
                subTitle: "销售统计"
              },
              {
                path: "/home/stocktotal",
                subTitle: "进货统计"
              }
            ]
          },
          // 系统信息
          {
            iconClass: "el-icon-setting",
            title: "系统信息",
            role: ["超级管理员", "普通用户"],
            children: [
              {
                path: "/home/systeminfo",
                subTitle: "系统信息"
              }
            ]
          },
          //出货管理
          {
            iconClass: "el-icon-shopping-cart-2",
            title: "出货管理",
            role: ["超级管理员",'普通用户'],
            children: [
              {
                path: "/home/salesreturn",
                subTitle: "商品退货"
              },
              {
                path: "/home/selllist",
                subTitle: "销售列表"
              },
              {
                path: "/home/goodsstock",
                subTitle: "商品出库"
              }
            ]
          },
          // 进货管理
          {
            iconClass: "el-icon-shopping-cart-full",
            title: "进货管理",
            role: ["超级管理员"],
            children: [
              {
                path: "/home/kucunadd",
                subTitle: "添加库存"
              },
              {
                path: "/home/kucunmanage",
                subTitle: "库存管理"
              }
            ]
          }
        ];
        // 过滤导航
        this.leftNav = menus.filter(v => v.role.includes(role));
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="less">
.left-nav {
  .el-menu {
    border: none;
    .el-submenu {
      .el-submenu__title {
        & > i {
          color: #fff;
        }
      }
    }
  }
}
</style>