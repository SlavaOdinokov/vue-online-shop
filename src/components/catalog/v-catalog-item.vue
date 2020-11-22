<template>
  <div class="v-catalog-item">

    <v-popup
      v-if="isPopupInfoVisible"
      @closePopup="closePopupInfo"
      @rightBtnAction="addToCart"
      :popupTitle="product_data.name"
      rightBtnTitle="Add to cart"
    >
      <img
        class="v-catalog-item__image"
        :src="`./images/${product_data.image}`"
        :alt="product_data.name"
      />
      <div class="v-catalog-item__desc">
        <p class="v-catalog-item__name">{{product_data.name}}</p>
        <p class="v-catalog-item__price">{{product_data.price | toFix | formatedPrice}}</p>
        <p class="v-catalog-item__price">{{product_data.category}}</p>
      </div>
    </v-popup>

    <img
      class="v-catalog-item__image cursor"
      :src="`./images/${product_data.image}`"
      :alt="product_data.name"
      @click="productClick"
    />
    <p @click="productClick" class="v-catalog-item__name cursor">{{product_data.name}}</p>
    <p class="v-catalog-item__price">{{product_data.price | toFix | formatedPrice}}</p>

    <div class="v-catalog-item__btn-group">
      <button
        class="v-catalog-item__show-info-btn btn"
        @click="showPopupInfo"
      >Show info</button>
      <button
        class="v-catalog-item__add-to-cart-btn btn"
        @click="addToCart"
      >Add to cart</button>
    </div>
  </div>
</template>

<script>
  import vPopup from '../popup/v-popup'
  import toFix from '../../filters/toFixed'
  import formatedPrice from '../../filters/price-format'

  export default {
    name: 'v-catalog-item',
    components: { vPopup },
    props: {
      product_data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        isPopupInfoVisible: false
      }
    },
    filters: { toFix, formatedPrice },
    methods: {
      addToCart() {
        this.$emit('addToCart', this.product_data)
      },
      showPopupInfo() {
        this.isPopupInfoVisible = true
      },
      closePopupInfo() {
        this.isPopupInfoVisible = false
      },
      productClick() {
        this.$emit('productClick', this.product_data.article)
      }
    },
    mounted() {
      this.$set(this.product_data, 'quantity', 1)
    }
  }
</script>

<style lang="scss">
  .v-catalog-item {
    flex-basis: 25%;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: $padding*2;
    margin-bottom: $margin*2;
    margin-right: $margin;

    &__image {
      width: 100px;
    }
    &__desc {
      margin-left: 30px;
    }
    &__btn-group {
      display: flex;
      flex-direction: column;
    }
    &__show-info-btn {
      margin-bottom: 10px;
    }
  }

  .cursor {
    cursor: pointer;
  }
</style>
