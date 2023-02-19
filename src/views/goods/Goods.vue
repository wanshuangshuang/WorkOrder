<template>
  <div>
    <div v-if="isShowPanel == 0">
      <div class="white-background list-top-margin">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>生产管理</el-breadcrumb-item>
          <el-breadcrumb-item><span style="color:#000;font-weight:bold;">销售订单</span></el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索筛选 -->
        <el-form  :model="formInline" label-width="100px" class="user-search">
          <el-row :gutter="5">
            <el-col :span="7">
              <el-form-item label="单据编号">
                <el-input size="small" v-model="formInline.deptName" placeholder="输入单据编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="创建人">
                <el-input size="small" v-model="formInline.deptNo" placeholder="输入创建人姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="合同编号">
                <el-input size="small" v-model="formInline.deptNo" placeholder="输入合同编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label-width="15px">
                <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">添加</el-button>
              </el-form-item>
            </el-col>

          </el-row>

          <el-row :gutter="5" v-if="isSearchPanelShow">
            <el-col :span="7">
              <el-form-item label="客户名称">
                <el-input size="small" v-model="formInline.customName" placeholder="输入客户名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="创建时间">
                <el-date-picker
                  v-model="formInline.createTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期" class="date-picker">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="更新人">
                <el-input size="small" v-model="formInline.updator" placeholder="输入更新人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="更新时间">
                <el-date-picker
                  v-model="formInline.updateTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期" class="date-picker">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-divider><i :class="isSearchPanelShow?'el-icon-caret-top':'el-icon-caret-bottom'" @click="expandClick"></i></el-divider>
        </el-form>
      </div>
      <div class="white-background">
          <el-row class="tbl-btn">
            <el-col :span="12" class="tbl-btn-left">
              <el-button size="small" type="primary" icon="el-icon-plus" @click="createSaleOrder">创建销售订单</el-button>
              <el-button type="text" :disabled="!isBatchPrint">批量打印</el-button>
              <el-button type="text" icon="el-icon-edit-outline">编辑打印模板</el-button>
            </el-col>
            <el-col :span="12" class="tbl-btn-right">
              <el-button type="primary" size="small" icon="el-icon-setting">移动端卡片配置</el-button>
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
          element-loading-text="加载中"
          :header-cell-style="_headerStyle"
          style="width: 100%;"
          @selection-change="handleTblSelectionChange"
          >
            <el-table-column align="center" type="selection" width="60">
            </el-table-column>
            <el-table-column align="center" type="index" width="50" label="序号">
            </el-table-column>
            <el-table-column sortable prop="deptName" label="单据编号" width="150" >
              <template slot-scope="scope">
                <el-tooltip :content="scope.row.deptName" placement="top">
                  <span class="txt-overflow" >{{scope.row.deptName}}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column  label="合同编号" width="150">
              <template slot-scope="scope">
                <el-tooltip :content="scope.row.deptNo" placement="top">
                  <span class="txt-overflow">{{scope.row.deptNo}}</span>
                </el-tooltip>
              </template>
            </el-table-column>

            <el-table-column  label="客户名称" width="150">
              <template slot-scope="scope">
                <el-tooltip :content="scope.row.deptNo" placement="top">
                  <span class="txt-overflow">{{scope.row.deptNo}}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column  prop="deptNo" label="工单数" width="60">
            </el-table-column>
            <el-table-column  prop="deptNo" label="已结束工单" width="90">
            </el-table-column>
            <el-table-column  prop="deptNo" label="计划数" width="60">
            </el-table-column>
            <el-table-column  prop="deptNo" label="完工数" width="60">
            </el-table-column>
            <el-table-column  prop="deptNo" label="生产进度(%)" width="100">
            </el-table-column>

            <el-table-column   prop="deptNo" label="单据进度(%)" width="100">
            </el-table-column>
            <el-table-column  sortable prop="deptNo" label="创建时间" width="120">
            </el-table-column>
            <el-table-column  sortable prop="deptNo" label="更新时间" width="120">
            </el-table-column>
            <el-table-column  prop="deptNo" label="创建人" width="80">
            </el-table-column>
            <el-table-column   prop="deptNo" label="更新人" width="80">
            </el-table-column>

            <el-table-column align="center"  label="操作" min-width="190">
              <template slot-scope="scope">
                <el-tooltip content="编辑">
                  <el-button type="primary" size="mini" icon="el-icon-edit" circle  @click="handleEdit(scope.$index, scope.row)"></el-button>

                </el-tooltip>
                <el-tooltip content="打印">
                  <el-button type="primary" size="mini" icon="el-icon-printer" circle @click="handleEdit(scope.$index, scope.row)"></el-button>

                </el-tooltip>
                <el-tooltip content="复制">
                  <el-button type="primary" size="mini" icon="el-icon-document-copy" circle @click="handleEdit(scope.$index, scope.row)"></el-button>

                </el-tooltip>
                <el-tooltip content="删除">
                  <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="deleteUser(scope.$index, scope.row)"></el-button>

                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页组件 -->
          <Pagination v-bind:child-msg="pageparm" @callFather="callFather" class="tbl-pagination"></Pagination>
      </div>
    </div>
    <CreateGoods v-if="isShowPanel == 1" @goBack="goBack"></CreateGoods>
  </div>
</template>

<script>
import CreateGoods from '@/views/goods/newGoods';
import { deptList, deptSave, deptDelete } from '../../api/userMG'
import Pagination from '../../components/Pagination'
export default {
  watch:{
    tblSelectionList(newList,oldList){
      console.log('newList',newList);
      this.isBatchPrint = (newList && newList != null && newList.length > 0);

    }
  },
  data() {
    return {

      isShowPanel:0,
      isBatchPrint:false,
      isSearchPanelShow:false,
      tblSelectionList:[],

      //--------------------------
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: '添加',
      editForm: {
        deptId: '',
        deptName: '',
        deptNo: '',
        token: localStorage.getItem('logintoken')
      },
      // rules表单验证
      rules: {
        deptName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ],
        deptNo: [{ required: true, message: '请输入部门代码', trigger: 'blur' }]
      },
      formInline: {
        page: 1,
        limit: 10,
        varLable: '',
        varName: '',
        token: localStorage.getItem('logintoken')
      },
      // 删除部门
      seletedata: {
        ids: '',
        token: localStorage.getItem('logintoken')
      },
      userparm: [], //搜索权限
      listData: [], //用户数据
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      }
    }
  },
  // 注册组件
  components: {
    Pagination,
    CreateGoods
  },
  /**
   * 数据发生改变
   */

  /**
   * 创建完毕
   */
  created() {
    this.getdata(this.formInline)
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    // 获取公司列表
    getdata(parameter) {
      this.loading = true
      // 模拟数据开始
      let res = {
        code: 0,
        msg: null,
        count: 5,
        data: [
          {
            addUser: null,
            editUser: null,
            addTime: 1521062371000,
            editTime: 1526700200000,
            deptId: 2,
            deptName: 'XX分公司sdfasdfadsfdasdsaffdsdfsdsfaadsf',
            deptNo: '1',
            parentId: 1
          },
          {
            addUser: null,
            editUser: null,
            addTime: 1521063247000,
            editTime: 1526652291000,
            deptId: 3,
            deptName: '上海测试',
            deptNo: '02',
            parentId: 1
          },
          {
            addUser: null,
            editUser: null,
            addTime: 1526349555000,
            editTime: 1526349565000,
            deptId: 12,
            deptName: '1',
            deptNo: '11',
            parentId: 1
          },
          {
            addUser: null,
            editUser: null,
            addTime: 1526373178000,
            editTime: 1526373178000,
            deptId: 13,
            deptName: '5',
            deptNo: '5',
            parentId: 1
          },
          {
            addUser: null,
            editUser: null,
            addTime: 1526453107000,
            editTime: 1526453107000,
            deptId: 17,
            deptName: 'v',
            deptNo: 'v',
            parentId: 1
          }
        ]
      }
      this.loading = false
      this.listData = res.data
      this.pageparm.currentPage = this.formInline.page
      this.pageparm.pageSize = this.formInline.limit
      this.pageparm.total = res.count
      // 模拟数据结束

      /***
       * 调用接口，注释上面模拟数据 取消下面注释
       */
      // deptList(parameter)
      //   .then(res => {
      //     this.loading = false
      //     if (res.success == false) {
      //       this.$message({
      //         type: 'info',
      //         message: res.msg
      //       })
      //     } else {
      //       this.listData = res.data
      //       // 分页赋值
      //       this.pageparm.currentPage = this.formInline.page
      //       this.pageparm.pageSize = this.formInline.limit
      //       this.pageparm.total = res.count
      //     }
      //   })
      //   .catch(err => {
      //     this.loading = false
      //     this.$message.error('菜单加载失败，请稍后再试！')
      //   })
    },
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage
      this.formInline.limit = parm.pageSize
      this.getdata(this.formInline)
    },
    // 搜索事件
    search() {
      this.getdata(this.formInline)
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true
      if (row != undefined && row != 'undefined') {
        this.title = '修改'
        this.editForm.deptId = row.deptId
        this.editForm.deptName = row.deptName
        this.editForm.deptNo = row.deptNo
      } else {
        this.title = '添加'
        this.editForm.deptId = ''
        this.editForm.deptName = ''
        this.editForm.deptNo = ''
      }
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          deptSave(this.editForm)
            .then(res => {
              this.editFormVisible = false
              this.loading = false
              if (res.success) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '公司保存成功！'
                })
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.editFormVisible = false
              this.loading = false
              this.$message.error('公司保存失败，请稍后再试！')
            })
        } else {
          return false
        }
      })
    },
    // 删除公司
    deleteUser(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deptDelete(row.deptId)
            .then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '公司已删除!'
                })
                this.getdata(this.formInline)
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error('公司删除失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 关闭编辑、增加弹出框
    closeDialog() {
      this.editFormVisible = false
    },


    //-------------------
    /**
     * 控制查询面板显示隐藏
     */
    expandClick(){
      this.isSearchPanelShow = !this.isSearchPanelShow;
    },
    /**
     * 监听表格选中项变化事件
     */
    handleTblSelectionChange(val){
      this.tblSelectionList = val;
    },
    createSaleOrder(){
      //this.$router.push({path:'/goods/Goods/create'});
      this.isShowPanel = 1;
    },
    goBack(){
      this.isShowPanel = 0;
    }
  }
}
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
.el-divider__text{
  padding: 0px 0px;
  font-size: 20px;
  cursor: pointer;
}
.el-divider--horizontal{
  margin: 10px 0px;
}
.date-picker{
  width: 100% !important;

}
.el-input__inner{
  height: 32px;
  line-height: 32px;
  padding: 0px 10px;
}
.el-form-item{
  margin-bottom: 10px;
}
.tbl-btn{
  width: 100%;
  height: 50px;
  line-height: 50px;

}
.tbl-btn .tbl-btn-right{
  text-align: right;
}
.tbl-pagination{
  text-align: right;
}
.txt-overflow{
  text-overflow:ellipsis;
  white-space:nowrap;
}
</style>


