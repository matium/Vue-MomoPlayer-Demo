<template>
  <footer>
    <p class="copyright">
      <slot>Copyright</slot>
    </p>
  </footer>
</template>


<script>
export default {
  name: "FooterComponent"
}
</script>


<style lang="scss" scoped>
footer {
  width: 100%;

  .copyright {
    text-align: center;
    margin: 0 auto 0 auto;
    @include enFont('regular');
    letter-spacing: 0.05em;
    -webkit-font-smoothing: initial;
    -moz-osx-font-smoothing: initial;
  }
}
</style>