<template>
    <div>
        <Header/>
        <el-form :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import Header from '../header/Header'
    import {HOST} from '../../common/js/config'
    import axios from 'axios'
    export default {
        components:{
            Header
        },
        data(){ //定义数据
            return{
                form: {
                    username: '',
                    password: ''
                }
            }
        },
        methods:{
            onSubmit(){
                let url = `${HOST}/customer/login`;
                axios.post(url,this.form).then((res)=>{
                    switch (res.data.state){
                        case 0://成功
                            //把用户的JSON对象转换成字符串，存入sessionStorage
                            sessionStorage.setItem('customer',JSON.stringify(res.data.object));
                            this.$router.push('/');
                            break;
                        case 1://用户名错误
                            this.$message({
                                message:'用户名错误',
                                type:'success'
                            });
                            break;
                        case 2://密码错误
                            this.$message({
                                message:'密码错误',
                                type:'success'
                            });
                            break;
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>