import Vue from 'vue'
import Vuex from 'vuex'

import item from './modules/item'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    item: {
      namespaced: true,
      ...item
    }
  }
})

export default store
