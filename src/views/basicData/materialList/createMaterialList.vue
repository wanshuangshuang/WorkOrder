<template>
     <el-dialog
     title="创建物料清单"
     :visible.sync="dialogVisible"
     width="500px"
     top="5vh"
    :show-close="true"
    :modal-append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    @close="closeDialog"
    >
       <div class="panel">
           <el-form ref="proForm" :model="proForm" :rules="proFormRules" label-width="85px">
                <el-row :gutter="5">
                    <el-col :span="24">
                        <el-form-item label="父项产品">
                            <el-select
                                v-model="proForm.orderSatus"
                                clearable
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
                    <el-col :span="24">
                        <el-form-item label="子项产品">
                            <el-select
                                v-model="proForm.orderSatus"
                                clearable
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
                    <el-col :span="24">
                        <el-form-item label="单位用量" prop="num">
                            <el-input-number v-model="proForm.num" controls-position="right"  :min="1" :max="1000" style="width:100%"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="备注" prop="customName">
                            <el-input size="small" type="textarea" :rows="2" v-model="proForm.name4" placeholder="输入备注"></el-input>
                        </el-form-item>
                    </el-col>
                    
                </el-row>
           </el-form>

           
       </div>
       <div class="panel-bottom">
            <el-button size="small" type="default"  @click="closeDialog">取消</el-button>
            <el-button size="small" type="primary" >继续添加子项</el-button>
            <el-button size="small" type="primary"  @click="handleSave">保存</el-button>
        </div>
     
    </el-dialog>
</template>
<script>
export default {
    name:'createMaterialList',
    props:{ 
        diaVisible:{
            type:Boolean,
            default:false,
        }
    },
    watch:{
        diaVisible(newVal,oldVal){
            if(newVal){
                this.dialogVisible = newVal;
            }
        }
    },
    data(){
        return{
            dialogVisible: false,
            proForm:{

            },
            proFormRules:{

            },
             orderStatusList: [
                {
                label: "自制",
                value: "0"
                },
                {
                label: "外购",
                value: "1"
                },
                {
                label: "委外",
                value: "2"
                }
            ],
        }
    },
    created(){

    },
    methods:{
        handleSave(){
            this.dialogVisible = false;
            this.$emit('save',this.proForm);
        },
      
        closeDialog(){
            setTimeout(() => {
                this.dialogVisible = false;
                this.$parent.createProductPanVisible = false;
            }, 100);
        },
    }
    
}
</script>
<style scoped>
    .panel{
        /* width: 100%; */
        /* height:350px; */
        overflow-y: auto;
        overflow-x: hidden;
        /* padding: 0px 50px; */
    }
   
    .panel-bottom{
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding-top: 20px;
        text-align: center;
    }
    .panel-bottom el-button{
        margin: 10px 0 0 10px;
    }
    .el-form-item{
        margin-bottom: 10px;
    }
   
</style>