<template>
  <div class="v-notification">
    <transition-group
      name="transition-notification"
      class="v-notification__transition"
    >
      <div
        class="v-notification__content"
        v-for="message in messages"
        :key="message.id"
        :class="message.icon"
      >
        <div class="v-notification__content-text">
          <span>{{message.name}}</span>
          <i class="material-icons">{{message.icon}}</i>
        </div>
        <div class="v-notification__content-buttons">
          <button v-if="rightBtn.length">{{rightBtn}}</button>
          <button v-if="leftBtn.length">{{leftBtn}}</button>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
  export default {
    name: 'v-notification',
    props: {
      messages: {
        type: Array,
        default() {
          return []
        }
      },
      rightBtn: {
        type: String,
        default: ''
      },
      leftBtn: {
        type: String,
        default: ''
      },
      timeout: {
        type: Number,
        default: 3000
      }
    },
    data() {
      return {}
    },
    methods: {
      hideNotification() {
        if (this.messages.length) {
          setTimeout(() => {
            this.messages.splice(this.messages.length - 1, 1)
          }, this.timeout)
        }
      }
    },
    watch: {
      messages() {
        this.hideNotification()
      }
    },
    mounted() {
      this.hideNotification()
    }
  }
</script>

<style lang="scss" scoped>
  .v-notification {
    position: fixed;
    top: 110px;
    right: 16px;
    z-index: 10;

    &__transition {
      display: flex;
      flex-direction: column;
    }
    &__content {
      padding: $padding*2;
      margin-bottom: $margin*2;
      border-radius: $radius;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      &.error {
        background: red;
      }
      &.warning {
        background: orange;
      }
      &.check_circle {
        background: #00af49;
      }
    }
    &__content-text {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .material-icons {
      margin-left: 15px;
    }
  }

  .transition-notification {
    &-enter {
      transform: translateX(120px);
      opacity: 0;
    }
    &-enter-active {
      transition: all .6s;
    }
    &-enter-to {
      opacity: 1;
    }
    &-leave {
      height: 50px;
      opacity: 1;
    }
    &-leave-active {
      transition: all .6s;
      /* transition: transform .6s, opacity .6s, height .6s .2s; */
    }
    &-leave-to {
      height: 0;
      transform: translateX(120px);
      opacity: 0;
    }
    &-move {
      transition: all .6s;
    }
  }
</style>
