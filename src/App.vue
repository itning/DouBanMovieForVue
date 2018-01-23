<template>
  <div>
    <toolbar/>
    <drawer/>
    <router-view/>
  </div>
</template>

<script>
  import toolbar from './components/Toolbar'
  import drawer from './components/Drawer'

  export default {
    name: 'App',
    components: {
      toolbar, drawer
    }
  }
</script>

<style>

</style>
