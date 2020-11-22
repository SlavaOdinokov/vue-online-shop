<template>
  <div class="v-header">
    <div class="v-header__content">
      <router-link :to="{name: 'main'}">
        <img src="../../assets/logo.png" alt="Logo">
      </router-link>

      <div class="search-field">
        <input
          type="text"
          class="search-field__input"
          v-model="searchValue"
        />
        <button class="search-field__btn">
          <i @click="search(searchValue)" class="material-icons">search</i>
        </button>
        <button class="search-field__btn">
          <i @click="clearSearchField" class="material-icons">clear</i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'v-header',
    props: {},
    data() {
      return {
        searchValue: ''
      }
    },
    computed: {
      ...mapGetters([
        'SEARCH_VALUE'
      ])
    },
    methods: {
      ...mapActions([
        'GET_SEARCH_VALUE'
      ]),
      search(value) {
        this.GET_SEARCH_VALUE(value)
        if (this.$route.path !== '/catalog') {
          this.$router.push('/catalog')
        }
      },
      clearSearchField() {
        this.searchValue = ''
        this.GET_SEARCH_VALUE()
        if (this.$route.path !== '/catalog') {
          this.$router.push('/catalog')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .v-header {
    background: #4e8d61;
    padding: $padding*2;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 20;
    box-shadow: 0px 5px 10px #356d2a;

    &__content {
      max-width: 900px;
      margin: 0 auto;
      padding: 0 $padding;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    img {
      width: 50px;
    }
  }

  .search-field {
    display: flex;
    justify-content: center;
    align-items: center;

    &__input {
      margin-right: 10px;
    }
    &__btn {
      margin: 0;
      padding: 0;
      border: none;
      background: transparent;
    }
  }
</style>
