<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="活动名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="开始时间" required prop="startTime">
                <el-date-picker
                        v-model="ruleForm.startTime"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" required prop="endStart">
                <el-date-picker
                        v-model="ruleForm.endStart"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="优惠券" required>
                <el-select 
                    v-model="coupon1"
                    value-key="id"
                    @change="getCoupon1($event)"
                >
                    <el-option
                        v-for="item in couponOpts"
                        :key="item.id"
                        :label="item.description"
                        :value="{id: item.id, description: item.description}">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="优惠券">
                <el-select 
                    v-model="coupon2"
                    value-key="id"
                    @change="getCoupon2($event)"
                >
                    <el-option
                        v-for="item in couponOpts"
                        :key="item.id"
                        :label="item.description"
                        :value="{id: item.id, description: item.description}">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button type="primary" @click="submitCancel">取 消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import axios from 'axios'
    import {HOST} from '../../common/js/config'
    import ElFormItem from "element-ui/packages/form/src/form-item";
    import ElButton from "element-ui/packages/button/src/button";
    export default {
        components: {
            ElButton,
            ElFormItem
        },
        data() {
            return {
                ruleForm: {
                    id:'',
                    name: '',
                    startTime:'',
                    endStart:'',
                    activityCoupon:[]
                },
                couponOpts:[],
                rules: {
                    name: [
                        {required: true, message: '请输入描述', trigger: 'blur'},
                    ],
                    startTime:[
                        {required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    endStart:[
                        {required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    couponId:[
                        {required: true, message:'请选择优惠券', trigger: 'blur'}
                    ]
                },
                coupon1:[],
                coupon2:[],
                activityCoupon1:{
                    couponId:'',
                },
                activityCoupon2:{
                    couponId:'',
                },
            };
        },
        created(){
            this.getCouponOpts()
        },
        methods: {
            getCouponOpts(){
                let url = `${HOST}/coupon/selAllCoupon`;
                axios.get(url).then((res)=>{
                    this.couponOpts = res.data;
                    console.log(this.couponOpts)
                })
            },
            getCoupon1(event){
                this.coupon1.couponId=event.id;
            },
            getCoupon2(event){
                this.coupon2.couponId=event.id;
            },
            submitForm(formName) {
                this.activityCoupon1.couponId=this.coupon1.id;
                this.activityCoupon2.couponId=this.coupon2.id;
                this.ruleForm.activityCoupon.push(this.activityCoupon1);
                this.ruleForm.activityCoupon.push(this.activityCoupon2);
                console.log("3")
                console.log(this.ruleForm);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //提交
                        let url = `${HOST}/activity/add`;
                        axios.post(url,this.ruleForm).then(()=>{
                            this.$message({
                                message: '恭喜你，操作成功',
                                type: 'success'
                            });
                            this.$router.push('/activity');
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
    .avatar {
        width: 146px;
        height: 146px;
        display: block;
    }
    .el-breadcrumb{
        margin-bottom: 10px;
    }
</style>