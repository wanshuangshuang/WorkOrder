<template>
  <div class="popver-content">
    <div class="max-checkbox-group">
      <el-checkbox-group v-model="checkList" @change="handleCheckedChange">
          <el-checkbox v-for="item in colData" :label="item.title" :key="item.title">
          </el-checkbox>
      </el-checkbox-group>
      <div class="small-row-margin">工序自定义字段</div>
      <el-checkbox-group v-model="checkList" @change="handleCheckedChange">
          <el-checkbox v-for="item in orderList" :label="item.title" :key="item.title">
          </el-checkbox>
      </el-checkbox-group>
      <div class="small-row-margin">工单自定义字段</div>
      <el-checkbox-group v-model="checkList" @change="handleCheckedChange">
          <el-checkbox v-for="item in productionList" :label="item.title" :key="item.title">
          </el-checkbox>
      </el-checkbox-group>
    </div>
  <div class="text-align-right top-default-margin">
    <el-button size="mini" @click="cancel">取 消</el-button>
    <el-button size="mini" type="primary"  @click="save()">确 定</el-button>
  </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props:['checkListAll'],
  data() {
    return {
      checkList:[],
      orderList:[],
      productionList:[],
    }
  },
  created() {
    var _this = this
    this.initData()
    this.checkList = JSON.parse(JSON.stringify(this.checkListAll))
  },
  methods: {
    initData(){
      this.orderList = [
        { title: "技术要求", }
      ]
      this.productionList = [
        { title: "车间类型",  },
        { title: "重量", },
        { title: "客户名称", },
        { title: "客户类型", },
        { title: "工单类型", },
        { title: "是否启动微信通知", },
      ]
      this.colData = [
          { title: "工单编号",},
          { title: "工单状态",},
          { title: "关联单据",},
          { title: "备注", },
          { title: "工序编号", },
          { title: "报工权限", },
          { title: "计划数", },
          { title: "良品数", },
          { title: "不良品数", },
          { title: "分配列表", },
          { title: "工序名称", },
          { title: "计划开始时间", },
          { title: "计划结束时间", },
          { title: "实际开始时间", },
          { title: "实际结束时间", },
          { title: "产品编号", },
          { title: "产品名称", },
          { title: "产品规格", },
          { title: "工序状态", },
          { title: "优先级", },
          { title: "分配状态", },
          { title: "子工艺路线", },
          { title: "创建人", },
          { title: "更新人", },
          { title: "创建时间", },
          { title: "更新时间", },
          ]
    },
    handleCheckedChange(options){

    },
    cancel(){
      this.$emit('done',{type:'cancel'})
    },
    save(){
      console.log('this.checkList',this.checkList);
      this.$emit('done',{type:'save',data:this.checkList})
    },
  }
}
</script>

<style>
.popver-content .max-checkbox-group{
  max-height: 450px;
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
.popver-content .el-checkbox{
  width: 50%;
  margin: 0;
  margin-bottom: 4px;
}
</style>
