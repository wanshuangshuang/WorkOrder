/**
* 左边菜单
*/
<template>
  <el-menu :collapse="collapsed" collapse-transition router :default-active="$route.path" unique-opened class="el-menu-vertical-demo" background-color="#334157" text-color="#fff" active-text-color="#1890ff">
    <div class="logobox">
      <div class="left-title">黑湖小工单</div>
    </div>
    <el-submenu v-for="menu in allmenu" :key="menu.menuid" :index="menu.menuname">
      <template slot="title">
        <i class="iconfont" :class="menu.icon"></i>
        <span>{{menu.menuname}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for="chmenu in menu.menus" :index="'/'+chmenu.url" :key="chmenu.menuid">
          <i class="iconfont" :class="chmenu.icon"></i>
          <span>{{chmenu.menuname}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
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
          icon: "icon-home",
          menuname: "主页",
          hasThird: null,
          url: null,
          menus: []
        }, {
          menuid: 2,
          icon: "li-icon-gongsiguanli",
          menuname: "生产管理",
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 3,
              icon: "icon-cat-skuQuery",
              menuname: "销售订单",
              hasThird: "N",
              url: "goods/Goods",
              menus: null
            }
          ]
        }
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
  background-color: #1f2d3d !important;
}
.el-menu {
  border: none;
}
.logobox {
  height: 40px;
  line-height: 40px;
  color: #9d9d9d;
  font-size: 20px;
  text-align: left;
  padding: 20px 0px;
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
</style>
