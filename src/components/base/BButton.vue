<template>
  <button
    type="button"
    class="b-button"
    :disabled="disabled"
    :class="{ disabled }"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BButton",

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<styles lang="scss">
.b-button {
  border: none;
  outline: none;
  background-color: #125cfa;
  font-size: 14px;
  padding: 8px 16px;
  color: #ffffff;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.05s linear;

  &.disabled {
    user-select: none;
    background-color: #125cfa8c;
    cursor: not-allowed;
    // pointer-events: none;
  }

  &:hover {
    background-color: #739efc;
  }

  &.secondary {
    background-color: #fff;
    color: #125cfa;

    &:hover {
      background-color: #f8fafb;
    }
  }

  &.tertiary {
    background-color: #eef2f5;
    color: #125cfa;

    &:hover {
      background-color: #f8fafb;
    }
  }

  &.success {
    background-color: #12b886;
    color: #ffffff;

    &:hover {
      background-color: #087f5b;
    }
  }
}
</styles>
