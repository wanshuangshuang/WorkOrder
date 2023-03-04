<template>
  <div class="assembly-work-order">
    <div v-if="mode === 'main'">
      <!-- 面包屑导航 -->
      <div class="white-background list-top-margin" >
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">生产管理</el-breadcrumb-item>
          <el-breadcrumb-item>装配工单</el-breadcrumb-item>
        </el-breadcrumb>
        <list-top :form="form" @search="search" class="list-top-margin" :goodsShow="false"></list-top>
      </div>
      <div class="white-background">
        <el-row class="list-top-margin">
          <el-col :span="6">
            <el-button size="small" type="primary" icon="el-icon-plus" @click="acolumnDataListdd()">创建装配工单</el-button>
            <el-button type="text">批量打印</el-button>
            <el-button type="text" icon="el-icon-edit-outline">编辑打印模板</el-button>
          </el-col>
          <el-col :span="18" class="text-align-right">
            <el-button size="small" type="primary" icon="el-icon-setting">移动卡片配置</el-button>
            <el-popover
              placement="left-start"
              title="列配置"
              width="200"
              trigger="click"
              v-model="popIshow"
              >
              <popover-content :colData="colData" @done="popDone" v-if="popIshow" ></popover-content>
              <el-button slot="reference" icon="el-icon-s-operation" size="small" class="left-default-margin">列配置</el-button>
            </el-popover>
          </el-col>
        </el-row>
        <!--列表-->
        <el-table size="small" :key="uniqueKey" :data="listData" highlight-current-row v-loading="loading" max-height="400px" stripe border element-loading-text="拼命加载中" :header-cell-style="_headerStyle" style="width: 100%;">
          <el-table-column type="selection" width="60">
          </el-table-column>
          <el-table-column prop="no" label="序号" type="index" width="50" v-if="colData[0].istrue" :fixed="colData[0].isFixed == true ? 'left':null">
          </el-table-column>
          <el-table-column sortable prop="deptName" label="单据编号" width="180" v-if="colData[1].istrue" :fixed="colData[1].isFixed == true ? 'left':null">
          </el-table-column>
          <el-table-column  prop="deptNo" label="工单数" width="80" v-if="colData[2].istrue" :fixed="colData[2].isFixed == true ? 'left':null">
          </el-table-column>
          <el-table-column prop="deptId" label="已结束工单" width="90" v-if="colData[3].istrue" :fixed="colData[3].isFixed == true ? 'left':null"></el-table-column>
          <el-table-column  prop="editUser" label="计划数" width="80" v-if="colData[4].istrue" :fixed="colData[4].isFixed == true ? 'left':null"></el-table-column>
          <el-table-column  prop="editUser" label="完工数" width="80" v-if="colData[5].istrue" :fixed="colData[5].isFixed == true ? 'left':null"></el-table-column>
          <el-table-column  prop="editUser" label="生产进度(%)" width="180" v-if="colData[6].istrue" :fixed="colData[6].isFixed == true ? 'left':null">
            <template slot-scope="scope">
              <el-progress :percentage="scope.row.editUser"></el-progress>
            </template>
          </el-table-column>
          <el-table-column  prop="editUser" label="单据进度(%)" width="180" v-if="colData[7].istrue" :fixed="colData[7].isFixed == true ? 'left':null">
            <template slot-scope="scope">
              <el-progress :percentage="scope.row.editUser"></el-progress>
            </template>
          </el-table-column>
          <el-table-column sortable prop="editUser" label="创建时间" width="150" v-if="colData[8].istrue" :fixed="colData[8].isFixed == true ? 'left':null"></el-table-column>
          <el-table-column sortable prop="editUser" label="更新时间" width="150" v-if="colData[9].istrue" :fixed="colData[9].isFixed == true ? 'left':null"></el-table-column>
          <el-table-column  prop="editUser" label="创建人" width="150" v-if="colData[10].istrue" :fixed="colData[10].isFixed == true ? 'left':null"></el-table-column>
          <el-table-column  prop="editUser" label="更新人" width="150" v-if="colData[11].istrue" :fixed="colData[11].isFixed == true ? 'left':null"></el-table-column>
          <el-table-column label="操作" min-width="180" fixed="right" v-if="colData[12].istrue">
            <template slot-scope="scope">
              <el-tooltip content="编辑">
                <el-button type="primary" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip content="打印">
                <el-button type="primary" size="mini" icon="el-icon-printer" circle @click="handleEdit(scope.$index, scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip content="复制">
                <el-button type="primary" size="mini" icon="el-icon-document-copy" circle @click="handleEdit(scope.$index, scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip content="删除">
                <el-button size="mini" type="primary" icon="el-icon-delete" circle @click="deleteUser(scope.$index, scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
      </div>
    </div>
    <create-layout v-if="mode !== 'main'" :mode="mode" @done="done"></create-layout>
  </div>
</template>

<script>
import { deptList, deptSave, deptDelete } from '../../api/userMG'
import Pagination from '@/components/Pagination'
import ListTop from './list-top.vue'
import CreateLayout from './create-layout.vue'
import PopoverContent from '@/components/popover-content.vue'

export default {
  // 注册组件
  components: {
    Pagination,
    ListTop,
    CreateLayout,
    PopoverContent,
  },
  /**
   * 数据发生改变
   */

  /**
   * 创建完毕
   */
  created() {
    this.getColumnDataList()
    this.getdata(this.form)
  },
  data() {
    return {
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
          { required: true, message: '请请输入部门名称', trigger: 'blur' }
        ],
        deptNo: [{ required: true, message: '请请输入部门代码', trigger: 'blur' }]
      },
      form: {
        page: 1,
        limit: 10,
        varLable: '',
        varName: '',
        token: localStorage.getItem('logintoken'),
        updateCondition:'0',
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
      },
      mode:'main',
      colData:[],
      popIshow:false,//控制popover显隐
      uniqueKey:new Date().getTime()
    }
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    getUniqueKey(){
      return new Date().getTime()
    },
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
            editUser: 30,
            addTime: 1521062371000,
            editTime: 1526700200000,
            deptId: 2,
            deptName: 'XX分公司',
            deptNo: '1',
            parentId: 1
          },
          {
            addUser: null,
            editUser: 35,
            addTime: 1521063247000,
            editTime: 1526652291000,
            deptId: 3,
            deptName: '上海测试',
            deptNo: '02',
            parentId: 1
          },
          {
            addUser: null,
            editUser: 0,
            addTime: 1526349555000,
            editTime: 1526349565000,
            deptId: 12,
            deptName: '1',
            deptNo: '11',
            parentId: 1
          },
          {
            addUser: null,
            editUser: 13,
            addTime: 1526373178000,
            editTime: 1526373178000,
            deptId: 13,
            deptName: '5',
            deptNo: '5',
            parentId: 1
          },
          {
            addUser: null,
            editUser: 23,
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
      this.pageparm.currentPage = this.form.page
      this.pageparm.pageSize = this.form.limit
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
      //       this.pageparm.currentPage = this.form.page
      //       this.pageparm.pageSize = this.form.limit
      //       this.pageparm.total = res.count
      //     }
      //   })
      //   .catch(err => {
      //     this.loading = false
      //     this.$message.error('菜单加载失败，请稍后再试！')
      //   })
    },
    getColumnDataList(){
     this.colData = [
     { title: "序号", istrue: true, isFixed:false },
	   { title: "单据编号", istrue: true, isFixed:false },
	   { title: "工单数", istrue: true , isFixed:false},
	   { title: "已结束工单", istrue: true , isFixed:false},
	   { title: "计划数", istrue: true , isFixed:false},
	   { title: "完工数", istrue: true, isFixed:false },
	   { title: "生产进度(%)", istrue: true , isFixed:false},
	   { title: "单据进度(%)", istrue: true, isFixed:false },
	   { title: "创建时间", istrue: true, isFixed:false },
	   { title: "更新时间", istrue: true, isFixed:false },
	   { title: "创建人", istrue: true , isFixed:false},
	   { title: "更新人", istrue: true, isFixed:false },
	   { title: "操作", istrue: true,disabled:true },
    ]
    },
    // 分页插件事件
    callFather(parm) {
      this.form.page = parm.currentPage
      this.form.limit = parm.pageSize
      this.getdata(this.form)
    },
    // 搜索事件
    search() {
      this.getdata(this.form)
    },
    //显示编辑界面
    // handleEdit: function(index, row) {
    //   this.editFormVisible = true
    //   if (row != undefined && row != 'undefined') {
    //     this.title = '修改'
    //     this.editForm.deptId = row.deptId
    //     this.editForm.deptName = row.deptName
    //     this.editForm.deptNo = row.deptNo
    //   } else {
    //     this.title = '添加'
    //     this.editForm.deptId = ''
    //     this.editForm.deptName = ''
    //     this.editForm.deptNo = ''
    //   }
    // },
    // 编辑、增加页面保存方法
    // submitForm(editData) {
    //   this.$refs[editData].validate(valid => {
    //     if (valid) {
    //       deptSave(this.editForm)
    //         .then(res => {
    //           this.editFormVisible = false
    //           this.loading = false
    //           if (res.success) {
    //             this.getdata(this.form)
    //             this.$message({
    //               type: 'success',
    //               message: '公司保存成功！'
    //             })
    //           } else {
    //             this.$message({
    //               type: 'info',
    //               message: res.msg
    //             })
    //           }
    //         })
    //         .catch(err => {
    //           this.editFormVisible = false
    //           this.loading = false
    //           this.$message.error('公司保存失败，请稍后再试！')
    //         })
    //     } else {
    //       return false
    //     }
    //   })
    // },
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
                this.getdata(this.form)
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
    // 新增
    acolumnDataListdd:function(){
      this.mode = 'create'
    },
    done:function(options){
      this.mode = 'main'
    },
    popDone:function(options){
      var _this = this
      this.popIshow = false
      if(options.type == 'save'){
        this.colData = JSON.parse(JSON.stringify(options.data))
        console.log('this.colData',this.colData);
        this.uniqueKey = this.getUniqueKey()
      }
    }
  }
}
</script>

<style scoped>

.userRole {
  width: 100%;
}

.assembly-work-order .el-button+.el-button,
.el-checkbox.is-bordered+.el-checkbox.is-bordered{
  margin-left: 5px;
}
</style>


