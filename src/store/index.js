import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listArray: new Array(5).fill('List ')
      .map((it, index) => it + (index + 1)),
    stateOfAllItems: []
  },
  mutations: {
    SET_CURRENT_ITEMS (state, item) {
      state.stateOfAllItems = [...state.stateOfAllItems, item]
    },
    DELETE_ITEM (state, item) {
      state.stateOfAllItems = state.stateOfAllItems.filter(it => it.name !== item)
    }
  },
  actions: {},
  modules: {}
})
