<template>
  <div class="v-product-page">
    <router-link :to="{ name: 'cart', params: {cart_data: CART} }">
      <div class="v-catalog__link-to-cart">Cart: {{CART.length}}</div>
    </router-link>

    <h2 class="v-product-page__name">Product name: {{product.name}}</h2>
    <div class="v-product-page__content">
      <img
        class="v-product-page__image"
        :src="`./images/${product.image}`"
        :alt="product.name"
      />
      <div class="v-product-page__desc">
        <p class="v-product-page__price">Product name: {{product.name}}</p>
        <p class="v-product-page__price">Product price: {{product.price | toFix | formatedPrice}}</p>
        <p class="v-product-page__price">Product category: {{product.category}}</p>
        <p class="v-product-page__price">Product article: {{product.article}}</p>
        <button
          class="v-catalog-item__add-to-cart-btn btn"
          @click="addToCart"
        >Add to cart</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import toFix from '../../filters/toFixed'
  import formatedPrice from '../../filters/price-format'

  export default {
    name: 'v-product-page',
    props: {},
    data() {
      return {}
    },
    filters: { toFix, formatedPrice },
    computed: {
      ...mapGetters([
        'PRODUCTS',
        'CART'
      ]),
      product() {
        let result = {}
        this.PRODUCTS.forEach(item => {
          if (item.article === this.$route.query.product) {
            result = item
          }
        })
        return result
      }
    },
    methods: {
      ...mapActions([
        'GET_PRODUCTS_FROM_API',
        'ADD_TO_CART'
      ]),
      addToCart() {
        this.ADD_TO_CART(this.product)
      },
    },
    mounted() {
      this.GET_PRODUCTS_FROM_API()
    }
  }
</script>

<style lang="scss">
  .v-product-page {
    padding-top: 150px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &__name {
      margin-bottom: 50px;
    }
    &__content {
      display: flex;
    }
    &__image {
      margin-right: 50px;
    }
    &__desc {
      text-align: left;
      font-size: 24px;
      font-weight: 500;
    }
  }
</style>
