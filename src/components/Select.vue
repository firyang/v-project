<template>
  <div class="v-select">
    <div v-for="(tem, index) in op" :key="index" class="v-select-radio" @click="onCheck(index)">
      <label class="v-label">{{ tem.label }}</label>
      <span class="v-radio"
       :style="{ background: selected === index ? color : '#eeeeee' }"
       :class="{ selected: selected === index }">
        <i></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    op: {
      type: Array,
      default: () => []
    },
    color: {
      type: String,
      default: '#1A92DF'
    }
  },
  computed: {},
  data () {
    return {
      selected: 0,
      value: ''
    }
  },
  mounted () {
    this.getDefault()
  },
  methods: {
    getDefault () {
      for (let i = 0, item; i < this.op.length; i++) {
        item = this.op[i]
        if (item.value === 1) {
          this.selected = i
          return
        }
      }
    },
    onCheck (index) {
      this.selected = index
      this.value = this.op[index].value
      this.$emit('check', this.value)
    }
  }
}
</script>
<style lang="less" scoped>
.v-select {
  background: #ffffff;
  display: flex;
  justify-content: flex-start;
  &-radio {
    padding: 8px 0;
    &:not(:first-child) {
      margin-left: 28px;
    }
    .v-label {
      float: left;
    }
    .v-radio {
      float: left;
      margin-left: 14px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #eeeeee;
      border: 1px solid #dddddd;
      position: relative;
      cursor: pointer;
      box-sizing: border-box;
      i {
        display: block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      &.selected{
        border: none;
        i{
          background: #ffffff;
        }
      }
    }
  }
}
</style>
