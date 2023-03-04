<template>
  <div class="assembly-work-order">
    <!--列表-->
    <el-table size="small" :data="listData" highlight-current-row v-loading="loading" max-height="400px" stripe border element-loading-text="拼命加载中" :header-cell-style="_headerStyle" style="width: 100%;">
      <el-table-column type="selection" width="60">
      </el-table-column>
      <el-table-column prop="no" label="序号" type="index" width="50"></el-table-column>
      <el-table-column sortable prop="deptName" label="工序名称" width="180">
      </el-table-column>
      <el-table-column  prop="deptNo" label="工序编号" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.deptNo}}</span>
          <el-tag v-for="(item,index) in scope.row.status" :type="changeStatusColor(item)" :key="item" style="height:28px;margin-left: 4px;" :style="{'marginBottom':(index!=scope.row.status.length-1)?'8px':'0'}">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="deptId" label="报工权限" width="80"></el-table-column>
      <el-table-column  prop="editUser" label="报工数配比" width="120"></el-table-column>
      <el-table-column  prop="editUser" label="计划数" width="80"></el-table-column>
      <el-table-column  prop="editUser" label="良品数" width="180">
      </el-table-column>
      <el-table-column  prop="editUser" label="不良品数" width="180">
      </el-table-column>
      <el-table-column sortable prop="editUser" label="不良品项列表" width="150"></el-table-column>
      <el-table-column sortable prop="editUser" label="计划开始时间" width="150"></el-table-column>
      <el-table-column  prop="editUser" label="计划结束时间" width="150"></el-table-column>
      <el-table-column  prop="editUser" label="实际开始时间" width="150"></el-table-column>
      <el-table-column  prop="editUser" label="实际结束时间" width="150"></el-table-column>
      <el-table-column label="操作" min-width="180" fixed="right">
        <template slot-scope="scope">
          <el-tooltip content="编辑">
            <el-button type="primary" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip content="删除">
            <el-button size="mini" type="primary" icon="el-icon-delete" circle @click="delete(scope.$index, scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
      <!-- 编辑工序弹窗 -->
      <el-dialog title="编辑工序" :visible.sync="orderVisible" width="50%" @cancel="closeOrder">
      <order-detail v-if="orderVisible" @done="closeOrder" :editRow="editRow"></order-detail>
    </el-dialog>
  </div>
</template>

<script>
import { deptList, deptSave, deptDelete } from '../../api/userMG'
import Pagination from '@/components/Pagination'
import OrderDetail from "@/views/order/dialogManage/order-detail.vue";
export default {
  props:['formData'],
  // 注册组件
  components: {
    Pagination,
    OrderDetail,
  },
  /**
   * 数据发生改变
   */

  /**
   * 创建完毕
   */
  created() {
    this.getdata(this.form)
  },
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
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
      orderVisible:false,
      editRow:{},//编辑工序对象
    }
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
            editUser: 30,
            addTime: 1521062371000,
            editTime: 1526700200000,
            deptId: 2,
            deptName: 'XX分公司',
            deptNo: '1',
            parentId: 1,
            status:['延期']
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
    // 删除公司
    delete(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {

          // deptDelete(row.deptId)
          //   .then(res => {
          //     if (res.success) {
          //       this.$message({
          //         type: 'success',
          //         message: '公司已删除!'
          //       })
          //       this.getdata(this.form)
          //     } else {
          //       this.$message({
          //         type: 'info',
          //         message: res.msg
          //       })
          //     }
          //   })
          //   .catch(err => {
          //     this.loading = false
          //     this.$message.error('公司删除失败，请稍后再试！')
          //   })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleEdit(index, row){
      this.orderVisible = true
      this.editRow = row
    },
    closeOrder(){
      this.orderVisible = false
    },
    changeStatusColor(options){
      if(options == '延期'){
        return 'danger'
      }else if(options == '执行中'){
        return 'success'
      }{
        return ''
      }
    },
  }
}
</script>

<style scoped>

</style>


