<template>
  <section class="mdui-container-fluid">
    <div v-if="showProgress" class="mdui-progress">
      <div class="mdui-progress-indeterminate"></div>
    </div>
    <div id="item" class="mdui-card" v-for="subject in subjects">
      <div class="mdui-card-media">
        <img v-bind:src="subject.images.medium"/>
        <div class="mdui-card-menu">
          <a v-bind:href="subject.alt" class="mdui-btn mdui-btn-icon mdui-text-color-white"><i
            class="mdui-icon material-icons">info</i>
          </a>
        </div>
      </div>
      <div class="mdui-card-primary">
        <div class="mdui-card-primary-title">{{subject.title}}</div>
        <div class="mdui-card-primary-subtitle">导演:<span v-for="director in subject.directors">{{director.name}}</span>
        </div>
      </div>
      <div class="mdui-card-content">演员:<span v-for="(cast,index) in subject.casts">{{cast.name}}{{(index!==(subject.casts.length-1))? ',':''}}</span><br>
        类型:<span v-for="(genre,index) in subject.genres">{{genre}}{{(index!==(subject.genres.length-1))? ',':''}}</span><br>
        年代:{{subject.year}}<br>
        豆瓣评分:{{subject.rating.average}}
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    props: ['list'],
    name: "container",
    data() {
      return {
        subjects: [],
        showProgress: true
      }
    },
    watch: {
      list(now, old) {
        this.showProgress = true;
        this.switch_list(now);
      }
    },
    methods: {
      switch_list(list) {
        switch (list) {
          case 'in_theaters':
            this.getData(list);
            break;
          case 'coming_soon':
            this.getData(list);
            break;
          case 'top250':
            this.getData(list);
            break;
          default:
            this.getData('in_theaters');
            break;
        }
      },
      getData(list) {
        this.$http.jsonp('//api.douban.com/v2/movie/' + list).then(response => {
          if (response.status === 200) {
            this.showProgress = false;
            this.subjects = response.body.subjects;
          } else {
            console.error(response);
            this.showSnackbar(response.status);
          }
        }, response => {
          console.error(response);
          this.showSnackbar(response.status);
        });
      },
      showSnackbar(msg) {
        mdui.snackbar({
          message: msg
        });
      }
    },
    beforeMount() {
      this.showProgress = true;
      if (this.list === undefined) {
        this.switch_list('in_theaters');
      } else {
        this.switch_list(this.list);
      }
    }
  }
</script>

<style scoped>
  @media (min-width: 1024px) {
    #item {
      width: 23.5%;
      display: inline-block;
      margin-left: 1%;
      margin-bottom: 10px;
    }
  }
</style>
