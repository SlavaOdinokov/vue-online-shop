<template>
  <div class="popup-wrapper" ref="popup-wrapper">
    <div class="v-popup">
      <div class="v-popup__header">
        <span>{{popupTitle}}</span>
        <span>
          <i
            class="material-icons"
            @click="closePopup"
          >close</i>
        </span>
      </div>

      <div class="v-popup__content">
        <slot></slot>
      </div>

      <div class="v-popup__footer">
        <button
          class="v-popup__close-modal-btn btn"
          @click="closePopup"
        >Close</button>
        <button
          class="v-popup__submit-btn btn"
          @click="rightBtnAction"
        >{{rightBtnTitle}}</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'v-popup',
    props: {
      popupTitle: {
        type: String,
        default: 'Popup name'
      },
      rightBtnTitle: {
        type: String,
        default: 'Ok'
      }
    },
    data() {
      return {

      }
    },
    methods: {
      closePopup() {
        this.$emit('closePopup')
      },
      rightBtnAction() {
        this.$emit('rightBtnAction')
      }
    },
    mounted() {
      document.addEventListener('click', item => {
        if (item.target === this.$refs['popup-wrapper']) {
          this.closePopup()
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  .popup-wrapper {
    background: rgba(64, 64, 64, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .v-popup {
    z-index: 5;
    padding: 30px;
    position: fixed;
    top: 100px;
    min-width: 300px;
    max-width: 500px;
    background: #fff;
    box-shadow: 0 0 17px 0 #e7e7e7;

    &__header,
    &__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__header {
      margin-bottom: 30px;
    }
    &__content {
      margin-bottom: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__close-modal-btn {
      padding: 8px;
      margin-right: 10px;
      color: #fff;
      background: #d40000;
      transition: .2s;
      &:hover {
        background: #f82727;
      }
    }
    &__submit-btn {
      padding: 8px;
      color: #fff;
      background: #26ae68;
    }

    .material-icons {
      margin-left: 20px;
      cursor: pointer;
    }
  }
</style>
