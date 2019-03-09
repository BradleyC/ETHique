<template>
  <footer>
    <span>Made for you. 🍃 Let's make the world better together.</span>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
@import '../scss/variables.scss';

footer {
  width: 100%;
  display: flex;
  padding: 20px 0;
  text-align: center;

  span {
    margin: auto;
  }
}
</style>
