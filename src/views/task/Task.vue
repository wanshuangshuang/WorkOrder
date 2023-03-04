<template>
  <div>
    <div>
      <div class="white-background list-top-margin">
        <!-- 面包屑导航 -->
        <div class="page-top">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>生产管理</el-breadcrumb-item>
            <el-breadcrumb-item>
              <span style="color:#000;font-weight:bold;">任务</span>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <!-- tab页 -->
        <div>
          <el-row class="page-row">
            <el-col :span="12">
              <el-tabs v-model="tabName" @tab-click="tabClick">
                <el-tab-pane
                  :label="item.label"
                  :name="item.name"
                  v-for="item in tabList"
                  :key="item.name"
                ></el-tab-pane>
              </el-tabs>
            </el-col>
            <el-col :span="12" style="text-align:right; padding:5px 5px;">
                <el-button type="primary" size="small" icon="el-icon-check" plain @click="saveCurrent">保存当前</el-button>
                <el-button type="primary" size="small" icon="el-icon-s-operation" @click="filterScheme">筛选方案</el-button>
            </el-col>
          </el-row>
        </div>

        <!-- 搜索筛选 -->
        <el-form :model="form" class="user-search" label-width="110px" size="small">
          <el-row>
            <el-col :span="7">
              <el-form-item label="工单编号">
                <el-input size="small" v-model="form.documentNo" placeholder="请输入工单编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="工单状态">
                <el-select
                  v-model="form.orderSatus"
                  clearable
                  multiple
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
              <el-form-item label="工序编号">
                <el-input size="small" v-model="form.name" placeholder="请输入工序编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3" class="text-align-right">
              <el-button size="small" type="primary" icon="el-icon-search" @click="search">查询</el-button>
            </el-col>
          </el-row>
          <el-row v-show="!isFold" class="search-row">
            <el-col :span="7">
              <el-form-item label="工序名称">
                <el-select
                  v-model="form.processName"
                  clearable
                  multiple
                  filterable
                  placeholder="请选择"
                  style="width:100%;"
                >
                  <el-option
                    v-for="item in processNameList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="工序状态">
                <el-select
                  v-model="form.processStatus"
                  clearable
                  multiple
                  placeholder="请选择"
                  style="width:100%;"
                >
                  <el-option
                    v-for="item in processStatusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="7">
              <el-form-item label="计划数">
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
            <el-col :span="7" style="clear:both;">
              <el-form-item label="良品数">
                <div style="display:flex;">
                  <el-input-number
                    class="input-number"
                    v-model="form.bestSatrtNum"
                    controls-position="right"
                    :min="1"
                    :max="10"
                    placeholder="最小数"
                  ></el-input-number>
                  <span style="width:12px;text-align:center;">-</span>
                  <el-input-number
                    class="input-number"
                    v-model="form.bestEndNum"
                    controls-position="right"
                    :min="1"
                    :max="10"
                    placeholder="最大数"
                  ></el-input-number>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="不良品数">
                <div style="display:flex;">
                  <el-input-number
                    class="input-number"
                    v-model="form.badSatrtNum"
                    controls-position="right"
                    :min="1"
                    :max="10"
                    placeholder="最小数"
                  ></el-input-number>
                  <span style="width:12px;text-align:center;">-</span>
                  <el-input-number
                    class="input-number"
                    v-model="form.badEndNum"
                    controls-position="right"
                    :min="1"
                    :max="10"
                    placeholder="最大数"
                  ></el-input-number>
                </div>
              </el-form-item>
            </el-col>

            <el-col :span="7">
              <el-form-item label="计划开始时间">
                <el-select
                  v-model="form.createCondition"
                  placeholder="请选择"
                  style="width: 120px;"
                  @change="createConditionChange"
                >
                  <el-option
                    v-for="item in conditionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-date-picker
                  v-if="form.createCondition == '0'"
                  key="0"
                  class="half-width"
                  v-model="form.createTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
                <el-date-picker
                  v-if="form.createCondition !== '0' && form.createCondition !== '1'"
                  class="half-width"
                  v-model="form.createTime"
                  type="date"
                  placeholder="请选择日期"
                ></el-date-picker>
                <el-select
                  v-model="form.dynamicCreateValue"
                  placeholder="请选择"
                  v-if="form.createCondition == '1'"
                  class="half-width"
                  :class="{'w120':form.dynamicCreateValue == '7'}"
                  @change="dynamicCreateValueChange"
                >
                  <el-option
                    v-for="item in dynamicDate"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="form.createDateOne"
                  placeholder="请选择"
                  v-if="form.createCondition == '1' && form.dynamicCreateValue == '7'"
                  style="margin-top: 8px;width: 120px;"
                >
                  <el-option
                    v-for="item in dateOneOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-tooltip content="只支持1-365的正整数">
                  <el-input-number
                    v-if="form.createCondition == '1' && form.dynamicCreateValue == '7'"
                    @blur="dateInputCreateBlur"
                    v-model="form.dateCreateInput"
                    step-strictly
                    controls-position="right"
                    :min="1"
                    :max="365"
                    style="margin-left: 8px;margin-top: 8px;width: 120px;"
                  ></el-input-number>
                </el-tooltip>
                <el-select
                  v-model="form.createDateTwo"
                  placeholder="请选择"
                  v-if="form.createCondition == '1' && form.dynamicCreateValue == '7'"
                  style="margin-left: 8px;margin-top: 8px;width: calc(100% - 264px);"
                >
                  <el-option
                    v-for="item in dateTwoOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="7">
              <el-form-item label="计划结束时间">
                <el-select
                  v-model="form.updateCondition"
                  placeholder="请选择"
                  style="width: 120px;"
                  @change="updateConditionChange"
                >
                  <el-option
                    v-for="item in conditionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-date-picker
                  v-if="form.updateCondition == '0'"
                  key="0"
                  class="half-width"
                  v-model="form.creationTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
                <el-date-picker
                  v-if="form.updateCondition !== '0' && form.updateCondition !== '1'"
                  key="1"
                  class="half-width"
                  v-model="form.creationTime"
                  type="date"
                  placeholder="请选择日期"
                ></el-date-picker>
                <el-select
                  v-model="form.dynamicUpdateValue"
                  placeholder="请选择"
                  v-if="form.updateCondition == '1'"
                  class="half-width"
                  :class="{'w120':form.dynamicUpdateValue == '7'}"
                  @change="dynamicUpdateValueChange"
                >
                  <el-option
                    v-for="item in dynamicDate"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="form.updateDateOne"
                  placeholder="请选择"
                  v-if="form.updateCondition == '1' && form.dynamicUpdateValue == '7'"
                  style="margin-top: 8px;width: 120px;"
                >
                  <el-option
                    v-for="item in dateOneOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-tooltip content="只支持1-365的正整数">
                  <el-input-number
                    v-if="form.updateCondition == '1' && form.dynamicUpdateValue == '7'"
                    @blur="dateInputUpdateBlur"
                    v-model="form.dateUpdateInput"
                    step-strictly
                    controls-position="right"
                    :min="1"
                    :max="365"
                    style="margin-left: 8px;margin-top: 8px;width: 120px;"
                  ></el-input-number>
                </el-tooltip>
                <el-select
                  v-model="form.updateDateTwo"
                  placeholder="请选择"
                  v-if="form.updateCondition == '1'&& form.dynamicUpdateValue == '7'"
                  style="margin-left: 8px;margin-top: 8px;width: calc(100% - 264px);"
                >
                  <el-option
                    v-for="item in dateTwoOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="7">
              <el-form-item label="实际开始时间">
                <el-select
                  v-model="form.createCondition"
                  placeholder="请选择"
                  style="width: 120px;"
                  @change="createConditionChange"
                >
                  <el-option
                    v-for="item in conditionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-date-picker
                  v-if="form.createCondition == '0'"
                  key="0"
                  class="half-width"
                  v-model="form.createTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
                <el-date-picker
                  v-if="form.createCondition !== '0' && form.createCondition !== '1'"
                  class="half-width"
                  v-model="form.createTime"
                  type="date"
                  placeholder="请选择日期"
                ></el-date-picker>
                <el-select
                  v-model="form.dynamicCreateValue"
                  placeholder="请选择"
                  v-if="form.createCondition == '1'"
                  class="half-width"
                  :class="{'w120':form.dynamicCreateValue == '7'}"
                  @change="dynamicCreateValueChange"
                >
                  <el-option
                    v-for="item in dynamicDate"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="form.createDateOne"
                  placeholder="请选择"
                  v-if="form.createCondition == '1' && form.dynamicCreateValue == '7'"
                  style="margin-top: 8px;width: 120px;"
                >
                  <el-option
                    v-for="item in dateOneOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-tooltip content="只支持1-365的正整数">
                  <el-input-number
                    v-if="form.createCondition == '1' && form.dynamicCreateValue == '7'"
                    @blur="dateInputCreateBlur"
                    v-model="form.dateCreateInput"
                    step-strictly
                    controls-position="right"
                    :min="1"
                    :max="365"
                    style="margin-left: 8px;margin-top: 8px;width: 120px;"
                  ></el-input-number>
                </el-tooltip>
                <el-select
                  v-model="form.createDateTwo"
                  placeholder="请选择"
                  v-if="form.createCondition == '1' && form.dynamicCreateValue == '7'"
                  style="margin-left: 8px;margin-top: 8px;width: calc(100% - 264px);"
                >
                  <el-option
                    v-for="item in dateTwoOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="7">
              <el-form-item label="实际结束时间">
                <el-select
                  v-model="form.updateCondition"
                  placeholder="请选择"
                  style="width: 120px;"
                  @change="updateConditionChange"
                >
                  <el-option
                    v-for="item in conditionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-date-picker
                  v-if="form.updateCondition == '0'"
                  key="0"
                  class="half-width"
                  v-model="form.creationTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
                <el-date-picker
                  v-if="form.updateCondition !== '0' && form.updateCondition !== '1'"
                  key="1"
                  class="half-width"
                  v-model="form.creationTime"
                  type="date"
                  placeholder="请选择日期"
                ></el-date-picker>
                <el-select
                  v-model="form.dynamicUpdateValue"
                  placeholder="请选择"
                  v-if="form.updateCondition == '1'"
                  class="half-width"
                  :class="{'w120':form.dynamicUpdateValue == '7'}"
                  @change="dynamicUpdateValueChange"
                >
                  <el-option
                    v-for="item in dynamicDate"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="form.updateDateOne"
                  placeholder="请选择"
                  v-if="form.updateCondition == '1' && form.dynamicUpdateValue == '7'"
                  style="margin-top: 8px;width: 120px;"
                >
                  <el-option
                    v-for="item in dateOneOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-tooltip content="只支持1-365的正整数">
                  <el-input-number
                    v-if="form.updateCondition == '1' && form.dynamicUpdateValue == '7'"
                    @blur="dateInputUpdateBlur"
                    v-model="form.dateUpdateInput"
                    step-strictly
                    controls-position="right"
                    :min="1"
                    :max="365"
                    style="margin-left: 8px;margin-top: 8px;width: 120px;"
                  ></el-input-number>
                </el-tooltip>
                <el-select
                  v-model="form.updateDateTwo"
                  placeholder="请选择"
                  v-if="form.updateCondition == '1'&& form.dynamicUpdateValue == '7'"
                  style="margin-left: 8px;margin-top: 8px;width: calc(100% - 264px);"
                >
                  <el-option
                    v-for="item in dateTwoOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>


            <el-col :span="7">
              <el-form-item label="产品编号">
                <el-input size="small" v-model="form.name" placeholder="请输入产品编号"></el-input>
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

            <el-col :span="7">
              <el-form-item label="报工权限">
                <el-select
                  v-model="form.workAuth"
                  clearable
                  multiple
                  filterable
                  placeholder="请选择"
                  style="width:100%;"
                >
                  <el-option
                    v-for="item in workAuthList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="优先级">
                <el-select
                  v-model="form.priority"
                  clearable
                  multiple
                  placeholder="请选择"
                  style="width:100%;"
                >
                  <el-option
                    v-for="item in priorityList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="7">
              <el-form-item label="分配状态">
                <el-select
                  v-model="form.distributeStatus"
                  clearable
                  filterable
                  placeholder="请选择"
                  style="width:100%;"
                >
                  <el-option
                    v-for="item in distributeStatusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="7">
              <el-form-item label="子工艺路线">
                <el-input size="small" v-model="form.name" placeholder="请输入子工艺路线"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="创建人">
                <el-select
                  v-model="form.creator"
                  clearable
                  multiple
                  filterable
                  placeholder="请选择"
                  style="width:100%;"
                >
                  <el-option
                    v-for="item in creatorList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="更新人">
                <el-select
                  v-model="form.updator"
                  clearable
                  multiple
                  filterable
                  placeholder="请选择"
                  style="width:100%;"
                >
                  <el-option
                    v-for="item in updatorList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="7">
              <el-form-item label="创建时间">
                <el-select
                  v-model="form.createCondition"
                  placeholder="请选择"
                  style="width: 120px;"
                  @change="createConditionChange"
                >
                  <el-option
                    v-for="item in conditionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-date-picker
                  v-if="form.createCondition == '0'"
                  key="0"
                  class="half-width"
                  v-model="form.createTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
                <el-date-picker
                  v-if="form.createCondition !== '0' && form.createCondition !== '1'"
                  class="half-width"
                  v-model="form.createTime"
                  type="date"
                  placeholder="请选择日期"
                ></el-date-picker>
                <el-select
                  v-model="form.dynamicCreateValue"
                  placeholder="请选择"
                  v-if="form.createCondition == '1'"
                  class="half-width"
                  :class="{'w120':form.dynamicCreateValue == '7'}"
                  @change="dynamicCreateValueChange"
                >
                  <el-option
                    v-for="item in dynamicDate"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="form.createDateOne"
                  placeholder="请选择"
                  v-if="form.createCondition == '1' && form.dynamicCreateValue == '7'"
                  style="margin-top: 8px;width: 120px;"
                >
                  <el-option
                    v-for="item in dateOneOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-tooltip content="只支持1-365的正整数">
                  <el-input-number
                    v-if="form.createCondition == '1' && form.dynamicCreateValue == '7'"
                    @blur="dateInputCreateBlur"
                    v-model="form.dateCreateInput"
                    step-strictly
                    controls-position="right"
                    :min="1"
                    :max="365"
                    style="margin-left: 8px;margin-top: 8px;width: 120px;"
                  ></el-input-number>
                </el-tooltip>
                <el-select
                  v-model="form.createDateTwo"
                  placeholder="请选择"
                  v-if="form.createCondition == '1' && form.dynamicCreateValue == '7'"
                  style="margin-left: 8px;margin-top: 8px;width: calc(100% - 264px);"
                >
                  <el-option
                    v-for="item in dateTwoOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="7">
              <el-form-item label="更新时间">
                <el-select
                  v-model="form.updateCondition"
                  placeholder="请选择"
                  style="width: 120px;"
                  @change="updateConditionChange"
                >
                  <el-option
                    v-for="item in conditionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-date-picker
                  v-if="form.updateCondition == '0'"
                  key="0"
                  class="half-width"
                  v-model="form.creationTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
                <el-date-picker
                  v-if="form.updateCondition !== '0' && form.updateCondition !== '1'"
                  key="1"
                  class="half-width"
                  v-model="form.creationTime"
                  type="date"
                  placeholder="请选择日期"
                ></el-date-picker>
                <el-select
                  v-model="form.dynamicUpdateValue"
                  placeholder="请选择"
                  v-if="form.updateCondition == '1'"
                  class="half-width"
                  :class="{'w120':form.dynamicUpdateValue == '7'}"
                  @change="dynamicUpdateValueChange"
                >
                  <el-option
                    v-for="item in dynamicDate"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="form.updateDateOne"
                  placeholder="请选择"
                  v-if="form.updateCondition == '1' && form.dynamicUpdateValue == '7'"
                  style="margin-top: 8px;width: 120px;"
                >
                  <el-option
                    v-for="item in dateOneOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-tooltip content="只支持1-365的正整数">
                  <el-input-number
                    v-if="form.updateCondition == '1' && form.dynamicUpdateValue == '7'"
                    @blur="dateInputUpdateBlur"
                    v-model="form.dateUpdateInput"
                    step-strictly
                    controls-position="right"
                    :min="1"
                    :max="365"
                    style="margin-left: 8px;margin-top: 8px;width: 120px;"
                  ></el-input-number>
                </el-tooltip>
                <el-select
                  v-model="form.updateDateTwo"
                  placeholder="请选择"
                  v-if="form.updateCondition == '1'&& form.dynamicUpdateValue == '7'"
                  style="margin-left: 8px;margin-top: 8px;width: calc(100% - 264px);"
                >
                  <el-option
                    v-for="item in dateTwoOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
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
            <el-button size="small" type="primary" plain icon="el-icon-upload2">导出</el-button>
            <el-button size="small" plain icon="el-icon-s-operation" :disabled="!isBatchPrint">批量操作</el-button>
            <el-button type="text" icon="el-icon-edit-outline">编辑打印模板</el-button>
            <el-button type="text" icon="el-icon-tickets">自定义事件</el-button>
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
          :header-cell-style="_headerStyle"
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
              <el-tooltip content="复制">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-document-copy"
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

    <SaveScheme :diaVisible="schemeVisible"></SaveScheme>
    <FilterScheme :diaVisible="filterSchemeVisible"  :listData="tabList" @filterRefresh="filterRefresh"></FilterScheme>
  </div>
</template>
<script>
import Pagination from "../../components/Pagination";
import SaveScheme from "../../components/SaveScheme";
import FilterScheme from "../../components/FilterScheme";
export default {
  name: "Task",
  components: {
    Pagination,
    SaveScheme,
    FilterScheme
  },
  data() {
    return {
      filterSchemeVisible:false,
      schemeVisible:false,
      isBatchPrint: false,
      form: {},
      listData: [],
      loading: false,
      isFold: true,
      tblSelectionList: [],
      processNameList: [],
      orderStatusList: [
        {
          label: "未开始",
          value: "0"
        },
        {
          label: "执行中",
          value: "1"
        },
        {
          label: "已结束",
          value: "2"
        },
        {
          label: "已取消",
          value: "3"
        }
      ],
      workAuthList: [],
      processStatusList: [
        {
          label: "未开始",
          value: "0"
        },
        {
          label: "执行中",
          value: "1"
        },
        {
          label: "已结束",
          value: "2"
        }
      ],
      priorityList: [
        {
          label: "加急",
          value: "0"
        },
        {
          label: "无",
          value: "1"
        }
      ],
      distributeStatusList: [
        {
          label: "已分配",
          value: "0"
        },
        {
          label: "未分配",
          value: "1"
        }
      ],
      creatorList: [],
      updatorList: [],
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      },
      tabList: [
        {
          label: "车间看板",
          icon:'el-icon-tickets',
          color:'#000',
          name: "0"

        },
        {
          label: "我的看板",
          icon:'el-icon-tickets',
          color:'#000',
          name: "1"
        },
        {
          label: "分配看板",
          icon:'el-icon-tickets',
          color:'#000',
          name: "2"
        },
        {
          label: "员工看板",
          icon:'el-icon-tickets',
          color:'#000',
          name: "3"
        },
        {
          label: "工序看板",
          icon:'el-icon-tickets',
          color:'#000',
          name: "4"
        },
        {
          label: "所有任务",
          icon:'el-icon-tickets',
          color:'#000',
          name: "5"
        }
      ],
      tabName: "0",
      conditionOptions: [
        {
          value: "0",
          label: "选择范围"
        },
        {
          value: "1",
          label: "动态筛选"
        },
        {
          value: "2",
          label: "小于"
        },
        {
          value: "3",
          label: "小于等于"
        },
        {
          value: "4",
          label: "等于"
        },
        {
          value: "5",
          label: "大于"
        },
        {
          value: "6",
          label: "大于等于"
        }
      ],
      dynamicDate: [
        {
          value: "0",
          label: "今天"
        },
        {
          value: "1",
          label: "昨天"
        },
        {
          value: "2",
          label: "本周"
        },
        {
          value: "3",
          label: "上周"
        },
        {
          value: "4",
          label: "本月"
        },
        {
          value: "5",
          label: "上月"
        },
        {
          value: "6",
          label: "近三月"
        },
        {
          value: "7",
          label: "自定义"
        }
      ],
      dateOneOptions: [
        {
          value: "过去",
          label: "过去"
        },
        {
          value: "未来",
          label: "未来"
        }
      ],
      dateTwoOptions: [
        {
          value: "日",
          label: "日"
        },
        {
          value: "周",
          label: "周"
        },
        {
          value: "月",
          label: "月"
        },
        {
          value: "季度",
          label: "季度"
        },
        {
          value: "年",
          label: "年"
        }
      ]
    };
  },
  methods: {
    /**
     * 监听表格选中项变化事件
     */
    handleTblSelectionChange(val) {
      this.tblSelectionList = val;
    },
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage;
      this.formInline.limit = parm.pageSize;
      this.getdata(this.formInline);
    },
    fold() {
      this.isFold = !this.isFold;
    },
    createConditionChange: function() {
      this.$set(this.form, "dynamicCreateValue", "");
    },
    updateConditionChange: function() {
      this.$set(this.form, "dynamicUpdateValue", "");
    },
    dynamicUpdateValueChange:function(){
      if(this.form.dynamicUpdateValue == '7'){
        this.$set(this.form,'dateUpdateInput','1')
      }else{
        delete this.form.dateUpdateInput
      }
    },
    search() {

    },
    tabClick(tab, event) {
      console.log(tab, event);
    },
    saveCurrent(){
        this.schemeVisible = true;
    },
    filterScheme(){
        this.filterSchemeVisible = true;
    },
    filterRefresh(val){
      this.tabList = val;
    },
    dynamicCreateValueChange:function(){
      if(this.form.dynamicCreateValue == '7'){
        this.$set(this.form,'dateCreateInput','1')
      }else{
        delete this.form.dateCreateInput
      }
    },
    dateInputCreateBlur:function(){
      if(this.form.dateCreateInput == undefined){
        this.$set(this.form,'dateCreateInput','1')
      }
    },
  }
};
</script>
<style>
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
.search-row .input-number{
    width: calc(50% - 5px);
}
</style>
