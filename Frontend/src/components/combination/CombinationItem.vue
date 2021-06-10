<template>
    <div>
        <ul>
            <li v-for="o in records" :key="o">
                <span class="name">{{o.productInfo.name}}</span>
                <span><img :src="`${o.productInfo.picture}`" class="img"/></span>
                <span class="price">￥{{o.productInfo.price.toFixed(2)}}</span>
                <span class="num">数量： {{o.num}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import {HOST} from "../../common/js/config";

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
                let url=`${HOST}/combinationItem/list/${this.id}`;
                this.$ajax.get(url).then((res)=>{
                    this.records=res.data;
                    console.log(this.records)
                })
            }
        }
    }
</script>

<style scoped>
    .ul{
        list-style: none;
    }

    .img{
        margin-right: 10px;
        width: 48px;
        height: 48px;
        margin-left: 15px;
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