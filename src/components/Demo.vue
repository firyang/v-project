<template>
  <div>
    <Select :op="selectOp" color="orange" @check="check"/>
    <div class="fix"></div>
    <tabs :active="1" pos="left" color="orange" @change="change">
      <tab-item v-for="(tem, index) in op" :key="'item_'+index" :title="tem.title">
        <ul>
          <li v-for="(val, j) in tem.data" :key="'val_'+j">{{ tem.title+" "+val }}</li>
        </ul>
      </tab-item>
    </tabs>
    <div class="fix"></div>
    <pager></pager>
    <button @click="query">query</button>
    <button @click="copyContent('#textarea1')">复制</button>
    <textarea name="" id="textarea1" cols="30" rows="10">at Function.Module._resolveFilename (internal/modules/cjs/loader.js:582:15)at Function.Module._load (internal/modules/cjs/loader.js:508:25)at Module.require (internal/modules/cjs/loader.js:637:17)at require (internal/modules/cjs/helpers.js:22:18)</textarea>
    <firRadio :op="selectOp"></firRadio>
    <button @click="download()">Download</button>
  </div>
</template>
<script>
import Tabs from './Tabs'
import TabItem from './TabItem'
import Select from './Select'
import Pager from './Pager'
import axios from 'axios'

export default {
  components: {
    Tabs,
    TabItem,
    Select,
    Pager
  },
  props: ['searchParams'],
  data () {
    return {
      fieldArr: [
        { key: '' }
      ],
      selectOp: [
        { label: '符合', value: 1 },
        { label: '不符合', value: 0 },
        { label: '其它', value: -1 }
      ],
      op: [
        {
          title: 'tab199999999999',
          data: [1, 2, 3, 4, 5]
        },
        {
          title: 'tab20000000000',
          data: ['one', 'two', 'three', 'four', 'five']
        }
      ],
      pageOp: {
        pageVO: {
          curPage: 1,
          pageSize: 6,
          totalRows: 0,
          totalPages: 0
        },
        pageCount: 5
      }
    }
  },
  created () {
    this.$bus.$on('eventB', data => {
      console.log(data, 'bus envet')
    })
  },
  beforeDestroy () {
    this.$bus.$off('eventB')
  },
  methods: {
    change ({ tabs }) {
      console.log(tabs)
    },
    check (value) {
      console.log(value)
    },
    query () {
      axios.get('/toyomall/data/product/').then(res => {
        console.log('/toyomall', res)
      })

      axios.get('/api/userdetail').then(res => {
        console.log('/api', res)
      })
    },
    copyContent (selector) {
      let element
      if (/^#/.test(selector)) {
        element = document.getElementById(selector.slice(1))
      } else {
        element = document.querySelector(selector)
      }
      element.select()
      document.execCommand('copy')
      window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
    },
    addField () {
      this.fieldArr.push({ key: '' })
    },
    delField (index) {
      this.fieldArr.splice(index, 1)
    },
    print (index) {
      console.log(this.fieldArr[index])
    },
    download (fileName, fileType) {
      fileName = fileName || 'pig_home.png'
      fileType = fileType || '2'
      axios({
        type: 'get',
        url: 'http://localhost:3000/download?fileName=' + fileName + '&fileType=' + fileType,
        responseType: 'blob'
      }).then(res => {
        let blob = res.data

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob, fileName)
        } else {
          imatateDownloadByA(window.URL.createObjectURL(blob), fileName)
        }
      })

      function imatateDownloadByA (href, fileName) {
        let a = document.createElement('a')
        a.download = fileName
        a.style.display = 'none'
        a.href = href
        document.body.appendChild(a)
        a.click()
        a.remove()
        window.URL.revokeObjectURL(href)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.fix {
  width: 100%;
  height: 0;
  border-bottom: 14px solid transparent;
}
</style>
