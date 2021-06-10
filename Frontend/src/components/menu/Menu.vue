<template>
    <div>
        <el-menu
                :default-active="active"
                class="el-menu-vertical"
                background-color="#c868c4"
                text-color="#fff"
                active-text-color="#ffd04b"
                @select="handleSelect"
        >
            <el-menu-item index="1">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-notebook-2"></i>
                    <span>商品维护</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="2-1" >商品管理</el-menu-item>
                    <el-menu-item index="2-2" >套餐管理</el-menu-item>
                    <el-menu-item index="2-3" >订单管理</el-menu-item>
                    <el-menu-item index="2-4" >查询统计</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-s-operation"></i>
                    <span>活动维护</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="3-1" >活动管理</el-menu-item>
                    <el-menu-item index="3-2" >优惠券管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="4">
                <i class="el-icon-s-release"></i>
                <span slot="title">退出</span>
            </el-menu-item>

        </el-menu>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                active:"1"
            }

        },
        methods: {
            //点击菜单项触发
            handleSelect(key) {
                switch(key){
                    case '1':
                        this.$router.push('/main');
                        break;
                    case '2-2':
                        this.$router.push('/adminCombination');
                        break;
                    case '2-4':
                        this.$router.push('/adminStatistic');
                        break;
                    case '3-1':
                        this.$router.push('/activity');
                        break;
                    case '3-2':
                        this.$router.push('/adminCoupon');
                        break;
                    case'4': //退出
                        this.$router.push('/login');
                        break;
                }

            }
        }
    }
</script>

<style scoped>
    .el-menu-vertical {
        min-height: 646px;
    }
</style>