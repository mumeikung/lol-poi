import Vue from 'vue'
import App from './App.vue'
import('bulma/css/bulma.min.css')
import('bulma-tooltip/dist/css/bulma-tooltip.min.css')

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
