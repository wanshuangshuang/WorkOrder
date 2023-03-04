<template>
     <el-dialog
     title="保存方案"
     :visible.sync="dialogVisible"
     width="580px"
    :show-close="true"
    :modal-append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    @close="closeDialog"
    :destroy-on-close="true"
    >
       <div class="panel">
           <el-form ref="proForm" :model="proForm" :rules="proFormRules" label-width="100px">
                <el-row :gutter="5">
                    <el-col :span="24">
                        <el-form-item label="方案名称" prop="schemeName">
                            <el-input size="small" v-model="proForm.schemeName" placeholder="输入方案名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="使用范围" prop="useScope">
                            <el-select
                                v-model="useScope"
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
                                ></el-option>
                            </el-select>
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
    name:'SaveScheme',
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
                schemeName:'',
                useScope:'',
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
            useScope:['0'],
        }
    },
    created(){

    },
    methods:{
        handleSave(){
            this.$refs["proForm"].validate((valid) => {
                if(valid){
                    this.dialogVisible = false;
                    // this.$emit('save',this.proForm);
                    this.$parent.schemeVisible = false;
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                }
            })
            
        },
      
        closeDialog(){
            setTimeout(() => {
                this.dialogVisible = false;
                this.$parent.schemeVisible = false;
            }, 100);
        },
        useScopeChange(val){
            this.proForm.useScope = val.join(',');
            console.log(this.proForm.useScope);
        }
    }
    
}
</script>
<style scoped>
    .panel{
        /* width: 100%; */
        /* height: 200px; */
        overflow-y: auto;
        overflow-x: hidden;
        padding: 0px 50px;
    }
   
    .panel-bottom{
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
    .panel-bottom el-button{
        margin: 10px 0 0 10px;
    }
    .el-form-item{
        margin-bottom: 20px;
    }
   
</style>