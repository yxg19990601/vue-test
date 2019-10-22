<template>
  <el-card shadow="always" >
    <div slot="header" >
      <span>人工录入数据</span>
    </div>
  <el-container >


    <el-aside width="600px"  style="padding: 20px;">



      <el-calendar  type="" style="border:1px solid #EBEEF5"  v-model="dataForm.colDate">
        <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
        <div
          slot="dateCell"
          slot-scope="{date, data}">
          {{data.day.split('-')[2]}}


          <div style="font-size: 10px;margin-top: 12px"> 99999</div>
<!--          <input v-if="data.isSelected" style="height: 20px;width: 30px"></input>-->
<!--          <input v-focus v-if="data.isSelected ? true:false" size="mini" v-model="dataForm.realValue"></input>-->
          <i v-if="data.isSelected ? clickCalDate(data.day):false"  class="el-icon-success" style="color: #00a854;margin-top: 5px"></i>
          <i  v-if="Math.random() > 0.5" class="el-icon-error" style="color: #ff4679"></i>
        </div>

      </el-calendar>
      <el-dialog title="编辑抄表数" :visible.sync="dialogFormVisible" width="20%" center>
        <el-form :model="dataForm">
          <el-form-item label="读表值" :label-width="formLabelWidth">
            <el-input id="" v-model="dataForm.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </el-aside>


    <el-main >

      <el-form :model="dataForm" label-width="80px">


          <el-row :gutter="20" style="margin: 20px 5px">
            <el-col :span="4" :offset="4" >
              <div class="grid-content bg-purple">
                <span style="line-height: 40px;float: left;color: #606266;">采集点名：</span>
              </div>
            </el-col>
            <el-col :span="8"  >
              <div class="grid-content bg-purple">
                <el-select  v-model="dataForm.colSettingId" filterable :filter-method="dataFilter"  placeholder="请选择采集点">
                  <span style="font-size: 14px;margin-left: 5px;color: #606266;">采集点名称</span>
                  <span style="float: right; color: #6aa62d; font-size: 13px;margin-right: 5px">采集点ID</span>
                  <hr>
                  <el-option-group
                    v-for="group in options"
                    :key="group.label"
                    :label="group.label"
                  >
                    <el-option
                      v-for="item in group.options"
                      :key="item.value"
                      :label="item.label+'    >    '+item.id"
                      :value="item.id"
                    >
                      <span v-bind:class="Math.random() > 0.5 ? 'colsettingname':''" style="float: left">{{ item.label }}</span>
                      <span style="float: right; color: #6aa62d; font-size: 13px">{{ item.id }}</span>
                    </el-option>
                  </el-option-group>
                </el-select>
              </div>
            </el-col>

          </el-row>
          <el-row :gutter="20" style="margin: 20px 5px">
            <el-col :span="4" :offset="4" >
              <div class="grid-content bg-purple">
                <span style="line-height: 40px;float: left;color: #606266">采集点值：</span>
              </div>
            </el-col>
            <el-col :span="4"  >
              <div class="grid-content bg-purple">
                <el-input  ref="inputeRealValue"  v-model="dataForm.realValue" style="width: 220px"></el-input>
              </div>
            </el-col>

          </el-row>
            <el-row :gutter="20" style="margin: 20px 5px">
              <el-col :span="4" :offset="4" >
                <div class="grid-content bg-purple">
                  <span style="line-height: 40px;float: left;color: #606266;">采集时间：</span>
                </div>
              </el-col>
              <el-col :span="4"  >
                <div class="grid-content bg-purple">
                  <el-date-picker
                    v-model="dataForm.colDate"
                    type="date"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </div>
              </el-col>

            </el-row>



          <el-row :gutter="20" style="margin: 20px 5px">
            <el-col :span="8" :offset="4" >
              <div class="grid-content bg-purple">
                <el-button type="primary" round>提交</el-button>
              </div>
            </el-col>
          </el-row>





      </el-form>


    </el-main>
  </el-container>
  </el-card>




</template>

<script>
    import qs from 'Qs'
    export default {
        name: "addDeviceEnergyRec",
        data(){
          return {
              formLabelWidth: '80px',
              dialogFormVisible: false,
              first: true,
              msg:"你好啊",
              copy:{},

              options: [{
                  label: '1号采集器',
                  options:[{value:'987',label:"黄金点",id:"987"},{value:'988',label:"黄金点2",id:"988"}]
              },{
                  label: '2号采集器',
                  options:[{value:'562',label:"变压器1",id:"562"},{value:'564',label:"变压器2",id:"564"}]
              }],
              storeId:0,
              dataForm:{
                  colSettingId:"", //采集点ID
                  realValue:"", //表读数
                  colDate: '', //采集时间
                  name: '',
                  region: '',
                  date1: '',
                  date2: '',
                  delivery: false,
                  type: [],
                  resource: '',
                  desc: ''
              }
          }

        },
        created() {
            if(this.$route.query.storeId){
                 this.storeId =this.$route.query.storeId
            } else {
                this.$message('请在url中配置 sotreId 参数')
            }
            this.copy = Object.assign(this.options);
            /*
            this.$axios
                .post('/ems/getSelect', qs.stringify({
                }))
                .then(successResponse => {
                    debugger
                    if (successResponse.data.code === 200) {
                        this.options=successResponse.data.options;
                        //保留数据源
                        this.copy = Object.assign(successResponse.data.options);
                    }
                })
                .catch(failResponse => {
                })

             */
        },
        methods: {
            focusInput() {

                debugger
            },
            disabledDate(time) {
                /// 不可选天数的设置
                return time.getTime()   > new Date(new Date().toLocaleDateString()).getTime()-24*60*60*1000;  ///  今天的前一天开始不能选择 （比如今天30号，只能选择到29号，30号后面的都不能选择）

            },
            clickCalDate(date){
                if(this.first) {
                    this.first = false
                    return false
                }
                var starttime = new Date(Date.parse(date));

                var endtime = new Date();
                endtime.setDate(endtime.getDate()+1)
                if(starttime > endtime) {
                    debugger
                    return false
                }

               // $(".el-calendar-day input").css('padding',"0px")
                this.$refs.inputeRealValue.focus()

                // this.dialogFormVisible = true;
                return true
            },dataFilter(searchData){
                //对绑定数据赋值
                this.options = JSON.parse(JSON.stringify(this.copy));
                this.options = this.options.filter((item) => {
                    let subOption = item.options.filter((subItem) => {
                        if((""+subItem.id).indexOf(searchData) !== -1 || subItem.label.indexOf(searchData) !== -1) {
                            return true;
                        }
                    })
                    item.options =  subOption
                    if(subOption.length !== 0) {
                        return true;
                    }
                })
                return false;
            }
        }
    }

    $(function () {
        $(".el-calendar-day").height("50px")
        $(".el-calendar-day").css('padding',"0px")
    })
</script>

<style scoped>
.colsettingname{
  color: #ff4679;
}



</style>

