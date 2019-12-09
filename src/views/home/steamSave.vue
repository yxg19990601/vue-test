<template>
  <div>
    <el-row type="flex" class="row-bg" justify="center" :gutter="15" >
      <el-col :span="6" align = "center">
        <el-table
          :data="tableData"
          show-summary
          sum-text="合计"
          border
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

        methods:{
            getSummariesSum(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if(index === 0) {
                        sums[index] = '合计'
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
            }
        },
        data() {
            return {
                dialogTableVisible2:  false,
                dialogTableVisible : false,
                tableData: [],
                tableData1: [{
                    date: '1月',
                    name: '0',
                    address: '0'
                }, {
                    date: '2月',
                    name: '2',
                    address: '0'
                }, {
                    date: '3月',
                    name: '1',
                    address: '0'
                }, {
                    date: '4月',
                    name: '0',
                    address: '0'
                }, {
                    date: '5月',
                    name: '0',
                    address: '0'
                }, {
                    date: '6月',
                    name: '0',
                    address: '0'
                }, {
                    date: '7月',
                    name: '0',
                    address: '0'
                }, {
                    date: '8月',
                    name: '0',
                    address: '0'
                }, {
                    date: '9月',
                    name: '0',
                    address: '0'
                }, {
                    date: '10月',
                    name: '0',
                    address: '0'
                }, {
                    date: '11月',
                    name: '0',
                    address: '0'
                },{
                    date: '12月',
                    name: '0',
                    address: '0'
                }],
                tableData2: [ {
                    date: '0',
                    name: '4',
                    address: '5'
                }, {
                    date: '1',
                    name: '0',
                    address: '0'
                }, {
                    date: '2',
                    name: '6',
                    address: '7'
                }, {
                    date: '3',
                    name: '0',
                    address: '0'
                }, {
                    date: '0',
                    name: '0',
                    address: '0'
                }, {
                    date: '0',
                    name: '0',
                    address: '0'
                }, {
                    date: '0',
                    name: '0',
                    address: '0'
                }, {
                    date: '0',
                    name: '0',
                    address: '0'
                }, {
                    date: '0',
                    name: '0',
                    address: '0'
                }, {
                    date: '0',
                    name: '0',
                    address: '0'
                }, {
                    date: '0',
                    name: '0',
                    address: '0'
                }, {
                    date: '0',
                    name: '0',
                    address: '0'
                }]
            }
        }
    }
</script>

