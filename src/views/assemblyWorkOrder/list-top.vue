<template>
  <div>
    <!-- 搜索筛选 -->
    <el-form :model="form" class="user-search" label-width="100px" size="small">
      <el-row>
        <el-col :span="8">
          <el-form-item label="单据编号">
            <el-input size="small" v-model="form.documentNo" placeholder="请输入单据编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建人">
            <el-input size="small" v-model="form.creator" placeholder="请输入创建人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间">
            <el-select v-model="form.createCondition" placeholder="请选择" style="width: 120px;">
              <el-option
                v-for="item in conditionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-date-picker
             v-if="form.createCondition == '0'"
             key="0"
             class="normal-half-width"
              v-model="form.createTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <el-date-picker
            v-if="form.createCondition !== '0' && form.createCondition !== '1'"
            class="normal-half-width"
            v-model="form.createTime"
            type="date"
            placeholder="请选择日期">
          </el-date-picker>
          <el-select v-model="form.dynamicCreateValue" placeholder="请选择" v-if="form.createCondition == '1'" class="normal-half-width" :class="{'w120':form.dynamicCreateValue == '7'}" @change="dynamicCreateValueChange">
            <el-option
              v-for="item in dynamicDate"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="form.createDateOne" placeholder="请选择" v-if="form.dynamicCreateValue == '7'" style="margin-top: 8px;width: 120px;">
            <el-option
              v-for="item in dateOneOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-tooltip content="只支持1-365的证整数">
            <el-input-number v-if="form.dynamicCreateValue == '7'" @blur="dateInputCreateBlur" v-model="form.dateCreateInput" step-strictly controls-position="right" :min="1" :max="365" style="margin-left: 8px;margin-top: 8px;width: 120px;"></el-input-number>
          </el-tooltip>
          <el-select v-model="form.createDateTwo" placeholder="请选择" v-if="form.dynamicCreateValue == '7'" style="margin-left: 8px;margin-top: 8px;width: calc(100% - 264px);">
            <el-option
              v-for="item in dateTwoOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-show="!isFold">
          <el-form-item label="更新人">
            <el-input size="small" v-model="form.deptName" placeholder="请输入更新人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-show="!isFold">
          <el-form-item label="更新时间">
            <el-select v-model="form.updateCondition" placeholder="请选择" style="width: 120px;">
              <el-option
                v-for="item in conditionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-date-picker
             v-if="form.updateCondition == '0'"
             key="0"
             class="normal-half-width"
              v-model="form.creationTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <el-date-picker
            v-if="form.updateCondition !== '0' && form.updateCondition !== '1'"
            key="1"
            class="normal-half-width"
            v-model="form.creationTime"
            type="date"
            placeholder="请选择日期">
          </el-date-picker>
          <el-select v-model="form.dynamicUpdateValue" placeholder="请选择" v-if="form.updateCondition == '1'" class="normal-half-width" :class="{'w120':form.dynamicUpdateValue == '7'}" @change="dynamicUpdateValueChange">
            <el-option
              v-for="item in dynamicDate"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="form.updateDateOne" placeholder="请选择" v-if="form.dynamicUpdateValue == '7'" style="margin-top: 8px;width: 120px;">
            <el-option
              v-for="item in dateOneOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-tooltip content="只支持1-365的证整数">
            <el-input-number v-if="form.dynamicUpdateValue == '7'" @blur="dateInputUpdateBlur" v-model="form.dateUpdateInput" step-strictly controls-position="right" :min="1" :max="365" style="margin-left: 8px;margin-top: 8px;width: 120px;"></el-input-number>
          </el-tooltip>
          <el-select v-model="form.updateDateTwo" placeholder="请选择" v-if="form.dynamicUpdateValue == '7'" style="margin-left: 8px;margin-top: 8px;width: calc(100% - 264px);">
            <el-option
              v-for="item in dateTwoOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="isFold == true ? 24 : 8" class="text-align-right">
            <span class="fold-botton"  @click="fold" v-if="isFold">
              <i class="el-icon-arrow-down" ></i>
              <span>展开</span>
            </span>
            <span class="fold-botton" @click="fold" v-if="!isFold" >
              <i class="el-icon-arrow-up" ></i>
              <span>折叠</span>
            </span>
          <el-button size="small" type="primary" icon="el-icon-search" @click="search">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  props:['form'],
  data() {
    return {
      isFold:true,
      conditionOptions: [{
        value: '0',
        label: '选择范围',
      }, {
        value: '1',
        label: '动态筛选'
      }, {
        value: '2',
        label: '小于'
      }, {
        value: '3',
        label: '小于等于'
      }, {
        value: '4',
        label: '等于'
      }, {
        value: '5',
        label: '大于'
      }, {
        value: '6',
        label: '大于等于'
      }],
      dynamicDate: [{
        value: '0',
        label: '今天',
      }, {
        value: '1',
        label: '昨天'
      }, {
        value: '2',
        label: '本周'
      }, {
        value: '3',
        label: '上周'
      }, {
        value: '4',
        label: '本月'
      }, {
        value: '5',
        label: '上月'
      }, {
        value: '6',
        label: '近三月'
      }, {
        value: '7',
        label: '自定义'
      }],
      dateOneOptions:[{
        value: '过去',
        label: '过去'
      }, {
        value: '未来',
        label: '未来'
      }],
      dateTwoOptions:[{
        value: '日',
        label: '日'
      }, {
        value: '周',
        label: '周'
      }, {
        value: '月',
        label: '月'
      }, {
        value: '季度',
        label: '季度'
      }, {
        value: '年',
        label: '年'
      }],
    }
  },
  methods: {
    // 自定义时 默认给1
    dynamicCreateValueChange:function(){
      if(this.form.dynamicCreateValue == '7'){
        this.$set(this.form,'dateCreateInput','1')
      }else{
        delete this.form.dateCreateInput
      }
    },
    dynamicUpdateValueChange:function(){
      if(this.form.dynamicUpdateValue == '7'){
        this.$set(this.form,'dateUpdateInput','1')
      }else{
        delete this.form.dateUpdateInput
      }
    },
    dateInputUpdateBlur:function(){
      if(this.form.dateUpdateInput == undefined){
        this.$set(this.form,'dateUpdateInput','1')
      }
    },
    dateInputCreateBlur:function(){
      if(this.form.dateCreateInput == undefined){
        this.$set(this.form,'dateCreateInput','1')
      }
    },
    search() {
      // this.getdata(this.form)
      this.$emit('search',this.form);
    },
    fold(){
      this.isFold = !this.isFold;
    }
  },
}
</script>
<style scoped>
.user-search {
  margin-top: 20px;
}
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
</style>
