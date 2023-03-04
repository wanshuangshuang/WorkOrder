<template>
  <div>
    <div class="white-background list-top-margin">
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">生产管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">工单</el-breadcrumb-item>
          <el-breadcrumb-item>导入日志</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form label-width="80px" :model="form" class="user-search" :size="buttonSize">
        <el-row>
          <el-col :span="24">
            <el-form-item label="导入时间">
              <el-date-picker
                v-model="form.time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              <el-button type="primary" icon="el-icon-search" class="left-default-margin">查询</el-button>
              <el-tooltip class="item" effect="dark" placement="top" content="只保留30天内的导入记录">
                <i class="el-icon-info question-icon"></i>
              </el-tooltip>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="white-background">
      <el-table size="small" :data="listData" highlight-current-row v-loading="loading" max-height="400px" stripe border element-loading-text="拼命加载中" :header-cell-style="_headerStyle" style="width: 100%;">
        <el-table-column prop="deptName" label="导入时间" width="180">
        </el-table-column>
        <el-table-column  prop="deptNo" label="导入用户" width="150">
        </el-table-column>
        <el-table-column prop="deptId" label="导入结果" width="150"></el-table-column>
        <el-table-column  prop="editUser" label="导入详情"></el-table-column>
        <el-table-column label="操作" width="300" fixed="right">
          <template slot-scope="scope">
            <!-- <el-tooltip content="编辑">
              <el-button type="primary" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip content="删除">
              <el-button size="mini" type="primary" icon="el-icon-delete" circle @click="delete(scope.$index, scope.row)"></el-button>
            </el-tooltip> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="text-align-center">
        <el-button size="small" @click="cancel">取 消</el-button>
        <el-button size="small" type="primary"  @click="save()" v-if="!disabled">保 存</el-button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props:['mode'],
  data() {
    return {
      loading:false,
      buttonSize:'small',
      disabled:false,
      form:{
        time:[]
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
      listData: [], //用户数据
    }
  },
  created(){
  },
  methods: {
    cancel:function(){
      this.$emit('done',{type:'cancel'})
    },
    save:function(){
      this.$emit('done',{type:'save'})
    },

  },
}
</script>
<style scoped>

</style>
