import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listArray: new Array(5).fill('List ')
      .map((it, index) => it + (index + 1)),
    stateOfAllItems: [],
    currentList: '',
    isDeletedFromMixed: false
  },
  mutations: {
    SET_CURRENT_ITEMS (state, item) {
      state.stateOfAllItems = [...state.stateOfAllItems, item]
    },
    DELETE_ITEM (state, item) {
      state.stateOfAllItems = state.stateOfAllItems.filter(it => it.name !== item)
    },
    CHANGE_AMOUNT (state, currentItem) {
      state.stateOfAllItems = [...state.stateOfAllItems.filter(it => it.name !== currentItem.name), currentItem]
    },
    CHANGE_COLOR (state, currentItem) {
      state.stateOfAllItems = [...state.stateOfAllItems.filter(it => it.name !== currentItem.name), currentItem]
    },
    SET_CURRENT_LIST (state, currentList) {
      state.currentList = currentList
    },
    REDUCE_AMOUNT (state, reducedItem) {
      state.stateOfAllItems = [...state.stateOfAllItems.filter(it => it.name !== reducedItem.name), reducedItem]
    },
    SET_IS_DELETED_FROM_MIXED (state, value) {
      state.isDeletedFromMixed = value
    }

  },
  actions: {},
  modules: {}
})
