export default Vue => {
  const bus = new Vue()
  Vue.prototype.$bus = {
    $on (...event) {
      bus.$on(...event)
    },
    $off (...event) {
      bus.$off(...event)
    },
    $once (...event) {
      bus.$once(...event)
    },
    $emit (...event) {
      bus.$emit(...event)
    }
  }
}
