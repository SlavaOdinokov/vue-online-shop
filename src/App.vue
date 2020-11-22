<template>
  <div id="app">
    <v-main-wrapper />
  </div>
</template>

<script>
  import vMainWrapper from './components/v-main-wrapper'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'App',
    components: {
      vMainWrapper
    },
    computed: {
      ...mapGetters([
        'IS_MOBILE',
        'IS_TABLET',
        'IS_DESKTOP'
      ])
    },
    methods: {
      ...mapActions([
        'SET_MOBILE',
        'SET_TABLET',
        'SET_DESKTOP'
      ])
    },
    mounted() {
      window.addEventListener('resize', () => {
        if (window.innerWidth > 1200) {
          this.SET_DESKTOP()
          console.log('DESKTOP ', this.IS_DESKTOP)
        } else if (window.innerWidth > 768) {
          this.SET_TABLET()
          console.log('TABLET ', this.IS_TABLET)
        } else {
          this.SET_MOBILE()
          console.log('MOBILE ', this.IS_MOBILE)
        }
      })
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
