<template>
    <el-drawer
    title="筛选方案列表"
    :visible.sync="dialogVisible"
    :direction="direction"
    :before-close="closeDialog"
    :modal-append-to-body="false"
    class="draw-header"
    size="45%">
       <div class="draw-header-panel">
           <div class="list-top-margin">
               <el-button type="primary" size="small" icon="el-icon-plus" plain @click="createScheme">创建筛选方案</el-button>
               <span style="font-size:12px;color:#aaa;">{{summaryText}}</span>
           </div>
           <el-table
            size="small"
            :data="filterData"
            highlight-current-row
            v-loading="loading"
            element-loading-text="加载中"
            style="width: 100%;"
            :header-cell-style="_headerStyle"
            border
            >
            <el-table-column  prop="deptNo" label="筛选方案名称" >
                <template slot-scope="scope">
                    <i :class="scope.row.icon" :style="{'color':scope.row.color}"></i>
                    <span>{{scope.row.label}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center"  label="操作" >
              <template slot-scope="scope">
                <el-tooltip content="编辑">
                  <el-button type="primary" size="mini" icon="el-icon-edit" circle  @click="handleEdit(scope.$index, scope.row)"></el-button>

                </el-tooltip>

                <el-tooltip content="删除">
                  <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="deleteUser(scope.$index, scope.row)"></el-button>

                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-drawer
            title="创建方案"
            :append-to-body="true"
            :before-close="innerHandleClose"
            :visible.sync="innerVisisble">
            <div class="draw-header-panel">
                <el-form ref="proForm" :model="proForm" :rules="proFormRules" label-width="100px">
                    <el-row :gutter="5">
                        <el-col :span="24">
                            <el-form-item label="方案名称" prop="schemeName">
                                <el-input size="small" v-model="proForm.schemeName" placeholder="输入方案名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="方案颜色" prop="color">
                                <el-select
                                  class="change-prefix"
                                   placeholder=""
                                    v-model="proForm.color"
                                    style="width:100%;"
                                    @change="colorChange"
                                    >
                                    <i slot="prefix" :class="colorObj.icon" :style="{'color':colorObj.color}"></i>
                                    <el-option
                                        v-for="item in colorList"
                                        :key="item.value"
                                        :value="item"
                                    >
                                        <span style="text-align:center">
                                            <i :class="item.icon" :style="{'color':item.color}"></i>
                                        </span>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="使用范围" prop="useScope">
                                <el-select
                                    v-model="proForm.useScope"
                                    clearable
                                    multiple
                                    filterable
                                    placeholder="请选择"
                                    style="width:100%;"
                                    @change="useScopeChange"
                                    >
                                    <el-option
                                        v-for="item in useScopeList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="二级分组" prop="secondaryGrouping">
                                <el-select
                                    v-model="proForm.secondaryGrouping"
                                    clearable
                                    filterable
                                    placeholder="请选择"
                                    style="width:100%;"
                                    @change="secondaryGroupingChange"
                                    >
                                    <el-option
                                        v-for="item in secondaryGroupingList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="" prop="">
                              <el-popover
                                placement="left-start"
                                title="添加筛选条件"
                                width="350"
                                trigger="click"
                                v-model="popIshow"
                                >
                                <filter-criteria :checkListAll="checkListAll" @done="popDone" v-if="popIshow" ></filter-criteria>
                                <el-button slot="reference" type="primary" icon="el-icon-plus" plain size="mini" @click="addFilterCriteria">添加筛选条件</el-button>
                              </el-popover>
                              <span style="font-size:12px;color:#aaa;" class="left-large-margin">已添加{{summaryCount}}个</span>
                              <el-button type="text" class="left-large-margin">重置</el-button>
                            </el-form-item>
                        </el-col>
                        <!-- v-if="extendedField.length!=0"  -->
                        <extended-field :proForm="proForm" :checkListAll="checkListAll" :key="uniqueKey"></extended-field>
                    </el-row>
                </el-form>
            </div>
            <div class="draw-header-panel-bottom">
                <el-button size="small" type="default"  @click="innerHandleClose">取 消</el-button>
                <el-button size="small" type="primary"  @click="innerHandleSave">确 定</el-button>
            </div>
        </el-drawer>
    </el-drawer>
</template>
<script>
import FilterCriteria from "@/components/filter-criteria.vue";
import ExtendedField from "@/components/extended-field.vue";
export default {
    name:'FilterScheme',
    components:{
      FilterCriteria,
      ExtendedField,
    },
    props:{
        diaVisible:{
            type:Boolean,
            default:false,
        },
        listData:{
            type:Array,
            default:[]
        }
    },
    watch:{
        diaVisible(newVal,oldVal){
            if(newVal){
                this.dialogVisible = newVal;
            }
        },
        listData(newVal,oldVal){
            if(newVal){
                this.filterData = newVal;
                this.summaryText = "已创建"+newVal.length+"条，最多创建20条";
            }
        }
    },
    data(){
        return{
          uniqueKey:new Date().getTime(),
          extendedField:[],
          popIshow:false,
          checkListAll:[],
          summaryCount:0,
          summaryText:"",
          loading:false,
          direction:'rtl',
          dialogVisible: false,
          proForm:{
              schemeName:'',
              useScope:['0'],
              secondaryGrouping:[],
              color:{},
          },
          proFormRules:{
              schemeName:[
                  { required: true, message: '请输入方案名称', trigger: 'blur' }
              ]
          },
          useScopeList:[
              {
                  label:'所有人',
                  value:'0'
              }
          ],
          filterData:[],
          innerVisisble:false,
          colorObj:{
            icon:'el-icon-tickets',
            color:'#000000',
          },
          colorList:[
              {
                  icon:'el-icon-tickets',
                  color:'#000000',
                  label:'0',
                  value:'0'
              },
              {
                  icon:'el-icon-tickets',
                  color:'#02B980',
                  label:'1',
                  value:'1'
              },
              {
                  icon:'el-icon-tickets',
                  color:'#1990FF',
                  label:'2',
                  value:'2'
              },
              {
                  icon:'el-icon-tickets',
                  color:'#FBB832',
                  label:'3',
                  value:'3'
              },
              {
                  icon:'el-icon-tickets',
                  color:'#FE5950',
                  label:'4',
                  value:'4'
              },

          ],
          secondaryGroupingList:[{
              label:'工序名称',
              value:'0'
          },{
              label:'工序状态',
              value:'1'
          },{
              label:'分配状态',
              value:'2'
          },{
              label:'分配列表',
              value:'3'
          },{
              label:'车间类型',
              value:'4'
          },{
              label:'客户类型',
              value:'5'
          },{
              label:'工单类型',
              value:'6'
          },{
              label:'是否启动微信通知',
              value:'7'
          }],
        }
    },
    created(){
      this.getColumnDataList()
      this.filterData = this.listData;
      this.summaryText = "已创建"+this.filterData.length+"条，最多创建20条";
    },
    methods:{
      getUniqueKey(){
        this.uniqueKey = new Date().getTime()
      },
      handleSave(){
          this.$refs["proForm"].validate((valid) => {
              if(valid){
                  this.dialogVisible = false;
                  // this.$emit('save',this.proForm);
                  this.$parent.filterSchemeVisible = false;

              }
          })

      },

      closeDialog(){
          setTimeout(() => {
              this.dialogVisible = false;
              this.$parent.filterSchemeVisible = false;
          }, 100);
      },
      innerHandleClose(){
          setTimeout(() => {
              this.innerVisisble = false;
          }, 100);
      },
      useScopeChange(val){
          // this.proForm.useScope = val.join(',');
      },
      secondaryGroupingChange(){

      },
      createScheme(){
          if(this.filterData.length >= 20){
                this.$msgbox({
                  title: "提示",
                  message: "当前已存在20条筛选方案，无法创建！",
                  type: "warning",
              });
              return;
          }
          this.innerVisisble = true;

      },
      innerHandleSave(){

      },
      colorChange(val){
          this.colorObj.color = val.color
          this.colorObj.icon = val.icon
      },
      getColumnDataList(){

      },
      addFilterCriteria(){

      },
      popDone(options){
        if(options.type == 'save'){
          this.checkListAll = options.data
          this.getUniqueKey()
        }
        this.popIshow = false;
      },
    }

}
</script>
<style>
    .draw-header-panel{
        /* width: 100%; */
        /* height: 200px; */
        overflow-y: auto;
        overflow-x: hidden;
        padding: 0px 20px;
    }

    .draw-header-panel-bottom{
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
    .draw-header-panel-bottom el-button{
        margin: 10px 0 0 10px;
    }

    .draw-header-panel .el-form-item{
        margin-bottom: 20px;
    }
    .draw-header{
        font-size: 16px;
        font-weight: bold;
        color: #000;
    }
    .draw-header-panel .change-prefix .el-input__prefix{
      left: 50%;
      margin-left: -10px;
      font-size: 18px;
    }
</style>
