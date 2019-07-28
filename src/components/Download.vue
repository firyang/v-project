<template>
  <div>
    <h2>文件下载Demo</h2>
    <button @click="download()">Download</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  components: {},
  data () {
    return { }
  },
  methods: {
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
</style>
