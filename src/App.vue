<template>
  <div id="app">
    <el-scrollbar style="height: 100vh">
      <!-- <Main /> -->
      <!-- <button @click="query">test</button>
    <button @click="query1">test1</button> -->
      <div class="header">header</div>
      <div class="content">
        <div class="left">left</div>
        <div class="right">
          <el-button @click="query" :loading="loading">查询</el-button>
          <el-table :data="tableData" style="width: 100%" v-loading="loading">
            <div>123</div>
            <el-table-column prop="mtime" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="nickname" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="footer">footer</div>
    </el-scrollbar>
  </div>
</template>

<script>
import Main from './components/Main.vue'
import axios from './common/HttpRequest.js'

export default {
  name: 'app',
  components: {
    Main,
  },
  data() {
    return {
      loading: false,
      tableData: [],
      height: '',
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    query() {
      this.loading = true
      axios.get('/api/test', { b: 2 }, { loading: false }).then((res) => {
        this.tableData = res.data
        this.loading = false
      })
    },
    query1() {
      axios
        .post(
          '/api/test1',
          { a: 1 },
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then((res) => {
          console.log('test1', res)
        })
    },
  },
}
</script>

<style lang="less">
html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f0f0f0;
  height: 100%;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.header {
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  background-color: rgb(47, 117, 223);
}
.content {
  margin: 15px 0;
  min-height: calc(100vh - 80px);
  display: flex;
  justify-content: space-between;
  .left {
    width: 196px;
    margin-right: 15px;
    background-color: #fff;
  }
  .right {
    flex: 1;
    background-color: #fff;
    transition: height 0.5s;
  }
}
.footer {
  height: 80px;
  line-height: 80px;
  text-align: center;
  color: #fff;
  background-color: #555;
}
</style>
