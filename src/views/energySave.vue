<template>

  <el-container >
    <el-dialog
      :visible.sync="dialogVisible"
      width="99%"
      top="3vh"
     >
      <div  id="completeDiv" >
        <iframe  frameborder ="0" :src="'/ems/ems2.1/admin/unit-info-list.html?option='+activeName" height="700px" width="100%"></iframe>
      </div>
    </el-dialog>


    <el-card class="box-card" style="width: 100%" >
      <div slot="header" >
        <el-row type="flex" class="row-bg" justify="left" >


          <el-col :span="6" align = "left" >
            <div>
              <el-radio-group v-model="date" >
                <el-radio-button label="2019"></el-radio-button>
                <el-radio-button label="2020"></el-radio-button>
                <el-radio-button label="2021"></el-radio-button>
              </el-radio-group>
            </div>

          </el-col>

          <el-col :offset="3" :span="6" align = "left">
            标志有 “<span><i class="el-icon-s-flag"></i><span class="icon-name"></span></span>” 的标题可以点击查看公式表格

          </el-col>
          <el-col :offset="3" :span="6" align = "right" >

            <el-button type="primary"  @click="dialogVisible = true"> 编辑参数<i class="el-icon-edit"></i></el-button>

          </el-col>
        </el-row>
      </div>
        <el-main  style="padding:0px">
          <el-tabs v-model="activeName" type="border-card" >
            <el-tab-pane label="节电量" name="jd">
            <electricSave v-bind:selectDate="date"></electricSave>

          </el-tab-pane>
          <el-tab-pane label="节电费" name="jdf">
            <feeSave v-bind:selectDate="date"></feeSave>
          </el-tab-pane>
            <el-tab-pane label="节气量、节气费" name="jq">
              <streamSave v-bind:selectDate="date"></streamSave>
            </el-tab-pane>
        </el-tabs>

    </el-main>
    </el-card>
  </el-container>
</template>

<script>


  import streamSave from './home/steamSave.vue'
  import feeSave from './home/feeSave.vue'
  import electricSave from './home/electricSave.vue'
    export default {
        name: "energySave",
        components:{
          streamSave,
            feeSave,
            electricSave
        },
        created() {
            console.log("0")
        },
        data() {
            return {
                dialogVisible:false,
                activeName:"jd",
                date:'2019',
            }
        }
    }
</script>

<style scoped>


  .el-card__body > .el-row {
    margin-bottom: 10px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 5px 0;
  }





</style>

<style>

  .el-table{
    font-size: 16px;
  }
  code {
    background-color: #f9fafc;
    padding: 0 4px;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    font-size: 14px;
  }

  .el-card__header {
    padding: 10px 10px !important;
    background-color: #F5F7FA;
  }

  .el-card__body{

    padding: 0px 0px !important;
  }

  .el-link.el-link--default{ color: white}



  .el-table th{
    padding: 7px 0px !important;
    background-color: #F5F7FA !important;
  }

  .el-table td{
    padding: 5px 0px !important;
  }
  th div{
    height: 70px;
  }

</style>
