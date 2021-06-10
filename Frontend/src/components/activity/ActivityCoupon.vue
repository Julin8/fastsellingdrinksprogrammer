<template>
    <div>
        <ul>
            <li v-for="o in records" :key="o">
                <span class="description">{{o.couponInfo.description}}   </span>
                <!--<span class="targetAmount"> {{o.couponInfo.targetAmount}}元</span>
                <span class="discountAmount">{{o.couponInfo.discountAmount}}元</span>-->
                <el-button type="text" size="small" @click="handleDel(o.id)"> 删除</el-button>
            </li>
        </ul>
    </div>
</template>

<script>
    import {HOST} from "../../common/js/config";
    import axios from 'axios'
    export default {
        props:{
            id:{
                type: String
            }
        },
        data(){
            return{
                records:[]
            }
        },
        created(){
            this.getData()
        },
        methods:{
            //根据套餐id查询套餐明细
            getData(){
                let url=`${HOST}/activityCoupon/list/${this.id}`;
                this.$ajax.get(url).then((res)=>{
                    this.records=res.data;
                    console.log(this.records)
                })
            },
            handleDel(id){
                console.log(id);
                this.$confirm('确定删除？','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(()=>{
                    let url = `${HOST}/activityCoupon/del/${id}`;
                    axios.get(url).then(()=>{
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getData()
                    })
                })
            },
        }
    }
</script>

<style scoped>
    .ul{
        list-style: none;
    }

    .price{
        padding-left: 10px;
        color: #666;
        font-weight: bold;
        font-size: 14px;
    }
    .num{
        padding-left: 10px;
        color: #666;
        font-size: 14px;
    }
</style>