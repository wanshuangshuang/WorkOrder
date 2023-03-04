<template>
  <el-container class="index-con">
    <el-aside :class="showclass">
      <leftnav></leftnav>
    </el-aside>
    <el-container class="main-con">
      <el-header class="index-header" style="background-color: #1890ff;">
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
.el-menu-vertical-demo:not(.el-menu--collapse){
  width: 240px;
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
  padding: 20px;
  border-radius: 4px;
}
.list-top-margin{
  margin-bottom: 15px;
}
.top-default-margin{
  margin-top: 10px;
}
.bottom-mini-margin{
  margin-bottom: 5px;
}
.bottom-small-margin{
  margin-bottom: 8px;
}
.bottom-default-margin{
  margin-bottom: 10px;
}
.left-default-margin{
  margin-left: 10px;
}
.left-large-margin{
  margin-left: 15px;
}
.right-large-margin{
  margin-right: 15px;
}
.defult-row-margin{
  margin: 15px 0;
}
.small-row-margin{
  margin: 8px 0;
}
.common-font-size{
  font-size: 16px;
}
.default-top-bottom{
  margin: 15px 0;
}
.user-search {
  margin-top: 20px;
}

.default-title{
  font-size: 16px;
}
.question-icon{
  font-size: 22px;
  color: rgba(0, 0, 0, 0.45);
  vertical-align: middle;
  margin-left: 5px;
  cursor: pointer;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .full-width{
    width: 100%;
  }
  .list-line-box::-webkit-scrollbar{
    width: 6px;
    height: 6px;
  }
  .list-line-box::-webkit-scrollbar-thumb{
    background-color: #ddd;
    border-radius: 3px;
  }
  /* .el-table__body-wrapper */
  /* 全局滚动条样式 */
  ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  }
  ::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 3px;
  }

</style>
