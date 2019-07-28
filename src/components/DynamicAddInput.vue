<template>
  <div class="dynamic">
    <h2>动态添加Input并绑定数据</h2>
    <div v-for="(item,key) in fieldList" :key="key">
      <input type="text" v-model="item.key">
      <span @click="addField">+</span>
      <span @click="delField(key)">-</span>
      <button @click="print(key)">print value</button>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      fieldList: [
        { key: '' }
      ]
    }
  },
  created () {
  },
  beforeDestroy () {
  },
  methods: {
    addField () {
      this.fieldList.push({ key: '' })
    },
    delField (index) {
      this.fieldList.splice(index, 1)
    },
    print (index) {
      console.log(this.fieldList[index])
    }
  }
}
</script>
<style lang="less" scoped>
.dynamic {
  div{
    margin: 6px 0;
  span{
    display: inline-block;
    width: 30px;
    height: 21px;
    line-height: 21px;
    text-align: center;
    border: 1px solid #999;
    border-radius: 5px;
    margin: 0 6px;
    cursor: pointer;
  }
  }
}
</style>
