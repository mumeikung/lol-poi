<template>
  <div class="columns" v-if="name !== null">
    <div class="column is-3">
      <img style="width: 90px; height: 90px;" :src="'https://ddragon.leagueoflegends.com/cdn/' + version + '/img/champion/' + name + '.png'"><br>
      <button :disabled="loading" class="button is-small" @click="loader">RELOAD</button>
    </div>
    <div class="column is-9 has-text-left">
      <h5 class="title is-5 marginBOT">Passive: {{ p || '-' }}</h5>
      <h5 class="title is-5 marginBOT">Q: {{ q || '-' }}</h5>
      <h5 class="title is-5 marginBOT">W: {{ w || '-' }}</h5>
      <h5 class="title is-5 marginBOT">E: {{ e || '-' }}</h5>
      <h5 class="title is-5 marginBOT">R: {{ r || '-' }}</h5>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['name', 'version'],
  data () {
    return {
      p: '',
      q: '',
      w: '',
      e: '',
      r: '',
      loading: false
    }
  },
  methods: {
    loader: function () {
      if (this.name) {
        this.loading = true
        axios.get('https://ddragon.leagueoflegends.com/cdn/' + this.version + '/data/th_TH/champion/' + this.name + '.json').then((respon) => {
          this.loading = false
          const championData = respon.data.data[this.name]
          console.log(this.name, championData)
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
          this.loading = false
          console.error(this.name, this.version, error)
        })
      } else {
        this.p = ''
        this.q = ''
        this.w = ''
        this.e = ''
        this.r = ''
      }
    }
  },
  watch: {
    name: function (value) {
      this.loader()
    }
  }
}
</script>

<style scoped>
.marginBOT {
  margin-bottom: 2px !important;
}
</style>
