<template>
  <div class="item-flex">
    <input type="checkbox"
           :id="parent+item"
           :value="`${parent} ${item}`"
           v-model="isChecked"
           @change="hasChosen"
    >
    <label :for="parent+item">
      {{ item }}
    </label>
    <input type="text"
           size="2"
           :value="amount || itemAmount"
           class="item-flex__item-amount"
           @change="setAmount($event)"
    >
    <input type="color"
           v-model="itemColor"
           class="item-flex__item-color"
           @change="setColor"
    >
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
    hasChosen () {
      this.$store.commit('DELETE_ITEM', `${this.parent} ${this.item}`)
      this.$store.commit('SET_CURRENT_LIST', this.parent)

      if (this.isDeletedFromMixed) {
        this.$store.commit('SET_IS_DELETED_FROM_MIXED', false)
      }

      if (this.isChecked[0]) {
        this.$emit('itemIsChecked', this.item, true)
        return this.$store.commit('SET_CURRENT_ITEMS',
          { name: `${this.parent} ${this.item}`, amount: this.itemAmount, color: this.itemColor })
      }
      this.$emit('itemIsChecked', this.item, false)
    },
    setAmount (e) {
      if (this.isDeletedFromMixed) {
        this.$store.commit('SET_IS_DELETED_FROM_MIXED', false)
      }
      this.itemAmount = +e.target.value > 0 ? +e.target.value : 0

      if (this.isChecked[0]) {
        this.$store.commit('SET_CURRENT_LIST', this.parent)
        this.$store.commit('CHANGE_AMOUNT',
          { name: `${this.parent} ${this.item}`, amount: this.itemAmount, color: this.itemColor })
      }
    },
    setColor () {
      if (this.isChecked[0]) {
        this.$store.commit('SET_CURRENT_LIST', this.parent)
        this.$store.commit('CHANGE_COLOR',
          { name: `${this.parent} ${this.item}`, color: this.itemColor })
      }
    }
  },
  watch: {
    amount (value) {
      if (value >= 0) {
        this.itemAmount = value
      }
    },
    checked (value) {
      this.isChecked = value[0] ? [`${this.parent} ${this.item}`] : []
      this.hasChosen()
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
    margin-left: 30%;
    border: none;
    @media (min-width: 1440px) {
      margin-left: 50%;
    }
   }
}
</style>
