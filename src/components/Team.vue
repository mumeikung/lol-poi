<template>
   <div class="column">
    <h1 class="title is-1" :class="color">{{ color }}</h1>
    <h3 class="title is-3 teamName">ทีม {{ name }}</h3>
    <hr>
    <champion-skill v-for="(value, key) in championList" :key="'c' + key" :version="version" :name="value"/>
    <hr>
    <input v-model="name" class="input has-text-centered" type="text" placeholder="TEAM NAME" style="margin-bottom: 12px;">
    <div class="columns is-mobile" v-for="(value, key) in championList" :key="'s' + key">
      <div class="column is-2 has-text-right">
        <button v-if="key !== 'p1' && value !== null" class="button is-dark" @click="swaper(key, 'up')">ขึ้น</button>
      </div>
      <div class="column is-8">
        <div class="select">
          <select v-model="championList[key]">
            <option :value="null">เลือก</option>
            <option v-for="value in champions" :key="value.id" :value="value.id">{{ value.name }}</option>
          </select>
        </div>
      </div>
      <div class="column is-2 has-text-left">
        <button v-if="key !== 'p5' && value !== null" class="button is-dark" @click="swaper(key, 'down')">ลง</button>
      </div>
    </div>
    <button class="button is-dark" @click="clearAll">Clear Team</button>
  </div>
</template>

<script>
import ChampionSkill from '@/components/Champion.vue'

export default {
  name: 'team',
  props: ['color', 'champions', 'version'],
  components: {
    'champion-skill': ChampionSkill
  },
  data () {
    return {
      name: '',
      championList: {
        p1: null,
        p2: null,
        p3: null,
        p4: null,
        p5: null
      }
    }
  },
  watch: {
    version: function () {
      this.championList = {
        p1: null,
        p2: null,
        p3: null,
        p4: null,
        p5: null
      }
    }
  },
  methods: {
    swaper: function (target, position) {
      const p1 = target
      const a = parseInt(target.charAt(1))
      let b = '0'
      if (position === 'up') b = a - 1
      if (position === 'down') b = a + 1
      const p2 = 'p' + b
      if (this.championList[p1] !== undefined && this.championList[p2] !== undefined) {
        const temp = this.championList[p1]
        this.championList[p1] = this.championList[p2]
        this.championList[p2] = temp
      }
    },
    clearAll: function () {
      this.name = ''
      this.championList = {
        p1: null,
        p2: null,
        p3: null,
        p4: null,
        p5: null
      }
    }
  }
}
</script>

<style scoped>
.red {
  color: red;
  text-transform: uppercase;
}
.blue {
  color: blue;
  text-transform: uppercase;
}
.teamName {
  font-weight: 900;
  color: white;
}
.select {
  margin: 0px 18px;
}
</style>
