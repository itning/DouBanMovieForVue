<template>
  <header class="mdui-appbar mdui-appbar-fixed">
    <div class="mdui-toolbar mdui-color-theme">
      <a href="javascript:" class="mdui-btn mdui-btn-icon" mdui-drawer="{target: '#left-drawer'}"><i
        class="mdui-icon material-icons">menu</i></a>
      <p>豆瓣电影</p>
      <div class="mdui-toolbar-spacer"></div>
      <a href="javascript:window.location.reload();" class="mdui-btn mdui-btn-icon"><i
        class="mdui-icon material-icons">refresh</i></a>
    </div>
  </header>
</template>

<script>
    export default {
        name: "toolbar"
    }
</script>

<style scoped>

</style>
