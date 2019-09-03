<template>
  <div class="columns">
    <div class="column" style="padding: 0px;">
      <div class="columns" v-if="player !== 'p1' && name !== null && edit">
        <div class="column paddingZero">
          <button class="button is-dark is-fullwidth" @click="$emit('swap', player, 'up')">เลื่อนขึ้น</button>
        </div>
      </div>
      <div class="columns">
        <div class="column is-3 paddingSix">
          <img v-tooltip.top-start="{ content: nametip, html: true, classes: 'skilltip' }" style="width: 80px; height: 80px;" :alt="realname || 'SELECT'" :src="(name === null ? 'https://ddragon.leagueoflegends.com/cdn/' + version + '/img/profileicon/0.png' : 'https://ddragon.leagueoflegends.com/cdn/' + version + '/img/champion/' + name + '.png')"><br>
          <button :disabled="loading || !edit" class="button is-small" @click="openModal">{{ realname ? realname : 'SELECT' }}</button>
        </div>
        <div class="column is-9 has-text-left paddingSix">
          <h5 :class="skillClass" v-tooltip.top-start="{ content: pd, html: true, classes: 'skilltip' }">Passive: {{ p || '-' }}</h5>
          <h5 :class="skillClass" v-tooltip.top-start="{ content: qd, html: true, classes: 'skilltip' }">Q: {{ q || '-' }}</h5>
          <h5 :class="skillClass" v-tooltip.top-start="{ content: wd, html: true, classes: 'skilltip' }">W: {{ w || '-' }}</h5>
          <h5 :class="skillClass" v-tooltip.top-start="{ content: ed, html: true, classes: 'skilltip' }">E: {{ e || '-' }}</h5>
          <h5 :class="skillClass" v-tooltip.top-start="{ content: rd, html: true, classes: 'skilltip' }">R: {{ r || '-' }}</h5>
        </div>
      </div>
      <div class="columns" v-if="player !== 'p5' && name !== null && edit">
        <div class="column paddingZero">
          <button class="button is-dark is-fullwidth" @click="$emit('swap', player, 'down')">เลื่อนลง</button>
        </div>
      </div>
      <hr v-if="edit">
      <div :class="'modal' + (toggle ? ' is-active' : '')">
        <div class="modal-background" @click="toggle = false"></div>
        <div class="modal-content" style="height: 500px;">
          <div class="box" style="padding: 12px; margin: 24px 12px; height: 100%;">
            <div class="columns" style="height: 36px; margin-bottom: 12px;">
              <div class="column" style="padding: 0px;">
                <input v-model="search" ref="searchBox" class="input" type="text" placeholder="Champion Name" @keyup.enter="selectEnter">
              </div>
            </div>
            <div class="columns" style="height: 400px;">
              <div class="column" style="overflow-y: scroll; padding: 0px; height: 100%;">
                <button :class="'button is-fullwidth buttonList' + (value.id === name ? ' is-info' : '')" v-for="value in championList" :key="value.id" @click="select(value.id)">{{ value.name }}</button>
              </div>
            </div>
          </div>
        </div>
        <button class="modal-close is-large" @click="toggle = false"></button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['name', 'version', 'champions', 'edit', 'player'],
  model: {
    prop: 'name',
    event: 'selected'
  },
  data () {
    return {
      // skillClass: 'title is-5 marginBOT tooltip is-tooltip-multiline is-tooltip-light',
      toggle: false,
      skillClass: 'title is-5 marginBOT',
      realname: '',
      title: '',
      tags: [],
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
      loading: false,
      search: ''
    }
  },
  methods: {
    selectEnter: function () {
      if (this.championList.length === 1) this.select(this.championList[0].id)
    },
    openModal: function () {
      this.toggle = true
      this.$nextTick(() => this.setFocus())
    },
    setFocus: function () {
      this.$refs.searchBox.focus()
    },
    loader: function () {
      if (this.name && !this.loading) {
        this.loading = true
        axios.get('https://ddragon.leagueoflegends.com/cdn/' + this.version + '/data/th_TH/champion/' + this.name + '.json').then((respon) => {
          this.loading = false
          let championData = respon.data.data[this.name]
          console.log(this.name, championData)
          this.tags = championData.tags
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
          setTimeout(() => {
            this.loader()
          }, 1000)
        })
      } else {
        this.realname = ''
        this.title = ''
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
    },
    select: function (id) {
      this.toggle = false
      this.search = ''
      this.$emit('selected', id)
      this.loader()
    }
  },
  watch: {
    name: function (value) {
      this.loader()
    }
  },
  computed: {
    nametip: function () {
      if (!this.realname || !this.title) return ''
      return '<span class="skillNameClass">' + this.realname + '</span>, ' + this.title + '<br><span class="skillNameClass">' + this.tags.toString() + '</span>'
    },
    championList: function () {
      if (!this.search) return this.champions
      const search = this.search.toLowerCase().trim()
      return this.champions.filter(champion => {
        return champion.name.toLowerCase().indexOf(search) >= 0
      })
    }
  }
}
</script>

<style scoped>
.marginBOT {
  margin-bottom: 3px !important;
  color: white;
}
.buttonList {
  margin: 6px 0px;
}
.paddingZero {
  padding: 0px;
}
.paddingSix {
  padding: 6px;
}
</style>
