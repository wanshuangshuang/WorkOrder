<template>
  <div>
    <div class="white-background common-font-size order-main" v-if="mode === 'main'">
      <div class="bottom-default-margin">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">生产管理</el-breadcrumb-item>
            <el-breadcrumb-item>工单</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
        <el-tab-pane :label="item.label" :name="item.id" v-for="item in tabList" :key="item.id">
          <span slot="label">
            <i class="el-icon-s-order" :style="{color:item.color}"></i>
            <span>{{item.label}}</span>
          </span>
          <el-row>
            <el-col :span="18">
                <div
                class="tag-item"
                :class="{'tag-item-active':item.label == activeLabel}"
                @click="labelClick(item)"
                v-for="item in tagType"
                :key="item.label">
                {{ item.label }}
                {{item.value}}
              </div>
            </el-col>
            <el-col :span="6">
              <el-input :placeholder="'输入' + searchSelectValue + '搜索'" v-model="searchInputValue" class="input-with-select" :size="buttonSize">
                <el-select v-model="searchSelectValue" style="width:120px;" slot="prepend" placeholder="请选择" :title="searchSelectValue" @change="searchChange">
                  <el-option
                    v-for="item in searchOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" type="primary" :size="buttonSize"></el-button>
              </el-input>
            </el-col>
          </el-row>
          <el-row class="default-top-bottom">
            <el-col :span="16">
              <el-button type="primary" icon="el-icon-plus" :size="buttonSize" @click="create">创建工单</el-button>
              <el-button type="primary" icon="el-icon-upload2" plain :size="buttonSize">导出</el-button>
              <el-button type="primary" icon="el-icon-download" plain :size="buttonSize">导入</el-button>
            </el-col>
            <el-col :span="8" class="text-align-right">
              <el-button type="primary" icon="el-icon-document-add" plain :size="buttonSize" @click="showImportLog">导入日志</el-button>
              <el-button type="primary" icon="el-icon-time" plain :size="buttonSize">操作记录</el-button>
            </el-col>
          </el-row>
          <el-table class="top-default-margin" size="small" :data="tableData" :key="'table' + item.id" highlight-current-row v-loading="loading" max-height="400px" stripe border element-loading-text="拼命加载中" :header-cell-style="_headerStyle" style="width: 100%;">
            <el-table-column type="selection" width="60">
            </el-table-column>
            <el-table-column prop="no" label="序号" type="index" width="50"></el-table-column>
            <el-table-column sortable prop="deptName" label="工单编号" width="180">
              <template slot-scope="scope">
                <el-button type="text" @click="doDetail(scope.row)">{{scope.row.deptName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column  prop="deptNo" label="产品编号" width="80">
            </el-table-column>
            <el-table-column prop="deptId" label="产品名称" width="80"></el-table-column>
            <el-table-column  prop="editUser" label="产品规格" width="80"></el-table-column>
            <el-table-column  prop="status" label="状态" width="80">
              <template slot-scope="scope">
                  <el-tag v-for="(item,index) in scope.row.status" :type="changeStatusColor(item)" :key="item" style="height:28px;" :style="{'marginBottom':(index!=scope.row.status.length-1)?'8px':'0'}">{{item}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column  prop="editUser" label="单位" width="180">
            </el-table-column>
            <el-table-column  prop="progress" label="工单进度条" width="400">
              <template slot-scope="scope">
                <div class="list-line-box">
                  <div class="default-process-item" v-for="(item,index) in scope.row.progress" :key="item.label">
                    <el-tooltip class="item" effect="dark" placement="right">
                        <div slot="content">
                          <div class="tootip-content">
                            <div style="font-size:14px;font-weight:bold;" class="bottom-small-margin content">{{item.label}}</div>
                            <div>工序进度：{{item.label}}/{{item.label}}</div>
                            <el-divider class="small-row-margin"></el-divider>
                            <div class="content">工序计划数：{{item.label}}</div>
                            <div class="content">已报工良品数：{{item.label}}</div>
                            <div>已报工不良品数：{{item.label}}</div>
                            <el-divider class="small-row-margin"></el-divider>
                            <div class="content">已审批良品数：{{item.label}}</div>
                            <div>未审批良品数：{{item.label}}</div>
                            <el-divider class="small-row-margin"></el-divider>
                            <div class="bottom-mini-margin content">最近报工时间：{{item.label}}</div>
                          </div>
                        </div>
                        <div>
                          <div style="display: flex; align-items: center;">
                            <div class="default-circle" :class="{'blue-circle':(item.value > 0 && item.value < 100) ,'green-circle':item.value >= 100}">
                              <div class="delay-tag default-delay-tag" v-if="item.exceed">逾</div>
                              <span class="default-percent-text" v-if="item.value < 100">{{item.value}}%</span>
                              <i class="el-icon-check" v-if="item.value >= 100"></i>
                            </div>
                            <span style="position: absolute;left: 48px;color: #bbb;" v-if="index!=(scope.row.progress.length-1)">——</span>
                          </div>
                          <div class="process-text default-process-text">{{item.label}}</div>
                        </div>
                    </el-tooltip>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column sortable prop="deptName" label="关联单据" width="150">
              <template slot-scope="scope">
                <el-button type="text">{{scope.row.deptName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column sortable prop="editUser" label="计划开始时间" width="150"></el-table-column>
            <el-table-column  prop="editUser" label="计划结束时间" width="150"></el-table-column>
            <el-table-column  prop="editUser" label="计划数" width="150"></el-table-column>
            <el-table-column  prop="editUser" label="实际数" width="150"></el-table-column>
            <el-table-column  prop="editUser" label="备注" width="150"></el-table-column>
            <el-table-column  prop="editUser" label="创建人" width="150"></el-table-column>
            <el-table-column  prop="editUser" label="更新人" width="150"></el-table-column>
            <el-table-column  prop="editUser" label="单位" width="150"></el-table-column>
            <el-table-column  prop="editUser" label="创建时间" width="150"></el-table-column>
            <el-table-column  prop="editUser" label="实际开始时间" width="150"></el-table-column>
            <el-table-column  prop="editUser" label="实际结束时间" width="150"></el-table-column>
            <el-table-column  prop="editUser" label="报工时长" width="150"></el-table-column>
            <el-table-column  prop="editUser" label="车间类型" width="150"></el-table-column>
            <el-table-column  prop="editUser" label="产品信息" width="150"></el-table-column>
            <el-table-column  prop="editUser" label="重量" width="150"></el-table-column>
            <el-table-column  prop="editUser" label="客户名称" width="150"></el-table-column>
            <el-table-column  prop="editUser" label="产品信息" width="150"></el-table-column>
            <el-table-column  prop="editUser" label="客户类型" width="150"></el-table-column>
            <el-table-column  prop="workOrderType" label="工单类型" width="150">
              <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.workOrderType">{{scope.row.workOrderType}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column  prop="editUser" label="优先级" width="150"></el-table-column>
            <el-table-column  prop="editUser" label="更新时间" width="150"></el-table-column>
            <el-table-column label="操作" min-width="180" fixed="right">
              <template slot-scope="scope">
                <el-button type="text">查看</el-button>
                <el-dropdown>
                  <span class="el-dropdown-link">
                    <span style="color:#409eff;cursor:pointer;">操作</span>
                  </span>
                  <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item v-for="item in dropdownOptions" :key="item.label" :disabled="item.disabled">
                      <i :class="item.icon"></i>
                      {{item.label}}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页组件 -->
          <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
        </el-tab-pane>
      </el-tabs>
      <el-button icon="el-icon-plus" class="add-button" @click="addTab"></el-button>
      <el-drawer
        title="我是外面的 Drawer"
        :visible.sync="drawer"
        size="50%">
        <div>
        <el-button @click="innerDrawer = true">打开里面的!</el-button>
        <el-drawer
          title="我是里面的"
          :append-to-body="true"
          :before-close="handleClose"
          :visible.sync="innerDrawer">
          <p>_(:зゝ∠)_</p>
        </el-drawer>
        </div>
      </el-drawer>
    </div>
    <create-layout v-if="mode === 'create' || mode === 'edit' || mode === 'detail'  " :mode="mode" @done="done"></create-layout>
    <import-log v-if="mode === 'log'" :mode="mode"></import-log>
    <FilterScheme :diaVisible="filterSchemeVisible"  :listData="tabList" @filterRefresh="filterRefresh"></FilterScheme>
  </div>
</template>
<script type="text/ecmascript-6">
import Pagination from '@/components/Pagination'
import CreateLayout from "@/views/order/create-layout.vue";
import ImportLog from "@/views/order/import-log.vue";
import FilterScheme from "@/components/FilterScheme.vue";
export default {
  // 注册组件
  components: {
    Pagination,
    CreateLayout,
    ImportLog,
    FilterScheme,
  },
  data() {
    return {
      mode:'main',
      buttonSize:'small',
      activeName:'0',
      tabList:[{
        id:'0',
        label:'全部',
        iconColor:'',
        color:'#333333'
      }],
      tableData:[{
        deptName:'111',
        status:['执行中','逾'],
        workOrderType:'正常排产',
        progress:[{label:'车轮组装',value:0,exceed:false},{label:'车架组装',value:0,exceed:false},{label:'整车调试',value:0,exceed:false}]
      },{
        deptName:'111',
        status:['执行中','逾'],
        progress:[{label:'车轮组装',value:50,exceed:true},{label:'车轮调试',value:0,exceed:true},{label:'车架组装',value:0,exceed:true},{label:'整车调试',value:0,exceed:true}]
      },{
        deptName:'111',
        status:['未开始','逾'],
        progress:[{label:'开料',value:100,exceed:true},{label:'粗车加工',value:0,exceed:true},{label:'滚齿',value:0,exceed:true},{label:'去毛刺',value:0,exceed:true},{label:'电镀',value:0,exceed:true},{label:'包装',value:0,exceed:true}]
      }],
      drawer: false,
      innerDrawer: false,
      loading:false,
      color:['#333333','#02B980','#1990FF','#FBB832','#FE5950'],
      tagType:[ { type: '', label: '全部',value:12 },
      { type: 'success', label: '未开始',value:12 },
      { type: 'info', label: '执行中' ,value:12},
      { type: 'danger', label: '已结束' ,value:12},
      { type: 'warning', label: '已取消' ,value:12}],
      activeLabel:'全部',
      searchInputValue:'',
      searchSelectValue:'工单编号',
      searchOptions:[{
          value: '工单编号、产品编号、产品名称、产品规格',
          label: '工单编号、产品编号、产品名称、产品规格',
        }, {
          value: '工单编号',
          label: '工单编号'
        }, {
          value: '产品编号',
          label: '产品编号'
        }, {
          value: '产品名称',
          label: '产品名称'
        }, {
          value: '产品规格',
          label: '产品规格'
        }, {
          value: '工单备注',
          label: '工单备注'
        }, {
          value: '车间类型',
          label: '车间类型'
        }, {
          value: '重量',
          label: '重量'
      }],
      dropdownOptions:[{
          value: '开始',
          label: '开始',
          disabled:true,
          icon:'el-icon-video-play'
        },{
          value: '打印',
          label: '打印',
          disabled:false,
          icon:'el-icon-printer'
        },{
          value: '加急',
          label: '加急',
          disabled:false,
          icon:'el-icon-lightning'
        },{
          value: '复制',
          label: '复制',
          disabled:false,
          icon:'el-icon-copy-document'
        },{
          value: '结束',
          label: '结束',
          disabled:false,
          icon:'el-icon-s-help'
        },{
          value: '撤回',
          label: '撤回',
          disabled:false,
          icon:'el-icon-refresh-left'
        },{
          value: '取消',
          label: '取消',
          disabled:false,
          icon:'el-icon-zoom-out'
        },{
          value: '删除',
          label: '删除',
          disabled:false,
          icon:'el-icon-delete'
      },],
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      },
      form: {
        page: 1,
        limit: 10,
      },
      editRow:{},
      filterSchemeVisible:false,

    }
  },
  created() {

  },
  methods: {
    // 分页插件事件
    callFather(parm) {
      this.form.page = parm.currentPage
      this.form.limit = parm.pageSize
      this.getdata(this.form)
    },
    searchChange(){
    },
    handleClose(done) {
      this.$confirm('还有未保存的工作哦确定关闭吗？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleClick(){
      this.drawer = true
    },
    labelClick(options){
      this.activeLabel = options.label;
    },
    changeStatusColor(options){
      if(options == '逾'){
        return 'danger'
      }else if(options == '执行中'){
        return 'success'
      }{
        return ''
      }
    },
    create(){
      this.mode = 'create'
    },
    done(){
      this.mode = 'main'
    },
    showImportLog(){
      this.mode = 'log'
    },
    doDetail(row){
      this.mode = 'detail';
      this.editRow = row;
    },
    addTab(){
      this.filterSchemeVisible = true;
    },
    filterRefresh(){
      this.filterSchemeVisible = false;
    },
  }
}
</script>

<style scoped>
.el-icon-plus:hover{
  color: #1890ff;
}
.order-main{
  position: relative;
}
.add-button{
  position: absolute;
  top: 55px;
  right: 16px;
  padding: 4px;
}
.bottom-default-margin{
  margin-bottom: 15px;
}
.el-icon-s-order{
  font-size: 16px;
}
.tag-item{
  display: inline-block;
  height: 32px;
  padding: 0 12px;
  line-height: 30px;
  font-size: 12px;
  border-radius: 4px;
  box-sizing: border-box;
  white-space: nowrap;
  cursor: pointer;
  background-color: #f1f8f8;
  color: #909399;
  margin-right: 15px;
  color: #666;
}
.tag-item:hover{
  background-color: #f0f2f6;
}
.tag-item-active{
  color: #409eff;
  background-color: #ecf5ff;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-input-group__append .el-button--primary,
.el-input-group__prepend .el-button--primary{
  color: #fff;
  background-color: #1890ff;
  border-radius: 0 4px 4px 0;
}
.default-circle{
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  border: 3px solid rgb(204, 204, 204);
  }
  .blue-circle{
  border: 3px solid rgb(0, 120, 231);
  }
  .green-circle{
    color: #02b980;
    font-size: 35px;
    font-size: 21px;
    border: 3px solid rgb(2, 185, 128);
  }
  .default-percent-text{
    font-weight: 600;
    font-size: 10px;
    white-space: nowrap;
    vertical-align: middle;
    transform: scale(.83);
  }

  .default-process-item {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 36px;
    margin-right: 50px;
    margin-bottom: 20px;
}
.list-line-box {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 8px;
    overflow-y: hidden;
}
.default-process-text {
    position: absolute;
    left: 18px;
    max-width: 72px;
    margin-top: 2px;
    font-size: 12px;
    line-height: 12px;
    transform: translateX(-50%);
    bottom: -18px;
}
.process-text {
    max-width: 84px;
    overflow: hidden;
    color: #333;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.default-delay-tag {
    position: absolute;
}
.delay-tag {
  top: -5px;
  right: -7px;
  margin-right: 2px;
  color: #fff;
  font-size: 10px;
  background-color: #ff393d;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  -webkit-transform: scale(.83);
  transform: scale(.83);
}
.tootip-content .content{
  height: 24px;
}
.el-divider{
  background-color: #575859;
}
</style>
