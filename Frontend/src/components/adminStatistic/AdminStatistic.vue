<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick" class="tab">
            <el-tab-pane label="年" name="year">
                <div class="app" ref="myYearChart"></div>
            </el-tab-pane>

            <el-tab-pane label="月" name="month">
                <div class="app" ref="myMonthChart"></div>
            </el-tab-pane>

            <el-tab-pane label="周" name="week">
                <div class="app" ref="myWeekChart"></div>
            </el-tab-pane>
            <el-tab-pane label="日" name="days">
                <div class="app" ref="myDayChart"></div>
            </el-tab-pane>
        </el-tabs>


    </div>
</template>

<script>
    import {HOST} from "../../common/js/config";
    import echarts from 'echarts'
    import {mapGetters} from 'vuex'

    export default {

        data(){
            return{
                form:{
                    year:0,
                },
                yearForm:{},
                weekForm:{},
                dayForm:{},
                activeName:'',
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
                },
                months:[],
                fee:[],
                years:[],
                yearFees:[],
                weeks:[],
                weekFees:[],
                days:[],
                dayFees:[]
            }
        },
        mounted(){
            let date=new Date();
            this.form.year=date.getFullYear();
            this.form.year=2021;
            //this.drawPie();
            this.drawMonthLine();
            this.drawYearLine();
            this.drawWeekLine();
            this.drawDayLine();
        },
        methods:{
            handleClick(tab, event) {
                console.log(tab, event);
            },
            drawPie(){
                let myChart=echarts.init(this.$refs.myChart);
                this.drawPieChart(myChart);
                myChart.showLoading();
                let url=`${HOST}/order/sumByMonth`;
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
            },

            drawYearLine(){
                //初始化echarts实例，图画在ref的myChart元素中
                let myYearChart=echarts.init(this.$refs.myYearChart);
                this.drawYearChart(myYearChart);
                //显示加载动画
                myYearChart.showLoading();
                let url=`${HOST}/order/sumByYear`;
                //加载数据
                this.$ajax.post(url,this.yearForm).then((res)=>{
                    console.log(res.data);
                    this.records=res.data;
                    //遍历取到数组
                    this.records.forEach(item=>{
                        //把每个月和对应的金额添加到months和fee数组中
                        this.years.push(item.year+'年');
                        this.yearFees.push(item.total)
                    });
                    //关闭加载动画
                    myYearChart.hideLoading();
                    //x，y轴赋值
                    myYearChart.setOption({
                        //x轴数据
                        xAxis:{
                            data:this.years
                        },
                        //y轴数据
                        series:{
                            name:'金额',
                            data:this.yearFees
                        }
                    })
                })
            },
            drawYearChart(myYearChart){
                //制定图表配置项和数据
                var option={
                    //标题
                    title:{
                        text:"年消费表",
                        left:45,
                        broderColor:'orchid',
                        broderWidth:1
                    },
                    color:['orchid'],
                    tooltip:{
                        trigger:'axis',
                        axisPointer:{  //坐标轴指示器，坐标轴触发有效
                            type:'shadow'  //默认为直线，可选为：‘line’|‘shadow’
                        }
                    },
                    grid:{
                        left:'3%',
                        right:'4%',
                        bottom:'3%',
                        containLabel:true
                    },
                    //工具箱
                    toolbox:{
                        show:true,
                        left:350,
                        feature:{
                            saveAsImage:{
                                show:true
                            },
                            dataView:{
                                show:true
                            },
                            restore:{
                                show:true
                            },
                            dataZoom:{
                                show:true
                            },
                            magicType:{
                                type:['bar','line']
                            }
                        }
                    },
                    //图例
                    legend:{
                        data:['金额']
                    },
                    //x轴
                    xAxis:{
                        type:'category',
                        data:[],
                        axisLabel:{
                            interval:0, //全部显示x轴
                            rotate:-30  //-30度倾斜显示
                        },
                        axisTick:{
                            alignWithLabel:true
                        }
                    },
                    //y轴
                    yAxis:{
                        type:'value'
                    },
                    //数据
                    series:{
                        name:'金额',
                        type:'bar', //柱状图
                        data:[]
                    },
                };
                myYearChart.setOption(option);
            },

            drawMonthLine(){
                //初始化echarts实例，图画在ref的myChart元素中
                let myMonthChart=echarts.init(this.$refs.myMonthChart);
                this.drawMonthChart(myMonthChart);
                //显示加载动画
                myMonthChart.showLoading();
                let url=`${HOST}/order/sumByMonth`;
                //加载数据
                this.$ajax.post(url,this.form).then((res)=>{
                    console.log(res.data);
                    this.records=res.data;
                    //遍历取到数组
                    this.records.forEach(item=>{
                        //把每个月和对应的金额添加到months和fee数组中
                        this.months.push(item.month+'月');
                        this.fee.push(item.total)
                    });
                    //关闭加载动画
                    myMonthChart.hideLoading();
                    //x，y轴赋值
                    myMonthChart.setOption({
                        //x轴数据
                        xAxis:{
                            data:this.months
                        },
                        //y轴数据
                        series:{
                            name:'金额',
                            data:this.fee
                        }
                    })
                })
            },
            drawMonthChart(myMonthChart){
                //制定图表配置项和数据
                var option={
                    //标题
                    title:{
                        text:`${this.form.year}年月销售表`,
                        left:45,
                        broderColor:'orchid',
                        broderWidth:1
                    },
                    color:['orchid'],
                    tooltip:{
                        trigger:'axis',
                        axisPointer:{  //坐标轴指示器，坐标轴触发有效
                            type:'shadow'  //默认为直线，可选为：‘line’|‘shadow’
                        }
                    },
                    grid:{
                        left:'3%',
                        right:'4%',
                        bottom:'3%',
                        containLabel:true
                    },
                    //工具箱
                    toolbox:{
                        show:true,
                        left:350,
                        feature:{
                            saveAsImage:{
                                show:true
                            },
                            dataView:{
                                show:true
                            },
                            restore:{
                                show:true
                            },
                            dataZoom:{
                                show:true
                            },
                            magicType:{
                                type:['bar','line']
                            }
                        }
                    },
                    //图例
                    legend:{
                        data:['金额']
                    },
                    //x轴
                    xAxis:{
                        type:'category',
                        data:[],
                        axisLabel:{
                            interval:0, //全部显示x轴
                            rotate:-30  //-30度倾斜显示
                        },
                        axisTick:{
                            alignWithLabel:true
                        }
                    },
                    //y轴
                    yAxis:{
                        type:'value'
                    },
                    //数据
                    series:{
                        name:'金额',
                        type:'bar', //柱状图
                        data:[]
                    },
                };
                myMonthChart.setOption(option);
            },

            drawWeekLine(){
                //初始化echarts实例，图画在ref的myChart元素中
                let myWeekChart=echarts.init(this.$refs.myWeekChart);
                this.drawWeekChart(myWeekChart);
                //显示加载动画
                myWeekChart.showLoading();
                let url=`${HOST}/order/sumByWeek`;
                //加载数据
                this.$ajax.post(url,this.weekForm).then((res)=>{
                    console.log(res.data);
                    this.records=res.data;
                    //遍历取到数组
                    this.records.forEach(item=>{
                        //把每个月和对应的金额添加到months和fee数组中
                        this.weeks.push(item.week+'周');
                        this.weekFees.push(item.total)
                    });
                    //关闭加载动画
                    myWeekChart.hideLoading();
                    //x，y轴赋值
                    myWeekChart.setOption({
                        //x轴数据
                        xAxis:{
                            data:this.weeks
                        },
                        //y轴数据
                        series:{
                            name:'金额',
                            data:this.weekFees
                        }
                    })
                })
            },
            drawWeekChart(myWeekChart){
                //制定图表配置项和数据
                var option={
                    //标题
                    title:{
                        text:"2021年周销售表",
                        left:45,
                        broderColor:'orchid',
                        broderWidth:1
                    },
                    color:['orchid'],
                    tooltip:{
                        trigger:'axis',
                        axisPointer:{  //坐标轴指示器，坐标轴触发有效
                            type:'shadow'  //默认为直线，可选为：‘line’|‘shadow’
                        }
                    },
                    grid:{
                        left:'3%',
                        right:'4%',
                        bottom:'3%',
                        containLabel:true
                    },
                    //工具箱
                    toolbox:{
                        show:true,
                        left:350,
                        feature:{
                            saveAsImage:{
                                show:true
                            },
                            dataView:{
                                show:true
                            },
                            restore:{
                                show:true
                            },
                            dataZoom:{
                                show:true
                            },
                            magicType:{
                                type:['bar','line']
                            }
                        }
                    },
                    //图例
                    legend:{
                        data:['金额']
                    },
                    //x轴
                    xAxis:{
                        type:'category',
                        data:[],
                        axisLabel:{
                            interval:0, //全部显示x轴
                            rotate:-30  //-30度倾斜显示
                        },
                        axisTick:{
                            alignWithLabel:true
                        }
                    },
                    //y轴
                    yAxis:{
                        type:'value'
                    },
                    //数据
                    series:{
                        name:'金额',
                        type:'bar', //柱状图
                        data:[]
                    },
                };
                myWeekChart.setOption(option);
            },

            drawDayLine(){
                //初始化echarts实例，图画在ref的myChart元素中
                let myDayChart=echarts.init(this.$refs.myDayChart);
                this.drawDayChart(myDayChart);
                //显示加载动画
                myDayChart.showLoading();
                let url=`${HOST}/order/sumByDay`;
                //加载数据
                this.$ajax.post(url,this.dayForm).then((res)=>{
                    console.log(res.data);
                    this.records=res.data;
                    //遍历取到数组
                    this.records.forEach(item=>{
                        this.days.push(item.day+'日');
                        this.dayFees.push(item.total)
                    });
                    //关闭加载动画
                    myDayChart.hideLoading();
                    //x，y轴赋值
                    myDayChart.setOption({
                        //x轴数据
                        xAxis:{
                            data:this.days
                        },
                        //y轴数据
                        series:{
                            name:'金额',
                            data:this.dayFees
                        }
                    })
                })
            },
            drawDayChart(myDayChart){
                //制定图表配置项和数据
                var option={
                    //标题
                    title:{
                        text:"日销售表",
                        left:45,
                        broderColor:'orchid',
                        broderWidth:1
                    },
                    color:['orchid'],
                    tooltip:{
                        trigger:'axis',
                        axisPointer:{  //坐标轴指示器，坐标轴触发有效
                            type:'shadow'  //默认为直线，可选为：‘line’|‘shadow’
                        }
                    },
                    grid:{
                        left:'3%',
                        right:'4%',
                        bottom:'3%',
                        containLabel:true
                    },
                    //工具箱
                    toolbox:{
                        show:true,
                        left:350,
                        feature:{
                            saveAsImage:{
                                show:true
                            },
                            dataView:{
                                show:true
                            },
                            restore:{
                                show:true
                            },
                            dataZoom:{
                                show:true
                            },
                            magicType:{
                                type:['bar','line']
                            }
                        }
                    },
                    //图例
                    legend:{
                        data:['金额']
                    },
                    //x轴
                    xAxis:{
                        type:'category',
                        data:[],
                        axisLabel:{
                            interval:0, //全部显示x轴
                            rotate:-30  //-30度倾斜显示
                        },
                        axisTick:{
                            alignWithLabel:true
                        }
                    },
                    //y轴
                    yAxis:{
                        type:'value'
                    },
                    //数据
                    series:{
                        name:'金额',
                        type:'bar', //柱状图
                        data:[]
                    },
                };
                myDayChart.setOption(option);
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
    .tab{
        text-align: center;

    }

    .app{
        margin-top: 10px;
        width: 600px;
        height: 500px;
        position: relative;
        left: 27%;
    }
</style>