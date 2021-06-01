<template>
  <div>
    <input type="checkbox" :value="`${parent} ${item}`" v-model="isChecked" @change="hasChosen">
    <span>{{ item }}</span>
    <input type="color" :value="itemColor">
    <input type="number" :value="itemAmount">
    {{ itemAmount }} {{ itemColor }} {{ isChecked }} {{ checked }}
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
  methods: {
    hasChosen () {
      if (this.isChecked[0]) {
        return this.$store.commit('SET_CURRENT_ITEMS',
          { name: `${this.parent} ${this.item}`, amount: this.itemAmount, color: this.itemColor })
      }
      return this.$store.commit('DELETE_ITEM', `${this.parent} ${this.item}`)
    }
  }
}
</script>

<style scoped>

</style>
