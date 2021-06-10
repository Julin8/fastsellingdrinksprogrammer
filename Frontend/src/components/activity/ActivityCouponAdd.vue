<template>
    <div>
        <div class="title">
            <span style="letter-spacing: 9px"> 添加优惠券</span>
        </div>
        <div class="ad">
            <el-form :model="ruleForm" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
                <el-form-item label="优惠券" required prop="description">
                    <el-select
                            v-model="ruleForm.description"
                            value-key="id"
                            @change="getCouponId($event)"
                    >
                        <el-option
                                v-for="item in couponOpts"
                                :key="item.id"
                                :label="item.description"
                                :value="{id: item.id, description: item.description}"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">立即添加</el-button>
                    <el-button type="primary" style="letter-spacing: 2px" @click="submitCancel">取 消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {HOST} from '../../common/js/config'
    export default {

        data(){
            return{
                ruleForm:{
                    id:'',
                    description:'',
                },
                form:{
                    couponId:'',
                    activityId:''
                },
                couponOpts:[],
                rules: {
                    coupon:[
                        {required: true, message:'请选择优惠券', trigger: 'blur'}
                    ]
                }
            }
        },
        created(){
            this.getCouponOpts();
            this.form.activityId = this.$route.params.id;
        },
        methods:{
            getCouponId(event){
                console.log(event);
                this.ruleForm.id = event.id;
                this.ruleForm.description = event.description;
                console.log(this.ruleForm);
                console.log("success");
                this.form.couponId = this.ruleForm.id;
            },
            getCouponOpts(){
                let url = `${HOST}/coupon/selAllCoupon`;
                axios.get(url).then((res)=>{
                    this.couponOpts = res.data;
                    console.log(this.couponOpts)
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //提交
                        let url = `${HOST}/activityCoupon/add`;
                        axios.post(url,this.form).then(()=>{
                            this.$message({
                                message: '恭喜你，操作成功',
                                type: 'success'
                            });
                            this.$router.push('/activity')
                        })

                    }
                });
            },
            submitCancel(){
                this.$router.push('/activity')
            }
        }
    }
</script>

<style scoped>
    .title{
        font-size: larger;
        margin-left: 20px;
        margin-top: 20px;
    }
    .ad{
        margin-top: 30px;
        margin-bottom: 20px;
    }
</style>