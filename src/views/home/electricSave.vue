<template>
    <div>
      <el-row type="flex" class="row-bg" justify="center" :gutter="15" >
        <el-col :span="8" align = "center">
          <el-table class="table-1"
            :data="tableData"
            show-summary
            sum-text="合计"
            border
            @cell-click="cellClick"
          >
              <el-table-column
                prop="m"
                label="月份"
               header-align="center" align="center">
                <template slot="header" slot-scope="scope">
                  月份
                </template>
                <template slot-scope="scope">
                  {{  handleValue(scope.row.m) }}月
                </template>
              </el-table-column>
            <el-table-column label="基准期平期耗电量（kWh）"   prop="flat" header-align="center" align="center">
              <template slot="header" slot-scope="scope">
                基准期平期耗电量<br>（kWh）
              </template>
              <template slot-scope="scope">
                {{ scope.row.flat }}
              </template>
            </el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              prop="valley"
              label="基准期谷期耗电量（kWh）"  >
              <template slot="header" slot-scope="scope">
                基准期谷期耗电量<br>（kWh）
              </template>
            </el-table-column>

            <el-table-column
              align="center"
              header-align="center"
              prop="be"
              label="基准期月总耗电量（kWh）"  >
              <template slot="header" slot-scope="scope">
                基准期月总耗电量<br>（kWh）
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="7" align="center" >
        <el-table
          :data="tableData"
          show-summary
          :summary-method="getSummaries"
          border
        >
          <el-table-column
            prop="pfValue"
            label=""
            header-align="center" align="center">
            <template slot="header" slot-scope="scope">
              核定期平期耗电量<br>（kWh）
            </template>


            <template slot-scope="scope">
              {{  handleValue(scope.row.pfValue) }}
            </template>
          </el-table-column>

          <el-table-column
            prop="valleyValue"
            label=""
            header-align="center" align="center">
            <template slot="header" slot-scope="scope">
              核定期谷期耗电量<br>（kWh）
            </template>
            <template slot-scope="scope">
              {{  handleValue(scope.row.valleyValue) }}
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            header-align="center"
            prop="value2900"
            label="核定期月总耗电量（kWh）"  >
            <template slot="header" slot-scope="scope">
              核定期月总耗电量<br>（kWh）
            </template>

            <template slot-scope="scope">
              {{  handleValue(scope.row.value2900) }}
            </template>
          </el-table-column>
        </el-table>
      </el-col>


        <el-col :span="2" align="center" >

          <el-table
            :data="tableData"
            show-summary
            :summary-method="getSummaries"
            border
          >
              <el-table-column
                prop="value2895"
                label="（kWh）"
                header-align="center" align="center">
                <template slot="header" slot-scope="scope">
                  增减设备用电量<br>（kWh）
                </template>

                <template slot-scope="scope">
                  {{  handleValue(scope.row.value2895) }}
                </template>
              </el-table-column>
          </el-table>

        </el-col>
        <el-col :span="3" align="center"  >
          <el-table
            :data="tableData"
            show-summary
            :summary-method="getSummaries"
            border
          >
            <el-table-column
              prop="value2896"
              label="（kWh）"
              header-align="center" align="center">
              <template slot="header" slot-scope="scope">
                设备增减运行时长用电量<br>（kWh）
              </template>
              <template slot-scope="scope">
                {{  handleValue(scope.row.value2896) }}
              </template>
            </el-table-column>
          </el-table>
        </el-col>

          <el-col :span="2" align="center" >
            <el-tooltip class="item" effect="dark" content="点击查看公式2" placement="top-start"><div>
              <el-table
                @header-click="headerClick"
                :data="tableData"
                show-summary
                :summary-method="getSummaries"
                border
              >
                <el-table-column
                  prop="noteOpenAirReportValue"
                  label="（kWh）"
                  header-align="center" align="center">
                  <template slot="header" slot-scope="scope">
                    <span style="color: #000000"><i class="el-icon-s-flag"></i><span class="icon-name"></span></span>空调冷量指标用电量<br>（kWh）
                  </template>

                  <template slot-scope="scope">
                    {{  handleValue(scope.row.noteOpenAirReportValue) }}
                  </template>
                </el-table-column>
              </el-table>
         </div></el-tooltip>
        </el-col>

        <el-col :span="2" align="center" >
          <el-table
            border
            :data="tableData"
            show-summary
            :summary-method="getSummaries"
          >
            <el-table-column
              prop="saveEnergyValue"
              label="（kWh）"
              header-align="center" align="center"

            >
              <template slot="header" slot-scope="scope">
                节电量<br>（kWh）
              </template>
              <template slot-scope="scope">
                {{  handleValue(scope.row.saveEnergyValue) }}
              </template>

            </el-table-column>

          </el-table>
        </el-col>

      </el-row>

      <el-dialog top="5vh" width="70%" title="空调冷量指标用电量" :visible.sync="dialogTableVisible">
        <el-row type="flex" class="row-bg" justify="center" :gutter="15" >
          <el-col :span="20" align = "center">
            <el-table
              :data="tableData"
              show-summary
              border
              :summary-method="getSummariesSum"
            >
              <el-table-column
                prop="m"
                label="月份"
               header-align="center" align="center">
                <template slot="header" slot-scope="scope">
                  月份
                </template>
                <template slot-scope="scope">
                  {{  handleValue(scope.row.m) }}月
                </template>
              </el-table-column>
              <el-table-column

                prop="value2899"
                label="（kWh）"
                header-align="center" align="center">
                <template slot="header" slot-scope="scope">
                  已开放空调区域<br>总冷量<br>（kWh）
                </template>

                <template slot-scope="scope">
                  {{  handleValue(scope.row.value2899) }}
                </template>

              </el-table-column>

              <el-table-column
                align="center"
                header-align="center"
                prop="value2898"
                label="（kWh）"  >
                <template slot="header" slot-scope="scope">
                  中央空调总用电量<br>（kWh）
                </template>
                <template slot-scope="scope">
                  {{  handleValue(scope.row.value2898) }}
                </template>
              </el-table-column>

              <el-table-column
                header-align="center"
                prop="value2897"
                label="（kWh）"
                align="center"
              >
                <template slot="header" slot-scope="scope">
                  中央空调总冷量<br>（kWh）
                </template>
                <template slot-scope="scope">
                  {{  handleValue(scope.row.value2897) }}
                </template>

              </el-table-column>

              <el-table-column
                header-align="center"
                prop="openair"
                label="（m2）"
                align="center"
              >
                <template slot="header" slot-scope="scope">
                  已开放空调区域面积<br>（m²）
                </template>
              </el-table-column>

                <el-table-column
                  header-align="center"
                  prop="notopenair"
                  label="（m2）"
                  align="center"
                >
                  <template slot="header" slot-scope="scope">
                    未开放空调区域面积<br>（m²）
                  </template>
                </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="4" align = "center">
            <el-table
              :data="tableData"
              show-summary
              :summary-method="getSummaries"
              border
            >
              <el-table-column
                prop="noteOpenAirReportValue"
                label="（kWh）"
                header-align="center" align="center">
                <template slot="header" slot-scope="scope">
                  空调冷量指标用电量<br>（kWh）

                </template>
                <template slot-scope="scope">
                  {{  handleValue(scope.row.noteOpenAirReportValue) }}
                </template>
              </el-table-column>
            </el-table>
          </el-col>

        </el-row>
        <br>
        <br>
        <br>
        <br>
        <code>公式2：未开放区域中央空调能耗=已开放空调区域总冷量（冷量表）（kWh）× 中央空调总用电量（kWh）÷ 中央空调总冷量（kWh）÷已开放空调区域面积（m2）× 未开放空调区域面积（m2）</code>
      </el-dialog>

      <el-dialog top="5vh" width="85%" :title="dia_title" :visible.sync="dialogTableVisible2">
        <el-row type="flex" class="row-bg" justify="center" :gutter="15" >
          <el-col :span="6" align = "center"  >
            <el-card shadow="never">
              <div slot="header" style="font-size: 16px;font-weight: 700;color: #606266">
                <span>核定能耗占基准期比例</span>
              </div>
              <p style="text-align: left;margin: 10px 20px 5px;font-size: 16px;font-weight: 700;color: #606266">日节能量：<span>1234kWh</span></p>
              <el-divider class="hr"></el-divider>
              <div id="pie" :style="{width: '100%', height: '242px'}"></div>
            </el-card>

          </el-col>
          <el-col :span="18" align = "center" style="padding: 0px 50px">
            <el-calendar style="border: 1px solid rgb(235, 238, 245);" v-model="curentDate">
              <template
                slot="dateCell"
                slot-scope="{date, data}">
                <span class="cell_date">{{data.day.split('-')[2]}}</span>
                <div class="cell_data" style="text-align: right">{{handleCalendarData(data.day)}}</div>
              </template>
            </el-calendar>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="center" :gutter="15" >
          <el-col :span="6" align = "center">
            <el-card class="box-card" style="margin-top: 50px;font-size: 16px;font-weight: 600;color: #606266;" shadow="never">
              <div slot="header" >
                <span>{{xzz_title}}</span>
              </div>

              <el-table

                :show-header="false"
                :data="br_data"
                style="width: 100%;font-weight: 500;font-size: 15px">
                <el-table-column
                  prop="name"
                  align="right"
                >
                </el-table-column>
                <el-table-column
                  prop="data"
                  width="115">
                </el-table-column>

              </el-table>

            </el-card>
          </el-col>
          <el-col :span="18" align = "center">
            <div id="myChart"   :style="{width: '100%', height: '250px'}"></div>
          </el-col>
        </el-row>
      </el-dialog>

      <br>
      <br>
      <br>
      <br>
      <code>1.节电量=基准期能耗（2017年电费单）+空调冷量指标用电量（未开放区域）（kWh）+增减设备用电量（kWh）+设备增减运行时长用电量（kWh））-核定期能耗（变压器之和）</code>

    </div>
</template>

<script>

    export default {
        name: "electricSave",
        props: ['selectDate'],
        mounted() {
            window.onresize = () => {
                this.myChart.resize();
                this.pie.resize();
            }
            this.$axios
                .get('/ems/servlet/InputDataAction/getElectricSaveData?year='+this.selectDate)
                .then(successResponse => {
                    this.tableData = successResponse.data;
                })
                .catch(failResponse => {
                })
        },
        watch: {
            curentDate:{
                handler:'handleLeftData'
            }

        },
        methods :{

            handleLeftData(val) {
              let a = {};
                let date = val;
                // 修改标题
                if (typeof val !== "string") {
                    date = this.$dateFormat("yyyy-MM-dd",val)
                    this.xzz_title = date+" 修正值";
                } else {
                    this.xzz_title = val+" 修正值";
                }
                // 改变环形图数据

                let tableData2 = this.tableData;

                //基准器能耗
                let zjnh = this.tableData[this.month-1].be / new Date(Number(this.selectDate),this.month,0).getDate();
                //未开放空调区面积
                let wkfktqmj = 11;
                // 已开放空调去面积
                let ykfktqmj = 11;
                //中央空调总冷量
                let zyktzll = 11;
                // 中央空调总用电量
                let zyktzydl = 11;
                //以开放空调区域总冷量
                let ykfktqyzll = 11;
                //空调冷量指标用电
                let ktllzbydl = 11;
                //设备增减运行时长用电量
                let sbzjyxscydl = 11;
                //增减设备用电量
                let zjsbydl = 11;
                //核定日能耗量
                let hdrnhl = 11;
                // 核定器能耗
                let hdqnh = 1234;
                // 未开放区域中央空调能耗
               let wkfqyzyktnh = ykfktqyzll*zyktzydl/zyktzll/ykfktqmj*wkfktqmj;
              //未开放区域中央空调能耗=已开放空调区域总冷量（冷量表）（kWh）× 中央空调总用电量（kWh）÷ 中央空调总冷量（kWh）÷已开放空调区域面积（m2）× 未开放空调区域面积（m2）




            },

            handleCalendarData(date) {
                let cum = this.month;
                let calm = date.split('-')[1];
                if (calm == cum) {
                    let result = this.monthdata[(Number(date.split('-')[2])-1).toString()];
                    if (result) {
                        result = Number(result).toFixed(0)
                    }
                    return result;
                }
                return  '';
            },
            // 加载图标
            loadCharts(date) {
                this.myChart = this.$echarts.init(document.getElementById('myChart'))
                this.$axios
                    .get('/ems/servlet/chart/reportComputeBytreeId?treeId=2889&dateType=2&level=1&date='+date)
                    .then(successResponse => {

                        let data = successResponse.data;
                       this.monthdata = data.series[0];
                        let option = {
                            color: ['#65abdb'],
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
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
                                    data : data.axis,
                                    axisTick: {
                                        alignWithLabel: true
                                    }
                                }
                            ],
                            yAxis : [
                                {
                                    type : 'value'
                                }
                            ],
                            series : [
                                {
                                    type:'bar',
                                    barWidth: '60%',
                                    data:data.series[0]
                                }
                            ]
                        };
                        this.myChart.setOption(option,true);
                    })
                    .catch(failResponse => {
                    })
            },
            loadPip() {
                 this.pie = this.$echarts.init(document.getElementById('pie'))
                let option = {
                    color:['#e1f0fa','#65abdb'],
                    tooltip: {
                        trigger: 'item',
                        formatter: "{d}%"
                    },
                    series: [
                        {
                            type:'pie',
                            radius: ['75%', '90%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    position: 'center',
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    color:'#606266'

                                }
                            },
                            labelLine: {
                                normal: {
                                    show: true
                                }
                            },
                            data:[
                                {value:79, name:''},
                                {value:21, name:'日基准值：187493kWh '}
                            ]
                        }
                    ]
                };
                this.pie.setOption(option,true);
            },
            cellClick(row, column, cell, event) {

                if (cell.cellIndex === 0) {
                    this.dialogTableVisible2 = true;
                    let currentMonth = row.m;
                    if (row.m < 9) {
                        currentMonth = '0'+row.m;
                    }
                    this.month = currentMonth;
                    this.curentDate = this.selectDate+'-'+currentMonth+'-'+'01'
                    this.dia_title = this.selectDate+'年'+currentMonth+'月数据';
                    this.$nextTick(() =>  {this.loadCharts(this.selectDate+'-'+currentMonth+'-01 00:00:00');this.loadPip()})
                }

            },

            handleValue(value) {
                if(value) {
                    return  parseInt(value)
                }
                return '--'
            },
            headerClick(column,event) {

                this.dialogTableVisible  = true;

            },
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                        const values = data.map(item => Number(item[column.property])?Number(item[column.property]):0);
                        if (!values.every(value => isNaN(value))) {
                            sums[index] = values.reduce((prev, curr) => {
                                return prev + curr;
                            }, 0);
                        } else {
                            sums[index] = 'N/A';
                        }
                });

                return sums;
            },
            getSummariesSum(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if(index === 0) {
                        sums[index] = '合计'
                        return ;
                    }

                    if (column.property.indexOf("air") !== -1) {
                        sums[index] = '--';
                        return ;
                    }
                    const values = data.map(item => Number(item[column.property])?Number(item[column.property]):0);

                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            return prev + curr;
                        }, 0);
                    } else {
                        sums[index] = 'N/A';
                    }


                });
                return sums;
            }
        },
        data() {
            return {
                xzz_title: '',
                dia_title: '',
                pie:{},
                curentDate:'',
                month:'',
                monthdata:[],
                myCharta : {},
                dialogTableVisible : false,
                dialogTableVisible2: false,
                tableData:[],
                br_data:[{
                    name: '增减设备用电',
                    data: '123452 kWh',
                }, {
                    name: '增减设备运行时长用电',
                    data: '123452 kWh',
                }, {
                    name: '冷量指标用电',
                    data: '123452 kWh'
                }],
            }
        },
    }



</script>

<style>
  .table-1 td:nth-child(1)  {
     cursor:pointer;
  }
  .el-calendar-day{
    height: 43px !important;
  }
  .el-calendar-table:not(.is-range) td.next, .el-calendar-table:not(.is-range) td.prev {
    color: #fff !important;
  }
  .cell_data{
    position: relative;
    top: -8px;
    font-size: 20px;
    font-weight:500;
    margin-right: 10px;
  }
  .el-calendar__body {
    padding: 12px 10px 15px;
  }
  .el-calendar__header{
    display: none;
  }
  .hr{
    margin: 10px 0px;
    height: 2px;
    width:90%
  }
  .el-dialog__body{
    padding: 10px 20px;
  }
  .el-dialog__header{
    padding: 10px 20px 10px;
  }
</style>

