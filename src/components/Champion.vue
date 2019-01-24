<template>
  <div class="columns" v-if="name !== null">
    <div class="column is-2 is-offset-3">
      <img style="width: 50px; height: 50px;" :src="'https://ddragon.leagueoflegends.com/cdn/9.2.1/img/champion/' + name + '.png'">
    </div>
    <div class="column is-7 has-text-left">
      <h5 class="title is-5 marginBOT">P: {{ p }}</h5>
      <h5 class="title is-5 marginBOT">Q: {{ q }}</h5>
      <h5 class="title is-5 marginBOT">W: {{ w }}</h5>
      <h5 class="title is-5 marginBOT">E: {{ e }}</h5>
      <h5 class="title is-5 marginBOT">R: {{ r }}</h5>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['name'],
  data () {
    return {
      p: '',
      q: '',
      w: '',
      e: '',
      r: ''
    }
  },
  watch: {
    name: function (value) {
      if (value) {
        axios.get('https://ddragon.leagueoflegends.com/cdn/9.2.1/data/en_US/champion/' + value + '.json').then((respon) => {
          const championData = respon.data.data[value]
          // console.log('cham', championData)
          this.p = championData.passive.name
          for (const key in championData.spells) {
            if (championData.spells.hasOwnProperty(key)) {
              const element = championData.spells[key]
              // console.log(element.name)
              if (key === '0') this.q = element.name
              if (key === '1') this.w = element.name
              if (key === '2') this.e = element.name
              if (key === '3') this.r = element.name
            }
          }
        }).catch((error) => {
          console.error(error)
        })
      }
    }
  }
}
</script>

<style scoped>
.marginBOT {
  margin-bottom: 2px !important;
}
</style>
