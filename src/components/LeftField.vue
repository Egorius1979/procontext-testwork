<template>
  <div class="field">
    <left-list v-for="list in listArray"
               :key="list"
               :list="list"
               class="field__list"
    />
  </div>
</template>

<script>
import LeftList from '@/components/LeftList'

export default {
  name: 'LeftField',
  components: { LeftList },
  data () {
    return {
      listArray: this.$store.state.listArray
    }
  }
}
</script>

<style lang="scss">
.field {
  border: 2px solid black;
  padding: 2rem;
  min-height: 80vh;
  width: 40%;

  &__list {
    margin-bottom: 1rem;
  }
}
</style>
