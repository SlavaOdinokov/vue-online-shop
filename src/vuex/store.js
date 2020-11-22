import Vue from 'vue'
import Vuex from 'vuex'

import commonActions from './actions/actions'
import apiActions from './actions/api'
import mutations from './mutations/mutations'
import getters from './getters/getters'

const actions = {...commonActions, ...apiActions}

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    searchValue: '',
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    products: [],
    cart: []
  },
  mutations,
  actions,
  getters
})

export default store
