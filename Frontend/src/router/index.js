//配置路由
import Router from 'vue-router'
import Vue from 'vue'

import Index from '../components/index/Index'
import Login from '../components/login/Login'
import Register from '../components/register/Register'
import Main from '../components/main/Main'
import Cart from '../components/cart/Cart'
import Combination from '../components/combination/Combination'
import NewProduct from '../components/newProduct/NewProduct'
import Rank from '../components/rank/Rank'
import Statistic from '../components/statistic/Statistic'
import Coupon from '../components/coupon/Coupon'
import Admin from '../components/admin/Admin'
import AdminCoupon from '../components/adminCoupon/AdminCoupon'
import AdminCouponAdd from '../components/adminCoupon/AdminCouponAdd'
import Activity from '../components/activity/Activity'
import ActivityAdd from '../components/activity/ActivityAdd'
import ActivityUpdate from '../components/activity/ActivityUpdate'
import ActivityCouponAdd from '../components/activity/ActivityCouponAdd'
import AdminCombination from '../components/adminCombination/AdminCombination'
import AdminCombinationAdd from '../components/adminCombination/AdminCombinationAdd'
import AdminCombinationUpdate from '../components/adminCombination/AdminCombinationUpdate'
import AdminStatistic from '../components/adminStatistic/AdminStatistic'

Vue.use(Router);
const router = new Router({
    routes:[
        {
            path:'/',
            component:Index
        },
        {
            path: '/login',
            component: Login
        },
        {
            path:'/register',
            component:Register
        },
        {
            path:'/cart',
            component:Cart
        },
        {
            path:'/combination',
            component:Combination
        },
        {
            path:'/newProduct',
            component:NewProduct
        },
        {
            path:'/rank',
            component:Rank
        },
        {
            path:'/statistic',
            component:Statistic
        },
        {
            path:'/coupon',
            component:Coupon
        },
        {
            path:'/admin',
            component:Admin,
            children:[
                {
                    path:'/main',
                    component:Main
                },
                {
                    path:'/adminCoupon',
                    component:AdminCoupon
                },
                {
                    path:'/adminCouponAdd',
                    component:AdminCouponAdd
                },
                {
                    path:'/activity',
                    component:Activity
                },
                {
                    path:'/activityAdd',
                    component:ActivityAdd
                },
                {
                    path:'/activityUpdate/:id',
                    component:ActivityUpdate
                },
                {
                    path:'/activityCouponAdd/:id',
                    component:ActivityCouponAdd
                },
                {
                    path:'/adminCombination',
                    component:AdminCombination
                },
                {
                    path:'/adminCombinationAdd',
                    component:AdminCombinationAdd
                },
                {
                    path:'/adminCombinationUpdate/:id',
                    component:AdminCombinationUpdate
                },
                {
                    path:'/adminStatistic',
                    component:AdminStatistic
                },

            ]
        }
    ]
});

const VueRouterPush = Router.prototype.push;
Router.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err=>err)
};

export default router;