<template>
  <div class="default-title save-templete">
     <el-form label-width="120px" ref="form" :model="form" class="list-top-margin" :size="buttonSize" :rules="rules">
        <el-row>
          <el-col :span="24">
            <el-form-item label="工艺路线编号" prop="routingNo">
              <el-input size="small" v-model="form.routingNo" placeholder=" 请输入，忽略将自动生成"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="工艺路线名称" prop="routingName">
              <el-input size="small" v-model="form.routingName" placeholder=" 请输入工艺路线名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="text-align-center" style="position: relative;">
        <el-button size="small" @click="cancel">取 消</el-button>
        <el-button size="small" type="primary" class="title" @click="save">确 定</el-button>
      </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      buttonSize:'small',
      form:{
        routingNo:'',
        routingName:'',
      },
      rules:{
        routingName: [{
            required: true,
            message: "请输入工艺路线名称",
            trigger: "blur",
        },] ,
      },
      routingOptions:[{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
    }
  },
  methods:{
    cancel(){
      this.$emit('done',{type:'cancel'})
    },
    save(){
      this.$refs.form.validate((valid) => {
          if (valid) {
            this.$emit('done',{type:'save'})
          }
      })

    },
  }
}
</script>
<style scoped>
.save-templete .el-input-group__append, .el-input-group__prepend{
  color: #fff;
  background-color: #409EFF;
  border-radius: 0 4px 4px 0;
}
.select-count-content{
  position: absolute;
  left: 0;
  top: -45px;
  font-size: 12px;
}
</style>

