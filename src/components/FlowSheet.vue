<template>
  <div class="flow-sheet">
    <canvas id="tutorial" width="740" height="300"></canvas>
     <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M 150 0 L 150 200 M 0 100 L 300 100" stroke="#CCC" stroke-width="1" />
    <path id="path1" d="" stroke="#000" fill="green" fill-opacity="1" />
  </svg>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M 150 0 L 150 200 M 0 100 L 300 100" stroke="#CCC" stroke-width="1" />
    <path id="path2" d="" stroke="#000" fill="green" fill-opacity="1" />
  </svg>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M 150 0 L 150 200 M 0 100 L 300 100" stroke="#CCC" stroke-width="1" />
    <path id="path3" d="" stroke="#000" fill="green" fill-opacity="1" />
  </svg>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M 150 0 L 150 200 M 0 100 L 300 100" stroke="#CCC" stroke-width="1" />
    <path id="path4" d="" stroke="#000" fill="green" fill-opacity="1" />
  </svg>
	<svg width="500" height="400" id="s4"></svg>
  </div>
</template>
<script>
export default {
  components: {
  },
  data () {
    return {}
  },
  mounted () {
    this.draw()
  },
  methods: {
    draw () {
      let canvas = document.getElementById('tutorial')
      if (!canvas.getContext) return
      let ctx = canvas.getContext('2d')
      ctx.beginPath()
      ctx.arc(660, 10, 10, 1.5 * Math.PI, 0, false)
      ctx.lineTo(670, 100)
      ctx.arc(660, 110, 10, 0, 0.5 * Math.PI, false)
      ctx.lineTo(100, 120)
      ctx.arc(100, 130, 10, 1.5 * Math.PI, 1 * Math.PI, true)
      ctx.lineTo(90, 220)
      ctx.arc(100, 220, 10, 1 * Math.PI, 0.5 * Math.PI, true)
      ctx.strokeStyle = '#FF0000'
      ctx.stroke()
    }
  }
}
</script>
<style lang="less" scoped>
.flow-sheet{
  position: relative;
  #tutorial{
    position: absolute;
    top: 0;
    left: 0;
    // z-index: -1;
    // background: #fda;
  }

}
</style>
