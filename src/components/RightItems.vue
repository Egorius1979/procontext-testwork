<template>
  <div>
    <ul v-for="item in items" :key="item.name" class="item-flex">
      <ul v-for="unit in item.amount" :key="unit" class="">
        <li :style="{width: '20px', height: '20px', background: item.color, margin: '1px'}" @click="reduceAmount(item)"/>
      </ul>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RightItems',
  props: ['items'],
  methods: {
    reduceAmount (item) {
      this.$store.commit('REDUCE_AMOUNT', { name: item.name, amount: item.amount - 1, color: item.color })
    }
  }
}
</script>

<style lang="scss">
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.item-flex {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 5px;
}
</style>
