<template>
  <div id="app">
    <div class="container is-fluid">
      <div class="columns is-mobile" v-if="version">
        <team :version="version" :champions="championsList" color="blue"/>
        <team :version="version" :champions="championsList" color="red"/>
      </div>
      <div class="columns">
        <div class="column">
          VERSION
          <select v-model="version">
            <option v-for="ver in versionList" :key="ver" :value="ver">{{ ver }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Team from '@/components/Team.vue'

export default {
  name: 'app',
  components: {
    'team': Team
  },
  data () {
    return {
      championsList: {},
      versionList: [],
      version: null
    }
  },
  watch: {
    version: function (value) {
      axios.get('https://ddragon.leagueoflegends.com/cdn/' + value + '/data/th_TH/champion.json').then(resp => {
        const championData = resp.data
        let name = []
        for (const key in championData.data) {
          if (championData.data.hasOwnProperty(key)) {
            name.push({
              id: championData.data[key].id,
              name: championData.data[key].name
            })
          }
        }
        name.sort(function (a, b) {
          return a.name.localeCompare(b.name)
        })
        this.championsList = name
      }).catch(error => {
        console.error('champion', value, error)
      })
    }
  },
  created () {
    axios.get('https://ddragon.leagueoflegends.com/api/versions.json').then(resp => {
      const versionData = resp.data
      let version = []
      for (let i = 0; i < 20; i++) version.push(versionData[i])
      this.version = version[0]
      this.versionList = version
    }).catch(error => {
      console.error('version', this.version, error)
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding-top: 20px;
  width: 100%;
  color: white;
  background-color: black;
}
body {
  min-width: 750px;
}
.columns {
  margin: 0px !important;
}
</style>
