<template>
  <div class="popver-content">
    <el-checkbox-group v-model="checkList" @change="handleCheckedChange" :min="6">
    <el-checkbox v-for="item in allList" :label="item.title" :key="item.title" :disabled="item.disabled">
      <i class="el-icon-s-promotion" :class="{'font-blue-clor':item.isFixed}"  @click.prevent="lookChoice(1,item)"></i>
      <span @click.prevent="lookChoice()" style="cursor:text;user-select:text;">{{item.title}}</span>
      <i class="el-icon-s-fold right-icon" style="cursor: auto;"></i>
    </el-checkbox>
  </el-checkbox-group>
  <div class="text-align-right top-default-margin">
    <el-button size="mini" @click="cancel">取消</el-button>
    <el-button size="mini" type="primary"  @click="save()">保存</el-button>
  </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props:['colData'],
  data() {
    return {
      checkList:[],
      allList:[],
    }
  },
  created() {
    var _this = this
    this.allList = JSON.parse(JSON.stringify(this.colData))
    this.allList.map(function(item){
      if(item.istrue == true){
        _this.checkList.push(item.title)
      }
    })
  },
  methods: {
    handleCheckedChange(options){

      if(this.checkList.length <= 6){
        this.$message.warning('非固定列数量不能少于6个!')
        return
      }

    },
    lookChoice(options,item){
      if(options === 1){
        var max = this.allList.filter(function(item){return item.isFixed == true})
        if(max.length >= 5){
          this.$message.warning('最多固定5列')
          return
        }
        this.$set(item,'isFixed',!item.isFixed)
      }
    },
    cancel(){
      this.$emit('done',{type:'cancel'})
    },
    save(){
      var _this = this
      this.allList.map(function(item){
        if(_this.checkList.indexOf(item.title)!=-1){
          _this.$set(item,'istrue',true)
        }else{
          _this.$set(item,'istrue',false)
        }
      })
      this.$emit('done',{type:'save',data:this.allList})
    },
  }
}
</script>

<style>
.popver-content .el-checkbox-group{
  position: relative;
  max-height: 194px;
  overflow-y: auto;
}
.popver-content .el-checkbox__input.is-checked+.el-checkbox__label {
  color: #606266!important;
}
.popver-content .font-blue-clor{
  color: #1890ff;
}
.popver-content .el-checkbox, .el-checkbox__input{
  position: static;
}
.popver-content .right-icon{
  position: absolute;
  right: 0;
  color: #1890ff;
}
</style>
