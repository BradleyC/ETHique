<template>
  <div class="header">
    <div class="logo">
      ImageRegistry.sol
    </div>
    <!-- TODO: This will display loading at first -->
    <div class="address">
      <span >{{ acct }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapGetters(['metamask', 'account']),
    acct() {
      return this.metamask && this.account
        ? `Loaded Address: ${this.account}`
        : 'Loading account...'
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '../scss/variables.scss';

.header {
  position: fixed;
  width: 100%;
  height: 7vh;
  display: flex;
  background-color: #fafffd;
  justify-content: space-between;

  .logo {
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
