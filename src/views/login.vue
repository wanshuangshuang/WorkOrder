<template>
  <div class="login-wrap">
    <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm login-container">
      <div class="login-margin">
        <div class="title" :class="{'not-choose':!isLoginChoose}" @click="changeChoose" style="border-radius: 5px 0 0 5px;">登录</div>
        <div class="title" :class="{'not-choose':isLoginChoose}" @click="changeChoose" style="border-radius: 0 5px 5px 0;">注册</div>
      </div>
      <!-- 登录页 -->
      <div v-if="isLoginChoose">
        <el-row class="small-title">
          <el-col :span="12">
          <div :class="{'grey':!isPhoneLogin}" @click="changeChoosePhone">手机号登录</div>
        </el-col>
          <el-col :span="12" class="text-align-right">
            <div :class="{'grey':isPhoneLogin}" @click="changeChoosePhone">工厂账号登录</div>
          </el-col>
        </el-row>
        <el-form-item prop="plantD" v-if="!isPhoneLogin">
          <el-input type="text" v-model="ruleForm.plantD" auto-complete="off" placeholder="工厂代码"></el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-checkbox class="remember" v-model="rememberpwd">保持登录</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click="submitForm('ruleForm')" :loading="logining">登录</el-button>
        </el-form-item>
      </div>
      <!-- 注册页 -->
      <div v-if="!isLoginChoose">
        <el-row class="small-title">
          <el-col :span="12">
          <div :class="{'grey':!isPhoneLoginReg}" @click="changeChoosePhoneReg">手机号注册</div>
        </el-col>
          <el-col :span="12" class="text-align-right">
            <div :class="{'grey':isPhoneLoginReg}" @click="changeChoosePhoneReg">工厂账号注册</div>
          </el-col>
        </el-row>
        <el-form-item prop="plantD" v-if="!isPhoneLoginReg">
          <el-input type="text" v-model="ruleForm.plantD" auto-complete="off" placeholder="工厂代码"></el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click="submitForm('ruleForm')" :loading="logining">注册</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
import { login } from '../api/userMG'
import { setCookie, getCookie, delCookie } from '../utils/util'
import md5 from 'js-md5'
export default {
  name: 'login',
  data() {
    return {
      //定义loading默认为false
      logining: false,
      // 记住密码
      rememberpwd: false,
      ruleForm: {
        //username和password默认为空
        username: '',
        password: '',
        randomStr: '',
      },
      //rules前端验证
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
      isLoginChoose:true,
      isPhoneLogin:true,
      isLoginChooseReg:true,
      isPhoneLoginReg:true,

    }
  },
  // 创建完毕状态(里面是操作)
  created() {
    this.$message({
      message: '账号密码不为空即可',
      type: 'success'
    })
    // 获取存在本地的用户名密码
    this.getuserpwd()

  },
  // 里面的函数只有调用才会执行
  methods: {
    changeChoose(){
      this.isLoginChoose = !this.isLoginChoose;
    },
    changeChoosePhone(){
      this.isPhoneLogin = !this.isPhoneLogin;
    },
    changeChooseReg(){
      this.isLoginChooseReg = !this.isLoginChooseReg;
    },
    changeChoosePhoneReg(){
      this.isPhoneLoginReg = !this.isPhoneLoginReg;
    },
    // 获取用户名密码
    getuserpwd() {
      if (getCookie('user') != '' && getCookie('pwd') != '') {
        this.ruleForm.username = getCookie('user')
        this.ruleForm.password = getCookie('pwd')
        this.rememberpwd = true
      }
    },
    //获取info列表
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.logining = true
          // 测试通道，不为空直接登录
          setTimeout(() => {
            this.logining = false
            this.$store.commit('login', 'true')
            this.$router.push({ path: '/goods/Goods' })
          }, 1000)
          // 注释
          // login(this.ruleForm).then(res => {
          //   if (res.success) {
          //     if (this.rememberpwd) {
          //       //保存帐号到cookie，有效期7天
          //       setCookie('user', this.ruleForm.username, 7)
          //       //保存密码到cookie，有效期7天
          //       setCookie('pwd', this.ruleForm.password, 7)
          //     } else {
          //       delCookie('user')
          //       delCookie('pwd')
          //     }
          //     //如果请求成功就让他2秒跳转路由
          //     setTimeout(() => {
          //       this.logining = false
          //       // 缓存token
          //       localStorage.setItem('logintoken', res.data.token)
          //       // 缓存用户个人信息
          //       localStorage.setItem('userdata', JSON.stringify(res.data))
          //       this.$store.commit('login', 'true')
          //       this.$router.push({ path: '/goods/Goods' })
          //     }, 1000)
          //   } else {
          //     this.$message.error(res.msg)
          //     this.logining = false
          //     return false
          //   }
          // })
        } else {
          this.$message.error('请输入用户名密码！')
          this.logining = false
          return false
        }
      })
    },
  }
}
</script>

<style scoped>
.login-wrap {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 10%;
  background-image: url(../assets/img/bg.png);
  width: 1920px;
  background-repeat: no-repeat;
  background-position: center right;
  background-size: 100%;
}
.login-container {
  position: relative;
  left:12%;
  border-radius: 10px;
  width: 350px;
  padding: 40px 35px 30px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  text-align: left;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}
/* .title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
} */
.remember {
  margin: 0px 0px 35px 0px;
}
.login-wrap .title{
  display: inline-block;
  width: 142px;
  text-align: center;
  font-size: 18px;
  padding: 12px 15px;
  color: #fff;
  cursor: pointer;
  background-color: #1890ff;
}
/* .login-wrap .choose{

} */
.login-wrap .not-choose{
  color: #87CEEB;
  background-color: rgba(30,144,255,0.8);
}
.login-margin{
  margin-bottom: 30px;
}
.text-align-right{
  text-align: right;
}
.login-wrap .small-title{
  font-size: 12px;
  margin-bottom: 15px;
  cursor: pointer;
}
.login-wrap .small-title .grey{
  color: #ccc;
}
</style>
