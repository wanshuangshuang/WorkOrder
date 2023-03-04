<template>
  <div class="default-title">
      <el-form label-width="120px" :model="form" class="list-top-margin production-progress">
        <el-row>
          <el-col :span="16">
            <el-input placeholder="可搜索工序编号/名称" v-model="form.searchInputValue" class="input-with-select" :size="buttonSize">
              <el-button slot="append" icon="el-icon-search" type="primary" :size="buttonSize">搜索</el-button>
            </el-input>
          </el-col>
        </el-row>
      </el-form>
      <el-table ref="tableData" size="small" :data="listData" highlight-current-row v-loading="loading" max-height="400px" stripe border element-loading-text="拼命加载中" :header-cell-style="_headerStyle" style="width: 100%;"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="60">
        </el-table-column>
        <el-table-column prop="deptNo" label="工序编号">
        </el-table-column>
        <el-table-column prop="deptName" label="工序名称">
        </el-table-column>
        <el-table-column prop="deptId" label="报工权限"></el-table-column>
        <el-table-column prop="editUser" label="报工数配比"></el-table-column>
        <el-table-column prop="editUser" label="不良品项列表"></el-table-column>
      </el-table>
       <!-- 分页组件 -->
      <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
      <div slot="footer" class="text-align-center" style="position: relative;">
        <div class="select-count-content">已选{{selectCount}}项</div>
        <el-button size="small" @click="cancel">取 消</el-button>
        <el-button size="small" type="primary" class="title" @click="save">保 存</el-button>
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
        searchInputValue:''
      },
      listData: [{deptNo:1}], //用户数据
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      },
      loading:false,
      selectCount:0
    }
  },
  methods:{
    cancel(){
      this.$emit('done',{type:'cancel'})
    },
    save(){
      this.$emit('done',{type:'save'})
    },
    callFather(parm) {
      this.form.page = parm.currentPage
      this.form.limit = parm.pageSize
      this.getdata(this.form)
    },
    handleSelectionChange(){
      this.selectCount = this.$refs.tableData.selection.length
    },
  }
}
</script>
<style>
.production-progress .el-input-group__append,
.production-progress .el-input-group__prepend{
  color: #fff;
  background-color: #409EFF!important;
  border-radius: 0 4px 4px 0;
}
.select-count-content{
  position: absolute;
  left: 0;
  top: -45px;
  font-size: 12px;
}
</style>

