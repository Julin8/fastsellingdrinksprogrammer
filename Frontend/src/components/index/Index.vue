<template>
    <div>
        <Header/>
        <el-row>
            <el-col :span="12" :offset="2">
                <div class="app" ref="myChart"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Header from '../header/Header'
    import {HOST} from "../../common/js/config";
    import echarts from 'echarts'
    import {mapGetters} from 'vuex'

    export default {
        components: {
            Header
        },
        data(){
            return{
                form:{
                    customerId:'',
                    year:0
                },
                records:[],
                //饼状图需要显示的数据（1-12月），name：月份 value：值（消费金额），默认是0
                seriesData:[
                    {name:1,value:0},{name:2,value:0},{name:3,value:0},{name:4,value:0},
                    {name:5,value:0}, {name:6,value:0},{name:7,value:0},{name:8,value:0},
                    {name:9,value:0},{name:10,value:0},{name:11,value:0},{name:12,value:0}
                ],
                //饼状图图例
                legendData:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                //饼状图中图例对应的数据是否显示
                selected:{
                    '1':false,
                    '2':false
                }
            }
        },
        mounted(){
            this.form.customerId=this.customer.id;
            let date=new Date();
            this.form.year=date.getFullYear();
            this.form.year=2021;
            this.drawPie()
        },
        methods:{
            drawPie(){
                let myChart=echarts.init(this.$refs.myChart);
                this.drawPieChart(myChart);
                myChart.showLoading();
                console.log(this.form.customerId);
                let url=`${HOST}/order/sumByMonthCustomer`;
                this.$ajax.post(url,this.form).then((res)=>{
                    this.records=res.data;
                    console.log(this.records);
                    myChart.hideLoading();
                    //遍历取到数据
                    this.records.forEach((item)=>{
                        //更新seriesData对应的月份的消费金额
                        this.seriesData.some(i=>{
                            if(i.name===parseInt(item.month)){
                                i.value=item.total
                            }
                        })
                    });
                    this.seriesData.forEach((item)=>{
                        //把seriesData中的name拼接上‘月’
                        item.name=item.name+'月';
                        //为selected json对象添加键值对：如1月：false
                        //如果金额大于0，则需要显示，值为true，否则为false
                        this.selected[item.name] = item.value>0
                    });
                    console.log(this.seriesData);
                    //填充数据
                    myChart.setOption({
                        legend:{ //图例
                            data:this.legendData,
                            selected:this.selected
                        },
                        series:[{ //数据
                            data:this.seriesData
                        }]
                    })
                })
            },
            drawPieChart(myChart){
                let option={
                    title:{
                        text:`${this.form.year}年消费金额统计`,
                        textStyle:{
                            fontSize:18,
                            fontWeight:'bolder',
                            color:'#6495ed'
                        },

                    },
                    tooltip:{
                        trigger:'item',
                        formatter:"{a}<br/>{b}: {c} ({d}%)"
                    },
                    legend:{
                        orient:'vertical',
                        right:10,
                        top:20,
                        bottom:20,
                        /* data: this.data.legendData,
                           selected: this.data.selected*/
                    },
                    series:[
                        {

                            name:'金额',
                            type:'pie',
                            radius:'55%',
                            center:['40%','50%'],
                            itemStyle:{
                                emphasis:{
                                    shadowBlur:10,
                                    shadowOffsetX:0,
                                    shadowColor:'rgba(0,0,0,0.5)'
                                }
                            }
                        }
                    ]
                };
                myChart.setOption(option);
            }
        },
        computed:{
            ...mapGetters([
                'customer'
            ])
        }
    }
</script>

<style scoped>
    .app{
        margin-top: 10px;
        width: 500px;
        height: 500px;
    }
</style>