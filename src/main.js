import Vue from 'vue'
import App from './App.vue'
import VTooltip from 'v-tooltip'
import('bulma/css/bulma.min.css')
import('bulma-tooltip/dist/css/bulma-tooltip.min.css')
import('@/assets/tooltip.css')

Vue.use(VTooltip)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
