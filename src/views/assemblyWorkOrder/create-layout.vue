<template>
  <div>
    <div class="white-background list-top-margin">
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">生产管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">装配工单</el-breadcrumb-item>
          <el-breadcrumb-item>创建</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="grey-background"></div>
      <div class="default-title defult-row-margin">创建装配工单</div>
      <el-form :model="form" class="user-search" label-width="108px" size="small">
        <el-row>
          <el-col :span="8">
            <el-form-item label="单据编号">
              <el-input size="small" v-model="form.documentNo" placeholder="请输入，忽略将自动生成"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="white-background">
      <div class="default-title defult-row-margin">产品明细</div>
      <el-row class="defult-row-margin">
        <el-col :span="6">
          <el-button size="small" type="primary" icon="el-icon-plus" @click="add()">添加产品</el-button>
          <el-button size="small" type="primary" icon="el-icon-plus" @click="add()" plain>按BOM添加</el-button>
          <el-button size="small" type="primary" icon="el-icon-upload2" @click="add()" plain>导入数据</el-button>
        </el-col>
        <el-col :span="18" class="text-align-right">
          <el-button size="small" icon="el-icon-s-operation">列配置</el-button>
        </el-col>
      </el-row>
      <product-detail-table ref="productDetailTable" :formData="form"></product-detail-table>
      <div class="text-align-center">
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button size="small" type="primary"  @click="save()" v-if="!disabled">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import ProductDetailTable from './product-detail-table.vue'
export default {
  props:['mode'],
  components: {
    ProductDetailTable,
  },
  data() {
    return {
      disabled:false,
      form:{
        documentNo:''
      }
    }
  },
  created(){
    if(this.mode == 'view'){
      this.disabled = true
    }
  },
  methods: {
    cancel:function(){
      this.$emit('done',{type:'cancel'})
    },
    save:function(){
      this.$emit('done',{type:'save'})
    },
    add(){},
  },
}
</script>
<style scoped>
.user-search {
  margin-top: 20px;
}
.normal-half-width{
  width: calc(100% - 132px);
  margin-left: 8px;
}
.fold-botton{
  font-size: 14px;
  color: #1890ff;
  margin-right: 12px;
  cursor: pointer;
}
/* .default-title{
  margin: 30px 0;
} */
.small-title{
  font-size: 14px;
  margin: 30px 0;
}
</style>
