<template>
  <div class="app-header">
    <div class="app-header-left"></div>

    <div class="app-header-center">Vehicle Entity App</div>

    <div class="app-header-right" @click="forwardToLinkedin">Berk Yılmaz</div>
  </div>
</template>

<script>
export default {
  name: "AppHeader",

  data() {
    return {};
  },

  methods: {
    forwardToLinkedin() {
      window.open("https://www.linkedin.com/in/ylmzberk/", "_blank");
    },
  },
};
</script>

<style lang="scss">
.app-header {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  place-items: center;
  background-color: #ffffff;
  height: 48px;
  padding: 0 20px;
  font-weight: bold;

  &-left,
  &-center,
  &-right {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  &-center {
    justify-content: center;
  }

  &-right {
    justify-content: flex-end;
    cursor: pointer;
  }
}
</style>
