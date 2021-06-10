<template>
    <div>
        <Header/>
        <div class="title">套餐</div>
        <el-table
                v-loading="loading"
                :data="pageInfo.list"
                border
                style="width:47.3%;margin-top: 20px;margin-left: 10px;margin-bottom: 40px">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <CombinationItem :id="props.row.id"/>
                </template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="套餐名称"
                    width="220">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="套餐价格"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="primaryPrice"
                    label="套餐原价"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="grade"
                    label="评分"
                    width="200">
            </el-table-column>

        </el-table>

        <div class="title">最受欢迎</div>
        <el-table
                v-loading="loading"
                :data="rankByGrade"
                border
                style="width:47.3%;margin-top: 20px;margin-left: 10px">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <CombinationItem :id="props.row.id"/>
                </template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="套餐名称"
                    width="220">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="套餐价格"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="primaryPrice"
                    label="套餐原价"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="saleQuantity"
                    label="销售量"
                    width="200">
            </el-table-column>
        </el-table>


        <div class="title">最受好评</div>
        <el-table
                v-loading="loading"
                :data="rankByGrade"
                border
                style="width:47.3%;margin-top: 20px;margin-left: 10px">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <CombinationItem :id="props.row.id"/>
                </template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="套餐名称"
                    width="220">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="套餐价格"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="primaryPrice"
                    label="套餐原价"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="grade"
                    label="评分"
                    width="200">
            </el-table-column>
        </el-table>


        <div class="title">最大优惠</div>
        <el-table
                v-loading="loading"
                :data="rankByDiscount"
                border
                style="width:47.3%;margin-top: 20px;margin-left: 10px">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <CombinationItem :id="props.row.id"/>
                </template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="套餐名称"
                    width="220">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="套餐价格"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="primaryPrice"
                    label="套餐原价"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="grade"
                    label="评分"
                    width="200">
            </el-table-column>
        </el-table>


        <span v-if="customer.username">
            <div class="title">猜你喜欢</div>
            <el-table
                    v-loading="loading"
                    :data="mayBeLike"
                    border
                    style="width:47.3%;margin-top: 20px;margin-left: 10px;margin-bottom: 20px">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <CombinationItem :id="props.row.id"/>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="套餐名称"
                    width="220">
                </el-table-column>
                <el-table-column
                    prop="price"
                    label="套餐价格"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="primaryPrice"
                    label="套餐原价"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="grade"
                    label="评分"
                    width="200">
                </el-table-column>
            </el-table>
        </span>


    </div>
</template>

<script>
    import Header from '../header/Header'
    import CombinationItem from '../combination/CombinationItem'
    import {mapGetters} from 'vuex'
    import {HOST} from '../../common/js/config'
    import axios from 'axios'

    export default{
        data(){
            return {
                pageInfo: [],
                rankByGrade: [],
                rankBySaleQuantity:[],
                rankByDiscount: [],
                mayBeLike: [],
                currPage: 1,
                combinationId:1,
                loading: false
            }
        },
        components:{
            Header,
            CombinationItem
        },
        created(){
            this.getData()
        },
        methods:{
            getData(){
                this.loading=true;
                let url1=`${HOST}/combination/selectAll/${this.currPage}`;
                axios.post(url1,this.customer).then((res)=>{
                    this.pageInfo = res.data;
                    this.loading=false;
                });
                let url2=`${HOST}/combination/rankByGrade`;
                axios.get(url2).then((res)=>{
                    this.rankByGrade=res.data;
                    this.loading=false;
                });
                let url3=`${HOST}/combination/rankByDiscount`;
                axios.get(url3).then((res)=>{
                    this.rankByDiscount=res.data;
                    this.loading=false;
                });
                let url4=`${HOST}/combination/mayBeLike/${this.customer.id}`;
                axios.post(url4,this.customer.id).then((res)=>{
                    this.mayBeLike=res.data;
                    console.log("karry");
                    console.log(this.mayBeLike);
                    console.log("karry");
                    this.loading=false;
                });
                let url5=`${HOST}/combination/rankBySaleQuantity`;
                axios.get(url5).then((res)=>{
                    this.rankBySaleQuantity=res.data;
                    this.loading=false;
                });
            },
        },
        computed:{
            ...mapGetters([
                'customer'
            ]),
            //newList(){
            //    return this.mayBeLike.map(v => v.data())
            //}
        },
    };

</script>

<style scoped>
    .title{
        margin-left: 20px;
        margin-top: 20px;
        font-size: 20px;
    }
</style>