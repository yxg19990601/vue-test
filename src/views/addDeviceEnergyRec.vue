<template>
  <el-card shadow="always" >
    <div slot="header" >
      <span>人工录入数据</span>
    </div>
  <el-container style="margin: 10px;padding: 10px;">


    <el-aside width="800px" style="padding: 20px;">



      <el-calendar style="border:1px solid #EBEEF5" v-model="dataForm.colDate">
        <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
        <template
          slot="dateCell"
          slot-scope="{date, data}">
          {{data.day.split('-')[2]}}
          <br><br>
          <i  v-if="1 == 1" class="el-icon-success" style="color: #00a854"></i>
          <i class="el-icon-error" style="color: #ff4679"></i>
        </template>

      </el-calendar>
    </el-aside>


    <el-main >

      <el-form :model="dataForm" label-width="80px">


          <el-row :gutter="20" style="margin: 20px 5px">
            <el-col :span="4" :offset="4" >
              <div class="grid-content bg-purple">
                <span style="line-height: 40px;float: left;color: #606266;">采集点名：</span>
              </div>
            </el-col>
            <el-col :span="4"  >
              <div class="grid-content bg-purple">
                <el-select @change="showUrl" v-model="dataForm.colSettingId" filterable :filter-method="dataFilter"  placeholder="请选择采集点">
                  <span style="font-size: 14px;margin-left: 5px;color: #606266;">采集点名称</span>
                  <span style="float: right; color: #6aa62d; font-size: 13px;margin-right: 5px">采集点ID</span>
                  <hr>
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label+'    >    '+item.id"
                    :value="item.id"
                  >
                    <span style="float: left">{{ item.label }}</span>
                    <span style="float: right; color: #6aa62d; font-size: 13px">{{ item.id }}</span>
                  </el-option>
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
                <el-input v-model="dataForm.realValue" style="width: 220px"></el-input>
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
                    type="datetime"
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
              msg:"你好啊",
              copy:{},

              options: [{
                  value: '456',
                  label: '黄金糕',
                  id : "456"
              }, {
                  value: '457',
                  label: '双皮奶',
                  id : "457"
              }, {
                  value: '458',
                  label: '蚵仔煎',
                  id : "458"
              }, {
                  value: '459',
                  label: '龙须面',
                  id : "459"
              }, {
                  value: '选项5',
                  label: '北京烤鸭',
                  id : "460"
              }],
              storeId:0,
              dataForm:{
                  colSettingId:"", //采集点ID
                  realValue:"", //表读数
                  colDate: new Date() //采集时间
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

            showUrl() {


            },dataFilter(searchData){
                //对绑定数据赋值
                this.options = this.copy.filter((item) => {
                    if((""+item.id).indexOf(searchData) !== -1 || item.label.indexOf(searchData) !== -1) {
                        return true;
                    }
                })
                return false;
            }
        }
    }
</script>

<style scoped>

</style>
