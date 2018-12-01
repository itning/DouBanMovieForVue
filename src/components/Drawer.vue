<template>
  <nav class="mdui-drawer mdui-card" id="left-drawer">
    <div class="mdui-card-media">
      <img src="../assets/card.jpg"/>
      <div class="mdui-card-media-covered">
        <div class="mdui-card-primary">
          <div class="mdui-card-primary-title">{{nowShow}}</div>
          <div class="mdui-card-primary-subtitle">豆瓣电影</div>
        </div>
      </div>
    </div>
    <ul class="mdui-list mdui-card-content" mdui-collapse="{accordion: true}">
      <li class="mdui-list-item mdui-ripple" v-bind:class="{'mdui-list-item-active':nowPath==='/in_theaters'}">
        <i class="mdui-list-item-icon mdui-icon material-icons">whatshot</i>
        <router-link to="/in_theaters" class="mdui-list-item-content">正在热映
        </router-link>
      </li>
      <li class="mdui-list-item mdui-ripple" v-bind:class="{'mdui-list-item-active':nowPath==='/coming_soon'}">
        <i class="mdui-list-item-icon mdui-icon material-icons">video_library</i>
        <router-link to="/coming_soon" class="mdui-list-item-content">即将上映
        </router-link>
      </li>
      <li class="mdui-list-item mdui-ripple" v-bind:class="{'mdui-list-item-active':nowPath==='/top250'}">
        <i class="mdui-list-item-icon mdui-icon material-icons">sort</i>
        <router-link to="/top250" class="mdui-list-item-content">Top250
        </router-link>
      </li>
      <li class="mdui-list-item mdui-ripple">
        <label class="mdui-switch">
          <input type="checkbox" id="night_mode" v-model="night_mode"/>
          <i class="mdui-switch-icon"></i>
        </label>
        <div class="mdui-list-item-content">夜间模式</div>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: "drawer",
    data() {
      return {
        nowShow: '',
        night_mode: false
      }
    },
    watch: {
      night_mode(now, old) {
        localStorage.night_mode = now;
        this.setNightMode(now);
      }
    },
    computed: {
      nowPath() {
        switch (this.$route.path) {
          case '/in_theaters':
            this.nowShow = '正在热映';
            break;
          case '/coming_soon':
            this.nowShow = '即将上映';
            break;
          case '/top250':
            this.nowShow = 'TOP250';
            break;
        }
        return this.$route.path;
      }
    },
    methods: {
      setNightMode(status) {
        if (status) {
          document.getElementsByTagName("body")[0].className = "mdui-drawer-body-left mdui-appbar-with-toolbar mdui-theme-primary-indigo mdui-theme-accent-pink mdui-theme-layout-dark";
        } else {
          document.getElementsByTagName("body")[0].className = "mdui-drawer-body-left mdui-appbar-with-toolbar mdui-theme-primary-indigo mdui-theme-accent-pink";
        }
      }
    },
    mounted() {
      if (localStorage.night_mode === 'true') {
        this.night_mode = true;
        this.setNightMode(true);
      }
    }
  }
</script>

<style scoped>

</style>
