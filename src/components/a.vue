

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ showMsg() }}</h2>

    <at-input v-model="value" ref="inp" placeholder="请输入..."></at-input>

<br>
    <h1>Button 按钮</h1>

    <hr/>
    <at-button type="primary" disabled>主要按钮</at-button>
    <at-button>次要按钮</at-button>
    <at-button type="text" >文字按钮</at-button>
    <br>
    <div class="row">
      <at-button hollow>默认按钮</at-button>
      <at-button type="primary" hollow>主要按钮</at-button>
      <at-button type="success" hollow>成功按钮</at-button>
      <at-button type="error" hollow>危险按钮</at-button>
      <at-button type="warning" hollow>警告按钮</at-button>
      <at-button type="info" hollow>信息按钮</at-button>
    </div><br>
    <div class="row">
      <at-button>默认按钮</at-button>
      <at-button type="primary">主要按钮</at-button>
      <at-button type="success">成功按钮</at-button>
      <at-button type="error">危险按钮</at-button>
      <at-button type="warning">警告按钮</at-button>
      <at-button type="info">信息按钮</at-button>
    </div>

    <hr/>
    <div class="row">
      <at-button icon="icon-download" v-on:click="showMsg2('aaa',$event)">下载资源</at-button>
      <at-button icon="icon-user-plus">添加用户</at-button>
      <at-button icon="icon-edit"></at-button>
      <at-button type="primary" icon="icon-search"></at-button>
    </div>
    <hr/>
    <div class="row">
      <at-button icon="icon-edit" circle></at-button>
      <at-button type="primary" icon="icon-search" circle></at-button>
    </div>


    <hr>
    <at-table :columns="columns1" :data="data1"  stripe border optional size="small" height="220"  :page-size="pageNumber" pagination show-page-quickjump :show-page-total="isShow"  >


    </at-table>


    <hr>



    <div>

      <el-transfer v-model="value" :data="data"></el-transfer>
    </div>
  </div>

</template>

<script>
    export default {



        data () {
            const generateData = _ => {
                const data = [];
                for (let i = 1; i <= 15; i++) {
                    data.push({
                        key: i,
                        label: `备选项 ${ i }`,
                        disabled: i % 4 === 0
                    });
                }
                return data;
            };
            return {
                data: generateData(),
                value: [1, 4],
                msg: '欢迎来到a-！',
                pageNumber : 5,
                isShow: true,
                columns1: [
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '年龄',
                        key: 'age',
                        sortType:'normal'

                    },
                    {
                        title: '地址',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: '库里',
                        age: 18,
                        address: '深圳市宝安区创业一路'
                    },
                    {
                        name: '詹姆斯',
                        age: 25,
                        address: '广州市天河区岗顶'
                    },
                    {
                        name: '科比',
                        age: 24,
                        address: '上海市浦东新区'
                    },
                    {
                        name: '杜兰特',
                        age: 22,
                        address: '深圳市南山区深南大道'
                    },
                    {
                        name: '威斯布鲁克',
                        age: 21,
                        address: '北京市朝阳区'
                    },
                    {
                        name: '邓肯',
                        age: 26,
                        address: '深圳市罗湖区万象城'
                    },
                    {
                        name: '帕克',
                        age: 25,
                        address: '深圳市福田区中心书城'
                    },
                    {
                        name: '欧文',
                        age: 20,
                        address: '广州市番禺区大学城'
                    },
                    {
                        name: '托马斯',
                        age: 19,
                        address: '北京市朝阳区'
                    },
                    {
                        name: '库里',
                        age: 18,
                        address: '深圳市宝安区创业一路'
                    },
                    {
                        name: '詹姆斯',
                        age: 25,
                        address: '广州市天河区岗顶'
                    },
                    {
                        name: '科比',
                        age: 24,
                        address: '上海市浦东新区'
                    },
                    {
                        name: '杜兰特',
                        age: 22,
                        address: '深圳市南山区深南大道'
                    },
                    {
                        name: '威斯布鲁克',
                        age: 21,
                        address: '北京市朝阳区'
                    },
                    {
                        name: '邓肯',
                        age: 26,
                        address: '深圳市罗湖区万象城'
                    },
                    {
                        name: '帕克',
                        age: 25,
                        address: '深圳市福田区中心书城'
                    },
                    {
                        name: '欧文',
                        age: 20,
                        address: '广州市番禺区大学城'
                    },
                    {
                        name: '托马斯',
                        age: 19,
                        address: '北京市朝阳区'
                    }
                ]
            }
        },
        methods: {
            showMsg() {
                return "showMsgMethod"
            },
            showMsg2(msg, event) {
                let m = this.$refs.inp;
                this.$set(this.$data, 'msg', m.currentValue)
            }
        }
    }
</script>

<style>
  button,lable{margin:5px;padding:0; border:0;}
  div {
    margin:0 auto;
    width: 900px;
    margin-bottom: 60px;
  }

</style>



