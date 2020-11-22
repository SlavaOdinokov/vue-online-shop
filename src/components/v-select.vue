<template>
  <div class="v-select">
    <p
      class="title"
      @click="areOptionsVisible = !areOptionsVisible"
    >{{selected}}</p>
    <div
      class="options"
      v-if="areOptionsVisible"
    >
      <p
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
      >
        {{option.name}}
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'v-select',
    props: {
      options: {
        type: Array,
        default() {
          return []
        }
      },
      selected: {
        type: String,
        default: ''
      },
      isExpanded: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        areOptionsVisible: false
      }
    },
    methods: {
      selectOption(option) {
        this.$emit('select', option)
        this.areOptionsVisible = false
      },
      hideSelect() {
        this.areOptionsVisible = false
      }
    },
    mounted() {
      document.addEventListener('click', this.hideSelect.bind(this), true)
    },
    beforeDestroy() {
      document.removeEventListener('click', this.hideSelect)
    }
  }
</script>

<style lang="scss" scoped>
  .v-select {
    position: relative;
    width: 150px;
    margin-bottom: 50px;
  }
  .v-select p {
    margin: 0;
  }
  .title {
    line-height: 26px;
    border: 1px solid #aeaeae;
    border-radius: 4px;
    cursor: pointer;
  }
  .options {
    border: 1px solid #aeaeae;
    border-radius: 4px;
    position: absolute;
    top: 28px;
    right: 0;
    width: 100%;
    cursor: pointer;
    background: #fff;
    z-index: 2;

    p {
      line-height: 26px;
    }
    p:hover { background: #e7e7e7; }
  }
</style>
