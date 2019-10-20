<template>
  <el-container style="margin: 10px;padding: 10px">


    <el-main style="">

      <el-form :model="dataForm" label-width="80px">
        <el-card shadow="always">
          <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple">

            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="采集点">
                <el-select @change="showUrl" v-model="dataForm.colSettingId" filterable :filter-method="dataFilter"  placeholder="请选择采集点">
                  <span style="font-size: 14px;margin-left: 5px;color: #606266;">采集点名称</span>
                  <span style="float: right; color: #6aa62d; font-size: 13px;margin-right: 5px">采集点ID</span>
                  <hr>
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label+'    >    '+item.id"
                    :value="item.id">
                    <span style="float: left">{{ item.label }}</span>
                    <span style="float: right; color: #6aa62d; font-size: 13px">{{ item.id }}</span>
                  </el-option>
                </el-select>

              </el-form-item>

            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="表读数">
                <el-input v-model="dataForm.realValue"></el-input>

              </el-form-item>

            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
          </el-row>



        </el-card>
      </el-form>


    </el-main>
  </el-container>





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
                  colDate:"" //采集时间
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
