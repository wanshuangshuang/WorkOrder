<template>
  <div>
    <div class="white-background list-top-margin">
      <!-- 面包屑导航 -->
      <div class="page-top">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>基础数据</el-breadcrumb-item>
          <el-breadcrumb-item>
            <span style="color:#000;font-weight:bold;">产品定义</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 搜索筛选 -->
      <el-form :model="form" class="user-search" label-width="110px" size="small">
        <el-row>
          <el-col :span="7">
            <el-form-item label="产品编号">
              <el-input size="small" v-model="form.documentNo" placeholder="请输入产品编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="产品名称">
              <el-input size="small" v-model="form.name" placeholder="请输入产品名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="产品规格">
              <el-input size="small" v-model="form.name" placeholder="请输入产品规格"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="3" class="text-align-right">
            <el-button size="small" type="primary" icon="el-icon-search" @click="search">查询</el-button>
          </el-col>
        </el-row>
        <el-row class="search-row" v-show="!isFold">
          <el-col :span="7">
            <el-form-item label="产品属性">
              <el-select
                v-model="form.orderSatus"
                clearable
                filterable
                placeholder="请选择"
                style="width:100%;"
              >
                <el-option
                  v-for="item in orderStatusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="7">
            <el-form-item label="新增字段">
              <div style="display:flex;">
                <el-input-number
                  class="input-number"
                  v-model="form.planSatrtNum"
                  controls-position="right"
                  :min="1"
                  :max="10"
                  placeholder="最小数"
                ></el-input-number>
                <span style="width:12px;text-align:center;">-</span>
                <el-input-number
                  class="input-number"
                  v-model="form.planEndNum"
                  controls-position="right"
                  :min="1"
                  :max="10"
                  placeholder="最大数"
                ></el-input-number>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider>
          <i :class="!isFold?'el-icon-caret-top':'el-icon-caret-bottom'" @click="fold"></i>
        </el-divider>
      </el-form>
    </div>

    <div class="white-background">
        <el-row class="tbl-btn">
          <el-col :span="12" class="tbl-btn-left">
            <el-button size="small" type="primary" icon="el-icon-plus" @click="createProduct">创建产品</el-button>
            <el-button size="small" plain icon="el-icon-s-operation" :disabled="!isBatchPrint">批量操作</el-button>
            <el-button size="small" type="primary" plain icon="el-icon-download">导入</el-button>
            <el-button size="small" type="primary" plain icon="el-icon-upload2">导出</el-button>
            <el-button type="text" icon="el-icon-s-data">查看导入日志</el-button>
            <el-button type="text" icon="el-icon-edit-outline">编辑打印模板</el-button>
            <el-button type="text" icon="el-icon-tickets">自定义事件</el-button>
          </el-col>
          <el-col :span="12" class="tbl-btn-right">
            <el-button type="default" size="small" icon="el-icon-s-operation">列配置</el-button>
          </el-col>
        </el-row>
        <!--列表-->
        <el-table
          size="small"
          :data="listData"
          highlight-current-row
          v-loading="loading"
          stripe
          border
          element-loading-text="加载中"
          style="width: 100%;"
          @selection-change="handleTblSelectionChange"
        >
          <el-table-column align="center" type="selection" width="60"></el-table-column>
          <el-table-column align="center" type="index" width="50" label="序号"></el-table-column>
          <el-table-column sortable prop="deptName" label="工单编号" width="150">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.deptName" placement="top">
                <span class="txt-overflow">{{scope.row.deptName}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="产品编号" width="150">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.deptNo" placement="top">
                <span class="txt-overflow">{{scope.row.deptNo}}</span>
              </el-tooltip>
            </template>
          </el-table-column>

          <el-table-column label="产品名称" width="150">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.deptNo" placement="top">
                <span class="txt-overflow">{{scope.row.deptNo}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="deptNo" label="产品规格" width="60"></el-table-column>
          <el-table-column prop="deptNo" label="工序编号" width="90"></el-table-column>
          <el-table-column prop="deptNo" label="工序名称" width="60"></el-table-column>
          <el-table-column prop="deptNo" label="报工权限" width="60"></el-table-column>
          <el-table-column prop="deptNo" label="分配列表" width="100"></el-table-column>

          <el-table-column prop="deptNo" label="报工数配比" width="100"></el-table-column>
          <el-table-column sortable prop="deptNo" label="计划数" width="120"></el-table-column>
          <el-table-column sortable prop="deptNo" label="良品数" width="120"></el-table-column>
          <el-table-column prop="deptNo" label="不良品数" width="80"></el-table-column>
          <el-table-column prop="deptNo" label="工序状态" width="80"></el-table-column>
          <el-table-column prop="deptNo" label="优先级" width="80"></el-table-column>
          <el-table-column prop="deptNo" label="计划开始时间" width="80"></el-table-column>
          <el-table-column prop="deptNo" label="计划结束时间" width="80"></el-table-column>
          <el-table-column prop="deptNo" label="实际开始时间" width="80"></el-table-column>
          <el-table-column prop="deptNo" label="实际结束时间" width="80"></el-table-column>
          <el-table-column prop="deptNo" label="子工艺路线" width="80"></el-table-column>
          <el-table-column prop="deptNo" label="创建人" width="80"></el-table-column>
          <el-table-column prop="deptNo" label="创建时间" width="80"></el-table-column>
          <el-table-column prop="deptNo" label="更新人" width="80"></el-table-column>
          <el-table-column prop="deptNo" label="更新时间" width="80"></el-table-column>
          <el-table-column prop="deptNo" label="技术要求" width="80"></el-table-column>

          <el-table-column align="center" label="操作" min-width="190" fixed="right">
            <template slot-scope="scope">
              <el-tooltip content="编辑">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-edit"
                  circle
                  @click="handleEdit(scope.$index, scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip content="打印">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-printer"
                  circle
                  @click="handleEdit(scope.$index, scope.row)"
                ></el-button>
              </el-tooltip>
             
              <el-tooltip content="删除">
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="deleteUser(scope.$index, scope.row)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <Pagination v-bind:child-msg="pageparm" @callFather="callFather" class="tbl-pagination"></Pagination>
      </div>

      <CreateProduct :diaVisible="createProductPanVisible" @save="productSave"></CreateProduct>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import CreateProduct from '@/views/basicData/productDefinition/createProduct';
export default {
  name: "ProductDefinition",
  components:{
      Pagination,
      CreateProduct
  },
  data() {
    return {
      form: {},
      orderStatusList: [
        {
          label: "自制",
          value: "0"
        },
        {
          label: "外购",
          value: "1"
        },
        {
          label: "委外",
          value: "2"
        }
      ],
      isFold: true,
      listData: [],
      loading: false,
      isBatchPrint: false,
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      },
      createProductPanVisible:false,

    };
  },
  created() {},
  methods: {
    fold() {
      this.isFold = !this.isFold;
    },
    search() {},
    /**
     * 监听表格选中项变化事件
     */
    handleTblSelectionChange(val) {
      this.tblSelectionList = val;
    },
     // 分页插件事件
    callFather(parm) {
    },
    createProduct(){
      this.createProductPanVisible = true;
    },
    productSave(val){
        console.log("val",val);
        if(val){

          this.listData.push(val)
        }
        this.createProductPanVisible =false;

    }
  }
};
</script>
<style scoped>
.page-top {
  height: 30px;
  line-height: 30px;
}
.el-breadcrumb {
  line-height: 15px;
}
.page-row {
  /* background-color: #efefef; */
}
.page-row .el-tabs__nav-wrap::after {
  height: 0px;
}
.page-row .el-tabs__header {
  margin: 0px;
}

.user-search {
  margin-top: 20px;
}

.el-divider__text {
  padding: 0px 0px;
  font-size: 20px;
  cursor: pointer;
}
.tbl-pagination {
  text-align: right;
}
.tbl-btn {
  width: 100%;
  height: 40px;
  line-height: 40px;
}
.tbl-btn .tbl-btn-right {
  text-align: right;
}
.el-divider--horizontal {
  margin: 10px 0px;
}
.el-form-item {
  margin-bottom: 20px;
}
.search-row .half-width {
  width: calc(100% - 132px);
  margin-left: 8px;
}
.search-row .input-number {
  width: calc(50% - 5px);
}
</style>