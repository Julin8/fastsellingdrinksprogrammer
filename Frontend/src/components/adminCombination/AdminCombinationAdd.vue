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
                <el-button type="text" size="small" @click="getPrimaryPrice">caclulate</el-button>
            </el-form-item>
            <el-form-item label="库存" required>
                <el-input v-model="ruleForm.stockQuantity"></el-input>
            </el-form-item>

            <el-form-item label="商品" required>
                <el-select
                        v-model="product1"
                        value-key="id"
                        @change="getProduct1($event)"
                >
                    <el-option
                            v-for="item in productOpts"
                            :key="item.id"
                            :label="item.name"
                            :value="{id: item.id, name: item.name}"
                    >
                    </el-option>
                </el-select>
                <span class="item">价格：<el-input class="productPrice" v-model="product1.price"></el-input></span>
                <!--<span class="item">数量：<el-input class="productPrice" v-model="ruleForm.combinationItem1.num"></el-input></span>-->
                <span class="item">数量：<el-input-number v-model="combinationItem1.num" :min="0"></el-input-number></span>
            </el-form-item>

            <el-form-item label="商品" required>
                <el-select
                        v-model="product2"
                        value-key="id"
                        @change="getProduct2($event)"
                >
                    <el-option
                            v-for="item in productOpts"
                            :key="item.id"
                            :label="item.name"
                            :value="{id: item.id, name: item.name}"
                    >
                    </el-option>
                </el-select>
                <span class="item">价格：<el-input class="productPrice" v-model="product2.price"></el-input></span>
                <span class="item">数量：<el-input-number v-model="combinationItem2.num" :min="0"></el-input-number></span>
            </el-form-item>

            <el-form-item label="商品">
                <el-select
                        v-model="product3"
                        value-key="id"
                        @change="getProduct3($event)"
                >
                    <el-option
                            v-for="item in productOpts"
                            :key="item.id"
                            :label="item.name"
                            :value="{id: item.id, name: item.name}"
                    >
                    </el-option>
                </el-select>
                <span class="item">价格：<el-input class="productPrice" v-model="product3.price"></el-input></span>
                <span class="item">数量：<el-input-number v-model="combinationItem3.num" :min="0"></el-input-number></span>
            </el-form-item>
            

            
            <!--<el-button type="text" class="addOne">添加商品</el-button>
            <div v-for="(item, index) in ruleForm.dynamicItem" :key="index">
                julin
                <el-form-item label="商品" required>
                    <el-select
                        v-model="ruleForm.dynamicItem"
                        value-key="id"
                        @change="getProductOpts($event)"
                    >
                        <el-option
                            v-for="item in productOpts"
                            :key="item.id"
                            :label="item.name"
                            :value="{id: item.id, name: item.name}"
                        >
                        </el-option>
                    </el-select>
                    <span class="item">价格：<el-input class="productPrice"></el-input></span>
                    <span class="item">数量：<el-input class="productPrice"></el-input></span>
                </el-form-item>
                <el-button type="text" class="addOne" @click="add">dianwo</el-button>
            </div>-->
            


            <!--<el-form-item label="商品">
                <el-select v-model="ruleForm.product" placeholder="请选择出版社">
                    <el-option label="中国妇女出版社" value="中国妇女出版社"></el-option>
                    <el-option label="作家出版社" value="作家出版社"></el-option>
                    <el-option label="文学出版社" value="文学出版社"></el-option>
                    <el-option label="新世界出版社" value="新世界出版社"></el-option>
                    <el-option label="天津人民出版社" value="天津人民出版社"></el-option>
                    <el-option label="人民邮电出版社" value="人民邮电出版社"></el-option>
                    <el-option label="机械工业出版社" value="机械工业出版社"></el-option>
                    <el-option label="广东人民出版社" value="广东人民出版社"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="图片">
                <el-up.load
                        list-type="picture-card"
                        class="avatar-uploader"
                        action="http://localhost:8081/common/upload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="this.ruleForm.picture" :src="`http://localhost:8081/${this.ruleForm.picture}`" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-up.load>
            </el-form-item>-->
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button type="primary" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import axios from 'axios'
    import {HOST} from '../../common/js/config'
    import ElFormItem from "element-ui/packages/form/src/form-item";
    //import ElUpload from "element-ui/packages/upload/src/index";
    export default {
        components: {
            ElFormItem
        },
        data() {
            return {
                ruleForm: {
                    name: '',
                    price: '',
                    primaryPrice:'',
                    stockQuantity:'',
                    combinationItem:[],
                },
                product1:[],
                product2:[],
                product3:[],
                combinationItem1:{
                    productId:'',
                    price:'',
                    num:'',
                },
                combinationItem2:{
                    productId:'',
                    price:'',
                    num:''
                },
                combinationItem3:{
                    productId:'',
                    price:'',
                    num:''
                },
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
                },
                productOpts:[],
               
            };
        },
        created(){
            this.getProductOpts();
        },
        methods: {
            getProductOpts(){
                let url = `${HOST}/product/selectAll`;
                axios.get(url).then((res)=>{
                    this.productOpts = res.data;
                    //console.log(this.productOpts)
                });
            },
            getProduct1(event){
                console.log("karry")
                
                //this.ruleForm.combinationItem1.id = event.id;
                let url = `${HOST}/product/selectById/${event.id}`
                axios.post(url, event.id).then((res)=>{
                    //this.combinationItem1=res.data;
                    //this.combinationItem1.price=res.data.price;
                    //this.combinationItem1.productId=res.data.id;
                    this.product1=res.data
                    this.ruleForm.stockQuantity=res.data.stockQuantity;
                })
                
            },
            getProduct2(event){
                console.log("karry")
                console.log(event);
                let url = `${HOST}/product/selectById/${event.id}`
                axios.post(url, event.id).then((res)=>{
                    //this.combinationItem2.price=res.data.price
                    //this.combinationItem2.productId=res.data.id;
                    this.product2=res.data;
                    if(this.ruleForm.stockQuantity>=res.data.stockQuantity){
                        this.ruleForm.stockQuantity=res.data.stockQuantity;
                    }
                })
            },
            getProduct3(event){
                console.log("karry")
                console.log(event);
                let url = `${HOST}/product/selectById/${event.id}`
                axios.post(url, event.id).then((res)=>{
                    //this.combinationItem3.price=res.data.price;
                    //this.combinationItem3.productId=res.data.id;
                    this.product3=res.data;
                    if(this.ruleForm.stockQuantity>=res.data.stockQuantity){
                        this.ruleForm.stockQuantity=res.data.stockQuantity;
                    }
                })
            },
            getPrimaryPrice(){
                console.log("caclulate")
                this.ruleForm.primaryPrice=this.product1.price*this.combinationItem1.num
                                          +this.product2.price*this.combinationItem2.num
                console.log(this.combinationItem3)
                console.log("ceshi")
                if(this.combinationItem3.num!=""){
                    this.ruleForm.primaryPrice+=this.product3.price*this.combinationItem3.num
                }                        
            },
            submitForm(formName) {
                //if(!this.combinationItem1){
                //    this.ruleForm.combinationItems.push(this.combinationItem1)
                //}
                this.combinationItem1.productId=this.product1.id;
                this.combinationItem1.price=this.product1.price;
                this.combinationItem2.productId=this.product2.id;
                this.combinationItem2.price=this.product2.price;
                this.ruleForm.combinationItem.push(this.combinationItem1)
                console.log("1")
                console.log(this.combinationItem1)
                this.ruleForm.combinationItem.push(this.combinationItem2)
                console.log(this.ruleForm.combinationItem)
                console.log("test")
                console.log(this.ruleForm);
                if(!this.combinationItem3){
                    this.ruleForm.combinationItem.push(this.combinationItem3)
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //提交
                        let url = `${HOST}/combination/add`;
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
            cancel(){
                this.$router.push('/adminCombination');
            },

            //文件上传成功时的构造函数
            handleAvatarSuccess(res) {
                console.log(res);
                //把上传成功的文件名赋值给ruleForm对象
                this.ruleForm.picture = res
            },
            /**
             * 上传文件之前的构造函数，参数为上传的文件
             * 若返回false或者返回Promise且被reject，则停止上传
             * @param file
             * @returns {boolean}
             */
            beforeAvatarUpload(file) {
                const isJPG = file.type === ('image/jpeg' || 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传图片只能是 JPG 或 PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>

<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 146px;
        height: 146px;
        line-height: 146px;
        text-align: center;
    }
    .avatar {
        width: 146px;
        height: 146px;
        display: block;
    }
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
    .addOne{
        margin-left: 100px;
        margin-bottom: 20px;
    }
</style>