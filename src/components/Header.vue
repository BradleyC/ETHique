<template>
  <div class="header">
    <div class="logo">
      <h3>🌌 Demo dApp</h3>
    </div>
    <div class="address">
      <span v-if="acct">Account: {{ acct.substring(0, 16) }}...</span>
      <span v-if="userName">@{{ userName }}</span>
      <span v-else>
        <button class="btn" @click="handleLogin">Sign in with Twitter</button>
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Header',

  computed: {
    ...mapGetters(['user', 'account']),
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

  .logo,
  .address {
    margin: 0 20px;
  }

  .address {
    display: flex;

    span {
      color: $color1;
      margin: auto 10px;
      font-size: 12pt;
    }
  }
}
</style>
