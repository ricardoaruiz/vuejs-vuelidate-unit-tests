<template>
  <div id="app">
    <Form />    
  </div>
</template>

<script>
import Form from './components/Form.vue'

export default {
  name: 'app',
  components: {
    Form
  }
}
</script>

<style>
#app {
  width: 500px;
  margin: 0 auto;
}
</style>
