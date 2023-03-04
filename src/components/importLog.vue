<template>
     <div>
    <div class="white-background list-top-margin">
      <!-- 面包屑导航 -->
      <div class="page-top">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>基础数据</el-breadcrumb-item>
          <el-breadcrumb-item>产品定义</el-breadcrumb-item>
          <el-breadcrumb-item>
            <span style="color:#000;font-weight:bold;">导入日志</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 搜索筛选 -->
      <el-form  :model="form" class="user-search" label-width="110px" size="small">
        <el-row>
          <el-col :span="8">
            <el-form-item label="导入时间">
                <el-date-picker
                  key="0"
                  v-model="form.createTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  style="width: 100%; margin-left: 8px;"
                ></el-date-picker>
            </el-form-item>
          </el-col>
     

          <el-col :span="4" style="margin-left:20px;">
            <el-button size="small" type="primary" icon="el-icon-search" @click="search">查询</el-button>
            <el-tooltip class="item" effect="dark" content="只保留30天内的导入记录" placement="top">
                <i class="el-icon-question"></i>
            </el-tooltip>
          </el-col>
        </el-row>
    
      </el-form>
    </div>

    <div class="white-background">
   
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
        >
          <!-- <el-table-column align="center" type="index" width="50" label="序号"></el-table-column> -->
        
          <el-table-column prop="deptNo" label="导入时间" ></el-table-column>
          <el-table-column prop="deptNo" label="导入用户" ></el-table-column>
          <el-table-column prop="deptNo" label="导入结果" ></el-table-column>
          <el-table-column prop="deptNo" label="导入详情" ></el-table-column>

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

  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
export default {
    name:'ImportLog',
    components:{
      Pagination,
  },
  data() { 
    return {
      form: {},
      isFold: true,
      listData: [],
      loading: false,
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      },

    };
  },
  created() {},
  methods: {
    fold() {
      this.isFold = !this.isFold;
    },
    search() {},
  
     // 分页插件事件
    callFather(parm) {
    },
   
 
  }
}
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