<template>
  <div class="v-cart">
    <router-link :to="{ name: 'catalog' }">
      <div class="v-catalog__link-to-cart">Back to catalog</div>
    </router-link>
    <h2>Cart</h2>
    <p v-if="!cart_data.length">There are no products in cart...</p>
    <v-cart-item
      v-for="(item, index) in cart_data"
      :key="item.article"
      :cart_item_data="item"
      @deleteFromCart="deleteFromCart(index)"
      @decrement="decrement(index)"
      @increment="increment(index)"
    />
    <div class="v-cart__total">
      <p class="total__title">Total:</p>
      <p>{{cartTotalCost | toFix | formatedPrice}}</p>
    </div>
  </div>
</template>

<script>
  import vCartItem from './v-cart-item'
  import toFix from '../../filters/toFixed'
  import formatedPrice from '../../filters/price-format'
  import { mapActions } from 'vuex'

  export default {
    name: 'v-cart',
    components: { vCartItem },
    props: {
      cart_data: {
        type: Array,
        default() {
          return []
        }
      }
    },
    computed: {
      cartTotalCost() {
        let result = []

        if (this.cart_data.length) {
          for (let item of this.cart_data) {
            result.push(item.price * item.quantity)
          }

          result = result.reduce((sum, el) => {
            return sum + el
          })

          return result
        } else {
          return 0
        }
      }
    },
    methods: {
      ...mapActions([
        'DELETE_FROM_CART',
        'DEC_CART_ITEM',
        'INC_CART_ITEM'
      ]),
      decrement(index) {
        this.DEC_CART_ITEM(index)
      },
      increment(index) {
        this.INC_CART_ITEM(index)
      },
      deleteFromCart(index) {
        this.DELETE_FROM_CART(index)
      }
    },
    filters: { toFix, formatedPrice },
  }
</script>

<style lang="scss" scoped>
  .v-cart {
    padding-top: 100px;
    margin-bottom: 150px;
    &__total {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      padding: $padding*2;
      display: flex;
      justify-content: center;
      background: #26ae68;
      color: #fff;
      font-size: 26px;
      font-weight: 700;
    }
  }
  .total__title {
    margin-right: $margin*2;
  }
</style>
