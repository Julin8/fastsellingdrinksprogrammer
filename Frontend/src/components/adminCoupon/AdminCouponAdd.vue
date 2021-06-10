<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <!--<el-form-item label="优惠券id" prop="id" required>
                <el-input v-model="ruleForm.id"></el-input>
            </el-form-item>-->
            <el-form-item label="优惠券描述" prop="description">
                <el-input v-model="ruleForm.description"></el-input>
            </el-form-item>
            <el-form-item label="目标价格" required prop="targetAmount">
                <el-input v-model="ruleForm.targetAmount"></el-input>
            </el-form-item>
            <el-form-item label="优惠价格" required prop="discountAmount">
                <el-input v-model="ruleForm.discountAmount"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button type="primary" @click="subminCancel">取&nbsp;消</el-button>
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
                    description: '',
                    targetAmount:'',
                    discountAmount:'',
                },
                rules: {
                    description: [
                        {required: true, message: '请输入描述', trigger: 'blur'},
                    ],
                    targetAmount: [
                        {required: true, message: '请输入价格', trigger: 'blur'},
                        {pattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/, message: '请输入正确的价格' }
                    ],
                    discountAmount: [
                        {required: true, message: '请输入价格', trigger: 'blur'},
                        {pattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/, message: '请输入正确的价格' }
                    ]
                }
            };
        },
        created(){
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //提交
                        let url = `${HOST}/coupon/add`;
                        axios.post(url,this.ruleForm).then(()=>{
                            this.$message({
                                message: '恭喜你，操作成功',
                                type: 'success'
                            });
                            this.$router.push('/adminCoupon')
                        })

                    }
                });
            },
            subminCancel(){
                this.$router.push('/adminCoupon')
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