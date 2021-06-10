<template>
    <div>
        <Header/>
        <div class="grade">
            <span class="title">套餐评分</span>
            <el-table
                    v-loading="loading"
                    :data="combinationForm"
                    style="width: 42%;margin-top: 20px"
            >
                <el-table-column
                    prop="name"
                    label="套餐名称"
                    width="200">
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="价格"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="grade"
                        label="评分"
                        width="200">
                </el-table-column>
            </el-table>
        </div>
        <div class="grade">
            <span class="title">饮品评分</span>
            <el-table
                    v-loading="loading"
                    :data="productForm"
                    style="width: 42%;margin-top: 20px"
            >
                <el-table-column
                        prop="name"
                        label="套餐名称"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="价格"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="grade"
                        label="评分"
                        width="200">
                </el-table-column>
            </el-table>
        </div>
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
        data(){
            return{
                combinationForm:[],
                productForm:[],
                loading:false
            }
        },
        created(){
            this.getData()
        },
        methods:{
            getData(){
                this.loading=true;
                let url1=`${HOST}/combination/rankByGrade`;
                axios.post(url1,this.form).then((res)=>{
                    this.combinationForm = res.data;
                    console.log(this.combinationForm);
                });
                let url2=`${HOST}/product/rank`;
                axios.post(url2,this.form).then((res)=>{
                    this.productForm = res.data;
                    console.log(this.productForm);
                    this.loading=false;
                })
            }
        },
    }
</script>

<style scoped>
    .grade{
        margin: 30px 30px;
    }
    .title{
        font-size: large;
        margin-left: 30px;
        margin-top: 20px;
    }
</style>