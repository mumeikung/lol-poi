<template>
   <div class="column">
    <h1 class="title is-1" :class="color">{{ color }}</h1>
    <h3 v-if="edit" class="title is-3 teamName">ทีม <input v-model="name" class="input is-large has-text-centered" type="text" placeholder="TEAM NAME" style="margin-bottom: 12px;"></h3>
    <h3 v-else class="title is-3 teamName">ทีม {{ name }}</h3>
    <hr>
    <champion-skill :edit="edit" v-for="(value, key) in championList" :player="key" :key="'c' + key" :version="version" v-model="championList[key]" :champions="champions" @swap="swaper"/>
    <button v-if="edit" class="button is-dark" @click="clearAll">Clear Team</button>
  </div>
</template>

<script>
import ChampionSkill from '@/components/Champion.vue'

export default {
  name: 'team',
  props: ['color', 'champions', 'version', 'edit'],
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
      const a = parseInt(p1.charAt(1))
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
