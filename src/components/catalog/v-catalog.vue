<template>
  <div class="v-catalog">
    <v-notification
      :messages="messages"
      :timeout="4000"
    />

    <router-link :to="{ name: 'cart', params: {cart_data: CART} }">
      <div class="v-catalog__link-to-cart">Cart: {{CART.length}}</div>
    </router-link>
    <h2>Catalog</h2>

    <div class="v-catalog__filters">
      <v-select
        :selected="selected"
        :options="categories"
        :isExpanded="IS_DESKTOP"
        @select="sortByCategories"
      />
      <div class="v-catalog__range-slider">
        <input
          type="range"
          min="0"
          max="10000"
          step="100"
          v-model.number="minPrice"
          @change="setRangeSlider"
        />
        <input
          type="range"
          min="0"
          max="10000"
          step="100"
          v-model.number="maxPrice"
          @change="setRangeSlider"
        />
      </div>
      <div class="v-catalog__range-values">
        <p>Min: {{minPrice}}</p>
        <p>Max: {{maxPrice}}</p>
      </div>
    </div>

    <div class="v-catalog__list">
      <v-catalog-item
        v-for="product in filteredProducts"
        :key="product.article"
        :product_data="product"
        @addToCart="addToCart"
        @productClick="productClick"
      />
    </div>
  </div>
</template>

<script>
  import vCatalogItem from './v-catalog-item'
  import vSelect from '../v-select'
  import vNotification from '../notifications/v-notification'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'v-catalog',
    components: { vCatalogItem, vSelect, vNotification },
    props: {},
    data() {
      return {
        categories: [
          { name: 'Все', value: 'ALL' },
          { name: 'Мужские', value: 'м' },
          { name: 'Женские', value: 'ж' },
        ],
        selected: 'Все',
        sortedProducts: [],
        minPrice: 0,
        maxPrice: 10000,
        messages: []
      }
    },
    computed: {
      ...mapGetters([
        'SEARCH_VALUE',
        'IS_MOBILE',
        'IS_TABLET',
        'IS_DESKTOP',
        'PRODUCTS',
        'CART'
      ]),
      filteredProducts() {
        if (this.sortedProducts.length) {
          return this.sortedProducts
        } else {
          return this.PRODUCTS
        }
      }
    },
    methods: {
      ...mapActions([
        'GET_PRODUCTS_FROM_API',
        'ADD_TO_CART'
      ]),
      sortByCategories(category) {
        this.sortedProducts = [...this.PRODUCTS]
        this.sortedProducts = this.sortedProducts.filter(item => {
          return item.price >= this.minPrice && item.price <= this.maxPrice
        })

        if (category) {
          this.sortedProducts = this.sortedProducts.filter(item => {
            this.selected = category.name
            return item.category === category.name
          })
        }
      },
      addToCart(data) {
        this.ADD_TO_CART(data)
          .then(() => {
            this.messages.unshift(
              {
                id: Date.now().toLocaleString(),
                name: 'Товар добавлен в корзину',
                icon: 'check_circle'
              }
            )
          })
      },
      setRangeSlider() {
        if (this.minPrice > this.maxPrice) {
          const temp = this.maxPrice
          this.maxPrice = this.minPrice
          this.minPrice = temp
        }
        this.sortByCategories()
      },
      sortProductsBySearchValue(value) {
        this.sortedProducts = [...this.PRODUCTS]

        if (value) {
          this.sortedProducts = this.sortedProducts.filter(item => {
            return item.name.toLowerCase().includes(value.toLowerCase())
          })
        } else {
          this.sortedProducts = this.PRODUCTS
        }
      },
      productClick(article) {
        this.$router.push({ name: 'product', query: {'product': article} })
      }
    },
    watch: {
      SEARCH_VALUE() {
        this.sortProductsBySearchValue(this.SEARCH_VALUE)
      }
    },
    mounted() {
      this.GET_PRODUCTS_FROM_API()
        .then(response => {
          if (response.data) {
            console.log('Data arrived!')
            this.sortByCategories()
            this.sortProductsBySearchValue(this.SEARCH_VALUE)
          }
        })
    }
  }
</script>

<style lang="scss">
  .v-catalog {
    padding-top: 100px;

    &__list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }
    &__link-to-cart {
      position: absolute;
      top: 100px;
      right: 10px;
      color: #000;
      padding: $padding*2;
      border: 1px solid #aeaeae;
      cursor: pointer;
    }
    &__filters {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
    }

    &__range-slider {
      width: 200px;
      margin: auto 16px;
      text-align: center;
      position: relative;
    }
    &__range-slider svg,
    &__range-slider input[type=range] {
      position: absolute;
      left: 0;
      bottom: 0;
    }
    input[type=range]::-webkit-slider-thumb {
      z-index: 2;
      position: relative;
      top: -6px;
    }
    input[type=range]{
      -webkit-appearance: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
      width: 300px;
      height: 5px;
      background: #ddd;
      border: none;
      border-radius: 3px;
    }
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      border: 1.5px solid #C1C1C1;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: #EDEDED;
    }
    input[type=range]:focus {
      outline: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
      width: 100%;
      height: 5px;
      box-shadow: 1px 1px 1px #C6C6C6, 0px 0px 1px #787878;
      border-radius: 2px;
      border: 0.2px solid #787878;
    }
  }
</style>
