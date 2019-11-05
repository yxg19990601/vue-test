<template>
  <el-card shadow="always" >
    <div slot="header" >
      <el-tooltip class="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
      <span>人工录入数据</span>
      </el-tooltip>
    </div>
  <el-container >


    <el-aside width="600px"  style="padding: 20px;">



      <el-calendar  type="string" style="border:1px solid #EBEEF5"  v-model="dataForm.colDate">

        <div
          slot="dateCell"
          slot-scope="{date, data}">

           {{data.day.split('-')[2]}}

            <div style="font-size: 10px;margin-top: 12px"> {{colSettingData[data.day] === undefined?'':colSettingData[data.day].reportValue}}</div>
  <!--          <input v-if="data.isSelected" style="height: 20px;width: 30px"></input>-->
  <!--          <input v-focus v-if="data.isSelected ? true:false" size="mini" v-model="dataForm.realValue"></input>-->
            <i v-if="hasKey() && colSettingData[data.day] !== undefined"  class="el-icon-success" style="color: #00a854;margin-top: 5px"></i>
  <!--          <i  v-if="hasKey() &&colSettingData[data.day] === undefined" class="el-icon-error" style="color: #ff4679"></i>-->

        </div>

      </el-calendar>

    </el-aside>


    <el-main >
      <el-row :gutter="20">
        <el-col :span="8"><div class="grid-content bg-purple">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>


            <el-tree
              node-key="id"
              class="filter-tree"
              :data="data"
              :props="defaultProps"
              default-expand-all
              show-checkbox
              check-on-click-node
              :filter-node-method="filterNode"
              @check-change="checkChange"

              ref="tree">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>

              <span>
                {{data.children === undefined ? (data.reportValue === null? '':data.reportValue):'' }}
              </span>
            </span>


          </el-tree>
        </div></el-col>
        <el-col :span="10"><div class="grid-content bg-purple">
          <el-form @submit.native.prevent style="border:1px solid #EBEEF5" :model="dataForm" label-width="80px">


           <!-- <el-row :gutter="20" style="margin: 20px 5px">
              <el-col :span="5" :offset="3" >
                <div class="grid-content bg-purple">
                  <span style="line-height: 40px;float: left;color: #606266;">采集点名：</span>
                </div>
              </el-col>
              <el-col :span="12"  >
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

            </el-row>-->
            <el-row :gutter="20" style="margin: 20px 5px">
              <el-col :span="5" :offset="3"  >
                <div class="grid-content bg-purple">
                  <span style="line-height: 40px;float: left;color: #606266">采集点值：</span>
                </div>
              </el-col>
              <el-col :span="4"  >
                <div class="grid-content bg-purple">
                  <el-input  ref="inputeRealValue" clearable  v-model="dataForm.realValue" style="width: 220px" @keyup.enter.native="submitData"></el-input>
                </div>
              </el-col>

            </el-row>

            <el-row :gutter="20" style="margin: 20px 5px">
              <el-col :span="24"  >
                <div class="grid-content bg-purple">
                  <el-button type="primary" round @click="submitData">提交</el-button>
                </div>
              </el-col>
            </el-row>

          </el-form>
        </div></el-col>

      </el-row>



    </el-main>
  </el-container>
  </el-card>




</template>

<script>
    export default {
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            },
            "dataForm.colDate"(val) {
                let currentKey = this.$refs.tree.getCurrentKey();
                if(currentKey != null) {
                    let curentDate = '';

                    if(typeof(this.dataForm.colDate) === "string") {
                        if(this.dataForm.colDate.length !== 0) {
                            curentDate = this.dataForm.colDate
                        } else {
                            this.dataForm.colDate = new Date();
                            curentDate = this.dateFtt("yyyy-MM-dd",this.dataForm.colDate)
                        }
                    } else {
                        curentDate =  this.dateFtt("yyyy-MM-dd",this.dataForm.colDate)
                    }


                    this.$axios
                        .get('/ems/servlet/InputDataAction/getColData?colDate='+curentDate+'&colSetting='+currentKey)
                        .then(successResponse => {
                            this.colSettingData = successResponse.data;
                            if(this.colSettingData[curentDate] === undefined) {
                                this.dataForm.realValue = '';
                            }
                            this.dataForm.realValue =  this.colSettingData[curentDate].readValue
                        })
                        .catch(failResponse => {
                        })

                    this.$axios
                        .get('/ems/servlet/InputDataAction/getColTree?colDate='+curentDate)
                        .then(successResponse => {
                            let curentData = successResponse.data
                            var thisData = this.data;
                            for(var n in curentData) {
                                console.log(n)
                                for (var m in curentData[n].children) {
                                    thisData[n].children[m].reportValue = curentData[n].children[m].reportValue
                                }
                            }
                        })
                        .catch(failResponse => {
                        })
                    this.$refs.inputeRealValue.focus()
                } else {
                    this.colSettingData = []
                    this.dataForm.realValue = ''
                }


            }
        },
        name: "addDeviceEnergyRec",
        data(){
          return {
              colSettingData : {},
              i:0,
              formLabelWidth: '80px',
              dialogFormVisible: false,
              first: true,
              storeId:0,
              dataForm:{
                  colSettingId:"", //采集点ID
                  realValue:"", //表读数
                  colDate: ''//采集时间
              },
              filterText: '',
              data: [

              ],
              defaultProps: {
                  children: 'children',
                  label: 'label'
              }
          }

        },
        created() {
          this.getTreeData()
            //this.copy = Object.assign(this.options);
            for (let b in this.data) {
              this.data[b].disabled = true
            }
        },
        methods: {
            hasKey() {

                if( this.$refs.tree) {
                    return this.$refs.tree.getCurrentKey() !== null;
                }
               return false;
            },
             dateFtt(fmt,date)
            { //author: meizz
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
            },
            getTreeData() {
                 let curentDate = '';

                 if(typeof(this.dataForm.colDate) === "string") {
                     if(this.dataForm.colDate.length !== 0) {
                         curentDate = this.dataForm.colDate
                     } else {
                         this.dataForm.colDate = new Date();
                         curentDate = this.dateFtt("yyyy-MM-dd",this.dataForm.colDate)
                    }
                 } else {
                      curentDate =  this.dateFtt("yyyy-MM-dd",this.dataForm.colDate)
                 }

                this.$axios
                    .get('/ems/servlet/InputDataAction/getColTree?colDate='+curentDate)
                    .then(successResponse => {
                        this.data = successResponse.data;
                    })
                    .catch(failResponse => {
                    })
            },
            submitData() {
                // 验证数据
                let currentKey = this.$refs.tree.getCurrentKey();
                if(currentKey == null) {
                    this.$message("没有选中采集点!")
                    return false;
                }
                debugger
                let reg = /^(([^0][0-9]*|0)\.([0-9]{1,2})$)|^([^0][0-9]+|0)$/;


                let isTrue = reg.test(this.dataForm.realValue);
                if (!isTrue) {
                    this.$message("请输入正确数据!");
                    return false;
                }

                let curentDate = '';
                if(typeof(this.dataForm.colDate) === "string") {
                    if(this.dataForm.colDate.length !== 0) {
                        curentDate = this.dataForm.colDate
                    } else {
                        this.dataForm.colDate = new Date();
                        curentDate = this.dateFtt("yyyy-MM-dd",this.dataForm.colDate)
                    }
                } else {
                    curentDate =  this.dateFtt("yyyy-MM-dd",this.dataForm.colDate)
                }


                this.$axios
                    .get('/ems/servlet/InputDataAction/addData?colDate='+curentDate+'&colSetting='+currentKey+'&inputVlue='+this.dataForm.realValue)
                    .then(successResponse => {
                        let res = successResponse.data;
                        debugger
                        if(res.code == 200) {
                            this.$message("保存成功!")
                        } else {
                            this.$message("保存失败!")
                        }

                        this.$axios
                            .get('/ems/servlet/InputDataAction/getColData?colDate='+curentDate+'&colSetting='+currentKey)
                            .then(successResponse => {
                                this.colSettingData = successResponse.data;
                                if(this.colSettingData[curentDate] === undefined) {
                                    this.dataForm.realValue = '';
                                }
                                this.dataForm.realValue =  this.colSettingData[curentDate].readValue;
                            })
                            .catch(failResponse => {
                            })

                        this.$axios
                            .get('/ems/servlet/InputDataAction/getColTree?colDate='+curentDate)
                            .then(successResponse => {
                                let curentData = successResponse.data
                                var thisData = this.data;
                                for(var n in curentData) {
                                    console.log(n)
                                    for (var m in curentData[n].children) {
                                        thisData[n].children[m].reportValue = curentData[n].children[m].reportValue
                                    }
                                }
                            })

                            .catch(failResponse => {
                            })
                    })
                    .catch(failResponse => {
                        this.$message("异常:")
                    })

                return false;
            },
            checkChange(node,isChecked,isChiledCheked) {
                 if(isChecked) {
                     this.$refs.tree.setCheckedNodes([node]);
                     if(!(node.children !== undefined && node.children.length > 0)) {
                         this.$refs.inputeRealValue.focus()
                         let currentKey = this.$refs.tree.getCurrentKey();
                         if(currentKey != null) {
                             let curentDate = '';

                             if (typeof (this.dataForm.colDate) === "string") {
                                 if (this.dataForm.colDate.length !== 0) {
                                     curentDate = this.dataForm.colDate
                                 } else {
                                     this.dataForm.colDate = new Date();
                                     curentDate = this.dateFtt("yyyy-MM-dd", this.dataForm.colDate)
                                 }
                             } else {
                                 curentDate = this.dateFtt("yyyy-MM-dd", this.dataForm.colDate)
                             }

                             this.$axios
                                 .get('/ems/servlet/InputDataAction/getColData?colDate='+curentDate+'&colSetting='+currentKey)
                                 .then(successResponse => {
                                     this.colSettingData = successResponse.data;
                                     if(this.colSettingData[curentDate] === undefined) {
                                         this.dataForm.realValue = '';
                                     }
                                     this.dataForm.realValue =  this.colSettingData[curentDate].readValue;
                                 })
                                 .catch(failResponse => {
                                 })
                         } else {
                             this.colSettingData = [];
                             this.dataForm.realValue = '';

                         }
                     }
                 }



            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;

            },
            clickCalDate(date){
                this.$refs.inputeRealValue.focus()
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

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}



</style>

