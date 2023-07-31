<template>
  <div class="b-loader">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  name: "BLoader",

  props: {
    height: {
      type: String,
      default: "100%",
    },
  },
};
</script>

<style lang="scss">
.b-loader {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: #000000f7;
  display: flex;
  justify-content: center;
  align-items: center;

  .loader {
    border: 4px solid rgba(0, 0, 0, 0.3);
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 20px auto;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
