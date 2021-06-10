<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="套餐名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="价格" required prop="price">
                <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>
            <el-form-item label="原价" required prop="primaryPrice">
                <el-input v-model="ruleForm.primaryPrice"></el-input>
                <el-button type="text" size="small" @click="caclulate">caclulate</el-button>
            </el-form-item>
            <el-form-item label="库存" required>
                <el-input v-model="ruleForm.stockQuantity" v-show="isValidContentEditableValue"></el-input>
                <!--<span>{{ruleForm.stockQuantity}}</span>-->
            </el-form-item>

            <div v-for="o in ruleForm.combinationItem" :key="o">
                <el-form-item label="商品" required>
                    <span class="item">名称：<el-input class="productPrice" v-model="o.productInfo.name"></el-input></span>
                    <span class="item">价格：<el-input class="productPrice" v-model="o.price"></el-input></span>
                    <span class="item">数量：<el-input-number v-model="o.num" :min="0"></el-input-number></span>
            

                </el-form-item>
            </div>
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
    import ElInput from "element-ui/packages/input/src/input";

    export default {
        components: {ElInput},
        data() {
            return {
                ruleForm: {
                    id:'',
                    name: '',
                    price: '',
                    primaryPrice:'',
                    stockQuantity:'',
                    saleQuantity:'',
                    grade:0,
                    combinationItem:[],
                },
                productOpts:[],
                isValidContentEditableValue:true,
                rules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                    ],
                    price: [
                        {required: true, message: '请输入价格', trigger: 'blur'},
                        {pattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/, message: '请输入正确的价格' }
                    ],
                    primaryPrice: [
                        {required: true, message: '请输入价格', trigger: 'blur'},
                        {pattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/, message: '请输入正确的价格' }
                    ]
                }
            };
        },
        created(){
            //取传递的参数,传统的url参数
            //let id = this.$route.query.id
            //取resdult风格的参数,参数名是id
            this.getProductOpts();
            this.ruleForm.id = this.$route.params.id;
            this.getRecord();
            
        },
        methods: {
            caclulate(){
                this.ruleForm.primaryPrice=0;
                this.ruleForm.combinationItem.forEach((item)=>{
                    this.ruleForm.primaryPrice += item.price*item.num
                })
            },
            getProductOpts(){
                let url = `${HOST}/product/selectAll`;
                axios.get(url).then((res)=>{
                    this.productOpts = res.data;
                    //console.log(this.productOpts)
                });
            },
            //根据主键加载记录
            getRecord(){
                let url = `${HOST}/combination/search/${this.ruleForm.id}`;
                console.log("success");
                console.log(this.$route.params.id);
                console.log(this.ruleForm.id);
                axios.get(url).then((res)=>{
                    this.ruleForm = res.data;
                    this.update(res.data);
                    console.log(this.ruleForm);
                    console.log("karry success")
                })
            },
            update(res){
                this.ruleForm.stockQuantity = res.stockQuantity
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
                            this.$router.push('/adminCombination')
                        })

                    }
                });
            },
            submitCancel(){
                this.$router.push('/adminCombination')
            }
        }
    }
</script>

<style scoped>
    .el-breadcrumb{
        margin-bottom: 10px;
    }
    .productPrice{
        width: 200px;
    }
    .item{
        color: dimgray;
        margin-left: 10px;
    }
</style>