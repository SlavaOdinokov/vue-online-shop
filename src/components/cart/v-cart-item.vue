<template>
  <div class="v-cart-item">
    <img
      class="v-cart-item__image"
      :src="`./images/${cart_item_data.image}`"
      :alt="cart_item_data.name"
    />
    <div class="v-cart-item__info">
      <p>{{cart_item_data.name}}</p>
      <p>{{cart_item_data.price | toFix | formatedPrice}}</p>
      <p>{{cart_item_data.article}}</p>
    </div>
    <div class="v-cart-item__quantity">
      <p>Quantity:</p>
      <span>
        <span class="v-cart-item__quantity-btn" @click="decItem">-</span>
          {{cart_item_data.quantity}}
        <span class="v-cart-item__quantity-btn" @click="incItem">+</span>
      </span>
    </div>
    <button class="v-cart-item__btn btn" @click="deleteFromCart">Delete</button>
  </div>
</template>

<script>
  import toFix from '../../filters/toFixed'
  import formatedPrice from '../../filters/price-format'

  export default {
    name: 'v-cart-item',
    props: {
      cart_item_data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      decItem() {
        this.$emit('decrement')
      },
      incItem() {
        this.$emit('increment')
      },
      deleteFromCart() {
        this.$emit('deleteFromCart')
      }
    },
    filters: { toFix, formatedPrice }
  }
</script>

<style lang="scss" scoped>
  .v-cart-item {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: $padding*2;
    margin-bottom: $margin*2;
    &__image {
      max-width: 50px;
    }
    &__quantity-btn {
      cursor: pointer;
      padding: $padding;
      box-shadow: 0 0 8px 0 #e0e0e0;
    }
    &__btn {
      background: #c90a0a;
    }
    &__btn:hover {
      background: #d83737;
    }
  }
</style>
