<template>
  <div class="columns">
    <div class="column is-3">
      <img style="width: 90px; height: 90px;" :alt="realname || 'SELECT'" :src="(name === null ? 'https://ddragon.leagueoflegends.com/cdn/' + version + '/img/profileicon/0.png' : 'https://ddragon.leagueoflegends.com/cdn/' + version + '/img/champion/' + name + '.png')"><br>
      <button :disabled="loading || !name" class="button is-dark is-small tooltip is-tooltip-light is-tooltip-right" :data-tooltip="title ? title : (name ? 'RELOAD' : 'SELECT')" @click="loader">{{ realname ? realname : (name ? 'RELOAD' : 'SELECT')}}</button>
    </div>
    <div class="column is-9 has-text-left">
      <h5 :class="skillClass" v-tooltip.top-start="{ content: pd, html: true, classes: 'skilltip' }">Passive: {{ p || '-' }}</h5>
      <h5 :class="skillClass" v-tooltip.top-start="{ content: qd, html: true, classes: 'skilltip' }">Q: {{ q || '-' }}</h5>
      <h5 :class="skillClass" v-tooltip.top-start="{ content: wd, html: true, classes: 'skilltip' }">W: {{ w || '-' }}</h5>
      <h5 :class="skillClass" v-tooltip.top-start="{ content: ed, html: true, classes: 'skilltip' }">E: {{ e || '-' }}</h5>
      <h5 :class="skillClass" v-tooltip.top-start="{ content: rd, html: true, classes: 'skilltip' }">R: {{ r || '-' }}</h5>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['name', 'version'],
  data () {
    return {
      // skillClass: 'title is-5 marginBOT tooltip is-tooltip-multiline is-tooltip-light',
      skillClass: 'title is-5 marginBOT',
      realname: '',
      title: '',
      p: '',
      q: '',
      w: '',
      e: '',
      r: '',
      pd: '',
      qd: '',
      wd: '',
      ed: '',
      rd: '',
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
          this.pd = '<img class="skillImageClass" src="' + this.imageLink(championData.passive.image) + '"><p class="skillNameClass">' + championData.passive.name + '</p><p class="has-text-left">' + championData.passive.description + '</p>'
          this.realname = championData.name
          this.title = championData.title
          for (const key in championData.spells) {
            if (championData.spells.hasOwnProperty(key)) {
              const element = championData.spells[key]
              // console.log(element.name)
              const skillDesc = '<img class="skillImageClass" src="' + this.imageLink(element.image) + '"><p class="skillNameClass">' + element.name + '</p><p class="has-text-left">' + element.description + '</p>'
              if (key === '0') {
                this.q = element.name
                this.qd = skillDesc
              }
              if (key === '1') {
                this.w = element.name
                this.wd = skillDesc
              }
              if (key === '2') {
                this.e = element.name
                this.ed = skillDesc
              }
              if (key === '3') {
                this.r = element.name
                this.rd = skillDesc
              }
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
        this.pd = ''
        this.qd = ''
        this.wd = ''
        this.ed = ''
        this.rd = ''
      }
    },
    imageLink: function (imageData) {
      return 'https://ddragon.leagueoflegends.com/cdn/' + this.version + '/img/' + imageData.group + '/' + imageData.full
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
  margin-bottom: 3px !important;
  color: white;
}
</style>
