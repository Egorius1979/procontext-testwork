<template>
  <div id="app" class="main container">
    <left-field />
    <right-field />
  </div>
</template>

<script>
import LeftField from '@/components/LeftField'
import RightField from '@/components/RightField'

export default {
  name: 'App',
  components: {
    RightField,
    LeftField
  },
  data () {
    return {
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
}
.main {
  display: flex;
  justify-content: space-between;
}
.container {
  width: 70%;
  margin: 0 auto;
}
</style>
