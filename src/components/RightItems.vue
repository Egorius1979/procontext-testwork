<template>
  <div>
    <ul v-for="item in items" :key="item.name" class="item-flex">
      <ul v-for="unit in item.amount" :key="unit" class="">
        <li :style="{width: '20px', height: '20px', background: item.color, margin: '1px'}"/>
      </ul>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RightItems',
  props: ['list'],
  data () {
    return {}
  },
  computed: {
    items () {
      return this.$store.state.stateOfAllItems.filter(it => it.name.includes(this.list))
        .sort((a, b) => a.name.localeCompare(b.name))
    }
  }
}
</script>

<style lang="scss" scoped>
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
