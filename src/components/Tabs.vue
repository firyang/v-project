<template>
  <div class="v-tabs">
    <div
      class="v-tabs-title"
      ref="v-tabs-title"
      :class="{ 'v-l': pos === 'left', 'v-r': pos === 'right', 'v-c': pos === 'center' }"
    >
      <span
        v-for="(tem,index) in titles"
        :key="'title_'+index"
        @click="changeTab(index)"
        :style="{color: active_ === index ? color : 'inherit'}"
        class="item"
      >{{ tem.title }}</span>
      <i class="line" ref="v-tabs-bl" :style="{'border-color': color}"></i>
    </div>
    <div class="v-tabs-content" ref="v-tabs-content">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'red'
    },
    pos: {
      type: String,
      default: 'left'
    },
    active: {
      type: Number,
      default: 0
    }
  },
  computed: {},
  data () {
    return {
      titles: [],
      items: [],
      active_: 0
    }
  },
  mounted () {
    this.active_ = this.active
    this.getTitles()
    setTimeout(() => {
      this.setActiveTab()
    }, 25)
  },
  updated () {
    // this.setActiveTab();
  },
  methods: {
    getTitles () {
      let _titles = []
      this.$children.forEach(item => {
        _titles.push(item.$attrs)
      })
      this.titles = _titles
      return _titles
    },
    getTitleDoms () {
      return [...this.$refs['v-tabs-title'].children]
    },
    getItemDoms () {
      return [...this.$refs['v-tabs-content'].children]
    },
    setActiveTitle (index) {
      let dTitles = this.getTitleDoms()
      let w = dTitles[index].offsetWidth
      let l = dTitles[index].offsetLeft
      this.$refs['v-tabs-bl'].style.width = w + 'px'
      this.$refs['v-tabs-bl'].style.left = l + 'px'
    },
    setActiveTab () {
      let dItems = this.getItemDoms()
      for (let i = 0, len = dItems.length; i < len; i++) {
        let item = dItems[i]
        if (i === this.active_) {
          item.style.display = 'block'
        } else {
          item.style.display = 'none'
        }
      }
      this.setActiveTitle(this.active_)
    },
    changeTab (index) {
      if (this.active_ === index) return
      let dItems = this.getItemDoms()
      this.active_ = index
      this.setActiveTab(index)
      this.setActiveTitle(index)
      this.$emit('change', { tabs: this, item: dItems[index], index: index })
    }
  }
}
</script>
<style lang="less" scoped>
.v-tabs {
  background: #ffffff;
  &-title {
    position: relative;
    display: flex;
    .item {
      display: inline-block;
      margin-right: 5px;
    }
    .line {
      height: 0;
      border-bottom: 3px solid transparent;
      position: absolute;
      bottom: 0;
      transition: all 0.3s;
    }
    &.v-l {
      justify-content: flex-start;
    }
    &.v-c {
      justify-content: center;
    }
    &.v-r {
      justify-content: flex-end;
    }
  }
}
</style>
