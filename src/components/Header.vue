<template>
  <div class="header">
    <div class="logo">
      <h3>🥐 Éthique α</h3>
    </div>
    <div class="address">
      <div v-if="userName">
        <div>@{{ userName }}</div>
        <div v-if="balance">💰{{ balance }}</div>
        <div v-else>
          <p>🤡</p>
        </div>
      </div>
      <div v-else>
        <button class="btn" @click="handleLogin">Sign in to Twitter</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Header',

  computed: {
    ...mapGetters(['user', 'account', 'balance']),
    userName() {
      console.log(this.user)
      if (this.user) {
        console.log(this.user)
        return this.user.username
      }
    },
    acct() {
      return this.metamask && this.account ? this.account : null
    }
  },
  methods: {
    ...mapActions(['handleLogin'])
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables.scss';

.header {
  width: 100%;
  display: flex;
  background: $color2;
  justify-content: space-between;
  padding: 10px 0;
  position: fixed;

  .logo h3 {
    font-size: 2em;
    margin: 0.4em;
  }

  .logo,
  .address {
    margin: 0 20px;
  }

  .address {
    display: flex;
    font-size: 1.4em;

    span {
      color: $color1;
      margin: auto 10px;
    }
  }
  .btn {
    background: $color5;
    border-radius: $border-radius;
    color: $white;
    min-width: 120px;
  }
}
</style>
