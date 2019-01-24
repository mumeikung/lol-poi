<template>
  <div id="app">
    <div class="container is-fluid">
      <div class="columns">
        <div class="column">
          <h1 class="title is-1" style="color: blue;">BLUE</h1>
          <input v-model="blueTeam" class="input is-large has-text-centered teamName" type="text" placeholder="BLUE TEAM">
          <div class="columns" v-for="(value, key) in blueList" :key="key">
            <div class="column">
              <div class="select">
                <select v-model="blueList[key]">
                  <option :value="null">เลือก</option>
                  <option v-for="name in nameList" :key="name + '1'" :value="name">{{ name }}</option>
                </select>
              </div>
              <champion-skill :name="value"/>
            </div>
          </div>
        </div>
        <div class="column">
          <h1 class="title is-1" style="color: red;">RED</h1>
          <input v-model="redTeam" class="input is-large has-text-centered teamName" type="text" placeholder="RED TEAM">
          <div class="columns" v-for="(value, key) in redList" :key="key">
            <div class="column">
              <div class="select">
                <select v-model="redList[key]">
                  <option :value="null">เลือก</option>
                  <option v-for="name in nameList" :key="name + '1'" :value="name">{{ name }}</option>
                </select>
              </div>
              <champion-skill :name="value"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DATA from '@/champion.json'
import CHAM from '@/components/Champion.vue'

export default {
  name: 'app',
  components: {
    'champion-skill': CHAM
  },
  data () {
    return {
      nameList: [],
      blueTeam: '',
      redTeam: '',
      redList: {
        p1: null,
        p2: null,
        p3: null,
        p4: null,
        p5: null
      },
      blueList: {
        p1: null,
        p2: null,
        p3: null,
        p4: null,
        p5: null
      }
    }
  },
  created () {
    console.log(DATA.type, DATA.version)
    let name = []
    for (const key in DATA.data) {
      if (DATA.data.hasOwnProperty(key)) {
        name.push(key)
      }
    }
    this.nameList = name
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 20px;
}
.teamName {
  font-weight: 900;
}
</style>
