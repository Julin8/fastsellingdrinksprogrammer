<template>
    <div>
        <Header/>

        <el-table
                v-loading="loading"
                :data="coupons"
                border
                style="width: 60%;margin-bottom: 20px;margin-top:20px;margin-left:30px">
            
            <el-table-column
                    prop="description"
                    label="优惠券描述"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="targetAmount"
                    label="目标价格"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="discountAmount"
                    label="优惠价格"
                    width="150">
            </el-table-column>
            <!--<el-table-column
                    prop="endStart"
                    label="有效期"
                    width="400">
            </el-table-column>-->

            <el-table-column>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleuse(scope.row.id)">去使用</el-button>
                </template>
            </el-table-column>

        </el-table>

        <!--<el-pagination
                background
                :page-size="pageInfo.pageSize"
                :current-page="currPage"
                layout="prev, pager, next"
                :total="pageInfo.total"
                @current-change="handleCurrentChange">
        </el-pagination>-->
    </div>
</template>

<script>
    import Header from '../header/Header'
    import {mapGetters} from 'vuex'
    import {HOST} from '../../common/js/config'
    import axios from 'axios'
    //import {makeSimpleDate} from '../../common/js/dateformat'


    export default {
        components:{
            Header
        },
        data(){
            return{
                coupons:[],
                loading:false
            }
        },
        created(){
            this.getData();
        },
        methods:{
            getData(){
                //console.log("karry")
                this.loading=true;
                let url=`${HOST}/userCoupon/selectByCustomer/${this.customer.id}`;
                axios.post(url,this.customer).then((res)=>{
                    console.log(res.data);
                    //this.pageInfo = res.data;
                    res.data.forEach((item)=>{
                        //console.log(item);
                        let coupon = {};
                        coupon.id = item.couponInfo.id;
                        coupon.description = item.couponInfo.description;
                        coupon.targetAmount = item.couponInfo.targetAmount;
                        coupon.discountAmount = item.couponInfo.discountAmount;
                        let url2=`${HOST}/activity/selectByCouponId/${item.couponInfo.id}`;
                        axios.get(url2).then((res2)=>{
                            //coupon.guaranteeDate=makeSimpleDate(res2.data.startTime)+" 至 "+makeSimpleDate(res2.data.endStart);
                            coupon.endStart=res2.data.endStart
                        });
                        this.coupons.push(coupon);
                    })
                    console.log(this.coupons);
                    this.loading=false;
                })
            },

        },
        computed:{
            ...mapGetters([
                'customer'
            ])
        },
    }
</script>

<style scoped>

</style>