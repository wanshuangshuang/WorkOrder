// 导入组件
import Vue from 'vue';
import Router from 'vue-router';
// 登录
import login from '@/views/login';
// 首页
import index from '@/views/index';
/**
 * 基础菜单
 */
//主页
import Home from '@/views/home/Home';


/**
 * 生产管理
 */
// 销售订单
import Goods from '@/views/goods/Goods';
// 装配工单
import AssemblyWorkOrder from '@/views/assemblyWorkOrder/main-layout';
//工单
import Order from '@/views/order/Order';
//任务
import Task from '@/views/task/Task';
//报工
import WorkReport from '@/views/workReport/WorkReport';


/**
 * 库存管理
 */

 //入库单
import WarehousingOrder from '@/views/stockManagement/warehousingOrder/WarehousingOrder';
//出库单
import OutboundOrder from '@/views/stockManagement/outboundOrder/OutboundOrder';
//库存收发明细
import StockRDDetail from '@/views/stockManagement/stockRDDetail/StockRDDetail';

//库存余额
import StockBalance from '@/views/stockManagement/stockBalance/StockBalance';

//进销存汇总
import InventorySummary from '@/views/stockManagement/inventorySummary/InventorySummary';

/**
 * 基础数据
 */
//产品定义
import ProductDefinition from '@/views/basicData/productDefinition/ProductDefinition';
//物料清单
import MaterialList from '@/views/basicData/materialList/MaterialList';
//单位
import Unit from '@/views/basicData/unit/Unit';
//不良品相
import DefectiveProduct from '@/views/basicData/defectiveProduct/DefectiveProduct';
//工序
import WorkProcedure from '@/views/basicData/workProcedure/WorkProcedure';
//工艺路线
import ProcessRouting from '@/views/basicData/processRouting/ProcessRouting';
//绩效工资配置
import PerformAllocation from '@/views/basicData/performAllocation/PerformAllocation';








 

/* 在创建router实例对象之前，手动覆盖原型链的push来吞掉报错catch */
// 先存储默认底层的push
const originPush = Router.prototype.push
    // 覆盖原型链的push
Router.prototype.push = function(location, resolve, reject) {
    // this:路由实例对象

    // 判断用户有没有传后面两个可选参数
    if (resolve || reject) {
        return originPush.call(this, location, resolve, reject)
    } else { // 用户只传了第一个参数
        /*
        默认底层： catch()方法代码  throw err : 抛出异常
        吞掉报错原理： 重写catch()方法,把默认底层的 throw err给去掉，就不会抛出异常
        */
        return originPush.call(this, location).catch(err => {
            //  throw err
        })
    }
}

Vue.prototype._headerStyle = function() {
    return {
        'background': '#F4F4F4',
        'color': '#333'
    }
}

// 启用路由
Vue.use(Router);

// 导出路由
export default new Router({
    routes: [{
        path: '/',
        name: '',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    }, {
        path: '/login',
        name: '登录',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    }, {
        path: '/index',
        name: '首页',
        component: index,
        iconCls: 'el-icon-tickets',
        children: [{
                path: '/home/Home',
                name: '主页',
                component: Home,
                meta: {
                    requireAuth: true
                },
            },
            {
                path: '/goods/Goods',
                name: '销售订单',
                component: Goods,
                meta: {
                    requireAuth: true
                },
            }, {
                path: '/assemblyWorkOrder/main-layout',
                name: '装配工单',
                component: AssemblyWorkOrder,
                meta: {
                    requireAuth: true
                },
            },
            {
                path: '/order/Order',
                name: '工单',
                component: Order,
                meta: {
                    requireAuth: true
                },
            },
            {
                path: '/task/Task',
                name: '任务',
                component: Task,
                meta: {
                    requireAuth: true
                },
            },
            {
                path: '/workReport/WorkReport',
                name: '报工',
                component: WorkReport,
                meta: {
                    requireAuth: true
                },
            },

            {
                path: '/warehousingOrder/WarehousingOrder',
                name: '入库单',
                component: WarehousingOrder,
                meta: {
                    requireAuth: true
                },
            },
            {
                path: '/outboundOrder/OutboundOrder',
                name: '出库单',
                component: OutboundOrder,
                meta: {
                    requireAuth: true
                },
            },
            {
                path: '/stockRDDetail/StockRDDetail',
                name: '库存收发明细',
                component: StockRDDetail,
                meta: {
                    requireAuth: true
                },
            },
            {
                path: '/stockBalance/StockBalance',
                name: '库存余额',
                component: StockBalance,
                meta: {
                    requireAuth: true
                },
            },
            {
                path: '/inventorySummary/InventorySummary',
                name: '进销存汇总',
                component: InventorySummary,
                meta: {
                    requireAuth: true
                },
            },

            {
                path: '/productDefinition/ProductDefinition',
                name: '产品定义',
                component: ProductDefinition,
                meta: {
                    requireAuth: true
                },
            },

            {
                path: '/materialList/MaterialList',
                name: '物料清单',
                component: MaterialList,
                meta: {
                    requireAuth: true
                },
            },

            {
                path: '/unit/Unit',
                name: '单位',
                component: Unit,
                meta: {
                    requireAuth: true
                },
            },
            {
                path: '/defectiveProduct/DefectiveProduct',
                name: '不良品项',
                component: DefectiveProduct,
                meta: {
                    requireAuth: true
                },
            },
            {
                path: '/workProcedure/WorkProcedure',
                name: '工序',
                component: WorkProcedure,
                meta: {
                    requireAuth: true
                },
            },
            {
                path: '/processRouting/ProcessRouting',
                name: '工艺路线',
                component: ProcessRouting,
                meta: {
                    requireAuth: true
                },
            },
            {
                path: '/performAllocation/PerformAllocation',
                name: '绩效工资配置',
                component: PerformAllocation,
                meta: {
                    requireAuth: true
                },
            },


            
        ]
    }]
})