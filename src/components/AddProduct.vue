<template>
    <el-dialog
     title="添加产品"
     :visible.sync="dialogVisible"
     width="60%"
    :show-close="true"
    :modal-append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    @close="closeDialog"
    >
        <el-row class="tbl-btn">
            <el-col :span="14" class="tbl-btn-left">
                <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" plain @click="createProduct">新建产品</el-button>
            </el-col>
            <el-col :span="8" class="tbl-btn-right">
                <el-input placeholder="可搜索产品名称/编码/规格" v-model="searchInput" size="small">

                </el-input>
            </el-col>
            <el-col :span="2">
                <el-button size="small" type="primary"   icon="el-icon-search"></el-button>
            </el-col>
        </el-row>
        <el-table
            size="small"
            :data="listData"
            highlight-current-row
            v-loading="loading"
            stripe
            element-loading-text="加载中"
            :header-cell-style="_headerStyle"
            style="width: 100%;"
            >
            <el-table-column align="center" type="selection" width="60">
            </el-table-column>
            <el-table-column align="center" type="index" width="50" label="序号" fixed>
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
            <el-table-column  prop="deptNo" label="工艺路线" width="150">
            </el-table-column>
            <el-table-column  prop="deptNo" label="单位" width="90">
            </el-table-column>
            <el-table-column  prop="deptNo" label="库存数量" width="200">
            </el-table-column>
            <el-table-column  prop="deptNo" label="创建时间" width="200">
            </el-table-column>
            <el-table-column  prop="deptNo" label="创建人" width="200">
            </el-table-column>
            <el-table-column  prop="deptNo" label="最后更新时间" width="200">
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



        </el-table>
        <!-- 分页组件 -->
         <Pagination v-bind:child-msg="pageparm" @callFather="callFather" class="tbl-pagination"></Pagination>

        <CreateProduct :diaVisible="createProductPanVisible" @save="productSave"></CreateProduct>
    </el-dialog>
</template>
<script>
import Pagination from '@/components/Pagination';
import CreateProduct from '@/components/CreateProduct';
export default {
    name:'AddProduct',
    components:{
        Pagination,
        CreateProduct
    },
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
            searchInput:'',
            dialogVisible: false,
            listData:[

            ],
            loading:false,
             // 分页参数
            pageparm: {
                currentPage: 1,
                pageSize: 10,
                total: 10
            },
            createProductPanVisible:false,
        }
    },
    methods:{
        closeDialog(){
            setTimeout(() => {
                this.dialogVisible = false;
            }, 100);
        },
        /**
         * 分页插件事件
         */
        callFather(parm) {
            this.formInline.page = parm.currentPage
            this.formInline.limit = parm.pageSize
            this.getdata(this.formInline)
        },
        createProduct(){
            this.createProductPanVisible = true;
        },
        productSave(val){
            console.log("val",val);
            
        }
    }
}
</script>
<style scoped>
    .tbl-btn{
        width: 100%;
        height: 50px;
        line-height: 50px;

    }
    .tbl-btn .tbl-btn-right{
        text-align: right;
    }
    .tbl-pagination{
        text-align: right;
    }
</style>
