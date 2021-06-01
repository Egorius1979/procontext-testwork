<template>
    <div class="right-list">
      <p>{{ list }}</p>
      <right-items :list="list"/>
    </div>
</template>

<script>
import RightItems from '@/components/RightItems'

export default {
  name: 'RightList',
  components: { RightItems },
  props: ['list']
}
</script>

<style lang="scss" scoped>
.right-list {
  border: 1px solid black;
  margin-bottom: 5px;
  padding-left: 10px;
}
</style>
