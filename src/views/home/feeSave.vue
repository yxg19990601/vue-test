<<template>
  <div>
    <el-row type="flex" class="row-bg" justify="center" :gutter="50" >
      <el-col :span="6" align = "center">
        <el-table
          :data="tableData"
          show-summary
          border
        >
          <el-table-column
            prop="m"
            label="月份"
            header-align="center" align="center">
            <template slot="header" slot-scope="scope">
              月份
            </template>
          </el-table-column>
          <el-table-column label="基准期平期耗电量（kWh）"   prop="electricity" header-align="center" align="center">
            <template slot="header" slot-scope="scope">
              合同基准月总电费<br>（元）
            </template>

          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="8" align="center" >


        <el-row type="flex" class="row-bg" justify="center" :gutter="0" >


          <el-col :span="12" align="center" >

            <el-tooltip class="item" effect="dark" content="点击查看公式2" placement="top-start"><div>
              <el-table
                :data="tableData"
                show-summary
                :summary-method="getSummaries"
                border
                @header-click="dialogTableVisible = true"
              >
                <el-table-column
                  prop="airSaveFee"
                  label=""
                  header-align="center" align="center">
                  <template slot="header" slot-scope="scope">
                    <span style="color: #000000"><i class="el-icon-s-flag"></i><span class="icon-name"></span></span>核定期空调系统节电费<br>（元）
                  </template>
                  <template slot-scope="scope">
                    {{  handleValue(scope.row.airSaveFee) }}
                  </template>
                </el-table-column>
              </el-table>
            </div></el-tooltip>

          </el-col>
          <el-col :span="12" align="center" >
            <el-tooltip class="item" effect="dark" content="点击查看公式3" placement="top-start"><div>
              <el-table
                :data="tableData"
                show-summary
                :summary-method="getSummaries"
                border
                @header-click="dialogTableVisible2 = true"
              >
                <el-table-column
                  prop="noairSaveFee"
                  label=""
                  header-align="center" align="center">
                  <template slot="header" slot-scope="scope">
                    <span style="color: #000000"><i class="el-icon-s-flag"></i><span class="icon-name"></span></span>核定期其他系统节电费<br>（元）
                  </template>
                  <template slot-scope="scope">
                    {{  handleValue(scope.row.noairSaveFee) }}
                  </template>
                </el-table-column>
              </el-table>
            </div></el-tooltip>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="5" align="center" >
          <el-table
            :data="tableData"
            show-summary
            :summary-method="getSummaries"
            border
          >
            <el-table-column
              prop="fullSaveFee"
              label="（kWh）"
              header-align="center" align="center">
              <template slot="header" slot-scope="scope">
                月节电费（空调+其他）<br>（元）
              </template>
              <template slot-scope="scope">
                {{  handleValue(scope.row.fullSaveFee) }}
              </template>
            </el-table-column>
          </el-table>

      </el-col>

    </el-row>

    <el-dialog top="5vh" width="70%" title="核定期空调系统节电费" :visible.sync="dialogTableVisible">
      <el-row type="flex" class="row-bg" justify="center" :gutter="15" >
        <el-col :span="12" align = "center">
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
              <template slot="header" slot-scope="scope">
                月份
              </template>
              <template slot-scope="scope">
                {{  handleValue(scope.row.m) }}月
              </template>
            </el-table-column>
            <el-table-column
              prop="valley"
              label="（kWh）"
              header-align="center" align="center">
              <template slot="header" slot-scope="scope">
                基准期空调变压器电费账单用谷期电量<br>（kWh）
              </template>
            </el-table-column>

            <el-table-column
              align="center"
              header-align="center"
              prop="pf"
              label="（kWh）"  >
              <template slot="header" slot-scope="scope">
                基准期空调变压器电费账单峰和平期用电量（kWh）
              </template>
            </el-table-column>

          </el-table>
        </el-col>
        <el-col :span="8" align = "center">

          <el-table
            :data="tableData"
            show-summary
            :summary-method="getSummaries"
            border
          >

            <el-table-column
              prop="valleyValue"
              label="（kWh）"
              header-align="center" align="center">
              <template slot="header" slot-scope="scope">
                核定期空调变压器计量谷期用电量<br>（kWh）
              </template>
              <template slot-scope="scope">
                {{  handleValue(scope.row.valleyValue) }}
              </template>
            </el-table-column>
            <el-table-column
              prop="pfValue"
              label="（kWh）"
              header-align="center" align="center">
              <template slot="header" slot-scope="scope">
                核定期空调变压器峰和平期用电量<br>（kWh）
              </template>
              <template slot-scope="scope">
                {{  handleValue(scope.row.pfValue) }}
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
              prop="airSaveFee"
              label="（kWh）"
              header-align="center" align="center">
              <template slot="header" slot-scope="scope">
                核定期空调系统节电费<br>（元）
              </template>
              <template slot-scope="scope">
                {{  handleValue(scope.row.airSaveFee) }}
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <br>
      <br>
      <br>
      <br>
      <code>公式2：核定期空调系统节电费（元）=基准期空调变压器电费账单用谷期电量（kWh）×0.279元/kWh+基准期空调变压器电费账单峰和平期用电量（kWh）×0.717元/kWh-核定期空调变压器计量谷期用电量（kWh）× 0.279元/kWh-核定期空调变压器峰和平期用电量（kWh）×0.717元/kWh</code>
    </el-dialog>



    <el-dialog top="5vh" width="70%" title="核定期其他系统节电费" :visible.sync="dialogTableVisible2">
      <el-row type="flex" class="row-bg" justify="center" :gutter="15" >
        <el-col :span="20" align = "center">
          <el-table
            :data="tableData"
            show-summary
            sum-text="总计"
            border
          >
            <el-table-column
              prop="date"
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
              prop="noair"
              label="（kWh）"
              header-align="center" align="center">
              <template slot="header" slot-scope="scope">
                基准期除空调变压器外其他变压器账单用电量之和（kWh）
              </template>
              <template slot-scope="scope">
                {{  handleValue(scope.row.noair) }}
              </template>
            </el-table-column>

            <el-table-column
              align="center"
              header-align="center"
              prop="value2909"
              label="（kWh）"  >
              <template slot="header" slot-scope="scope">
                核定期除空调变压器外其他变压器用电量之和（kWh）
              </template>
              <template slot-scope="scope">
                {{  handleValue(scope.row.value2909) }}
              </template>
            </el-table-column>

            <el-table-column
              header-align="center"
              prop="value2911"
              label="（kWh）"
              align="center"
            >
              <template slot="header" slot-scope="scope">
                能耗调整量<br>（kWh）
              </template>
              <template slot-scope="scope">
                {{  handleValue(scope.row.value2911) }}
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
              prop="noairSaveFee"
              label="（kWh）"
              header-align="center" align="center">
              <template slot="header" slot-scope="scope">
                核定期其他系统节电费<br>（元）
              </template>
              <template slot-scope="scope">
                {{  handleValue(scope.row.noairSaveFee) }}
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <br>
      <br>
      <br>
      <br>
      <code>公式3：核定期其他系统节电费（元）=（基准期除空调变压器外其他变压器账单用电量之和-核定期除空调变压器外其他变压器用电量之和+能耗调整量）（kWh）× 0.717元/kWh）</code>
    </el-dialog>
    <br>
    <br>
    <br>
    <br>
    <code>公式1：节电费（元）=核定期空调系统节电费（元）+核定期其他系统节电费（元）</code>
  </div>
</template>
<script>

    export default {
        name: "feeSave",
        props: ['selectDate'],
        mounted() {
            this.$axios
                .get('/ems/servlet/InputDataAction/getFeeSaveData?year='+this.selectDate)
                .then(successResponse => {
                    this.tableData = successResponse.data;
                })
                .catch(failResponse => {
                })
        },
        watch:{
            selectDate(val){
                this.$axios
                    .get('/ems/servlet/InputDataAction/getFeeSaveData?year='+this.selectDate)
                    .then(successResponse => {
                        this.tableData = successResponse.data;
                    })
                    .catch(failResponse => {
                    })
            }

        },
        methods : {
            handleValue(value) {
                if (value) {
                    return parseInt(value)
                }
                return '--'
            },
            headerClick(column, event) {
                this.dialogTableVisible = true;
            },
            getSummaries(param) {
                const {columns, data} = param;
                const sums = [];
                columns.forEach((column, index) => {
                    const values = data.map(item => Number(item[column.property]) ? Number(item[column.property]) : 0);
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
                tableData:[],
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

