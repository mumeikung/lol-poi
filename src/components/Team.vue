<template>
   <div class="column">
    <h1 class="title is-1" :class="color">{{ color }}</h1>
    <h3 class="title is-3 teamName">{{ name }}</h3>
    <champion-skill v-for="(value, key) in championList" :key="'c' + key" :version="version" :name="value"/>
    <hr>
    <input v-model="name" class="input has-text-centered" type="text" placeholder="TEAM NAME" style="margin-bottom: 12px;">
    <div class="columns" v-for="(value, key) in championList" :key="'s' + key">
      <div class="column">
        <div class="select">
          <select v-model="championList[key]">
            <option :value="null">เลือก</option>
            <option v-for="name in champions" :key="name" :value="name">{{ name }}</option>
          </select>
        </div>
      </div>
    </div>
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
}
</style>
