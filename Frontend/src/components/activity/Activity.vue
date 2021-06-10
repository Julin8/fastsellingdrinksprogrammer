<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
                <el-button type="primary" icon="el-icon-edit" circle @click="handleAdd"></el-button>
            </el-form-item>
        </el-form>

        <el-table
                v-loading="loading"
                :data="pageInfo.list"
                border
                style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <!--调用OrderItem组件显示订单明细，传递参数订单id-->
                    <ActivityCoupon :id="props.row.id"/>
                    <el-button type="text" size="small" @click="handleAddCoupon(props.row.id)">添加</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="活动名称"
                    width="220">
            </el-table-column>
            <el-table-column
                    label="开始时间"
                    width="160">
                <template slot-scope="scope">
                    {{scope.row.startTime | convertDate}}
                </template>
            </el-table-column>
            <el-table-column
                    label="结束时间"
                    width="160">
                <template slot-scope="scope">
                    {{scope.row.endStart | convertDate}}
                </template>
            </el-table-column>

            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleUpdate(scope.row.id)">修改</el-button>
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
    import ActivityCoupon from '../activity/ActivityCoupon'
    import {makeSimpleDate} from '../../common/js/dateformat'
    export default {
        components:{
            ActivityCoupon
        },
        data(){
            return{
                pageInfo:{
                    ruleForm:{
                        id:'',
                        name:'',
                        startTime:'',
                        endStart:''
                    }
                },
                currPage:1,
                formInline:{
                    name:''
                },
                form:{
                    id:'',
                    name:'',
                    startTime:'',
                    endStart:''
                },
                loading:false
            }
        },
        created(){
            this.getData()
        },
        methods:{
            getData(){
                this.loading=true;
                let url=`${HOST}/activity/list/${this.currPage}`;
                axios.post(url,this.currPage).then((res)=>{
                    this.pageInfo = res.data;
                    //const T = moment().date(this.pageInfo.ruleForm.startTime).format('YYYY-MM-DD HH:mm:ss');
                    //console.log(T);
                    this.loading=false;
                })
            },
            handleCurrentChange(val) {
                //把跳转的页面赋给currPage
                this.currPage = val;
                //重新加载数据
                this.getData()
            },
            handleAdd(){
                this.$router.push("/activityAdd")
            },
            handleAddCoupon(id){
                this.$router.push(`/activityCouponAdd/${id}`)
            },
            handleUpdate(id){
                this.$router.push(`/activityUpdate/${id}`)
            },
            handleDel(id){
                this.$confirm('确定删除？','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(()=>{
                    let url = `${HOST}/activity/del/${id}`;
                    axios.get(url).then(()=>{
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        console.log("success karry");
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
        filters: {
            convertDate(val){
                return makeSimpleDate(val)
            }
        }
    }
</script>

<style scoped>
</style>