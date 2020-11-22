<template>
  <div class="v-main-page">
    <h1>Online-shop</h1>
    <p>
      <router-link :to="{name: 'catalog'}">
        to catalog
      </router-link>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'v-main-page',
    props: {},
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .v-main-page {
    padding-top: 100px;
  }
</style>
