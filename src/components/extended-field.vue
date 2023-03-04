<template>
  <div class="search-row">
    <el-col :span="24" v-if="allDataShow[0] == true">
      <el-form-item label="工单编号">
        <el-input size="small" v-model="form.documentNo" placeholder="请输入工单编号"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="24" v-if="allDataShow[1] == true">
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
    <el-col :span="24" v-if="allDataShow[2] == true">
      <el-form-item label="关联单据">
        <el-input size="small" v-model="form.documentNo" placeholder="请输入关联单据"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="24" v-if="allDataShow[3] == true">
      <el-form-item label="备注">
        <el-input size="small" v-model="form.documentNo" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="24" v-if="allDataShow[4] == true">
      <el-form-item label="工序编号">
        <el-input size="small" v-model="form.name" placeholder="请输入工序编号"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="24" v-if="allDataShow[5] == true">
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
    <el-col :span="24" v-if="allDataShow[6] == true">
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
    <el-col :span="24" v-if="allDataShow[7] == true" style="clear:both;">
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
    <el-col :span="24" v-if="allDataShow[8] == true">
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
    <el-col :span="24" v-if="allDataShow[9] == true">
      <el-form-item label="分配列表">
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
    <el-col :span="24" v-if="allDataShow[10] == true">
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
    <el-col :span="24" v-if="allDataShow[11] == true">
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
          style="margin-left: 8px;margin-top: 8px;width: calc(100% - 265px);"
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
    <el-col :span="24" v-if="allDataShow[12] == true">
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
    <el-col :span="24" v-if="allDataShow[13] == true">
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
    <el-col :span="24" v-if="allDataShow[14] == true">
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
    <el-col :span="24" v-if="allDataShow[15] == true">
      <el-form-item label="产品编号">
        <el-input size="small" v-model="form.name" placeholder="请输入产品编号"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="24" v-if="allDataShow[16] == true">
      <el-form-item label="产品名称">
        <el-input size="small" v-model="form.name" placeholder="请输入产品名称"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="24" v-if="allDataShow[17] == true">
      <el-form-item label="产品规格">
        <el-input size="small" v-model="form.name" placeholder="请输入产品规格"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="24" v-if="allDataShow[18] == true">
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
    <el-col :span="24" v-if="allDataShow[19] == true">
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
    <el-col :span="24" v-if="allDataShow[20] == true">
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
    <el-col :span="24" v-if="allDataShow[21] == true">
      <el-form-item label="子工艺路线">
        <el-input size="small" v-model="form.name" placeholder="请输入子工艺路线"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="24" v-if="allDataShow[22] == true">
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
    <el-col :span="24" v-if="allDataShow[23] == true">
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
    <el-col :span="24" v-if="allDataShow[24] == true">
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
    <el-col :span="24" v-if="allDataShow[25] == true">
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
    <el-col :span="24" v-if="allDataShow[26] == true">
      <el-form-item label="技术要求">
        <el-input size="small" v-model="form.documentNo" placeholder="请输入技术要求"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="24" v-if="allDataShow[27] == true">
      <el-form-item label="车间类型">
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
    <el-col :span="24" v-if="allDataShow[28] == true">
      <el-form-item label="重量">
        <el-input size="small" v-model="form.documentNo" placeholder="请输入重量"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="24" v-if="allDataShow[29] == true">
      <el-form-item label="客户名称">
        <el-input size="small" v-model="form.documentNo" placeholder="请输入客户名称"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="24" v-if="allDataShow[30] == true">
      <el-form-item label="客户类型">
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
</div>
</template>
<script>
export default {
  props:['proForm','checkListAll'],
  data() {
    return {
      allData:[],
      allDataShow:[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
      form:{},
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
      tblSelectionList: [],
      processNameList: [],
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
    }
  },
  created() {
    this.initData()
    this.form = this.proForm
  },
  methods: {
    initData(){
      this.allData = ['工单编号','工单状态','关联单据','备注','工序编号','报工权限','计划数'
      ,'良品数','不良品数','分配列表','工序名称','计划开始时间','计划结束时间','实际开始时间',
      '实际结束时间','产品编号','产品名称','产品规格','工序状态' ,'优先级','分配状态','子工艺路线',
      '创建人','更新人','创建时间','更新时间','技术要求','车间类型','重量','客户名称','客户类型'
     ]
     this.allDataShow = []
     this.allData.map(function(item){
      if(this.checkListAll.indexOf(item)!=-1){
        this.allDataShow.push(true)
      }else{
        this.allDataShow.push(false)
      }
     }.bind(this))
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
  },
}
</script>
<style scoped>
.search-row .half-width {
  width: calc(100% - 135px);
  margin-left: 8px;
}
</style>
