<template>
  <div class="field">
    <right-list v-for="list in listArray"
                :key="list"
                :list="list"
    />
  </div>
</template>

<script>
import RightList from '@/components/RightList'
export default {
  name: 'RightField',
  components: { RightList },
  data () {
    return {
      listArray: this.$store.state.listArray
    }
  }
}
</script>

<style scoped>
</style>
