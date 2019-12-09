<template>

  <el-container >
    <el-main>
      <el-card class="box-card">
        <div slot="header">
          <span style="font-size: 20px">费率分析</span>
        </div>
        <el-row>
          <el-col :span="24" class="headeroption">
            图标类型：
            <el-select v-model="chartType" placeholder="请选择">
              <el-option
              key="1"
              label="饼图"
              value="1">
            </el-option>
              <el-option
                key="2"
                label="柱状图"
                value="2">
              </el-option>
              <el-option
                key="3"
                label="线性图"
                value="3">
              </el-option>
            </el-select>
            <el-divider direction="vertical" ></el-divider>
            数据类型：<el-radio v-model="dataType" label="1" border style="margin-right: 0px">能耗费用</el-radio>
                           <el-radio v-model="dataType" label="2" border style="margin-left: 0px">能耗值</el-radio>
            <el-divider  direction="vertical"></el-divider>
              时间类型：
              <el-select v-model="dateType"  @change="changeDateType" placeholder="请选择" style="width: 120px">
                <el-option
                  key="1"
                  label="按年"
                  value="1">
                </el-option>
                <el-option
                  key="2"
                  label="按月"
                  value="2">
                </el-option>
                <el-option
                  key="3"
                  label="按时间段"
                  value="3">
                </el-option>
              </el-select>
            <el-divider direction="vertical" ></el-divider>
            选择时间：<el-date-picker
            v-model="startDate"
            :type="startType"
            style="width: 135px"
            placeholder="选择日期"

          >

          </el-date-picker>
            <span v-if="dateType === '3'">至</span>
            <el-date-picker
              v-model="endDate"
              style="width: 135px"
              placeholder="结束时间"
              :type="startType"
              v-if="dateType === '3'"
            >

            </el-date-picker>

            <el-divider direction="vertical" ></el-divider>
            <el-button @click="nodeClick" type="primary" icon="el-icon-search">搜索</el-button>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="24"><el-divider></el-divider></el-col>
        </el-row>

        <el-row>
          <el-container>
            <el-aside width="30%"  style="border-right: 1px solid #bdc7d3;height: 700px;padding-right: 10px">
              <el-input
                placeholder="输入关键字进行过滤"
                v-model="filterText">
              </el-input>

              <el-tree
                class="filter-tree"
                :expand-on-click-node="false"
                :data="data"
                :props="defaultProps"
                :default-expanded-keys="idArr"
                :filter-node-method="filterNode"
                @node-click="nodeClick"
                node-key="id"
                ref="tree">
              </el-tree>
            </el-aside>
            <el-main>
              <div id="myChart"  class="echartBox" :style="{width: '100%', height: '600px'}"></div>
            </el-main>
          </el-container>
        </el-row>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>

    export default {
        name: "energySave",
        methods: {
            dateFtt(fmt,date)
            { //author: meizz
                if ( !date) return null;
                let o = {
                    "M+" : date.getMonth()+1,     //月份
                    "d+" : date.getDate(),     //日
                    "h+" : date.getHours(),     //小时
                    "m+" : date.getMinutes(),     //分
                    "s+" : date.getSeconds(),     //秒
                    "q+" : Math.floor((date.getMonth()+3)/3), //季度
                    "S" : date.getMilliseconds()    //毫秒
                };
                if(/(y+)/.test(fmt))
                    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));

                for(let k in o)
                    if(new RegExp("("+ k +")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                return fmt;
            },changeDateType(dateType) {
                if (dateType === "1") {
                    this.startType ='year';
                } else if (dateType === "2") {
                    this.startType ='month';
                } else if (dateType === "3") {
                    this.startType ='date';
                }
             },
            filterNode(value, data) {
                if (!value) return true;
                return data.text.indexOf(value) !== -1;
            },
            nodeClick() {
                let dateType = this.dateType;
                let startDate = this.dateFtt("yyyy-MM-dd",this.startDate)
                let endDate = this.dateFtt("yyyy-MM-dd",this.endDate)
                let currentKey = this.$refs.tree.getCurrentKey();
                let treeId = this.$route.query.id;
                let unit = "kWh";
                if (currentKey != null) {
                    treeId = currentKey;
                }
                this.$axios
                    .get('/ems/servlet/InputDataAction/getFeeData?dateType='+dateType+'&startDate='+startDate+'&treeId='+treeId+'&endDate='+endDate)
                    .then(successResponse => {
                        let result  = successResponse.data;
                        if (result.code != "200") {
                            this.$message("查询异常!");
                        } else {
                            this.$message("查询成功!");

                            let dataArray = [];
                            if (this.dataType === "1") {
                                unit = "元"
                                dataArray.push(result.data.ff);
                                dataArray.push(result.data.pf);
                                dataArray.push(result.data.gf);
                            } else {
                                dataArray.push(result.data.f);
                                dataArray.push(result.data.g);
                                dataArray.push(result.data.p);
                            }


                            // 清除图标
                            this.myChart.clear();
                            // 处理饼图
                            if(this.chartType == 1) {

                                let legendData = ['峰', '平', '谷'];

                                let seriesData = [{name:'峰',value:dataArray[0]},{name:'平',value:dataArray[1]},{name:'谷',value:dataArray[2]}];
                                let option = {
                                    title : {
                                        text: '能耗费用分析',
                                        x:'center'
                                    },
                                    tooltip : {
                                        trigger: 'item',
                                        formatter: "{b} : {c} ({d}%)"
                                    },
                                    legend: {
                                        type: 'scroll',
                                        orient: 'horizontal',
                                        y:'bottom',
                                        x: 'center',
                                        data: legendData
                                        // selected: chartData.selected
                                    },
                                    series : [
                                        {
                                            name: '姓名',
                                            type: 'pie',
                                            radius : '55%',
                                            center: ['50%', '50%'],
                                            data:seriesData,
                                            label: {
                                                formatter: '{b}：{@[]} '+unit+' ({d}%)'
                                            },
                                            itemStyle: {
                                                emphasis: {
                                                    shadowBlur: 10,
                                                    shadowOffsetX: 0,
                                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                                }
                                            }
                                        }
                                    ]
                                };
                                this.myChart.setOption(option)
                            } else {
                                let chartType = 'bar'
                                if(this.chartType == 3) {
                                    chartType = 'line'
                                }
                                let option = {
                                    color: ['#82bcff'],
                                    tooltip : {
                                        trigger: 'axis',
                                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                        },
                                        formatter:"{b}：{c}"+unit
                                    },
                                    title : {
                                        text: '能耗费用分析',
                                        x:'center'
                                    },
                                    grid: {
                                        left: '3%',
                                        right: '4%',
                                        bottom: '3%',
                                        containLabel: true
                                    },
                                    xAxis : [
                                        {
                                            type : 'category',
                                            data : ['峰', '平', '谷'],
                                            axisTick: {
                                                alignWithLabel: true
                                            }

                                        }
                                    ],
                                    yAxis : [
                                        {
                                            type : 'value',

                                            axisLabel:{
                                                formatter:"{value}"+unit,
                                            }
                                        }
                                    ],
                                    series : [
                                        {

                                            type:chartType,
                                            barWidth: '60%',
                                            data:dataArray,
                                            itemStyle: {
                                                normal: {
                                                    label: {
                                                        formatter:"{c}"+unit,
                                                        show: true, //开启显示
                                                        position: 'top', //在上方显示
                                                        textStyle: { //数值样式
                                                            color: 'black',
                                                            fontSize: 14
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                };
                                this.myChart.setOption(option,true);
                            }

                        }
                    })
                    .catch(failResponse => {
                    })



            }
        },
        mounted() {

            this.myChart = this.$echarts.init(document.getElementById('myChart'))
            window.onresize = () => {
                this.myChart.resize();
            }

            this.nodeClick()

            this.$axios
                .get('/ems/servlet/treeModel/tree?treeId=1')
                .then(successResponse => {

                    successResponse.data.forEach(m => {
                        this.idArr.push(m.id)
                    })
                    this.data = successResponse.data;


                })
                .catch(failResponse => {
                })
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        data() {
            return {

                idArr : [],
                startType:'month',
                myChart : {},
                filterText:'',
                dataType:'1',
                chartType: '1',
                dateType:'2',
                startDate: new Date(),
                endDate:'',
                data: [{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1'
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'text'
                }
            }
        }
    }
</script>

<style scoped>
  .el-row {
    margin-bottom: 10px;

  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 5px 0;
  }
  .el-table{
    font-size: 16px;
  }

  .headeroption .el-divider{
    margin-right: 25px !important;
    margin-left: 25px !important;
  }
</style>

