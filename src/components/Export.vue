<template>
  <div class="export">
    <button type="button" @click="tableToExcel">导出Excel方法五</button>
    <a id="downloadLink" @click="toExcel">导出表格</a>
    <button @click="toDemo">Test Route Props</button>
    <table id="tableExcel" width="100%" border="1" cellspacing="0" cellpadding="0">
      <tr>
        <td colspan="5" align="center">html 表格导出道Excel</td>
      </tr>
      <tr>
        <td>列标题1</td>
        <td>列标题2</td>
        <td>类标题3</td>
        <td>列标题4</td>
        <td>列标题5</td>
      </tr>
      <tr>
        <td>aaa</td>
        <td>bbb</td>
        <td>ccc</td>
        <td>ddd</td>
        <td>eee</td>
      </tr>
      <tr>
        <td>AAA</td>
        <td>BBB</td>
        <td>CCC</td>
        <td>DDD</td>
        <td>EEE</td>
      </tr>
      <tr>
        <td>FFF</td>
        <td>GGG</td>
        <td>HHH</td>
        <td>III</td>
        <td>JJJ</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Export',
  data () {
    return {
      sendParams: false
    }
  },
  created () {
    this.sendParams = true
  },
  beforeDestroy () {
    this.sendParams && this.$bus.$emit('eventB', { searchParams: { a: 1, b: 2 } })
  },
  methods: {
    method5 (tableId) {
      if (this.getExplorer() === 'ie') {
        let curTable = document.getElementById(tableId)
        let oXL = new ActiveXObject('Excel.Application')
        let xlsheet = oWB.Worksheets(1)
        let sel = document.body.createrTextRange()
        sel.select()
        sel.excCommand('copy')
        xlsheet.Paste()
        oXL.Visible = true
        try {
          let fname = oXL.Application.GetSaveAsFilename(
            'Excel.xls',
            'Excel Spreadsheets (*.xls), *.xls'
          )
        } catch (e) {
          print('Nested catch caught ' + e)
        } finally {
          oWB.SaveAs(fname)
          oWB.Close((savechanges = false))
          oXL.Quit()
          oXL = null
          timer = window.setInterval(() => {
            this.Cleanup()
          }, 1)
        }
      } else {
        this.tableToExcel(tableId)
      }
    },
    getExplorer () {
      var explorer = window.navigator.userAgent
      // ie
      if (explorer.indexOf('MSIE') >= 0) {
        return 'ie'
      }
      // firefox
      else if (explorer.indexOf('Firefox') >= 0) {
        return 'Firefox'
      }
      // Chrome
      else if (explorer.indexOf('Chrome') >= 0) {
        return 'Chrome'
      }
      // Opera
      else if (explorer.indexOf('Opera') >= 0) {
        return 'Opera'
      }
      // Safari
      else if (explorer.indexOf('Safari') >= 0) {
        return 'Safari'
      }
    },
    Cleanup () {
      window.clearInterval(timer)
      CollectGarbage()
    },
    toExcel () {
      // 使用outerHTML属性获取整个table元素的HTML代码（包括<table>标签），然后包装成一个完整的HTML文档，设置charset为urf-8以防止中文乱码
      var html = "<html><head><meta charset='utf-8' /></head><body>" + document.getElementById('tableExcel').outerHTML + '</body></html>'
      // 实例化一个Blob对象，其构造函数的第一个参数是包含文件内容的数组，第二个参数是包含文件类型属性的对象
      var blob = new Blob([html], { type: 'application/vnd.ms-excel' })
      var a = document.getElementById('downloadLink')
      // 利用URL.createObjectURL()方法为a元素生成blob URL
      a.href = URL.createObjectURL(blob)
      // 设置文件名
      a.download = '导出表格.xls'
    },
    tableToExcel () {
      let table = document.getElementById('tableExcel')
      let uri = 'data:application/vnd.ms-excel;base64,'
      let template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>'
      let base64 = function (s) {
        return window.btoa(unescape(encodeURIComponent(s)))
      }
      let format = function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
          return c[p]
        })
      }
      return ((table, name) => {
        let ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
        window.location.href = uri + base64(format(template, ctx))
      })(table)
    },
    toDemo () {
      this.$router.push({ path: '/demo' })
      Object.assign(this.$route.params, { searchParams: { a: 1, b: 2 } })
      this.sendParams = true
    }
  }
}
</script>

<style lang="less" scoped>
</style>
