<template>
  <div>
    <div class="list-flex">
      <div class="arrow"
           :class="!unwrapped ? 'arrow-right' : 'arrow-down'"
           @click="wrap"
      />
      <div :class="isPartly ? 'checkbox' : ''">
        <input type="checkbox"
               :id="list"
               :value="list"
               v-model="checked"

        >
        <label :for="list">
          {{ list }}
        </label>
      </div>

    </div>
    <div v-show="unwrapped"
         class="items"
    >
      <left-items v-for="item in itemsLabelArray"
                  :key="item"
                  :item="item"
                  :parent="list"
                  :checked="checked"
                  @itemIsChecked="itemChecked"
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
      itemsLabelArray: new Array(Math.floor(Math.random() * 6 + 4))
        .fill('Item ').map((it, index) => it + (index + 1)),
      checkedItems: [],
      isPartly: false
    }
  },
  methods: {
    wrap () {
      this.unwrapped = !this.unwrapped
    },
    itemChecked (item, itemState) {
      if (!itemState) {
        this.checkedItems = this.checkedItems.filter(it => it !== item)
      } else {
        this.checkedItems = this.checkedItems.includes(item) ? this.checkedItems : [...this.checkedItems, item]
      }
    }
  },
  watch: {
    checkedItems () {
      if (this.checkedItems.length === this.itemsLabelArray.length) {
        this.isPartly = false
        this.checked = [this.list]
      } else if (!this.checkedItems.length && this.checked[0]) {
        this.isPartly = false
        this.checked = []
      } else if (this.checkedItems.length > 0) {
        this.isPartly = true
      } else {
        this.isPartly = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>

input[type=checkbox] {
  transform: scale(1.5);
}

.checkbox {
  position:relative;
  padding-left:25px;
}
.checkbox input[type=checkbox] {
  display:none;
}
.checkbox label:after {
  content: '';
  display: block;
  position: absolute;
  top: 3px;
  left: 2px;
  outline: 1px solid #939598;
  border: 5px solid #fff;
  height: 6px;
  width: 6px;
  border-radius: 50%;
  background-color:#000;
}

.list-flex {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
}

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
  margin: 5px 50px;
}
</style>
