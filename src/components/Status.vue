<template>
  <div class="container">
    <div class="box">
      <img :src="post.user.profile_image_url_https" />
      <h3>{{ post.user.name }}</h3>
      <h4>@{{ post.user.screen_name }}</h4>
      <p>{{ post.full_text }}</p>
      <div class="engage">
        <button v-if="post.favorited" class="btn engage-btn" disabled>
          <img src="../static/1F31F.svg" />
          <span>Liked</span>
        </button>
        <button v-else class="btn engage-btn" @click="likeStatus(post)">
          <img src="../static/2B50.svg" />
          <span>Like</span>
        </button>
      </div>
      <div class="engage">
        <button v-if="post.retweeted" class="btn engage-btn" disabled>
          <img src="../static/267Bc.svg" />
          <span>Retweeted</span>
        </button>
        <button v-else class="btn engage-btn" @click="retweet(post)">
          <img src="../static/267B.svg" />
          <span>Retweet</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Status',
  components: 'Reaction',
  props: {
    post: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  methods: {
    ...mapActions(['likeStatus', 'retweet'])
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
  min-width: 640px;
  margin: auto;
  margin-bottom: 20px;

  h3 {
    margin: 0 0 10px;
    display: inline;
  }

  h4 {
    display: inline;
    margin: 0 0.5em;
    font-weight: normal;
    color: #555;
  }

  p {
    margin: 0.7em;
    text-align: left;
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

// .copy {
//   h4 {
//     max-width: 100%;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     white-space: nowrap;
//     margin: 0 0 5px;
//   }
// }

.engage {
  height: 30px;
  display: inline;
}
.engage-btn {
  align-items: left;
  height: 100%;
  justify-content: space-around;
  padding: 1px;

  img {
    width: 28px;
  }
}
</style>
