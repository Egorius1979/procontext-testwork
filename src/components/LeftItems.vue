<template>
  <div class="item-flex">
    <input type="checkbox" :value="`${parent} ${item}`" v-model="isChecked" @change="hasChosen">
    <span>{{ item }}</span>
    <input type="text" size="2" :value="amount || itemAmount"  class="item-flex__item-amount" @change="setAmount($event)" >
    <input type="color" v-model="itemColor" class="item-flex__item-color" @change="setColor">
  </div>
</template>

<script>
export default {
  name: 'LeftItems',
  props: ['item', 'parent', 'checked'],
  data () {
    return {
      itemAmount: Math.floor(Math.random() * 51),
      itemColor: `#${(0x1000000 + (Math.random()) * 0xffffff).toString(16).substring(1, 7)}`,
      isChecked: []
    }
  },
  computed: {
    amount () {
      return this.$store.state?.stateOfAllItems.filter(it => it.name === this.isChecked[0])[0]?.amount
    },
    isDeletedFromMixed () {
      return this.$store.state.isDeletedFromMixed
    }
  },
  methods: {
    toNull () {
      this.itemAmount = 0
    },
    hasChosen () {
      this.$store.commit('SET_CURRENT_LIST', this.parent)

      if (this.isDeletedFromMixed) {
        this.$store.commit('SET_IS_DELETED_FROM_MIXED', false)
      }

      if (this.isChecked[0]) {
        return this.$store.commit('SET_CURRENT_ITEMS',
          { name: `${this.parent} ${this.item}`, amount: +this.itemAmount, color: this.itemColor })
      }
      this.$store.commit('DELETE_ITEM', `${this.parent} ${this.item}`)
    },
    setAmount (e) {
      if (this.isDeletedFromMixed) {
        this.$store.commit('SET_IS_DELETED_FROM_MIXED', false)
      }
      if (+e.target.value <= 0) {
        this.itemAmount = 0
      } else {
        this.itemAmount = +e.target.value
      }
      if (this.isChecked[0]) {
        this.$store.commit('SET_CURRENT_LIST', this.parent)
        this.$store.commit('CHANGE_AMOUNT',
          { name: `${this.parent} ${this.item}`, amount: +e.target.value, color: this.itemColor })
      }
    },
    setColor () {
      if (this.isChecked[0]) {
        this.$store.commit('SET_CURRENT_LIST', this.parent)
        this.$store.commit('CHANGE_COLOR',
          { name: `${this.parent} ${this.item}`, amount: +this.itemAmount, color: this.itemColor })
      }
    }
  },
  watch: {
    amount (value) {
      if (value === 0) {
        this.itemAmount = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
input[type=checkbox] {
  transform: scale(1.5);
  margin-right: 10px;
}

.item-flex {
  display: flex;
  align-items: center;

  &__item-color {
    border: none;
    padding: 0;
    background: none;
  }

  &__item-amount {
    margin-left: 20%;
    border: none;
    @media (min-width: 1440px) {
      margin-left: 50%;
    }
   }
}
</style>
