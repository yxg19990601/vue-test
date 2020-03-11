<template>
  <div>
    <el-row type="flex" class="row-bg" justify="center" :gutter="15" >
      <el-col :span="6" align = "center">
        <el-table class="table-1"
          :data="tableData"
          show-summary
          sum-text="合计"
          border
          @cell-click="cellClick"
        >
          <el-table-column
            prop="date"
            label="月份"
            header-align="center" align="center">

            <template slot-scope="scope">
              {{  handleValue(scope.row.m) }}月
            </template>
          </el-table-column>
          <el-table-column label="基准期平期耗电量（kWh）"   prop="gas" header-align="center" align="center">
            <template slot="header" slot-scope="scope">
              合同基准耗气量<br>（m³）
            </template>


          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="fee"
            label="基准期谷期耗电量（kWh）"  >
            <template slot="header" slot-scope="scope">
              合同基准耗气费用<br>（元）
            </template>
          </el-table-column>


        </el-table>
      </el-col>
      <el-col :span="4" align="center" >
        <el-table
          :data="tableData"
          show-summary
          :summary-method="getSummaries"
          border
        >
          <el-table-column
            prop="value2923"
            label=""
            header-align="center" align="center">
            <template slot="header" slot-scope="scope">
              核定期耗气量<br>（m³）
            </template>

            <template slot-scope="scope">
              {{  handleValue(scope.row.value2923) }}
            </template>
          </el-table-column>

          <el-table-column
            prop="value2923fee"
            label=""
            header-align="center" align="center">
            <template slot="header" slot-scope="scope">
              核定期燃气费<br>（元）
            </template>
            <template slot-scope="scope">
              {{  handleValue(scope.row.value2923fee) }}
            </template>

          </el-table-column>



        </el-table>
      </el-col>


      <el-col :span="3" align="center" >
        <el-tooltip class="item" effect="dark" content="点击查看公式2" placement="top-start"><div>
          <el-table
            :data="tableData"
            show-summary
              @header-click="headerClick"
            :summary-method="getSummaries"
            border
          >
            <el-table-column

              prop="formula2"
              label="（kWh）"
              header-align="center" align="center">
              <template slot="header" slot-scope="scope">
                <span style="color: #000000"><i class="el-icon-s-flag"></i><span class="icon-name"></span></span>新增供暖计量蒸汽换算燃气量<br>（m³）
              </template>
              <template slot-scope="scope">
                {{  handleValue(scope.row.formula2) }}
              </template>
            </el-table-column>
          </el-table>
        </div></el-tooltip>
      </el-col>
      <el-col :span="3" align="center"  >

        <el-tooltip class="item" effect="dark" content="点击查看公式3" placement="top-start"><div>
          <el-table
            @header-click="dialogTableVisible2 = true"
            :data="tableData"
            show-summary
            :summary-method="getSummaries"
            border
          >
            <el-table-column
              prop="formula3"
              label="（kWh）"
              header-align="center" align="center">
              <template slot="header" slot-scope="scope">
                <span style="color: #000000"><i class="el-icon-s-flag"></i><span class="icon-name"></span></span>未开放区域生活热水用气量<br>（kWh）
              </template>
              <template slot-scope="scope">
                {{  handleValue(scope.row.formula3) }}
              </template>
            </el-table-column>
        </el-table>
        </div></el-tooltip>
      </el-col>



      <el-col :span="2" align="center" >
          <el-table
            :data="tableData"
            show-summary
            :summary-method="getSummaries"
            border
          >
            <el-table-column
              prop="value2922"
              label="（kWh）"
              header-align="center" align="center">
              <template slot="header" slot-scope="scope">
                增减设备用气量
                <br>（m³）
              </template>

              <template slot-scope="scope">
                {{  handleValue(scope.row.value2922) }}
              </template>
            </el-table-column>
          </el-table>

      </el-col>

      <el-col :span="2" align="center" >
        <el-table
          border
          :data="tableData"
          show-summary
          :summary-method="getSummaries"
        >
          <el-table-column
            prop="date"
            label="（kWh）"
            header-align="center" align="center"

          >
            <template slot="header" slot-scope="scope">
              设备增减运行时长用气量（m³）
            </template>

            <template slot-scope="scope">
              {{  handleValue(scope.row.value2921) }}
            </template>
          </el-table-column>

        </el-table>
      </el-col>

      <el-col :span="4" align="center" >
        <el-table
          :data="tableData"
          show-summary
          :summary-method="getSummaries"
          border
        >
          <el-table-column
            prop="formula1"
            label=""
            header-align="center" align="center">
            <template slot="header" slot-scope="scope">
              月节气量<br>
              （m³）
            </template>
            <template slot-scope="scope">
              {{  handleValue(scope.row.formula1) }}
            </template>
          </el-table-column>

          <el-table-column
            prop="formula1fee"
            label=""
            header-align="center" align="center">
            <template slot="header" slot-scope="scope">
              月节气费<br>（元）
            </template>
            <template slot-scope="scope">
              {{  handleValue(scope.row.formula1fee) }}
            </template>
          </el-table-column>
        </el-table>
      </el-col>

    </el-row>

    <el-dialog top="5vh" width="70%" title="新增供暖计量蒸汽换算燃气量" :visible.sync="dialogTableVisible">
      <el-row type="flex" class="row-bg" justify="center" :gutter="15" >
        <el-col :span="20" align = "center">
          <el-table
            :data="tableData"
            show-summary
            sum-text="总计"
            border
          >
            <el-table-column
              prop="m"
              label="月份"
              header-align="center" align="center">
              <template slot-scope="scope">
                {{  handleValue(scope.row.m) }}月
              </template>
            </el-table-column>
            <el-table-column

              prop="value2920"
              label="（kWh）"
              header-align="center" align="center">
              <template slot="header" slot-scope="scope">
                  蒸汽表1<br>（m³）
              </template>
              <template slot-scope="scope">
                {{  handleValue(scope.row.value2920) }}
              </template>
            </el-table-column>

            <el-table-column
              align="center"
              header-align="center"
              prop="value2919"
              label="（kWh）"  >
              <template slot="header" slot-scope="scope">
                蒸汽表2<br>（m³）
              </template>
              <template slot-scope="scope">
                {{  handleValue(scope.row.value2919) }}
              </template>
            </el-table-column>

            <el-table-column
              header-align="center"
              prop="value2918"
              label="（kWh）"
              align="center"
            >
              <template slot="header" slot-scope="scope">
                蒸汽表3<br>（m³））
              </template>
              <template slot-scope="scope">
                {{  handleValue(scope.row.value2918) }}
              </template>
            </el-table-column>

            <el-table-column
              header-align="center"
              prop="value2917"
              label="（m2）"
              align="center"
            >
              <template slot="header" slot-scope="scope">
                蒸汽表4<br>（m³）
              </template>
              <template slot-scope="scope">
                {{  handleValue(scope.row.value2917) }}
              </template>
            </el-table-column>

            <el-table-column
              header-align="center"
              prop="value2916"
              label="（m2）"
              align="center"
            >
              <template slot="header" slot-scope="scope">
                天然气能耗总量<br>
                （m³）
              </template>
              <template slot-scope="scope">
                {{  handleValue(scope.row.value2916) }}
              </template>
            </el-table-column>
            <el-table-column
              header-align="center"
              prop="value2915"
              label="（m2）"
              align="center"
            >
              <template slot="header" slot-scope="scope">
                蒸汽生产量<br>
                （m³）
              </template>
              <template slot-scope="scope">
                {{  handleValue(scope.row.value2915) }}
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
              prop="formula2"
              label="（kWh）"
              header-align="center" align="center">
              <template slot="header" slot-scope="scope">
                新增供暖计量蒸汽换算燃气量（m³）
              </template>
              <template slot-scope="scope">
                {{  handleValue(scope.row.formula2) }}
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <br>
      <br>
      <br>
      <br>
      <code>公式2： 新增供暖计量蒸汽换算燃气量（m3）= （蒸汽表1+蒸汽表2+蒸汽表3+蒸汽表4）（m3）×天然气能耗总量（m3）÷蒸汽生产量（m3）</code>
    </el-dialog>



    <el-dialog top="5vh" width="70%" title="未开放区域生活热水用气量" :visible.sync="dialogTableVisible2">
      <el-row type="flex" class="row-bg" justify="center" :gutter="15" >
        <el-col :span="20" align = "center">
          <el-table
            :data="tableData"
            show-summary
            :summary-method="getSummariesSum"
            sum-text="总计"
            border
          >
            <el-table-column
              prop="m"
              label="月份"
              header-align="center" align="center">
              <template slot-scope="scope">
                {{  handleValue(scope.row.m) }}月
              </template>
            </el-table-column>
            <el-table-column
              prop="value2914"
              label="（kWh）"
              header-align="center" align="center">
              <template slot="header" slot-scope="scope">
                热水系统改造区域热水燃气能耗（m³）
              </template>

              <template slot-scope="scope">
                {{  handleValue(scope.row.value2914) }}
              </template>

            </el-table-column>

            <el-table-column
              align="center"
              header-align="center"
              prop="alreay"
              label="（kWh）"  >
              <template slot="header" slot-scope="scope">
                改造区域已开放总面（m²）
              </template>
            </el-table-column>

            <el-table-column
              header-align="center"
              prop="notopen"
              label="（kWh）"
              align="center"
            >
              <template slot="header" slot-scope="scope">
                未开放区域面积（m²）
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
              prop="formula3"
              label="（kWh）"
              header-align="center" align="center">
              <template slot="header" slot-scope="scope">
                未开放区域生活热水用气量（m³）
              </template>
              <template slot-scope="scope">
                {{  handleValue(scope.row.formula3) }}
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>



      <br>
      <br>
      <br>
      <br>
      <code>公式3：未开放区域生活热水用气量（m3）= 热水系统改造区域热水燃气能耗（m3）÷改造区域已开放总面积（m2）×未开放区域面积（m2）</code>
    </el-dialog>
    <br>
    <br>
    <br>
    <el-dialog top="5vh" width="85%" :title="dia_title" :visible.sync="dialogTableVisible3">
      <el-row type="flex" class="row-bg" justify="center" :gutter="15" >
        <el-col :span="6" align = "center"  >
          <el-card shadow="never">
            <div slot="header" style="font-size: 16px;font-weight: 700;color: #606266">
              <span>核定能耗占基准期比例</span>
            </div>
            <p style="text-align: left;margin: 10px 20px 5px;font-size: 16px;font-weight: 700;color: #606266">月节气量：<span>{{monthSave}}kWh</span></p>
            <el-divider class="hr"></el-divider>
            <div id="pie" :style="{width: '100%', height: '242px'}"></div>
          </el-card>

        </el-col>
        <el-col :span="18" align = "center" style="padding: 0px 50px">
          <el-calendar my-data-v-cal1 style="border: 1px solid rgb(235, 238, 245);" v-model="curentDate">
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
    <code>公式1：节气量=基准期能耗(m3)+新增供暖计量蒸汽换算燃气量(m3)+未开放区域生活热水用气量(m3)+增减设备用气量（m3）+设备增减运行时长用气量（m3）-核定期能耗（手抄天然气表之和）(m3)</code>
  </div>
</template>
<script>
    export default {
        props: ['selectDate'],
        name: "steamSave",

        mounted() {
            this.$axios
                .get('/ems/servlet/InputDataAction/getSteamSaveData?year='+this.selectDate)
                .then(successResponse => {
                    this.tableData = successResponse.data;
                })
                .catch(failResponse => {
                })
        },
        watch:{
            selectDate(val){
                this.$axios
                    .get('/ems/servlet/InputDataAction/getSteamSaveData?year='+this.selectDate)
                    .then(successResponse => {
                        this.tableData = successResponse.data;
                    })
                    .catch(failResponse => {
                    })
            }

        },
        methods:{
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
                    .get('/ems/servlet/chart/reportComputeBytreeId?treeId=2916&dateType=2&level=1&date='+date)
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
                                {value:this.gasPro, name:''},
                                {value:this.realPro, name:'月基准值：'+this.gasMonth+'m² '}
                            ]
                        }
                    ]
                };
                this.pie.setOption(option,true);
            },
            cellClick(row, column, cell, event) {
                if (cell.cellIndex === 0) {
                    this.dialogTableVisible3 = true;
                    let currentMonth = row.m;
                    if (row.m < 9) {
                         currentMonth = '0'+row.m;
                    }
                    this.month = currentMonth;
                    this.curentDate = this.selectDate+'-'+currentMonth+'-'+'01';
                    this.dia_title = this.selectDate+'年'+currentMonth+'月数据';
                    this.xzz_title = this.selectDate+'年'+currentMonth+" 修正值";

                    // 处理弹框左下角数据
                    let currentMonthData = this.tableData[this.month-1];

                    let value2916 = currentMonthData.value2916; //天然气总能耗
                    let gas = currentMonthData.gas; //天然气基准
                    let formula2 = currentMonthData.formula2;//新增供暖计量蒸汽换算燃气量
                    let formula3 = currentMonthData.formula3; //未开放区域生活热水用气量
                    let value2922 = currentMonthData.value2922;//增减设备用气量
                    let value2921 = currentMonthData.value2921;//设备增减运行时长用气量
                    let formula1 = currentMonthData.formula1; // 节气量
                    this.gasMonth = gas;
                    this.monthSave = formula1;
                    // 计算基准比例
                    let real = (value2916/gas*100).toFixed(2);
                    if (real >= 100) {
                        this.gasPro = 0;
                    } else {
                        this.gasPro = 100 -real;
                    }
                    this.realPro = real;
                    //修正值
                    this.br_data[0].data = formula2+" m²";
                    this.br_data[1].data = formula3+" m²";
                    this.br_data[2].data = value2922+" m²";
                    this.br_data[3].data = value2921+" m²";
                    this.$nextTick(() =>  {this.loadCharts(this.selectDate+'-'+currentMonth+'-01 00:00:00');this.loadPip()})
                }

            },
            getSummariesSum(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if(index === 0) {
                        sums[index] = '合计';
                        return ;
                    }

                    if (column.property.indexOf("notopen") !== -1 || column.property.indexOf("alreay") !== -1) {
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
            },
            handleValue(value) {
                if(value==0 || value) {
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
            }
        },
        data() {
            return {
                gasPro:15,
                realPro:85,
                gasMonth:0,
                dia_title: '',
                curentDate:'',
                xzz_title: '',
                monthSave:'--',
                monthdata:[],
                month:'',
                dialogTableVisible3:  false,
                dialogTableVisible2:  false,
                dialogTableVisible : false,
                br_data:[{
                    name: '新增供暖计量蒸汽换算燃气量',
                    data: '123452 m²',
                }, {
                    name: '未开放区域生活热水用气量',
                    data: '123452 m²',
                }, {
                    name: '增减设备用气量',
                    data: '123452 m²'
                }, {
                    name: '增减运行时长用气量',
                    data: '123452 m²'
                }],
                tableData: [],
            }
        }
    }
</script>

