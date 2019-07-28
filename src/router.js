import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/Home'
import Export from './components/Export'
import Demo from './components/Demo'
import FlowSheet from './components/FlowSheet'
import DynamicAddInput from './components/DynamicAddInput'
import PromiseDemo from './components/PromiseDemo'
import Download from './components/Download'
import Upload from './components/Upload'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'home', component: Home },
    {
      path: '/demo',
      name: 'demo',
      component: Demo
    },
    { path: '/export', name: 'export', component: Export },
    { path: '/flowsheet', name: 'flowsheet', component: FlowSheet },
    { path: '/DynamicAddInput', name: 'DynamicAddInput', component: DynamicAddInput },
    { path: '/PromiseDemo', name: 'PromiseDemo', component: PromiseDemo },
    { path: '/Download', name: 'Download', component: Download },
    { path: '/Upload', name: 'Upload', component: Upload }
  ]
})
