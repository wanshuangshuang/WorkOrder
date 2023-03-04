<template>
  <div class="common-font-size">
    <el-row class="navcon-title">
      <img class="showimg" :src="collapsed?imgsq:imgshow" @click="toggle(collapsed)">
      <el-col :span="24" style="text-align: right;">
        <div style="position: relative;">
          <i class="el-icon-bell"></i>
          <span class="end-time">到期时间：{{endTime}}</span>
          <i class="el-icon-s-custom left-large-margin"></i>
          <span class="right-large-margin user-name">
            <el-popover
              placement="top-start"
              width="200"
              trigger="click"
              >
               <div class="logout-card">
                  <div class="el-main">
                    <div class="list-top-margin">超级管理员</div>
                    <div>工厂ID：9412134</div>
                  </div>
                  <el-divider></el-divider>
                  <div class="logout-button" @click="exit()">退出登录</div>
                </div>
              <span id="the_div2" slot="reference">超级管理员</span>
            </el-popover>
          </span>
        </div>
      </el-col>
    </el-row>

  </div>
</template>
<script>
import { loginout } from '../api/userMG'
export default {
  name: 'navcon',
  data() {
    return {
      collapsed: true,
      imgshow: require('../assets/img/show.png'),
      imgsq: require('../assets/img/sq.png'),
      user: {},
      endTime:'2023-4-20',
    }
  },
  // 创建完毕状态(里面是操作)
  created() {
    this.user = JSON.parse(localStorage.getItem('userdata'))
  },
  mounted(){
    // window.onload = function() {
    //   document.onclick = function(e) {
    //     var ele =  e.target
    //     if(ele.id !== 'the_div' && ele.id !== 'the_div2') {
    //       if(document.getElementById('the_div')){
    //         document.getElementById('the_div').style.display = 'none';
    //       }
    //     }else if(ele.id == 'the_div2'){
    //       document.getElementById('the_div').style.display = 'inline-block';
    //     }
    //   }
    // }
  },
  methods: {
    // 退出登录
    exit() {
      this.$confirm('退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          setTimeout(() => {
            this.$store.commit('logout', 'false')
            this.$router.push({ path: '/login' })
            this.$message({
              type: 'success',
              message: '已退出登录!'
            })
          }, 1000)
          // loginout()
          //   .then(res => {
          //     if (res.success) {
          //       //如果请求成功就让他2秒跳转路由
          //       setTimeout(() => {
          //         this.$store.commit('logout', 'false')
          //         this.$router.push({ path: '/login' })
          //         this.$message({
          //           type: 'success',
          //           message: '已退出登录!'
          //         })
          //       }, 1000)
          //     } else {
          //       this.$message.error(res.msg)
          //       this.logining = false
          //       return false
          //     }
          //   })
          //   .catch(err => {
          //     // 获取图形验证码
          //     this.getcode()
          //     this.logining = false
          //     this.$message.error('退出失败，请稍后再试！')
          //   })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    // 切换显示
    toggle(showtype) {
      this.collapsed = !showtype
      this.$root.Bus.$emit('toggle', this.collapsed)
    },
  }
}
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
}
/* .submenu {
  float: right;
} */
.buttonimg {
  height: 60px;
  background-color: transparent;
  border: none;
}
.showimg {
  width: 26px;
  height: 26px;
  position: absolute;
  top: 17px;
  left: 17px;
  z-index: 1000;
}
/* .showimg:active {
  border: none;
} */
/* .el-submenu {
  background-color: #fff;
} */
.navcon-title{
  height: 60px;
  line-height: 60px;
  color: #fff;
}
.end-time{
  font-size: 14px;
}
.user-name{
  cursor: pointer;
}
.logout-button{
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(255, 0, 0);
  height: 30px;
  cursor: pointer;
}
.el-divider--horizontal{
  margin: 5px 0px;
}
</style>
