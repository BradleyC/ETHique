<template>
  <div class="container">
    <div class="box" v-for="post in statusFeed">
      <!-- <img :src="post.user.profile_image_url_https" /> -->
      <h3>{{ post.user.name }}</h3>
      <h4>@{{ post.user.screen_name }}</h4>
      <h4>{{ post.text }}</h4>
      <h4>Favorited: {{ post.favorited }}</h4>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Posts',

  computed: {
    ...mapGetters(['statusFeed'])
  },
  mounted() {
    this.getPosts()
  },

  methods: {
    ...mapActions(['getPosts'])
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables.scss';

.container {
  margin: 20px auto;
}

h2 {
  text-align: center;
}

.btn {
  background: $color2;
  border-radius: $border-radius;
  color: $white;
  min-width: 120px;
}

.box {
  background: $white;
  border-radius: $border-radius;
  box-shadow: 0 1px 7px -2px rgba(0, 0, 0, 0.3);
  padding: 20px;
  width: 30vw;
  min-width: 300px;
  margin: auto;

  h3 {
    margin: 0 0 10px;
  }

  .form {
    display: flex;
    flex-direction: column;
  }

  input {
    margin: 0 0 10px;
  }

  .btn {
    margin: auto 0 auto auto;
  }
}

.list {
  display: flex;
  flex-wrap: wrap;
  margin: 20px auto;
  min-width: 300px;
}

.list-item {
  background: $white;
  border-radius: $border-radius;
  box-shadow: 0 1px 7px -2px rgba(0, 0, 0, 0.3);
  padding: 10px;
  width: 18vw;
  margin: 0 10px 10px;
  max-width: 500px;
  min-width: 80px;
}

.copy {
  h4 {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0 0 5px;
  }
}
</style>
