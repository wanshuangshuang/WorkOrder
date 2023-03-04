<template>
     <el-dialog
     title="创建产品"
     :visible.sync="dialogVisible"
     width="45%"
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
                    <el-col :span="12">
                        <el-form-item label="产品编号">
                            <el-input size="small" v-model="proForm.name1" placeholder="输入产品编号，忽略将自动生成"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="产品名称" prop="contractNo">
                            <el-input size="small" v-model="proForm.name2" placeholder="输入合同编号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="库存单位" prop="customName">
                            <el-input size="small" v-model="proForm.name3" placeholder="输入库存单位"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="产品规格" prop="customName">
                            <el-input size="small" v-model="proForm.name4" placeholder="输入产品规格"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="产品属性" prop="customName">
                            <el-input size="small" v-model="proForm.name5" placeholder="输入产品属性"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="工艺路线" prop="customName">
                            <el-input size="small" v-model="proForm.name6" placeholder="输入工艺路线"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="最大库存" prop="customName">
                            <el-input size="small" v-model="proForm.name7" placeholder="输入最大库存"></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="12">
                        <el-form-item label="最小库存" prop="customName">
                            <el-input size="small" v-model="proForm.customName" placeholder="输入最小库存"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="安全库存" prop="customName">
                            <el-input size="small" v-model="proForm.customName" placeholder="输入安全库存"></el-input>
                        </el-form-item>
                    </el-col>

                      <el-col :span="12">
                        <el-form-item label="类别" prop="customName">
                            <el-input size="small" v-model="proForm.customName" placeholder="输入类别"></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="12">
                        <el-form-item label="重量" prop="customName">
                            <el-input size="small" v-model="proForm.customName" placeholder="输入重量"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="存放厂房" prop="customName">
                            <el-input size="small" v-model="proForm.customName" placeholder="输入存放厂房"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="成本单价" prop="customName">
                            <el-input size="small" v-model="proForm.customName" placeholder="输入成本单价"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
           </el-form>

           
       </div>
       <div class="panel-bottom">
            <el-button size="small" type="default"  @click="closeDialog">取消</el-button>
            <el-button size="small" type="primary"  @click="handleSave">保存</el-button>
        </div>
     
    </el-dialog>
</template>
<script>
export default {
    name:'createProduct',
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

            }
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
        height: 45vh;
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