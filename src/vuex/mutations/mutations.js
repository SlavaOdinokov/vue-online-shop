export default {
  SET_SEARCH_VALUE: (state, value) => {
    state.searchValue = value
  },
  SWITCH_MOBILE: (state) => {
    state.isMobile = true
    state.isTablet = false
    state.isDesktop = false
  },
  SWITCH_TABLET: (state) => {
    state.isMobile = false
    state.isTablet = true
    state.isDesktop = false
  },
  SWITCH_DESKTOP: (state) => {
    state.isMobile = false
    state.isTablet = false
    state.isDesktop = true
  },
  SET_PRODUCTS_TO_STATE: (state, products) => {
    state.products = products
  },
  SET_CART: (state, product) => {
    if (state.cart.length) {
      let isProductExist = false
      state.cart.map(item => {
        if (item.article === product.article) {
          isProductExist = true
          item.quantity++
        }
      })

      if (!isProductExist) {
        state.cart.push(product)
      }
    } else {
      state.cart.push(product)
    }
  },
  REMOVE_FROM_CART: (state, index) => {
    state.cart.splice(index, 1)
  },
  DEC: (state, index) => {
    if (state.cart[index].quantity > 1) {
      state.cart[index].quantity--
    }
  },
  INC: (state, index) => {
    state.cart[index].quantity++
  }
}
