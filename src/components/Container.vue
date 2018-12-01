<template>
  <section class="mdui-container-fluid">
    <div v-show="showProgress" class="mdui-progress">
      <div class="mdui-progress-indeterminate"></div>
    </div>
    <div class="mdui-card item" v-for="subject in subjects">
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
        showProgress: true,
        loading: false,
        page: 1,
        total: 0
      }
    },
    watch: {
      list(now, old) {
        this.showProgress = true;
        this.subjects = [];
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
      getData(list, nextPage = false) {
        let count = 12;
        if (nextPage && ((this.page * count) >= this.total)) {
          this.showProgress = false;
          return
        }
        let start = this.page === 1 ? 0 : (this.page - 1) * count + 1;
        let parser = document.createElement('a');
        this.$http.jsonp('//api.douban.com/v2/movie/' + list + '?start=' + start + '&count=' + count).then(response => {
          if (response.status === 200) {
            this.showProgress = false;
            this.loading = false;
            this.total = response.body.total;
            this.page += 1;
            response.body.subjects.forEach((e, i) => {
              //因为豆瓣Api图片网址错误造成403权限问题,所以统一换前缀
              parser.href = e.images.medium;
              e.images.medium = "http://img3.doubanio.com" + parser.pathname;
            });
            response.body.subjects.forEach((e, i) => {
              this.subjects.push(e);
            });
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
      },
      pos: function () {
        //滚动条的高度
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        //网页正文全文高
        let scrollHeight = document.body.scrollHeight;
        //可视区域高
        let height = window.innerHeight || document.documentElement.clientHeight;
        let number = scrollHeight - (height + scrollTop);
        if (number < 300) {
          this.loadingMore();
        }
      },
      loadingMore: function () {
        if (this.loading) {
          return;
        }
        this.loading = true;
        this.showProgress = true;
        this.getData(this.list, true);
      }
    },
    beforeMount() {
      this.showProgress = true;
      if (this.list === undefined) {
        this.switch_list('in_theaters');
      } else {
        this.switch_list(this.list);
      }
    },
    mounted() {
      window.addEventListener('scroll', this.pos);
    },
    destroyed() {
      window.removeEventListener('scroll', this.pos);
    }
  }
</script>

<style scoped>
  @media (min-width: 1024px) {
    .item {
      width: 23.5%;
      display: inline-block;
      margin-left: 1%;
      margin-bottom: 10px;
    }
  }

  .mdui-progress {
    position: fixed;
    z-index: 999;
  }
</style>
