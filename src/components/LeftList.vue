<template>
  <div>
    <div class="arrow"
         :class="!unwrapped ? 'arrow-down' : 'arrow-right'"
         @click="wrap"
    />
    <input type="checkbox"
           :id="list"
           :value="list"
           v-model="checked"
    >
    <span>{{ list }}</span>
    <div v-show="unwrapped"
         class="items">
      <left-items v-for="item in items"
                  :item="item"
                  :key="item"
                  :parent="list"
                  :checked="checked[0]"
      />
    </div>
  </div>
</template>

<script>
import LeftItems from '@/components/LeftItems'

export default {
  name: 'LeftList',
  components: { LeftItems },
  props: ['list'],
  data () {
    return {
      checked: [],
      unwrapped: false,
      items: new Array(Math.floor(Math.random() * 7 + 4))
        .fill('Item ').map((it, index) => it + (index + 1))
    }
  },
  methods: {
    wrap () {
      this.unwrapped = !this.unwrapped
    }
  }
}
</script>

<style lang="scss" scoped>
.arrow {
  display: inline-block;
  margin-right: 5px;
  width: 0;
  height: 0;
  border: 10px solid transparent;
}

.arrow-down {
  border-top-color: orangered;
  border-bottom: 0;
}

.arrow-right {
  border-left-color: darkgreen;
  border-right: 0;
  margin-left: 10px;
}

.items {
  margin: 5px 40px;
}
</style>
