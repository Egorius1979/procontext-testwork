<template>
  <div class="list-flex">
    <input type="checkbox" :value="`${parent} ${item}`" v-model="isChecked" @change="hasChosen">
    <span>{{ item }}</span>
    <input type="text" size="1" v-model="itemAmount" class="list-flex__item-amount" @change="setAmount">
    <input type="color" :value="itemColor" class="list-flex__item-color">
<!--    {{ itemAmount }}-->
<!--    {{ itemColor }}  {{ checked }}-->
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
      isChecked: [],
      amount: 0
    }
  },
  methods: {
    hasChosen () {
      if (this.isChecked[0]) {
        return this.$store.commit('SET_CURRENT_ITEMS',
          { name: `${this.parent} ${this.item}`, amount: +this.itemAmount, color: this.itemColor })
      }
      return this.$store.commit('DELETE_ITEM', `${this.parent} ${this.item}`)
    },
    setAmount () {
      if (this.itemAmount <= 0) {
        this.itemAmount = 0
      }
      if (this.isChecked[0]) {
        this.$store.commit('CHANGE_AMOUNT',
          { name: `${this.parent} ${this.item}`, amount: +this.itemAmount, color: this.itemColor })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.list-flex {
  display: flex;
  align-items: center;

  &__item-color {
    border: none;
    padding: 0;
    background: none;
  }

  &__item-amount {
    width: fit-content;
    margin-left: 50%;
    border: none;
   }
}
</style>
