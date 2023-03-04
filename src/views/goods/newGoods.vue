<template>
    <div>
      <div class="white-background list-top-margin">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>生产管理</el-breadcrumb-item>
            <el-breadcrumb-item><span @click="goBack" style="cursor:pointer;">销售订单</span></el-breadcrumb-item>
            <el-breadcrumb-item><span style="color:#000;font-weight:bold;">创建销售订单</span></el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <el-divider></el-divider> -->
        <el-form ref="orderForm" :model="orderForm" :rules="orderFormRule" label-width="100px" class="order-form">
            <el-row :gutter="5">
                <el-col :span="8">
                    <el-form-item label="单据编号" label-width="72px">
                        <el-input size="small" v-model="orderForm.orderNo" placeholder="输入单据编号，忽略将自动生成"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="合同编号" prop="contractNo">
                        <el-input size="small" v-model="orderForm.contractNo" placeholder="输入合同编号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="客户名称" prop="customName">
                        <el-input size="small" v-model="orderForm.customName" placeholder="输入客户名称"></el-input>
                    </el-form-item>
                </el-col>

            </el-row>
        </el-form>
      </div>
      <div class="white-background">
        <el-row class="tbl-btn">
            <el-col :span="12" class="tbl-btn-left">
                <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="addProduct">添加产品</el-button>
                <el-button type="primary" size="small" icon="el-icon-download" plain>导入数据</el-button>
            </el-col>
            <el-col :span="12" class="tbl-btn-right">
                <el-button type="default" size="small" icon="el-icon-s-operation">列配置</el-button>
            </el-col>
        </el-row>
        <!--列表-->
        <el-table
        size="small"
        :data="listData"
        highlight-current-row
        v-loading="loading"
        stripe
        border
        element-loading-text="加载中"
        :header-cell-style="_headerStyle"
        style="width: 100%;"
        >
        <el-table-column align="center" type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column  prop="deptName" label="产品编号" width="200" >
            <template slot-scope="scope">
            <el-tooltip :content="scope.row.deptName" placement="top">
                <span class="txt-overflow" >{{scope.row.deptName}}</span>
            </el-tooltip>
            </template>
        </el-table-column>
        <el-table-column  label="产品名称" width="200">
            <template slot-scope="scope">
            <el-tooltip :content="scope.row.deptNo" placement="top">
                <span class="txt-overflow">{{scope.row.deptNo}}</span>
            </el-tooltip>
            </template>
        </el-table-column>

        <el-table-column  label="产品规格" width="100">
            <template slot-scope="scope">
            <el-tooltip :content="scope.row.deptNo" placement="top">
                <span class="txt-overflow">{{scope.row.deptNo}}</span>
            </el-tooltip>
            </template>
        </el-table-column>
        <el-table-column  prop="deptNo" label="产品属性" width="150">
        </el-table-column>
        <el-table-column  prop="deptNo" label="单位" width="90">
        </el-table-column>
        <el-table-column  prop="deptNo" label="工单编号" width="200">
        </el-table-column>
        <el-table-column  prop="deptNo" label="备注" width="60">
            <template slot-scope="scope">
                <el-input placeholder="请填写" v-model="scope.row.deptNo"></el-input>
            </template>
        </el-table-column>
        <el-table-column  prop="deptNo" label="数量" width="100">
                <template slot-scope="scope">
                    <el-input placeholder="请填写" v-model="scope.row.deptNo"></el-input>
                </template>
        </el-table-column>

        <el-table-column   prop="deptNo" label="完成数" width="100">
        </el-table-column>
        <el-table-column   prop="deptNo" label="不良品数" width="120">
        </el-table-column>


        <el-table-column align="center"  label="操作" min-width="120">
            <template slot-scope="scope">

            <el-tooltip content="复制">
                <el-button type="primary" size="mini" icon="el-icon-document-copy" circle @click="handleCopy(scope.$index, scope.row)"></el-button>

            </el-tooltip>
            <el-tooltip content="删除">
                <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.$index, scope.row)"></el-button>

            </el-tooltip>
            </template>
        </el-table-column>
        </el-table>
      </div>
         <AddProduct :diaVisible="isAddProdVisible"></AddProduct>
    </div>
</template>
<script>
import AddProduct from '@/components/AddProduct';
export default {
    name:'createGoods',
    components:{AddProduct},
    data(){
        return {
            isAddProdVisible:false,
            orderForm:{
                orderNo:'',
                contractNo:'',
                customName:'',
            },
            loading:false,
            listData:[

            ],
            orderFormRule:{
                contractNo: [{
                    required: true,
                    message: "请输入合同编号",
                    trigger: "blur",
                },] ,
                customName: [{
                    required: true,
                    message: "请输入客户名称",
                    trigger: "blur",
                },]
            },
        }
    },
    created(){
    },
    methods:{
        /**
         * 返回上一级
         */
        goBack(){
            this.$emit("goBack");
        },
        handleCopy(index,row){

        },
        handleDelete(index,row){

        },
        addProduct(){
            this.isAddProdVisible = true;
        }
    },

}
</script>
<style scoped>
    .order-form{
        margin-top: 15px;
    }
    .tbl-btn{
        width: 100%;
        height: 50px;
        line-height: 50px;

    }
    .tbl-btn .tbl-btn-right{
        text-align: right;
    }
    .txt-overflow{
        text-overflow:ellipsis;
        white-space:nowrap;
    }


</style>
