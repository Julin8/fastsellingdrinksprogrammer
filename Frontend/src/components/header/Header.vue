<template>
    <!--author: Julin-->
    <div>
        <div class="header">
            <ul class="info">
                <li>
                    <span v-if="customer.username">

                        <span @click="statistic" class="statistic">消费统计</span>

                        <span @click="userCoupon" class="coupon">优惠券</span>

                        <span class="customer">{{customer.username}}</span>

                        <span @click="logOut">[退出]</span>

                    </span>
                    <span v-else @click="login" class="login">登录</span><!--用户登录-->

                </li>
                <li>
                    <span v-if="customer.username">
                    </span>
                    <!--<span v-else @click="register" class="register">注册有礼</span>-->
                </li>
                <li @click="handleAdmin" class="admin">后台管理</li><!--管理员登录，进入后台-->
                <li>
                    <el-button size="medium" icon="el-icon-search"></el-button>
                </li>
                <li>
                    <el-input
                            placeholder="请输入内容"
                            size="medium"
                    >
                    </el-input>
                </li>
            </ul>
        </div>

        <div>
            <el-menu
                class="el-menu-demo"
                mode="horizontal"
                background-color="#BA3AB4"
                text-color="#fff"
                active-text-color="#009ad6"
                @select="handleSelect"
            >
                <el-menu-item index="1">首页</el-menu-item>
                <el-menu-item index="2">新品</el-menu-item>
                <el-menu-item index="3">套餐推荐</el-menu-item>
                <el-menu-item index="4">排行榜</el-menu-item>
            </el-menu>
        </div>

        <el-dialog title="登录" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="用户名">
                    <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleLogin">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {HOST} from '../../common/js/config'
    import ElForm from "element-ui/packages/form/src/form";
    import ElFormItem from "element-ui/packages/form/src/form-item";

    export default {
        components: {
            ElFormItem,
            ElForm},
        data(){
            return{
                form:{
                    username:'',
                    password:''
                },
                dialogFormVisible:false
            }
        },
        methods:{
            handleAdmin(){
                if(JSON.stringify(this.customer)==='{}'){
                    this.$router.push('/login')
                }
                else{
                    this.$router.push('/main')
                }
            },
            register(){
                this.$router.push('/register')
            },
            logOut(){
                this.$store.dispatch('setCustomer',{})
            },
            login(){
                this.dialogFormVisible=true
            },
            statistic(){
                this.$router.push('/statistic')
            },
            userCoupon(){
                this.$router.push('/coupon')
            },
            handleSelect(key){
                switch(key){
                    case '1':
                        this.$router.push('/');
                        break;
                    case '2':
                        this.$router.push('/newProduct');
                        break;
                    case '3':
                        this.$router.push('/combination');
                        break;
                    case '4':
                        this.$router.push('/rank');
                        break;
                }
            },
            handleLogin(){
                let url = `${HOST}/customer/login`;
                this.$ajax.post(url,this.form).then((res)=>{
                    switch (res.data.state){
                        case 0:
                            this.dialogFormVisible=false;
                            this.$store.dispatch('setCustomer',res.data.object);
                            break;
                        case 1:
                            this.$message({
                                message:'用户名错误',
                                type:'success'
                            });
                            break;
                        case 2:
                            this.$message({
                                message:'密码错误',
                                type:'success'
                            });
                            break;
                    }
                })
            }
        },
        computed:{
            ...mapGetters([
                'customer'
            ])
        }
    }
</script>

<style scoped>
    .item {
        margin-top: 10px;
    }
    .header {
        width: 100%;
        height: 45px;
        background-color: #F5F5F5;
    }

    .header ul{
        margin: 0;
        list-style: none;
    }

    .header .info li{
        float: right;

        line-height: 45px;
        font-size: 14px;
        color: #777;
    }

    .header .info .cart {
        color: #FE733D;
    }

    .header .info .cart i{
        padding-right: 4px;
    }

    .header .info .customer {
        font-weight: bold;
        color: #88a1ff;
    }

    .customer{
        margin-left: 15px;
    }
    .statistic{
        margin-left: 15px;
    }
    .admin{
        margin-left: 20px;
    }
    .login{
        margin-left: 20px;
    }
    .register{
        margin-left: 20px;
    }
    .coupon{
        margin-left: 20px;
    }
</style>