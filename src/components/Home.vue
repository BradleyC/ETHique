<template>
  <div class="container">
    <h2>ImageRegistry</h2>

    <div class="box">
      <h3>Add Asset</h3>
      <div class="form">
        <input type="text" name="ref" value="" placeholder="Image Address">
        <input type="text" name="id" value="" placeholder="Image ID">
        <button class="btn">Submit</button>
      </div>
    </div>

    <div class="list">
      <div class="list-item">
        <img src="" alt="">
        <div class="copy">
          <h4>Ref:</h4>
          <p>ID:</p>
        </div>
        <button class="btn">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="scss" scoped>
@import '../scss/variables.scss';

.container {
  margin: 20px auto;
  max-width: 960px;
}
</style>
