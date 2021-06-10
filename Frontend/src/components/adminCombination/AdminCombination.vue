<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <!--<el-form-item label="名称">
                <el-input v-model="formInline.name" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleQuery">查询</el-button>
            </el-form-item>-->
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
    import CombinationItem from '../combination/CombinationItem'

    export default {
        components:{
            CombinationItem
        },
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
            this.getData()
        },
        methods:{
            getData(){
                this.loading=true;
                let url=`${HOST}/combination/selectAll/${this.currPage}`;
                axios.post(url,this.currPage).then((res)=>{
                    this.pageInfo = res.data;
                    this.loading=false;
                })
            },
            handleCurrentChange(val) {
                this.currPage = val;
                this.getData()
            },
            handleQuery(){
                this.currPage=1;
                this.getData()
            },
            handleAdd(){
                this.$router.push("/adminCombinationAdd")
            },
            handleUpdate(id){
                this.$router.push(`/adminCombinationUpdate/${id}`)
            },
            handleDel(id){
                this.$confirm('确定删除？','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(()=>{
                    let url = `${HOST}/combination/del/${id}`;
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