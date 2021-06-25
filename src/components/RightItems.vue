<template>
  <div>
      <transition-group name="list"
                        class="item-flex"
                        tag="ul"
                        v-for="item in items"
                        :key="item.name"
      >
        <li v-for="unit in item.amount"
            :key="unit"
            :style="{width: '20px', height: '20px', background: item.color, margin: '1px'}"
            @click="reduceAmount(item)"
        >
        </li>
      </transition-group>
  </div>
</template>

<script>
export default {
  name: 'RightItems',
  props: ['items'],
  methods: {
    reduceAmount (item) {
      this.$store.commit('SET_CURRENT_LIST', this.list)
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

.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-move {
  transition: transform 0.8s ease;
}

</style>
