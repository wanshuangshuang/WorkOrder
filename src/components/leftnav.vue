/**
* 左边菜单
*/
<template>
<!-- background-color="#334157" text-color="#fff" -->
  <el-menu :collapse="collapsed" collapse-transition router :default-active="$route.path" unique-opened class="el-menu-vertical-demo"  active-text-color="#1890ff">
    <div class="logobox">
      <div class="left-title">
        <img src="../assets/img/logo.png" alt="" class="logo">
        <span>智慧工厂</span>
        </div>
    </div>
    <template v-for="menu in allmenu">
      <el-submenu v-if="menu.menus != null && menu.menus.length>0" :key="menu.menuid" :index="menu.menuname">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span>{{menu.menuname}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="chmenu in menu.menus" :index="'/'+chmenu.url" :key="chmenu.menuid">
            <i :class="chmenu.icon"></i>
            <span>{{chmenu.menuname}}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item v-if="menu.menus == null || menu.menus.length==0" :index="'/'+menu.url" :key="menu.menuid">
        <i :class="menu.icon"></i>
        <span>{{menu.menuname}}</span>
      </el-menu-item>
    </template>
    <!-- <el-submenu v-for="menu in allmenu" :key="menu.menuid" :index="menu.menuname">
      <template slot="title">
        <i :class="menu.icon"></i>
        <span>{{menu.menuname}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for="chmenu in menu.menus" :index="'/'+chmenu.url" :key="chmenu.menuid">
          <i :class="chmenu.icon"></i>
          <span>{{chmenu.menuname}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu> -->
  </el-menu>
</template>
<script>
import { menu } from "../api/userMG";
export default {
  name: "leftnav",
  data() {
    return {
      collapsed: false,
      allmenu: []
    };
  },
  // 创建完毕状态(里面是操作)
  created() {
    // 获取图形验证码
    let res = {
      success: true,
      data: [
        {
          menuid: 1,
          icon: "el-icon-s-home",
          menuname: "主页",
          hasThird: null,
          url: "home/Home",
          menus: []
        }, {
          menuid: 2,
          icon: "el-icon-s-management",
          menuname: "生产管理",
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 2.1,
              icon: "el-icon-s-order",
              menuname: "销售订单",
              hasThird: "N",
              url: "goods/Goods",
              menus: null
            },
            {
              menuid: 2.2,
              icon: "el-icon-s-order",
              menuname: "装配工单",
              hasThird: "N",
              url: "assemblyWorkOrder/main-layout",
              menus: null
            },
            {
              menuid: 2.3,
              icon: "el-icon-s-order",
              menuname: "工单",
              hasThird: "N",
              url: "order/Order",
              menus: null
            },
            {
              menuid: 2.4,
              icon: "el-icon-s-order",
              menuname: "任务",
              hasThird: "N",
              url: "task/Task",
              menus: null
            },
            {
              menuid: 2.5,
              icon: "el-icon-s-order",
              menuname: "报工",
              hasThird: "N",
              url: "workReport/WorkReport",
              menus: null
            }
          ]
        },
        {
          menuid: 3,
          icon: "el-icon-s-management",
          menuname: "库存管理",
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 3.1,
              icon: "el-icon-s-order",
              menuname: "入库单",
              hasThird: "N",
              url: "warehousingOrder/WarehousingOrder",
              menus: null
            },
            {
              menuid: 3.2,
              icon: "el-icon-s-order",
              menuname: "出库单",
              hasThird: "N",
              url: "outboundOrder/OutboundOrder",
              menus: null
            },
            {
              menuid: 3.3,
              icon: "el-icon-s-order",
              menuname: "库存收发明细",
              hasThird: "N",
              url: "stockRDDetail/StockRDDetail",
              menus: null
            },
            {
              menuid: 3.4,
              icon: "el-icon-s-order",
              menuname: "库存余额",
              hasThird: "N",
              url: "stockBalance/StockBalance",
              menus: null
            },
            {
              menuid: 3.5,
              icon: "el-icon-s-order",
              menuname: "进销存汇总",
              hasThird: "N",
              url: "inventorySummary/InventorySummary",
              menus: null
            }
          ]
        },
        {
          menuid: 4,
          icon: "el-icon-s-management",
          menuname: "基础数据",
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 4.1,
              icon: "el-icon-s-order",
              menuname: "产品定义",
              hasThird: "N",
              url: "productDefinition/ProductDefinition",
              menus: null
            },
            {
              menuid: 4.2,
              icon: "el-icon-s-order",
              menuname: "物料清单",
              hasThird: "N",
              url: "materialList/MaterialList",
              menus: null
            },
            {
              menuid: 4.3,
              icon: "el-icon-s-order",
              menuname: "单位",
              hasThird: "N",
              url: "unit/Unit",
              menus: null
            },
            {
              menuid: 4.4,
              icon: "el-icon-s-order",
              menuname: "不良品项",
              hasThird: "N",
              url: "defectiveProduct/DefectiveProduct",
              menus: null
            },
            {
              menuid: 4.5,
              icon: "el-icon-s-order",
              menuname: "工序",
              hasThird: "N",
              url: "workProcedure/WorkProcedure",
              menus: null
            },
             {
              menuid: 4.6,
              icon: "el-icon-s-order",
              menuname: "工艺路线",
              hasThird: "N",
              url: "processRouting/ProcessRouting",
              menus: null
            },
             {
              menuid: 4.7,
              icon: "el-icon-s-order",
              menuname: "绩效工资配置",
              hasThird: "N",
              url: "performAllocation/PerformAllocation",
              menus: null
            }
          ]
        },
      ],
      msg: "success"
    };
    this.allmenu = res.data;

    // menu(localStorage.getItem('logintoken'))
    //   .then(res => {
    //     console.log(JSON.stringify(res))
    //     if (res.success) {
    //       this.allmenu = res.data
    //     } else {
    //       this.$message.error(res.msg)
    //       return false
    //     }
    //   })
    //   .catch(err => {
    //     this.$message.error('菜单加载失败，请稍后再试！')
    //   })
    // 监听
    this.$root.Bus.$on("toggle", value => {
      this.collapsed = !value;
    });
  }
};
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
  text-align: left;
}
.el-menu-item-group__title {
  padding: 0px;
}
.el-menu-bg {
  /* background-color: #1f2d3d !important; */
}
.el-menu {
  border: none;
}
.logobox {
  height: 60px;
  color: #9d9d9d;
  font-size: 20px;
  text-align: left;
  /* padding: 20px 0px; */
  background-color: #1890ff
}
.logoimg {
  height: 40px;
}
.left-title {
  font-size: 18px;
  color: rgb(255, 255, 255);
  padding: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
}
.logo{
  width: 22px;
  vertical-align: middle;
}
</style>
