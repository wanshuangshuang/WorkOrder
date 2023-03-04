<template>
  <div class="default-title">
     <el-form label-width="80px" :model="form" class="list-top-margin templete-dialog" :size="buttonSize">
        <el-row>
          <el-col :span="24">
            <el-form-item label="工艺路线">
              <el-select v-model="form.routing" filterable placeholder="请选择" class="full-width">
                 <el-option
                   v-for="item in routingOptions"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                 </el-option>
               </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="类型">
              <el-radio-group v-model="form.type">
                <el-radio label="工序"></el-radio>
                <el-radio label="工艺路线"></el-radio>
              </el-radio-group>
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
        routing:'',
        type:'工序',
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
      this.$emit('done',{type:'save'})
    },
  }
}
</script>
<style scoped>
.templete-dialog .el-input-group__append, .el-input-group__prepend{
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

