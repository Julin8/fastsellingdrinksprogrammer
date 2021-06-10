<template>
    <div>

        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-button type="primary" icon="el-icon-edit" circle @click="handleAdd"></el-button>
            </el-form-item>
        </el-form>

        <el-table
                v-loading="loading"
                :data="pageInfo.list"
                border
                style="width: 100%;margin-bottom: 20px">
            <el-table-column
                    prop="id"
                    label="优惠券id"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="优惠券描述"
                    width="220">
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

            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleDel(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>

        <el-pagination
                background
                :page-size="pageInfo.pageSize"
                :current-page="currPage"
                layout="prev, pager, next"
                :total="pageInfo.total"
                @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {HOST} from '../../common/js/config'
    import axios from 'axios'
    export default {
        data(){
            return{
                pageInfo:[],
                currPage:1,
                formInline:{
                    name:''
                },
                loading:false
            }
        },
        created(){
            this.getData();
        },
        methods:{
            getData(){
                this.loading=true;
                let url=`${HOST}/coupon/list/${this.currPage}`;
                axios.post(url,this.customer).then((res)=>{
                    this.pageInfo = res.data;
                    this.loading=false;
                })
            },
            handleAdd(){
                this.$router.push("/adminCouponAdd")
            },
            handleCurrentChange(val) {
                //把跳转的页面赋给currPage
                this.currPage = val;
                //重新加载数据
                this.getData()
            },
            handleUpdate(){
                this.$router.push("/adminCombinationUpdate")
            },
            handleDel(id){
                this.$confirm('确定删除？','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(()=>{
                    let url = `${HOST}/coupon/del/${id}`;
                    axios.get(url).then(()=>{
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getData()
                    })
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