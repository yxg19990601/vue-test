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

      <el-dialog top="5vh" width="80%" title="天数据" :visible.sync="dialogTableVisible2">
        <el-row type="flex" class="row-bg" justify="center" :gutter="15" >
          <el-col :span="6" align = "center">
            左上
          </el-col>
          <el-col :span="18" align = "center">
            右上
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="center" :gutter="15" >
          <el-col :span="6" align = "center">
            左下
          </el-col>
          <el-col :span="18" align = "center">
            <div id="myChart"  class="echartBox" :style="{width: '100%', height: '300px'}"></div>
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
            }
            this.$axios
                .get('/ems/servlet/InputDataAction/getElectricSaveData?year='+this.selectDate)
                .then(successResponse => {
                    this.tableData = successResponse.data;
                })
                .catch(failResponse => {
                })




        },
        methods :{

            // 加载图标
            loadCharts(date) {
                this.myChart = this.$echarts.init(document.getElementById('myChart'))
                this.$axios
                    .get('/ems/servlet/chart/reportComputeBytreeId?treeId=2889&dateType=2&level=1&date='+date)
                    .then(successResponse => {
                        let data = successResponse.data;
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
            cellClick(row, column, cell, event) {

                if (cell.cellIndex === 0) {
                    this.dialogTableVisible2 = true;
                    let currentMonth = row.m;
                    if (row.m < 9) {
                        currentMonth = '0'+row.m;
                    }
                    this.$nextTick(() =>  this.loadCharts('2019-'+currentMonth+'-01 00:00:00'))

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
                myCharta : {},
                dialogTableVisible : false,
                dialogTableVisible2: false,
                tableData:[],
            }
        },
    }



</script>

<style>
  .table-1 td:nth-child(1)  {
    cursor:pointer;
  }
</style>


