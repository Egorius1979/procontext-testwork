<template>
    <div class="right-list">
      <div class="right-list__title-button">
        <span>{{ list }}</span>
        <div v-if="items.filter(it => it.amount > 0).length > 1">
          <button v-if="!isMixed" @click="mixItems">Перемешать</button>
          <button v-else @click="sortItems">Сортировать</button>
        </div>
      </div>
      <right-items v-if="!isMixed" :items="items"/>
      <div id="mixed-items" v-else class="item-flex">
        <ul v-for="unit in mixedState" :key="unit.id">
          <li :style="{width: '20px', height: '20px', background: unit.color, margin: '1px'}" @click="reduceAmount(unit)"/>
        </ul>
      </div>
    </div>
</template>

<script>
import RightItems from '@/components/RightItems'

export default {
  name: 'RightList',
  components: { RightItems },
  props: ['list'],
  data () {
    return {
      isMixed: false,
      mixedState: null
    }
  },
  computed: {
    items () {
      return this.$store.state.stateOfAllItems.filter(it => it.name.includes(this.list))
        .sort((a, b) => a.name.localeCompare(b.name))
    },
    currentList () {
      return this.$store.state.currentList
    },
    isDeletedFromMixed () {
      return this.$store.state.isDeletedFromMixed
    }
  },
  methods: {
    mixItems () {
      this.isMixed = true
      this.mixedState = this.items.reduce((acc, rec) => {
        const itemsArray = new Array(rec.amount).fill(null)
          .map((it, index) => ({ name: rec.name, id: `${rec.name}${index + 1}`, color: rec.color }))
        return [...acc, ...itemsArray]
      }, []).sort(() => Math.random() - 0.5)
    },
    sortItems () {
      this.isMixed = false
    },
    reduceAmount (item) {
      if (!this.isDeletedFromMixed) {
        this.$store.commit('SET_IS_DELETED_FROM_MIXED', true)
      }
      const amount = this.mixedState.filter(it => it.name === item.name).length - 1
      this.$store.commit('REDUCE_AMOUNT',
        { name: item.name, amount, color: item.color })

      this.mixedState = this.mixedState.filter(it => it.id !== item.id)
    }
  },
  watch: {
    items () {
      if (this.currentList === this.list && this.isMixed && !this.isDeletedFromMixed) {
        this.mixItems()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.right-list {
  border: 1px solid black;
  margin-bottom: 5px;
  padding: 10px;

  &__title-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  button {
    padding: 5px 7px;
    background: #00acc1;
    color: #fff;
    border: none;
    border-radius: 5px;
    margin-bottom: 5px;
    cursor: pointer;
  }
}
</style>
