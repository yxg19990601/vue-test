<template>
  <div>

    <v-button>按钮</v-button>

    <hr>


    <v-tree :data="treeData" checkable multiple @select="selectFn" @check="checkFn"></v-tree>

    <h1>数据表格</h1>
    <v-data-table :data='loadData' :columns='columns' tree-table></v-data-table>
  </div>

</template>

<script>
    import axios from 'axios'
    export default {
        name: "c.vue",
        data() {
            return {
                loadData(pramas) {
                    debugger;
                    const  url="static/datatable.json";
                    return axios.get(url,pramas).then(res =>{
                        return res.data;
                    });
                },
                columns:[
                    {title:"歌名",field:'name'},
                    {title:"时长",field:'time'},
                    {title:"歌手",field:'singer'},
                    {title:"专辑",field:'album'},
                ],
                treeData: [{
                    title: 'parent 1',
                    expanded: true,
                    selected: true,
                    children: [{
                        title: 'parent 1-0',
                        expanded: true,
                        disabled: true,
                        children: [{
                            title: 'leaf',
                            disableCheckbox: true
                        }, {
                            title: 'leaf',
                        }]
                    }, {
                        title: 'parent 1-1',
                        checked: true,
                        children: [{
                            title: "<span style='color: #08c'>sss</span>"
                        }]
                    }]
                }]
            }
        },
        methods: {
            selectFn(data) {
                console.log(data);
            },
            checkFn(data) {
                console.log(data);
            },
        }
    }
</script>

<style scoped>
  hr{
    margin-bottom: 10px;
    margin-top: 10px;

  }

  div{
    width: 800px;
    margin: auto;
  }
</style>
