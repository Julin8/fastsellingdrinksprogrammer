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

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
                <el-button type="primary" @click="submitCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import axios from 'axios'
    import {HOST} from "../../common/js/config";

    export default {
        data() {
            return {
                ruleForm: {
                    id:'',
                    name: '',
                    startTime: '',
                    endStart:''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入描述', trigger: 'blur'},
                    ],
                    startTime:[
                        {required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    endStart:[
                        {required: true, message: '请选择日期', trigger: 'change' }
                    ]
                }
            };
        },
        created(){
            //取传递的参数,传统的url参数
            //let id = this.$route.query.id
            //取resdult风格的参数,参数名是id
            this.ruleForm.id = this.$route.params.id;
            this.getRecord();
        },
        methods: {
            //根据主键加载记录
            getRecord(){
                let url = `${HOST}/activity/search/${this.ruleForm.id}`;
                console.log("success");
                console.log(this.$route.params.id);
                console.log(this.ruleForm.id);
                axios.get(url).then((res)=>{
                    this.ruleForm = res.data;
                    console.log(this.ruleForm);
                    console.log("karry success")
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //提交
                        let url = `${HOST}/combination/update`;
                        axios.post(url,this.ruleForm).then(()=>{
                            this.$message({
                                message: '恭喜你，操作成功',
                                type: 'success'
                            });
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
    .el-breadcrumb{
        margin-bottom: 10px;
    }
</style>