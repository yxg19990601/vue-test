import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import Appindex from "@/views/home/Appindex";
import addDeviceEnergyRec from "../views/addDeviceEnergyRec";
import energySave from "../views/energySave";
import fee from "../views/fee";

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'Appindex',
      component: Appindex
    },
    {
      path: '/addDeviceEnergyRec',
      name: 'addDeviceEnergyRec',
      component: addDeviceEnergyRec
    },{
      path: '/energySave',
      name: 'energySave',
      component: energySave
    },{
      path: '/fee',
      name: 'fee',
      component: fee
    }



  ]
})
