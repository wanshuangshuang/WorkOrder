<template>
  <el-container class="index-con">
    <el-aside :class="showclass">
      <leftnav></leftnav>
    </el-aside>
    <el-container class="main-con">
      <el-header class="index-header">
        <navcon></navcon>
      </el-header>
      <el-main clss="index-main">
        <div class="router-main">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// 导入组件
import navcon from '../components/navcon.vue'
import leftnav from '../components/leftnav.vue'
export default {
  name: 'index',
  data() {
    return {
      showclass: 'asideshow',
      showtype: false
    }
  },
  // 注册组件
  components: {
    navcon,
    leftnav
  },
  methods: {},
  created() {
    // 监听
    this.$root.Bus.$on('toggle', value => {
      if (value) {
        this.showclass = 'asideshow'
      } else {
        setTimeout(() => {
          this.showclass = 'aside'
        }, 300)
      }
    })
  },
  beforeUpdate() {},
  // 挂载前状态(里面是操作)
  beforeMount() {
    // 弹出登录成功
    this.$message({
      message: '登录成功',
      type: 'success'
    })
  }
}
</script>
<style >
.index-con {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

.aside {
  width: 64px !important;
  height: 100%;
  /* background-color: #334157; */
  margin: 0px;
}
.asideshow {
  width: 240px !important;
  height: 100%;
  /* background-color: #334157; */
  margin: 0px;
}
.index-header,
.index-main {
  padding: 0px;
  /* border-left: 2px solid #333; */
}
.el-container .el-container{
  background: #F1F2F6;
}
.el-main{
  padding: 15px;
}
.text-align-right{
  text-align: right;
}
.text-align-center{
  text-align: center;
}
.white-background{
  background-color: #fff;
  padding: 15px;
  border-radius: 4px;
}
.list-top-margin{
  margin-bottom: 15px;
}
.defult-row-margin{
  margin: 15px 0;
}
/* ::-webkit-scrollbar {
    width: 20px;
    height: 12px;
}

::-webkit-scrollbar-track {
    background-color: #e4e4e4;
    border-radius: 50px;
}

::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 50px;
} */
</style>
