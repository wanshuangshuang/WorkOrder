<template>
  <div>
    <div class="white-background list-top-margin">
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">生产管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">工单</el-breadcrumb-item>
          <el-breadcrumb-item>创建工单</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form :model="form" class="user-search" label-width="108px" size="small" :rules="rules">
        <el-row>
          <el-col :span="8">
            <el-form-item label="工单编号">
              <el-input size="small" v-model="form.documentNo" placeholder=" 请输入，忽略将自动生成"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产品">
              <el-select v-model="form.product" filterable placeholder="查找或添加新产品" style="width:calc(100% - 64px);">
                <el-option
                  v-for="item in productOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
                <el-option value="addProduct">添加</el-option>
              </el-select>
              <el-button type="text" class="left-default-margin">高级选择</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计划数">
              <el-input size="small" v-model="form.documentNo" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计划时间">
              <el-date-picker
                style="width: 100%;"
                v-model="form.time"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关联单据">
              <el-input size="small" v-model="form.documentNo" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态">
              <el-input size="small" v-model="form.documentNo" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="form.textarea">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车间类型">
              <el-select v-model="form.product" filterable placeholder="请选择" class="full-width">
                <el-option
                  v-for="item in workshopTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产品信息">
              <el-select v-model="form.product" filterable placeholder="请选择" class="full-width">
                <el-option
                  v-for="item in productInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="重量">
              <el-input size="small" v-model="form.documentNo" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户名称">
              <el-input size="small" v-model="form.documentNo" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户类型" style="position: relative;">
              <div class="choose-title" @click="showMenu" :class="{'default-people':form.customerType == '新客户','common-people':form.customerType == '一般客户','important-people':form.customerType == '重要客户'}">{{form.customerType}}</div>
              <el-select v-model="form.customerType" clearable ref="selectChoose" filterable :placeholder="!form.customerType ? form.customerType:''" class="full-width" popper-class="custumer-type" @clear="clearCustomer">
                <el-option
                  v-for="item in customerOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  <div class="self-select-box" :class="{'default-people':item.label == '新客户','common-people':item.label == '一般客户','important-people':item.label == '重要客户'}">{{item.label}}</div>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工单类型">
              <el-select v-model="form.product" filterable placeholder="请选择" class="full-width" clearable>
                <el-option
                  v-for="item in workOrderOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否启动微信通知">
              <el-select v-model="form.product" filterable placeholder="请选择" class="full-width">
                <el-option
                  v-for="item in weChatNotification"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产品图纸">
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="sop图片">
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="white-background">
      <el-row class="defult-row-margin">
        <el-col :span="6">
          <div class="default-title">生产任务</div>
        </el-col>
        <el-col :span="18" class="text-align-right">
          <el-button size="small" type="primary" icon="el-icon-plus" @click="showDialog('productProgress')" plain>从工序中添加</el-button>
          <el-button size="small" type="primary" icon="el-icon-plus" @click="showDialog('templete')" plain>从模板中添加</el-button>
          <el-button size="small" type="primary" icon="el-icon-check" @click="showDialog('saveTemplete')" >保存为模板</el-button>
        </el-col>
      </el-row>

      <list-table ref="listTable" :formData="form"></list-table>
      <div class="text-align-center">
        <el-button size="small" @click="cancel">取 消</el-button>
        <el-button size="small" type="primary"  @click="save()" v-if="!disabled">保 存</el-button>
      </div>
    </div>
    <!-- 添加工序弹窗 -->
    <el-dialog title="添加工序" :visible.sync="dialog.visible && dialog.mode == 'productProgress'" width="50%" @close="closeProductProgress">
      <production-processes v-if="dialog.visible && dialog.mode == 'productProgress'" @done="closeProductProgress"></production-processes>
    </el-dialog>
    <!-- 从模板中添加弹窗 -->
    <el-dialog title="从模板中添加" :visible.sync="dialog.visible && dialog.mode == 'templete'" width="30%" @close="closeTemplete">
      <templete-dialog v-if="dialog.visible && dialog.mode == 'templete'" @done="closeTemplete"></templete-dialog>
    </el-dialog>
    <!-- 保存为模板 -->
    <el-dialog title="保存为模板" :visible.sync="dialog.visible && dialog.mode == 'saveTemplete'" width="30%" @close="closeSaveTemplete">
      <save-templete v-if="dialog.visible && dialog.mode == 'saveTemplete'" @done="closeSaveTemplete"></save-templete>
    </el-dialog>
  </div>
</template>
<script>
import ListTable from '@/views/order/list-table.vue'
import ProductionProcesses from "@/views/order/dialogManage/production-processes.vue";
import TempleteDialog from "@/views/order/dialogManage/templete-dialog.vue";
import SaveTemplete from "@/views/order/dialogManage/save-templete.vue";
export default {
  props:['mode'],
  components: {
    ListTable,
    ProductionProcesses,
    TempleteDialog,
    SaveTemplete,
  },
  data() {
    return {
      disabled:false,
      form:{
        product:''
      },
      rules:{
        product: [{
            required: true,
            message: "请选择产品",
            trigger: "blur",
        },] ,
      },
      productOptions: [{
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
      productInfoOptions: [{
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
      workshopTypeOptions: [{
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
      customerOptions: [{
        value: '重要客户',
        label: '重要客户'
      }, {
        value: '一般客户',
        label: '一般客户'
      }, {
        value: '新客户',
        label: '新客户'
      }],
      workOrderOptions: [{
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
      weChatNotification: [{
        value: '是',
        label: '是'
      }, {
        value: '否',
        label: '否'
      }],
      imageUrl:'',
      dialog:{
        visible:false,
        mode:''
      },
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
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    closeProductProgress(){
      this.colseCommon()
    },
    showDialog:function(options){
      this.dialog.visible = true
      this.dialog.mode = options
    },
    closeTemplete(){
      this.colseCommon()
    },
    closeSaveTemplete(){
      this.colseCommon()
    },
    colseCommon(){
      this.dialog.visible = false
      this.dialog.mode = ''
    },
    showMenu(){
      this.$nextTick(_ => { this.$refs.selectChoose.toggleMenu(); });
    },
    clearCustomer(){
      this.form.customerType = ''
    },
  },
}
</script>
<style scoped>

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

.small-title{
  font-size: 14px;
  margin: 30px 0;
}
.self-select-box{
  display: inline-block;
  /* margin: 4px 0; */
  padding: 0 4px;
  width: 80px;
  text-align: center;
  border-radius: 5px;
}
.custumer-type .default-people,
.default-people{
  color: #606266;
  background-color:#F4F4F5;
}
.custumer-type .el-select-dropdown__item{
  height: 28px;
  line-height: 28px;
  margin: 5px 0;
}
.custumer-type .el-select-dropdown__item.selected{
  color: #606266;
  font-weight: normal;
  background-color: #ECF5FF;
}
.custumer-type .common-people,
.common-people{
  color: rgb(61, 210, 126);
  background-color: rgb(233, 247, 239);
}
.custumer-type .important-people,
.important-people{
  color: rgb(255, 89, 80);
  background-color: rgb(249, 234, 233);
}
.choose-title{
    display: inline-block;
    width: 80px;
    position: absolute;
    z-index: 1000;
    left: 15px;
    top: 6px;
    height: 24px;
    line-height: 24px;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
}
</style>
