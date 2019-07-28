<template>
  <div>
    <h2>文件上传Demo</h2>
    <form>
      <label for="">文件: </label>
      <input type="file" name="file" id="file" />
    </form>
    <div><img src="" id="img"/></div>
    <div><p id="text"></p></div>
      <button @click="upload">Upload</button>
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
    upload () {
      let files = document.getElementById('file').files
      let formData = new FormData()
      formData.append('file', files[0])
      axios({
        method: 'POST',
        url: 'http://localhost:3000/upload',
        data: formData
      }).then(res => {
        console.log(res)
      })
      // let reader = new FileReader()
      // reader.readAsDataURL(files[0])
      // reader.readAsText(files[0], 'utf8')
      // reader.readAsArrayBuffer(files[0])
      // reader.onload = function (e) {
      //   // document.getElementById('img').src = this.result
      //   document.getElementById('text').innerHTML = this.result
      //   console.log(this.result)
      // }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
